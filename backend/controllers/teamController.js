const { validationResult } = require('express-validator');
const teamModel = require('../models/teamModel');
const userModel = require('../models/userModel');

exports.getTeams = async (req, res) => {
  try {
    const teams = await teamModel.getTeamsByUserId(req.user.id);
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch teams' });
  }
};

exports.createTeam = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name } = req.body;
    const team = await teamModel.createTeam(name, req.user.id);
    await teamModel.addMemberToTeam(req.user.id, team.id);
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create team', error: err.message });
  }
};

exports.addMemberToTeam = async (req, res) => {
  const { teamId } = req.params;
  const { username } = req.body;

    console.log(`Received request to add user: ${username} to team: ${teamId}`);
    
  try {
    const user = await userModel.findByUsername(username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await teamModel.addMemberToTeam(user.id, teamId);
    res.json({ message: 'Member added' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add member', error: err.message });
  }
};

exports.getTeamMembers = async (req, res) => {
  const { teamId } = req.params;
  try {
    const members = await teamModel.getTeamMembers(teamId);
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch team members' });
  }
};
