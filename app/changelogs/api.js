// src/api.js
import axios from 'axios';

export const fetchChangelogs = async () => {
  const username = process.env.REACT_APP_USERNAME;
  const password = process.env.REACT_APP_PASSWORD;
  const apiKey = process.env.REACT_APP_APIKEY;
  const apiUrl = process.env.REACT_APP_API_URL;

  try {
    // Pastikan header authorization diatur dengan benar sesuai dengan kebutuhan API Anda
    const response = await axios.get(`${apiUrl}/changelogs`, {
      headers: {
        'Content-Type': 'application/json',
        'username': username,
        'password': password,
        'apikey': apiKey
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching changelogs:', error);
    throw error;
  }
};
