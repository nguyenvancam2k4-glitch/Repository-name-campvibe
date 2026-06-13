const API_BASE = "http://localhost:3000/api"

async function testPayBooking() {
  const bookingId = process.argv[2] || "7"

  const response = await fetch(`${API_BASE}/bookings/${bookingId}/pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      method: "bank_transfer",
      amount: 1250000,
    }),
  })

  const data = await response.json().catch(() => ({}))
  console.log("POST payment status:", response.status)
  console.log(data)

  if (!response.ok || data.success === false) {
    process.exitCode = 1
    return
  }

  console.log("✅ Test thanh toán thành công.")
}

testPayBooking().catch((error) => {
  console.error("❌ Không gọi được API thanh toán:", error)
  process.exitCode = 1
})
