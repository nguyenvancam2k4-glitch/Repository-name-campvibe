# Step 63 FIX V3 - Frontend blank fix

## Lỗi

`PaymentPage.jsx` import sai hàm:

```js
getBookingDetail
```

Trong project hiện tại chỉ có:

```js
getBookingById
```

## Đã sửa

```js
import { getBookingById } from "../services/bookingService"
```

và gọi:

```js
const data = await getBookingById(bookingId)
```
