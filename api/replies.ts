import axios from 'axios';
import backendUrl from '../config';

const baseUrl = backendUrl();

export async function fetchRepliesForComment (commentId: any) {
  try {
    const response = await axios.get(`${baseUrl}/video/comment/${commentId}/replies`);
    return response.data;
  } catch (error: any) {
    throw new Error('Error occurred: ', error);
  }
};

export async function replyToComment (data: any, token: string) {
  try {
    const response = await axios.post(`${baseUrl}/video/comment/reply`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error('Error occurred: ', error);
  }
};