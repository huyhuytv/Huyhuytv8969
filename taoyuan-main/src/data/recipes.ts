import type { RecipeDef } from '@/types'

/** 所有食谱定义 */
export const RECIPES: RecipeDef[] = [
  {
    id: 'stir_fried_cabbage',
    name: 'Rau cải xào',
    ingredients: [{ itemId: 'cabbage', quantity: 2 }],
    effect: { staminaRestore: 15, healthRestore: 5 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Món ăn gia đình đơn giản mộc mạc.'
  },
  {
    id: 'radish_soup',
    name: 'Canh củ cải',
    ingredients: [
      { itemId: 'radish', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 10 },
    unlockSource: 'Thiện cảm Bác Trần đạt \'Quen biết\'',
    description: 'Canh củ cải nóng hổi, ấm lòng ấm dạ.'
  },
  {
    id: 'braised_carp',
    name: 'Cá chép kho tộ',
    ingredients: [
      { itemId: 'carp', quantity: 1 },
      { itemId: 'sesame', quantity: 2 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 15,
      buff: { type: 'fishing', value: 1, description: 'Kỹ năng câu cá +1 (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Thu Nguyệt đạt \'Quen biết\'',
    description: 'Món cá chép kho tộ thơm ngon đậm đà.'
  },
  {
    id: 'herbal_porridge',
    name: 'Cháo dược thiện',
    ingredients: [
      { itemId: 'herb', quantity: 2 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: { staminaRestore: 40, healthRestore: 20 },
    unlockSource: 'Thiện cảm Lâm Lão đạt \'Quen biết\'',
    description: 'Món cháo dược thiện giúp bồi bổ cơ thể.'
  },
  {
    id: 'osmanthus_cake',
    name: 'Bánh hoa quế',
    ingredients: [
      { itemId: 'osmanthus', quantity: 3 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 20,
      healthRestore: 5,
      buff: { type: 'giftBonus', value: 2, description: 'Thiện cảm tặng quà x2 (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Liễu Nương đạt \'Quen biết\'',
    description: 'Bánh hoa quế tinh tế, thích hợp làm quà tặng.'
  },
  {
    id: 'miner_lunch',
    name: 'Cơm hộp thợ mỏ',
    ingredients: [
      { itemId: 'potato', quantity: 2 },
      { itemId: 'sweet_potato', quantity: 1 }
    ],
    effect: {
      staminaRestore: 25,
      healthRestore: 25,
      buff: { type: 'mining', value: 20, description: 'Thể lực đào mỏ tiêu hao -20% (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm A Thạch đạt \'Quen biết\'',
    description: 'Bữa cơm no bụng thực tế của thợ mỏ.'
  },
  {
    id: 'spicy_hotpot',
    name: 'Lẩu ma cay',
    ingredients: [
      { itemId: 'chili', quantity: 2 },
      { itemId: 'cabbage', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 40,
      buff: { type: 'defense', value: 20, description: 'Sát thương gánh chịu -20% (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 4',
    requiredSkill: { type: 'farming', level: 4 },
    description: 'Nồi lẩu cay nồng nóng hổi, xua tan giá lạnh.'
  },
  {
    id: 'steamed_bass',
    name: 'Cá vược hấp sả',
    ingredients: [
      { itemId: 'bass', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'fishing', value: 2, description: 'Kỹ năng câu cá +2 (Trong ngày)' }
    },
    unlockSource: 'Cấp câu cá 3',
    requiredSkill: { type: 'fishing', level: 3 },
    description: 'Món cá vược hấp sả thơm ngọt thịt.'
  },
  {
    id: 'honey_tea',
    name: 'Trà mật ong',
    ingredients: [
      { itemId: 'honey', quantity: 1 },
      { itemId: 'herb', quantity: 1 }
    ],
    effect: { staminaRestore: 30, healthRestore: 10 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Tách trà mật ong ngọt ngào ấm áp.'
  },
  {
    id: 'ginger_soup',
    name: 'Canh gừng',
    ingredients: [
      { itemId: 'ginger', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 20,
      healthRestore: 10,
      buff: { type: 'speed', value: 15, description: 'Tốc độ di chuyển +15% (Trong ngày)' }
    },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Canh gừng ấm bụng giải cảm.'
  },
  {
    id: 'jujube_cake',
    name: 'Bánh táo đỏ',
    ingredients: [
      { itemId: 'jujube', quantity: 3 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: { staminaRestore: 35, healthRestore: 15 },
    unlockSource: 'Cấp nấu ăn 2',
    requiredSkill: { type: 'farming', level: 2 },
    description: 'Bánh táo đỏ ngọt ngào dẻo thơm.'
  },
  {
    id: 'peach_blossom_cake',
    name: 'Bánh hoa đào',
    ingredients: [
      { itemId: 'peach', quantity: 2 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 25,
      healthRestore: 10,
      buff: { type: 'giftBonus', value: 2, description: 'Thiện cảm tặng quà x2 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 3',
    requiredSkill: { type: 'farming', level: 3 },
    description: 'Món bánh hoa đào giới hạn ngày xuân.'
  },
  {
    id: 'fish_noodle',
    name: 'Mì nước canh cá',
    ingredients: [
      { itemId: 'crucian', quantity: 1 },
      { itemId: 'winter_wheat', quantity: 2 }
    ],
    effect: { staminaRestore: 30, healthRestore: 15 },
    unlockSource: 'Cấp câu cá 2',
    requiredSkill: { type: 'fishing', level: 2 },
    description: 'Mì nước canh cá thơm ngọt bùi.'
  },
  {
    id: 'miner_iron_pot',
    name: 'Cơm niêu thợ mỏ',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'copper_ore', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 30,
      buff: { type: 'mining', value: 25, description: 'Thể lực đào mỏ tiêu hao -25% (Trong ngày)' }
    },
    unlockSource: 'Cấp khai khoáng 4',
    requiredSkill: { type: 'mining', level: 4 },
    description: 'Món cơm trộn thập cẩm bằng nồi sắt của cánh thợ mỏ.'
  },
  {
    id: 'bamboo_shoot_stir_fry',
    name: 'Măng mùa đông xào thịt',
    ingredients: [
      { itemId: 'winter_bamboo_shoot', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 10 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Thịt ba chỉ xào măng đông thơm giòn.'
  },
  {
    id: 'dried_persimmon',
    name: 'Hồng sấy dẻo',
    ingredients: [{ itemId: 'persimmon', quantity: 3 }],
    effect: { staminaRestore: 20, healthRestore: 5 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Quả hồng sấy dẻo ngọt lịm.'
  },
  {
    id: 'lotus_seed_soup',
    name: 'Chè hạt sen',
    ingredients: [
      { itemId: 'lotus_seed', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'luck', value: 15, description: 'May mắn +15% (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 5',
    requiredSkill: { type: 'farming', level: 5 },
    description: 'Bát chè hạt sen thanh mát tĩnh tâm.'
  },
  {
    id: 'sesame_paste',
    name: 'Chè mè đen',
    ingredients: [
      { itemId: 'sesame', quantity: 3 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: { staminaRestore: 30, healthRestore: 10 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Chè mè đen thơm lừng sánh mịn.'
  },
  {
    id: 'ginseng_soup',
    name: 'Canh nhân sâm',
    ingredients: [
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'farming', value: 20, description: 'Thể lực làm nông tiêu hao -20% (Trong ngày)' }
    },
    unlockSource: 'Cấp thu thập 5',
    requiredSkill: { type: 'foraging', level: 5 },
    description: 'Canh nhân sâm bồi bổ nguyên khí.'
  },
  {
    id: 'corn_pancake',
    name: 'Bánh ngô chiên giòn',
    ingredients: [
      { itemId: 'corn', quantity: 2 },
      { itemId: 'sesame_oil', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 10 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Bánh ngô chiên giòn rụm vàng óng.'
  },
  {
    id: 'osmanthus_lotus_root',
    name: 'Bột sắn dây hoa quế',
    ingredients: [
      { itemId: 'osmanthus', quantity: 1 },
      { itemId: 'lotus_root', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'luck', value: 10, description: 'May mắn +10% (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 3',
    requiredSkill: { type: 'farming', level: 3 },
    description: 'Bát bột sắn dây hương hoa quế thơm ngát.'
  },

  // ==================== 新增初始食谱 (8) ====================
  {
    id: 'scrambled_egg_rice',
    name: 'Cơm chiên trứng',
    ingredients: [
      { itemId: 'egg', quantity: 1 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: { staminaRestore: 20, healthRestore: 10 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Đĩa cơm chiên trứng đơn giản mà ngon miệng.'
  },
  {
    id: 'stir_fried_potato',
    name: 'Khoai tây bào sợi xào',
    ingredients: [{ itemId: 'potato', quantity: 2 }],
    effect: { staminaRestore: 18, healthRestore: 5 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Khoai tây bào sợi xào chua cay giòn sần sật.'
  },
  {
    id: 'boiled_egg',
    name: 'Trứng luộc',
    ingredients: [{ itemId: 'egg', quantity: 2 }],
    effect: { staminaRestore: 15, healthRestore: 10 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Nguồn dinh dưỡng mộc mạc nhất.'
  },
  {
    id: 'congee',
    name: 'Cháo trắng',
    ingredients: [{ itemId: 'rice', quantity: 2 }],
    effect: { staminaRestore: 15, healthRestore: 5 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Tố cháo trắng thanh đạm dễ tiêu.'
  },
  {
    id: 'rice_ball',
    name: 'Cơm nắm',
    ingredients: [{ itemId: 'rice', quantity: 1 }],
    effect: { staminaRestore: 12, healthRestore: 3 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Cơm nắm giản đơn, tiện mang theo người.'
  },
  {
    id: 'steamed_bun',
    name: 'Màn thầu',
    ingredients: [{ itemId: 'wheat_flour', quantity: 1 }],
    effect: { staminaRestore: 12, healthRestore: 3 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Bánh màn thầu bột mì mềm xốp, món ăn chính giản dị.'
  },
  {
    id: 'roasted_sweet_potato',
    name: 'Khoai lang nướng',
    ingredients: [{ itemId: 'sweet_potato', quantity: 2 }],
    effect: { staminaRestore: 20, healthRestore: 5 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Củ khoai lang nướng thơm phức ngọt bùi.'
  },
  {
    id: 'vegetable_soup',
    name: 'Canh rau củ điền viên',
    ingredients: [
      { itemId: 'cabbage', quantity: 1 },
      { itemId: 'radish', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 10 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Món canh thanh mát ninh từ rau củ tươi.'
  },
  {
    id: 'chive_egg_stir_fry',
    name: 'Hẹ xào trứng',
    ingredients: [
      { itemId: 'chives', quantity: 2 },
      { itemId: 'egg', quantity: 1 }
    ],
    effect: { staminaRestore: 22, healthRestore: 10 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Sự kết hợp kinh điển giữa hẹ và trứng.'
  },
  {
    id: 'peanut_candy',
    name: 'Kẹo đậu phộng',
    ingredients: [
      { itemId: 'peanut', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: { staminaRestore: 18, healthRestore: 5 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Kẹo đậu phộng giòn rụm ngọt ngào.'
  },

  // ==================== NPC 好感食谱 — 相识 (1 新) ====================
  {
    id: 'sweet_osmanthus_tea',
    name: 'Trà ngọt hoa quế',
    ingredients: [
      { itemId: 'osmanthus', quantity: 1 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 20,
      healthRestore: 5,
      buff: { type: 'luck', value: 10, description: 'May mắn +10% (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Tiểu Mãn đạt \'Quen biết\'',
    description: 'Trà ngọt hoa quế thơm ngát dịu dàng.'
  },

  // ==================== NPC 好感食谱 — 相知 (6) ====================
  {
    id: 'aged_radish_stew',
    name: 'Thịt kho củ cải già',
    ingredients: [
      { itemId: 'radish', quantity: 3 },
      { itemId: 'firewood', quantity: 2 }
    ],
    effect: { staminaRestore: 40, healthRestore: 25 },
    unlockSource: 'Thiện cảm Bác Trần đạt \'Tri kỷ\'',
    description: 'Món thịt kho củ cải bí truyền của Bác Trần, đậm đà thấm vị.'
  },
  {
    id: 'maple_grilled_fish',
    name: 'Cá nướng lá phong',
    ingredients: [
      { itemId: 'mandarin_fish', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'fishing', value: 2, description: 'Kỹ năng câu cá +2 (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Thu Nguyệt đạt \'Tri kỷ\'',
    description: 'Phương pháp nướng cá bằng lá phong độc quyền của Thu Nguyệt.'
  },
  {
    id: 'herbal_pill',
    name: 'Bách Thảo Đan',
    ingredients: [
      { itemId: 'herb', quantity: 3 },
      { itemId: 'ginseng', quantity: 1 }
    ],
    effect: { staminaRestore: 60, healthRestore: 30 },
    unlockSource: 'Thiện cảm Lâm Lão đạt \'Tri kỷ\'',
    description: 'Linh dược bách thảo rèn từ phương thuốc của Lâm Lão.'
  },
  {
    id: 'embroidered_cake',
    name: 'Bánh túi gấm thêu',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'osmanthus', quantity: 2 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 15,
      buff: { type: 'giftBonus', value: 2, description: 'Thiện cảm tặng quà x2 (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Liễu Nương đạt \'Tri kỷ\'',
    description: 'Món bánh tạo hình túi gấm do chính tay Liễu Nương làm.'
  },
  {
    id: 'deep_mine_stew',
    name: 'Canh hầm mỏ sâu',
    ingredients: [
      { itemId: 'potato', quantity: 2 },
      { itemId: 'copper_ore', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 35,
      buff: { type: 'mining', value: 30, description: 'Thể lực đào mỏ tiêu hao -30% (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm A Thạch đạt \'Tri kỷ\'',
    description: 'Món canh hầm do A Thạch sáng tạo ra nơi mỏ sâu.'
  },
  {
    id: 'wild_berry_jam',
    name: 'Mứt quả dại',
    ingredients: [
      { itemId: 'wild_berry', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 25,
      healthRestore: 10,
      buff: { type: 'speed', value: 20, description: 'Tốc độ di chuyển +20% (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Tiểu Mãn đạt \'Tri kỷ\'',
    description: 'Mứt ngọt do Tiểu Mãn làm từ quả mọng trong rừng.'
  },

  // ==================== NPC 好感食谱 — 挚友 (6) ====================
  {
    id: 'farmers_feast',
    name: 'Yến tiệc nhà nông',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'cabbage', quantity: 2 },
      { itemId: 'egg', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 40,
      buff: { type: 'farming', value: 25, description: 'Thể lực làm nông tiêu hao -25% (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Bác Trần đạt \'Chí hữu\'',
    description: 'Món tủ gia truyền của Bác Trần đãi khách quý.'
  },
  {
    id: 'autumn_moon_feast',
    name: 'Yến tiệc đêm thu',
    ingredients: [
      { itemId: 'mandarin_fish', quantity: 1 },
      { itemId: 'river_crab', quantity: 1 },
      { itemId: 'osmanthus', quantity: 2 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'luck', value: 20, description: 'May mắn +20% (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Thu Nguyệt đạt \'Chí hữu\'',
    description: 'Bữa tiệc đêm thu thịnh soạn Thu Nguyệt chuẩn bị cho chí hữu.'
  },
  {
    id: 'longevity_soup',
    name: 'Canh Trường Sinh',
    ingredients: [
      { itemId: 'ginseng', quantity: 2 },
      { itemId: 'herb', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: { staminaRestore: 80, healthRestore: 40 },
    unlockSource: 'Thiện cảm Lâm Lão đạt \'Chí hữu\'',
    description: 'Phương thuốc dưỡng sinh đúc kết cả đời tâm huyết của Lâm Lão.'
  },
  {
    id: 'lovers_pastry',
    name: 'Bánh Uyên Ương',
    ingredients: [
      { itemId: 'peach', quantity: 2 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'giftBonus', value: 3, description: 'Thiện cảm tặng quà x3 (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Liễu Nương đạt \'Chí hữu\'',
    description: 'Món bánh Uyên Ương Liễu Nương làm riêng cho những người có tình.'
  },
  {
    id: 'forgemasters_meal',
    name: 'Combo thợ rèn',
    ingredients: [
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'potato', quantity: 3 },
      { itemId: 'firewood', quantity: 2 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 50,
      buff: { type: 'defense', value: 25, description: 'Sát thương gánh chịu -25% (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm A Thạch đạt \'Chí hữu\'',
    description: 'Khẩu phần ăn giàu năng lượng độc quyền của thợ rèn A Thạch.'
  },
  {
    id: 'spirit_fruit_wine',
    name: 'Rượu quả tiên',
    ingredients: [
      { itemId: 'wild_berry', quantity: 3 },
      { itemId: 'honey', quantity: 2 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'luck', value: 25, description: 'May mắn +25% (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Tiểu Mãn đạt \'Chí hữu\'',
    description: 'Rượu may mắn do Tiểu Mãn ủ từ quả tiên trong rừng.'
  },

  // ==================== NPC 结婚食谱 (12) ====================
  {
    id: 'phoenix_cake',
    name: 'Bánh Phượng Hoàng',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'osmanthus', quantity: 2 },
      { itemId: 'jujube', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'giftBonus', value: 3, description: 'Thiện cảm tặng quà x3 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn với Liễu Nương',
    description: 'Công thức bánh Phượng Hoàng do Liễu Nương truyền lại sau khi cưới.'
  },
  {
    id: 'molten_hotpot',
    name: 'Lẩu sắt dung nham',
    ingredients: [
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'chili', quantity: 2 },
      { itemId: 'potato', quantity: 2 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 50,
      buff: { type: 'mining', value: 35, description: 'Thể lực đào mỏ tiêu hao -35% (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn with A Thạch',
    description: 'Món lẩu nồi sắt nóng bỏng do A Thạch dạy sau khi thành gia lập thất.'
  },
  {
    id: 'moonlight_sashimi',
    name: 'Lát cá tươi dưới trăng',
    ingredients: [
      { itemId: 'sturgeon', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 20,
      buff: { type: 'fishing', value: 3, description: 'Kỹ năng câu cá +3 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn với Thu Nguyệt',
    description: 'Món gỏi cá tươi thưởng trăng do Thu Nguyệt chia sẻ sau khi cưới.'
  },
  {
    id: 'tea_banquet',
    name: 'Bát Trân Trà Yến',
    ingredients: [
      { itemId: 'tea', quantity: 3 },
      { itemId: 'lotus_seed', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'giftBonus', value: 2, description: 'Thiện cảm tặng quà x2 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn với Xuân Lan',
    description: 'Công thức trà yến nấu kèm lá trà do Xuân Lan truyền dạy sau khi cưới.'
  },
  {
    id: 'snow_plum_soup',
    name: 'Chè mai tuyết',
    ingredients: [
      { itemId: 'snow_lotus', quantity: 1 },
      { itemId: 'honey', quantity: 2 }
    ],
    effect: {
      staminaRestore: 65,
      healthRestore: 35,
      buff: { type: 'luck', value: 3, description: 'May mắn +3 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn với Tuyết Cần',
    description: 'Món canh ngọt chốn phòng tranh Tuyết Cần chia sẻ sau khi cưới.'
  },
  {
    id: 'silk_dumpling',
    name: 'Sủi cảo túi ngọc',
    ingredients: [
      { itemId: 'silk', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'cabbage', quantity: 2 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'giftBonus', value: 2, description: 'Thiện cảm tặng quà x2 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn với Tố Tố',
    description: 'Món sủi cảo tinh tế hình túi gấm do Tố Tố dạy sau khi kết hôn.'
  },
  {
    id: 'drunken_chicken',
    name: 'Gà Túy Tiên',
    ingredients: [
      { itemId: 'egg', quantity: 3 },
      { itemId: 'peach_wine', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 40,
      buff: { type: 'farming', value: 30, description: 'Thể lực làm nông tiêu hao -30% (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn với Hồng Đậu',
    description: 'Món gà hầm rượu thơm nồng do Hồng Đậu truyền dạy sau khi cưới.'
  },
  {
    id: 'scholars_porridge',
    name: 'Cháo Văn Khúc Tinh',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'tea', quantity: 1 },
      { itemId: 'ginseng', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 30,
      buff: { type: 'speed', value: 2, description: 'Tốc độ di chuyển +2 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn với Đan Thanh',
    description: 'Món cháo dưỡng tâm nấu theo cổ phương Đan Thanh chuẩn bị sau khi cưới.'
  },
  {
    id: 'ironforge_stew',
    name: 'Món hầm thợ rèn',
    ingredients: [
      { itemId: 'potato', quantity: 3 },
      { itemId: 'corn', quantity: 2 },
      { itemId: 'iron_ore', quantity: 1 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 50,
      buff: { type: 'mining', value: 40, description: 'Thể lực đào mỏ tiêu hao -40% (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn với A Thiết',
    description: 'Món hầm đậm đà đầy đặn do A Thiết nấu sau khi kết hôn.'
  },
  {
    id: 'hunters_roast',
    name: 'Món nướng thợ săn',
    ingredients: [
      { itemId: 'wild_mushroom', quantity: 3 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'pine_cone', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 45,
      buff: { type: 'defense', value: 3, description: 'Phòng ngự +3 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn với Vân Phi',
    description: 'Phương pháp nướng thịt thú rừng do Vân Phi truyền dạy sau khi cưới.'
  },
  {
    id: 'ranch_milk_soup',
    name: 'Canh sữa tươi mục trường',
    ingredients: [
      { itemId: 'milk', quantity: 2 },
      { itemId: 'corn', quantity: 2 },
      { itemId: 'sweet_potato', quantity: 1 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 35,
      buff: { type: 'farming', value: 25, description: 'Thể lực làm nông tiêu hao -25% (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn với Đại Ngưu',
    description: 'Món canh sữa thơm ngậy Đại Ngưu hay nấu sau khi kết hôn.'
  },
  {
    id: 'moonlit_tea_rice',
    name: 'Cơm chan trà dưới trăng',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'tea', quantity: 2 },
      { itemId: 'bamboo_shoot', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'luck', value: 2, description: 'May mắn +2 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn với Mặc Bạch',
    description: 'Món cơm chan trà thanh đạm Mặc Bạch hay làm dưới trăng sau khi cưới.'
  },

  // ==================== 农耕技能食谱 (3 新) ====================
  {
    id: 'pumpkin_pie',
    name: 'Bánh bí đỏ',
    ingredients: [
      { itemId: 'pumpkin', quantity: 2 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'farming', value: 15, description: 'Thể lực làm nông tiêu hao -15% (Trong ngày)' }
    },
    unlockSource: 'Cấp trồng trọt 6',
    requiredSkill: { type: 'farming', level: 6 },
    description: 'Chiếc bánh bí đỏ vàng ươm mềm xốp.'
  },
  {
    id: 'golden_fried_rice',
    name: 'Cơm chiên hoàng kim',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'egg', quantity: 2 },
      { itemId: 'corn', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'farming', value: 20, description: 'Thể lực làm nông tiêu hao -20% (Trong ngày)' }
    },
    unlockSource: 'Cấp trồng trọt 7',
    requiredSkill: { type: 'farming', level: 7 },
    description: 'Món cơm chiên hạt vàng bóng bẩy.'
  },
  {
    id: 'supreme_farm_feast',
    name: 'Đại tiệc điền viên',
    ingredients: [
      { itemId: 'pumpkin', quantity: 1 },
      { itemId: 'watermelon', quantity: 1 },
      { itemId: 'corn', quantity: 1 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 35,
      buff: { type: 'farming', value: 30, description: 'Thể lực làm nông tiêu hao -30% (Trong ngày)' }
    },
    unlockSource: 'Cấp trồng trọt 9',
    requiredSkill: { type: 'farming', level: 9 },
    description: 'Bàn tiệc điền viên hội tụ tinh túy bốn mùa.'
  },

  // ==================== 钓鱼技能食谱 (5 新) ====================
  {
    id: 'braised_catfish',
    name: 'Cá trê kho cay',
    ingredients: [
      { itemId: 'catfish', quantity: 1 },
      { itemId: 'chili', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'fishing', value: 1, description: 'Kỹ năng câu cá +1 (Trong ngày)' }
    },
    unlockSource: 'Cấp câu cá 4',
    requiredSkill: { type: 'fishing', level: 4 },
    description: 'Cá trê om cay.'
  },
  {
    id: 'grilled_eel',
    name: 'Lươn nướng',
    ingredients: [
      { itemId: 'eel', quantity: 1 },
      { itemId: 'sesame', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'fishing', value: 2, description: 'Kỹ năng câu cá +2 (Trong ngày)' }
    },
    unlockSource: 'Cấp câu cá 5',
    requiredSkill: { type: 'fishing', level: 5 },
    description: 'Món lươn nướng ngoài giòn trong mềm ngọt.'
  },
  {
    id: 'crab_soup',
    name: 'Súp gạch cua',
    ingredients: [
      { itemId: 'river_crab', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'luck', value: 15, description: 'May mắn +15% (Trong ngày)' }
    },
    unlockSource: 'Cấp câu cá 6',
    requiredSkill: { type: 'fishing', level: 6 },
    description: 'Bát súp gạch cua béo ngậy thơm lừng.'
  },
  {
    id: 'sturgeon_stew',
    name: 'Canh súp cá tầm',
    ingredients: [
      { itemId: 'sturgeon', quantity: 1 },
      { itemId: 'herb', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'fishing', value: 3, description: 'Kỹ năng câu cá +3 (Trong ngày)' }
    },
    unlockSource: 'Cấp câu cá 7',
    requiredSkill: { type: 'fishing', level: 7 },
    description: 'Món canh ninh từ cá tầm quý hiếm.'
  },
  {
    id: 'dragon_sashimi',
    name: 'Gỏi cá rồng',
    ingredients: [
      { itemId: 'dragonfish', quantity: 1 },
      { itemId: 'ginger', quantity: 2 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 35,
      buff: { type: 'fishing', value: 4, description: 'Kỹ năng câu cá +4 (Trong ngày)' }
    },
    unlockSource: 'Cấp câu cá 8',
    requiredSkill: { type: 'fishing', level: 8 },
    description: 'Món gỏi cực phẩm làm từ cá Long Ngư truyền thuyết.'
  },

  // ==================== 采矿技能食谱 (5 新) ====================
  {
    id: 'stone_soup',
    name: 'Canh khoáng thạch',
    ingredients: [
      { itemId: 'copper_ore', quantity: 2 },
      { itemId: 'radish', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 20 },
    unlockSource: 'Cấp khai khoáng 3',
    requiredSkill: { type: 'mining', level: 3 },
    description: 'Món canh nấu từ nguyên liệu thô sơ nhặt ngay trong mỏ.'
  },
  {
    id: 'crystal_jelly',
    name: 'Thạch pha lê',
    ingredients: [
      { itemId: 'crystal_ore', quantity: 1 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 25,
      buff: { type: 'mining', value: 25, description: 'Thể lực đào mỏ tiêu hao -25% (Trong ngày)' }
    },
    unlockSource: 'Cấp khai khoáng 5',
    requiredSkill: { type: 'mining', level: 5 },
    description: 'Món thạch pha lê trong suốt đẹp mắt.'
  },
  {
    id: 'iron_tonic',
    name: 'Canh hầm cốt sắt',
    ingredients: [
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 35,
      buff: { type: 'defense', value: 20, description: 'Sát thương gánh chịu -20% (Trong ngày)' }
    },
    unlockSource: 'Cấp khai khoáng 6',
    requiredSkill: { type: 'mining', level: 6 },
    description: 'Canh hầm cốt sắt giúp gân cốt dẻo dai.'
  },
  {
    id: 'gold_dumpling',
    name: 'Sủi cảo quặng vàng',
    ingredients: [
      { itemId: 'gold_ore', quantity: 1 },
      { itemId: 'winter_wheat', quantity: 2 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'mining', value: 30, description: 'Thể lực đào mỏ tiêu hao -30% (Trong ngày)' }
    },
    unlockSource: 'Cấp khai khoáng 7',
    requiredSkill: { type: 'mining', level: 7 },
    description: 'Món sủi cảo thợ mỏ có rắc chút bụi vàng lấp lánh.'
  },
  {
    id: 'void_essence_soup',
    name: 'Canh tinh túy hư không',
    ingredients: [
      { itemId: 'void_ore', quantity: 1 },
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'herb', quantity: 2 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 40,
      buff: { type: 'mining', value: 35, description: 'Thể lực đào mỏ tiêu hao -35% (Trong ngày)' }
    },
    unlockSource: 'Cấp khai khoáng 8',
    requiredSkill: { type: 'mining', level: 8 },
    description: 'Thang thuốc thần bí chưng cất từ quặng hư không.'
  },

  // ==================== 采集技能食谱 (4 新) ====================
  {
    id: 'wild_salad',
    name: 'Salad rau dại',
    ingredients: [
      { itemId: 'herb', quantity: 2 },
      { itemId: 'wild_berry', quantity: 1 }
    ],
    effect: { staminaRestore: 20, healthRestore: 10 },
    unlockSource: 'Cấp thu thập 3',
    requiredSkill: { type: 'foraging', level: 3 },
    description: 'Đĩa rau dại tươi non trộn dầu giấm.'
  },
  {
    id: 'mushroom_stew',
    name: 'Nấm hầm',
    ingredients: [
      { itemId: 'wild_mushroom', quantity: 3 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 20,
      buff: { type: 'speed', value: 15, description: 'Tốc độ di chuyển +15% (Trong ngày)' }
    },
    unlockSource: 'Cấp thu thập 4',
    requiredSkill: { type: 'foraging', level: 4 },
    description: 'Món canh nấm rừng ninh nhừ thơm ngậy.'
  },
  {
    id: 'forest_tonic',
    name: 'Thuốc bổ thảo mộc',
    ingredients: [
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'wild_mushroom', quantity: 2 },
      { itemId: 'herb', quantity: 2 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'farming', value: 20, description: 'Thể lực làm nông tiêu hao -20% (Trong ngày)' }
    },
    unlockSource: 'Cấp thu thập 7',
    requiredSkill: { type: 'foraging', level: 7 },
    description: 'Thuốc bổ sắc từ các loại thảo dược quý hiếm trong rừng.'
  },
  {
    id: 'spirit_herb_elixir',
    name: 'Bí dược linh thảo',
    ingredients: [
      { itemId: 'ginseng', quantity: 2 },
      { itemId: 'herb', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 40,
      buff: { type: 'luck', value: 25, description: 'May mắn +25% (Trong ngày)' }
    },
    unlockSource: 'Cấp thu thập 9',
    requiredSkill: { type: 'foraging', level: 9 },
    description: 'Bí dược điều chế theo phương pháp gia truyền của bậc thầy thu thập.'
  },

  // ==================== 战斗技能食谱 (5 新) ====================
  {
    id: 'warrior_ration',
    name: 'Khẩu phần chiến sĩ',
    ingredients: [
      { itemId: 'potato', quantity: 2 },
      { itemId: 'egg', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 25 },
    unlockSource: 'Cấp chiến đấu 3',
    requiredSkill: { type: 'combat', level: 3 },
    description: 'Lương khô đơn giản tiện lợi của chiến binh.'
  },
  {
    id: 'battle_stew',
    name: 'Món hầm chiến đấu',
    ingredients: [
      { itemId: 'chili', quantity: 1 },
      { itemId: 'potato', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 30,
      buff: { type: 'defense', value: 15, description: 'Sát thương gánh chịu -15% (Trong ngày)' }
    },
    unlockSource: 'Cấp chiến đấu 4',
    requiredSkill: { type: 'combat', level: 4 },
    description: 'Món canh hầm cay nồng kích thích đấu chí.'
  },
  {
    id: 'iron_fist_soup',
    name: 'Canh Thiết Quyền',
    ingredients: [
      { itemId: 'iron_ore', quantity: 1 },
      { itemId: 'chili', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 35,
      buff: { type: 'defense', value: 20, description: 'Sát thương gánh chịu -20% (Trong ngày)' }
    },
    unlockSource: 'Cấp chiến đấu 5',
    requiredSkill: { type: 'combat', level: 5 },
    description: 'Món canh dưỡng khí chuyên dùng của các võ sư.'
  },
  {
    id: 'shadow_brew',
    name: 'Mỹ tửu bóng tối',
    ingredients: [
      { itemId: 'shadow_ore', quantity: 1 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 40,
      buff: { type: 'defense', value: 25, description: 'Sát thương gánh chịu -25% (Trong ngày)' }
    },
    unlockSource: 'Cấp chiến đấu 7',
    requiredSkill: { type: 'combat', level: 7 },
    description: 'Thức uống bí ẩn ủ từ quặng hắc ám.'
  },
  {
    id: 'void_elixir',
    name: 'Dược tề hư không',
    ingredients: [
      { itemId: 'void_ore', quantity: 1 },
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'shadow_ore', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 50,
      buff: { type: 'defense', value: 30, description: 'Sát thương gánh chịu -30% (Trong ngày)' }
    },
    unlockSource: 'Cấp chiến đấu 9',
    requiredSkill: { type: 'combat', level: 9 },
    description: 'Dược tề tối cao do chiến thần bào chế.'
  },

  // ==================== 季节节日食谱 (4) ====================
  {
    id: 'spring_roll',
    name: 'Bánh chả giò xuân',
    ingredients: [
      { itemId: 'cabbage', quantity: 2 },
      { itemId: 'bamboo_shoot', quantity: 1 },
      { itemId: 'sesame_oil', quantity: 1 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 15,
      buff: { type: 'speed', value: 15, description: 'Tốc độ di chuyển +15% (Trong ngày)' }
    },
    unlockSource: 'Thưởng Lễ hội Xuân Cày',
    description: 'Món chả giò truyền thống trong Lễ hội Xuân Cày.'
  },
  {
    id: 'lotus_lantern_cake',
    name: 'Bánh đèn sen',
    ingredients: [
      { itemId: 'lotus_seed', quantity: 2 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'luck', value: 15, description: 'May mắn +15% (Trong ngày)' }
    },
    unlockSource: 'Thưởng Lễ hội Hoa Đăng',
    description: 'Bánh ngọt tạo hình đèn sen chỉ có vào Lễ hội Hoa Đăng.'
  },
  {
    id: 'harvest_feast',
    name: 'Đại tiệc mùa màng',
    ingredients: [
      { itemId: 'pumpkin', quantity: 1 },
      { itemId: 'sweet_potato', quantity: 1 },
      { itemId: 'corn', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'farming', value: 20, description: 'Thể lực làm nông tiêu hao -20% (Trong ngày)' }
    },
    unlockSource: 'Thưởng Lễ hội Thu Hoạch',
    description: 'Món ăn truyền thống chủ đạo trong yến tiệc mùa màng.'
  },
  {
    id: 'new_year_dumpling',
    name: 'Sủi cảo giao thừa',
    ingredients: [
      { itemId: 'winter_wheat', quantity: 3 },
      { itemId: 'napa_cabbage', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'luck', value: 20, description: 'May mắn +20% (Trong ngày)' }
    },
    unlockSource: 'Thưởng Đêm Giao Thừa',
    description: 'Sủi cảo may mắn được gói vào đêm giao thừa.'
  },

  // ==================== 新增节日食谱 (10) ====================
  {
    id: 'nian_gao',
    name: 'Bánh tổ',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 15,
      buff: { type: 'farming', value: 10, description: 'Thể lực làm nông tiêu hao -10% (Trong ngày)' }
    },
    unlockSource: 'Thưởng Ngày Tết Nguyên Đán',
    description: 'Bánh tổ mang ý nghĩa tốt lành \'năm năm thăng tiến\'.'
  },
  {
    id: 'hua_gao',
    name: 'Bánh hoa xuân',
    ingredients: [
      { itemId: 'peach', quantity: 2 },
      { itemId: 'rice', quantity: 1 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 10,
      buff: { type: 'luck', value: 10, description: 'May mắn +10% (Trong ngày)' }
    },
    unlockSource: 'Thưởng Lễ hội Trăm Hoa',
    description: 'Món bánh ngọt nhân cánh hoa xuân tinh tế.'
  },
  {
    id: 'qing_tuan',
    name: 'Bánh ngải cứu',
    ingredients: [
      { itemId: 'herb', quantity: 2 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 10,
      buff: { type: 'farming', value: 15, description: 'Thể lực làm nông tiêu hao -15% (Trong ngày)' }
    },
    unlockSource: 'Thưởng Lễ hội Tảo Thanh',
    description: 'Món bánh nếp ngải cứu thơm ngát hương đồng cỏ nội.'
  },
  {
    id: 'yue_bing',
    name: 'Bánh trung thu',
    ingredients: [
      { itemId: 'lotus_seed', quantity: 2 },
      { itemId: 'sesame_oil', quantity: 1 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'luck', value: 15, description: 'May mắn +15% (Trong ngày)' }
    },
    unlockSource: 'Thưởng Lễ hội Trung Thu',
    description: 'Bánh trung thu nhân hạt sen lòng đỏ trứng muối đêm rằm.'
  },
  {
    id: 'la_ba_zhou',
    name: 'Cháo Lạp Bát',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'peanut', quantity: 1 },
      { itemId: 'wild_berry', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25
    },
    unlockSource: 'Thưởng Lễ hội Cháo Lạp Bát',
    description: 'Bát cháo Lạp Bát bổ dưỡng xua tan giá lạnh.'
  },
  {
    id: 'dragon_boat_zongzi',
    name: 'Bánh chưng bánh tét',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'bamboo_shoot', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'speed', value: 10, description: 'Tốc độ di chuyển +10% (Trong ngày)' }
    },
    unlockSource: 'Thưởng Lễ hội Đoan Ngọ',
    description: 'Chiếc bánh nếp thơm mùi lá tre ngày Tết Đoan Ngọ.'
  },
  {
    id: 'qiao_guo',
    name: 'Bánh Thất Tịch',
    ingredients: [
      { itemId: 'winter_wheat', quantity: 2 },
      { itemId: 'honey', quantity: 1 },
      { itemId: 'sesame_oil', quantity: 1 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 10,
      buff: { type: 'fishing', value: 1, description: 'Kỹ năng câu cá +1 (Trong ngày)' }
    },
    unlockSource: 'Thưởng Lễ Thất Tịch',
    description: 'Món bánh ngọt truyền thống cầu duyên đêm Thất Tịch.'
  },
  {
    id: 'chrysanthemum_wine',
    name: 'Rượu hoa cúc',
    ingredients: [
      { itemId: 'chrysanthemum', quantity: 3 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'luck', value: 12, description: 'May mắn +12% (Trong ngày)' }
    },
    unlockSource: 'Thưởng Lễ Trùng Cửu',
    description: 'Rượu cúc ấm nồng nhân ngày Tết Trùng Cửu.'
  },
  {
    id: 'jiaozi',
    name: 'Sủi cảo đông chí',
    ingredients: [
      { itemId: 'winter_wheat', quantity: 2 },
      { itemId: 'napa_cabbage', quantity: 2 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'mining', value: 1, description: 'Kỹ năng thợ mỏ +1 (Trong ngày)' }
    },
    unlockSource: 'Thưởng Ngày Lễ Đông Chí',
    description: 'Sủi cảo nóng hổi giữ ấm cơ thể ngày Đông Chí.'
  },
  {
    id: 'tangyuan',
    name: 'Bánh trôi nước',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'honey', quantity: 1 },
      { itemId: 'peanut', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'all_skills', value: 1, description: 'Tất cả kỹ năng +1 (Trong ngày)' }
    },
    unlockSource: 'Thưởng Lễ hội Pháo Hoa Cuối Năm',
    description: 'Bát bánh trôi nước nhân đậu phộng mang ý nghĩa sum vầy.'
  },
  {
    id: 'dou_cha_yin',
    name: 'Trà đấu hội',
    ingredients: [
      { itemId: 'tea', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'all_skills', value: 1, description: 'Tất cả kỹ năng +1 (Trong ngày)' }
    },
    unlockSource: 'Thưởng Đại hội Đấu Trà',
    description: 'Thức uống hảo hạng đoạt giải hội đấu trà, hương thanh mát rượi.'
  },
  {
    id: 'zhi_yuan_gao',
    name: 'Bánh diều giấy',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'peach', quantity: 1 },
      { itemId: 'sesame_oil', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'speed', value: 12, description: 'Tốc độ di chuyển +12% (Trong ngày)' }
    },
    unlockSource: 'Thưởng Lễ hội Thả Diều Mùa Thu',
    description: 'Món bánh ngọt tạo hình diều giấy xính xắn ngày hội thả diều.'
  },

  // ==================== 成就里程碑食谱 (9) ====================
  {
    id: 'first_catch_soup',
    name: 'Canh cá kỷ niệm',
    ingredients: [
      { itemId: 'crucian', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: { staminaRestore: 20, healthRestore: 10 },
    unlockSource: 'Thành tựu: Lần đầu câu cá',
    description: 'Bát canh cá nóng hổi kỷ niệm chú cá đầu tiên câu được.'
  },
  {
    id: 'bountiful_porridge',
    name: 'Cháo bách thu',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'jujube', quantity: 2 }
    ],
    effect: { staminaRestore: 40, healthRestore: 20 },
    unlockSource: 'Thành tựu: Thu hoạch 100 lần cây trồng',
    description: 'Món cháo ấm lòng chúc mừng nông trại đạt mốc 100 lần thu hoạch.'
  },
  {
    id: 'miners_glory',
    name: 'Vinh quang thợ mỏ',
    ingredients: [
      { itemId: 'gold_ore', quantity: 1 },
      { itemId: 'egg', quantity: 2 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 30,
      buff: { type: 'mining', value: 25, description: 'Thể lực đào mỏ tiêu hao -25% (Trong ngày)' }
    },
    unlockSource: 'Thành tựu: Xuống tới tầng 30 hang mỏ',
    description: 'Món ăn vinh danh lòng quả cảm của người thợ mỏ.'
  },
  {
    id: 'chef_special',
    name: 'Món ngon đặc chế',
    ingredients: [
      { itemId: 'egg', quantity: 2 },
      { itemId: 'honey', quantity: 1 },
      { itemId: 'sesame', quantity: 2 }
    ],
    effect: { staminaRestore: 45, healthRestore: 20 },
    unlockSource: 'Thành tựu: Nấu 20 món ăn',
    description: 'Món ăn đặc biệt chỉ có đầu bếp thượng thừa mới làm được.'
  },
  {
    id: 'social_tea',
    name: 'Trà hoa giao tế',
    ingredients: [
      { itemId: 'osmanthus', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 15,
      buff: { type: 'giftBonus', value: 2, description: 'Thiện cảm tặng quà x2 (Trong ngày)' }
    },
    unlockSource: 'Thành tựu: Đạt tri kỷ với 3 NPC',
    description: 'Tách trà hoa thơm ngát chuyên dùng tiếp đãi hảo hữu phương xa.'
  },
  {
    id: 'anglers_platter',
    name: 'Mâm hải vị ngư phủ',
    ingredients: [
      { itemId: 'bass', quantity: 1 },
      { itemId: 'creek_shrimp', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 25,
      buff: { type: 'fishing', value: 2, description: 'Kỹ năng câu cá +2 (Trong ngày)' }
    },
    unlockSource: 'Thành tựu: Câu được 20 con cá',
    description: 'Mâm hải vị thịnh soạn của một ngư phủ thực thụ.'
  },
  {
    id: 'legendary_feast',
    name: 'Yến tiệc truyền thuyết',
    ingredients: [
      { itemId: 'jade_dragon', quantity: 1 },
      { itemId: 'ginger', quantity: 2 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 40,
      buff: { type: 'fishing', value: 4, description: 'Kỹ năng câu cá +4 (Trong ngày)' }
    },
    unlockSource: 'Thành tựu: Câu được cá truyền thuyết',
    description: 'Bàn tiệc trân quý nấu từ loài cá linh thiêng trong truyền thuyết.'
  },
  {
    id: 'abyss_stew',
    name: 'Canh hầm vực thẳm',
    ingredients: [
      { itemId: 'shadow_ore', quantity: 1 },
      { itemId: 'crystal_shrimp', quantity: 1 },
      { itemId: 'herb', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 35,
      buff: { type: 'defense', value: 20, description: 'Sát thương gánh chịu -20% (Trong ngày)' }
    },
    unlockSource: 'Thành tựu: Xuống tới tầng 50 hang mỏ',
    description: 'Món hầm tăng lực của những nhà thám hiểm vực thẳm.'
  },
  {
    id: 'collectors_banquet',
    name: 'Yến tiệc nhà sưu tầm',
    ingredients: [
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'sturgeon', quantity: 1 },
      { itemId: 'pumpkin', quantity: 1 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 40,
      buff: { type: 'luck', value: 25, description: 'May mắn +25% (Trong ngày)' }
    },
    unlockSource: 'Thành tựu: Phát hiện 50 vật phẩm',
    description: 'Bữa tiệc nấu hoàn toàn từ những kỳ hoa dị thảo quý hiếm.'
  },
  // ===== 新增：动物产品食谱 =====
  {
    id: 'silkie_egg_soup',
    name: 'Trứng hấp ác vy',
    ingredients: [
      { itemId: 'silkie_egg', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: { staminaRestore: 50, healthRestore: 30 },
    unlockSource: 'Có sẵn ban đầu',
    description: 'Món trứng hấp ác vy bồi bổ sinh lực cực tốt.'
  },
  {
    id: 'goat_milk_soup',
    name: 'Canh sữa dê',
    ingredients: [
      { itemId: 'goat_milk', quantity: 2 },
      { itemId: 'herb', quantity: 1 }
    ],
    effect: { staminaRestore: 45, healthRestore: 25 },
    unlockSource: 'Thiện cảm Đại Ngưu đạt \'Chí hữu\'',
    description: 'Canh sữa dê ấm nóng béo ngậy.'
  },
  {
    id: 'truffle_fried_rice',
    name: 'Cơm chiên nấm Truffle',
    ingredients: [
      { itemId: 'truffle', quantity: 1 },
      { itemId: 'rice', quantity: 1 },
      { itemId: 'egg', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'farming', value: 1, description: 'Kỹ năng trồng trọt +1 (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Đại Ngưu đạt \'Tri kỷ\'',
    description: 'Đĩa cơm chiên nấm Truffle xa xỉ, thơm lừng quyến rũ.'
  },
  {
    id: 'antler_soup',
    name: 'Canh lộc nhung',
    ingredients: [
      { itemId: 'antler_velvet', quantity: 1 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'ginseng', quantity: 1 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 40,
      buff: { type: 'stamina', value: 100, description: 'Hồi phục hoàn toàn thể lực' }
    },
    unlockSource: 'Thiện cảm Lâm Lão đạt \'Tri kỷ\'',
    description: 'Thang thuốc đại bổ, một bát sảng khoái tinh thần.'
  },
  {
    id: 'camel_milk_tea',
    name: 'Trà sữa lạc đà',
    ingredients: [
      { itemId: 'camel_milk', quantity: 1 },
      { itemId: 'tea', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'speed', value: 15, description: 'Tốc độ di chuyển +15% (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Bác Trần đạt \'Chí hữu\'',
    description: 'Ly trà sữa lạc đà béo ngậy thơm ngon.'
  },
  {
    id: 'peacock_feast',
    name: 'Khổng Tước Yến',
    ingredients: [
      { itemId: 'peacock_feather', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'osmanthus', quantity: 1 }
    ],
    effect: {
      staminaRestore: 90,
      healthRestore: 50,
      buff: { type: 'all_skills', value: 1, description: 'Tất cả kỹ năng +1 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi kết hôn',
    description: 'Yến tiệc Khổng Tước trong truyền thuyết, tôn quý vô ngần.'
  },
  // === 瀚海食谱 ===
  {
    id: 'spiced_lamb',
    name: 'Thịt cừu nướng hương liệu',
    ingredients: [
      { itemId: 'hanhai_spice', quantity: 1 },
      { itemId: 'goat_milk', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'mining', value: 2, description: 'Kỹ năng khai khoáng +2 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi mua hương liệu tại Trạm Hãn Hải',
    description: 'Thịt cừu nướng đậm phong vị Tây Vực, thơm nức mũi, tăng cường thể chất.'
  },
  {
    id: 'silk_dumpling_deluxe',
    name: 'Sủi cảo Con Đường Tơ Lụa',
    ingredients: [
      { itemId: 'hanhai_silk', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'hanhai_spice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 35,
      buff: { type: 'giftBonus', value: 3, description: 'Thiện cảm tặng quà x3 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi mua tơ lụa tại Trạm Hãn Hải',
    description: 'Sủi cảo gói lộng lẫy bằng lụa mỏng, nêm hương liệu Tây Vực dâng lên quý nhân.'
  },
  {
    id: 'desert_cactus_soup',
    name: 'Canh xương rồng',
    ingredients: [
      { itemId: 'hanhai_cactus', quantity: 2 },
      { itemId: 'hanhai_spice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 40,
      buff: { type: 'stamina', value: 30, description: 'Tăng giới hạn thể lực +30 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi thu hoạch xương rồng',
    description: 'Canh xương rồng thanh nhiệt giải độc, phương thuốc cứu mạng khách lữ hành sa mạc.'
  },
  {
    id: 'date_cake',
    name: 'Bánh chà là',
    ingredients: [
      { itemId: 'hanhai_date', quantity: 3 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'farming', value: 2, description: 'Kỹ năng trồng trọt +2 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa sau khi thu hoạch chà là',
    description: 'Món bánh chà là dẻo ngọt, bổ khí dưỡng huyết.'
  },
  // === 瀚海拓展食谱 ===
  {
    id: 'cactus_salad',
    name: 'Salad xương rồng',
    ingredients: [
      { itemId: 'hanhai_cactus', quantity: 1 },
      { itemId: 'hanhai_spice', quantity: 1 }
    ],
    effect: { staminaRestore: 40, healthRestore: 20 },
    unlockSource: 'Tự động nhận sau khi mở khóa Hãn Hải',
    description: 'Đĩa salad xương rồng thanh mát, kết hợp hương liệu Tây Vực độc đáo.'
  },
  {
    id: 'spice_fried_rice',
    name: 'Cơm chiên hương liệu',
    ingredients: [
      { itemId: 'hanhai_spice', quantity: 1 },
      { itemId: 'rice', quantity: 3 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 25,
      buff: { type: 'farming', value: 1, description: 'Kỹ năng trồng trọt +1 (Trong ngày)' }
    },
    unlockSource: 'Tự động nhận sau khi mở khóa Hãn Hải',
    description: 'Cơm chiên đượm vị hương liệu Tây Vực, dẻo thơm chắc hạt, làm việc không biết mệt.'
  },
  {
    id: 'turquoise_tea',
    name: 'Trà dưỡng sinh ngọc lục bảo',
    ingredients: [
      { itemId: 'hanhai_turquoise', quantity: 1 },
      { itemId: 'tea', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'mining', value: 2, description: 'Kỹ năng khai khoáng +2 (Trong ngày)' }
    },
    unlockSource: 'Tự động nhận sau khi mở khóa Hãn Hải',
    description: 'Tách trà pha chút bột ngọc lục bảo, tương truyền tăng khả năng cảm ứng quặng đá.'
  },
  {
    id: 'silk_tofu',
    name: 'Đậu hũ tơ lụa',
    ingredients: [
      { itemId: 'hanhai_silk', quantity: 1 },
      { itemId: 'tofu', quantity: 2 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'fishing', value: 1, description: 'Kỹ năng câu cá +1 (Trong ngày)' }
    },
    unlockSource: 'Tự động nhận sau khi mở khóa Hãn Hải',
    description: 'Đậu hũ non hấp bọc trong lụa mỏng, kết cấu mịn màng như tơ lụa.'
  },
  {
    id: 'date_porridge',
    name: 'Cháo táo đỏ nghiền',
    ingredients: [
      { itemId: 'hanhai_date', quantity: 2 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: { staminaRestore: 50, healthRestore: 25 },
    unlockSource: 'Tự động nhận sau khi mở khóa Hãn Hải',
    description: 'Cháo táo đỏ nhuyễn mịn, giữ ấm dạ dày bồi bổ thân thể.'
  },
  {
    id: 'desert_feast',
    name: 'Đại tiệc Tây Vực',
    ingredients: [
      { itemId: 'hanhai_cactus', quantity: 2 },
      { itemId: 'hanhai_spice', quantity: 2 },
      { itemId: 'hanhai_date', quantity: 2 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 50,
      buff: { type: 'all_skills', value: 1, description: 'Tất cả kỹ năng +1 (Trong ngày)' }
    },
    unlockSource: 'Cấp độ thương mại3Mở khóa',
    description: 'Bữa tiệc sang trọng kết hợp tinh hoa miền Tây trong một bàn tiệc, mang đến cho bạn tràn đầy năng lượng.'
  },
  {
    id: 'brocade_dumpling',
    name: 'Há Cảo Gấm Ngự Ban',
    ingredients: [
      { itemId: 'brocade', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'hanhai_spice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 75,
      healthRestore: 40,
      buff: { type: 'giftBonus', value: 5, description: 'Thiện cảm tặng quà ×5 (Trong ngày)' }
    },
    unlockSource: 'Mở khóa khi cấp Thông Thương đạt 5',
    description: 'Món há cảo cực phẩm có vỏ như gấm vóc, là món quà thượng hạng cấp ngự ban.'
  },

  // === 加工品菜谱 ===

  {
    id: 'vinegar_cabbage',
    name: 'Cải thảo xào giấm chua',
    ingredients: [
      { itemId: 'rice_vinegar', quantity: 1 },
      { itemId: 'cabbage', quantity: 2 }
    ],
    effect: { staminaRestore: 30, healthRestore: 10 },
    unlockSource: 'Cấp nấu ăn 3',
    requiredSkill: { type: 'farming', level: 3 },
    description: 'Món ăn gia đình chua thanh kích thích vị giác, sự kết hợp kỳ diệu của giấm gạo.'
  },
  {
    id: 'cheese_baked_rice',
    name: 'Cơm nướng phô mai',
    ingredients: [
      { itemId: 'cheese', quantity: 1 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'farming', value: 1, description: 'Kỹ năng trồng trọt +1 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 5',
    requiredSkill: { type: 'farming', level: 5 },
    description: 'Sự hòa quyện hoàn hảo giữa phô mai béo ngậy và cơm.'
  },
  {
    id: 'goat_cheese_salad',
    name: 'Salad phô mai dê',
    ingredients: [
      { itemId: 'goat_cheese', quantity: 1 },
      { itemId: 'wild_berry', quantity: 2 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'luck', value: 1, description: 'May mắn +1 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 6',
    requiredSkill: { type: 'farming', level: 6 },
    description: 'Chua ngọt thanh mát, kết hợp với phô mai dê ngon tuyệt hảo.'
  },
  {
    id: 'mayo_noodles',
    name: 'Mì trộn sốt mayonnaise',
    ingredients: [
      { itemId: 'mayonnaise', quantity: 1 },
      { itemId: 'wheat_flour', quantity: 2 }
    ],
    effect: { staminaRestore: 25, healthRestore: 10 },
    unlockSource: 'Cấp nấu ăn 2',
    requiredSkill: { type: 'farming', level: 2 },
    description: 'Món mì trộn đơn giản mà ngon miệng, hương vị béo ngậy của sốt mayonnaise khiến người ta nhớ mãi.'
  },
  {
    id: 'smoked_fish_platter',
    name: 'Mâm cá xông khói',
    ingredients: [
      { itemId: 'smoked_carp', quantity: 1 },
      { itemId: 'smoked_bass', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'fishing', value: 2, description: 'Kỹ năng câu cá +2 (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Thu Nguyệt đạt \'Tri kỷ\'',
    description: 'Cá hun khói hai màu được bày trí tinh tế, hương thơm ngào ngạt.'
  },
  {
    id: 'dried_fruit_mix',
    name: 'Mứt hoa quả thập cẩm',
    ingredients: [
      { itemId: 'dried_peach', quantity: 1 },
      { itemId: 'dried_hawthorn', quantity: 1 },
      { itemId: 'dried_apricot', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 15,
      buff: { type: 'luck', value: 2, description: 'May mắn +2 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 4',
    requiredSkill: { type: 'farming', level: 4 },
    description: 'Sự kết hợp chua ngọt của ba loại mứt hoa quả, lương khô không thể thiếu khi đi đường.'
  },
  {
    id: 'pickled_veggie_fried_rice',
    name: 'Cơm chiên dưa cải muối',
    ingredients: [
      { itemId: 'pickled_cabbage', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'egg', quantity: 1 }
    ],
    effect: { staminaRestore: 35, healthRestore: 15 },
    unlockSource: 'Cấp nấu ăn 3',
    requiredSkill: { type: 'farming', level: 3 },
    description: 'Vị mặn thơm của cải thảo muối hòa quyện hoàn hảo với cơm chiên trứng.'
  },
  {
    id: 'pickled_chili_fish',
    name: 'Cá nấu ớt ngâm',
    ingredients: [
      { itemId: 'pickled_chili', quantity: 2 },
      { itemId: 'crucian', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 30,
      buff: { type: 'defense', value: 15, description: 'Sát thương gánh chịu -15% (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 5',
    requiredSkill: { type: 'farming', level: 5 },
    description: 'Món cá ớt ngâm tê cay thơm nức, ăn vào khiến cơ thể tràn đầy sức mạnh.'
  },
  {
    id: 'honey_cake',
    name: 'Bánh mật hoa',
    ingredients: [
      { itemId: 'osmanthus_honey', quantity: 1 },
      { itemId: 'wheat_flour', quantity: 2 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 10,
      buff: { type: 'giftBonus', value: 3, description: 'Thiện cảm tặng quà x3 (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Liễu Nương đạt \'Tri kỷ\'',
    description: 'Món bánh tinh tế làm từ mật hoa quế, thích hợp làm quà tặng.'
  },
  {
    id: 'antler_tonic',
    name: 'Canh bổ lộc nhung',
    ingredients: [
      { itemId: 'antler_powder', quantity: 1 },
      { itemId: 'jujube', quantity: 2 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 40,
      buff: { type: 'mining', value: 2, description: 'Kỹ năng khai khoáng +2 (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Lâm Lão đạt \'Tri kỷ\'',
    description: 'Canh bồi bổ trân quý, uống vào giúp tinh lực dồi dào.'
  },
  {
    id: 'tea_oil_fried_egg',
    name: 'Trứng rán dầu trà',
    ingredients: [
      { itemId: 'tea_oil', quantity: 1 },
      { itemId: 'egg', quantity: 2 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'speed', value: 1, description: 'Tốc độ di chuyển +1 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 4',
    requiredSkill: { type: 'farming', level: 4 },
    description: 'Bánh trứng vàng chiên dầu hoa trà thơm lừng.'
  },
  {
    id: 'truffle_oil_risotto',
    name: 'Cơm chiên dầu Truffle',
    ingredients: [
      { itemId: 'truffle_oil', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'wild_mushroom', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 30,
      buff: { type: 'all_skills', value: 1, description: 'Tất cả kỹ năng +1 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 8',
    requiredSkill: { type: 'farming', level: 8 },
    description: 'Cơm chiên dầu Truffle xa xỉ, mỗi một miếng đều là sự tận hưởng.'
  },
  {
    id: 'sesame_paste_noodles',
    name: 'Mì lạnh sốt mè',
    ingredients: [
      { itemId: 'sesame_paste', quantity: 1 },
      { itemId: 'wheat_flour', quantity: 2 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 10,
      buff: { type: 'stamina', value: 15, description: 'Thể lực tiêu hao -15% (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 3',
    requiredSkill: { type: 'farming', level: 3 },
    description: 'Sốt mè thơm đậm đà rưới lên mì lạnh dai ngon, món giải nhiệt tuyệt hảo ngày hè.'
  },
  {
    id: 'peanut_tofu_soup',
    name: 'Canh đậu hũ đậu phộng',
    ingredients: [
      { itemId: 'peanut_tofu', quantity: 1 },
      { itemId: 'peanut', quantity: 2 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'defense', value: 15, description: 'Sát thương gánh chịu -15% (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 5',
    requiredSkill: { type: 'farming', level: 5 },
    description: 'Canh đậu hũ đậu phộng sánh mịn mượt mà, ấm bụng dưỡng thân.'
  },
  {
    id: 'pumpkin_preserve_cake',
    name: 'Bánh nhân mứt bí đỏ',
    ingredients: [
      { itemId: 'pumpkin_preserve', quantity: 1 },
      { itemId: 'wheat_flour', quantity: 2 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'farming', value: 1, description: 'Kỹ năng trồng trọt +1 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 4',
    requiredSkill: { type: 'farming', level: 4 },
    description: 'Bánh kẹp nhân mứt bí đỏ ngọt ngào, người bạn đồng hành tốt khi làm lụng trên đồng.'
  },
  {
    id: 'dried_mushroom_stew',
    name: 'Gà hầm nấm khô',
    ingredients: [
      { itemId: 'dried_mushroom', quantity: 2 },
      { itemId: 'egg', quantity: 2 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'mining', value: 1, description: 'Kỹ năng khai khoáng +1 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 6',
    requiredSkill: { type: 'farming', level: 6 },
    description: 'Vị ngọt thanh của nấm khô được giải phóng hoàn toàn qua quá trình hầm chậm.'
  },
  {
    id: 'ginger_green_tea',
    name: 'Trà gừng',
    ingredients: [
      { itemId: 'pickled_ginger', quantity: 1 },
      { itemId: 'green_tea_drink', quantity: 1 }
    ],
    effect: {
      staminaRestore: 25,
      healthRestore: 10,
      buff: { type: 'speed', value: 1, description: 'Tốc độ di chuyển +1 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 3',
    requiredSkill: { type: 'farming', level: 3 },
    description: 'Sự kết hợp giữa gừng muối và trà xanh, vừa ấm người vừa tỉnh táo.'
  },
  {
    id: 'snow_lotus_honey_paste',
    name: 'Cao mật tuyết liên',
    ingredients: [
      { itemId: 'snow_lotus_honey', quantity: 1 },
      { itemId: 'ginseng_extract', quantity: 1 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 50
    },
    unlockSource: 'Thiện cảm Lâm Lão đạt \'Chí hữu\'',
    description: 'Thần dược bồi bổ cực phẩm, sự kết hợp tối cao giữa mật tuyết liên và tinh chất nhân sâm.'
  },
  {
    id: 'buffalo_cheese_pizza',
    name: 'Bánh nướng phô mai sữa trâu',
    ingredients: [
      { itemId: 'buffalo_cheese', quantity: 1 },
      { itemId: 'wheat_flour', quantity: 2 },
      { itemId: 'chili', quantity: 1 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 35,
      buff: { type: 'defense', value: 20, description: 'Sát thương gánh chịu -20% (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 7',
    requiredSkill: { type: 'farming', level: 7 },
    description: 'Phô mai sữa trâu béo ngậy kết hợp với ớt, lựa chọn tốt nhất trước khi chiến đấu.'
  },
  {
    id: 'yak_cheese_hotpot',
    name: 'Lẩu phô mai sữa bò Tây Tạng',
    ingredients: [
      { itemId: 'yak_cheese', quantity: 1 },
      { itemId: 'potato', quantity: 2 },
      { itemId: 'dried_radish', quantity: 1 }
    ],
    effect: {
      staminaRestore: 65,
      healthRestore: 35,
      buff: { type: 'defense', value: 25, description: 'Sát thương gánh chịu -25% (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 8',
    requiredSkill: { type: 'farming', level: 8 },
    description: 'Phô mai sữa bò Tây Tạng béo ngậy ninh cùng củ cải khô, món ăn ấm áp ngày đông.'
  },
  {
    id: 'herbal_healing_soup',
    name: 'Canh thảo dược trị thương',
    ingredients: [
      { itemId: 'herbal_paste', quantity: 1 },
      { itemId: 'herb', quantity: 2 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 45
    },
    unlockSource: 'Thiện cảm Lâm Lão đạt \'Thân thiết\'',
    description: 'Thang thuốc sắc từ cao thảo dược, khả năng hồi phục cực mạnh.'
  },
  {
    id: 'chrysanthemum_jelly',
    name: 'Thạch hoa cúc',
    ingredients: [
      { itemId: 'chrysanthemum_honey', quantity: 1 },
      { itemId: 'chrysanthemum_tea', quantity: 1 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 10,
      buff: { type: 'luck', value: 2, description: 'May mắn +2 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 5',
    requiredSkill: { type: 'farming', level: 5 },
    description: 'Thạch hoa cúc thanh mát trong vắt, ăn vào tinh thần sảng khoái.'
  },
  {
    id: 'watermelon_wine_sorbet',
    name: 'Đá bào rượu dưa hấu',
    ingredients: [
      { itemId: 'watermelon_wine', quantity: 1 },
      { itemId: 'watermelon', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'speed', value: 2, description: 'Tốc độ di chuyển +2 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 5',
    requiredSkill: { type: 'farming', level: 5 },
    description: 'Đá bào rượu dưa hấu mát lạnh, cực phẩm giải nhiệt ngày hè.'
  },
  {
    id: 'jujube_wine_stew',
    name: 'Lê hầm rượu táo đỏ',
    ingredients: [
      { itemId: 'jujube_wine', quantity: 1 },
      { itemId: 'jujube', quantity: 2 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 25,
      buff: { type: 'stamina', value: 20, description: 'Thể lực tiêu hao -20% (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Hồng Đậu đạt \'Tri kỷ\'',
    description: 'Món tráng miệng hầm với rượu táo đỏ, giúp bổ khí dưỡng huyết.'
  },
  {
    id: 'osmanthus_wine_chicken',
    name: 'Gà hấp rượu hoa quế',
    ingredients: [
      { itemId: 'osmanthus_wine', quantity: 1 },
      { itemId: 'egg', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'giftBonus', value: 2, description: 'Thiện cảm tặng quà x2 (Trong ngày)' }
    },
    unlockSource: 'Thiện cảm Liễu Nương đạt \'Thân thiết\'',
    description: 'Hương thơm dịu nhẹ của rượu hoa quế thấm đượm vào thịt gà, vô cùng thanh tao.'
  },
  {
    id: 'smoked_eel_rice',
    name: 'Cơm lươn xông khói',
    ingredients: [
      { itemId: 'smoked_eel', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'sesame_oil', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 25,
      buff: { type: 'fishing', value: 1, description: 'Kỹ năng câu cá +1 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 6',
    requiredSkill: { type: 'farming', level: 6 },
    description: 'Lươn xông khói phủ lên cơm nóng, rưới thêm dầu mè, ngon ngọt vô ngần.'
  },
  {
    id: 'rapeseed_honey_bread',
    name: 'Bánh mì mật hoa cải',
    ingredients: [
      { itemId: 'rapeseed_honey', quantity: 1 },
      { itemId: 'wheat_flour', quantity: 2 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 10,
      buff: { type: 'luck', value: 1, description: 'May mắn +1 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 3',
    requiredSkill: { type: 'farming', level: 3 },
    description: 'Bánh mì mật hoa cải ngọt ngào, hãy ăn một miếng trước khi ra ngoài thu thập.'
  },
  {
    id: 'corn_wine_braised_pork',
    name: 'Thịt kho rượu ngô',
    ingredients: [
      { itemId: 'corn_wine', quantity: 1 },
      { itemId: 'corn', quantity: 2 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 30,
      buff: { type: 'defense', value: 15, description: 'Sát thương gánh chịu -15% (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 5',
    requiredSkill: { type: 'farming', level: 5 },
    description: 'Món thịt kho om với rượu ngô thơm nức, ăn vào tràn đầy sức lực.'
  },
  {
    id: 'ginseng_tea_rice',
    name: 'Cơm chan trà sâm',
    ingredients: [
      { itemId: 'ginseng_tea', quantity: 1 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'mining', value: 1, description: 'Kỹ năng khai khoáng +1 (Trong ngày)' }
    },
    unlockSource: 'Cấp nấu ăn 6',
    requiredSkill: { type: 'farming', level: 6 },
    description: 'Cơm chan nước trà sâm, đơn giản mà tràn đầy nguyên khí.'
  }
]

/** 根据ID获取食谱 */
export const getRecipeById = (id: string): RecipeDef | undefined => {
  return RECIPES.find(r => r.id === id)
}
