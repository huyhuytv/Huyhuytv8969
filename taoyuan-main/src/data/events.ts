import type { Season } from '@/types'

/** 季节事件定义 */
export interface SeasonEventDef {
  id: string
  name: string
  season: Season
  day: number // ngày kích hoạt
  description: string
  /** 事件效果 */
  effects: {
    friendshipBonus?: number // tất cảNPCTiền thưởng thuận lợi
    moneyReward?: number // Phần thưởng tiền đồng
    itemReward?: { itemId: string; quantity: number }[]
    staminaBonus?: number // Phục hồi sức chịu đựng bổ sung
  }
  /** 事件文案 */
  narrative: string[]
  /** 是否为互动节日（有小游戏） */
  interactive?: boolean
  /** 互动节日类型 */
  festivalType?:
    | 'fishing_contest'
    | 'harvest_fair'
    | 'dragon_boat'
    | 'lantern_riddle'
    | 'pot_throwing'
    | 'dumpling_making'
    | 'firework_show'
    | 'tea_contest'
    | 'kite_flying'
}

export const SEASON_EVENTS: SeasonEventDef[] = [
  {
    id: 'spring_festival',
    name: 'Lễ Hội Xuân Cày',
    season: 'spring',
    day: 8,
    description: 'Cả làng ăn mừng bắt đầu cày bừa vụ xuân, cầu mong một năm bội thu.',
    effects: {
      friendshipBonus: 5,
      itemReward: [{ itemId: 'seed_cabbage', quantity: 5 }]
    },
    narrative: [
      'Lễ Hội Xuân Cày mỗi năm một lần của Đào Nguyên Hương đã đến!',
      'Dân làng tụ tập ở quảng trường, Bác Trần chủ trì nghi lễ cầu phúc.',
      'Liễu Nương treo đầy dải lụa đỏ trên cây, gió nhẹ lướt qua trông hệt như một đám mây đỏ.',
      '「Cầu chúc năm nay mưa thuận gió hòa, ngũ cốc phong đăng!」',
      'Bác Trần tặng một ít hạt giống để thay cho lời cầu phúc.',
      'Độ thiện cảm của tất cả dân làng +5.'
    ]
  },
  {
    id: 'summer_lantern',
    name: 'Lễ Hội Hoa Đăng · Đại Hội Câu Cá',
    season: 'summer',
    day: 15,
    description: 'Thả đèn cầu phúc bên sông, và cả cuộc thi câu cá đầy kịch tính!',
    effects: {
      friendshipBonus: 5
    },
    narrative: [
      'Bên dòng suối trong vắt đêm hè, dân làng quây quần bên nhau thả đèn hoa sen.',
      'Thu Nguyệt đã chuẩn bị đủ loại đèn hoa sen từ sớm.',
      '「Mau tới mau tới! Năm nay có thêm phần thi câu cá đó!」',
      'Ánh đèn êm dịu trôi theo dòng nước, phản chiếu lại cả một bầu trời sao.',
      'Độ thiện cảm của tất cả dân làng +5.'
    ],
    interactive: true,
    festivalType: 'fishing_contest'
  },
  {
    id: 'autumn_harvest',
    name: 'Yến Tiệc Mùa Màng · Hội Triển Lãm Nông Sản',
    season: 'autumn',
    day: 22,
    description: 'Tranh tài thu hoạch, xem triển phẩm của ai xuất sắc nhất!',
    effects: {
      friendshipBonus: 5,
      staminaBonus: 30
    },
    narrative: [
      'Đào Nguyên Hương mùa thu tràn ngập hơi thở của sự bội thu.',
      'Dân làng mang theo thành quả thu hoạch tốt nhất của mình tụ họp tại quảng trường.',
      'Bác Trần dõng dạc tuyên bố: 「Năm nay tổ chức hội triển lãm nông sản, mọi người hãy lấy ra những món đồ tốt nhất đi nào!」',
      'Bữa tiệc thịnh soạn giúp bạn hồi phục thêm 30 điểm thể lực.',
      'Độ thiện cảm của tất cả dân làng +5.'
    ],
    interactive: true,
    festivalType: 'harvest_fair'
  },
  {
    id: 'winter_new_year',
    name: 'Đêm Giao Thừa',
    season: 'winter',
    day: 28,
    description: 'Đoàn tụ cuối năm, tống cựu nghênh tân.',
    effects: {
      friendshipBonus: 10,
      moneyReward: 300,
      itemReward: [
        { itemId: 'herb', quantity: 3 },
        { itemId: 'firewood', quantity: 5 }
      ]
    },
    narrative: [
      'Ngày 28 mùa đông —— Đêm Giao thừa.',
      'Nhà nhà ở Đào Nguyên Hương đều giăng đèn kết hoa, khói bếp lượn lờ.',
      'Liễu Nương kéo bạn đến nhà trưởng thôn: 「Đón năm mới một mình quạnh hiu lắm, qua nhà mình đi.」',
      'Bác Trần bưng lên bữa cơm tất niên nóng hổi, Lâm Lão đưa cho một ly rượu ấm.',
      'A Thạch vụng về đưa một bao lì xì: 「... Chúc mừng năm mới.」',
      'Thu Nguyệt và Tiểu Mãn đốt pháo trong sân, tiếng cười nói vang vọng cả bầu trời đêm.',
      '「Năm mới tới, Đào Nguyên Hương sẽ ngày càng tốt đẹp hơn.」 Lâm Lão nói.',
      'Đây là năm mới thứ {year} mà bạn trải qua ở Đào Nguyên Hương.',
      'Nhận được 300 xu lì xì và quà tặng từ dân làng. Độ thiện cảm của tất cả dân làng +10.'
    ]
  },

  // ==================== 新增节日 (10) ====================

  // --- 被动节日 ---
  {
    id: 'yuan_ri',
    name: 'Tết Nguyên Đán',
    season: 'spring',
    day: 1,
    description: 'Năm mới bắt đầu, vạn tượng canh tân.',
    effects: {
      friendshipBonus: 5,
      moneyReward: 300,
      itemReward: [{ itemId: 'seed_cabbage', quantity: 3 }]
    },
    narrative: [
      'Ngày 1 mùa xuân —— Tết Nguyên đán.',
      'Đào Nguyên Hương lúc sáng sớm, trước cửa nhà nào cũng treo câu đối xuân mới.',
      'Bác Trần cười híp mắt đưa cho một bát bánh tổ: 「Năm mới khí tượng mới, ăn bánh tổ để bước bước thăng tiến nhé!」',
      'Liễu Nương dẫn dân làng ra đầu thôn đốt pháo, tiếng nổ lách tách vô cùng náo nhiệt.',
      'Lâm Lão đứng dưới gốc đào, ánh mắt vô cùng ôn hòa: 「Lại là một năm cảnh sắc tươi đẹp.」',
      'Nhận được 300 xu lì xì đầu năm và hạt giống. Độ thiện cảm của tất cả dân làng +5.'
    ]
  },
  {
    id: 'hua_chao',
    name: 'Lễ Hội Trăm Hoa',
    season: 'spring',
    day: 15,
    description: 'Sinh nhật của trăm loài hoa, thưởng hoa cầu phúc.',
    effects: {
      friendshipBonus: 5,
      itemReward: [
        { itemId: 'peach', quantity: 3 },
        { itemId: 'seed_chrysanthemum', quantity: 2 }
      ]
    },
    narrative: [
      'Ngày 15 mùa xuân —— Lễ hội Trăm hoa (Hoa Triều).',
      'Hoa đào ở Đào Nguyên Hương đang nở rộ đẹp nhất, cánh hoa bay lả tả trong gió.',
      'Thu Nguyệt tết một chiếc vòng hoa đội lên đầu: 「Hôm nay là sinh nhật của trăm loài hoa đó!」',
      'Liễu Nương đặt hương án dưới gốc cây, dẫn dắt mọi người cúng tế Hoa Thần, buộc dải lụa đỏ.',
      'Tiểu Mãn rượt đuổi bươm bướm giữa khóm hoa, tiếng cười vang không ngớt.',
      'Bạn nhận được hoa đào và hạt giống hoa. Độ thiện cảm của tất cả dân làng +5.'
    ]
  },
  {
    id: 'shang_si',
    name: 'Lễ Hội Tảo Thanh',
    season: 'spring',
    day: 24,
    description: 'Du ngoạn đạp thanh ngày xuân, gần gũi với thiên nhiên.',
    effects: {
      friendshipBonus: 3,
      staminaBonus: 40,
      itemReward: [{ itemId: 'wild_berry', quantity: 3 }]
    },
    narrative: [
      'Ngày 24 mùa xuân —— Tết Thượng Tị (Tảo Thanh).',
      'Cả làng rủ nhau lên núi đạp thanh, tiếng suối róc rách, chim hót hoa hương.',
      'A Thạch hiếm hoi nở nụ cười, lẳng lặng rửa tay cầu phúc bên bờ suối.',
      'Thu Nguyệt và Tiểu Mãn tết vòng cỏ trên thảm cỏ, bạn cũng tham gia cùng họ.',
      'Lâm Lão hái một giỏ quả dại chia cho mọi người, gió mát lướt qua mặt, cơ thể và tinh thần đều thư thái.',
      'Tảo thanh giúp bạn tinh thần sảng khoái, thể lực hồi phục 40 điểm. Độ thiện cảm của tất cả dân làng +3.'
    ]
  },
  {
    id: 'zhong_qiu',
    name: 'Lễ Hội Trung Thu',
    season: 'autumn',
    day: 8,
    description: 'Trăng tròn người đoàn viên, cùng nhau ngắm trăng sáng.',
    effects: {
      friendshipBonus: 8,
      moneyReward: 500,
      itemReward: [{ itemId: 'lotus_seed', quantity: 3 }]
    },
    narrative: [
      'Ngày 8 mùa thu —— Tết Trung thu.',
      'Khi đêm xuống, một vầng trăng sáng treo lơ lửng trên chân trời.',
      'Dân làng tụ tập trên quảng trường, trên bàn bày kín bánh hạt sen và hoa quả.',
      'Bác Trần bưng bầu rượu, ngâm thơ với ánh trăng: 「Đãn nguyện nhân trường cửu, thiên lý cộng thiền quyên.」',
      'Liễu Nương chia cho mỗi người một phần bánh trung thu và bao lì xì thưởng trăng.',
      'Thu Nguyệt lẳng lặng ngước nhìn mặt trăng, dường như đang nhớ tới điều gì đó.',
      '「Cảm ơn mọi người, mỗi ngày ở Đào Nguyên Hương tôi đều rất vui vẻ.」 Cô khẽ nói.',
      'Nhận được 500 xu và hạt sen. Độ thiện cảm của tất cả dân làng +8.'
    ]
  },
  {
    id: 'la_ba',
    name: 'Lễ Hội Cháo Lạp Bát',
    season: 'winter',
    day: 8,
    description: 'Nấu cháo Lạp Bát, xua tan giá rét ủ ấm dạ dày.',
    effects: {
      friendshipBonus: 5,
      staminaBonus: 50,
      itemReward: [{ itemId: 'rice', quantity: 5 }]
    },
    narrative: [
      'Ngày 8 mùa đông —— Tết Lạp Bát.',
      'Tháng chạp mùa đông rét mướt, nhưng bếp lửa trong thôn lại cháy bừng bừng.',
      'Bác Trần đã bắt đầu ninh cháo Lạp Bát từ tờ mờ sáng, mỗi nhà đều góp một chút nguyên liệu của mình.',
      'Đậu phộng, táo đỏ, hạt sen, gạo lứt... một nồi cháo đầy ắp sôi sùng sục bốc khói nghi ngút.',
      'Liễu Nương cười híp mắt múc một bát cháo đầy đưa cho bạn: 「Ăn bát cháo Lạp Bát, năm sau gặp điềm lành.」',
      'Bát cháo nóng trôi xuống bụng, toàn thân trở nên ấm áp lạ thường. Thể lực hồi phục 50 điểm.',
      'Nhận được Gạo. Độ thiện cảm của tất cả dân làng +5.'
    ]
  },

  // --- 互动节日 ---
  {
    id: 'duan_wu',
    name: 'Lễ Hội Đoan Ngọ',
    season: 'summer',
    day: 5,
    description: 'Đua thuyền rồng, dũng cảm tranh tài!',
    effects: {
      friendshipBonus: 5
    },
    narrative: [
      'Ngày 5 mùa hè —— Tết Đoan ngọ.',
      'Trên sông Đào Nguyên náo nhiệt vô cùng, ba chiếc thuyền rồng xếp thành một hàng ngang!',
      'Bác Trần đứng trên bờ làm trọng tài: 「Vào vị trí —— Chuẩn bị ——」',
      'A Thạch và Tiểu Mãn đã xoa tay hầm hè trên thuyền rồi.',
      '「Mau lên thuyền đi! Đua thuyền rồng sắp bắt đầu rồi!」 Thu Nguyệt vẫy tay gọi bạn.',
      'Độ thiện cảm của tất cả dân làng +5.'
    ],
    interactive: true,
    festivalType: 'dragon_boat'
  },
  {
    id: 'qi_xi',
    name: 'Lễ Thất Tịch',
    season: 'summer',
    day: 22,
    description: 'Tết Thất Tịch, giải đố đèn lồng.',
    effects: {
      friendshipBonus: 5
    },
    narrative: [
      'Ngày 22 mùa hè —— Lễ Thất Tịch.',
      'Màn đêm buông xuống, quảng trường trong làng giăng đầy những chiếc đèn lồng ngũ sắc.',
      'Dưới mỗi chiếc đèn lồng đều có buộc một câu đố, giải đúng sẽ có thưởng!',
      'Chu tú tài vuốt chòm râu: 「Câu đố đèn năm nay là do đích thân lão phu dày công chuẩn bị đấy.」',
      'Mắt Thu Nguyệt lấp lánh: 「Chúng ta cùng thi xem ai giải được nhiều câu hơn đi!」',
      'Độ thiện cảm của tất cả dân làng +5.'
    ],
    interactive: true,
    festivalType: 'lantern_riddle'
  },
  {
    id: 'chong_yang',
    name: 'Lễ Trùng Cửu',
    season: 'autumn',
    day: 15,
    description: 'Trùng Cửu leo núi, tranh tài ném tên vào bình.',
    effects: {
      friendshipBonus: 5
    },
    narrative: [
      'Ngày 15 mùa thu —— Tiết Trùng Cửu.',
      'Tiết thu trong xanh mát mẻ, dân làng đã đặt sẵn chiếc bình đồng để chơi ném tên trên quảng trường.',
      'Lâm Lão cười nói: 「Ném tên vào bình vốn là thú vui tao nhã thời xưa, hôm nay mọi người cứ thử tài xem sao.」',
      'A Thạch không nói một lời nhặt mũi tên lên, ánh mắt vô cùng nghiêm túc.',
      'Tiểu Mãn nhảy nhót nóng lòng muốn thử: 「Mình chắc chắn sẽ ném trúng cho mà xem!」',
      'Độ thiện cảm của tất cả dân làng +5.'
    ],
    interactive: true,
    festivalType: 'pot_throwing'
  },
  {
    id: 'dong_zhi',
    name: 'Ngày Lễ Đông Chí',
    season: 'winter',
    day: 15,
    description: 'Đông Chí lớn như năm mới, sủi cảo sưởi ấm nhân gian.',
    effects: {
      friendshipBonus: 5
    },
    narrative: [
      'Ngày 15 mùa đông —— Tiết Đông Chí.',
      'Gió bấc rít gào, nhưng trong nhà chính của làng lại bốc khói nghi ngút.',
      'Bác Trần đã nhào bột xong từ sớm: 「Đông chí không bưng bát sủi cảo, lạnh cóng rụng tai chẳng ai lo đâu!」',
      'Liễu Nương, Thu Nguyệt đã quây quần bên bàn cán bột gói sủi cảo rồi.',
      '「Lại đây lại đây, thi xem ai gói vừa nhanh vừa khéo nào!」 Liễu Nương vẫy tay gọi bạn.',
      'Độ thiện cảm của tất cả dân làng +5.'
    ],
    interactive: true,
    festivalType: 'dumpling_making'
  },
  {
    id: 'nian_mo',
    name: 'Lễ Hội Pháo Hoa Cuối Năm',
    season: 'winter',
    day: 22,
    description: 'Cuối năm sắp tới, pháo hoa thắp sáng bầu trời đêm.',
    effects: {
      friendshipBonus: 5
    },
    narrative: [
      'Ngày 22 mùa đông —— Lễ hội pháo hoa cuối năm.',
      'Đây là buổi lễ mừng hoành tráng nhất trước thềm giao thừa.',
      'A Thạch khênh tới mấy thùng pháo hoa: 「... Tôi sẽ châm lửa.」',
      'Tiểu Mãn hưng phấn nhảy nhót loạn xạ: 「Pháo hoa kìa pháo hoa kìa! Mình thích pháo hoa nhất!」',
      'Thu Nguyệt kéo tay bạn: 「Cùng nhau ghi nhớ những bông pháo hoa rực rỡ này nhé!」',
      'Độ thiện cảm của tất cả dân làng +5.'
    ],
    interactive: true,
    festivalType: 'firework_show'
  },
  {
    id: 'dou_cha',
    name: 'Đại Hội Đấu Trà',
    season: 'summer',
    day: 18,
    description: 'Mượn trà kết bạn, thưởng trà luận đạo!',
    effects: {
      friendshipBonus: 5
    },
    narrative: [
      'Ngày 18 mùa hè —— Đại hội Đấu Trà.',
      'Mùa hè nóng bức, thích hợp nhất là thưởng trà.',
      'Lâm Lão đã dựng sẵn bàn trà trên quảng trường, suối trong ngọt mát, trà cụ đủ đầy.',
      '「Trà ngon cần nước tốt, lửa tốt, tay nghề tốt. Hôm nay chúng ta sẽ so tài phân cao thấp ở chữ \'tốt\' này.」',
      'Thu Nguyệt đã mài rửa trà cụ xong xuôi, A Thạch cũng khiêng nước suối trong núi tới.',
      'Bác Trần cười nói: 「Mọi người đều thử tài xem sao, xem ai có thể pha được ấm trà ngon nhất!」',
      'Độ thiện cảm của tất cả dân làng +5.'
    ],
    interactive: true,
    festivalType: 'tea_contest'
  },
  {
    id: 'qiu_yuan',
    name: 'Lễ Hội Thả Diều Mùa Thu',
    season: 'autumn',
    day: 18,
    description: 'Tiết thu trong mát, thả bay diều giấy!',
    effects: {
      friendshipBonus: 5
    },
    narrative: [
      'Ngày 18 mùa thu —— Lễ hội thả diều mùa thu.',
      'Trời cao mây nhạt, chính là thời điểm tuyệt vời nhất để thả diều.',
      'Tiểu Mãn mới sáng sớm đã bện xong một con diều hình bươm bướm: 「Mau nhìn mau nhìn nè!」',
      'A Thạch lẳng lặng lấy ra một con diều hình chim ưng, chế tác vô cùng tinh xảo.',
      'Thu Nguyệt đỏ mặt đưa qua một con diều hình đóa hoa: 「Mình... mình làm lần đầu tiên đấy.」',
      'Liễu Nương cười nói: 「Cùng thi xem diều của ai bay cao nhất và đầm nhất nào!」',
      'Độ thiện cảm của tất cả dân làng +5.'
    ],
    interactive: true,
    festivalType: 'kite_flying'
  }
]

/** 根据季节和日期获取当天事件 */
export const getTodayEvent = (season: Season, day: number): SeasonEventDef | undefined => {
  return SEASON_EVENTS.find(e => e.season === season && e.day === day)
}
