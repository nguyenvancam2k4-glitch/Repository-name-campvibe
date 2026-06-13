# Step 35.1 - Rà soát và sửa nút tĩnh frontend

## Đã sửa

- Trang trải nghiệm:
  - Nút `Chọn` không còn nhảy thẳng sang `/places` một cách khó hiểu.
  - Khi bấm `Chọn`, trải nghiệm được lưu tạm vào `localStorage`.
  - Hiện thông báo `Đã thêm vào chuyến đi`.
  - Có nút `Chọn địa điểm` để người dùng đi tiếp.

- Trang chủ:
  - Nút `Tìm kiếm` chuyển sang `/places`.
  - Nút `Thêm vào chuyến đi` đổi thành `Chọn trải nghiệm` và chuyển sang `/experiences`.
  - Nút `Xem tất cả bài viết` chuyển sang `/blog`.
  - Nút `Đọc thêm` chuyển sang chi tiết blog.
  - Nút gửi tư vấn ở cuối trang chuyển sang `/contact`.
  - Các icon mạng xã hội ở footer có liên kết mô phỏng.

- Trang tài khoản:
  - Nút `Chỉnh sửa hồ sơ` hiển thị thông báo mô phỏng thay vì đứng im.

- Trang địa điểm:
  - Nút `Lọc địa điểm` hiển thị thông báo mô phỏng, chuẩn bị cho backend/database.

- Trang yêu thích:
  - Nút trái tim hiển thị thông báo mô phỏng, chuẩn bị chức năng bỏ yêu thích.

## Ghi chú

Các nút chưa có backend thật sẽ có hành động mô phỏng rõ ràng, không để người dùng bấm mà không thấy gì.
