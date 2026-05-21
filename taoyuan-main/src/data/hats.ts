import type { HatDef } from '@/types'

/** 所有帽子定义 */
export const HATS: HatDef[] = [
  // ===== Tier 1: 基础款（绸缎庄购买）=====
  {
    id: 'straw_hat',
    name: 'Mũ Rơm',
    description: 'Chiếc mũ đan bằng rơm nhẹ nhàng, giảm tiêu hao thể lực khi làm nông.',
    effects: [{ type: 'farming_stamina', value: 0.08 }],
    shopPrice: 200,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 80
  },
  {
    id: 'bamboo_hat',
    name: 'Nón Lá',
    description: 'Nón lá đan bằng tre, che nắng che mưa, giảm tiêu hao thể lực.',
    effects: [{ type: 'stamina_reduction', value: 0.05 }],
    shopPrice: 300,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 120
  },

  // ===== Tier 2: 中级款（绸缎庄购买）=====
  {
    id: 'miner_helmet',
    name: 'Mũ Thợ Mỏ',
    description: 'Mũ da có gắn giá đỡ đèn, giảm mạnh thể lực khi thám hiểm mỏ.',
    effects: [{ type: 'mining_stamina', value: 0.12 }],
    shopPrice: 800,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 320
  },
  {
    id: 'fisher_hat',
    name: 'Mũ Ngư Phủ',
    description: 'Mũ vành rộng che nắng, giúp tập trung hơn khi câu cá.',
    effects: [
      { type: 'fishing_stamina', value: 0.1 },
      { type: 'fishing_calm', value: 0.05 }
    ],
    shopPrice: 800,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 320
  },

  // ===== Tier 3: 高级款（铁匠铺合成）=====
  {
    id: 'iron_helm',
    name: 'Mũ Sắt',
    description: 'Mũ bảo hiểm bằng sắt chắc chắn, tăng phòng ngự và giới hạn sinh lực.',
    effects: [
      { type: 'defense_bonus', value: 0.1 },
      { type: 'max_hp_bonus', value: 15 }
    ],
    shopPrice: null,
    recipe: [{ itemId: 'iron_bar', quantity: 5 }],
    recipeMoney: 1000,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 500
  },
  {
    id: 'scholar_hat',
    name: 'Mũ Văn Sĩ',
    description: 'Khăn vuông nho nhã của văn sĩ, tăng điểm kinh nghiệm nhận được.',
    effects: [{ type: 'exp_bonus', value: 0.1 }],
    shopPrice: null,
    recipe: [{ itemId: 'silk_cloth', quantity: 2 }],
    recipeMoney: 1500,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 600
  },
  {
    id: 'herbalist_hat',
    name: 'Mũ Dược Sư',
    description: 'Mũ vành rộng người hái thuốc thường đội, giảm thể lực làm nông và tăng chất lượng cây trồng.',
    effects: [
      { type: 'farming_stamina', value: 0.06 },
      { type: 'crop_quality_bonus', value: 0.05 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'herb', quantity: 10 },
      { itemId: 'silk_cloth', quantity: 1 }
    ],
    recipeMoney: 800,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 400
  },
  {
    id: 'merchant_hat',
    name: 'Mũ Thương Nhân',
    description: 'Mũ tròn bọc lụa, biểu tượng của thương nhân, tăng giá bán và giảm chi phí mua sắm.',
    effects: [
      { type: 'sell_price_bonus', value: 0.08 },
      { type: 'shop_discount', value: 0.05 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'silk_cloth', quantity: 2 }
    ],
    recipeMoney: 2500,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 1200
  },

  // ===== Tier 4: 顶级款（铁匠铺合成）=====
  {
    id: 'golden_crown',
    name: 'Mũ Vàng',
    description: 'Vương miện lấp lánh ánh vàng, tài vận hanh thông.',
    effects: [
      { type: 'luck', value: 0.1 },
      { type: 'sell_price_bonus', value: 0.08 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'gold_bar', quantity: 5 },
      { itemId: 'moonstone', quantity: 1 }
    ],
    recipeMoney: 3000,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 1500
  },
  {
    id: 'dragon_helm',
    name: 'Mũ Sừng Rồng',
    description: 'Mũ chiến khảm long ngọc, công thủ toàn diện.',
    effects: [
      { type: 'attack_bonus', value: 5 },
      { type: 'crit_rate_bonus', value: 0.05 },
      { type: 'defense_bonus', value: 0.08 }
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
    id: 'frost_hood',
    name: 'Mũ Trùm Sương Hàn',
    description: 'May từ da lông lột trên người Dơi Băng, tỏa ra hàn khí lạnh lẽo.',
    effects: [
      { type: 'defense_bonus', value: 0.05 },
      { type: 'stamina_reduction', value: 0.03 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rớt từ quái vật tầng Băng Giá',
    sellPrice: 150
  },
  {
    id: 'shadow_mask',
    name: 'Mặt Nạ Bóng Đêm',
    description: 'Mặt nạ do Kẻ Rình Rập Bóng Tối để lại, đeo vào có thể cảm nhận được điểm yếu của quái vật.',
    effects: [
      { type: 'monster_drop_bonus', value: 0.08 },
      { type: 'vampiric', value: 0.03 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rớt từ quái vật tầng Bóng Tối',
    sellPrice: 1000
  },
  {
    id: 'void_visor',
    name: 'Mặt Nạ Hư Không',
    description: 'Rèn từ vảy của Cự Mãng Vực Thẳm, chứa đựng sức mạnh của Vực Thẳm.',
    effects: [
      { type: 'attack_bonus', value: 4 },
      { type: 'defense_bonus', value: 0.06 },
      { type: 'crit_rate_bonus', value: 0.03 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rớt từ quái vật tầng Vực Thẳm',
    sellPrice: 1800
  },

  // ===== BOSS掉落 =====
  {
    id: 'golem_stone_cap',
    name: 'Mũ Thạch Ma',
    description: 'Khảm mảnh vỡ cốt lõi của Nê Thạch Ma, vô cùng cứng rắn.',
    effects: [
      { type: 'defense_bonus', value: 0.06 },
      { type: 'mining_stamina', value: 0.06 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Hạ gục BOSS Tầng 20 lần đầu',
    sellPrice: 300
  },
  {
    id: 'crystal_king_crown',
    name: 'Vương Miện Tinh Vương',
    description: 'Vương miện để lại sau khi Vua Pha Lê vỡ vụn, chứa đựng năng lượng tinh thể thuần khiết.',
    effects: [
      { type: 'exp_bonus', value: 0.08 },
      { type: 'luck', value: 0.06 },
      { type: 'crit_rate_bonus', value: 0.03 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Hạ gục BOSS Tầng 80 lần đầu',
    sellPrice: 1500
  },

  // ===== 宝箱掉落 =====
  {
    id: 'lucky_cap',
    name: 'Mũ Nhỏ May Mắn',
    description: 'Chiếc mũ nhỏ kỳ quặc tìm thấy trong rương báu, có vẻ mang lại may mắn.',
    effects: [
      { type: 'luck', value: 0.04 },
      { type: 'sell_price_bonus', value: 0.03 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rương báu hang mỏ',
    sellPrice: 250
  },

  // ===== 新增商店帽子（绸缎庄）=====
  {
    id: 'lotus_hat',
    name: 'Mũ Hoa Sen',
    description: 'Chiếc mũ thanh mát tết từ lá sen, giảm tiêu hao thể lực toàn diện.',
    effects: [{ type: 'stamina_reduction', value: 0.06 }],
    shopPrice: 500,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 200
  },
  {
    id: 'fur_cap',
    name: 'Mũ Lông Thú',
    description: 'Mũ lông thú mềm mại, cực kỳ hữu dụng trong hang mỏ.',
    effects: [
      { type: 'mining_stamina', value: 0.08 },
      { type: 'defense_bonus', value: 0.03 }
    ],
    shopPrice: 600,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 240
  },
  {
    id: 'silk_turban',
    name: 'Khăn Đội Đầu Tơ Lụa',
    description: 'Khăn trùm đầu tơ lụa hoa mỹ, tăng giá bán và độ thiện cảm khi tặng quà.',
    effects: [
      { type: 'sell_price_bonus', value: 0.05 },
      { type: 'gift_friendship', value: 0.08 }
    ],
    shopPrice: 1000,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Trang Viên Tơ Lụa',
    sellPrice: 400
  },

  // ===== 新增合成帽子（铁匠铺）=====
  {
    id: 'jade_hairpin',
    name: 'Trâm Phỉ Thúy',
    description: 'Trâm cài tóc mài từ phỉ thúy, giúp làm lụng đồng áng nhẹ nhàng hơn.',
    effects: [
      { type: 'crop_quality_bonus', value: 0.06 },
      { type: 'farming_stamina', value: 0.05 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'jade', quantity: 2 },
      { itemId: 'silk_cloth', quantity: 1 }
    ],
    recipeMoney: 600,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 300
  },
  {
    id: 'obsidian_helm',
    name: 'Mũ Hắc Diện',
    description: 'Mũ giáp nặng đúc từ đá hắc diện, lực phòng ngự cực mạnh.',
    effects: [
      { type: 'defense_bonus', value: 0.12 },
      { type: 'max_hp_bonus', value: 20 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'obsidian', quantity: 2 },
      { itemId: 'iron_bar', quantity: 3 }
    ],
    recipeMoney: 3000,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 1500
  },
  {
    id: 'phoenix_crown',
    name: 'Phượng Quán',
    description: 'Vương miện phượng lộng lẫy khảm long ngọc, mang lại vận may và ngộ tính.',
    effects: [
      { type: 'luck', value: 0.08 },
      { type: 'exp_bonus', value: 0.1 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'gold_bar', quantity: 5 },
      { itemId: 'dragon_jade', quantity: 1 }
    ],
    recipeMoney: 6000,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 3000
  },

  // ===== 新增BOSS掉落帽子 =====
  {
    id: 'frost_queen_tiara',
    name: 'Vương Miện Băng Hậu',
    description: 'Vương miện của Nữ Hoàng Băng Giá, chứa sức mạnh hàn băng, giúp tập trung cao độ khi câu cá.',
    effects: [
      { type: 'fishing_calm', value: 0.08 },
      { type: 'fishing_stamina', value: 0.08 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Hạ gục BOSS tầng 40 lần đầu',
    sellPrice: 500
  },
  {
    id: 'abyss_dragon_horns',
    name: 'Mũ Sừng Long Vương',
    description: 'Vương miện chiến binh làm từ sừng của Long Vương Vực Thẳm, chứa sức mạnh hủy diệt.',
    effects: [
      { type: 'attack_bonus', value: 8 },
      { type: 'defense_bonus', value: 0.1 },
      { type: 'vampiric', value: 0.05 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Hạ gục BOSS tầng 120 lần đầu',
    sellPrice: 5000
  },

  // ===== 新增怪物掉落帽子 =====
  {
    id: 'lava_helm',
    name: 'Mũ Trùm Dung Nham',
    description: 'Mũ trùm chịu nhiệt may từ màng cánh Dơi Lửa, chứa sức mạnh nóng bỏng.',
    effects: [
      { type: 'attack_bonus', value: 3 },
      { type: 'defense_bonus', value: 0.04 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Quái vật tầng Dung Nham rớt',
    sellPrice: 350
  },

  // ===== 新增宝箱掉落帽子 =====
  {
    id: 'treasure_cap',
    name: 'Mũ Đãi Vàng',
    description: 'Chiếc mũ kỳ lạ tìm thấy trong rương báu, dường như có khả năng thu hút nhiều bảo vật hơn.',
    effects: [
      { type: 'treasure_find', value: 0.05 },
      { type: 'ore_bonus', value: 1 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Rương báu hang mỏ',
    sellPrice: 400
  },

  // === 公会专属 ===
  {
    id: 'guild_war_helm',
    name: 'Mũ Chiến Công Hội',
    description: 'Mũ bảo hiểm chiến đấu của thành viên tinh anh Công hội Mạo Hiểm Giả, chắc chắn và uy nghiêm.',
    effects: [
      { type: 'attack_bonus', value: 3 },
      { type: 'max_hp_bonus', value: 15 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Cửa hàng Công hội',
    sellPrice: 800
  },
  // === 通商兑换 ===
  {
    id: 'trade_silk_robe',
    name: 'Trường Bào Tơ Lụa',
    description: 'Trường bào lộng lẫy dệt từ tơ lụa Tây Vực, mặc vào tinh thần sảng khoái.',
    effects: [
      { type: 'attack_bonus', value: 3 },
      { type: 'max_hp_bonus', value: 20 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Đổi bằng điểm thông thương',
    sellPrice: 750
  },
  // === 竹林野兽材料制作 ===
  {
    id: 'wolf_pelt_hood',
    name: 'Mũ Trùm Da Sói',
    description: 'Mũ trùm may từ da sói xám rừng trúc, giữ ấm tốt và có sức phòng ngự cao.',
    effects: [
      { type: 'defense_bonus', value: 0.08 },
      { type: 'max_hp_bonus', value: 10 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'wolf_pelt', quantity: 3 },
      { itemId: 'silk_cloth', quantity: 1 }
    ],
    recipeMoney: 800,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 400
  },
  {
    id: 'tiger_pelt_cape',
    name: 'Áo Choàng Da Hổ',
    description: 'Áo choàng may ghép từ da hổ và da gấu, công thủ toàn diện, khí thế áp đảo.',
    effects: [
      { type: 'attack_bonus', value: 5 },
      { type: 'defense_bonus', value: 0.06 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'tiger_pelt', quantity: 2 },
      { itemId: 'bear_pelt', quantity: 1 },
      { itemId: 'silk_cloth', quantity: 1 }
    ],
    recipeMoney: 2000,
    obtainSource: 'Ghép tại Tiệm Rèn',
    sellPrice: 900
  }
]

/** 根据ID获取帽子定义 */
export const getHatById = (id: string): HatDef | undefined => {
  return HATS.find(h => h.id === id)
}

/** 绸缎庄可购买的帽子 */
export const SHOP_HATS: HatDef[] = HATS.filter(h => h.shopPrice !== null)

/** 铁匠铺可合成的帽子 */
export const CRAFTABLE_HATS: HatDef[] = HATS.filter(h => h.recipe !== null)

/** 怪物掉落帽子（按矿洞区域） */
export const MONSTER_DROP_HATS: Record<string, { hatId: string; chance: number }[]> = {
  shallow: [],
  frost: [{ hatId: 'frost_hood', chance: 0.015 }],
  lava: [{ hatId: 'lava_helm', chance: 0.015 }],
  crystal: [],
  shadow: [{ hatId: 'shadow_mask', chance: 0.012 }],
  abyss: [{ hatId: 'void_visor', chance: 0.01 }]
}

/** BOSS首杀掉落帽子 */
export const BOSS_DROP_HATS: Record<number, string> = {
  20: 'golem_stone_cap',
  40: 'frost_queen_tiara',
  80: 'crystal_king_crown',
  120: 'abyss_dragon_horns'
}

/** 宝箱掉落帽子（按矿洞区域） */
export const TREASURE_DROP_HATS: Record<string, { hatId: string; chance: number }[]> = {
  shallow: [{ hatId: 'treasure_cap', chance: 0.05 }],
  frost: [{ hatId: 'treasure_cap', chance: 0.04 }],
  lava: [{ hatId: 'lucky_cap', chance: 0.05 }],
  crystal: [{ hatId: 'lucky_cap', chance: 0.04 }],
  shadow: [],
  abyss: []
}
