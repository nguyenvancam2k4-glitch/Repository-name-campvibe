# Step 64 REDO - Stable payment and admin display

## Mục tiêu

Bản này làm lại từ Step 63 theo hướng ít rủi ro:
- Sửa route payment đúng vị trí trước notFoundHandler.
- Sửa SQL payment để tránh lỗi kiểu dữ liệu.
- Không thêm chữ kiểu báo cáo/đồ án vào giao diện.
- Admin chỉ hiển thị badge thanh toán gọn trong từng đơn, không thêm khối chữ lớn.

## Cần chạy

```bash
npm install
npm run db:payment
npm run dev
```

Nếu đã chạy `db:payment` thành công trước đó thì không bắt buộc chạy lại.

## Test API

Mở PowerShell khác tại backend:

```bash
npm run test:pay-booking 7
```
