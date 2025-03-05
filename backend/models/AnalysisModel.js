import mongoose from 'mongoose';
// Assuming FormData1 model is already defined and imported
const analysisSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  form_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FormData1',
    required: false,
    default:null
  },
  token_name: {
    type: String,
    required: false
  },
   token_code: {
    type: String,
    required: false
  },
  analysis: { type: mongoose.Schema.Types.Mixed, required: true }, // Allow JSON objects

  analysis_file_link: {
    type: String,
    required: false
  },
  score: {
    type: Number,
    required: false
  },
  count: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }  
});

const AnalysisModel = mongoose.model('Analysis', analysisSchema);

export default AnalysisModel;
