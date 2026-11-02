console.log("Starting database test...");

const db = require("../db/knex");

async function testConnection() {
  try {
    console.log("Running database query...");

    const result = await db.raw("SELECT 1 AS connection_test");

    console.log("Database connected successfully!");
    console.log("Result:", result.rows);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    console.log("Closing database connection...");
    await db.destroy();
  }
}

testConnection();