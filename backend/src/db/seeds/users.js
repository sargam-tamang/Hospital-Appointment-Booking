/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

export const seed = async function (knex) {
  // await knex("users").del();
  faker.seed(12345);

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("DevOnly123!", salt);

  const totalUsers = 100;
  const batchSize = 100;

  const users = Array.from({ length: totalUsers }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: passwordHash,
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }));


  //just batch insert the users to the database
  for (let i = 0; i < users.length; i += batchSize) {
    await knex("users")
      .insert(users.slice(i, i + batchSize))
      .onConflict("email")
      .ignore();
    console.log(`Inserted ${i} to ${i + batchSize} users`);
  }

  console.log(`${totalUsers} users generated!`);
};
