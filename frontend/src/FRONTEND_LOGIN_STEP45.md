# Step 45 - Trang đăng nhập người dùng

## Đã làm

- Thêm trang `/login`.
- Form login gọi `POST /api/auth/login`.
- Backend kiểm tra user role `customer` trong PostgreSQL.
- Đăng nhập thành công sẽ lưu session `campvibe_customer_session` vào localStorage.
- Sau khi đăng nhập chuyển sang `/account`.

## Test

1. Đăng ký một tài khoản ở `/register`.
2. Mở:
```text
http://localhost:5173/login
```
3. Đăng nhập bằng email/mật khẩu vừa đăng ký.
4. Nếu chuyển sang `/account` là thành công.
