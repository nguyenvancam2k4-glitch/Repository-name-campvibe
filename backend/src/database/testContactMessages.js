import dotenv from "dotenv"
import { pool } from "../config/db.js"

dotenv.config()

async function main() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        full_name VARCHAR(150) NOT NULL,
        email VARCHAR(150),
        phone VARCHAR(30) NOT NULL,
        subject VARCHAR(200),
        message TEXT NOT NULL,
        status VARCHAR(30) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    const result = await pool.query("SELECT COUNT(*)::int AS total FROM contact_messages")

    console.log("✅ Bảng contact_messages đã sẵn sàng!")
    console.log("Số liên hệ hiện có:", result.rows[0].total)
    console.log("Endpoint:", "/api/contacts")
  } catch (error) {
    console.error("❌ Kiểm tra contact_messages thất bại!")
    console.error("Lỗi:", error.message)
  } finally {
    await pool.end()
  }
}

main()
