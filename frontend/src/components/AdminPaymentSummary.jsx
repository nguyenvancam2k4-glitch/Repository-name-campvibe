import PaymentBadge, { getMethodLabel } from "./PaymentBadge"

function formatPaymentMoney(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")}đ`
}

function AdminPaymentSummary({ booking }) {
  if (!booking) return null

  const paymentStatus = booking.paymentStatus || booking.payment_status
  const paymentMethod = booking.paymentMethod || booking.payment_method
  const paidAmount = booking.paidAmount || booking.paid_amount
  const transactionCode = booking.transactionCode || booking.transaction_code

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-stone-950/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">
            Thanh toán
          </p>
          <div className="mt-2">
            <PaymentBadge status={paymentStatus} method={paymentMethod} />
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">Đã ghi nhận</p>
          <p className="mt-2 font-black text-white">{formatPaymentMoney(paidAmount)}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-stone-400 sm:grid-cols-2">
        <p>
          Phương thức: <span className="font-bold text-stone-200">{getMethodLabel(paymentMethod)}</span>
        </p>
        <p className="camp-safe-wrap">
          Mã giao dịch: <span className="font-bold text-stone-200">{transactionCode || "Chưa có"}</span>
        </p>
      </div>
    </div>
  )
}

export default AdminPaymentSummary
