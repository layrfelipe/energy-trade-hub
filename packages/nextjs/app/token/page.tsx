"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { useWalletClient } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import styles from "~~/styles/Token.module.scss"

const Token: NextPage = () => {

  
  const [contractPrice, setContactPrice] = useState("")
  const [energyAmount, setEnergyAmount] = useState("")
  // const [startDate, setStartDate] = useState<BigInt | undefined>()
  // const [endDate, setEndDate] = useState<BigInt | undefined>()
  const [energyType, setEnergyType] = useState("")
  const [region, setRegion] = useState("")
  
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "EnergyTradeHub",
    functionName: "createToken",
    args: [BigInt(contractPrice), BigInt(energyAmount), BigInt(1711273318), BigInt(1774355886), energyType, region, "anything", "https://google.com"],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  })

  // const handleChangeStartDate = (e: any) => {
  //   const inputDate = e.target.value
  //   const unix = Math.floor(inputDate.getTime() / 1000)
  //   console.log(unix)
  // }

  // const handleChangeEndDate = (e: any) => {
  //   const inputDate = e.target.value
  //   const unix = Math.floor(inputDate.getTime() / 1000)
  // }

  return (
    <div className={styles.main}>
        <div className={styles.content}>
            <h1>CRIAÇÃO DE TOKEN PARA CONTRATO DE ENERGIA</h1>
            <h2>INSIRA OS DADOS DO CONTRATO</h2>

            <div className={styles.inputsWrapper}>
                <input placeholder="Valor do contrato" type="text" onChange={e => setContactPrice(e.target.value)} value={contractPrice}/>
                <input placeholder="Quantidade de energia" type="text" onChange={e => setEnergyAmount(e.target.value)} value={energyAmount}/>
                <input placeholder="Tipo de energia" type="text" onChange={e => setEnergyType(e.target.value)} value={energyType}/>
                <input placeholder="Região" type="text" onChange={e => setRegion(e.target.value)} value={region}/>
                <input placeholder="Data início (dd/mm/yyyy)" value="24/03/2024"/>
                <input placeholder="Data fim (dd/mm/yyyy)" value="24/03/2026"/>
            </div>

            <button onClick={() => writeAsync()}>CRIAR TOKEN</button>
        </div>
    </div>
  );
};

export default Token;
