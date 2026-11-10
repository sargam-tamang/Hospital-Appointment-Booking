/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  await knex.schema.alterTable("doctors", (t)=>{
    t.string("about", 300).defaultTo("Registered doctor with qualified skills.");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  await knex.schema.alterTable("doctors", (t)=>{
    t.dropColumn("about");
  })
};
