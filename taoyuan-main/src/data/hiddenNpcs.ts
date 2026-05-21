import type { HiddenNpcDef } from '@/types/hiddenNpc'

/** 所有隐藏NPC（仙灵）定义 */
export const HIDDEN_NPCS: HiddenNpcDef[] = [
  // ============================================================
  // 1. 龙灵 — 潜渊龙灵
  // ============================================================
  {
    id: 'long_ling',
    name: 'Long Linh',
    trueName: 'Thương Lan',
    gender: 'female',
    title: 'Tiềm Uyên Long Linh',
    origin: 'Linh long màu xanh phỉ thúy ẩn mình ngàn năm dưới đầm sâu thác nước sau núi, truyền thuyết kể rằng nó đã cư ngụ tại đây từ thuở Đào Nguyên Hương mới lập làng. Dưới cơn mưa thỉnh thoảng hiện lên ánh vảy, được dân làng xem như thần hộ mệnh.',
    personality: 'Trầm tĩnh sâu thẳm, cổ phác trang trọng',
    discoverySteps: [
      {
        id: 'long_ling_rumor',
        phase: 'rumor',
        conditions: [{ type: 'fishCaught', fishId: 'jade_dragon' }],
        scenes: [
          { text: 'Bạn chăm chú quan sát con cá Thúy Long trong tay, vảy cá tỏa ra ánh sáng khác thường dưới cơn mưa. Một ý nghĩ lóe lên trong đầu —— đây thực sự chỉ là một con cá thôi sao?' },
          { text: 'Thác nước phía xa truyền đến tiếng gầm gừ trầm thấp, trong đó dường như xen lẫn một loại... tiếng gọi nào đó.' }
        ],
        logMessage: '【Tiên Duyên】 Vảy của cá Thúy Long tỏa ra ánh sáng kỳ lạ, sâu trong thác nước dường như có linh tức cuộn trào...'
      },
      {
        id: 'long_ling_glimpse',
        phase: 'glimpse',
        conditions: [
          { type: 'season', season: 'spring' },
          { type: 'weather', weather: 'rainy' },
          { type: 'timeRange', minHour: 20, maxHour: 24 },
          { type: 'location', panel: 'fishing' }
        ],
        scenes: [
          { text: 'Đêm mưa xuân rả rích, bạn một mình buông cần bên thác nước. Mặt nước bỗng nổi lên từng tầng gợn sóng.' },
          { text: 'Một bóng hình giống loài rắn màu xanh phỉ thúy lướt qua phía sau bức màn thác nước, ánh vảy như ngọc vụn rắc xuống mặt nước.' },
          { text: 'Bạn dụi mắt, mặt nước đã khôi phục lại vẻ phẳng lặng. Nhưng trong không khí vẫn còn thoang thoảng mùi long diên hương.' }
        ],
        logMessage: '【Tiên Duyên】 Trong thác nước đêm mưa xuân, một bóng hình xanh biếc vụt qua rồi biến mất...'
      },
      {
        id: 'long_ling_encounter',
        phase: 'encounter',
        conditions: [
          { type: 'season', season: 'spring' },
          { type: 'weather', weather: 'rainy' },
          { type: 'location', panel: 'fishing' },
          { type: 'item', itemId: 'dragon_jade', quantity: 1 }
        ],
        scenes: [
          { text: 'Bạn cầm Long Ngọc đi tới trước thác nước. Khối ngọc bỗng tỏa ra ánh sáng xanh dịu nhẹ, hô ứng với một sức mạnh nào đó trong thác.' },
          { text: 'Thác nước chầm chậm tách ra, một nữ tử mặc thanh y bước ra từ sau bức màn nước. Mái tóc dài của nàng buông xõa như thác, đôi đồng tử là một màu xanh phỉ thúy sâu thẳm.' },
          {
            text: '「Kẻ giữ ngọc... ngươi có sở cầu gì?」 Giọng nói của nàng trong trẻo như dòng nước, mang theo sự lắng đọng của ngàn năm.',
            choices: [
              { text: 'Tôi chỉ là đi theo tiếng gọi mà đến thôi.', friendshipChange: 80, response: 'Nàng khẽ gật đầu: 「Trái tim thuần khiết, rất tốt.」 Trong đôi đồng tử xanh biếc lóe lên một tia dịu dàng.' },
              {
                text: 'Xin hỏi... cô là Long Linh trong truyền thuyết sao?',
                friendshipChange: 40,
                response: '「Long Linh? Đó là cách gọi của phàm nhân. Ta tên Thương Lan.」 Nàng nhạt giọng nói, trong ngữ khí không có vẻ gì là giận dữ.'
              },
              {
                text: 'Khối Long Ngọc này là của cô sao?',
                friendshipChange: 60,
                response: 'Nàng đưa tay chạm nhẹ vào khối ngọc, đầu ngón tay nổi lên từng gợn sóng: 「Vật này có duyên với ta. Kẻ giữ nó... cũng vậy.」'
              }
            ]
          },
          { text: 'Dứt lời, bóng hình nàng hóa thành màn sương nước tan biến vào trong thác. Nhưng bạn biết, nàng sẽ còn xuất hiện trở lại.' }
        ],
        logMessage: '【Tiên Duyên】 Phía sau màn nước thác, Long Linh Thương Lan lần đầu hiện thân.'
      },
      {
        id: 'long_ling_revealed',
        phase: 'revealed',
        conditions: [
          { type: 'questComplete', questId: 'main_2_4' },
          { type: 'skill', skillType: 'fishing', minLevel: 5 }
        ],
        scenes: [
          { text: 'Khi bạn đi tới trước thác nước lần nữa, Long Linh đã đứng đợi bên bờ.' },
          { text: '「Chấp niệm của ngươi... không, là thành ý, đã làm ta cảm động.」 Nàng hơi nghiêng đầu, để lộ ra những chiếc vảy xanh nhỏ xíu giữa mái tóc dài.' },
          { text: '「Ta tên Thương Lan. Sau này, nếu ngươi có lòng muốn gặp, cứ đến nơi này là được.」' }
        ],
        logMessage: '【Tiên Duyên】 Long Linh Thương Lan đã đồng ý qua lại với bạn.'
      }
    ],
    resonantOfferings: ['dragon_jade', 'prismatic_shard', 'moonstone'],
    pleasedOfferings: ['jade_dragon', 'ruby', 'jade', 'obsidian', 'quartz'],
    repelledOfferings: ['charcoal', 'trash', 'wood'],
    dialogues: {
      wary: ['「Phàm nhân... đừng lại quá gần.」', '「Sâu trong thác nước không phải là nơi ngươi nên đến.」'],
      curious: ['「Ngươi lại đến nữa... cũng thú vị đấy.」', '「Nước ở đây dạo này trong trẻo hơn nhiều, là do ngươi chăm sóc dòng suối sao?」'],
      trusting: ['「{player}, tiếng mưa hôm nay nghe êm tai thật.」', '「Cùng ngươi ngồi bên bờ nước, thời gian như thể quay ngược về ngàn năm trước.」'],
      devoted: ['「Ngươi là phàm nhân đầu tiên trong ngàn năm qua khiến ta tình nguyện chờ đợi.」', '「{player}... ta không muốn quay về vực thẳm nữa đâu.」'],
      eternal: ['「Cái tên Thương Lan, ta chỉ nói cho một mình ngươi biết thôi.」', '「Giữa đất trời này, chỉ cần có ngươi và ta, đó chính là Đào Nguyên.」']
    },
    interactionType: 'meditation',
    bondable: true,
    courtshipItemId: 'dragon_scale_charm',
    bondItemId: 'dragon_pearl',
    courtshipThreshold: 1800,
    bondThreshold: 2500,
    heartEventIds: ['long_ling_heart_1', 'long_ling_heart_2', 'long_ling_heart_3'],
    courtshipDialogues: [
      '「Ngươi giao Long Lân Bội cho ta... ta hiểu rồi.」 Đôi gò má nàng ửng lên một ráng hồng xanh nhàn nhạt.',
      '「Tâm ý của phàm nhân, ta tuy không hiểu rõ, nhưng... không hề ghét.」',
      '「{player}, hôm nay có thể nán lại thêm một lát không?」'
    ],
    courtshipCraftCost: [
      { itemId: 'dragon_jade', quantity: 5 },
      { itemId: 'moonstone', quantity: 8 },
      { itemId: 'gold_bar', quantity: 5 }
    ],
    bondCraftCost: [
      { itemId: 'dragon_jade', quantity: 8 },
      { itemId: 'prismatic_shard', quantity: 5 },
      { itemId: 'moonstone', quantity: 10 },
      { itemId: 'gold_bar', quantity: 8 }
    ],
    bondBonuses: [
      { type: 'weather_control', chance: 0.3 },
      { type: 'fish_attraction', chance: 0.5 }
    ],
    abilities: [
      {
        id: 'long_ling_1',
        affinityRequired: 800,
        name: 'Long Trạch',
        description: 'Chất lượng cá câu ở thác nước tăng thêm một bậc',
        passive: { type: 'quality_boost', value: 1 }
      },
      { id: 'long_ling_2', affinityRequired: 1500, name: 'Hoán Vũ', description: 'Tỷ lệ trời mưa +15%', passive: { type: 'luck', value: 15 } },
      { id: 'long_ling_3', affinityRequired: 2200, name: 'Long Đồng', description: 'Tỷ lệ bắt được cá truyền thuyết +20%', passive: { type: 'luck', value: 20 } }
    ],
    manifestationDay: { season: 'spring', day: 14 }
  },

  // ============================================================
  // 2. 桃夭 — 桃林花灵
  // ============================================================
  {
    id: 'tao_yao',
    name: 'Đào Yêu',
    trueName: 'Chước Hoa',
    gender: 'female',
    title: 'Hoa Linh Rừng Đào',
    origin: 'Hoa tinh sinh ra từ gốc đào cổ thụ lâu đời nhất Đào Nguyên Hương, lấy cánh hoa rơi làm áo, lấy sương sớm làm thức uống. Nghe nói Đào Nguyên Hương sở dĩ gọi là "Đào Nguyên" chính là vì có nàng bảo hộ nơi này.',
    personality: 'Hoạt bát linh động, ngây thơ lãng mạn',
    discoverySteps: [
      {
        id: 'tao_yao_rumor',
        phase: 'rumor',
        conditions: [{ type: 'skill', skillType: 'farming', minLevel: 4 }],
        scenes: [
          { text: 'Sáng sớm khi đang làm lụng ở nông trại, một trận mưa cánh hoa đào trái mùa bay lướt qua trước mặt bạn.' },
          { text: 'Giữa những cánh hoa dường như truyền đến tiếng cười cực kỳ nhỏ bé, thánh thót như tiếng chuông gió.' }
        ],
        logMessage: '【Tiên Duyên】 Giữa những cánh hoa đào dường như có tiếng thì thầm, là ảo giác của gió sao...'
      },
      {
        id: 'tao_yao_glimpse',
        phase: 'glimpse',
        conditions: [
          { type: 'season', season: 'spring' },
          { type: 'timeRange', minHour: 6, maxHour: 8 },
          { type: 'location', panel: 'farm' }
        ],
        scenes: [
          { text: 'Sáng sớm mùa xuân, sương mù vẫn chưa tan. Bạn nhìn thấy một bóng hình thon thả giữa hàng cây ăn quả, đang đưa tay vuốt ve cành cây đào.' },
          { text: 'Nàng dường như nhận ra ánh nhìn của bạn, ngoảnh đầu lại liếc một cái —— một khuôn mặt tinh xảo như cánh hoa, chớp mắt liền hóa thành những cánh hoa bay lả tả biến mất không thấy tăm hơi.' }
        ],
        logMessage: '【Tiên Duyên】 Cạnh hàng cây ăn quả trong sương sớm, ảo ảnh cánh hoa bay lượn vụt qua rồi biến mất.'
      },
      {
        id: 'tao_yao_encounter',
        phase: 'encounter',
        conditions: [
          { type: 'item', itemId: 'peach', quantity: 1 },
          { type: 'item', itemId: 'honey', quantity: 1 },
          { type: 'day', day: 14 }
        ],
        scenes: [
          { text: 'Đêm trăng tròn, bạn mang theo quả đào và mật ong đến dưới gốc cây đào lớn nhất. Ánh trăng rải xuống cành lá, những cánh hoa không có gió vẫn tự mình tung bay.' },
          { text: 'Một thiếu nữ bước ra từ thân cây, làn da trắng ngần như cánh hoa, trên tóc cài một đóa hoa đào không bao giờ héo tàn.' },
          {
            text: '「Hi hi, cuối cùng cũng tới rồi nha!」 Nàng cười hì hì nói, 「Ta ngửi thấy mùi ngòn ngọt, là dành cho ta sao?」',
            choices: [
              {
                text: 'Đúng vậy, đây là quà tặng cô.',
                friendshipChange: 80,
                response: 'Nàng reo lên một tiếng rồi nhận lấy quả đào và mật ong: 「Tuyệt quá! Ta thích đồ ngọt nhất trên đời!」'
              },
              { text: 'Cô là... yêu tinh cây đào sao?', friendshipChange: 40, response: '「Hoa linh chứ! Hoa linh rừng đào!」 Nàng phồng má sửa lời, 「Cứ gọi là Đào Yêu là được rồi.」' },
              {
                text: 'Cô vẫn luôn nhìn tôi làm ruộng sao?',
                friendshipChange: 60,
                response: 'Nàng e thẹn ngoảnh đầu đi: 「Mới, mới không có nhìn chằm chằm... chỉ là thỉnh thoảng thôi. Ngươi làm ruộng rất chăm chỉ đấy.」'
              }
            ]
          },
          { text: 'Ánh trăng dần nhạt đi, Đào Yêu hóa thành những cánh hoa bay tứ tán: 「Lần trăng tròn sau, nhớ lại tới chơi với ta nha!」' }
        ],
        logMessage: '【Tiên Duyên】 Dưới gốc đào đêm trăng tròn, Hoa Linh Đào Yêu lần đầu hiện thân.'
      },
      {
        id: 'tao_yao_revealed',
        phase: 'revealed',
        conditions: [
          { type: 'questComplete', questId: 'main_1_5' },
          { type: 'skill', skillType: 'farming', minLevel: 5 }
        ],
        scenes: [
          { text: 'Khi bạn bước vào nông trại, Đào Yêu đã ngồi trên cành cây đung đưa chân đợi bạn rồi.' },
          { text: '「Ta nghĩ kỹ rồi!」 Nàng nhảy xuống cây, tà váy tung lên một mảnh hoa đào, 「Ta tên là Chước Hoa, là thủ hộ linh của mảnh rừng đào này.」' },
          { text: '「Sau này ngươi tới lúc nào, ta cũng đều ở đây hết nha!」 Nụ cười của nàng rạng rỡ như chính mùa xuân vậy.' }
        ],
        logMessage: '【Tiên Duyên】 Hoa Linh Rừng Đào Chước Hoa đã đồng ý qua lại với bạn.'
      }
    ],
    resonantOfferings: ['peach', 'osmanthus', 'honey'],
    pleasedOfferings: ['chrysanthemum', 'tea', 'green_tea_drink', 'osmanthus_wine', 'peach_wine'],
    repelledOfferings: ['charcoal', 'iron_ore', 'copper_ore'],
    dialogues: {
      wary: ['「Ngươi là ai vậy... đừng có chạm vào cây đào!」', '「Hừ, con người các ngươi chỉ biết chặt cây thôi...」'],
      curious: ['「Ngày nào ngươi cũng tới tưới nước nhỉ, chăm chỉ thật đấy!」', '「Hi hi, trên đầu ngươi dính một chiếc lá kìa.」'],
      trusting: ['「{player}, ánh nắng hôm nay dễ chịu quá nha～」', '「Lúc ở bên cạnh ngươi, hoa nở đặc biệt đẹp lắm đó.」'],
      devoted: ['「{player}... ngươi biết không, hoa linh vốn không nên động lòng với con người.」', '「Thế nhưng vừa nghĩ tới ngươi, hoa liền tự mình nở rộ.」'],
      eternal: ['「Chước Hoa chỉ nở rộ vì một mình ngươi thôi.」', '「Ngàn năm vạn năm, chỉ cần rừng đào này còn tồn tại, ta sẽ luôn ở bên cạnh ngươi.」']
    },
    interactionType: 'ritual',
    bondable: true,
    courtshipItemId: 'blossom_crown',
    bondItemId: 'eternal_blossom',
    courtshipThreshold: 1800,
    bondThreshold: 2500,
    heartEventIds: ['tao_yao_heart_1', 'tao_yao_heart_2', 'tao_yao_heart_3'],
    courtshipDialogues: [
      'Đào Yêu nhận lấy vương miện hoa, đỏ mặt đội lên đầu: 「Đây là... có ý cầu duyên đúng không?」',
      '「{player}, hôm nay có một con bướm đậu trên vai ngươi, chắc chắn là điềm lành đó!」',
      '「Ta đã lén thi phép lên cây đào của ngươi rồi, ngày mai sẽ kết ra những quả ngọt nhất cho xem.」'
    ],
    courtshipCraftCost: [
      { itemId: 'peach', quantity: 25 },
      { itemId: 'honey', quantity: 15 },
      { itemId: 'osmanthus', quantity: 15 },
      { itemId: 'jade', quantity: 5 }
    ],
    bondCraftCost: [
      { itemId: 'peach', quantity: 50 },
      { itemId: 'honey', quantity: 25 },
      { itemId: 'chrysanthemum', quantity: 25 },
      { itemId: 'prismatic_shard', quantity: 3 },
      { itemId: 'moonstone', quantity: 8 }
    ],
    bondBonuses: [{ type: 'crop_blessing', chance: 0.2 }],
    abilities: [
      { id: 'tao_yao_1', affinityRequired: 600, name: 'Hoa Trạch', description: 'Mỗi lần thu hoạch cây ăn quả +1 sản lượng', passive: { type: 'quality_boost', value: 1 } },
      {
        id: 'tao_yao_2',
        affinityRequired: 1200,
        name: 'Xuân Tức',
        description: 'Cây trồng mùa xuân phát triển nhanh hơn 15%',
        passive: { type: 'exp_boost', value: 15 }
      },
      { id: 'tao_yao_3', affinityRequired: 2000, name: 'Linh đào', description: 'Cây đào có tỷ lệ sinh ra Linh Đào', passive: { type: 'luck', value: 10 } }
    ],
    manifestationDay: { season: 'spring', day: 3 }
  },

  // ============================================================
  // 3. 月兔 — 捣药玉兔
  // ============================================================
  {
    id: 'yue_tu',
    name: 'Nguyệt Thỏ',
    trueName: 'Tố Vấn',
    gender: 'female',
    title: 'Ngọc Thỏ Giã Thuốc',
    origin: 'Ngọc Thỏ trốn từ Nguyệt Cung xuống phàm trần, hóa thành một thiếu nữ có tai thỏ, mang theo một chiếc chày ngọc bên người. Nghe nói nàng đã giã xong hết dược liệu trên Nguyệt Cung, chán nản đến cực điểm mới chạy xuống nhân gian.',
    personality: 'Hiếu kỳ hoạt bát, háu ăn thảo dược',
    discoverySteps: [
      {
        id: 'yue_tu_rumor',
        phase: 'rumor',
        conditions: [{ type: 'skill', skillType: 'foraging', minLevel: 7 }],
        scenes: [
          { text: 'Kỹ năng thu thập của bạn đã đạt đến mức hoàn mỹ. Hôm nay lúc hái thuốc bạn phát hiện ra một mảnh vỡ ngọc thạch có hình dáng kỳ lạ, trông giống như một phần của món đồ vật nào đó.' },
          { text: 'Mảnh vỡ dưới ánh trăng tỏa ra ánh sáng trắng bạc, bên trên khắc lờ mờ hoa văn một con thỏ.' }
        ],
        logMessage: '【Tiên Duyên】 Hái thuốc phát hiện một mảnh vỡ chày ngọc, trên khắc hoa văn thỏ, lấp lánh dưới ánh trăng...'
      },
      {
        id: 'yue_tu_glimpse',
        phase: 'glimpse',
        conditions: [
          { type: 'day', day: 14 },
          { type: 'timeRange', minHour: 20, maxHour: 24 },
          { type: 'weather', weather: 'sunny' },
          { type: 'location', panel: 'forage' }
        ],
        scenes: [
          { text: 'Đêm trăng tròn, ánh trăng như bạc rải rác khắp rừng trúc. Bạn nghe thấy từ đằng xa truyền tới tiếng "thùng, thùng, thùng" vô cùng nhịp nhàng.' },
          { text: 'Nhìn theo hướng phát ra âm thanh, dưới ánh trăng có một bóng hình nhỏ bé màu trắng đang giã thứ gì đó. Hai chiếc tai dài trên đỉnh đầu nàng cứ nảy lên nảy xuống.' },
          { text: 'Dường như phát hiện ra ánh nhìn của bạn, bóng hình đó "vút" một tiếng biến mất vào sâu trong rừng trúc, chỉ để lại vài nhánh thảo dược rơi vãi.' }
        ],
        logMessage: '【Tiên Duyên】 Trong rừng trúc đêm trăng tròn, bóng trắng lóe qua, thảo dược rơi vãi đầy đất.'
      },
      {
        id: 'yue_tu_encounter',
        phase: 'encounter',
        conditions: [
          { type: 'item', itemId: 'ginseng', quantity: 1 },
          { type: 'item', itemId: 'herb', quantity: 5 },
          { type: 'location', panel: 'forage' }
        ],
        scenes: [
          { text: 'Bạn mang theo nhân sâm và thảo dược đi đến rừng trúc. Vừa đặt thảo dược xuống, một giọng nói từ trên đỉnh đầu truyền tới ——' },
          { text: '「Nhân sâm! Là nhân sâm!」 Một thiếu nữ tai thỏ từ trên cây trúc nhảy xuống, đôi mắt sáng lấp lánh chằm chằm nhìn vào dược liệu trong tay bạn.' },
          {
            text: '「Cho, cho ta đi! Thuốc trên Nguyệt Cung ta đều giã chán chê rồi, thảo dược ở nhân gian mới dễ ngửi!」 Nàng đưa tay ra, chiếc đuôi phấn khích lắc qua lắc lại không ngừng.',
            choices: [
              {
                text: 'Cho cô hết đấy.',
                friendshipChange: 80,
                response: '「Thật sao! Ngươi đúng là người tốt!」 Nàng ôm lấy thảo dược xoay một vòng, 「Ta tên là Nguyệt Thỏ, sau này ta sẽ giúp ngươi giã thuốc!」'
              },
              {
                text: 'Cô đến từ Nguyệt Cung sao?',
                friendshipChange: 40,
                response: '「Suỵt ——!」 Nàng hốt hoảng giơ một ngón tay lên, 「Đừng nói cho tỷ tỷ Hằng Nga biết nhé! Ta trốn ra ngoài đấy!」'
              },
              {
                text: 'Cô định dùng mấy thứ này làm gì?',
                friendshipChange: 60,
                response: '「Giã thuốc chứ sao! Đem thảo dược giã thành bột, có thể chữa được rất nhiều bệnh đấy.」 Nàng quơ quơ chiếc chày ngọc trong tay, đắc ý cười.'
              }
            ]
          },
          { text: 'Nguyệt Thỏ ôm lấy thảo dược tung tăng nhảy múa biến mất vào trong ánh trăng, để lại hương thuốc nhè nhẹ thoang thoảng trong không khí.' }
        ],
        logMessage: '【Tiên Duyên】 Tình cờ gặp được Ngọc Thỏ từ Nguyệt Cung lén lút trần hạ phàm trong rừng trúc.'
      },
      {
        id: 'yue_tu_revealed',
        phase: 'revealed',
        conditions: [
          { type: 'questComplete', questId: 'main_2_4' },
          { type: 'skill', skillType: 'foraging', minLevel: 7 }
        ],
        scenes: [
          { text: 'Bạn đi tới rừng trúc lần nữa, Nguyệt Thỏ đang ngồi trên tảng đá, trước mặt bày một hàng lọ thuốc nhỏ.' },
          { text: '「A! Ngươi tới rồi!」 Nàng vui sướng nhảy dựng lên, đôi tai giật giật, 「Ta tên là Tố Vấn, là Ngọc Thỏ Giã Thuốc của Nguyệt Cung.」' },
          { text: '「Tỷ tỷ Hằng Nga bảo nhân gian không vui chút nào, đâu có phải vậy! Ở đây có rất nhiều thảo dược thơm tho, còn có cả ngươi nữa!」' }
        ],
        logMessage: '【Tiên Duyên】 Nguyệt Thỏ Tố Vấn đã quyết định ở lại Đào Nguyên Hương.'
      }
    ],
    resonantOfferings: ['ginseng', 'herb', 'tea', 'green_tea_drink'],
    pleasedOfferings: ['wild_mushroom', 'truffle', 'chrysanthemum', 'osmanthus_wine'],
    repelledOfferings: ['quartz', 'charcoal', 'trash'],
    dialogues: {
      wary: ['「Đừng, đừng lại gần! Ta có chày ngọc đấy!」', '「Ngươi tới bắt ta về Nguyệt Cung sao...」'],
      curious: ['「Trên người ngươi có mùi thảo dược nồng quá!」', '「Đóa hoa này là hoa gì thế? Thơm quá!」'],
      trusting: ['「{player}, hôm nay ta vừa giã được một loại thuốc mới, muốn nếm thử không?」', '「Đi hái thuốc cùng ngươi là vui nhất, không cần phải cắm cúi giã một mình nữa.」'],
      devoted: ['「{player}... cho dù tỷ tỷ Hằng Nga có tới đón ta, ta cũng không muốn về nữa đâu.」', '「Nguyệt Cung có đẹp đến mấy, cũng không có ngươi mà.」'],
      eternal: ['「Tố Vấn đời này, chỉ giã thuốc cho riêng một mình {player} thôi.」', '「Ngươi chính là nhân gian của ta, còn sáng hơn cả ánh trăng nữa.」']
    },
    interactionType: 'music',
    bondable: true,
    courtshipItemId: 'jade_mortar',
    bondItemId: 'moon_elixir',
    courtshipThreshold: 1800,
    bondThreshold: 2500,
    heartEventIds: ['yue_tu_heart_1', 'yue_tu_heart_2', 'yue_tu_heart_3'],
    courtshipDialogues: [
      'Nguyệt Thỏ nhận lấy chày ngọc, đôi tai ngay lập tức đỏ bừng: 「Đây, đây là... ừm, ta nhận rồi.」',
      '「{player}, ta làm được viên thuốc thảo dược mới rồi, mùi vị ngon lắm, ngươi nhất định phải nếm thử!」',
      '「Lúc cùng ngươi ngắm trăng, ta không còn nhớ đến Nguyệt Cung nữa.」'
    ],
    courtshipCraftCost: [
      { itemId: 'moonstone', quantity: 8 },
      { itemId: 'jade', quantity: 5 },
      { itemId: 'ginseng', quantity: 5 },
      { itemId: 'herb', quantity: 50 }
    ],
    bondCraftCost: [
      { itemId: 'ginseng', quantity: 10 },
      { itemId: 'snow_lotus', quantity: 8 },
      { itemId: 'moonstone', quantity: 10 },
      { itemId: 'prismatic_shard', quantity: 3 }
    ],
    bondBonuses: [{ type: 'stamina_restore', amount: 15 }],
    abilities: [
      {
        id: 'yue_tu_1',
        affinityRequired: 500,
        name: 'Linh Thải',
        description: 'Số lượng thảo dược thu thập tăng gấp đôi',
        passive: { type: 'quality_boost', value: 2 }
      },
      { id: 'yue_tu_2', affinityRequired: 1000, name: 'Dược Dẫn', description: 'Hiệu quả của trà và thuốc +50%', passive: { type: 'exp_boost', value: 50 } },
      { id: 'yue_tu_3', affinityRequired: 1800, name: 'Nguyệt Hoa', description: 'Có tỷ lệ nhận được Nguyệt Thảo khi thu thập', passive: { type: 'luck', value: 8 } }
    ],
    manifestationDay: { season: 'autumn', day: 14 }
  },

  // ============================================================
  // 4. 狐仙 — 九尾灵狐
  // ============================================================
  {
    id: 'hu_xian',
    name: 'Hồ Tiên',
    trueName: 'Vô Danh',
    gender: 'male',
    title: 'Cửu Vĩ Linh Hồ',
    origin: 'Hồ ly tinh tu luyện ngàn năm, nửa chính nửa tà. Hắn rất giỏi huyễn thuật và biến hóa, thường hóa thành những hình dạng khác nhau dạo chơi nhân gian, đặc biệt có sở thích sưu tầm kỳ trân dị bảo.',
    personality: 'Ranh mãnh hài hước, nửa chính nửa tà',
    discoverySteps: [
      {
        id: 'hu_xian_rumor',
        phase: 'rumor',
        conditions: [{ type: 'money', minAmount: 100000 }],
        scenes: [
          { text: 'Sáng nay trước cửa có thêm một bức thư không ghi tên người gửi, bên trên chỉ viết một câu ——' },
          { text: '「Vào lúc hoàng hôn, hãy đi dạo về phía nơi đông người. Có chuyện thú vị đang chờ đợi ngươi đấy.」' },
          { text: 'Lật bức thư lại, mặt sau có vẽ một con hồ ly mang nụ cười nửa miệng.' }
        ],
        logMessage: '【Tiên Duyên】 Nhận được một bức thư bí ẩn, có vẽ một con hồ ly...'
      },
      {
        id: 'hu_xian_glimpse',
        phase: 'glimpse',
        conditions: [
          { type: 'timeRange', minHour: 17, maxHour: 19 },
          { type: 'location', panel: 'village' }
        ],
        scenes: [
          { text: 'Lúc hoàng hôn, bạn đi dạo trong thôn. Ráng chiều nhuộm vạn vật thành một màu vàng óng.' },
          { text: 'Giữa đám đông có một thanh niên xa lạ, dung mạo tuấn tú đến mức không giống phàm nhân, khóe miệng nở một nụ cười đầy ẩn ý.' },
          { text: 'Bạn muốn tiến lại gần để nhìn cho rõ, nhưng hắn đã biến mất. Chỉ còn lại một viên ngọc màu đỏ lấp lánh rơi ở chỗ hắn từng đứng.' }
        ],
        logMessage: '【Tiên Duyên】 Trong thôn lúc hoàng hôn, một mỹ nam tử xa lạ vụt qua rồi biến mất.'
      },
      {
        id: 'hu_xian_encounter',
        phase: 'encounter',
        conditions: [
          { type: 'item', itemId: 'ruby', quantity: 1 },
          { type: 'item', itemId: 'jade', quantity: 1 }
        ],
        scenes: [
          { text: 'Bạn mang theo viên ngọc đi ra đầu thôn. Thanh niên đó đột nhiên xuất hiện sau lưng bạn ——' },
          { text: '「Yo, bị ngươi tìm thấy rồi.」 Hắn mỉm cười búng tay một cái, sau lưng hiện lên chín cái đuôi xù xì.' },
          {
            text: '「Hãy đến, trả lời ba câu hỏi của tôi. Nếu trả lời đúng bạn sẽ gặp được nàng tiên cáo thật sự.」Anh giơ ba ngón tay lên.\n「Câu hỏi đầu tiên: Cái gì càng bị chia rẽ?」',
            choices: [
              { text: 'Niềm vui.', friendshipChange: 80, response: '「Không tồi không tồi, rất có linh tính.」 Hắn hài lòng gật đầu, một cái đuôi bỗng sáng lên.' },
              { text: 'Vàng?', friendshipChange: 20, response: '「Dung tục.」 Hắn lắc đầu thở dài, nhưng vẫn cho bạn thêm một cơ hội.' },
              { text: 'Phiền não.', friendshipChange: 40, response: '「Ừm... cũng coi như đúng. Nhưng ta thích đáp án lạc quan hơn.」' }
            ]
          },
          { text: '「Thú vị đấy.」 Hắn thu đuôi lại, hóa thành bộ dáng của một thanh niên bình thường. 「Ngươi thú vị hơn ta tưởng. Hẹn ngày tái ngộ.」' }
        ],
        logMessage: '【Tiên Duyên】 Sau thử thách câu đố, Hồ Tiên cuối cùng cũng lộ ra chân dung.'
      },
      {
        id: 'hu_xian_revealed',
        phase: 'revealed',
        conditions: [
          { type: 'mineFloor', minFloor: 50 },
          { type: 'item', itemId: 'fox_bead', quantity: 1 }
        ],
        scenes: [
          { text: 'Bạn mang theo Hồ Châu tìm thấy dưới đáy hang mỏ trở về thôn. Thanh niên kia đã dựa lưng vào cây đứng chờ sẵn.' },
          { text: '「Ngươi đã tìm được Hồ Châu của ta.」 Hắn đưa tay ra nhận, viên ngọc trong lòng bàn tay tỏa ra ánh sáng đỏ rực.' },
          { text: '「Xem ra là duyên phận trời định. Ta thuộc linh hồ nhất tộc, ngươi cứ gọi ta là... Hồ Tiên là được. Tên thật sao? Chuyện đó phải tìm hiểu thêm về nhau rồi ta mới nói cho ngươi biết nha.」' }
        ],
        logMessage: '【Tiên Duyên】 Sau khi trả lại Hồ Châu, Hồ Tiên đã đồng ý qua lại với bạn.'
      }
    ],
    resonantOfferings: ['prismatic_shard', 'ruby', 'jade'],
    pleasedOfferings: ['obsidian', 'gold_ore', 'peach_wine', 'jujube_wine'],
    repelledOfferings: ['quartz', 'wood', 'bamboo'],
    dialogues: {
      wary: ['「Đừng tưởng phàm nhân nào cũng có thể tùy tiện nhìn thấy Hồ Tiên.」', '「Vận may của ngươi không tồi, nhưng cũng chỉ đến thế mà thôi.」'],
      curious: ['「Hôm nay ngươi đã làm chuyện gì thú vị? Nói nghe thử xem.」', '「Thứ vô vị nhất trên thế gian này chính là mãi chẳng chịu thay đổi, ngươi đừng có làm ta thất vọng đấy.」'],
      trusting: ['「{player}, ngươi là một con người rất thú vị.」', '「Có muốn xem ta làm một trò ảo thuật không?」 Đầu ngón tay hắn bùng lên một ngọn hồ hỏa nhỏ.'],
      devoted: ['「Ngàn năm qua, ta chưa từng dừng bước vì một người nào. Ngươi là người đầu tiên đấy.」', '「{player}... ngươi làm ta nhớ lại bản thân mình khi còn là một con hồ ly nhỏ, vô cùng thuần túy và chân thành.」'],
      eternal: ['「Tên thật của ta, ta chỉ từng thầm thì vào tai một mình ngươi.」', '「Dưới chín chiếc đuôi này, chỉ bảo vệ một mình ngươi thôi.」']
    },
    interactionType: 'dreamwalk',
    bondable: true,
    courtshipItemId: 'fox_flame_lantern',
    bondItemId: 'fox_spirit_bead',
    courtshipThreshold: 1800,
    bondThreshold: 2500,
    heartEventIds: ['hu_xian_heart_1', 'hu_xian_heart_2', 'hu_xian_heart_3'],
    courtshipDialogues: [
      'Hồ Tiên nhận lấy đèn lồng hồ hỏa, trong ánh mắt xẹt qua một tia kinh ngạc rồi bật cười: 「Ngươi thế này là... đang cầu duyên với một con hồ ly sao?」',
      '「{player}, tối qua ta vừa nằm mơ thấy ngươi. Nội dung là gì á? Bí mật.」',
      '「Trước đây ta cứ nghĩ tuổi thọ của con người ngắn ngủi đến đáng thương. Bây giờ lại cảm thấy... chính vì ngắn ngủi nên mới đặc biệt đáng trân quý.」'
    ],
    courtshipCraftCost: [
      { itemId: 'ruby', quantity: 8 },
      { itemId: 'gold_bar', quantity: 8 },
      { itemId: 'moonstone', quantity: 5 }
    ],
    bondCraftCost: [
      { itemId: 'ruby', quantity: 12 },
      { itemId: 'gold_bar', quantity: 12 },
      { itemId: 'moonstone', quantity: 8 },
      { itemId: 'prismatic_shard', quantity: 3 }
    ],
    bondBonuses: [{ type: 'sell_bonus', percent: 15 }],
    abilities: [
      { id: 'hu_xian_1', affinityRequired: 700, name: 'Hồ Nhãn', description: 'Giá mua ở cửa hàng giảm 5%', passive: { type: 'sell_bonus', value: 5 } },
      { id: 'hu_xian_2', affinityRequired: 1400, name: 'Linh Thám', description: 'Tỷ lệ rớt thêm vật phẩm trong hang mỏ tăng lên', passive: { type: 'luck', value: 15 } },
      { id: 'hu_xian_3', affinityRequired: 2100, name: 'Huyễn Thương', description: 'Thương nhân du lịch bán thêm 1 món hàng quý hiếm', passive: { type: 'luck', value: 10 } }
    ],
    manifestationDay: { season: 'autumn', day: 7 }
  },

  // ============================================================
  // 5. 山翁 — 采药仙翁
  // ============================================================
  {
    id: 'shan_weng',
    name: 'Sơn Ông',
    trueName: 'Thanh Hư',
    gender: 'male',
    title: 'Tiên Ông Hái Thuốc',
    origin: 'Lão tiên nhân đi theo ẩn sĩ lập ra Đào Nguyên Hương tới đây tu luyện, quanh năm ẩn mình trong núi sâu hái thuốc, dùng hồ lô đựng đan dược, lấy tiếng gió ngàn reo làm bạn.',
    personality: 'Siêu phàm đạm bạc, cẩn trọng ít nói',
    discoverySteps: [
      {
        id: 'shan_weng_rumor',
        phase: 'rumor',
        conditions: [
          { type: 'mineFloor', minFloor: 50 },
          { type: 'skill', skillType: 'mining', minLevel: 8 }
        ],
        scenes: [
          { text: 'Sâu trong hang mỏ, bạn phát hiện ra một cuốn sách cổ ố vàng, trên bìa viết dòng chữ 「Thanh Hư Tu Luyện Thủ Trát」.' },
          { text: 'Lật mở trang đầu tiên: 「Vào núi năm trăm năm, luyện thành Cửu Chuyển Đan. Dưới lòng Đào Nguyên, nơi địa mạch linh khí hưng thịnh nhất, ta sẽ bế quan tại đây.」' }
        ],
        logMessage: '【Tiên Duyên】 Dưới đáy hang mỏ phát hiện một cuốn sổ tay tu luyện cổ xưa...'
      },
      {
        id: 'shan_weng_glimpse',
        phase: 'glimpse',
        conditions: [
          { type: 'season', season: 'winter' },
          { type: 'weather', weather: 'sunny' },
          { type: 'location', panel: 'mining' }
        ],
        scenes: [
          { text: 'Sâu trong hang mỏ vào ngày đông, bạn nghe thấy tiếng tiêu văng vẳng từ xa, mang theo vẻ thê lương và cổ phác.' },
          { text: 'Đi theo tiếng tiêu, bạn lờ mờ nhìn thấy một lão giả tóc trắng đang khoanh chân ngồi cạnh mạch khoáng, quanh người bao bọc bởi linh khí màu vàng nhạt.' },
          { text: 'Bạn bước tới một bước, đá vụn dưới chân phát ra tiếng động. Lão giả mở bừng mắt, bạn chỉ cảm thấy một luồng hạo nhiên chi khí phả vào mặt, chỉ trong nháy mắt ông ấy đã biến mất không thấy đâu.' }
        ],
        logMessage: '【Tiên Duyên】 Sâu trong hang mỏ, một lão giả tóc trắng đang tu luyện, chớp mắt liền biến mất.'
      },
      {
        id: 'shan_weng_encounter',
        phase: 'encounter',
        conditions: [
          { type: 'item', itemId: 'ginseng', quantity: 1 },
          { type: 'item', itemId: 'snow_lotus', quantity: 1 }
        ],
        scenes: [
          { text: 'Bạn mang theo nhân sâm và tuyết liên tiến vào hang mỏ, linh khí hiện rõ hơn thường ngày. Lão giả kia ngồi trước vách động, trước mặt bày một lò luyện đan bằng đồng cổ.' },
          { text: '「Tới rồi.」 Giọng nói của ông trầm thấp mà bình tĩnh, tựa hồ đã sớm đoán được bạn sẽ tới thăm.' },
          {
            text: '「Người trẻ tuổi, vì sao ngươi lại mạo hiểm vào sâu trong hang mỏ?」 Ông mở một con mắt ra, trong con ngươi đục ngầu lóe lên một tia sáng tinh anh.',
            choices: [
              { text: 'Để trở nên mạnh mẽ hơn.', friendshipChange: 60, response: '「Cũng tạm. Có chí khí, nhưng không thể ôm chấp niệm quá sâu.」 Ông gật gật đầu.' },
              { text: 'Để khám phá những điều chưa biết.', friendshipChange: 80, response: '「Tốt. Lòng cầu tri, chính là cội nguồn của tu hành.」 Ông hiếm hoi để lộ ra ánh nhìn tán thưởng.' },
              { text: 'Để kiếm tiền.', friendshipChange: 20, response: '「...」 Ông trầm mặc một hồi lâu rồi lắc đầu, 「Đúng là kẻ phàm phu tục tử. Nhưng được cái thẳng thắn cũng đáng quý.」' }
            ]
          },
          { text: '「Đi đi. Chờ khi nào ngươi thực sự chuẩn bị xong, lại đến nơi này.」 Ông nhắm mắt lại, linh khí quanh người lần nữa cuộn trào.' }
        ],
        logMessage: '【Tiên Duyên】 Sâu trong hang mỏ tình cờ gặp được một lão tiên nhân đang tu luyện.'
      },
      {
        id: 'shan_weng_revealed',
        phase: 'revealed',
        conditions: [
          { type: 'questComplete', questId: 'main_3_5' },
          { type: 'skill', skillType: 'mining', minLevel: 8 }
        ],
        scenes: [
          { text: 'Bạn lại đi tới chỗ sâu nhất trong hang mỏ, lão tiên nhân đang đun trà. Một ấm trà thanh, hai cái chén.' },
          { text: '「Ngồi đi.」 Ông chỉ tay vào tảng đá đối diện. Đây là lần đầu tiên ông ngỏ lời mời bạn.' },
          { text: '「Ta hiệu là Thanh Hư, tu hành ở nơi này đã hơn năm trăm năm. Đã có duyên, thỉnh thoảng ghé tới ngồi một chút cũng không sao.」 Ông nâng chén trà lên, khóe miệng khẽ nhếch lên.' }
        ],
        logMessage: '【Tiên Duyên】 Tiên Ông Thanh Hư mời bạn cùng thưởng trà thanh, duyên phận bắt đầu từ đây.'
      }
    ],
    resonantOfferings: ['ginseng', 'snow_lotus', 'antler_velvet'],
    pleasedOfferings: ['herb', 'iron_ore', 'gold_ore', 'copper_ore', 'tea'],
    repelledOfferings: ['trash', 'wood', 'driftwood'],
    dialogues: {
      wary: ['「Kẻ tu hành, không thích bị quấy rầy.」', '「Sát khí trên người ngươi nặng quá, tịnh tâm lại một chút rồi hẵng tới.」'],
      curious: ['「Ừm, linh khí trong mỏ hôm nay có chút khác thường.」', '「Thể chất của ngươi... có vẻ tốt hơn phàm nhân bình thường một chút.」'],
      trusting: ['「{player}, lại đây, bồi lão phu đánh một ván cờ.」', '「Tu hành tối kỵ nhất là nóng vội. Hôm nay ngươi đã điềm tĩnh hơn hôm qua rồi.」'],
      devoted: ['「Suốt năm trăm năm qua, đây là lần đầu tiên ta cảm thấy có người xứng đáng để truyền lại y bát.」', '「{player}, ngươi đã không chỉ còn là phàm nhân nữa rồi.」'],
      eternal: ['「Đạo của ta, cũng chính là đạo của ngươi.」', '「Thanh Hư cả đời không thu nhận đệ tử, nhưng ngươi... là ngoại lệ của những ngoại lệ.」']
    },
    interactionType: 'cultivation',
    bondable: true,
    courtshipItemId: 'cultivation_jade',
    bondItemId: 'immortal_gourd',
    courtshipThreshold: 1800,
    bondThreshold: 2500,
    heartEventIds: ['shan_weng_heart_1', 'shan_weng_heart_2', 'shan_weng_heart_3'],
    courtshipDialogues: [
      'Tiên Ông nhận lấy Ngọc Bội Tu Luyện, trầm mặc rất lâu: 「... Tấm lòng này, lão phu xin nhận.」',
      '「{player}, công khóa hôm nay ngươi làm không tồi đâu. Lại đây, uống chén trà nóng đi.」',
      '「Ngươi có biết không, năm trăm năm trước lão phu cũng từng có thời tuổi trẻ. Lúc đó... thôi bỏ đi, không nhắc nữa.」'
    ],
    courtshipCraftCost: [
      { itemId: 'jade', quantity: 8 },
      { itemId: 'gold_bar', quantity: 8 },
      { itemId: 'ginseng', quantity: 5 }
    ],
    bondCraftCost: [
      { itemId: 'ginseng', quantity: 10 },
      { itemId: 'antler_velvet', quantity: 8 },
      { itemId: 'iridium_bar', quantity: 5 },
      { itemId: 'moonstone', quantity: 8 }
    ],
    bondBonuses: [{ type: 'spirit_shield', staminaSave: 20, hpBonus: 30 }],
    abilities: [
      {
        id: 'shan_weng_1',
        affinityRequired: 600,
        name: 'Tụ Khí',
        description: 'Thể lực đào mỏ tiêu hao -15%',
        passive: { type: 'stamina_save', value: 15 }
      },
      {
        id: 'shan_weng_2',
        affinityRequired: 1200,
        name: 'Linh Mạch',
        description: 'Có tỷ lệ hái được thảo dược quý hiếm trong hang mỏ',
        passive: { type: 'luck', value: 12 }
      },
      {
        id: 'shan_weng_3',
        affinityRequired: 2000,
        name: 'Kim Đan',
        description: 'Thể lực tối đa vĩnh viễn +20',
        passive: { type: 'max_stamina', value: 20 }
      }
    ],
    manifestationDay: { season: 'winter', day: 1 }
  },

  // ============================================================
  // 6. 归女 — 织梦归女
  // ============================================================
  {
    id: 'gui_nv',
    name: 'Quy Nữ',
    trueName: 'Cẩm Quy',
    gender: 'female',
    title: 'Quy Nữ Chức Mộng',
    origin: 'Do chấp niệm của một Chức Nữ nhớ quê nhà hóa thành. Vải vóc nàng dệt ra khi còn sống là độc nhất vô nhị trên thế gian, sau khi chết linh hồn không tiêu tán, vẫn tiếp tục dùng sợi tơ và ánh trăng để dệt, chỉ vì muốn dệt ra một con đường về nhà.',
    personality: 'Dịu dàng u sầu, nội liễm thâm tình',
    discoverySteps: [
      {
        id: 'gui_nv_rumor',
        phase: 'rumor',
        conditions: [{ type: 'npcFriendship', npcId: 'su_su', minFriendship: 2000 }],
        scenes: [
          { text: 'Tố Tố hôm nay có vẻ bồn chồn không yên: 「{player}, chàng có bao giờ... nghe thấy tiếng khung cửi vào ban đêm không?」' },
          { text: '「Căn nhà cũ bên cạnh nhà thiếp, cứ đến những đêm trăng sáng là lại vang lên tiếng kẽo kẹt... giống như có người đang dệt vải vậy.」' },
          { text: '「Thiếp đã qua xem thử rồi, bên trong không có gì cả. Nhưng âm thanh đó... là có thật.」 Trong mắt Tố Tố lộ ra vẻ bất an.' }
        ],
        logMessage: '【Tiên Duyên】 Tố Tố kể rằng ban đêm có thể nghe thấy tiếng khung cửi, nhưng trong căn nhà cũ lại không có một bóng người...'
      },
      {
        id: 'gui_nv_glimpse',
        phase: 'glimpse',
        conditions: [
          { type: 'timeRange', minHour: 22, maxHour: 24 },
          { type: 'item', itemId: 'silk', quantity: 1 },
          { type: 'location', panel: 'village' }
        ],
        scenes: [
          { text: 'Thôn làng lúc đêm khuya vạn vật im lìm. Khi đi ngang qua căn nhà cũ, bạn quả nhiên nghe thấy âm thanh đó —— kẽo kẹt, kẽo kẹt.' },
          { text: 'Xuyên qua khe cửa sổ, dưới ánh trăng có một chiếc khung cửi cổ xưa đang tự động vận hành, những sợi chỉ trắng bạc bay lượn trong không trung.' },
          { text: 'Bạn nhìn thấy bóng dáng mờ ảo của một nữ tử đang ngồi trước khung cửi, nước mắt của nàng hóa thành sợi bạc hòa vào trong tấm vải.' },
          { text: 'Sợi tơ tằm trong tay bạn hơi tỏa sáng, hô ứng với những sợi chỉ trên khung cửi. Bóng hình kia ngoái đầu nhìn lại, nhưng ngay lậpĐó là tiêu tán như khói mây.' }
        ],
        logMessage: '【Tiên Duyên】 Trong căn nhà cũ giữa đêm khuya, u ảnh của một chức nữ đang dệt vải dưới ánh trăng...'
      },
      {
        id: 'gui_nv_encounter',
        phase: 'encounter',
        conditions: [
          { type: 'season', season: 'winter' },
          { type: 'item', itemId: 'silk', quantity: 3 },
          { type: 'item', itemId: 'moonstone', quantity: 1 }
        ],
        scenes: [
          { text: 'Đêm đông, bạn mang theo tơ tằm và đá nguyệt quang đi vào căn nhà cũ. Trước khung cửi vắng ngắt không một bóng người, nhưng bạn vẫn đặt tơ tằm và đá nguyệt quang lên đó.' },
          { text: 'Ánh sáng trắng bạc tỏa ra từ đá nguyệt quang, những sợi chỉ tự động quấn quanh trục dệt. Khung cửi bắt đầu vận hành, một bóng hình từ trong ánh sáng ngưng tụ thành hình.' },
          {
            text: 'Một nữ tử có khuôn mặt thanh tú ngồi trước khung cửi, nét lệ vẫn còn vương trên má. Nàng nhìn bạn, khẽ nói: 「Ngươi... có thể nhìn thấy ta sao?」',
            choices: [
              { text: 'Ta nhìn thấy cô. Cô đang khóc sao?', friendshipChange: 80, response: 'Nàng ngẩn người ra một chút, lau đi nước mắt nơi khóe mi: 「Đã lâu lắm rồi không có ai... nói chuyện với ta.」' },
              {
                text: 'Cô là ai? Tại sao lại dệt vải ở đây?',
                friendshipChange: 60,
                response: '「Ta đang dệt một con đường để trở về nhà.」 Nàng khẽ nói, 「Thế nhưng... ta đã quên mất nhà mình ở đâu rồi.」'
              },
              {
                text: 'Tố Tố rất lo lắng cho cô đấy.',
                friendshipChange: 40,
                response: '「Là cô thợ may đó sao?」 Nàng khẽ mỉm cười, 「Tay nghề của nàng ấy rất tốt, giống y như ta năm xưa vậy.」'
              }
            ]
          },
          { text: 'Trước khi trời sáng bóng dáng nàng lại mờ đi: 「Nếu ngươi nguyện ý... ngày mai lại đến bầu bạn với ta một lát khi đang dệt vải nhé.」' }
        ],
        logMessage: '【Tiên Duyên】 Trước khung cửi nhà cũ, Quy Nữ Chức Mộng cuối cùng cũng chịu mở miệng nói chuyện.'
      },
      {
        id: 'gui_nv_revealed',
        phase: 'revealed',
        conditions: [
          { type: 'npcFriendship', npcId: 'su_su', minFriendship: 3500 },
          { type: 'questComplete', questId: 'main_2_4' }
        ],
        scenes: [
          { text: 'Bạn liên tục nhiều ngày đến căn nhà cũ để bầu bạn cùng Chức Nữ. Đêm nay, bóng dáng của nàng đã rõ ràng hơn trước rất nhiều.' },
          { text: '「Sự kề cận của ngươi đã nhắc ta nhớ lại rất nhiều chuyện.」 Nàng đặt thoi dệt xuống, lần đầu tiên rời khỏi khung cửi bước tới trước mặt bạn.' },
          { text: '「Ta tên Cẩm Quy. Chữ Quy trong từ \'quy hương\' (về quê).」 Nàng khẽ mỉm cười, 「Có lẽ... nơi này chính là chốn về của ta.」' }
        ],
        logMessage: '【Tiên Duyên】 Quy Nữ Chức Mộng Cẩm Quy không còn chấp niệm với con đường về nhà nữa, lựa chọn ở lại Đào Nguyên.'
      }
    ],
    resonantOfferings: ['silk', 'wool', 'moonstone'],
    pleasedOfferings: ['alpaca_wool', 'rabbit_foot', 'cloth'],
    repelledOfferings: ['quartz', 'charcoal', 'copper_ore'],
    dialogues: {
      wary: ['「...」 Nàng cúi đầu dệt vải, không muốn nói gì thêm.', '「Ngươi... không sợ ta sao?」'],
      curious: ['「Ánh trăng hôm nay đẹp quá.」 Tốc độ dệt của nàng chậm lại một chút.', '「Ngươi tới rồi... ngồi đi.」'],
      trusting: ['「{player}, xem này, đây là hoa văn ta mới dệt. Ngươi thấy đẹp không?」', '「Lúc trò chuyện cùng ngươi, ta dường như quên mất mình không còn là người sống nữa.」'],
      devoted: ['「{player}... nếu có thể, ta muốn dệt cho ngươi một bộ y phục vĩnh viễn không bao giờ rách.」', '「Ngươi khiến ta cảm thấy, cho dù là chấp niệm, cũng có thể biến thành một thứ gì đó vô cùng tươi đẹp.」'],
      eternal: ['「Sợi tơ của Cẩm Quy, chỉ dệt vì một mình ngươi mà thôi.」', '「Không cần con đường trở về nhà nữa. Ngươi ở đâu, nơi đó chính là nhà.」']
    },
    interactionType: 'dreamwalk',
    bondable: true,
    courtshipItemId: 'silver_thread_ring',
    bondItemId: 'starlight_loom',
    courtshipThreshold: 1800,
    bondThreshold: 2500,
    heartEventIds: ['gui_nv_heart_1', 'gui_nv_heart_2', 'gui_nv_heart_3'],
    courtshipDialogues: [
      'Quy Nữ nhận lấy chiếc nhẫn chỉ bạc, những ngón tay khẽ run rẩy: 「Đây là... tặng cho ta sao? Người sống cũng bằng lòng cùng ta...」 Nàng chưa nói dứt câu, vành mắt đã đỏ hoe.',
      '「{player}, hôm nay ta đã dệt một bầu trời đầy sao trong giấc mơ của ngươi. Ngươi có thấy không?」',
      '「Có đôi khi ta tự hỏi, có phải vì gặp được ngươi nên ta mới không bị tiêu tán hay không.」'
    ],
    courtshipCraftCost: [
      { itemId: 'silk', quantity: 25 },
      { itemId: 'moonstone', quantity: 8 },
      { itemId: 'gold_bar', quantity: 5 }
    ],
    bondCraftCost: [
      { itemId: 'silk', quantity: 50 },
      { itemId: 'moonstone', quantity: 12 },
      { itemId: 'prismatic_shard', quantity: 5 },
      { itemId: 'gold_bar', quantity: 8 }
    ],
    bondBonuses: [{ type: 'animal_blessing', chance: 0.25 }],
    abilities: [
      { id: 'gui_nv_1', affinityRequired: 500, name: 'Tốc Độ Dệt', description: 'Thời gian gia công vải vóc -30%', passive: { type: 'exp_boost', value: 30 } },
      { id: 'gui_nv_2', affinityRequired: 1100, name: 'Mộng ty', description: 'Khung cửi có tỷ lệ dệt ra Mộng Ty', passive: { type: 'luck', value: 8 } },
      { id: 'gui_nv_3', affinityRequired: 1900, name: 'Linh Phủ', description: 'Độ thiện cảm của động vật nhận được +25%', passive: { type: 'exp_boost', value: 25 } }
    ],
    manifestationDay: { season: 'winter', day: 21 }
  }
]

/** 根据ID获取隐藏NPC定义 */
export const getHiddenNpcById = (id: string): HiddenNpcDef | undefined => HIDDEN_NPCS.find(n => n.id === id)
