# Step 63 FIX - Missing db:payment script

## Đã sửa

Trong `backend/package.json` đã thêm đúng:

```json
"db:payment": "node scripts/addPaymentColumns.js"
```

## Chạy lại

```bash
npm install
npm run db:payment
```
