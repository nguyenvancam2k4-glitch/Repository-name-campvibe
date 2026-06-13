# Step 44 - Trang đăng ký người dùng

## Đã làm

- Thêm trang `/register`.
- Form đăng ký gọi backend `POST /api/auth/register`.
- Tạo user role `customer` trong PostgreSQL.
- Sau khi đăng ký thành công, lưu customer session vào localStorage và chuyển sang `/account`.

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
http://localhost:5173/register
```

4. Đăng ký một email mới.

5. Kiểm tra trong pgAdmin bảng `users` hoặc dùng Query:
```sql
SELECT id, full_name, email, phone, role, status, created_at
FROM users
ORDER BY id DESC;
```
