import axios from 'axios';
import backendUrl from '../config';

const baseUrl = backendUrl();

export const addComment = async ({ text, commentBy, videoId }: any) => {
  try {
    const token = JSON.parse(localStorage.getItem('token') as any);
    await axios.post(`${baseUrl}/video/${videoId}/comments`, { text, commentBy, videoId }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    throw new Error(`${error}`)
  }
};

export const loadMoreComments = async (videoId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/videos/search/${videoId}`);
    const { data } = response;
    return data.comments;
  } catch (error) {
    throw new Error(`${error}`)
  }
};
