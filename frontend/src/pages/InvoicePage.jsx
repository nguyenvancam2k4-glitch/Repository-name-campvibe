import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CampHeader from "../components/CampHeader"
import PaymentBadge, { getMethodLabel, getPaymentLabel } from "../components/PaymentBadge"
import { getBookingById } from "../services/bookingService"
import { getBookingPayment } from "../services/paymentService"

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")}đ`
}

function formatDate(value) {
  if (!value) return "Chưa cập nhật"
  try {
    return new Date(value).toLocaleDateString("vi-VN")
  } catch {
    return value
  }
}

function formatDateTime(value) {
  if (!value) return "Chưa ghi nhận"
  try {
    return new Date(value).toLocaleString("vi-VN")
  } catch {
    return value
  }
}

function getAmount(booking, payment) {
  return Number(
    payment?.paid_amount ||
    payment?.paidAmount ||
    booking?.paidAmount ||
    booking?.paid_amount ||
    booking?.totalAmount ||
    booking?.total_amount ||
    0
  )
}

function getBookingCode(booking, payment, bookingId) {
  return (
    payment?.booking_code ||
    payment?.bookingCode ||
    booking?.bookingCode ||
    booking?.booking_code ||
    `CVB-${bookingId}`
  )
}

function InfoBox({ label, value, accent = false }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-stone-950/65 p-4">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">{label}</p>
      <p className={`mt-2 text-base font-black ${accent ? "text-emerald-300" : "text-white"}`}>{value}</p>
    </div>
  )
}

function InvoicePage() {
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)
  const [payment, setPayment] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function loadInvoice() {
      try {
        setIsLoading(true)
        setErrorMessage("")

        const bookingResult = await getBookingById(bookingId)
        setBooking(bookingResult)

        try {
          const paymentResult = await getBookingPayment(bookingId)
          setPayment(paymentResult)
        } catch {
          setPayment(null)
        }
      } catch (error) {
        setErrorMessage(error.message || "Không thể tải biên nhận.")
      } finally {
        setIsLoading(false)
      }
    }

    loadInvoice()
  }, [bookingId])

  const amount = useMemo(() => getAmount(booking, payment), [booking, payment])
  const paymentStatus = payment?.payment_status || booking?.paymentStatus || booking?.payment_status || "unpaid"
  const paymentMethod = payment?.payment_method || booking?.paymentMethod || booking?.payment_method || null
  const bookingCode = getBookingCode(booking, payment, bookingId)
  const transactionCode = payment?.transaction_code || booking?.transactionCode || booking?.transaction_code || "Chưa có"
  const paidAt = payment?.paid_at || booking?.paidAt || booking?.paid_at

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39922,transparent_34%),radial-gradient(circle_at_bottom_right,#f59e0b18,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <section className="py-8">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.32em] text-emerald-300">
              Biên nhận
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Biên nhận đặt phòng
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-stone-400">
              Kiểm tra lại mã đơn, lịch đặt phòng và trạng thái thanh toán đã ghi nhận.
            </p>
          </section>

          {isLoading && (
            <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/20">
              <div className="camp-skeleton h-7 w-56 rounded-full"></div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="camp-skeleton h-24 rounded-2xl"></div>
                <div className="camp-skeleton h-24 rounded-2xl"></div>
                <div className="camp-skeleton h-24 rounded-2xl"></div>
              </div>
            </section>
          )}

          {errorMessage && (
            <section className="rounded-[2rem] border border-red-300/30 bg-red-400/10 p-6 text-red-100">
              <h2 className="text-2xl font-black">Chưa tải được biên nhận</h2>
              <p className="mt-3 leading-7">{errorMessage}</p>
              <Link to="/account" className="camp-btn camp-btn-primary mt-6 px-6 py-3 text-sm">
                Quay về tài khoản
              </Link>
            </section>
          )}

          {!isLoading && !errorMessage && (
            <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/25 backdrop-blur">
              <div className="border-b border-white/10 bg-stone-950/65 p-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-stone-500">Mã đặt chỗ</p>
                    <h2 className="mt-2 text-3xl font-black md:text-4xl">{bookingCode}</h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <PaymentBadge status={paymentStatus} method={paymentMethod} />
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black text-stone-300">
                      {getMethodLabel(paymentMethod)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
                <div className="p-6">
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">
                    Chi tiết đặt phòng
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <InfoBox label="Khách hàng" value={booking?.fullName || booking?.full_name || "Khách hàng CampVibe"} />
                    <InfoBox label="Địa điểm" value={booking?.placeName || booking?.place_name || "Địa điểm đã chọn"} />
                    <InfoBox label="Ngày nhận phòng" value={formatDate(booking?.checkInDate || booking?.check_in || booking?.checkIn)} />
                    <InfoBox label="Ngày trả phòng" value={formatDate(booking?.checkOutDate || booking?.check_out || booking?.checkOut)} />
                    <InfoBox label="Số khách" value={`${booking?.guestCount || booking?.guests || booking?.guest_count || "Chưa cập nhật"} khách`} />
                    <InfoBox label="Trạng thái đơn" value={booking?.status || "pending"} />
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-stone-950/55 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">Ghi chú</p>
                    <p className="mt-2 leading-7 text-stone-300">
                      {booking?.note || booking?.message || "Không có ghi chú thêm cho đơn đặt phòng này."}
                    </p>
                  </div>
                </div>

                <aside className="border-t border-white/10 bg-stone-950/45 p-6 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">
                    Thanh toán
                  </p>

                  <div className="mt-6 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">Số tiền</p>
                    <p className="mt-3 text-3xl font-black">{formatMoney(amount)}</p>
                  </div>

                  <div className="mt-4 grid gap-4">
                    <InfoBox label="Trạng thái" value={getPaymentLabel(paymentStatus, paymentMethod)} />
                    <InfoBox label="Mã giao dịch" value={transactionCode} />
                    <InfoBox label="Thời gian ghi nhận" value={formatDateTime(paidAt)} />
                  </div>

                  <div className="mt-6 grid gap-3">
                    <Link to={`/payment/${bookingId}`} className="camp-btn camp-btn-secondary w-full px-5 py-3 text-sm">
                      Xem thanh toán
                    </Link>
                    <Link to="/account" className="camp-btn camp-btn-primary w-full px-5 py-3 text-sm">
                      Quay về tài khoản
                    </Link>
                  </div>
                </aside>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default InvoicePage
