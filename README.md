# Energy Trade Hub: A Web3 Marketplace for Energy Trading in Brazil

Welcome to the **Energy Trade Hub**, a pioneering Web3 marketplace dedicated to revolutionizing energy trading in Brazil. Leveraging the power of blockchain technology, this platform enables seamless trade of energy tokens, representing various types of domestically generated energy. Aimed at facilitating a more advantageous, practical, and efficient negotiation process for energy generators and retail traders, Energy Trade Hub is set to be a game-changer in the industry.

## 🚀 Features

- **Tokenized Energy Trading:** Trade tokens representing diverse energy sources generated across Brazil.
- **Efficient Negotiation:** Streamline negotiations between energy producers and retailers.
- **Regulatory Compliance:** Designed to maintain a smooth relationship with Brazil's energy regulatory body, CCEE.

## 🛠️ Built With

- **Scaffold-ETH 2**: A robust framework for Ethereum development, combining Wagmi and HardHat for a comprehensive development environment.
- **React**: For a dynamic and responsive user interface that ensures a seamless user experience.
- **OpenZeppelin Contracts**: Utilizing industry-standard secure smart contracts for ERC721 (NFT) and Access Control.
- **Kleros Contracts**: Integrating dispute resolution mechanisms with ERC 792 (Arbitration) and ERC-1497 (Evidence) standards.
- **HardHat**: A development environment for testing, compiling, and deploying Ethereum software.
- **Deployed on Scroll Sepolia**: The contract is deployed at [0x8ea0cA1979cA397A3c6bcD472EDe92B2b6f558Bc](https://sepolia.scrollscan.com/address/0x8ea0cA1979cA397A3c6bcD472EDe92B2b6f558Bc)
- **Hosted by Vercel**: Dapp is [LIVE](https://ethsamba-2024-1obxkyarl-wlademyr-mendes-projects.vercel.app)


## 📚 Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) package manager
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repo**
   ```sh
   git clone https://github.com/layrfelipe/ethsamba-2024.git
   ```
2. **Navigate to the project directory**
   ```sh
   cd ethsamba-2024
   ```
3. **Install NPM packages**
   ```sh
   yarn install
   ```
4. **Start the development environment**
   - Start the local Ethereum chain
     ```sh
     yarn chain
     ```
   - Deploy contracts to the local chain (in a new terminal tab)
     ```sh
     yarn deploy
     ```
   - Start the frontend application (in a new terminal tab)
     ```sh
     yarn start
     ```

## 📝 Usage

After starting the development server, the web application will be accessible at `http://localhost:3000`.