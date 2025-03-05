import mongoose from 'mongoose';

const tokenPredictionSchema = new mongoose.Schema({
  tokenSymbol: { type: String, required: true, unique: true },
  hourlyPrediction: { type: Number, required: false },
  weeklyPrediction: { type: Number, required: false },
  monthlyPrediction: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('TokenPrediction', tokenPredictionSchema);
