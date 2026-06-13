import { createContext, useContext, useMemo, useState } from "react"

const ToastContext = createContext(null)

function ToastItem({ toast, onClose }) {
  const typeClass = {
    success: "border-emerald-300/30 bg-emerald-300/12 text-emerald-100",
    error: "border-red-300/30 bg-red-400/12 text-red-100",
    warning: "border-yellow-300/30 bg-yellow-300/12 text-yellow-100",
    info: "border-sky-300/30 bg-sky-300/12 text-sky-100",
  }

  const icon = {
    success: "✓",
    error: "!",
    warning: "!",
    info: "i",
  }

  return (
    <div
      className={`camp-toast pointer-events-auto flex w-[min(420px,calc(100vw-2rem))] items-start gap-4 rounded-3xl border p-4 shadow-2xl shadow-black/35 backdrop-blur-xl ${
        typeClass[toast.type] || typeClass.info
      }`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-lg font-black">
        {icon[toast.type] || "i"}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-black text-white">{toast.title}</h3>
        {toast.message && <p className="mt-1 leading-6 text-stone-200/85">{toast.message}</p>}
      </div>

      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
        aria-label="Đóng thông báo"
      >
        ×
      </button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  function closeToast(id) {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }

  function showToast({ type = "info", title = "Thông báo", message = "", duration = 3200 }) {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    const toast = { id, type, title, message }

    setToasts((current) => [toast, ...current].slice(0, 4))

    if (duration > 0) {
      window.setTimeout(() => closeToast(id), duration)
    }

    return id
  }

  const value = useMemo(
    () => ({
      showToast,
      success: (title, message) => showToast({ type: "success", title, message }),
      error: (title, message) => showToast({ type: "error", title, message, duration: 4600 }),
      warning: (title, message) => showToast({ type: "warning", title, message }),
      info: (title, message) => showToast({ type: "info", title, message }),
    }),
    []
  )

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-4 top-24 z-[120] grid gap-3">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={closeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    return {
      showToast: () => null,
      success: () => null,
      error: () => null,
      warning: () => null,
      info: () => null,
    }
  }

  return context
}
