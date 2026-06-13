-- CampVibe Sample Data - Idempotent Version
-- Có thể chạy nhiều lần mà không nhân đôi dữ liệu chính.

INSERT INTO users (full_name, email, phone, password_hash, role, status)
VALUES
('Nguyễn Minh Anh', 'minhanh@example.com', '0988 123 456', 'mock_customer_password', 'customer', 'active'),
('CampVibe Admin', 'admin@campvibe.vn', '0900 000 000', 'campvibe2026', 'admin', 'active')
ON CONFLICT (email) DO NOTHING;

INSERT INTO places (name, location, price, price_text, rating, reviews_count, type, image_url, description, status)
SELECT 'Pine Forest Retreat', 'Đà Lạt, Lâm Đồng', 1250000, '1.250.000đ', 4.9, 128, 'Rừng thông', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80', 'Khu glamping nằm giữa rừng thông yên tĩnh, phù hợp cho nghỉ dưỡng cuối tuần.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM places WHERE name = 'Pine Forest Retreat');

INSERT INTO places (name, location, price, price_text, rating, reviews_count, type, image_url, description, status)
SELECT 'Lake Side Glamping', 'Sóc Sơn, Hà Nội', 980000, '980.000đ', 4.8, 96, 'Ven hồ', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1400&q=80', 'Khu glamping ven hồ gần Hà Nội, phù hợp cho nhóm bạn và gia đình.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM places WHERE name = 'Lake Side Glamping');

INSERT INTO places (name, location, price, price_text, rating, reviews_count, type, image_url, description, status)
SELECT 'Moon Valley Camp', 'Mộc Châu, Sơn La', 1480000, '1.480.000đ', 5.0, 154, 'Săn mây', 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1400&q=80', 'Khu nghỉ dưỡng cao cấp ở vùng núi, phù hợp cho săn mây và BBQ ngoài trời.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM places WHERE name = 'Moon Valley Camp');

INSERT INTO places (name, location, price, price_text, rating, reviews_count, type, image_url, description, status)
SELECT 'Hidden Hill Camp', 'Ba Vì, Hà Nội', 890000, '890.000đ', 4.7, 82, 'Đồi núi', 'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&w=1400&q=80', 'Khu cắm trại trên đồi yên tĩnh, phù hợp cho picnic và nhóm bạn.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM places WHERE name = 'Hidden Hill Camp');

INSERT INTO places (name, location, price, price_text, rating, reviews_count, type, image_url, description, status)
SELECT 'Ocean Breeze Camping', 'Mũi Né, Bình Thuận', 1690000, '1.690.000đ', 4.9, 111, 'Gần biển', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', 'Khu camping gần biển, phù hợp cho mùa hè, BBQ hải sản và ngắm hoàng hôn.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM places WHERE name = 'Ocean Breeze Camping');

INSERT INTO places (name, location, price, price_text, rating, reviews_count, type, image_url, description, status)
SELECT 'River Chill Glamping', 'Ninh Bình', 1150000, '1.150.000đ', 4.8, 103, 'Ven sông', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', 'Không gian ven sông yên bình, phù hợp cho nghỉ dưỡng nhẹ nhàng.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM places WHERE name = 'River Chill Glamping');

INSERT INTO amenities (name)
VALUES
('BBQ riêng'),
('Lửa trại'),
('View rừng thông'),
('Cafe sáng'),
('Wifi'),
('Chỗ đậu xe'),
('Chèo SUP'),
('Câu cá'),
('View hồ'),
('Săn mây'),
('Bồn tắm'),
('View núi'),
('Gần biển'),
('BBQ hải sản'),
('Ven sông'),
('Đạp xe')
ON CONFLICT (name) DO NOTHING;

INSERT INTO experiences (title, category, price, description, status)
SELECT 'BBQ giữa rừng', 'Ăn uống', 350000, 'Set nướng ngoài trời với bếp than, bàn gỗ và đèn decor.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM experiences WHERE title = 'BBQ giữa rừng');

INSERT INTO experiences (title, category, price, description, status)
SELECT 'Đốt lửa trại', 'Hoạt động', 280000, 'Không gian quây quần buổi tối với ánh lửa và ghế trại.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM experiences WHERE title = 'Đốt lửa trại');

INSERT INTO experiences (title, category, price, description, status)
SELECT 'Chèo SUP bên hồ', 'Hoạt động', 220000, 'Trải nghiệm chèo SUP, ngắm hoàng hôn và chụp ảnh check-in.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM experiences WHERE title = 'Chèo SUP bên hồ');

INSERT INTO experiences (title, category, price, description, status)
SELECT 'Picnic đồi cỏ', 'Ăn uống', 420000, 'Set picnic với thảm, giỏ đồ ăn nhẹ và góc chụp ảnh ngoài trời.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM experiences WHERE title = 'Picnic đồi cỏ');

INSERT INTO blog_posts (title, slug, category, excerpt, content, read_time, status)
VALUES
('Đi glamping lần đầu cần chuẩn bị những gì?', 'di-glamping-lan-dau-can-chuan-bi-nhung-gi', 'Kinh nghiệm', 'Gợi ý những vật dụng cần mang theo để chuyến glamping đầu tiên thật thoải mái.', 'Nội dung bài viết hướng dẫn chuẩn bị cho chuyến glamping đầu tiên.', '6 phút đọc', 'published'),
('5 địa điểm cắm trại gần Hà Nội cho cuối tuần', '5-dia-diem-cam-trai-gan-ha-noi', 'Địa điểm', 'Danh sách điểm đến phù hợp cho nhóm bạn, gia đình hoặc cặp đôi.', 'Nội dung bài viết gợi ý các điểm cắm trại gần Hà Nội.', '8 phút đọc', 'published'),
('Bí quyết có một buổi BBQ ngoài trời thật chill', 'bi-quyet-bbq-ngoai-troi', 'Trải nghiệm', 'Cách chọn món, setup ánh sáng và chuẩn bị playlist cho buổi BBQ.', 'Nội dung bài viết chia sẻ kinh nghiệm setup BBQ ngoài trời.', '5 phút đọc', 'published')
ON CONFLICT (slug) DO NOTHING;

-- Liên kết tiện nghi với địa điểm
INSERT INTO place_amenities (place_id, amenity_id)
SELECT p.id, a.id
FROM places p, amenities a
WHERE p.name = 'Pine Forest Retreat'
AND a.name IN ('BBQ riêng', 'Lửa trại', 'View rừng thông', 'Cafe sáng', 'Wifi', 'Chỗ đậu xe')
ON CONFLICT DO NOTHING;

INSERT INTO place_amenities (place_id, amenity_id)
SELECT p.id, a.id
FROM places p, amenities a
WHERE p.name = 'Lake Side Glamping'
AND a.name IN ('Chèo SUP', 'Câu cá', 'View hồ', 'Cafe sáng')
ON CONFLICT DO NOTHING;

INSERT INTO place_amenities (place_id, amenity_id)
SELECT p.id, a.id
FROM places p, amenities a
WHERE p.name = 'Moon Valley Camp'
AND a.name IN ('Săn mây', 'BBQ riêng', 'Bồn tắm', 'View núi')
ON CONFLICT DO NOTHING;

INSERT INTO place_amenities (place_id, amenity_id)
SELECT p.id, a.id
FROM places p, amenities a
WHERE p.name = 'Ocean Breeze Camping'
AND a.name IN ('Gần biển', 'BBQ hải sản', 'Cafe sáng')
ON CONFLICT DO NOTHING;

INSERT INTO place_amenities (place_id, amenity_id)
SELECT p.id, a.id
FROM places p, amenities a
WHERE p.name = 'River Chill Glamping'
AND a.name IN ('Ven sông', 'Đạp xe')
ON CONFLICT DO NOTHING;

-- Ảnh phụ mô phỏng cho trang chi tiết địa điểm
INSERT INTO place_galleries (place_id, image_url, sort_order)
SELECT p.id, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80', 1
FROM places p
WHERE p.name = 'Pine Forest Retreat'
AND NOT EXISTS (
  SELECT 1 FROM place_galleries g
  WHERE g.place_id = p.id AND g.image_url = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
);

INSERT INTO place_galleries (place_id, image_url, sort_order)
SELECT p.id, 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80', 2
FROM places p
WHERE p.name = 'Pine Forest Retreat'
AND NOT EXISTS (
  SELECT 1 FROM place_galleries g
  WHERE g.place_id = p.id AND g.image_url = 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80'
);

INSERT INTO place_galleries (place_id, image_url, sort_order)
SELECT p.id, 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80', 1
FROM places p
WHERE p.name = 'Lake Side Glamping'
AND NOT EXISTS (
  SELECT 1 FROM place_galleries g
  WHERE g.place_id = p.id AND g.image_url = 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80'
);

INSERT INTO place_galleries (place_id, image_url, sort_order)
SELECT p.id, 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80', 1
FROM places p
WHERE p.name = 'Moon Valley Camp'
AND NOT EXISTS (
  SELECT 1 FROM place_galleries g
  WHERE g.place_id = p.id AND g.image_url = 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'
);

INSERT INTO bookings (booking_code, user_id, place_id, customer_name, customer_email, customer_phone, check_in_date, check_out_date, guest_count, trip_type, note, total_amount, status)
SELECT 'CVB-2026-0171', u.id, p.id, 'Nguyễn Minh Anh', 'minhanh@example.com', '0988 123 456', '2026-06-12', '2026-06-13', 2, 'Đi cùng người yêu', 'Muốn thêm BBQ và lửa trại buổi tối.', 1620000, 'pending'
FROM users u, places p
WHERE u.email = 'minhanh@example.com'
AND p.name = 'Pine Forest Retreat'
ON CONFLICT (booking_code) DO NOTHING;


-- Bổ sung/chuẩn hóa dữ liệu trải nghiệm cho API từ PostgreSQL
INSERT INTO experiences (title, category, price, image_url, description, status)
SELECT 'Săn mây buổi sáng', 'Hoạt động', 180000, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80', 'Lịch trình dậy sớm ngắm bình minh, săn mây, thưởng thức cà phê nóng và chụp ảnh.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM experiences WHERE title = 'Săn mây buổi sáng');

INSERT INTO experiences (title, category, price, image_url, description, status)
SELECT 'Trang trí sinh nhật', 'Sự kiện', 690000, 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80', 'Setup sinh nhật ngoài trời với bóng, đèn, bảng tên, bánh nhỏ và không gian chụp ảnh riêng.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM experiences WHERE title = 'Trang trí sinh nhật');

INSERT INTO experiences (title, category, price, image_url, description, status)
SELECT 'Combo cặp đôi', 'Nghỉ dưỡng', 990000, 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80', 'Gói trải nghiệm riêng tư cho hai người gồm picnic, BBQ nhẹ, đèn decor và góc chill buổi tối.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM experiences WHERE title = 'Combo cặp đôi');

INSERT INTO experiences (title, category, price, image_url, description, status)
SELECT 'Combo gia đình', 'Nghỉ dưỡng', 1250000, 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1400&q=80', 'Gói phù hợp gia đình có trẻ nhỏ với khu ăn uống, trò chơi nhẹ, lửa trại và chụp ảnh kỷ niệm.', 'active'
WHERE NOT EXISTS (SELECT 1 FROM experiences WHERE title = 'Combo gia đình');

UPDATE experiences
SET image_url = 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=80'
WHERE title = 'BBQ giữa rừng' AND image_url IS NULL;

UPDATE experiences
SET image_url = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80'
WHERE title = 'Đốt lửa trại' AND image_url IS NULL;

UPDATE experiences
SET image_url = 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80'
WHERE title = 'Chèo SUP bên hồ' AND image_url IS NULL;

UPDATE experiences
SET image_url = 'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&w=1400&q=80'
WHERE title = 'Picnic đồi cỏ' AND image_url IS NULL;


-- Bổ sung/chuẩn hóa dữ liệu blog cho API từ PostgreSQL
UPDATE blog_posts
SET image_url = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    content = 'Khi đi glamping lần đầu, bạn nên chuẩn bị quần áo thoải mái, giày dễ di chuyển, đồ cá nhân, sạc dự phòng và một vài vật dụng nhỏ như thuốc chống côn trùng. Nếu chọn CampVibe, phần lớn đồ setup đã được hỗ trợ sẵn, bạn chỉ cần chuẩn bị tinh thần tận hưởng chuyến đi.'
WHERE slug = 'di-glamping-lan-dau-can-chuan-bi-nhung-gi';

UPDATE blog_posts
SET image_url = 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1400&q=80',
    content = 'Gần Hà Nội có nhiều khu cắm trại phù hợp cho chuyến đi cuối tuần như Sóc Sơn, Ba Vì, hồ Đồng Đò và các khu ven hồ yên tĩnh. Những địa điểm này phù hợp cho nhóm bạn, gia đình hoặc cặp đôi muốn đổi gió mà không cần di chuyển quá xa.'
WHERE slug = '5-dia-diem-cam-trai-gan-ha-noi';

UPDATE blog_posts
SET image_url = 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=80',
    content = 'Một buổi BBQ ngoài trời sẽ đáng nhớ hơn nếu chuẩn bị đủ đồ nướng, ánh sáng, nhạc nền và không gian ngồi thoải mái. Bạn nên chọn set đồ ăn vừa đủ, tránh mang quá nhiều, đồng thời chuẩn bị thêm nước uống và đồ giữ ấm nếu đi vào buổi tối.'
WHERE slug = 'bi-quyet-bbq-ngoai-troi';

INSERT INTO blog_posts (title, slug, category, excerpt, content, image_url, read_time, status)
SELECT
  'Cách chọn địa điểm glamping phù hợp với từng nhóm khách',
  'cach-chon-dia-diem-glamping-phu-hop',
  'Địa điểm',
  'Gợi ý chọn địa điểm theo nhu cầu: đi cặp đôi, gia đình, nhóm bạn hoặc nghỉ dưỡng cá nhân.',
  'Với cặp đôi, nên ưu tiên địa điểm yên tĩnh, riêng tư, có view đẹp và dịch vụ setup nhẹ. Với gia đình, nên chọn nơi có khu ăn uống, không gian an toàn và tiện nghi cơ bản. Với nhóm bạn, các khu có BBQ, lửa trại và hoạt động ngoài trời sẽ phù hợp hơn.',
  'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&w=1400&q=80',
  '7 phút đọc',
  'published'
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'cach-chon-dia-diem-glamping-phu-hop');

INSERT INTO blog_posts (title, slug, category, excerpt, content, image_url, read_time, status)
SELECT
  'Những lỗi thường gặp khi đặt lịch glamping cuối tuần',
  'nhung-loi-thuong-gap-khi-dat-lich-glamping',
  'Kinh nghiệm',
  'Một vài lưu ý giúp bạn tránh đặt trùng ngày, chọn sai số khách hoặc bỏ sót dịch vụ đi kèm.',
  'Khi đặt lịch glamping, người dùng thường quên kiểm tra ngày nhận phòng, ngày trả phòng, số lượng khách và các dịch vụ đi kèm. Vì vậy, hệ thống nên hiển thị rõ thông tin đặt chỗ, trạng thái đơn và cho phép admin xác nhận lại trước khi hoàn tất.',
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1400&q=80',
  '5 phút đọc',
  'published'
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'nhung-loi-thuong-gap-khi-dat-lich-glamping');


-- Chuẩn hóa tài khoản admin demo cho chức năng đăng nhập
UPDATE users
SET password_hash = 'campvibe2026',
    role = 'admin',
    status = 'active'
WHERE email = 'admin@campvibe.vn';


-- Đảm bảo bảng yêu thích tồn tại
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
