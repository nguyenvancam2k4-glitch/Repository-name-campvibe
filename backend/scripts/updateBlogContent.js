import fs from "fs"
import path from "path"
import { pathToFileURL } from "url"

const posts = [
  {
    "slug": "kinh-nghiem-di-glamping-lan-dau",
    "title": "Kinh nghiệm đi glamping lần đầu: chuẩn bị thế nào để chuyến đi thật trọn vẹn?",
    "excerpt": "Glamping là lựa chọn phù hợp nếu bạn muốn gần thiên nhiên nhưng vẫn cần sự tiện nghi. Bài viết này giúp bạn chuẩn bị dễ hơn trước chuyến đi đầu tiên.",
    "category": "Cẩm nang",
    "readTime": "8 phút đọc",
    "content": "Glamping là sự kết hợp giữa cảm giác cắm trại gần thiên nhiên và sự tiện nghi của một kỳ nghỉ nghỉ dưỡng. Nếu camping truyền thống thường yêu cầu bạn tự chuẩn bị lều, túi ngủ, bếp nấu và nhiều vật dụng cá nhân, thì glamping giúp hành trình nhẹ nhàng hơn rất nhiều. Bạn vẫn có thể thức dậy giữa không gian xanh, nghe tiếng gió, ngắm bình minh và tận hưởng buổi tối bên ánh đèn ấm, nhưng không cần quá lo về việc dựng trại hay thiếu tiện nghi cơ bản.\n\nVới người đi lần đầu, điều quan trọng nhất không phải là mang thật nhiều đồ, mà là hiểu rõ mình muốn một chuyến đi kiểu gì. Bạn đi để nghỉ ngơi, chụp ảnh, tổ chức sinh nhật, đi cùng người thương, gia đình hay nhóm bạn? Mỗi nhu cầu sẽ phù hợp với một kiểu địa điểm khác nhau. Nếu muốn yên tĩnh, hãy chọn khu rừng thông hoặc ven hồ. Nếu đi nhóm đông, nên ưu tiên nơi có sân BBQ, khu sinh hoạt chung và không gian rộng. Nếu đi cùng gia đình, hãy chú ý nhiều hơn đến mức độ an toàn, đường đi và tiện nghi vệ sinh.\n\nTrước khi đặt lịch, bạn nên kiểm tra kỹ một số thông tin: thời gian nhận phòng, số khách tối đa, giá đã bao gồm những dịch vụ nào, có phụ thu cuối tuần hay không, có hỗ trợ ăn uống hay phải tự chuẩn bị. Những chi tiết nhỏ này quyết định khá nhiều đến trải nghiệm thực tế. Một chuyến đi tưởng chừng đơn giản có thể trở nên bất tiện nếu bạn không chuẩn bị trước đồ cá nhân, áo khoác, thuốc cơ bản hoặc sạc dự phòng.\n\nVề hành lý, hãy ưu tiên những món gọn nhưng hữu ích: áo khoác mỏng, giày dễ đi, kem chống muỗi, đồ vệ sinh cá nhân, pin dự phòng, một ít đồ ăn nhẹ và giấy tờ cần thiết. Nếu địa điểm ở vùng núi hoặc gần hồ, buổi tối thường lạnh hơn bạn nghĩ, vì vậy đừng chỉ nhìn thời tiết ban ngày. Với nhóm bạn, nên thống nhất trước ai phụ trách đồ ăn, ai chuẩn bị loa, ai đặt dịch vụ để tránh thiếu sót.\n\nMột mẹo nhỏ là bạn nên đến nơi sớm hơn giờ hoàng hôn. Đây là thời điểm đẹp nhất để nhận phòng, chụp ảnh, làm quen không gian và chuẩn bị bữa tối. Nếu đến quá muộn, bạn có thể bỏ lỡ khung cảnh đẹp nhất trong ngày và dễ bị vội vàng khi sắp xếp đồ. Ngoài ra, hãy dành thời gian đi dạo quanh khu nghỉ, hỏi nhân viên về các điểm đẹp gần đó và những lưu ý an toàn.\n\nGlamping không cần quá cầu kỳ, nhưng cần chuẩn bị đúng. Khi bạn chọn được địa điểm phù hợp, nắm rõ dịch vụ đi kèm và mang theo những vật dụng cần thiết, chuyến đi đầu tiên sẽ nhẹ nhàng hơn rất nhiều. Đó có thể là một cuối tuần ngắn, nhưng đủ để bạn nạp lại năng lượng và có thêm cảm hứng cho những hành trình tiếp theo."
  },
  {
    "slug": "goi-y-lich-trinh-glamping-2-ngay-1-dem",
    "title": "Gợi ý lịch trình glamping 2 ngày 1 đêm cho nhóm bạn, cặp đôi và gia đình",
    "excerpt": "Một lịch trình hợp lý giúp chuyến đi ngắn vẫn đủ vui, đủ nghỉ ngơi và không bị vội. Tham khảo cách sắp xếp 2 ngày 1 đêm thật thoải mái.",
    "category": "Lịch trình",
    "readTime": "7 phút đọc",
    "content": "Lịch trình glamping 2 ngày 1 đêm phù hợp với những ai muốn đổi gió cuối tuần nhưng không có quá nhiều thời gian. Ưu điểm của kiểu lịch trình này là vừa đủ để rời khỏi nhịp sống quen thuộc, tận hưởng không khí trong lành, dùng bữa ngoài trời và có một buổi tối thật đáng nhớ. Tuy nhiên, vì thời gian không dài, bạn nên sắp xếp lịch trình vừa phải, tránh nhồi quá nhiều hoạt động khiến chuyến đi trở nên mệt.\n\nNgày đầu tiên nên bắt đầu bằng việc di chuyển sớm. Nếu điểm đến cách thành phố khoảng 1–3 tiếng, bạn nên xuất phát vào buổi sáng để đến nơi trước giờ nhận phòng. Sau khi nhận lều hoặc cabin, hãy dành khoảng 30 phút để ổn định đồ đạc, kiểm tra tiện nghi và chụp một vài bức ảnh đầu tiên. Buổi chiều là thời điểm phù hợp để đi dạo, ngắm cảnh, chèo SUP nếu khu nghỉ có hồ, hoặc đơn giản là ngồi đọc sách và uống cà phê.\n\nKhoảng chiều muộn, cả nhóm có thể chuẩn bị bữa tối BBQ hoặc đặt sẵn dịch vụ ăn uống tại khu nghỉ. Đây thường là phần đáng nhớ nhất của chuyến glamping: mọi người cùng nướng đồ ăn, trò chuyện, nghe nhạc nhẹ và tận hưởng không khí ngoài trời. Nếu đi cặp đôi, bạn có thể chọn bữa tối riêng tư hơn, ưu tiên không gian có view đẹp và ánh đèn ấm. Nếu đi gia đình, hãy chuẩn bị thêm đồ ăn nhẹ cho trẻ nhỏ và chọn khung giờ ăn sớm hơn.\n\nBuổi tối nên dành cho các hoạt động nhẹ: đốt lửa trại, chơi boardgame, ngắm sao, xem phim ngoài trời hoặc đơn giản là trò chuyện. Không nên bật nhạc quá lớn nếu khu nghỉ có nhiều khách khác, vì glamping thường hướng tới sự thư giãn và tôn trọng không gian chung. Trước khi ngủ, hãy kiểm tra lại cửa lều, vật dụng cá nhân và tắt các thiết bị không cần thiết.\n\nNgày thứ hai nên bắt đầu chậm rãi. Dậy sớm ngắm bình minh là trải nghiệm rất đáng thử, đặc biệt ở các khu rừng thông, ven hồ hoặc vùng núi. Sau đó, bạn có thể ăn sáng, đi dạo quanh khu nghỉ, chụp thêm ảnh và chuẩn bị trả phòng. Nếu còn thời gian, hãy ghé một địa điểm gần đó trên đường về như quán cà phê, điểm check-in hoặc khu chợ địa phương.\n\nVới nhóm bạn, lịch trình nên ưu tiên hoạt động chung và không gian sinh hoạt rộng. Với cặp đôi, nên chọn lịch trình nhẹ nhàng, nhiều khoảng lặng và có thời gian riêng tư. Với gia đình, yếu tố quan trọng nhất là sự thuận tiện, an toàn và lịch trình không quá dày. Một chuyến đi 2 ngày 1 đêm sẽ trọn vẹn hơn khi bạn không cố làm quá nhiều thứ, mà tập trung vào cảm giác nghỉ ngơi và kết nối."
  },
  {
    "slug": "chon-dia-diem-glamping-theo-nhu-cau",
    "title": "Cách chọn địa điểm glamping theo nhu cầu: đi nghỉ, đi chơi hay tổ chức dịp đặc biệt?",
    "excerpt": "Không phải địa điểm glamping nào cũng giống nhau. Hãy chọn theo mục đích chuyến đi để có trải nghiệm phù hợp nhất.",
    "category": "Kinh nghiệm",
    "readTime": "9 phút đọc",
    "content": "Một trong những lý do khiến nhiều người thích glamping là mỗi địa điểm mang một màu sắc rất riêng. Có nơi nằm giữa rừng thông yên tĩnh, có nơi bên hồ, có nơi ở vùng núi săn mây, cũng có nơi được thiết kế như một khu nghỉ dưỡng ngoài trời với đầy đủ tiện nghi. Vì vậy, thay vì chọn theo hình ảnh đẹp nhất, bạn nên bắt đầu từ câu hỏi: chuyến đi này mình cần điều gì?\n\nNếu mục tiêu là nghỉ ngơi, hãy ưu tiên không gian yên tĩnh, ít hoạt động ồn ào và có cảnh quan tự nhiên dễ chịu. Những địa điểm trong rừng thông, ven hồ hoặc xa khu dân cư thường phù hợp hơn. Bạn nên xem kỹ mô tả về tiện nghi, khoảng cách di chuyển và mức độ riêng tư. Một nơi quá đông hoặc có nhiều hoạt động nhóm có thể không phù hợp nếu bạn chỉ muốn ngủ ngon, đọc sách và thư giãn.\n\nNếu đi cùng nhóm bạn, tiêu chí lại khác. Bạn sẽ cần không gian rộng, khu BBQ, khu sinh hoạt chung, chỗ để xe thuận tiện và các hoạt động giúp cả nhóm kết nối. Những nơi có bãi cỏ, khu lửa trại, dịch vụ ăn uống và các trò chơi ngoài trời sẽ giúp chuyến đi vui hơn. Nhóm đông cũng nên hỏi kỹ về số khách tối đa, phụ thu và quy định tiếng ồn sau giờ nhất định.\n\nNếu đi cùng người thương, hãy chú ý đến không gian riêng tư, view đẹp và trải nghiệm buổi tối. Một căn lều có ban công nhìn ra hồ, ánh đèn ấm, bữa tối riêng hoặc khu vực ít khách sẽ tạo cảm giác đặc biệt hơn. Không nhất thiết phải chọn nơi đắt nhất, nhưng nên chọn nơi có không khí phù hợp với mục đích của chuyến đi.\n\nNếu tổ chức sinh nhật, cầu hôn, kỷ niệm hoặc một dịp đặc biệt, bạn nên trao đổi trước với bên hỗ trợ để chuẩn bị trang trí, bánh, hoa hoặc setup riêng. Nhiều trải nghiệm sẽ đẹp hơn rất nhiều nếu được chuẩn bị trước thay vì đến nơi mới xử lý. Hãy hỏi rõ chi phí phát sinh, thời gian setup và các giới hạn của khu nghỉ.\n\nNgoài nhu cầu cá nhân, hãy xem xét thời tiết và mùa du lịch. Một địa điểm săn mây đẹp vào mùa khô có thể không còn lý tưởng vào những ngày mưa dày. Khu ven hồ rất hợp mùa hè nhưng buổi tối có thể nhiều muỗi hơn. Khu rừng thông mát mẻ nhưng cần chuẩn bị áo ấm. Chọn đúng địa điểm là bước đầu tiên để chuyến đi không chỉ đẹp trên ảnh, mà còn thoải mái trong thực tế."
  },
  {
    "slug": "checklist-chuan-bi-do-di-glamping",
    "title": "Checklist chuẩn bị đồ đi glamping: mang vừa đủ để nhẹ nhàng mà vẫn tiện nghi",
    "excerpt": "Đi glamping không cần mang quá nhiều đồ như camping truyền thống, nhưng vẫn có những món nên chuẩn bị để chuyến đi thoải mái hơn.",
    "category": "Checklist",
    "readTime": "6 phút đọc",
    "content": "Một trong những sai lầm phổ biến khi đi glamping là mang quá nhiều đồ vì sợ thiếu. Thực tế, glamping thường đã có sẵn nhiều tiện nghi cơ bản như lều, giường, chăn gối, khu vệ sinh, đèn và đôi khi cả bữa ăn. Vì vậy, mục tiêu của bạn không phải là chuẩn bị như một chuyến camping tự túc, mà là mang đủ những thứ giúp bản thân thoải mái hơn.\n\nNhóm đồ cá nhân nên được ưu tiên đầu tiên: giấy tờ tùy thân, điện thoại, sạc, pin dự phòng, đồ vệ sinh cá nhân, khăn nhỏ, thuốc cơ bản và một túi đựng đồ bẩn. Nếu bạn có thói quen dùng đồ skincare hoặc thuốc riêng, hãy chuẩn bị trước trong túi nhỏ để dễ lấy. Buổi tối ở các khu ngoài trời thường lạnh hơn trong thành phố, vì vậy áo khoác mỏng hoặc áo dài tay là món rất nên có.\n\nVề trang phục, hãy chọn đồ dễ vận động và phù hợp với bối cảnh ngoài trời. Giày thể thao hoặc sandal chắc chân sẽ tốt hơn giày quá mới hoặc giày cao. Nếu bạn muốn chụp ảnh, có thể mang thêm một bộ đồ đẹp, nhưng vẫn nên ưu tiên sự thoải mái. Với địa điểm có hồ, suối hoặc hoạt động chèo SUP, hãy chuẩn bị thêm quần áo thay và túi chống nước.\n\nĐồ ăn nhẹ cũng rất hữu ích, đặc biệt nếu bạn đi cùng trẻ nhỏ hoặc nhóm đông. Một ít bánh, trái cây, nước uống, cà phê gói hoặc đồ ăn vặt sẽ giúp chuyến đi thoải mái hơn giữa các bữa chính. Tuy nhiên, hãy hỏi trước khu nghỉ có cho mang đồ ăn ngoài không, có khu BBQ không và có tính phí vệ sinh hay phụ thu không. Điều này giúp tránh hiểu nhầm khi đến nơi.\n\nCác món nhỏ nhưng quan trọng gồm kem chống muỗi, kem chống nắng, kính râm, mũ, đèn pin nhỏ và túi rác cá nhân. Nếu bạn nhạy cảm với tiếng ồn hoặc ánh sáng, có thể mang bịt mắt và nút tai. Nếu đi vào mùa mưa, áo mưa mỏng và túi bọc balo sẽ rất hữu ích.\n\nChecklist tốt nhất là checklist phù hợp với bạn. Trước khi đi, hãy đọc kỹ thông tin địa điểm, hỏi rõ những tiện nghi đã có và chỉ mang những món thật sự cần thiết. Khi hành lý gọn nhẹ, bạn sẽ có nhiều năng lượng hơn để tận hưởng thiên nhiên, trò chuyện cùng người đi cùng và tận hưởng cảm giác nghỉ dưỡng đúng nghĩa."
  },
  {
    "slug": "glamping-cho-cap-doi-nhom-ban-gia-dinh",
    "title": "Glamping phù hợp với ai? Gợi ý trải nghiệm cho cặp đôi, nhóm bạn và gia đình",
    "excerpt": "Mỗi nhóm khách sẽ có một cách tận hưởng glamping khác nhau. Chọn đúng trải nghiệm giúp chuyến đi đáng nhớ hơn.",
    "category": "Trải nghiệm",
    "readTime": "8 phút đọc",
    "content": "Glamping không chỉ dành cho người thích cắm trại. Đây là lựa chọn phù hợp với nhiều kiểu khách khác nhau, từ cặp đôi muốn đổi gió cuối tuần, nhóm bạn muốn tụ tập ngoài trời cho đến gia đình muốn có một kỳ nghỉ nhẹ nhàng gần thiên nhiên. Điểm hấp dẫn của glamping là bạn có thể tận hưởng không khí ngoài trời mà không phải hy sinh quá nhiều sự tiện nghi.\n\nVới cặp đôi, glamping mang lại cảm giác riêng tư và lãng mạn hơn so với một chuyến nghỉ dưỡng thông thường. Một căn lều có view hồ, rừng thông hoặc thung lũng sẽ tạo không gian rất đẹp cho buổi tối. Các hoạt động phù hợp gồm ăn tối ngoài trời, ngắm hoàng hôn, uống trà nóng, xem phim hoặc đơn giản là ngồi trò chuyện dưới ánh đèn. Khi chọn địa điểm, hãy ưu tiên nơi có không gian yên tĩnh và dịch vụ setup riêng nếu bạn muốn tạo bất ngờ.\n\nVới nhóm bạn, glamping lại là dịp để kết nối. Một chuyến đi vui thường cần khu sinh hoạt chung, bãi cỏ rộng, chỗ nướng BBQ và hoạt động buổi tối. Nhóm bạn nên chọn nơi có sức chứa rõ ràng, không quá gò bó về không gian và có các dịch vụ đi kèm như lửa trại, loa, bếp nướng hoặc đồ ăn set sẵn. Tuy nhiên, cũng cần chú ý quy định về tiếng ồn và giờ nghỉ để không ảnh hưởng đến khách khác.\n\nVới gia đình, yếu tố quan trọng nhất là sự an toàn và tiện lợi. Địa điểm không nên quá khó di chuyển, khu vệ sinh cần sạch sẽ, lều hoặc phòng nghỉ nên đủ rộng và có không gian cho trẻ nhỏ vận động. Gia đình cũng nên chọn lịch trình nhẹ, tránh quá nhiều hoạt động liên tục. Một buổi sáng đi dạo, một bữa BBQ đơn giản và thời gian nghỉ ngơi cùng nhau đôi khi đã đủ để tạo nên một kỳ nghỉ đẹp.\n\nGlamping cũng phù hợp với những người làm việc căng thẳng và muốn tìm một khoảng nghỉ ngắn. Không cần đi quá xa, một địa điểm cách thành phố vài giờ di chuyển cũng có thể giúp bạn thay đổi không khí. Điều quan trọng là chọn nơi phù hợp với năng lượng của mình: muốn yên tĩnh thì chọn rừng thông, muốn vui thì chọn khu có hoạt động, muốn chụp ảnh thì chọn nơi có cảnh quan nổi bật.\n\nMỗi người sẽ có một cách tận hưởng glamping khác nhau. Khi hiểu rõ mình đi với ai, muốn trải nghiệm điều gì và cần mức tiện nghi ra sao, bạn sẽ dễ chọn được điểm nghỉ phù hợp hơn. CampVibe giúp bạn nhìn rõ các lựa chọn, so sánh nhanh và chuẩn bị tốt hơn cho chuyến đi sắp tới."
  }
]

async function loadPool() {
  const candidates = [
    "src/config/db.js",
    "config/db.js",
    "src/database/db.js",
    "database/db.js",
    "src/db.js",
    "db.js",
  ]

  for (const candidate of candidates) {
    const absolutePath = path.resolve(process.cwd(), candidate)
    if (fs.existsSync(absolutePath)) {
      const module = await import(pathToFileURL(absolutePath).href)
      return module.default || module.pool || module.db
    }
  }

  throw new Error(
    "Không tìm thấy file kết nối database. Script đã dò src/config/db.js, config/db.js, src/database/db.js, database/db.js, src/db.js và db.js."
  )
}

function normalizeSlug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

async function columnExists(pool, columnName) {
  const result = await pool.query(
    `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = $1
    `,
    [columnName]
  )

  return result.rowCount > 0
}

async function ensureColumns(pool) {
  const hasSlug = await columnExists(pool, "slug")
  const hasExcerpt = await columnExists(pool, "excerpt")
  const hasCategory = await columnExists(pool, "category")
  const hasReadTime = await columnExists(pool, "read_time")
  const hasContent = await columnExists(pool, "content")

  if (!hasSlug) {
    await pool.query(`ALTER TABLE blog_posts ADD COLUMN slug VARCHAR(255)`)
  }

  if (!hasExcerpt) {
    await pool.query(`ALTER TABLE blog_posts ADD COLUMN excerpt TEXT`)
  }

  if (!hasCategory) {
    await pool.query(`ALTER TABLE blog_posts ADD COLUMN category VARCHAR(120) DEFAULT 'Cẩm nang'`)
  }

  if (!hasReadTime) {
    await pool.query(`ALTER TABLE blog_posts ADD COLUMN read_time VARCHAR(80) DEFAULT '6 phút đọc'`)
  }

  if (!hasContent) {
    await pool.query(`ALTER TABLE blog_posts ADD COLUMN content TEXT`)
  }
}

async function updateBlogPosts() {
  const pool = await loadPool()

  try {
    await ensureColumns(pool)

    const existing = await pool.query(`SELECT id, title FROM blog_posts ORDER BY id ASC`)
    const rows = existing.rows

    for (let index = 0; index < posts.length; index += 1) {
      const post = posts[index]
      const target = rows[index]

      if (target) {
        await pool.query(
          `
          UPDATE blog_posts
          SET
            title = $1,
            slug = $2,
            excerpt = $3,
            category = $4,
            read_time = $5,
            content = $6
          WHERE id = $7
          `,
          [
            post.title,
            post.slug || normalizeSlug(post.title),
            post.excerpt,
            post.category,
            post.readTime,
            post.content,
            target.id,
          ]
        )
      } else {
        await pool.query(
          `
          INSERT INTO blog_posts (title, slug, excerpt, category, read_time, content)
          VALUES ($1, $2, $3, $4, $5, $6)
          `,
          [
            post.title,
            post.slug || normalizeSlug(post.title),
            post.excerpt,
            post.category,
            post.readTime,
            post.content,
          ]
        )
      }
    }

    const result = await pool.query(`SELECT id, title, read_time FROM blog_posts ORDER BY id ASC`)
    console.log("✅ Đã cập nhật nội dung blog dài hơn.")
    console.table(result.rows)
  } finally {
    await pool.end()
  }
}

updateBlogPosts().catch((error) => {
  console.error("❌ Lỗi cập nhật blog:", error.message)
  console.error(error)
  process.exitCode = 1
})
