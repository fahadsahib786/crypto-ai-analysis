import UserProfile from '../models/Profile.js';  // Adjust the path as necessary
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import aws from 'aws-sdk';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import util from 'util';
import fs from 'fs';
import User from '../models/User.js';
import { profile } from 'console';


dotenv.config();


aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

const generatePresignedUrl = (key) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Expires: 60 * 5 * 12, // URL expiration time in seconds (1 hour)
  };

  return s3.getSignedUrl('getObject', params);
};

const getProfile = async (req, res) => {
  const { userId} = req.body;
  try {
    // Retrieve user data
    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve user profile data
    const userProfile = await UserProfile.findOne({ userId }).lean();
    
    // Combine user and profile data
    let profileData = {
      ...user,
      ...userProfile
    };
    if(profileData?.awsAvatarKey){
      let avatarUrl = generatePresignedUrl(profileData.awsAvatarKey);
      profileData.avatar = avatarUrl 
    }
    res.status(200).json(profileData);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error retrieving profile', details: error.message });
  }
};

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');  // Save files in the 'images' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Use current timestamp + original file name
  }
});

// Set up multer middleware
export const upload = multer({ storage: storage });
 const updateProfile = async (req, res) => {
  const { username, password,userId } = req.body;
  const file = req.file;
  let imageUrl;
  let key;

   if(file){
     const readFile = util.promisify(fs.readFile);
     const fileBuffer = await readFile(file.path);
     const params = {
       Bucket: process.env.S3_BUCKET_NAME,
       Key: `${uuidv4()}-${file.originalname}`,
       Body: fileBuffer,
       ContentType: file.mimetype,
      };
      const data = await s3.upload(params).promise();
      imageUrl = data.Location
      key = data.Key
      
    }

    try {
      const currentProfile = await User.findById(userId);
  
      let updateData = {
        awsAvatarUrl: imageUrl || currentProfile.awsAvatarUrl,
        awsAvatarKey: key || currentProfile.awsAvatarKey,
        fullname: username || currentProfile.fullname,
      };
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }
  
      const profile = await User.findByIdAndUpdate(userId, updateData, { new: true });
  
      res.status(201).send({ message: 'success', profile });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).send({ message: 'Error updating profile', error });
    }
};
/* const updateProfile = async (req, res) => {
  console.log(req.body)
  // Use multer to handle file upload
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file', details: err.message });
    }

    const { userId } = req.params;
    const updateData = req.body;

    try {
      // Separate data for user and profile
      const userFields = ['fullname', 'username', 'email'];
      const userData = {};
      const profileData = {};

      // Distribute the fields into userData and profileData
      for (const key in updateData) {
        if (userFields.includes(key)) {
          userData[key] = updateData[key];
        } else {
          profileData[key] = updateData[key];
        }
      }

      // Handle avatar upload
      if (req.file) {
        // Save the file name in the avatar column
        profileData.avatar = req.file.filename;
      }

      // Update user data if there is any
      let updatedUser;
      if (Object.keys(userData).length > 0) {
        updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true, runValidators: true }).lean();
      }

      // Update profile data if there is any
      let updatedUserProfile;
      if (Object.keys(profileData).length > 0) {
        updatedUserProfile = await UserProfile.findOneAndUpdate(
          { userId }, 
          profileData, 
          { new: true, upsert: true, runValidators: true }
        ).lean();
      }

      // Combine updated user and profile data
      const updatedProfileData = {
        ...updatedUser,
        ...updatedUserProfile
      };

      res.status(200).json({ message: 'Profile updated successfully', data: updatedProfileData });
    } catch (error) {
      res.status(500).json({ error: 'Error updating profile', details: error.message });
    }
  });
}; */

const updatePassword = async (req, res) => {
  const { newPassword,userId } = req.body;  // Extract the new password from the request body

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true, runValidators: true });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error });
  }
};

export { getProfile, updatePassword, updateProfile };
