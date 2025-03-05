import FormData from '../models/FormData.js';

const getRecentAnalyses = async (req, res) => {
  try {
    const analyses = await FormData.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(analyses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analyses', error });
  }
};

export { getRecentAnalyses };
