# CampVibe Backend - Step 35

Backend API cho website CampVibe.

## 1. Cài dependencies

Mở CMD tại thư mục `backend`:

```bash
npm install
```

## 2. Tạo file .env

Copy `.env.example` thành `.env`.

Ví dụ:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=campvibe_db
DB_USER=postgres
DB_PASSWORD=mat_khau_postgres_cua_ban
```

## 3. Tạo database PostgreSQL

Mở pgAdmin hoặc SQL Shell, tạo database:

```sql
CREATE DATABASE campvibe_db;
```

## 4. Tạo bảng

Mở Query Tool trong database `campvibe_db`, chạy nội dung file:

```text
src/database/schema.sql
```

## 5. Thêm dữ liệu mẫu

Tiếp tục chạy nội dung file:

```text
src/database/seed.sql
```

## 6. Test kết nối database

Chạy:

```bash
npm run db:test
```

Nếu thành công sẽ hiện:

```text
✅ Kết nối PostgreSQL thành công!
```

## 7. Chạy backend

```bash
npm run dev
```

Test API:

```text
http://localhost:3000/api/health
http://localhost:3000/api/places
```

## Ghi chú

Ở bước 35, backend đã có cấu hình kết nối PostgreSQL và file tạo bảng/dữ liệu mẫu.

Bước tiếp theo sẽ chuyển API `/api/places` từ dữ liệu file sang dữ liệu trong PostgreSQL.
