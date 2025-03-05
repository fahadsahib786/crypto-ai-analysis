import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import './IndexBuy.css';

const IndexBuy = () => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [selectedCryptos, setSelectedCryptos] = useState([]);
  const [userBalance, setUserBalance] = useState(null);

  // Predefined top 10 Ethereum tokens by market cap
  const top10EthTokens = [
    { code: "NEAR", name: "NEAR Protocol", address: "0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4", description: "Decentralized data layer for applications" },
    { code: "RNDR", name: "Render Token", address: "0x6De037ef9aD2725EB40118Bb1702EBb27e4Aeb24", description: "Distributed GPU rendering network" },
    { code: "INJ", name: "Injective", address: "0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30", description: "Decentralized derivatives trading platform" },
    { code: "GRT", name: "The Graph", address: "0xc944E90C64B2c07662A292be6244BDf05Cda44a7", description: "Decentralized indexing protocol for blockchain data" },
    { code: "AGIX", name: "SingularityNET", address: "0x5B7533812759B45C2B44C19e320ba2cD2681b542", description: "AI and machine learning marketplace" },
    { code: "ROSE", name: "Oasis Network", address: "0x26B80FBfC01b71495f477d5237071242e0d959d7", description: "Privacy-enabled blockchain platform for open finance" },
    { code: "GLM", name: "Golem", address: "0x7DD9c5Cba05E151C895FDe1CF355C9A1D5DA6429", description: "Global, open-source, decentralized supercomputer" },
    { code: "OCEAN", name: "Ocean Protocol", address: "0x967da4048cD07aB37855c090aAF366e4ce1b9F48", description: "Decentralized data exchange protocol" },
    { code: "TRAC", name: "OriginTrail", address: "0xaA7AfbE1d4c43256d2e144f4FCf43fA7d15f6f42", description: "Blockchain-powered supply chain management" },
    { code: "CQT", name: "Covalent", address: "0xD417144312DbF50465b1C641d016962017Ef6240", description: "Unified API for blockchain data" }
  ];

  useEffect(() => {
    // Initialize the selected cryptos with the top 10 Ethereum tokens
    setSelectedCryptos(top10EthTokens);
    getUserBalance();
  }, []);

  const getUserBalance = async () => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const userAddress = await provider.send("eth_requestAccounts", []);
      const balance = await provider.getBalance(userAddress[0]);

      setUserBalance(parseFloat(ethers.formatEther(balance)));
    } catch (error) {
      console.error("Failed to fetch user balance:", error);
      setUserBalance(null);
    }
  };

  const handleInvestmentAmountChange = (event) => {
    setInvestmentAmount(event.target.value);
  };

  const handleRemoveCrypto = (cryptoCode) => {
    setSelectedCryptos(selectedCryptos.filter(crypto => crypto.code !== cryptoCode));
  };

  const switchToEthereumMainnet = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }], // 0x1 is the chain ID for Ethereum Mainnet
      });
    } catch (error) {
      if (error.code === 4902) {
        alert('Ethereum Mainnet is not available in your wallet. Please add it manually.');
      } else {
        console.error('Failed to switch network', error);
      }
    }
  };

  const checkNetworkAndExecute = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask or another Web3 wallet.");
      return;
    }

    if (parseFloat(investmentAmount) > userBalance) {
      alert('Insufficient ETH balance to complete the transaction.');
      return;
    }

    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (currentChainId !== '0x1') {
      alert('Please switch to the Ethereum Mainnet.');
      await switchToEthereumMainnet();
    }

    executeIndexBuy();
  };

  const executeIndexBuy = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const userAddress = await provider.send("eth_requestAccounts", []);

    setTransactionStatus('Processing transactions...');

    try {
      const amountPerToken = (investmentAmount / selectedCryptos.length) * 1e18; // Convert to Wei (smallest unit)

      for (const token of selectedCryptos) {
        const amount = amountPerToken.toString(); // Ensure amount is in string format

        console.log(`Preparing to swap ${amount} Wei for ${token.name} (${token.code})`);

        const swapResponse = await axios.get(`http://localhost:8000/api/swap/1`, {
          params: {
            fromTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ETH (1inch uses this for native ETH)
            toTokenAddress: token.address,
            amount: amount,
            fromAddress: userAddress[0],
            slippage: 1, // 1% slippage
          },
        });

        if (swapResponse.data && swapResponse.data.tx) {
          const tx = swapResponse.data.tx;

          console.log(`Transaction data for ${token.name}:`, tx);

          await provider.send("eth_sendTransaction", [tx]);

          console.log(`Successfully swapped ${amount} Wei for ${token.name}`);
        } else {
          console.error(`Failed to retrieve transaction data for ${token.name}`);
        }
      }

      setTransactionStatus('All transactions were successfully executed!');
    } catch (error) {
      console.error('Error executing transaction:', error);
      setTransactionStatus('Transaction failed. Please check the console for more details.');
    }
  };

  return (
    <div className="index-fund-container">

    
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Invest in Top 10 AI Tokens Index by MarketCap</h2>
      
      <div className="investment-input mb-6">
  <label className="block text-lg font-semibold mb-2 text-gray-700">Enter the amount you want to invest in ETH:</label>
  <input
    type="number"
    className="form-control p-3 rounded-lg w-full border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-700 placeholder-gray-500"
    value={investmentAmount}
    onChange={handleInvestmentAmountChange}
    placeholder="Enter ETH amount"
  />
  <p className="text-gray-600 mt-2">Available Balance: {userBalance !== null ? `${userBalance.toFixed(4)} ETH` : 'Loading...'}</p>
  {investmentAmount && (
    <p className="text-gray-600 mt-2">Each token will be purchased with: {(investmentAmount / selectedCryptos.length).toFixed(4)} ETH</p>
  )}
</div>


      <ul className="crypto-list mb-6 space-y-4">
        {selectedCryptos.map(crypto => (
          <li key={crypto.code} className="crypto-item flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-100 rounded-lg">
            <div>
              <h4 className="font-semibold text-lg text-gray-800">{crypto.name} ({crypto.code})</h4>
              <p className="text-sm text-gray-600">{crypto.description}</p>
              {investmentAmount && (
                <p className="text-sm text-gray-600">Amount: {(investmentAmount / selectedCryptos.length).toFixed(4)} ETH</p>
              )}
            </div>
            <button
              onClick={() => handleRemoveCrypto(crypto.code)}
              className="btn btn-danger bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg mt-4 sm:mt-0"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button
  className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg w-full"
  onClick={checkNetworkAndExecute}
  disabled={selectedCryptos.length === 0 || !investmentAmount}
>
  Buy Index
</button>

{transactionStatus && (
  <p className="mt-6 text-center text-yellow-500 font-medium">
    {transactionStatus}
  </p>
)}

</div>
);
};

export default IndexBuy;
