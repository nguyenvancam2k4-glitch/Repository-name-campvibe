# Step 43 - Frontend đăng nhập Admin thật

## Đã làm

- `/admin-login` gọi API `POST /api/auth/admin-login`.
- Nếu đúng tài khoản admin trong PostgreSQL thì lưu session vào localStorage.
- `/admin` kiểm tra session, chưa đăng nhập sẽ tự chuyển về `/admin-login`.
- Có nút đăng xuất ở trang admin.

## Test

1. Chạy backend và frontend.
2. Mở:
```text
http://localhost:5173/admin-login
```
3. Đăng nhập:
```text
admin@campvibe.vn
campvibe2026
```
4. Vào `/admin` thành công.
5. Bấm đăng xuất, quay lại login.
