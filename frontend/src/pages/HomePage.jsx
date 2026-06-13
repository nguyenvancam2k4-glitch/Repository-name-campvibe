import { Link } from "react-router-dom"
import { featuredPlaces } from "../data/places"
import CampHeader from "../components/CampHeader"

const experiences = [
  {
    title: "BBQ giữa rừng",
    desc: "Set nướng ngoài trời với bếp than, bàn gỗ, đèn decor và nguyên liệu chuẩn bị sẵn.",
    icon: "🔥",
    price: "350.000đ",
  },
  {
    title: "Đốt lửa trại",
    desc: "Không gian quây quần buổi tối, nhạc acoustic, marshmallow và ánh lửa giữa thiên nhiên.",
    icon: "🌙",
    price: "280.000đ",
  },
  {
    title: "Chèo SUP bên hồ",
    desc: "Trải nghiệm chèo SUP nhẹ nhàng, ngắm hoàng hôn và chụp ảnh check-in trên mặt nước.",
    icon: "🏄",
    price: "220.000đ",
  },
  {
    title: "Săn mây bình minh",
    desc: "Tour dậy sớm ngắm mây, thưởng thức cafe nóng và ghi lại khoảnh khắc bình minh.",
    icon: "☁️",
    price: "180.000đ",
  },
  {
    title: "Picnic đôi",
    desc: "Setup thảm picnic, giỏ đồ ăn nhẹ, hoa, nến và góc chụp ảnh dành cho cặp đôi.",
    icon: "🧺",
    price: "420.000đ",
  },
  {
    title: "Tiệc sinh nhật ngoài trời",
    desc: "Trang trí tiệc nhỏ với bóng bay, bánh, ánh đèn, âm nhạc và không gian riêng tư.",
    icon: "🎂",
    price: "690.000đ",
  },
]


const whyChooseFeatures = [
  {
    title: "Đặt lịch nhanh chóng",
    desc: "Tìm địa điểm, chọn ngày, số khách và gửi yêu cầu đặt chỗ chỉ trong vài thao tác đơn giản.",
    icon: "⚡",
  },
  {
    title: "Dễ chọn ngày phù hợp",
    desc: "Thông tin ngày nhận phòng, trả phòng và số lượng khách được trình bày rõ ràng, dễ thao tác.",
    icon: "📅",
  },
  {
    title: "Gợi ý theo sở thích",
    desc: "Dễ dàng chọn chuyến đi theo phong cách riêng như săn mây, BBQ, gần hồ, yên tĩnh hoặc đi nhóm đông.",
    icon: "✨",
  },
  {
    title: "Nhiều trải nghiệm đi kèm",
    desc: "Thêm BBQ, lửa trại, picnic, chèo SUP và các dịch vụ ngoài trời để chuyến đi trọn vẹn hơn.",
    icon: "🎒",
  },
  {
    title: "Thông tin rõ ràng",
    desc: "Giá, vị trí, tiện nghi, đánh giá và dịch vụ được hiển thị trực quan để khách dễ so sánh.",
    icon: "📋",
  },
  {
    title: "Hỗ trợ tận tâm",
    desc: "CampVibe đồng hành từ lúc chọn địa điểm đến khi hoàn tất chuyến đi, giúp khách yên tâm hơn.",
    icon: "💬",
  },
]


const customerReviews = [
  {
    name: "Minh Anh",
    trip: "Glamping Đà Lạt",
    rating: "5.0",
    avatar: "MA",
    review:
      "Không gian rất chill, ảnh đẹp hơn mong đợi. Mình thích nhất phần BBQ buổi tối và cảm giác thức dậy giữa rừng thông.",
  },
  {
    name: "Hoàng Nam",
    trip: "Camping Sóc Sơn",
    rating: "4.9",
    avatar: "HN",
    review:
      "Đặt lịch nhanh, thông tin rõ ràng, giá và tiện nghi hiển thị dễ hiểu. Rất hợp cho nhóm bạn muốn đi cuối tuần.",
  },
  {
    name: "Linh Chi",
    trip: "Moon Valley Camp",
    rating: "5.0",
    avatar: "LC",
    review:
      "Mình chọn thêm picnic đôi và lửa trại, mọi thứ được chuẩn bị chỉn chu. Cảm giác như một chuyến nghỉ dưỡng thật sự.",
  },
]


const blogPosts = [
  {
    title: "Đi glamping lần đầu cần chuẩn bị những gì?",
    category: "Kinh nghiệm",
    date: "12 Tháng 6, 2026",
    image:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Gợi ý những vật dụng cần mang theo, cách chọn trang phục và một vài lưu ý để chuyến glamping đầu tiên thật thoải mái.",
  },
  {
    title: "5 địa điểm cắm trại gần Hà Nội cho cuối tuần",
    category: "Địa điểm",
    date: "18 Tháng 6, 2026",
    image:
      "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Danh sách các điểm đến phù hợp cho nhóm bạn, gia đình hoặc cặp đôi muốn đổi gió trong 2 ngày 1 đêm.",
  },
  {
    title: "Bí quyết có một buổi BBQ ngoài trời thật chill",
    category: "Trải nghiệm",
    date: "24 Tháng 6, 2026",
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Từ cách chọn món, setup ánh sáng đến playlist nhạc, mọi chi tiết nhỏ đều giúp buổi BBQ trở nên đáng nhớ hơn.",
  },
]

function HomePage() {
  return (
    <div className="camp-page min-h-screen overflow-x-hidden bg-stone-950 text-white">

      {/* Thanh menu */}
      <CampHeader />

      {/* Khu vực hero */}
      <section id="home" className="relative scroll-mt-28 overflow-hidden px-6 pb-16 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39933,transparent_34%),radial-gradient(circle_at_bottom_right,#f59e0b22,transparent_36%)]"></div>
        <div className="absolute left-10 top-28 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-5 py-2 text-sm font-medium text-emerald-200 shadow-lg shadow-emerald-500/10">
                Nghỉ dưỡng giữa thiên nhiên theo cách thật khác
              </p>

              <h1 className="mb-5 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight md:text-5xl">
                Đặt lịch
                <span className="block bg-gradient-to-r from-emerald-300 via-teal-200 to-lime-200 bg-clip-text text-transparent">
                  Glamping & Camping
                </span>
                trong vài giây
              </h1>

              <p className="mb-7 max-w-2xl text-lg leading-8 text-stone-300">
                CampVibe giúp bạn tìm kiếm, lựa chọn và đặt các khu cắm trại,
                glamping nghỉ dưỡng, BBQ, lửa trại và những trải nghiệm ngoài trời
                đáng nhớ nhất.
              </p>

              <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/places" className="rounded-full bg-emerald-400 px-8 py-4 text-center font-bold text-stone-950 shadow-xl shadow-emerald-400/20 transition duration-300 hover:-translate-y-1 hover:bg-emerald-300">
                  Khám phá địa điểm
                </Link>
                <Link to="/experiences" className="rounded-full border border-white/20 px-8 py-4 text-center font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                  Xem trải nghiệm
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-400/20 to-amber-400/20 blur-xl"></div>
              <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-emerald-300/40">
                <img
                  src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80"
                  alt="CampVibe Glamping"
                  className="h-[390px] w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>
          </div>
          {/* Đường tắt khám phá */}
          <div className="relative z-20 mt-9 rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl transition duration-500 hover:border-emerald-300/40 hover:bg-white/[0.13]">
            <div className="grid gap-4 md:grid-cols-3">
              <Link to="/places" className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-5 transition duration-300 hover:-translate-y-1 hover:bg-emerald-300 hover:text-stone-950">
                <p className="text-xs font-black uppercase tracking-[0.25em]">Địa điểm</p>
                <h3 className="mt-3 text-xl font-black">Tìm nơi nghỉ phù hợp</h3>
                <p className="mt-2 text-sm leading-6 opacity-80">Xem danh sách glamping, lọc theo khu vực và phong cách.</p>
              </Link>

              <Link to="/compare" className="rounded-2xl border border-white/10 bg-stone-950/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">So sánh</p>
                <h3 className="mt-3 text-xl font-black">Chọn giữa hai điểm đến</h3>
                <p className="mt-2 text-sm leading-6 text-stone-400">So sánh giá, vị trí, loại hình và đánh giá trước khi đặt.</p>
              </Link>

              <Link to="/contact" className="rounded-2xl border border-white/10 bg-stone-950/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">Tư vấn</p>
                <h3 className="mt-3 text-xl font-black">Nhờ CampVibe gợi ý</h3>
                <p className="mt-2 text-sm leading-6 text-stone-400">Gửi nhu cầu chuyến đi để được hỗ trợ chọn lịch và địa điểm.</p>
              </Link>
            </div>
          </div>

          {/* Dòng thống kê nhỏ */}
          <div className="mt-8 grid gap-4 text-center sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30">
              <p className="text-3xl font-black text-emerald-300">120+</p>
              <p className="mt-1 text-sm text-stone-400">địa điểm glamping</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30">
              <p className="text-3xl font-black text-emerald-300">15k+</p>
              <p className="mt-1 text-sm text-stone-400">khách đã trải nghiệm</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30">
              <p className="text-3xl font-black text-emerald-300">4.9/5</p>
              <p className="mt-1 text-sm text-stone-400">đánh giá trung bình</p>
            </div>
          </div>
        </div>
      </section>

      {/* Địa điểm glamping nổi bật */}
      <section id="places" className="relative scroll-mt-28 px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#10b98114,transparent_40%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                Địa điểm nổi bật
              </p>
              <h2 className="max-w-2xl text-4xl font-black tracking-tight md:text-5xl">
                Những khu glamping được yêu thích nhất
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-400">
                Lựa chọn các điểm nghỉ dưỡng giữa thiên nhiên với không gian đẹp,
                dịch vụ chất lượng và trải nghiệm ngoài trời đáng nhớ.
              </p>
            </div>

            <Link to="/places" className="w-fit rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-emerald-300/50 hover:bg-white/10">
              Xem tất cả địa điểm
            </Link>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featuredPlaces.map((place, index) => (
              <div
                key={place.name}
                className="camp-card group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20 backdrop-blur transition duration-500 hover:-translate-y-3 hover:border-emerald-300/40 hover:bg-white/[0.09]"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={place.cardImage}
                    alt={place.name}
                    className="camp-image h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/15 to-transparent"></div>

                  <div className="absolute left-5 top-5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-black text-stone-950 shadow-lg shadow-emerald-400/20">
                    {place.tag}
                  </div>

                  <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-stone-950/70 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                    ⭐ {place.rating}
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-sm font-medium text-emerald-200">
                      {place.location}
                    </p>
                    <h3 className="mt-1 text-2xl font-black">
                      {place.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-5 flex flex-wrap gap-2">
                    {place.amenities.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-5">
                    <div>
                      <p className="text-xs text-stone-500">Chỉ từ</p>
                      <p className="text-xl font-black text-white">
                        {place.price}
                        <span className="text-sm font-medium text-stone-400"> / đêm</span>
                      </p>
                    </div>

                    <Link to={`/places/${place.id}`}
                      className="rounded-full bg-white px-5 py-3 text-sm font-black text-stone-950 transition duration-300 hover:bg-emerald-300"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-8 text-center shadow-2xl shadow-emerald-500/10 backdrop-blur">
            <p className="text-lg font-semibold text-emerald-100">
              Gợi ý thông minh: CampVibe có thể đề xuất địa điểm phù hợp theo sở thích như yên tĩnh,
              săn mây, BBQ, gần hồ hoặc đi nhóm đông.
            </p>
          </div>
        </div>
      </section>

      {/* Trải nghiệm CampVibe */}
      <section id="experiences" className="relative scroll-mt-28 overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0c0a09,#064e3b22,#0c0a09)]"></div>
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl"></div>
        <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
              Trải nghiệm CampVibe
            </p>
            <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
              Biến chuyến đi thành một kỷ niệm đáng nhớ
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-400">
              Chọn thêm các hoạt động ngoài trời, dịch vụ setup và combo nghỉ dưỡng
              để chuyến glamping trở nên trọn vẹn hơn.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur transition duration-500 hover:-translate-y-3 hover:border-emerald-300/40 hover:bg-white/[0.1]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-300/10 blur-2xl transition duration-500 group-hover:bg-emerald-300/20"></div>

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-stone-950/70 text-3xl shadow-lg transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                  {item.icon}
                </div>

                <h3 className="mb-3 text-2xl font-black text-white">
                  {item.title}
                </h3>

                <p className="mb-6 min-h-20 leading-7 text-stone-400">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-5">
                  <div>
                    <p className="text-xs text-stone-500">Giá dịch vụ</p>
                    <p className="text-xl font-black text-emerald-300">
                      {item.price}
                    </p>
                  </div>

                  <Link to="/experiences" className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition duration-300 hover:border-emerald-300/50 hover:bg-emerald-300 hover:text-stone-950">
                    Chọn trải nghiệm
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="camp-card camp-glow rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-emerald-300">
                Combo gợi ý
              </p>
              <h3 className="mb-4 text-3xl font-black">
                CampVibe Signature Night
              </h3>
              <p className="max-w-3xl leading-8 text-stone-300">
                Một combo cao cấp gồm glamping qua đêm, BBQ giữa rừng, đốt lửa trại,
                chụp ảnh hoàng hôn và bữa sáng nhẹ. Đây là gói trải nghiệm có thể dùng
                để mỗi chuyến đi đều có cảm giác riêng, đáng nhớ và trọn vẹn hơn.
              </p>
            </div>

            <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-8 text-center shadow-2xl shadow-emerald-500/10 backdrop-blur">
              <p className="text-4xl font-black text-emerald-300">-20%</p>
              <p className="mt-3 text-lg font-bold text-white">
                Ưu đãi khi đặt combo
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-300">
                Trải nghiệm chức năng khuyến mãi, mã giảm giá và bán thêm dịch vụ trong hệ thống.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vì sao chọn CampVibe */}
      <section id="why" className="relative scroll-mt-28 overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-stone-950"></div>
        <div className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                Vì sao chọn CampVibe?
              </p>

              <h2 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">
                Tìm nơi cắm trại đẹp, đặt lịch dễ dàng và tận hưởng trọn vẹn hơn
              </h2>

              <p className="mt-6 text-lg leading-8 text-stone-400">
                CampVibe giúp bạn khám phá các khu glamping đẹp, chọn thêm trải nghiệm
                yêu thích và chuẩn bị cho một chuyến nghỉ dưỡng ngoài trời thật đáng nhớ.
              </p>

              <div className="mt-8 rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                  Gợi ý cho chuyến đi
                </p>
                <p className="mt-3 leading-7 text-emerald-50">
                  Chọn địa điểm theo phong cách của bạn: nghỉ dưỡng yên tĩnh, BBQ cùng bạn bè,
                  săn mây buổi sáng, picnic đôi hoặc một đêm glamping thật chill.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {whyChooseFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-emerald-300/40 hover:bg-white/[0.1]"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-stone-950/70 text-2xl transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                    {feature.icon}
                  </div>

                  <h3 className="mb-3 text-xl font-black text-white">
                    {feature.title}
                  </h3>

                  <p className="leading-7 text-stone-400">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-4">
            <div className="camp-card camp-glow rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30">
              <p className="text-4xl font-black text-emerald-300">3s</p>
              <p className="mt-2 text-sm text-stone-400">tìm kiếm nhanh</p>
            </div>

            <div className="camp-card camp-glow rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30">
              <p className="text-4xl font-black text-emerald-300">24/7</p>
              <p className="mt-2 text-sm text-stone-400">hỗ trợ đặt chỗ</p>
            </div>

            <div className="camp-card camp-glow rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30">
              <p className="text-4xl font-black text-emerald-300">6+</p>
              <p className="mt-2 text-sm text-stone-400">loại trải nghiệm</p>
            </div>

            <div className="camp-card camp-glow rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30">
              <p className="text-4xl font-black text-emerald-300">Easy</p>
              <p className="mt-2 text-sm text-stone-400">dễ dùng, dễ đặt</p>
            </div>
          </div>
        </div>
      </section>

      {/* Đánh giá khách hàng */}
      <section id="reviews" className="relative scroll-mt-28 overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#34d39918,transparent_35%),radial-gradient(circle_at_bottom_left,#f59e0b12,transparent_35%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                Khách hàng nói gì?
              </p>
              <h2 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">
                Những chuyến đi đáng nhớ bắt đầu từ CampVibe
              </h2>
            </div>

            <p className="text-lg leading-8 text-stone-400">
              Cảm nhận từ những vị khách đã lựa chọn CampVibe cho kỳ nghỉ cuối tuần,
              chuyến đi cùng bạn bè và những dịp đặc biệt giữa thiên nhiên.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {customerReviews.map((item) => (
              <div
                key={item.name}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur transition duration-500 hover:-translate-y-3 hover:border-emerald-300/40 hover:bg-white/[0.1]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-lg font-black text-stone-950 shadow-lg shadow-emerald-400/20">
                      {item.avatar}
                    </div>
                    <div>
                      <h3 className="font-black text-white">{item.name}</h3>
                      <p className="text-sm text-stone-400">{item.trip}</p>
                    </div>
                  </div>

                  <div className="rounded-full border border-white/10 bg-stone-950/70 px-4 py-2 text-sm font-black text-emerald-300">
                    ⭐ {item.rating}
                  </div>
                </div>

                <p className="min-h-32 text-lg leading-8 text-stone-300">
                  “{item.review}”
                </p>

                <div className="mt-6 flex gap-1 text-emerald-300">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20 backdrop-blur">
            <div className="grid lg:grid-cols-[1fr_1.1fr]">
              <div className="p-8 md:p-10">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-emerald-300">
                  Cảm hứng chuyến đi
                </p>
                <h3 className="text-3xl font-black md:text-4xl">
                  Lên lịch cuối tuần, chọn trải nghiệm và tận hưởng thiên nhiên
                </h3>
                <p className="mt-5 leading-8 text-stone-400">
                  CampVibe hướng đến trải nghiệm đặt lịch đơn giản, hình ảnh đẹp,
                  thông tin rõ ràng và các dịch vụ đi kèm giúp chuyến đi trở nên trọn vẹn.
                </p>

                <Link to="/places" className="mt-7 inline-block rounded-full bg-emerald-400 px-7 py-4 font-black text-stone-950 shadow-lg shadow-emerald-400/20 transition duration-300 hover:-translate-y-1 hover:bg-emerald-300">
                  Bắt đầu khám phá
                </Link>
              </div>

              <div className="relative min-h-[360px]">
                <img
                  src="https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?auto=format&fit=crop&w=1000&q=80"
                  alt="Khách hàng trải nghiệm cắm trại"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 to-transparent lg:bg-gradient-to-l"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog du lịch */}
      <section id="blog" className="relative scroll-mt-28 overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-stone-950"></div>
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
                Cẩm nang CampVibe
              </p>
              <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
                Gợi ý hữu ích cho chuyến đi ngoài trời của bạn
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-400">
                Khám phá kinh nghiệm glamping, mẹo chuẩn bị hành lý, gợi ý địa điểm
                và những ý tưởng giúp chuyến đi trở nên trọn vẹn hơn.
              </p>
            </div>

            <Link to="/blog" className="w-fit rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-emerald-300/50 hover:bg-white/10">
              Xem tất cả bài viết
            </Link>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {blogPosts.map((post, index) => (
              <article
                key={post.title}
                className="camp-card group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20 backdrop-blur transition duration-500 hover:-translate-y-3 hover:border-emerald-300/40 hover:bg-white/[0.1]"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="camp-image h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
                  <span className="absolute left-5 top-5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-black text-stone-950 shadow-lg shadow-emerald-400/20">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <p className="mb-3 text-sm text-stone-500">{post.date}</p>
                  <h3 className="mb-4 text-2xl font-black leading-tight text-white">
                    {post.title}
                  </h3>
                  <p className="mb-6 leading-7 text-stone-400">
                    {post.excerpt}
                  </p>

                  <Link to={`/blog/${post.id || index + 1}`} className="group/btn inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition duration-300 hover:border-emerald-300/50 hover:bg-emerald-300 hover:text-stone-950">
                    Đọc thêm
                    <span className="transition duration-300 group-hover/btn:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center backdrop-blur">
            <p className="mx-auto max-w-3xl text-lg leading-8 text-stone-300">
              Theo dõi CampVibe để nhận thêm gợi ý lịch trình, ưu đãi theo mùa và những điểm glamping mới nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Liên hệ */}
      <section id="contact" className="relative scroll-mt-28 overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0c0a09,#052e2b,#0c0a09)]"></div>
        <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
              Liên hệ CampVibe
            </p>
            <h2 className="mx-auto max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
              Sẵn sàng cho chuyến glamping tiếp theo?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-400">
              Gửi thông tin cho CampVibe để được tư vấn địa điểm, lịch trình và các combo
              trải nghiệm phù hợp với nhu cầu của bạn.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5">
              <div className="camp-card camp-glow rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                  Hotline
                </p>
                <h3 className="text-2xl font-black">0988 888 888</h3>
                <p className="mt-2 text-stone-400">Tư vấn đặt lịch từ 8:00 đến 22:00 mỗi ngày.</p>
              </div>

              <div className="camp-card camp-glow rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                  Email
                </p>
                <h3 className="text-2xl font-black">hello@campvibe.vn</h3>
                <p className="mt-2 text-stone-400">Nhận tư vấn combo, hợp tác địa điểm và hỗ trợ khách hàng.</p>
              </div>

              <div className="camp-card camp-glow rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                  Văn phòng
                </p>
                <h3 className="text-2xl font-black">Hà Nội, Việt Nam</h3>
                <p className="mt-2 text-stone-400">Kết nối các điểm glamping, camping và nghỉ dưỡng thiên nhiên.</p>
              </div>
            </div>

            <form className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-stone-300">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên của bạn"
                    className="w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none transition focus:border-emerald-300/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-stone-300">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại"
                    className="w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none transition focus:border-emerald-300/60"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-bold text-stone-300">
                  Bạn quan tâm điều gì?
                </label>
                <select className="w-full rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none transition focus:border-emerald-300/60">
                  <option className="bg-stone-900 text-white">Đặt glamping nghỉ dưỡng</option>
                  <option className="bg-stone-900 text-white">Combo BBQ và lửa trại</option>
                  <option className="bg-stone-900 text-white">Chuyến đi cho nhóm đông</option>
                  <option className="bg-stone-900 text-white">Hợp tác địa điểm</option>
                </select>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-bold text-stone-300">
                  Lời nhắn
                </label>
                <textarea
                  rows="6"
                  placeholder="Bạn muốn đi đâu, đi mấy người, vào thời gian nào?"
                  className="w-full resize-none rounded-2xl border border-white/10 bg-stone-950/70 px-5 py-4 text-white outline-none transition focus:border-emerald-300/60"
                ></textarea>
              </div>

              <Link to="/contact"
                className="mt-6 block w-full rounded-2xl bg-emerald-400 px-8 py-4 text-center text-base font-black text-stone-950 shadow-lg shadow-emerald-400/20 transition duration-300 hover:-translate-y-1 hover:bg-emerald-300"
              >
                Gửi yêu cầu tư vấn
              </Link>

              <p className="mt-4 text-center text-sm text-stone-500">
                CampVibe sẽ phản hồi trong thời gian sớm nhất.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  )
}

export default HomePage