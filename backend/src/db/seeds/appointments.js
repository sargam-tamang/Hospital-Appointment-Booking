/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import { faker } from "@faker-js/faker";

export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("appointments").del();

  // Get existing user and doctor IDs
  const users = await knex("users").select("id");
  const doctors = await knex("doctors").select("id");

  if (users.length === 0 || doctors.length === 0) {
    throw new Error("Please seed users and doctors before appointments.");
  }

  const statuses = [
    "scheduled",
    "cancelled",
    "completed",
  ];

  const now = new Date();

  const appointments = Array.from({ length: 50 }, () => {
    const appointmentDate = faker.date.between({
      from: new Date("2026-01-01T00:00:00"),
      to: new Date("2026-12-31T23:59:59"),
    });

    return {
      user_id: faker.helpers.arrayElement(users).id,
      doctor_id: faker.helpers.arrayElement(doctors).id,
      appointment_at: appointmentDate,
      status: faker.helpers.arrayElement(statuses),
      created_at: now,
      updated_at: now,
    };
  });

  await knex("appointments").insert(appointments);
};
