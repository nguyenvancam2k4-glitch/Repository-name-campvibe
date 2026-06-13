# Step 40 - Frontend gửi đơn đặt phòng vào PostgreSQL

## Đã làm

- `/booking/:id` lấy địa điểm từ API.
- Form đặt phòng gửi `POST /api/bookings`.
- Sau khi gửi thành công, chuyển sang `/booking-success/:bookingId`.
- `/booking-success/:id` đọc lại đơn từ backend.
- Có lưu tạm `localStorage` để dự phòng nếu API đọc chi tiết lỗi.

## Test

```text
http://localhost:5173/booking/1
```

Nhập:
- Họ tên
- Số điện thoại

Bấm gửi yêu cầu đặt phòng.
