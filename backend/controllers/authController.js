import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendOtpEmail } from '../utils/emailUtils.js';
import { generateOtp } from '../utils/otpUtils.js';
import TokenBlacklist from '../models/TokenBlacklist.js';
import OtpVerification from '../models/OtpVerification.js';
import dotenv from 'dotenv';

dotenv.config();


const register = async (req, res) => {
  const { username, email, password } = req.body;
  const resetToken = req.cookies.resetToken;
  try {
    if (!resetToken) {
      return res.status(400).json({ message: 'No reset token provided' });
    }

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

    if (decoded.email !== email) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname: username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.clearCookie('resetToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
    });

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(400).json({ message: 'Reset token has expired' });
    } else {
      res.status(500).json({ message: 'Error registering user', error });
    }
  }
};

const forgotPassword = async (req,res) => {
  const { username="", email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User doesnt exist' });
    }

    res.status(200).json({ message: 'User found' });
    
  } catch (error) {
    throw new Error('Error sending OTP');
  }
 

}

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const resetToken = req.cookies.resetToken;

  try {
    if (!resetToken) {
      return res.status(400).json({ message: 'No reset token provided' });
    }

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

    if (decoded.email !== email) {
      return res.status(400).json({ message: 'Invalid token or email mismatch' });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    existingUser.password = hashedPassword;
    await existingUser.save();

    res.clearCookie('resetToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
    });

    res.status(200).json({ message: 'Password reset successful' });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(400).json({ message: 'Reset token has expired' });
    } else {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

/* const sendOtp = async (req, res) => {
  const { username, email, password } = req.body;

  const otp = generateOtp();

  try {
    await sendOtpEmail(username, email, otp);
    res.status(201).json({ otp: 'success' });
    
  } catch (error) {
    throw new Error('Error sending OTP');
  }
}; */

const sendOtp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let otpRecord = await OtpVerification.findOne({ email });

    let otp, otpExpires;

    if (otpRecord) {
      if (otpRecord.otpExpires > Date.now()) {
        otp = otpRecord.otp;
        otpExpires = otpRecord.otpExpires;
        await sendOtpEmail(username, email, otp);
        console.log('Existing OTP resent');
      } else {
        await OtpVerification.deleteOne({ email });
      }
    }

    if (!otp) {
      otp = generateOtp();
      otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      const hashedPassword = await bcrypt.hash(password, 10);

      otpRecord = await OtpVerification.findOneAndUpdate(
        { email },
        { otp, otpExpires, fullname: username, password: hashedPassword },
        { upsert: true, new: true }
      );

      await sendOtpEmail(username, email, otp);
      console.log('New OTP generated and sent');
    }

    const token = jwt.sign(
      { email, otpExpires },
      process.env.JWT_SECRET, 
      { expiresIn: '10m' }
    );

    res.cookie('otpToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 10 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' :'Lax', 
      path: '/'
    });


    res.status(201).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const token = req.cookies.otpToken;

  try {
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== email || decoded.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const otpRecord = await OtpVerification.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP not found' });
    }

    if (otpRecord.otp === otp && otpRecord.otpExpires > Date.now()) {
      const resetToken = jwt.sign(
        { email: otpRecord.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } 
      );

      res.cookie('resetToken', resetToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 10 * 60 * 1000,
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' :'Lax', 
        path: '/'
      });

      await OtpVerification.deleteOne({ email: otpRecord.email });

      res.status(200).json({ message: 'OTP verified successfully', resetToken });
    } else {
      res.status(400).json({ message: 'Invalid or expired OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id,role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id, fullname: user.fullname });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};


const logout = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token
  try {
    await new TokenBlacklist({ token }).save();
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error });
  }
};

export { register, login, verifyOtp, logout, sendOtp,forgotPassword,resetPassword };
