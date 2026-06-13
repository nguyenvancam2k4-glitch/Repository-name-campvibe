import { pool } from "../config/db.js"

function mapExperienceRow(row) {
  return {
    id: String(row.id),
    title: row.title,
    category: row.category,
    price: Number(row.price || 0),
    priceText: `${Number(row.price || 0).toLocaleString("vi-VN")}đ`,
    imageUrl: row.image_url,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function findAllExperiences() {
  const result = await pool.query(`
    SELECT
      id,
      title,
      category,
      price,
      image_url,
      description,
      status,
      created_at,
      updated_at
    FROM experiences
    WHERE status = 'active'
    ORDER BY id ASC
  `)

  return result.rows.map(mapExperienceRow)
}
