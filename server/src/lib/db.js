import pg from "pg";
import env from "../config/env.js";

const { Pool } = pg;

const pool = new Pool({
    connectionString: env.DATABASE_URL
});

async function initDB() {
    let client;

    try {
        client = await pool.connect();
        console.log("Database connection successfully.");
    } catch (error) {
        console.log("Database connection failed.");
        console.error(error);
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function query(statement, values) {
    return await pool.query(statement, values);
}

export { initDB, query };