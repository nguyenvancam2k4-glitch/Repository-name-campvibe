import { pool } from "../config/db.js"

function mapUserRow(row) {
  return {
    id: String(row.id),
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    role: row.role,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function findUserByEmail(email) {
  const result = await pool.query(
    `
      SELECT
        id,
        full_name,
        email,
        phone,
        password_hash,
        role,
        status,
        created_at,
        updated_at
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    [String(email).trim().toLowerCase()]
  )

  if (result.rows.length === 0) return null

  return result.rows[0]
}

export async function createCustomerUser(data) {
  const { fullName, email, phone, password } = data

  const result = await pool.query(
    `
      INSERT INTO users (
        full_name,
        email,
        phone,
        password_hash,
        role,
        status
      )
      VALUES ($1, $2, $3, $4, 'customer', 'active')
      RETURNING
        id,
        full_name,
        email,
        phone,
        role,
        status,
        created_at,
        updated_at
    `,
    [
      fullName.trim(),
      String(email).trim().toLowerCase(),
      phone.trim(),
      password,
    ]
  )

  return result.rows[0]
}

export function sanitizeUser(user) {
  return mapUserRow(user)
}

export function createDemoToken(user) {
  const payload = {
    id: String(user.id),
    email: user.email,
    role: user.role,
    time: Date.now(),
  }

  return Buffer.from(JSON.stringify(payload)).toString("base64url")
}
