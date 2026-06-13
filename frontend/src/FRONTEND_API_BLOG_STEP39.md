# Step 39 - Frontend gọi API Blog từ Backend

## Đã làm

- `/blog` gọi `blogService.getBlogPosts()`.
- `/blog/:id` gọi `blogService.getBlogPostDetail(id)`.
- Có fallback về `src/data/blogPosts.js` nếu backend tắt.
- Blog API lấy dữ liệu từ PostgreSQL.

## Test

```text
http://localhost:3000/api/blog-posts
http://localhost:3000/api/blog-posts/1
http://localhost:5173/blog
http://localhost:5173/blog/1
```
