import axios from 'axios';

const API_URL = 'https://team-task-manager-2-a40r.onrender.com';

export const getTeams = () =>
  axios.get(API_URL, { withCredentials: true });

export const createTeam = (name) =>
  axios.post(API_URL, { name }, { withCredentials: true });

export const addMemberToTeam = (teamId, username) =>
  axios.post(`${API_URL}/${teamId}/members`, { username }, { withCredentials: true });

export const getTeamMembers = (teamId) =>
  axios.get(`${API_URL}/${teamId}/members`, { withCredentials: true });
