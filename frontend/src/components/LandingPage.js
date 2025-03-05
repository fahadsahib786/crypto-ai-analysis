import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./LoaderComponent";
import "./LandingPage.css";
import CryptoRow from "./CryptoRow";
import {
  AiCryptoArray,
  cryptoCodes1,
  cryptoCountObj,
} from "../utils/commonFunc";
import { Helmet } from "react-helmet";
import { TokenExchangeMap } from "./TokenExchangeMap";

const LandingPage = ({
  searchTerm,
  setSearchTerm,
  topTrendingCryptos,
  setTopTrendingCryptos,
}) => {
  const [{ cryptos, prevCryptoData }, setCryptos] = useState({
    cryptos: [],
    prevCryptoData: [],
  });
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [intervalController, setIntervalController] = useState(false);
  const [filteredPrevCryptos, setFilteredPrevCryptos] = useState([]);
  const [sortKey, setSortKey] = useState("rank");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const cryptosPerPage = 50;
  // const [totalPages, setTotalPages] = useState(1);
  const totalPages = Math.ceil(200 / cryptosPerPage);
  const pagesToShow = 4;
  const isInitialRender = useRef(0);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [timeoutId, setTimeoutId] = useState(null);
  let interval = useRef("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getBuyLink = (cryptoCode) => {
    const tokenInfo = TokenExchangeMap[cryptoCode];
    return tokenInfo ? tokenInfo.url : null;
  };
  // Add your allowed codes here

  const allowedCodesObject = useMemo(
    () => ({
      NEAR: true,
      RNDR: true,
      INJ: true,
      GRT: true,
      TAO: true,
      THETA: true,
      FET: true,
      AKT: true,
      AGIX: true,
      ROSE: true,
      AIOZ: true,
      TFUEL: true,
      ARKM: true,
      GLM: true,
      OCEAN: true,
      IO: true,
      TRAC: true,
      PRIME: true,
      TURBO: true,
      ATH: true,
      RSS3: true,
      ABT: true,
      FLUX: true,
      PAAL: true,
      NMT: true,
      "0x0": true,
      AGI: true,
      KDA: true,
      POND: true,
      RLC: true,
      SURE: true,
      NOS: true,
      ZIG: true,
      AI: true,
      CQT: true,
      NMR: true,
      IQ: true,
      ORAI: true,
      LMWR: true,
      OZO: true,
      PHA: true,
      PHB: true,
      HOOK: true,
      AITECH: true,
      DKA: true,
      CGPT: true,
      NFP: true,
      TOKEN: true,
      FORT: true,
      HASHAI: true,
      CUDOS: true,
      GPU: true,
      TRIAS: true,
      ALEPH: true,
      CTXC: true,
      VR: true,
      DMTR: true,
      DATA: true,
      APRS: true,
      DIA: true,
      ALI: true,
      AGRS: true,
      LAT: true,
      VAI: true,
      SIDUS: true,
      COMAI: true,
      NUM: true,
      BOTTO: true,
      MDT: true,
      SDAO: true,
      VRA: true,
      KEY: true,
      VIRTUAL: true,
      PALM: true,
      GLQ: true,
      HAI: true,
      CERE: true,
      DEAI: true,
      UPP: true,
      LIME: true,
      HGPT: true,
      PRQ: true,
      VXV: true,
      NTX: true,
      VIDT: true,
      VOLT: true,
      DOCK: true,
      DBC: true,
      OORT: true,
      MAN: true,
      AIT: true,
      DUEL: true,
      OPTI: true,
      GMRX: true,
      LIKE: true,
      FITFI: true,
      BAD: true,
      OFN: true,
      DCK: true,
      SPECTRE: true,
      TRVL: true,
      NCDT: true,
      IMGNAI: true,
      BCUT: true,
      SNS: true,
      SOUL: true,
      NAVI: true,
      OOKI: true,
      TYPE: true,
      BDP: true,
      LMR: true,
      XRT: true,
      PIB: true,
      AIPAD: true,
      SWASH: true,
      OMAX: true,
      TADA: true,
      LAMB: true,
      GTAI: true,
      EMC: true,
      LITH: true,
      LSS: true,
      SENATE: true,
      NETVR: true,
      PRE: true,
      BRG: true,
      CGV: true,
      MARSH: true,
      ISP: true,
      CHRP: true,
      MOZ: true,
      PBR: true,
      DX: true,
      UFI: true,
      BCUBE: true,
      MBD: true,
      CTI: true,
      EFX: true,
      LUSH: true,
      ROOBEE: true,
      GNY: true,
      MOOV: true,
      GOC: true,
      DERI: true,
      WAM: true,
      LBC: true,
      UNO: true,
      NEURA: true,
      ABOND: true,
      AXIS: true,
      BIRD: true,
      XMON: true,
      IDNA: true,
      AIMX: true,
      AIRI: true,
      TRV: true,
      ALLIN: true,
      MEFA: true,
      CIRUS: true,
      MMAI: true,
      CATHEON: true,
      AIBB: true,
      TRAVA: true,
      OCE: true,
      ARCONA: true,
      NEI: true,
      OJA: true,
      RAZE: true,
      TRL: true,
      "YF-DAI": true,
      CAIR: true,
      UPI: true,
      UBEX: true,
      CNTM: true,
      ASTO: true,
      QUBIC: true,
      GPT: true,
      LAI: true,
      OLAS: true,
      DKS: true,
      WORK: true,
      THR: true,
      XETA: true,
      AIUS: true,
      CORGIAI: true,
      HEART: true,
      GROK: true,
      VIA: true,
      GROW: true,
      AIEPK: true,
      RING: true,
      FAKEAI: true,
      BCAT: true,
      Y8U: true,
      METO: true,
      AIN: true,
      VRD: true,
      HMT: true,
      NEURAL: true,
      MND: true,
      enqAI: true,
      AVTM: true,
      TRACE: true,
      TTM: true,
      DDD: true,
      LAVITA: true,
      ZCN: true,
      WNK: true,
      ROKO: true,
      VRX: true,
      BTO: true,
      BAI: true,
      ASCN: true,
      PAI: true,
      GEMAI: true,
      PALAI: true,
      MOROS: true,
      DHX: true,
      ASTRA: true,
      AIKEK: true,
      TOR: true,
      ORACLE: true,
      "2DAI": true,
      CLBK: true,
      CHAT: true,
      AIMBOT: true,
      NEURONI: true,
      VUZZ: true,
      BUILD: true,
      VRSW: true,
      RAVEN: true,
      KWAI: true,
      ACRIA: true,
      WEBAI: true,
      AION: true,
      KAT: true,
      AITK: true,
      SAN: true,
      DLT: true,
      CND: true,
      DNA: true,
      CPC: true,
      NTK: true,
      SEELE: true,
      HAVY: true,
      EV: true,
      AU: true,
      IAI: true,
      HERA: true,
      USHI: true,
      AIONE: true,
      SAI: true,
      LIZA: true,
      GEMINI: true,
      LNDRY: true,
      BURNIFYAI: true,
      MDX: true,
      INSP: true,
      AIMARKET: true,
      PING: true,
      TIE: true,
      PRA: true,
      DAT: true,
      SPHTX: true,
      CAT: true,
      AIDOC: true,
      INSTAR: true,
      DATX: true,
      LDC: true,
      ADH: true,
      MTC: true,
      DAC: true,
      QBIT: true,
      FOAM: true,
      LML: true,
      ELAMA: true,
      JAR: true,
      CIX100: true,
      SLV: true,
      FAB: true,
      MB: true,
      REL: true,
      ANW: true,
      MBN: true,
      AITRA: true,
      UTU: true,
      RIT20: true,
      TESLF: true,
      MAI: true,
      MOVE: true,
      QUAD: true,
      BRAIN: true,
      PEPES: true,
      rushAI: true,
      MIDAI: true,
      KAE: true,
      CIPHER: true,
      DEFLECT: true,
      DTEC: true,
      WELLCHAIN: true,
      ASI: true,
    }),
    []
  );

  useEffect(() => {
    setLoading(true);
    const fetchCryptos = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_ROUTE_URI}/api/cryptocurrencies`,
          {
            currency: "USD",
            codes: cryptoCodes1.slice(
              (currentPage - 1) * cryptosPerPage,
              cryptosPerPage * currentPage
            ),
            sort: "rank",
            order: "ascending",
            offset: 0,
            limit: 0,
            meta: true,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const cryptos = response.data;

        const updatedFilteredValues = await updateDeltaValues(cryptos);
        setCryptos(({ cryptos, prevCryptoData }) => {
          prevCryptoData = cryptos;
          cryptos = updatedFilteredValues;
          return { cryptos, prevCryptoData };
        });
        setFilteredCryptos(updatedFilteredValues);
        if (currentPage == 1) setTopTrendingCryptos(cryptos.slice(0, 10));
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
      }
      setLoading(false);
    };
    fetchCryptos();

    // Fetch data every 10 seconds
    interval.current = setInterval(fetchCryptos, 9000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval.current);
  }, [currentPage, intervalController]);

  const updateDeltaValues = async (filtered) => {
    const updatedCryptoValues = Promise.all(
      filtered.map(async (crypto, index) => {
        const rowNumber = index + (currentPage - 1) * cryptosPerPage + 1;
        crypto.rank = rowNumber;
        try {
          const data = await axios.post(
            `${process.env.REACT_APP_ROUTE_URI}/api/updateAICryptoDelta`,
            crypto
          );

          return data.data;
        } catch (error) {
          console.error(`Failed to fetch data for ${crypto}:`, error);
          throw error;
        }
      })
    );
    return updatedCryptoValues;
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(order);
    const sorted = [...filteredCryptos].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredCryptos(sorted);
    const sortedPrevCryptos = [...filteredPrevCryptos].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredPrevCryptos(sortedPrevCryptos);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null; // If only one page or no data, don't render pagination

    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (endPage - startPage < pagesToShow - 1) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }

    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {startPage > 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => setCurrentPage(1)}>
                1
              </button>
            </li>
          )}
          {startPage > 2 && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}
          {pages}
          {endPage < totalPages - 1 && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}
          {endPage < totalPages && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          )}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  const displayedCryptos = filteredCryptos;

  return (
    <div className="customLandingContainer mt-5">
      <Helmet>
        <title>
          Smallcap.ai: AI-Driven Insights for Small-Cap Crypto Tokens
        </title>
      </Helmet>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th onClick={() => handleSort("rank")}>Rank</th>
              <th onClick={() => handleSort("name")}>Coin Name</th>
              <th onClick={() => handleSort("deltaDay")}>AI +1D</th>
              <th onClick={() => handleSort("deltaWeek")}>+7D</th>
              <th onClick={() => handleSort("deltaMonth")}>+1M</th>
              <th onClick={() => handleSort("rate")}>Price (USD)</th>
              <th onClick={() => handleSort("volume")}>Volume (24h)</th>
              <th onClick={() => handleSort("cap")}>Market Cap</th>
              <th>Details</th>
              <th>Buy</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center">
                  <Loader />
                </td>
              </tr>
            ) : displayedCryptos.length > 0 ? (
              displayedCryptos.map((crypto, i) => (
                <tr
                  key={crypto.code}
                  onClick={() => navigate(`/${crypto.code}`)}
                >
                  <td>{crypto.rank}</td>
                  <td className="crypto-cell">
                    <img
                      src={crypto.png64}
                      alt={crypto.name}
                      className="inline mr-4 w-4 h-4"
                    />
                    {crypto.name}
                    <span className="inline ml-2">({crypto.code})</span>
                  </td>
                  <td>
                    <CryptoRow
                      toFixed={true}
                      AIValue={true}
                      value={crypto?.delta?.day}
                      prevValue={crypto.rate}
                    />
                  </td>
                  <td>
                    <CryptoRow
                      toFixed={true}
                      AIValue={true}
                      value={crypto?.delta?.week}
                      prevValue={crypto.rate}
                    />
                  </td>
                  <td>
                    <CryptoRow
                      toFixed={true}
                      AIValue={true}
                      value={crypto?.delta?.month}
                      prevValue={crypto.rate}
                    />
                  </td>
                  <td>
                    <CryptoRow
                      rate={true}
                      value={crypto.rate}
                      prevValue={prevCryptoData[i]?.rate}
                    />
                  </td>
                  <td>
                    <CryptoRow
                      value={crypto.volume}
                      prevValue={prevCryptoData[i]?.volume}
                    />
                  </td>
                  <td>
                    <CryptoRow
                      value={crypto.cap}
                      prevValue={prevCryptoData[i]?.cap}
                    />
                  </td>
                  <td>
                    <button className="btn btn-info">AI Report</button>
                  </td>

                  <td className="text-center">
                    {getBuyLink(crypto.code) ? (
                      <div className="d-flex justify-content-center">
                        <a
                          href={getBuyLink(crypto.code)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Buy
                        </a>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-secondary" disabled>
                          N/A
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
};

export default LandingPage;
