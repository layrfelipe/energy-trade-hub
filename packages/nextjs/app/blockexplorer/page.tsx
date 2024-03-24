"use client";

import { useEffect, useState } from "react";
import { PaginationButton, SearchBar, TransactionsTable } from "./_components";
import type { NextPage } from "next";
import { hardhat } from "viem/chains";
import { useFetchBlocks, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { notification } from "~~/utils/scaffold-eth";

const BlockExplorer: NextPage = () => {
  const { blocks, transactionReceipts, currentPage, totalBlocks, setCurrentPage, error } = useFetchBlocks();
  const { targetNetwork } = useTargetNetwork();
  const [isLocalNetwork, setIsLocalNetwork] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [contractPrice, setContactPrice] = useState("")
  const [energyAmount, setEnergyAmount] = useState("")
  // const [startDate, setStartDate] = useState<BigInt | undefined>()
  // const [endDate, setEndDate] = useState<BigInt | undefined>()
  const [energyType, setEnergyType] = useState("")
  const [region, setRegion] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "EnergyTradeHub",
    functionName: "createToken",
    args: [BigInt(contractPrice), BigInt(energyAmount), BigInt(1711273318), BigInt(1774355886), energyType, region, "anything", "https://google.com"],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  })

  function clearAll() {
    setContactPrice("")
    setEnergyAmount("")
    setEnergyType("")
    setRegion("")
    setContactPrice("")

  }

  useEffect(() => {
    if (targetNetwork.id !== hardhat.id) {
      setIsLocalNetwork(false);
    }
  }, [targetNetwork.id]);

  useEffect(() => {
    if (targetNetwork.id === hardhat.id && error) {
      setHasError(true);
    }
  }, [targetNetwork.id, error]);

  useEffect(() => {
    if (!isLocalNetwork) {
      notification.error(
        <>
          <p className="font-bold mt-0 mb-1">
            <code className="italic bg-base-300 text-base font-bold"> targeNetwork </code> is not localhost
          </p>
          <p className="m-0">
            - You are on <code className="italic bg-base-300 text-base font-bold">{targetNetwork.name}</code> .This
            block explorer is only for <code className="italic bg-base-300 text-base font-bold">localhost</code>.
          </p>
          <p className="mt-1 break-normal">
            - You can use{" "}
            <a className="text-accent" href={targetNetwork.blockExplorers?.default.url}>
              {targetNetwork.blockExplorers?.default.name}
            </a>{" "}
            instead
          </p>
        </>,
      );
    }
  }, [
    isLocalNetwork,
    targetNetwork.blockExplorers?.default.name,
    targetNetwork.blockExplorers?.default.url,
    targetNetwork.name,
  ]);

  useEffect(() => {
    if (hasError) {
      notification.error(
        <>
          <p className="font-bold mt-0 mb-1">Cannot connect to local provider</p>
          <p className="m-0">
            - Did you forget to run <code className="italic bg-base-300 text-base font-bold">yarn chain</code> ?
          </p>
          <p className="mt-1 break-normal">
            - Or you can change <code className="italic bg-base-300 text-base font-bold">targetNetwork</code> in{" "}
            <code className="italic bg-base-300 text-base font-bold">scaffold.config.ts</code>
          </p>
        </>,
      );
    }
  }, [hasError]);

  return (
    <div style={{ width: "100%", paddingTop: "20vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "75%", padding: "5vh 0" }}>
        <h1 style={{ color: "white", fontSize: "2rem", fontWeight: 600}}>CRIAÇÃO DE TOKEN PARA CONTRATO DE ENERGIA</h1>
        <h2 style={{ color: "white", fontSize: "1.25rem"}}>INSIRA OS DADOS DO CONTRATO</h2>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5vh", width: "50%", background: "none" }}>
          <input style={{ width: "100%",border: "2px solid white", borderRadius: "5px", marginBottom: "2vh", padding: "1vh 1vw", outline: "none" }} placeholder="Valor do contrato" type="number" onChange={e => setContactPrice(e.target.value)} value={contractPrice}/>
          <input style={{ width: "100%",border: "2px solid white", borderRadius: "5px", marginBottom: "2vh", padding: "1vh 1vw", outline: "none" }} placeholder="Quantidade de energia" type="text" onChange={e => setEnergyAmount(e.target.value)} value={energyAmount}/>
          <input style={{ width: "100%",border: "2px solid white", borderRadius: "5px", marginBottom: "2vh", padding: "1vh 1vw", outline: "none" }} placeholder="Tipo de energia" type="text" onChange={e => setEnergyType(e.target.value)} value={energyType}/>
          <input style={{ width: "100%",border: "2px solid white", borderRadius: "5px", marginBottom: "2vh", padding: "1vh 1vw", outline: "none" }} placeholder="Região" type="text" onChange={e => setRegion(e.target.value)} value={region}/>
          <input style={{ width: "100%",border: "2px solid white", borderRadius: "5px", marginBottom: "2vh", padding: "1vh 1vw", outline: "none" }} placeholder="Data início (dd/mm/yyyy)" value={startDate} onChange={e => setStartDate(e.target.value)}/>
          <input style={{ width: "100%",border: "2px solid white", borderRadius: "5px", marginBottom: "2vh", padding: "1vh 1vw", outline: "none" }} placeholder="Data fim (dd/mm/yyyy)" value={endDate} onChange={e => setEndDate(e.target.value)}/>
        </div>

        <button onClick={() => writeAsync()} style={{ border: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5vh", color: "white", padding: "1vh 5vw", fontSize: "1.5rem", fontWeight: 500, cursor: "pointer" }}>CRIAR TOKEN</button>
      </div>

      <div style={{paddingTop: "10vh"}}>
        <SearchBar />
        <TransactionsTable blocks={blocks} transactionReceipts={transactionReceipts} />
        <PaginationButton currentPage={currentPage} totalItems={Number(totalBlocks)} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default BlockExplorer;
