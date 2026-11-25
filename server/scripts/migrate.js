import pg from "pg";
import fs from "node:fs"
import path from "node:path";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config();

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function migrate() {
    const client = await pool.connect();

    try {

        await client.query(`
            CREATE TABLE IF NOT EXISTS schema_migrations (
                id SERIAL PRIMARY KEY,
                filename VARCHAR(255) UNIQUE NOT NULL,
                executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        const migrationDir = path.join(__dirname, "../sql/migrations");

        const files = fs.readdirSync(migrationDir).filter(file => file.endsWith(".sql")).sort();

        for (const file of files) {
            const result = await client.query(
                "SELECT id FROM schema_migrations WHERE filename = $1", [file]
            );

            if (result.rowCount > 0) {
                console.log(`Skipped: ${file}`);
                continue;
            }

            console.log(`Running: ${file}`);

            const sql = fs.readFileSync(
                path.join(migrationDir, file),
                "utf-8"
            );

            await client.query("BEGIN");

            try {
                await client.query(sql);

                await client.query(
                    "INSERT INTO schema_migrations (filename) VALUES ($1)",
                    [file]
                );

                await client.query("COMMIT");

                console.log(`Completed: ${file}`);

            } catch (error) {
                await client.query("ROLLBACK");
                throw error;
            }
        }

        console.log("All migrations completed.");

    } catch (error) {
        console.log(`Migration failed:`, error);
        process.exitCode = 1;
    } finally {
        client.release();
        await pool.end();
    }
}

migrate();