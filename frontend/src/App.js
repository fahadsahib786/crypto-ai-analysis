// App.js (modified)
import React, { useState, useEffect } from 'react'; // Corrected import
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css'


import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/LandingPage';
import WalletConnectButton from './components/WalletConnectButton';  // Add this import
import SwapComponent from './components/SwapComponent';  // Add this import
import Dapp from './pages/Form';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Subscription from './components/Subscription';
import Analysis from './components/Analysis';
import CryptoDetails from './components/CryptoDetails';
import EditProfile from './components/EditProfile';
import AnalysisResult from './components/AnalysisResult';
import { AuthProvider } from './context/AuthContext.js';
import { hotToaster } from './utils/hotToaster.js';

import ListingForm from './components/ListingForm.js';
import AdvertisementForm from './components/AdvertisementForm.js';
import Otp from './components/otp.js';
import ForgotPassword from './components/ForgotPassword.js';
import ResetPassword from './components/ResetPassword.js';
import IndexBuy from './components/IndexBuy.js';
import ProtectedRoute from './components/ProtectedRoute.js';



function usePageViews() {
  const location = useLocation();
  useEffect(() => {
    window.gtag('config', 'G-L44LZ3NRM8', {
      page_path: location.pathname + location.search,
    });
  }, [location]);
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [topTrendingCryptos, setTopTrendingCryptos] = useState([]);
  const [walletAddress, setWalletAddress] = useState(""); // Add this state

  usePageViews();

  return (
    <AuthProvider>
    <div className="app">
      {hotToaster()}
      <Header searchTerm={searchTerm} topTrendingCryptos={topTrendingCryptos} setTopTrendingCryptos={setTopTrendingCryptos} setSearchTerm={setSearchTerm} />
      <main style={{ backgroundColor: "white" }} className="customContainer">

        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} topTrendingCryptos={topTrendingCryptos} setTopTrendingCryptos={setTopTrendingCryptos} setSearchTerm={setSearchTerm} />} />
          <Route path="/index-buy" element={<IndexBuy />} />
          <Route path="/:code" element={<CryptoDetails />} />
          <Route path="/dapp" element={<Dapp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/editprofile" element={<ProtectedRoute element={<EditProfile />} />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/analysis/:code" element={<Analysis />} /> 
          <Route path="/analysisReport" element={<AnalysisResult />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/listing" element={<ListingForm />} />
          <Route path="/advertisement" element={<AdvertisementForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
    </AuthProvider>
  );
};

export default App;
