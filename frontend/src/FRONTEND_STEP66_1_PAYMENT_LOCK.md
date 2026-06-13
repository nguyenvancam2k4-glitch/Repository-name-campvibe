# Step 66.1 - Payment lock after paid

## Đã sửa

- Nếu đơn đã có paymentStatus khác `unpaid`, trang `/payment/:id` không hiển thị danh sách phương thức thanh toán nữa.
- Không còn nút "Cập nhật thông tin thanh toán".
- Không cho gọi lại API thanh toán nếu đơn đã được ghi nhận thanh toán.
- Chỉ còn nút xem biên nhận và quay về tài khoản.

## Test

```text
/payment/7
/account
```
