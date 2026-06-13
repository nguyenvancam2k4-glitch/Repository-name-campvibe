import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getPlaceDetail } from "../services/placeService"
import { addFavorite, checkFavorite, removeFavorite } from "../services/favoriteService"
import { getCustomerSession } from "../services/authService"
import CampHeader from "../components/CampHeader"
import { useToast } from "../components/ToastProvider"
import ContentBoost from "../components/ContentBoost"

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")}đ`
}

function isValidImageUrl(value) {
  if (!value || typeof value !== "string") return false
  return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/") || value.startsWith("data:image")
}

function PlaceDetailPage() {
  const toast = useToast()
  const { id } = useParams()
  const navigate = useNavigate()

  const customerSession = getCustomerSession()
  const customer = customerSession?.user

  const [place, setPlace] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteMessage, setFavoriteMessage] = useState("")
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)

  useEffect(() => {
    async function loadPlace() {
      try {
        setIsLoading(true)
        setErrorMessage("")
        const data = await getPlaceDetail(id)
        setPlace(data)
      } catch (error) {
        setErrorMessage(error.message || "Không thể tải chi tiết địa điểm")
      } finally {
        setIsLoading(false)
      }
    }

    loadPlace()
  }, [id])

  useEffect(() => {
    async function loadFavoriteState() {
      if (!customer?.id || !id) {
        setIsFavorite(false)
        return
      }

      try {
        setIsFavorite(await checkFavorite(customer.id, id))
      } catch {
        setIsFavorite(false)
      }
    }

    loadFavoriteState()
  }, [customer?.id, id])

  const mainImage = useMemo(() => {
    return [place?.imageUrl, place?.image].find(isValidImageUrl) || ""
  }, [place])

  async function handleToggleFavorite() {
    if (!customer?.id) {
      navigate("/login")
      return
    }

    try {
      setIsFavoriteLoading(true)
      setFavoriteMessage("")

      if (isFavorite) {
        await removeFavorite(customer.id, id)
        setIsFavorite(false)
        setFavoriteMessage("Đã xóa địa điểm khỏi danh sách yêu thích.")
        toast.info("Đã bỏ yêu thích", "Địa điểm đã được xóa khỏi danh sách của bạn.")
      } else {
        await addFavorite(customer.id, id)
        setIsFavorite(true)
        setFavoriteMessage("Đã thêm địa điểm vào danh sách yêu thích.")
        toast.success("Đã thêm yêu thích", "Bạn có thể xem lại địa điểm này trong danh sách yêu thích.")
      }
    } catch (error) {
      setFavoriteMessage(error.message || "Không thể cập nhật yêu thích.")
      toast.error("Không thể cập nhật", error.message || "Vui lòng thử lại sau.")
    } finally {
      setIsFavoriteLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-white">
        <p className="text-xl font-black">Đang tải chi tiết địa điểm...</p>
      </div>
    )
  }

  if (errorMessage || !place) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 px-4 text-white">
        <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center">
          <h1 className="text-4xl font-black">Không tải được địa điểm</h1>
          <p className="mt-4 text-stone-400">{errorMessage || "Địa điểm không tồn tại."}</p>
          <Link to="/places" className="mt-6 inline-flex rounded-full bg-emerald-400 px-7 py-4 font-black text-stone-950">
            Quay lại địa điểm
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="grid gap-10 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                {place.type || "Glamping"}
              </p>

              <h1 className="camp-page-title text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                {place.name}
              </h1>

              <p className="mt-5 text-xl font-bold text-emerald-200">
                {place.location}
              </p>

              <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-400">
                {place.description || place.shortDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 font-black">
                  ★ {place.rating || "4.8"}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 font-black">
                  {place.capacity || "2-6 khách"}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 font-black">
                  {formatMoney(place.priceNumber || place.price)}
                </span>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={`/booking/${place.id || id}`}
                  className="rounded-full bg-emerald-400 px-8 py-5 text-center font-black text-stone-950 shadow-lg shadow-emerald-400/20 transition hover:-translate-y-1 hover:bg-emerald-300"
                >
                  Đặt ngay
                </Link>

                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  disabled={isFavoriteLoading}
                  className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-8 py-5 font-black text-emerald-200 transition hover:bg-emerald-300 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isFavoriteLoading ? "Đang xử lý..." : isFavorite ? "Bỏ yêu thích" : "Thêm yêu thích"}
                </button>

                <Link to="/favorites" className="rounded-full border border-white/15 px-8 py-5 text-center font-black transition hover:bg-white/10">
                  Xem yêu thích
                </Link>
              </div>

              {favoriteMessage && (
                <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm font-bold text-emerald-200">
                  {favoriteMessage}
                </div>
              )}
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/30 backdrop-blur">
              {mainImage ? (
                <img src={mainImage} alt={place.name} className="h-[520px] w-full rounded-[2rem] object-cover" />
              ) : (
                <div className="flex h-[520px] w-full items-center justify-center rounded-[2rem] bg-emerald-400/10 text-7xl">
                  🏕️
                </div>
              )}
            </div>
          </section>

          <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.42fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                Mô tả chi tiết
              </p>
              <h2 className="mt-3 text-3xl font-black">Trải nghiệm tại {place.name}</h2>
              <p className="mt-6 text-lg leading-8 text-stone-400">
                {place.longDescription || place.description || place.shortDescription}
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {(place.amenities || ["Lều glamping", "BBQ ngoài trời", "View thiên nhiên", "Hỗ trợ check-in"]).map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-stone-950/70 p-5 font-bold text-stone-300">
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-7 shadow-2xl shadow-black/20 backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                  Tạm tính
                </p>
                <h2 className="mt-4 text-4xl font-black">{formatMoney(place.priceNumber || place.price)}</h2>
                <p className="mt-4 leading-7 text-stone-300">
                  Giá trải nghiệm cho một đêm nghỉ. Có thể thay đổi theo số khách và dịch vụ đi kèm.
                </p>
                <Link
                  to={`/booking/${place.id || id}`}
                  className="mt-6 flex w-full justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-black text-stone-950 transition hover:bg-emerald-300"
                >
                  Gửi yêu cầu đặt phòng
                </Link>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-stone-500">
                  Gợi ý nhanh
                </p>
                <ul className="mt-5 space-y-4 text-stone-300">
                  <li>✓ Bấm Đặt ngay để sang form đặt phòng</li>
                  <li>✓ Bấm Yêu thích để lưu vào tài khoản</li>
                  <li>✓ Bấm Xem yêu thích để kiểm tra danh sách</li>
                  <li>✓ Không còn dãy ảnh phụ lỗi bên dưới</li>
                </ul>
              </div>
            </aside>
          </section>
        </div>
                <ContentBoost variant="general" />
      </main>
    </div>
  )
}

export default PlaceDetailPage