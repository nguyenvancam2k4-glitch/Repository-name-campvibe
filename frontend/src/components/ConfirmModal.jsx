function ConfirmModal({
  open,
  title = "Xác nhận thao tác",
  message = "Bạn có chắc chắn muốn tiếp tục?",
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  variant = "primary",
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null

  const confirmClass =
    variant === "danger"
      ? "camp-btn camp-btn-danger px-6 py-3 text-sm"
      : "camp-btn camp-btn-primary px-6 py-3 text-sm"

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/65 px-4 backdrop-blur-sm">
      <div className="camp-modal-in w-full max-w-lg rounded-[2rem] border border-white/10 bg-stone-950 p-6 text-white shadow-2xl shadow-black/45">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-3xl">
          {variant === "danger" ? "⚠️" : "✨"}
        </div>

        <h2 className="mt-6 text-3xl font-black">{title}</h2>
        <p className="mt-4 leading-8 text-stone-400">{message}</p>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="camp-btn camp-btn-ghost px-6 py-3 text-sm"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={confirmClass}
          >
            {isLoading ? "Đang xử lý..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
