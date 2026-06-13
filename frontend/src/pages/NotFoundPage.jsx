import { Link } from "react-router-dom"

const quickLinks = [
  {
    title: "Khám phá địa điểm",
    text: "Xem các khu glamping, camping nổi bật.",
    to: "/places",
    icon: "⛺",
  },
  {
    title: "Xem trải nghiệm",
    text: "Chọn BBQ, lửa trại, picnic hoặc săn mây.",
    to: "/experiences",
    icon: "🔥",
  },
  {
    title: "Đọc cẩm nang",
    text: "Tham khảo kinh nghiệm trước chuyến đi.",
    to: "/blog",
    icon: "📖",
  },
]

function NotFoundPage() {
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
            <Link to="/account" className="transition hover:text-emerald-300">Tài khoản</Link>
          </nav>

          <Link
            to="/places"
            className="camp-button camp-shine hidden rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-stone-950 shadow-lg shadow-emerald-400/20 transition hover:bg-emerald-300 sm:inline-flex"
          >
            Đặt ngay
          </Link>
        </div>
      </header>

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="grid min-h-[calc(100vh-8rem)] gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                Không tìm thấy trang
              </p>

              <h1 className="text-[8rem] font-black leading-none tracking-tight text-emerald-400 sm:text-[11rem] md:text-[14rem]">
                404
              </h1>

              <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Có vẻ bạn đã đi lạc khỏi khu cắm trại
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-400">
                Đường dẫn bạn nhập không tồn tại hoặc đã được thay đổi. Hãy quay về trang chủ,
                khám phá địa điểm hoặc liên hệ CampVibe để được hỗ trợ.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  to="/"
                  className="camp-button camp-shine rounded-full bg-emerald-400 px-8 py-4 text-center font-black text-stone-950 shadow-lg shadow-emerald-400/20 transition hover:-translate-y-1 hover:bg-emerald-300"
                >
                  Về trang chủ
                </Link>

                <Link
                  to="/places"
                  className="camp-button rounded-full border border-white/15 px-8 py-4 text-center font-black text-white transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Khám phá địa điểm
                </Link>
              </div>
            </div>

            <div className="camp-card camp-glow camp-float rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-stone-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,#34d39940,transparent_26%),radial-gradient(circle_at_70%_75%,#f59e0b35,transparent_30%)]"></div>

                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/20 bg-emerald-300/10 shadow-[0_0_100px_rgba(52,211,153,0.25)]"></div>
                <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] bg-emerald-400 text-5xl shadow-2xl shadow-emerald-400/20">
                  🧭
                </div>

                <div className="absolute bottom-7 left-7 right-7 rounded-[1.5rem] border border-white/10 bg-stone-950/70 p-6 backdrop-blur">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                    Gợi ý điều hướng
                  </p>
                  <h3 className="mt-3 text-3xl font-black">
                    Quay lại các khu vực chính của CampVibe
                  </h3>
                  <p className="mt-3 leading-7 text-stone-400">
                    Trang lỗi 404 giúp website trông chuyên nghiệp hơn khi người dùng nhập sai địa chỉ.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="camp-card camp-glow rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/10 backdrop-blur transition hover:border-emerald-300/30"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-950/70 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-stone-400">{item.text}</p>
              </Link>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}

export default NotFoundPage
