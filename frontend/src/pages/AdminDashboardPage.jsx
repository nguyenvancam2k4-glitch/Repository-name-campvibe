import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAdminDashboard } from "../services/dashboardService"
import { getAdminSession, isAdminLoggedIn, logoutAdmin } from "../services/authService"
import CampHeader from "../components/CampHeader"

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")}đ`
}

function formatDate(value) {
  if (!value) return "Chưa có"
  try {
    return new Date(value).toLocaleString("vi-VN")
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
    new: "Mới",
    contacted: "Đã liên hệ",
    resolved: "Đã xử lý",
  }[status] || status
}

function AdminDashboardPage() {
  const navigate = useNavigate()
  const adminSession = getAdminSession()

  const [dashboard, setDashboard] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  async function loadDashboard() {
    try {
      setIsLoading(true)
      setErrorMessage("")
      setDashboard(await getAdminDashboard())
    } catch (error) {
      setErrorMessage(error.message || "Không thể tải dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate("/admin-login")
      return
    }

    loadDashboard()
  }, [navigate])

  const mainStats = useMemo(() => {
    if (!dashboard) return []

    return [
      {
        label: "Tổng đơn",
        value: dashboard.bookings.total,
        tone: "border-white/10 bg-white/[0.06] text-white",
        note: `${dashboard.bookings.pending} đơn đang chờ`,
      },
      {
        label: "Doanh thu",
        value: formatMoney(dashboard.bookings.revenue),
        tone: "border-emerald-300/20 bg-emerald-300/10 text-emerald-300",
        note: "Không tính đơn đã hủy",
      },
      {
        label: "Liên hệ",
        value: dashboard.contacts.total,
        tone: "border-yellow-300/20 bg-yellow-300/10 text-yellow-300",
        note: `${dashboard.contacts.new} yêu cầu mới`,
      },
      {
        label: "Khách hàng",
        value: dashboard.content.customers,
        tone: "border-sky-300/20 bg-sky-300/10 text-sky-300",
        note: "Tài khoản khách hàng",
      },
    ]
  }, [dashboard])

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader mode="admin" />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="py-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
              Tổng quan vận hành
            </p>
            <h1 className="camp-page-title max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Tổng quan vận hành CampVibe
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-400">
              Theo dõi tổng quan đơn đặt phòng, yêu cầu tư vấn, khách hàng và nội dung vận hành của CampVibe.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={loadDashboard}
                className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-stone-950 transition hover:bg-emerald-300"
              >
                Làm mới số liệu
              </button>
              <Link
                to="/admin/content"
                className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-6 py-3 text-sm font-black text-emerald-200 transition hover:bg-emerald-300 hover:text-stone-950"
              >
                Quản trị nội dung
              </Link>
              <Link
                to="/admin"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-black transition hover:bg-white/10"
              >
                Quản lý đơn
              </Link>
              <Link
                to="/admin/contacts"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-black transition hover:bg-white/10"
              >
                Quản lý liên hệ
              </Link>
            </div>
          </section>

          {isLoading && (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-10 text-center text-xl font-black text-emerald-200">
              Đang tải dashboard từ CampVibe...
            </div>
          )}

          {errorMessage && (
            <div className="rounded-[2rem] border border-red-400/30 bg-red-400/10 p-6 text-red-200">
              {errorMessage}
            </div>
          )}

          {!isLoading && !errorMessage && dashboard && (
            <>
              <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {mainStats.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-[2rem] border p-6 shadow-xl shadow-black/10 backdrop-blur ${item.tone}`}
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.25em] opacity-80">{item.label}</p>
                    <p className="mt-4 text-4xl font-black xl:text-4xl">{item.value}</p>
                    <p className="mt-3 text-sm text-stone-400">{item.note}</p>
                  </div>
                ))}
              </section>

              <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-stone-500">Địa điểm</p>
                  <p className="mt-4 text-4xl font-black">{dashboard.content.places}</p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-stone-500">Trải nghiệm</p>
                  <p className="mt-4 text-4xl font-black">{dashboard.content.experiences}</p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-stone-500">Bài blog</p>
                  <p className="mt-4 text-4xl font-black">{dashboard.content.blogPosts}</p>
                </div>

                <div className="rounded-[2rem] border border-red-300/20 bg-red-300/10 p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-300">Đơn đã hủy</p>
                  <p className="mt-4 text-4xl font-black">{dashboard.bookings.cancelled}</p>
                </div>
              </section>

              <section className="mt-10 grid gap-8 xl:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">Đặt phòng mới</p>
                      <h2 className="mt-2 text-3xl font-black">5 đơn gần nhất</h2>
                    </div>
                    <Link to="/admin" className="rounded-full border border-white/15 px-5 py-3 text-sm font-black hover:bg-white/10">
                      Xem tất cả
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {dashboard.latestBookings.length === 0 && (
                      <p className="rounded-2xl border border-white/10 bg-stone-950/60 p-5 text-stone-400">Chưa có đơn đặt phòng.</p>
                    )}

                    {dashboard.latestBookings.map((booking) => (
                      <article key={booking.id} className="rounded-2xl border border-white/10 bg-stone-950/70 p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-sm font-bold text-emerald-300">{booking.bookingCode}</p>
                            <h3 className="mt-2 text-xl font-black">{booking.customerName}</h3>
                            <p className="mt-1 text-sm text-stone-500">{booking.placeName || "Chưa có địa điểm"} · {booking.customerPhone}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="font-black text-white">{formatMoney(booking.totalAmount)}</p>
                            <p className="mt-1 text-sm text-stone-500">{getStatusLabel(booking.status)}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">Liên hệ mới</p>
                      <h2 className="mt-2 text-3xl font-black">5 yêu cầu gần nhất</h2>
                    </div>
                    <Link to="/admin/contacts" className="rounded-full border border-white/15 px-5 py-3 text-sm font-black hover:bg-white/10">
                      Xem tất cả
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {dashboard.latestContacts.length === 0 && (
                      <p className="rounded-2xl border border-white/10 bg-stone-950/60 p-5 text-stone-400">Chưa có liên hệ.</p>
                    )}

                    {dashboard.latestContacts.map((contact) => (
                      <article key={contact.id} className="rounded-2xl border border-white/10 bg-stone-950/70 p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-sm font-bold text-emerald-300">CONTACT-{contact.id}</p>
                            <h3 className="mt-2 text-xl font-black">{contact.fullName}</h3>
                            <p className="mt-1 text-sm text-stone-500">{contact.subject || "Tư vấn CampVibe"} · {contact.phone}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="font-black text-white">{getStatusLabel(contact.status)}</p>
                            <p className="mt-1 text-sm text-stone-500">{formatDate(contact.createdAt)}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
</main>
    </div>
  )
}

export default AdminDashboardPage