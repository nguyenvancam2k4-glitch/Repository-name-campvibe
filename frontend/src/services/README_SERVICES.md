# CampVibe Services

Thư mục này chuẩn bị cho việc nối frontend với backend.

Hiện tại `API_CONFIG.USE_MOCK_DATA = true`, nghĩa là website vẫn dùng dữ liệu giả lập trong `src/data`.

Khi backend Node.js + PostgreSQL hoàn thành, chỉ cần đổi:

```js
USE_MOCK_DATA: false
```

trong:

```text
src/config/apiConfig.js
```

Sau đó các service sẽ gọi API thật:

- `placeService.js` → địa điểm
- `bookingService.js` → đặt phòng
- `authService.js` → đăng nhập/tài khoản
- `blogService.js` → bài viết

Cách này giúp frontend không phải sửa nhiều khi chuyển sang backend thật.
