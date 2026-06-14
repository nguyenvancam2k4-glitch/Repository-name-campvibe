import { pool } from "../config/db.js"

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

export async function updateProfile(req, res, next) {
  try {
    const { id } = req.params
    const { fullName, phone } = req.body

    if (!fullName || String(fullName).trim().length < 2) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập họ tên hợp lệ" })
    }

    const result = await pool.query(
      `
        UPDATE users
        SET full_name = $1, phone = $2, updated_at = CURRENT_TIMESTAMP
        WHERE id = $3 AND role = 'customer' AND status = 'active'
        RETURNING id, full_name, email, phone, role, status, created_at, updated_at
      `,
      [String(fullName).trim(), String(phone || "").trim(), id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy tài khoản đang hoạt động" })
    }

    res.json({ success: true, message: "Đã cập nhật hồ sơ", data: mapUser(result.rows[0]) })
  } catch (error) {
    next(error)
  }
}

export async function changePassword(req, res, next) {
  try {
    const { id } = req.params
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ mật khẩu" })
    }

    if (String(newPassword).length < 6) {
      return res.status(400).json({ success: false, message: "Mật khẩu mới cần tối thiểu 6 ký tự" })
    }

    const userResult = await pool.query(
      `
        SELECT id, password_hash
        FROM users
        WHERE id = $1 AND role = 'customer' AND status = 'active'
        LIMIT 1
      `,
      [id]
    )

    if (userResult.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy tài khoản đang hoạt động" })
    }

    if (String(userResult.rows[0].password_hash) !== String(currentPassword)) {
      return res.status(401).json({ success: false, message: "Mật khẩu hiện tại không đúng" })
    }

    await pool.query(
      `
        UPDATE users
        SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `,
      [newPassword, id]
    )

    res.json({ success: true, message: "Đã đổi mật khẩu" })
  } catch (error) {
    next(error)
  }
}

export async function deactivateAccount(req, res, next) {
  try {
    const { id } = req.params
    const { password } = req.body

    if (!password) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập mật khẩu để xác nhận" })
    }

    const userResult = await pool.query(
      `
        SELECT id, password_hash
        FROM users
        WHERE id = $1 AND role = 'customer' AND status = 'active'
        LIMIT 1
      `,
      [id]
    )

    if (userResult.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy tài khoản đang hoạt động" })
    }

    if (String(userResult.rows[0].password_hash) !== String(password)) {
      return res.status(401).json({ success: false, message: "Mật khẩu xác nhận không đúng" })
    }

    const result = await pool.query(
      `
        UPDATE users
        SET status = 'locked', updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING id, full_name, email, phone, role, status, created_at, updated_at
      `,
      [id]
    )

    res.json({ success: true, message: "Tài khoản đã được tạm khóa", data: mapUser(result.rows[0]) })
  } catch (error) {
    next(error)
  }
}
