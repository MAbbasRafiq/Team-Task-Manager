import axios from 'axios';

const API_URL = 'https://team-task-manager-2-a40r.onrender.com';

export const register = (username, password) =>
  axios.post(`${API_URL}/register`, { username, password }, { withCredentials: true });

export const login = (username, password) =>
  axios.post(`${API_URL}/login`, { username, password }, { withCredentials: true });

export const logout = () =>
  axios.post(`${API_URL}/logout`, {}, { withCredentials: true });

export const getMe = () =>
  axios.get(`${API_URL}/me`, { withCredentials: true });
