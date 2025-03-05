
// frontend/src/services/api.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_ROUTE_URI}/api/forms`;

export const submitFormData = async (formData) => {
  const response = await axios.post(`${API_URL}/submit`, formData, {
    withCredentials: true // Include credentials if needed
  });
  return response.data;
};

export const emailFormData = async (formTitle, formData) => {
  try {
    await axios.post(`${API_URL}/email`, {title: formTitle, data: formData}, {
      withCredentials: true // Include credentials if needed
    });
  } catch (error) {
    console.log(error)
  }
};

