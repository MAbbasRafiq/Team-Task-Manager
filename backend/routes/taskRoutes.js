const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/user', taskController.getTasksByUser);
router.get('/team/:teamId', taskController.getTasksByTeam);

router.post('/', [
  body('title').notEmpty(),
  body('team_id').isNumeric()
], taskController.createTask);

router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
