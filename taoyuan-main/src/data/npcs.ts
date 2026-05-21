import type { NpcDef } from '@/types'

/** 所CóNPC定义 */
export const NPCS: NpcDef[] = [
  // ============================================================
  // 原Có NPC (6)
  // ============================================================
  {
    id: 'chen_bo',
    name: 'Bác Trần',
    gender: 'male',
    role: 'Chủ tiệm Vạn Vật',
    personality: 'Nhiệt tình hào sảng',
    birthday: { season: 'spring', day: 8 },
    lovedItems: ['tea', 'osmanthus', 'ginseng'],
    likedItems: ['cabbage', 'rice', 'potato', 'goat_milk', 'truffle', 'rabbit_foot', 'hanhai_spice', 'ginseng_tea', 'cheese'],
    hatedItems: ['copper_ore', 'quartz'],
    dialogues: {
      stranger: ['Khách quan, mới tới đây lần đầu hả? Lão phu là Bác Trần, tiệm Vạn Vật này là do lão mở đấy.', '{title}, có nhu cầu gì cứ việc ghé qua, bảo đảm không lừa già dối trẻ.'],
      acquaintance: ['Ha ha, {title} lại tới rồi! Hôm nay muốn mua chút gì nào?', 'Gần đây mới nhập về vài món hàng tốt, cháu qua xem thử đi.'],
      friendly: ['{player} thật giống hệt ông nội cháu hồi trẻ, rất biết chịu thương chịu khó.', 'Có vài món đồ tốt, lão chỉ giữ lại cho riêng {title} cháu thôi.'],
      bestFriend: ['{player}, cháu giống hệt như con cái trong nhà của lão vậy.', 'Cái tiệm này, biết đâu sau này sẽ giao lại cho cháu đấy... Đùa chút thôi.']
    }
  },
  {
    id: 'liu_niang',
    name: 'Liễu Nương',
    gender: 'female',
    role: 'Con gái trưởng thôn',
    personality: 'Dịu dàng thông tuệ',
    birthday: { season: 'summer', day: 14 },
    lovedItems: ['chrysanthemum', 'osmanthus', 'peacock_feather'],
    likedItems: ['tea', 'wintersweet', 'rabbit_fur', 'rabbit_foot', 'hanhai_silk', 'osmanthus_honey', 'osmanthus_tea'],
    hatedItems: ['iron_ore', 'firewood'],
    dialogues: {
      stranger: ['Xin chào, bạn là chủ nhân mới của điền trang phải không? Mình là Liễu Nương.', 'Đào Nguyên Hương đẹp lắm, {title} nhất định sẽ thích nơi này.'],
      acquaintance: ['Hôm nay thời tiết đẹp thật, {title} cũng ra ngoài đi dạo sao?', 'Mình đang đọc một quyển cổ thi tập, có muốn cùng đọc không?'],
      friendly: ['Có {title} ở đây, thôn làng trở nên náo nhiệt hơn hẳn.', 'Mình có làm một ít bánh hoa quế, {player} ăn thử một miếng đi.'],
      bestFriend: ['Trò chuyện cùng {title} lúc nào cũng vui vẻ...', 'Bông hoa này tặng cho bạn, là mình tìm thấy trên núi đấy.']
    },
    marriageable: true,
    heartEventIds: ['liu_niang_heart_3', 'liu_niang_heart_5', 'liu_niang_heart_8'],
    datingDialogues: [
      'Hôm nay mình muốn cùng {player} ra bờ suối đi dạo quá.',
      '{title}, mình có thêu cho bạn một chiếc túi thơm, hãy luôn mang theo bên người nhé.',
      'Mỗi ngày được ở bên {player}, đều tốt đẹp giống như những gì viết trong thơ ca vậy.'
    ],
    zhijiDialogues: [
      'Buổi chiều được cùng {player} đọc thơ là khoảng thời gian trân quý nhất của mình.',
      'Có những lời chỉ muốn thổ lộ cho tri kỷ nghe... {title}, cảm ơn bạn vì đã luôn ở đây.',
      'Hồng nhan tri kỷ, một đời khó cầu. Gặp được {player} là phúc phận của mình.'
    ],
    zhijiHeartEventIds: ['liu_niang_zhiji_7', 'liu_niang_zhiji_9']
  },
  {
    id: 'a_shi',
    name: 'A Thạch',
    gender: 'male',
    role: 'Thợ mỏ',
    personality: 'Trầm mặc ít nói',
    birthday: { season: 'autumn', day: 5 },
    lovedItems: ['ruby', 'jade', 'hanhai_turquoise'],
    likedItems: ['gold_ore', 'iron_ore', 'potato', 'rabbit_foot'],
    hatedItems: ['chrysanthemum', 'wintersweet'],
    dialogues: {
      stranger: ['... Ừm.', 'Hang mỏ... {title} cẩn thận một chút.'],
      acquaintance: ['{title} cũng đi đào mỏ sao?... Mang cuốc chim theo.', 'Dưới tầng sâu có đồ tốt, nhưng cũng có nguy hiểm.'],
      friendly: ['Viên quặng này khá tốt, cho {title}.', 'Cuốc của {player} đến lúc nâng cấp rồi, tôi có thể xem giúp cho.'],
      bestFriend: ['... {player} là người bạn đầu tiên của tôi.', 'Kho báu nơi sâu nhất... tôi chỉ kể cho mình {title} nghe.']
    },
    marriageable: true,
    heartEventIds: ['a_shi_heart_3', 'a_shi_heart_5', 'a_shi_heart_8'],
    datingDialogues: [
      '... {player}, viên quặng này rất đẹp. Giống như đôi mắt của bạn vậy.',
      'Trước đây tôi thấy hang mỏ là tốt nhất, còn bây giờ... nơi có {title} mới là tốt nhất.',
      'Tôi không giỏi ăn nói... nhưng có {player} ở bên cạnh là đủ rồi.'
    ],
    zhijiDialogues: ['... Có bạn đào mỏ bên cạnh, hiệu suất hình như cao hơn hẳn.', '{player}, viên quặng này... chỉ có tri kỷ mới xứng đáng sở hữu.', 'Không cần trò chuyện mà vẫn thấy thoải mái... Đây chính là tri kỷ nhỉ.'],
    zhijiHeartEventIds: ['a_shi_zhiji_7', 'a_shi_zhiji_9']
  },
  {
    id: 'qiu_yue',
    name: 'Thu Nguyệt',
    gender: 'female',
    role: 'Thôn nữ làng chài',
    personality: 'Hoạt bát cởi mở',
    birthday: { season: 'winter', day: 20 },
    lovedItems: ['koi', 'giant_salamander'],
    likedItems: ['crucian', 'carp', 'grass_carp', 'bass', 'rabbit_foot', 'smoked_carp', 'smoked_bass'],
    hatedItems: ['copper_ore', 'iron_ore'],
    dialogues: {
      stranger: ['Ái chà, gương mặt mới kìa! Chào {title}, mình là Thu Nguyệt, người biết câu cá giỏi nhất ở đây!', 'Muốn học câu cá thì cứ tới tìm mình nhé!'],
      acquaintance: ['Hôm nay nước suối trong vắt, chắc chắn sẽ câu được cá lớn!', 'Dáng vẻ câu cá của {title} trông ngày càng ra dáng rồi đấy.'],
      friendly: ['Đây là điểm câu cá bí mật của riêng mình, chỉ kể cho {title} nghe thôi đó.', 'Để mình dạy {player} làm món cá chép kho tộ nhé, ngon cực kỳ luôn!'],
      bestFriend: ['Sau này chúng mình cùng đi câu cá nhé? Ngày nào cũng đi luôn!', '{title} là tay câu cừ khôi nhất mà mình từng gặp! Hì hì.']
    },
    marriageable: true,
    heartEventIds: ['qiu_yue_heart_3', 'qiu_yue_heart_5', 'qiu_yue_heart_8'],
    datingDialogues: [
      '{player}! Hoàng hôn hôm nay đẹp quá, chúng mình cùng ngắm đi!',
      'Hì hì, {title} là của mình rồi, người khác không được tranh giành đâu đấy.',
      'Sau này ngày nào cũng đi câu cá chung nhé? Chỉ hai chúng mình thôi!'
    ],
    zhijiDialogues: [
      '{player}! Hôm nay đi câu cá chung đi! Chỉ có tri kỷ mới được tới điểm câu bí mật của mình thôi đó!',
      'Hehe, bạn có thể nói với tôi bất cứ điều gì bạn nghĩ trong đầu! Chúng tôi là bạn thân!',
      'Sau này dù đi đâu, mình cũng sẽ mang {title} theo cùng!'
    ],
    zhijiHeartEventIds: ['qiu_yue_zhiji_7', 'qiu_yue_zhiji_9']
  },
  {
    id: 'lin_lao',
    name: 'Lâm Lão',
    gender: 'male',
    role: 'Lão trung y',
    personality: 'Hiền từ bác học',
    birthday: { season: 'autumn', day: 22 },
    lovedItems: ['herb', 'tea', 'antler_velvet'],
    likedItems: [
      'winter_bamboo_shoot',
      'bamboo',
      'yak_milk',
      'camel_milk',
      'rabbit_foot',
      'hanhai_spice',
      'herbal_paste',
      'ginseng_extract',
      'antler_powder'
    ],
    hatedItems: ['ruby', 'gold_ore'],
    dialogues: {
      stranger: ['Người trẻ tuổi, mới tới nơi này, có quen với khí hậu đất cát ở đây không?', 'Lão phu hành y mấy chục năm qua, {title} có chỗ nào không khỏe cứ việc nói.'],
      acquaintance: ['Thảo dược này là thứ tốt, vừa có thể làm thuốc vừa có thể pha trà.', 'Sắc mặt của {title} trông tốt hơn nhiều so với lúc mới tới rồi.'],
      friendly: ['Lão phu có một thang thuốc dược thiện, có thể tăng cường thể lực.', 'Ông nội của {player}... vốn là cố nhân của lão phu.'],
      bestFriend: ['Cuốn sách 《Bản Thảo Thập Di》 này xin tặng cho {title}. Hãy nghiên cứu thật kỹ nhé.', 'Tương lai của Đào Nguyên Hương đành trông cậy cả vào {player} vậy.']
    }
  },
  {
    id: 'xiao_man',
    name: 'Tiểu Mãn',
    gender: 'male',
    role: 'Học trò thợ mộc',
    personality: 'Tinh nghịch hiếu kỳ',
    birthday: { season: 'spring', day: 18 },
    lovedItems: ['watermelon', 'sweet_potato'],
    likedItems: ['wood', 'bamboo', 'radish', 'rabbit_foot', 'tea_oil', 'buffalo_cheese', 'yak_cheese'],
    hatedItems: ['herb', 'tea'],
    dialogues: {
      stranger: ['Oa, bạn chính là người mới tới đó hả! Mình là Tiểu Mãn!', 'Điền trang của {title} mình có đi nhìn trộm rồi, nát kinh khủng — à không phải, ý mình là rất có tiềm năng!'],
      acquaintance: ['Gần đây mình đang tập làm tủ gỗ, {title} có muốn lấy một cái không?', 'Sư phụ cứ bảo tay nghề của mình chưa ăn thua, hứ!'],
      friendly: ['Để mình giúp {title} sửa dụng cụ cho! Bảo đảm dùng cực ngon!', 'Hì hì, lén bớt giá cho {player} một chút nhé.'],
      bestFriend: ['Sau này mình sẽ xây ngôi nhà to nhất thôn! {title} thiết kế giúp mình nha?', '{player} là người bạn tốt nhất của mình đó!... Đừng kể cho người khác biết nha.']
    }
  },

  // ============================================================
  // 新增可婚 NPC (9) — 总计 12 可婚
  // ============================================================
  {
    id: 'chun_lan',
    name: 'Xuân Lan',
    gender: 'female',
    role: 'Bà chủ trà trang',
    personality: 'Dịu dàng đoan trang',
    birthday: { season: 'spring', day: 3 },
    lovedItems: ['tea', 'osmanthus', 'chrysanthemum'],
    likedItems: ['honey', 'lotus_seed', 'peach', 'rabbit_foot', 'hanhai_silk', 'chrysanthemum_honey', 'mayonnaise'],
    hatedItems: ['iron_ore', 'copper_ore'],
    dialogues: {
      stranger: ['Mời vào, uống chén trà nhé. Ta là Xuân Lan, trà trang này là do tổ tiên truyền lại.', 'Nếu {title} thích thưởng trà, sau này hãy thường xuyên ghé chơi.'],
      acquaintance: ['Hôm nay ta pha trà Long Tỉnh trước mùa thanh minh, {title} nếm thử xem?', 'Hái trà phải tranh thủ lúc sáng sớm khi sương chưa tan, lúc ấy lá trà mới là non nhất.'],
      friendly: ['Khẩu vị của {player} ta đã ghi nhớ rồi, có đặc biệt giữ lại loại trà chàng thích đấy.', 'Nhà ta có vài mẫu vườn trà, hôm nào sẽ dẫn {title} đi xem thử.'],
      bestFriend: ['Khoảng thời gian được cùng {title} thưởng trà là điều ta mong đợi nhất trong ngày.', 'Chén trà này chỉ pha riêng cho {player}.']
    },
    marriageable: true,
    heartEventIds: ['chun_lan_heart_3', 'chun_lan_heart_5', 'chun_lan_heart_8'],
    datingDialogues: [
      'Chén trà này là do ta đặc biệt pha chế cho {player}, thử xem sao.',
      'Buổi chiều cùng {title} thưởng trà là khoảng thời gian trân quý nhất của ta.',
      '{player}, mỗi ngày sau này, ta đều nguyện được cùng chàng chung uống một ấm trà thanh.'
    ],
    zhijiDialogues: [
      'Chén trà này chỉ pha cho tri kỷ. {player} xin mời dùng.',
      'Chuyện của trà trang trước đây chỉ có một mình ta gánh vác. Từ khi có {title}, ta đã nhẹ nhõm hơn nhiều.',
      'Hồng nhan tri kỷ cùng thưởng trà, niềm vui lớn nhất đời người cũng chỉ đến thế.'
    ],
    zhijiHeartEventIds: ['chun_lan_zhiji_7', 'chun_lan_zhiji_9']
  },
  {
    id: 'xue_qin',
    name: 'Tuyết Cần',
    gender: 'female',
    role: 'Họa sĩ',
    personality: 'Cô độc thanh cao',
    birthday: { season: 'winter', day: 10 },
    lovedItems: ['snow_lotus', 'moonstone'],
    likedItems: ['chrysanthemum', 'wintersweet', 'bamboo', 'rabbit_foot', 'hanhai_turquoise', 'snow_lotus_honey', 'goat_cheese'],
    hatedItems: ['pickled_cabbage', 'dried_radish'],
    dialogues: {
      stranger: ['... Ngươi chắn hết ánh sáng của ta rồi.', 'Nếu không mua tranh thì xin đừng chạm vào những màu vẽ đó.'],
      acquaintance: ['{title} có hứng thú với tranh vẽ sao? Nhãn quan của ngươi cũng được đấy.', 'Bức tranh sơn thủy này lấy cảm hứng từ thác nước phía sau thôn.'],
      friendly: ['{player}, điền trang của ngươi dưới ánh hoàng hôn đẹp lắm, ta có vẽ một bức này.', 'Vốn dĩ ta không thích những nơi đông người... nhưng có {title} đến thì cũng tạm được.'],
      bestFriend: ['Trước đây ta cứ ngỡ thế gian không ai hiểu được tranh của mình... cho đến khi gặp {player}.', 'Bức tranh này là vẽ cho {title}, hãy giữ lấy.']
    },
    marriageable: true,
    heartEventIds: ['xue_qin_heart_3', 'xue_qin_heart_5', 'xue_qin_heart_8'],
    datingDialogues: [
      '... {player}, đừng động đậy, để ta vẽ lại dáng vẻ lúc này của ngươi.',
      'Trước đây ta chỉ tìm kiếm cái đẹp trong tranh, còn bây giờ... {title} còn đẹp hơn cả tranh vẽ.',
      'Tên của bức tranh này là 《Chốn Về》. Bởi vì có ngươi, ta đã có một chốn để quay về.'
    ],
    zhijiDialogues: [
      '... Ngươi là người duy nhất có thể nhìn ta vẽ tranh mà không khiến ta bực bội. Tri kỷ chắc hẳn là thế này.',
      'Chủ đề của bức họa này là \'Tri Âm\'... cảm hứng đến từ {player}.',
      'Trước đây ta cứ nghĩ thế gian này không ai hiểu mình. Giờ không còn nghĩ vậy nữa.'
    ],
    zhijiHeartEventIds: ['xue_qin_zhiji_7', 'xue_qin_zhiji_9']
  },
  {
    id: 'su_su',
    name: 'Tố Tố',
    gender: 'female',
    role: 'Thợ may',
    personality: 'Thùy mị khéo tay',
    birthday: { season: 'summer', day: 3 },
    lovedItems: ['silk', 'wintersweet', 'alpaca_wool', 'peacock_feather'],
    likedItems: ['wool', 'chrysanthemum', 'osmanthus', 'rabbit_fur', 'rabbit_foot', 'dried_peach', 'dried_lychee'],
    hatedItems: ['iron_ore', 'stone'],
    dialogues: {
      stranger: ['Chào mừng đến với Tố Tài Phường, ta là Tố Tố.', 'Cần y phục gì, {title} cứ việc nói.'],
      acquaintance: ['Áo của {title} bị rách một lỗ rồi, để ta vá lại giúp cho.', 'Hoa văn trên sấp vải này rất đặc biệt, thích hợp để may xiêm y ngày xuân.'],
      friendly: ['Ta có may cho {player} một chiếc áo gấm, mặc thử xem có vừa vặn không?', 'Mỗi một đường kim mũi chỉ đều là tâm ý...'],
      bestFriend: ['Nhìn thấy {player} mặc y phục ta may là điều khiến ta vui sướng nhất.', 'Sau này ta chỉ may y phục cho riêng một mình {title} thôi.']
    },
    marriageable: true,
    heartEventIds: ['su_su_heart_3', 'su_su_heart_5', 'su_su_heart_8'],
    datingDialogues: [
      'Ta đang may một bộ y phục cho {player}, từng mũi kim đều đong đầy tâm ý.',
      'Khoảnh khắc {title} khoác lên người bộ y phục do ta may là lúc ta hạnh phúc nhất.',
      'Sau này chỉ may y phục cho riêng một mình {player}... có được không?'
    ],
    zhijiDialogues: [
      'Y phục may cho {player}, từng đường kim đều vô cùng chăm chút... bởi vì chàng là tri kỷ của ta.',
      'Những lúc có tâm sự, chỉ cần nghĩ đến {title} là ta thấy an lòng.',
      'Giữa tri kỷ không cần quá nhiều lời... nhưng ta vẫn muốn trò chuyện với {player} nhiều hơn.'
    ],
    zhijiHeartEventIds: ['su_su_zhiji_7', 'su_su_zhiji_9']
  },
  {
    id: 'hong_dou',
    name: 'Hồng Đậu',
    gender: 'female',
    role: 'Nữ chủ tửu trang',
    personality: 'Hào sảng phóng khoáng',
    birthday: { season: 'autumn', day: 10 },
    lovedItems: ['watermelon_wine', 'peach_wine', 'jujube_wine'],
    likedItems: ['watermelon', 'peanut', 'corn', 'rabbit_foot', 'corn_wine', 'cactus_wine'],
    hatedItems: ['tea', 'herb'],
    dialogues: {
      stranger: ['Úi chà, làm một vò chứ? Ta là Hồng Đậu, người làm chủ cái tửu trang này!', 'Không uống rượu cũng chẳng sao, cứ vào trong ngồi chơi, {title} đừng khách sáo.'],
      acquaintance: ['Rượu hoa đào năm nay ủ rất ngon, {title} làm một bát chứ?', 'Bí quyết ủ rượu chính là — dụng tâm! Và thật nhiều kiên nhẫn.'],
      friendly: ['{player} là bằng hữu tốt của ta, vò rượu này tặng cho ngươi đấy!', 'Lần tới chúng ta oẳn tù tì uống rượu nhé, ai thua người đó bao!'],
      bestFriend: ['Cả thôn này chỉ có mỗi {title} là xứng đáng thưởng thức rượu quý ta cất giữ thôi.', 'Có {player} ở đây, rượu mới thêm nồng đượm.']
    },
    marriageable: true,
    heartEventIds: ['hong_dou_heart_3', 'hong_dou_heart_5', 'hong_dou_heart_8'],
    datingDialogues: [
      '{player}! Mau tới đây uống với ta một ly! Rượu hôm nay ngọt lắm.',
      'Này, {title}, ngươi là người duy nhất có thể khiến ta đỏ mặt đấy.',
      'Rượu của tửu trang sau này sẽ giữ lại hết cho {player}! Ai cũng đừng hòng tranh giành!'
    ],
    zhijiDialogues: [
      '{player}! Tới đây! Tri kỷ uống rượu với nhau không cần khách khí! Cạn ly!',
      'Khắp thiên hạ người có thể đấu rượu được với ta chỉ có mỗi {title}! Đây mới đúng là tri kỷ!',
      'Có người tri kỷ như ngươi, rượu dù có nồng nặc đến mấy cũng hóa ngọt ngào.'
    ],
    zhijiHeartEventIds: ['hong_dou_zhiji_7', 'hong_dou_zhiji_9']
  },
  {
    id: 'dan_qing',
    name: 'Đan Thanh',
    gender: 'male',
    role: 'Thư sinh',
    personality: 'Nho nhã ôn hòa',
    birthday: { season: 'spring', day: 22 },
    lovedItems: ['tea', 'bamboo'],
    likedItems: ['chrysanthemum', 'osmanthus', 'pine_cone', 'rabbit_foot'],
    hatedItems: ['copper_ore', 'firewood'],
    dialogues: {
      stranger: ['Tại hạ là Đan Thanh, du học tới đây, bị cảnh sắc tươi đẹp của Đào Nguyên giữ chân lại.', '{title} cũng là người yêu thích đọc sách sao?'],
      acquaintance: ['Hôm nay đọc được một áng văn hay, muốn chia sẻ cùng {title}.', '"\'Sơn bất tại cao, hữu tiên tắc danh\' — Đào Nguyên Hương chính là như vậy.'],
      friendly: ['{player}, hôm nào ta sẽ viết tặng bạn một bức chữ nhé.', 'Có được người tri kỷ như {title}, đời này không còn gì hối tiếc.'],
      bestFriend: ['Nếu không gặp được {player}, ta đã sớm rời khỏi nơi này rồi.', 'Bút nghiên giấy mực, cũng chẳng bằng một nụ cười của {title}.']
    },
    marriageable: true,
    heartEventIds: ['dan_qing_heart_3', 'dan_qing_heart_5', 'dan_qing_heart_8'],
    datingDialogues: [
      'Hôm nay ta có viết một bài từ, là về {player}... muốn nghe thử không?',
      'Trước khi gặp {title}, ta cứ ngỡ đời này chỉ có thể làm bạn với sách vở.',
      '{player}, \'Chấp tử chi thủ, dữ tử giai lão\', nguyện cùng người đi đến đầu bạc răng long.'
    ],
    zhijiDialogues: [
      'Cao sơn lưu thủy, tìm kiếm tri âm. {player}, người chính là Tử Kỳ của ta.',
      'Hôm nay ta lại viết một áng văn mới, người đầu tiên ta muốn cho xem chính là {title}.',
      'Có{player}Với người bạn thân thiết như vậy, dù Bất Nghị có sống cả đời thì anh sẽ có điều gì hối tiếc?'
    ],
    zhijiHeartEventIds: ['dan_qing_zhiji_7', 'dan_qing_zhiji_9']
  },
  {
    id: 'a_tie',
    name: 'A Thiết',
    gender: 'male',
    role: 'Học trò thợ rèn',
    personality: 'Chân chất thật thà',
    birthday: { season: 'autumn', day: 15 },
    lovedItems: ['iron_ore', 'gold_ore'],
    likedItems: ['copper_ore', 'potato', 'corn', 'rabbit_foot'],
    hatedItems: ['chrysanthemum', 'silk'],
    dialogues: {
      stranger: ['Á, ch-chào bạn! Tôi là A Thiết... là học trò của sư phụ Tôn.', 'Rèn sắt mệt lắm, nhưng mà thú vị vô cùng... {title} có muốn xem thử không?'],
      acquaintance: ['Dụng cụ của {title} có cái nào cần sửa không? Tôi... tôi có thể giúp sửa cho.', 'Hôm nay rèn được một con dao tốt, sư phụ Tôn thế mà lại khen tôi đấy!'],
      friendly: ['Tôi có lén gia cố thêm cho dụng cụ của {player} rồi, bền hơn nhiều đấy.', '{title} là người duy nhất không chê cười tôi vụng về...'],
      bestFriend: ['{player}... cảm ơn bạn đã luôn cổ vũ tôi.', 'Khi tôi tốt nghiệp, tôi sẽ đưa cho bạn tác phẩm đầu tiên của tôi{title}.']
    },
    marriageable: true,
    heartEventIds: ['a_tie_heart_3', 'a_tie_heart_5', 'a_tie_heart_8'],
    datingDialogues: [
      'Tôi... tôi có rèn một đóa hoa sắt cho {player}... nếu thấy không đẹp thì cứ vứt đi nhé...',
      'Có {title} đứng bên cạnh nhìn tôi rèn sắt, cảm giác cái búa cũng nhẹ đi hẳn.',
      '{player}... tôi sẽ nỗ lực học thành tài, sau đó... sẽ chăm sóc bạn cả đời.'
    ],
    zhijiDialogues: [
      'C-Có {player} ở đây, tôi rèn sắt càng thêm hăng hái! Tri kỷ chắc chắn là như thế này rồi!',
      'Tôi có rèn cho bạn một dụng cụ mới, ch-chắc chắn hơn hẳn đồ rèn cho người khác!',
      '{title} là người anh em tốt nhất của tôi!... À không phải, là tri kỷ mới đúng!'
    ],
    zhijiHeartEventIds: ['a_tie_zhiji_7', 'a_tie_zhiji_9']
  },
  {
    id: 'yun_fei',
    name: 'Vân Phi',
    gender: 'male',
    role: 'Thợ săn',
    personality: 'Kiêu ngạo bất kham',
    birthday: { season: 'summer', day: 8 },
    lovedItems: ['wild_mushroom', 'ginseng'],
    likedItems: ['pine_cone', 'herb', 'wild_berry', 'rabbit_foot'],
    hatedItems: ['gold_ore', 'jade'],
    dialogues: {
      stranger: ['Đừng lại quá gần, ta không thích giao thiệp với người khác.', 'Quen sống ở trong núi rồi, trong thôn ồn ào quá.'],
      acquaintance: ['... Sao {title} lại tới nữa rồi. Thôi được rồi, ngồi đi.', 'Đây is nấm hái trong núi, ngon hơn loại các ngươi tự trồng nhiều.'],
      friendly: ['{player}, ngươi là một trong số ít người không làm ta thấy phiền phức.', 'Sau này muốn vào núi cứ gọi {title}, ta thuộc đường lắm.'],
      bestFriend: ['Đời này ta không tin tưởng bất kỳ ai... ngoại trừ {player}.', '{title}, hãy cùng ta canh giữ cánh rừng này đi.']
    },
    marriageable: true,
    heartEventIds: ['yun_fei_heart_3', 'yun_fei_heart_5', 'yun_fei_heart_8'],
    datingDialogues: [
      '... {player}, ánh trăng hôm nay đẹp thật. Ngồi xuống đây cùng ta một lát.',
      'Trước đây ta chỉ tin bản thân mình. Còn bây giờ... cũng tin tưởng {title} rồi.',
      'Ngọn núi này, sau này ta sẽ cùng {player} trông giữ.'
    ],
    zhijiDialogues: ['... Trước đây không tin bất kỳ ai. Nhưng ngươi thì khác, {player}.', 'Đường vào núi sâu, ta chỉ từng dẫn một mình ngươi đi qua. Thế là đủ rồi.', 'Tri kỷ... còn nặng tình hơn cả bằng hữu, chẳng hề thua kém anh em xương máu.'],
    zhijiHeartEventIds: ['yun_fei_zhiji_7', 'yun_fei_zhiji_9']
  },
  {
    id: 'da_niu',
    name: 'Đại Ngưu',
    gender: 'male',
    role: 'Chàng trai mục trường',
    personality: 'Chân chất nhiệt tình',
    birthday: { season: 'winter', day: 3 },
    lovedItems: ['milk', 'hay', 'goat_milk', 'buffalo_milk', 'yak_milk'],
    likedItems: ['egg', 'corn', 'sweet_potato', 'truffle', 'donkey_milk', 'rabbit_foot', 'cheese', 'dried_mushroom'],
    hatedItems: ['ruby', 'moonstone'],
    dialogues: {
      stranger: ['Hê! Chào bạn nha! Tôi là Đại Ngưu! Tôi thích bò nhất trên đời!', '{title} đã nuôi động vật chưa? Tôi có thể chỉ cho!'],
      acquaintance: ['Con bò vàng già nhà tôi hôm nay tâm trạng cực kỳ tốt luôn!', '{title}, bạn sờ thử chú cừu nhỏ này xem, mềm mại chưa nè?'],
      friendly: ['{player}Những con gà chúng tôi nuôi rất tốt và chúng trông giống như tôi hồi đó!', 'Rảnh thì qua nhà tôi chơi, tôi cho {title} xem chú bê con mới sinh!'],
      bestFriend: ['{player} là người biết chăm sóc động vật chu đáo nhất mà tôi từng gặp!', '{title}, sau này hai đứa mình cùng mở một cái mục trường lớn nhé?']
    },
    marriageable: true,
    heartEventIds: ['da_niu_heart_3', 'da_niu_heart_5', 'da_niu_heart_8'],
    datingDialogues: [
      '{player}! Hôm nay bê con chào đời rồi! Người đầu tiên tôi muốn báo tin chính là bạn!',
      'Hì hì, ở bên cạnh {title} còn vui hơn là ở cạnh lũ bò nhiều!',
      'Sau này mục trường của tụi mình chắc chắn sẽ to nhất thôn! {player} tin không?'
    ],
    zhijiDialogues: [
      '{player}! Bạn là người anh em chí cốt nhất của tôi! Còn thân thiết hơn cả Phúc Bảo!',
      'Có bạn cùng tôi ngắm bò, dầm mưa, lùa cừu... vui hơn bất cứ thứ gì trên đời!',
      'Sau này hai đứa mình hợp tác mở mục trường đi! Tri kỷ chung sức, thiên hạ vô địch!'
    ],
    zhijiHeartEventIds: ['da_niu_zhiji_7', 'da_niu_zhiji_9']
  },
  {
    id: 'mo_bai',
    name: 'Mặc Bạch',
    gender: 'male',
    role: 'Nhạc sĩ',
    personality: 'Lặng lẽ u sầu',
    birthday: { season: 'spring', day: 12 },
    lovedItems: ['bamboo', 'moonstone'],
    likedItems: ['tea', 'chrysanthemum', 'pine_cone', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'pickled_cabbage'],
    dialogues: {
      stranger: ['... Xin chào. Tôi đang luyện cầm, xin đừng làm ồn quá.', 'Tôi là Mặc Bạch, một nhạc sĩ lãng du tới nơi này.'],
      acquaintance: ['{title} cũng thích nghe nhạc khúc sao? Hôm nào tôi sẽ gảy một bản cho bạn nghe.', 'Bản nhạc này có tên là 《Thu Thủy》, là khúc nhạc tôi viết riêng cho Đào Nguyên Hương.'],
      friendly: ['{player} tới rồi sao, thật đúng lúc, tôi mới soạn một khúc nhạc mới, bạn nghe thử xem.', 'Có{title}Hãy nghe tôi chơi piano……Tôi cảm thấy tốt hơn nhiều.'],
      bestFriend: ['Khúc nhạc này không có tên... bởi vì nó được soạn riêng cho {player}.', '{title} chính là tri âm của tôi.']
    },
    marriageable: true,
    heartEventIds: ['mo_bai_heart_3', 'mo_bai_heart_5', 'mo_bai_heart_8'],
    datingDialogues: [
      '... {player}, bản nhạc này tôi chỉ gảy cho một mình bạn nghe.',
      'Trước đây tôi luôn nghĩ âm nhạc là sự cô độc... gặp được {title} mới hiểu ra, hóa ra âm nhạc cũng có thể ấm áp đến thế.',
      'Soạn riêng cho {player} một khúc nhạc, đặt tên là — 《Người Về》.'
    ],
    zhijiDialogues: [
      'Tri âm khó kiếm... {player} là người duy nhất có thể thấu hiểu tiếng lòng qua tiếng đàn của tôi.',
      'Khúc nhạc soạn cho bạn ngày một nhiều hơn... sức mạnh của tri kỷ quả thật vô cùng kỳ diệu.',
      'Những ngày có {title} ở bên, tiếng đàn cũng trở nên ấm áp lạ thường.'
    ],
    zhijiHeartEventIds: ['mo_bai_zhiji_7', 'mo_bai_zhiji_9']
  },

  // ============================================================
  // 不可婚 NPC (22) — 总计 22 不可婚
  // ============================================================
  {
    id: 'wang_dashen',
    name: 'Thím Vương',
    gender: 'female',
    role: 'Đầu bếp của thôn',
    personality: 'Nhiệt tình lương thiện',
    birthday: { season: 'summer', day: 18 },
    lovedItems: ['rice', 'sesame_oil'],
    likedItems: ['cabbage', 'radish', 'egg', 'rabbit_foot', 'rice_vinegar', 'pickled_cabbage', 'pumpkin_preserve'],
    hatedItems: ['quartz', 'obsidian'],
    dialogues: {
      stranger: ['Ái chà, cháu mới tới hả? Người gầy nhom như cây tre thế kia, lại đây nào, thím xới cho bát cơm nóng!', 'Ta là thím Vương, đầu bếp chính lo việc hiếu hỷ trong thôn này!'],
      acquaintance: ['{title} hôm nay đã ăn gì chưa? Chưa ăn thì để thím hâm nóng cho bát cháo.', 'Bí quyết nấu ăn ngon chính là — bớt bỏ muối, thêm bỏ yêu thương.'],
      friendly: ['{player} ngày ngày càng khỏe mạnh vạm vỡ ra đấy, xem ra ăn không ít cơm thím nấu rồi!', 'Đây là món tủ của thím, {title} ăn thử xem.'],
      bestFriend: ['{player} cứ như con đẻ của thím vậy, nhìn cháu bận rộn ngược xuôi, thím thấy thương quá.', 'Bao giờ thì tính chuyện thành gia lập thất đây? Thím sẽ đứng ra lo liệu tiệc rượu cho!']
    }
  },
  {
    id: 'zhao_mujiang',
    name: 'Triệu thợ mộc',
    gender: 'male',
    role: 'Thợ mộc lành nghề',
    personality: 'Nghiêm khắc nghiêm túc',
    birthday: { season: 'autumn', day: 1 },
    lovedItems: ['wood', 'bamboo'],
    likedItems: ['pine_resin', 'camphor_oil', 'rabbit_foot'],
    hatedItems: ['watermelon', 'peanut'],
    dialogues: {
      stranger: ['Hửm? Tìm ta có việc gì? Ta là Triệu thợ mộc. Có việc gì liên quan đến tay nghề cứ nói thẳng.', 'Thằng nhóc Tiểu Mãn lại lười biếng rồi đúng không...'],
      acquaintance: ['Kiến trúc nhà kho của ngươi khá tốt, là tay nghề của người đi trước. {title} nhớ bảo quản cho tốt.', 'Gỗ lạt cái thứ này cũng giống như con người vậy, phải nương theo thớ vân của nó mà làm.'],
      friendly: ['{player} khá lắm, làm việc rất thực tế, không giống như cái thằng khỉ con Tiểu Mãn kia.', 'Có chỗ nào cần tu sửa thì cứ tới tìm {title}... à không, tới tìm ta.'],
      bestFriend: ['{player}, ngươi làm ta nhớ lại bản thân mình hồi còn trẻ.', 'Cái bào gỗ này đã theo ta suốt ba mươi năm, nay tặng lại cho {title}.']
    }
  },
  {
    id: 'sun_tiejiang',
    name: 'Thợ rèn Tôn',
    gender: 'male',
    role: 'Thợ rèn',
    personality: 'Thô ráp hào sảng',
    birthday: { season: 'winter', day: 15 },
    lovedItems: ['gold_ore', 'iridium_ore', 'copper_ore'],
    likedItems: ['iron_ore', 'crystal_ore', 'rabbit_foot'],
    hatedItems: ['chrysanthemum', 'silk'],
    dialogues: {
      stranger: ['Công việc rèn sắt cứ tìm ta là đúng người rồi! Ta là thợ rèn Tôn!', 'A Thiết là đệ tử của ta, tay nghề còn non nớt lắm. Dụng cụ của {title} cứ để đích thân ta làm.'],
      acquaintance: ['Thép tốt phải dùng vào lưỡi đao, dụng cụ của {title} đến lúc nâng cấp rồi đấy.', 'Nghe tiếng búa nện xem — keng keng choang choang, còn êm tai hơn cả hát!'],
      friendly: ['{player}, con dao này ta rèn suốt ba ngày ba đêm, ngươi dùng thử xem.', 'Có được người khách sộp như {title}, ta rèn sắt cũng thấy hăng máu hẳn lên!'],
      bestFriend: ['Đồ sắt tốt nhất trong thôn đều nằm trong tay {player} cả rồi.', '{title} khi nào muốn rèn một món thần binh lợi khí thì cứ bảo với lão Tôn này!']
    }
  },
  {
    id: 'zhang_popo',
    name: 'Bà cụ Trương',
    gender: 'female',
    role: 'Lão nhân dệt vải',
    personality: 'Hiền từ lải nhải',
    birthday: { season: 'spring', day: 7 },
    lovedItems: ['wool', 'silk'],
    likedItems: ['tea', 'pumpkin', 'sweet_potato', 'rabbit_foot', 'pickled_ginger', 'dried_radish', 'sesame_paste'],
    hatedItems: ['gold_ore', 'ruby'],
    dialogues: {
      stranger: ['Ái chà chà, người trẻ tuổi tới chơi đó hả? Mau ngồi mau ngồi đi. Mụ già này họ Trương, cả đời chỉ biết dệt vải thôi.', 'Y phục cháu đang mặc không ổn đâu, hôm nào bà cụ dệt tặng cho một bộ khác.'],
      acquaintance: ['{title} tới rồi đấy à? Uống ngụm trà đi. Để bà cụ kể cho nghe chuyện ngày xửa ngày xưa.', 'Hồi mụ còn trẻ ấy à, cái thôn này náo nhiệt lắm...'],
      friendly: ['{player} quả là một đứa trẻ ngoan. Bà cụ dệt tặng cháu chiếc khăn quàng cổ này.', 'Ông nội cháu hồi xưa thường hay qua đây trò chuyện với bà cụ, cháu cũng hiền lành y hệt như ông ấy vậy.'],
      bestFriend: ['Có {player} ở đây, bà cụ cảm thấy an lòng lắm.', 'Mụ già này sống đến từng này tuổi rồi, {title} chính là hậu bối khiến mụ thấy an ủi nhất.']
    }
  },
  {
    id: 'li_yu',
    name: 'Lão ngư họ Lý',
    gender: 'male',
    role: 'Lão ngư phủ',
    personality: 'Đạm bạc nhàn nhã',
    birthday: { season: 'summer', day: 22 },
    lovedItems: ['koi', 'sturgeon'],
    likedItems: ['crucian', 'bass', 'tea', 'rabbit_foot', 'smoked_eel', 'smoked_sturgeon', 'smoked_mandarin_fish'],
    hatedItems: ['gold_ore', 'ruby'],
    dialogues: {
      stranger: ['Hơ, lại có thêm một người tới câu cá à. Lão hủ họ Lý, đã ngồi bên bờ suối này suốt hai mươi năm nay rồi.', 'Câu cá sao? Không vội được đâu.'],
      acquaintance: ['Cần câu chính là cánh tay nối dài, tâm có tĩnh thì cá tự khắc sẽ cắn câu.', 'Vận may của {title} hôm nay thế nào rồi?'],
      friendly: ['Kỹ năng câu cá của {player} có tiến bộ đấy, bắt đầu có chút dáng dấp của lão phu năm xưa rồi.', 'Cách câu này gọi là "Lạc Diệp Câu", truyền lại cho {title} đấy.'],
      bestFriend: ['Một cần, một dây, một bầu rượu, có {player} làm bạn, đời này không uổng phí.', 'Toàn bộ sở học cả đời của lão phu đều đã truyền lại hết cho {title} rồi.']
    }
  },
  {
    id: 'zhou_xiucai',
    name: 'Chu tú tài',
    gender: 'male',
    role: 'Thầy đồ',
    personality: 'Hủ nho đáng yêu',
    birthday: { season: 'autumn', day: 18 },
    lovedItems: ['bamboo', 'tea'],
    likedItems: ['chrysanthemum', 'osmanthus', 'rabbit_foot', 'chrysanthemum_tea', 'green_tea_drink', 'truffle_oil'],
    hatedItems: ['pickled_cabbage', 'corn_wine'],
    dialogues: {
      stranger: ['"\'Hữu bằng tự viễn phương lai, bất diệc lạc hồ\'. Tại hạ là Chu tú tài, thầy đồ dạy học ở nơi này.', '{title} đã từng đọc qua cuốn 《Luận Ngữ》 chưa?'],
      acquaintance: ['Tử viết: Ôn cố nhi tri tân. {title} dạo này có đọc sách sách vở gì không?', 'Hôm nay ta dạy cho A Hoa và Thạch Đầu viết chữ, hai đứa trẻ nghịch ngợm đó... ôi chao.'],
      friendly: ['{player} dẫu làm nông phu, nhưng lại mang khí chất của bậc nho nhã thư sinh.', 'Ta mới có được một cuốn cổ tịch, {title} có hứng thú cùng nghiên cứu thảo luận không?'],
      bestFriend: ['{player} quả thực là lương hữu của ta!', 'Cây bút lông này là di vật của tiên sư để lại, xin tặng cho {title}, hy vọng ngươi sẽ dùng nó vào việc nghĩa.']
    }
  },
  {
    id: 'wu_shen',
    name: 'Thím Ngô',
    gender: 'female',
    role: 'Người làm tiệm tạp hóa',
    personality: 'Tinh ranh sắc sảo',
    birthday: { season: 'spring', day: 25 },
    lovedItems: ['honey', 'sesame_oil'],
    likedItems: ['egg', 'rice', 'peanut', 'rabbit_foot'],
    hatedItems: ['wild_mushroom', 'pine_cone'],
    dialogues: {
      stranger: ['Người mới tới hả? Việc lớn ở tiệm Vạn Vật cứ tìm Bác Trần, còn mấy việc lặt vặt tìm tôi là được.', 'Tôi là thím Ngô, làm công việc phụ giúp ở trong tiệm.'],
      acquaintance: ['{title}, cải thảo hôm nay tươi ngon lắm đó, mua một ít đi?', 'Bác Trần tính tình mềm yếu quá, cứ cho nợ suốt, tôi là tôi không có chiều thế đâu.'],
      friendly: ['Công việc làm ăn của {player} khấm khá quá nhỉ! Lén bảo cho biết nhé, đợt hàng tới tôi sẽ giữ lại vài món tốt cho.', 'Làm người ấy mà, phải biết tính toán chi li thì cuộc sống mới khấm khá được.'],
      bestFriend: ['{player} là người trẻ tuổi biết lo toan quán xuyến gia đình nhất mà tôi từng gặp.', 'Có việc gì cứ tìm thím Ngô, {title} cứ mở lời là tôi giúp ngay.']
    }
  },
  {
    id: 'ma_liu',
    name: 'Mã Lục',
    gender: 'male',
    role: 'Người bán hàng rong',
    personality: 'Mồm mép tép nhảy',
    birthday: { season: 'winter', day: 20 },
    lovedItems: ['jade', 'prismatic_shard'],
    likedItems: ['gold_ore', 'honey', 'peach', 'rabbit_foot'],
    hatedItems: ['stone', 'wood'],
    dialogues: {
      stranger: ['Ái chà {title}! Tôi là Mã Lục, thương nhân đi nam về bắc đây! Đồ chơi hàng hiếm lạ mắt tôi có đầy ra nhé!', 'Lại đây xem thử đi, bảo đảm bên ngoài không chỗ nào bán đâu!'],
      acquaintance: ['{title} tới rồi đó hả! Hôm nay cho xem vài món đồ độc quyền cực tốt nè!', 'Làm ăn buôn bán là phải giữ chữ tín... hì hì, đương nhiên là phải có cả lợi nhuận nữa.'],
      friendly: ['{player}, khách quen cả rồi, bớt cho bạn hẳn hai mươi phần trăm luôn!', 'Tôi đi khắp gầm trời này rồi, chỉ thấy có cái thôn của {title} là khiến người ta dễ chịu nhất.'],
      bestFriend: ['{player} là người tôi tin tưởng nhất, mấy món hàng tốt này bạn cứ chọn trước đi.', 'Đừng nhìn tôi mồm mép tép nhảy thế thôi, chứ trước mặt {title} tôi toàn nói lời thật lòng cả đấy.']
    }
  },
  {
    id: 'lao_song',
    name: 'Lão Tống',
    gender: 'male',
    role: 'Người gác đêm',
    personality: 'Trầm ổn ít lời',
    birthday: { season: 'summer', day: 10 },
    lovedItems: ['tea', 'firewood'],
    likedItems: ['wood', 'pine_resin', 'herb', 'rabbit_foot'],
    hatedItems: ['watermelon', 'peach'],
    dialogues: {
      stranger: ['... Ừm. Lão Tống. Gác đêm.', 'Ban đêm có động tĩnh gì, {title} đừng hoảng hốt.'],
      acquaintance: ['Đêm đã khuya rồi, {title} nên về nhà sớm đi.', 'Trăng sáng quá...'],
      friendly: ['{player} quả là người siêng năng, ngày nào cũng thức dậy sớm hơn cả gà gáy.', 'Ấm trà nóng này giữ lại cho {title} đấy, uống cho ấm người lúc nửa đêm.'],
      bestFriend: ['Gác đêm suốt hai mươi năm ròng, {player} là một trong số ít người chịu mở lời trò chuyện với lão già này.', 'Có{title}Bây giờ Lão Song cảm thấy yên tâm.']
    }
  },
  {
    id: 'pang_shen',
    name: 'Thím Mập',
    gender: 'female',
    role: 'Chủ xưởng đậu hũ',
    personality: 'Đanh đá sảng khoái',
    birthday: { season: 'autumn', day: 25 },
    lovedItems: ['broad_bean', 'sesame'],
    likedItems: ['rice', 'peanut', 'cabbage', 'rabbit_foot'],
    hatedItems: ['ruby', 'jade'],
    dialogues: {
      stranger: ['Tới mua đậu hũ phải không? Đồ mới làm tươi ngon lắm đây! Ta là thím Mập!', '{title}Đừng nhìn tôi vì tôi béo nhưng tôi làm việc rất hiệu quả!'],
      acquaintance: ['Món đậu phụ hôm nay đặc biệt mềm.{title}Có một cái bát?', 'Điều quan trọng nhất để làm đậu phụ là nước ngon, và nước suối ở làng chúng tôi là thượng hạng!'],
      friendly: ['{player}, Tôi để lại miếng đậu già cho bạn nấu canh!', 'Bạn là người thực tế, không như Ma Liu xảo quyệt.'],
      bestFriend: ['{player}Khi nào bạn định đãi tiệc cưới cho dì của bạn?', '{title}Anh ấy là một nửa con của dì tôi!']
    }
  },
  {
    id: 'a_hua',
    name: 'A Hoa',
    gender: 'female',
    role: 'Cháu gái Bác Trần',
    personality: 'Ngây thơ lãng mạn',
    birthday: { season: 'spring', day: 1 },
    lovedItems: ['watermelon', 'wild_berry'],
    likedItems: ['peach', 'honey', 'peanut', 'rabbit_foot'],
    hatedItems: ['herb', 'ginseng'],
    dialogues: {
      stranger: ['Bạn là ai thế ạ? Em là A Hoa! Ông nội bảo không được nói chuyện với người lạ... á em lỡ nói mất rồi!', '{title} trồng cái gì thế ạ? Có đẹp mắt không?'],
      acquaintance: ['{title} ơi! Hôm nay Thạch Đầu lại bắt nạt em nữa rồi! Hừ!', 'Thầy Chu dạy tôi viết"Hoa"Lời nói thật khó khăn.'],
      friendly: ['{player} ơi, cho xem viên đá đẹp em nhặt được này!', 'Em thích {title} nhất luôn! Tốt hơn Thạch Đầu gấp trăm lần!'],
      bestFriend: ['{player} ơi, em có vẽ một bức tranh tặng anh/chị này! Xem nè, đây là anh/chị đang trồng ruộng đó.', 'Sau này lớn lên em cũng muốn giỏi giang giống như {title}!']
    }
  },
  {
    id: 'shi_tou',
    name: 'Thạch Đầu',
    gender: 'male',
    role: 'Đứa trẻ nghịch ngợm trong thôn',
    personality: 'Tinh nghịch quậy phá',
    birthday: { season: 'summer', day: 25 },
    lovedItems: ['sweet_potato', 'watermelon'],
    likedItems: ['wild_berry', 'corn', 'peanut', 'rabbit_foot'],
    hatedItems: ['tea', 'herb'],
    dialogues: {
      stranger: ['Hê hê hê! Anh/chị là người nông dân mới tới đó hả? Trông chẳng có vẻ gì là lợi hại cả!', 'Em tên là Thạch Đầu! Chạy nhanh nhất cái thôn này luôn!'],
      acquaintance: ['{title} ơi, có muốn thi chạy bộ không?', 'Hôm nay em lén đổ thêm nước vào nghiên mực của thầy Chu, thầy chẳng phát hiện ra luôn! Hê hê!'],
      friendly: ['{player} ơi, dạy em câu cá đi! Chị Thu Nguyệt cứ bảo em làm ồn quá!', 'Mách nhỏ cho {title} một bí mật này — cái hang động phía sau thôn có dơi đấy!'],
      bestFriend: ['Thật ra... {player} ơi, cha mẹ em đi làm thuê ở bên ngoài, lâu lắm rồi chưa về thăm em.', '{title} sau này vẫn sẽ ở lại trong thôn chứ? Đừng bỏ đi có được không?']
    }
  },
  {
    id: 'hui_niang',
    name: 'Huệ Nương',
    gender: 'female',
    role: 'Chủ tiệm thêu',
    personality: 'Kiên cường ôn hòa',
    birthday: { season: 'winter', day: 8 },
    lovedItems: ['silk', 'chrysanthemum', 'alpaca_wool'],
    likedItems: ['wool', 'tea', 'osmanthus', 'rabbit_fur', 'peacock_feather', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'copper_ore'],
    dialogues: {
      stranger: ['Xin chào, ta là Huệ Nương. Tiệm thêu này là do phu quân quá cố của ta để lại.', 'Nếu {title} cần đồ thêu thùa, có thể ghé qua đây xem thử.'],
      acquaintance: ['Một mình gánh vác tiệm thêu này quả thực không dễ dàng gì, nhưng cuối cùng cũng vượt qua được.', 'Hôm nay {title} trông nhàn nhã quá nhỉ.'],
      friendly: ['{player} là một người có trách nhiệm gánh vác, khiến người ta rất yên tâm.', 'Chiếc khăn thêu này xin tặng cho {title}, là do tự tay ta thêu đấy.'],
      bestFriend: ['{player} giúp ta hiểu ra rằng, dẫu một mình thì vẫn có thể sống rất tốt.', 'Có {title} ở bên, Huệ Nương không còn cảm thấy cô đơn nữa.']
    }
  },
  {
    id: 'lao_lu',
    name: 'Lão Lục',
    gender: 'male',
    role: 'Chủ hầm rượu',
    personality: 'Ham rượu hiếu khách',
    birthday: { season: 'autumn', day: 8 },
    lovedItems: ['watermelon_wine', 'peach_wine'],
    likedItems: ['jujube_wine', 'corn_wine', 'peanut', 'rabbit_foot', 'date_wine', 'osmanthus_wine'],
    hatedItems: ['tea', 'herb'],
    dialogues: {
      stranger: ['Lại đây lại đây! Vào uống một ly đi! Ta là lão Lục!', 'Sống trên đời này mà không uống rượu thì nhạt nhẽo biết bao! {title} nói có đúng không?'],
      acquaintance: ['{title}! Lại đây nào, hôm nay nếm thử rượu hoa đào mới ủ xem!', 'Con bé Hồng Đậu kia có thiên phú ủ rượu còn cao hơn cả ta nữa... hì.'],
      friendly: ['{player} à, ngươi là người thật thà chân chất, lão Lục này thích nhất là uống rượu với người thật thà.', 'Vò rượu quý ủ ba năm này là đặc biệt giữ lại cho {title} đấy.'],
      bestFriend: ['Có thể cùng {player} đối ẩm chính là diễm phúc cả đời này của lão Lục.', '{title}, nào, cạn ly này đi!']
    }
  },
  {
    id: 'liu_cunzhang',
    name: 'Trưởng thôn Liễu',
    gender: 'male',
    role: 'Trưởng thôn',
    personality: 'Uy nghiêm công chính',
    birthday: { season: 'summer', day: 5 },
    lovedItems: ['tea', 'ginseng'],
    likedItems: ['herb', 'osmanthus', 'bamboo', 'rabbit_foot'],
    hatedItems: ['pickled_cabbage', 'firewood'],
    dialogues: {
      stranger: ['Cháu chính là người trẻ tuổi tiếp nhận mảnh điền trang kia sao? Ta là trưởng thôn Liễu. Hy vọng cháu sẽ không làm ô danh cơ nghiệp tổ tiên để lại.', 'Quy củ của Đào Nguyên Hương, tuyệt đối không thể không tuân thủ.'],
      acquaintance: ['Dạo này {title} làm tốt lắm, dân làng ai nấy đều khen cháu siêng năng chăm chỉ.', 'Liễu Nương có nhắc đến cháu với ta vài lần rồi... ừm.'],
      friendly: ['{player}, những việc cháu đã làm cho thôn làng, lão phu đều ghi nhận cả.', 'Năm xưa ông nội cháu cũng là người có khí phách hào hùng như vậy.'],
      bestFriend: ['{player} chính là phúc phận của Đào Nguyên Hương.', 'Lão phu tuổi tác đã cao, tương lai của thôn làng này, {title} hãy gắng sức gánh vác nhiều hơn nhé.']
    }
  },
  {
    id: 'qian_niang',
    name: 'Tiền Nương',
    gender: 'female',
    role: 'Học trò tiệm thuốc',
    personality: 'Nhút nhát ngoan ngoãn',
    birthday: { season: 'winter', day: 12 },
    lovedItems: ['herb', 'ginseng'],
    likedItems: ['tea', 'chrysanthemum', 'winter_bamboo_shoot', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'gold_ore'],
    dialogues: {
      stranger: ['A... xin chào... t-tôi là Tiền Nương, học trò của Lâm Lão.', 'Nếu cần thảo dược... bạn có thể tới tìm tôi...'],
      acquaintance: ['Chào {title}... hôm nay tôi có hái được một ít thảo dược tươi non này.', 'Lâm Lão dạy tôi rất nhiều phương thuốc, tôi đang nỗ lực học thuộc lòng đây...'],
      friendly: ['{player}, viên thuốc này là do tôi tự tập luyện làm ra, bạn... bạn dùng thử xem?', 'Có{title}Hãy đến và trò chuyện, tôi sẽ không quá lo lắng.'],
      bestFriend: ['Ở bên cạnh {player}... hình như tôi đã trở nên dũng cảm hơn một chút rồi.', 'Thuốc bổ thể lực của {title}, tôi nhất định sẽ dốc lòng bào chế thật tốt.']
    }
  },
  {
    id: 'he_zhanggui',
    name: 'Chưởng quầy Hà',
    gender: 'male',
    role: 'Chưởng quầy trà lâu',
    personality: 'Khéo léo hoạt ngôn',
    birthday: { season: 'spring', day: 15 },
    lovedItems: ['tea', 'honey'],
    likedItems: ['osmanthus', 'lotus_seed', 'peanut', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'stone'],
    dialogues: {
      stranger: ['Ái chà chà, quý khách ghé thăm! Tiểu điếm chưởng quầy Hà xin kính mời ngài dùng một ấm trà ngon!', '{title}Lần đầu tiên trở lại? Ngồi, ngồi, ngồi!'],
      acquaintance: ['Chỗ ngồi cũ của {title} vẫn luôn giữ lại cho ngài đấy!', 'Mấy chuyện ngồi lê đôi mách — à không phải, tin tức trong thôn đều được truyền tai nhau ở trà lâu này cả đấy.'],
      friendly: ['{player} à, mấy chuyện thú vị ở nông trại của bạn tôi đều nghe kể cả rồi, ha ha ha!', 'Trà ngon phải đãi tri kỷ, {title} chính là hảo hữu của tôi!'],
      bestFriend: ['Nói về nhân phẩm của {player}, cả thôn không một ai là không giơ ngón tay cái thán phục cả.', 'Tiền trà của {title} sao? Miễn đi, miễn đi! Bạn cũ với nhau ai lại thu tiền làm gì.']
    }
  },
  {
    id: 'qin_dashu',
    name: 'Chú Tần',
    gender: 'male',
    role: 'Chủ vườn cây ăn quả',
    personality: 'Chân chất cần cù',
    birthday: { season: 'autumn', day: 12 },
    lovedItems: ['peach', 'jujube'],
    likedItems: ['persimmon', 'sweet_potato', 'corn', 'rabbit_foot'],
    hatedItems: ['jade', 'moonstone'],
    dialogues: {
      stranger: ['Xin chào, tôi họ Tần, mọi người thường gọi là chú Tần. Tôi có một vườn cây ăn quả ở phía đông thôn.', 'Cây ăn quả cái thứ này, gieo xuống rồi thì phải kiên nhẫn chờ đợi. {title} không vội được đâu.'],
      acquaintance: ['{title} cũng trồng cây ăn quả sao? Có chỗ nào không hiểu cứ tới hỏi tôi.', 'Đào năm nay đặc biệt ngọt lắm, có chừa lại cho cháu vài quả này.'],
      friendly: ['Tay nghề trồng trọt của {player} ngày càng tiến bộ rồi đấy.', 'Mấy cây giống này là do tôi tự ươm mầm, {title} mang về mà trồng.'],
      bestFriend: ['{player} let tôi nhớ lại nhiệt huyết thuở trẻ của mình quá.', 'Cái vườn quả đó của tôi, {title} có thể tới hái quả bất cứ lúc nào.']
    }
  },
  {
    id: 'a_fu',
    name: 'A Phúc',
    gender: 'male',
    role: 'Mục đồng chăn bò',
    personality: 'Khờ khạo lạc quan',
    birthday: { season: 'winter', day: 5 },
    lovedItems: ['sweet_potato', 'milk', 'goat_milk'],
    likedItems: ['corn', 'hay', 'wild_berry', 'truffle', 'buffalo_milk', 'rabbit_foot'],
    hatedItems: ['jade', 'silk'],
    dialogues: {
      stranger: ['Hì hì, chào anh/chị! Em là A Phúc! Em giúp anh Đại Ngưu trông coi đàn bò ạ!', 'Lũ bò là đáng yêu nhất trên đời, {title} thấy có đúng không ạ!'],
      acquaintance: ['{title} ơi! Hôm nay đàn bò lại xổng chuồng chạy ra ngoài rồi, hì hì.', 'Anh Đại Ngưu bảo sau này em có thể trở thành chủ mục trường đấy!'],
      friendly: ['Đàn gà nhà {player} đã đẻ trứng chưa ạ? Hôm nay bò nhà em cho sữa rồi nè!', 'Em có bện tặng {title} chiếc mũ rơm này, tuy không đẹp lắm nhưng che nắng tốt lắm ạ!'],
      bestFriend: ['{player} đối xử với em tốt quá... tốt y như anh Đại Ngưu vậy.', 'Đợi sau này lớn lên, em cũng muốn trở nên giỏi giang có tiền đồ giống như {title}!']
    }
  }
]

/** 根据ID获取NPC定义 */
export const getNpcById = (id: string): NpcDef | undefined => {
  return NPCS.find(n => n.id === id)
}
