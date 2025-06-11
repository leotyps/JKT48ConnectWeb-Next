// src/api.js
import axios from 'axios';

export const fetchChangelogs = async () => {
  try {
    const response = await axios.get('https://v2.jkt48connect.my.id/api/database/changelogs?username=vzy&password=vzy&apikey=JKTCONNECT');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching changelogs:', error);
    throw error;
  }
};
