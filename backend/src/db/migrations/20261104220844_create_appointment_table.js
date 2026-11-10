/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
    await knex.schema.createTable("appointments", (table) => {
        table.increments("id").primary();
        table.integer("user_id").notNullable().references("id").inTable("users");
        table.integer("doctor_id").notNullable().references("id").inTable("doctors");
        table.timestamp("appointment_at").notNullable();
        table.enu("status", ["requested", "scheduled", "cancelled", "completed"]);
        table.timestamp("created_at").notNullable();
        table.timestamp("updated_at").notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
    await knex.schema.dropTable("appointments");
};
