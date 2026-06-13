export const blogCategories = ["Tất cả", "Kinh nghiệm", "Địa điểm", "Trải nghiệm", "Chuẩn bị", "Cặp đôi"]

export const blogPosts = [
  {
    id: "1",
    title: "Đi glamping lần đầu cần chuẩn bị những gì?",
    category: "Kinh nghiệm",
    date: "12 Tháng 6, 2026",
    readTime: "6 phút đọc",
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Gợi ý những vật dụng cần mang theo, cách chọn trang phục và một vài lưu ý để chuyến glamping đầu tiên thật thoải mái.",
  },
  {
    id: "2",
    title: "5 địa điểm cắm trại gần Hà Nội cho cuối tuần",
    category: "Địa điểm",
    date: "18 Tháng 6, 2026",
    readTime: "8 phút đọc",
    image: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Danh sách các điểm đến phù hợp cho nhóm bạn, gia đình hoặc cặp đôi muốn đổi gió trong 2 ngày 1 đêm.",
  },
  {
    id: "3",
    title: "Bí quyết có một buổi BBQ ngoài trời thật chill",
    category: "Trải nghiệm",
    date: "24 Tháng 6, 2026",
    readTime: "5 phút đọc",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Từ cách chọn món, setup ánh sáng đến playlist nhạc, mọi chi tiết nhỏ đều giúp buổi BBQ trở nên đáng nhớ hơn.",
  },
  {
    id: "4",
    title: "Checklist 20 món nên mang khi đi camping",
    category: "Chuẩn bị",
    date: "28 Tháng 6, 2026",
    readTime: "7 phút đọc",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Một danh sách ngắn gọn nhưng đủ dùng để bạn không quên những vật dụng quan trọng trước khi lên đường.",
  },
  {
    id: "5",
    title: "Gợi ý lịch trình 2 ngày 1 đêm cho cặp đôi",
    category: "Cặp đôi",
    date: "02 Tháng 7, 2026",
    readTime: "9 phút đọc",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Một lịch trình nhẹ nhàng với picnic, BBQ, ngắm hoàng hôn và buổi sáng cafe giữa thiên nhiên.",
  },
  {
    id: "6",
    title: "Săn mây cần đi vào mùa nào đẹp nhất?",
    category: "Kinh nghiệm",
    date: "06 Tháng 7, 2026",
    readTime: "6 phút đọc",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Những thời điểm đẹp để săn mây, cách chuẩn bị trang phục và lưu ý khi dậy sớm ở vùng núi.",
  },
]

export function getBlogPostById(id) {
  return blogPosts.find((post) => post.id === String(id)) || blogPosts[0]
}
