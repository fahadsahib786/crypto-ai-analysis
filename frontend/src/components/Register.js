import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register,sendOTP } = useContext(AuthContext);

  const handleRegister = async (e) => {
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
  
    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }
  
    const otp = await sendOTP(username, email, password);

    if (otp.message == 'success') {
      navigate('/otp', { state: {  username, email , password } });
    } else {
      setError("Error Sending OTP"); 
    }
  };
  

  const handleButtonClick = () => {
    navigate('/login'); 
  };

  return (
    <div className="bg-[#0D0930] text-navy-blue py-8">
      <div className="bg-white p-6 mx-auto max-w-md rounded-lg shadow-lg">
        <h1 className="text-4xl text-center mb-6 text-[#0D0930]">Register</h1>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block font-semibold">Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
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
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#0D0930] text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300"
          >
            Register
          </button>
          <button
            type="button"
            onClick={handleButtonClick}
            className="w-full bg-[#0D0930] text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300"
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
