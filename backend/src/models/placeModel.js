import { pool } from "../config/db.js"

function mapPlaceRow(row) {
  return {
    id: String(row.id),
    name: row.name,
    location: row.location,
    price: Number(row.price || 0),
    priceText: row.price_text,
    rating: Number(row.rating || 0),
    reviewsCount: Number(row.reviews_count || 0),
    type: row.type,
    imageUrl: row.image_url,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function findAllPlaces() {
  const result = await pool.query(`
    SELECT
      id,
      name,
      location,
      price,
      price_text,
      rating,
      reviews_count,
      type,
      image_url,
      description,
      status,
      created_at,
      updated_at
    FROM places
    WHERE status = 'active'
    ORDER BY id ASC
  `)

  return result.rows.map(mapPlaceRow)
}

export async function findPlaceById(id) {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        location,
        price,
        price_text,
        rating,
        reviews_count,
        type,
        image_url,
        description,
        status,
        created_at,
        updated_at
      FROM places
      WHERE id = $1 AND status = 'active'
      LIMIT 1
    `,
    [id]
  )

  if (result.rows.length === 0) {
    return null
  }

  const place = mapPlaceRow(result.rows[0])

  const amenitiesResult = await pool.query(
    `
      SELECT a.name
      FROM amenities a
      INNER JOIN place_amenities pa ON pa.amenity_id = a.id
      WHERE pa.place_id = $1
      ORDER BY a.name ASC
    `,
    [id]
  )

  const galleryResult = await pool.query(
    `
      SELECT image_url AS "imageUrl", sort_order AS "sortOrder"
      FROM place_galleries
      WHERE place_id = $1
      ORDER BY sort_order ASC, id ASC
    `,
    [id]
  )

  return {
    ...place,
    amenities: amenitiesResult.rows.map((item) => item.name),
    gallery: galleryResult.rows,
  }
}
