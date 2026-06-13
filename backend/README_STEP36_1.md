# CampVibe Backend - Step 36.1

## Mục tiêu

Sửa lỗi dữ liệu mẫu bị nhân đôi khi chạy `seed.sql` nhiều lần.

## Cách làm sạch database mẫu

Trong pgAdmin, mở database `campvibe_db`, mở Query Tool.

Chạy file:

```text
src/database/reset.sql
```

Sau đó chạy lại file:

```text
src/database/seed.sql
```

## Kiểm tra

Chạy backend:

```bash
npm run dev
```

Mở:

```text
http://localhost:3000/api/places
```

Kết quả đúng nên là:

```json
"source": "postgresql",
"count": 6
```
