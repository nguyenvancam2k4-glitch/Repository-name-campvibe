import { pool } from "../config/db.js"

function mapBlogRow(row) {
  return {
    id: String(row.id),
    title: row.title,
    slug: row.slug,
    category: row.category,
    excerpt: row.excerpt,
    content: row.content,
    imageUrl: row.image_url,
    readTime: row.read_time,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function findAllBlogPosts() {
  const result = await pool.query(`
    SELECT
      id,
      title,
      slug,
      category,
      excerpt,
      content,
      image_url,
      read_time,
      status,
      created_at,
      updated_at
    FROM blog_posts
    WHERE status = 'published'
    ORDER BY id ASC
  `)

  return result.rows.map(mapBlogRow)
}

export async function findBlogPostById(id) {
  const result = await pool.query(
    `
      SELECT
        id,
        title,
        slug,
        category,
        excerpt,
        content,
        image_url,
        read_time,
        status,
        created_at,
        updated_at
      FROM blog_posts
      WHERE id = $1
      LIMIT 1
    `,
    [id]
  )

  if (result.rows.length === 0) {
    return null
  }

  return mapBlogRow(result.rows[0])
}
