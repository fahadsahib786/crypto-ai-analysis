import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { FaArrowUp, FaTwitter, FaLinkedin, FaTelegram, FaGithub, FaDiscord } from 'react-icons/fa';
import logo from '../assets/images/smallcaplogo.png';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer bg-[#0D0930] text-white py-10 mt-20">
      <div className="customLandingContainer mx-auto px-4">
        <div className="row d-flex align-items-stretch">
          <div className="col-md-4 mb-4 d-flex flex-column">
            <img src={logo} alt="Small Cap AI Logo" className="logo custom-logo" />
            <p className="slogan">Your Trust, Our Commitment</p>
            <p className="intro">Small Cap AI is the first and only AI driven small cap crypto tokens analysis platform.</p>
          </div>
          <div className="col-md-3 mb-4">
            <h4 className="text-xl mb-4">Company</h4>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white hover:text-indigo-400">Home</a></li>
              <li><a href="/about" className="text-white hover:text-indigo-400">About</a></li>
              <li><a href="#" className="text-white hover:text-indigo-400">Terms Of Use</a></li>
              <li><a href="#" className="text-white hover:text-indigo-400">Privacy Policy</a></li>
              <li><a href="#" className="text-white hover:text-indigo-400">Community Rule</a></li>
              <li><a href="#" className="text-white hover:text-indigo-400">Disclaimer</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h4 className="text-xl mb-4">Services</h4>
            <ul className="list-unstyled">
              <li><a href="https://bot.smallcap.ai" className="text-white hover:text-indigo-400">Trading Bot</a></li>
              <li><a href="/index-buy" className="text-white hover:text-indigo-400">Index Buy</a></li>
              <li><a href="/whitepaper" className="text-white hover:text-indigo-400">Whitepaper</a></li>

              <li><a href="/listing" className="text-white hover:text-indigo-400">Listing</a></li>
              <li><a href="/advertisement" className="text-white hover:text-indigo-400">Advertisement</a></li>
              <li><a href="/dapp" className="text-white hover:text-indigo-400">Custom Analysis</a></li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h4 className="text-xl mb-4">Follow Us</h4>
            <div className="social-icons">
              <a href="https://github.com/wappingxyz" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-white hover:text-indigo-400 mb-2">
                <FaGithub className="mr-2" /> GitHub
              </a>
              <a href="https://twitter.com/smallcapai" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-white hover:text-indigo-400 mb-2">
                <FaTwitter className="mr-2" /> Twitter
              </a>
              <a href="https://t.me/smallcapai" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-white hover:text-indigo-400 mb-2">
                <FaTelegram className="mr-2" /> Telegram
              </a>
              <a href="https://www.linkedin.com/company/smallcapai/" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-white hover:text-indigo-400 mb-2">
                <FaLinkedin className="mr-2" /> LinkedIn
              </a>

              <a href="https://discord.gg/XFDsnZVdBu" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-white hover:text-indigo-400 mb-2">
                <FaDiscord className="mr-2" /> Discord
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom bg-[#0D0935] text-white py-4 mt-8">
        <p className="text-center mb-0">&copy; 2024 Small Cap Token. All rights reserved.</p>
      </div>
      <a href="#" onClick={handleScrollToTop} className="move-to-top fixed bottom-4 right-4 text-indigo-600 hover:text-indigo-800 text-2xl">
        <FaArrowUp />
      </a>
    </footer>
  );
};

export default Footer;
