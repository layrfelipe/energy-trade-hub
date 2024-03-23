"use client";

import type { NextPage } from "next";
import {FaToggleOn, FaWater, FaAtom } from "react-icons/fa"
import styles from "~~/styles/Home.module.scss"

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <h1>CONTRATOS DO MERCADO LIVRE DE ENERGIA</h1>

      <div className={styles.availableContractsDataContainer}>
        <div className={styles.filtersContainer}>
          <h2>FILTROS</h2>

          <div className={styles.filtersContent}>
            <div className={styles.toggleFilter}>
              <h4>Minha região</h4>
              <div id={styles.toggleIconWrapper}>
                <FaToggleOn color="#430C6F" fontSize={30}/>
              </div>
            </div>

            <div className={styles.priceFilter}>
              <h3>Preço/MWh</h3>
              <div className={styles.inputFiltersContainer}>
                <input placeholder="Mínimo (R$)" type="text"/>
                <span>-</span>
                <input placeholder="Máximo (R$)" type="text"/>
              </div>
            </div>

            <div className={styles.categoryAndEnergyTypeFilter}>
              <h3>Geradoras</h3>
              <ul>
                <li>Usina Hidrelétrica de Furnas</li>
                <li>Usina Hidrelétrica de Itaipu</li>
                <li>Companhia Hidrelétrica de São Francisco</li>
                <li>Angra I</li>
                <li>Angra II</li>
              </ul>
            </div>

            <div className={styles.categoryAndEnergyTypeFilter}>
              <h3>Tipos de energia</h3>
              <ul>
                <li>Hidrelétrica</li>
                <li>Nuclear</li>
                <li>Eólica</li>
                <li>Fotovoltaica</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.contractsTableContainer}>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Geradora</th>
                  <th>Valor do contrato</th>
                  <th>Preço/MWh</th>
                  <th>Preço/MWh</th>
                  <th>Região</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td><img src="/furnas.png" /></td>
                  <td>FURNAS</td>
                  <td>2 ETH</td>
                  <td>0.024 ETH</td>
                  <td>5 anos</td>
                  <td>Sudeste</td>
                  <td className={styles.iconTableData}>
                    <div className={styles.iconWrapper}>
                      <FaWater color="white" size={30}/>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><img src="/eletro-nuclear.png" /></td>
                  <td>ANGRA I</td>
                  <td>2 ETH</td>
                  <td>0.024 ETH</td>
                  <td>5 anos</td>
                  <td>Sudeste</td>
                  <td className={styles.iconTableData}>
                    <div className={styles.iconWrapper}>
                      <FaAtom color="white" size={30}/>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><img src="/eletro-nuclear.png" /></td>
                  <td>ANGRA II</td>
                  <td>2 ETH</td>
                  <td>0.024 ETH</td>
                  <td>5 anos</td>
                  <td>Sudeste</td>
                  <td className={styles.iconTableData}>
                    <div className={styles.iconWrapper}>
                      <FaAtom color="white" size={30}/>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><img src="/furnas.png" /></td>
                  <td>FURNAS</td>
                  <td>2 ETH</td>
                  <td>0.024 ETH</td>
                  <td>5 anos</td>
                  <td>Sudeste</td>
                  <td className={styles.iconTableData}>
                    <div className={styles.iconWrapper}>
                      <FaWater color="white" size={30}/>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
