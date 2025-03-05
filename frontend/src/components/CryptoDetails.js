import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import Datecomponent from "./Datecomponent";
import { formatAnalysis } from "../utils/commonFunc";
import Loader from "./LoaderComponent";
import "./CryptoDetails.css";
import CryptoRow from "./CryptoRow";
import { Modal, Button } from "react-bootstrap";
import { 
  FacebookShareButton, 
  FacebookIcon, 
  TwitterShareButton, 
  TwitterIcon, 
  LinkedinShareButton, 
  LinkedinIcon, 
  WhatsappShareButton, 
  WhatsappIcon 
} from "react-share";
import toast from 'react-hot-toast'
import { AuthContext } from "../context/AuthContext";
import DynamicResponseRenderer from "./DynamicResponseRenderer";

const CryptoDetails = () => {
  const { code } = useParams(); // Retrieve the coin code from the URL
  const [{ crypto, prevCrypto }, setCrypto] = useState({ crypto: {}, prevCrypto: {} });
  const [analysis, setAnalysis] = useState(null);
  const [analysisObj, setAnalysisObj] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState("")
  const [emailAddress,setEmailAdress] = useState("");
  const [editAnalysis,setEditAnalysis] = useState(false)
  const { user } = useContext(AuthContext);
  let copyTimeoutRef = useRef(null);

  const handleOpen = () => {
    setEmailAdress("")
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_ROUTE_URI}/api/cryptoDetails`,
          {
            currency: "USD",
            code: code,
            meta: true,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        setCrypto(({ crypto, prevCrypto }) => {
          prevCrypto = crypto;
          crypto = response.data;
          return { crypto, prevCrypto };
        });
      } catch (error) {
        console.error("Error fetching cryptocurrency details:", error);
      }
    };

    let interval; // Declare interval here

    fetchCryptoDetails();

    interval = setInterval(() => {
      fetchCryptoDetails();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [code]);

  const fetchExistingAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_ROUTE_URI}/api/getAnalysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenName: crypto.name }),
      });
      const res = await response.json();
      if (res.data.analysis) {
        setAnalysisObj(res.data);
        setAnalysis(res.data.analysis);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    
    if (crypto?.name) fetchExistingAnalysis();
  }, [crypto?.name]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const initiateAnalysis = async () => {
    crypto.code = code;

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_ROUTE_URI}/api/submitCryptoData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(crypto),
        }
      );
      const res = await response.json();
      if (res.data) {
        const parsedAnalysis = typeof res.data.analysis === 'string'
          ? JSON.parse(res.data.analysis)
          : res.data.analysis;
        setAnalysis(parsedAnalysis);
        setAnalysisObj(res.data);
      }
    } catch (error) {
      console.error("Error fetching cryptocurrency details:", error);
    }
    setLoading(false);
  };

  const initiateSecondAnalysis = async () => {
    crypto.code = code;
    setLoading2(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_ROUTE_URI}/api/submitCryptoData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(crypto),
        }
      );
      const res = await response.json();
      if (res.data) {
        const parsedAnalysis = typeof res.data.analysis === 'string'
          ? JSON.parse(res.data.analysis)
          : res.data.analysis;
        setAnalysis(parsedAnalysis);
        setAnalysisObj(res.data);
      }
    } catch (error) {
      console.error("Error fetching cryptocurrency details:", error);
    }
    setLoading2(false);
  };

  if (!crypto) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const shareLink = `${window.location.origin}/analysis/${code}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopySuccess("Copied..!");
      copyTimeoutRef.current = setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  const isvalidEmailAddress = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  const handleSendingEmail = async () => {
      if(!isvalidEmailAddress(emailAddress)){
        toast("Enter Valid Emailaddress")
        return
      }

      const analysisStr = Array.isArray(analysis) ? analysis.join('') : analysis;

      const resp = await axios.post(`${process.env.REACT_APP_ROUTE_URI}/api/sendAnalysisEmail`,{
        to:emailAddress,
        analysisStr
      })

      if(resp.data.message == 'Success'){
        toast("Email Sent Succesfully")
      }else{
        toast("Please try After Sometime")
      }
  }

  const editAnalysisFunc = () => {
    setEditAnalysis(true)

  }

 const SaveAnalysisFunc = async () => {
  setEditAnalysis(false);

  const { userId } = user;
  const { token_code } = analysisObj;

  try {
    const response = await axios.post(`${process.env.REACT_APP_ROUTE_URI}/api/updateAnalysisBytokenCode`, {
      userID: userId,
      tokenCode: token_code,
      analysisData: analysis,
    });

    if (response.data) {
      toast.success("Analysis Updated Successfully");
    } else {
      toast.warn("Update failed. Please try again.");
      fetchExistingAnalysis();
    }
  } catch (error) {
    console.error("Error updating analysis:", error);
    toast.error("An error occurred while updating the analysis. Please try again later.");
    fetchExistingAnalysis();
  }
}

  return (
    <div className="container mt-5 crypto-details">
      <Helmet>
        <title>{`${crypto.name} (${code}) Analysis - Smallcap.ai`}</title>
        <meta name="description" content={`Detailed analysis and insights for ${crypto.name} (${code}). Get comprehensive AI-driven analysis, market trends, and more.`} />
        <meta property="og:title" content={`${crypto.name} (${crypto.code}) Analysis - Smallcap.ai`} />
        <meta property="og:description" content={`Detailed analysis and insights for ${crypto.name} (${code}). Get comprehensive AI-driven analysis, market trends, and more.`} />
        <meta property="og:image" content={crypto.png64 || 'default-image-url.png'} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={shareLink} />
        <meta name="twitter:title" content={`${crypto.name} (${code}) Analysis - Smallcap.ai`} />
        <meta name="twitter:description" content={`Detailed analysis and insights for ${crypto.name} (${code}). Get comprehensive AI-driven analysis, market trends, and more.`} />
        <meta name="twitter:image" content={crypto.png64 || 'default-image-url.png'} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="text-center">
            <div style={{ display: "block ruby" }}>
              <img
                src={crypto.png32}
                alt={crypto.name}
                className="inline center img-fluid mb-4"
                style={{ width: '32px', height: '32px' }}
              />
              <h1 className="ml-2">{crypto.name} ({code})</h1>
            </div>

            <div className="d-flex flex-wrap justify-content-center mt-3">
              {crypto.links && crypto.links.website && (
                <a
                  href={crypto.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mx-2 mt-2"
                >
                  Website
                </a>
              )}
              {crypto.links && crypto.links.whitepaper && (
                <a
                  href={crypto.links.whitepaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary mx-2 mt-2"
                >
                  Whitepaper
                </a>
              )}
              {crypto.links && crypto.links.reddit && (
                <a
                  href={crypto.links.reddit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info mx-2 mt-2"
                >
                  Reddit
                </a>
              )}
              {crypto.links && crypto.links.twitter && (
                <a
                  href={crypto.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info mx-2 mt-2"
                >
                  Twitter
                </a>
              )}
              {crypto.links && crypto.links.discord && (
                <a
                  href={crypto.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info mx-2 mt-2"
                >
                  Discord
                </a>
              )}
            </div>

            <hr />

            {loading ? analysisObj ? null : <div className="loader-center mt-5"><Loader style={{ transform: 'scale(1.5)' }} /></div> : null}

            {analysisObj ? (
              <>
                <div className="text-center">
                  {/* <button
                    className="btn btn-primary mr-2 mb-2"
                    onClick={initiateAnalysis}
                  >
                    Get Latest AI Analysis
                  </button> */}
                </div>
                {loading ? (
                  <div>
                    <Loader style={{ transform: 'scale(1.5)' }} />
                  </div>
                ) : (
                  <div className="text-center overflow-hidden">
                  {user?.role === 'admin' ? editAnalysis? <button
                      className="btn btn-primary mt-3 mr-2 mb-2"
                      onClick={SaveAnalysisFunc}
                    >Save Analysis</button>:
                    <button
                      className="btn btn-primary mt-3 mr-2 mb-2"
                      onClick={editAnalysisFunc}
                    >Edit Analysis</button>
                    : null}
                    {editAnalysis ? 
                    <div>
                      
                    <textarea
                    value={analysis}
                    onChange={(e) => setAnalysis(e.target.value)}
                    
                    /> 
                    </div>
                    :
                    <div>
                    {analysis ? (
                      <DynamicResponseRenderer response={analysis} />
                    ) : (
                      <p>Error: Unable to render analysis data. Please try again later.</p>
                    )}
                    </div>
                    }
                    <br />
                    <br />
                    <br />
                  </div>
                )}
              </>
            ) : null}

            {loading ? null : analysis ? (
              <>
                {loading2 ? <div className="mt-5"><Loader style={{ transform: 'scale(1.5)' }} /></div> :
                  <>
                    {
                      analysisObj.count < 19 ?
                      <button
                      className="btn btn-primary mt-3 mr-2 mb-2"
                      onClick={initiateSecondAnalysis}
                    >
                      Expand Analysis
                    </button>
                    :null
                    }
                    <Button className="btn btn-primary mt-3 mr-2 mb-2" disabled={analysis ? false : true} onClick={handleOpen}>
                      Share Analysis
                    </Button>
                  </>
                }
                <div className="mt-5" >
                  <strong>Last Analysis Done At: <br /> </strong>{" "}
                  <Datecomponent isoDate={analysisObj.createdAt} />
                </div>
              </>
            ) : (
              <>
                <p>No analysis data available.</p>
                <button
                  className="btn btn-primary mr-2 mb-2"
                  onClick={initiateAnalysis}
                >
                  Get AI Analysis
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <hr />
      <h1 className="text-center mt-10 mb-4">
        {crypto.name} ({crypto.symbol})
      </h1>

      <br /><br />
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered">
            <tbody>
              <tr className="bg-light">
                <th className="py-2 px-4">Rank</th>
                <td className="py-2 px-4">{crypto.rank}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">Rate (USD)</th>
                <td className="py-2 px-4 border-b border-gray-300">
                  <CryptoRow rate={true} value={crypto.rate} prevValue={prevCrypto?.rate} />
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4">Volume (24h)</th>
                <td className="py-2 px-4">
                  <CryptoRow value={crypto.volume} prevValue={prevCrypto?.volume} />
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4">Market Cap</th>
                <td className="py-2 px-4">
                  <CryptoRow value={crypto.cap} prevValue={prevCrypto?.cap} />
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4">All-Time High (USD)</th>
                <td className="py-2 px-4">
                  ${crypto.allTimeHighUSD ? crypto.allTimeHighUSD.toFixed(2) : "N/A"}
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4">Circulating Supply</th>
                <td className="py-2 px-4">
                  {crypto.circulatingSupply ? `${crypto.circulatingSupply.toLocaleString()}` : "N/A"}
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4">Total Supply</th>
                <td className="py-2 px-4">
                  {crypto.totalSupply ? `${crypto.totalSupply.toLocaleString()}` : "N/A"}
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4">Max Supply</th>
                <td className="py-2 px-4">
                  {crypto.maxSupply ? `${crypto.maxSupply.toLocaleString()}` : "N/A"}
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4">Exchanges</th>
                <td className="py-2 px-4">{crypto.exchanges}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Markets</th>
                <td className="py-2 px-4">{crypto.markets}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Pairs</th>
                <td className="py-2 px-4">{crypto.pairs}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Age (days)</th>
                <td className="py-2 px-4">{crypto.age}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Delta (1h)</th>
                <td className="py-2 px-4">
                  <CryptoRow value={crypto?.delta?.hour} prevValue={prevCrypto?.delta?.hour} cryptoDetailPage={true} />
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4">Delta (24h)</th>
                <td className="py-2 px-4">
                  <CryptoRow value={crypto?.delta?.day} prevValue={prevCrypto?.delta?.day} cryptoDetailPage={true} />
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4">Delta (7d)</th>
                <td className="py-2 px-4">
                  <CryptoRow value={crypto?.delta?.day} prevValue={prevCrypto?.delta?.day} cryptoDetailPage={true} />
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4">Delta (30d)</th>
                <td className="py-2 px-4">
                  <CryptoRow value={crypto?.delta?.month} prevValue={prevCrypto?.delta?.month} cryptoDetailPage={true} />
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4">Delta (90d)</th>
                <td className="py-2 px-4">
                  <CryptoRow value={crypto?.delta?.quarter} prevValue={prevCrypto?.delta?.quarter} cryptoDetailPage={true} />
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4">Delta (1y)</th>
                <td className="py-2 px-4">
                  <CryptoRow value={crypto?.delta?.year} prevValue={prevCrypto?.delta?.year} cryptoDetailPage={true} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share Analysis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Share this link to view the analysis:</p>
          <input
            type="text"
            className="form-control"
            value={shareLink}
            readOnly
          />
          <div className="d-flex justify-between">
            <Button className="mt-3" variant="primary" onClick={copyToClipboard}>
              {copySuccess ? "Copied" : "Copy Link"}
            </Button>
            <Link to={`/analysis/${code}`} target="_blank">
              <Button className="mt-3" variant="primary">
                Open Analysis in New Tab
              </Button>
            </Link>
          </div>

          <div className="mt-3" >
          <input
            type="text"
            className="form-control"
            value={emailAddress}
            onChange={(e) => setEmailAdress(e.target.value)}
            placeholder="Email Address"
            />
          <Button className="mt-3" variant="primary" onClick={handleSendingEmail} >
                Send Analysis to Email
          </Button>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <FacebookShareButton url={shareLink} quote={`${crypto.name} Analysis - Smallcap.ai`} summary={`Detailed analysis and insights for ${crypto.name}. Get comprehensive AI-driven analysis, market trends, and more.`}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareLink} title={`${crypto.name} Analysis - Smallcap.ai`} summary={`Detailed analysis and insights for ${crypto.name}. Get comprehensive AI-driven analysis, market trends, and more.`}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareLink} title={`${crypto.name} Analysis - Smallcap.ai`} summary={`Detailed analysis and insights for ${crypto.name}. Get comprehensive AI-driven analysis, market trends, and more.`}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <WhatsappShareButton url={shareLink} title={`${crypto.name} Analysis - Smallcap.ai`} summary={`Detailed analysis and insights for ${crypto.name}. Get comprehensive AI-driven analysis, market trends, and more.`}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CryptoDetails;
