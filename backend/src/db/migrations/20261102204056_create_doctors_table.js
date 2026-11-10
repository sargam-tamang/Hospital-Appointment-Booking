// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */

import dotenv from "dotenv";
dotenv.config();

const SPECIALIZATION = JSON.parse(process.env.SPECIALIZATION) || ["cardiologist", "dermatologist", "gastroenterologist", "general_practitioner"];

export const up = async function(knex) {

  await knex.schema.createTable("doctors", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable();
    table.integer("hospital_id").notNullable();
    table.enu("specialization", SPECIALIZATION).notNullable().defaultTo("general_practitioner");
  });
};

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
export const down = async function(knex) {
  await knex.schema.dropTable("doctors");
};
