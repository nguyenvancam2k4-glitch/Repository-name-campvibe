import { pool } from "../config/db.js"

async function getCount(query, params = []) {
  const result = await pool.query(query, params)
  return Number(result.rows[0]?.count || 0)
}

export async function getAdminDashboard(req, res, next) {
  try {
    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      bookingRevenueResult,
      totalContacts,
      newContacts,
      contactedContacts,
      resolvedContacts,
      totalCustomers,
      totalPlaces,
      totalExperiences,
      totalBlogPosts,
    ] = await Promise.all([
      getCount("SELECT COUNT(*)::int AS count FROM bookings"),
      getCount("SELECT COUNT(*)::int AS count FROM bookings WHERE status = 'pending'"),
      getCount("SELECT COUNT(*)::int AS count FROM bookings WHERE status = 'confirmed'"),
      getCount("SELECT COUNT(*)::int AS count FROM bookings WHERE status = 'completed'"),
      getCount("SELECT COUNT(*)::int AS count FROM bookings WHERE status = 'cancelled'"),
      pool.query("SELECT COALESCE(SUM(total_amount), 0)::numeric AS revenue FROM bookings WHERE status <> 'cancelled'"),
      getCount("SELECT COUNT(*)::int AS count FROM contact_messages"),
      getCount("SELECT COUNT(*)::int AS count FROM contact_messages WHERE status = 'new'"),
      getCount("SELECT COUNT(*)::int AS count FROM contact_messages WHERE status = 'contacted'"),
      getCount("SELECT COUNT(*)::int AS count FROM contact_messages WHERE status = 'resolved'"),
      getCount("SELECT COUNT(*)::int AS count FROM users WHERE role = 'customer'"),
      getCount("SELECT COUNT(*)::int AS count FROM places"),
      getCount("SELECT COUNT(*)::int AS count FROM experiences"),
      getCount("SELECT COUNT(*)::int AS count FROM blog_posts"),
    ])

    const latestBookings = await pool.query(`
      SELECT
        b.id,
        b.booking_code,
        b.customer_name,
        b.customer_phone,
        b.total_amount,
        b.status,
        b.created_at,
        p.name AS place_name
      FROM bookings b
      LEFT JOIN places p ON p.id = b.place_id
      ORDER BY b.created_at DESC, b.id DESC
      LIMIT 5
    `)

    const latestContacts = await pool.query(`
      SELECT
        id,
        full_name,
        phone,
        subject,
        status,
        created_at
      FROM contact_messages
      ORDER BY created_at DESC, id DESC
      LIMIT 5
    `)

    res.json({
      success: true,
      source: "postgresql",
      data: {
        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          confirmed: confirmedBookings,
          completed: completedBookings,
          cancelled: cancelledBookings,
          revenue: Number(bookingRevenueResult.rows[0]?.revenue || 0),
        },
        contacts: {
          total: totalContacts,
          new: newContacts,
          contacted: contactedContacts,
          resolved: resolvedContacts,
        },
        content: {
          customers: totalCustomers,
          places: totalPlaces,
          experiences: totalExperiences,
          blogPosts: totalBlogPosts,
        },
        latestBookings: latestBookings.rows.map((item) => ({
          id: String(item.id),
          bookingCode: item.booking_code,
          customerName: item.customer_name,
          customerPhone: item.customer_phone,
          placeName: item.place_name,
          totalAmount: Number(item.total_amount || 0),
          status: item.status,
          createdAt: item.created_at,
        })),
        latestContacts: latestContacts.rows.map((item) => ({
          id: String(item.id),
          fullName: item.full_name,
          phone: item.phone,
          subject: item.subject,
          status: item.status,
          createdAt: item.created_at,
        })),
      },
    })
  } catch (error) {
    next(error)
  }
}
