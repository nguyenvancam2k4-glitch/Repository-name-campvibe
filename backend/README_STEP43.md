# CampVibe Step 43 - Đăng nhập Admin thật qua PostgreSQL

## API mới

```text
POST /api/auth/admin-login
GET /api/auth/admin-profile?email=admin@campvibe.vn
```

## Tài khoản demo

```text
admin@campvibe.vn
campvibe2026
```

## Sau khi copy backend

Chạy lại seed trong pgAdmin:

```text
src/database/seed.sql
```

để chuẩn hóa password admin thành `campvibe2026`.

Test:

```bash
npm run db:test:admin
```

Chạy backend:

```bash
npm run dev
```

Test API bằng frontend tại:

```text
http://localhost:5173/admin-login
```
