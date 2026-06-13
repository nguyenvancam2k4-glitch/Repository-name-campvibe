import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getBookingById } from "../services/bookingService"

function BookingSuccessPage() {
  const { id } = useParams()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    async function loadBooking() {
      try {
        const data = await getBookingById(id)
        setBooking(data)
      } catch {
        const savedBooking = JSON.parse(localStorage.getItem("campvibe_last_booking") || "null")
        setBooking(savedBooking)
      }
    }

    loadBooking()
  }, [id])

  return (
    <div className="camp-page min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-stone-950/85 shadow-2xl shadow-black/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="camp-shine flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400 text-xl font-black text-stone-950 shadow-lg shadow-emerald-400/20">
              C
            </div>
            <span className="text-2xl font-black tracking-tight">CampVibe</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-stone-300 md:flex">
            <Link to="/" className="transition hover:text-emerald-300">Trang chủ</Link>
            <Link to="/places" className="transition hover:text-emerald-300">Địa điểm</Link>
            <Link to="/experiences" className="transition hover:text-emerald-300">Trải nghiệm</Link>
            <Link to="/blog" className="transition hover:text-emerald-300">Blog</Link>
            <Link to="/contact" className="transition hover:text-emerald-300">Liên hệ</Link>
          </nav>

          <Link to="/places" className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-stone-950">
            Xem địa điểm
          </Link>
        </div>
      </header>

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <section className="grid overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/30 backdrop-blur lg:grid-cols-[0.85fr_1.15fr]">
            <div className="min-h-[420px] bg-stone-900">
              {booking?.imageUrl ? (
                <img src={booking.imageUrl} alt={booking.placeName || "CampVibe"} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full min-h-[420px] items-center justify-center bg-emerald-400/10 text-8xl">✓</div>
              )}
            </div>

            <div className="p-8 md:p-12">
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-emerald-400 text-5xl text-stone-950 shadow-lg shadow-emerald-400/20">
                ✓
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                Gửi yêu cầu thành công
              </p>

              <h1 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                CampVibe đã nhận yêu cầu đặt chỗ của bạn
              </h1>

              <p className="mt-6 text-lg leading-8 text-stone-400">
                Yêu cầu đặt phòng đang ở trạng thái chờ xác nhận. Thông tin đặt phòng đã được ghi nhận. Bạn có thể theo dõi trạng thái trong tài khoản cá nhân.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-stone-950/70 p-5">
                  <p className="text-sm text-stone-500">Mã đặt chỗ</p>
                  <p className="mt-2 text-2xl font-black text-emerald-300">
                    {booking?.bookingCode || "Đang cập nhật"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-stone-950/70 p-5">
                  <p className="text-sm text-stone-500">Trạng thái</p>
                  <p className="mt-2 text-2xl font-black text-yellow-300">
                    {booking?.status === "pending" ? "Đang chờ xác nhận" : booking?.status || "Đang chờ xác nhận"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-stone-950/70 p-5 sm:col-span-2">
                  <p className="text-sm text-stone-500">Địa điểm</p>
                  <p className="mt-2 text-xl font-black">
                    {booking?.placeName || "CampVibe sẽ xác nhận địa điểm"}
                  </p>
                  {booking?.placeLocation && (
                    <p className="mt-1 text-emerald-200">{booking.placeLocation}</p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/places" className="rounded-full bg-emerald-400 px-6 py-4 text-center font-black text-stone-950">
                  Xem thêm địa điểm
                </Link>
                
                <Link to={`/payment/${id}`} className="camp-btn camp-btn-primary px-7 py-4 text-sm">
                  Thanh toán ngay
                </Link>
                <Link to={`/invoice/${id}`} className="camp-btn camp-btn-secondary px-7 py-4 text-sm">
                  Xem biên nhận
                </Link>
                <Link to="/account" className="rounded-full border border-white/15 px-6 py-4 text-center font-black transition hover:bg-white/10">
                  Xem tài khoản
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default BookingSuccessPage
