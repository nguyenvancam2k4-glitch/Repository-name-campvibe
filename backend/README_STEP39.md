# CampVibe Step 39 - Blog API từ PostgreSQL

## API đã chuyển

```text
GET /api/blog-posts
GET /api/blog-posts/:id
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

để bổ sung ảnh, content và bài viết mẫu.

Test:

```bash
npm run db:test:blog
```

Chạy backend:

```bash
npm run dev
```

Mở:

```text
http://localhost:3000/api/blog-posts
http://localhost:3000/api/blog-posts/1
```
