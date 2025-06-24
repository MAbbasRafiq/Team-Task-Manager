const { validationResult } = require('express-validator');
const taskModel = require('../models/taskModel');

exports.getTasksByTeam = async (req, res) => {
  const { teamId } = req.params;
  try {
    const tasks = await taskModel.getTasksByTeam(teamId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

exports.getTasksByUser = async (req, res) => {
  try {
    const tasks = await taskModel.getTasksByUser(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, description, team_id, assignee_id, due_date } = req.body;
    const [task] = await taskModel.createTask({
      title,
      description,
      team_id,
      assignee_id,
      due_date,
      status: 'pending'
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;
  try {
    const [task] = await taskModel.updateTask(taskId, updates);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    await taskModel.deleteTask(taskId);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
};
