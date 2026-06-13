# CampVibe Step 40 - Booking API PostgreSQL

## API đã chuyển

```text
GET /api/bookings
GET /api/bookings/:id
POST /api/bookings
PATCH /api/bookings/:id/status
```

## Test backend

```bash
npm run db:test:bookings
npm run dev
```

Mở:

```text
http://localhost:3000/api/bookings
```

## Test frontend

Mở:

```text
http://localhost:5173/booking/1
```

Nhập họ tên và số điện thoại, gửi yêu cầu. Sau đó mở lại:

```text
http://localhost:3000/api/bookings
```

Đơn mới phải xuất hiện trong database.
