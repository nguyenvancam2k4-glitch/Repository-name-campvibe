# CampVibe Step 47 - Account Booking History

API mới:

GET /api/bookings/customer/:userId

Ví dụ:
http://localhost:3000/api/bookings/customer/9

POST /api/bookings đã nhận thêm userId để gắn đơn với tài khoản đăng nhập.

Test:
npm run db:test:customer-bookings
