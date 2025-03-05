import React, { useEffect, useState } from 'react';
import Form from '../components/Form'; // Assume this handles the multistep form
import AnalysisResult from '../components/AnalysisResult';
import { submitFormData } from '../services/api';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Dapp = () => {
  const [analysis, setAnalysis] = useState('');
  const navigate = useNavigate();


  return (
    <div className="customLandingContainer">
      <Form  />
      {analysis && <AnalysisResult analysis={analysis} />}
    </div>
  );
};

export default Dapp;
