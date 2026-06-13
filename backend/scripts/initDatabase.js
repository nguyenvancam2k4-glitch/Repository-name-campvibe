import { pool } from "../src/config/db.js"

async function initDatabase() {
  try {
    console.log("🚀 Đang tạo bảng CampVibe...")

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(160) NOT NULL,
        email VARCHAR(160) UNIQUE NOT NULL,
        phone VARCHAR(40),
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(30) NOT NULL DEFAULT 'customer',
        status VARCHAR(30) NOT NULL DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS places (
        id SERIAL PRIMARY KEY,
        name VARCHAR(180) NOT NULL,
        location VARCHAR(180) NOT NULL,
        price NUMERIC(12, 0) NOT NULL DEFAULT 0,
        price_text VARCHAR(80),
        rating NUMERIC(3, 1) DEFAULT 0,
        reviews_count INT DEFAULT 0,
        type VARCHAR(100),
        image_url TEXT,
        description TEXT,
        status VARCHAR(30) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS amenities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS place_amenities (
        place_id INT NOT NULL REFERENCES places(id) ON DELETE CASCADE,
        amenity_id INT NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
        PRIMARY KEY (place_id, amenity_id)
      );

      CREATE TABLE IF NOT EXISTS place_galleries (
        id SERIAL PRIMARY KEY,
        place_id INT NOT NULL REFERENCES places(id) ON DELETE CASCADE,
        image_url TEXT NOT NULL,
        sort_order INT DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS experiences (
        id SERIAL PRIMARY KEY,
        title VARCHAR(180) NOT NULL,
        category VARCHAR(100),
        price NUMERIC(12, 0) DEFAULT 0,
        image_url TEXT,
        description TEXT,
        status VARCHAR(30) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(220) NOT NULL,
        slug VARCHAR(220) UNIQUE,
        category VARCHAR(100),
        excerpt TEXT,
        content TEXT,
        image_url TEXT,
        read_time VARCHAR(80),
        status VARCHAR(30) DEFAULT 'published',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        booking_code VARCHAR(80) UNIQUE NOT NULL,
        user_id INT REFERENCES users(id) ON DELETE SET NULL,
        place_id INT REFERENCES places(id) ON DELETE SET NULL,
        customer_name VARCHAR(160) NOT NULL,
        customer_email VARCHAR(160),
        customer_phone VARCHAR(40) NOT NULL,
        check_in_date DATE,
        check_out_date DATE,
        guest_count INT DEFAULT 1,
        trip_type VARCHAR(100),
        note TEXT,
        total_amount NUMERIC(12, 0) DEFAULT 0,
        status VARCHAR(40) DEFAULT 'pending',
        payment_method VARCHAR(80),
        payment_status VARCHAR(40) DEFAULT 'unpaid',
        paid_amount NUMERIC(12, 0) DEFAULT 0,
        transaction_code VARCHAR(80),
        paid_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS user_favorites (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        place_id INT NOT NULL REFERENCES places(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, place_id)
      );

      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE SET NULL,
        full_name VARCHAR(160) NOT NULL,
        email VARCHAR(160),
        phone VARCHAR(40),
        subject VARCHAR(220),
        message TEXT NOT NULL,
        status VARCHAR(40) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log("✅ Tạo bảng CampVibe thành công.")
  } catch (error) {
    console.error("❌ Lỗi tạo bảng:", error.message)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

initDatabase()
