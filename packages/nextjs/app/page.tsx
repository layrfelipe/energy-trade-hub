"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { FaWater, FaAtom } from "react-icons/fa"
import styles from "~~/styles/Home.module.scss"

const Home: NextPage = () => {
  const [selectedRegion, setSelectedRegion] = useState("0")

  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const [isFurnasFilterChecked, setIsFurnasFilterChecked] = useState(false)
  const [isItaipuFilterChecked, setIsItaipuFilterChecked] = useState(false)
  const [isChesfFilterChecked, setIsChesfFilterChecked] = useState(false)
  const [isAngra1FilterChecked, setIsAngra1FilterChecked] = useState(false)
  const [isAngra2FilterChecked, setIsAngra2FilterChecked] = useState(false)

  const [isHydroelectricFilterChecked, setIsHydroelectricFilterChecked] = useState(false)
  const [isNuclearFilterChecked, setIsNuclearFilterChecked] = useState(false)
  const [isEolicFilterChecked, setIsEolicFilterChecked] = useState(false)
  const [isPhotovoltaicFilterChecked, setIsPhotovoltaicFilterChecked] = useState(false)

  const handleApplyFilters = () => {
    if (parseFloat(minPrice) > 99999) {
      alert("Preço mínimo alto demais")
      return
    }

    if (parseFloat(minPrice) < 0.01) {
      alert("Preço mínimo alto demais")
      return
    }

    if (parseFloat(maxPrice) > 100000) {
      alert("Preço máximo alto demais")
      return
    }

    if (parseFloat(maxPrice) < 1) {
      alert("Preço máximo baixo demais")
      return
    }

    if (minPrice > maxPrice) {
      alert("Preço mínimo deve ser menor ou igual ao preço máximo")
      return
    }
  }

  return (
    <div className={styles.main}>
      <h1>CONTRATOS DO MERCADO LIVRE DE ENERGIA</h1>

      <div className={styles.availableContractsDataContainer}>
        <div className={styles.filtersContainer}>
          <div className={styles.filtersHeader}>
            <h2>FILTROS</h2>
            <button onClick={handleApplyFilters}>Aplicar</button>
          </div>

          <div className={styles.filtersContent}>
            <div className={styles.regionFilter}>
              <select defaultValue={selectedRegion} onChange={ev => setSelectedRegion(ev.target.value)}>
                <option value="0">Selecionar região</option>
                <option value="norte">Norte</option>
                <option value="nordeste">Nordeste</option>
                <option value="centro-oeste">Centro-Oeste</option>
                <option value="sul">Sul</option>
                <option value="sudeste">Sudeste</option>
              </select>
            </div>

            <div className={styles.priceFilter}>
              <h3>Preço/MWh</h3>
              <div className={styles.inputFiltersContainer}>
                <input pattern="[0-9]{1,7}" placeholder="Mínimo (ETH)" value={minPrice} onChange={e => setMinPrice(e.target.value)}/>
                <span>-</span>
                <input pattern="[0-9]{1,7}" placeholder="Máximo (ETH)" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}/>
              </div>
            </div>

            <div className={styles.categoryAndEnergyTypeFilter}>
              <h3>Geradoras</h3>

              <div className={styles.inputWrapper} onClick={() => setIsFurnasFilterChecked(!isFurnasFilterChecked)}>
                <input id={styles.furnas} type="checkbox" defaultChecked={false} checked={isFurnasFilterChecked}/>
                <label htmlFor={styles.furnas}>Usina Hidrelétrica de Furnas</label>
              </div>

              <div className={styles.inputWrapper} onClick={() => setIsItaipuFilterChecked(!isItaipuFilterChecked)}>
                <input id={styles.itaipu} type="checkbox" defaultChecked={false} checked={isItaipuFilterChecked}/>
                <label htmlFor={styles.itaipu}>Usina Hidrelétrica de Itaipu</label>
              </div>

              <div className={styles.inputWrapper} onClick={() => setIsChesfFilterChecked(!isChesfFilterChecked)}>
                <input id={styles.chesf} type="checkbox" defaultChecked={false} checked={isChesfFilterChecked}/>
                <label htmlFor={styles.chesf}>Companhia Hidrelétrica de São Francisco</label>
              </div>

              <div className={styles.inputWrapper} onClick={() => setIsAngra1FilterChecked(!isAngra1FilterChecked)}>
                <input id={styles.angra1} type="checkbox" defaultChecked={false} checked={isAngra1FilterChecked}/>
                <label htmlFor={styles.angra1}>Angra I</label>
              </div>

              <div className={styles.inputWrapper} onClick={() => setIsAngra2FilterChecked(!isAngra2FilterChecked)}>
                <input id={styles.angra2} type="checkbox" defaultChecked={false} checked={isAngra2FilterChecked}/>
                <label htmlFor={styles.angra2}>Angra II</label>
              </div>
            </div>

            <div className={styles.categoryAndEnergyTypeFilter}>
              <h3>Tipos de energia</h3>

              <div className={styles.inputWrapper} onClick={() => setIsHydroelectricFilterChecked(!isHydroelectricFilterChecked)}>
                <input id={styles.hydroeletric} type="checkbox" defaultChecked={false} checked={isHydroelectricFilterChecked}/>
                <label htmlFor={styles.hydroeletric}>Hidrelétrica</label>
              </div>

              <div className={styles.inputWrapper} onClick={() => setIsNuclearFilterChecked(!isNuclearFilterChecked)}>
                <input id={styles.nuclear} type="checkbox" defaultChecked={false} checked={isNuclearFilterChecked}/>
                <label htmlFor={styles.nuclear}>Nuclear</label>
              </div>

              <div className={styles.inputWrapper} onClick={() => setIsEolicFilterChecked(!isEolicFilterChecked)}>
                <input id={styles.eolic} type="checkbox" defaultChecked={false} checked={isEolicFilterChecked}/>
                <label htmlFor={styles.eolic}>Eólica</label>
              </div>

              <div className={styles.inputWrapper} onClick={() => setIsPhotovoltaicFilterChecked(!isPhotovoltaicFilterChecked)}>
                <input id={styles.photovoltaic} type="checkbox" defaultChecked={false} checked={isPhotovoltaicFilterChecked}/>
                <label htmlFor={styles.photovoltaic}>Fotovoltaica</label>
              </div>
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
