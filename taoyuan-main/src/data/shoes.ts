import type { ShoeDef } from '@/types'

/** 所有鞋子定义 */
export const SHOES: ShoeDef[] = [
  // ===== Tier 1: 基础款（绸缎庄购买）=====
  {
    id: 'straw_sandals',
    name: 'Giày rơm',
    description: 'Giày bện bằng rơm mộc mạc, giảm tiêu hao thể lực.',
    effects: [{ type: 'stamina_reduction', value: 0.05 }],
    shopPrice: 200,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 80
  },
  {
    id: 'cloth_shoes',
    name: 'Giày vải',
    description: 'Giày vải thoải mái, giúp làm nông nhẹ nhàng hơn.',
    effects: [{ type: 'farming_stamina', value: 0.08 }],
    shopPrice: 300,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 120
  },

  // ===== Tier 2: 中级款（绸缎庄购买）=====
  {
    id: 'leather_boots',
    name: 'Ủng da',
    description: 'Ủng da cao cổ chắc chắn, giúp đi bộ nhanh hơn.',
    effects: [{ type: 'travel_speed', value: 0.15 }],
    shopPrice: 800,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 320
  },
  {
    id: 'miner_boots',
    name: 'Ủng thợ mỏ',
    description: 'Ủng mũi sắt đế dày, giúp thám hiểm hang mỏ an toàn hơn.',
    effects: [
      { type: 'mining_stamina', value: 0.1 },
      { type: 'defense_bonus', value: 0.05 }
    ],
    shopPrice: 1000,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 400
  },

  // ===== Tier 3: 高级款（铁匠铺合成）=====
  {
    id: 'gale_boots',
    name: 'Giày Tật Phong',
    description: 'Giày da nhẹ như gió, giúp rút ngắn đáng kể thời gian di chuyển.',
    effects: [
      { type: 'travel_speed', value: 0.25 },
      { type: 'stamina_reduction', value: 0.08 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'iron_bar', quantity: 5 },
      { itemId: 'rabbit_foot', quantity: 1 }
    ],
    recipeMoney: 2000,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 1000
  },
  {
    id: 'iron_greaves',
    name: 'Ủng thiết giáp',
    description: 'Xà cạp sắt dày cộp, khả năng phòng ngự vượt trội.',
    effects: [
      { type: 'defense_bonus', value: 0.12 },
      { type: 'max_hp_bonus', value: 10 }
    ],
    shopPrice: null,
    recipe: [{ itemId: 'iron_bar', quantity: 8 }],
    recipeMoney: 1500,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 750
  },
  {
    id: 'silk_slippers',
    name: 'Giày thêu tơ lụa',
    description: 'Giày thêu hoa bằng tơ lụa tinh xảo, giúp bước chân nhẹ nhàng khi dạo xuân hái thuốc.',
    effects: [
      { type: 'farming_stamina', value: 0.08 },
      { type: 'crop_quality_bonus', value: 0.04 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'silk_cloth', quantity: 3 },
      { itemId: 'herb', quantity: 5 }
    ],
    recipeMoney: 800,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 400
  },
  {
    id: 'merchant_boots',
    name: 'Ủng thương nhân',
    description: 'Ủng da thương nhân hay đi, di chuyển nhanh và được giảm giá khi mua sắm.',
    effects: [
      { type: 'travel_speed', value: 0.18 },
      { type: 'shop_discount', value: 0.05 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'silk_cloth', quantity: 1 }
    ],
    recipeMoney: 2500,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 1200
  },

  // ===== Tier 4: 顶级款（铁匠铺合成）=====
  {
    id: 'moon_step_boots',
    name: 'Ủng Nguyệt Bước',
    description: 'Ủng linh hoạt khảm đá nguyệt quang, bước đi như bay.',
    effects: [
      { type: 'travel_speed', value: 0.3 },
      { type: 'luck', value: 0.08 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'gold_bar', quantity: 5 },
      { itemId: 'moonstone', quantity: 2 }
    ],
    recipeMoney: 4000,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 2000
  },
  {
    id: 'dragon_scale_boots',
    name: 'Ủng vảy rồng',
    description: 'Ủng chiến làm từ vảy rồng, công thủ toàn diện, di chuyển như gió.',
    effects: [
      { type: 'defense_bonus', value: 0.1 },
      { type: 'attack_bonus', value: 3 },
      { type: 'travel_speed', value: 0.2 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'iridium_bar', quantity: 3 },
      { itemId: 'dragon_jade', quantity: 1 }
    ],
    recipeMoney: 8000,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 4000
  },

  // ===== 怪物掉落 =====
  {
    id: 'frost_treads',
    name: 'Ủng Sương Hành',
    description: 'Xà cạp đóng băng do quái vật tầng băng giá để lại, đeo vào giúp bước đi vững chãi.',
    effects: [
      { type: 'travel_speed', value: 0.08 },
      { type: 'defense_bonus', value: 0.03 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rớt từ quái vật tầng Băng Giá',
    sellPrice: 150
  },
  {
    id: 'shadow_striders',
    name: 'Ủng Bóng Đêm',
    description: 'Ngưng tụ từ ám năng của quái vật tầng bóng tối, di chuyển nhanh chóng và không tiếng động.',
    effects: [
      { type: 'travel_speed', value: 0.18 },
      { type: 'monster_drop_bonus', value: 0.06 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rớt từ quái vật tầng Bóng Tối',
    sellPrice: 1000
  },
  {
    id: 'void_treads',
    name: 'Ủng chiến Hư Không',
    description: 'Rèn từ xương cốt của cốt long vực thẳm, chứa đựng sức mạnh hủy diệt.',
    effects: [
      { type: 'attack_bonus', value: 3 },
      { type: 'defense_bonus', value: 0.08 },
      { type: 'travel_speed', value: 0.15 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rớt từ quái vật tầng Vực Thẳm',
    sellPrice: 1800
  },

  // ===== BOSS掉落 =====
  {
    id: 'lava_lord_greaves',
    name: 'Ủng giáp dung nham',
    description: 'Ngưng tụ từ nhiệt lượng còn sót lại của Chúa tể Dung Nham, chắc chắn và nóng bóng.',
    effects: [
      { type: 'defense_bonus', value: 0.1 },
      { type: 'attack_bonus', value: 2 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Hạ gục BOSS tầng 60 lần đầu',
    sellPrice: 800
  },
  {
    id: 'shadow_sovereign_treads',
    name: 'Ủng Ám Vương',
    description: 'Di vật của Chúa tể Bóng Tối, ám năng quấn quanh cổ chân, bước đi sinh gió.',
    effects: [
      { type: 'travel_speed', value: 0.22 },
      { type: 'defense_bonus', value: 0.08 },
      { type: 'vampiric', value: 0.03 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Hạ gục BOSS tầng 100 lần đầu',
    sellPrice: 1500
  },

  // ===== 宝箱掉落 =====
  {
    id: 'fortune_slippers',
    name: 'Giày may mắn',
    description: 'Dép lê mềm mại tìm thấy trong rương báu, dường như có thể mang lại vận may.',
    effects: [
      { type: 'sell_price_bonus', value: 0.04 },
      { type: 'luck', value: 0.03 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rương báu hang mỏ',
    sellPrice: 300
  },

  // ===== 新增商店鞋子（绸缎庄）=====
  {
    id: 'cotton_shoes',
    name: 'Giày bông',
    description: 'Giày bông mềm mại giữ ấm, giảm tiêu hao thể lực hàng ngày.',
    effects: [
      { type: 'stamina_reduction', value: 0.04 },
      { type: 'farming_stamina', value: 0.04 }
    ],
    shopPrice: 400,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 160
  },
  {
    id: 'fishing_waders',
    name: 'Ủng câu cá',
    description: 'Ủng cao cổ chống nước, giúp thoải mái hơn khi câu cá.',
    effects: [
      { type: 'fishing_stamina', value: 0.1 },
      { type: 'fishing_calm', value: 0.03 }
    ],
    shopPrice: 700,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 280
  },
  {
    id: 'jade_slippers',
    name: 'Giày đế ngọc',
    description: 'Giày thêu hoa nạm đế phỉ thúy, tăng giá bán và tăng độ thiện cảm khi tặng quà.',
    effects: [
      { type: 'sell_price_bonus', value: 0.04 },
      { type: 'gift_friendship', value: 0.06 }
    ],
    shopPrice: 1200,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 480
  },

  // ===== 新增合成鞋子（铁匠铺）=====
  {
    id: 'obsidian_greaves',
    name: 'Ủng giáp hắc diện',
    description: 'Ủng giáp nặng rèn từ đá hắc diện, phòng ngự cực mạnh.',
    effects: [
      { type: 'defense_bonus', value: 0.15 },
      { type: 'max_hp_bonus', value: 15 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'obsidian', quantity: 2 },
      { itemId: 'iron_bar', quantity: 5 }
    ],
    recipeMoney: 3000,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 1500
  },
  {
    id: 'wind_walker',
    name: 'Ủng Phong Hành',
    description: 'Sức mạnh nhẹ nhàng do đá nguyệt quang ban tặng, tăng mạnh tốc độ di chuyển.',
    effects: [
      { type: 'travel_speed', value: 0.22 },
      { type: 'stamina_reduction', value: 0.06 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'moonstone', quantity: 1 }
    ],
    recipeMoney: 2500,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 1200
  },
  {
    id: 'phoenix_boots',
    name: 'Ủng Phượng Minh',
    description: 'Ủng lộng lẫy đúc từ long ngọc và vàng, mang lại may mắn và ngộ tính.',
    effects: [
      { type: 'luck', value: 0.06 },
      { type: 'exp_bonus', value: 0.08 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'gold_bar', quantity: 5 },
      { itemId: 'dragon_jade', quantity: 1 }
    ],
    recipeMoney: 5000,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 2500
  },

  // ===== 新增BOSS掉落鞋子 =====
  {
    id: 'frost_queen_slippers',
    name: 'Ủng khiêu vũ Băng Hậu',
    description: 'Di vật của Nữ hoàng Băng Giá, mang vào giúp bước chân nhẹ nhàng như khiêu vũ trên băng.',
    effects: [
      { type: 'travel_speed', value: 0.12 },
      { type: 'fishing_calm', value: 0.06 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Hạ gục BOSS tầng 40 lần đầu',
    sellPrice: 500
  },
  {
    id: 'abyss_dragon_treads',
    name: 'Ủng chiến Long Vương',
    description: 'Ủng chiến tối cao rèn từ vảy của Long Vương Vực Thẳm, di chuyển như gió, công thủ toàn diện.',
    effects: [
      { type: 'travel_speed', value: 0.25 },
      { type: 'attack_bonus', value: 5 },
      { type: 'defense_bonus', value: 0.1 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Hạ gục BOSS tầng 120 lần đầu',
    sellPrice: 5000
  },

  // ===== 新增怪物掉落鞋子 =====
  {
    id: 'crystal_treads',
    name: 'Ủng khai thác tinh quặng',
    description: 'Ủng mỏ ngưng tụ từ mảnh vụn quái vật tầng pha lê, tăng hiệu suất khai thác mỏ.',
    effects: [
      { type: 'ore_bonus', value: 1 },
      { type: 'mining_stamina', value: 0.06 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rớt từ quái vật tầng Pha Lê',
    sellPrice: 800
  },

  // ===== 新增宝箱掉落鞋子 =====
  {
    id: 'lucky_boots',
    name: 'Ủng cao cổ may mắn',
    description: 'Ủng cao cổ kỳ lạ tìm thấy trong rương báu, mang lại may mắn và thêm chiến lợi phẩm.',
    effects: [
      { type: 'luck', value: 0.05 },
      { type: 'monster_drop_bonus', value: 0.04 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rương báu hang mỏ',
    sellPrice: 450
  },

  // === 公会专属 ===
  {
    id: 'guild_war_boots',
    name: 'Ủng chiến công hội',
    description: 'Ủng chiến đấu của thành viên tinh anh thuộc Công hội Mạo Hiểm Giả, nhẹ nhàng và bền bỉ.',
    effects: [
      { type: 'attack_bonus', value: 2 },
      { type: 'defense_bonus', value: 0.05 },
      { type: 'travel_speed', value: 0.1 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Cửa hàng Công hội',
    sellPrice: 800
  },
  // === 竹林野兽材料制作 ===
  {
    id: 'bear_pelt_boots',
    name: 'Ủng da gấu',
    description: 'Ủng chiến rèn từ da gấu dày dặn, vô cùng bền bỉ, giúp người đeo trở nên mạnh mẽ hơn.',
    effects: [
      { type: 'defense_bonus', value: 0.1 },
      { type: 'max_hp_bonus', value: 15 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'bear_pelt', quantity: 3 },
      { itemId: 'iron_bar', quantity: 2 }
    ],
    recipeMoney: 1200,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 600
  }
]

/** 根据ID获取鞋子定义 */
export const getShoeById = (id: string): ShoeDef | undefined => {
  return SHOES.find(s => s.id === id)
}

/** 绸缎庄可购买的鞋子 */
export const SHOP_SHOES: ShoeDef[] = SHOES.filter(s => s.shopPrice !== null)

/** 铁匠铺可合成的鞋子 */
export const CRAFTABLE_SHOES: ShoeDef[] = SHOES.filter(s => s.recipe !== null)

/** 怪物掉落鞋子（按矿洞区域） */
export const MONSTER_DROP_SHOES: Record<string, { shoeId: string; chance: number }[]> = {
  shallow: [],
  frost: [{ shoeId: 'frost_treads', chance: 0.015 }],
  lava: [],
  crystal: [{ shoeId: 'crystal_treads', chance: 0.015 }],
  shadow: [{ shoeId: 'shadow_striders', chance: 0.012 }],
  abyss: [{ shoeId: 'void_treads', chance: 0.01 }]
}

/** BOSS首杀掉落鞋子 */
export const BOSS_DROP_SHOES: Record<number, string> = {
  40: 'frost_queen_slippers',
  60: 'lava_lord_greaves',
  100: 'shadow_sovereign_treads',
  120: 'abyss_dragon_treads'
}

/** 宝箱掉落鞋子（按矿洞区域） */
export const TREASURE_DROP_SHOES: Record<string, { shoeId: string; chance: number }[]> = {
  shallow: [{ shoeId: 'lucky_boots', chance: 0.05 }],
  frost: [{ shoeId: 'lucky_boots', chance: 0.04 }],
  lava: [],
  crystal: [{ shoeId: 'fortune_slippers', chance: 0.05 }],
  shadow: [{ shoeId: 'fortune_slippers', chance: 0.04 }],
  abyss: []
}
