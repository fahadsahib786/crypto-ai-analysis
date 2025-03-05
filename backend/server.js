// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import axios from 'axios'; // Add Axios for API requests
// import authRoutes from './routes/authRoutes.js';
// import profileRoutes from './routes/profileRoutes.js';
// import formRoutes from './routes/formDataRoutes.js';
// import subscriptionRoutes from './routes/subscriptionRoutes.js';
// import landingPageRoutes from './routes/landingPageRoutes.js';
// import analysisRoutes from './routes/analysisRoutes.js';
// import cryptoRoutes from './routes/cryptoRoutes.js';
// import authMiddleware from './middlewares/authMiddleware.js';
// import emailRoutes from './routes/emailRoutes.js';
// import path from 'path';
// import { fileURLToPath } from 'url';

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 8000;

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// const corsOptions = {
//   origin: ['https://www.smallcap.ai', 'http://localhost:3000', 'http://localhost:3000/api/cryptocurrencies'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
//   credentials: true
// };

// app.use(cors(corsOptions));

// app.options('*', cors(corsOptions), (req, res) => {
//   console.log('Handling preflight request');
//   res.sendStatus(204);
// });


// app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/auth', authRoutes);
// app.use('/api/profile', profileRoutes);
// app.use('/api/forms', formRoutes);
// app.use('/api/subscribe', subscriptionRoutes);
// app.use('/api', analysisRoutes);
// app.use('/api', emailRoutes);
// app.use('/api', cryptoRoutes);


// app.get('/api/cryptocurrencies', async (req, res) => {
//   try {
//     const response = await axios.post('https://api.livecoinwatch.com/coins/list', 
//       {
//         currency: 'USD',
//         sort: 'rank',
//         order: 'descending',
//         offset: 0,
//         limit: 20, // Get the top 20
//         meta: true
//       },
//       {
//         headers: {
//           'x-api-key': process.env.LIVECOINWATCH_API_KEY1, // Ensure your API key is stored in .env
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching cryptocurrencies:', error.message); // Log the error message
//     console.error('Error details:', error.response ? error.response.data : 'No response data'); // Log detailed error response if available
//     res.status(500).json({ error: 'Failed to fetch data from Livecoinwatch API' });
//   }
// });






// // 1inch API integration
// const oneInchBaseUrl = 'https://api.1inch.io/v5.0';

// // Endpoint to fetch available tokens
// app.get('/api/tokens/:chainId', async (req, res) => {
//   const { chainId } = req.params;
//   try {
//     const response = await axios.get(`${oneInchBaseUrl}/${chainId}/tokens`);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching tokens' });
//   }
// });

// // Endpoint to fetch swap quote
// app.get('/api/quote/:chainId', async (req, res) => {
//   const { chainId } = req.params;
//   const { fromTokenAddress, toTokenAddress, amount } = req.query;
//   try {
//     const response = await axios.get(
//       `${oneInchBaseUrl}/${chainId}/quote`,
//       {
//         params: {
//           fromTokenAddress,
//           toTokenAddress,
//           amount
//         }
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching quote' });
//   }
// });

// // Endpoint to fetch swap transaction data
// app.get('/api/swap/:chainId', async (req, res) => {
//   const { chainId } = req.params;
//   const { fromTokenAddress, toTokenAddress, amount, fromAddress, slippage } = req.query;
//   try {
//     const response = await axios.get(
//       `${oneInchBaseUrl}/${chainId}/swap`,
//       {
//         params: {
//           fromTokenAddress,
//           toTokenAddress,
//           amount,
//           fromAddress,
//           slippage
//         }
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching swap data' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import formRoutes from './routes/formDataRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import cryptoRoutes from './routes/cryptoRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// CORS Configuration
const corsOptions = {
  origin: ['https://www.smallcap.ai', 'http://localhost:3000'], // Add your allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/subscribe', subscriptionRoutes);
app.use('/api', analysisRoutes);
app.use('/api', emailRoutes);
app.use('/api', cryptoRoutes);

// 1inch API integration
const oneInchBaseUrl = 'https://api.1inch.io/v5.0';

// Endpoint to fetch available tokens
app.get('/api/tokens/:chainId', async (req, res) => {
  const { chainId } = req.params;
  try {
    const response = await axios.get(`${oneInchBaseUrl}/${chainId}/tokens`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching tokens:', error.message);
    res.status(500).json({ error: 'Error fetching tokens' });
  }
});

// Endpoint to fetch swap quote
app.get('/api/quote/:chainId', async (req, res) => {
  const { chainId } = req.params;
  const { fromTokenAddress, toTokenAddress, amount } = req.query;
  try {
    const response = await axios.get(
      `${oneInchBaseUrl}/${chainId}/quote`,
      {
        params: {
          fromTokenAddress,
          toTokenAddress,
          amount
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching quote:', error.message);
    res.status(500).json({ error: 'Error fetching quote' });
  }
});

// Endpoint to fetch swap transaction data
app.get('/api/swap/:chainId', async (req, res) => {
  const { chainId } = req.params;
  const { fromTokenAddress, toTokenAddress, amount, fromAddress, slippage } = req.query;
  try {
    const response = await axios.get(
      `${oneInchBaseUrl}/${chainId}/swap`,
      {
        params: {
          fromTokenAddress,
          toTokenAddress,
          amount,
          fromAddress,
          slippage
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching swap data:', error.message);
    res.status(500).json({ error: 'Error fetching swap data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
