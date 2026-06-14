import { pool } from "../config/db.js"

function formatPriceText(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")}đ`
}

function slugify(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function mapPlace(row) {
  return {
    id: String(row.id),
    name: row.name,
    location: row.location,
    price: Number(row.price || 0),
    priceText: row.price_text || formatPriceText(row.price),
    rating: Number(row.rating || 0),
    reviewsCount: Number(row.reviews_count || 0),
    type: row.type || "",
    imageUrl: row.image_url || "",
    description: row.description || "",
    status: row.status || "active",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function mapExperience(row) {
  return {
    id: String(row.id),
    title: row.title,
    category: row.category || "",
    price: Number(row.price || 0),
    priceText: formatPriceText(row.price),
    imageUrl: row.image_url || "",
    description: row.description || "",
    status: row.status || "active",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function mapBlogPost(row) {
  return {
    id: String(row.id),
    title: row.title,
    slug: row.slug,
    category: row.category || "",
    excerpt: row.excerpt || "",
    content: row.content || "",
    imageUrl: row.image_url || "",
    readTime: row.read_time || "",
    status: row.status || "draft",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function mapUser(row) {
  return {
    id: String(row.id),
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    role: row.role,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function isValidStatus(status, allowed, fallback) {
  return allowed.includes(status) ? status : fallback
}

export async function getAdminContent(req, res, next) {
  try {
    const [places, experiences, blogPosts, users] = await Promise.all([
      pool.query(`
        SELECT id, name, location, price, price_text, rating, reviews_count, type, image_url, description, status, created_at, updated_at
        FROM places
        ORDER BY id ASC
      `),
      pool.query(`
        SELECT id, title, category, price, image_url, description, status, created_at, updated_at
        FROM experiences
        ORDER BY id ASC
      `),
      pool.query(`
        SELECT id, title, slug, category, excerpt, content, image_url, read_time, status, created_at, updated_at
        FROM blog_posts
        ORDER BY id ASC
      `),
      pool.query(`
        SELECT id, full_name, email, phone, role, status, created_at, updated_at
        FROM users
        ORDER BY id ASC
      `),
    ])

    res.json({
      success: true,
      source: "postgresql",
      data: {
        places: places.rows.map(mapPlace),
        experiences: experiences.rows.map(mapExperience),
        blogPosts: blogPosts.rows.map(mapBlogPost),
        users: users.rows.map(mapUser),
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function createAdminPlace(req, res, next) {
  try {
    const {
      name,
      location,
      price = 0,
      rating = 4.8,
      reviewsCount = 0,
      type = "Glamping",
      imageUrl = "",
      description = "",
      status = "active",
    } = req.body

    if (!name || !location) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập tên và vị trí địa điểm" })
    }

    const result = await pool.query(
      `
        INSERT INTO places (name, location, price, price_text, rating, reviews_count, type, image_url, description, status)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING id, name, location, price, price_text, rating, reviews_count, type, image_url, description, status, created_at, updated_at
      `,
      [
        String(name).trim(),
        String(location).trim(),
        Number(price || 0),
        formatPriceText(price),
        Number(rating || 0),
        Number(reviewsCount || 0),
        String(type || "").trim(),
        String(imageUrl || "").trim(),
        String(description || "").trim(),
        isValidStatus(status, ["active", "inactive"], "active"),
      ]
    )

    res.status(201).json({ success: true, message: "Đã thêm địa điểm", data: mapPlace(result.rows[0]) })
  } catch (error) {
    next(error)
  }
}

export async function updateAdminPlace(req, res, next) {
  try {
    const { id } = req.params
    const {
      name,
      location,
      price = 0,
      rating = 4.8,
      reviewsCount = 0,
      type = "Glamping",
      imageUrl = "",
      description = "",
      status = "active",
    } = req.body

    if (!name || !location) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập tên và vị trí địa điểm" })
    }

    const result = await pool.query(
      `
        UPDATE places
        SET
          name = $1,
          location = $2,
          price = $3,
          price_text = $4,
          rating = $5,
          reviews_count = $6,
          type = $7,
          image_url = $8,
          description = $9,
          status = $10,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $11
        RETURNING id, name, location, price, price_text, rating, reviews_count, type, image_url, description, status, created_at, updated_at
      `,
      [
        String(name).trim(),
        String(location).trim(),
        Number(price || 0),
        formatPriceText(price),
        Number(rating || 0),
        Number(reviewsCount || 0),
        String(type || "").trim(),
        String(imageUrl || "").trim(),
        String(description || "").trim(),
        isValidStatus(status, ["active", "inactive"], "active"),
        id,
      ]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy địa điểm" })
    }

    res.json({ success: true, message: "Đã cập nhật địa điểm", data: mapPlace(result.rows[0]) })
  } catch (error) {
    next(error)
  }
}

export async function updateAdminPlaceStatus(req, res, next) {
  try {
    const { id } = req.params
    const status = isValidStatus(req.body.status, ["active", "inactive"], "active")

    const result = await pool.query(
      `
        UPDATE places
        SET status = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING id, name, location, price, price_text, rating, reviews_count, type, image_url, description, status, created_at, updated_at
      `,
      [status, id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy địa điểm" })
    }

    res.json({ success: true, message: "Đã cập nhật trạng thái địa điểm", data: mapPlace(result.rows[0]) })
  } catch (error) {
    next(error)
  }
}

export async function createAdminExperience(req, res, next) {
  try {
    const { title, category = "Trải nghiệm", price = 0, imageUrl = "", description = "", status = "active" } = req.body

    if (!title) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập tên trải nghiệm" })
    }

    const result = await pool.query(
      `
        INSERT INTO experiences (title, category, price, image_url, description, status)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING id, title, category, price, image_url, description, status, created_at, updated_at
      `,
      [
        String(title).trim(),
        String(category || "").trim(),
        Number(price || 0),
        String(imageUrl || "").trim(),
        String(description || "").trim(),
        isValidStatus(status, ["active", "inactive"], "active"),
      ]
    )

    res.status(201).json({ success: true, message: "Đã thêm trải nghiệm", data: mapExperience(result.rows[0]) })
  } catch (error) {
    next(error)
  }
}

export async function updateAdminExperience(req, res, next) {
  try {
    const { id } = req.params
    const { title, category = "Trải nghiệm", price = 0, imageUrl = "", description = "", status = "active" } = req.body

    if (!title) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập tên trải nghiệm" })
    }

    const result = await pool.query(
      `
        UPDATE experiences
        SET title=$1, category=$2, price=$3, image_url=$4, description=$5, status=$6, updated_at=CURRENT_TIMESTAMP
        WHERE id=$7
        RETURNING id, title, category, price, image_url, description, status, created_at, updated_at
      `,
      [
        String(title).trim(),
        String(category || "").trim(),
        Number(price || 0),
        String(imageUrl || "").trim(),
        String(description || "").trim(),
        isValidStatus(status, ["active", "inactive"], "active"),
        id,
      ]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy trải nghiệm" })
    }

    res.json({ success: true, message: "Đã cập nhật trải nghiệm", data: mapExperience(result.rows[0]) })
  } catch (error) {
    next(error)
  }
}

export async function updateAdminExperienceStatus(req, res, next) {
  try {
    const { id } = req.params
    const status = isValidStatus(req.body.status, ["active", "inactive"], "active")

    const result = await pool.query(
      `
        UPDATE experiences
        SET status=$1, updated_at=CURRENT_TIMESTAMP
        WHERE id=$2
        RETURNING id, title, category, price, image_url, description, status, created_at, updated_at
      `,
      [status, id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy trải nghiệm" })
    }

    res.json({ success: true, message: "Đã cập nhật trạng thái trải nghiệm", data: mapExperience(result.rows[0]) })
  } catch (error) {
    next(error)
  }
}

export async function createAdminBlogPost(req, res, next) {
  try {
    const {
      title,
      category = "Cẩm nang",
      excerpt = "",
      content = "",
      imageUrl = "",
      readTime = "6 phút đọc",
      status = "published",
    } = req.body

    if (!title) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập tiêu đề bài viết" })
    }

    const baseSlug = slugify(title) || `bai-viet-${Date.now()}`
    const slug = `${baseSlug}-${Date.now().toString().slice(-5)}`

    const result = await pool.query(
      `
        INSERT INTO blog_posts (title, slug, category, excerpt, content, image_url, read_time, status)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING id, title, slug, category, excerpt, content, image_url, read_time, status, created_at, updated_at
      `,
      [
        String(title).trim(),
        slug,
        String(category || "").trim(),
        String(excerpt || "").trim(),
        String(content || "").trim(),
        String(imageUrl || "").trim(),
        String(readTime || "").trim(),
        isValidStatus(status, ["published", "draft"], "published"),
      ]
    )

    res.status(201).json({ success: true, message: "Đã thêm bài viết", data: mapBlogPost(result.rows[0]) })
  } catch (error) {
    next(error)
  }
}

export async function updateAdminBlogPost(req, res, next) {
  try {
    const { id } = req.params
    const {
      title,
      category = "Cẩm nang",
      excerpt = "",
      content = "",
      imageUrl = "",
      readTime = "6 phút đọc",
      status = "published",
    } = req.body

    if (!title) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập tiêu đề bài viết" })
    }

    const result = await pool.query(
      `
        UPDATE blog_posts
        SET title=$1, category=$2, excerpt=$3, content=$4, image_url=$5, read_time=$6, status=$7, updated_at=CURRENT_TIMESTAMP
        WHERE id=$8
        RETURNING id, title, slug, category, excerpt, content, image_url, read_time, status, created_at, updated_at
      `,
      [
        String(title).trim(),
        String(category || "").trim(),
        String(excerpt || "").trim(),
        String(content || "").trim(),
        String(imageUrl || "").trim(),
        String(readTime || "").trim(),
        isValidStatus(status, ["published", "draft"], "published"),
        id,
      ]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" })
    }

    res.json({ success: true, message: "Đã cập nhật bài viết", data: mapBlogPost(result.rows[0]) })
  } catch (error) {
    next(error)
  }
}

export async function updateAdminBlogPostStatus(req, res, next) {
  try {
    const { id } = req.params
    const status = isValidStatus(req.body.status, ["published", "draft"], "published")

    const result = await pool.query(
      `
        UPDATE blog_posts
        SET status=$1, updated_at=CURRENT_TIMESTAMP
        WHERE id=$2
        RETURNING id, title, slug, category, excerpt, content, image_url, read_time, status, created_at, updated_at
      `,
      [status, id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" })
    }

    res.json({ success: true, message: "Đã cập nhật trạng thái bài viết", data: mapBlogPost(result.rows[0]) })
  } catch (error) {
    next(error)
  }
}

export async function updateAdminUserStatus(req, res, next) {
  try {
    const { id } = req.params
    const status = isValidStatus(req.body.status, ["active", "locked"], "active")

    const current = await pool.query(`SELECT id, role FROM users WHERE id = $1`, [id])
    if (current.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy tài khoản" })
    }

    if (current.rows[0].role === "admin" && status !== "active") {
      return res.status(400).json({ success: false, message: "Không khóa tài khoản admin chính trong bản demo" })
    }

    const result = await pool.query(
      `
        UPDATE users
        SET status=$1, updated_at=CURRENT_TIMESTAMP
        WHERE id=$2
        RETURNING id, full_name, email, phone, role, status, created_at, updated_at
      `,
      [status, id]
    )

    res.json({ success: true, message: "Đã cập nhật trạng thái tài khoản", data: mapUser(result.rows[0]) })
  } catch (error) {
    next(error)
  }
}
