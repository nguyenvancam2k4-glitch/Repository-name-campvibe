import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

const isProductionDatabase = Boolean(process.env.DATABASE_URL)

const pool = new Pool(
  isProductionDatabase
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME || "campvibe_db",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "",
      }
)

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()")
    console.log("✅ PostgreSQL connected:", result.rows[0].now)
  } catch (error) {
    console.error("❌ PostgreSQL connection error:", error.message)
  }
}

export { pool, testConnection }
