# Step 42 - Admin cập nhật trạng thái đơn trong PostgreSQL

## Đã làm

- Trang `/admin` có nút:
  - Xác nhận
  - Hoàn tất
  - Hủy
- Khi bấm, frontend gọi:
```text
PATCH /api/bookings/:id/status
```
- Backend cập nhật bảng `bookings` trong PostgreSQL.
- Admin tự cập nhật thống kê sau khi đổi trạng thái.

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

4. Bấm `Xác nhận` ở một đơn.

5. Mở lại:
```text
http://localhost:3000/api/bookings
```

Nếu status đổi thành `confirmed` là thành công.
