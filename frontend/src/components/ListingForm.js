import React, { useState } from 'react';
import './Form.css';
import { emailFormData, submitFormData } from '../services/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    coinName: '',
    coinSymbol: '',
    coinDescription: '',
    blockchainExplorerURL: '',
    dateOfListing: '',
  });

 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle technology checkbox group
    if (type === 'checkbox' && name.startsWith('technology')) {
        const updatedTechnologies = checked
            ? [...formData.technology, value]
            : formData.technology.filter((tech) => tech !== value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            technology: updatedTechnologies,
        }));
    }
    // Handle incentives checkbox group
    else if (type === 'checkbox' && name.startsWith('incentives')) {
        const updatedIncentives = checked
            ? [...formData.incentives, value]
            : formData.incentives.filter((incentive) => incentive !== value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            incentives: updatedIncentives,
        }));
    }
    // Handle blockchain checkbox group
    else if (type === 'checkbox' && name.startsWith('blockchain')) {
        const updatedBlockchains = checked
            ? [...formData.blockchain, value]
            : formData.blockchain.filter((block) => block !== value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            blockchain: updatedBlockchains,
        }));
    }
    // Handle mechanisms checkbox group
    else if (type === 'checkbox' && name.startsWith('mechanisms')) {
        const updatedMechanisms = checked
            ? [...formData.mechanisms, value]
            : formData.mechanisms.filter((mechanism) => mechanism !== value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            mechanisms: updatedMechanisms,
        }));
    }
    // Handle token distribution checkboxes
    else if (type === 'checkbox' && name.includes('_')) {
        const [role, percentage] = name.split('_');
        setFormData((prevFormData) => ({
            ...prevFormData,
            tokenDistribution: {
                ...prevFormData.tokenDistribution,
                [role]: checked ? percentage : '',
            },
        }));
    }
    // Handle academic background checkboxes and other input
    else if (type === 'checkbox' && name === 'academicBackground') {
        const updatedAcademicBackground = checked
            ? [...formData.academicBackground, value]
            : formData.academicBackground.filter((background) => background !== value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            academicBackground: updatedAcademicBackground,
        }));
    } else if (type === 'text' && name === 'academicBackgroundOther') {
        setFormData((prevFormData) => ({
            ...prevFormData,
            academicBackgroundOther: value,
        }));
    }
    // Handle Short-Term vs Long-Term Focus checkboxes
    else if (type === 'checkbox' && name === 'focus') {
        const updatedFocus = checked
            ? [...formData.focus, value]
            : formData.focus.filter((item) => item !== value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            focus: updatedFocus,
        }));
    } else if (type === 'text' && name === 'focusOther') {
        setFormData((prevFormData) => ({
            ...prevFormData,
            focusOther: value,
        }));
    }
    // Handle revenue streams checkboxes
    else if (type === 'checkbox' && name === 'revenueStreams') {
        const updatedRevenueStreams = checked
            ? [...formData.revenueStreams, value]
            : formData.revenueStreams.filter((stream) => stream !== value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            revenueStreams: updatedRevenueStreams,
        }));
    }
    // Handle funding sources checkboxes
    else if (type === 'checkbox' && name === 'fundingSources') {
        const updatedFundingSources = checked
            ? [...formData.fundingSources, value]
            : formData.fundingSources.filter((source) => source !== value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            fundingSources: updatedFundingSources,
        }));
    }
    // Handle radio inputs for Team Expertise
    else if (type === 'radio' && name.startsWith('teamExpertise')) {
        const role = name.split('_')[1]; // Extract the role (CEO, CFO, etc.)
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
    const submitElement = document.getElementById("submit-button");
    const successElement = document.getElementById("success-message");
    
    console.log({formData})
    try {
      await emailFormData("Advertisement Form", formData);
      if (submitElement.style.display === "block") {
        submitElement.style.display = "none";
      }
      if (successElement.style.display === "none") {
        successElement.style.display = "block";
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className="form-container">
    <div className="form-section">
        <h1>Listing Form</h1>
          <b1>Full Name:</b1>
          <input type="text" name="fullName" value={formData.fullName} placeholder="Your Answer" onChange={handleChange} required />
          <b1>Email Address:</b1>
          <input type="text" name="emailAddress" value={formData.emailAddress} placeholder="Your Answer" onChange={handleChange} required />
          <b1>Coin Name:</b1>
          <input type="text" name="coinName" value={formData.coinName} placeholder="Your Answer" onChange={handleChange} required />
          <b1>Coin Symbol:</b1>
          <input type="text" name="coinSymbol" value={formData.coinSymbol} placeholder="Your Answer" onChange={handleChange} required />
          <b1>Coin Description:</b1>
          <textarea name="coinDescription" value={formData.coinDescription} placeholder="Your Answer" onChange={handleChange} required></textarea>
          <b1>Blockchain Explorer URL:</b1>
          <input type="url" name="blockchainExplorerURL" value={formData.blockchainExplorerURL} placeholder="Your Answer" onChange={handleChange} required />
          <b1>Date of Listing:</b1>
          <input type="url" name="dateOfListing" value={formData.dateOfListing} placeholder="Your Answer" onChange={handleChange} required />

          <div className="form-navigation" id="submit-button" style={{ display: "block" }}>
            <button type="button" onClick={handleSubmit}>Submit</button>
          </div>
          <div className="mt-3 py-3 rounded-2 bg-success fs-5 fw-semibold" id="success-message" style={{ display: "none" }}>Form Submitted</div>
        </div>
</form>

  );
}

export default App;