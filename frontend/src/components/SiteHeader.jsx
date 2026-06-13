import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

const navItems = [
  { to: "/", label: "Trang chủ" },
  { to: "/places", label: "Địa điểm" },
  { to: "/experiences", label: "Trải nghiệm" },
  { to: "/blog", label: "Blog" },
  { to: "/compare", label: "So sánh" },
  { to: "/contact", label: "Liên hệ" },
  { to: "/account", label: "Tài khoản" },
]

function SiteHeader({ actionLabel = "Đặt ngay", actionTo = "/places" }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-stone-950/90 shadow-2xl shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-xl font-black text-stone-950 shadow-lg shadow-emerald-400/20">
            C
          </div>
          <span className="truncate text-2xl font-black tracking-tight text-white">CampVibe</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold text-stone-300 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "text-emerald-300" : "transition hover:text-emerald-300"
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to={actionTo}
            className="hidden rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-stone-950 shadow-lg shadow-emerald-400/20 transition hover:bg-emerald-300 sm:inline-flex"
          >
            {actionLabel}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-full border border-white/15 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10 lg:hidden"
            aria-label="Mở menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-stone-950/95 px-4 py-4 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2 text-sm font-bold text-stone-300 sm:grid-cols-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 transition ${
                    isActive ? "bg-emerald-400 text-stone-950" : "bg-white/[0.06] hover:bg-white/10"
                  }`
                }
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to={actionTo}
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-emerald-400 px-4 py-3 text-center font-black text-stone-950 sm:hidden"
            >
              {actionLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default SiteHeader
