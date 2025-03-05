import React, { useContext, useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.min.js'
import './profile.css';
import { AuthContext } from '../context/AuthContext';
import { fetchProfile } from '../utils/commonFunc';

const imageSrc = 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg';


const Profile = () => {
  const { user } = useContext(AuthContext);
  const [imageSource, setImageSource] = useState('');
  const [userData, setUserData] = useState('');

  useEffect( () => {
    const fetchData = async () => {
      const userData = await fetchProfile(user);
      setUserData(userData);
      setImageSource(userData?.avatar)
    }
    fetchData()
   
  }, [user]);
  return (
    <div className="main-background py-8">
        <h1 className="text-4xl text-center mb-6 text-white">Profile Information</h1>
        <main className="block-outer flex-grow container-fluid mx-auto px-2 py-4">
          <ul className="block-inner list-group">
            <li className="list-group-item mx-auto mb-2 custom-outline">
              <Image
                src={imageSource || imageSrc}
                roundedCircle
                style={{ width: '150px' }}
              />
            </li>
            <li className="list-group-item custom-bg font-semibold text-center fs-4">{userData?.fullname}</li>
          </ul>

          <ul className="list-group list-group-flush list-group-custom rounded-md shadow-lg rounded-2">
            <li className="list-group-item custom-bg font-semibold d-flex justify-content-between align-items-center">Full Name
              <span className='font-normal'>{userData?.fullname}</span>
            </li>
            <li className="list-group-item custom-bg font-semibold d-flex justify-content-between align-items-center">Email
              <span className='font-normal'>{userData?.email}</span>
            </li>
            <li className="list-group-item custom-bg font-semibold d-flex justify-content-between align-items-center">Password
              <span className='font-normal'>********</span>
            </li>            
            <li className="list-group-item custom-bg font-semibold d-flex justify-content-between align-items-center">Base Currency
              <span className='font-normal'>USD ($)</span>
              <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                <Dropdown.Item href="#/action-1">USD ($)</Dropdown.Item>
                <Dropdown.Item href="#/action-2">EURO (€)</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Bitcoin (BTC)</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Ethereum (ETH)</Dropdown.Item>
              </DropdownButton>
            </li>
            <li className="list-group-item custom-bg font-semibold d-flex justify-content-between align-items-center">Google Account
              <span className='font-normal'>...</span>
              <button class="btn btn-primary px-3">Connect</button>
            </li>
            <li className="list-group-item custom-bg font-semibold d-flex justify-content-between align-items-center">Facebook Account
              <span className='font-normal'>USER'S FACEBOOK ACCOUNT</span>
              <button class="btn btn-primary px-3">Disconnect</button>
            </li>     
            <li className="list-group-item custom-bg font-semibold d-flex justify-content-between align-items-center">Twitter Account
              <span className='font-normal'>...</span>
              <button class="btn btn-primary px-3">Connect</button>
            </li>      
            <li className="list-group-item custom-bg font-semibold d-flex justify-content-between align-items-center">Apple Account
              <span className='font-normal'>...</span>
              <button class="btn btn-primary px-3">Connect</button>
            </li>  
            <li className="list-group-item custom-bg font-semibold d-flex justify-content-between align-items-center">API Key
              <span className='font-normal'>...</span>
              <button class="btn btn-primary px-3">Create Key</button>
            </li>
          </ul>
          <div className="list-group mt-4">
            <Link to="/editprofile" className="list-group-item btn btn-edit border-0">Edit Account</Link>
            <button className="list-group-item btn btn-delete border-0" href="/">Delete Account</button>
          </div>
        </main>

  </div>

  );
};

export default Profile;
