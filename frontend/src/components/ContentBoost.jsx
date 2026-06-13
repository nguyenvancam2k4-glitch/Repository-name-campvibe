function FeatureCard({ icon, title, children }) {
  return (
    <article className="camp-card-hover rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/10 backdrop-blur">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-black text-white">{title}</h3>
      <p className="mt-3 leading-7 text-stone-400">{children}</p>
    </article>
  )
}

function FAQItem({ question, answer }) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-stone-950/70 p-5">
      <h3 className="font-black text-white">{question}</h3>
      <p className="mt-3 leading-7 text-stone-400">{answer}</p>
    </div>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Chọn điểm nghỉ phù hợp",
      text: "Tìm kiếm địa điểm theo khu vực, phong cách nghỉ dưỡng, mức giá và nhu cầu của chuyến đi.",
    },
    {
      number: "02",
      title: "Gửi yêu cầu đặt lịch",
      text: "Điền thông tin cơ bản, số khách, thời gian dự kiến và những ghi chú đặc biệt nếu cần.",
    },
    {
      number: "03",
      title: "Nhận tư vấn & xác nhận",
      text: "CampVibe tiếp nhận yêu cầu, kiểm tra lịch trống và hỗ trợ bạn hoàn thiện kế hoạch trước khi khởi hành.",
    },
  ]

  return (
    <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-emerald-300">Quy trình đặt lịch</p>
      <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Dễ hiểu, nhanh gọn và có người hỗ trợ</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {steps.map((step) => (
          <article key={step.number} className="rounded-[1.6rem] border border-white/10 bg-stone-950/70 p-6">
            <span className="text-4xl font-black text-emerald-300/80">{step.number}</span>
            <h3 className="mt-5 text-xl font-black text-white">{step.title}</h3>
            <p className="mt-3 leading-7 text-stone-400">{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function TrustSection() {
  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-7 shadow-2xl shadow-black/20 backdrop-blur">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-emerald-300">Vì sao chọn CampVibe</p>
        <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">Không chỉ là đặt phòng, mà là chuẩn bị một chuyến đi đáng nhớ</h2>
        <p className="mt-5 leading-8 text-stone-300">
          CampVibe tập trung vào trải nghiệm nghỉ dưỡng ngoài trời: không gian đẹp, thông tin dễ hiểu,
          thao tác đặt lịch thuận tiện và có hỗ trợ tư vấn để bạn tự tin hơn trước mỗi chuyến đi.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FeatureCard icon="🏕️" title="Địa điểm có chọn lọc">
          Các điểm nghỉ được trình bày rõ vị trí, phong cách, sức chứa, mức giá và trải nghiệm nổi bật.
        </FeatureCard>
        <FeatureCard icon="⚖️" title="Dễ so sánh trước khi đặt">
          Bạn có thể đặt các địa điểm cạnh nhau để cân nhắc giữa giá, rating, khu vực và loại hình nghỉ dưỡng.
        </FeatureCard>
        <FeatureCard icon="💬" title="Tư vấn theo nhu cầu">
          Phù hợp cho nhóm bạn, cặp đôi, gia đình nhỏ hoặc những ai muốn nghỉ ngơi gần thiên nhiên.
        </FeatureCard>
        <FeatureCard icon="✨" title="Trải nghiệm hiện đại">
          Giao diện được thiết kế để người dùng dễ tìm, dễ hiểu và dễ hoàn tất yêu cầu đặt lịch.
        </FeatureCard>
      </div>
    </section>
  )
}

function TravelIdeas() {
  return (
    <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-emerald-300">Gợi ý chuyến đi</p>
      <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Chọn trải nghiệm theo kiểu bạn muốn tận hưởng</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <FeatureCard icon="👫" title="Đi cùng người thương">
          Ưu tiên không gian yên tĩnh, view đẹp, riêng tư và có những hoạt động nhẹ nhàng vào buổi tối.
        </FeatureCard>
        <FeatureCard icon="🧑‍🤝‍🧑" title="Đi cùng nhóm bạn">
          Chọn nơi có BBQ, lửa trại, khu sinh hoạt chung và nhiều hoạt động để cả nhóm cùng tham gia.
        </FeatureCard>
        <FeatureCard icon="👨‍👩‍👧" title="Đi cùng gia đình">
          Nên chọn địa điểm dễ di chuyển, tiện nghi đầy đủ, an toàn và có không gian thoáng cho trẻ nhỏ.
        </FeatureCard>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.35em] text-emerald-300">Câu hỏi thường gặp</p>
        <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Những điều nên biết trước khi đặt lịch</h2>
        <p className="mt-5 leading-8 text-stone-400">
          Các thông tin dưới đây giúp bạn hình dung rõ hơn về quy trình đặt lịch, chuẩn bị hành lý và cách CampVibe hỗ trợ khách hàng.
        </p>
      </div>

      <div className="grid gap-4">
        <FAQItem
          question="Tôi gửi yêu cầu đặt lịch xong thì sao?"
          answer="CampVibe sẽ ghi nhận thông tin, kiểm tra lịch phù hợp và phản hồi để bạn xác nhận chi tiết chuyến đi."
        />
        <FAQItem
          question="Giá hiển thị đã phải giá cuối cùng chưa?"
          answer="Giá có thể thay đổi theo số khách, thời điểm, dịch vụ đi kèm và các yêu cầu riêng của từng chuyến đi."
        />
        <FAQItem
          question="Tôi có thể lưu địa điểm để xem lại không?"
          answer="Có. Sau khi đăng nhập, bạn có thể thêm địa điểm vào danh sách yêu thích và quay lại xem bất cứ lúc nào."
        />
      </div>
    </section>
  )
}

function ContactBoost() {
  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-3">
      <FeatureCard icon="📝" title="Mô tả nhu cầu của bạn">
        Bạn có thể ghi rõ số người, thời gian dự kiến, ngân sách và kiểu không gian mong muốn để được tư vấn sát hơn.
      </FeatureCard>
      <FeatureCard icon="📞" title="Nhận phản hồi nhanh">
        Đội ngũ hỗ trợ sẽ tiếp nhận yêu cầu và chủ động liên hệ lại để gợi ý lựa chọn phù hợp.
      </FeatureCard>
      <FeatureCard icon="🧭" title="Lên kế hoạch dễ hơn">
        CampVibe giúp bạn có thêm thông tin trước khi quyết định: vị trí, trải nghiệm, chi phí và lịch trình.
      </FeatureCard>
    </section>
  )
}

function AccountBoost() {
  return (
    <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-emerald-300">Quản lý chuyến đi</p>
      <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Mọi thông tin của bạn được sắp xếp rõ ràng</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <FeatureCard icon="📌" title="Theo dõi yêu cầu đặt phòng">
          Xem lại địa điểm đã đặt, thời gian, số khách, tổng chi phí và trạng thái xử lý của từng yêu cầu.
        </FeatureCard>
        <FeatureCard icon="💚" title="Lưu địa điểm yêu thích">
          Những điểm nghỉ phù hợp có thể được lưu lại để so sánh, cân nhắc hoặc đặt vào lần sau.
        </FeatureCard>
        <FeatureCard icon="🔔" title="Chủ động cập nhật">
          Khi trạng thái đơn được thay đổi, bạn có thể dễ dàng kiểm tra lại trong trang tài khoản cá nhân.
        </FeatureCard>
      </div>
    </section>
  )
}

function CompareBoost() {
  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-3">
      <FeatureCard icon="💸" title="So sánh theo ngân sách">
        Đặt các lựa chọn cạnh nhau để xem mức giá nào phù hợp nhất với kế hoạch chi tiêu của bạn.
      </FeatureCard>
      <FeatureCard icon="📍" title="So sánh theo vị trí">
        Cân nhắc địa điểm gần trung tâm, gần hồ, trong rừng thông hoặc khu vực có cảnh quan nổi bật.
      </FeatureCard>
      <FeatureCard icon="⭐" title="So sánh theo trải nghiệm">
        Rating, loại hình nghỉ dưỡng và sức chứa giúp bạn chọn đúng phong cách cho chuyến đi.
      </FeatureCard>
    </section>
  )
}

function ContentBoost({ variant = "general" }) {
  if (variant === "contact") return <ContactBoost />
  if (variant === "account") return <AccountBoost />
  if (variant === "compare") return <CompareBoost />

  return (
    <>
      <HowItWorks />
      <TrustSection />
      <TravelIdeas />
      <FAQSection />
    </>
  )
}

export default ContentBoost
