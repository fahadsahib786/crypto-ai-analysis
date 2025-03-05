import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode }from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  const login = async (email, password) => {
    console.log({email,password})
    try {
      const res = await axios.post(`${process.env.REACT_APP_ROUTE_URI}/auth/login`, {email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.response ? error.response.data.message : error.message };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_ROUTE_URI}/auth/register`, { username, email, password },{withCredentials:true});
      return response
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.response ? error.response.data.message : error.message };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      await axios.post(`${process.env.REACT_APP_ROUTE_URI}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const sendOTP = async (username="", email="", password="") => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_ROUTE_URI}/auth/sendOTP`, {
        username,
        email,
        password,
      },{
        withCredentials:true
      });
      const otp = response.data;
  
      return {message:'success'};
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error; // You can rethrow the error or handle it appropriately
    }
  }

  const forgotpassword = async (username="", email="", password="") => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_ROUTE_URI}/auth/forgotPassword`, {
        username,
        email,
        password
      });

      if(response.status == 200){
        return {success:true};
      }else if(response.status == 404){
        return {success:false}
      }
  
    } catch (error) {
      console.warn('Error sending OTP:', error);
      if (error.response.status === 404) {
        return { success: false, message: 'User does not exist' };
      }
      
    }
  }
  return (
    <AuthContext.Provider value={{ user, login,register, logout,sendOTP,forgotpassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
