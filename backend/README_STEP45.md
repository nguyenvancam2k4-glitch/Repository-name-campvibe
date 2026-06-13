# CampVibe Step 45 - Đăng nhập người dùng thường

## API mới

```text
POST /api/auth/login
```

Body:

```json
{
  "email": "customer@example.com",
  "password": "123456"
}
```

Điều kiện:
- Email tồn tại trong bảng users
- Password đúng
- Role phải là `customer`
- Status phải là `active`

## Test backend

```bash
npm run db:test:customer-login
npm run dev
```

## Test frontend

```text
http://localhost:5173/login
```
