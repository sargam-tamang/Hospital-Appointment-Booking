import { faker } from "@faker-js/faker";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("prescriptions").del();

  const med_type = ["tablet", "capsule", "syrup", "injection", "ointment", "other"];
  await knex("prescriptions").insert([
    {
      user_id: 502,
      doctor_id: 1,
      med_name: "Paracetamol",
      med_type: faker.helpers.arrayElement(med_type),
      dosage: "500mg",
      morning: true,
      afternoon: true,
      evening: false,
      instructions: "Take after meals",
      start_date: "2026-11-01",
      end_date: "2026-11-07",
    },
    {
      user_id: 502,
      doctor_id: 1,
      med_name: "Amoxicillin",
      med_type: faker.helpers.arrayElement(med_type),
      dosage: "250mg",
      morning: true,
      afternoon: false,
      evening: true,
      instructions: "Take with water",
      start_date: "2026-11-01",
      end_date: "2026-11-08",
    },
    {
      user_id: 502,
      doctor_id: 2,
      med_name: "Cetirizine",
      med_type: faker.helpers.arrayElement(med_type),
      dosage: "10mg",
      morning: true,
      afternoon: false,
      evening: false,
      instructions: "Take once daily",
      start_date: "2026-11-03",
      end_date: null,
    },
    {
      user_id: 502,
      doctor_id: 2,
      med_name: "Salbutamol",
      med_type: faker.helpers.arrayElement(med_type),
      dosage: "100mcg",
      morning: false,
      afternoon: false,
      evening: true,
      instructions: "Use as prescribed",
      start_date: "2026-11-03",
      end_date: null,
    },
    {
      user_id: 503,
      doctor_id: 1,
      med_name: "Omeprazole",
      med_type: faker.helpers.arrayElement(med_type),
      dosage: "20mg",
      morning: true,
      afternoon: false,
      evening: false,
      instructions: "Take before breakfast",
      start_date: "2026-11-05",
      end_date: "2026-11-19",
    },
  ]);
};
