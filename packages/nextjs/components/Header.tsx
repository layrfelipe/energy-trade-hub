"use client";

import React from "react";
import Link from "next/link";
import { RainbowKitCustomConnectButton } from "./scaffold-eth";
import { FaUserAlt } from "react-icons/fa";
import styles from "~~/styles/Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.logoWrapper}>
          <img src="logo.png" />
        </div>
      </Link>

      {/* {isProvider &&
        <Link href="/token">
          <button className={styles.createTokenButton}>
            Criação de token
          </button>
        </Link>
      } */}

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
