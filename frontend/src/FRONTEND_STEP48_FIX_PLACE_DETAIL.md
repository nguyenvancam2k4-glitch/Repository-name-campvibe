# Step 48 FIX - Place detail blank page

Đã sửa lỗi trắng màn hình tại `/places/:id`.

Nguyên nhân: PlaceDetailPage bị lỗi khi thêm nút yêu thích.

Đã làm:
- Viết lại PlaceDetailPage an toàn.
- Giữ nút Đặt ngay.
- Thêm nút Thêm yêu thích / Đã yêu thích.
- Giữ link Xem yêu thích.
- Nếu chưa đăng nhập, bấm yêu thích sẽ chuyển về `/login`.
