# CampVibe Database Schema Plan

## Mục tiêu

Thiết kế cơ sở dữ liệu PostgreSQL cho website CampVibe: đặt phòng và trải nghiệm cắm trại, glamping nghỉ dưỡng.

Frontend hiện đang dùng dữ liệu giả lập trong `src/data`. Từ bước này, dữ liệu được định hướng theo cấu trúc có thể chuyển sang database thật.

## Các bảng chính

### users
Lưu thông tin người dùng và quản trị viên.

Các cột đề xuất:
- id
- full_name
- email
- phone
- password_hash
- role: customer/admin
- status: active/locked
- created_at
- updated_at

### places
Lưu thông tin địa điểm glamping.

Các cột đề xuất:
- id
- name
- location
- price
- rating
- reviews_count
- type
- image_url
- description
- status
- created_at
- updated_at

### place_galleries
Lưu ảnh phụ của địa điểm.

Các cột đề xuất:
- id
- place_id
- image_url
- sort_order

### amenities
Lưu danh sách tiện nghi.

Các cột đề xuất:
- id
- name

### place_amenities
Bảng trung gian giữa places và amenities.

Các cột đề xuất:
- place_id
- amenity_id

### experiences
Lưu các dịch vụ/trải nghiệm đi kèm.

Các cột đề xuất:
- id
- title
- category
- price
- image_url
- description
- status

### bookings
Lưu thông tin yêu cầu đặt phòng.

Các cột đề xuất:
- id
- booking_code
- user_id
- place_id
- customer_name
- customer_email
- customer_phone
- check_in_date
- check_out_date
- guest_count
- trip_type
- note
- total_amount
- status: pending/confirmed/completed/cancelled
- created_at
- updated_at

### booking_services
Bảng trung gian giữa bookings và experiences.

Các cột đề xuất:
- booking_id
- experience_id
- quantity

### blog_posts
Lưu bài viết/cẩm nang.

Các cột đề xuất:
- id
- title
- slug
- category
- excerpt
- content
- image_url
- read_time
- status: published/draft
- created_at

### favorites
Lưu địa điểm yêu thích của người dùng.

Các cột đề xuất:
- user_id
- place_id
- created_at

### reviews
Lưu đánh giá địa điểm.

Các cột đề xuất:
- id
- user_id
- place_id
- rating
- comment
- created_at

## Luồng dữ liệu chính

### Người dùng đặt phòng

1. Người dùng xem `/places`.
2. Chọn địa điểm `/places/:id`.
3. Mở form `/booking/:id`.
4. Gửi yêu cầu đặt phòng.
5. Backend lưu vào bảng `bookings`.
6. Admin xem đơn mới trong `/admin`.

### Admin quản lý đơn

1. Admin đăng nhập.
2. Mở dashboard.
3. Xem danh sách đơn.
4. Cập nhật trạng thái: pending → confirmed → completed.

## Ghi chú

Thiết kế này đủ dùng cho đồ án tốt nghiệp và có thể mở rộng thêm thanh toán, upload ảnh, phân quyền chi tiết sau này.
