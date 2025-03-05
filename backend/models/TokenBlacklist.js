import mongoose from 'mongoose';

const TokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, expires: '1h', default: Date.now } 
});

export default mongoose.model('TokenBlacklist', TokenBlacklistSchema);
