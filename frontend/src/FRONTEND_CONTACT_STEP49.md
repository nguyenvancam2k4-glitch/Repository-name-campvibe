# Step 49 - Contact page

## Đã làm

- `/contact` gửi form thật tới backend.
- Backend lưu vào bảng `contact_messages`.
- Nếu user đang đăng nhập, form tự điền thông tin và lưu `userId`.

## Test

1. Chạy SQL `contact_messages.sql`.
2. Mở `/contact`.
3. Gửi form.
4. Mở `http://localhost:3000/api/contacts` kiểm tra dữ liệu.
