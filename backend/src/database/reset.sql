-- CampVibe Reset Sample Data
-- Dùng khi dữ liệu mẫu bị nhân đôi hoặc muốn làm sạch database để seed lại từ đầu.

TRUNCATE TABLE
  booking_services,
  bookings,
  favorites,
  reviews,
  place_amenities,
  place_galleries,
  amenities,
  experiences,
  blog_posts,
  places,
  users
RESTART IDENTITY CASCADE;
