import type { RingDef } from '@/types'

/** 所有戒指定义 */
export const RINGS: RingDef[] = [
  // ===== Tier 1: 铜/石英（前期，1-20层）=====
  {
    id: 'jade_guard_ring',
    name: 'Vòng hộ thân phỉ thúy',
    description: 'Vòng đồng khảm phỉ thúy, giúp giảm sát thương gánh chịu.',
    effects: [{ type: 'defense_bonus', value: 0.08 }],
    recipe: [
      { itemId: 'copper_bar', quantity: 2 },
      { itemId: 'jade', quantity: 1 }
    ],
    recipeMoney: 200,
    obtainSource: 'Chế tạo',
    sellPrice: 150
  },
  {
    id: 'quartz_ring',
    name: 'Nhẫn thạch anh sáng',
    description: 'Nhẫn thạch anh lấp lánh, tăng lực tấn công.',
    effects: [{ type: 'attack_bonus', value: 3 }],
    recipe: [
      { itemId: 'copper_bar', quantity: 2 },
      { itemId: 'quartz', quantity: 2 }
    ],
    recipeMoney: 200,
    obtainSource: 'Chế tạo',
    sellPrice: 120
  },
  {
    id: 'farmers_ring',
    name: 'Vòng xanh nhà nông',
    description: 'Giảm thể lực tiêu hao khi làm nông.',
    effects: [{ type: 'farming_stamina', value: 0.1 }],
    recipe: [
      { itemId: 'copper_bar', quantity: 3 },
      { itemId: 'quartz', quantity: 1 }
    ],
    recipeMoney: 250,
    obtainSource: 'Chế tạo',
    sellPrice: 180
  },

  // ===== Tier 2: 铁/翡翠（中前期，21-40层）=====
  {
    id: 'jade_spirit_ring',
    name: 'Nhẫn Bích Linh',
    description: 'Phỉ thúy chứa đựng linh khí, tăng tỷ lệ bạo kích.',
    effects: [{ type: 'crit_rate_bonus', value: 0.06 }],
    recipe: [
      { itemId: 'iron_bar', quantity: 2 },
      { itemId: 'jade', quantity: 2 }
    ],
    recipeMoney: 500,
    obtainSource: 'Chế tạo',
    sellPrice: 300
  },
  {
    id: 'anglers_ring',
    name: 'Vòng xanh lão ngư',
    description: 'Cá sẽ ngoan ngoãn hơn khi câu, giảm thể lực tiêu hao.',
    effects: [
      { type: 'fishing_calm', value: 0.08 },
      { type: 'fishing_stamina', value: 0.1 }
    ],
    recipe: [
      { itemId: 'iron_bar', quantity: 2 },
      { itemId: 'jade', quantity: 1 },
      { itemId: 'quartz', quantity: 1 }
    ],
    recipeMoney: 400,
    obtainSource: 'Chế tạo',
    sellPrice: 280
  },
  {
    id: 'friendship_ring',
    name: 'Nhẫn Thiện Duyên',
    description: 'Tặng quà dễ động lòng người hơn khi đeo.',
    effects: [{ type: 'gift_friendship', value: 0.15 }],
    recipe: [
      { itemId: 'iron_bar', quantity: 2 },
      { itemId: 'jade', quantity: 2 }
    ],
    recipeMoney: 600,
    obtainSource: 'Chế tạo',
    sellPrice: 350
  },

  // ===== Tier 3: 金/红宝石（中期，41-60层）=====
  {
    id: 'ruby_flame_ring',
    name: 'Nhẫn Xích Diễm',
    description: 'Hồng ngọc tỏa ra sức mạnh nóng bỏng, tăng mạnh tấn công.',
    effects: [{ type: 'attack_bonus', value: 6 }],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'ruby', quantity: 2 }
    ],
    recipeMoney: 1000,
    obtainSource: 'Chế tạo',
    sellPrice: 600
  },
  {
    id: 'miners_ring',
    name: 'Vòng vàng thợ mỏ',
    description: 'Giảm mạnh thể lực thám hiểm mỏ, nhận thêm quặng khi khai thác.',
    effects: [
      { type: 'mining_stamina', value: 0.15 },
      { type: 'ore_bonus', value: 1 }
    ],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'ruby', quantity: 1 },
      { itemId: 'quartz', quantity: 2 }
    ],
    recipeMoney: 800,
    obtainSource: 'Chế tạo',
    sellPrice: 500
  },
  {
    id: 'merchants_ring',
    name: 'Vòng vàng thương gia',
    description: 'Tăng giá bán vật phẩm, giảm giá mua ở cửa hàng.',
    effects: [
      { type: 'sell_price_bonus', value: 0.05 },
      { type: 'shop_discount', value: 0.05 }
    ],
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'ruby', quantity: 1 }
    ],
    recipeMoney: 1200,
    obtainSource: 'Chế tạo',
    sellPrice: 700
  },

  // ===== Tier 4: 月光石（61-80层）=====
  {
    id: 'moonlight_ring',
    name: 'Nhẫn Nguyệt Hoa',
    description: 'Ánh sáng dịu nhẹ của đá nguyệt quang bảo hộ sinh mệnh, tăng sinh lực tối đa.',
    effects: [{ type: 'max_hp_bonus', value: 25 }],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'moonstone', quantity: 2 }
    ],
    recipeMoney: 1500,
    obtainSource: 'Chế tạo',
    sellPrice: 800
  },
  {
    id: 'harvest_moon_ring',
    name: 'Nhẫn Phong Nguyệt',
    description: 'Ánh trăng nuôi dưỡng cây trồng, tăng chất lượng và tốc độ sinh trưởng.',
    effects: [
      { type: 'crop_quality_bonus', value: 0.08 },
      { type: 'crop_growth_bonus', value: 0.08 }
    ],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'moonstone', quantity: 2 },
      { itemId: 'jade', quantity: 1 }
    ],
    recipeMoney: 1500,
    obtainSource: 'Chế tạo',
    sellPrice: 900
  },
  {
    id: 'exp_ring',
    name: 'Nhẫn Ngộ Đạo',
    description: 'Tăng toàn bộ điểm kinh nghiệm nhận được.',
    effects: [{ type: 'exp_bonus', value: 0.1 }],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'moonstone', quantity: 1 },
      { itemId: 'ruby', quantity: 1 }
    ],
    recipeMoney: 1200,
    obtainSource: 'Chế tạo',
    sellPrice: 750
  },

  // ===== Tier 5: 黑曜石（81-100层）=====
  {
    id: 'shadow_ring',
    name: 'Nhẫn Ám Ảnh',
    description: 'Sức mạnh bóng tối hút sinh lực, tấn công giúp hồi phục sinh lực.',
    effects: [{ type: 'vampiric', value: 0.1 }],
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'obsidian', quantity: 2 }
    ],
    recipeMoney: 2000,
    obtainSource: 'Chế tạo',
    sellPrice: 1200
  },
  {
    id: 'treasure_hunter_ring',
    name: 'Nhẫn Tầm Bảo',
    description: 'Rương báu mỏ xuất hiện nhiều hơn, tăng tỷ lệ gặp rương khi câu cá.',
    effects: [{ type: 'treasure_find', value: 0.1 }],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'obsidian', quantity: 1 },
      { itemId: 'moonstone', quantity: 1 }
    ],
    recipeMoney: 1800,
    obtainSource: 'Chế tạo',
    sellPrice: 1000
  },
  {
    id: 'stalwart_ring',
    name: 'Nhẫn Kiên Bàn',
    description: 'Lớp bảo vệ cứng cáp của đá hắc diện, giảm sát thương và tăng sinh lực tối đa.',
    effects: [
      { type: 'defense_bonus', value: 0.12 },
      { type: 'max_hp_bonus', value: 15 }
    ],
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'obsidian', quantity: 2 }
    ],
    recipeMoney: 2500,
    obtainSource: 'Chế tạo',
    sellPrice: 1400
  },

  // ===== Tier 6: 龙玉/铱（101-120层，终局）=====
  {
    id: 'dragon_ring',
    name: 'Nhẫn Long Mạch',
    description: 'Long ngọc chứa sức mạnh viễn cổ, tăng toàn diện hiệu suất thể lực.',
    effects: [{ type: 'stamina_reduction', value: 0.12 }],
    recipe: [
      { itemId: 'iridium_bar', quantity: 2 },
      { itemId: 'dragon_jade', quantity: 2 }
    ],
    recipeMoney: 5000,
    obtainSource: 'Chế tạo',
    sellPrice: 2500
  },
  {
    id: 'fortune_ring',
    name: 'Nhẫn Phúc Vận',
    description: 'Long ngọc chứa linh khí đất trời, tăng may mắn tổng hợp.',
    effects: [{ type: 'luck', value: 0.08 }],
    recipe: [
      { itemId: 'iridium_bar', quantity: 2 },
      { itemId: 'dragon_jade', quantity: 1 },
      { itemId: 'moonstone', quantity: 1 }
    ],
    recipeMoney: 4000,
    obtainSource: 'Chế tạo',
    sellPrice: 2200
  },
  {
    id: 'warlord_ring',
    name: 'Nhẫn Chiến Thần',
    description: 'Sự kết hợp hoàn hảo giữa Iridium và long ngọc, tăng mạnh tấn công và bạo kích.',
    effects: [
      { type: 'attack_bonus', value: 8 },
      { type: 'crit_rate_bonus', value: 0.08 }
    ],
    recipe: [
      { itemId: 'iridium_bar', quantity: 3 },
      { itemId: 'dragon_jade', quantity: 2 }
    ],
    recipeMoney: 6000,
    obtainSource: 'Chế tạo',
    sellPrice: 3000
  },
  {
    id: 'prismatic_ring',
    name: 'Nhẫn Ngũ Sắc Thiên Không',
    description: 'Chiếc nhẫn tối cao đúc từ mảnh vỡ ngũ sắc, vạn sự cát tường.',
    effects: [
      { type: 'luck', value: 0.12 },
      { type: 'exp_bonus', value: 0.08 },
      { type: 'sell_price_bonus', value: 0.05 }
    ],
    recipe: [
      { itemId: 'iridium_bar', quantity: 2 },
      { itemId: 'prismatic_shard', quantity: 1 }
    ],
    recipeMoney: 10000,
    obtainSource: 'Chế tạo (Cần Mảnh Vỡ Ngũ Sắc)',
    sellPrice: 5000
  },

  // ===== BOSS 掉落（不可合成）=====
  {
    id: 'mud_golem_band',
    name: 'Đai lưng bùn đá',
    description: 'Đai hộ thân rơi ra từ Cự Thú Bùn Đá, giảm tiêu hao thể lực toàn diện.',
    effects: [{ type: 'stamina_reduction', value: 0.06 }],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'BOSS rơi: Cự Thú Bùn Đá (Tầng 20)',
    sellPrice: 300
  },
  {
    id: 'frost_queen_circlet',
    name: 'Nhẫn Băng Hậu',
    description: 'Vòng băng do Nữ hoàng Băng Giá để lại, tăng tỷ lệ rớt đồ của quái.',
    effects: [{ type: 'monster_drop_bonus', value: 0.15 }],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'BOSS rơi: Nữ hoàng Băng Giá (Tầng 40)',
    sellPrice: 600
  },
  {
    id: 'lava_lord_seal',
    name: 'Ấn Dung Nham Quân',
    description: 'Vòng phong ấn của Chúa tể Dung Nham, tấn công kèm hiệu ứng thiêu đốt hút máu.',
    effects: [
      { type: 'attack_bonus', value: 5 },
      { type: 'vampiric', value: 0.08 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'BOSS rơi: Chúa tể Dung Nham (Tầng 60)',
    sellPrice: 1200
  },

  // ===== 新增合成戒指 =====
  {
    id: 'endurance_ring',
    name: 'Nhẫn Bền Bỉ',
    description: 'Vòng đồng khảm thạch anh, tăng khả năng bền bỉ.',
    effects: [{ type: 'stamina_reduction', value: 0.05 }],
    recipe: [
      { itemId: 'copper_bar', quantity: 3 },
      { itemId: 'quartz', quantity: 1 }
    ],
    recipeMoney: 200,
    obtainSource: 'Chế tạo',
    sellPrice: 120
  },
  {
    id: 'fish_jade_ring',
    name: 'Nhẫn xanh ngư hoạch',
    description: 'Phỉ thúy chứa thủy linh khí, giúp câu được cá chất lượng tốt hơn.',
    effects: [
      { type: 'fish_quality_bonus', value: 0.08 },
      { type: 'fishing_calm', value: 0.05 }
    ],
    recipe: [
      { itemId: 'iron_bar', quantity: 2 },
      { itemId: 'jade', quantity: 2 }
    ],
    recipeMoney: 500,
    obtainSource: 'Chế tạo',
    sellPrice: 350
  },
  {
    id: 'growth_ring',
    name: 'Nhẫn Thúc Sinh',
    description: 'Sức mạnh của trăng và thảo dược thúc đẩy sinh cơ, giúp cây trồng chín nhanh hơn.',
    effects: [{ type: 'crop_growth_bonus', value: 0.12 }],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'herb', quantity: 5 },
      { itemId: 'moonstone', quantity: 1 }
    ],
    recipeMoney: 1200,
    obtainSource: 'Chế tạo',
    sellPrice: 750
  },
  {
    id: 'travel_ring',
    name: 'Nhẫn Hành Lộ',
    description: 'Sự dung hợp giữa chân thỏ và vàng ban tặng bước chân thanh thoát, di chuyển nhanh hơn.',
    effects: [
      { type: 'travel_speed', value: 0.15 },
      { type: 'stamina_reduction', value: 0.05 }
    ],
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'rabbit_foot', quantity: 1 }
    ],
    recipeMoney: 2000,
    obtainSource: 'Chế tạo',
    sellPrice: 1100
  },

  // ===== 新增BOSS掉落 =====
  {
    id: 'crystal_king_seal',
    name: 'Ấn Vương Pha Lê',
    description: 'Chiếc nhẫn để lại sau khi Vua Pha Lê vỡ vụn, chứa đựng sức mạnh ngộ đạo.',
    effects: [
      { type: 'exp_bonus', value: 0.12 },
      { type: 'luck', value: 0.06 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'BOSS rơi: Vua Pha Lê (Tầng 80)',
    sellPrice: 1800
  },
  {
    id: 'shadow_sovereign_ring',
    name: 'Nhẫn Ám Ảnh Quân',
    description: 'Nhẫn ngưng tụ từ linh hồn Chúa tể Bóng Tối, gây bạo kích chí mạng và hút sinh lực.',
    effects: [
      { type: 'crit_rate_bonus', value: 0.1 },
      { type: 'vampiric', value: 0.06 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'BOSS rơi: Chúa tể Bóng Tối (Tầng 100)',
    sellPrice: 2500
  },
  {
    id: 'abyss_dragon_ring',
    name: 'Nhẫn Long Vương',
    description: 'Chiếc nhẫn tối cao hóa từ nghịch lân của Long Vương Vực Thẳm, công thủ toàn diện.',
    effects: [
      { type: 'attack_bonus', value: 10 },
      { type: 'defense_bonus', value: 0.1 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'BOSS rơi: Long Vương Vực Thẳm (Tầng 120)',
    sellPrice: 4000
  },

  // ===== 新增怪物掉落 =====
  {
    id: 'shallow_guard',
    name: 'Vòng bảo hộ mỏ nông',
    description: 'Chiếc vòng hộ thân thô sơ làm từ vỏ cua đá ở tầng mỏ nông.',
    effects: [{ type: 'defense_bonus', value: 0.05 }],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rớt từ quái vật tầng mỏ nông',
    sellPrice: 80
  },
  {
    id: 'crystal_prism_band',
    name: 'Đai lăng kính',
    description: 'Đai lăng kính ngưng tụ trên người quái vật tầng pha lê, mang lại vận may.',
    effects: [
      { type: 'luck', value: 0.05 },
      { type: 'ore_bonus', value: 1 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rớt từ quái vật tầng Pha Lê',
    sellPrice: 900
  },

  // ===== 新增宝箱掉落 =====
  {
    id: 'ancient_jade_ring',
    name: 'Nhẫn cổ ngọc',
    description: 'Nhẫn phỉ thúy cổ xưa nằm ngủ trong rương báu, mang lại tài vận.',
    effects: [
      { type: 'sell_price_bonus', value: 0.06 },
      { type: 'shop_discount', value: 0.04 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rương báu hang mỏ',
    sellPrice: 600
  },

  // === 公会专属 ===
  {
    id: 'guild_war_ring',
    name: 'Nhẫn chiến công hội',
    description: 'Vòng chiến đấu của những thành viên ưu tú của Hội thám hiểm chứa đựng sức mạnh của bang hội.',
    effects: [
      { type: 'attack_bonus', value: 4 },
      { type: 'defense_bonus', value: 0.06 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Cửa hàng Công hội',
    sellPrice: 800
  },
  // === 通商兑换 ===
  {
    id: 'trade_turquoise_pendant',
    name: 'Dây chuyền ngọc lục bảo',
    description: 'Mặt dây chuyền tinh xảo mài từ ngọc lục bảo Tây Vực, chứa sức mạnh sa mạc.',
    effects: [
      { type: 'attack_bonus', value: 2 },
      { type: 'defense_bonus', value: 0.03 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Đổi bằng điểm thông thương',
    sellPrice: 600
  },
  // === 竹林野兽材料制作 ===
  {
    id: 'wolf_fang_pendant',
    name: 'Nanh sói đeo cổ',
    description: 'Mặt dây chuyền hộ thân bện bằng nanh sói và dây đồng, giúp người đeo ra chiêu hiểm hóc hơn.',
    effects: [
      { type: 'attack_bonus', value: 4 },
      { type: 'crit_rate_bonus', value: 0.05 }
    ],
    recipe: [
      { itemId: 'wolf_fang', quantity: 3 },
      { itemId: 'copper_bar', quantity: 2 }
    ],
    recipeMoney: 500,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 300
  },
  {
    id: 'tiger_fang_ring',
    name: 'Nhẫn nanh cọp',
    description: 'Nhẫn vàng khảm nanh cọp dữ, tỏa ra uy áp của mãnh thú.',
    effects: [
      { type: 'attack_bonus', value: 6 },
      { type: 'monster_drop_bonus', value: 0.15 }
    ],
    recipe: [
      { itemId: 'tiger_fang', quantity: 3 },
      { itemId: 'gold_bar', quantity: 2 }
    ],
    recipeMoney: 1500,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 700
  }
]

/** 根据ID获取戒指定义 */
export const getRingById = (id: string): RingDef | undefined => {
  return RINGS.find(r => r.id === id)
}

/** 所有可合成的戒指 */
export const CRAFTABLE_RINGS: RingDef[] = RINGS.filter(r => r.recipe !== null)

/** 各区域怪物可掉落的戒指 */
export const MONSTER_DROP_RINGS: Record<string, { ringId: string; chance: number }[]> = {
  shallow: [{ ringId: 'shallow_guard', chance: 0.02 }],
  frost: [{ ringId: 'jade_guard_ring', chance: 0.02 }],
  lava: [{ ringId: 'jade_spirit_ring', chance: 0.02 }],
  crystal: [
    { ringId: 'moonlight_ring', chance: 0.02 },
    { ringId: 'crystal_prism_band', chance: 0.015 }
  ],
  shadow: [{ ringId: 'shadow_ring', chance: 0.02 }],
  abyss: [{ ringId: 'dragon_ring', chance: 0.015 }]
}

/** BOSS首杀掉落戒指 */
export const BOSS_DROP_RINGS: Record<number, string> = {
  20: 'mud_golem_band',
  40: 'frost_queen_circlet',
  60: 'lava_lord_seal',
  80: 'crystal_king_seal',
  100: 'shadow_sovereign_ring',
  120: 'abyss_dragon_ring'
}

/** 宝箱层可掉落的戒指（按区域） */
export const TREASURE_DROP_RINGS: Record<string, { ringId: string; chance: number }[]> = {
  shallow: [{ ringId: 'quartz_ring', chance: 0.08 }],
  frost: [{ ringId: 'farmers_ring', chance: 0.08 }],
  lava: [
    { ringId: 'anglers_ring', chance: 0.08 },
    { ringId: 'ancient_jade_ring', chance: 0.04 }
  ],
  crystal: [
    { ringId: 'exp_ring', chance: 0.06 },
    { ringId: 'ancient_jade_ring', chance: 0.035 }
  ],
  shadow: [{ ringId: 'treasure_hunter_ring', chance: 0.06 }],
  abyss: [{ ringId: 'fortune_ring', chance: 0.05 }]
}
