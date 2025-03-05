import React, { useCallback, useContext, useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import UpdatePassword from './UpdatePassword';
import DeleteProfile from './DeleteProfile';
import './EditProfile.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'
import { fetchProfile } from '../utils/commonFunc';
import toast from 'react-hot-toast'

const imageSrc = 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg';

const EditProfile = () => {
  const [imageSource, setImageSource] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);  // Update password open modal
  const [modalOpen1, setModalOpen1] = useState(false);  // Delete account open modal
  const [imageFile, setImageFile] = useState(null);

  const { user } = useContext(AuthContext);


  useEffect( () => {
    const fetchData = async () => {
      const userData = await fetchProfile(user);
      setUsername(userData?.fullname);
      setImageSource(userData?.avatar)
    }
    fetchData()
   
  }, [user]);



  const handleChangeSource = (event) => {
    const file = event.target.files[0];
    setImageFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSource(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async (event) => {
    event.preventDefault();
    if (password !== "" && password.length < 8) {
      toast('Password must be at least 8 characters long');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('image', imageFile);
    formData.append('userId',user?.userId)

    try {
      const response = await axios.put(`${process.env.REACT_APP_ROUTE_URI}/api/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    toast('Profile updated Successfully')
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="outer-block py-8">
      <div className="div-inner bg-white p-6 mx-auto max-w-md rounded-md shadow-lg">
        <h1 className="text-4xl text-center mb-6">Edit profile settings</h1>
        <br />
        <label className="block font-semibold">Update Profile Picture:</label>
        <div className="text-center">
          <Image className="mx-auto h-40 w-40 max-w-lg rounded-circle" src={imageSource || imageSrc} alt="Avatar" />
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeSource}
            className="mt-4"
          />
        </div>
        <form className="form space-y-6 py-4" onSubmit={handleSaveSettings}>
          <div>
            <label className="block font-semibold">Update Name:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold">Update Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="form-buttons">
            <button
              type="submit"
              className="btn btn-primary w-full text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300"
            >
              Save Settings
            </button>
            {/* <button
              type="button"
              className="btn btn-primary w-full text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300"
              onClick={() => setModalOpen1(true)} // This would open a modal for deleting the account
            >
              Delete Account
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
