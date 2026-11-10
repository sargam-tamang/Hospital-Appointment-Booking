/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import { faker } from "@faker-js/faker";

export const seed = async function(knex) {
  await knex("hospitals").del();

  const cities = [
    "London",
    "Manchester",
    "Birmingham",
    "Leeds",
    "Liverpool",
    "Bristol",
    "Sheffield",
    "Nottingham",
    "Oxford",
    "Cambridge",
  ];

  const hospitals = Array.from({ length: 20 }, () => {
    const city = faker.helpers.arrayElement(cities);

    return {
      name: `${faker.location.street()} ${faker.helpers.arrayElement([
        "Hospital",
        "Medical Centre",
        "Healthcare Centre",
      ])}`,
      city,
      latitude: faker.location.latitude({
        min: 50.0,
        max: 55.8,
        fractionDigits: 4,
      }),
      longitude: faker.location.longitude({
        min: -5.5,
        max: 1.8,
        fractionDigits: 4,
      }),
      popularity: faker.number.int({ min: 0, max: 100 }),
    };
  });

  await knex("hospitals").insert(hospitals);
};
