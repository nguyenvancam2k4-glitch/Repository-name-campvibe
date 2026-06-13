# CampVibe Frontend Checklist - Step 30

## Các route hiện có

- `/` → `HomePage`: Trang chủ giới thiệu CampVibe
- `/places` → `PlacesPage`: Danh sách và lọc địa điểm
- `/places/:id` → `PlaceDetailPage`: Chi tiết từng địa điểm
- `/booking/:id` → `BookingPage`: Form đặt phòng mô phỏng
- `/booking-success/:id` → `BookingSuccessPage`: Xác nhận gửi yêu cầu đặt chỗ
- `/experiences` → `ExperiencesPage`: Danh sách trải nghiệm đi kèm
- `/blog` → `BlogPage`: Danh sách bài viết/cẩm nang
- `/blog/:id` → `BlogDetailPage`: Chi tiết bài viết
- `/contact` → `ContactPage`: Liên hệ và form tư vấn
- `/account` → `AccountPage`: Tài khoản khách hàng
- `/favorites` → `FavoritesPage`: Danh sách địa điểm yêu thích
- `/compare` → `ComparePage`: So sánh địa điểm
- `/admin-login` → `AdminLoginPage`: Đăng nhập quản trị mô phỏng
- `/admin` → `AdminPage`: Bảng điều khiển quản trị
- `*` → `NotFoundPage`: Trang lỗi 404

## Cấu trúc dữ liệu dùng chung

- `src/data/places.js`: dữ liệu địa điểm dùng cho trang chủ, địa điểm, chi tiết, đặt phòng, yêu thích, so sánh.
- `src/data/experiences.js`: dữ liệu trải nghiệm dùng cho trang trải nghiệm.
- `src/data/blogPosts.js`: dữ liệu bài viết dùng cho blog và chi tiết blog.

## Ghi chú sau kiểm tra

- `src/index.css` đã giữ sạch, chỉ có `@import "tailwindcss";`.
- `App.jsx` đã được chuẩn hóa route để tránh trùng `path="*"`.
- `/abc` hoặc đường dẫn sai sẽ vào trang 404.
- Header chính đã có: Trang chủ, Địa điểm, Trải nghiệm, Blog, Liên hệ, Tài khoản, Đặt ngay.
- Frontend hiện đã đủ nền để chuyển sang backend/database.
