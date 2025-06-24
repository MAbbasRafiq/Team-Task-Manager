/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tasks', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.integer('team_id').unsigned().references('id').inTable('teams').onDelete('CASCADE');
    table.integer('assignee_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
    table.string('status').defaultTo('pending');
    table.date('due_date');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};