import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { createBooking } from "../services/bookingService"
import { getPlaceDetail } from "../services/placeService"
import { getCustomerSession } from "../services/authService"
import CampHeader from "../components/CampHeader"

function BookingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const customerSession = getCustomerSession()
  const customer = customerSession?.user

  const [place, setPlace] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    guestCount: "2",
    tripType: "Nghỉ dưỡng cá nhân",
    customerName: customer?.fullName || "",
    customerPhone: customer?.phone || "",
    customerEmail: customer?.email || "",
    note: "",
  })

  useEffect(() => {
    async function loadPlace() {
      try {
        const data = await getPlaceDetail(id)
        setPlace(data)
      } finally {
        setIsLoading(false)
      }
    }

    loadPlace()
  }, [id])

  const totalAmount = useMemo(() => {
    const price = Number(place?.priceNumber || place?.price || 0)
    const guestCount = Number(formData.guestCount || 1)
    return price + Math.max(0, guestCount - 2) * 150000
  }, [place, formData.guestCount])

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

    if (!formData.customerName.trim() || !formData.customerPhone.trim()) {
      setErrorMessage("Bạn cần nhập họ tên và số điện thoại để gửi yêu cầu đặt phòng.")
      return
    }

    try {
      setIsSubmitting(true)

      const booking = await createBooking({
        userId: customer?.id || null,
        placeId: id,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        guestCount: Number(formData.guestCount || 1),
        tripType: formData.tripType,
        note: formData.note,
        totalAmount,
      })

      localStorage.setItem("campvibe_last_booking", JSON.stringify({
        ...booking,
        placeName: place?.name,
        placeLocation: place?.location,
        imageUrl: place?.imageUrl || place?.image,
      }))

      navigate(`/booking-success/${booking.id}`)
    } catch (error) {
      setErrorMessage(error.message || "Không thể gửi yêu cầu đặt phòng. Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-white">
        <p className="text-xl font-black">Đang tải thông tin đặt phòng...</p>
      </div>
    )
  }

  return (
    <div className="camp-page min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="py-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
              Hoàn tất đặt chỗ
            </p>
            <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-[3.9rem]">
              Đặt lịch cho chuyến glamping của bạn
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-400">
              Điền thông tin cơ bản để CampVibe kiểm tra lịch trống và tư vấn combo phù hợp.
              Yêu cầu này sẽ được lưu vào CampVibe.
            </p>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <label>
                  <span className="font-bold text-stone-300">Ngày nhận phòng</span>
                  <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none focus:border-emerald-300"
                  />
                </label>

                <label>
                  <span className="font-bold text-stone-300">Ngày trả phòng</span>
                  <input
                    type="date"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none focus:border-emerald-300"
                  />
                </label>

                <label>
                  <span className="font-bold text-stone-300">Số khách</span>
                  <select
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none focus:border-emerald-300"
                  >
                    {[1, 2, 3, 4, 5, 6].map((number) => (
                      <option key={number} value={number} className="text-stone-950">
                        {number} khách
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="font-bold text-stone-300">Loại chuyến đi</span>
                  <select
                    name="tripType"
                    value={formData.tripType}
                    onChange={handleChange}
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none focus:border-emerald-300"
                  >
                    {["Nghỉ dưỡng cá nhân", "Đi cùng người yêu", "Đi nhóm bạn", "Đi gia đình", "Sự kiện nhỏ"].map((item) => (
                      <option key={item} value={item} className="text-stone-950">{item}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="my-8 border-t border-white/10"></div>

              <h2 className="text-3xl font-black">Thông tin liên hệ</h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <label>
                  <span className="font-bold text-stone-300">Họ và tên *</span>
                  <input
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Nhập tên của bạn"
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                  />
                </label>

                <label>
                  <span className="font-bold text-stone-300">Số điện thoại *</span>
                  <input
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                  />
                </label>

                <label className="md:col-span-2">
                  <span className="font-bold text-stone-300">Email</span>
                  <input
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="Nhập email nếu có"
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                  />
                </label>

                <label className="md:col-span-2">
                  <span className="font-bold text-stone-300">Lời nhắn</span>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Bạn muốn đi đâu, đi mấy người, vào thời gian nào?"
                    rows="5"
                    className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none placeholder:text-stone-600 focus:border-emerald-300"
                  />
                </label>
              </div>

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
                {isSubmitting ? "Đang gửi yêu cầu..." : "Gửi yêu cầu đặt phòng"}
              </button>
            </form>

            <aside className="space-y-6">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20 backdrop-blur">
                <img src={place?.imageUrl || place?.image} alt={place?.name} className="h-72 w-full object-cover" />
                <div className="p-6">
                  <span className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-black text-stone-950">
                    {place?.type}
                  </span>
                  <h2 className="mt-5 text-3xl font-black">{place?.name}</h2>
                  <p className="mt-2 text-emerald-200">{place?.location}</p>
                  <p className="mt-4 leading-7 text-stone-400">{place?.description}</p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                  Tạm tính
                </p>
                <p className="mt-3 text-4xl font-black">
                  {totalAmount.toLocaleString("vi-VN")}đ
                </p>
                <p className="mt-3 text-sm leading-6 text-stone-400">
                  Giá trải nghiệm dựa trên địa điểm và số khách. Khi hoàn thiện, hệ thống có thể tính thêm dịch vụ đi kèm.
                </p>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  )
}

export default BookingPage