const db = require('./db');

const getTeamsByUserId = async (userId) => {
  return db('teams')
    .join('memberships', 'teams.id', '=', 'memberships.team_id')
    .where('memberships.user_id', userId)
    .select('teams.*');
};

const createTeam = async (name, creatorId) => {
  const [team] = await db('teams').insert({ name, creator_id: creatorId }, ['*']);
  return team;
};

const addMemberToTeam = async (userId, teamId) => {
  return db('memberships').insert({ user_id: userId, team_id: teamId }).onConflict(['user_id', 'team_id']).ignore();
};

const getTeamMembers = (teamId) => {
  return db('users')
    .join('memberships', 'users.id', '=', 'memberships.user_id')
    .where('memberships.team_id', teamId)
    .select('users.id', 'users.username');
};

module.exports = { getTeamsByUserId, createTeam, addMemberToTeam, getTeamMembers };
