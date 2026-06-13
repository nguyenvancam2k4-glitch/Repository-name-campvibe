# Step 38 - Frontend gọi API Experiences từ Backend

## Đã làm

- Backend `/api/experiences` lấy dữ liệu từ PostgreSQL.
- Frontend trang `/experiences` gọi `experienceService`.
- Có fallback về `src/data/experiences.js` nếu backend tắt.
- Dữ liệu API được chuẩn hóa để giao diện vẫn có icon, ảnh, tags/includes và giá dạng VND.

## Cần chạy đồng thời

Backend:
```bash
npm run dev
```

Frontend:
```bash
npm run dev
```

Test:
```text
http://localhost:3000/api/experiences
http://localhost:5173/experiences
```
