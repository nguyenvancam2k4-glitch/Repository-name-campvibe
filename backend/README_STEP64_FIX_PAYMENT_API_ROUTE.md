# Step 64 FIX - Payment API route

## Lỗi

Frontend báo API thanh toán không tồn tại.

Nguyên nhân: `paymentRoutes` bị đặt sau `notFoundHandler`, nên backend trả 404 trước khi đi tới route payment.

## Đã sửa

Trong `src/app.js`:

```js
app.use("/api", paymentRoutes)

app.use(notFoundHandler)
app.use(errorHandler)
```

Route payment đã được đặt trước notFound.

## Test nhanh

Chạy backend:

```bash
npm run dev
```

Mở trình duyệt:

```text
http://localhost:3000/api/bookings/7/payment
```

Nếu không còn 404 dạng API không tồn tại là ổn.

Hoặc chạy:

```bash
npm run test:payment-api 7
```
