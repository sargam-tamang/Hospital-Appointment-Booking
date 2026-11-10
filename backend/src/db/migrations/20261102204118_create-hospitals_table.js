/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//popularity should be less than 100
export const up = async function(knex) {
  await knex.schema.createTable("hospitals", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("city").notNullable();
    table.float("latitude").notNullable();
    table.float("longitude").notNullable();
    table.integer("popularity").notNullable().checkBetween([0, 100]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  await knex.schema.dropTable("hospitals");
};
