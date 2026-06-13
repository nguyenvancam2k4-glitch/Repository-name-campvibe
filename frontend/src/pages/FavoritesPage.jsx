import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserFavorites, removeFavorite } from "../services/favoriteService"
import { getCustomerSession, isCustomerLoggedIn } from "../services/authService"
import CampHeader from "../components/CampHeader"
import ContentBoost from "../components/ContentBoost"
import ConfirmModal from "../components/ConfirmModal"
import { useToast } from "../components/ToastProvider"

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")}đ`
}

function FavoritesPage() {
  const toast = useToast()
  const navigate = useNavigate()
  const session = getCustomerSession()
  const user = session?.user

  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [pendingRemove, setPendingRemove] = useState(null)
  const [isRemoving, setIsRemoving] = useState(false)

  useEffect(() => {
    if (!isCustomerLoggedIn()) {
      navigate("/login")
      return
    }

    async function loadFavorites() {
      try {
        setIsLoading(true)
        setFavorites(await getUserFavorites(user.id))
      } catch (error) {
        setErrorMessage(error.message || "Không thể tải danh sách yêu thích")
      } finally {
        setIsLoading(false)
      }
    }

    loadFavorites()
  }, [navigate, user?.id])

  async function confirmRemoveFavorite() {
    if (!pendingRemove) return

    try {
      setIsRemoving(true)
      await removeFavorite(user.id, pendingRemove.placeId)
      setFavorites((prev) => prev.filter((item) => String(item.placeId) !== String(pendingRemove.placeId)))
      toast.success("Đã bỏ yêu thích", "Địa điểm đã được xóa khỏi danh sách của bạn.")
      setPendingRemove(null)
    } catch (error) {
      toast.error("Chưa xóa được", error.message || "Vui lòng thử lại sau.")
    } finally {
      setIsRemoving(false)
    }
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-white">
        <p className="text-xl font-black">Đang kiểm tra đăng nhập...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="py-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
              Bộ sưu tập cá nhân
            </p>
            <h1 className="camp-page-title max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-[3.9rem]">
              Địa điểm yêu thích của {user.fullName}
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-400">
              Danh sách này giúp bạn giữ lại các địa điểm muốn xem lại hoặc đặt vào lần sau.
            </p>
          </section>

          {isLoading && (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-10 text-center text-xl font-black text-emerald-200">
              Đang tải địa điểm yêu thích...
            </div>
          )}

          {errorMessage && (
            <div className="rounded-[2rem] border border-red-400/30 bg-red-400/10 p-6 text-red-200">
              {errorMessage}
            </div>
          )}

          {!isLoading && !errorMessage && favorites.length === 0 && (
            <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.06] p-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-emerald-400/10 text-4xl">❤️</div>
              <h2 className="mt-6 text-3xl font-black">Bạn chưa có địa điểm yêu thích nào</h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-stone-400">
                Vào trang chi tiết địa điểm và bấm thêm yêu thích để lưu vào tài khoản.
              </p>
              <Link to="/places" className="mt-7 inline-flex rounded-full bg-emerald-400 px-7 py-4 font-black text-stone-950">
                Khám phá địa điểm
              </Link>
            </div>
          )}

          {!isLoading && !errorMessage && favorites.length > 0 && (
            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {favorites.map((favorite) => {
                const place = favorite.place || {}

                return (
                  <article
                    key={favorite.id}
                    className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20 backdrop-blur"
                  >
                    <div className="relative h-64 overflow-hidden">
                      {place.imageUrl ? (
                        <img src={place.imageUrl} alt={place.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-emerald-400/10 text-5xl">🏕️</div>
                      )}
                      <button
                        type="button"
                        onClick={() => setPendingRemove(favorite)}
                        className="absolute right-4 top-4 rounded-full border border-red-300/30 bg-red-400/90 px-4 py-2 text-sm font-black text-white shadow-lg"
                      >
                        Bỏ thích
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-black text-stone-950">
                          {place.type || "Glamping"}
                        </span>
                        <span className="text-sm font-black text-yellow-300">★ {place.rating || "4.8"}</span>
                      </div>

                      <h2 className="mt-5 text-3xl font-black">{place.name}</h2>
                      <p className="mt-2 text-emerald-200">{place.location}</p>
                      <p className="mt-4 line-clamp-2 leading-7 text-stone-400">{place.shortDescription || "Địa điểm glamping được lưu trong danh sách yêu thích của bạn."}</p>

                      <div className="mt-6 flex items-center justify-between gap-4">
                        <p className="text-xl font-black text-white">{formatMoney(place.price)}</p>
                        <Link
                          to={`/places/${place.id}`}
                          className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-stone-950"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </section>
          )}
        </div>
                <ContentBoost variant="account" />
      </main>

      <ConfirmModal
        open={Boolean(pendingRemove)}
        title="Bỏ khỏi yêu thích?"
        message={`Bạn muốn xóa "${pendingRemove?.place?.name || "địa điểm này"}" khỏi danh sách yêu thích?`}
        confirmText="Bỏ yêu thích"
        cancelText="Giữ lại"
        variant="danger"
        isLoading={isRemoving}
        onConfirm={confirmRemoveFavorite}
        onCancel={() => setPendingRemove(null)}
      />
    </div>
  )
}

export default FavoritesPage