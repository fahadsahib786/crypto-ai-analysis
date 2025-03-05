import otpGenerator from 'otp-generator';

const generateOtp = () => {
  return otpGenerator.generate(6, { upperCase: false, specialChars: false });
};

export { generateOtp };
