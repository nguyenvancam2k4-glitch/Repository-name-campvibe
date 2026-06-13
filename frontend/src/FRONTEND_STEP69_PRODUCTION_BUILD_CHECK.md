# CampVibe Step 69 - Production build check

## Mục tiêu

Kiểm tra frontend có thể đóng gói bản production hay không.

## Cách chạy trên máy của bạn

Mở PowerShell tại:

```text
D:\CampVibe\frontend
```

Chạy:

```bash
npm install
npm run build
```

Nếu build thành công, Vite sẽ tạo thư mục:

```text
D:\CampVibe\frontend\dist
```

Có thể kiểm tra bản build bằng:

```bash
npm run preview
```

Sau đó mở link Vite hiển thị, thường là:

```text
http://localhost:4173
```

## Những trang cần mở sau khi preview

```text
/
/places
/places/1
/experiences
/blog
/blog/1
/contact
/compare
/account
/favorites
/payment/7
/invoice/7
/admin-login
/admin/dashboard
/admin
/admin/contacts
```

## Lưu ý

- Step này không thêm chức năng mới.
- Chỉ sửa lại khối đường tắt trang chủ để tránh form tìm kiếm giả.
- Nếu `npm run build` báo lỗi, hãy gửi ảnh lỗi để sửa đúng file.
