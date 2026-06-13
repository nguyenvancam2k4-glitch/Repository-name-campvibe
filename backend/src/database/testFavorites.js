import dotenv from "dotenv"
import { pool } from "../config/db.js"

dotenv.config()

async function main() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_favorites (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, place_id)
      )
    `)

    const result = await pool.query(`
      SELECT f.id, f.user_id, f.place_id, p.name AS place_name
      FROM user_favorites f
      LEFT JOIN places p ON p.id = f.place_id
      ORDER BY f.id DESC
      LIMIT 5
    `)

    console.log("✅ Bảng user_favorites đã sẵn sàng!")
    console.log("Số bản ghi đang xem thử:", result.rows.length)
    console.log("Endpoint:", "/api/favorites/user/:userId")
  } catch (error) {
    console.error("❌ Kiểm tra favorites thất bại!")
    console.error("Lỗi:", error.message)
  } finally {
    await pool.end()
  }
}
main()
