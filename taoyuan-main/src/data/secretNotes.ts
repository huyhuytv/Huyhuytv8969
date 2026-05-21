import type { SecretNoteDef } from '@/types'

/** 所有秘密笔记 */
export const SECRET_NOTES: SecretNoteDef[] = [
  {
    id: 1,
    type: 'tip',
    title: 'Mẩu giấy rách',
    content: 'Hình như có thứ gì đó ẩn giấu sâu trong rừng đào... Khi hoa đào mùa xuân rơi rụng, thỉnh thoảng có thể tìm thấy những vật phẩm quý hiếm trên mặt đất.',
    usable: false
  },
  {
    id: 2,
    type: 'treasure',
    title: 'Di thư của thợ mỏ',
    content: 'Ta đã giấu toàn bộ tích lũy cả đời ở một góc khuất tại tầng 20 hang mỏ... Nếu ngươi tìm thấy bức thư này, số tiền đó sẽ thuộc về ngươi.',
    usable: true,
    reward: { money: 500 }
  },
  {
    id: 3,
    type: 'npc',
    title: 'Sở thích của lão ngư',
    content: 'Lão ngư họ Lý thích nhất là cá chép Koi. Ông ấy nói chép Koi là vua của dòng sông, người câu được nó mới là một ngư phủ thực thụ.',
    usable: false
  },
  {
    id: 4,
    type: 'story',
    title: 'Đào Nguyên Chí - Quyển Thượng',
    content: 'Trăm năm trước, một ẩn sĩ đã phát hiện ra thung lũng biệt lập này. Trong thung lũng đào nở khắp lối, tiếng suối róc rách, tựa như cõi bồng lai. Ông bèn dựng làng định cư tại đây, đặt tên là "Đào Nguyên Hương".',
    usable: false
  },
  {
    id: 5,
    type: 'treasure',
    title: 'Bản đồ mật cảnh rừng trúc',
    content: 'Nơi rừng trúc rậm rạp nhất có một tảng đá phủ đầy rêu xanh, lật nó lên sẽ tìm thấy một viên phỉ thúy thượng hạng.',
    usable: true,
    reward: { items: [{ itemId: 'jade', quantity: 1 }] }
  },
  {
    id: 6,
    type: 'tip',
    title: 'Bí quyết câu cá',
    content: 'Vào những đêm trăng tròn, cá dưới nước hoạt động cực kỳ mạnh mẽ. Nếu muốn câu được cá hiếm, hãy thử vận may vào đêm trăng tròn.',
    usable: false
  },
  {
    id: 7,
    type: 'npc',
    title: 'Bí mật của thợ rèn',
    content: 'Thợ rèn Tôn tuy cả ngày gõ sắt, nhưng thực chất ông ấy rất thích quặng đồng. Ông bảo đồng là kim loại ấm áp nhất.',
    usable: false
  },
  {
    id: 8,
    type: 'story',
    title: 'Đào Nguyên Chí - Quyển Hạ',
    content: 'Sau khi ẩn sĩ qua đời, dân làng qua nhiều thế hệ vẫn luôn bảo vệ mảnh đất này. Họ lập ra quy ước: không được chặt phá rừng đào, không được làm ô nhiễm dòng suối. Đào Nguyên Hương cứ thế yên bình trôi qua trăm năm.',
    usable: false
  },
  {
    id: 9,
    type: 'treasure',
    title: 'Bí mật bên bờ sông',
    content: 'Có lần tôi giấu một số tiền dưới một tảng đá lớn ở khúc quanh của con lạch. Nếu bạn có thể tìm thấy nó, hãy lấy nó và sử dụng nó.',
    usable: true,
    reward: { money: 800 }
  },
  {
    id: 10,
    type: 'tip',
    title: 'Sổ tay thu thập',
    content: 'Vào những ngày mưa, núi rừng sẽ xuất hiện vài sản vật bình thường hiếm thấy. Rừng trúc sau cơn mưa đặc biệt rất đáng để ghé qua.',
    usable: false
  },
  {
    id: 11,
    type: 'npc',
    title: 'Tâm tư của Liễu Nương',
    content: 'Liễu Nương thích nhất là hoa quế. Mỗi độ thu về, nàng lại ngồi thẫn thờ dưới gốc cây hoa quế suốt cả ngày.',
    usable: false
  },
  {
    id: 12,
    type: 'treasure',
    title: 'Ám hiệu hang mỏ',
    content: 'Nơi cuối cùng của tầng sông ngầm trong mỏ có một hang động bị nước xói mòn. Bên trong giấu một viên đá nguyệt quang vô giá.',
    usable: true,
    reward: { items: [{ itemId: 'moonstone', quantity: 1 }] }
  },
  {
    id: 13,
    type: 'story',
    title: 'Thương lộ Hãn Hải',
    content: 'Rất lâu trước đây, Đào Nguyên Hương không hề biệt lập. Một con đường giao thương băng qua hoang mạc phía tây, kết nối với dị vực xa xôi. Giới thương nhân gọi hoang mạc ấy là "Hãn Hải", bởi cát đá mênh mông như biển khơi.',
    usable: false
  },
  {
    id: 14,
    type: 'tip',
    title: 'Kinh nghiệm trồng trọt',
    content: 'Chất lượng cây trồng chịu ảnh hưởng bởi rất nhiều yếu tố: độ phì nhiêu của đất, tần suất tưới nước, mức độ phù hợp của mùa vụ... thậm chí là vận thế mỗi ngày.',
    usable: false
  },
  {
    id: 15,
    type: 'npc',
    title: 'Nguyện vọng của đầu bếp',
    content: 'Thím Vương luôn muốn nấu ra một bát cơm hoàn hảo nhất. Thím nói, gạo ngon chính là nền tảng của mọi món ăn ngon.',
    usable: false
  },
  {
    id: 16,
    type: 'treasure',
    title: 'Truyền thuyết giếng cổ',
    content: 'Dưới đáy giếng cổ bỏ hoang ở đầu thôn, nghe nói có giấu bảo vật trấn thôn từ thuở lập làng. Tuy giếng đã cạn, nhưng bảo vật chắc vẫn còn ở đó.',
    usable: true,
    reward: { money: 1500 }
  },
  {
    id: 17,
    type: 'story',
    title: 'Chuyện xưa của Công hội',
    content: 'Công hội Mạo Hiểm Giả ban đầu chỉ là một căn lều nhỏ nơi các thợ săn tụ họp. Sau này quái vật trong hang mỏ ngày một nhiều, họ mới lập ra công hội để chuyên tiêu diệt quái vật, bảo vệ dân làng.',
    usable: false
  },
  {
    id: 18,
    type: 'tip',
    title: 'Hang mỏ sấm sét',
    content: 'Nghe nói khi vào mỏ lúc trời giông sét, chất lượng quặng đào được sẽ cao hơn. Có lẽ dòng điện đã kích hoạt thứ gì đó...',
    usable: false
  },
  {
    id: 19,
    type: 'npc',
    title: 'Sở thích của tú tài',
    content: 'Chu tú tài ngày nào cũng phải thưởng một ấm trà ngon. Ông ấy bảo trà giúp thanh lọc tâm hồn, sáng mắt tỉnh người. Tặng trà ngon cho ông ấy là chuẩn nhất.',
    usable: false
  },
  {
    id: 20,
    type: 'treasure',
    title: 'Kho báu rừng đào',
    content: 'Dưới gốc đào cổ thụ lâu đời nhất trong rừng đào có chôn một hạt giống viễn cổ. Nghe nói đó là di vật của vị ẩn sĩ lập làng để lại.',
    usable: true,
    reward: { items: [{ itemId: 'ancient_seed', quantity: 1 }] }
  },
  {
    id: 21,
    type: 'story',
    title: 'Bí mật bảo tàng',
    content:
      'Bảo tàng vốn dĩ là từ đường của làng. Sau này có học giả đề xuất gom góp toàn bộ hóa thạch và cổ vật dân làng đào được để bảo tồn tập trung, từ đường mới cải tạo thành bảo tàng. Nghe nói khi thu thập đủ tất cả triển phẩm, kỳ tích sẽ xuất hiện.',
    usable: false
  },
  {
    id: 22,
    type: 'tip',
    title: 'Bí quyết nhà kính',
    content: 'Mùa đông vạn vật héo tàn, nhưng trong nhà kính bốn mùa ấm áp như xuân. Nếu sở hữu nhà kính, bạn vẫn có thể tiếp tục trồng trọt vào mùa đông.',
    usable: false
  },
  {
    id: 23,
    type: 'npc',
    title: 'Thuật dưỡng sinh của Bác Trần',
    content: 'Bác Trần chú trọng nhất là dưỡng sinh, bác bảo nhân sâm là vua của trăm thảo dược. Nếu tặng bác ấy nhân sâm, bác ấy chắc chắn sẽ vô cùng vui mừng.',
    usable: false
  },
  {
    id: 24,
    type: 'treasure',
    title: 'Hầm mỏ bỏ hoang',
    content: 'Sâu trong hang mỏ có một nhánh hầm bị phong tỏa, nghe nói là di tích của khu mỏ cổ xưa hơn. Nơi đó không chỉ có vàng bạc, mà còn có cả quặng Iridium vô giá.',
    usable: true,
    reward: { money: 2000, items: [{ itemId: 'iridium_ore', quantity: 1 }] }
  },
  {
    id: 25,
    type: 'story',
    title: 'Mật sự Đào Nguyên',
    content:
      'Sâu thẳm dưới lòng đất Đào Nguyên Hương nghe nói đang phong ấn một sức mạnh viễn cổ. Ẩn sĩ lập làng chọn nơi này không phải ngẫu nhiên — ông chính là hộ vệ của nguồn sức mạnh đó. Nay người bảo vệ đã khuất, phong ấn dần thức tỉnh... Đây có lẽ là lý do quái vật trong mỏ xuất hiện ngày một nhiều.',
    usable: false
  },
  // 仙灵线索
  {
    id: 26,
    type: 'story',
    title: 'Lời thì thầm dưới ánh vảy sáng',
    content:
      'Người già trong thôn kể rằng, sâu dưới thác nước sau núi có một con linh long sắc xanh phỉ thúy cư ngụ. Mỗi độ đêm mưa xuân, dưới nước lại lấp lánh ánh vảy rồng. Nếu câu được cá Thúy Long trong truyền thuyết, biết đâu có thể cảm ứng được sự hiện diện của nó.',
    usable: false
  },
  {
    id: 27,
    type: 'story',
    title: 'Mảnh vỡ chày ngọc',
    content:
      'Lúc hái thuốc vô tình nhặt được một mảnh vỡ màu trắng ngọc, hình dáng như mảnh vỡ của chày giã thuốc. Người già bảo vào những đêm trăng tròn sâu trong rừng trúc, thỉnh thoảng sẽ nghe thấy tiếng giã thuốc lách cách. Nhưng không ai biết ai là người đang giã.',
    usable: false
  },
  {
    id: 28,
    type: 'story',
    title: 'Bóng vàng thoáng qua',
    content:
      'Có nhiều hơn một người dân làng từng thấy một vệt kim quang lướt qua lúc hoàng hôn. Đồn rằng trong núi gần thôn có một hồ ly tinh tu luyện ngàn năm cư ngụ — tính tình nửa chính nửa tà, thích bày câu đố trêu chọc người qua đường. Nghe nói chỉ những ai đủ giàu có và nhân duyên cực tốt mới thu hút được sự chú ý của nó.',
    usable: false
  }
]
