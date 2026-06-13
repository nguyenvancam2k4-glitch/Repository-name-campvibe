import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  getAdminSession,
  getCustomerSession,
  isAdminLoggedIn,
  isCustomerLoggedIn,
  logoutAdmin,
  logoutCustomer,
} from "../services/authService"

function getFirstName(fullName) {
  if (!fullName) return "Tài khoản"
  return fullName.trim().split(" ").slice(-1)[0] || fullName
}

function AuthHeaderActions({ mode = "user" }) {
  const navigate = useNavigate()
  const menuRef = useRef(null)

  const [open, setOpen] = useState(false)
  const [customerSession, setCustomerSession] = useState(getCustomerSession())
  const [adminSession, setAdminSession] = useState(getAdminSession())

  useEffect(() => {
    function syncSession() {
      setCustomerSession(getCustomerSession())
      setAdminSession(getAdminSession())
    }

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    syncSession()
    window.addEventListener("storage", syncSession)
    window.addEventListener("campvibe-auth-change", syncSession)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("storage", syncSession)
      window.removeEventListener("campvibe-auth-change", syncSession)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (mode === "admin") {
    const admin = adminSession?.user

    if (!isAdminLoggedIn() || !admin) {
      return (
        <div className="flex items-center gap-2">
          <Link to="/admin-login" className="camp-btn camp-btn-admin px-5 py-3 text-sm">
            Đăng nhập Admin
          </Link>
          <Link to="/" className="camp-btn camp-btn-ghost px-5 py-3 text-sm">
            Về website
          </Link>
        </div>
      )
    }

    return (
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="camp-btn camp-btn-admin px-5 py-3 text-sm"
        >
          Admin ▾
        </button>

        {open && (
          <div className="absolute right-0 top-14 z-[80] w-72 overflow-hidden rounded-3xl border border-white/10 bg-stone-950/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="border-b border-white/10 px-4 py-4">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-300">Quản trị viên</p>
              <p className="mt-2 font-black text-white">{admin.email || "admin@campvibe.vn"}</p>
            </div>

            <div className="grid gap-2 py-3">
              <Link onClick={() => setOpen(false)} to="/admin/dashboard" className="rounded-2xl px-4 py-3 font-bold text-stone-300 transition hover:bg-white/10 hover:text-emerald-300">
                Dashboard
              </Link>
              <Link onClick={() => setOpen(false)} to="/admin" className="rounded-2xl px-4 py-3 font-bold text-stone-300 transition hover:bg-white/10 hover:text-emerald-300">
                Quản lý đơn đặt phòng
              </Link>
              <Link onClick={() => setOpen(false)} to="/admin/contacts" className="rounded-2xl px-4 py-3 font-bold text-stone-300 transition hover:bg-white/10 hover:text-emerald-300">
                Quản lý liên hệ
              </Link>
              <Link onClick={() => setOpen(false)} to="/" className="rounded-2xl px-4 py-3 font-bold text-stone-300 transition hover:bg-white/10 hover:text-emerald-300">
                Về website
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                logoutAdmin()
                window.dispatchEvent(new Event("campvibe-auth-change"))
                setOpen(false)
                navigate("/admin-login")
              }}
              className="camp-btn camp-btn-danger w-full px-5 py-3 text-sm"
            >
              Đăng xuất Admin
            </button>
          </div>
        )}
      </div>
    )
  }

  const customer = customerSession?.user

  if (!isCustomerLoggedIn() || !customer) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/login" className="camp-btn camp-btn-ghost px-5 py-3 text-sm">
          Đăng nhập
        </Link>
        <Link to="/register" className="camp-btn camp-btn-primary px-5 py-3 text-sm">
          Đăng ký
        </Link>
      </div>
    )
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="camp-btn camp-btn-secondary px-5 py-3 text-sm"
      >
        {getFirstName(customer.fullName)} ▾
      </button>

      {open && (
        <div className="absolute right-0 top-14 z-[80] w-80 overflow-hidden rounded-3xl border border-white/10 bg-stone-950/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-4 border-b border-white/10 px-4 py-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-xl font-black text-stone-950">
              {(customer.fullName || "CV")
                .split(" ")
                .filter(Boolean)
                .slice(-2)
                .map((item) => item[0])
                .join("")
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate font-black text-white">{customer.fullName}</p>
              <p className="truncate text-sm text-stone-500">{customer.email}</p>
            </div>
          </div>

          <div className="grid gap-2 py-3">
            <Link onClick={() => setOpen(false)} to="/account" className="rounded-2xl px-4 py-3 font-bold text-stone-300 transition hover:bg-white/10 hover:text-emerald-300">
              Tài khoản của tôi
            </Link>
            <Link onClick={() => setOpen(false)} to="/favorites" className="rounded-2xl px-4 py-3 font-bold text-stone-300 transition hover:bg-white/10 hover:text-emerald-300">
              Địa điểm yêu thích
            </Link>
            <Link onClick={() => setOpen(false)} to="/places" className="rounded-2xl px-4 py-3 font-bold text-stone-300 transition hover:bg-white/10 hover:text-emerald-300">
              Đặt chuyến mới
            </Link>
            <Link onClick={() => setOpen(false)} to="/contact" className="rounded-2xl px-4 py-3 font-bold text-stone-300 transition hover:bg-white/10 hover:text-emerald-300">
              Liên hệ tư vấn
            </Link>
          </div>

          <button
            type="button"
            onClick={() => {
              logoutCustomer()
              window.dispatchEvent(new Event("campvibe-auth-change"))
              setOpen(false)
              navigate("/login")
            }}
            className="camp-btn camp-btn-danger w-full px-5 py-3 text-sm"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthHeaderActions
