import axios from 'axios';
import backendUrl from '../config';

const baseUrl = backendUrl();

export async function loginUser ({ email, password }: any) {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password
    });
    return response.data;
  } catch (error: any) {
    throw new Error('Login failed', error);
  }
};

export async function createUserAccount ({ username, firstName, lastName, email, password }: any) {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, {
      username,
      firstName,
      lastName,
      email,
      password
    });
    return response.data;
  } catch (error: any) {
    throw new Error('Failed to create account', error);
  }
};

export const fetchMe = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token') as any);
    if(token) {
      const response: any = await axios.get(`${baseUrl}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    }
  } catch (error) {
    throw new Error(`Error fetching user information: ${error}`);
  }
};