import React, { useState } from "react";
import "./Form.css";
import { submitFormData } from "../services/api";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    tokenName: "",
    tokenSymbol: "",
    tokenContractAddress: "",
    blockchainExplorerUrl: "",
    websiteUrl: "",
    technology: "",
    blockchain: "",
    problemSolution: "",
    roadmapMilestones: "",
    whitepaperUrl: "",
    litepaperUrl: "",
    githubUrl: "",
    exchanges: "",
    supply: "",
    tokenDistribution: {
      Founders: "",
      Developers: "",
      Marketing: "",
      Community: "",
      Investors: "",
    },
    vestingSchedules: "",
    useCases: "",
    incentives: "",
    mechanisms: "",
    economicSustainability: "",
    auditReportUrl: "",
    auditSummary: "",
    liquidityLockup: "",
    marketCapitalization: "",
    TeamExpertise: {
      CEO: "",
      CFO: "",
      CTO: "",
      CMO: "",
      Developer: "",
    },
    academicBackground: "",
    twitter: "",
    telegram: "",
    discord: "",
    linkedin: "",
    facebook: "",
    twitch: "",
    tiktok: "",
    socialMediaLinks: "",
    linkTreeLink: "",
    userReviews: "",
    youtubeUrl: "",
    marketingEfforts: "",
    brandIdentity: "",
    targetAudienceReach: "",
    listOfCompetitors: "",
    advantagesDisadvantages: "",
    usp: "",
    focus: "",
    revenueStreams: "",
    modelSustainability: "",
    fundingSources: "",
    keyPartners: "",
    pitchDeck: "",
    additionalInformation: "",
    emailAddress: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle technology checkbox group
    if (type === "checkbox" && name.startsWith("technology")) {
      const updatedTechnologies = checked
        ? [...formData.technology, value]
        : formData.technology.filter((tech) => tech !== value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        technology: updatedTechnologies,
      }));
    }
    // Handle incentives checkbox group
    else if (type === "checkbox" && name.startsWith("incentives")) {
      const updatedIncentives = checked
        ? [...formData.incentives, value]
        : formData.incentives.filter((incentive) => incentive !== value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        incentives: updatedIncentives,
      }));
    }
    // Handle blockchain checkbox group
    else if (type === "checkbox" && name.startsWith("blockchain")) {
      const updatedBlockchains = checked
        ? [...formData.blockchain, value]
        : formData.blockchain.filter((block) => block !== value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        blockchain: updatedBlockchains,
      }));
    }
    // Handle mechanisms checkbox group
    else if (type === "checkbox" && name.startsWith("mechanisms")) {
      const updatedMechanisms = checked
        ? [...formData.mechanisms, value]
        : formData.mechanisms.filter((mechanism) => mechanism !== value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        mechanisms: updatedMechanisms,
      }));
    }
    // Handle token distribution checkboxes
    else if (type === "checkbox" && name.includes("_")) {
      const [role, percentage] = name.split("_");
      setFormData((prevFormData) => ({
        ...prevFormData,
        tokenDistribution: {
          ...prevFormData.tokenDistribution,
          [role]: checked ? percentage : "",
        },
      }));
    }
    // Handle academic background checkboxes and other input
    else if (type === "checkbox" && name === "academicBackground") {
      const updatedAcademicBackground = checked
        ? [...formData.academicBackground, value]
        : formData.academicBackground.filter(
            (background) => background !== value
          );
      setFormData((prevFormData) => ({
        ...prevFormData,
        academicBackground: updatedAcademicBackground,
      }));
    } else if (type === "text" && name === "academicBackgroundOther") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        academicBackgroundOther: value,
      }));
    }
    // Handle Short-Term vs Long-Term Focus checkboxes
    else if (type === "checkbox" && name === "focus") {
      const updatedFocus = checked
        ? [...formData.focus, value]
        : formData.focus.filter((item) => item !== value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        focus: updatedFocus,
      }));
    } else if (type === "text" && name === "focusOther") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        focusOther: value,
      }));
    }
    // Handle revenue streams checkboxes
    else if (type === "checkbox" && name === "revenueStreams") {
      const updatedRevenueStreams = checked
        ? [...formData.revenueStreams, value]
        : formData.revenueStreams.filter((stream) => stream !== value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        revenueStreams: updatedRevenueStreams,
      }));
    }
    // Handle funding sources checkboxes
    else if (type === "checkbox" && name === "fundingSources") {
      const updatedFundingSources = checked
        ? [...formData.fundingSources, value]
        : formData.fundingSources.filter((source) => source !== value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        fundingSources: updatedFundingSources,
      }));
    }
    // Handle radio inputs for Team Expertise
    else if (type === "radio" && name.startsWith("teamExpertise")) {
      const role = name.split("_")[1]; // Extract the role (CEO, CFO, etc.)
      setFormData((prevFormData) => ({
        ...prevFormData,
        teamExpertise: {
          ...prevFormData.teamExpertise,
          [role]: value,
        },
      }));
    }
    // Handle other input fields
    else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ formData });
    formData.user_id = "60d0fe4f5311236168a109ca";
    try {
      const result = await submitFormData(formData);
      navigate("/analysisReport", {
        state: { analysis: result?.data.analysis },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form className="form-container">
      {step === 1 && (
        <div className="form-section">
          <h1>Project Identification</h1>
          <b1>Project Name:</b1>
          <input
            type="text"
            name="projectName"
            placeholder="Your Answer"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
          <b1>Project Description:</b1>
          <textarea
            name="projectDescription"
            placeholder="Your Answer"
            value={formData.projectDescription}
            onChange={handleChange}
            required
          ></textarea>
          <b1>Token Name:</b1>
          <input
            type="text"
            name="tokenName"
            placeholder="Your Answer"
            value={formData.tokenName}
            onChange={handleChange}
            required
          />
          <b1>Token Symbol:</b1>
          <input
            type="text"
            name="tokenSymbol"
            placeholder="Your Answer"
            value={formData.tokenSymbol}
            onChange={handleChange}
            required
          />
          <b1>Token Contract Address:</b1>
          <input
            type="text"
            name="tokenContractAddress"
            placeholder="Your Answer"
            value={formData.tokenContractAddress}
            onChange={handleChange}
            required
          />
          <b1>Blockchain Explorer URL:</b1>
          <input
            type="url"
            name="blockchainExplorerUrl"
            placeholder="Your Answer"
            value={formData.blockchainExplorerUrl}
            onChange={handleChange}
            required
          />
          <b1>Website URL:</b1>
          <input
            type="url"
            name="websiteUrl"
            placeholder="Your Answer"
            value={formData.websiteUrl}
            onChange={handleChange}
            required
          />

          <div className="checkbox-container">
            <b1>Technology:</b1>
            <td></td>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="technology"
                value="DeFi"
                checked={formData.technology.includes("DeFi")}
                onChange={handleChange}
              />
              DeFi
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="technology"
                value="NFTs"
                checked={formData.technology.includes("NFTs")}
                onChange={handleChange}
              />
              NFTs
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="technology"
                value="Blockchain / Web 3.0"
                checked={formData.technology.includes("Blockchain / Web 3.0")}
                onChange={handleChange}
              />
              Blockchain / Web 3.0
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="technology"
                value="Artificial Intelligence"
                checked={formData.technology.includes(
                  "Artificial Intelligence"
                )}
                onChange={handleChange}
              />
              Artificial Intelligence
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="technology"
                value="Gaming"
                checked={formData.technology.includes("Gaming")}
                onChange={handleChange}
              />
              Gaming
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="technology"
                value="Metaverse"
                checked={formData.technology.includes("Metaverse")}
                onChange={handleChange}
              />
              Metaverse
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="technology"
                value="Others"
                checked={formData.technology.includes("Others")}
                onChange={handleChange}
              />
              Others
            </label>
            {formData.technology.includes("Others") && (
              <input
                type="text"
                name="technologyOther"
                placeholder="Please specify"
                value={formData.technologyOther}
                onChange={handleChange}
              />
            )}
            <td></td>

            <b1>Blockchain:</b1>
            <td></td>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="blockchain"
                value="Ethereum"
                checked={formData.blockchain.includes("Ethereum")}
                onChange={handleChange}
              />
              Ethereum
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="blockchain"
                value="Binance Smartchain"
                checked={formData.blockchain.includes("Binance Smartchain")}
                onChange={handleChange}
              />
              Binance Smartchain
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="blockchain"
                value="Solana"
                checked={formData.blockchain.includes("Solana")}
                onChange={handleChange}
              />
              Solana
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="blockchain"
                value="Polygon"
                checked={formData.blockchain.includes("Polygon")}
                onChange={handleChange}
              />
              Polygon
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="blockchain"
                value="Bitcoin"
                checked={formData.blockchain.includes("Bitcoin")}
                onChange={handleChange}
              />
              Bitcoin
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="blockchain"
                value="Arbitrum"
                checked={formData.blockchain.includes("Arbitrum")}
                onChange={handleChange}
              />
              Arbitrum
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="blockchain"
                value="Basechain"
                checked={formData.blockchain.includes("Basechain")}
                onChange={handleChange}
              />
              Basechain
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="blockchain"
                value="Other"
                checked={formData.blockchain.includes("Other")}
                onChange={handleChange}
              />
              Other
            </label>
            {formData.blockchain.includes("Other") && (
              <input
                type="text"
                name="blockchainOther"
                placeholder="Please specify"
                value={formData.blockchainOther}
                onChange={handleChange}
                required
              />
            )}
          </div>

          <b1>Problem Statement & Proposed Solution</b1>
          <b2>
            What is the problem that you are solving and its proposed solution?
          </b2>
          <textarea
            name="problemSolution"
            placeholder="Your Answer"
            value={formData.problemSolution}
            onChange={handleChange}
            required
          ></textarea>
          <b1>Roadmap & Key Milestones:</b1>
          <textarea
            name="roadmapMilestones"
            placeholder="Your Answer"
            value={formData.roadmapMilestones}
            onChange={handleChange}
            required
          ></textarea>
          <b1>Whitepaper URL:</b1>
          <input
            type="url"
            name="whitepaperUrl"
            placeholder="Your Answer"
            value={formData.whitepaperUrl}
            onChange={handleChange}
            required
          />
          <b1>Litepaper URL:</b1>
          <input
            type="url"
            name="litepaperUrl"
            placeholder="Your Answer"
            value={formData.litepaperUrl}
            onChange={handleChange}
            required
          />
          <b1>GitHub URL:</b1>
          <input
            type="url"
            name="githubUrl"
            placeholder="Your Answer"
            value={formData.githubUrl}
            onChange={handleChange}
            required
          />
          <div className="form-navigation">
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="form-section">
          <h1>Token Details</h1>

          <b1>List of Exchanges with details (DEX & CEX):</b1>
          <textarea
            name="exchanges"
            placeholder="Your Answer"
            value={formData.exchanges}
            onChange={handleChange}
            required
          ></textarea>
          <b1>Total supply and Circulating supply:</b1>
          <input
            type="text"
            name="supply"
            placeholder="Your Answer"
            value={formData.supply}
            onChange={handleChange}
            required
          />

          <div class="community-engagement-table">
            <b1>Token Distribution</b1>
            <b2>Describe the token distribution:</b2>
            <div className="token-distribution-table">
              <table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Less than 10%</th>
                    <th>11-25%</th>
                    <th>26-50%</th>
                    <th>51-75%</th>
                    <th>76-100%</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Founders */}
                  <tr>
                    <td>Founders</td>
                    <td>
                      <input
                        type="checkbox"
                        name="Founders_lessThan10"
                        checked={
                          formData.tokenDistribution.Founders === "lessThan10"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Founders_11to25"
                        checked={
                          formData.tokenDistribution.Founders === "11to25"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Founders_26to50"
                        checked={
                          formData.tokenDistribution.Founders === "26to50"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Founders_51to75"
                        checked={
                          formData.tokenDistribution.Founders === "51to75"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Founders_76to100"
                        checked={
                          formData.tokenDistribution.Founders === "76to100"
                        }
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* Developers */}
                  <tr>
                    <td>Developers</td>
                    <td>
                      <input
                        type="checkbox"
                        name="Developers_lessThan10"
                        checked={
                          formData.tokenDistribution.Developers === "lessThan10"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Developers_11to25"
                        checked={
                          formData.tokenDistribution.Developers === "11to25"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Developers_26to50"
                        checked={
                          formData.tokenDistribution.Developers === "26to50"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Developers_51to75"
                        checked={
                          formData.tokenDistribution.Developers === "51to75"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Developers_76to100"
                        checked={
                          formData.tokenDistribution.Developers === "76to100"
                        }
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* Marketing */}
                  <tr>
                    <td>Marketing</td>
                    <td>
                      <input
                        type="checkbox"
                        name="Marketing_lessThan10"
                        checked={
                          formData.tokenDistribution.Marketing === "lessThan10"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Marketing_11to25"
                        checked={
                          formData.tokenDistribution.Marketing === "11to25"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Marketing_26to50"
                        checked={
                          formData.tokenDistribution.Marketing === "26to50"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Marketing_51to75"
                        checked={
                          formData.tokenDistribution.Marketing === "51to75"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Marketing_76to100"
                        checked={
                          formData.tokenDistribution.Marketing === "76to100"
                        }
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* Community */}
                  <tr>
                    <td>Community</td>
                    <td>
                      <input
                        type="checkbox"
                        name="Community_lessThan10"
                        checked={
                          formData.tokenDistribution.Community === "lessThan10"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Community_11to25"
                        checked={
                          formData.tokenDistribution.Community === "11to25"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Community_26to50"
                        checked={
                          formData.tokenDistribution.Community === "26to50"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Community_51to75"
                        checked={
                          formData.tokenDistribution.Community === "51to75"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Community_76to100"
                        checked={
                          formData.tokenDistribution.Community === "76to100"
                        }
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* Investors */}
                  <tr>
                    <td>Investors</td>
                    <td>
                      <input
                        type="checkbox"
                        name="Investors_lessThan10"
                        checked={
                          formData.tokenDistribution.Investors === "lessThan10"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Investors_11to25"
                        checked={
                          formData.tokenDistribution.Investors === "11to25"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Investors_26to50"
                        checked={
                          formData.tokenDistribution.Investors === "26to50"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Investors_51to75"
                        checked={
                          formData.tokenDistribution.Investors === "51to75"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Investors_76to100"
                        checked={
                          formData.tokenDistribution.Investors === "76to100"
                        }
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <b1>Vesting Schedules</b1>
          <b2>Describe the token vesting schedules:</b2>
          <textarea
            name="vestingSchedules"
            placeholder="Your Answer"
            value={formData.vestingSchedules}
            onChange={handleChange}
            required
          ></textarea>
          <b1>Use Cases</b1>
          <b2>List the use cases of the token:</b2>
          <input
            type="text"
            name="useCases"
            placeholder="Your Answer"
            value={formData.useCases}
            onChange={handleChange}
            required
          />

          <div className="checkbox-container">
            <td></td>
            <b1>Incentives:</b1>
            <td></td>
            <div className="checkbox-label">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="incentives"
                  value="Staking Rewards"
                  checked={formData.incentives.includes("Staking Rewards")}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                Staking Rewards
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="incentives"
                  value="Yield Farming"
                  checked={formData.incentives.includes("Yield Farming")}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                Yield Farming
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="incentives"
                  value="Governance Voting"
                  checked={formData.incentives.includes("Governance Voting")}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                Governance Voting
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="incentives"
                  value="Access to Services"
                  checked={formData.incentives.includes("Access to Services")}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                Access to Services
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="incentives"
                  value="Other"
                  checked={formData.incentives.includes("Other")}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                Other
              </label>
              {formData.incentives.includes("Other") && (
                <input
                  type="text"
                  name="incentivesOther"
                  placeholder="Please specify"
                  value={formData.incentivesOther}
                  onChange={handleChange}
                  className="other-input"
                />
              )}
            </div>
          </div>

          <div className="checkbox-container">
            <b1>Mechanisms:</b1>
            <td></td>
            <div className="checkbox-label">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="mechanisms"
                  value="Deflationary"
                  checked={formData.mechanisms.includes("Deflationary")}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                Deflationary
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="mechanisms"
                  value="Inflationary"
                  checked={formData.mechanisms.includes("Inflationary")}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                Inflationary
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="mechanisms"
                  value="Stablecoin"
                  checked={formData.mechanisms.includes("Stablecoin")}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                Stablecoin
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="mechanisms"
                  value="Utility Token"
                  checked={formData.mechanisms.includes("Utility Token")}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                Utility Token
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="mechanisms"
                  value="Security Token"
                  checked={formData.mechanisms.includes("Security Token")}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                Security Token
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="mechanisms"
                  value="Other"
                  checked={formData.mechanisms.includes("Other")}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                Other
              </label>
              {formData.mechanisms.includes("Other") && (
                <input
                  type="text"
                  name="mechanismsOther"
                  placeholder="Please specify"
                  value={formData.mechanismsOther}
                  onChange={handleChange}
                  className="other-input"
                />
              )}
            </div>
          </div>

          <h2>Economic Sustainability:</h2>
          <div className="economic-sustainability-scale">
            <div className="checkbox-group">
              <label className="sustainability-checkbox">
                <span
                  className="checkbox-label"
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  Very Unsustainable
                </span>
                <input
                  type="checkbox"
                  name="economicSustainability"
                  value="1"
                  checked={formData.economicSustainability === "1"}
                  onChange={handleChange}
                  required
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">1</span>
              </label>
              <label className="sustainability-checkbox">
                <input
                  type="checkbox"
                  name="economicSustainability"
                  value="2"
                  checked={formData.economicSustainability === "2"}
                  onChange={handleChange}
                  required
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">2</span>
              </label>
              <label className="sustainability-checkbox">
                <input
                  type="checkbox"
                  name="economicSustainability"
                  value="3"
                  checked={formData.economicSustainability === "3"}
                  onChange={handleChange}
                  required
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">3</span>
              </label>
              <label className="sustainability-checkbox">
                <input
                  type="checkbox"
                  name="economicSustainability"
                  value="4"
                  checked={formData.economicSustainability === "4"}
                  onChange={handleChange}
                  required
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">4</span>
              </label>
              <label className="sustainability-checkbox">
                <input
                  type="checkbox"
                  name="economicSustainability"
                  value="5"
                  checked={formData.economicSustainability === "5"}
                  onChange={handleChange}
                  required
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">5</span>
                <span
                  className="checkbox-label"
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  Very Sustainable
                </span>
              </label>
            </div>
          </div>

          <b1>Audit Report URL:</b1>
          <input
            type="url"
            name="auditReportUrl"
            placeholder="Your Answer"
            value={formData.auditReportUrl}
            onChange={handleChange}
            required
          />
          <b1>Audit Summary:</b1>
          <textarea
            name="auditSummary"
            placeholder="Your Answer"
            value={formData.auditSummary}
            onChange={handleChange}
            required
          ></textarea>
          <b1>Total Liquidity and lockup duration:</b1>
          <input
            type="text"
            name="liquidityLockup"
            placeholder="Your Answer"
            value={formData.liquidityLockup}
            onChange={handleChange}
            required
          />
          <b1>Current Market Capitalization:</b1>
          <input
            type="text"
            name="marketCapitalization"
            placeholder="Your Answer"
            value={formData.marketCapitalization}
            onChange={handleChange}
            required
          />
          <div className="form-navigation">
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="form-section">
          <h1>Team Background & Experience</h1>
          <b1>Team Expertise: </b1>
          <div class="community-engagement-table">
            <div className="team-experience-table">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Beginner</th>
                    <th>Intermediate</th>
                    <th>Advanced</th>
                    <th>Expert</th>
                  </tr>
                </thead>
                <tbody>
                  {/* CEO/Founder */}
                  <tr>
                    <td>CEO</td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CEO"
                        value="Beginner"
                        checked={formData.teamExpertise?.CEO === "Beginner"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CEO"
                        value="Intermediate"
                        checked={formData.teamExpertise?.CEO === "Intermediate"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CEO"
                        value="Advanced"
                        checked={formData.teamExpertise?.CEO === "Advanced"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CEO"
                        value="Expert"
                        checked={formData.teamExpertise?.CEO === "Expert"}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* CFO */}
                  <tr>
                    <td>CFO</td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CFO"
                        value="Beginner"
                        checked={formData.teamExpertise?.CFO === "Beginner"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CFO"
                        value="Intermediate"
                        checked={formData.teamExpertise?.CFO === "Intermediate"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CFO"
                        value="Advanced"
                        checked={formData.teamExpertise?.CFO === "Advanced"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CFO"
                        value="Expert"
                        checked={formData.teamExpertise?.CFO === "Expert"}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* CTO */}
                  <tr>
                    <td>CTO</td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CTO"
                        value="Beginner"
                        checked={formData.teamExpertise?.CTO === "Beginner"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CTO"
                        value="Intermediate"
                        checked={formData.teamExpertise?.CTO === "Intermediate"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CTO"
                        value="Advanced"
                        checked={formData.teamExpertise?.CTO === "Advanced"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CTO"
                        value="Expert"
                        checked={formData.teamExpertise?.CTO === "Expert"}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* CMO */}
                  <tr>
                    <td>CMO</td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CMO"
                        value="Beginner"
                        checked={formData.teamExpertise?.CMO === "Beginner"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CMO"
                        value="Intermediate"
                        checked={formData.teamExpertise?.CMO === "Intermediate"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CMO"
                        value="Advanced"
                        checked={formData.teamExpertise?.CMO === "Advanced"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_CMO"
                        value="Expert"
                        checked={formData.teamExpertise?.CMO === "Expert"}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* Developer */}
                  <tr>
                    <td>Developer</td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_Developer"
                        value="Beginner"
                        checked={
                          formData.teamExpertise?.Developer === "Beginner"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_Developer"
                        value="Intermediate"
                        checked={
                          formData.teamExpertise?.Developer === "Intermediate"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_Developer"
                        value="Advanced"
                        checked={
                          formData.teamExpertise?.Developer === "Advanced"
                        }
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="teamExpertise_Developer"
                        value="Expert"
                        checked={formData.teamExpertise?.Developer === "Expert"}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <b1>Team Roles with LinkedIn profiles:</b1>
          <textarea
            name="Team_Roles"
            placeholder="Your Answer"
            value={formData.TeamRoles}
            onChange={handleChange}
            required
          ></textarea>

          <div className="checkbox-container">
            <div className="checkbox-label">
              <table>
                <thead>
                  <b1>Academic Background:</b1>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          name="academicBackground"
                          value="Bachelor's Degree"
                          checked={formData.academicBackground.includes(
                            "Bachelor's Degree"
                          )}
                          onChange={handleChange}
                          className="checkbox-input"
                        />
                        Bachelor's Degree
                      </label>
                    </td>
                  </tr>

                  <td>
                    <label>
                      <input
                        type="checkbox"
                        name="academicBackground"
                        value="Master's Degree"
                        checked={formData.academicBackground.includes(
                          "Master's Degree"
                        )}
                        onChange={handleChange}
                        className="checkbox-input"
                      />
                      Master's Degree
                    </label>
                  </td>

                  <tr>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          name="academicBackground"
                          value="PhD"
                          checked={formData.academicBackground.includes("PhD")}
                          onChange={handleChange}
                          className="checkbox-input"
                        />
                        PhD
                      </label>
                    </td>
                  </tr>

                  <td>
                    <label>
                      <input
                        type="checkbox"
                        name="academicBackground"
                        value="Certificates"
                        checked={formData.academicBackground.includes(
                          "Certificates"
                        )}
                        onChange={handleChange}
                        className="checkbox-input"
                      />
                      Certificates
                    </label>
                  </td>

                  <tr>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          name="academicBackground"
                          value="Other"
                          checked={formData.academicBackground.includes(
                            "Other"
                          )}
                          onChange={handleChange}
                          className="checkbox-input"
                        />
                        Other:
                      </label>
                      {formData.academicBackground.includes("Other") && (
                        <input
                          type="text"
                          name="academicBackgroundOther"
                          value={formData.academicBackgroundOther}
                          onChange={handleChange}
                          placeholder="Please specify"
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="form-navigation">
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="form-section">
          <h1>Social Media & Marketing</h1>

          <b1>Community Engagement on Social Media</b1>
          <div className="community-engagement-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>0 - 1K</th>
                  <th>1K - 5K</th>
                  <th>5K - 20K</th>
                  <th>20K - 100K</th>
                  <th>Greater than 100K</th>
                </tr>
              </thead>
              <tbody>
                {/* Twitter */}
                <tr>
                  <td>Twitter</td>
                  <td>
                    <input
                      type="radio"
                      name="twitter"
                      value="0-1K"
                      checked={formData.twitter === "0-1K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="twitter"
                      value="1K-5K"
                      checked={formData.twitter === "1K-5K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="twitter"
                      value="5K-20K"
                      checked={formData.twitter === "5K-20K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="twitter"
                      value="20K-100K"
                      checked={formData.twitter === "20K-100K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="twitter"
                      value=">100K"
                      checked={formData.twitter === ">100K"}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                {/* Telegram */}
                <tr>
                  <td>Telegram</td>
                  <td>
                    <input
                      type="radio"
                      name="telegram"
                      value="0-1K"
                      checked={formData.telegram === "0-1K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="telegram"
                      value="1K-5K"
                      checked={formData.telegram === "1K-5K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="telegram"
                      value="5K-20K"
                      checked={formData.telegram === "5K-20K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="telegram"
                      value="20K-100K"
                      checked={formData.telegram === "20K-100K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="telegram"
                      value=">100K"
                      checked={formData.telegram === ">100K"}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                {/* Discord */}
                <tr>
                  <td>Discord</td>
                  <td>
                    <input
                      type="radio"
                      name="discord"
                      value="0-1K"
                      checked={formData.discord === "0-1K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="discord"
                      value="1K-5K"
                      checked={formData.discord === "1K-5K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="discord"
                      value="5K-20K"
                      checked={formData.discord === "5K-20K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="discord"
                      value="20K-100K"
                      checked={formData.discord === "20K-100K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="discord"
                      value=">100K"
                      checked={formData.discord === ">100K"}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                {/* LinkedIn */}
                <tr>
                  <td>LinkedIn</td>
                  <td>
                    <input
                      type="radio"
                      name="linkedin"
                      value="0-1K"
                      checked={formData.linkedin === "0-1K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="linkedin"
                      value="1K-5K"
                      checked={formData.linkedin === "1K-5K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="linkedin"
                      value="5K-20K"
                      checked={formData.linkedin === "5K-20K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="linkedin"
                      value="20K-100K"
                      checked={formData.linkedin === "20K-100K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="linkedin"
                      value=">100K"
                      checked={formData.linkedin === ">100K"}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                {/* Facebook */}
                <tr>
                  <td>Facebook</td>
                  <td>
                    <input
                      type="radio"
                      name="facebook"
                      value="0-1K"
                      checked={formData.facebook === "0-1K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="facebook"
                      value="1K-5K"
                      checked={formData.facebook === "1K-5K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="facebook"
                      value="5K-20K"
                      checked={formData.facebook === "5K-20K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="facebook"
                      value="20K-100K"
                      checked={formData.facebook === "20K-100K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="facebook"
                      value=">100K"
                      checked={formData.facebook === ">100K"}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                {/* Twitch */}
                <tr>
                  <td>Twitch</td>
                  <td>
                    <input
                      type="radio"
                      name="twitch"
                      value="0-1K"
                      checked={formData.twitch === "0-1K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="twitch"
                      value="1K-5K"
                      checked={formData.twitch === "1K-5K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="twitch"
                      value="5K-20K"
                      checked={formData.twitch === "5K-20K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="twitch"
                      value="20K-100K"
                      checked={formData.twitch === "20K-100K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="twitch"
                      value=">100K"
                      checked={formData.twitch === ">100K"}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                {/* TikTok */}
                <tr>
                  <td>TikTok</td>
                  <td>
                    <input
                      type="radio"
                      name="tiktok"
                      value="0-1K"
                      checked={formData.tiktok === "0-1K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="tiktok"
                      value="1K-5K"
                      checked={formData.tiktok === "1K-5K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="tiktok"
                      value="5K-20K"
                      checked={formData.tiktok === "5K-20K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="tiktok"
                      value="20K-100K"
                      checked={formData.tiktok === "20K-100K"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="tiktok"
                      value=">100K"
                      checked={formData.tiktok === ">100K"}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <b1 htmlFor="socialMediaLinks">Provide Social Media Links:</b1>
          <b2>Telegram, Discord etc.</b2>
          <input
            type="text"
            id="socialMediaLinks"
            name="socialMediaLinks"
            value={formData.socialMediaLinks}
            onChange={handleChange}
            placeholder="Your Answer"
            required
          />

          <b1 htmlFor="linkTree">Provide Link Tree Link:</b1>
          <input
            type="text"
            id="linkTree"
            name="linkTree"
            value={formData.linkTree}
            onChange={handleChange}
            placeholder="Your Answer"
            required
          />

          <b1>YouTube URL (if any):</b1>
          <div className="additional-links">
            <input
              type="text"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
              placeholder="Your Answer"
            />
          </div>
          <td></td>

          <h2>User Reviews</h2>
          <div className="economic-sustainability-scale">
            <div className="checkbox-group">
              <label className="sustainability-checkbox">
                <span
                  className="checkbox-label"
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  Highly Recommended
                </span>
                <input
                  type="checkbox"
                  name="userReviews"
                  value="1"
                  checked={formData.userReviews === "1"}
                  onChange={handleChange}
                  required
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">1</span>
              </label>
              <label className="sustainability-checkbox">
                <input
                  type="checkbox"
                  name="userReviews"
                  value="2"
                  checked={formData.userReviews === "2"}
                  onChange={handleChange}
                  required
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">2</span>
              </label>
              <label className="sustainability-checkbox">
                <input
                  type="checkbox"
                  name="userReviews"
                  value="3"
                  checked={formData.userReviews === "3"}
                  onChange={handleChange}
                  required
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">3</span>
              </label>
              <label className="sustainability-checkbox">
                <input
                  type="checkbox"
                  name="userReviews"
                  value="4"
                  checked={formData.userReviews === "4"}
                  onChange={handleChange}
                  required
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">4</span>
              </label>
              <label className="sustainability-checkbox">
                <input
                  type="checkbox"
                  name="userReviews"
                  value="5"
                  checked={formData.userReviews === "5"}
                  onChange={handleChange}
                  required
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">5</span>
                <span
                  className="checkbox-label"
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  Not Recommended
                </span>
              </label>
            </div>

            <td></td>

            <h2>Marketing Efforts</h2>
            <div className="economic-sustainability-scale">
              <div className="checkbox-group">
                <label className="sustainability-checkbox">
                  <span
                    className="checkbox-label"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  >
                    Very Effective
                  </span>
                  <input
                    type="checkbox"
                    name="marketingEfforts"
                    value="1"
                    checked={formData.marketingEfforts === "1"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">1</span>
                </label>
                <label className="sustainability-checkbox">
                  <input
                    type="checkbox"
                    name="marketingEfforts"
                    value="2"
                    checked={formData.marketingEfforts === "2"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">2</span>
                </label>
                <label className="sustainability-checkbox">
                  <input
                    type="checkbox"
                    name="marketingEfforts"
                    value="3"
                    checked={formData.marketingEfforts === "3"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">3</span>
                </label>
                <label className="sustainability-checkbox">
                  <input
                    type="checkbox"
                    name="marketingEfforts"
                    value="4"
                    checked={formData.marketingEfforts === "4"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">4</span>
                </label>
                <label className="sustainability-checkbox">
                  <input
                    type="checkbox"
                    name="marketingEfforts"
                    value="5"
                    checked={formData.marketingEfforts === "5"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">5</span>
                  <span
                    className="checkbox-label"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  >
                    Very Ineffective
                  </span>
                </label>
              </div>
            </div>

            <h2>Brand Identity</h2>
            <div className="economic-sustainability-scale">
              <div
                className="checkbox-group"
                style={{ display: "flex", alignItems: "center" }}
              >
                <span
                  className="checkbox-label"
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  Worst
                </span>
                <label
                  className="sustainability-checkbox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "5px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="brandIdentity"
                    value="1"
                    checked={formData.brandIdentity === "1"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">1</span>
                </label>
                <label
                  className="sustainability-checkbox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "5px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="brandIdentity"
                    value="2"
                    checked={formData.brandIdentity === "2"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">2</span>
                </label>
                <label
                  className="sustainability-checkbox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "5px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="brandIdentity"
                    value="3"
                    checked={formData.brandIdentity === "3"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">3</span>
                </label>
                <label
                  className="sustainability-checkbox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "5px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="brandIdentity"
                    value="4"
                    checked={formData.brandIdentity === "4"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">4</span>
                </label>
                <label
                  className="sustainability-checkbox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "5px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="brandIdentity"
                    value="5"
                    checked={formData.brandIdentity === "5"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">5</span>
                </label>
                <label
                  className="sustainability-checkbox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "5px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="brandIdentity"
                    value="6"
                    checked={formData.brandIdentity === "6"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">6</span>
                </label>
                <label
                  className="sustainability-checkbox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "5px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="brandIdentity"
                    value="7"
                    checked={formData.brandIdentity === "7"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">7</span>
                </label>
                <label
                  className="sustainability-checkbox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "5px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="brandIdentity"
                    value="8"
                    checked={formData.brandIdentity === "8"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">8</span>
                </label>
                <label
                  className="sustainability-checkbox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "5px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="brandIdentity"
                    value="9"
                    checked={formData.brandIdentity === "9"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">9</span>
                </label>
                <label
                  className="sustainability-checkbox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "5px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="brandIdentity"
                    value="10"
                    checked={formData.brandIdentity === "10"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">10</span>
                </label>
                <span
                  className="checkbox-label"
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  Impressive
                </span>
              </div>
            </div>

            <h2>Target Audience Reach</h2>
            <div className="economic-sustainability-scale">
              <div className="checkbox-group">
                <label className="sustainability-checkbox">
                  <span
                    className="checkbox-label"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  >
                    Very Good
                  </span>
                  <input
                    type="checkbox"
                    name="targetAudienceReach"
                    value="1"
                    checked={formData.targetAudienceReach === "1"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">1</span>
                </label>
                <label className="sustainability-checkbox">
                  <input
                    type="checkbox"
                    name="targetAudienceReach"
                    value="2"
                    checked={formData.targetAudienceReach === "2"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">2</span>
                </label>
                <label className="sustainability-checkbox">
                  <input
                    type="checkbox"
                    name="targetAudienceReach"
                    value="3"
                    checked={formData.targetAudienceReach === "3"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">3</span>
                </label>
                <label className="sustainability-checkbox">
                  <input
                    type="checkbox"
                    name="targetAudienceReach"
                    value="4"
                    checked={formData.targetAudienceReach === "4"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">4</span>
                </label>
                <label className="sustainability-checkbox">
                  <input
                    type="checkbox"
                    name="targetAudienceReach"
                    value="5"
                    checked={formData.targetAudienceReach === "5"}
                    onChange={handleChange}
                    required
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">5</span>
                  <span
                    className="checkbox-label"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  >
                    Very Poor
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="form-navigation">
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="form-section">
          <h1> Competitive Analysis</h1>
          <b1>List of Competitors:</b1>
          <div className="Your Answer">
            <input
              type="text"
              name="listOfCompetitors"
              value={formData.listOfCompetitors}
              onChange={handleChange}
              placeholder="Your Answer"
            />
          </div>

          <b1>Advantages/Disadvantages:</b1>
          <b2>
            {" "}
            Does the project have clear advantages/disadvantages over
            competitors?
          </b2>
          <div className="Advantages/Disadvantages:">
            <input
              type="text"
              name="advantagesDisadvantages"
              value={formData.advantagesDisadvantages}
              onChange={handleChange}
              placeholder="Your Answer"
            />
          </div>

          <b1>Unique Selling Propositions (USPs): </b1>
          <b2> Identify the USPs of the project. </b2>
          <div className="Unique Selling Propositions (USPs):">
            <input
              type="text"
              name="usp"
              value={formData.usp}
              onChange={handleChange}
              placeholder="Your Answer"
            />
          </div>

          <div className="checkbox-container">
            <b1>Short-Term vs Long-Term Focus:</b1>
            <td></td>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="radio"
                name="focus"
                value="Short-Term Gains"
                checked={formData.focus === "Short-Term Gains"}
                onChange={handleChange}
              />
              Short-Term Gains
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="radio"
                name="focus"
                value="Long-Term Sustainability"
                checked={formData.focus === "Long-Term Sustainability"}
                onChange={handleChange}
              />
              Long-Term Sustainability
            </label>
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="radio"
                name="focus"
                value="Other"
                checked={formData.focus === "Other"}
                onChange={handleChange}
              />
              Other
            </label>
            {formData.focus === "Other" && (
              <input
                type="text"
                name="focusOther"
                placeholder="Please specify"
                value={formData.focusOther}
                onChange={handleChange}
              />
            )}
          </div>
          <div className="form-navigation">
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="form-section">
          <h1> Business Model & Revenue Generation</h1>

          <div className="form-section">
            <b1>Revenue Streams:</b1>
            <b2> What are the revenue streams for the project? </b2>
            <div className="checkbox-container">
              <div className="checkbox-label">
                <label>
                  <input
                    type="checkbox"
                    name="revenueStreams"
                    value="Transaction fees (gas fees)"
                    checked={formData.revenueStreams.includes(
                      "Transaction fees (gas fees)"
                    )}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Transaction fees (gas fees)
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="revenueStreams"
                    value="Staking rewards"
                    checked={formData.revenueStreams.includes(
                      "Staking rewards"
                    )}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Staking rewards
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="revenueStreams"
                    value="Yield farming fees"
                    checked={formData.revenueStreams.includes(
                      "Yield farming fees"
                    )}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Yield farming fees
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="revenueStreams"
                    value="Service fees"
                    checked={formData.revenueStreams.includes("Service fees")}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Service fees
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="revenueStreams"
                    value="Licensing fees"
                    checked={formData.revenueStreams.includes("Licensing fees")}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Licensing fees
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="revenueStreams"
                    value="Partnerships and collaborations"
                    checked={formData.revenueStreams.includes(
                      "Partnerships and collaborations"
                    )}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Partnerships and collaborations
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="revenueStreams"
                    value="Enterprise solutions"
                    checked={formData.revenueStreams.includes(
                      "Enterprise solutions"
                    )}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Enterprise solutions
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="revenueStreams"
                    value="Developer tools and APIs"
                    checked={formData.revenueStreams.includes(
                      "Developer tools and APIs"
                    )}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Developer tools and APIs
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="revenueStreams"
                    value="Token appreciation"
                    checked={formData.revenueStreams.includes(
                      "Token appreciation"
                    )}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Token appreciation
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="revenueStreams"
                    value="Other"
                    checked={formData.revenueStreams.includes("Other")}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Other:
                </label>
                {formData.revenueStreams.includes("Other") && (
                  <input
                    type="text"
                    name="revenueStreamsOther"
                    value={formData.revenueStreamsOther}
                    onChange={handleChange}
                    placeholder="Please specify other revenue streams"
                    className="checkbox-input"
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <h2>Model Sustainability and Feasibility</h2>
            <div className="economic-sustainability-scale">
              <div className="checkbox-group">
                <label className="sustainability-checkbox">
                  <span className="checkbox-label">Very Poor</span>
                  <input
                    type="checkbox"
                    name="modelSustainability"
                    value="1"
                    checked={formData.modelSustainability === "1"}
                    onChange={handleChange}
                    required
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">1</span>
                </label>
                <label className="sustainability-checkbox">
                  <input
                    type="checkbox"
                    name="modelSustainability"
                    value="2"
                    checked={formData.modelSustainability === "2"}
                    onChange={handleChange}
                    required
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">2</span>
                </label>
                <label className="sustainability-checkbox">
                  <input
                    type="checkbox"
                    name="modelSustainability"
                    value="3"
                    checked={formData.modelSustainability === "3"}
                    onChange={handleChange}
                    required
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">3</span>
                </label>
                <label className="sustainability-checkbox">
                  <input
                    type="checkbox"
                    name="modelSustainability"
                    value="4"
                    checked={formData.modelSustainability === "4"}
                    onChange={handleChange}
                    required
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">4</span>
                </label>
                <label className="sustainability-checkbox">
                  <input
                    type="checkbox"
                    name="modelSustainability"
                    value="5"
                    checked={formData.modelSustainability === "5"}
                    onChange={handleChange}
                    required
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">5 Very Good</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <b1>Funding Sources:</b1>
            <b2> What are the funding sources for the project?</b2>
            <div className="checkbox-container">
              <div className="checkbox-label">
                <label>
                  <input
                    type="checkbox"
                    name="fundingSources"
                    value="ICO"
                    checked={formData.fundingSources.includes("ICO")}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  ICO
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="fundingSources"
                    value="Private Sale"
                    checked={formData.fundingSources.includes("Private Sale")}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Private Sale
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="fundingSources"
                    value="Venture Capital"
                    checked={formData.fundingSources.includes(
                      "Venture Capital"
                    )}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Venture Capital
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="fundingSources"
                    value="Grants"
                    checked={formData.fundingSources.includes("Grants")}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Grants
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="fundingSources"
                    value="Angel Investor"
                    checked={formData.fundingSources.includes("Angel Investor")}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Angel Investor
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="fundingSources"
                    value="Other"
                    checked={formData.fundingSources.includes("Other")}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Other:
                </label>
                {formData.fundingSources.includes("Other") && (
                  <input
                    type="text"
                    name="fundingSourcesOther"
                    value={formData.fundingSourcesOther}
                    onChange={handleChange}
                    placeholder="Please specify other funding sources"
                    className="checkbox-input"
                  />
                )}
              </div>
            </div>
          </div>
          <b1>
            List of Key Partners and describe any collaborations with
            established players:
          </b1>
          <textarea
            name="keyPartners"
            placeholder="Your Answer"
            value={formData.keyPartners}
            onChange={handleChange}
            required
          ></textarea>
          <b1>Pitch Deck URL:</b1>
          <input
            type="url"
            name="pitchDeck"
            placeholder="Your Answer"
            value={formData.pitchDeck}
            onChange={handleChange}
            required
          />
          <b1>Anything Else We Should Know?</b1>
          <textarea
            name="additionalInformation"
            placeholder="Your Answer"
            value={formData.additionalInformation}
            onChange={handleChange}
            required
          ></textarea>
          <b1>Email Address:</b1>
          <b2>Enter your email to get complete analysis report.</b2>
          <input
            type="email"
            name="emailAddress"
            placeholder="Your Answer"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />
          <div className="form-navigation">
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default App;
