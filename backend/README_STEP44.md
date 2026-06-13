# CampVibe Step 44 - Đăng ký người dùng thường

## API mới

```text
POST /api/auth/register
```

Body:

```json
{
  "fullName": "Nguyễn Văn A",
  "email": "a@example.com",
  "phone": "0912345678",
  "password": "123456",
  "confirmPassword": "123456"
}
```

Tài khoản được lưu vào bảng `users` với:

```text
role = customer
status = active
```

## Test backend

```bash
npm run db:test:users
npm run dev
```

## Test frontend

```text
http://localhost:5173/register
```
