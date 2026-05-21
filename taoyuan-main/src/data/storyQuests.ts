import type { MainQuestDef } from '@/types'

/** 章节标题 */
export const CHAPTER_TITLES: Record<number, string> = {
  1: 'Lần Đầu Đến Đào Nguyên',
  2: 'Bám Rễ Vào Lòng Đất',
  3: 'Danh Tiếng Vang Xa',
  4: 'Phong Vân Hội Tụ',
  5: 'Chúa Tể Đào Nguyên'
}

/** 50个主线任务定义，分5章每章10个 */
export const STORY_QUESTS: MainQuestDef[] = [
  // ============================================================
  // 第1章「初入桃源」— 新手引导
  // ============================================================
  {
    id: 'main_1_1',
    chapter: 1,
    order: 1,
    title: 'Khởi Đầu Mới',
    description: 'Trưởng thôn Liễu nói, muốn lập nghiệp ở Đào Nguyên Hương thì hãy bắt đầu từ việc trồng trọt trước. Hãy thử thu hoạch cây trồng 5 lần.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'harvestCrops', label: 'Tích lũy thu hoạch 5 lần cây trồng', target: 5 }],
    moneyReward: 300,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_1_2',
    chapter: 1,
    order: 2,
    title: 'Bán anh em xa mua láng giềng gần',
    description: 'Bác Trần là chủ tiệm Vạn Vật trong thôn, hãy giao thiệp với bác ấy nhiều hơn nhé.',
    npcId: 'chen_bo',
    objectives: [{ type: 'npcFriendship', label: 'Trở nên quen biết với Bác Trần', npcId: 'chen_bo', friendshipLevel: 'acquaintance' }],
    moneyReward: 200,
    friendshipReward: [{ npcId: 'chen_bo', amount: 20 }]
  },
  {
    id: 'main_1_3',
    chapter: 1,
    order: 3,
    title: 'Câu cá bên suối',
    description: 'Thu Nguyệt là cô gái câu cá giỏi nhất thôn, cô ấy mời bạn ra bờ suối thử sức đấy.',
    npcId: 'qiu_yue',
    objectives: [{ type: 'catchFish', label: 'Tích lũy câu được 5 con cá', target: 5 }],
    moneyReward: 300,
    itemReward: [{ itemId: 'standard_bait', quantity: 10 }],
    friendshipReward: [{ npcId: 'qiu_yue', amount: 20 }]
  },
  {
    id: 'main_1_4',
    chapter: 1,
    order: 4,
    title: 'Thám hiểm hang mỏ lần đầu',
    description: 'A Thạch nói trong hang mỏ có nhiều đồ tốt, nhưng cũng rất nguy hiểm. Hãy thử xuống tầng 5 xem sao.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachMineFloor', label: 'Xuống tới tầng 5 hang mỏ', target: 5 }],
    moneyReward: 500,
    friendshipReward: [{ npcId: 'a_shi', amount: 20 }]
  },
  {
    id: 'main_1_5',
    chapter: 1,
    order: 5,
    title: 'Món ngon chốn làng quê',
    description: 'Thím Vương nói, trồng trọt vất vả, hãy học nấu vài món ăn để tự thưởng cho bản thân đi.',
    npcId: 'wang_dashen',
    objectives: [{ type: 'cookRecipes', label: 'Tích lũy nấu 3 món ăn', target: 3 }],
    moneyReward: 300,
    friendshipReward: [{ npcId: 'wang_dashen', amount: 20 }]
  },
  {
    id: 'main_1_6',
    chapter: 1,
    order: 6,
    title: 'Rộng kết thiện duyên',
    description: 'Trưởng thôn Liễu hy vọng bạn quen biết nhiều người trong thôn hơn, đồng thời giúp đỡ bà con làm vài việc.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeQuests', label: 'Tích lũy hoàn thành 3 ủy thác', target: 3 }],
    moneyReward: 500,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_1_7',
    chapter: 1,
    order: 7,
    title: 'Thử thách của thợ mộc',
    description: 'Tiểu Mãn nói sư phụ Triệu thợ mộc của cậu ấy đang cần gấp một lô gỗ, hãy giúp gửi 30 khúc gỗ qua đó nhé.',
    npcId: 'xiao_man',
    objectives: [{ type: 'deliverItem', label: 'Giao Gỗ ×30', itemId: 'wood', itemQuantity: 30 }],
    moneyReward: 500,
    itemReward: [{ itemId: 'basic_fertilizer', quantity: 5 }],
    friendshipReward: [{ npcId: 'xiao_man', amount: 30 }]
  },
  {
    id: 'main_1_8',
    chapter: 1,
    order: 8,
    title: 'Lời dặn dò của Lâm Lão',
    description: 'Lâm Lão cần bốc một thang thuốc, đang thiếu vài loại thảo dược, hãy giúp ông ấy thu thập 10 thảo dược nhé.',
    npcId: 'lin_lao',
    objectives: [{ type: 'deliverItem', label: 'Giao Thảo Dược ×10', itemId: 'herb', itemQuantity: 10 }],
    moneyReward: 500,
    friendshipReward: [{ npcId: 'lin_lao', amount: 30 }]
  },
  {
    id: 'main_1_9',
    chapter: 1,
    order: 9,
    title: 'Bắt đầu lộ diện',
    description: 'Trưởng thôn Liễu rất hài lòng với biểu hiện của bạn. Hãy tiếp tục cố gắng để tích lũy thêm nhiều tiền hơn nữa nhé.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'earnMoney', label: 'Tích lũy đạt được 5000 xu', target: 5000 }],
    moneyReward: 800,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_1_10',
    chapter: 1,
    order: 10,
    title: 'Cắm rễ Đào Nguyên',
    description: 'Muốn thực sự đứng vững ở Đào Nguyên Hương, kỹ năng trồng trọt phải thật vững vàng. Hãy luyện trồng trọt lên cấp 3 nhé.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'skillLevel', label: 'Kỹ năng trồng trọt đạt cấp 3', skillType: 'farming', target: 3 }],
    moneyReward: 1000,
    itemReward: [{ itemId: 'quality_fertilizer', quantity: 5 }],
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },

  // ============================================================
  // 第2章「扎根大地」— 中前期
  // ============================================================
  {
    id: 'main_2_1',
    chapter: 2,
    order: 1,
    title: 'Con đường bội thu',
    description: 'Liễu Nương nói nông trại của bạn ngày càng ra dáng rồi, tiếp tục cố gắng thu hoạch nhiều cây trồng hơn nữa nhé.',
    npcId: 'liu_niang',
    objectives: [{ type: 'harvestCrops', label: 'Tích lũy thu hoạch 50 lần cây trồng', target: 50 }],
    moneyReward: 800,
    friendshipReward: [{ npcId: 'liu_niang', amount: 20 }]
  },
  {
    id: 'main_2_2',
    chapter: 2,
    order: 2,
    title: 'Độ sâu hang mỏ',
    description: 'A Thạch nói dưới tầng 20 hang mỏ có quặng sắt, hãy đi sâu vào thám hiểm xem sao.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachMineFloor', label: 'Xuống tới tầng 20 hang mỏ', target: 20 }],
    moneyReward: 1000,
    itemReward: [{ itemId: 'iron_ore', quantity: 10 }],
    friendshipReward: [{ npcId: 'a_shi', amount: 20 }]
  },
  {
    id: 'main_2_3',
    chapter: 2,
    order: 3,
    title: 'Đạo của ngư ông',
    description: 'Lão Ngư họ Lý nói, câu cá quan trọng nhất ở tâm cảnh. Câu thêm vài con cá nữa để lĩnh ngộ điều kỳ diệu trong đó.',
    npcId: 'li_yu',
    objectives: [{ type: 'catchFish', label: 'Tích lũy câu được 30 con cá', target: 30 }],
    moneyReward: 800,
    friendshipReward: [{ npcId: 'li_yu', amount: 20 }]
  },
  {
    id: 'main_2_4',
    chapter: 2,
    order: 4,
    title: 'Tình quê chớm nở',
    description: 'Trưởng thôn Liễu nói từ từ đường trong thôn có một bảng nhiệm vụ, hãy đến xem mục \'Từ Đường\' trong bách khoa toàn thư, hoàn thành một nhiệm vụ để đóng góp cho thôn.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeBundles', label: 'Hoàn thành 1 nhiệm vụ Từ Đường', target: 1 }],
    moneyReward: 1000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_2_5',
    chapter: 2,
    order: 5,
    title: 'Tình bạn của thợ rèn',
    description: 'Thợ rèn Tôn cần một lô quặng sắt để chế tạo nông cụ, hãy gửi 15 quặng sắt qua để bày tỏ tấm lòng.',
    npcId: 'sun_tiejiang',
    objectives: [
      { type: 'npcFriendship', label: 'Trở nên quen biết với Thợ rèn Tôn', npcId: 'sun_tiejiang', friendshipLevel: 'acquaintance' },
      { type: 'deliverItem', label: 'Giao Quặng Sắt ×15', itemId: 'iron_ore', itemQuantity: 15 }
    ],
    moneyReward: 1000,
    friendshipReward: [{ npcId: 'sun_tiejiang', amount: 30 }]
  },
  {
    id: 'main_2_6',
    chapter: 2,
    order: 6,
    title: 'Giấc mơ mục trường',
    description: 'Đại Ngưu nói nuôi động vật là một việc rất vui, hãy thử nuôi 3 con gia súc xem sao.',
    npcId: 'da_niu',
    objectives: [{ type: 'ownAnimals', label: 'Sở hữu 3 con gia súc', target: 3 }],
    moneyReward: 1000,
    friendshipReward: [{ npcId: 'da_niu', amount: 30 }]
  },
  {
    id: 'main_2_7',
    chapter: 2,
    order: 7,
    title: 'Nấu ăn tiến bộ',
    description: 'Thím Vương khen ngợi tay nghề nấu nướng của bạn hết lời, hãy học thêm vài món ăn nữa nhé.',
    npcId: 'wang_dashen',
    objectives: [{ type: 'cookRecipes', label: 'Tích lũy nấu 15 món ăn', target: 15 }],
    moneyReward: 800,
    friendshipReward: [{ npcId: 'wang_dashen', amount: 20 }]
  },
  {
    id: 'main_2_8',
    chapter: 2,
    order: 8,
    title: 'Ủy thác trong thôn',
    description: 'Trưởng thôn Liễu nói bạn đã giúp đỡ bà con rất nhiều, hãy tiếp tục phát huy nhé.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeQuests', label: 'Tích lũy hoàn thành 10 ủy thác', target: 10 }],
    moneyReward: 1000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_2_9',
    chapter: 2,
    order: 9,
    title: 'Sản vật bốn mùa',
    description: 'Bác Trần nói Đào Nguyên Hương sản vật phong phú, hãy phát hiện thêm nhiều vật phẩm khác nhau nhé.',
    npcId: 'chen_bo',
    objectives: [{ type: 'discoverItems', label: 'Phát hiện 30 loại vật phẩm khác nhau', target: 30 }],
    moneyReward: 1200,
    friendshipReward: [{ npcId: 'chen_bo', amount: 20 }]
  },
  {
    id: 'main_2_10',
    chapter: 2,
    order: 10,
    title: 'Có chút danh tiếng',
    description: 'Bạn đã có chút tiếng tăm ở Đào Nguyên Hương rồi. Hãy tiếp tục tích lũy của cải để chứng minh thực lực bản thân.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'earnMoney', label: 'Tích lũy đạt được 15000 xu', target: 15000 }],
    moneyReward: 1500,
    itemReward: [{ itemId: 'seed_peach', quantity: 3 }],
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },

  // ============================================================
  // 第3章「名扬四乡」— 中期
  // ============================================================
  {
    id: 'main_3_1',
    chapter: 3,
    order: 1,
    title: 'Thử thách vực thẳm',
    description: 'A Thạch nói dưới tầng 40 hang mỏ có quặng vàng, nhưng quái vật cũng trở nên hung tợn hơn nhiều.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachMineFloor', label: 'Xuống tới tầng 40 hang mỏ', target: 40 }],
    moneyReward: 1500,
    itemReward: [{ itemId: 'gold_ore', quantity: 10 }],
    friendshipReward: [{ npcId: 'a_shi', amount: 20 }]
  },
  {
    id: 'main_3_2',
    chapter: 3,
    order: 2,
    title: 'Biết tuốt',
    description: 'Trưởng thôn Liễu nói bạn đã trở thành người bận rộn nhất thôn rồi, hãy tiếp tục giúp đỡ bà con nhé.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeQuests', label: 'Tích lũy hoàn thành 25 ủy thác', target: 25 }],
    moneyReward: 1500,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_3_3',
    chapter: 3,
    order: 3,
    title: 'Vạn vật thông giám',
    description: 'Chu tú tài rất hứng thú với kiến thức của bạn, hy vọng bạn có thể phát hiện thêm nhiều sản vật của Đào Nguyên Hương.',
    npcId: 'zhou_xiucai',
    objectives: [{ type: 'discoverItems', label: 'Phát hiện 50 loại vật phẩm khác nhau', target: 50 }],
    moneyReward: 1500,
    friendshipReward: [{ npcId: 'zhou_xiucai', amount: 20 }]
  },
  {
    id: 'main_3_4',
    chapter: 3,
    order: 4,
    title: 'Ẩm thực gia',
    description: 'Thím Mập nói tay nghề nấu nướng của bạn ngày càng tiến bộ, hãy tiếp tục cố gắng nhé!',
    npcId: 'pang_shen',
    objectives: [{ type: 'cookRecipes', label: 'Tích lũy nấu 30 món ăn', target: 30 }],
    moneyReward: 1200,
    friendshipReward: [{ npcId: 'pang_shen', amount: 20 }]
  },
  {
    id: 'main_3_5',
    chapter: 3,
    order: 5,
    title: 'Nhân duyên tốt',
    description: 'Trưởng thôn Liễu hy vọng bạn có thể làm quen và nhớ mặt tất cả mọi người trong thôn.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'npcAllFriendly', label: 'Trở nên quen biết với tất cả dân làng', friendshipLevel: 'acquaintance' }],
    moneyReward: 2000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_3_6',
    chapter: 3,
    order: 6,
    title: 'Mở rộng mục trường',
    description: 'Đại Ngưu rất quan tâm đến mục trường của bạn, hãy nuôi gia súc lên tới 8 con nhé.',
    npcId: 'da_niu',
    objectives: [{ type: 'ownAnimals', label: 'Sở hữu 8 con gia súc', target: 8 }],
    moneyReward: 1500,
    friendshipReward: [{ npcId: 'da_niu', amount: 20 }]
  },
  {
    id: 'main_3_7',
    chapter: 3,
    order: 7,
    title: 'Ngư vương chớm thành',
    description: 'Thu Nguyệt nói kỹ năng câu cá của bạn đã khá tốt rồi, hãy tiếp tục nâng cao nhé!',
    npcId: 'qiu_yue',
    objectives: [{ type: 'catchFish', label: 'Tích lũy câu được 80 con cá', target: 80 }],
    moneyReward: 1500,
    friendshipReward: [{ npcId: 'qiu_yue', amount: 20 }]
  },
  {
    id: 'main_3_8',
    chapter: 3,
    order: 8,
    title: 'Đạt nhân xuất hàng',
    description: 'Chưởng quầy Hà nói chủng loại xuất hàng của bạn ngày càng phong phú, hãy tiếp tục mở rộng thị trường tiêu thụ.',
    npcId: 'he_zhanggui',
    objectives: [{ type: 'shipItems', label: 'Xuất hàng 15 loại vật phẩm khác nhau', target: 15 }],
    moneyReward: 2000,
    friendshipReward: [{ npcId: 'he_zhanggui', amount: 20 }]
  },
  {
    id: 'main_3_9',
    chapter: 3,
    order: 9,
    title: 'Tinh thông kỹ nghệ',
    description: 'Lâm Lão nói con người cần có một sở trường riêng, hãy luyện bất kỳ kỹ năng nào lên cấp 7 nhé.',
    npcId: 'lin_lao',
    objectives: [{ type: 'skillLevel', label: 'Kỹ năng bất kỳ đạt cấp 7', target: 7 }],
    moneyReward: 2000,
    friendshipReward: [{ npcId: 'lin_lao', amount: 20 }]
  },
  {
    id: 'main_3_10',
    chapter: 3,
    order: 10,
    title: 'Tiếng tăm vang xa',
    description: 'Danh tiếng của bạn đã truyền đến làng bên rồi. Hãy tiếp tục tích lũy của cải để trở thành niềm tự hào của Đào Nguyên Hương.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'earnMoney', label: 'Tích lũy đạt được 40000 xu', target: 40000 }],
    moneyReward: 2500,
    itemReward: [{ itemId: 'jade', quantity: 2 }],
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },

  // ============================================================
  // 第4章「风云际会」— 中后期
  // ============================================================
  {
    id: 'main_4_1',
    chapter: 4,
    order: 1,
    title: 'Chinh phục vực thẳm',
    description: 'A Thạch nói sâu nhất trong hang mỏ ẩn giấu một thủ lĩnh vô cùng mạnh mẽ, hãy xuống tới tầng 80 xem.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachMineFloor', label: 'Xuống tới tầng 80 hang mỏ', target: 80 }],
    moneyReward: 3000,
    itemReward: [{ itemId: 'gold_ore', quantity: 15 }],
    friendshipReward: [{ npcId: 'a_shi', amount: 20 }]
  },
  {
    id: 'main_4_2',
    chapter: 4,
    order: 2,
    title: 'Diệt yêu trừ ma',
    description: 'Vân Phi nói quái vật trong núi ngày càng nhiều, cần có người ra tay dọn dẹp bớt.',
    npcId: 'yun_fei',
    objectives: [{ type: 'killMonsters', label: 'Tích lũy tiêu diệt 150 quái vật', target: 150 }],
    moneyReward: 2500,
    friendshipReward: [{ npcId: 'yun_fei', amount: 30 }]
  },
  {
    id: 'main_4_3',
    chapter: 4,
    order: 3,
    title: 'Tình quê viên mãn',
    description: 'Trưởng thôn Liễu hy vọng bạn có thể hoàn thành thêm nhiều nhiệm vụ Từ Đường cho làng. Hãy đến mục \'Từ Đường\' trong bách khoa toàn thư để xem và nộp vật phẩm yêu cầu.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeBundles', label: 'Hoàn thành 4 nhiệm vụ Từ Đường', target: 4 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_4_4',
    chapter: 4,
    order: 4,
    title: 'Trăm năm hạnh phúc',
    description: 'Trưởng thôn Liễu cười nói, đã đến lúc lập gia đình rồi đúng không?',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'married', label: 'Kết hôn with người thương' }],
    moneyReward: 2000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_4_5',
    chapter: 4,
    order: 5,
    title: 'Con đường trở thành đại đầu bếp',
    description: 'Thím Vương nói tay nghề nấu nướng của bạn đã vượt qua thím ấy rồi, hãy tiếp tục thử thách thêm nhiều món ăn nữa.',
    npcId: 'wang_dashen',
    objectives: [{ type: 'cookRecipes', label: 'Tích lũy nấu 50 món ăn', target: 50 }],
    moneyReward: 2500,
    friendshipReward: [{ npcId: 'wang_dashen', amount: 20 }]
  },
  {
    id: 'main_4_6',
    chapter: 4,
    order: 6,
    title: 'Bác vật toàn tài',
    description: 'Chu tú tài nói kiến thức của bạn đã vượt qua hầu hết mọi người rồi, hãy tiếp tục thám hiểm nhé.',
    npcId: 'zhou_xiucai',
    objectives: [{ type: 'discoverItems', label: 'Phát hiện 80 loại vật phẩm khác nhau', target: 80 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'zhou_xiucai', amount: 20 }]
  },
  {
    id: 'main_4_7',
    chapter: 4,
    order: 7,
    title: 'Đại tài phiệt vận chuyển',
    description: 'Chưởng quầy Hà kinh ngạc trước quy mô xuất hàng của bạn, hãy tiếp tục tăng thêm nhiều chủng loại xuất hàng.',
    npcId: 'he_zhanggui',
    objectives: [{ type: 'shipItems', label: 'Xuất hàng 30 loại vật phẩm khác nhau', target: 30 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'he_zhanggui', amount: 20 }]
  },
  {
    id: 'main_4_8',
    chapter: 4,
    order: 8,
    title: 'Giao tình tri kỷ',
    description: 'Đời người có được một tri kỷ là đủ rồi. Hãy trở thành chí hữu với một người dân làng nhé.',
    npcId: 'lin_lao',
    objectives: [{ type: 'npcFriendship', label: 'Trở thành chí hữu với dân làng bất kỳ', npcId: '_any', friendshipLevel: 'bestFriend' }],
    moneyReward: 2500,
    friendshipReward: [{ npcId: 'lin_lao', amount: 20 }]
  },
  {
    id: 'main_4_9',
    chapter: 4,
    order: 9,
    title: 'Ông trùm mùa vụ',
    description: 'Liễu Nương nói nông trại của bạn có sản lượng cao nhất Đào Nguyên Hương, hãy tiếp tục duy trì nhé.',
    npcId: 'liu_niang',
    objectives: [{ type: 'harvestCrops', label: 'Tích lũy thu hoạch 300 lần cây trồng', target: 300 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'liu_niang', amount: 20 }]
  },
  {
    id: 'main_4_10',
    chapter: 4,
    order: 10,
    title: 'Phú giáp nhất phương',
    description: 'Sự giàu có của bạn đã vang danh khắp vùng. Trưởng thôn Liễu nói bạn là niềm tự hào của Đào Nguyên Hương.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'earnMoney', label: 'Tích lũy đạt được 100000 xu', target: 100000 }],
    moneyReward: 5000,
    itemReward: [{ itemId: 'prismatic_shard', quantity: 1 }],
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },

  // ============================================================
  // 第5章「桃源之主」— 后期/终章
  // ============================================================
  {
    id: 'main_5_1',
    chapter: 5,
    order: 1,
    title: 'Đáy hang mỏ',
    description: 'A Thạch nói tầng sâu nhất của hang mỏ đang chôn giấu một bí mật cổ xưa, hãy xuống tầng 120 để giải mã.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachMineFloor', label: 'Xuống tới tầng 120 hang mỏ', target: 120 }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'a_shi', amount: 30 }]
  },
  {
    id: 'main_5_2',
    chapter: 5,
    order: 2,
    title: 'Vực thẳm đầu lâu',
    description: 'A Thạch nói cuối hang mỏ dẫn đến huyệt mỏ Đầu Lâu, nơi đó có nhiều quặng đá quý hiếm hơn.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachSkullFloor', label: 'Huyệt mỏ Đầu Lâu đạt tầng 50', target: 50 }],
    moneyReward: 5000,
    itemReward: [{ itemId: 'iridium_ore', quantity: 5 }],
    friendshipReward: [{ npcId: 'a_shi', amount: 30 }]
  },
  {
    id: 'main_5_3',
    chapter: 5,
    order: 3,
    title: 'Kẻ thù của vạn ma',
    description: 'Vân Phi nói bạn đã là chiến sĩ mạnh nhất Đào Nguyên Hương rồi, nhưng quái vật vẫn không ngừng xuất hiện.',
    npcId: 'yun_fei',
    objectives: [{ type: 'killMonsters', label: 'Tích lũy tiêu diệt 500 quái vật', target: 500 }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'yun_fei', amount: 30 }]
  },
  {
    id: 'main_5_4',
    chapter: 5,
    order: 4,
    title: 'Bậc thầy toàn năng',
    description: 'Lâm Lão nói bậc thầy thực sự phải tinh thông mọi thứ. Hãy nâng cấp tất cả kỹ năng lên cấp 8 nhé.',
    npcId: 'lin_lao',
    objectives: [{ type: 'allSkillsLevel', label: 'Tất cả kỹ năng đạt cấp 8', target: 8 }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'lin_lao', amount: 30 }]
  },
  {
    id: 'main_5_5',
    chapter: 5,
    order: 5,
    title: 'Ngự đầu bếp',
    description: 'Thím Vương nói tay nghề nấu ăn của bạn đã đạt đến mức hoàn mỹ, hãy hướng tới mục tiêu trăm món ăn!',
    npcId: 'wang_dashen',
    objectives: [{ type: 'cookRecipes', label: 'Tích lũy nấu 80 món ăn', target: 80 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'wang_dashen', amount: 30 }]
  },
  {
    id: 'main_5_6',
    chapter: 5,
    order: 6,
    title: 'Niềm vui thiên luân',
    description: 'Trưởng thôn Liễu cười nói, lập gia đình rồi thì cũng nên đón một đứa con chào đời thôi.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'hasChild', label: 'Chào đón đứa con đầu lòng' }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_5_7',
    chapter: 5,
    order: 7,
    title: 'Người bạn Đào Nguyên',
    description: 'Trưởng thôn Liễu hy vọng bạn có thể kết bạn với tất cả mọi người trong thôn.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'npcAllFriendly', label: 'Trở thành tri kỷ với tất cả dân làng', friendshipLevel: 'friendly' }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_5_8',
    chapter: 5,
    order: 8,
    title: 'Bản đồ xuất hàng',
    description: 'Chưởng quầy Hà hy vọng bạn có thể xuất hàng thử tất cả sản vật của Đào Nguyên Hương một lần.',
    npcId: 'he_zhanggui',
    objectives: [{ type: 'shipItems', label: 'Xuất hàng 50 loại vật phẩm khác nhau', target: 50 }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'he_zhanggui', amount: 30 }]
  },
  {
    id: 'main_5_9',
    chapter: 5,
    order: 9,
    title: 'Từ Đường viên mãn',
    description: 'Trưởng thôn Liễu nói tất cả nhiệm vụ trên bảng Từ Đường đều trông cậy vào bạn đấy. Hãy đến mục \'Từ Đường\' trong bách khoa toàn thư để hoàn thành các nhiệm vụ còn lại.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeBundles', label: 'Hoàn thành toàn bộ 6 nhiệm vụ Từ Đường', target: 6 }],
    moneyReward: 8000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_5_10',
    chapter: 5,
    order: 10,
    title: 'Chúa Tể Đào Nguyên',
    description: 'Bạn đã trở thành chủ nhân thực sự của Đào Nguyên Hương. Tất cả kỹ năng đạt cấp tối đa, tài sản đứng đầu vùng quê này. Đây chính là thử thách cuối cùng.',
    npcId: 'liu_cunzhang',
    objectives: [
      { type: 'earnMoney', label: 'Tích lũy đạt được 300000 xu', target: 300000 },
      { type: 'allSkillsLevel', label: 'Tất cả kỹ năng đạt cấp 10', target: 10 }
    ],
    moneyReward: 10000,
    itemReward: [{ itemId: 'prismatic_shard', quantity: 1 }],
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 50 }]
  }
]

/** 根据ID获取主线任务 */
export const getStoryQuestById = (id: string): MainQuestDef | undefined => {
  return STORY_QUESTS.find(q => q.id === id)
}

/** 根据章节和序号获取主线任务 */
export const getStoryQuestByOrder = (chapter: number, order: number): MainQuestDef | undefined => {
  return STORY_QUESTS.find(q => q.chapter === chapter && q.order === order)
}

/** 获取下一个主线任务 */
export const getNextStoryQuest = (currentId: string): MainQuestDef | undefined => {
  const idx = STORY_QUESTS.findIndex(q => q.id === currentId)
  if (idx === -1 || idx >= STORY_QUESTS.length - 1) return undefined
  return STORY_QUESTS[idx + 1]
}

/** 获取某章的所有主线任务 */
export const getChapterQuests = (chapter: number): MainQuestDef[] => {
  return STORY_QUESTS.filter(q => q.chapter === chapter)
}

/** 获取第一个主线任务 */
export const getFirstStoryQuest = (): MainQuestDef => {
  return STORY_QUESTS[0]!
}
