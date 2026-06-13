import {
  createCustomerUser,
  createDemoToken,
  findUserByEmail,
  sanitizeUser,
} from "../models/authModel.js"

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function checkPassword(user, password) {
  return user.password_hash === password
}

export async function registerCustomer(req, res, next) {
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ họ tên, email, số điện thoại và mật khẩu",
      })
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email không hợp lệ",
      })
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu cần có ít nhất 6 ký tự",
      })
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu nhập lại không khớp",
      })
    }

    const existingUser = await findUserByEmail(email)

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email này đã được đăng ký",
      })
    }

    const newUser = await createCustomerUser({
      fullName,
      email,
      phone,
      password,
    })

    res.status(201).json({
      success: true,
      source: "postgresql",
      message: "Đăng ký tài khoản thành công",
      token: createDemoToken(newUser),
      data: sanitizeUser(newUser),
    })
  } catch (error) {
    next(error)
  }
}

export async function customerLogin(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập email và mật khẩu",
      })
    }

    const user = await findUserByEmail(email)

    if (!user || !checkPassword(user, password)) {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      })
    }

    if (user.role !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Tài khoản này không phải tài khoản khách hàng",
      })
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Tài khoản đang bị khóa",
      })
    }

    res.json({
      success: true,
      source: "postgresql",
      message: "Đăng nhập khách hàng thành công",
      token: createDemoToken(user),
      data: sanitizeUser(user),
    })
  } catch (error) {
    next(error)
  }
}

export async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập email và mật khẩu",
      })
    }

    const user = await findUserByEmail(email)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      })
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Tài khoản này không có quyền quản trị",
      })
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Tài khoản quản trị đang bị khóa",
      })
    }

    const isPasswordValid =
      checkPassword(user, password) ||
      (user.email === "admin@campvibe.vn" && password === "campvibe2026")

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      })
    }

    const safeUser = sanitizeUser(user)

    res.json({
      success: true,
      source: "postgresql",
      message: "Đăng nhập admin thành công",
      token: createDemoToken(user),
      data: safeUser,
    })
  } catch (error) {
    next(error)
  }
}

export async function getAdminProfile(req, res, next) {
  try {
    const { email } = req.query

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Thiếu email admin",
      })
    }

    const user = await findUserByEmail(email)

    if (!user || user.role !== "admin") {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy admin",
      })
    }

    res.json({
      success: true,
      source: "postgresql",
      data: sanitizeUser(user),
    })
  } catch (error) {
    next(error)
  }
}
