import axios from 'axios';

const API_URL = 'http://localhost:3001/api/tasks';

export const getTasksByUser = () =>
  axios.get(`${API_URL}/user`, { withCredentials: true });

export const getTasksByTeam = (teamId) =>
  axios.get(`${API_URL}/team/${teamId}`, { withCredentials: true });

export const createTask = (task) =>
  axios.post(API_URL, task, { withCredentials: true });

export const updateTask = (taskId, updates) =>
  axios.put(`${API_URL}/${taskId}`, updates, { withCredentials: true });

export const deleteTask = (taskId) =>
  axios.delete(`${API_URL}/${taskId}`, { withCredentials: true });
