const express = require('express');
const { body } = require('express-validator');
const teamController = require('../controllers/teamController');

const router = express.Router();

router.get('/', teamController.getTeams);
router.post('/', [body('name').notEmpty()], teamController.createTeam);

router.post('/:teamId/members', teamController.addMemberToTeam);
router.get('/:teamId/members', teamController.getTeamMembers);

module.exports = router;
