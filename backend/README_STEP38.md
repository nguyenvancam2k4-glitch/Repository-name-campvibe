# CampVibe Step 38 - Experiences API từ PostgreSQL

## API đã chuyển

```text
GET /api/experiences
```

Kết quả đúng có:

```json
"source": "postgresql"
```

## Sau khi copy backend

Trong pgAdmin, chạy lại:

```text
src/database/seed.sql
```

để bổ sung đủ 8 trải nghiệm và ảnh.

Sau đó test:

```bash
npm run db:test:experiences
```

Rồi chạy backend:

```bash
npm run dev
```

Mở:

```text
http://localhost:3000/api/experiences
```
