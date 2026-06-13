import { pool } from "../config/db.js"

function mapContactRow(row) {
  return {
    id: String(row.id),
    userId: row.user_id ? String(row.user_id) : null,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function createContactMessage(data) {
  const result = await pool.query(
    `
      INSERT INTO contact_messages (
        user_id,
        full_name,
        email,
        phone,
        subject,
        message,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6, 'new')
      RETURNING *
    `,
    [
      data.userId || null,
      data.fullName,
      data.email || null,
      data.phone,
      data.subject || null,
      data.message,
    ]
  )

  return mapContactRow(result.rows[0])
}

export async function findAllContactMessages() {
  const result = await pool.query(`
    SELECT *
    FROM contact_messages
    ORDER BY created_at DESC, id DESC
  `)

  return result.rows.map(mapContactRow)
}

export async function updateContactMessageStatus(id, status) {
  const result = await pool.query(
    `
      UPDATE contact_messages
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `,
    [status, id]
  )

  return result.rows[0] ? mapContactRow(result.rows[0]) : null
}
