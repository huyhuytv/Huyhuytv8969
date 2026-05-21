import type { WeaponDef, EnchantmentDef, WeaponType } from '@/types'

/** 附魔定义 */
export const ENCHANTMENTS: Record<string, EnchantmentDef> = {
  sharp: {
    id: 'sharp',
    name: 'Sắc Bén',
    description: 'Lực tấn công +3',
    attackBonus: 3,
    critBonus: 0,
    special: null
  },
  fierce: {
    id: 'fierce',
    name: 'Nóng Bỏng',
    description: 'Lực tấn công +5',
    attackBonus: 5,
    critBonus: 0,
    special: null
  },
  precise: {
    id: 'precise',
    name: 'Chuẩn Xác',
    description: 'Tỷ lệ bạo kích +10%',
    attackBonus: 0,
    critBonus: 0.1,
    special: null
  },
  vampiric: {
    id: 'vampiric',
    name: 'Hút Máu',
    description: 'Hồi HP bằng 15% sát thương gây ra',
    attackBonus: 0,
    critBonus: 0,
    special: 'vampiric'
  },
  sturdy: {
    id: 'sturdy',
    name: 'Kiên Cường',
    description: 'Sát thương gánh chịu -15%',
    attackBonus: 0,
    critBonus: 0,
    special: 'sturdy'
  },
  lucky: {
    id: 'lucky',
    name: 'May Mắn',
    description: 'Tỷ lệ rớt đồ của quái +20%',
    attackBonus: 0,
    critBonus: 0,
    special: 'lucky'
  }
}

/** 可用于随机附魔của ID 列表 */
const RANDOM_ENCHANT_IDS = ['sharp', 'fierce', 'precise', 'vampiric', 'sturdy', 'lucky']

/** 随机获取一个附魔（30% 概率触发） */
export const rollRandomEnchantment = (): string | null => {
  if (Math.random() >= 0.3) return null
  return RANDOM_ENCHANT_IDS[Math.floor(Math.random() * RANDOM_ENCHANT_IDS.length)]!
}

/** 武器类型中文名 */
export const WEAPON_TYPE_NAMES: Record<WeaponType, string> = {
  sword: 'Kiếm',
  dagger: 'Dao Găm',
  club: 'Búa'
}

/** 所有武器定义 */
export const WEAPONS: Record<string, WeaponDef> = {
  // === 商店可购买 ===
  wooden_stick: {
    id: 'wooden_stick',
    name: 'Gậy Gỗ',
    type: 'club',
    attack: 5,
    critRate: 0.02,
    description: 'Gậy gỗ nhặt bừa, có còn hơn không.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  copper_sword: {
    id: 'copper_sword',
    name: 'Kiếm Đồng',
    type: 'sword',
    attack: 12,
    critRate: 0.05,
    description: 'Kiếm ngắn đúc bằng đồng, vũ khí nhập môn đáng tin cậy.',
    shopPrice: 300,
    shopMaterials: [{ itemId: 'copper_ore', quantity: 5 }],
    fixedEnchantment: null
  },
  iron_blade: {
    id: 'iron_blade',
    name: 'Đao Sắt',
    type: 'sword',
    attack: 18,
    critRate: 0.05,
    description: 'Trường đao rèn từ sắt tinh luyện, sắc bén và chắc chắn.',
    shopPrice: 800,
    shopMaterials: [{ itemId: 'iron_ore', quantity: 5 }],
    fixedEnchantment: null
  },
  war_hammer: {
    id: 'war_hammer',
    name: 'Búa Chiến',
    type: 'club',
    attack: 22,
    critRate: 0.03,
    description: 'Búa sắt nặng nề, một đập nát đá.',
    shopPrice: 1200,
    shopMaterials: [{ itemId: 'iron_ore', quantity: 8 }],
    fixedEnchantment: null
  },
  gold_halberd: {
    id: 'gold_halberd',
    name: 'Kích Vàng',
    type: 'sword',
    attack: 28,
    critRate: 0.08,
    description: 'Trường kích lấp lánh ánh vàng, uy lực phi phàm.',
    shopPrice: 2500,
    shopMaterials: [{ itemId: 'gold_ore', quantity: 8 }],
    fixedEnchantment: null
  },
  // === 怪物掉落 ===
  bone_dagger: {
    id: 'bone_dagger',
    name: 'Dao Găm Xương',
    type: 'dagger',
    attack: 9,
    critRate: 0.15,
    description: 'Dao găm mài từ xương quái vật, sắc bén vô cùng.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  frost_dagger: {
    id: 'frost_dagger',
    name: 'Dao Găm Băng',
    type: 'dagger',
    attack: 16,
    critRate: 0.18,
    description: 'Dao găm ngưng tụ từ hàn băng, chạm vào lạnh thấu xương.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  shadow_blade: {
    id: 'shadow_blade',
    name: 'Lưỡi Dao Bóng Tối',
    type: 'dagger',
    attack: 24,
    critRate: 0.22,
    description: 'Lưỡi dao ngưng tụ từ bóng tối, giết người vô hình.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  // === BOSS 掉落（固定附魔） ===
  mud_king_fang: {
    id: 'mud_king_fang',
    name: 'Nanh Vua Bùn',
    type: 'sword',
    attack: 20,
    critRate: 0.12,
    description: 'Đúc từ răng nanh của cự thú bùn đá, đoạt mạng hút máu.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'vampiric'
  },
  frost_queen_sting: {
    id: 'frost_queen_sting',
    name: 'Gai Băng',
    type: 'dagger',
    attack: 19,
    critRate: 0.25,
    description: 'Gai nhọn do Nữ hoàng Băng Giá để lại, bách phát bách trúng.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'precise'
  },
  lava_lord_maul: {
    id: 'lava_lord_maul',
    name: 'Búa Dung Nham',
    type: 'club',
    attack: 38,
    critRate: 0.08,
    description: 'Quyền trượng của Chúa tể Dung Nham, nóng bỏng như lửa.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'fierce'
  },
  // === 新区域怪物掉落 ===
  crystal_shard_dagger: {
    id: 'crystal_shard_dagger',
    name: 'Dao Găm Gai Pha Lê',
    type: 'dagger',
    attack: 30,
    critRate: 0.2,
    description: 'Dao găm sắc bén ngưng tụ từ mảnh pha lê.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  shadow_katana: {
    id: 'shadow_katana',
    name: 'Thái Đao Bóng Tối',
    type: 'sword',
    attack: 35,
    critRate: 0.1,
    description: 'Thái đao trồi lên từ khe nứt bóng tối, chém đứt ánh sáng.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  void_hammer: {
    id: 'void_hammer',
    name: 'Búa Chiến Hư Không',
    type: 'club',
    attack: 48,
    critRate: 0.05,
    description: 'Búa chiến chứa đầy sức mạnh vực thẳm, nặng tựa ngàn cân.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  // === 新区域商店武器 ===
  crystal_blade: {
    id: 'crystal_blade',
    name: 'Trường Kiếm Pha Lê',
    type: 'sword',
    attack: 35,
    critRate: 0.08,
    description: 'Trường kiếm đúc từ quặng pha lê, khúc xạ ánh sáng thất sắc.',
    shopPrice: 5000,
    shopMaterials: [{ itemId: 'crystal_ore', quantity: 8 }],
    fixedEnchantment: null
  },
  shadow_mace: {
    id: 'shadow_mace',
    name: 'Búa Bóng Tối',
    type: 'club',
    attack: 42,
    critRate: 0.05,
    description: 'Trọng búa rèn từ quặng bóng tối, một đập hạ địch.',
    shopPrice: 8000,
    shopMaterials: [{ itemId: 'shadow_ore', quantity: 8 }],
    fixedEnchantment: null
  },
  void_katana: {
    id: 'void_katana',
    name: 'Thái Đao Hư Không',
    type: 'sword',
    attack: 52,
    critRate: 0.1,
    description: 'Thái đao cực phẩm tôi luyện từ quặng hư không, trảm thiên liệt địa.',
    shopPrice: 15000,
    shopMaterials: [{ itemId: 'void_ore', quantity: 10 }],
    fixedEnchantment: null
  },
  // === 新区域BOSS掉落（固定附魔） ===
  crystal_king_blade: {
    id: 'crystal_king_blade',
    name: 'Thánh Kiếm Vua Pha Lê',
    type: 'sword',
    attack: 45,
    critRate: 0.15,
    description: 'Thánh kiếm Vua Pha Lê để lại, ánh sáng may mắn bao quanh.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'lucky'
  },
  shadow_sovereign_fang: {
    id: 'shadow_sovereign_fang',
    name: 'Nanh Bóng Tối',
    type: 'dagger',
    attack: 38,
    critRate: 0.3,
    description: 'Đúc từ răng của Chúa tể Bóng Tối, uống máu không ngừng.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'vampiric'
  },
  abyss_dragon_mace: {
    id: 'abyss_dragon_mace',
    name: 'Quyền Trượng Long Vương',
    type: 'club',
    attack: 60,
    critRate: 0.12,
    description: 'Quyền trượng của Long Vương Vực Thẳm, thiêu rụi vạn vật.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'fierce'
  },

  // === 新增商店武器 ===
  bamboo_staff: {
    id: 'bamboo_staff',
    name: 'Gậy Trúc',
    type: 'club',
    attack: 10,
    critRate: 0.03,
    description: 'Gậy dài vót từ trúc dẻo dai, nhẹ nhàng vừa tay.',
    shopPrice: 400,
    shopMaterials: [{ itemId: 'bamboo', quantity: 5 }],
    fixedEnchantment: null
  },
  iron_dagger: {
    id: 'iron_dagger',
    name: 'Dao Găm Sắt',
    type: 'dagger',
    attack: 14,
    critRate: 0.15,
    description: 'Dao găm ngắn mài từ tinh thiết, xuất chiêu cực nhanh.',
    shopPrice: 600,
    shopMaterials: [{ itemId: 'iron_ore', quantity: 3 }],
    fixedEnchantment: null
  },
  golden_fan: {
    id: 'golden_fan',
    name: 'Quạt Vàng',
    type: 'sword',
    attack: 26,
    critRate: 0.1,
    description: 'Quạt xương sắt nạm vàng, xòe ra như dao, gập lại như gậy.',
    shopPrice: 2000,
    shopMaterials: [{ itemId: 'gold_ore', quantity: 5 }],
    fixedEnchantment: null
  },
  obsidian_blade: {
    id: 'obsidian_blade',
    name: 'Đao Hắc Diện',
    type: 'sword',
    attack: 38,
    critRate: 0.08,
    description: 'Loan đao rèn từ hắc diện thạch, lưỡi đao chém sắt như bùn.',
    shopPrice: 4000,
    shopMaterials: [{ itemId: 'shadow_ore', quantity: 5 }],
    fixedEnchantment: null
  },

  // === 新增怪物掉落武器 ===
  slime_mace: {
    id: 'slime_mace',
    name: 'Búa Chất Nhầy',
    type: 'club',
    attack: 7,
    critRate: 0.02,
    description: 'Lõi chất nhầy đông đặc, nặng nề ngoài ý muốn.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  magma_blade: {
    id: 'magma_blade',
    name: 'Dao Dung Nham',
    type: 'sword',
    attack: 21,
    critRate: 0.08,
    description: 'Dao ngắn ngưng tụ từ dung nham, vẫn còn tỏa nhiệt.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  prism_dagger: {
    id: 'prism_dagger',
    name: 'Dao Găm Lăng Kính',
    type: 'dagger',
    attack: 28,
    critRate: 0.22,
    description: 'Dao găm sắc bén hình thành tự nhiên từ mảnh pha lê.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  void_fang_dagger: {
    id: 'void_fang_dagger',
    name: 'Nanh Hư Không',
    type: 'dagger',
    attack: 42,
    critRate: 0.25,
    description: 'Răng độc của Cự Mãng Vực Thẳm, chứa sức mạnh ăn mòn.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },

  // === 新增宝箱掉落武器 ===
  jade_sword: {
    id: 'jade_sword',
    name: 'Trường Kiếm Phỉ Thúy',
    type: 'sword',
    attack: 22,
    critRate: 0.1,
    description: 'Cổ kiếm chìm vào giấc ngủ trong rương báu, ánh xanh lưu chuyển.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  ancient_blade: {
    id: 'ancient_blade',
    name: 'Cổ Thần Kiếm',
    type: 'sword',
    attack: 50,
    critRate: 0.15,
    description: 'Trường kiếm bí ẩn phát hiện trong di tích viễn cổ, uy năng không giảm.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },

  // === 公会专属 ===
  guild_war_blade: {
    id: 'guild_war_blade',
    name: 'Chiến Nhẫn Công Hội',
    type: 'sword',
    attack: 36,
    critRate: 0.1,
    description: 'Bội kiếm do Công hội Mạo Hiểm Giả rèn cho thành viên tinh anh, thân kiếm khắc huy hiệu công hội.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },

  // === 通商兑换 ===
  trade_desert_blade: {
    id: 'trade_desert_blade',
    name: 'Loan Đao Sa Mạc',
    type: 'sword',
    attack: 40,
    critRate: 0.08,
    description: 'Loan đao rèn ở Tây Vực, lưỡi cong như trăng khuyết, sắc bén vô cùng.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  }
}
export const SHOP_WEAPONS: WeaponDef[] = Object.values(WEAPONS).filter(w => w.shopPrice !== null)

/** 各区域怪物可掉落của武器 ID */
export const MONSTER_DROP_WEAPONS: Record<string, { weaponId: string; chance: number }[]> = {
  shallow: [
    { weaponId: 'bone_dagger', chance: 0.05 },
    { weaponId: 'slime_mace', chance: 0.03 }
  ],
  frost: [{ weaponId: 'frost_dagger', chance: 0.05 }],
  lava: [
    { weaponId: 'shadow_blade', chance: 0.05 },
    { weaponId: 'magma_blade', chance: 0.04 }
  ],
  crystal: [
    { weaponId: 'crystal_shard_dagger', chance: 0.05 },
    { weaponId: 'prism_dagger', chance: 0.04 }
  ],
  shadow: [{ weaponId: 'shadow_katana', chance: 0.05 }],
  abyss: [
    { weaponId: 'void_hammer', chance: 0.05 },
    { weaponId: 'void_fang_dagger', chance: 0.03 }
  ]
}

/** BOSS 掉落武器映射 */
export const BOSS_DROP_WEAPONS: Record<number, string> = {
  20: 'mud_king_fang',
  40: 'frost_queen_sting',
  60: 'lava_lord_maul',
  80: 'crystal_king_blade',
  100: 'shadow_sovereign_fang',
  120: 'abyss_dragon_mace'
}

/** 根据 ID 获取武器定义 */
export const getWeaponById = (id: string): WeaponDef | undefined => {
  return WEAPONS[id]
}

/** 根据 ID 获取附魔定义 */
export const getEnchantmentById = (id: string): EnchantmentDef | undefined => {
  return ENCHANTMENTS[id]
}

/** 计算武器卖出价格 */
export const getWeaponSellPrice = (defId: string, enchantmentId: string | null): number => {
  const def = WEAPONS[defId]
  if (!def) return 0
  const base = def.shopPrice ? Math.floor(def.shopPrice * 0.5) : def.attack * 15
  // 附魔额外加价
  if (enchantmentId) {
    const enchant = ENCHANTMENTS[enchantmentId]
    if (enchant) return base + 100 + enchant.attackBonus * 20
  }
  return base
}

/** 获取附魔武器của显示名称 */
export const getWeaponDisplayName = (defId: string, enchantmentId: string | null): string => {
  const weapon = WEAPONS[defId]
  if (!weapon) return defId
  if (!enchantmentId) return weapon.name
  const enchant = ENCHANTMENTS[enchantmentId]
  if (!enchant) return weapon.name
  return `${enchant.name}của${weapon.name}`
}

/** 宝箱掉落武器（按矿洞区域） */
export const TREASURE_DROP_WEAPONS: Record<string, { weaponId: string; chance: number }[]> = {
  shallow: [],
  frost: [{ weaponId: 'jade_sword', chance: 0.05 }],
  lava: [{ weaponId: 'jade_sword', chance: 0.04 }],
  crystal: [],
  shadow: [{ weaponId: 'ancient_blade', chance: 0.03 }],
  abyss: [{ weaponId: 'ancient_blade', chance: 0.025 }]
}
