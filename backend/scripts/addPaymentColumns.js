import fs from "fs"
import path from "path"
import { pathToFileURL } from "url"

async function loadPool() {
  const candidates = [
    "src/config/db.js",
    "config/db.js",
    "src/database/db.js",
    "database/db.js",
    "src/db.js",
    "db.js",
  ]

  for (const candidate of candidates) {
    const absolutePath = path.resolve(process.cwd(), candidate)
    if (fs.existsSync(absolutePath)) {
      const module = await import(pathToFileURL(absolutePath).href)
      return module.default || module.pool || module.db
    }
  }

  throw new Error("Không tìm thấy file kết nối database.")
}

async function columnExists(pool, tableName, columnName) {
  const result = await pool.query(
    `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = $1 AND column_name = $2
    `,
    [tableName, columnName]
  )

  return result.rowCount > 0
}

async function addColumnIfMissing(pool, tableName, columnName, definition) {
  const exists = await columnExists(pool, tableName, columnName)
  if (!exists) {
    await pool.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`)
    console.log(`✅ Đã thêm cột ${columnName}`)
  } else {
    console.log(`ℹ️ Cột ${columnName} đã tồn tại`)
  }
}

async function migrate() {
  const pool = await loadPool()

  try {
    await addColumnIfMissing(pool, "bookings", "payment_method", "VARCHAR(80)")
    await addColumnIfMissing(pool, "bookings", "payment_status", "VARCHAR(40) DEFAULT 'unpaid'")
    await addColumnIfMissing(pool, "bookings", "paid_amount", "NUMERIC(12, 0) DEFAULT 0")
    await addColumnIfMissing(pool, "bookings", "transaction_code", "VARCHAR(80)")
    await addColumnIfMissing(pool, "bookings", "paid_at", "TIMESTAMP")

    const result = await pool.query(`
      SELECT id, booking_code, status, payment_method, payment_status, paid_amount, transaction_code
      FROM bookings
      ORDER BY id DESC
      LIMIT 10
    `)

    console.log("✅ Bảng bookings đã sẵn sàng cho chức năng thanh toán.")
    console.table(result.rows)
  } finally {
    await pool.end()
  }
}

migrate().catch((error) => {
  console.error("❌ Lỗi migrate payment:", error)
  process.exitCode = 1
})
