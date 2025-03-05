// src/components/SwapComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';

const SwapComponent = ({ walletAddress }) => {
    const [tokens, setTokens] = useState([]);
    const [fromToken, setFromToken] = useState('');
    const [toToken, setToToken] = useState('');
    const [amount, setAmount] = useState('');
    const [chainId, setChainId] = useState(1); // Default to Ethereum

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await axios.get(`/api/tokens/${chainId}`);
                setTokens(Object.values(response.data.tokens));
            } catch (error) {
                console.error('Error fetching tokens:', error);
            }
        };

        fetchTokens();
    }, [chainId]);

    const handleSwap = async () => {
        try {
            const response = await axios.get(`/api/swap/${chainId}`, {
                params: {
                    fromTokenAddress: fromToken,
                    toTokenAddress: toToken,
                    amount: Web3.utils.toWei(amount, 'ether'),
                    fromAddress: walletAddress,
                    slippage: 1 // 1% slippage
                }
            });
            const swapData = response.data.tx;
            const web3 = new Web3(window.ethereum);

            const result = await web3.eth.sendTransaction(swapData);
            console.log('Transaction result:', result);
        } catch (error) {
            console.error('Error swapping tokens:', error);
        }
    };

    return (
        <div>
            <h3>Swap Tokens</h3>
            <div>
                <label>From Token:</label>
                <select onChange={(e) => setFromToken(e.target.value)}>
                    <option value="">Select Token</option>
                    {tokens.map((token) => (
                        <option key={token.address} value={token.address}>
                            {token.symbol}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>To Token:</label>
                <select onChange={(e) => setToToken(e.target.value)}>
                    <option value="">Select Token</option>
                    {tokens.map((token) => (
                        <option key={token.address} value={token.address}>
                            {token.symbol}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Amount:</label>
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <button onClick={handleSwap}>Swap</button>
        </div>
    );
};

export default SwapComponent;
