# Step 63 FIX V2 - Sửa import database cho paymentRoutes

## Lỗi cũ

```text
The requested module '../config/db.js' does not provide an export named 'default'
```

## Đã sửa

Trong:

```text
backend/src/routes/paymentRoutes.js
```

đã đổi:

```js
import pool from "../config/db.js"
```

thành:

```js
import { pool } from "../config/db.js"
```

## Chạy lại

```bash
npm run dev
```
