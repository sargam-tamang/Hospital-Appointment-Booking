/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
    await knex.schema.createTable("prescriptions", (table) => {
        table.increments("id").primary();
        table.integer("user_id").notNullable();
        table.integer("doctor_id").notNullable();
        table.string("med_name").notNullable();
        table.enu("med_type",["tablet", "capsule", "syrup", "injection", "ointment", "other"]);
        table.text("instructions").nullable();
        table.string("dosage").notNullable();

        // Daily schedule
        table.boolean("morning").notNullable().defaultTo(false);
        table.boolean("afternoon").notNullable().defaultTo(false);
        table.boolean("evening").notNullable().defaultTo(false);

        table.date("start_date").notNullable();
        table.date("end_date").nullable();
        table.timestamp("create_at").notNullable().defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  await knex.schema.dropTable("prescriptions");
};
