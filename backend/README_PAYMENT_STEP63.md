# Step 63 - Thanh toán mô phỏng

## Cần chạy migration

Mở PowerShell tại:

```text
D:\CampVibe\backend
```

Chạy:

```bash
npm install
npm run db:payment
```

Sau đó chạy backend:

```bash
npm run dev
```

## API mới

```text
POST /api/bookings/:id/pay
GET  /api/bookings/:id/payment
```
