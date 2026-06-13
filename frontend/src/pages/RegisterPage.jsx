import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerCustomer } from "../services/authService"

function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Mật khẩu nhập lại không khớp.")
      return
    }

    try {
      setIsSubmitting(true)
      await registerCustomer(formData)
      navigate("/account")
    } catch (error) {
      setErrorMessage(error.message || "Không thể đăng ký tài khoản")
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

          <nav className="hidden items-center gap-8 text-sm font-medium text-stone-300 md:flex">
            <Link to="/" className="transition hover:text-emerald-300">Trang chủ</Link>
            <Link to="/places" className="transition hover:text-emerald-300">Địa điểm</Link>
            <Link to="/experiences" className="transition hover:text-emerald-300">Trải nghiệm</Link>
            <Link to="/blog" className="transition hover:text-emerald-300">Blog</Link>
            <Link to="/account" className="transition hover:text-emerald-300">Tài khoản</Link>
          </nav>

          <Link
            to="/login"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-black transition hover:bg-white/10"
          >
            Đã có tài khoản?
          </Link>
        </div>
      </header>

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <section>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
              Tài khoản khách hàng
            </p>
            <h1 className="camp-page-title text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-[3.9rem]">
              Tạo tài khoản để lưu chuyến đi CampVibe
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-400">
              Tạo tài khoản để lưu địa điểm yêu thích, theo dõi lịch sử đặt phòng và quản lý chuyến đi của bạn dễ dàng hơn.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                ["🧾", "Lưu lịch sử đặt phòng"],
                ["❤️", "Quản lý yêu thích"],
                ["🏕️", "Cá nhân hóa trải nghiệm"],
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
                ✨
              </div>
              <h2 className="mt-6 text-4xl font-black">Đăng ký tài khoản</h2>
              <p className="mt-3 text-stone-400">
                Điền thông tin để tạo tài khoản khách hàng trong hệ thống quản lý.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="font-bold text-stone-300">Họ và tên</span>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                />
              </label>

              <label className="block">
                <span className="font-bold text-stone-300">Email</span>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                />
              </label>

              <label className="block">
                <span className="font-bold text-stone-300">Số điện thoại</span>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="09xxxxxxxx"
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                />
              </label>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="font-bold text-stone-300">Mật khẩu</span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Tối thiểu 6 ký tự"
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                  />
                </label>

                <label className="block">
                  <span className="font-bold text-stone-300">Nhập lại mật khẩu</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                  />
                </label>
              </div>

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
                {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản CampVibe"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-500">
              Đã có tài khoản?{" "}
              <Link to="/login" className="font-black text-emerald-300 hover:text-emerald-200">
                Đăng nhập ngay
              </Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

export default RegisterPage
