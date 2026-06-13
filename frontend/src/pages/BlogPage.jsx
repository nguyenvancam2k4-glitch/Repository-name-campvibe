import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getBlogPosts } from "../services/blogService"
import CampHeader from "../components/CampHeader"
import ContentBoost from "../components/ContentBoost"

const categories = ["Tất cả", "Kinh nghiệm", "Địa điểm", "Trải nghiệm", "Chuẩn bị"]

function BlogPage() {
  const [posts, setPosts] = useState([])
  const [activeCategory, setActiveCategory] = useState("Tất cả")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getBlogPosts()
        setPosts(data)
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  const filteredPosts =
    activeCategory === "Tất cả"
      ? posts
      : posts.filter((post) => post.category === activeCategory)

  const featuredPost = filteredPosts[0]
  const otherPosts = filteredPosts.slice(1)

  return (
    <div className="camp-page min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                Cẩm nang CampVibe
              </p>
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Kinh nghiệm glamping, camping và nghỉ dưỡng ngoài trời
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-400">
                Các bài viết được biên soạn để giúp bạn chuẩn bị chuyến đi, chọn địa điểm và lên lịch trình
                chuẩn bị chuyến đi kỹ hơn và tận hưởng kỳ nghỉ ngoài trời một cách trọn vẹn.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {categories.map((category) => (
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

            {featuredPost && (
              <Link
                to={`/blog/${featuredPost.id}`}
                className="camp-card group relative min-h-[420px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/30 backdrop-blur transition hover:-translate-y-2"
              >
                <img
                  src={featuredPost.imageUrl || featuredPost.image}
                  alt={featuredPost.title}
                  className="camp-image h-full min-h-[390px] w-full rounded-[2rem] object-cover"
                />
                <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <span className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-black text-stone-950">
                    Bài viết nổi bật
                  </span>
                  <h2 className="mt-5 text-3xl font-black leading-tight">{featuredPost.title}</h2>
                  <p className="mt-3 text-stone-300">{featuredPost.excerpt}</p>
                </div>
              </Link>
            )}
          </section>

          <section className="mt-8">
            {isLoading && (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center text-lg font-black text-emerald-200">
                Đang tải bài viết...
              </div>
            )}

            {!isLoading && (
              <>
                <div className="mb-8 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                      Danh sách bài viết
                    </p>
                    <h2 className="mt-3 text-4xl font-black">{filteredPosts.length} bài viết</h2>
                  </div>
                  <p className="hidden text-sm text-stone-500 sm:block">Cập nhật: CampVibe</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {otherPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="camp-card group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-xl shadow-black/10 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-emerald-300/30 hover:bg-white/[0.09]"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img src={post.imageUrl || post.image} alt={post.title} className="camp-image h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>
                        <span className="absolute left-5 top-5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-black text-stone-950">
                          {post.category}
                        </span>
                      </div>

                      <div className="p-6">
                        <p className="text-sm text-stone-500">{post.date} · {post.readTime}</p>
                        <h3 className="mt-3 text-2xl font-black leading-tight">{post.title}</h3>
                        <p className="mt-3 min-h-[72px] text-sm leading-7 text-stone-400">{post.excerpt}</p>
                        <span className="mt-5 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-black transition group-hover:border-emerald-300/50 group-hover:bg-emerald-400 group-hover:text-stone-950">
                          Đọc bài viết →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
                <ContentBoost variant="general" />
      </main>
    </div>
  )
}

export default BlogPage