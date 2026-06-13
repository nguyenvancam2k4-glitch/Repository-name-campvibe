# Step 41 - Admin lấy đơn đặt phòng từ PostgreSQL

## Đã làm

- Trang `/admin` gọi `getBookings()`.
- `getBookings()` gọi backend `GET /api/bookings`.
- Danh sách đơn hiển thị từ PostgreSQL.
- Thống kê tổng đơn, chờ xác nhận, đã xác nhận, tổng giá trị.
- Nút xuất báo cáo tạm hiển thị thông báo mô phỏng.

## Test

1. Chạy backend:
```bash
npm run dev
```

2. Chạy frontend:
```bash
npm run dev
```

3. Mở:
```text
http://localhost:5173/admin
```

Nếu thấy đơn vừa gửi ở form đặt phòng thì thành công.
