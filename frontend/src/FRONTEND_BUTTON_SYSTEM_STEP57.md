# Step 57 - Unified Button System

## Đã làm

- Thêm `components/CampButton.jsx` để các bước sau có thể dùng chung.
- Thêm CSS global đồng bộ hiệu ứng cho:
  - button
  - link dạng button
  - nút rounded-full
  - nút rounded-2xl
- Tất cả nút có:
  - hover nổi nhẹ
  - shadow mượt
  - active bấm xuống
  - focus-visible sáng rõ
  - disabled mờ và không nhảy hiệu ứng

## Test nhanh các nút

### Public
```text
/
/places
/places/1
/experiences
/blog
/contact
/compare
```

### User
```text
/login
/register
/account
/favorites
/booking/1
```

### Admin
```text
/admin-login
/admin/dashboard
/admin
/admin/contacts
```

## Lưu ý

Bước này không đổi logic database/backend. Chỉ đồng bộ cảm giác tương tác của nút.
