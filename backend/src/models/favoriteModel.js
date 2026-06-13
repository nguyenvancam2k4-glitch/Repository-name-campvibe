import { pool } from "../config/db.js"

function mapFavoriteRow(row) {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    placeId: String(row.place_id),
    createdAt: row.created_at,
    place: row.place_id
      ? {
          id: String(row.place_id),
          name: row.place_name,
          location: row.place_location,
          type: row.place_type,
          price: Number(row.place_price || 0),
          rating: Number(row.place_rating || 0),
          imageUrl: row.place_image_url,
          shortDescription: row.place_description || "Địa điểm glamping được lưu trong danh sách yêu thích của bạn.",
        }
      : null,
  }
}

export async function findFavoritesByUserId(userId) {
  const result = await pool.query(
    `
      SELECT
        f.id,
        f.user_id,
        f.place_id,
        f.created_at,
        p.name AS place_name,
        p.location AS place_location,
        p.type AS place_type,
        p.price AS place_price,
        p.rating AS place_rating,
        p.image_url AS place_image_url,
        p.description AS place_description
      FROM user_favorites f
      JOIN places p ON p.id = f.place_id
      WHERE f.user_id = $1
      ORDER BY f.created_at DESC, f.id DESC
    `,
    [userId]
  )

  return result.rows.map(mapFavoriteRow)
}

export async function findFavorite(userId, placeId) {
  const result = await pool.query(
    `
      SELECT id, user_id, place_id, created_at
      FROM user_favorites
      WHERE user_id = $1 AND place_id = $2
      LIMIT 1
    `,
    [userId, placeId]
  )

  return result.rows[0] ? mapFavoriteRow(result.rows[0]) : null
}

export async function addFavorite(userId, placeId) {
  const result = await pool.query(
    `
      INSERT INTO user_favorites (user_id, place_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, place_id) DO UPDATE SET created_at = user_favorites.created_at
      RETURNING id, user_id, place_id, created_at
    `,
    [userId, placeId]
  )

  return mapFavoriteRow(result.rows[0])
}

export async function removeFavorite(userId, placeId) {
  const result = await pool.query(
    `
      DELETE FROM user_favorites
      WHERE user_id = $1 AND place_id = $2
      RETURNING id, user_id, place_id, created_at
    `,
    [userId, placeId]
  )

  return result.rows[0] ? mapFavoriteRow(result.rows[0]) : null
}
