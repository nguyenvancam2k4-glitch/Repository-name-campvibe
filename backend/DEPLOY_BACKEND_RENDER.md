# CAMPVIBE - HƯỚNG DẪN DEPLOY VERCEL + RENDER

## Mục tiêu

Tạo link thật để gửi cho bạn cùng nhóm test trước buổi thuyết trình.

Kiến trúc deploy:

```text
Frontend React/Vite  -> Vercel
Backend ExpressJS    -> Render Web Service
Database PostgreSQL  -> Neon PostgreSQL hoặc Render PostgreSQL
```

## 1. Chuẩn bị GitHub

1. Tạo repository GitHub mới, ví dụ: `campvibe`.
2. Đẩy toàn bộ thư mục `D:\CampVibe` lên GitHub.
3. Không đưa file `.env` thật lên GitHub. Chỉ dùng `.env.example`.

## 2. Tạo database online bằng Neon

1. Vào Neon và đăng nhập.
2. Tạo project mới tên `campvibe-db`.
3. Copy connection string PostgreSQL, dạng gần giống:

```text
postgresql://user:password@host/database?sslmode=require
```

4. Đây chính là biến `DATABASE_URL` dùng cho Render.

## 3. Deploy backend lên Render

1. Vào Render.
2. Chọn `New` -> `Web Service`.
3. Kết nối GitHub repo CampVibe.
4. Chọn thư mục root là:

```text
backend
```

5. Cấu hình:

```text
Language: Node
Build Command: npm install
Start Command: npm start
```

6. Thêm Environment Variables:

```text
NODE_ENV=production
PORT=3000
DATABASE_URL=<connection string Neon>
CLIENT_URL=<link Vercel sau khi deploy frontend>
```

Lúc đầu chưa có link Vercel thì có thể tạm để:

```text
CLIENT_URL=http://localhost:5173
```

Sau khi deploy Vercel xong thì quay lại Render sửa `CLIENT_URL`.

7. Deploy backend.
8. Sau khi backend có link, mở:

```text
https://ten-backend.onrender.com/api/health
```

Nếu thấy JSON trả về thì backend đã chạy.

## 4. Khởi tạo dữ liệu trên database online

Cách dễ nhất:

1. Mở terminal local tại:

```text
D:\CampVibe\backend
```

2. Tạo file `.env` tạm thời hoặc sửa `.env` dùng:

```text
DATABASE_URL=<connection string Neon>
NODE_ENV=production
```

3. Chạy:

```bash
npm install
npm run db:init
npm run db:seed
npm run db:payment
```

4. Sau khi seed xong, đổi `.env` local lại như cũ nếu muốn chạy database local.

## 5. Deploy frontend lên Vercel

1. Vào Vercel.
2. Add New Project.
3. Import GitHub repo CampVibe.
4. Root Directory chọn:

```text
frontend
```

5. Framework: Vite.
6. Build command:

```text
npm run build
```

7. Output directory:

```text
dist
```

8. Thêm Environment Variable:

```text
VITE_API_BASE_URL=https://ten-backend.onrender.com/api
```

9. Deploy.

## 6. Cập nhật CORS Render

Sau khi có link Vercel, ví dụ:

```text
https://campvibe.vercel.app
```

Quay lại Render -> Environment, sửa:

```text
CLIENT_URL=https://campvibe.vercel.app
```

Sau đó redeploy backend.

## 7. Test link thật

Mở link Vercel và test:

```text
/
/places
/places/1
/register
/login
/account
/favorites
/booking/1
/payment/7
/invoice/7
/admin-login
/admin/dashboard
/admin
/admin/contacts
```

## 8. Tài khoản test

Admin:

```text
Email: admin@campvibe.vn
Password: campvibe2026
```

Khách hàng có thể đăng ký mới trực tiếp trên website.

## 9. Lưu ý khi gửi bạn cùng nhóm

Nên gửi cho bạn cùng nhóm 3 thứ:

```text
1. Link website Vercel
2. Tài khoản admin
3. Danh sách 5 thao tác cần thử
```

Ví dụ thao tác:

```text
- Xem trang chủ
- Xem địa điểm
- Đặt phòng
- Xem tài khoản/lịch sử đặt phòng
- Đăng nhập admin và xem đơn
```

## 10. Nếu Render bị ngủ

Render free web service có thể mất vài chục giây để thức dậy sau thời gian không truy cập. Nếu mở link lần đầu thấy chậm, đợi một chút rồi refresh.
