import { useState } from "react"
import { Link } from "react-router-dom"
import { createContactMessage } from "../services/contactService"
import { getCustomerSession } from "../services/authService"
import CampHeader from "../components/CampHeader"
import { useToast } from "../components/ToastProvider"
import ContentBoost from "../components/ContentBoost"

function ContactPage() {
  const toast = useToast()
  const customer = getCustomerSession()?.user

  const [formData, setFormData] = useState({
    fullName: customer?.fullName || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    subject: "Tư vấn đặt glamping",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    toast.success("Đã gửi yêu cầu", "CampVibe sẽ liên hệ tư vấn trong thời gian sớm nhất.")
      toast.success("Đã gửi yêu cầu tư vấn", "CampVibe sẽ liên hệ lại trong thời gian sớm nhất.")
      setSuccessMessage("")
    setErrorMessage("")

    try {
      setIsSubmitting(true)
      const contact = await createContactMessage({
        userId: customer?.id || null,
        ...formData,
      })

      setSuccessMessage(`Gửi yêu cầu tư vấn thành công! Mã yêu cầu tư vấn của bạn là CONTACT-${contact.id}.`)
      setFormData((prev) => ({ ...prev, message: "" }))
    } catch (error) {
      
      toast.error("Chưa gửi được yêu cầu", "Vui lòng kiểm tra thông tin và thử lại.")
setErrorMessage(error.message || "Không thể gửi liên hệ")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="grid gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                Liên hệ CampVibe
              </p>
              <h1 className="camp-page-title text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-[3.9rem]">
                Cần tư vấn chuyến glamping phù hợp?
              </h1>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-400">
                Gửi yêu cầu tư vấn cho CampVibe. Hãy để lại thông tin, đội ngũ CampVibe sẽ tư vấn địa điểm và lịch trình phù hợp với nhu cầu của bạn.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">Hotline</p>
                  <p className="mt-3 text-3xl font-black">1900 2026</p>
                  <p className="mt-2 text-stone-400">Hỗ trợ tư vấn 8:00 - 22:00</p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">Email</p>
                  <p className="mt-3 text-2xl font-black">hello@campvibe.vn</p>
                  <p className="mt-2 text-stone-400">Phản hồi trong ngày</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-9">
              <div className="mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400 text-3xl shadow-lg shadow-emerald-400/20">
                  ✉️
                </div>
                <h2 className="mt-6 text-4xl font-black">Gửi yêu cầu tư vấn</h2>
                <p className="mt-3 text-stone-400">
                  Yêu cầu của bạn đã được đội ngũ CampVibe tiếp nhận.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label>
                  <span className="font-bold text-stone-300">Họ và tên *</span>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                  />
                </label>

                <label>
                  <span className="font-bold text-stone-300">Số điện thoại *</span>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="09xxxxxxxx"
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                  />
                </label>

                <label>
                  <span className="font-bold text-stone-300">Email</span>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                  />
                </label>

                <label>
                  <span className="font-bold text-stone-300">Chủ đề</span>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none focus:border-emerald-300"
                  >
                    <option className="text-stone-950">Tư vấn đặt glamping</option>
                    <option className="text-stone-950">Tư vấn địa điểm nhóm</option>
                    <option className="text-stone-950">Tư vấn tổ chức sự kiện</option>
                    <option className="text-stone-950">Hỗ trợ đơn đặt phòng</option>
                  </select>
                </label>

                <label className="md:col-span-2">
                  <span className="font-bold text-stone-300">Nội dung cần tư vấn *</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Bạn muốn đi mấy người, thời gian nào, ngân sách khoảng bao nhiêu?"
                    rows="6"
                    className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                  />
                </label>
              </div>

              {successMessage && (
                <div className="mt-6 rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-4 text-sm font-bold text-emerald-200">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-bold text-red-200">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 w-full rounded-2xl bg-emerald-400 px-8 py-5 text-base font-black text-stone-950 shadow-lg shadow-emerald-400/20 transition hover:-translate-y-1 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Đang gửi liên hệ..." : "Gửi yêu cầu tư vấn"}
              </button>
            </form>
          </section>
        </div>
                <ContentBoost variant="contact" />
      </main>
    </div>
  )
}

export default ContactPage