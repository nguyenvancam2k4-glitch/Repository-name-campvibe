# Step 37 - Frontend gọi API Places từ Backend

## Đã làm

- `src/config/apiConfig.js`
  - `BASE_URL = http://localhost:3000/api`
  - `USE_MOCK_DATA = false`

- `src/services/placeService.js`
  - `getPlaces()` gọi `/api/places`
  - `getPlaceDetail(id)` gọi `/api/places/:id`
  - Có fallback về dữ liệu mock nếu backend tắt.

- `src/pages/PlacesPage.jsx`
  - Lấy danh sách địa điểm từ backend/PostgreSQL.
  - Có bộ lọc frontend tạm thời.

- `src/pages/PlaceDetailPage.jsx`
  - Lấy chi tiết địa điểm từ backend/PostgreSQL.
  - Hiển thị amenities và gallery từ API.

## Cần chạy đồng thời

Frontend:
```bash
npm run dev
```

Backend:
```bash
npm run dev
```

Test:
```text
http://localhost:5173/places
http://localhost:5173/places/1
```
