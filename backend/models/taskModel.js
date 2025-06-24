const db = require('./db');

const getTasksByTeam = (teamId) =>
  db('tasks').where({ team_id: teamId });

const getTasksByUser = (userId) =>
  db('tasks').where({ assignee_id: userId });

const createTask = (data) =>
  db('tasks').insert(data).returning('*');

const updateTask = (id, data) =>
  db('tasks').where({ id }).update(data).returning('*');

const deleteTask = (id) =>
  db('tasks').where({ id }).del();

module.exports = {
  getTasksByTeam,
  getTasksByUser,
  createTask,
  updateTask,
  deleteTask
};
