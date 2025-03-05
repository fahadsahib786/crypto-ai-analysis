import mongoose from 'mongoose';

const tokenDistributionSchema = new mongoose.Schema({
  Founders: { type: String, required: false },
  Developers: { type: String, required: false },
  Marketing: { type: String, required: false },
  Community: { type: String, required: false },
  Investors: { type: String, required: false }
});

const teamExpertiseSchema = new mongoose.Schema({
  CEO: { type: String, required: false },
  CFO: { type: String, required: false },
  CTO: { type: String, required: false },
  CMO: { type: String, required: false },
  Developer: { type: String, required: false }
});

const formDataSchema = new mongoose.Schema({
  projectName: { type: String, required: false },
  projectDescription: { type: String, required: false },
  tokenName: { type: String, required: false },
  tokenSymbol: { type: String, required: false },
  tokenContractAddress: { type: String, required: false },
  blockchainExplorerUrl: { type: String, required: false },
  websiteUrl: { type: String, required: false },
  technology: { type: [String], required: false },
  blockchain: { type: [String], required: false },
  problemSolution: { type: String, required: false },
  roadmapMilestones: { type: String, required: false },
  whitepaperUrl: { type: String, required: false },
  litepaperUrl: { type: String, required: false },
  githubUrl: { type: String, required: false },
  exchanges: { type: String, required: false },
  supply: { type: String, required: false },
  tokenDistribution: { type: tokenDistributionSchema, required: false },
  vestingSchedules: { type: String, required: false },
  useCases: { type: String, required: false },
  incentives: { type: [String], required: false },
  mechanisms: { type: [String], required: false },
  economicSustainability: { type: String, required: false },
  auditReportUrl: { type: String, required: false },
  auditSummary: { type: String, required: false },
  liquidityLockup: { type: String, required: false },
  marketCapitalization: { type: String, required: false },
  TeamExpertise: { type: teamExpertiseSchema, required: false },
  academicBackground: { type: [String], required: false },
  twitter: { type: String, required: false },
  telegram: { type: String, required: false },
  discord: { type: String, required: false },
  linkedin: { type: String, required: false },
  facebook: { type: String, required: false },
  twitch: { type: String, required: false },
  tiktok: { type: String, required: false },
  socialMediaLinks: { type: String, required: false },
  linkTreeLink: { type: String, required: false },
  userReviews: { type: String, required: false },
  youtubeUrl: { type: String, required: false },
  marketingEfforts: { type: String, required: false },
  brandIdentity: { type: String, required: false },
  targetAudienceReach: { type: String, required: false },
  listOfCompetitors: { type: String, required: false },
  advantagesDisadvantages: { type: String, required: false },
  usp: { type: String, required: false },
  focus: { type: String, required: false },
  revenueStreams: { type: [String], required: false },
  modelSustainability: { type: String, required: false },
  fundingSources: { type: [String], required: false },
  keyPartners: { type: String, required: false },
  pitchDeck: { type: String, required: false },
  additionalInformation: { type: String, required: false },
  emailAddress: { type: String, required: false },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: false },
  linkTree: { type: String, required: false },
  Team_Roles: { type: String, required: false },
  teamExpertise: { type: teamExpertiseSchema, required: false }
});

const FormData1 = mongoose.model('FormData1', formDataSchema);

export default FormData1;
