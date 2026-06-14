import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CampHeader from "../components/CampHeader"
import { useToast } from "../components/ToastProvider"
import { getAdminSession, isAdminLoggedIn } from "../services/authService"
import {
  createAdminBlogPost,
  createAdminExperience,
  createAdminPlace,
  getAdminContent,
  updateAdminBlogPost,
  updateAdminBlogPostStatus,
  updateAdminExperience,
  updateAdminExperienceStatus,
  updateAdminPlace,
  updateAdminPlaceStatus,
  updateAdminUserStatus,
} from "../services/adminContentService"

const defaultImage = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"

const emptyPlace = {
  id: "",
  name: "",
  location: "",
  price: 990000,
  rating: 4.8,
  reviewsCount: 0,
  type: "Glamping",
  imageUrl: defaultImage,
  description: "",
  status: "active",
}

const emptyExperience = {
  id: "",
  title: "",
  category: "Trải nghiệm",
  price: 350000,
  imageUrl: defaultImage,
  description: "",
  status: "active",
}

const emptyBlog = {
  id: "",
  title: "",
  category: "Cẩm nang",
  excerpt: "",
  content: "",
  imageUrl: defaultImage,
  readTime: "6 phút đọc",
  status: "published",
}

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")}đ`
}

function statusLabel(status, type = "content") {
  const labels = {
    active: "Đang hiển thị",
    inactive: "Đang ẩn",
    published: "Đã đăng",
    draft: "Bản nháp",
    locked: "Đã khóa",
  }

  if (type === "user" && status === "active") return "Hoạt động"
  return labels[status] || status
}

function statusClass(status) {
  return {
    active: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    published: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    inactive: "border-stone-300/20 bg-stone-300/10 text-stone-300",
    draft: "border-yellow-300/30 bg-yellow-300/10 text-yellow-200",
    locked: "border-red-300/30 bg-red-300/10 text-red-200",
  }[status] || "border-white/10 bg-white/5 text-stone-300"
}

function Field({ label, value, onChange, type = "text", textarea = false, rows = 3, placeholder = "" }) {
  const className = "w-full rounded-2xl border border-white/10 bg-stone-950/80 px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-emerald-300/50"

  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">{label}</span>
      {textarea ? (
        <textarea
          rows={rows}
          value={value || ""}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${className} mt-2 resize-none leading-7`}
        />
      ) : (
        <input
          type={type}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(event) => onChange(type === "number" ? Number(event.target.value) : event.target.value)}
          className={`${className} mt-2`}
        />
      )}
    </label>
  )
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-stone-950/80 px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-emerald-300/50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  )
}

function AdminContentPage() {
  const toast = useToast()
  const navigate = useNavigate()
  const adminSession = getAdminSession()

  const [activeTab, setActiveTab] = useState("places")
  const [content, setContent] = useState({
    places: [],
    experiences: [],
    blogPosts: [],
    users: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [placeForm, setPlaceForm] = useState(emptyPlace)
  const [experienceForm, setExperienceForm] = useState(emptyExperience)
  const [blogForm, setBlogForm] = useState(emptyBlog)

  async function loadContent() {
    try {
      setIsLoading(true)
      setErrorMessage("")
      const data = await getAdminContent()
      setContent({
        places: data.places || [],
        experiences: data.experiences || [],
        blogPosts: data.blogPosts || [],
        users: data.users || [],
      })
    } catch (error) {
      setErrorMessage(error.message || "Không thể tải dữ liệu quản trị")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate("/admin-login")
      return
    }

    loadContent()
  }, [navigate])

  const stats = useMemo(() => {
    return {
      placesActive: content.places.filter((item) => item.status === "active").length,
      experiencesActive: content.experiences.filter((item) => item.status === "active").length,
      postsPublished: content.blogPosts.filter((item) => item.status === "published").length,
      lockedUsers: content.users.filter((item) => item.status === "locked").length,
    }
  }, [content])

  function updatePlaceForm(key, value) {
    setPlaceForm((prev) => ({ ...prev, [key]: value }))
  }

  function updateExperienceForm(key, value) {
    setExperienceForm((prev) => ({ ...prev, [key]: value }))
  }

  function updateBlogForm(key, value) {
    setBlogForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSavePlace() {
    try {
      setSaving(true)
      const saved = placeForm.id
        ? await updateAdminPlace(placeForm.id, placeForm)
        : await createAdminPlace(placeForm)

      setContent((prev) => ({
        ...prev,
        places: placeForm.id
          ? prev.places.map((item) => (String(item.id) === String(saved.id) ? saved : item))
          : [...prev.places, saved],
      }))
      setPlaceForm(emptyPlace)
      toast.success("Đã lưu địa điểm", "Nội dung địa điểm sẽ ảnh hưởng trực tiếp tới trang người dùng.")
    } catch (error) {
      toast.error("Chưa lưu được", error.message || "Vui lòng thử lại.")
    } finally {
      setSaving(false)
    }
  }

  async function handlePlaceStatus(item) {
    try {
      const nextStatus = item.status === "active" ? "inactive" : "active"
      const saved = await updateAdminPlaceStatus(item.id, nextStatus)
      setContent((prev) => ({
        ...prev,
        places: prev.places.map((place) => (String(place.id) === String(saved.id) ? saved : place)),
      }))
      toast.success(nextStatus === "active" ? "Đã hiển thị địa điểm" : "Đã ẩn địa điểm", "Danh sách địa điểm ngoài website đã được cập nhật.")
    } catch (error) {
      toast.error("Chưa cập nhật được", error.message || "Vui lòng thử lại.")
    }
  }

  async function handleSaveExperience() {
    try {
      setSaving(true)
      const saved = experienceForm.id
        ? await updateAdminExperience(experienceForm.id, experienceForm)
        : await createAdminExperience(experienceForm)

      setContent((prev) => ({
        ...prev,
        experiences: experienceForm.id
          ? prev.experiences.map((item) => (String(item.id) === String(saved.id) ? saved : item))
          : [...prev.experiences, saved],
      }))
      setExperienceForm(emptyExperience)
      toast.success("Đã lưu trải nghiệm", "Trang trải nghiệm ngoài website đã được cập nhật.")
    } catch (error) {
      toast.error("Chưa lưu được", error.message || "Vui lòng thử lại.")
    } finally {
      setSaving(false)
    }
  }

  async function handleExperienceStatus(item) {
    try {
      const nextStatus = item.status === "active" ? "inactive" : "active"
      const saved = await updateAdminExperienceStatus(item.id, nextStatus)
      setContent((prev) => ({
        ...prev,
        experiences: prev.experiences.map((experience) => (String(experience.id) === String(saved.id) ? saved : experience)),
      }))
      toast.success(nextStatus === "active" ? "Đã hiển thị trải nghiệm" : "Đã ẩn trải nghiệm")
    } catch (error) {
      toast.error("Chưa cập nhật được", error.message || "Vui lòng thử lại.")
    }
  }

  async function handleSaveBlog() {
    try {
      setSaving(true)
      const saved = blogForm.id
        ? await updateAdminBlogPost(blogForm.id, blogForm)
        : await createAdminBlogPost(blogForm)

      setContent((prev) => ({
        ...prev,
        blogPosts: blogForm.id
          ? prev.blogPosts.map((item) => (String(item.id) === String(saved.id) ? saved : item))
          : [...prev.blogPosts, saved],
      }))
      setBlogForm(emptyBlog)
      toast.success("Đã lưu bài viết", "Trang blog ngoài website đã được cập nhật.")
    } catch (error) {
      toast.error("Chưa lưu được", error.message || "Vui lòng thử lại.")
    } finally {
      setSaving(false)
    }
  }

  async function handleBlogStatus(item) {
    try {
      const nextStatus = item.status === "published" ? "draft" : "published"
      const saved = await updateAdminBlogPostStatus(item.id, nextStatus)
      setContent((prev) => ({
        ...prev,
        blogPosts: prev.blogPosts.map((post) => (String(post.id) === String(saved.id) ? saved : post)),
      }))
      toast.success(nextStatus === "published" ? "Đã đăng bài viết" : "Đã chuyển bài viết về bản nháp")
    } catch (error) {
      toast.error("Chưa cập nhật được", error.message || "Vui lòng thử lại.")
    }
  }

  async function handleUserStatus(user) {
    try {
      const nextStatus = user.status === "active" ? "locked" : "active"
      const saved = await updateAdminUserStatus(user.id, nextStatus)
      setContent((prev) => ({
        ...prev,
        users: prev.users.map((item) => (String(item.id) === String(saved.id) ? saved : item)),
      }))
      toast.success(nextStatus === "active" ? "Đã mở khóa tài khoản" : "Đã khóa tài khoản")
    } catch (error) {
      toast.error("Chưa cập nhật được", error.message || "Vui lòng thử lại.")
    }
  }

  const tabs = [
    { id: "places", label: "Địa điểm", count: content.places.length },
    { id: "experiences", label: "Trải nghiệm", count: content.experiences.length },
    { id: "blog", label: "Blog", count: content.blogPosts.length },
    { id: "users", label: "Khách hàng", count: content.users.length },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader mode="admin" />

      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39924,transparent_34%),radial-gradient(circle_at_bottom_right,#f59e0b1d,transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="py-8">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-emerald-300">Quản trị nội dung</p>
            <h1 className="camp-page-title max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Admin tác động trực tiếp lên website
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-400">
              Quản lý địa điểm, trải nghiệm, bài viết và tài khoản khách hàng. Khi admin ẩn/hiện hoặc chỉnh sửa nội dung, dữ liệu sẽ được cập nhật trong PostgreSQL và phản ánh trên trang người dùng.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={loadContent} className="camp-btn camp-btn-primary px-6 py-3 text-sm">
                Làm mới dữ liệu
              </button>
              <Link to="/admin/dashboard" className="camp-btn camp-btn-secondary px-6 py-3 text-sm">
                Về tổng quan
              </Link>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-4">
            <div className="rounded-[1.7rem] border border-emerald-300/20 bg-emerald-300/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">Địa điểm hiển thị</p>
              <p className="mt-3 text-4xl font-black">{stats.placesActive}</p>
            </div>
            <div className="rounded-[1.7rem] border border-sky-300/20 bg-sky-300/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-300">Trải nghiệm hiển thị</p>
              <p className="mt-3 text-4xl font-black">{stats.experiencesActive}</p>
            </div>
            <div className="rounded-[1.7rem] border border-yellow-300/20 bg-yellow-300/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">Bài viết đã đăng</p>
              <p className="mt-3 text-4xl font-black">{stats.postsPublished}</p>
            </div>
            <div className="rounded-[1.7rem] border border-red-300/20 bg-red-300/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-300">Tài khoản khóa</p>
              <p className="mt-3 text-4xl font-black">{stats.lockedUsers}</p>
            </div>
          </section>

          <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/20">
            <div className="flex flex-wrap gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full border px-5 py-3 text-sm font-black transition ${
                    activeTab === tab.id
                      ? "border-emerald-300 bg-emerald-400 text-stone-950"
                      : "border-white/10 bg-stone-950/60 text-stone-300 hover:border-emerald-300/40"
                  }`}
                >
                  {tab.label} <span className="opacity-70">({tab.count})</span>
                </button>
              ))}
            </div>
          </section>

          {errorMessage && (
            <div className="mt-6 rounded-2xl border border-red-300/30 bg-red-400/10 p-5 text-red-100">
              {errorMessage}
            </div>
          )}

          {isLoading ? (
            <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.055] p-8">
              <p className="text-stone-400">Đang tải dữ liệu quản trị...</p>
            </section>
          ) : (
            <>
              {activeTab === "places" && (
                <section className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6">
                    <h2 className="text-2xl font-black">{placeForm.id ? "Sửa địa điểm" : "Thêm địa điểm"}</h2>
                    <div className="mt-6 grid gap-4">
                      <Field label="Tên địa điểm" value={placeForm.name} onChange={(value) => updatePlaceForm("name", value)} />
                      <Field label="Vị trí" value={placeForm.location} onChange={(value) => updatePlaceForm("location", value)} />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Giá" type="number" value={placeForm.price} onChange={(value) => updatePlaceForm("price", value)} />
                        <Field label="Đánh giá" type="number" value={placeForm.rating} onChange={(value) => updatePlaceForm("rating", value)} />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Lượt đánh giá" type="number" value={placeForm.reviewsCount} onChange={(value) => updatePlaceForm("reviewsCount", value)} />
                        <Field label="Loại hình" value={placeForm.type} onChange={(value) => updatePlaceForm("type", value)} />
                      </div>
                      <Field label="Ảnh URL" value={placeForm.imageUrl} onChange={(value) => updatePlaceForm("imageUrl", value)} />
                      <Field label="Mô tả" textarea rows={5} value={placeForm.description} onChange={(value) => updatePlaceForm("description", value)} />
                      <SelectField
                        label="Trạng thái"
                        value={placeForm.status}
                        onChange={(value) => updatePlaceForm("status", value)}
                        options={[
                          { value: "active", label: "Hiển thị ngoài website" },
                          { value: "inactive", label: "Ẩn khỏi trang người dùng" },
                        ]}
                      />
                      <div className="flex flex-wrap gap-3">
                        <button disabled={saving} onClick={handleSavePlace} className="camp-btn camp-btn-primary px-6 py-3 text-sm">
                          {saving ? "Đang lưu..." : "Lưu địa điểm"}
                        </button>
                        <button onClick={() => setPlaceForm(emptyPlace)} className="camp-btn camp-btn-secondary px-6 py-3 text-sm">
                          Làm mới form
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {content.places.map((item) => (
                      <article key={item.id} className="rounded-[2rem] border border-white/10 bg-stone-950/70 p-5">
                        <div className="flex flex-col gap-5 xl:flex-row">
                          <img src={item.imageUrl || defaultImage} alt={item.name} className="h-36 w-full rounded-3xl object-cover xl:w-56" />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">PLACE-{item.id}</p>
                                <h3 className="mt-2 text-2xl font-black">{item.name}</h3>
                                <p className="mt-1 text-stone-400">{item.location}</p>
                              </div>
                              <span className={`rounded-full border px-3 py-1.5 text-xs font-black ${statusClass(item.status)}`}>
                                {statusLabel(item.status)}
                              </span>
                            </div>
                            <p className="mt-3 line-clamp-2 text-sm leading-7 text-stone-400">{item.description}</p>
                            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                              <span className="font-black text-emerald-300">{formatMoney(item.price)}</span>
                              <span className="text-stone-500">•</span>
                              <span>{item.type}</span>
                              <span className="text-stone-500">•</span>
                              <span>⭐ {item.rating}</span>
                            </div>
                            <div className="mt-5 flex flex-wrap gap-3">
                              <button onClick={() => setPlaceForm(item)} className="camp-btn camp-btn-secondary px-5 py-3 text-xs">Sửa</button>
                              <button onClick={() => handlePlaceStatus(item)} className="camp-btn camp-btn-ghost px-5 py-3 text-xs">
                                {item.status === "active" ? "Ẩn khỏi web" : "Hiển thị lại"}
                              </button>
                              <Link to={`/places/${item.id}`} className="camp-btn camp-btn-ghost px-5 py-3 text-xs">Xem ngoài web</Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === "experiences" && (
                <section className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6">
                    <h2 className="text-2xl font-black">{experienceForm.id ? "Sửa trải nghiệm" : "Thêm trải nghiệm"}</h2>
                    <div className="mt-6 grid gap-4">
                      <Field label="Tên trải nghiệm" value={experienceForm.title} onChange={(value) => updateExperienceForm("title", value)} />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Danh mục" value={experienceForm.category} onChange={(value) => updateExperienceForm("category", value)} />
                        <Field label="Giá" type="number" value={experienceForm.price} onChange={(value) => updateExperienceForm("price", value)} />
                      </div>
                      <Field label="Ảnh URL" value={experienceForm.imageUrl} onChange={(value) => updateExperienceForm("imageUrl", value)} />
                      <Field label="Mô tả" textarea rows={5} value={experienceForm.description} onChange={(value) => updateExperienceForm("description", value)} />
                      <SelectField
                        label="Trạng thái"
                        value={experienceForm.status}
                        onChange={(value) => updateExperienceForm("status", value)}
                        options={[
                          { value: "active", label: "Hiển thị ngoài website" },
                          { value: "inactive", label: "Ẩn khỏi trang người dùng" },
                        ]}
                      />
                      <div className="flex flex-wrap gap-3">
                        <button disabled={saving} onClick={handleSaveExperience} className="camp-btn camp-btn-primary px-6 py-3 text-sm">
                          {saving ? "Đang lưu..." : "Lưu trải nghiệm"}
                        </button>
                        <button onClick={() => setExperienceForm(emptyExperience)} className="camp-btn camp-btn-secondary px-6 py-3 text-sm">
                          Làm mới form
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {content.experiences.map((item) => (
                      <article key={item.id} className="rounded-[2rem] border border-white/10 bg-stone-950/70 p-5">
                        <div className="flex flex-col gap-5 xl:flex-row">
                          <img src={item.imageUrl || defaultImage} alt={item.title} className="h-32 w-full rounded-3xl object-cover xl:w-52" />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">EXP-{item.id}</p>
                                <h3 className="mt-2 text-2xl font-black">{item.title}</h3>
                                <p className="mt-1 text-stone-400">{item.category}</p>
                              </div>
                              <span className={`rounded-full border px-3 py-1.5 text-xs font-black ${statusClass(item.status)}`}>
                                {statusLabel(item.status)}
                              </span>
                            </div>
                            <p className="mt-3 line-clamp-2 text-sm leading-7 text-stone-400">{item.description}</p>
                            <p className="mt-3 font-black text-emerald-300">{formatMoney(item.price)}</p>
                            <div className="mt-5 flex flex-wrap gap-3">
                              <button onClick={() => setExperienceForm(item)} className="camp-btn camp-btn-secondary px-5 py-3 text-xs">Sửa</button>
                              <button onClick={() => handleExperienceStatus(item)} className="camp-btn camp-btn-ghost px-5 py-3 text-xs">
                                {item.status === "active" ? "Ẩn khỏi web" : "Hiển thị lại"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === "blog" && (
                <section className="mt-8 grid gap-6 lg:grid-cols-[460px_1fr]">
                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6">
                    <h2 className="text-2xl font-black">{blogForm.id ? "Sửa bài viết" : "Thêm bài viết"}</h2>
                    <div className="mt-6 grid gap-4">
                      <Field label="Tiêu đề" value={blogForm.title} onChange={(value) => updateBlogForm("title", value)} />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Danh mục" value={blogForm.category} onChange={(value) => updateBlogForm("category", value)} />
                        <Field label="Thời gian đọc" value={blogForm.readTime} onChange={(value) => updateBlogForm("readTime", value)} />
                      </div>
                      <Field label="Ảnh URL" value={blogForm.imageUrl} onChange={(value) => updateBlogForm("imageUrl", value)} />
                      <Field label="Tóm tắt" textarea rows={3} value={blogForm.excerpt} onChange={(value) => updateBlogForm("excerpt", value)} />
                      <Field label="Nội dung bài viết" textarea rows={7} value={blogForm.content} onChange={(value) => updateBlogForm("content", value)} />
                      <SelectField
                        label="Trạng thái"
                        value={blogForm.status}
                        onChange={(value) => updateBlogForm("status", value)}
                        options={[
                          { value: "published", label: "Đăng ngoài website" },
                          { value: "draft", label: "Lưu bản nháp / Ẩn" },
                        ]}
                      />
                      <div className="flex flex-wrap gap-3">
                        <button disabled={saving} onClick={handleSaveBlog} className="camp-btn camp-btn-primary px-6 py-3 text-sm">
                          {saving ? "Đang lưu..." : "Lưu bài viết"}
                        </button>
                        <button onClick={() => setBlogForm(emptyBlog)} className="camp-btn camp-btn-secondary px-6 py-3 text-sm">
                          Làm mới form
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {content.blogPosts.map((item) => (
                      <article key={item.id} className="rounded-[2rem] border border-white/10 bg-stone-950/70 p-5">
                        <div className="flex flex-col gap-5 xl:flex-row">
                          <img src={item.imageUrl || defaultImage} alt={item.title} className="h-32 w-full rounded-3xl object-cover xl:w-52" />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">POST-{item.id}</p>
                                <h3 className="mt-2 text-2xl font-black">{item.title}</h3>
                                <p className="mt-1 text-stone-400">{item.category} • {item.readTime}</p>
                              </div>
                              <span className={`rounded-full border px-3 py-1.5 text-xs font-black ${statusClass(item.status)}`}>
                                {statusLabel(item.status)}
                              </span>
                            </div>
                            <p className="mt-3 line-clamp-2 text-sm leading-7 text-stone-400">{item.excerpt}</p>
                            <div className="mt-5 flex flex-wrap gap-3">
                              <button onClick={() => setBlogForm(item)} className="camp-btn camp-btn-secondary px-5 py-3 text-xs">Sửa</button>
                              <button onClick={() => handleBlogStatus(item)} className="camp-btn camp-btn-ghost px-5 py-3 text-xs">
                                {item.status === "published" ? "Ẩn bài" : "Đăng bài"}
                              </button>
                              <Link to={`/blog/${item.id}`} className="camp-btn camp-btn-ghost px-5 py-3 text-xs">Xem ngoài web</Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === "users" && (
                <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.055] p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black">Quản lý tài khoản</h2>
                      <p className="mt-2 text-stone-400">Admin có thể khóa/mở khóa tài khoản khách hàng. Tài khoản bị khóa sẽ không đăng nhập được.</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {content.users.map((user) => (
                      <article key={user.id} className="rounded-[1.5rem] border border-white/10 bg-stone-950/70 p-5">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
                              {user.role === "admin" ? "Admin" : "Khách hàng"} #{user.id}
                            </p>
                            <h3 className="mt-2 text-xl font-black">{user.fullName}</h3>
                            <p className="mt-1 text-sm text-stone-400">{user.email} • {user.phone || "Chưa có SĐT"}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className={`rounded-full border px-3 py-1.5 text-xs font-black ${statusClass(user.status)}`}>
                              {statusLabel(user.status, "user")}
                            </span>
                            <button
                              type="button"
                              disabled={user.role === "admin"}
                              onClick={() => handleUserStatus(user)}
                              className="camp-btn camp-btn-secondary px-5 py-3 text-xs disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {user.status === "active" ? "Khóa tài khoản" : "Mở khóa"}
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminContentPage
