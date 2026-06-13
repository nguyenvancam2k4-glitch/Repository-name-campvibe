import { pool } from "../src/config/db.js"
import { places } from "../src/data/places.js"
import { experiences } from "../src/data/experiences.js"
import { blogPosts } from "../src/data/blogPosts.js"

const galleryImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
]

const blogContent = `Glamping là lựa chọn phù hợp cho những ai muốn tận hưởng thiên nhiên nhưng vẫn cần sự tiện nghi. Trước chuyến đi, bạn nên kiểm tra thời tiết, lựa chọn trang phục thoải mái, chuẩn bị một số vật dụng cá nhân và xác nhận lịch đặt phòng với khu nghỉ dưỡng.

Khi lựa chọn địa điểm, hãy cân nhắc khoảng cách di chuyển, loại hình cảnh quan, mức giá, sức chứa và các trải nghiệm đi kèm như BBQ, lửa trại, chèo SUP hoặc picnic. Với nhóm bạn, nên chọn nơi có không gian sinh hoạt chung rộng; với cặp đôi, nên ưu tiên nơi yên tĩnh và có view đẹp.

CampVibe hỗ trợ người dùng xem thông tin địa điểm, so sánh lựa chọn, gửi yêu cầu tư vấn, đặt phòng, thanh toán mô phỏng và theo dõi lịch sử đặt phòng. Nhờ đó, quá trình lên kế hoạch cho chuyến đi trở nên rõ ràng và thuận tiện hơn.`

function slugify(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

async function seedDatabase() {
  try {
    console.log("🌱 Đang đổ dữ liệu mẫu CampVibe...")

    await pool.query(`
      TRUNCATE TABLE
        user_favorites,
        contact_messages,
        bookings,
        place_galleries,
        place_amenities,
        amenities,
        blog_posts,
        experiences,
        places,
        users
      RESTART IDENTITY CASCADE;
    `)

    await pool.query(
      `INSERT INTO users (full_name, email, phone, password_hash, role, status)
       VALUES
        ($1, $2, $3, $4, 'admin', 'active'),
        ($5, $6, $7, $8, 'customer', 'active')`,
      [
        "Quản trị viên CampVibe",
        "admin@campvibe.vn",
        "0900000000",
        "campvibe2026",
        "Nguyễn Hoàng Cầm",
        "nguyenvancam2k4@gmail.com",
        "0354750373",
        "123456",
      ]
    )

    for (const place of places) {
      await pool.query(
        `INSERT INTO places (id, name, location, price, price_text, rating, reviews_count, type, image_url, description, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [
          Number(place.id),
          place.name,
          place.location,
          place.price,
          place.priceText,
          place.rating,
          place.reviewsCount,
          place.type,
          place.imageUrl,
          place.description,
          place.status || "active",
        ]
      )

      for (const amenity of place.amenities || []) {
        const amenityResult = await pool.query(
          `INSERT INTO amenities (name)
           VALUES ($1)
           ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
           RETURNING id`,
          [amenity]
        )

        await pool.query(
          `INSERT INTO place_amenities (place_id, amenity_id)
           VALUES ($1, $2)
           ON CONFLICT DO NOTHING`,
          [Number(place.id), amenityResult.rows[0].id]
        )
      }

      const images = [place.imageUrl, ...galleryImages].slice(0, 4)
      for (const [index, imageUrl] of images.entries()) {
        await pool.query(
          `INSERT INTO place_galleries (place_id, image_url, sort_order)
           VALUES ($1, $2, $3)`,
          [Number(place.id), imageUrl, index + 1]
        )
      }
    }

    await pool.query(`SELECT setval('places_id_seq', (SELECT MAX(id) FROM places))`)

    for (const item of experiences) {
      await pool.query(
        `INSERT INTO experiences (title, category, price, image_url, description, status)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [
          item.title,
          item.category,
          item.price,
          item.imageUrl || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
          item.description,
          item.status || "active",
        ]
      )
    }

    for (const post of blogPosts) {
      await pool.query(
        `INSERT INTO blog_posts (title, slug, category, excerpt, content, image_url, read_time, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          post.title,
          slugify(post.title),
          post.category,
          post.excerpt,
          post.content || blogContent,
          post.imageUrl || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
          post.readTime,
          post.status || "published",
        ]
      )
    }

    await pool.query(
      `INSERT INTO bookings (
        booking_code, user_id, place_id, customer_name, customer_email, customer_phone,
        check_in_date, check_out_date, guest_count, trip_type, note, total_amount, status,
        payment_method, payment_status, paid_amount, transaction_code, paid_at
      ) VALUES
        ('CVB-2026-6217', 2, 1, 'Nguyễn Hoàng Cầm', 'nguyenvancam2k4@gmail.com', '0354750373', '2026-06-18', '2026-06-19', 2, 'Cặp đôi', 'Muốn chọn khu yên tĩnh, view đẹp.', 1250000, 'pending', 'bank_transfer', 'paid', 1250000, 'CVPAY-20260613-6217', CURRENT_TIMESTAMP),
        ('CVB-2026-1193', 2, 1, 'Nguyễn Hoàng Cầm', 'nguyenvancam2k4@gmail.com', '0354750373', '2026-06-21', '2026-06-22', 5, 'Nhóm bạn', 'Cần thêm BBQ buổi tối.', 1700000, 'pending', NULL, 'unpaid', 0, NULL, NULL),
        ('CVB-2026-7306', 2, 2, 'Nguyễn Hoàng Cầm', 'nguyenvancam2k4@gmail.com', '0354750373', '2026-06-25', '2026-06-26', 4, 'Gia đình', 'Ưu tiên gần hồ.', 980000, 'confirmed', 'cash', 'pay_at_property', 0, 'PAYLATER-20260613-7306', NULL)
      `
    )

    await pool.query(
      `INSERT INTO user_favorites (user_id, place_id)
       VALUES (2, 1), (2, 3), (2, 5)
       ON CONFLICT DO NOTHING`
    )

    await pool.query(
      `INSERT INTO contact_messages (user_id, full_name, email, phone, subject, message, status)
       VALUES
        (2, 'Nguyễn Hoàng Cầm', 'nguyenvancam2k4@gmail.com', '0354750373', 'Tư vấn glamping', 'Mình muốn được tư vấn địa điểm phù hợp cho nhóm bạn 4-5 người.', 'new'),
        (NULL, 'Nguyễn Minh Anh', 'minhanh@example.com', '0988123456', 'Hỏi lịch trống', 'Cuối tuần này còn khu ven hồ không?', 'contacted')`
    )

    console.log("✅ Seed dữ liệu CampVibe thành công.")
    console.log("Admin: admin@campvibe.vn / campvibe2026")
    console.log("Customer: nguyenvancam2k4@gmail.com / 123456")
  } catch (error) {
    console.error("❌ Lỗi seed dữ liệu:", error.message)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

seedDatabase()
