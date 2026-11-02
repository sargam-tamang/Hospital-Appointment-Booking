import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,

    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};