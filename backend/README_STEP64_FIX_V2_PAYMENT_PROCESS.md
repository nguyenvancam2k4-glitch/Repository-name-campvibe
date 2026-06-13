# Step 64 FIX V2 - Sửa xử lý thanh toán

## Lỗi

Frontend gọi được API nhưng báo:

```text
Không thể xử lý thanh toán
```

## Nguyên nhân có thể

Route thanh toán đang đọc cột tổng tiền chưa khớp database thật.

## Đã sửa

Backend không đọc `total_amount` hoặc `total_price` nữa.
Số tiền thanh toán lấy từ frontend gửi lên qua `amount`, rồi lưu vào:

```text
paid_amount
payment_method
payment_status
transaction_code
paid_at
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
