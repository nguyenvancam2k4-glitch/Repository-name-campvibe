import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPlaces } from "../services/placeService"
import CampHeader from "../components/CampHeader"
import ContentBoost from "../components/ContentBoost"

function PlacesPage() {
  const [places, setPlaces] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [keyword, setKeyword] = useState("")
  const [region, setRegion] = useState("Tất cả")
  const [style, setStyle] = useState("Tất cả")

  useEffect(() => {
    async function loadPlaces() {
      try {
        const data = await getPlaces()
        setPlaces(data)
      } finally {
        setIsLoading(false)
      }
    }

    loadPlaces()
  }, [])

  const filteredPlaces = places.filter((place) => {
    const matchKeyword =
      keyword.trim() === "" ||
      place.name.toLowerCase().includes(keyword.toLowerCase()) ||
      place.location.toLowerCase().includes(keyword.toLowerCase())

    const matchRegion = region === "Tất cả" || place.location.includes(region) || place.type === region
    const matchStyle = style === "Tất cả" || place.type === style || place.tags?.includes(style)

    return matchKeyword && matchRegion && matchStyle
  })

  const hasActiveFilters = keyword.trim() !== "" || region !== "Tất cả" || style !== "Tất cả"

  function resetFilters() {
    setKeyword("")
    setRegion("Tất cả")
    setStyle("Tất cả")
  }

  return (
    <div className="camp-page min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="py-10 sm:py-14">
            <div className="max-w-4xl">
              <p className="mb-4 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-5 py-2 text-sm font-bold text-emerald-200">
                Khám phá địa điểm
              </p>
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Chọn điểm glamping phù hợp với phong cách của bạn
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
                Chọn điểm đến theo khu vực, phong cách và nhu cầu nghỉ dưỡng để tìm chuyến đi phù hợp với bạn.
              </p>
            </div>

            <div className="mt-10 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-black/20 backdrop-blur lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
              <label className="rounded-2xl bg-stone-950/80 p-5">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">Tìm kiếm</span>
                <input
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Tên địa điểm hoặc tỉnh thành"
                  className="mt-3 w-full bg-transparent text-white outline-none placeholder:text-stone-500"
                />
              </label>

              <label className="rounded-2xl bg-stone-950/80 p-5">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">Khu vực</span>
                <select
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                  className="mt-3 w-full bg-transparent text-white outline-none"
                >
                  <option className="text-stone-950">Tất cả</option>
                  <option className="text-stone-950">Hà Nội</option>
                  <option className="text-stone-950">Đà Lạt</option>
                  <option className="text-stone-950">Mộc Châu</option>
                  <option className="text-stone-950">Ninh Bình</option>
                  <option className="text-stone-950">Mũi Né</option>
                </select>
              </label>

              <label className="rounded-2xl bg-stone-950/80 p-5">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">Phong cách</span>
                <select
                  value={style}
                  onChange={(event) => setStyle(event.target.value)}
                  className="mt-3 w-full bg-transparent text-white outline-none"
                >
                  <option className="text-stone-950">Tất cả</option>
                  <option className="text-stone-950">Rừng thông</option>
                  <option className="text-stone-950">Ven hồ</option>
                  <option className="text-stone-950">Săn mây</option>
                  <option className="text-stone-950">Gần biển</option>
                  <option className="text-stone-950">Ven sông</option>
                </select>
              </label>

              <button
                type="button"
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-6 py-5 text-base font-black text-emerald-200 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:bg-emerald-300 hover:text-stone-950 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.04] disabled:text-stone-500 disabled:hover:translate-y-0"
              >
                {hasActiveFilters ? "Xóa bộ lọc" : "Đang hiển thị tất cả"}
              </button>
            </div>
          </section>

          <section className="pb-12">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                  Danh sách địa điểm
                </p>
                <h2 className="mt-3 text-3xl font-black md:text-4xl">
                  {isLoading ? "Đang tải địa điểm..." : `${filteredPlaces.length} địa điểm phù hợp`}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-stone-400">
                Danh sách địa điểm được cập nhật thường xuyên.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredPlaces.map((place) => (
                <article
                  key={place.id}
                  className="camp-card group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-xl shadow-black/10 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-emerald-300/30 hover:bg-white/[0.09]"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={place.imageUrl || place.image} alt={place.name} className="camp-image h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/35 to-transparent"></div>
                    <span className="absolute left-5 top-5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-black text-stone-950">
                      {place.type}
                    </span>
                    <span className="absolute right-5 top-5 rounded-full bg-stone-950/80 px-4 py-2 text-sm font-black text-white">
                      ⭐ {place.rating}
                    </span>

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-sm font-bold text-emerald-200">{place.location}</p>
                      <h3 className="mt-2 text-2xl font-black">{place.name}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="min-h-[72px] text-sm leading-7 text-stone-400">{place.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {(place.tags || place.amenities || []).slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-5">
                      <div>
                        <p className="text-xs text-stone-500">Chỉ từ</p>
                        <p className="text-2xl font-black text-white">
                          {place.priceText || place.price}
                          <span className="text-sm text-stone-500"> / đêm</span>
                        </p>
                      </div>

                      <Link
                        to={`/places/${place.id}`}
                        className="rounded-full bg-white px-5 py-3 text-sm font-black text-stone-950 transition hover:bg-emerald-300"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
                <ContentBoost variant="general" />
      </main>
    </div>
  )
}

export default PlacesPage