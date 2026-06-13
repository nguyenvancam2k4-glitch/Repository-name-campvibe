# CampVibe Backend - Step 36

## Mục tiêu

Chuyển API địa điểm sang lấy dữ liệu từ PostgreSQL.

Các API đã chuyển:

```text
GET /api/places
GET /api/places/:id
```

Kết quả JSON sẽ có:

```json
"source": "postgresql"
```

để biết dữ liệu đang lấy từ database thật.

## Việc cần làm sau khi copy file

### 1. Cài lại package nếu cần

```bash
npm install
```

### 2. Nếu trước đó đã chạy `seed.sql` rồi

Nên chạy lại file:

```text
src/database/seed.sql
```

để thêm liên kết tiện nghi và ảnh phụ cho địa điểm.

### 3. Test model lấy places từ PostgreSQL

```bash
npm run db:test:places
```

Nếu đúng sẽ hiện:

```text
✅ Lấy địa điểm từ PostgreSQL thành công!
```

### 4. Chạy backend

```bash
npm run dev
```

### 5. Test API trên trình duyệt

```text
http://localhost:3000/api/places
http://localhost:3000/api/places/1
```

Nếu thấy `"source":"postgresql"` là đã thành công.
