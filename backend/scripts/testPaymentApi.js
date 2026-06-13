const API_BASE = "http://localhost:3000/api"

async function testPaymentApi() {
  const bookingId = process.argv[2] || "1"

  const getResponse = await fetch(`${API_BASE}/bookings/${bookingId}/payment`)
  const getData = await getResponse.json().catch(() => ({}))

  console.log("GET payment status:", getResponse.status)
  console.log(getData)

  if (getResponse.status === 404) {
    console.log("❌ API payment vẫn chưa được đăng ký đúng.")
    process.exitCode = 1
    return
  }

  console.log("✅ API payment đã phản hồi.")
}

testPaymentApi().catch((error) => {
  console.error("❌ Không gọi được API payment:", error)
  process.exitCode = 1
})
