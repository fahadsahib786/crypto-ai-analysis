import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/smallcaplogo.png';
import { AiCryptoArray } from '../utils/commonFunc';
import { AuthContext } from '../context/AuthContext';

const Header = ({ isLoggedIn, searchTerm, setSearchTerm, topTrendingCryptos }) => {
  const { user ,logout} = useContext(AuthContext);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filteredValuesArr,setFilteredValuesArr] = useState("");
  const [settingDropdown,setSettingDropdown] = useState(false)
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const profileRef = useRef();
  const authRef = useRef();
  const settingRef = useRef();


  const handleClickOutside = (event) => {
    if (      
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target) &&
      !event.target.classList.contains("menu-services") &&
      !event.target.classList.contains("menu-item")
    ) {
      setMenuOpen(false);
    }
  };

  // Close dropdowns if clicking outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const value = e?.target?.value || "";
    setSearchTerm(value);
    let filteredValues;
    if(value !== ""){

        filteredValues = AiCryptoArray.filter((crypto) =>  {
        return crypto.name.toLowerCase().includes(value.toLowerCase()) || crypto.code.toLowerCase().includes(value.toLowerCase())
      })
    }
    setFilteredValuesArr(filteredValues)
    if (value === "") {
      setFilteredValuesArr("")
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  const handleDropdownClick = (crypto) => {
    setSearchTerm(crypto.name);
    setDropdownVisible(false);
    setFilteredValuesArr("")
    navigate(`/${crypto.code}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleImageClick = () => {
    setSearchTerm("");
    navigate('/')
  }


  return (
    <header className="bg-[#0D0930] text-white py-4">
      <div className="customLandingContainer mx-auto px-4 flex justify-between items-center" style={{width:"89.5%"}} >
        <div className="flex items-center space-x-4">
            <img onClick={handleImageClick} src={logo} alt="Small Cap Token Logo" className="h-10" />
          <h1 className="text-lg font-bold hidden md:block">Small Cap AI</h1>
        </div>
        <div className="relative flex-1 mx-4">
          <input
            type="text"
            className="form-control w-full py-2 px-4 border-none text-black"
            placeholder="Search by coin name or symbol..."
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setDropdownVisible(true)}
            ref={searchInputRef}
            style={{ maxHeight: '40px', borderRadius: '20px' }}
          />
          {
            filteredValuesArr? 
            <ul
              ref={dropdownRef}
              className="absolute w-full bg-gray-800 text-white shadow-lg border rounded p-2 mt-1 z-10"
            >
              {filteredValuesArr.map((crypto) => (
                <li
                  key={crypto.code}
                  className="flex justify-between items-center py-2 px-4 hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleDropdownClick(crypto)}
                >
                  <div>
                    <span className="font-bold">{crypto.name}</span>{" "}
                    <span className="text-gray-400">{crypto.code}</span>{" "}
                  </div>

                </li>
              ))}
            </ul>
            :null
          }
          {!filteredValuesArr && dropdownVisible && (
            <ul
              ref={dropdownRef}
              className="absolute w-full bg-gray-800 text-white shadow-lg border rounded p-2 mt-1 z-10"
            >
              <li className="font-bold">Trending Cryptoassets 🔥</li>
              {topTrendingCryptos.map((crypto) => (
                <li
                  key={crypto.code}
                  className="flex justify-between items-center py-2 px-4 hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleDropdownClick(crypto)}
                >
                  <div>
                    <span className="font-bold">{crypto.name}</span>{" "}
                    <span className="text-gray-400">{crypto.code}</span>{" "}
                    <span className="bg-gray-600 rounded-full px-2 text-sm">#{crypto.rank}</span>
                  </div>
                  <div>
                    <span>${crypto.rate ? crypto.rate.toFixed(4) : "N/A"}</span>{" "}
                    <span
                      className={
                        crypto.delta &&
                        crypto.delta.day !== undefined &&
                        crypto.delta.day >= 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {crypto.delta &&
                      crypto.delta.day !== undefined ? 
                      (crypto.delta.day >= 0
                        ? `▲ ${crypto.delta.day.toFixed(2)}%`
                        : `▼ ${crypto.delta.day.toFixed(2)}%`)
                      : "N/A"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-2">
        {user ? 
          <>
          <div className="relative" ref={settingRef} >
          <button  id='settingDropdown' onClick={() => setSettingDropdown(!settingDropdown)} className="btn btn-info px-2 py-1 rounded text-dark hover:bg-blue-600 hover:text-white transition">Settings</button>
          <ul
                className={`absolute right-0 mt-1 bg-light text-black rounded-lg shadow-lg ${settingDropdown ? '' : 'hidden'}`}
                aria-labelledby="settingDropdown"
                >
                <li><Link to="/profile" className="block px-3 py-2 hover:bg-gray-200 text-black" onClick={() => setSettingDropdown(false)} style={{ textDecoration: 'none' }}>Profile</Link></li>
                <li><Link to="/editprofile" className="block px-3 py-2 hover:bg-gray-200 text-black" onClick={() => setSettingDropdown(false)} style={{ textDecoration: 'none' }}>Edit&nbsp;Profile</Link></li>
                <li><Link to="/login" className="block px-3 py-2 hover:bg-gray-200 text-black" onClick={() => {
                  logout()
                  setSettingDropdown(false) 
                  }} style={{ textDecoration: 'none' }}>Logout</Link></li>
               

              </ul>
          </div>
          </>
         :
         <Link to="/login" className="btn btn-info px-2 py-1 rounded text-dark hover:bg-blue-600 hover:text-white transition">Login</Link>}
         {user ? null: <Link to="/register" className="btn btn-info px-2 py-1 rounded text-dark hover:bg-blue-600 hover:text-white transition">Register</Link>}

          <Link to="https://token.smallcap.ai" className="btn btn-info px-2 py-1 rounded text-dark hover:bg-blue-600 hover:text-white transition">Cap Token</Link>
          <div className="relative" ref={menuRef}>
            <button
              className="btn btn-info cursor-pointer focus:outline-none px-3 py-1 rounded text-dark hover:bg-indigo-600 hover:text-white transition"
              id="authDropdown3"
              ref={buttonRef}
              onClick={toggleMenu}
            >
              Services
            </button>
            <ul
                className={`absolute right-0 mt-1 bg-light text-black rounded-lg shadow-lg ${menuOpen ? '' : 'hidden'}`}
                aria-labelledby="authDropdown3"
              >
                <li><Link to="https://bot.smallcap.ai" className="menu-item block px-3 py-2 hover:bg-gray-200 text-black" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>Trading Bot</Link></li>
                <li><Link to="/listing" className="menu-item block px-3 py-2 hover:bg-gray-200 text-black" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>Listing</Link></li>
                <li><Link to="/advertisement" className="menu-item block px-3 py-2 hover:bg-gray-200 text-black" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>Advertisement</Link></li>
                {/* <li><Link to="#" className="menu-item block px-3 py-2 hover:bg-gray-200 text-black" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>API Request</Link></li> */}
                <li><Link to="/dapp" className="menu-item block px-3 py-2 hover:bg-gray-200 text-black text-wrap" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>Custom Analysis</Link>
                </li>

              </ul>
          </div>
        </div>
        <button className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white" ref={buttonRef} onClick={toggleMenu}>
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" /></svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#0D0930] text-white flex flex-col items-center" ref={menuRef}>
         {user ? 
         <Link to="/login" className="block text-light px-4 py-2 hover:bg-blue-600" style={{ textDecoration: 'none' }}>Logout</Link>:
         <Link to="/login" className="block text-light px-4 py-2 hover:bg-blue-600" style={{ textDecoration: 'none' }}>Login</Link>}
         {user ? null: <Link to="/register" className="block text-light px-4 py-2 hover:bg-blue-600" style={{ textDecoration: 'none' }}>Register</Link>}
          <Link to="https://token.smallcap.ai" className="block text-light px-4 py-2 hover:bg-blue-600" style={{ textDecoration: 'none' }}>Cap Token</Link>
          <Link
            to="#"
            className="block dropdown-toggle px-4 py-2 text-light hover:bg-blue-600 menu-services"
            id="authDropdown1" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false"
            style={{ textDecoration: 'none' }}
          >
            Services
          </Link>
          <ul
              className="dropdown-menu bg-[#0D0930]" aria-labelledby="authDropdown1"
            >
              <li><Link to="https://bot.smallcap.ai" className="block px-3 py-2 hover:bg-gray-200 text-black" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>Trading Bot</Link></li>
              <li><Link to="/listing" className="dropdown-item block px-3 py-2 hover:bg-gray-200 text-black" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>Listing Application</Link></li>
              <li><Link to="/advertisement" className="dropdown-item block px-3 py-2 hover:bg-gray-200 text-black" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>Advertisement</Link></li>
              {/* <li><Link to="#" className="dropdown-item block px-3 py-2 hover:bg-gray-200 text-black" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>API Request</Link></li> */}
              <li><Link to="/dapp" className="dropdown-item block px-3 py-2 hover:bg-gray-200 text-black">Custom Analysis</Link></li>
            </ul>
          </div>
      )}
    </header>
  );
};

export default Header;
