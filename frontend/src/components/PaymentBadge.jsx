function getPaymentLabel(status, method) {
  if (status === "paid") return "Đã thanh toán"
  if (status === "pay_at_property" || method === "cash") return "Thanh toán khi nhận phòng"
  return "Chưa thanh toán"
}

function getPaymentClass(status, method) {
  if (status === "paid") return "border-emerald-300/30 bg-emerald-300/10 text-emerald-200"
  if (status === "pay_at_property" || method === "cash") return "border-sky-300/30 bg-sky-300/10 text-sky-200"
  return "border-yellow-300/30 bg-yellow-300/10 text-yellow-200"
}

function getMethodLabel(method) {
  const labels = {
    cash: "Khi nhận phòng",
    bank_transfer: "Chuyển khoản",
    e_wallet: "Ví điện tử",
    domestic_card: "Thẻ nội địa",
  }

  return labels[method] || "Chưa chọn"
}

function PaymentBadge({ status, method }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1.5 text-[11px] font-black ${getPaymentClass(status, method)}`}>
      {getPaymentLabel(status, method)}
    </span>
  )
}

export { getPaymentLabel, getMethodLabel }
export default PaymentBadge
