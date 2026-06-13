# Step 48 FIX v2

## Lỗi đã sửa

Backend báo:

```text
column p.short_description does not exist
```

Nguyên nhân: bảng `places` không có cột `short_description`.

## Đã sửa

Trong `src/models/favoriteModel.js`:
- Bỏ `p.short_description`
- Dùng `p.description AS place_description`
- Frontend favorites vẫn hiển thị mô tả bình thường.
