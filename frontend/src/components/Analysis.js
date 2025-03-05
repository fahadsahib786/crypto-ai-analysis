
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./LoaderComponent";
import { formatAnalysis } from "../utils/commonFunc";

const AnalysisPage = () => {
  const { code } = useParams(); 
  const [analysisObj, setAnalysisObj] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_ROUTE_URI}/api/getAnalysisByCode`,
          {
            tokenCode:code,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let analysisObj = response?.data.data

        if (analysisObj) {
          //analysisObj.analysis = formatAnalysis(analysisObj.analysis);
          setAnalysisObj(analysisObj);
        }
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      }
      setLoading(false);
    };

    fetchAnalysis();

  }, [code]);

  if (loading) {
    return <Loader />;
  }


  return (
    <div className="customLandingContainer mt-5 analysis-page">
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="text-center">
            <h1>Analysis for {analysisObj?.token_name}</h1>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: analysisObj?.analysis }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;

