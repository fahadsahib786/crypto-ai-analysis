// frontend/src/components/AnalysisResult.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const AnalysisResult = () => {
  const location = useLocation();
  const { analysis } = location.state || { analysis: null };
  return (
    <div>
      <h2>AI Analysis Result</h2>
      <div
        dangerouslySetInnerHTML={{ __html: analysis }}
      />
    </div>
  );
};

export default AnalysisResult;
