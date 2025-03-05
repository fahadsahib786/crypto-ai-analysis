import axios from 'axios';
import dotenv from 'dotenv';
import axiosRetry from 'axios-retry';

dotenv.config();

let ApiKeyArray = process.env.LIVECOINWATCH_API_KEY.split(',');

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return error.response && (error.response.status === 502 || error.response.status === 503 || error.response.status === 504);
  }
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const makeLiveCoinWatchApiCall = async (url, body) => {
  let ApiKeyArrayIndex = 0;

  while (ApiKeyArrayIndex < ApiKeyArray.length) {
    try {
      const response = await axios.post(url, body, {
        headers: {
          'content-type': 'application/json',
          'x-api-key': ApiKeyArray[ApiKeyArrayIndex],
        },
      });

      if (response.data) {
        return response;
      } else {
        console.log(`Error occurred with API key ${ApiKeyArray[ApiKeyArrayIndex]}: No data returned`);
        ApiKeyArrayIndex++;
      }
    } catch (error) {
      if (error.response && (error.response.status === 502 || error.response.status === 503 || error.response.status === 504)) {
        console.log(`Server error with API key ${ApiKeyArray[ApiKeyArrayIndex]}: ${error.response.status}`);
        await delay(3000); // Wait for 2 seconds before retrying
      } else {
        console.log(`Error occurred with API key ${ApiKeyArray[ApiKeyArrayIndex]}: ${error.message}`);
      }

      ApiKeyArrayIndex++;
    }
  }

  throw new Error('All API keys exhausted without successful response');
};
