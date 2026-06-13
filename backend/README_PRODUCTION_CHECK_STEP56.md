# CampVibe Step 56 - Kiểm tra Backend trước demo

## Mục tiêu

Đảm bảo backend Express kết nối được PostgreSQL và API chạy ổn trước khi build frontend.

## Mở PowerShell tại

```text
D:\CampVibe\backend
```

## Cài package

```bash
npm install
```

## Test kết nối database

```bash
npm run db:test
```

## Test các bảng/API chính

```bash
npm run db:test:users
npm run db:test:customer-login
npm run db:test:customer-bookings
npm run db:test:favorites
npm run db:test:contacts
npm run db:test:dashboard
```

## Chạy backend

```bash
npm run dev
```

## API cần mở thử trên trình duyệt

```text
http://localhost:3000/api/health
http://localhost:3000/api/places
http://localhost:3000/api/experiences
http://localhost:3000/api/blog-posts
http://localhost:3000/api/bookings
http://localhost:3000/api/contacts
http://localhost:3000/api/dashboard/admin
```

Nếu các API đều trả về `success: true` và `source: postgresql`, backend đã sẵn sàng demo.
