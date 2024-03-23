"use client";

import React from "react";
import styles from "~~/styles/Header.module.scss";
import { RainbowKitCustomConnectButton } from "./scaffold-eth";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logoWrapper}>
        <img src="logo.png"/>
      </div>

      <div className={styles.userOptions}>
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  )
}