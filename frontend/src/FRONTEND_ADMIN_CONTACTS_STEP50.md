# Step 50 - Admin Contacts

## Đã làm

- Thêm trang `/admin/contacts`.
- Admin xem danh sách liên hệ từ PostgreSQL.
- Admin cập nhật trạng thái liên hệ.
- Chưa đăng nhập admin thì tự chuyển về `/admin-login`.

## Test

1. Login admin.
2. Mở:
```text
http://localhost:5173/admin/contacts
```
3. Bấm `Đã liên hệ` hoặc `Đã xử lý`.
4. Mở:
```text
http://localhost:3000/api/contacts
```
5. Kiểm tra status đã đổi.
