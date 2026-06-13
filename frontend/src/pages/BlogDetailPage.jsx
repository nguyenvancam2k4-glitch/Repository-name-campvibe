import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getBlogPostDetail, getBlogPosts } from "../services/blogService"
import CampHeader from "../components/CampHeader"

function renderBlogParagraphs(content) {
  if (!content) return null

  return String(content)
    .split(/\n\s*\n/)
    .map((paragraph, index) => (
      <p key={index} className="mt-5 text-lg leading-9 text-stone-300">
        {paragraph.trim()}
      </p>
    ))
}


function BlogDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      setIsLoading(true)
      try {
        const [detail, posts] = await Promise.all([getBlogPostDetail(id), getBlogPosts()])
        setPost(detail)
        setRelatedPosts(posts.filter((item) => String(item.id) !== String(id)).slice(0, 3))
      } finally {
        setIsLoading(false)
      }
    }

    loadPost()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-white">
        <div className="text-center">
          <div className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-emerald-400"></div>
          <p className="text-xl font-black">Đang tải bài viết...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-black">Không tìm thấy bài viết</h1>
          <Link to="/blog" className="mt-6 inline-flex rounded-full bg-emerald-400 px-6 py-3 font-black text-stone-950">
            Quay lại Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="camp-page min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39928,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <Link
            to="/blog"
            className="mb-10 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            ← Quay lại Blog
          </Link>

          <section className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <span className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-stone-950">
                {post.category}
              </span>

              <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                {post.title}
              </h1>

              <p className="mt-6 text-stone-400">
                {post.date} · {post.readTime} · {post.author}
              </p>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-stone-300">{post.excerpt}</p>
            </div>

            <div className="camp-card camp-glow rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/30 backdrop-blur">
              <img
                src={post.imageUrl || post.image}
                alt={post.title}
                className="h-[360px] w-full rounded-[2rem] object-cover md:h-[520px]"
              />
            </div>
          </section>

          <section className="mx-auto mt-16 max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur md:p-10">
            <p className="text-lg leading-9 text-stone-300">{renderBlogParagraphs(post.content)}</p>

            <div className="mt-10 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
              <h2 className="text-2xl font-black text-emerald-200">Gợi ý từ CampVibe</h2>
              <p className="mt-3 leading-8 text-stone-300">
                Bạn có thể kết hợp bài viết này với trang Địa điểm và Trải nghiệm để chọn lịch trình phù hợp hơn.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/places" className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-stone-950">
                  Xem địa điểm
                </Link>
                <Link to="/experiences" className="rounded-full border border-white/15 px-5 py-3 text-sm font-black">
                  Xem trải nghiệm
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">Bài viết liên quan</p>
                <h2 className="mt-3 text-4xl font-black">Đọc thêm</h2>
              </div>
              <Link to="/blog" className="hidden rounded-full border border-white/15 px-6 py-3 text-sm font-black transition hover:bg-white/10 sm:inline-flex">
                Xem tất cả
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.id}`}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 transition hover:-translate-y-2 hover:border-emerald-300/30"
                >
                  <img src={item.imageUrl || item.image} alt={item.title} className="h-48 w-full rounded-[1.5rem] object-cover" />
                  <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-400">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
                <BlogDetailExtraGuide />
      </main>
    </div>
  )
}


function BlogDetailExtraGuide() {
  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-3">
      <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/10">
        <div className="mb-5 text-3xl">🧳</div>
        <h3 className="text-xl font-black text-white">Chuẩn bị trước chuyến đi</h3>
        <p className="mt-3 leading-7 text-stone-400">
          Kiểm tra thời tiết, thời gian nhận phòng, vật dụng cá nhân và các dịch vụ đã bao gồm trong giá.
        </p>
      </article>

      <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/10">
        <div className="mb-5 text-3xl">🌿</div>
        <h3 className="text-xl font-black text-white">Tận hưởng có trách nhiệm</h3>
        <p className="mt-3 leading-7 text-stone-400">
          Giữ gìn vệ sinh, tôn trọng không gian chung và hạn chế tiếng ồn để chuyến đi dễ chịu hơn cho mọi người.
        </p>
      </article>

      <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/10">
        <div className="mb-5 text-3xl">💬</div>
        <h3 className="text-xl font-black text-white">Cần tư vấn thêm?</h3>
        <p className="mt-3 leading-7 text-stone-400">
          Nếu chưa biết chọn địa điểm nào, bạn có thể gửi yêu cầu để CampVibe gợi ý theo nhu cầu của chuyến đi.
        </p>
      </article>
    </section>
  )
}


export default BlogDetailPage