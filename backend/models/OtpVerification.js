import mongoose from 'mongoose';


const OtpVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true },
  fullname: { type: String, required: false },
  password: { type: String, required: false },
});

const OtpVerification = mongoose.model('OtpVerification', OtpVerificationSchema);


export default OtpVerification