-- CampVibe PostgreSQL Schema
-- Step 35

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(30),
  password_hash VARCHAR(255),
  role VARCHAR(30) NOT NULL DEFAULT 'customer',
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS places (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  location VARCHAR(200) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  price_text VARCHAR(50),
  rating NUMERIC(2,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  type VARCHAR(100),
  image_url TEXT,
  description TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS place_galleries (
  id SERIAL PRIMARY KEY,
  place_id INTEGER REFERENCES places(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS amenities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS place_amenities (
  place_id INTEGER REFERENCES places(id) ON DELETE CASCADE,
  amenity_id INTEGER REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (place_id, amenity_id)
);

CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(100),
  price INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  description TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  booking_code VARCHAR(50) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  place_id INTEGER REFERENCES places(id) ON DELETE SET NULL,
  customer_name VARCHAR(150) NOT NULL,
  customer_email VARCHAR(150),
  customer_phone VARCHAR(30) NOT NULL,
  check_in_date DATE,
  check_out_date DATE,
  guest_count INTEGER DEFAULT 1,
  trip_type VARCHAR(100),
  note TEXT,
  total_amount INTEGER DEFAULT 0,
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS booking_services (
  booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
  experience_id INTEGER REFERENCES experiences(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  PRIMARY KEY (booking_id, experience_id)
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  category VARCHAR(100),
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  read_time VARCHAR(50),
  status VARCHAR(30) NOT NULL DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS favorites (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  place_id INTEGER REFERENCES places(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, place_id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  place_id INTEGER REFERENCES places(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- User favorites: lưu địa điểm yêu thích theo tài khoản
CREATE TABLE IF NOT EXISTS user_favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, place_id)
);


-- CampVibe Step 49 - Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(30) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
