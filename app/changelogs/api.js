// src/api.js
import axios from 'axios';

export const fetchChangelogs = async () => {
  try {
    const response = await axios.get('https://v2.jkt48connect.my.id/api/database/changelogs', {
      headers: {
        'username': process.env.REACT_APP_USERNAME,
        'password': process.env.REACT_APP_PASSWORD,
        'apikey': process.env.REACT_APP_APIKEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching changelogs:', error);
    throw error;
  }
};
