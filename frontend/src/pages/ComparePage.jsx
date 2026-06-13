import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { getPlaces } from "../services/placeService"
import CampHeader from "../components/CampHeader"
import ContentBoost from "../components/ContentBoost"

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")}đ`
}

function getPlacePrice(place) {
  return Number(place?.priceNumber || place?.price || 0)
}

function ComparePage() {
  const [places, setPlaces] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function loadPlaces() {
      try {
        setIsLoading(true)
        setErrorMessage("")
        const data = await getPlaces()
        setPlaces(data)
        setSelectedIds(data.slice(0, 2).map((place) => String(place.id)))
      } catch (error) {
        setErrorMessage(error.message || "Không thể tải danh sách địa điểm")
      } finally {
        setIsLoading(false)
      }
    }

    loadPlaces()
  }, [])

  const selectedPlaces = useMemo(() => {
    return selectedIds
      .map((id) => places.find((place) => String(place.id) === String(id)))
      .filter(Boolean)
  }, [places, selectedIds])

  function handleSelect(placeId) {
    const id = String(placeId)

    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      }

      if (prev.length >= 2) {
        return [prev[1], id]
      }

      return [...prev, id]
    })
  }

  function isSelected(placeId) {
    return selectedIds.includes(String(placeId))
  }

  const winner = useMemo(() => {
    if (selectedPlaces.length < 2) return null

    const sortedByRating = [...selectedPlaces].sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    return sortedByRating[0]
  }, [selectedPlaces])

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="grid gap-10 py-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                So sánh thông minh
              </p>
              <h1 className="camp-page-title max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-[3.9rem]">
                Chọn điểm nghỉ phù hợp nhất cho chuyến đi của bạn
              </h1>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-400">
                Dữ liệu địa điểm được lấy từ CampVibe. Bạn có thể chọn 2 địa điểm để so sánh giá, vị trí,
                sức chứa, đánh giá và loại hình nghỉ dưỡng.
              </p>
            </div>

            <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-6 shadow-2xl shadow-black/20 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                Gợi ý nhanh
              </p>
              <h2 className="mt-4 text-3xl font-black">
                {winner ? `${winner.name} đang có rating nổi bật` : "Chọn 2 địa điểm"}
              </h2>
              <p className="mt-4 leading-7 text-stone-300">
                Nếu phân vân, hãy ưu tiên địa điểm có rating cao, vị trí phù hợp và mức giá vừa ngân sách.
              </p>
            </div>
          </section>

          {isLoading && (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-10 text-center text-xl font-black text-emerald-200">
              Đang chuẩn bị danh sách địa điểm phù hợp...
            </div>
          )}

          {errorMessage && (
            <div className="rounded-[2rem] border border-red-400/30 bg-red-400/10 p-6 text-red-200">
              {errorMessage}
            </div>
          )}

          {!isLoading && !errorMessage && (
            <>
              <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                      Chọn địa điểm
                    </p>
                    <h2 className="mt-2 text-3xl font-black">
                      Đang chọn {selectedPlaces.length}/2 địa điểm
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedIds([])}
                    className="rounded-full border border-white/15 px-6 py-3 text-sm font-black transition hover:bg-white/10"
                  >
                    Chọn lại
                  </button>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {places.map((place) => (
                    <article
                      key={place.id}
                      className={`overflow-hidden rounded-[1.5rem] border bg-stone-950/70 transition ${
                        isSelected(place.id)
                          ? "border-emerald-300 shadow-lg shadow-emerald-400/10"
                          : "border-white/10 hover:border-emerald-300/40"
                      }`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={place.imageUrl || place.image}
                          alt={place.name}
                          className="h-full w-full object-cover"
                        />
                        {isSelected(place.id) && (
                          <span className="absolute right-4 top-4 rounded-full bg-emerald-400 px-4 py-2 text-xs font-black text-stone-950">
                            Đang chọn
                          </span>
                        )}
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-xs font-black text-emerald-300">
                            {place.type || "Glamping"}
                          </span>
                          <span className="text-sm font-black text-yellow-300">★ {place.rating || "4.8"}</span>
                        </div>

                        <h3 className="mt-4 text-2xl font-black">{place.name}</h3>
                        <p className="mt-2 text-sm font-bold text-emerald-200">{place.location}</p>
                        <p className="mt-4 line-clamp-2 leading-7 text-stone-400">
                          {place.shortDescription || place.description}
                        </p>

                        <div className="mt-5 flex items-center justify-between gap-4">
                          <p className="font-black text-white">{formatMoney(getPlacePrice(place))}</p>
                          <button
                            type="button"
                            onClick={() => handleSelect(place.id)}
                            className={`rounded-full px-5 py-3 text-sm font-black transition ${
                              isSelected(place.id)
                                ? "border border-white/15 bg-white/10 text-white"
                                : "bg-emerald-400 text-stone-950 hover:bg-emerald-300"
                            }`}
                          >
                            {isSelected(place.id) ? "Bỏ chọn" : "So sánh"}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
                <div className="mb-6">
                  <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                    Bảng so sánh
                  </p>
                  <h2 className="mt-2 text-3xl font-black">Bảng so sánh chi tiết</h2>
                </div>

                {selectedPlaces.length < 2 && (
                  <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-stone-950/60 p-8 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-emerald-400/10 text-4xl">
                      ⚖️
                    </div>
                    <h3 className="mt-6 text-2xl font-black">Hãy chọn đủ 2 địa điểm</h3>
                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-stone-400">
                      Bấm nút “So sánh” ở 2 địa điểm bạn đang phân vân để xem bảng so sánh chi tiết.
                    </p>
                  </div>
                )}

                {selectedPlaces.length === 2 && (
                  <div className="camp-scroll-x overflow-hidden rounded-[1.5rem] border border-white/10">
                    <div className="grid grid-cols-3 bg-stone-950/80">
                      <div className="border-r border-white/10 p-5 font-black text-stone-400">Tiêu chí</div>
                      {selectedPlaces.map((place) => (
                        <div key={place.id} className="border-r border-white/10 p-5 last:border-r-0">
                          <h3 className="text-xl font-black text-emerald-300">{place.name}</h3>
                          <p className="mt-1 text-sm text-stone-500">{place.location}</p>
                        </div>
                      ))}
                    </div>

                    {[
                      ["Giá", (place) => formatMoney(getPlacePrice(place))],
                      ["Vị trí", (place) => place.location || "Đang cập nhật"],
                      ["Loại hình", (place) => place.type || "Glamping"],
                      ["Rating", (place) => `★ ${place.rating || "4.8"}`],
                      ["Sức chứa", (place) => place.capacity || "2-6 khách"],
                    ].map(([label, render]) => (
                      <div key={label} className="grid grid-cols-3 border-t border-white/10">
                        <div className="border-r border-white/10 bg-white/[0.03] p-5 font-black text-stone-300">
                          {label}
                        </div>
                        {selectedPlaces.map((place) => (
                          <div key={`${place.id}-${label}`} className="border-r border-white/10 p-5 font-bold text-white last:border-r-0">
                            {render(place)}
                          </div>
                        ))}
                      </div>
                    ))}

                    <div className="grid grid-cols-3 border-t border-white/10">
                      <div className="border-r border-white/10 bg-white/[0.03] p-5 font-black text-stone-300">
                        Thao tác
                      </div>
                      {selectedPlaces.map((place) => (
                        <div key={`${place.id}-actions`} className="flex flex-col gap-3 border-r border-white/10 p-5 last:border-r-0 sm:flex-row">
                          <Link
                            to={`/places/${place.id}`}
                            className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-black transition hover:bg-white/10"
                          >
                            Chi tiết
                          </Link>
                          <Link
                            to={`/booking/${place.id}`}
                            className="rounded-full bg-emerald-400 px-5 py-3 text-center text-sm font-black text-stone-950 transition hover:bg-emerald-300"
                          >
                            Đặt
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
                <ContentBoost variant="compare" />
      </main>
    </div>
  )
}

export default ComparePage