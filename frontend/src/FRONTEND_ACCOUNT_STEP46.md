# Step 46 - Account hiển thị user thật

## Đã làm

- `/account` đọc `campvibe_customer_session` từ localStorage.
- Hiển thị đúng:
  - Họ tên
  - Email
  - Số điện thoại
  - ID người dùng
  - Vai trò customer
- Chưa đăng nhập thì tự chuyển về `/login`.
- Có nút đăng xuất.
- Xóa dữ liệu mẫu Nguyễn Minh Anh ở trang account.

## Test

1. Đăng nhập tại:
```text
http://localhost:5173/login
```

2. Vào:
```text
http://localhost:5173/account
```

Nếu thấy tên/email/số điện thoại của tài khoản vừa đăng nhập thì thành công.
