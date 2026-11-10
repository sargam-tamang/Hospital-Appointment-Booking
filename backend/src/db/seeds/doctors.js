/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Remove existing doctors to avoid duplicate records
  await knex("doctors").del();

  const doctors = [
    {
      first_name: "James",
      last_name: "Wilson",
      about: "Experienced cardiologist specializing in heart disease prevention and treatment.",
      email: "james.wilson@example.com",
      hospital_id: 1,
      specialization: "cardiologist",
    },
    {
      first_name: "Emily",
      last_name: "Brown",
      about: "Dermatologist focused on skin health, acne treatment, and skin conditions.",
      email: "emily.brown@example.com",
      hospital_id: 1,
      specialization: "dermatologist",
    },
    {
      first_name: "Michael",
      last_name: "Taylor",
      about: "Gastroenterologist with experience treating digestive system disorders.",
      email: "michael.taylor@example.com",
      hospital_id: 2,
      specialization: "gastroenterologist",
    },
    {
      first_name: "Sarah",
      last_name: "Johnson",
      about: "General practitioner providing comprehensive primary healthcare.",
      email: "sarah.johnson@example.com",
      hospital_id: 2,
      specialization: "general_practitioner",
    },
    {
      first_name: "David",
      last_name: "Anderson",
      about: "Cardiologist specializing in cardiovascular health and heart monitoring.",
      email: "david.anderson@example.com",
      hospital_id: 3,
      specialization: "cardiologist",
    },
    {
      first_name: "Olivia",
      last_name: "Thomas",
      about: "Dermatologist experienced in diagnosing and treating skin conditions.",
      email: "olivia.thomas@example.com",
      hospital_id: 3,
      specialization: "dermatologist",
    },
    {
      first_name: "Daniel",
      last_name: "White",
      about: "Gastroenterologist specializing in digestive health and gastrointestinal disorders.",
      email: "daniel.white@example.com",
      hospital_id: 1,
      specialization: "gastroenterologist",
    },
    {
      first_name: "Sophia",
      last_name: "Martin",
      about: "General practitioner dedicated to preventive care and family medicine.",
      email: "sophia.martin@example.com",
      hospital_id: 2,
      specialization: "general_practitioner",
    },
    {
      first_name: "William",
      last_name: "Clark",
      about: "Cardiologist providing diagnosis and treatment for cardiovascular conditions.",
      email: "william.clark@example.com",
      hospital_id: 3,
      specialization: "cardiologist",
    },
    {
      first_name: "Isabella",
      last_name: "Lewis",
      about: "Dermatologist specializing in skin disorders and general dermatological care.",
      email: "isabella.lewis@example.com",
      hospital_id: 1,
      specialization: "dermatologist",
    },
    {
      first_name: "Benjamin",
      last_name: "Walker",
      about: "Gastroenterologist focused on digestive health and patient care.",
      email: "benjamin.walker@example.com",
      hospital_id: 2,
      specialization: "gastroenterologist",
    },
    {
      first_name: "Charlotte",
      last_name: "Hall",
      about: "General practitioner providing patient-focused primary medical care.",
      email: "charlotte.hall@example.com",
      hospital_id: 3,
      specialization: "general_practitioner",
    },
  ];

  await knex("doctors").insert(doctors);
};
