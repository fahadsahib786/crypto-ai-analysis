import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const[otpVerified,setOTPVerified] = useState("");
  const [email,setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
        const { otpVerified , email } = location.state;
 
            setEmail(email || "");
            setOTPVerified(otpVerified)

        
    } else {
        toast.error('Missing required information, please register again.');
        navigate('/register');
    }
}, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_ROUTE_URI}/auth/resetPassword`, {
        email,
        newPassword:password,
      },{
        withCredentials:true
      });

      console.log(response)

      debugger

      if (response.status === 200) {
        toast(response.data.message)
        navigate('/login')
      } else {
        setError(response.data.message || 'Password reset failed');
      }
    } catch (error) {
      setError('An error occurred during password reset');
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="bg-indigo-900 text-navy-blue py-8">
      <div className="bg-white p-6 mx-auto max-w-md rounded-lg shadow-lg">
        <h1 className="text-4xl text-center mb-6 text-indigo-900">Reset Password</h1>
        <form className="space-y-4" onSubmit={handleResetPassword}>
          <div>
            <label className="block font-semibold">New Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-green-500 text-center">{message}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-900 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
