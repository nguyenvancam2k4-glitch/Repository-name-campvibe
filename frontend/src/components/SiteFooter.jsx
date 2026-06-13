import { Link, useLocation } from "react-router-dom"

function SiteFooter() {
  const location = useLocation()
  const path = location.pathname

  const hideFooter =
    path.startsWith("/admin") ||
    path === "/admin-login" ||
    path === "/login" ||
    path === "/register" ||
    path.startsWith("/booking-success")

  if (hideFooter) return null

  return (
    <footer className="border-t border-white/10 bg-stone-950 px-4 py-12 text-white sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-xl font-black text-stone-950 shadow-lg shadow-emerald-400/20">C</div>
            <span className="text-3xl font-black tracking-tight">CampVibe</span>
          </Link>

          <p className="mt-5 max-w-xl leading-8 text-stone-400">
            CampVibe giúp bạn tìm kiếm, so sánh và đặt lịch cho những kỳ nghỉ glamping,
            camping và nghỉ dưỡng ngoài trời theo cách dễ dàng, hiện đại và đầy cảm hứng.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-black text-emerald-300">Glamping</span>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-black text-emerald-300">Camping</span>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-black text-emerald-300">Nghỉ dưỡng</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">Khám phá</h3>
          <div className="mt-5 grid gap-3 text-stone-400">
            <Link to="/places" className="transition hover:text-emerald-300">Địa điểm nổi bật</Link>
            <Link to="/experiences" className="transition hover:text-emerald-300">Trải nghiệm ngoài trời</Link>
            <Link to="/blog" className="transition hover:text-emerald-300">Cẩm nang du lịch</Link>
            <Link to="/compare" className="transition hover:text-emerald-300">So sánh địa điểm</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">Khách hàng</h3>
          <div className="mt-5 grid gap-3 text-stone-400">
            <Link to="/register" className="transition hover:text-emerald-300">Tạo tài khoản</Link>
            <Link to="/login" className="transition hover:text-emerald-300">Đăng nhập</Link>
            <Link to="/account" className="transition hover:text-emerald-300">Lịch sử đặt phòng</Link>
            <Link to="/favorites" className="transition hover:text-emerald-300">Danh sách yêu thích</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">Hỗ trợ</h3>
          <div className="mt-5 grid gap-3 text-stone-400">
            <Link to="/contact" className="transition hover:text-emerald-300">Nhận tư vấn chuyến đi</Link>
            <span>Hotline: 1900 2026</span>
            <span>Email: hello@campvibe.vn</span>
            <span>Hỗ trợ đặt lịch mỗi ngày</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 CampVibe. All rights reserved.</p>
        <p>Khơi nguồn cảm hứng cho những chuyến đi gần thiên nhiên.</p>
      </div>
    </footer>
  )
}

export default SiteFooter
