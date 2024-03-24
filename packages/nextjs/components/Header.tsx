"use client";

import React from "react";
import Link from 'next/link'
import styles from "~~/styles/Header.module.scss";
import { RainbowKitCustomConnectButton } from "./scaffold-eth";
import { FaUserAlt } from "react-icons/fa";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.logoWrapper}>
          <img src="logo.png"/>
        </div>
      </Link>

      <Link href="/token">
        <button className={styles.createTokenButton}>
          Criar token
        </button>
      </Link>

      <div className={styles.userOptions}>
        <RainbowKitCustomConnectButton />
        <Link href="/profile">
          <button>
            <FaUserAlt color="white" />
          </button>
        </Link>
      </div>
    </div>
  )
}