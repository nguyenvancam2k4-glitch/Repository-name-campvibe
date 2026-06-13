const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api")

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}))

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Không thể xử lý yêu cầu thanh toán")
  }

  return data.data || data
}

export async function payBooking(bookingId, payload) {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  return parseResponse(response)
}

export async function getBookingPayment(bookingId) {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/payment`)
  return parseResponse(response)
}
