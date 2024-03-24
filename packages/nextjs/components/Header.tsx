"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RainbowKitCustomConnectButton } from "./scaffold-eth";
import { FaUserAlt } from "react-icons/fa";
import styles from "~~/styles/Header.module.scss";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const Header = () => {
  const [isProvider, setIsProvider] = useState(false)

  const { data: isProviderResult } = useScaffoldContractRead({
    contractName: "EnergyTradeHub",
    functionName: "isProvider"
  });

  useEffect(() => {
    if (isProviderResult) setIsProvider(true)
    else setIsProvider(false)

  }, [isProviderResult])

  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.logoWrapper}>
          <img src="logo.png" />
        </div>
      </Link>

      {isProvider &&
        <Link href="/token">
          <button className={styles.createTokenButton}>
            Criação de token
          </button>
        </Link>
      }

      <div className={styles.userOptions}>
        <RainbowKitCustomConnectButton />
        <Link href="/profile">
          <button>
            <FaUserAlt color="white" />
          </button>
        </Link>
      </div>
    </div>
  );
};
