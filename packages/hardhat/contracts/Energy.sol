// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./IArbitrator.sol";
import "./IEvidence.sol";

contract EnergyTradeHub is ERC721URIStorage, ERC721Enumerable, ReentrancyGuard, AccessControl, Ownable, IArbitrable, IEvidence {
    using Address for address payable;

    // Constants
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant PROVIDER_ROLE = keccak256("PROVIDER_ROLE");
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");
    uint256 public constant reclamationPeriod = 3 minutes;
    uint256 public constant arbitrationFeeDepositPeriod = 3 minutes;
    uint256 constant metaevidenceID = 0;
    uint256 constant evidenceGroupID = 0;
    uint256 constant numberOfRulingOptions = 2;

    // State variables
    uint256 public tokenCount = 0;
    address payable public payer = payable(msg.sender);
    address payable public payee;
    uint256 public value;
    IArbitrator public arbitrator;
    uint256 public createdAt;
    uint256 public reclaimedAt;
    enum Status { Initial, Reclaimed, Disputed, Resolved }
    Status public status;

    enum RulingOptions { RefusedToArbitrate, PayerWins, PayeeWins }

	//Overides
	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 firstTokenId,
		uint256 batchSize
	) internal virtual override (ERC721, ERC721Enumerable) {
		super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
	}

	function _burn(uint256 tokenId) internal virtual override (ERC721, ERC721URIStorage) {
		super._burn(tokenId);
	}

	function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
		return super.tokenURI(tokenId);
	}
	

    // Structs
    struct Energy {
        uint256 id;
        address issuer;
        address owner;
        uint256 energyAmountMWh;
        uint256 pricePerMWh;
        uint256 startDate;
        uint256 endDate;
        string sourceType;
        string deliveryPoint;
        bool isActive;
        string contractTermsHash;
    }

    struct TokenSale {
        bool isForSale;
        uint256 price;
    }

    struct Escrow {
        address buyer;
        uint256 amount;
        bool fundsReleased;
    }

    // Mappings
    mapping(uint256 => Energy) public tokens;
    mapping(uint256 => TokenSale) public tokenSales;
    mapping(uint256 => Escrow) public escrows;

    // Events
    event TokenCreated(uint256 indexed id, address issuer, address owner, uint256 energyAmountMWh, uint256 pricePerMWh, uint256 startDate, uint256 endDate, string sourceType, string deliveryPoint, bool isActive, string contractTermsHash);
    event TokenListedForSale(uint256 indexed id, uint256 price);
    event TokenSaleWithdrawn(uint256 indexed id);
    event TokenPurchased(uint256 indexed id, address buyer, uint256 price);
    event TokenBurned(uint256 indexed id, address burner);
    event EscrowCreated(uint256 tokenId, uint256 amount);
    event EscrowReleased(uint256 tokenId);
    event EscrowRefunded(uint256 tokenId);


    // Errors
    error InvalidStatus();
    error ReleasedTooEarly();
    error NotPayer();
    error NotArbitrator();
    error ThirdPartyNotAllowed();
    error PayeeDepositStillPending();
    error ReclaimedTooLate();
    error InsufficientPayment(uint256 available, uint256 required);
    error InvalidRuling(uint256 ruling, uint256 numberOfChoices);
    error UnexistingDispute();

    // Constructor
    constructor(address payable _payee, IArbitrator _arbitrator, string memory _metaevidence) payable ERC721("EnergyTradeHubToken", "ETHB") {
        value = msg.value;
        payee = _payee;
        arbitrator = _arbitrator;
        createdAt = block.timestamp;

        emit MetaEvidence(metaevidenceID, _metaevidence);

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setRoleAdmin(ADMIN_ROLE, DEFAULT_ADMIN_ROLE);
		_setRoleAdmin(PROVIDER_ROLE, ADMIN_ROLE);
		_setRoleAdmin(CONSUMER_ROLE, ADMIN_ROLE);
		grantRole(ADMIN_ROLE, msg.sender);
		grantRole(PROVIDER_ROLE, msg.sender);
		grantRole(CONSUMER_ROLE, msg.sender);
	}

	// Supports Interface Override
	function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl, ERC721Enumerable) returns (bool) {
		return ERC721.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
	}

	// Role Management
	function addConsumer(address consumer) public {
		require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
		grantRole(CONSUMER_ROLE, consumer);
	}

	function addProvider(address provider) public {
		require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
		grantRole(PROVIDER_ROLE, provider);
	}

	function isProvider() public view returns (bool) {
		return hasRole(PROVIDER_ROLE, msg.sender);
	}

	// Token Lifecycle Management
	function createToken(
		uint256 energyAmountMWh,
		uint256 pricePerMWh,
		uint256 startDate,
		uint256 endDate,
		string memory sourceType,
		string memory deliveryPoint,
		string memory contractTermsHash,
		string memory tokenURILiteral
	) public onlyProvider returns (uint256) {
		require(startDate < endDate, "Start date must be before end date.");
		require(energyAmountMWh > 0, "Energy amount must be greater than 0 MWh.");

		tokenCount++;
		uint256 newTokenId = tokenCount;
		_mint(msg.sender, newTokenId);
		_setTokenURI(newTokenId, tokenURILiteral);

		tokens[newTokenId] = Energy(
			newTokenId,
			msg.sender,
			msg.sender, // Initially, the issuer is the owner
			energyAmountMWh,
			pricePerMWh,
			startDate,
			endDate,
			sourceType,
			deliveryPoint,
			true, // isActive
			contractTermsHash
		);

		emit TokenCreated(
			newTokenId,
			msg.sender,
			msg.sender,
			energyAmountMWh,
			pricePerMWh,
			startDate,
			endDate,
			sourceType,
			deliveryPoint,
			true,
			contractTermsHash
		);
		return newTokenId;
	}

	function listTokenForSale(uint256 tokenId, uint256 price) public {
		require(ownerOf(tokenId) == msg.sender, "You must own the token to list it for sale.");
		tokenSales[tokenId] = TokenSale(true, price);
		emit TokenListedForSale(tokenId, price);
	}

	function withdrawTokenFromSale(uint256 tokenId) public {
		require(ownerOf(tokenId) == msg.sender, "You must own the token to withdraw it from sale.");
		tokenSales[tokenId].isForSale = false;
		emit TokenSaleWithdrawn(tokenId);
	}

	function buyToken(uint256 tokenId) public payable nonReentrant {
		require(tokenSales[tokenId].isForSale, "This token is not for sale.");
		require(msg.value >= tokenSales[tokenId].price, "Insufficient funds sent.");
		escrows[tokenId] = Escrow(msg.sender, msg.value, false);
		tokenSales[tokenId].isForSale = false;

		emit EscrowCreated(tokenId, msg.value);
		emit TokenPurchased(tokenId, msg.sender, tokenSales[tokenId].price);
	}

	function burnToken(uint256 tokenId) public {
		require(hasRole(CONSUMER_ROLE, msg.sender), "Caller is not a consumer");
		require(ownerOf(tokenId) == msg.sender, "You must own the token to burn it.");
		require(tokens[tokenId].isActive, "The token is not active.");

		tokens[tokenId].isActive = false; // Deactivate token upon burning
		_burn(tokenId);
		emit TokenBurned(tokenId, msg.sender);
	}

	// Dispute and Arbitration
	function raiseDispute(uint256 tokenId, uint256 _options, bytes memory _extraData) external payable {
		require(ownerOf(tokenId) == msg.sender, "Caller is not the owner of the token");
		uint256 disputeID = arbitrator.createDispute{value: msg.value}(_options, _extraData);
	}

    function releaseFunds() public {
        require(status == Status.Initial, "Transaction is not in Initial state.");

        if (msg.sender != payer && block.timestamp - createdAt <= reclamationPeriod) {
            revert ReleasedTooEarly();
        }

        status = Status.Resolved;
        payee.transfer(value);
    }

    function reclaimFunds() public payable {
        if (status != Status.Initial && status != Status.Reclaimed) {
            revert InvalidStatus();
        }
        if (msg.sender != payer) {
            revert NotPayer();
        }

        if (status == Status.Reclaimed) {
            if (block.timestamp - reclaimedAt <= arbitrationFeeDepositPeriod) {
                revert PayeeDepositStillPending();
            }
			
			payer.transfer(address(this).balance);
            status = Status.Resolved;
        } else {
            if (block.timestamp - createdAt > reclamationPeriod) {
                revert ReclaimedTooLate();
            }
            uint256 requiredCost = arbitrator.arbitrationCost("");
            if (msg.value < requiredCost) {
                revert InsufficientPayment(msg.value, requiredCost);
            }
            reclaimedAt = block.timestamp;
            status = Status.Reclaimed;
        }
    }


	function rule(uint256 disputeID, uint256 ruling) external {
        if (msg.sender != address(arbitrator)) {
            revert NotArbitrator();
        }
        if (status != Status.Disputed) {
            revert InvalidStatus();
        }
        if (ruling > numberOfRulingOptions) {
            revert InvalidRuling(ruling, numberOfRulingOptions);
        }

        status = Status.Resolved;
        if (ruling == uint256(RulingOptions.PayerWins)) payer.transfer(address(this).balance);
        // else if (ruling == uint256(RulingOptions.PayeeWins)) payee.send(address(this).balance);
		// else payee.send(address(this).balance / 2);
        emit Ruling(arbitrator, disputeID, ruling);
	}

	// Evidence Submission
	function submitEvidence(uint256 disputeID, string calldata evidenceURI) external {
		emit Evidence(arbitrator, disputeID, msg.sender, evidenceURI);
	}

	// Modifiers
	modifier onlyProvider() {
		require(hasRole(PROVIDER_ROLE, msg.sender), "Caller is not a provider");
		_;
	}
}