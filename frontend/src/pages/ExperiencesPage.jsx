import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { experienceCategories as categories } from "../data/experiences"
import { getExperiences } from "../services/experienceService"
import CampHeader from "../components/CampHeader"
import ContentBoost from "../components/ContentBoost"

const steps = [
  {
    number: "01",
    title: "Lưu lựa chọn địa điểm",
    text: "Khách chọn khu glamping phù hợp với vị trí, ngân sách và phong cách chuyến đi.",
  },
  {
    number: "02",
    title: "Thêm trải nghiệm",
    text: "Lựa chọn các dịch vụ đi kèm như BBQ, lửa trại, picnic, chèo SUP hoặc setup sự kiện.",
  },
  {
    number: "03",
    title: "Gửi yêu cầu",
    text: "CampVibe tiếp nhận yêu cầu, tư vấn chi tiết và hỗ trợ xác nhận lịch phù hợp.",
  },
]

function ExperiencesPage() {
  const [selectedExperience, setSelectedExperience] = useState(null)
  const [activeCategory, setActiveCategory] = useState("Tất cả")
  const [experiences, setExperiences] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadExperiences() {
      try {
        const data = await getExperiences()
        setExperiences(data)
      } finally {
        setIsLoading(false)
      }
    }

    loadExperiences()
  }, [])

  const filteredExperiences =
    activeCategory === "Tất cả"
      ? experiences
      : experiences.filter((item) => item.category === activeCategory)

  function handleAddExperience(item) {
    const savedItems = JSON.parse(localStorage.getItem("campvibe_trip_experiences") || "[]")
    const isExists = savedItems.some((saved) => saved.title === item.title)
    const nextItems = isExists ? savedItems : [...savedItems, item]

    localStorage.setItem("campvibe_trip_experiences", JSON.stringify(nextItems))
    setSelectedExperience(item)
  }

  return (
    <div className="camp-page min-h-screen overflow-x-hidden bg-stone-950 text-white">
      {selectedExperience && (
        <div className="fixed bottom-6 right-6 z-[60] max-w-sm rounded-[1.5rem] border border-emerald-300/30 bg-stone-950/95 p-5 shadow-2xl shadow-black/40 backdrop-blur">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
            Đã thêm vào chuyến đi
          </p>
          <h3 className="mt-2 text-xl font-black">{selectedExperience.title}</h3>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            Trải nghiệm đã được lưu tạm thời. Bạn có thể tiếp tục chọn địa điểm phù hợp để đặt lịch.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              to="/places"
              className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-black text-stone-950"
            >
              Lưu lựa chọn địa điểm
            </Link>
            <button
              type="button"
              onClick={() => setSelectedExperience(null)}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-black text-white"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <CampHeader />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="grid gap-8 py-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                Trải nghiệm CampVibe
              </p>
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Biến chuyến đi thành một kỷ niệm đáng nhớ
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-400">
                Không chỉ đặt chỗ nghỉ, CampVibe cho phép khách chọn thêm các hoạt động ngoài trời,
                dịch vụ setup và combo trải nghiệm để chuyến glamping trọn vẹn hơn.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-5 py-3 text-sm font-black transition hover:-translate-y-1 ${
                      activeCategory === category
                        ? "border-emerald-300 bg-emerald-400 text-stone-950 shadow-lg shadow-emerald-400/20"
                        : "border-white/15 bg-white/[0.04] text-white hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="camp-card camp-glow rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                {["BBQ", "Lửa trại", "Picnic", "SUP"].map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-[1.8rem] p-6 ${
                      index === 0 ? "bg-emerald-400 text-stone-950" : "bg-stone-950/70 text-white"
                    }`}
                  >
                    <p className="text-4xl font-black">{index + 1}</p>
                    <p className="mt-8 text-xl font-black">{item}</p>
                    <p className={`mt-2 text-sm ${index === 0 ? "text-stone-800" : "text-stone-400"}`}>
                      Dịch vụ được nhiều khách chọn
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {isLoading && (
              <div className="col-span-full rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center text-lg font-black text-emerald-200">
                Đang tải danh sách trải nghiệm...
              </div>
            )}
            {filteredExperiences.map((item) => (
              <article
                key={item.title}
                className="camp-card group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-xl shadow-black/10 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-emerald-300/30 hover:bg-white/[0.09]"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="camp-image h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>
                  <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-950/80 text-2xl shadow-lg">
                    {item.icon}
                  </div>
                  <span className="absolute right-5 top-5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-black text-stone-950">
                    {item.category}
                  </span>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-black">{item.title}</h2>
                  <p className="mt-3 min-h-[96px] text-sm leading-7 text-stone-400">{item.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.includes.map((tag) => (
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
                      <p className="text-xs text-stone-500">Giá dịch vụ</p>
                      <p className="text-2xl font-black text-emerald-300">{item.price}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddExperience(item)}
                      className="rounded-full border border-white/15 px-5 py-3 text-sm font-black transition hover:bg-white/10"
                    >
                      Lưu lựa chọn
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="mt-16 rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/20 backdrop-blur md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                  Quy trình chọn trải nghiệm
                </p>
                <h2 className="text-4xl font-black leading-tight md:text-5xl">
                  Dễ chọn, dễ thêm vào chuyến đi
                </h2>
                <p className="mt-5 text-lg leading-8 text-stone-400">
                  Bạn có thể chọn thêm BBQ, lửa trại, picnic hoặc các hoạt động ngoài trời để chuyến đi đầy đủ hơn.
                </p>
              </div>

              <div className="grid gap-5">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="rounded-[1.7rem] border border-white/10 bg-stone-950/60 p-6 transition hover:border-emerald-300/30"
                  >
                    <div className="flex gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 font-black text-stone-950">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-xl font-black">{step.title}</h3>
                        <p className="mt-2 leading-7 text-stone-400">{step.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
                <ContentBoost variant="general" />
      </main>
    </div>
  )
}

export default ExperiencesPage