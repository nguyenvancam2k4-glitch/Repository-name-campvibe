# CampVibe - Step 32: Frontend Final Review

## 1. Mục tiêu bước 32

Bước này dùng để chốt frontend trước khi chuyển sang backend/database.

Nguyên tắc:
- Không sửa giao diện mạnh.
- Không thêm hiệu ứng phức tạp.
- Giữ `index.css` sạch.
- Giữ `BrowserRouter` và `ScrollToTop` trong `App.jsx`.
- Giữ dữ liệu dùng chung trong `src/data`.
- Giữ lớp chuẩn bị API trong `src/services`.

## 2. Checklist kiểm thử thủ công

### 1. `/` - Trang chủ
- Mở trang chủ, kiểm tra hero, search box, nút khám phá địa điểm, nút xem trải nghiệm.

### 2. `/places` - Địa điểm
- Kiểm tra danh sách 6 địa điểm, bộ lọc, nút xem chi tiết.

### 3. `/places/1` - Chi tiết địa điểm
- Kiểm tra trang mở từ đầu, ảnh, mô tả, tiện nghi, nút kiểm tra lịch trống.

### 4. `/booking/1` - Đặt phòng
- Kiểm tra form đặt phòng, ngày nhận/trả, số khách, thông tin liên hệ, nút gửi yêu cầu.

### 5. `/booking-success/1` - Đặt phòng thành công
- Kiểm tra mã đặt chỗ, trạng thái, nút xem địa điểm.

### 6. `/experiences` - Trải nghiệm
- Kiểm tra bộ lọc trải nghiệm, card dịch vụ, nút thêm vào chuyến đi.

### 7. `/blog` - Blog
- Kiểm tra danh sách bài viết, danh mục, nút đọc bài viết.

### 8. `/blog/1` - Chi tiết blog
- Kiểm tra bài viết mở từ đầu, mục lục, bài viết liên quan.

### 9. `/contact` - Liên hệ
- Kiểm tra form tư vấn, hotline, email, FAQ.

### 10. `/account` - Tài khoản
- Kiểm tra hồ sơ khách hàng, lịch sử đặt phòng, địa điểm đã lưu.

### 11. `/favorites` - Yêu thích
- Kiểm tra danh sách địa điểm yêu thích, nút chi tiết, nút đặt.

### 12. `/compare` - So sánh
- Kiểm tra 3 địa điểm so sánh, bảng so sánh chi tiết, nút đặt ngay.

### 13. `/admin-login` - Đăng nhập Admin
- Kiểm tra giao diện đăng nhập, tài khoản demo.

### 14. `/admin` - Admin
- Kiểm tra thống kê, danh sách đơn đặt phòng, trạng thái.

### 15. `/abc` - 404
- Kiểm tra đường dẫn sai hiển thị trang 404, không về trang chủ.


## 3. Cấu trúc frontend hiện tại

```text
src
├── App.jsx
├── main.jsx
├── index.css
├── pages
├── data
├── config
└── services
```

## 4. Cấu trúc dữ liệu

```text
src/data/places.js
src/data/experiences.js
src/data/blogPosts.js
```

## 5. Cấu trúc chuẩn bị API

```text
src/config/apiConfig.js
src/services/placeService.js
src/services/bookingService.js
src/services/authService.js
src/services/blogService.js
```

## 6. Kết luận

Frontend CampVibe đã đủ các màn hình chính để bảo vệ đồ án ở mức giao diện và mô phỏng chức năng.

Sau bước này nên chuyển sang:

```text
Bước 33: Chuẩn hóa dữ liệu giả lập để khớp database
Bước 34: Tạo backend Node.js + Express
Bước 35: Kết nối PostgreSQL
```
