import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCustomerBookings } from "../services/bookingService"
import { getCustomerSession, isCustomerLoggedIn, logoutCustomer } from "../services/authService"
import CampHeader from "../components/CampHeader"
import ContentBoost from "../components/ContentBoost"
import PaymentBadge, { getMethodLabel } from "../components/PaymentBadge"

function formatDate(value) {
  if (!value) return "Chưa chọn"
  try { return new Date(value).toLocaleDateString("vi-VN") } catch { return value }
}

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")}đ`
}

function getTripDateLabel(booking) {
  if (booking.checkInDate) return formatDate(booking.checkInDate)
  return "Chưa chọn lịch"
}

function getPaymentActionLabel(booking) {
  if (booking.paymentStatus === "paid") return "Xem thanh toán"
  if (booking.paymentStatus === "pay_at_property") return "Xem giữ chỗ"
  return "Thanh toán"
}

function getPaymentActionClass(booking) {
  if (booking.paymentStatus === "unpaid" || !booking.paymentStatus) return "camp-btn camp-btn-secondary px-5 py-3 text-xs"
  return "camp-btn camp-btn-ghost px-5 py-3 text-xs"
}

function getStatusLabel(status) {
  return { pending: "Chờ xác nhận", confirmed: "Đã xác nhận", completed: "Đã hoàn tất", cancelled: "Đã hủy" }[status] || status
}

function getStatusClass(status) {
  return {
    pending: "border-yellow-300/30 bg-yellow-300/10 text-yellow-300",
    confirmed: "border-emerald-300/30 bg-emerald-300/10 text-emerald-300",
    completed: "border-sky-300/30 bg-sky-300/10 text-sky-300",
    cancelled: "border-red-300/30 bg-red-300/10 text-red-300",
  }[status] || "border-white/20 bg-white/10 text-white"
}

function getInitials(name) {
  return (name || "CV").split(" ").filter(Boolean).slice(-2).map((w) => w[0]).join("").toUpperCase()
}

function AccountPage() {
  const navigate = useNavigate()
  const session = getCustomerSession()
  const user = session?.user
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isCustomerLoggedIn()) {
      navigate("/login")
      return
    }

    async function loadHistory() {
      try {
        setLoading(true)
        setBookings(await getCustomerBookings(user.id))
      } catch (err) {
        setError(err.message || "Không thể tải lịch sử đặt phòng")
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [navigate, user?.id])

  const stats = useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter((item) => item.status === "pending").length,
    confirmed: bookings.filter((item) => item.status === "confirmed").length,
  }), [bookings])

  function handleLogout() {
    logoutCustomer()
    navigate("/login")
  }

  if (!user) return <div className="flex min-h-screen items-center justify-center bg-stone-950 text-white">Đang kiểm tra đăng nhập...</div>

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="grid gap-8 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">Tài khoản khách hàng</p>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">Xin chào, {user.fullName}</h1>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-400">Theo dõi hồ sơ cá nhân, lịch sử đặt phòng và trạng thái thanh toán trong cùng một nơi.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/places" className="rounded-full bg-emerald-400 px-7 py-4 text-center font-black text-stone-950">Đặt chuyến mới</Link>
                <Link to="/favorites" className="rounded-full border border-white/15 px-7 py-4 text-center font-black hover:bg-white/10">Xem yêu thích</Link>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-emerald-400 text-4xl font-black text-stone-950">{getInitials(user.fullName)}</div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-300">Hồ sơ cá nhân</p>
                  <h2 className="mt-3 text-4xl font-black">{user.fullName}</h2>
                  <p className="mt-2 text-stone-400">{user.email}</p>
                </div>
              </div>
              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-stone-950/70 p-5"><p className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Email</p><p className="mt-2 text-lg font-black">{user.email}</p></div>
                <div className="rounded-2xl border border-white/10 bg-stone-950/70 p-5"><p className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Số điện thoại</p><p className="mt-2 text-lg font-black">{user.phone || "Chưa cập nhật"}</p></div>
                <div className="rounded-2xl border border-white/10 bg-stone-950/70 p-5"><p className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Mã người dùng</p><p className="mt-2 text-lg font-black text-emerald-300">CUSTOMER-{user.id}</p></div>
              </div>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6"><p className="text-stone-500">Tổng chuyến</p><p className="mt-3 text-4xl font-black">{stats.total}</p></div>
            <div className="rounded-[2rem] border border-yellow-300/20 bg-yellow-300/10 p-6"><p className="text-yellow-300">Đang chờ</p><p className="mt-3 text-4xl font-black">{stats.pending}</p></div>
            <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-6"><p className="text-emerald-300">Đã xác nhận</p><p className="mt-3 text-4xl font-black">{stats.confirmed}</p></div>
          </section>

          <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">Lịch sử đặt phòng</p><h2 className="mt-3 text-3xl font-black">Chuyến đi của bạn</h2></div>
              <Link to="/places" className="rounded-full border border-white/15 px-6 py-3 text-sm font-black hover:bg-white/10">Đặt chuyến mới</Link>
            </div>

            {loading && <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-stone-950/60 p-8 text-center text-lg font-black text-emerald-200">Đang tải lịch sử đặt phòng...</div>}
            {error && <div className="mt-8 rounded-[1.5rem] border border-red-400/30 bg-red-400/10 p-5 text-red-200">{error}</div>}
            {!loading && !error && bookings.length === 0 && (
              <div className="mt-8 rounded-[1.5rem] border border-dashed border-white/15 bg-stone-950/60 p-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-emerald-400/10 text-4xl">🏕️</div>
                <h3 className="mt-6 text-2xl font-black">Bạn chưa có đơn đặt phòng nào</h3>
                <p className="mx-auto mt-4 max-w-2xl leading-7 text-stone-400">Hãy đặt một chuyến mới khi đang đăng nhập. Đơn đó sẽ được gắn với CUSTOMER-{user.id} và hiện tại đây.</p>
              </div>
            )}
            {!loading && !error && bookings.length > 0 && (
              <div className="mt-8 space-y-4">
                {bookings.map((booking) => (
                  <article key={booking.id} className="grid gap-5 rounded-[1.5rem] border border-white/10 bg-stone-950/70 p-5 md:grid-cols-[160px_1fr]">
                    <div className="h-36 overflow-hidden rounded-[1.2rem] bg-emerald-400/10">
                      {booking.placeImageUrl ? <img src={booking.placeImageUrl} alt={booking.placeName} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-4xl">🏕️</div>}
                    </div>
                    <div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div><p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">{booking.bookingCode}</p><h3 className="mt-2 text-2xl font-black">{booking.placeName || "Địa điểm CampVibe"}</h3><p className="mt-1 text-stone-400">{booking.placeLocation || "Đang cập nhật vị trí"}</p></div>
                        <span className={`inline-flex rounded-full border px-4 py-2 text-xs font-black ${getStatusClass(booking.status)}`}>{getStatusLabel(booking.status)}</span>
                      </div>
                      <div className="mt-5 grid gap-3 text-sm text-stone-400 sm:grid-cols-3">
                        <div><p className="text-stone-500">Lịch nhận</p><p className="mt-1 font-black text-white">{getTripDateLabel(booking)}</p></div>
                        <div><p className="text-stone-500">Số khách</p><p className="mt-1 font-black text-white">{booking.guestCount} khách</p></div>
                        <div>
                          <p className="text-stone-500">Tổng tiền</p>
                          <p className="mt-1 font-black text-emerald-300">{formatMoney(booking.totalAmount)}</p>
                          <div className="mt-2">
                            <PaymentBadge status={booking.paymentStatus} method={booking.paymentMethod} />
                            <p className="mt-2 text-xs text-stone-500">{getMethodLabel(booking.paymentMethod)}</p>
                          </div>
                        </div>
                      </div>
                      {booking.transactionCode && (
                        <p className="mt-4 text-xs font-bold text-stone-500">
                          Mã giao dịch: <span className="text-stone-300">{booking.transactionCode}</span>
                        </p>
                      )}

                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link to={`/payment/${booking.id}`} className={getPaymentActionClass(booking)}>
                          {getPaymentActionLabel(booking)}
                        </Link>
                        <Link to={`/invoice/${booking.id}`} className="camp-btn camp-btn-ghost px-5 py-3 text-xs">
                          Biên nhận
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
                <ContentBoost variant="account" />
      </main>
    </div>
  )
}

export default AccountPage