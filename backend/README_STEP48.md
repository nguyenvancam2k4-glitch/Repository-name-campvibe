# CampVibe Step 48 - Favorites

## Database

Chạy file này trong pgAdmin nếu chưa có bảng:

```text
D:\CampVibe\backend\src\database\favorites.sql
```

Hoặc chạy lại `seed.sql` cũng có tạo bảng `user_favorites`.

## API mới

```text
GET    /api/favorites/user/:userId
GET    /api/favorites/user/:userId/place/:placeId
POST   /api/favorites
DELETE /api/favorites/user/:userId/place/:placeId
```

## Test

```bash
npm run db:test:favorites
npm run dev
```
