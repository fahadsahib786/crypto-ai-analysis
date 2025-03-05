import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { forgotpassword,sendOTP } = useContext(AuthContext);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (email === '') {
      setError('Email is required');
    } else {
      const response = await forgotpassword("",email,"");
      if( response.success === false){ //user doesnt exist
         setError('please enter registered email')
         return
      }
    
      const response1 = await sendOTP('',email,"")

    if (response1.message === 'success') {
      navigate('/otp', { state: {  email,forgotpassword:true } });
    } else {
      setError("Error Sending OTP"); 
    }
    }
  };

  return (
    <div className="bg-[#0D0930] text-navy-blue py-8">
      <div className="bg-white p-6 mx-auto max-w-md rounded-lg shadow-lg">
        <h1 className="text-4xl text-center mb-6 text-[#0D0930]">Forgot Password</h1>
        <form className="space-y-4" onSubmit={handleForgotPassword}>
          <div>
            <label className="block font-semibold">Please enter registered email </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
            }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter your registered email"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-green-500 text-center">{message}</p>}
          <button
            type="submit"
            className="w-full bg-[#0D0930] text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
