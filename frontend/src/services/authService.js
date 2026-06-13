function notifyAuthChange() {
  window.dispatchEvent(new Event("campvibe-auth-change"))
}

import { getApiUrl } from "../config/apiConfig"

const ADMIN_SESSION_KEY = "campvibe_admin_session"
const CUSTOMER_SESSION_KEY = "campvibe_customer_session"

export async function loginAdmin(email, password) {
  const response = await fetch(getApiUrl("/auth/admin-login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Đăng nhập thất bại")
  }

  const session = {
    token: result.token,
    user: result.data,
    loggedInAt: new Date().toISOString(),
  }

  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))

  return session
}

export async function registerCustomer(formData) {
  const response = await fetch(getApiUrl("/auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Đăng ký thất bại")
  }

  const session = {
    token: result.token,
    user: result.data,
    loggedInAt: new Date().toISOString(),
  }

  localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(session))

  return session
}

export async function loginCustomer(email, password) {
  const response = await fetch(getApiUrl("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Đăng nhập thất bại")
  }

  const session = {
    token: result.token,
    user: result.data,
    loggedInAt: new Date().toISOString(),
  }

  localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(session))

  return session
}

export function getCustomerSession() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOMER_SESSION_KEY) || "null")
  } catch {
    return null
  }
}

export function isCustomerLoggedIn() {
  const session = getCustomerSession()
  return Boolean(session?.token && session?.user?.role === "customer")
}

export function logoutCustomer() {
  localStorage.removeItem(CUSTOMER_SESSION_KEY)
}

export function getAdminSession() {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || "null")
  } catch {
    return null
  }
}

export function isAdminLoggedIn() {
  const session = getAdminSession()
  return Boolean(session?.token && session?.user?.role === "admin")
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_SESSION_KEY)
}
