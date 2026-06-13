function AdminMetricHint({ icon, title, children }) {
  return (
    <article className="camp-admin-card camp-card-hover rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/10">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-300/10 text-2xl">
        {icon}
      </div>
      <h3 className="font-black text-white">{title}</h3>
      <p className="mt-3 leading-7 text-stone-400">{children}</p>
    </article>
  )
}

function AdminOperationGuide({ type = "dashboard" }) {
  const content = {
    dashboard: {
      label: "Gợi ý vận hành",
      title: "Theo dõi tổng quan để ra quyết định nhanh hơn",
      items: [
        ["📈", "Nhìn nhanh số liệu", "Theo dõi tổng đơn, doanh thu, khách hàng và yêu cầu tư vấn trong một màn hình."],
        ["🧾", "Ưu tiên đơn mới", "Các đơn gần nhất nên được kiểm tra trước để phản hồi khách hàng kịp thời."],
        ["💬", "Không bỏ sót liên hệ", "Yêu cầu tư vấn mới cần được xử lý rõ trạng thái để đội ngũ dễ theo dõi."],
      ],
    },
    bookings: {
      label: "Quy trình xử lý đơn",
      title: "Quản lý đặt phòng rõ ràng và có trách nhiệm",
      items: [
        ["🟡", "Đơn đang chờ", "Kiểm tra thời gian, số khách, địa điểm và ghi chú của khách trước khi xác nhận."],
        ["✅", "Đơn đã xác nhận", "Khi lịch phù hợp, cập nhật trạng thái để khách hàng yên tâm theo dõi trong tài khoản."],
        ["❌", "Đơn đã hủy", "Chỉ hủy khi thông tin không hợp lệ, lịch không còn phù hợp hoặc khách yêu cầu thay đổi."],
      ],
    },
    contacts: {
      label: "Chăm sóc khách hàng",
      title: "Mỗi yêu cầu tư vấn cần được xử lý có trạng thái",
      items: [
        ["📩", "Yêu cầu mới", "Đọc kỹ nhu cầu, số khách, ngân sách và thời gian dự kiến của khách hàng."],
        ["📞", "Đã liên hệ", "Sau khi gọi hoặc nhắn tin tư vấn, cập nhật trạng thái để tránh xử lý trùng."],
        ["✨", "Đã hoàn tất", "Khi khách đã nhận đủ thông tin hoặc chuyển sang đặt phòng, đánh dấu hoàn tất."],
      ],
    },
  }

  const current = content[type] || content.dashboard

  return (
    <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-sky-300">{current.label}</p>
      <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">{current.title}</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {current.items.map(([icon, title, description]) => (
          <AdminMetricHint key={title} icon={icon} title={title}>
            {description}
          </AdminMetricHint>
        ))}
      </div>
    </section>
  )
}

export default AdminOperationGuide
