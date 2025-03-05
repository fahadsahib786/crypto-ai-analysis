import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fname: { type: String, required: false },
  lname: { type: String, required: false },
  fullname :{ type: String, required: false },
  awsAvatarUrl :{ type: String, required: false },
  awsAvatarKey :{ type: String, required: false },
  username: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String, required: false },
  subscription: { type: String, enum: ['free', 'premium'], default: 'free' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

export default mongoose.model('User', userSchema);
