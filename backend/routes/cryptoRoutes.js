import express from 'express';
import fetch from 'node-fetch';
import TokenPredictionSchema from '../models/Prediction.js';
import { allowedCodesObject } from '../utils/cryptos.js';
import { makeLiveCoinWatchApiCall } from '../utils/liveCoinWatch.js';
import OpenAI from 'openai';

const router = express.Router();

// Endpoint to fetch cryptocurrency mappings
router.post('/cryptocurrencies', async (req, res) => {
  const { currency, codes, sort, order, offset, limit, meta } = req.body;
  try {
    const url = 'https://api.livecoinwatch.com/coins/map';
    const body = JSON.stringify({ currency, codes, sort, order, offset, limit, meta });
    const response = await makeLiveCoinWatchApiCall(url, body);
    // console.log("Fetched cryptocurrency data:", response.data); // Logging response data
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
  }
});

// Endpoint to get detailed information about a specific cryptocurrency
router.post('/cryptoDetails', async (req, res) => {
  const { currency, code, meta } = req.body;
  const url = 'https://api.livecoinwatch.com/coins/single';
  const body = JSON.stringify({ currency, code, meta });

  try {
    const response = await makeLiveCoinWatchApiCall(url, body);
    // console.log("Fetched cryptocurrency details:", response?.data); // Logging detailed response data
    res.status(200).json(response?.data);
  } catch (error) {
    console.error('Error fetching cryptocurrency details:', error);
    res.status(500).json({ error: 'Failed to fetch cryptocurrency details' });
  }
});

// Helper function to delay retries
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to fetch AI predictions
const fetchAIDeltaPredictions = async (prompt, retries = 5) => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a cryptocurrency prediction expert.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.warn('OpenAI API Error:', errorData);

        if (errorData.error?.type === 'rate_limit') {
          const backoffTime = 1000 * Math.pow(2, attempt); // Exponential backoff
          console.log(`Rate limit hit. Retrying in ${backoffTime / 1000}s...`);
          await delay(backoffTime);
          continue;
        } else {
          throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
        }
      }

      const data = await response.json();
      const responseText = data.choices[0]?.message?.content.trim();

      if (responseText) {
        return JSON.parse(responseText.replace(/```json|```/g, '').trim());
      }

      console.warn('Empty response from OpenAI API:', data);
      throw new Error('No data returned from OpenAI API');
    } catch (error) {
      console.error('Error fetching delta predictions:', error.message);
      if (attempt < retries - 1) {
        const retryDelay = 1000 * Math.pow(2, attempt);
        console.log(`Retrying after ${retryDelay / 1000}s...`);
        await delay(retryDelay);
      } else {
        console.error('All retries exhausted.');
        throw error;
      }
    }
  }
};


// Endpoint to update AI-generated crypto delta predictions
router.post('/updateAICryptoDelta', async (req, res) => {
  const crypto = req.body;

  try {
    const existingPrediction = await TokenPredictionSchema.findOne({ tokenSymbol: crypto.code }).sort({ updatedAt: -1 });
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    if (existingPrediction && new Date(existingPrediction.updatedAt) > twentyFourHoursAgo) {
      crypto.delta = {
        day: existingPrediction.hourlyPrediction,
        week: existingPrediction.weeklyPrediction,
        month: existingPrediction.monthlyPrediction,
      };
      return res.status(200).json(crypto);
    }

    const prompt = `
    You are a world-class cryptocurrency price prediction expert specializing in advanced data science, real-time analysis, and algorithmic trading models. Your task is to predict the price for this cryptocurrency over the next 1 day, 7 days, and 30 days. This prediction must be based on an exhaustive and nuanced analysis that integrates multiple data sources, predictive strategies, and machine learning models to maximize accuracy.
    
### Input Data
${JSON.stringify(crypto)}

### Instructions
- Return the prediction in the following JSON format:
\`\`\`json
{
  "1day": {"prediction": value, "confidence": value},
  "7days": {"prediction": value, "confidence": value},
  "30days": {"prediction": value, "confidence": value}
}
\`\`\`
- Do not include any text, explanation, or comments outside the JSON format.
- Any deviation from the JSON format will be treated as invalid.
    
    ### Key Analysis Factors
    1. **Microstructural Analysis (High-Frequency Trading Insights)**
       - *Sources*: [Binance](https://www.binance.com/), [Bitstamp](https://www.bitstamp.net/), and [Coinbase Pro](https://pro.coinbase.com/).
       - *Strategy*: Analyze order book depth, bid-ask spreads, and major order flows. Use heatmaps for tracking large orders and identify potential support/resistance zones.
       - *Algorithm*: Implement microstructure models to forecast short-term impacts based on order flow and liquidity shifts.
    
    2. **Historical Price Patterns and Volatility Analysis**
       - *Sources*: [TradingView](https://www.tradingview.com/) and [CryptoCompare](https://www.cryptocompare.com/).
       - *Strategy*: Study recent volatility and candlestick patterns. Compute historical volatility using GARCH (Generalized Autoregressive Conditional Heteroskedasticity) models.
       - *Algorithm*: Use ARIMA-GARCH models to forecast future volatility and identify trends or reversals.
    
    3. **Market Sentiment and NLP-Based Analysis**
       - *Sources*: [LunarCrush](https://www.lunarcrush.com/), [Twitter](https://twitter.com/), [Reddit](https://www.reddit.com/r/cryptocurrency/).
       - *Strategy*: Conduct NLP analysis on social media and news posts to measure sentiment shifts, correlating sentiment with historical price impacts.
       - *Algorithm*: Implement BERT or GPT models to extract sentiment, using time-series regression to adjust predictions based on sentiment shifts.
    
    4. **News Impact Analysis (Event-Driven Forecasting)**
       - *Sources*: [CoinDesk](https://www.coindesk.com/), [Reuters](https://www.reuters.com/), [Bloomberg](https://www.bloomberg.com/crypto).
       - *Strategy*: Use event-driven models to estimate impacts of regulatory announcements, SEC decisions, or crypto hacks on price.
       - *Algorithm*: Use a time-decay model combined with event-driven VAR (Vector AutoRegression) models to factor recent news impacts into medium and long-term predictions.
    
    5. **Technical Indicators and Advanced Chart Analysis**
       - *Sources*: [Coinigy](https://www.coinigy.com/), [Investing.com](https://www.investing.com/crypto).
       - *Strategy*: Calculate indicators like RSI, MACD, and EMA for momentum and trend insights.
       - *Algorithm*: Employ a multi-layered model that combines signals from these indicators, optimized through ensemble methods for trend confirmation.
    
    6. **Trading Volume, Liquidity, and Whale Activity**
       - *Sources*: [Glassnode](https://glassnode.com/), [IntoTheBlock](https://app.intotheblock.com/).
       - *Strategy*: Analyze trading volume, whale transactions, and liquidity metrics, focusing on wallet activity from large holders.
       - *Algorithm*: Apply NVT (Network Value to Transactions) and whale tracking data to estimate liquidity-driven price impacts.
    
    7. **On-Chain Metrics and Blockchain Analysis**
       - *Sources*: [BTC.com](https://btc.com/) and [Coin Metrics](https://coinmetrics.io/).
       - *Strategy*: Review metrics like hash rate, mining difficulty, active addresses, and transaction volume.
       - *Algorithm*: Use PCA (Principal Component Analysis) to identify predictive on-chain features, with a focus on network health and demand.
    
    8. **Correlation with Global Markets**
       - *Sources*: [Yahoo Finance](https://finance.yahoo.com/), [Trading Economics](https://tradingeconomics.com/).
       - *Strategy*: Evaluate correlations with global assets like the S&P 500, Gold, and DXY.
       - *Algorithm*: Apply a multi-asset correlation model to evaluate macroeconomic impacts, using a regime-switching model for different market conditions.
    
    9. **Machine Learning and Advanced Modeling**
       - *Techniques*: Combine XGBoost, LightGBM, and LSTM models to aggregate insights.
       - *Reinforcement Learning*: Use reinforcement learning to model optimal trading strategies for the 30-day forecast.
    
    ### Additional Requirements
    - **Confidence Level**: Provide a confidence level for each prediction based on recent volatility and model accuracy.
    - **Explainability**: Utilize SHAP values to measure feature importance and the contribution of each feature to the final predictions.
    
    
    Only provide the JSON output, with no additional text or explanations.
    `;

    const deltaObj = await fetchAIDeltaPredictions(prompt);

    if (deltaObj?.['1day'] && deltaObj?.['7days'] && deltaObj?.['30days']) {
      const filter = { tokenSymbol: crypto.code };
      const update = {
        hourlyPrediction: deltaObj['1day'].prediction,
        weeklyPrediction: deltaObj['7days'].prediction,
        monthlyPrediction: deltaObj['30days'].prediction,
        updatedAt: new Date(),
      };

       const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const updatedPrediction = await TokenPredictionSchema.findOneAndUpdate(filter, update, options);

      crypto.delta = {
        day: updatedPrediction.hourlyPrediction,
        week: updatedPrediction.weeklyPrediction,
        month: updatedPrediction.monthlyPrediction,
      };

      return res.status(200).json(crypto);
    } else {
      console.error('Invalid response from OpenAI:', deltaObj);
      return res.status(500).json({ error: 'Invalid response format from AI' });
    }
  } catch (error) {
    console.error('Error updating crypto delta predictions:', error);
    return res.status(500).json({ error: 'Failed to update crypto delta predictions' });
  }
});

// Endpoint to search for cryptocurrencies by name or code
router.post('/cryptoSearch', async (req, res) => {
  const { searchTerm } = req.body;
  const url = 'https://api.livecoinwatch.com/coins/list';
  const body = JSON.stringify({
    currency: "USD",
    sort: "rank",
    order: "ascending",
    offset: 0,
    limit: 10000,
    meta: true,
  });

  try {
    const response = await makeLiveCoinWatchApiCall(url, body);
    const cryptoArr = response.data.filter((crypto) => (
      (crypto.name?.toLowerCase().includes(searchTerm?.toLowerCase()) || crypto.code?.toLowerCase().includes(searchTerm?.toLowerCase())) &&
      allowedCodesObject[crypto.code]
    ));
    console.log("Crypto search results:", cryptoArr);
    res.status(200).json(cryptoArr);
  } catch (error) {
    console.error('Error during cryptocurrency search:', error);
    res.status(500).json({ error: 'Failed to perform cryptocurrency search' });
  }
});

export default router;



// router.post('/updateAICryptoDelta', async (req, res) => {
//   const crypto = req.body;

//   const existingPrediction = await TokenPredictionSchema.findOne({ tokenSymbol: crypto.code }).sort({ createdAt: -1, updatedAt: -1 });
//   const twentyFourHourAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//   if (existingPrediction && new Date(existingPrediction.updatedAt) > twentyFourHourAgo) {
//     crypto.delta.day = existingPrediction.hourlyPrediction;
//     crypto.delta.week = existingPrediction.weeklyPrediction;
//     crypto.delta.month = existingPrediction.monthlyPrediction;

//     res.status(200).send(crypto);
//     return;
//   }

//   const prompt = `You are a cryptocurrency price prediction expert. Analyze the following cryptocurrency data and provide delta predictions for 1 day, 7 days, and 30 days. The response must contain values in the format: {"1day": value, "7days": value, "30days": value}. Only provide the JSON output.

// Ensure the predictions are based on:
// 1. Historical price trends: Analyze past price movements and patterns.
// 2. Market sentiment: Evaluate the sentiment from recent news, social media, and community discussions.
// 3. Trading volume: Consider the trading volume and liquidity.
// 4. Technical indicators: Use indicators such as moving averages, RSI, MACD, and Bollinger Bands.
// 5. Macroeconomic factors: Account for broader economic trends and events.
// 6. News and events: Consider any recent or upcoming events that might impact the price.
// 7. Correlation with other cryptocurrencies: Analyze how this cryptocurrency correlates with the broader market and other major cryptocurrencies.

// Cryptocurrency data:\n\n${JSON.stringify(crypto)}`;

//   try {
//     const response = await fetch('https://api.openai.com/v1/completions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         model: 'gpt-3.5-turbo-instruct',
//         prompt: prompt,
//         max_tokens: 3000,
//         temperature: 0.7
//       })
//     });
//     const data = await response.json();
//     if (!data.choices || data.choices.length === 0) {
//       console.error('No choices returned from OpenAI API:', data); 
//       throw new Error('No choices returned from OpenAI API');
//     }

//     // Extract and parse the JSON response
//     let responseText = data.choices[0].text.trim();
//     responseText = responseText.replace(/```json|```/g, '').trim();

//     let deltaObj;
//     try {
//       deltaObj = JSON.parse(responseText);
//     } catch (parseError) {
//       console.error('Error parsing AI delta data:', parseError);
//       res.status(500).json({ error: 'Failed to parse AI delta data' });
//       return;
//     }

//     if (deltaObj["1day"] && deltaObj["7days"] && deltaObj["30days"]) {
//       const filter = { tokenSymbol: crypto.code };
//       const update = {
//         hourlyPrediction: deltaObj["1day"],
//         weeklyPrediction: deltaObj["7days"],
//         monthlyPrediction: deltaObj["30days"],
//         updatedAt: new Date(),
//       };
//       const options = { upsert: true, new: true, setDefaultsOnInsert: true };

//       const updatedPrediction = await TokenPredictionSchema.findOneAndUpdate(filter, update, options);
//       crypto.delta.day = updatedPrediction.hourlyPrediction;
//       crypto.delta.week = updatedPrediction.weeklyPrediction;
//       crypto.delta.month = updatedPrediction.monthlyPrediction;
//       res.status(200).send(crypto);
//     } else {
//       console.error('Invalid response from AI:', responseText);
//       res.status(500).json({ error: 'Invalid response from AI' });
//     }
//   } catch (error) {
//     console.error('Error fetching AI delta data:', error);
//     crypto.delta.day = "";
//     crypto.delta.week = "";
//     crypto.delta.month = "";
//     res.status(201).json(crypto);
//   }
// });

