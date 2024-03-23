"use client";

import type { NextPage } from "next";
import styles from "~~/styles/Token.module.scss"

const Token: NextPage = () => {
  return (
    <div className={styles.main}>
        <div className={styles.content}>
            <h1>CRIAÇÃO DE TOKEN PARA CONTRATO DE ENERGIA</h1>
            <h2>INSIRA OS DADOS DO CONTRATO</h2>

            <div className={styles.inputsWrapper}>
                <input placeholder="Valor" type="text"/>
                <input placeholder="Início" type="text"/>
                <input placeholder="Fim" type="text"/>
                <input placeholder="Tipo" type="text"/>
                <input placeholder="Quantidade" type="text"/>
                <input placeholder="Região" type="text"/>
            </div>

            <button>CRIAR TOKEN</button>
        </div>
    </div>
  );
};

export default Token;
