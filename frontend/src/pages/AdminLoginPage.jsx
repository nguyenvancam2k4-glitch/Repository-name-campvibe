import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginAdmin } from "../services/authService"

function AdminLoginPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "admin@campvibe.vn",
    password: "campvibe2026",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage("")

    try {
      setIsSubmitting(true)
      await loginAdmin(formData.email, formData.password)
      navigate("/admin")
    } catch (error) {
      setErrorMessage(error.message || "Đăng nhập thất bại")
    } finally {
      setIsSubmitting(false)
    }
  }

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

          <Link
            to="/"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-black transition hover:bg-white/10"
          >
            Về trang chủ
          </Link>
        </div>
      </header>

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <section>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
              Khu vực quản trị
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-[3.9rem]">
              Đăng nhập để quản lý hệ thống CampVibe
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-400">
              Trang đăng nhập admin hiện đã kiểm tra tài khoản thật trong CampVibe. Chỉ tài khoản có role
              admin mới được vào bảng điều khiển.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                ["🔐", "Bảo vệ trang admin"],
                ["🧾", "Quản lý đơn đặt phòng"],
                ["🗄️", "Kiểm tra quyền truy cập"],
              ].map(([icon, title]) => (
                <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-950/70 text-2xl">
                    {icon}
                  </div>
                  <p className="mt-5 font-black">{title}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="camp-card rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-9">
            <div className="mb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400 text-3xl shadow-lg shadow-emerald-400/20">
                👤
              </div>
              <h2 className="mt-6 text-4xl font-black">Đăng nhập Admin</h2>
              <p className="mt-3 text-stone-400">
                Sử dụng tài khoản quản trị dưới đây để vào bảng điều khiển.
              </p>
            </div>

            <div className="mb-8 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                Tài khoản quản trị
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-stone-400">Tên đăng nhập</span>
                  <span className="font-black">admin@campvibe.vn</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-stone-400">Mật khẩu</span>
                  <span className="font-black">campvibe2026</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="font-bold text-stone-300">Email quản trị</span>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none focus:border-emerald-300"
                />
              </label>

              <label className="block">
                <span className="font-bold text-stone-300">Mật khẩu</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none focus:border-emerald-300"
                />
              </label>

              {errorMessage && (
                <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-bold text-red-200">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-emerald-400 px-8 py-5 text-base font-black text-stone-950 shadow-lg shadow-emerald-400/20 transition hover:-translate-y-1 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Đang kiểm tra..." : "Đăng nhập vào Admin"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

export default AdminLoginPage
