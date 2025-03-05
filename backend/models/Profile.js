import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the User Profile Schema
const userProfileSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String, required: false },
  avatar: { type: String, required: false },
  website: { type: String, required: false },
  twitter: { type: String, required: false },
  linkedin: { type: String, required: false },
  github: { type: String, required: false }
});

export default mongoose.model('Profile', userProfileSchema);
