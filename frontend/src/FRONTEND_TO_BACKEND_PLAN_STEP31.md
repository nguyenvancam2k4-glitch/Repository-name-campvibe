# CampVibe - Step 31: Chuẩn bị nối backend/database

## 1. Frontend hiện tại

Frontend đang có các trang chính:

- Trang chủ `/`
- Địa điểm `/places`
- Chi tiết địa điểm `/places/:id`
- Đặt phòng `/booking/:id`
- Đặt phòng thành công `/booking-success/:id`
- Trải nghiệm `/experiences`
- Blog `/blog`
- Chi tiết blog `/blog/:id`
- Liên hệ `/contact`
- Tài khoản `/account`
- Yêu thích `/favorites`
- So sánh `/compare`
- Admin login `/admin-login`
- Admin `/admin`
- 404 `*`

## 2. Dữ liệu giả lập hiện tại

Dữ liệu đang nằm trong:

```text
src/data/places.js
src/data/experiences.js
src/data/blogPosts.js
```

## 3. Cấu trúc mới đã thêm

```text
src/config/apiConfig.js
src/services/placeService.js
src/services/bookingService.js
src/services/authService.js
src/services/blogService.js
```

## 4. Ý nghĩa

Các file service đóng vai trò cầu nối giữa giao diện và dữ liệu.

Hiện tại service vẫn trả về dữ liệu giả lập để website chạy ổn.

Sau này khi backend hoàn thành, chỉ cần đổi:

```js
USE_MOCK_DATA: false
```

và chỉnh API backend tương ứng.

## 5. Backend dự kiến

Backend nên dùng:

- Node.js
- Express.js
- PostgreSQL
- Prisma hoặc Sequelize
- JWT cho đăng nhập admin/user
- REST API

## 6. Các bảng database dự kiến

- users
- places
- bookings
- experiences
- blog_posts
- reviews
- favorites
- admins

## 7. Các API dự kiến

```text
GET    /api/places
GET    /api/places/:id
POST   /api/bookings
GET    /api/bookings
PATCH  /api/bookings/:id/status
POST   /api/auth/admin-login
GET    /api/auth/me
GET    /api/blog-posts
GET    /api/blog-posts/:id
```
