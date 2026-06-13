# Step 64 FIX V3 - Sửa lỗi kiểu dữ liệu SQL thanh toán

## Lỗi cũ

```text
inconsistent types deduced for parameter $2
text versus character varying
```

## Nguyên nhân

SQL dùng cùng `$2` cho `payment_status` và `CASE WHEN $2 = 'paid'`.

## Đã sửa

Không dùng `CASE WHEN $2` trong SQL nữa.
Backend tính `paidAt` bằng JavaScript rồi truyền vào query:

```js
const paidAt = paymentStatus === "paid" ? new Date() : null
```

## Test

Chạy backend:

```bash
npm run dev
```

Mở PowerShell khác tại backend:

```bash
npm run test:pay-booking 7
```
