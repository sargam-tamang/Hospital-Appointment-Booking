import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,

    migrations: {
      directory: "./src/db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
};