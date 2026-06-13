# Step 58 - Auth Header

## Đã làm

- Thêm `AuthHeaderActions.jsx`.
- Thêm `CampHeader.jsx`.
- Header user:
  - Chưa đăng nhập: Đăng nhập / Đăng ký
  - Đã đăng nhập: hiện tên user + menu tài khoản
- Header admin:
  - Đăng nhập admin: hiện Admin menu
  - Chưa đăng nhập admin: nút đăng nhập admin
- Patch các trang chính để dùng header chung.

## Test

### Khi chưa đăng nhập user
Mở:
```text
/
```
Header phải có:
```text
Đăng nhập
Đăng ký
```

### Khi đã đăng nhập user
Header phải hiện tên user, bấm vào có menu:
```text
Tài khoản của tôi
Địa điểm yêu thích
Đặt chuyến mới
Liên hệ tư vấn
Đăng xuất
```

### Admin
Mở:
```text
/admin/dashboard
```
Header phải có menu Admin.
