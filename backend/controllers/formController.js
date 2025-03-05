// import dotenv from 'dotenv';
// import fetch from 'node-fetch';
// import nodemailer from 'nodemailer';
// import FormData1 from '../models/FormData.js';
// import AnalysisModel from '../models/AnalysisModel.js';
// import mongoose from 'mongoose';
// import generatePDF from '../utils/pdfGenerator.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { promises as fsp } from 'fs';
// import { promptArray } from '../utils/commonFunc.js';
// import ejs from 'ejs';
// import fs from 'fs';

// dotenv.config();
// // Define __dirname for ES6 modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // In-memory store for conversation history
// const conversationStore = {};

// export const analyseSubmittedFormData = async (req, res) => {
//   const savedAnalysis = await submitFormData(req, res);
//   res.status(201).send({ data: savedAnalysis });
// };

// export const submitFormData = async (req, res) => {
//   let form;
//   try {
//     if(req.body.emailAddress){
//       const newFormData = new FormData1(req.body);
//       form = await newFormData.save();

//     }    
//     // Initialize conversation history for the new project
//    /*  let projectId;
//     console.log(`${req.body} 228`)
//     console.log(`submitFormData - Initializing conversation for project ID: ${projectId}`);
//     conversationStore[projectId] = [
//       { role: 'system', content: 'You are an experienced Cryptocurrency analyst with over 15 years of expertise in blockchain technology, financial markets, and AI-driven analysis. Your role is to provide in-depth, accurate, and unbiased evaluations of cryptocurrency projects. Your analysis should cover technical, financial, and community aspects, using a structured and professional approach. You will also ensure the output is visually appealing and easy to understand, utilizing charts, graphs, and tables as necessary.' },
//     ]; */
//     // Call analyzeFormData after saving the form data
//     const savedAnalysis = await analyzeFormData(req.body, form?._id);
//     // Call sendAnalysisEmail to send the analysis via email
//     if(req.body.emailAddress) await sendAnalysisEmail(req.body.emailAddress, savedAnalysis.analysis)
//     return savedAnalysis
//   } catch (error) {
//     console.error('Error submitting form data:', error);
//     res.status(400).json({ message: error.message });
//   }
// };
// const analyzeFormData = async (formData, form_id) => {
//  /*  if (!projectId) {
//     throw new Error('Project ID is not provided');
//   }
//   if (!conversationStore[projectId]) {
//     throw new Error(`No conversation found for project ID: ${projectId}`);
//   } */
//   const nonEmptyFields = Object.entries(formData).reduce((acc, [key, value]) => {
//     if (value) acc[key] = value;
//     return acc;
//   }, {});

//   let existingAnalysis = await AnalysisModel.findOne({ token_code: nonEmptyFields.code }).sort({ createdAt: -1 }).exec();

//   const prompt1 = 
//   `
// Analyze this small-cap token project. Be as critical as you can be, question the validity of everything, and always speak the truth without exaggeration. Provide as much crucial detail as possible, ensuring each section you analyze has a detailed description with evidence if possible. When giving your response, wrap it in a div tag and use Tailwind CSS and JavaScript to make the response colorful and attractive. Use different styles, bars, and tables for a structured and professional output. Ensure proper margins, paddings, and use different colors to highlight important text. Keep the response short and compact, not exceeding 4096 tokens.

// Project Details:

// ${Object.entries(nonEmptyFields).map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${value}`).join('\n')}
  
//   `
//   let newCount = existingAnalysis?.count + 1 || 0
//   const prompt2 = promptArray[newCount]

//   const prompt = prompt1 + prompt2

//   try {
//     // Append new user message to the conversation history
//     let conversationStore = [];
//     conversationStore.push({ role: 'user', content: prompt });
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'gpt-4o',
//         messages:conversationStore, //conversationStore[projectId] Send the conversation history
//         max_tokens: 4096,
//       }),
//     });
//     const data = await response.json();
//     if (!data.choices || data.choices.length === 0) {
//       console.error('No choices returned from OpenAI API:', data); // Log the problematic response
//       throw new Error('No choices returned from OpenAI API');
//     }
//     const analysis = data.choices[0].message.content.trim();
//     // Extract rating and justification
//     const ratingMatch = analysis.match(/Rating:\s*(\d+)/i);
//     const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : null;
//     const ratingJustification = analysis.match(/Rating:\s*\d+\/100\s*([^]+?)\s*(?=\n|<)/i)?.[1] || '';
//     // Append the assistant's response to the conversation history
//     //conversationStore[projectId].push({ role: 'assistant', content: analysis });
//     // Generate PDF
//     const pdfFileName = `insight_${Math.floor(Math.random() * 1000000)}.pdf`;
//     const pdfDirectory = path.join(__dirname, '..', 'backend', 'pdfs');
//     // Ensure the directory exists
//     if (!fs.existsSync(pdfDirectory)) {
//       fs.mkdirSync(pdfDirectory, { recursive: true });
//     }
//     const pdfFilePath = path.join(pdfDirectory, pdfFileName);
//     await generatePDF(analysis, pdfFilePath);
//     // Use regex to capture the first numerical value after the word "Score"
//     const scoreMatch = analysis.match(/Score:\s*(\d+)/i);
//     const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;
//     // Store the analysis in the database
//     const savedAnalysis = await storeAnalysisInDatabase(
//       formData.user_id,
//       form_id,
//       nonEmptyFields.name,
//       nonEmptyFields.code,
//       analysis,
//       score,
//       pdfFileName,
//       newCount
//     );
//     return savedAnalysis;
//   } catch (error) {
//     console.error('Error fetching data from OpenAI API:', error);
//     throw new Error(error);
//   }
// };
// const storeAnalysisInDatabase = async (
// userId,
// form_id,
// tokenName,
// tokenCode,
// analysis,
// score,
// pdfFileName,
// newCount
// ) => {
// try {
//   let existingAnalysisDoc = await AnalysisModel.findOne({ token_name: tokenName });
//   if (existingAnalysisDoc) {
//     existingAnalysisDoc.analysis += analysis;
//     existingAnalysisDoc.count = newCount
//     const updatedAnalysisDoc = await existingAnalysisDoc.save();
//     return updatedAnalysisDoc;
//   }
//   const analysisData = new AnalysisModel({
//     user_id: mongoose.Types.ObjectId(userId),
//     form_id: form_id ?  mongoose.Types.ObjectId(form_id): null,
//     token_name: tokenName,
//     token_code: tokenCode,
//     analysis: analysis,
//     score: score,
//     analysis_file_link: pdfFileName,
//     count:newCount,
//     createdAt: new Date(), // Placeholder if you want to generate a PDF or other file later
//   });
//   const savedAnalysis = await analysisData.save();
//   console.log('Analysis saved to database successfully');
//   return savedAnalysis;
// } catch (error) {
//   console.error('Error saving analysis to database:', error);
//   throw new Error('Error saving analysis to database');
// }
// };
// export { analyzeFormData };

// const sendAnalysisEmail = async (email, analysis) => {
// let transporter = nodemailer.createTransport({
//   host: 'smtp-relay.brevo.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_SERVICE_USER,
//     pass: process.env.EMAIL_SERVICE_PASS,
//   },
// });
// let mailOptions = {
//   from: process.env.SENDER_EMAIL_ADDRESS,
//   to: email,
//   subject: 'Token Analysis Report',
//   text: analysis,
// };
// return new Promise((resolve, reject) => {
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       reject('Error sending email: ' + error.toString());
//     } else {
//       console.log(`Email sent: ${info.response}`);
//       resolve('Email sent: ' + info.response);
//     }
//   });
// });
// };



// const readHtmlFile = async (filePath) => {
//   try {
//     const htmlString = await fsp.readFile(filePath, 'utf-8');
//     return htmlString;
//   } catch (error) {
//     return error;
//   }
// }

// const generateEmail = async (data) => {
//   try {
//     const html = await ejs.renderFile('template.ejs', data);
//     return html;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const emailFormData = async (req, res) => {
//   const data = req.body;
//   const html = await generateEmail(data);
//   const transporter = nodemailer.createTransport({
//     host: 'smtp-relay.brevo.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_SERVICE_USER,
//       pass: process.env.EMAIL_SERVICE_PASS,
//     },
//   })
//   const mailOptions = {
//     from: process.env.SENDER_EMAIL_ADDRESS,
//     to: "admin@smallcap.ai",
//     subject: 'Testing Form Submission',
//     html: html
//   }
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       res.status(500);
//     } else {
//       res.status(200).json({ message: "Email sent" })
//     }
//   })
// }

import dotenv from "dotenv";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import FormData1 from "../models/FormData.js";
import AnalysisModel from "../models/AnalysisModel.js";
import mongoose from "mongoose";
import generatePDF from "../utils/pdfGenerator.js";
import path from "path";
import { fileURLToPath } from "url";
import { promptArray } from "../utils/commonFunc.js";
import fs from "fs";
import ejs from "ejs";

dotenv.config();

// Define __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate critical environment variables
if (!process.env.OPENAI_API_KEY || !process.env.EMAIL_SERVICE_USER || !process.env.EMAIL_SERVICE_PASS) {
  throw new Error("Missing required environment variables. Check your .env file.");
}

// Analyze submitted form data and respond
export const analyseSubmittedFormData = async (req, res) => {
  try {
    const savedAnalysis = await submitFormData(req, res);
    res.status(201).send({ data: savedAnalysis });
  } catch (error) {
    console.error("Error analyzing submitted form data:", error.message);
    res.status(500).json({ message: "Failed to analyze data." });
  }
};

// Submit form data for analysis
export const submitFormData = async (req, res) => {
  try {
    let form;
    if (req.body.emailAddress) {
      const newFormData = new FormData1(req.body);
      form = await newFormData.save();
    }

    const savedAnalysis = await analyzeFormData(req.body, form?._id);

    if (req.body.emailAddress) {
      await sendAnalysisEmail(req.body.emailAddress, savedAnalysis.analysis);
    }

    return savedAnalysis;
  } catch (error) {
    console.error("Error submitting form data:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Analyze form data with OpenAI
export const analyzeFormData = async (formData, form_id) => {
  const nonEmptyFields = Object.entries(formData).reduce((acc, [key, value]) => {
    if (value) acc[key] = value;
    return acc;
  }, {});

  const existingAnalysis = await AnalysisModel.findOne({ token_code: nonEmptyFields.code })
    .sort({ createdAt: -1 })
    .exec();

  const newCount = existingAnalysis?.count + 1 || 0;
  const prompt = generatePrompt(nonEmptyFields, promptArray[newCount]);

  try {
    const response = await fetchOpenAI(prompt);
    const newAnalysis = extractAnalysisFromResponse(response);

    let fullAnalysis = newAnalysis;
    let score = null;

    if (existingAnalysis) {
      // Append new analysis to the existing analysis
      const existingAnalysisParsed = JSON.parse(existingAnalysis.analysis); // Ensure existing analysis is valid JSON
      fullAnalysis = [...existingAnalysisParsed, newAnalysis];
    } else {
      // Extract score only for the first analysis
      score = extractScoreFromAnalysis(newAnalysis);
      fullAnalysis = [newAnalysis]; // Wrap in an array for consistent structure
    }

    const serializedAnalysis = JSON.stringify(fullAnalysis, null, 2); // Serialize as valid JSON
    const pdfFileName = await generateAnalysisPDF(serializedAnalysis);

    const savedAnalysis = await storeAnalysisInDatabase(
      formData.user_id,
      form_id,
      nonEmptyFields.name,
      nonEmptyFields.code,
      serializedAnalysis,
      score,
      pdfFileName,
      newCount
    );

    return savedAnalysis;
  } catch (error) {
    console.error("Error analyzing form data:", error.message);
    throw new Error("Failed to fetch analysis from OpenAI.");
  }
};


// Generate the OpenAI prompt
const generatePrompt = (nonEmptyFields, additionalPrompt) => {
  const basePrompt = `
    Analyze this small-cap token project critically. Ensure your response is valid JSON and contains no trailing text after the JSON object.

    Project Details:
    ${Object.entries(nonEmptyFields)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}: ${value}`)
      .join("\n")}
  `;

  return basePrompt + additionalPrompt;
};

// Fetch analysis from OpenAI API
const fetchOpenAI = async (prompt, retries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 4096,
        }),
      });

      if (response.status === 429) { // Too Many Requests
        console.warn(`Rate limited. Retrying after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
        continue;
      }

      if (!response.ok) {
        throw new Error(`OpenAI API Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.choices || data.choices.length === 0) {
        throw new Error("No choices returned from OpenAI API.");
      }

      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error(`OpenAI API Error on attempt ${attempt}:`, error.message);
      if (attempt === retries) {
        console.error("Max retries exhausted.");
      }
    }
  }

  console.error("OpenAI API failed to return a response after retries.");
  return null; // Explicitly return null after failure
};


// Extract analysis from OpenAI response
const extractAnalysisFromResponse = (response) => {
  try {
    return JSON.parse(response); // Parse the raw response into JSON
  } catch (error) {
    console.error("Error parsing JSON from OpenAI response:", error);
    throw new Error("Invalid JSON format in OpenAI response.");
  }
};

// Extract score from analysis
const extractScoreFromAnalysis = (analysis) => {
  try {
    if (typeof analysis === "string") {
      analysis = JSON.parse(analysis);
    }

    if (analysis?.overallRating !== undefined) {
      return parseInt(analysis.overallRating, 10);
    } else {
      console.warn("Overall rating not found in analysis.");
      return null; // Return null if the score is missing
    }
  } catch (error) {
    console.error("Error extracting score from analysis:", error.message);
    throw new Error("Failed to extract score from analysis.");
  }
};



// Generate PDF for analysis
const generateAnalysisPDF = async (analysis) => {
  const pdfFileName = `insight_${Math.floor(Math.random() * 1000000)}.pdf`;
  const pdfDirectory = path.join(__dirname, "..", "backend", "pdfs");

  if (!fs.existsSync(pdfDirectory)) {
    fs.mkdirSync(pdfDirectory, { recursive: true });
  }

  const pdfFilePath = path.join(pdfDirectory, pdfFileName);
  await generatePDF(analysis, pdfFilePath);

  return pdfFileName;
};

// Store analysis in the database
const storeAnalysisInDatabase = async (userId, form_id, tokenName, tokenCode, analysis, score, pdfFileName, newCount) => {
  try {
    let existingAnalysisDoc = await AnalysisModel.findOne({ token_name: tokenName });

    if (existingAnalysisDoc) {
      // Append to existing analysis (assuming it's an array)
      const existingAnalysis = JSON.parse(existingAnalysisDoc.analysis); // Parse existing JSON
      const updatedAnalysis = JSON.stringify([...existingAnalysis, JSON.parse(analysis)], null, 2); // Append new analysis

      existingAnalysisDoc.analysis = updatedAnalysis;
      existingAnalysisDoc.count = newCount;
      return await existingAnalysisDoc.save();
    }

    const analysisData = new AnalysisModel({
      user_id: mongoose.Types.ObjectId(userId),
      form_id: form_id ? mongoose.Types.ObjectId(form_id) : null,
      token_name: tokenName,
      token_code: tokenCode,
      analysis, // Save the serialized JSON
      score, // Save score only for the first analysis
      analysis_file_link: pdfFileName,
      count: newCount,
      createdAt: new Date(),
    });

    return await analysisData.save();
  } catch (error) {
    console.error("Error saving analysis to database:", error);
    throw new Error("Failed to save analysis to the database.");
  }
};


// Send analysis email
const sendAnalysisEmail = async (email, analysis) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL_ADDRESS,
    to: email,
    subject: "Token Analysis Report",
    text: analysis,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject("Error sending email: " + error.toString());
      } else {
        console.log(`Email sent: ${info.response}`);
        resolve("Email sent: " + info.response);
      }
    });
  });
};

// Generate HTML email content
const generateEmail = async (data) => {
  try {
    return await ejs.renderFile("template.ejs", data);
  } catch (error) {
    console.error("Error generating email HTML:", error);
  }
};

// Send email form data
export const emailFormData = async (req, res) => {
  try {
    const data = req.body;
    const html = await generateEmail(data);

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL_ADDRESS,
      to: "admin@smallcap.ai",
      subject: "Testing Form Submission",
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending form email:", error);
        res.status(500).json({ message: "Failed to send email." });
      } else {
        res.status(200).json({ message: "Email sent successfully." });
      }
    });
  } catch (error) {
    console.error("Error in emailFormData:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
};
