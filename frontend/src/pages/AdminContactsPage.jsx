import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getContactMessages, updateContactStatus } from "../services/contactService"
import { getAdminSession, isAdminLoggedIn, logoutAdmin } from "../services/authService"
import CampHeader from "../components/CampHeader"
import { useToast } from "../components/ToastProvider"

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
    new: "Mới",
    contacted: "Đã liên hệ",
    resolved: "Đã xử lý",
    cancelled: "Đã hủy",
  }[status] || status
}

function getStatusClass(status) {
  return {
    new: "border-yellow-300/30 bg-yellow-300/10 text-yellow-300",
    contacted: "border-emerald-300/30 bg-emerald-300/10 text-emerald-300",
    resolved: "border-sky-300/30 bg-sky-300/10 text-sky-300",
    cancelled: "border-red-300/30 bg-red-300/10 text-red-300",
  }[status] || "border-white/20 bg-white/10 text-white"
}

function getContactActionHint(status) {
  return {
    resolved: "Yêu cầu đã xử lý",
    cancelled: "Yêu cầu đã đóng",
  }[status] || ""
}

function AdminContactsPage() {
  const toast = useToast()
  const navigate = useNavigate()
  const adminSession = getAdminSession()

  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  async function loadContacts() {
    try {
      setIsLoading(true)
      setErrorMessage("")
      setContacts(await getContactMessages())
    } catch (error) {
      setErrorMessage(error.message || "Không thể tải danh sách liên hệ")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate("/admin-login")
      return
    }

    loadContacts()
  }, [navigate])

  async function handleUpdateStatus(id, status) {
    const currentContact = contacts.find((contact) => String(contact.id) === String(id))
    if (currentContact?.status === status) {
      toast.info("Không cần cập nhật", "Yêu cầu đang ở trạng thái này.")
      return
    }

    if (currentContact?.status === "resolved" || currentContact?.status === "cancelled") {
      toast.info("Không thể thay đổi", "Yêu cầu đã kết thúc nên không cần thao tác thêm.")
      return
    }

    try {
      setUpdatingId(id)
      setErrorMessage("")
      setSuccessMessage("")

      const updatedContact = await updateContactStatus(id, status)

      setContacts((prev) =>
        prev.map((item) =>
          String(item.id) === String(id) ? { ...item, ...updatedContact } : item
        )
      )

      setSuccessMessage(`Đã chuyển liên hệ CONTACT-${id} sang trạng thái "${getStatusLabel(status)}".`)
      toast.success("Cập nhật thành công", "Trạng thái yêu cầu tư vấn đã được cập nhật.")
    } catch (error) {
      toast.error("Cập nhật chưa thành công", "Vui lòng thử lại sau.")
      setErrorMessage(error.message || "Không thể cập nhật trạng thái liên hệ")
    } finally {
      setUpdatingId("")
    }
  }

  const stats = useMemo(() => {
    return {
      total: contacts.length,
      new: contacts.filter((item) => item.status === "new").length,
      contacted: contacts.filter((item) => item.status === "contacted").length,
      resolved: contacts.filter((item) => item.status === "resolved").length,
      cancelled: contacts.filter((item) => item.status === "cancelled").length,
    }
  }, [contacts])

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader mode="admin" />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="py-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
              Quản trị liên hệ
            </p>
            <h1 className="camp-page-title max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Quản lý yêu cầu tư vấn CampVibe
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-400">
              Theo dõi các yêu cầu tư vấn, phản hồi khách hàng và đánh dấu trạng thái xử lý rõ ràng.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/admin"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-black transition hover:bg-white/10"
              >
                Quản lý đơn đặt phòng
              </Link>
              <button
                type="button"
                onClick={loadContacts}
                className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-stone-950 transition hover:bg-emerald-300"
              >
                Làm mới liên hệ
              </button>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/10 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-stone-500">Tổng liên hệ</p>
              <p className="mt-4 text-4xl font-black">{stats.total}</p>
            </div>

            <div className="rounded-[2rem] border border-yellow-300/20 bg-yellow-300/10 p-6 shadow-xl shadow-black/10 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">Mới</p>
              <p className="mt-4 text-4xl font-black">{stats.new}</p>
            </div>

            <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-6 shadow-xl shadow-black/10 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">Đã liên hệ</p>
              <p className="mt-4 text-4xl font-black">{stats.contacted}</p>
            </div>

            <div className="rounded-[2rem] border border-sky-300/20 bg-sky-300/10 p-6 shadow-xl shadow-black/10 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-sky-300">Đã xử lý</p>
              <p className="mt-4 text-4xl font-black">{stats.resolved}</p>
            </div>


          </section>

          <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur md:p-7">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                Danh sách liên hệ
              </p>
              <h2 className="mt-2 text-3xl font-black">Danh sách yêu cầu tư vấn</h2>
            </div>

            {successMessage && (
              <div className="mb-5 rounded-[1.5rem] border border-emerald-300/30 bg-emerald-300/10 p-5 text-emerald-200">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-5 rounded-[1.5rem] border border-red-400/30 bg-red-400/10 p-5 text-red-200">
                {errorMessage}
              </div>
            )}

            {isLoading && (
              <div className="rounded-[1.5rem] border border-white/10 bg-stone-950/60 p-8 text-center text-lg font-black text-emerald-200">
                Đang tải danh sách liên hệ...
              </div>
            )}

            {!isLoading && contacts.length === 0 && (
              <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-stone-950/60 p-8 text-center text-stone-400">
                Chưa có yêu cầu liên hệ nào.
              </div>
            )}

            {!isLoading && contacts.length > 0 && (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <article
                    key={contact.id}
                    className="rounded-[1.5rem] border border-white/10 bg-stone-950/70 p-5 transition hover:border-emerald-300/30"
                  >
                    <div className="grid gap-5 xl:grid-cols-[0.7fr_1fr_1fr_1.2fr_1fr]">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Mã liên hệ</p>
                        <p className="mt-2 break-words text-lg font-black text-emerald-300">
                          CONTACT-{contact.id}
                        </p>
                        <p className="mt-1 text-xs text-stone-500">{formatDate(contact.createdAt)}</p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Khách hàng</p>
                        <p className="mt-2 font-black">{contact.fullName}</p>
                        <p className="mt-1 text-sm text-stone-500">{contact.phone}</p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Email / Chủ đề</p>
                        <p className="mt-2 text-sm font-bold text-stone-300">{contact.email || "Không có email"}</p>
                        <p className="mt-1 text-sm text-emerald-200">{contact.subject || "Tư vấn CampVibe"}</p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Nội dung</p>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-300">
                          {contact.message}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Trạng thái</p>
                        <span className={`mt-2 inline-flex rounded-full border px-3 py-2 text-xs font-black ${getStatusClass(contact.status)}`}>
                          {getStatusLabel(contact.status)}
                        </span>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {contact.status === "new" && (
                            <>
                              <button
                                type="button"
                                disabled={updatingId === contact.id}
                                onClick={() => handleUpdateStatus(contact.id, "contacted")}
                                className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-xs font-black text-emerald-200 transition hover:bg-emerald-300 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Đã liên hệ
                              </button>
                              <button
                                type="button"
                                disabled={updatingId === contact.id}
                                onClick={() => handleUpdateStatus(contact.id, "resolved")}
                                className="rounded-full border border-sky-300/30 bg-sky-300/10 px-3 py-2 text-xs font-black text-sky-200 transition hover:bg-sky-300 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Đã xử lý
                              </button>
                            </>
                          )}

                          {contact.status === "contacted" && (
                            <button
                              type="button"
                              disabled={updatingId === contact.id}
                              onClick={() => handleUpdateStatus(contact.id, "resolved")}
                              className="rounded-full border border-sky-300/30 bg-sky-300/10 px-3 py-2 text-xs font-black text-sky-200 transition hover:bg-sky-300 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              Đã xử lý
                            </button>
                          )}

                          {getContactActionHint(contact.status) && (
                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-black text-stone-400">
                              {getContactActionHint(contact.status)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
</main>
    </div>
  )
}

export default AdminContactsPage