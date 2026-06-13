import dotenv from "dotenv"
import { pool } from "../config/db.js"
import { findAllExperiences } from "../models/experienceModel.js"

dotenv.config()

async function main() {
  try {
    const experiences = await findAllExperiences()

    console.log("✅ Lấy trải nghiệm từ PostgreSQL thành công!")
    console.log("Số trải nghiệm:", experiences.length)
    console.log("Trải nghiệm đầu tiên:", experiences[0]?.title)
    console.log("Nguồn dữ liệu: PostgreSQL")
  } catch (error) {
    console.error("❌ Lấy trải nghiệm từ PostgreSQL thất bại!")
    console.error("Lỗi:", error.message)
  } finally {
    await pool.end()
  }
}

main()
