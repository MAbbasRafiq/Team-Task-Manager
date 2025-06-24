const db = require('./db');

const findByUsername = (username) =>
  db('users').where({ username }).first();

const createUser = (username, hashedPassword) =>
  db('users').insert({ username, password: hashedPassword }).returning('*');

const findById = (id) =>
  db('users').where({ id }).first();

module.exports = { findByUsername, createUser, findById };
