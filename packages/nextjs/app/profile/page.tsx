"use client";

import type { NextPage } from "next";
import { useState } from "react";
import styles from "~~/styles/Profile.module.scss"


const Profile: NextPage = () => {
    const [selectedTab, setSelectedTab] = useState("contratos")
    
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
            <div className={styles.imageWrapper}>
                <img src="copel.png"/>
            </div>
            <h2>COPEL</h2>
            <div className={styles.tabsWrapper}>
                <h3 onClick={() => handleSelectTab(0)}>Contratos</h3>
                <h3>Transações</h3>
                <h3>Fundos retidos</h3>
            </div>
        </div>


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
    </div>
  )
}

export default Profile;