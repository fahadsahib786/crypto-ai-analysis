import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
  
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
  
    const result = await login(email, password);
    if (result.success) {
      navigate('/profile'); 
    } else {
      setError(result.error); 
    }
  };
  
  const handleButtonClick = () => {
    navigate('/Register'); 
  };

  return (
    <div className="bg-[#0D0930] text-navy-blue py-8">
      <div className="bg-white p-6 mx-auto max-w-md rounded-lg shadow-lg">
        <h1 className="text-4xl text-center mb-6 text-[#0D0930]">Login</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block font-semibold">Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <Link to={'/forgotpassword'} ><span>Forgot Password?</span></Link>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#0D0930] text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleButtonClick}
            className="w-full bg-[#0D0930] text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300"
          >
            Don't have an account? Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
