import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CampHeader from "../components/CampHeader"
import ConfirmModal from "../components/ConfirmModal"
import PaymentBadge, { getMethodLabel } from "../components/PaymentBadge"
import { useToast } from "../components/ToastProvider"
import { getBookingById } from "../services/bookingService"
import { payBooking } from "../services/paymentService"

const paymentMethods = [
  {
    id: "cash",
    title: "Thanh toán khi nhận phòng",
    description: "Phù hợp nếu bạn muốn xác nhận lịch trước và thanh toán trực tiếp tại điểm nghỉ.",
    icon: "🏕️",
    note: "Ghi nhận giữ chỗ",
  },
  {
    id: "bank_transfer",
    title: "Chuyển khoản ngân hàng",
    description: "Hệ thống tạo mã giao dịch để xác nhận khoản thanh toán cho đơn đặt phòng.",
    icon: "🏦",
    note: "Xác nhận ngay",
  },
  {
    id: "e_wallet",
    title: "Ví điện tử",
    description: "Ghi nhận thanh toán nhanh qua ví điện tử, phù hợp với trải nghiệm đặt lịch hiện đại.",
    icon: "📱",
    note: "Nhanh gọn",
  },
  {
    id: "domestic_card",
    title: "Thẻ nội địa",
    description: "Ghi nhận thanh toán bằng thẻ ngân hàng nội địa cho khách muốn hoàn tất trước chuyến đi.",
    icon: "💳",
    note: "Tiện lợi",
  },
]

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")}đ`
}

function getAmount(booking) {
  return Number(booking?.totalPrice || booking?.total_price || booking?.totalAmount || booking?.total_amount || 0)
}

function PaymentPage() {
  const { bookingId } = useParams()
  const toast = useToast()

  const [booking, setBooking] = useState(null)
  const [selectedMethod, setSelectedMethod] = useState("bank_transfer")
  const [isLoading, setIsLoading] = useState(true)
  const [isPaying, setIsPaying] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [paymentResult, setPaymentResult] = useState(null)

  useEffect(() => {
    async function loadBooking() {
      try {
        setIsLoading(true)
        setErrorMessage("")
        const data = await getBookingById(bookingId)
        setBooking(data)
      } catch (error) {
        setErrorMessage(error.message || "Không thể tải thông tin đơn đặt phòng.")
      } finally {
        setIsLoading(false)
      }
    }

    loadBooking()
  }, [bookingId])

  const amount = useMemo(() => getAmount(booking), [booking])
  const currentMethod = paymentMethods.find((item) => item.id === selectedMethod)
  const existingPaymentStatus = paymentResult?.payment_status || booking?.paymentStatus || booking?.payment_status || "unpaid"
  const existingPaymentMethod = paymentResult?.payment_method || booking?.paymentMethod || booking?.payment_method || null
  const existingTransactionCode = paymentResult?.transaction_code || booking?.transactionCode || booking?.transaction_code || null
  const hasPaymentRecord = existingPaymentStatus && existingPaymentStatus !== "unpaid"

  async function handlePay() {
    if (hasPaymentRecord) {
      setConfirmOpen(false)
      toast.info("Đơn đã có thông tin thanh toán", "Bạn có thể xem lại trong biên nhận đặt phòng.")
      return
    }

    try {
      setIsPaying(true)

      const result = await payBooking(bookingId, {
        method: selectedMethod,
        amount,
      })

      setPaymentResult(result)
      setConfirmOpen(false)

      if (selectedMethod === "cash") {
        toast.success("Đã ghi nhận giữ chỗ", "Bạn có thể thanh toán trực tiếp khi nhận phòng.")
      } else {
        toast.success("Thanh toán thành công", "Thông tin thanh toán đã được ghi nhận cho đơn đặt phòng.")
      }
    } catch (error) {
      toast.error("Thanh toán chưa thành công", error.message || "Vui lòng thử lại sau.")
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39924,transparent_34%),radial-gradient(circle_at_bottom_right,#f59e0b1f,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="grid gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-emerald-300">
                Thanh toán đặt phòng
              </p>
              <h1 className="camp-page-title text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Xác nhận thanh toán cho chuyến đi
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-400">
                Chọn phương thức phù hợp để xác nhận yêu cầu đặt phòng. Thông tin thanh toán giúp đơn đặt phòng được ghi nhận rõ ràng hơn trước khi CampVibe hỗ trợ các chi tiết tiếp theo.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-stone-500">Mã đơn</p>
                  <p className="mt-3 text-2xl font-black text-white">
                    {booking?.bookingCode || booking?.booking_code || `BOOKING-${bookingId}`}
                  </p>
                </div>

                <div className="rounded-[1.6rem] border border-emerald-300/20 bg-emerald-300/10 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">Số tiền</p>
                  <p className="mt-3 text-3xl font-black text-white">{formatMoney(amount)}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/account" className="camp-btn camp-btn-ghost px-6 py-4 text-sm">
                  Xem tài khoản
                </Link>
                <Link to="/places" className="camp-btn camp-btn-secondary px-6 py-4 text-sm">
                  Chọn thêm địa điểm
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/20 backdrop-blur md:p-7">
              {isLoading && (
                <div className="rounded-[1.5rem] border border-white/10 bg-stone-950/70 p-7 text-center">
                  <div className="camp-skeleton mx-auto h-16 w-16 rounded-2xl"></div>
                  <p className="mt-5 font-black text-stone-300">Đang chuẩn bị thông tin thanh toán...</p>
                </div>
              )}

              {errorMessage && (
                <div className="rounded-[1.5rem] border border-red-300/30 bg-red-400/10 p-6 text-red-100">
                  {errorMessage}
                </div>
              )}

              {!isLoading && !errorMessage && (
                <>
                  {hasPaymentRecord ? (
                    <>
                      <div className="mb-6">
                        <p className="text-sm font-black uppercase tracking-[0.35em] text-emerald-300">
                          Trạng thái thanh toán
                        </p>
                        <h2 className="mt-3 text-3xl font-black">Đơn này đã được ghi nhận thanh toán</h2>
                      </div>

                      <div className="rounded-[1.5rem] border border-emerald-300/25 bg-emerald-300/10 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
                              Thông tin thanh toán
                            </p>
                            <p className="mt-2 text-sm leading-6 text-stone-300">
                              Phương thức: {getMethodLabel(existingPaymentMethod)}
                            </p>
                            {existingTransactionCode && (
                              <p className="mt-1 text-sm leading-6 text-stone-300">
                                Mã giao dịch: <span className="font-black text-white">{existingTransactionCode}</span>
                              </p>
                            )}
                          </div>
                          <PaymentBadge status={existingPaymentStatus} method={existingPaymentMethod} />
                        </div>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                          <Link to={`/invoice/${bookingId}`} className="camp-btn camp-btn-primary px-5 py-3 text-sm">
                            Xem biên nhận
                          </Link>
                          <Link to="/account" className="camp-btn camp-btn-ghost px-5 py-3 text-sm">
                            Quay về tài khoản
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-6">
                        <p className="text-sm font-black uppercase tracking-[0.35em] text-emerald-300">
                          Phương thức
                        </p>
                        <h2 className="mt-3 text-3xl font-black">Bạn muốn thanh toán bằng cách nào?</h2>
                      </div>

                      <div className="grid gap-4">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setSelectedMethod(method.id)}
                            className={`w-full rounded-[1.5rem] border p-5 text-left transition ${
                              selectedMethod === method.id
                                ? "border-emerald-300 bg-emerald-300/10 shadow-2xl shadow-emerald-400/10"
                                : "border-white/10 bg-stone-950/70 hover:border-emerald-300/40"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                                {method.icon}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                  <h3 className="text-xl font-black text-white">{method.title}</h3>
                                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                                    {method.note}
                                  </span>
                                </div>
                                <p className="mt-2 leading-7 text-stone-400">{method.description}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setConfirmOpen(true)}
                        disabled={isPaying}
                        className="camp-btn camp-btn-primary mt-7 w-full px-7 py-5 text-base"
                      >
                        {isPaying ? "Đang xử lý..." : `Xác nhận ${currentMethod?.title || "thanh toán"}`}
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </section>

          <section className="mt-12 grid gap-6 lg:grid-cols-3">
            <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/10">
              <div className="mb-5 text-3xl">🔐</div>
              <h3 className="text-xl font-black">Thông tin rõ ràng</h3>
              <p className="mt-3 leading-7 text-stone-400">
                Mỗi giao dịch đều có mã riêng để bạn dễ theo dõi trong tài khoản cá nhân.
              </p>
            </article>
            <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/10">
              <div className="mb-5 text-3xl">💬</div>
              <h3 className="text-xl font-black">Có hỗ trợ tư vấn</h3>
              <p className="mt-3 leading-7 text-stone-400">
                Sau khi ghi nhận thanh toán, CampVibe tiếp tục hỗ trợ xác nhận chi tiết chuyến đi.
              </p>
            </article>
            <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/10">
              <div className="mb-5 text-3xl">🧾</div>
              <h3 className="text-xl font-black">Thông tin dễ theo dõi</h3>
              <p className="mt-3 leading-7 text-stone-400">
                Thông tin thanh toán được lưu cùng đơn đặt phòng để bạn và admin dễ kiểm tra lại khi cần.
              </p>
            </article>
          </section>
        </div>
      </main>

      <ConfirmModal
        open={confirmOpen && !hasPaymentRecord}
        title="Xác nhận thanh toán"
        message={`Bạn muốn chọn phương thức “${currentMethod?.title}” cho đơn đặt phòng này?`}
        confirmText="Xác nhận"
        cancelText="Xem lại"
        isLoading={isPaying}
        onConfirm={handlePay}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  )
}

export default PaymentPage
