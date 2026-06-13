import { pool } from "../config/db.js"

function mapBookingRow(row) {
  return {
    id: String(row.id),
    bookingCode: row.booking_code,
    userId: row.user_id ? String(row.user_id) : null,
    placeId: row.place_id ? String(row.place_id) : null,
    placeName: row.place_name,
    placeLocation: row.place_location,
    placeImageUrl: row.place_image_url,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    checkInDate: row.check_in_date,
    checkOutDate: row.check_out_date,
    guestCount: Number(row.guest_count || 1),
    tripType: row.trip_type,
    note: row.note,
    totalAmount: Number(row.total_amount || 0),
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    paymentMethod: row.payment_method || null,
    paymentStatus: row.payment_status || "unpaid",
    paidAmount: Number(row.paid_amount || 0),
    transactionCode: row.transaction_code || null,
    paidAt: row.paid_at || null,
  }
}

const selectSql = `
  SELECT b.*, p.name AS place_name, p.location AS place_location, p.image_url AS place_image_url
  FROM bookings b
  LEFT JOIN places p ON p.id = b.place_id
`

export async function findAllBookings() {
  const result = await pool.query(`${selectSql} ORDER BY b.created_at DESC, b.id DESC`)
  return result.rows.map(mapBookingRow)
}

export async function findBookingsByUserId(userId) {
  const result = await pool.query(
    `${selectSql} WHERE b.user_id = $1 ORDER BY b.created_at DESC, b.id DESC`,
    [userId]
  )
  return result.rows.map(mapBookingRow)
}

export async function findBookingById(id) {
  const result = await pool.query(`${selectSql} WHERE b.id = $1 LIMIT 1`, [id])
  return result.rows[0] ? mapBookingRow(result.rows[0]) : null
}

export async function createBookingRecord(data) {
  const bookingCode = `CVB-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`
  const result = await pool.query(
    `
      INSERT INTO bookings (
        booking_code, user_id, place_id, customer_name, customer_email, customer_phone,
        check_in_date, check_out_date, guest_count, trip_type, note, total_amount, status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'pending')
      RETURNING *
    `,
    [
      bookingCode,
      data.userId || null,
      data.placeId,
      data.customerName,
      data.customerEmail || null,
      data.customerPhone,
      data.checkInDate || null,
      data.checkOutDate || null,
      Number(data.guestCount || 1),
      data.tripType || null,
      data.note || null,
      Number(data.totalAmount || 0),
    ]
  )
  return mapBookingRow(result.rows[0])
}

export async function updateBookingStatusRecord(id, status) {
  const result = await pool.query(
    `UPDATE bookings SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
    [status, id]
  )
  return result.rows[0] ? mapBookingRow(result.rows[0]) : null
}
