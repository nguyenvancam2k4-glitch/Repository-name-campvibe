import { Link, NavLink } from "react-router-dom"
import AuthHeaderActions from "./AuthHeaderActions"

const publicNav = [
  { to: "/", label: "Trang chủ" },
  { to: "/places", label: "Địa điểm" },
  { to: "/experiences", label: "Trải nghiệm" },
  { to: "/blog", label: "Blog" },
  { to: "/compare", label: "So sánh" },
  { to: "/contact", label: "Liên hệ" },
]

const adminNav = [
  { to: "/admin/dashboard", label: "Tổng quan" },
  { to: "/admin", label: "Đơn đặt phòng" },
  { to: "/admin/contacts", label: "Liên hệ" },
  { to: "/", label: "Xem website" },
]

function CampHeader({ mode = "user" }) {
  const navItems = mode === "admin" ? adminNav : publicNav

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-stone-950/90 shadow-2xl shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-xl font-black text-stone-950 shadow-lg shadow-emerald-400/20">
            C
          </div>
          <span className="truncate text-2xl font-black tracking-tight text-white">CampVibe</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold text-stone-300 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/" || item.to === "/admin"}
              className={({ isActive }) =>
                isActive ? "text-emerald-300" : "transition hover:text-emerald-300"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <AuthHeaderActions mode={mode} />
      </div>
    </header>
  )
}

export default CampHeader
