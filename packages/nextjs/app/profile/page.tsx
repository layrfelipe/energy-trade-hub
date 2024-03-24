"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";
import styles from "~~/styles/Profile.module.scss"


const Profile: NextPage = () => {
    const [selectedTab, setSelectedTab] = useState("Contratos")
    const [walletAddress, setWalletAddress] = useState("")
    const { data: walletClient } = useWalletClient();

    useEffect(() => {
        if (walletClient) {
            setWalletAddress(walletClient.account.address)
        }
    }, [walletClient])
    
    const handleSelectTab = (tabIndex: number) => {
        switch (tabIndex) {
            case 0:
                if (selectedTab != "Contratos") setSelectedTab("Contratos")
                break
            case 1:
                if (selectedTab != "Transações") setSelectedTab("Transações")
                break
            case 2:
                if (selectedTab != "Fundos retidos") setSelectedTab("Fundos retidos")
                break
        }
    }

  return (
    <div className={styles.profileContainer}>
        <div className={styles.profileMainDataWrapper}>
            {/* <div className={styles.imageWrapper}>
                <img src="copel.png"/>
            </div> */}
            <h4>Sua carteira {walletAddress}</h4>
            <div className={styles.tabsWrapper}>
                <h3 className={selectedTab == "Contratos" ? styles.selected : styles.notSelected} onClick={() => handleSelectTab(0)}>Contratos</h3>
                <h3 className={selectedTab == "Transações" ? styles.selected : styles.notSelected} onClick={() => handleSelectTab(1)}>Transações</h3>
                <h3 className={selectedTab == "Fundos retidos" ? styles.selected : styles.notSelected} onClick={() => handleSelectTab(2)}>Fundos retidos</h3>
            </div>
        </div>


        {selectedTab == "Contratos" &&
            <>
                <div className={styles.contractsWrapper}>
                    <div className={styles.contractsGrid}>
                        <div className={styles.contractCard}>
                            <div className={styles.imageWrapper}>
                                <img src="furnas.png" />
                            </div>

                            <p>FURNAS</p>
                            <p>2 ETH</p>
                            <p>0.024 ETH/KWh</p>
                            <p>24/03/2024</p>
                            <p>24/03/2030</p>
                            <p>6 anos</p>
                            <p>Sudeste</p>
                            <p>Hidrelétrica</p>
                        </div>

                        <div className={styles.contractCard}>
                            <div className={styles.imageWrapper}>
                                <img src="furnas.png" />
                            </div>

                            <p>FURNAS</p>
                            <p>2 ETH</p>
                            <p>0.024 ETH/KWh</p>
                            <p>24/03/2024</p>
                            <p>24/03/2030</p>
                            <p>6 anos</p>
                            <p>Sudeste</p>
                            <p>Hidrelétrica</p>
                        </div>

                        <div className={styles.contractCard}>
                            <div className={styles.imageWrapper}>
                                <img src="furnas.png" />
                            </div>

                            <p>FURNAS</p>
                            <p>2 ETH</p>
                            <p>0.024 ETH/KWh</p>
                            <p>24/03/2024</p>
                            <p>24/03/2030</p>
                            <p>6 anos</p>
                            <p>Sudeste</p>
                            <p>Hidrelétrica</p>
                        </div>

                        <div className={styles.contractCard}>
                            <div className={styles.imageWrapper}>
                                <img src="furnas.png" />
                            </div>

                            <p>FURNAS</p>
                            <p>2 ETH</p>
                            <p>0.024 ETH/KWh</p>
                            <p>24/03/2024</p>
                            <p>24/03/2030</p>
                            <p>6 anos</p>
                            <p>Sudeste</p>
                            <p>Hidrelétrica</p>
                        </div>

                        <div className={styles.contractCard}>
                            <div className={styles.imageWrapper}>
                                <img src="furnas.png" />
                            </div>

                            <p>FURNAS</p>
                            <p>2 ETH</p>
                            <p>0.024 ETH/KWh</p>
                            <p>24/03/2024</p>
                            <p>24/03/2030</p>
                            <p>6 anos</p>
                            <p>Sudeste</p>
                            <p>Hidrelétrica</p>
                        </div>

                        <div className={styles.contractCard}>
                            <div className={styles.imageWrapper}>
                                <img src="furnas.png" />
                            </div>

                            <p>FURNAS</p>
                            <p>2 ETH</p>
                            <p>0.024 ETH/KWh</p>
                            <p>24/03/2024</p>
                            <p>24/03/2030</p>
                            <p>6 anos</p>
                            <p>Sudeste</p>
                            <p>Hidrelétrica</p>
                        </div>
                        
                    </div>
                </div>

                <button className={styles.seeAllButton}>VER TUDO</button>
            </>
        }
    </div>
  )
}

export default Profile;