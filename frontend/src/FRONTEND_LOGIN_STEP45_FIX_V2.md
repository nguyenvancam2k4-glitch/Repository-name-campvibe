# Step 45 FIX v2

## Lỗi đã sửa

Màn hình trắng tại `/login` do `ScrollToTop`/`Routes` chạy ngoài `BrowserRouter`.

## Đã sửa

- `App.jsx` bọc toàn bộ route bằng `BrowserRouter`.
- `ScrollToTop.jsx` dùng `window.scrollTo(0, 0)` an toàn hơn.
- Nếu `main.jsx` có bọc BrowserRouter thì đã bỏ để tránh lồng Router.

## Test

```text
http://localhost:5173/login
```
