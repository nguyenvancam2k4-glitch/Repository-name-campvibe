# Step 60.1 - Cập nhật nội dung blog dài hơn

## Mục tiêu

Cập nhật nội dung các bài blog trong PostgreSQL để trang chi tiết blog không còn quá ít chữ.

## Cách chạy

Mở PowerShell tại:

```text
D:\CampVibe\backend
```

Chạy:

```bash
npm install
npm run db:update-blog
```

Sau đó chạy backend:

```bash
npm run dev
```

Mở frontend và kiểm tra:

```text
http://localhost:5173/blog
http://localhost:5173/blog/1
http://localhost:5173/blog/2
```

## Lưu ý

Bước này có thay database bảng `blog_posts`.
Nếu chưa chạy `npm run db:update-blog`, giao diện có thể vẫn hiện bài blog ngắn cũ.


## Bản FIX

Script `updateBlogContent.js` đã được sửa để tự dò file kết nối database ở nhiều vị trí:

```text
backend/config/db.js
backend/src/config/db.js
backend/database/db.js
backend/src/database/db.js
backend/db.js
backend/src/db.js
```


## Bản FIX V2

Đường dẫn đã sửa đúng theo thư mục backend khi chạy PowerShell tại:

```text
D:\CampVibe\backend
```

Script sẽ ưu tiên tìm:

```text
src/config/db.js
```
