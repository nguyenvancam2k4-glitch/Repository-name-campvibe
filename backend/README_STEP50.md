# CampVibe Step 50 - Admin quản lý liên hệ

## API sử dụng

```text
GET /api/contacts
PATCH /api/contacts/:id/status
```

Trạng thái:
- new
- contacted
- resolved
- cancelled

## Test

1. Gửi form liên hệ ở `/contact`.
2. Mở `/admin/contacts`.
3. Đổi trạng thái liên hệ.
4. Kiểm tra API:
```text
http://localhost:3000/api/contacts
```
