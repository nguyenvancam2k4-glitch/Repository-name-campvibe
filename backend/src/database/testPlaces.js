import dotenv from "dotenv"
import { pool } from "../config/db.js"
import { findAllPlaces, findPlaceById } from "../models/placeModel.js"

dotenv.config()

async function main() {
  try {
    const places = await findAllPlaces()
    const firstPlace = await findPlaceById(1)

    console.log("✅ Lấy địa điểm từ PostgreSQL thành công!")
    console.log("Số địa điểm:", places.length)
    console.log("Địa điểm đầu tiên:", firstPlace?.name)
    console.log("Nguồn dữ liệu: PostgreSQL")
  } catch (error) {
    console.error("❌ Lấy địa điểm từ PostgreSQL thất bại!")
    console.error("Lỗi:", error.message)
  } finally {
    await pool.end()
  }
}

main()
