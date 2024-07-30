import axios from 'axios';
import backendUrl from '../config';

const baseUrl = backendUrl();

export const fetchVideoDetails = async (videoId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/videos/search/${videoId}`);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const fetchVideos = async () => {
  try {
    const response = await axios.get(`${baseUrl}/videos/search`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching more videos: ${error}`)
  }
};

export const uploadVideo = async (data: any) => {
  const token = JSON.parse(localStorage.getItem('token') as any);
  const response = await axios.post(`${baseUrl}/videos/upload`, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
