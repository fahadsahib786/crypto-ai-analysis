import fetch from 'node-fetch';
import AnalysisModel from '../models/AnalysisModel.js'; // Adjust the path as needed
import generatePDF from '../utils/pdfGenerator.js';
import { analyzeFormData, submitFormData } from './formController.js';
import dotenv from 'dotenv';
dotenv.config();
// Fetch analysis by ID
export const getAnalysisById = async (req, res) => {
  const { id } = req.params;
  try {
    const analysis = await AnalysisModel.findById(id);
    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    res.json(analysis);
  } catch (error) {
    console.error('Error fetching analysis by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const analyseCryptoData = async (req, res) => {
  try {
    const savedAnalysis = await submitFormData(req, res);

    // Ensure analysis is serialized as JSON if it's an object
    if (typeof savedAnalysis.analysis === 'object') {
      savedAnalysis.analysis = JSON.stringify(savedAnalysis.analysis);
    }

    return res.status(201).send({ data: savedAnalysis });
  } catch (error) {
    console.error('Error analyzing crypto data:', error.message);

    if (!res.headersSent) {
      return res.status(500).json({
        message: 'Failed to analyze data.',
        error: error.message,
      });
    }
  }
};

export const getAnalysisByTokenName = async (req, res) => {
  const { tokenName } = req.body;

  try {
    const analysisObj = await AnalysisModel.findOne({ token_name: tokenName })
      .sort({ createdAt: -1 })
      .exec();

    if (!analysisObj) {
      return res.status(404).json({ message: "No analysis found for the token name." });
    }

    // Parse the JSON analysis before sending the response
    const parsedAnalysis = JSON.parse(analysisObj.analysis);
    res.status(200).send({ data: parsedAnalysis, message: "Success" });
  } catch (error) {
    console.error("Error fetching analysis by token name:", error.message);
    res.status(500).json({ message: "Server error while fetching analysis." });
  }
};


export const getAnalysisByTokenCode = async (req, res) => {
  const { tokenCode } = req.body;
  console.log(tokenCode);

  try {
    const analysisObj = await AnalysisModel.findOne({ token_code: tokenCode })
      .sort({ createdAt: -1 })
      .exec();

    if (analysisObj) {
      // Parse analysis if it's stored as a string
      if (typeof analysisObj.analysis === 'string') {
        analysisObj.analysis = JSON.parse(analysisObj.analysis);
      }

      return res.status(201).send({ data: analysisObj, message: 'success' });
    }

    return res.status(404).send({ message: 'Analysis not found' });
  } catch (error) {
    console.error('Error fetching analysis by token code:', error);
    res.status(500).send({ message: 'Error fetching analysis' });
  }
};


export const updateAnalysisBytokenCode = async (req, res) => {
  const { userID, tokenCode, analysisData } = req.body;

  if (!userID || !tokenCode || !analysisData) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const existingAnalysis = await AnalysisModel.findOne({ token_code: tokenCode });

    if (existingAnalysis) {
      existingAnalysis.analysis = analysisData;
      const updatedAnalysis = await existingAnalysis.save();

      res.status(200).send({ data: updatedAnalysis, message: "Analysis updated successfully" });
    } else {
      res.status(404).send({ message: "Analysis document not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating analysis" });
  }
};
