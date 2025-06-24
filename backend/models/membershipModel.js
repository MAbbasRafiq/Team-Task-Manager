const db = require('./db');

const addMembership = (userId, teamId) =>
  db('memberships').insert({ user_id: userId, team_id: teamId }).onConflict(['user_id', 'team_id']).ignore();

module.exports = { addMembership };
