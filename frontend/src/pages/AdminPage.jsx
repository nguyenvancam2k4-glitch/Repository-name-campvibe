import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getBookings, updateBookingStatus } from "../services/bookingService"
import { getAdminSession, isAdminLoggedIn, logoutAdmin } from "../services/authService"
import CampHeader from "../components/CampHeader"
import { useToast } from "../components/ToastProvider"
import PaymentBadge, { getMethodLabel } from "../components/PaymentBadge"

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")}đ`
}

function formatDate(value) {
  if (!value) return "Chưa chọn"

  try {
    return new Date(value).toLocaleDateString("vi-VN")
  } catch {
    return value
  }
}

function getStatusLabel(status) {
  return {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    completed: "Đã hoàn tất",
    cancelled: "Đã hủy",
  }[status] || status
}

function getStatusClass(status) {
  return {
    pending: "border-yellow-300/30 bg-yellow-300/10 text-yellow-300",
    confirmed: "border-emerald-300/30 bg-emerald-300/10 text-emerald-300",
    completed: "border-sky-300/30 bg-sky-300/10 text-sky-300",
    cancelled: "border-red-300/30 bg-red-300/10 text-red-300",
  }[status] || "border-white/20 bg-white/10 text-white"
}

function getBookingActionHint(status) {
  return {
    completed: "Đơn đã hoàn tất",
    cancelled: "Đơn đã hủy",
  }[status] || ""
}

function AdminPage() {
  const toast = useToast()
  const navigate = useNavigate()
  const adminSession = getAdminSession()

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  async function loadBookings() {
    try {
      setIsLoading(true)
      setErrorMessage("")
      const data = await getBookings()
      setBookings(data)
    } catch (error) {
      setErrorMessage(error.message || "Không thể tải danh sách đặt phòng")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate("/admin-login")
      return
    }

    loadBookings()
  }, [navigate])

  async function handleUpdateStatus(id, status) {
    const currentBooking = bookings.find((booking) => String(booking.id) === String(id))
    if (currentBooking?.status === status) {
      toast.info("Không cần cập nhật", "Đơn đang ở trạng thái này.")
      return
    }

    if (currentBooking?.status === "completed" || currentBooking?.status === "cancelled") {
      toast.info("Không thể thay đổi", "Đơn đã kết thúc nên không cần thao tác thêm.")
      return
    }

    try {
      setUpdatingId(id)
      setErrorMessage("")
      setSuccessMessage("")

      const updatedBooking = await updateBookingStatus(id, status)

      setBookings((prev) =>
        prev.map((booking) =>
          String(booking.id) === String(id)
            ? {
                ...booking,
                ...updatedBooking,
                placeName: booking.placeName,
                placeLocation: booking.placeLocation,
              }
            : booking
        )
      )

      setSuccessMessage(`Đã chuyển đơn ${updatedBooking.bookingCode || id} sang trạng thái "${getStatusLabel(status)}".`)
      toast.success("Cập nhật thành công", "Trạng thái đơn đặt phòng đã được cập nhật.")
    } catch (error) {
      toast.error("Cập nhật chưa thành công", "Vui lòng thử lại sau.")
      setErrorMessage(error.message || "Không thể cập nhật trạng thái đơn")
    } finally {
      setUpdatingId("")
    }
  }

  const stats = useMemo(() => {
    const total = bookings.length
    const pending = bookings.filter((item) => item.status === "pending").length
    const confirmed = bookings.filter((item) => item.status === "confirmed").length
    const completed = bookings.filter((item) => item.status === "completed").length
    const cancelled = bookings.filter((item) => item.status === "cancelled").length
    const revenue = bookings
      .filter((item) => item.status !== "cancelled")
      .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0)

    return { total, pending, confirmed, completed, cancelled, revenue }
  }, [bookings])

  return (
    <div className="camp-page min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader mode="admin" />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="py-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
              Bảng điều khiển quản trị
            </p>
            <h1 className="camp-page-title max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Quản lý yêu cầu đặt phòng CampVibe
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-400">
              Theo dõi đơn đặt phòng, trạng thái xử lý và thông tin thanh toán một cách gọn gàng, dễ thao tác.
            </p>
          </section>

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/10 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-stone-500">Tổng đơn</p>
              <p className="mt-4 text-4xl font-black">{stats.total}</p>
            </div>

            <div className="rounded-[2rem] border border-yellow-300/20 bg-yellow-300/10 p-6 shadow-xl shadow-black/10 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">Chờ xác nhận</p>
              <p className="mt-4 text-4xl font-black">{stats.pending}</p>
            </div>

            <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-6 shadow-xl shadow-black/10 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">Đã xác nhận</p>
              <p className="mt-4 text-4xl font-black">{stats.confirmed}</p>
            </div>

            <div className="rounded-[2rem] border border-sky-300/20 bg-sky-300/10 p-6 shadow-xl shadow-black/10 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-sky-300">Hoàn tất</p>
              <p className="mt-4 text-4xl font-black">{stats.completed}</p>
            </div>

            <div className="rounded-[2rem] border border-red-300/20 bg-red-300/10 p-6 shadow-xl shadow-black/10 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-300">Đã hủy</p>
              <p className="mt-4 text-4xl font-black">{stats.cancelled}</p>
            </div>
          </section>

          <section className="mt-10 grid gap-8 xl:grid-cols-[1fr_0.36fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur md:p-7">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                    Danh sách đơn
                  </p>
                  <h2 className="mt-2 text-3xl font-black">Quản lý yêu cầu đặt phòng</h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={loadBookings}
                    className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-6 py-3 text-sm font-black text-emerald-200 transition hover:bg-emerald-300 hover:text-stone-950"
                  >
                    Làm mới
                  </button>
</div>
              </div>

              {successMessage && (
                <div className="mb-5 rounded-[1.5rem] border border-emerald-300/30 bg-emerald-300/10 p-5 text-emerald-200">
                  {successMessage}
                </div>
              )}

              {isLoading && (
                <div className="rounded-[1.5rem] border border-white/10 bg-stone-950/60 p-8 text-center text-lg font-black text-emerald-200">
                  Đang tải danh sách đơn đặt phòng...
                </div>
              )}

              {errorMessage && (
                <div className="rounded-[1.5rem] border border-red-400/30 bg-red-400/10 p-5 text-red-200">
                  {errorMessage}
                </div>
              )}

              {!isLoading && !errorMessage && bookings.length === 0 && (
                <div className="rounded-[1.5rem] border border-white/10 bg-stone-950/60 p-8 text-center text-stone-400">
                  Chưa có đơn đặt phòng nào.
                </div>
              )}

              {!isLoading && !errorMessage && bookings.length > 0 && (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <article
                      key={booking.id}
                      className="grid gap-5 rounded-[1.5rem] border border-white/10 bg-stone-950/70 p-5 transition hover:border-emerald-300/30 xl:grid-cols-[0.75fr_1fr_1fr_0.75fr_0.9fr_1.05fr]"
                    >
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Mã đơn</p>
                        <p className="mt-2 break-words text-lg font-black text-emerald-300">
                          {booking.bookingCode}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Khách hàng</p>
                        <p className="mt-2 font-black">{booking.customerName}</p>
                        <p className="mt-1 text-sm text-stone-500">{booking.customerPhone}</p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Địa điểm</p>
                        <p className="mt-2 font-black">{booking.placeName || `Địa điểm #${booking.placeId}`}</p>
                        <p className="mt-1 text-sm text-stone-500">{booking.placeLocation || "Chưa có vị trí"}</p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Ngày</p>
                        <p className="mt-2 font-black">{formatDate(booking.checkInDate)}</p>
                        <p className="mt-1 text-sm text-stone-500">{booking.guestCount} khách</p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Trạng thái</p>
                        <span className={`mt-2 inline-flex rounded-full border px-3 py-2 text-xs font-black ${getStatusClass(booking.status)}`}>
                          {getStatusLabel(booking.status)}
                        </span>
                        <p className="mt-3 text-sm font-black text-white">{formatMoney(booking.totalAmount)}</p>
                        <div className="mt-3 space-y-2">
                          <PaymentBadge status={booking.paymentStatus} method={booking.paymentMethod} />
                          <p className="text-xs text-stone-500">{getMethodLabel(booking.paymentMethod)}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Thao tác</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {booking.status === "pending" && (
                            <>
                              <button
                                type="button"
                                disabled={updatingId === booking.id}
                                onClick={() => handleUpdateStatus(booking.id, "confirmed")}
                                className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-xs font-black text-emerald-200 transition hover:bg-emerald-300 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Xác nhận
                              </button>
                              <button
                                type="button"
                                disabled={updatingId === booking.id}
                                onClick={() => handleUpdateStatus(booking.id, "cancelled")}
                                className="rounded-full border border-red-300/30 bg-red-300/10 px-3 py-2 text-xs font-black text-red-200 transition hover:bg-red-300 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Hủy đơn
                              </button>
                            </>
                          )}

                          {booking.status === "confirmed" && (
                            <>
                              <button
                                type="button"
                                disabled={updatingId === booking.id}
                                onClick={() => handleUpdateStatus(booking.id, "completed")}
                                className="rounded-full border border-sky-300/30 bg-sky-300/10 px-3 py-2 text-xs font-black text-sky-200 transition hover:bg-sky-300 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Hoàn tất
                              </button>
                              <button
                                type="button"
                                disabled={updatingId === booking.id}
                                onClick={() => handleUpdateStatus(booking.id, "cancelled")}
                                className="rounded-full border border-red-300/30 bg-red-300/10 px-3 py-2 text-xs font-black text-red-200 transition hover:bg-red-300 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Hủy đơn
                              </button>
                            </>
                          )}

                          {getBookingActionHint(booking.status) && (
                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-black text-stone-400">
                              {getBookingActionHint(booking.status)}
                            </span>
                          )}
                        </div>

                        {updatingId === booking.id && (
                          <p className="mt-2 text-xs text-stone-500">Đang cập nhật...</p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                  Tỷ lệ đơn đặt
                </p>
                <h2 className="mt-4 text-3xl font-black">Tổng quan</h2>

                <div className="mt-6 space-y-5">
                  {[
                    ["Đã xác nhận", stats.confirmed, "bg-emerald-400"],
                    ["Chờ xác nhận", stats.pending, "bg-yellow-300"],
                    ["Hoàn tất", stats.completed, "bg-sky-300"],
                    ["Đã hủy", stats.cancelled, "bg-red-300"],
                  ].map(([label, value, color]) => (
                    <div key={label}>
                      <div className="mb-2 flex justify-between text-sm font-bold">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${color}`}
                          style={{ width: `${stats.total ? (value / stats.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-sky-300/20 bg-sky-300/10 p-7 shadow-2xl shadow-black/20 backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-300">
                  Doanh thu trải nghiệm
                </p>
                <h2 className="mt-4 text-4xl font-black">{formatMoney(stats.revenue)}</h2>
                <p className="mt-4 text-sm leading-6 text-stone-300">
                  Tổng giá trị không tính các đơn đã hủy. Đây là thống kê lấy từ dữ liệu đơn trong CampVibe.
                </p>
              </div>

              <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-7 shadow-2xl shadow-black/20 backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                  Gợi ý quản trị
                </p>
                <h2 className="mt-4 text-3xl font-black">Việc cần làm</h2>
                <ul className="mt-5 space-y-4 text-stone-300">
                  <li>✓ Xác nhận các đơn đang chờ</li>
                  <li>✓ Hoàn tất đơn sau khi khách sử dụng dịch vụ</li>
                  <li>✓ Hủy đơn nếu khách đổi lịch hoặc không xác nhận</li>
                  <li>✓ Bước tiếp theo: đăng nhập admin thật</li>
                </ul>
              </div>
            </aside>
          </section>
        </div>
</main>
    </div>
  )
}

export default AdminPage