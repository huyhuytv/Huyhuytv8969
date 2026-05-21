import type { SeedGenetics, HybridDef, SeedStarRating } from '@/types/breeding'
import type { Quality } from '@/types'
import { getCropById } from './crops'

// === 常量 ===

/** 种子箱基础容量 */
export const BASE_BREEDING_BOX = 30

/** 种子箱升级定义 */
export const SEED_BOX_UPGRADES = [
  {
    level: 1,
    cost: 5000,
    materials: [
      { itemId: 'wood', quantity: 50 },
      { itemId: 'copper_bar', quantity: 5 }
    ]
  },
  {
    level: 2,
    cost: 15000,
    materials: [
      { itemId: 'iron_bar', quantity: 8 },
      { itemId: 'pine_resin', quantity: 10 }
    ]
  },
  {
    level: 3,
    cost: 30000,
    materials: [
      { itemId: 'gold_bar', quantity: 5 },
      { itemId: 'cloth', quantity: 3 },
      { itemId: 'wood', quantity: 100 }
    ]
  },
  {
    level: 4,
    cost: 50000,
    materials: [
      { itemId: 'gold_bar', quantity: 10 },
      { itemId: 'silk_cloth', quantity: 5 },
      { itemId: 'battery', quantity: 3 }
    ]
  },
  {
    level: 5,
    cost: 80000,
    materials: [
      { itemId: 'iridium_bar', quantity: 5 },
      { itemId: 'dream_silk', quantity: 3 },
      { itemId: 'moon_herb', quantity: 5 }
    ]
  }
]

/** 每级种子箱容量增量 */
export const SEED_BOX_UPGRADE_INCREMENT = 15

/** @deprecated 使用 useBreedingStore().maxSeedBox 代替 */
export const MAX_BREEDING_BOX = 30

/** 育种加工天数 */
export const BREEDING_DAYS = 2

/** 属性上限 */
export const STAT_CAP = 100

/** 基础波动幅度 */
export const BASE_MUTATION_MAGNITUDE = 8

/** 每代稳定度增长 */
export const GENERATIONAL_STABILITY_GAIN = 3

/** 稳定度上限 */
export const MAX_STABILITY = 95

/** 变异时属性跳动范围 */
export const MUTATION_JUMP_MIN = 15
export const MUTATION_JUMP_MAX = 30

/** 变异时变异率自身浮动 */
export const MUTATION_RATE_DRIFT = 5

/** 变异正向概率（增加方向） */
export const MUTATION_POSITIVE_CHANCE = 0.6

/** 收获育种作物时按品质返还种子的概率 */
export const SEED_RETURN_CHANCE: Record<Quality, number> = {
  normal: 0.5,
  fine: 0.7,
  excellent: 0.9,
  supreme: 1.0
}

/** 判断收获时是否返还育种种子 */
export const shouldReturnBreedingSeed = (quality: Quality): boolean => {
  return Math.random() < (SEED_RETURN_CHANCE[quality] ?? 0)
}

/** 育种台制造费用 */
export const BREEDING_STATION_COST = {
  money: 100000,
  materials: [
    { itemId: 'wood', quantity: 30 },
    { itemId: 'iron_ore', quantity: 10 },
    { itemId: 'gold_ore', quantity: 3 }
  ]
}

/** 育种台最大数量 */
export const MAX_BREEDING_STATIONS = 3

// === 辅助函数 ===

let _nextGeneticsId = 1

/** 生成唯一基因ID */
export const generateGeneticsId = (): string => {
  return `gen_${Date.now()}_${_nextGeneticsId++}`
}

/** 限制属性值在 0-100 */
export const clampStat = (value: number): number => {
  return Math.max(0, Math.min(STAT_CAP, Math.round(value)))
}

/** 限制变异率在 1-50 */
export const clampMutationRate = (value: number): number => {
  return Math.max(1, Math.min(50, Math.round(value)))
}

/** 根据作物ID计算默认基因属性 */
export const getDefaultGenetics = (cropId: string): Omit<SeedGenetics, 'id'> => {
  const crop = getCropById(cropId)
  if (!crop) {
    return {
      cropId,
      generation: 0,
      sweetness: 20,
      yield: 20,
      resistance: 20,
      stability: 50,
      mutationRate: 10,
      parentA: null,
      parentB: null,
      isHybrid: false,
      hybridId: null
    }
  }

  // 贵/慢的作物属性更高
  const priceScore = Math.min(crop.sellPrice / 350, 1) // 350 = Giá bán sen tuyết
  const growthScore = Math.min(crop.growthDays / 12, 1) // 12 = Những ngày sen tuyết phát triển

  const baseSweetness = clampStat(15 + Math.round(priceScore * 40))
  const baseYield = clampStat(15 + Math.round(growthScore * 35))
  const baseResistance = clampStat(10 + Math.round((priceScore + growthScore) * 15))

  return {
    cropId,
    generation: 0,
    sweetness: baseSweetness,
    yield: baseYield,
    resistance: baseResistance,
    stability: 50,
    mutationRate: 10,
    parentA: null,
    parentB: null,
    isHybrid: false,
    hybridId: null
  }
}

/** 计算总属性 */
export const getTotalStats = (g: SeedGenetics): number => {
  return g.sweetness + g.yield + g.resistance
}

/** 获取星级评分 */
export const getStarRating = (g: SeedGenetics): SeedStarRating => {
  const total = getTotalStats(g)
  if (total >= 250) return 5
  if (total >= 200) return 4
  if (total >= 150) return 3
  if (total >= 100) return 2
  return 1
}

/** 生成种子显示标签 */
export const makeSeedLabel = (g: SeedGenetics): string => {
  const crop = getCropById(g.cropId)
  const name = crop?.name ?? g.cropId
  return `${name} G${g.generation}`
}

// === 杂交配方 ===

export const HYBRID_DEFS: HybridDef[] = [
  {
    id: 'golden_melon',
    name: 'Dưa Kim Mật',
    parentCropA: 'watermelon',
    parentCropB: 'lotus_root',
    minSweetness: 60,
    minYield: 50,
    resultCropId: 'golden_melon',
    baseGenetics: { sweetness: 70, yield: 60, resistance: 50 },
    discoveryText: 'Sự ngọt ngào của dưa hấu và độ thanh mát của củ sen hòa quyện hoàn hảo, sinh ra Dưa Kim Mật trong truyền thuyết!'
  },
  {
    id: 'jade_tea',
    name: 'Trà Phỉ Thúy',
    parentCropA: 'tea',
    parentCropB: 'chrysanthemum',
    minSweetness: 50,
    minYield: 45,
    resultCropId: 'jade_tea',
    baseGenetics: { sweetness: 60, yield: 55, resistance: 55 },
    discoveryText: 'Độ ngọt dịu của lá trà và sự thanh nhã của hoa cúc giao thoa, nước Trà Phỉ Thúy lấp lánh ánh xanh biếc!'
  },
  {
    id: 'phoenix_pepper',
    name: 'Ớt Phượng Hoàng',
    parentCropA: 'chili',
    parentCropB: 'pumpkin',
    minSweetness: 40,
    minYield: 55,
    resultCropId: 'phoenix_pepper',
    baseGenetics: { sweetness: 50, yield: 65, resistance: 60 },
    discoveryText: 'Sức nóng của ớt và độ bùi của bí đỏ va chạm, Ớt Phượng Hoàng rực rỡ như ngọn lửa bùng cháy!'
  },
  {
    id: 'moonlight_rice',
    name: 'Lúa Nguyệt Quang',
    parentCropA: 'rice',
    parentCropB: 'bamboo_shoot',
    minSweetness: 45,
    minYield: 60,
    resultCropId: 'moonlight_rice',
    baseGenetics: { sweetness: 55, yield: 70, resistance: 45 },
    discoveryText: 'Sự mộc mạc của lúa gạo và linh khí của măng xuân hòa quyện, Lúa Nguyệt Quang tỏa ánh bạc dưới trăng!'
  },
  {
    id: 'frost_garlic',
    name: 'Tỏi Sương Tuyết',
    parentCropA: 'snow_lotus',
    parentCropB: 'garlic',
    minSweetness: 55,
    minYield: 40,
    resultCropId: 'frost_garlic',
    baseGenetics: { sweetness: 65, yield: 50, resistance: 70 },
    discoveryText: 'Sự thuần khiết của tuyết liên và độ cay nồng của tỏi dung hợp, Tỏi Sương Tuyết tỏa ra hàn khí lạnh lẽo như sương giá!'
  },
  {
    id: 'emerald_radish',
    name: 'Củ Cải Phỉ Thúy',
    parentCropA: 'cabbage',
    parentCropB: 'radish',
    minSweetness: 30,
    minYield: 30,
    resultCropId: 'emerald_radish',
    baseGenetics: { sweetness: 40, yield: 35, resistance: 30 },
    discoveryText: 'Sự dung hợp giữa độ giòn của cải xanh và vị ngọt của củ cải, phần củ như ngọc phỉ thúy lấp lánh tỏa sáng.'
  },
  {
    id: 'jade_shoot',
    name: 'Mầm Ngọc Trúc',
    parentCropA: 'bamboo_shoot',
    parentCropB: 'tea',
    minSweetness: 35,
    minYield: 30,
    resultCropId: 'jade_shoot',
    baseGenetics: { sweetness: 45, yield: 40, resistance: 35 },
    discoveryText: 'Sự giao hòa giữa độ tươi non của măng xuân và hương thơm của lá trà, như ngọc như trúc.'
  },
  {
    id: 'golden_tuber',
    name: 'Khoai Mỡ Vàng',
    parentCropA: 'potato',
    parentCropB: 'rapeseed',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'golden_tuber',
    baseGenetics: { sweetness: 35, yield: 45, resistance: 30 },
    discoveryText: 'Khoai tây tròn trịa đan xen màu vàng của cải dầu, toàn thân màu vàng kim.'
  },
  {
    id: 'peach_blossom_tea',
    name: 'Trà Hoa Đào',
    parentCropA: 'peach',
    parentCropB: 'tea',
    minSweetness: 45,
    minYield: 35,
    resultCropId: 'peach_blossom_tea',
    baseGenetics: { sweetness: 55, yield: 45, resistance: 40 },
    discoveryText: 'Sự quyến rũ của hoa đào kết hợp với sự tao nhã của hương trà, cánh hoa tựa hồ điệp.'
  },
  {
    id: 'ruby_bean',
    name: 'Đậu Hồng Ngọc',
    parentCropA: 'broad_bean',
    parentCropB: 'peach',
    minSweetness: 35,
    minYield: 30,
    resultCropId: 'ruby_bean',
    baseGenetics: { sweetness: 45, yield: 40, resistance: 35 },
    discoveryText: 'Đậu tằm căng mọng kết hợp với màu hồng đào, từng hạt như viên hồng ngọc.'
  },
  {
    id: 'twin_bean',
    name: 'Đậu Song Tử',
    parentCropA: 'broad_bean',
    parentCropB: 'rapeseed',
    minSweetness: 25,
    minYield: 30,
    resultCropId: 'twin_bean',
    baseGenetics: { sweetness: 35, yield: 40, resistance: 30 },
    discoveryText: 'Sự kết duyên của đậu tằm và cải dầu, mỗi vỏ đều có hạt sinh đôi như anh em ruột.'
  },
  {
    id: 'jade_melon',
    name: 'Dưa Bích Ngọc',
    parentCropA: 'watermelon',
    parentCropB: 'potato',
    minSweetness: 40,
    minYield: 35,
    resultCropId: 'jade_melon',
    baseGenetics: { sweetness: 50, yield: 45, resistance: 35 },
    discoveryText: 'Dưa hấu mọng nước va chạm với độ bùi của khoai tây, ruột quả xanh mướt như ngọc.'
  },
  {
    id: 'pearl_grain',
    name: 'Lúa Trân Châu',
    parentCropA: 'rice',
    parentCropB: 'tea',
    minSweetness: 40,
    minYield: 40,
    resultCropId: 'pearl_grain',
    baseGenetics: { sweetness: 50, yield: 50, resistance: 40 },
    discoveryText: 'Sự mộc mạc của lúa gạo hòa quyện cùng sự thanh nhã của lá trà, hạt gạo trong trẻo như trân châu.'
  },
  {
    id: 'golden_corn',
    name: 'Ngô Bông Vàng',
    parentCropA: 'corn',
    parentCropB: 'rapeseed',
    minSweetness: 35,
    minYield: 40,
    resultCropId: 'golden_corn',
    baseGenetics: { sweetness: 40, yield: 55, resistance: 35 },
    discoveryText: 'Sự sung túc của ngô giao thoa với màu vàng của cải dầu, từng bắp vàng ươm.'
  },
  {
    id: 'lotus_tea',
    name: 'Trà Liên Tâm',
    parentCropA: 'lotus_root',
    parentCropB: 'tea',
    minSweetness: 45,
    minYield: 40,
    resultCropId: 'lotus_tea',
    baseGenetics: { sweetness: 55, yield: 50, resistance: 45 },
    discoveryText: 'Sự thanh mát của củ sen cộng hưởng với hương thơm của lá trà, tựa hoa sen nở trong chén.'
  },
  {
    id: 'purple_bamboo',
    name: 'Cà Tử Trúc',
    parentCropA: 'bamboo_shoot',
    parentCropB: 'eggplant',
    minSweetness: 35,
    minYield: 35,
    resultCropId: 'purple_bamboo',
    baseGenetics: { sweetness: 40, yield: 45, resistance: 40 },
    discoveryText: 'Sự thẳng tắp của măng xuân hợp nhất với sắc tím của cà tím, quả có hình dáng đốt trúc màu tím.'
  },
  {
    id: 'honey_peach_melon',
    name: 'Dưa Mật Đào',
    parentCropA: 'peach',
    parentCropB: 'watermelon',
    minSweetness: 45,
    minYield: 35,
    resultCropId: 'honey_peach_melon',
    baseGenetics: { sweetness: 55, yield: 45, resistance: 35 },
    discoveryText: 'Hương vị ngọt ngào của quả đào hòa quyện với sự thanh mát của dưa hấu, cắn một miếng mật ngọt trào ra.'
  },
  {
    id: 'fire_bean',
    name: 'Đậu Lửa',
    parentCropA: 'broad_bean',
    parentCropB: 'chili',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'fire_bean',
    baseGenetics: { sweetness: 35, yield: 45, resistance: 40 },
    discoveryText: 'Sự căng mọng của đậu tằm bọc trong ngọn lửa của ớt, cay nồng mang theo hương thơm.'
  },
  {
    id: 'silk_bean',
    name: 'Đậu Tơ',
    parentCropA: 'green_bean',
    parentCropB: 'loofah',
    minSweetness: 30,
    minYield: 30,
    resultCropId: 'silk_bean',
    baseGenetics: { sweetness: 35, yield: 40, resistance: 35 },
    discoveryText: 'Độ giòn của đậu đũa kết hợp với sự trơn trượt của mướp, cảm giác nhai mềm mượt như tơ.'
  },
  {
    id: 'double_oil_seed',
    name: 'Hạt Song Dầu',
    parentCropA: 'rapeseed',
    parentCropB: 'sesame',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'double_oil_seed',
    baseGenetics: { sweetness: 35, yield: 45, resistance: 30 },
    discoveryText: 'Hương vị đậm đà nhân đôi của cải dầu và hạt mè, tỷ lệ ép ra dầu cực kỳ cao.'
  },
  {
    id: 'lotus_potato',
    name: 'Khoai Sen',
    parentCropA: 'potato',
    parentCropB: 'lotus_seed',
    minSweetness: 40,
    minYield: 35,
    resultCropId: 'lotus_potato',
    baseGenetics: { sweetness: 45, yield: 45, resistance: 40 },
    discoveryText: 'Tinh bột của khoai tây kết hợp với vị ngọt thanh của hạt sen, cảm giác nhai xốp mịn.'
  },
  {
    id: 'jade_pumpkin',
    name: 'Bí Đỏ Phỉ Thúy',
    parentCropA: 'potato',
    parentCropB: 'pumpkin',
    minSweetness: 40,
    minYield: 40,
    resultCropId: 'jade_pumpkin',
    baseGenetics: { sweetness: 50, yield: 50, resistance: 40 },
    discoveryText: 'Sự mộc mạc của khoai tây hòa quyện với màu vàng của bí đỏ, vỏ ngoài xanh biếc bên trong vàng óng.'
  },
  {
    id: 'crystal_yam',
    name: 'Hoài Sơn Pha Lê',
    parentCropA: 'bamboo_shoot',
    parentCropB: 'yam',
    minSweetness: 40,
    minYield: 40,
    resultCropId: 'crystal_yam',
    baseGenetics: { sweetness: 50, yield: 50, resistance: 45 },
    discoveryText: 'Sự giòn non của măng xuân hợp nhất với tính bồi bổ của hoài sơn, toàn thân trong suốt.'
  },
  {
    id: 'osmanthus_tea',
    name: 'Trà Hoa Quế',
    parentCropA: 'tea',
    parentCropB: 'osmanthus',
    minSweetness: 50,
    minYield: 40,
    resultCropId: 'osmanthus_tea',
    baseGenetics: { sweetness: 60, yield: 50, resistance: 50 },
    discoveryText: 'Sự kết hợp hoàn hảo giữa vị đậm đà của lá trà và hương thơm của hoa quế, thơm ngát cả phòng.'
  },
  {
    id: 'mountain_bamboo',
    name: 'Khoai Sơn Trúc',
    parentCropA: 'bamboo_shoot',
    parentCropB: 'sweet_potato',
    minSweetness: 35,
    minYield: 35,
    resultCropId: 'mountain_bamboo',
    baseGenetics: { sweetness: 40, yield: 45, resistance: 35 },
    discoveryText: 'Sự thanh mát của măng xuân va chạm với độ dẻo ngọt của khoai lang, món ngon chốn núi rừng.'
  },
  {
    id: 'golden_fruit',
    name: 'Quả Kim Thu',
    parentCropA: 'peach',
    parentCropB: 'persimmon',
    minSweetness: 45,
    minYield: 40,
    resultCropId: 'golden_fruit',
    baseGenetics: { sweetness: 55, yield: 50, resistance: 40 },
    discoveryText: 'Vị ngọt của quả đào và độ dẻo của quả hồng hòa quyện hoàn hảo, quả vàng ươm trĩu nặng cành.'
  },
  {
    id: 'nut_potato',
    name: 'Khoai Đậu Phộng',
    parentCropA: 'potato',
    parentCropB: 'peanut',
    minSweetness: 35,
    minYield: 40,
    resultCropId: 'nut_potato',
    baseGenetics: { sweetness: 40, yield: 50, resistance: 35 },
    discoveryText: 'Sự xốp mịn của khoai tây kết hợp với độ giòn của đậu phộng, càng nhai càng thơm.'
  },
  {
    id: 'autumn_bean',
    name: 'Đậu Táo Thu',
    parentCropA: 'broad_bean',
    parentCropB: 'jujube',
    minSweetness: 35,
    minYield: 35,
    resultCropId: 'autumn_bean',
    baseGenetics: { sweetness: 45, yield: 40, resistance: 40 },
    discoveryText: 'Sự kết duyên của đậu tằm và táo đỏ, trong hạt đậu có hương táo.'
  },
  {
    id: 'jujube_blossom',
    name: 'Đào Táo Hoa',
    parentCropA: 'peach',
    parentCropB: 'jujube',
    minSweetness: 45,
    minYield: 35,
    resultCropId: 'jujube_blossom',
    baseGenetics: { sweetness: 55, yield: 45, resistance: 40 },
    discoveryText: 'Sự hồng hào của hoa đào cùng nở rộ với sự mộc mạc của hoa táo, quả vô cùng ngọt ngào.'
  },
  {
    id: 'ginger_blossom',
    name: 'Cải Hoa Gừng',
    parentCropA: 'rapeseed',
    parentCropB: 'ginger',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'ginger_blossom',
    baseGenetics: { sweetness: 40, yield: 40, resistance: 40 },
    discoveryText: 'Sự non mềm của cải dầu hòa quyện với vị cay của gừng, hoa nở tựa hồ điệp.'
  },
  {
    id: 'fairy_chrysanthemum',
    name: 'Cải Tiên Cúc',
    parentCropA: 'cabbage',
    parentCropB: 'chrysanthemum',
    minSweetness: 35,
    minYield: 30,
    resultCropId: 'fairy_chrysanthemum',
    baseGenetics: { sweetness: 45, yield: 40, resistance: 40 },
    discoveryText: 'Sự bình dị của cải xanh dung hợp với sự thanh cao của hoa cúc, viền lá như cánh cúc.'
  },
  {
    id: 'imperial_cabbage',
    name: 'Ngự Phẩm Cải Thảo',
    parentCropA: 'cabbage',
    parentCropB: 'napa_cabbage',
    minSweetness: 25,
    minYield: 30,
    resultCropId: 'imperial_cabbage',
    baseGenetics: { sweetness: 35, yield: 40, resistance: 35 },
    discoveryText: 'Cuộc hôn nhân hoàng gia giữa cải xanh và cải thảo, lá non vị tươi ngọt.'
  },
  {
    id: 'spicy_radish',
    name: 'Củ Cải Hương Tỏi',
    parentCropA: 'radish',
    parentCropB: 'garlic',
    minSweetness: 30,
    minYield: 30,
    resultCropId: 'spicy_radish',
    baseGenetics: { sweetness: 35, yield: 40, resistance: 35 },
    discoveryText: 'Sự giòn ngọt của củ cải đan xen với vị cay nồng của tỏi, phong vị độc đáo.'
  },
  {
    id: 'snow_tea',
    name: 'Trà Tuyết',
    parentCropA: 'tea',
    parentCropB: 'snow_lotus',
    minSweetness: 55,
    minYield: 45,
    resultCropId: 'snow_tea',
    baseGenetics: { sweetness: 65, yield: 55, resistance: 55 },
    discoveryText: 'Sự dung hợp cực phẩm giữa lá trà và tuyết liên, nước trà trắng tinh như tuyết.'
  },
  {
    id: 'spring_chive',
    name: 'Hẹ Xuân',
    parentCropA: 'cabbage',
    parentCropB: 'chives',
    minSweetness: 25,
    minYield: 30,
    resultCropId: 'spring_chive',
    baseGenetics: { sweetness: 30, yield: 40, resistance: 30 },
    discoveryText: 'Sự ôn hòa của cải xanh hợp nhất với vị nồng của hẹ, có thể trồng quanh năm.'
  },
  {
    id: 'wheat_potato',
    name: 'Khoai Hương Mạch',
    parentCropA: 'potato',
    parentCropB: 'winter_wheat',
    minSweetness: 35,
    minYield: 40,
    resultCropId: 'wheat_potato',
    baseGenetics: { sweetness: 40, yield: 50, resistance: 35 },
    discoveryText: 'Sự kết duyên trái mùa của khoai tây và lúa mì đông, loài khoai mang theo hương lúa mạch.'
  },
  {
    id: 'spring_green_peach',
    name: 'Đào Xanh',
    parentCropA: 'peach',
    parentCropB: 'spinach',
    minSweetness: 35,
    minYield: 30,
    resultCropId: 'spring_green_peach',
    baseGenetics: { sweetness: 45, yield: 40, resistance: 35 },
    discoveryText: 'Vị ngọt của đào thủy mật hòa quyện với màu xanh của cải bó xôi, vỏ quả xanh biếc như ngọc bích.'
  },
  {
    id: 'mustard_bean',
    name: 'Đậu Hương Mù Tạt',
    parentCropA: 'broad_bean',
    parentCropB: 'mustard_green',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'mustard_bean',
    baseGenetics: { sweetness: 40, yield: 40, resistance: 40 },
    discoveryText: 'Đậu tằm bọc trong vị cay nhẹ của cải bẹ, giai phẩm của mùa đông và xuân.'
  },
  {
    id: 'frost_rapeseed',
    name: 'Cải Dầu Sương',
    parentCropA: 'rapeseed',
    parentCropB: 'spinach',
    minSweetness: 25,
    minYield: 30,
    resultCropId: 'frost_rapeseed',
    baseGenetics: { sweetness: 35, yield: 35, resistance: 35 },
    discoveryText: 'Cải dầu không ngại sương hàn, trên lá đọng sương vẫn xanh mướt.'
  },
  {
    id: 'purple_melon',
    name: 'Dưa Tử Tinh',
    parentCropA: 'watermelon',
    parentCropB: 'eggplant',
    minSweetness: 40,
    minYield: 35,
    resultCropId: 'purple_melon',
    baseGenetics: { sweetness: 50, yield: 45, resistance: 40 },
    discoveryText: 'Dưa hấu mọng nước va chạm với sắc tím của cà tím, ruột quả tím như pha lê.'
  },
  {
    id: 'golden_rice',
    name: 'Lúa Kim Chi',
    parentCropA: 'rice',
    parentCropB: 'sesame',
    minSweetness: 35,
    minYield: 35,
    resultCropId: 'golden_rice',
    baseGenetics: { sweetness: 40, yield: 50, resistance: 35 },
    discoveryText: 'Lúa gạo và hạt mè hợp nhất, hạt thóc vàng kim tỏa ra hương mè.'
  },
  {
    id: 'double_lotus',
    name: 'Song Liên',
    parentCropA: 'lotus_root',
    parentCropB: 'lotus_seed',
    minSweetness: 50,
    minYield: 45,
    resultCropId: 'double_lotus',
    baseGenetics: { sweetness: 60, yield: 55, resistance: 50 },
    discoveryText: 'Sự dung hợp tột đỉnh của củ sen và hạt sen sinh ra từ cùng một rễ, hoa nở chung cuống.'
  },
  {
    id: 'fire_sesame',
    name: 'Hỏa Ma Nhân',
    parentCropA: 'chili',
    parentCropB: 'sesame',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'fire_sesame',
    baseGenetics: { sweetness: 40, yield: 45, resistance: 35 },
    discoveryText: 'Lửa của ớt và hương thơm của hạt mè kết hợp hoàn hảo, vừa cay vừa thơm.'
  },
  {
    id: 'silk_corn',
    name: 'Tơ Tuệ',
    parentCropA: 'loofah',
    parentCropB: 'corn',
    minSweetness: 35,
    minYield: 40,
    resultCropId: 'silk_corn',
    baseGenetics: { sweetness: 40, yield: 50, resistance: 40 },
    discoveryText: 'Sự trơn mượt của mướp hương hòa quyện với bắp ngô trĩu hạt, từng sợi vàng óng.'
  },
  {
    id: 'purple_lotus',
    name: 'Cà Tử Liên',
    parentCropA: 'eggplant',
    parentCropB: 'lotus_root',
    minSweetness: 40,
    minYield: 35,
    resultCropId: 'purple_lotus',
    baseGenetics: { sweetness: 50, yield: 45, resistance: 45 },
    discoveryText: 'Sự thanh tao màu tím của cà tím kết hợp với độ thanh mát của củ sen, đứng thẳng tắp như hoa sen.'
  },
  {
    id: 'chrysanthemum_melon',
    name: 'Dưa Cúc',
    parentCropA: 'watermelon',
    parentCropB: 'chrysanthemum',
    minSweetness: 40,
    minYield: 30,
    resultCropId: 'chrysanthemum_melon',
    baseGenetics: { sweetness: 50, yield: 40, resistance: 40 },
    discoveryText: 'Vị ngọt của dưa hấu hòa quyện với sự thanh nhã của hoa cúc, trong dưa có hương hoa.'
  },
  {
    id: 'pumpkin_rice',
    name: 'Lúa Bí Đỏ',
    parentCropA: 'rice',
    parentCropB: 'pumpkin',
    minSweetness: 35,
    minYield: 40,
    resultCropId: 'pumpkin_rice',
    baseGenetics: { sweetness: 45, yield: 55, resistance: 40 },
    discoveryText: 'Sự kết duyên điền viên giữa lúa gạo và bí đỏ, cơm nấu ra mang theo hương vị ngọt ngào của bí đỏ.'
  },
  {
    id: 'mountain_lotus',
    name: 'Sơn Liên',
    parentCropA: 'lotus_root',
    parentCropB: 'yam',
    minSweetness: 45,
    minYield: 40,
    resultCropId: 'mountain_lotus',
    baseGenetics: { sweetness: 55, yield: 50, resistance: 50 },
    discoveryText: 'Độ thanh mát của củ sen hòa quyện với tính bồi bổ của hoài sơn, tựa non nước hữu tình.'
  },
  {
    id: 'double_nut',
    name: 'Song Quả Nhân',
    parentCropA: 'peanut',
    parentCropB: 'sesame',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'double_nut',
    baseGenetics: { sweetness: 40, yield: 45, resistance: 35 },
    discoveryText: 'Hạt đậu phộng và hạt mè hợp nhất làm một, hương thơm đậm đà.'
  },
  {
    id: 'sweet_gourd',
    name: 'Mướp Ngọt',
    parentCropA: 'loofah',
    parentCropB: 'sweet_potato',
    minSweetness: 35,
    minYield: 30,
    resultCropId: 'sweet_gourd',
    baseGenetics: { sweetness: 45, yield: 40, resistance: 35 },
    discoveryText: 'Sự non mượt của mướp hương va chạm với sự ngọt ngào của khoai lang, ruột quả ngọt lịm.'
  },
  {
    id: 'purple_persimmon',
    name: 'Hồng Tím',
    parentCropA: 'eggplant',
    parentCropB: 'persimmon',
    minSweetness: 40,
    minYield: 35,
    resultCropId: 'purple_persimmon',
    baseGenetics: { sweetness: 50, yield: 45, resistance: 40 },
    discoveryText: 'Sắc tím bóng của cà tím dung hợp với sự ngọt ngào của quả hồng, quả có màu đỏ tía.'
  },
  {
    id: 'fire_ginger',
    name: 'Hỏa Khương',
    parentCropA: 'chili',
    parentCropB: 'ginger',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'fire_ginger',
    baseGenetics: { sweetness: 40, yield: 45, resistance: 45 },
    discoveryText: 'Vị cay nồng của ớt giao thoa với vị cay ấm của gừng, tràn đầy hơi ấm.'
  },
  {
    id: 'osmanthus_lotus',
    name: 'Quế Liên',
    parentCropA: 'lotus_seed',
    parentCropB: 'osmanthus',
    minSweetness: 50,
    minYield: 40,
    resultCropId: 'osmanthus_lotus',
    baseGenetics: { sweetness: 60, yield: 50, resistance: 55 },
    discoveryText: 'Sự thanh tâm của hạt sen cộng hưởng với hương thơm của hoa quế, tựa như bước vào cõi tiên.'
  },
  {
    id: 'golden_sweet',
    name: 'Khoai Vàng',
    parentCropA: 'corn',
    parentCropB: 'sweet_potato',
    minSweetness: 35,
    minYield: 40,
    resultCropId: 'golden_sweet',
    baseGenetics: { sweetness: 45, yield: 50, resistance: 35 },
    discoveryText: 'Màu vàng của ngô hợp nhất với sự ngọt ngào của khoai lang, toàn thân vàng óng.'
  },
  {
    id: 'ruby_melon',
    name: 'Dưa Hồng Ngọc',
    parentCropA: 'watermelon',
    parentCropB: 'jujube',
    minSweetness: 40,
    minYield: 30,
    resultCropId: 'ruby_melon',
    baseGenetics: { sweetness: 50, yield: 40, resistance: 40 },
    discoveryText: 'Dưa hấu mọng nước va chạm với sự ngọt ngào của táo đỏ, ruột quả đỏ như viên đá quý.'
  },
  {
    id: 'chrysanthemum_rice',
    name: 'Lúa Cúc',
    parentCropA: 'rice',
    parentCropB: 'chrysanthemum',
    minSweetness: 35,
    minYield: 35,
    resultCropId: 'chrysanthemum_rice',
    baseGenetics: { sweetness: 45, yield: 45, resistance: 40 },
    discoveryText: 'Sự dung hợp điền viên giữa lúa gạo và hoa cúc, cơm nấu ra mang hương cúc thoang thoảng.'
  },
  {
    id: 'nut_corn',
    name: 'Ngô Đậu Phộng',
    parentCropA: 'corn',
    parentCropB: 'peanut',
    minSweetness: 35,
    minYield: 40,
    resultCropId: 'nut_corn',
    baseGenetics: { sweetness: 40, yield: 55, resistance: 35 },
    discoveryText: 'Sự kết hợp lương thực thô giữa ngô và đậu phộng, mỗi bắp ngô đều mang theo hương đậu phộng.'
  },
  {
    id: 'frost_melon',
    name: 'Dưa Sương Ngọt',
    parentCropA: 'watermelon',
    parentCropB: 'napa_cabbage',
    minSweetness: 35,
    minYield: 30,
    resultCropId: 'frost_melon',
    baseGenetics: { sweetness: 45, yield: 40, resistance: 40 },
    discoveryText: 'Vị ngọt của dưa hấu hòa quyện với tính chịu rét của cải thảo, sự ngọt ngào có thể thưởng thức ngay cả trong ngày đông.'
  },
  {
    id: 'twin_grain',
    name: 'Song Cốc',
    parentCropA: 'rice',
    parentCropB: 'winter_wheat',
    minSweetness: 35,
    minYield: 40,
    resultCropId: 'twin_grain',
    baseGenetics: { sweetness: 40, yield: 55, resistance: 35 },
    discoveryText: 'Cuộc hôn nhân ngũ cốc giữa lúa gạo và lúa mì đông, sự giao thoa nam bắc.'
  },
  {
    id: 'lotus_cabbage',
    name: 'Cải Thảo Sen',
    parentCropA: 'lotus_root',
    parentCropB: 'napa_cabbage',
    minSweetness: 35,
    minYield: 35,
    resultCropId: 'lotus_cabbage',
    baseGenetics: { sweetness: 45, yield: 45, resistance: 40 },
    discoveryText: 'Độ thanh mát của củ sen hợp nhất với sự mộc mạc của cải thảo, món thanh bổ ngày đông.'
  },
  {
    id: 'garlic_sesame',
    name: 'Tỏi Mè',
    parentCropA: 'sesame',
    parentCropB: 'garlic',
    minSweetness: 30,
    minYield: 30,
    resultCropId: 'garlic_sesame',
    baseGenetics: { sweetness: 35, yield: 40, resistance: 40 },
    discoveryText: 'Sự thơm nồng của hạt mè va chạm với độ cay của tỏi, thánh phẩm dùng để điều vị.'
  },
  {
    id: 'chive_gourd',
    name: 'Mướp Hẹ',
    parentCropA: 'loofah',
    parentCropB: 'chives',
    minSweetness: 30,
    minYield: 30,
    resultCropId: 'chive_gourd',
    baseGenetics: { sweetness: 35, yield: 40, resistance: 35 },
    discoveryText: 'Sự non mượt của mướp hương đan xen với vị nồng của hẹ, có thể trồng trong ba mùa.'
  },
  {
    id: 'mustard_eggplant',
    name: 'Cà Mù Tạt',
    parentCropA: 'eggplant',
    parentCropB: 'mustard_green',
    minSweetness: 35,
    minYield: 30,
    resultCropId: 'mustard_eggplant',
    baseGenetics: { sweetness: 40, yield: 40, resistance: 40 },
    discoveryText: 'Sắc tím của cà tím bọc trong vị cay nhẹ của cải bẹ, mang phong vị rất riêng.'
  },
  {
    id: 'snow_fire_pepper',
    name: 'Ớt Băng Hỏa',
    parentCropA: 'chili',
    parentCropB: 'snow_lotus',
    minSweetness: 50,
    minYield: 40,
    resultCropId: 'snow_fire_pepper',
    baseGenetics: { sweetness: 60, yield: 50, resistance: 55 },
    discoveryText: 'Ngọn lửa của ớt va chạm với lớp sương giá của tuyết liên, tạo nên cảnh băng hỏa lưỡng trùng thiên.'
  },
  {
    id: 'winter_corn',
    name: 'Ngô Đông',
    parentCropA: 'corn',
    parentCropB: 'spinach',
    minSweetness: 30,
    minYield: 40,
    resultCropId: 'winter_corn',
    baseGenetics: { sweetness: 40, yield: 50, resistance: 40 },
    discoveryText: 'Bắp ngô không sợ giá rét, lá xanh như cây tùng thường xanh giữa mùa đông.'
  },
  {
    id: 'amber_yam',
    name: 'Khoai Hổ Phách',
    parentCropA: 'yam',
    parentCropB: 'sweet_potato',
    minSweetness: 40,
    minYield: 35,
    resultCropId: 'amber_yam',
    baseGenetics: { sweetness: 50, yield: 45, resistance: 40 },
    discoveryText: 'Tính bồi bổ của hoài sơn hòa quyện với độ dẻo ngọt của khoai lang, màu sắc như hổ phách.'
  },
  {
    id: 'twin_blossom',
    name: 'Song Hoa',
    parentCropA: 'chrysanthemum',
    parentCropB: 'osmanthus',
    minSweetness: 45,
    minYield: 35,
    resultCropId: 'twin_blossom',
    baseGenetics: { sweetness: 55, yield: 45, resistance: 50 },
    discoveryText: 'Hoa cúc và hoa quế thi nhau nở rộ, hai đóa hoa tranh sắc.'
  },
  {
    id: 'mountain_nut',
    name: 'Đậu Phộng Núi',
    parentCropA: 'yam',
    parentCropB: 'peanut',
    minSweetness: 35,
    minYield: 40,
    resultCropId: 'mountain_nut',
    baseGenetics: { sweetness: 45, yield: 50, resistance: 35 },
    discoveryText: 'Độ xốp mịn của hoài sơn va chạm với sự giòn thơm của đậu phộng, kỳ trân trong núi.'
  },
  {
    id: 'autumn_gem',
    name: 'Bí Đỏ Thu Quế',
    parentCropA: 'pumpkin',
    parentCropB: 'osmanthus',
    minSweetness: 45,
    minYield: 40,
    resultCropId: 'autumn_gem',
    baseGenetics: { sweetness: 55, yield: 50, resistance: 45 },
    discoveryText: 'Sự tròn trịa của bí đỏ dung hợp với hương thơm của hoa quế, báu vật của mùa thu vàng.'
  },
  {
    id: 'ginger_yam',
    name: 'Hoài Sơn Gừng',
    parentCropA: 'ginger',
    parentCropB: 'yam',
    minSweetness: 40,
    minYield: 40,
    resultCropId: 'ginger_yam',
    baseGenetics: { sweetness: 45, yield: 50, resistance: 45 },
    discoveryText: 'Tính ấm cay của gừng hợp nhất với tính bồi bổ của hoài sơn, thánh phẩm bồi bổ ngày đông.'
  },
  {
    id: 'golden_persimmon',
    name: 'Hồng Vàng',
    parentCropA: 'persimmon',
    parentCropB: 'pumpkin',
    minSweetness: 40,
    minYield: 40,
    resultCropId: 'golden_persimmon',
    baseGenetics: { sweetness: 50, yield: 50, resistance: 40 },
    discoveryText: 'Độ mềm ngọt của quả hồng hòa quyện với màu vàng óng của bí đỏ, như vàng tựa mật.'
  },
  {
    id: 'chrysanthemum_jujube',
    name: 'Táo Cúc',
    parentCropA: 'chrysanthemum',
    parentCropB: 'jujube',
    minSweetness: 35,
    minYield: 35,
    resultCropId: 'chrysanthemum_jujube',
    baseGenetics: { sweetness: 45, yield: 45, resistance: 45 },
    discoveryText: 'Sự thanh nhã của hoa cúc hợp nhất với vị ngọt của táo đỏ, trong hoa mang theo quả.'
  },
  {
    id: 'osmanthus_yam',
    name: 'Khoai Quế',
    parentCropA: 'osmanthus',
    parentCropB: 'sweet_potato',
    minSweetness: 40,
    minYield: 35,
    resultCropId: 'osmanthus_yam',
    baseGenetics: { sweetness: 50, yield: 45, resistance: 45 },
    discoveryText: 'Hương thơm của hoa quế thấm vào độ dẻo ngọt của khoai lang, cả khuôn miệng ngập tràn hương quế.'
  },
  {
    id: 'winter_pumpkin',
    name: 'Bí Đỏ Mùa Đông',
    parentCropA: 'pumpkin',
    parentCropB: 'napa_cabbage',
    minSweetness: 35,
    minYield: 40,
    resultCropId: 'winter_pumpkin',
    baseGenetics: { sweetness: 45, yield: 50, resistance: 40 },
    discoveryText: 'Sự sung túc của bí đỏ kết hợp với tính chịu rét của cải thảo, món ăn ấm áp ngày đông.'
  },
  {
    id: 'emerald_yam',
    name: 'Hoài Sơn Phỉ Thúy',
    parentCropA: 'yam',
    parentCropB: 'spinach',
    minSweetness: 35,
    minYield: 35,
    resultCropId: 'emerald_yam',
    baseGenetics: { sweetness: 45, yield: 45, resistance: 45 },
    discoveryText: 'Tính bồi bổ của hoài sơn hòa quyện với màu xanh của cải bó xôi, mặt cắt xanh biếc như ngọc phỉ thúy.'
  },
  {
    id: 'snow_chrysanthemum',
    name: 'Tuyết Cúc',
    parentCropA: 'chrysanthemum',
    parentCropB: 'snow_lotus',
    minSweetness: 55,
    minYield: 40,
    resultCropId: 'snow_chrysanthemum',
    baseGenetics: { sweetness: 65, yield: 50, resistance: 60 },
    discoveryText: 'Sự thanh nhã của hoa cúc hợp nhất với sự tinh khiết của tuyết liên, cánh hoa trắng như tuyết.'
  },
  {
    id: 'osmanthus_garlic',
    name: 'Tỏi Quế',
    parentCropA: 'osmanthus',
    parentCropB: 'garlic',
    minSweetness: 40,
    minYield: 30,
    resultCropId: 'osmanthus_garlic',
    baseGenetics: { sweetness: 50, yield: 40, resistance: 45 },
    discoveryText: 'Hương thơm của hoa quế trung hòa đi độ cay nồng của tỏi, tỏa hương ngào ngạt.'
  },
  {
    id: 'wheat_yam',
    name: 'Hoài Sơn Mạch',
    parentCropA: 'yam',
    parentCropB: 'winter_wheat',
    minSweetness: 35,
    minYield: 40,
    resultCropId: 'wheat_yam',
    baseGenetics: { sweetness: 45, yield: 50, resistance: 40 },
    discoveryText: 'Cuộc hôn nhân trái mùa giữa hoài sơn và lúa mì đông, dinh dưỡng vô cùng phong phú.'
  },
  {
    id: 'cream_peanut',
    name: 'Đậu Phộng Trắng',
    parentCropA: 'peanut',
    parentCropB: 'napa_cabbage',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'cream_peanut',
    baseGenetics: { sweetness: 40, yield: 45, resistance: 35 },
    discoveryText: 'Độ giòn thơm của đậu phộng hợp nhất với sự thanh bạch của cải thảo, vỏ trắng như tuyết.'
  },
  {
    id: 'garlic_jujube',
    name: 'Táo Tỏi',
    parentCropA: 'jujube',
    parentCropB: 'garlic',
    minSweetness: 35,
    minYield: 35,
    resultCropId: 'garlic_jujube',
    baseGenetics: { sweetness: 40, yield: 45, resistance: 45 },
    discoveryText: 'Vị ngọt của táo đỏ va chạm với vị cay của tỏi, mùi vị vượt ngoài dự đoán.'
  },
  {
    id: 'chive_persimmon',
    name: 'Hồng Hẹ',
    parentCropA: 'persimmon',
    parentCropB: 'chives',
    minSweetness: 35,
    minYield: 30,
    resultCropId: 'chive_persimmon',
    baseGenetics: { sweetness: 45, yield: 40, resistance: 40 },
    discoveryText: 'Sự ngọt ngào của quả hồng hòa quyện với vị nồng của hẹ, có thể thu hoạch trong ba mùa.'
  },
  {
    id: 'mustard_ginger',
    name: 'Gừng Mù Tạt',
    parentCropA: 'ginger',
    parentCropB: 'mustard_green',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'mustard_ginger',
    baseGenetics: { sweetness: 40, yield: 45, resistance: 40 },
    discoveryText: 'Vị cay ấm của gừng hợp nhất với vị cay nhẹ của cải bẹ, thần phẩm xua tan giá rét.'
  },
  {
    id: 'snow_pumpkin',
    name: 'Bí Đỏ Tuyết',
    parentCropA: 'pumpkin',
    parentCropB: 'snow_lotus',
    minSweetness: 55,
    minYield: 45,
    resultCropId: 'snow_pumpkin',
    baseGenetics: { sweetness: 65, yield: 55, resistance: 55 },
    discoveryText: 'Sự sung túc của bí đỏ hòa quyện với sự tinh khiết của tuyết liên, truyền thuyết về quả bí khổng lồ màu trắng.'
  },
  {
    id: 'jade_white',
    name: 'Cải Thảo Bích',
    parentCropA: 'napa_cabbage',
    parentCropB: 'spinach',
    minSweetness: 25,
    minYield: 30,
    resultCropId: 'jade_white',
    baseGenetics: { sweetness: 35, yield: 40, resistance: 30 },
    discoveryText: 'Sự mộc mạc của cải thảo dung hợp với màu xanh của cải bó xôi, phiến lá xanh biếc long lanh.'
  },
  {
    id: 'garlic_cabbage',
    name: 'Cải Thảo Tỏi',
    parentCropA: 'garlic',
    parentCropB: 'napa_cabbage',
    minSweetness: 25,
    minYield: 30,
    resultCropId: 'garlic_cabbage',
    baseGenetics: { sweetness: 35, yield: 40, resistance: 35 },
    discoveryText: 'Vị cay của tỏi hợp nhất với vị ngọt của cải thảo, món ngon dữ trữ mùa đông.'
  },
  {
    id: 'evergreen_herb',
    name: 'Rau Thường Thanh',
    parentCropA: 'spinach',
    parentCropB: 'mustard_green',
    minSweetness: 25,
    minYield: 25,
    resultCropId: 'evergreen_herb',
    baseGenetics: { sweetness: 30, yield: 35, resistance: 35 },
    discoveryText: 'Cải bó xôi và cải bẹ không sợ giá lạnh, bốn mùa xanh tươi.'
  },
  {
    id: 'wheat_mustard',
    name: 'Cải Mạch',
    parentCropA: 'winter_wheat',
    parentCropB: 'mustard_green',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'wheat_mustard',
    baseGenetics: { sweetness: 35, yield: 45, resistance: 35 },
    discoveryText: 'Vị đậm đà của lúa mì đông hòa quyện với vị cay của cải bẹ, trong bột có vị cay nhẹ.'
  },
  {
    id: 'allium_king',
    name: 'Bách Toán Vương',
    parentCropA: 'garlic',
    parentCropB: 'chives',
    minSweetness: 30,
    minYield: 30,
    resultCropId: 'allium_king',
    baseGenetics: { sweetness: 35, yield: 40, resistance: 40 },
    discoveryText: 'Vị vua của họ hành tỏi sinh ra từ tỏi và hẹ, hương cay vô địch.'
  },
  {
    id: 'green_wheat',
    name: 'Thúy Mạch',
    parentCropA: 'spinach',
    parentCropB: 'winter_wheat',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'green_wheat',
    baseGenetics: { sweetness: 35, yield: 45, resistance: 35 },
    discoveryText: 'Màu xanh biếc của cải bó xôi thấm vào lúa mì đông, bông lúa xanh tươi đung đưa theo gió.'
  },
  {
    id: 'chive_mustard',
    name: 'Hẹ Mù Tạt',
    parentCropA: 'chives',
    parentCropB: 'mustard_green',
    minSweetness: 25,
    minYield: 25,
    resultCropId: 'chive_mustard',
    baseGenetics: { sweetness: 30, yield: 35, resistance: 35 },
    discoveryText: 'Liên minh cay nồng của hẹ và cải bẹ, rất kích thích vị giác đưa cơm.'
  },
  {
    id: 'jade_bamboo_corn',
    name: 'Bắp Măng Ngọc',
    parentCropA: 'bamboo_shoot',
    parentCropB: 'corn',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'jade_bamboo_corn',
    baseGenetics: { sweetness: 40, yield: 45, resistance: 35 },
    discoveryText: 'Độ tươi giòn của măng xuân hòa quyện với vị dẻo ngọt của ngô, bắp ngô như ngọc phỉ thúy thanh ngọt ngon miệng.'
  },
  {
    id: 'ginger_jade_green',
    name: 'Cải Gừng Xanh',
    parentCropA: 'cabbage',
    parentCropB: 'ginger',
    minSweetness: 25,
    minYield: 30,
    resultCropId: 'ginger_jade_green',
    baseGenetics: { sweetness: 35, yield: 40, resistance: 35 },
    discoveryText: 'Sự thanh mát của cải xanh gặp gỡ vị cay ấm của gừng, ấm dạ dày lại giải ngấy.'
  },
  {
    id: 'spicy_sesame',
    name: 'Hạt Ma Lạt',
    parentCropA: 'chili',
    parentCropB: 'peanut',
    minSweetness: 30,
    minYield: 30,
    resultCropId: 'spicy_sesame',
    baseGenetics: { sweetness: 35, yield: 40, resistance: 40 },
    discoveryText: 'Sự nóng bỏng của ớt va chạm với độ giòn của đậu phộng, tê cay giòn thơm cắn một miếng là nhớ mãi.'
  },
  {
    id: 'honey_gourd',
    name: 'Mướp Mật',
    parentCropA: 'loofah',
    parentCropB: 'peanut',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'honey_gourd',
    baseGenetics: { sweetness: 40, yield: 45, resistance: 30 },
    discoveryText: 'Sự mềm trượt của mướp hương gặp gỡ vị ngọt bùi của đậu phộng, ngọt ngào miên man.'
  },
  {
    id: 'golden_peanut_yam',
    name: 'Khoai Đậu Phộng',
    parentCropA: 'peanut',
    parentCropB: 'sweet_potato',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'golden_peanut_yam',
    baseGenetics: { sweetness: 40, yield: 45, resistance: 35 },
    discoveryText: 'Sự xốp thơm của đậu phộng hòa quyện với độ mịn của khoai lang, thơm ngọt ngon miệng.'
  },
  {
    id: 'spice_jujube',
    name: 'Táo Cay',
    parentCropA: 'jujube',
    parentCropB: 'ginger',
    minSweetness: 30,
    minYield: 30,
    resultCropId: 'spice_jujube',
    baseGenetics: { sweetness: 40, yield: 35, resistance: 40 },
    discoveryText: 'Sự ngọt ngào của táo đỏ dung hợp kỳ lạ với vị cay nồng của tỏi, dư vị khôn nguôi.'
  },
  {
    id: 'bean_eggplant',
    name: 'Cà Đậu',
    parentCropA: 'green_bean',
    parentCropB: 'eggplant',
    minSweetness: 25,
    minYield: 30,
    resultCropId: 'bean_eggplant',
    baseGenetics: { sweetness: 35, yield: 40, resistance: 35 },
    discoveryText: 'Sự tươi non của đậu đũa hợp nhất với sự mềm dẻo của cà tím, song bảo trên đồng.'
  },
  {
    id: 'chrysanthemum_persimmon',
    name: 'Hồng Cúc',
    parentCropA: 'persimmon',
    parentCropB: 'chrysanthemum',
    minSweetness: 35,
    minYield: 30,
    resultCropId: 'chrysanthemum_persimmon',
    baseGenetics: { sweetness: 45, yield: 40, resistance: 35 },
    discoveryText: 'Vị ngọt của quả hồng hòa quyện với hương thanh tao của hoa cúc, cực phẩm ngày thu.'
  },
  {
    id: 'purple_yam',
    name: 'Khoai Tử Ngọc',
    parentCropA: 'yam',
    parentCropB: 'eggplant',
    minSweetness: 30,
    minYield: 35,
    resultCropId: 'purple_yam',
    baseGenetics: { sweetness: 35, yield: 45, resistance: 40 },
    discoveryText: 'Độ trơn bóng của hoài sơn hòa quyện với sắc tím của cà tím, toàn thân tỏa ra vầng sáng màu tím.'
  },
  {
    id: 'snow_lotus_pearl',
    name: 'Hạt Tuyết Liên',
    parentCropA: 'lotus_seed',
    parentCropB: 'snow_lotus',
    minSweetness: 35,
    minYield: 30,
    resultCropId: 'snow_lotus_pearl',
    baseGenetics: { sweetness: 45, yield: 40, resistance: 45 },
    discoveryText: 'Sự thanh tâm của hạt sen hợp nhất với sự tinh khiết của tuyết liên, minh châu giữa mùa đông giá rét.'
  },
  {
    id: 'melon_tea_fruit',
    name: 'Mật Trà Quả',
    parentCropA: 'golden_melon',
    parentCropB: 'tea',
    minSweetness: 65,
    minYield: 55,
    resultCropId: 'melon_tea_fruit',
    baseGenetics: { sweetness: 75, yield: 65, resistance: 60 },
    discoveryText: 'Sự ngọt ngào của dưa kim mật và sự thanh nhã của lá trà dung hợp ở cảnh giới cao nhất, tiên quả trong truyền thuyết!'
  },
  {
    id: 'dragon_fire',
    name: 'Ớt Long Hỏa',
    parentCropA: 'phoenix_pepper',
    parentCropB: 'ginger',
    minSweetness: 60,
    minYield: 55,
    resultCropId: 'dragon_fire',
    baseGenetics: { sweetness: 70, yield: 65, resistance: 60 },
    discoveryText: 'Ngọn lửa của ớt phượng hoàng va chạm với độ cay ấm của gừng, rực cháy như hơi thở của rồng!'
  },
  {
    id: 'celestial_rice',
    name: 'Lúa Thiên Hương',
    parentCropA: 'moonlight_rice',
    parentCropB: 'osmanthus',
    minSweetness: 65,
    minYield: 60,
    resultCropId: 'celestial_rice',
    baseGenetics: { sweetness: 75, yield: 70, resistance: 60 },
    discoveryText: 'Ánh bạc của lúa nguyệt quang hòa quyện với hương thơm của hoa quế, tiên đạo chốn thiên đình!'
  },
  {
    id: 'ice_lotus',
    name: 'Băng Liên',
    parentCropA: 'frost_garlic',
    parentCropB: 'lotus_seed',
    minSweetness: 65,
    minYield: 55,
    resultCropId: 'ice_lotus',
    baseGenetics: { sweetness: 75, yield: 65, resistance: 65 },
    discoveryText: 'Sương giá của tỏi sương tuyết hợp nhất với sự thanh tâm của hạt sen, hoa băng liên nở mãi không tàn!'
  },
  {
    id: 'jade_peach_tea',
    name: 'Trà Thúy Đào',
    parentCropA: 'jade_tea',
    parentCropB: 'peach',
    minSweetness: 60,
    minYield: 55,
    resultCropId: 'jade_peach_tea',
    baseGenetics: { sweetness: 70, yield: 65, resistance: 55 },
    discoveryText: 'Màu xanh biếc của trà phỉ thúy hòa quyện với độ ngọt dịu của quả đào, cực phẩm trong các loại trà!'
  },
  {
    id: 'golden_dragon',
    name: 'Quả Kim Long',
    parentCropA: 'golden_melon',
    parentCropB: 'phoenix_pepper',
    minSweetness: 70,
    minYield: 65,
    resultCropId: 'golden_dragon',
    baseGenetics: { sweetness: 80, yield: 75, resistance: 65 },
    discoveryText: 'Sự tôn quý của dưa kim mật va chạm với ngọn lửa của ớt phượng hoàng, vua của các loài quả!'
  },
  {
    id: 'moonlight_frost',
    name: 'Lúa Nguyệt Sương',
    parentCropA: 'moonlight_rice',
    parentCropB: 'frost_garlic',
    minSweetness: 65,
    minYield: 65,
    resultCropId: 'moonlight_frost',
    baseGenetics: { sweetness: 75, yield: 75, resistance: 65 },
    discoveryText: 'Ánh bạc của lúa nguyệt quang đan xen với sương giá của tỏi sương tuyết, sương lạnh dưới trăng!'
  },
  {
    id: 'jade_golden_melon',
    name: 'Dưa Phỉ Thúy Kim',
    parentCropA: 'jade_tea',
    parentCropB: 'golden_melon',
    minSweetness: 70,
    minYield: 65,
    resultCropId: 'jade_golden_melon',
    baseGenetics: { sweetness: 80, yield: 70, resistance: 70 },
    discoveryText: 'Màu xanh của trà phỉ thúy hòa quyện với màu vàng của dưa kim mật, phỉ thúy bọc vàng!'
  },
  {
    id: 'immortal_flower',
    name: 'Hoa Tiên Nhân',
    parentCropA: 'frost_garlic',
    parentCropB: 'jade_tea',
    minSweetness: 70,
    minYield: 60,
    resultCropId: 'immortal_flower',
    baseGenetics: { sweetness: 85, yield: 70, resistance: 75 },
    discoveryText: 'Sương giá của tỏi sương tuyết hòa quyện với màu xanh của trà phỉ thúy, loài hoa của tiên nhân trong truyền thuyết!'
  },
  {
    id: 'dragon_pearl',
    name: 'Long Châu',
    parentCropA: 'phoenix_pepper',
    parentCropB: 'moonlight_rice',
    minSweetness: 75,
    minYield: 70,
    resultCropId: 'dragon_pearl',
    baseGenetics: { sweetness: 85, yield: 80, resistance: 70 },
    discoveryText: 'Ngọn lửa của ớt phượng hoàng va chạm với ánh bạc của lúa nguyệt quang, quả tròn trịa như long châu, chí bảo!'
  },
  // --- 新增二代杂交 ---
  {
    id: 'emerald_jade_tea',
    name: 'Thúy Ngọc Mính',
    parentCropA: 'emerald_radish',
    parentCropB: 'tea',
    minSweetness: 55,
    minYield: 50,
    resultCropId: 'emerald_jade_tea',
    baseGenetics: { sweetness: 65, yield: 60, resistance: 55 },
    discoveryText: 'Màu xanh của củ cải phỉ thúy hòa quyện với sự thanh nhã của lá trà, hương trà xanh mướt làm say đắm lòng người.'
  },
  {
    id: 'pearl_osmanthus',
    name: 'Lúa Quế Châu',
    parentCropA: 'pearl_grain',
    parentCropB: 'osmanthus',
    minSweetness: 60,
    minYield: 55,
    resultCropId: 'pearl_osmanthus',
    baseGenetics: { sweetness: 70, yield: 65, resistance: 55 },
    discoveryText: 'Sự trong trẻo của lúa trân châu hợp nhất với hương thơm của hoa quế, từng hạt tràn ngập hương quế.'
  },
  {
    id: 'ruby_fire',
    name: 'Ớt Hồng Ngọc',
    parentCropA: 'ruby_bean',
    parentCropB: 'chili',
    minSweetness: 55,
    minYield: 50,
    resultCropId: 'ruby_fire',
    baseGenetics: { sweetness: 65, yield: 60, resistance: 55 },
    discoveryText: 'Màu đỏ hồng của đậu hồng ngọc va chạm với sức nóng của ớt, tựa như viên hồng ngọc rực lửa.'
  },
  {
    id: 'golden_corn_king',
    name: 'Kim Tuệ Vương',
    parentCropA: 'golden_corn',
    parentCropB: 'rice',
    minSweetness: 55,
    minYield: 60,
    resultCropId: 'golden_corn_king',
    baseGenetics: { sweetness: 65, yield: 70, resistance: 55 },
    discoveryText: 'Sự sung túc của ngô bông vàng dung hợp với sự mộc mạc của lúa gạo, vua của ngũ cốc!'
  },
  {
    id: 'jade_melon_tea',
    name: 'Dưa Bích Mính',
    parentCropA: 'jade_melon',
    parentCropB: 'tea',
    minSweetness: 60,
    minYield: 55,
    resultCropId: 'jade_melon_tea',
    baseGenetics: { sweetness: 70, yield: 65, resistance: 55 },
    discoveryText: 'Màu xanh biếc của dưa bích ngọc hòa quyện với hương thơm của lá trà, thanh mát giải nhiệt.'
  },
  {
    id: 'twin_golden_bean',
    name: 'Đậu Kim Song',
    parentCropA: 'twin_bean',
    parentCropB: 'peanut',
    minSweetness: 50,
    minYield: 50,
    resultCropId: 'twin_golden_bean',
    baseGenetics: { sweetness: 60, yield: 60, resistance: 50 },
    discoveryText: 'Tính sinh đôi của đậu song tử kết hợp với sự căng mọng của đậu phộng, vàng ươm lấp lánh thành song thành cặp.'
  },
  {
    id: 'peach_rice',
    name: 'Cơm Hoa Đào',
    parentCropA: 'peach_blossom_tea',
    parentCropB: 'rice',
    minSweetness: 60,
    minYield: 55,
    resultCropId: 'peach_rice',
    baseGenetics: { sweetness: 70, yield: 65, resistance: 55 },
    discoveryText: 'Hương thơm của trà hoa đào thấm vào lúa gạo, cơm nấu ra mang sắc hồng đào.'
  },
  {
    id: 'jade_shoot_ginger',
    name: 'Gừng Ngọc Duẩn',
    parentCropA: 'jade_shoot',
    parentCropB: 'ginger',
    minSweetness: 55,
    minYield: 50,
    resultCropId: 'jade_shoot_ginger',
    baseGenetics: { sweetness: 65, yield: 60, resistance: 55 },
    discoveryText: 'Sự tươi non của mầm ngọc trúc va chạm với vị cay ấm của gừng, xua tan giá lạnh sưởi ấm cơ thể.'
  },
  {
    id: 'golden_tuber_lotus',
    name: 'Khoai Kim Liên',
    parentCropA: 'golden_tuber',
    parentCropB: 'lotus_root',
    minSweetness: 55,
    minYield: 55,
    resultCropId: 'golden_tuber_lotus',
    baseGenetics: { sweetness: 65, yield: 65, resistance: 55 },
    discoveryText: 'Màu vàng của khoai mỡ vàng hòa quyện với độ thanh mát của củ sen, dẻo ngọt thơm tho.'
  },
  {
    id: 'frost_chrysanthemum',
    name: 'Sương Cúc',
    parentCropA: 'frost_garlic',
    parentCropB: 'chrysanthemum',
    minSweetness: 65,
    minYield: 50,
    resultCropId: 'frost_chrysanthemum',
    baseGenetics: { sweetness: 75, yield: 60, resistance: 70 },
    discoveryText: 'Hàn khí của tỏi sương tuyết hợp nhất với sự kiêu ngạo của hoa cúc, nở rộ trong sương giá.'
  },
  {
    id: 'phoenix_sesame',
    name: 'Phượng Nhân',
    parentCropA: 'phoenix_pepper',
    parentCropB: 'sesame',
    minSweetness: 60,
    minYield: 55,
    resultCropId: 'phoenix_sesame',
    baseGenetics: { sweetness: 65, yield: 65, resistance: 60 },
    discoveryText: 'Ngọn lửa của ớt phượng hoàng hòa quyện làm một với hương thơm của hạt mè, tiên quả cay nồng.'
  },
  {
    id: 'moonlight_lotus',
    name: 'Nguyệt Liên',
    parentCropA: 'moonlight_rice',
    parentCropB: 'lotus_seed',
    minSweetness: 65,
    minYield: 55,
    resultCropId: 'moonlight_lotus',
    baseGenetics: { sweetness: 75, yield: 65, resistance: 60 },
    discoveryText: 'Ánh bạc của lúa nguyệt quang hòa quyện với sự thanh tâm của hạt sen, bạch liên khẽ nở dưới trăng.'
  },
  {
    id: 'jade_snow',
    name: 'Mầm Thúy Tuyết',
    parentCropA: 'jade_tea',
    parentCropB: 'snow_lotus',
    minSweetness: 65,
    minYield: 50,
    resultCropId: 'jade_snow',
    baseGenetics: { sweetness: 75, yield: 60, resistance: 70 },
    discoveryText: 'Màu xanh biếc của trà phỉ thúy gặp gỡ sự thuần khiết của tuyết liên, băng thanh ngọc khiết.'
  },
  {
    id: 'golden_pumpkin',
    name: 'Kim Qua Vương',
    parentCropA: 'golden_melon',
    parentCropB: 'pumpkin',
    minSweetness: 65,
    minYield: 60,
    resultCropId: 'golden_pumpkin',
    baseGenetics: { sweetness: 75, yield: 70, resistance: 60 },
    discoveryText: 'Vị ngọt của dưa kim mật va chạm với độ bùi của bí đỏ, quả dưa vàng khổng lồ uy phong lẫm liệt.'
  },
  {
    id: 'phoenix_corn',
    name: 'Hỏa Tuệ',
    parentCropA: 'phoenix_pepper',
    parentCropB: 'corn',
    minSweetness: 55,
    minYield: 60,
    resultCropId: 'phoenix_corn',
    baseGenetics: { sweetness: 65, yield: 70, resistance: 55 },
    discoveryText: 'Ngọn lửa của ớt phượng hoàng thiêu đốt bắp ngô, hạt ngô đỏ rực ngọt xen lẫn cay.'
  },
  {
    id: 'moonlight_yam',
    name: 'Khoai Nguyệt Quang',
    parentCropA: 'moonlight_rice',
    parentCropB: 'sweet_potato',
    minSweetness: 60,
    minYield: 60,
    resultCropId: 'moonlight_yam',
    baseGenetics: { sweetness: 70, yield: 70, resistance: 55 },
    discoveryText: 'Ánh bạc của lúa nguyệt quang chiếu rọi củ khoai lang, toàn thân tỏa ra ánh sáng trắng nhu hòa.'
  },
  {
    id: 'jade_peanut',
    name: 'Quả Thúy Nhân',
    parentCropA: 'jade_tea',
    parentCropB: 'peanut',
    minSweetness: 55,
    minYield: 50,
    resultCropId: 'jade_peanut',
    baseGenetics: { sweetness: 65, yield: 60, resistance: 55 },
    discoveryText: 'Màu xanh biếc của trà phỉ thúy thấm vào đậu phộng, nhân bên trong xanh như ngọc.'
  },
  {
    id: 'frost_radish',
    name: 'Củ Cải Sương Ngọc',
    parentCropA: 'frost_garlic',
    parentCropB: 'radish',
    minSweetness: 60,
    minYield: 50,
    resultCropId: 'frost_radish',
    baseGenetics: { sweetness: 70, yield: 60, resistance: 65 },
    discoveryText: 'Sương giá của tỏi sương tuyết thấm vào củ cải, phần củ trong trẻo như ngọc băng.'
  },
  {
    id: 'golden_jujube',
    name: 'Táo Kim Mật',
    parentCropA: 'golden_melon',
    parentCropB: 'jujube',
    minSweetness: 70,
    minYield: 55,
    resultCropId: 'golden_jujube',
    baseGenetics: { sweetness: 80, yield: 65, resistance: 60 },
    discoveryText: 'Vị ngọt của dưa kim mật truyền vào táo đỏ, từng hạt căng mọng mật ngọt.'
  },
  {
    id: 'phoenix_eggplant',
    name: 'Cà Hỏa Diễm',
    parentCropA: 'phoenix_pepper',
    parentCropB: 'eggplant',
    minSweetness: 55,
    minYield: 55,
    resultCropId: 'phoenix_eggplant',
    baseGenetics: { sweetness: 60, yield: 65, resistance: 60 },
    discoveryText: 'Ngọn lửa của ớt phượng hoàng va chạm với sắc tím của cà tím, dưới lớp vỏ tím là vị cay nồng tươi ngon.'
  },
  {
    id: 'moonlight_spinach',
    name: 'Rau Ngân Diệp',
    parentCropA: 'moonlight_rice',
    parentCropB: 'spinach',
    minSweetness: 60,
    minYield: 55,
    resultCropId: 'moonlight_spinach',
    baseGenetics: { sweetness: 65, yield: 65, resistance: 55 },
    discoveryText: 'Ánh bạc của lúa nguyệt quang tẩm nhuận gân lá cải bó xôi, phiến lá lấp lánh ánh bạc.'
  },
  {
    id: 'jade_loofah',
    name: 'Mướp Thúy',
    parentCropA: 'jade_tea',
    parentCropB: 'loofah',
    minSweetness: 55,
    minYield: 55,
    resultCropId: 'jade_loofah',
    baseGenetics: { sweetness: 65, yield: 65, resistance: 50 },
    discoveryText: 'Màu xanh của trà phỉ thúy thấm vào mướp hương, thân mướp xanh biếc như ngọc.'
  },
  {
    id: 'frost_winter_wheat',
    name: 'Sương Mạch',
    parentCropA: 'frost_garlic',
    parentCropB: 'winter_wheat',
    minSweetness: 60,
    minYield: 55,
    resultCropId: 'frost_winter_wheat',
    baseGenetics: { sweetness: 70, yield: 65, resistance: 70 },
    discoveryText: 'Hàn băng của tỏi sương tuyết thấm vào lúa mì đông, bông lúa phủ đầy hoa sương.'
  },
  {
    id: 'golden_sesame',
    name: 'Kim Chi',
    parentCropA: 'golden_melon',
    parentCropB: 'sesame',
    minSweetness: 65,
    minYield: 55,
    resultCropId: 'golden_sesame',
    baseGenetics: { sweetness: 75, yield: 65, resistance: 55 },
    discoveryText: 'Ánh sáng vàng kim của dưa kim mật truyền vào hạt mè, từng hạt lấp lánh như cát vàng.'
  },
  {
    id: 'phoenix_garlic',
    name: 'Hỏa Toán',
    parentCropA: 'phoenix_pepper',
    parentCropB: 'garlic',
    minSweetness: 60,
    minYield: 50,
    resultCropId: 'phoenix_garlic',
    baseGenetics: { sweetness: 65, yield: 60, resistance: 65 },
    discoveryText: 'Ngọn lửa của ớt phượng hoàng thiêu đốt tỏi, trên nền vị cay nồng lại thêm một phần hỏa ý.'
  },
  {
    id: 'moonlight_cabbage',
    name: 'Cải Nguyệt Bạch',
    parentCropA: 'moonlight_rice',
    parentCropB: 'napa_cabbage',
    minSweetness: 60,
    minYield: 60,
    resultCropId: 'moonlight_cabbage',
    baseGenetics: { sweetness: 70, yield: 70, resistance: 55 },
    discoveryText: 'Ánh bạc của lúa nguyệt quang rắc lên lá cải thảo, trắng như lụa và vô cùng thanh ngọt.'
  },
  {
    id: 'jade_persimmon',
    name: 'Hồng Thúy',
    parentCropA: 'jade_tea',
    parentCropB: 'persimmon',
    minSweetness: 60,
    minYield: 50,
    resultCropId: 'jade_persimmon',
    baseGenetics: { sweetness: 70, yield: 60, resistance: 55 },
    discoveryText: 'Màu xanh của trà phỉ thúy thấm vào quả hồng, thịt quả mang sắc phỉ thúy ngọt ngào thơm ngát.'
  },
  {
    id: 'frost_bamboo',
    name: 'Băng Duẩn',
    parentCropA: 'frost_garlic',
    parentCropB: 'bamboo_shoot',
    minSweetness: 60,
    minYield: 50,
    resultCropId: 'frost_bamboo',
    baseGenetics: { sweetness: 70, yield: 60, resistance: 65 },
    discoveryText: 'Sương giá của tỏi sương tuyết phong ấn lấy vị tươi ngon của măng xuân, sự tươi mát ướp lạnh.'
  },
  {
    id: 'golden_watermelon',
    name: 'Đế Qua',
    parentCropA: 'golden_melon',
    parentCropB: 'watermelon',
    minSweetness: 70,
    minYield: 60,
    resultCropId: 'golden_watermelon',
    baseGenetics: { sweetness: 80, yield: 70, resistance: 60 },
    discoveryText: 'Dưa kim mật quay về với bản nguyên của dưa hấu, độ ngọt đạt tới đỉnh cao, bậc đế vương trong các loài dưa.'
  },
  {
    id: 'phoenix_peach',
    name: 'Hỏa Đào',
    parentCropA: 'phoenix_pepper',
    parentCropB: 'peach',
    minSweetness: 60,
    minYield: 55,
    resultCropId: 'phoenix_peach',
    baseGenetics: { sweetness: 70, yield: 65, resistance: 60 },
    discoveryText: 'Ngọn lửa của ớt phượng hoàng hôn lên quả đào, đỏ như hỏa diễm, ngọt xen lẫn cay.'
  },
  {
    id: 'moonlight_corn',
    name: 'Nguyệt Tuệ',
    parentCropA: 'moonlight_rice',
    parentCropB: 'corn',
    minSweetness: 60,
    minYield: 65,
    resultCropId: 'moonlight_corn',
    baseGenetics: { sweetness: 70, yield: 75, resistance: 55 },
    discoveryText: 'Ánh bạc của lúa nguyệt quang chiếu sáng bắp ngô, bắp bạc dưới trăng, thu hoạch đầy kho.'
  },
  {
    id: 'jade_chive',
    name: 'Hẹ Thúy',
    parentCropA: 'jade_tea',
    parentCropB: 'chives',
    minSweetness: 55,
    minYield: 55,
    resultCropId: 'jade_chive',
    baseGenetics: { sweetness: 65, yield: 65, resistance: 55 },
    discoveryText: 'Sắc xanh của trà phỉ thúy thấm vào cây hẹ, xanh mướt như muốn nhỏ vắt, hương cay nồng ngào ngạt.'
  },
  {
    id: 'frost_pumpkin',
    name: 'Bí Đỏ Sương',
    parentCropA: 'frost_garlic',
    parentCropB: 'pumpkin',
    minSweetness: 60,
    minYield: 55,
    resultCropId: 'frost_pumpkin',
    baseGenetics: { sweetness: 70, yield: 65, resistance: 65 },
    discoveryText: 'Hàn khí của tỏi sương tuyết ngưng tụ trên quả bí đỏ, bí đỏ ướp lạnh ngọt như mật.'
  },
  {
    id: 'emerald_rice',
    name: 'Lúa Thúy Lạp',
    parentCropA: 'emerald_radish',
    parentCropB: 'rice',
    minSweetness: 50,
    minYield: 55,
    resultCropId: 'emerald_rice',
    baseGenetics: { sweetness: 60, yield: 65, resistance: 50 },
    discoveryText: 'Màu xanh của củ cải phỉ thúy thấm vào lúa gạo, hạt gạo màu xanh tỏa hương thơm ngát.'
  },
  {
    id: 'pearl_peach',
    name: 'Đào Châu',
    parentCropA: 'pearl_grain',
    parentCropB: 'peach',
    minSweetness: 60,
    minYield: 55,
    resultCropId: 'pearl_peach',
    baseGenetics: { sweetness: 70, yield: 65, resistance: 55 },
    discoveryText: 'Sự trong trẻo của lúa trân châu hòa quyện với màu hồng hào của quả đào, quả tròn trịa như viên minh châu.'
  },
  {
    id: 'golden_lotus',
    name: 'Kim Liên',
    parentCropA: 'golden_melon',
    parentCropB: 'lotus_seed',
    minSweetness: 65,
    minYield: 55,
    resultCropId: 'golden_lotus',
    baseGenetics: { sweetness: 75, yield: 65, resistance: 60 },
    discoveryText: 'Ánh sáng của dưa kim mật chiếu rọi hạt sen, đóa kim liên nở rộ tỏa sáng lấp lánh.'
  },
  {
    id: 'phoenix_broad_bean',
    name: 'Đậu Phượng',
    parentCropA: 'phoenix_pepper',
    parentCropB: 'broad_bean',
    minSweetness: 55,
    minYield: 55,
    resultCropId: 'phoenix_broad_bean',
    baseGenetics: { sweetness: 60, yield: 65, resistance: 60 },
    discoveryText: 'Ngọn lửa của ớt phượng hoàng thiêu nướng hạt đậu tằm, trân phẩm được tôi luyện trong lửa.'
  },
  {
    id: 'moonlight_tea',
    name: 'Trà Nguyệt Nha',
    parentCropA: 'moonlight_rice',
    parentCropB: 'tea',
    minSweetness: 65,
    minYield: 55,
    resultCropId: 'moonlight_tea',
    baseGenetics: { sweetness: 75, yield: 65, resistance: 60 },
    discoveryText: 'Ánh bạc của lúa nguyệt quang hòa quyện với sự thanh nhã của lá trà, lá trà hình trăng khuyết mang hương thơm vương vấn.'
  },
  {
    id: 'jade_rapeseed',
    name: 'Cải Thúy Kim',
    parentCropA: 'jade_tea',
    parentCropB: 'rapeseed',
    minSweetness: 55,
    minYield: 55,
    resultCropId: 'jade_rapeseed',
    baseGenetics: { sweetness: 65, yield: 65, resistance: 55 },
    discoveryText: 'Màu xanh của trà phỉ thúy hòa quyện với màu vàng của cải dầu, xanh vàng đan xen.'
  },
  {
    id: 'frost_yam',
    name: 'Hoài Sơn Sương',
    parentCropA: 'frost_garlic',
    parentCropB: 'yam',
    minSweetness: 60,
    minYield: 55,
    resultCropId: 'frost_yam',
    baseGenetics: { sweetness: 70, yield: 65, resistance: 65 },
    discoveryText: 'Hàn khí của tỏi sương tuyết thấm vào hoài sơn, mát lạnh trơn tuột tan ngay trong miệng.'
  },
  // === 三代杂交作物 ===,
  {
    id: 'wind_melon',
    name: 'Phong Qua',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'jade_tea',
    minSweetness: 40,
    minYield: 40,
    resultCropId: 'wind_melon',
    baseGenetics: { sweetness: 55, yield: 55, resistance: 45 },
    discoveryText: 'Trân phẩm hình thành từ dưa kim mật và trà phỉ thúy trải qua sự tôi luyện của mưa gió.'
  },
  {
    id: 'cloud_bean',
    name: 'Vân Đậu',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'phoenix_pepper',
    minSweetness: 40,
    minYield: 40,
    resultCropId: 'cloud_bean',
    baseGenetics: { sweetness: 55, yield: 55, resistance: 45 },
    discoveryText: 'Dưa kim mật và ớt phượng hoàng hòa quyện trong gió mát, mang âm vận của tự nhiên.'
  },
  {
    id: 'rain_rice',
    name: 'Vũ Đạo',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'moonlight_rice',
    minSweetness: 41,
    minYield: 41,
    resultCropId: 'rain_rice',
    baseGenetics: { sweetness: 56, yield: 56, resistance: 46 },
    discoveryText: 'Dưa kim mật và lúa nguyệt quang tắm gội sương mai, do linh khí đất trời hóa thành.'
  },
  {
    id: 'hoar_tuber',
    name: 'Sương Thự',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'frost_garlic',
    minSweetness: 41,
    minYield: 41,
    resultCropId: 'hoar_tuber',
    baseGenetics: { sweetness: 56, yield: 56, resistance: 46 },
    discoveryText: 'Dưa kim mật và tỏi sương tuyết lột xác dưới ánh sao, tinh hoa của vạn vật.'
  },
  {
    id: 'thunder_green',
    name: 'Lôi Thái',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'emerald_radish',
    minSweetness: 41,
    minYield: 41,
    resultCropId: 'thunder_green',
    baseGenetics: { sweetness: 56, yield: 56, resistance: 47 },
    discoveryText: 'Dưa kim mật và củ cải phỉ thúy hội tụ linh khí núi sông, hóa thành trân phẩm.'
  },
  {
    id: 'rainbow_fruit',
    name: 'Hồng Quả',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'jade_shoot',
    minSweetness: 42,
    minYield: 42,
    resultCropId: 'rainbow_fruit',
    baseGenetics: { sweetness: 57, yield: 57, resistance: 47 },
    discoveryText: 'Dưa kim mật và măng bích ngọc trải qua sự tôi luyện của mưa gió tạo thành trân phẩm.'
  },
  {
    id: 'dew_bloom',
    name: 'Lộ Hoa',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'golden_tuber',
    minSweetness: 42,
    minYield: 42,
    resultCropId: 'dew_bloom',
    baseGenetics: { sweetness: 57, yield: 57, resistance: 47 },
    discoveryText: 'Dưa kim mật và khoai mỡ vàng hòa quyện trong gió mát, mang âm vận của tự nhiên.'
  },
  {
    id: 'dawn_tea',
    name: 'Thần Trà',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'peach_blossom_tea',
    minSweetness: 42,
    minYield: 42,
    resultCropId: 'dawn_tea',
    baseGenetics: { sweetness: 57, yield: 57, resistance: 48 },
    discoveryText: 'Dưa kim mật và trà hoa đào tắm gội sương mai, do linh khí đất trời hóa thành.'
  },
  {
    id: 'dusk_shoot',
    name: 'Mộ Duẩn',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'ruby_bean',
    minSweetness: 42,
    minYield: 42,
    resultCropId: 'dusk_shoot',
    baseGenetics: { sweetness: 58, yield: 58, resistance: 48 },
    discoveryText: 'Dưa kim mật và đậu hồng ngọc lột xác dưới ánh sao, tinh hoa của vạn vật.'
  },
  {
    id: 'star_lotus',
    name: 'Tinh Liên',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'twin_bean',
    minSweetness: 43,
    minYield: 43,
    resultCropId: 'star_lotus',
    baseGenetics: { sweetness: 58, yield: 58, resistance: 49 },
    discoveryText: 'Dưa kim mật và đậu song tử hội tụ linh khí núi sông, hóa thành trân phẩm.'
  },
  {
    id: 'wind_splendor_wheat',
    name: 'Phong Hoa Mạch',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'jade_melon',
    minSweetness: 43,
    minYield: 43,
    resultCropId: 'wind_splendor_wheat',
    baseGenetics: { sweetness: 58, yield: 58, resistance: 49 },
    discoveryText: 'Dưa kim mật và dưa bích ngọc trải qua sự tôi luyện của mưa gió tạo thành trân phẩm.'
  },
  {
    id: 'cloud_splendor_sesame',
    name: 'Vân Hoa Chi',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'pearl_grain',
    minSweetness: 43,
    minYield: 43,
    resultCropId: 'cloud_splendor_sesame',
    baseGenetics: { sweetness: 59, yield: 59, resistance: 49 },
    discoveryText: 'Dưa kim mật và lúa trân châu hòa quyện trong gió mát, mang âm vận của tự nhiên.'
  },
  {
    id: 'rain_splendor_pepper',
    name: 'Vũ Hoa Tiêu',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'golden_corn',
    minSweetness: 44,
    minYield: 44,
    resultCropId: 'rain_splendor_pepper',
    baseGenetics: { sweetness: 59, yield: 59, resistance: 50 },
    discoveryText: 'Dưa kim mật và ngô bông vàng tắm gội sương mai, do linh khí đất trời hóa thành.'
  },
  {
    id: 'hoar_splendor_root',
    name: 'Sương Hoa Sâm',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'lotus_tea',
    minSweetness: 44,
    minYield: 44,
    resultCropId: 'hoar_splendor_root',
    baseGenetics: { sweetness: 60, yield: 60, resistance: 50 },
    discoveryText: 'Dưa kim mật và trà liên tâm lột xác dưới ánh sao, tinh hoa của vạn vật.'
  },
  {
    id: 'thunder_splendor_sprout',
    name: 'Lôi Hoa Nha',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'purple_bamboo',
    minSweetness: 44,
    minYield: 44,
    resultCropId: 'thunder_splendor_sprout',
    baseGenetics: { sweetness: 60, yield: 60, resistance: 51 },
    discoveryText: 'Dưa kim mật và cà tử trúc hội tụ linh khí núi sông, hóa thành trân phẩm.'
  },
  {
    id: 'rainbow_splendor_vine',
    name: 'Hồng Hoa Đằng',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'honey_peach_melon',
    minSweetness: 45,
    minYield: 45,
    resultCropId: 'rainbow_splendor_vine',
    baseGenetics: { sweetness: 60, yield: 60, resistance: 51 },
    discoveryText: 'Dưa kim mật và dưa mật đào trải qua sự tôi luyện của mưa gió tạo thành trân phẩm.'
  },
  {
    id: 'dew_splendor_bud',
    name: 'Lộ Hoa Lôi',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'fire_bean',
    minSweetness: 45,
    minYield: 45,
    resultCropId: 'dew_splendor_bud',
    baseGenetics: { sweetness: 61, yield: 61, resistance: 52 },
    discoveryText: 'Dưa kim mật và đậu lửa hòa quyện trong gió mát, mang âm vận của tự nhiên.'
  },
  {
    id: 'dawn_splendor_orchid',
    name: 'Thần Hoa Lan',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'silk_bean',
    minSweetness: 45,
    minYield: 45,
    resultCropId: 'dawn_splendor_orchid',
    baseGenetics: { sweetness: 61, yield: 61, resistance: 52 },
    discoveryText: 'Dưa kim mật và đậu tơ tắm gội sương mai, do linh khí đất trời hóa thành.'
  },
  {
    id: 'dusk_splendor_gourd',
    name: 'Mộ Hoa Hồ',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'double_oil_seed',
    minSweetness: 46,
    minYield: 46,
    resultCropId: 'dusk_splendor_gourd',
    baseGenetics: { sweetness: 61, yield: 61, resistance: 52 },
    discoveryText: 'Dưa kim mật và hạt song dầu lột xác dưới ánh sao, tinh hoa của vạn vật.'
  },
  {
    id: 'star_splendor_herb',
    name: 'Tinh Hoa Thảo',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'lotus_potato',
    minSweetness: 46,
    minYield: 46,
    resultCropId: 'star_splendor_herb',
    baseGenetics: { sweetness: 62, yield: 62, resistance: 53 },
    discoveryText: 'Dưa kim mật và khoai hoa sen hội tụ linh khí núi sông, hóa thành trân phẩm.'
  },
  {
    id: 'wind_jade3_chestnut',
    name: 'Phong Thúy Lật',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'jade_pumpkin',
    minSweetness: 46,
    minYield: 46,
    resultCropId: 'wind_jade3_chestnut',
    baseGenetics: { sweetness: 62, yield: 62, resistance: 53 },
    discoveryText: 'Dưa kim mật và bí đỏ phỉ thúy trải qua sự tôi luyện của mưa gió tạo thành trân phẩm.'
  },
  {
    id: 'cloud_jade3_apricot',
    name: 'Vân Thúy Hạnh',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'crystal_yam',
    minSweetness: 46,
    minYield: 46,
    resultCropId: 'cloud_jade3_apricot',
    baseGenetics: { sweetness: 62, yield: 62, resistance: 54 },
    discoveryText: 'Dưa kim mật và hoài sơn pha lê hòa quyện trong gió mát, mang âm vận của tự nhiên.'
  },
  {
    id: 'rain_jade3_pear',
    name: 'Vũ Thúy Lê',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'osmanthus_tea',
    minSweetness: 47,
    minYield: 47,
    resultCropId: 'rain_jade3_pear',
    baseGenetics: { sweetness: 63, yield: 63, resistance: 54 },
    discoveryText: 'Dưa kim mật và trà hoa quế tắm gội sương mai, do linh khí đất trời hóa thành.'
  },
  {
    id: 'hoar_jade3_berry',
    name: 'Sương Thúy Môi',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'mountain_bamboo',
    minSweetness: 47,
    minYield: 47,
    resultCropId: 'hoar_jade3_berry',
    baseGenetics: { sweetness: 63, yield: 63, resistance: 54 },
    discoveryText: 'Dưa kim mật và khoai sơn trúc lột xác dưới ánh sao, tinh hoa của vạn vật.'
  },
  {
    id: 'thunder_jade3_peach_t',
    name: 'Lôi Thúy Đào',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'golden_fruit',
    minSweetness: 47,
    minYield: 47,
    resultCropId: 'thunder_jade3_peach_t',
    baseGenetics: { sweetness: 63, yield: 63, resistance: 55 },
    discoveryText: 'Dưa kim mật và quả kim thu hội tụ linh khí núi sông, hóa thành trân phẩm.'
  },
  {
    id: 'rainbow_jade3_melon',
    name: 'Hồng Thúy Qua',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'nut_potato',
    minSweetness: 48,
    minYield: 48,
    resultCropId: 'rainbow_jade3_melon',
    baseGenetics: { sweetness: 64, yield: 64, resistance: 55 },
    discoveryText: 'Dưa kim mật và khoai đậu phộng trải qua sự tôi luyện của mưa gió tạo thành trân phẩm.'
  },
  {
    id: 'dew_jade3_bean',
    name: 'Lộ Thúy Đậu',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'autumn_bean',
    minSweetness: 48,
    minYield: 48,
    resultCropId: 'dew_jade3_bean',
    baseGenetics: { sweetness: 64, yield: 64, resistance: 56 },
    discoveryText: 'Dưa kim mật và đậu táo thu hòa quyện trong gió mát, mang âm vận của tự nhiên.'
  },
  {
    id: 'dawn_jade3_rice',
    name: 'Thần Thúy Đạo',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'jujube_blossom',
    minSweetness: 48,
    minYield: 48,
    resultCropId: 'dawn_jade3_rice',
    baseGenetics: { sweetness: 64, yield: 64, resistance: 56 },
    discoveryText: 'Dưa kim mật và đào táo hoa tắm gội sương mai, do linh khí đất trời hóa thành.'
  },
  {
    id: 'dusk_jade3_tuber',
    name: 'Mộ Thúy Thự',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'ginger_blossom',
    minSweetness: 49,
    minYield: 49,
    resultCropId: 'dusk_jade3_tuber',
    baseGenetics: { sweetness: 65, yield: 65, resistance: 56 },
    discoveryText: 'Dưa kim mật và cải hoa gừng lột xác dưới ánh sao, tinh hoa của vạn vật.'
  },
  {
    id: 'star_jade3_green',
    name: 'Tinh Thúy Thái',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'fairy_chrysanthemum',
    minSweetness: 49,
    minYield: 49,
    resultCropId: 'star_jade3_green',
    baseGenetics: { sweetness: 65, yield: 65, resistance: 57 },
    discoveryText: 'Dưa kim mật và cải tiên cúc hội tụ linh khí núi sông, hóa thành trân phẩm.'
  },
  {
    id: 'wind_aura_fruit',
    name: 'Phong Linh Quả',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'imperial_cabbage',
    minSweetness: 49,
    minYield: 49,
    resultCropId: 'wind_aura_fruit',
    baseGenetics: { sweetness: 65, yield: 65, resistance: 57 },
    discoveryText: 'Dưa kim mật và ngự phẩm cải thảo trải qua sự tôi luyện của mưa gió tạo thành trân phẩm.'
  },
  {
    id: 'cloud_aura_bloom',
    name: 'Vân Linh Hoa',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'spicy_radish',
    minSweetness: 49,
    minYield: 49,
    resultCropId: 'cloud_aura_bloom',
    baseGenetics: { sweetness: 66, yield: 66, resistance: 58 },
    discoveryText: 'Dưa kim mật và củ cải hương tỏi hòa quyện trong gió mát, mang âm vận của tự nhiên.'
  },
  {
    id: 'rain_aura_tea',
    name: 'Vũ Linh Trà',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'snow_tea',
    minSweetness: 50,
    minYield: 50,
    resultCropId: 'rain_aura_tea',
    baseGenetics: { sweetness: 66, yield: 66, resistance: 58 },
    discoveryText: 'Dưa kim mật và trà tuyết tắm gội sương mai, do linh khí đất trời hóa thành.'
  },
  {
    id: 'hoar_aura_shoot',
    name: 'Sương Linh Duẩn',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'spring_chive',
    minSweetness: 50,
    minYield: 50,
    resultCropId: 'hoar_aura_shoot',
    baseGenetics: { sweetness: 66, yield: 66, resistance: 58 },
    discoveryText: 'Dưa kim mật và hẹ xuân lột xác dưới ánh sao, tinh hoa của vạn vật.'
  },
  {
    id: 'thunder_aura_lotus',
    name: 'Lôi Linh Liên',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'wheat_potato',
    minSweetness: 50,
    minYield: 50,
    resultCropId: 'thunder_aura_lotus',
    baseGenetics: { sweetness: 67, yield: 67, resistance: 59 },
    discoveryText: 'Dưa kim mật và khoai hương mạch hội tụ linh khí núi sông, hóa thành trân phẩm.'
  },
  {
    id: 'rainbow_aura_wheat',
    name: 'Hồng Linh Mạch',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'spring_green_peach',
    minSweetness: 51,
    minYield: 51,
    resultCropId: 'rainbow_aura_wheat',
    baseGenetics: { sweetness: 67, yield: 67, resistance: 59 },
    discoveryText: 'Dưa kim mật và đào xanh trải qua sự tôi luyện của mưa gió tạo thành trân phẩm.'
  },
  {
    id: 'dew_aura_sesame',
    name: 'Lộ Linh Chi',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'mustard_bean',
    minSweetness: 51,
    minYield: 51,
    resultCropId: 'dew_aura_sesame',
    baseGenetics: { sweetness: 67, yield: 67, resistance: 60 },
    discoveryText: 'Dưa kim mật và đậu hương mù tạt hòa quyện trong gió mát, mang âm vận của tự nhiên.'
  },
  {
    id: 'dawn_aura_pepper',
    name: 'Thần Linh Tiêu',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'frost_rapeseed',
    minSweetness: 51,
    minYield: 51,
    resultCropId: 'dawn_aura_pepper',
    baseGenetics: { sweetness: 68, yield: 68, resistance: 60 },
    discoveryText: 'Dưa kim mật và cải dầu sương tắm gội sương mai, do linh khí đất trời hóa thành.'
  },
  {
    id: 'dusk_aura_root',
    name: 'Mộ Linh Sâm',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'purple_melon',
    minSweetness: 52,
    minYield: 52,
    resultCropId: 'dusk_aura_root',
    baseGenetics: { sweetness: 68, yield: 68, resistance: 61 },
    discoveryText: 'Dưa kim mật và dưa tử tinh lột xác dưới ánh sao, tinh hoa của vạn vật.'
  },
  {
    id: 'star_aura_sprout',
    name: 'Tinh Linh Nha',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'golden_rice',
    minSweetness: 52,
    minYield: 52,
    resultCropId: 'star_aura_sprout',
    baseGenetics: { sweetness: 69, yield: 69, resistance: 61 },
    discoveryText: 'Dưa kim mật và lúa kim chi hội tụ linh khí núi sông, hóa thành trân phẩm.'
  },
  {
    id: 'wind_glow_vine',
    name: 'Phong Quang Đằng',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'double_lotus',
    minSweetness: 52,
    minYield: 52,
    resultCropId: 'wind_glow_vine',
    baseGenetics: { sweetness: 69, yield: 69, resistance: 61 },
    discoveryText: 'Dưa kim mật và song liên trải qua sự tôi luyện của mưa gió tạo thành trân phẩm.'
  },
  {
    id: 'cloud_glow_bud',
    name: 'Vân Quang Lôi',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'fire_sesame',
    minSweetness: 53,
    minYield: 53,
    resultCropId: 'cloud_glow_bud',
    baseGenetics: { sweetness: 69, yield: 69, resistance: 62 },
    discoveryText: 'Dưa kim mật và hỏa ma nhân hòa quyện trong gió mát, mang âm vận của tự nhiên.'
  },
  {
    id: 'rain_glow_orchid',
    name: 'Vũ Quang Lan',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'silk_corn',
    minSweetness: 53,
    minYield: 53,
    resultCropId: 'rain_glow_orchid',
    baseGenetics: { sweetness: 70, yield: 70, resistance: 62 },
    discoveryText: 'Dưa kim mật và tơ tuệ tắm gội sương mai, do linh khí đất trời hóa thành.'
  },
  {
    id: 'hoar_glow_gourd',
    name: 'Sương Quang Hồ',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'purple_lotus',
    minSweetness: 53,
    minYield: 53,
    resultCropId: 'hoar_glow_gourd',
    baseGenetics: { sweetness: 70, yield: 70, resistance: 63 },
    discoveryText: 'Dưa kim mật và cà tử liên lột xác dưới ánh sao, tinh hoa của vạn vật.'
  },
  {
    id: 'thunder_glow_herb',
    name: 'Lôi Quang Thảo',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'chrysanthemum_melon',
    minSweetness: 53,
    minYield: 53,
    resultCropId: 'thunder_glow_herb',
    baseGenetics: { sweetness: 70, yield: 70, resistance: 63 },
    discoveryText: 'Dưa kim mật và dưa cúc hội tụ linh khí núi sông, hóa thành trân phẩm.'
  },
  {
    id: 'rainbow_glow_chestnut',
    name: 'Hồng Quang Lật',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'pumpkin_rice',
    minSweetness: 54,
    minYield: 54,
    resultCropId: 'rainbow_glow_chestnut',
    baseGenetics: { sweetness: 71, yield: 71, resistance: 63 },
    discoveryText: 'Dưa kim mật và lúa bí đỏ trải qua sự tôi luyện của mưa gió tạo thành trân phẩm.'
  },
  {
    id: 'dew_glow_apricot',
    name: 'Lộ Quang Hạnh',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'mountain_lotus',
    minSweetness: 54,
    minYield: 54,
    resultCropId: 'dew_glow_apricot',
    baseGenetics: { sweetness: 71, yield: 71, resistance: 64 },
    discoveryText: 'Dưa kim mật và sơn liên hòa quyện trong gió mát, mang âm vận của tự nhiên.'
  },
  {
    id: 'dawn_glow_pear',
    name: 'Thần Quang Lê',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'double_nut',
    minSweetness: 54,
    minYield: 54,
    resultCropId: 'dawn_glow_pear',
    baseGenetics: { sweetness: 71, yield: 71, resistance: 64 },
    discoveryText: 'Dưa kim mật và song quả nhân tắm gội sương mai, do linh khí đất trời hóa thành.'
  },
  {
    id: 'dusk_glow_berry',
    name: 'Mộ Quang Môi',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'sweet_gourd',
    minSweetness: 55,
    minYield: 55,
    resultCropId: 'dusk_glow_berry',
    baseGenetics: { sweetness: 72, yield: 72, resistance: 65 },
    discoveryText: 'Dưa kim mật và mướp ngọt lột xác dưới ánh sao, tinh hoa của vạn vật.'
  },
  {
    id: 'star_glow_peach_t',
    name: 'Tinh Quang Đào',
    parentCropA: 'melon_tea_fruit',
    parentCropB: 'purple_persimmon',
    minSweetness: 55,
    minYield: 55,
    resultCropId: 'star_glow_peach_t',
    baseGenetics: { sweetness: 72, yield: 72, resistance: 65 },
    discoveryText: 'Dưa kim mật và hồng tím hội tụ linh khí núi sông, hóa thành trân phẩm.'
  },
  // === 四代杂交作物 ===,
  {
    id: 'moon_hua_melon',
    name: 'Nguyệt Hoa Qua',
    parentCropA: 'wind_melon',
    parentCropB: 'golden_melon',
    minSweetness: 50,
    minYield: 50,
    resultCropId: 'moon_hua_melon',
    baseGenetics: { sweetness: 62, yield: 62, resistance: 52 },
    discoveryText: 'Mật trà quả và dưa kim mật hòa quyện dưới ánh sáng thiên nhiên, nở rộ hào quang lộng lẫy.'
  },
  {
    id: 'sun_hua_bean',
    name: 'Nhật Hoa Đậu',
    parentCropA: 'wind_melon',
    parentCropB: 'jade_tea',
    minSweetness: 50,
    minYield: 50,
    resultCropId: 'sun_hua_bean',
    baseGenetics: { sweetness: 62, yield: 62, resistance: 52 },
    discoveryText: 'Mật trà quả và trà phỉ thúy thừa hưởng tinh hoa nhật nguyệt, tỏa sáng rực rỡ bốn phương.'
  },
  {
    id: 'sky_hua_rice',
    name: 'Thiên Hoa Đạo',
    parentCropA: 'wind_melon',
    parentCropB: 'phoenix_pepper',
    minSweetness: 51,
    minYield: 51,
    resultCropId: 'sky_hua_rice',
    baseGenetics: { sweetness: 63, yield: 63, resistance: 53 },
    discoveryText: 'Mật trà quả và ớt phượng hoàng ngưng tụ linh khí đất trời, thụy quang lấp lánh.'
  },
  {
    id: 'gem_hua_tuber',
    name: 'Ngọc Hoa Thự',
    parentCropA: 'wind_melon',
    parentCropB: 'moonlight_rice',
    minSweetness: 51,
    minYield: 51,
    resultCropId: 'gem_hua_tuber',
    baseGenetics: { sweetness: 63, yield: 63, resistance: 53 },
    discoveryText: 'Mật trà quả và lúa nguyệt quang tắm gội ánh sao, điềm báo tường thụy.'
  },
  {
    id: 'prism_hua_green',
    name: 'Lưu Hoa Thái',
    parentCropA: 'wind_melon',
    parentCropB: 'frost_garlic',
    minSweetness: 51,
    minYield: 51,
    resultCropId: 'prism_hua_green',
    baseGenetics: { sweetness: 63, yield: 63, resistance: 53 },
    discoveryText: 'Mật trà quả và tỏi sương tuyết lột xác trong ánh nguyệt hoa, tuyệt phẩm trời ban.'
  },
  {
    id: 'silver_hua_fruit',
    name: 'Ngân Hoa Quả',
    parentCropA: 'wind_melon',
    parentCropB: 'emerald_radish',
    minSweetness: 52,
    minYield: 52,
    resultCropId: 'silver_hua_fruit',
    baseGenetics: { sweetness: 64, yield: 64, resistance: 54 },
    discoveryText: 'Mật trà quả và củ cải phỉ thúy hòa quyện dưới ánh sáng thiên nhiên, nở rộ hào quang lộng lẫy.'
  },
  {
    id: 'verdant_hua_bloom',
    name: 'Thúy Hoa Hoa',
    parentCropA: 'wind_melon',
    parentCropB: 'jade_shoot',
    minSweetness: 52,
    minYield: 52,
    resultCropId: 'verdant_hua_bloom',
    baseGenetics: { sweetness: 64, yield: 64, resistance: 54 },
    discoveryText: 'Mật trà quả và măng bích ngọc thừa hưởng tinh hoa nhật nguyệt, tỏa sáng rực rỡ bốn phương.'
  },
  {
    id: 'violet_hua_tea',
    name: 'Tử Hoa Trà',
    parentCropA: 'wind_melon',
    parentCropB: 'golden_tuber',
    minSweetness: 52,
    minYield: 52,
    resultCropId: 'violet_hua_tea',
    baseGenetics: { sweetness: 64, yield: 64, resistance: 55 },
    discoveryText: 'Mật trà quả và khoai mỡ vàng ngưng tụ linh khí đất trời, thụy quang lấp lánh.'
  },
  {
    id: 'scarlet_hua_shoot',
    name: 'Đan Hoa Duẩn',
    parentCropA: 'wind_melon',
    parentCropB: 'peach_blossom_tea',
    minSweetness: 52,
    minYield: 52,
    resultCropId: 'scarlet_hua_shoot',
    baseGenetics: { sweetness: 65, yield: 65, resistance: 55 },
    discoveryText: 'Mật trà quả và trà hoa đào tắm gội ánh sao, điềm báo tường thụy.'
  },
  {
    id: 'azure_hua_lotus',
    name: 'Thanh Hoa Liên',
    parentCropA: 'wind_melon',
    parentCropB: 'ruby_bean',
    minSweetness: 53,
    minYield: 53,
    resultCropId: 'azure_hua_lotus',
    baseGenetics: { sweetness: 65, yield: 65, resistance: 55 },
    discoveryText: 'Mật trà quả và đậu hồng ngọc lột xác trong ánh nguyệt hoa, tuyệt phẩm trời ban.'
  },
  {
    id: 'moon_shine_wheat',
    name: 'Nguyệt Huy Mạch',
    parentCropA: 'wind_melon',
    parentCropB: 'twin_bean',
    minSweetness: 53,
    minYield: 53,
    resultCropId: 'moon_shine_wheat',
    baseGenetics: { sweetness: 65, yield: 65, resistance: 56 },
    discoveryText: 'Mật trà quả và đậu song tử hòa quyện dưới ánh sáng thiên nhiên, nở rộ hào quang lộng lẫy.'
  },
  {
    id: 'sun_shine_sesame',
    name: 'Nhật Huy Chi',
    parentCropA: 'wind_melon',
    parentCropB: 'jade_melon',
    minSweetness: 53,
    minYield: 53,
    resultCropId: 'sun_shine_sesame',
    baseGenetics: { sweetness: 66, yield: 66, resistance: 56 },
    discoveryText: 'Mật trà quả và dưa bích ngọc thừa hưởng tinh hoa nhật nguyệt, tỏa sáng rực rỡ bốn phương.'
  },
  {
    id: 'sky_shine_pepper',
    name: 'Thiên Huy Tiêu',
    parentCropA: 'wind_melon',
    parentCropB: 'pearl_grain',
    minSweetness: 54,
    minYield: 54,
    resultCropId: 'sky_shine_pepper',
    baseGenetics: { sweetness: 66, yield: 66, resistance: 56 },
    discoveryText: 'Mật trà quả và lúa trân châu ngưng tụ linh khí đất trời, thụy quang lấp lánh.'
  },
  {
    id: 'gem_shine_root',
    name: 'Ngọc Huy Sâm',
    parentCropA: 'wind_melon',
    parentCropB: 'golden_corn',
    minSweetness: 54,
    minYield: 54,
    resultCropId: 'gem_shine_root',
    baseGenetics: { sweetness: 66, yield: 66, resistance: 57 },
    discoveryText: 'Mật trà quả và ngô bông vàng tắm gội ánh sao, điềm báo tường thụy.'
  },
  {
    id: 'prism_shine_sprout',
    name: 'Lưu Huy Nha',
    parentCropA: 'wind_melon',
    parentCropB: 'lotus_tea',
    minSweetness: 54,
    minYield: 54,
    resultCropId: 'prism_shine_sprout',
    baseGenetics: { sweetness: 67, yield: 67, resistance: 57 },
    discoveryText: 'Mật trà quả và trà liên tâm lột xác trong ánh nguyệt hoa, tuyệt phẩm trời ban.'
  },
  {
    id: 'silver_shine_vine',
    name: 'Ngân Huy Đằng',
    parentCropA: 'wind_melon',
    parentCropB: 'purple_bamboo',
    minSweetness: 55,
    minYield: 55,
    resultCropId: 'silver_shine_vine',
    baseGenetics: { sweetness: 67, yield: 67, resistance: 58 },
    discoveryText: 'Mật trà quả và cà tử trúc hòa quyện dưới ánh sáng thiên nhiên, nở rộ hào quang lộng lẫy.'
  },
  {
    id: 'verdant_shine_bud',
    name: 'Thúy Huy Lôi',
    parentCropA: 'wind_melon',
    parentCropB: 'honey_peach_melon',
    minSweetness: 55,
    minYield: 55,
    resultCropId: 'verdant_shine_bud',
    baseGenetics: { sweetness: 67, yield: 67, resistance: 58 },
    discoveryText: 'Mật trà quả và dưa mật đào thừa hưởng tinh hoa nhật nguyệt, tỏa sáng rực rỡ bốn phương.'
  },
  {
    id: 'violet_shine_orchid',
    name: 'Tử Huy Lan',
    parentCropA: 'wind_melon',
    parentCropB: 'fire_bean',
    minSweetness: 55,
    minYield: 55,
    resultCropId: 'violet_shine_orchid',
    baseGenetics: { sweetness: 68, yield: 68, resistance: 58 },
    discoveryText: 'Mật trà quả và đậu lửa ngưng tụ linh khí đất trời, thụy quang lấp lánh.'
  },
  {
    id: 'scarlet_shine_gourd',
    name: 'Đan Huy Hồ',
    parentCropA: 'wind_melon',
    parentCropB: 'silk_bean',
    minSweetness: 56,
    minYield: 56,
    resultCropId: 'scarlet_shine_gourd',
    baseGenetics: { sweetness: 68, yield: 68, resistance: 59 },
    discoveryText: 'Mật trà quả và đậu tơ tắm gội ánh sao, điềm báo tường thụy.'
  },
  {
    id: 'azure_shine_herb',
    name: 'Thanh Huy Thảo',
    parentCropA: 'wind_melon',
    parentCropB: 'double_oil_seed',
    minSweetness: 56,
    minYield: 56,
    resultCropId: 'azure_shine_herb',
    baseGenetics: { sweetness: 68, yield: 68, resistance: 59 },
    discoveryText: 'Mật trà quả và hạt song dầu lột xác trong ánh nguyệt hoa, tuyệt phẩm trời ban.'
  },
  {
    id: 'moon_fortune_chestnut',
    name: 'Nguyệt Thụy Lật',
    parentCropA: 'wind_melon',
    parentCropB: 'lotus_potato',
    minSweetness: 56,
    minYield: 56,
    resultCropId: 'moon_fortune_chestnut',
    baseGenetics: { sweetness: 69, yield: 69, resistance: 59 },
    discoveryText: 'Mật trà quả và khoai hoa sen hòa quyện dưới ánh sáng thiên nhiên, nở rộ hào quang lộng lẫy.'
  },
  {
    id: 'sun_fortune_apricot',
    name: 'Nhật Thụy Hạnh',
    parentCropA: 'wind_melon',
    parentCropB: 'jade_pumpkin',
    minSweetness: 56,
    minYield: 56,
    resultCropId: 'sun_fortune_apricot',
    baseGenetics: { sweetness: 69, yield: 69, resistance: 60 },
    discoveryText: 'Mật trà quả và bí đỏ phỉ thúy thừa hưởng tinh hoa nhật nguyệt, tỏa sáng rực rỡ bốn phương.'
  },
  {
    id: 'sky_fortune_pear',
    name: 'Thiên Thụy Lê',
    parentCropA: 'wind_melon',
    parentCropB: 'crystal_yam',
    minSweetness: 57,
    minYield: 57,
    resultCropId: 'sky_fortune_pear',
    baseGenetics: { sweetness: 69, yield: 69, resistance: 60 },
    discoveryText: 'Mật trà quả và hoài sơn pha lê ngưng tụ linh khí đất trời, thụy quang lấp lánh.'
  },
  {
    id: 'gem_fortune_berry',
    name: 'Ngọc Thụy Môi',
    parentCropA: 'wind_melon',
    parentCropB: 'osmanthus_tea',
    minSweetness: 57,
    minYield: 57,
    resultCropId: 'gem_fortune_berry',
    baseGenetics: { sweetness: 70, yield: 70, resistance: 60 },
    discoveryText: 'Mật trà quả và trà hoa quế tắm gội ánh sao, điềm báo tường thụy.'
  },
  {
    id: 'prism_fortune_peach_t',
    name: 'Lưu Thụy Đào',
    parentCropA: 'wind_melon',
    parentCropB: 'mountain_bamboo',
    minSweetness: 57,
    minYield: 57,
    resultCropId: 'prism_fortune_peach_t',
    baseGenetics: { sweetness: 70, yield: 70, resistance: 61 },
    discoveryText: 'Mật trà quả và khoai sơn trúc lột xác trong ánh nguyệt hoa, tuyệt phẩm trời ban.'
  },
  {
    id: 'silver_fortune_melon',
    name: 'Ngân Thụy Qua',
    parentCropA: 'wind_melon',
    parentCropB: 'golden_fruit',
    minSweetness: 58,
    minYield: 58,
    resultCropId: 'silver_fortune_melon',
    baseGenetics: { sweetness: 70, yield: 70, resistance: 61 },
    discoveryText: 'Mật trà quả và quả kim thu hòa quyện dưới ánh sáng thiên nhiên, nở rộ hào quang lộng lẫy.'
  },
  {
    id: 'verdant_fortune_bean',
    name: 'Thúy Thụy Đậu',
    parentCropA: 'wind_melon',
    parentCropB: 'nut_potato',
    minSweetness: 58,
    minYield: 58,
    resultCropId: 'verdant_fortune_bean',
    baseGenetics: { sweetness: 70, yield: 70, resistance: 62 },
    discoveryText: 'Mật trà quả và khoai đậu phộng thừa hưởng tinh hoa nhật nguyệt, tỏa sáng rực rỡ bốn phương.'
  },
  {
    id: 'violet_fortune_rice',
    name: 'Tử Thụy Đạo',
    parentCropA: 'wind_melon',
    parentCropB: 'autumn_bean',
    minSweetness: 58,
    minYield: 58,
    resultCropId: 'violet_fortune_rice',
    baseGenetics: { sweetness: 71, yield: 71, resistance: 62 },
    discoveryText: 'Mật trà quả và đậu táo thu ngưng tụ linh khí đất trời, thụy quang lấp lánh.'
  },
  {
    id: 'scarlet_fortune_tuber',
    name: 'Đan Thụy Thự',
    parentCropA: 'wind_melon',
    parentCropB: 'jujube_blossom',
    minSweetness: 59,
    minYield: 59,
    resultCropId: 'scarlet_fortune_tuber',
    baseGenetics: { sweetness: 71, yield: 71, resistance: 62 },
    discoveryText: 'Mật trà quả và đào táo hoa tắm gội ánh sao, điềm báo tường thụy.'
  },
  {
    id: 'azure_fortune_green',
    name: 'Thanh Thụy Thái',
    parentCropA: 'wind_melon',
    parentCropB: 'ginger_blossom',
    minSweetness: 59,
    minYield: 59,
    resultCropId: 'azure_fortune_green',
    baseGenetics: { sweetness: 71, yield: 71, resistance: 63 },
    discoveryText: 'Mật trà quả và cải hoa gừng lột xác trong ánh nguyệt hoa, tuyệt phẩm trời ban.'
  },
  {
    id: 'moon_glory_fruit',
    name: 'Nguyệt Tường Quả',
    parentCropA: 'wind_melon',
    parentCropB: 'fairy_chrysanthemum',
    minSweetness: 59,
    minYield: 59,
    resultCropId: 'moon_glory_fruit',
    baseGenetics: { sweetness: 72, yield: 72, resistance: 63 },
    discoveryText: 'Mật trà quả và cải tiên cúc hòa quyện dưới ánh sáng thiên nhiên, nở rộ hào quang lộng lẫy.'
  },
  {
    id: 'sun_glory_bloom',
    name: 'Nhật Tường Hoa',
    parentCropA: 'wind_melon',
    parentCropB: 'imperial_cabbage',
    minSweetness: 59,
    minYield: 59,
    resultCropId: 'sun_glory_bloom',
    baseGenetics: { sweetness: 72, yield: 72, resistance: 63 },
    discoveryText: 'Mật trà quả và ngự phẩm cải thảo thừa hưởng tinh hoa nhật nguyệt, tỏa sáng rực rỡ bốn phương.'
  },
  {
    id: 'sky_glory_tea',
    name: 'Thiên Tường Trà',
    parentCropA: 'wind_melon',
    parentCropB: 'spicy_radish',
    minSweetness: 60,
    minYield: 60,
    resultCropId: 'sky_glory_tea',
    baseGenetics: { sweetness: 72, yield: 72, resistance: 64 },
    discoveryText: 'Mật trà quả và củ cải hương tỏi ngưng tụ linh khí đất trời, thụy quang lấp lánh.'
  },
  {
    id: 'gem_glory_shoot',
    name: 'Ngọc Tường Duẩn',
    parentCropA: 'wind_melon',
    parentCropB: 'snow_tea',
    minSweetness: 60,
    minYield: 60,
    resultCropId: 'gem_glory_shoot',
    baseGenetics: { sweetness: 73, yield: 73, resistance: 64 },
    discoveryText: 'Mật trà quả và trà tuyết tắm gội ánh sao, điềm báo tường thụy.'
  },
  {
    id: 'prism_glory_lotus',
    name: 'Lưu Tường Liên',
    parentCropA: 'wind_melon',
    parentCropB: 'spring_chive',
    minSweetness: 60,
    minYield: 60,
    resultCropId: 'prism_glory_lotus',
    baseGenetics: { sweetness: 73, yield: 73, resistance: 64 },
    discoveryText: 'Mật trà quả và hẹ xuân lột xác trong ánh nguyệt hoa, tuyệt phẩm trời ban.'
  },
  {
    id: 'silver_glory_wheat',
    name: 'Ngân Tường Mạch',
    parentCropA: 'wind_melon',
    parentCropB: 'wheat_potato',
    minSweetness: 61,
    minYield: 61,
    resultCropId: 'silver_glory_wheat',
    baseGenetics: { sweetness: 73, yield: 73, resistance: 65 },
    discoveryText: 'Mật trà quả và khoai hương mạch hòa quyện dưới ánh sáng thiên nhiên, nở rộ hào quang lộng lẫy.'
  },
  {
    id: 'verdant_glory_sesame',
    name: 'Thúy Tường Chi',
    parentCropA: 'wind_melon',
    parentCropB: 'spring_green_peach',
    minSweetness: 61,
    minYield: 61,
    resultCropId: 'verdant_glory_sesame',
    baseGenetics: { sweetness: 74, yield: 74, resistance: 65 },
    discoveryText: 'Mật trà quả và đào xanh thừa hưởng tinh hoa nhật nguyệt, tỏa sáng rực rỡ bốn phương.'
  },
  {
    id: 'violet_glory_pepper',
    name: 'Tử Tường Tiêu',
    parentCropA: 'wind_melon',
    parentCropB: 'mustard_bean',
    minSweetness: 61,
    minYield: 61,
    resultCropId: 'violet_glory_pepper',
    baseGenetics: { sweetness: 74, yield: 74, resistance: 66 },
    discoveryText: 'Mật trà quả và đậu hương mù tạt ngưng tụ linh khí đất trời, thụy quang lấp lánh.'
  },
  {
    id: 'scarlet_glory_root',
    name: 'Đan Tường Sâm',
    parentCropA: 'wind_melon',
    parentCropB: 'frost_rapeseed',
    minSweetness: 62,
    minYield: 62,
    resultCropId: 'scarlet_glory_root',
    baseGenetics: { sweetness: 74, yield: 74, resistance: 66 },
    discoveryText: 'Mật trà quả và cải dầu sương tắm gội ánh sao, điềm báo tường thụy.'
  },
  {
    id: 'azure_glory_sprout',
    name: 'Thanh Tường Nha',
    parentCropA: 'wind_melon',
    parentCropB: 'purple_melon',
    minSweetness: 62,
    minYield: 62,
    resultCropId: 'azure_glory_sprout',
    baseGenetics: { sweetness: 75, yield: 75, resistance: 66 },
    discoveryText: 'Mật trà quả và dưa tử tinh lột xác trong ánh nguyệt hoa, tuyệt phẩm trời ban.'
  },
  {
    id: 'moon_prism4_vine',
    name: 'Nguyệt Thải Đằng',
    parentCropA: 'wind_melon',
    parentCropB: 'golden_rice',
    minSweetness: 62,
    minYield: 62,
    resultCropId: 'moon_prism4_vine',
    baseGenetics: { sweetness: 75, yield: 75, resistance: 67 },
    discoveryText: 'Mật trà quả và lúa kim chi hòa quyện dưới ánh sáng thiên nhiên, nở rộ hào quang lộng lẫy.'
  },
  {
    id: 'sun_prism4_bud',
    name: 'Nhật Thải Lôi',
    parentCropA: 'wind_melon',
    parentCropB: 'double_lotus',
    minSweetness: 63,
    minYield: 63,
    resultCropId: 'sun_prism4_bud',
    baseGenetics: { sweetness: 75, yield: 75, resistance: 67 },
    discoveryText: 'Mật trà quả và song liên thừa hưởng tinh hoa nhật nguyệt, tỏa sáng rực rỡ bốn phương.'
  },
  {
    id: 'sky_prism4_orchid',
    name: 'Thiên Thải Lan',
    parentCropA: 'wind_melon',
    parentCropB: 'fire_sesame',
    minSweetness: 63,
    minYield: 63,
    resultCropId: 'sky_prism4_orchid',
    baseGenetics: { sweetness: 76, yield: 76, resistance: 67 },
    discoveryText: 'Mật trà quả và hỏa ma nhân ngưng tụ linh khí đất trời, thụy quang lấp lánh.'
  },
  {
    id: 'gem_prism4_gourd',
    name: 'Ngọc Thải Hồ',
    parentCropA: 'wind_melon',
    parentCropB: 'silk_corn',
    minSweetness: 63,
    minYield: 63,
    resultCropId: 'gem_prism4_gourd',
    baseGenetics: { sweetness: 76, yield: 76, resistance: 68 },
    discoveryText: 'Mật trà quả và tơ tuệ tắm gội ánh sao, điềm báo tường thụy.'
  },
  {
    id: 'prism_prism4_herb',
    name: 'Lưu Thải Thảo',
    parentCropA: 'wind_melon',
    parentCropB: 'purple_lotus',
    minSweetness: 63,
    minYield: 63,
    resultCropId: 'prism_prism4_herb',
    baseGenetics: { sweetness: 76, yield: 76, resistance: 68 },
    discoveryText: 'Mật trà quả và cà tử liên lột xác trong ánh nguyệt hoa, tuyệt phẩm trời ban.'
  },
  {
    id: 'silver_prism4_chestnut',
    name: 'Ngân Thải Lật',
    parentCropA: 'wind_melon',
    parentCropB: 'chrysanthemum_melon',
    minSweetness: 64,
    minYield: 64,
    resultCropId: 'silver_prism4_chestnut',
    baseGenetics: { sweetness: 77, yield: 77, resistance: 69 },
    discoveryText: 'Mật trà quả và dưa cúc hòa quyện dưới ánh sáng thiên nhiên, nở rộ hào quang lộng lẫy.'
  },
  {
    id: 'verdant_prism4_apricot',
    name: 'Thúy Thải Hạnh',
    parentCropA: 'wind_melon',
    parentCropB: 'pumpkin_rice',
    minSweetness: 64,
    minYield: 64,
    resultCropId: 'verdant_prism4_apricot',
    baseGenetics: { sweetness: 77, yield: 77, resistance: 69 },
    discoveryText: 'Mật trà quả và lúa bí đỏ thừa hưởng tinh hoa nhật nguyệt, tỏa sáng rực rỡ bốn phương.'
  },
  {
    id: 'violet_prism4_pear',
    name: 'Tử Thải Lê',
    parentCropA: 'wind_melon',
    parentCropB: 'mountain_lotus',
    minSweetness: 64,
    minYield: 64,
    resultCropId: 'violet_prism4_pear',
    baseGenetics: { sweetness: 77, yield: 77, resistance: 69 },
    discoveryText: 'Mật trà quả và sơn liên ngưng tụ linh khí đất trời, thụy quang lấp lánh.'
  },
  {
    id: 'scarlet_prism4_berry',
    name: 'Đan Thải Môi',
    parentCropA: 'wind_melon',
    parentCropB: 'double_nut',
    minSweetness: 65,
    minYield: 65,
    resultCropId: 'scarlet_prism4_berry',
    baseGenetics: { sweetness: 78, yield: 78, resistance: 70 },
    discoveryText: 'Mật trà quả và song quả nhân tắm gội ánh sao, điềm báo tường thụy.'
  },
  {
    id: 'azure_prism4_peach_t',
    name: 'Thanh Thải Đào',
    parentCropA: 'wind_melon',
    parentCropB: 'sweet_gourd',
    minSweetness: 65,
    minYield: 65,
    resultCropId: 'azure_prism4_peach_t',
    baseGenetics: { sweetness: 78, yield: 78, resistance: 70 },
    discoveryText: 'Mật trà quả và mướp ngọt lột xác trong ánh nguyệt hoa, tuyệt phẩm trời ban.'
  },
  // === 五代杂交作物 ===,
  {
    id: 'precious_light5_melon',
    name: 'Dao Quang Qua',
    parentCropA: 'moon_hua_melon',
    parentCropB: 'melon_tea_fruit',
    minSweetness: 60,
    minYield: 60,
    resultCropId: 'precious_light5_melon',
    baseGenetics: { sweetness: 70, yield: 70, resistance: 60 },
    discoveryText: 'Tinh hoa của phong qua và mật trà quả ngưng kết, trân quý dị thường.'
  },
  {
    id: 'rare_light5_bean',
    name: 'Quỳnh Quang Đậu',
    parentCropA: 'moon_hua_melon',
    parentCropB: 'dragon_fire',
    minSweetness: 61,
    minYield: 61,
    resultCropId: 'rare_light5_bean',
    baseGenetics: { sweetness: 71, yield: 71, resistance: 61 },
    discoveryText: 'Phong qua và ớt long hỏa nở rộ ánh dao quang trong nắng sớm.'
  },
  {
    id: 'magnif_light5_rice',
    name: 'Côi Quang Đạo',
    parentCropA: 'moon_hua_melon',
    parentCropB: 'celestial_rice',
    minSweetness: 61,
    minYield: 61,
    resultCropId: 'magnif_light5_rice',
    baseGenetics: { sweetness: 71, yield: 71, resistance: 62 },
    discoveryText: 'Phong qua và lúa thiên hương hội tụ quỳnh lộ, cẩm tú thiên thành.'
  },
  {
    id: 'radiant_light5_tuber',
    name: 'Hi Quang Thự',
    parentCropA: 'moon_hua_melon',
    parentCropB: 'ice_lotus',
    minSweetness: 62,
    minYield: 62,
    resultCropId: 'radiant_light5_tuber',
    baseGenetics: { sweetness: 72, yield: 72, resistance: 62 },
    discoveryText: 'Phong qua và băng liên giao thoa ánh lưu ly, kỳ lệ phi phàm.'
  },
  {
    id: 'lustrous_light5_green',
    name: 'Ly Quang Thái',
    parentCropA: 'moon_hua_melon',
    parentCropB: 'jade_peach_tea',
    minSweetness: 63,
    minYield: 63,
    resultCropId: 'lustrous_light5_green',
    baseGenetics: { sweetness: 73, yield: 73, resistance: 63 },
    discoveryText: 'Phong qua và trà thúy đào ngưng tụ tinh túy san hô, tuyệt phẩm lâm lang.'
  },
  {
    id: 'precious_hua5_fruit',
    name: 'Dao Hoa Quả',
    parentCropA: 'moon_hua_melon',
    parentCropB: 'golden_dragon',
    minSweetness: 63,
    minYield: 63,
    resultCropId: 'precious_hua5_fruit',
    baseGenetics: { sweetness: 73, yield: 73, resistance: 64 },
    discoveryText: 'Tinh hoa của phong qua và quả kim long ngưng kết, trân quý dị thường.'
  },
  {
    id: 'rare_hua5_bloom',
    name: 'Quỳnh Hoa Hoa',
    parentCropA: 'moon_hua_melon',
    parentCropB: 'moonlight_frost',
    minSweetness: 64,
    minYield: 64,
    resultCropId: 'rare_hua5_bloom',
    baseGenetics: { sweetness: 74, yield: 74, resistance: 65 },
    discoveryText: 'Phong qua và lúa nguyệt sương nở rộ ánh dao quang trong nắng sớm.'
  },
  {
    id: 'magnif_hua5_tea',
    name: 'Côi Hoa Trà',
    parentCropA: 'moon_hua_melon',
    parentCropB: 'jade_golden_melon',
    minSweetness: 64,
    minYield: 64,
    resultCropId: 'magnif_hua5_tea',
    baseGenetics: { sweetness: 74, yield: 74, resistance: 65 },
    discoveryText: 'Phong qua và dưa phỉ thúy kim hội tụ quỳnh lộ, cẩm tú thiên thành.'
  },
  {
    id: 'radiant_hua5_shoot',
    name: 'Hi Hoa Duẩn',
    parentCropA: 'moon_hua_melon',
    parentCropB: 'immortal_flower',
    minSweetness: 65,
    minYield: 65,
    resultCropId: 'radiant_hua5_shoot',
    baseGenetics: { sweetness: 75, yield: 75, resistance: 66 },
    discoveryText: 'Phong qua và hoa tiên nhân giao thoa ánh lưu ly, kỳ lệ phi phàm.'
  },
  {
    id: 'lustrous_hua5_lotus',
    name: 'Ly Hoa Liên',
    parentCropA: 'moon_hua_melon',
    parentCropB: 'dragon_pearl',
    minSweetness: 66,
    minYield: 66,
    resultCropId: 'lustrous_hua5_lotus',
    baseGenetics: { sweetness: 76, yield: 76, resistance: 67 },
    discoveryText: 'Phong qua và long châu ngưng tụ tinh túy san hô, tuyệt phẩm lâm lang.'
  },
  {
    id: 'precious_dewdrop_wheat',
    name: 'Dao Lộ Mạch',
    parentCropA: 'sun_hua_bean',
    parentCropB: 'ice_lotus',
    minSweetness: 66,
    minYield: 66,
    resultCropId: 'precious_dewdrop_wheat',
    baseGenetics: { sweetness: 76, yield: 76, resistance: 68 },
    discoveryText: 'Tinh hoa của vân đậu và băng liên ngưng kết, trân quý dị thường.'
  },
  {
    id: 'rare_dewdrop_sesame',
    name: 'Quỳnh Lộ Chi',
    parentCropA: 'sun_hua_bean',
    parentCropB: 'jade_peach_tea',
    minSweetness: 67,
    minYield: 67,
    resultCropId: 'rare_dewdrop_sesame',
    baseGenetics: { sweetness: 77, yield: 77, resistance: 68 },
    discoveryText: 'Vân đậu và trà thúy đào nở rộ ánh dao quang trong nắng sớm.'
  },
  {
    id: 'magnif_dewdrop_pepper',
    name: 'Côi Lộ Tiêu',
    parentCropA: 'sun_hua_bean',
    parentCropB: 'golden_dragon',
    minSweetness: 68,
    minYield: 68,
    resultCropId: 'magnif_dewdrop_pepper',
    baseGenetics: { sweetness: 78, yield: 78, resistance: 69 },
    discoveryText: 'Vân đậu và quả kim long hội tụ quỳnh lộ, cẩm tú thiên thành.'
  },
  {
    id: 'radiant_dewdrop_root',
    name: 'Hi Lộ Sâm',
    parentCropA: 'sun_hua_bean',
    parentCropB: 'moonlight_frost',
    minSweetness: 68,
    minYield: 68,
    resultCropId: 'radiant_dewdrop_root',
    baseGenetics: { sweetness: 78, yield: 78, resistance: 70 },
    discoveryText: 'Vân đậu và lúa nguyệt sương giao thoa ánh lưu ly, kỳ lệ phi phàm.'
  },
  {
    id: 'lustrous_dewdrop_sprout',
    name: 'Ly Lộ Nha',
    parentCropA: 'sun_hua_bean',
    parentCropB: 'jade_golden_melon',
    minSweetness: 69,
    minYield: 69,
    resultCropId: 'lustrous_dewdrop_sprout',
    baseGenetics: { sweetness: 79, yield: 79, resistance: 71 },
    discoveryText: 'Vân đậu và dưa phỉ thúy kim ngưng tụ tinh túy san hô, tuyệt phẩm lâm lang.'
  },
  {
    id: 'precious_soul_vine',
    name: 'Dao Linh Đằng',
    parentCropA: 'sun_hua_bean',
    parentCropB: 'immortal_flower',
    minSweetness: 69,
    minYield: 69,
    resultCropId: 'precious_soul_vine',
    baseGenetics: { sweetness: 79, yield: 79, resistance: 71 },
    discoveryText: 'Tinh hoa của vân đậu và hoa tiên nhân ngưng kết, trân quý dị thường.'
  },
  {
    id: 'rare_soul_bud',
    name: 'Quỳnh Linh Lôi',
    parentCropA: 'sun_hua_bean',
    parentCropB: 'dragon_pearl',
    minSweetness: 70,
    minYield: 70,
    resultCropId: 'rare_soul_bud',
    baseGenetics: { sweetness: 80, yield: 80, resistance: 72 },
    discoveryText: 'Vân đậu và long châu nở rộ ánh dao quang trong nắng sớm.'
  },
  {
    id: 'magnif_soul_orchid',
    name: 'Côi Linh Lan',
    parentCropA: 'sun_hua_bean',
    parentCropB: 'melon_tea_fruit',
    minSweetness: 71,
    minYield: 71,
    resultCropId: 'magnif_soul_orchid',
    baseGenetics: { sweetness: 81, yield: 81, resistance: 73 },
    discoveryText: 'Vân đậu và mật trà quả hội tụ quỳnh lộ, cẩm tú thiên thành.'
  },
  {
    id: 'radiant_soul_gourd',
    name: 'Hi Linh Hồ',
    parentCropA: 'sun_hua_bean',
    parentCropB: 'dragon_fire',
    minSweetness: 71,
    minYield: 71,
    resultCropId: 'radiant_soul_gourd',
    baseGenetics: { sweetness: 81, yield: 81, resistance: 74 },
    discoveryText: 'Vân đậu và ớt long hỏa giao thoa ánh lưu ly, kỳ lệ phi phàm.'
  },
  {
    id: 'lustrous_soul_herb',
    name: 'Ly Linh Thảo',
    parentCropA: 'sun_hua_bean',
    parentCropB: 'celestial_rice',
    minSweetness: 72,
    minYield: 72,
    resultCropId: 'lustrous_soul_herb',
    baseGenetics: { sweetness: 82, yield: 82, resistance: 74 },
    discoveryText: 'Vân đậu và lúa thiên hương ngưng tụ tinh túy san hô, tuyệt phẩm lâm lang.'
  },
  {
    id: 'precious_silk5_chestnut',
    name: 'Dao Cẩm Lật',
    parentCropA: 'sky_hua_rice',
    parentCropB: 'moonlight_frost',
    minSweetness: 73,
    minYield: 73,
    resultCropId: 'precious_silk5_chestnut',
    baseGenetics: { sweetness: 83, yield: 83, resistance: 75 },
    discoveryText: 'Tinh hoa của vũ đạo và lúa nguyệt sương ngưng kết, trân quý dị thường.'
  },
  {
    id: 'rare_silk5_apricot',
    name: 'Quỳnh Cẩm Hạnh',
    parentCropA: 'sky_hua_rice',
    parentCropB: 'jade_golden_melon',
    minSweetness: 73,
    minYield: 73,
    resultCropId: 'rare_silk5_apricot',
    baseGenetics: { sweetness: 83, yield: 83, resistance: 76 },
    discoveryText: 'Vũ đạo và dưa phỉ thúy kim nở rộ ánh dao quang trong nắng sớm.'
  },
  {
    id: 'magnif_silk5_pear',
    name: 'Côi Cẩm Lê',
    parentCropA: 'sky_hua_rice',
    parentCropB: 'immortal_flower',
    minSweetness: 74,
    minYield: 74,
    resultCropId: 'magnif_silk5_pear',
    baseGenetics: { sweetness: 84, yield: 84, resistance: 77 },
    discoveryText: 'Vũ đạo và hoa tiên nhân hội tụ quỳnh lộ, cẩm tú thiên thành.'
  },
  {
    id: 'radiant_silk5_berry',
    name: 'Hi Cẩm Môi',
    parentCropA: 'sky_hua_rice',
    parentCropB: 'dragon_pearl',
    minSweetness: 74,
    minYield: 74,
    resultCropId: 'radiant_silk5_berry',
    baseGenetics: { sweetness: 84, yield: 84, resistance: 77 },
    discoveryText: 'Vũ đạo và long châu giao thoa ánh lưu ly, kỳ lệ phi phàm.'
  },
  {
    id: 'lustrous_silk5_peach_t',
    name: 'Ly Cẩm Đào',
    parentCropA: 'sky_hua_rice',
    parentCropB: 'melon_tea_fruit',
    minSweetness: 75,
    minYield: 75,
    resultCropId: 'lustrous_silk5_peach_t',
    baseGenetics: { sweetness: 85, yield: 85, resistance: 78 },
    discoveryText: 'Vũ đạo và mật trà quả ngưng tụ tinh túy san hô, tuyệt phẩm lâm lang.'
  },
  // === 六代杂交作物 ===,
  {
    id: 'spirit_wonder_melon',
    name: 'Linh Diệu Qua',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'wind_melon',
    minSweetness: 65,
    minYield: 65,
    resultCropId: 'spirit_wonder_melon',
    baseGenetics: { sweetness: 75, yield: 75, resistance: 65 },
    discoveryText: 'Nguyệt hoa qua và phong qua giao hội linh khí, tiên vận thiên thành.'
  },
  {
    id: 'fairy_wonder_bean',
    name: 'Tiên Diệu Đậu',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'cloud_bean',
    minSweetness: 66,
    minYield: 66,
    resultCropId: 'fairy_wonder_bean',
    baseGenetics: { sweetness: 76, yield: 76, resistance: 66 },
    discoveryText: 'Nguyệt hoa qua và vân đậu lưu chuyển thánh hoa, siêu phàm nhập thánh.'
  },
  {
    id: 'holy_wonder_rice',
    name: 'Thánh Diệu Đạo',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'rain_rice',
    minSweetness: 66,
    minYield: 66,
    resultCropId: 'holy_wonder_rice',
    baseGenetics: { sweetness: 76, yield: 76, resistance: 66 },
    discoveryText: 'Nguyệt hoa qua và vũ đạo thần diệu khôn lường, chân linh chi phẩm.'
  },
  {
    id: 'divine_wonder_tuber',
    name: 'Thần Diệu Thự',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'hoar_tuber',
    minSweetness: 67,
    minYield: 67,
    resultCropId: 'divine_wonder_tuber',
    baseGenetics: { sweetness: 77, yield: 77, resistance: 67 },
    discoveryText: 'Nguyệt hoa qua và sương thự đan xen mộng ảo, thiền ý dạt dào.'
  },
  {
    id: 'trueth_wonder_green',
    name: 'Chân Diệu Thái',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'thunder_green',
    minSweetness: 68,
    minYield: 68,
    resultCropId: 'trueth_wonder_green',
    baseGenetics: { sweetness: 78, yield: 78, resistance: 68 },
    discoveryText: 'Nguyệt hoa qua và lôi thái quấn quýt tiên linh, không vương bụi trần.'
  },
  {
    id: 'spirit_grace6_fruit',
    name: 'Linh Hoa Quả',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'rainbow_fruit',
    minSweetness: 68,
    minYield: 68,
    resultCropId: 'spirit_grace6_fruit',
    baseGenetics: { sweetness: 78, yield: 78, resistance: 69 },
    discoveryText: 'Nguyệt hoa qua và hồng quả giao hội linh khí, tiên vận thiên thành.'
  },
  {
    id: 'fairy_grace6_bloom',
    name: 'Tiên Hoa Hoa',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'dew_bloom',
    minSweetness: 69,
    minYield: 69,
    resultCropId: 'fairy_grace6_bloom',
    baseGenetics: { sweetness: 79, yield: 79, resistance: 69 },
    discoveryText: 'Nguyệt hoa qua và lộ hoa lưu chuyển thánh hoa, siêu phàm nhập thánh.'
  },
  {
    id: 'holy_grace6_tea',
    name: 'Thánh Hoa Trà',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'dawn_tea',
    minSweetness: 69,
    minYield: 69,
    resultCropId: 'holy_grace6_tea',
    baseGenetics: { sweetness: 79, yield: 79, resistance: 70 },
    discoveryText: 'Nguyệt hoa qua và thần trà thần diệu khôn lường, chân linh chi phẩm.'
  },
  {
    id: 'divine_grace6_shoot',
    name: 'Thần Hoa Duẩn',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'dusk_shoot',
    minSweetness: 70,
    minYield: 70,
    resultCropId: 'divine_grace6_shoot',
    baseGenetics: { sweetness: 80, yield: 80, resistance: 71 },
    discoveryText: 'Nguyệt hoa qua và mộ duẩn đan xen mộng ảo, thiền ý dạt dào.'
  },
  {
    id: 'trueth_grace6_lotus',
    name: 'Chân Hoa Liên',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'star_lotus',
    minSweetness: 71,
    minYield: 71,
    resultCropId: 'trueth_grace6_lotus',
    baseGenetics: { sweetness: 81, yield: 81, resistance: 71 },
    discoveryText: 'Nguyệt hoa qua và tinh liên quấn quýt tiên linh, không vương bụi trần.'
  },
  {
    id: 'spirit_phantom_wheat',
    name: 'Linh Huyễn Mạch',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'wind_splendor_wheat',
    minSweetness: 71,
    minYield: 71,
    resultCropId: 'spirit_phantom_wheat',
    baseGenetics: { sweetness: 81, yield: 81, resistance: 72 },
    discoveryText: 'Nguyệt hoa qua và phong hoa mạch giao hội linh khí, tiên vận thiên thành.'
  },
  {
    id: 'fairy_phantom_sesame',
    name: 'Tiên Huyễn Chi',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'cloud_splendor_sesame',
    minSweetness: 72,
    minYield: 72,
    resultCropId: 'fairy_phantom_sesame',
    baseGenetics: { sweetness: 82, yield: 82, resistance: 73 },
    discoveryText: 'Nguyệt hoa qua và vân hoa chi lưu chuyển thánh hoa, siêu phàm nhập thánh.'
  },
  {
    id: 'holy_phantom_pepper',
    name: 'Thánh Huyễn Tiêu',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'rain_splendor_pepper',
    minSweetness: 73,
    minYield: 73,
    resultCropId: 'holy_phantom_pepper',
    baseGenetics: { sweetness: 83, yield: 83, resistance: 74 },
    discoveryText: 'Nguyệt hoa qua và vũ hoa tiêu thần diệu khôn lường, chân linh chi phẩm.'
  },
  {
    id: 'divine_phantom_root',
    name: 'Thần Huyễn Sâm',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'hoar_splendor_root',
    minSweetness: 73,
    minYield: 73,
    resultCropId: 'divine_phantom_root',
    baseGenetics: { sweetness: 83, yield: 83, resistance: 74 },
    discoveryText: 'Nguyệt hoa qua và sương hoa sâm đan xen mộng ảo, thiền ý dạt dào.'
  },
  {
    id: 'trueth_phantom_sprout',
    name: 'Chân Huyễn Nha',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'thunder_splendor_sprout',
    minSweetness: 74,
    minYield: 74,
    resultCropId: 'trueth_phantom_sprout',
    baseGenetics: { sweetness: 84, yield: 84, resistance: 75 },
    discoveryText: 'Nguyệt hoa qua và lôi hoa nha quấn quýt tiên linh, không vương bụi trần.'
  },
  {
    id: 'spirit_dream_vine',
    name: 'Linh Mộng Đằng',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'rainbow_splendor_vine',
    minSweetness: 74,
    minYield: 74,
    resultCropId: 'spirit_dream_vine',
    baseGenetics: { sweetness: 84, yield: 84, resistance: 76 },
    discoveryText: 'Nguyệt hoa qua và hồng hoa đằng giao hội linh khí, tiên vận thiên thành.'
  },
  {
    id: 'fairy_dream_bud',
    name: 'Tiên Mộng Lôi',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'dew_splendor_bud',
    minSweetness: 75,
    minYield: 75,
    resultCropId: 'fairy_dream_bud',
    baseGenetics: { sweetness: 85, yield: 85, resistance: 76 },
    discoveryText: 'Nguyệt hoa qua và lộ hoa lôi lưu chuyển thánh hoa, siêu phàm nhập thánh.'
  },
  {
    id: 'holy_dream_orchid',
    name: 'Thánh Mộng Lan',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'dawn_splendor_orchid',
    minSweetness: 76,
    minYield: 76,
    resultCropId: 'holy_dream_orchid',
    baseGenetics: { sweetness: 86, yield: 86, resistance: 77 },
    discoveryText: 'Nguyệt hoa qua và thần hoa lan thần diệu khôn lường, chân linh chi phẩm.'
  },
  {
    id: 'divine_dream_gourd',
    name: 'Thần Mộng Hồ',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'dusk_splendor_gourd',
    minSweetness: 76,
    minYield: 76,
    resultCropId: 'divine_dream_gourd',
    baseGenetics: { sweetness: 86, yield: 86, resistance: 78 },
    discoveryText: 'Nguyệt hoa qua và mộ hoa hồ đan xen mộng ảo, thiền ý dạt dào.'
  },
  {
    id: 'trueth_dream_herb',
    name: 'Chân Mộng Thảo',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'star_splendor_herb',
    minSweetness: 77,
    minYield: 77,
    resultCropId: 'trueth_dream_herb',
    baseGenetics: { sweetness: 87, yield: 87, resistance: 78 },
    discoveryText: 'Nguyệt hoa qua và tinh hoa thảo quấn quýt tiên linh, không vương bụi trần.'
  },
  {
    id: 'spirit_zen_chestnut',
    name: 'Linh Thiền Lật',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'wind_jade3_chestnut',
    minSweetness: 78,
    minYield: 78,
    resultCropId: 'spirit_zen_chestnut',
    baseGenetics: { sweetness: 88, yield: 88, resistance: 79 },
    discoveryText: 'Nguyệt hoa qua và phong thúy lật giao hội linh khí, tiên vận thiên thành.'
  },
  {
    id: 'fairy_zen_apricot',
    name: 'Tiên Thiền Hạnh',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'cloud_jade3_apricot',
    minSweetness: 78,
    minYield: 78,
    resultCropId: 'fairy_zen_apricot',
    baseGenetics: { sweetness: 88, yield: 88, resistance: 80 },
    discoveryText: 'Nguyệt hoa qua và vân thúy hạnh lưu chuyển thánh hoa, siêu phàm nhập thánh.'
  },
  {
    id: 'holy_zen_pear',
    name: 'Thánh Thiền Lê',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'rain_jade3_pear',
    minSweetness: 79,
    minYield: 79,
    resultCropId: 'holy_zen_pear',
    baseGenetics: { sweetness: 89, yield: 89, resistance: 81 },
    discoveryText: 'Nguyệt hoa qua và vũ thúy lê thần diệu khôn lường, chân linh chi phẩm.'
  },
  {
    id: 'divine_zen_berry',
    name: 'Thần Thiền Môi',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'hoar_jade3_berry',
    minSweetness: 79,
    minYield: 79,
    resultCropId: 'divine_zen_berry',
    baseGenetics: { sweetness: 89, yield: 89, resistance: 81 },
    discoveryText: 'Nguyệt hoa qua và sương thúy môi đan xen mộng ảo, thiền ý dạt dào.'
  },
  {
    id: 'trueth_zen_peach_t',
    name: 'Chân Thiền Đào',
    parentCropA: 'precious_light5_melon',
    parentCropB: 'thunder_jade3_peach_t',
    minSweetness: 80,
    minYield: 80,
    resultCropId: 'trueth_zen_peach_t',
    baseGenetics: { sweetness: 90, yield: 90, resistance: 82 },
    discoveryText: 'Nguyệt hoa qua và lôi thúy đào quấn quýt tiên linh, không vương bụi trần.'
  },
  // === 七代杂交作物 ===,
  {
    id: 'draco_song_melon',
    name: 'Long Ngâm Qua',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'moon_hua_melon',
    minSweetness: 72,
    minYield: 72,
    resultCropId: 'draco_song_melon',
    baseGenetics: { sweetness: 82, yield: 82, resistance: 72 },
    discoveryText: 'Thần lực của dao quang qua và nguyệt hoa qua dung hợp, mang thần uy của thần thú.'
  },
  {
    id: 'fenghuang_song_bean',
    name: 'Phượng Ngâm Đậu',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'sun_hua_bean',
    minSweetness: 73,
    minYield: 73,
    resultCropId: 'fenghuang_song_bean',
    baseGenetics: { sweetness: 83, yield: 83, resistance: 73 },
    discoveryText: 'Dao quang qua và nhật hoa đậu hòa quyện tạo tiếng long ngâm phượng minh, thụy thú giáng thế.'
  },
  {
    id: 'qilin_song_rice',
    name: 'Lân Ngâm Đạo',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'sky_hua_rice',
    minSweetness: 73,
    minYield: 73,
    resultCropId: 'qilin_song_rice',
    baseGenetics: { sweetness: 83, yield: 83, resistance: 73 },
    discoveryText: 'Dao quang qua và thiên hoa đạo tựa hổ gầm sơn lâm, hạc múa cửu thiên.'
  },
  {
    id: 'crane_song_tuber',
    name: 'Hạc Ngâm Thự',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'gem_hua_tuber',
    minSweetness: 74,
    minYield: 74,
    resultCropId: 'crane_song_tuber',
    baseGenetics: { sweetness: 84, yield: 84, resistance: 74 },
    discoveryText: 'Dao quang qua và ngọc hoa thự lấp lánh ánh lân quang, bách thú triều bái.'
  },
  {
    id: 'tiger_song_green',
    name: 'Hổ Ngâm Thái',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'prism_hua_green',
    minSweetness: 74,
    minYield: 74,
    resultCropId: 'tiger_song_green',
    baseGenetics: { sweetness: 84, yield: 84, resistance: 75 },
    discoveryText: 'Dao quang qua và lưu hoa thái như giao long xuất thủy, uy chấn bát phương.'
  },
  {
    id: 'draco_dance_fruit',
    name: 'Long Vũ Quả',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'silver_hua_fruit',
    minSweetness: 75,
    minYield: 75,
    resultCropId: 'draco_dance_fruit',
    baseGenetics: { sweetness: 85, yield: 85, resistance: 75 },
    discoveryText: 'Thần lực của dao quang qua và ngân hoa quả dung hợp, mang thần uy của thần thú.'
  },
  {
    id: 'fenghuang_dance_bloom',
    name: 'Phượng Vũ Hoa',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'verdant_hua_bloom',
    minSweetness: 75,
    minYield: 75,
    resultCropId: 'fenghuang_dance_bloom',
    baseGenetics: { sweetness: 85, yield: 85, resistance: 76 },
    discoveryText: 'Dao quang qua và thúy hoa hoa hòa quyện tạo tiếng long ngâm phượng minh, thụy thú giáng thế.'
  },
  {
    id: 'qilin_dance_tea',
    name: 'Lân Vũ Trà',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'violet_hua_tea',
    minSweetness: 76,
    minYield: 76,
    resultCropId: 'qilin_dance_tea',
    baseGenetics: { sweetness: 86, yield: 86, resistance: 77 },
    discoveryText: 'Dao quang qua và tử hoa trà tựa hổ gầm sơn lâm, hạc múa cửu thiên.'
  },
  {
    id: 'crane_dance_shoot',
    name: 'Hạc Vũ Duẩn',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'scarlet_hua_shoot',
    minSweetness: 76,
    minYield: 76,
    resultCropId: 'crane_dance_shoot',
    baseGenetics: { sweetness: 86, yield: 86, resistance: 77 },
    discoveryText: 'Dao quang qua và đan hoa duẩn lấp lánh ánh lân quang, bách thú triều bái.'
  },
  {
    id: 'tiger_dance_lotus',
    name: 'Hổ Vũ Liên',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'azure_hua_lotus',
    minSweetness: 77,
    minYield: 77,
    resultCropId: 'tiger_dance_lotus',
    baseGenetics: { sweetness: 87, yield: 87, resistance: 78 },
    discoveryText: 'Dao quang qua và thanh hoa liên như giao long xuất thủy, uy chấn bát phương.'
  },
  {
    id: 'draco_gleam7_wheat',
    name: 'Long Huy Mạch',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'moon_shine_wheat',
    minSweetness: 77,
    minYield: 77,
    resultCropId: 'draco_gleam7_wheat',
    baseGenetics: { sweetness: 87, yield: 87, resistance: 79 },
    discoveryText: 'Thần lực của dao quang qua và nguyệt huy mạch dung hợp, mang thần uy của thần thú.'
  },
  {
    id: 'fenghuang_gleam7_sesame',
    name: 'Phượng Huy Chi',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'sun_shine_sesame',
    minSweetness: 78,
    minYield: 78,
    resultCropId: 'fenghuang_gleam7_sesame',
    baseGenetics: { sweetness: 88, yield: 88, resistance: 79 },
    discoveryText: 'Dao quang qua và nhật huy chi hòa quyện tạo tiếng long ngâm phượng minh, thụy thú giáng thế.'
  },
  {
    id: 'qilin_gleam7_pepper',
    name: 'Lân Huy Tiêu',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'sky_shine_pepper',
    minSweetness: 79,
    minYield: 79,
    resultCropId: 'qilin_gleam7_pepper',
    baseGenetics: { sweetness: 88, yield: 88, resistance: 80 },
    discoveryText: 'Dao quang qua và thiên huy tiêu tựa hổ gầm sơn lâm, hạc múa cửu thiên.'
  },
  {
    id: 'crane_gleam7_root',
    name: 'Hạc Huy Sâm',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'gem_shine_root',
    minSweetness: 79,
    minYield: 79,
    resultCropId: 'crane_gleam7_root',
    baseGenetics: { sweetness: 89, yield: 89, resistance: 81 },
    discoveryText: 'Dao quang qua và ngọc huy sâm lấp lánh ánh lân quang, bách thú triều bái.'
  },
  {
    id: 'tiger_gleam7_sprout',
    name: 'Hổ Huy Nha',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'prism_shine_sprout',
    minSweetness: 80,
    minYield: 80,
    resultCropId: 'tiger_gleam7_sprout',
    baseGenetics: { sweetness: 89, yield: 89, resistance: 81 },
    discoveryText: 'Dao quang qua và lưu huy nha như giao long xuất thủy, uy chấn bát phương.'
  },
  {
    id: 'draco_shadow_vine',
    name: 'Long Ảnh Đằng',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'silver_shine_vine',
    minSweetness: 80,
    minYield: 80,
    resultCropId: 'draco_shadow_vine',
    baseGenetics: { sweetness: 90, yield: 90, resistance: 82 },
    discoveryText: 'Thần lực của dao quang qua và ngân huy đằng dung hợp, mang thần uy của thần thú.'
  },
  {
    id: 'fenghuang_shadow_bud',
    name: 'Phượng Ảnh Lôi',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'verdant_shine_bud',
    minSweetness: 81,
    minYield: 81,
    resultCropId: 'fenghuang_shadow_bud',
    baseGenetics: { sweetness: 90, yield: 90, resistance: 83 },
    discoveryText: 'Dao quang qua và thúy huy lôi hòa quyện tạo tiếng long ngâm phượng minh, thụy thú giáng thế.'
  },
  {
    id: 'qilin_shadow_orchid',
    name: 'Lân Ảnh Lan',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'violet_shine_orchid',
    minSweetness: 81,
    minYield: 81,
    resultCropId: 'qilin_shadow_orchid',
    baseGenetics: { sweetness: 91, yield: 91, resistance: 83 },
    discoveryText: 'Dao quang qua và tử huy lan tựa hổ gầm sơn lâm, hạc múa cửu thiên.'
  },
  {
    id: 'crane_shadow_gourd',
    name: 'Hạc Ảnh Hồ',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'scarlet_shine_gourd',
    minSweetness: 82,
    minYield: 82,
    resultCropId: 'crane_shadow_gourd',
    baseGenetics: { sweetness: 91, yield: 91, resistance: 84 },
    discoveryText: 'Dao quang qua và đan huy hồ lấp lánh ánh lân quang, bách thú triều bái.'
  },
  {
    id: 'tiger_shadow_herb',
    name: 'Hổ Ảnh Thảo',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'azure_shine_herb',
    minSweetness: 82,
    minYield: 82,
    resultCropId: 'tiger_shadow_herb',
    baseGenetics: { sweetness: 92, yield: 92, resistance: 85 },
    discoveryText: 'Dao quang qua và thanh huy thảo như giao long xuất thủy, uy chấn bát phương.'
  },
  {
    id: 'draco_roar_chestnut',
    name: 'Long Khiếu Lật',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'moon_fortune_chestnut',
    minSweetness: 83,
    minYield: 83,
    resultCropId: 'draco_roar_chestnut',
    baseGenetics: { sweetness: 92, yield: 92, resistance: 85 },
    discoveryText: 'Thần lực của dao quang qua và nguyệt thụy lật dung hợp, mang thần uy của thần thú.'
  },
  {
    id: 'fenghuang_roar_apricot',
    name: 'Phượng Khiếu Hạnh',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'sun_fortune_apricot',
    minSweetness: 83,
    minYield: 83,
    resultCropId: 'fenghuang_roar_apricot',
    baseGenetics: { sweetness: 93, yield: 93, resistance: 86 },
    discoveryText: 'Dao quang qua và nhật thụy hạnh hòa quyện tạo tiếng long ngâm phượng minh, thụy thú giáng thế.'
  },
  {
    id: 'qilin_roar_pear',
    name: 'Lân Khiếu Lê',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'sky_fortune_pear',
    minSweetness: 84,
    minYield: 84,
    resultCropId: 'qilin_roar_pear',
    baseGenetics: { sweetness: 93, yield: 93, resistance: 87 },
    discoveryText: 'Dao quang qua và thiên thụy lê tựa hổ gầm sơn lâm, hạc múa cửu thiên.'
  },
  {
    id: 'crane_roar_berry',
    name: 'Hạc Khiếu Môi',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'gem_fortune_berry',
    minSweetness: 84,
    minYield: 84,
    resultCropId: 'crane_roar_berry',
    baseGenetics: { sweetness: 94, yield: 94, resistance: 87 },
    discoveryText: 'Dao quang qua và ngọc thụy môi lấp lánh ánh lân quang, bách thú triều bái.'
  },
  {
    id: 'tiger_roar_peach_t',
    name: 'Hổ Khiếu Đào',
    parentCropA: 'spirit_wonder_melon',
    parentCropB: 'prism_fortune_peach_t',
    minSweetness: 85,
    minYield: 85,
    resultCropId: 'tiger_roar_peach_t',
    baseGenetics: { sweetness: 94, yield: 94, resistance: 88 },
    discoveryText: 'Dao quang qua và lưu thụy đào như giao long xuất thủy, uy chấn bát phương.'
  },
  // === 八代杂交作物 ===,
  {
    id: 'supreme_origin_melon',
    name: 'Thái Sơ Qua',
    parentCropA: 'draco_song_melon',
    parentCropB: 'precious_light5_melon',
    minSweetness: 78,
    minYield: 78,
    resultCropId: 'supreme_origin_melon',
    baseGenetics: { sweetness: 88, yield: 88, resistance: 78 },
    discoveryText: 'Linh diệu qua và dao quang qua ngưng tụ linh khí đất trời, nguyên khí dồi dào.'
  },
  {
    id: 'firmament_origin_bean',
    name: 'Càn Sơ Đậu',
    parentCropA: 'draco_song_melon',
    parentCropB: 'rare_light5_bean',
    minSweetness: 79,
    minYield: 79,
    resultCropId: 'firmament_origin_bean',
    baseGenetics: { sweetness: 88, yield: 88, resistance: 79 },
    discoveryText: 'Linh diệu qua và quỳnh quang đậu giao hòa càn khôn, âm dương hòa hợp.'
  },
  {
    id: 'terra_origin_rice',
    name: 'Khôn Sơ Đạo',
    parentCropA: 'draco_song_melon',
    parentCropB: 'magnif_light5_rice',
    minSweetness: 79,
    minYield: 79,
    resultCropId: 'terra_origin_rice',
    baseGenetics: { sweetness: 89, yield: 89, resistance: 79 },
    discoveryText: 'Linh diệu qua và côi quang đạo thức tỉnh sức mạnh thái sơ, hỗn nguyên quy nhất.'
  },
  {
    id: 'primal_origin_tuber',
    name: 'Nguyên Sơ Thự',
    parentCropA: 'draco_song_melon',
    parentCropB: 'radiant_light5_tuber',
    minSweetness: 80,
    minYield: 80,
    resultCropId: 'primal_origin_tuber',
    baseGenetics: { sweetness: 89, yield: 89, resistance: 80 },
    discoveryText: 'Linh diệu qua và hi quang thự giáng hạ ánh sáng thiên cực, vạn vật quy nguyên.'
  },
  {
    id: 'chaos_origin_green',
    name: 'Hỗn Sơ Thái',
    parentCropA: 'draco_song_melon',
    parentCropB: 'lustrous_light5_green',
    minSweetness: 80,
    minYield: 80,
    resultCropId: 'chaos_origin_green',
    baseGenetics: { sweetness: 90, yield: 90, resistance: 80 },
    discoveryText: 'Linh diệu qua và ly quang thái mở ra nguyên khí hỗn độn, thái nhất hiển hóa.'
  },
  {
    id: 'supreme_vital8_fruit',
    name: 'Thái Linh Quả',
    parentCropA: 'draco_song_melon',
    parentCropB: 'precious_hua5_fruit',
    minSweetness: 81,
    minYield: 81,
    resultCropId: 'supreme_vital8_fruit',
    baseGenetics: { sweetness: 90, yield: 90, resistance: 81 },
    discoveryText: 'Linh diệu qua và dao hoa quả ngưng tụ linh khí đất trời, nguyên khí dồi dào.'
  },
  {
    id: 'firmament_vital8_bloom',
    name: 'Càn Linh Hoa',
    parentCropA: 'draco_song_melon',
    parentCropB: 'rare_hua5_bloom',
    minSweetness: 81,
    minYield: 81,
    resultCropId: 'firmament_vital8_bloom',
    baseGenetics: { sweetness: 90, yield: 90, resistance: 82 },
    discoveryText: 'Linh diệu qua và quỳnh hoa hoa giao hòa càn khôn, âm dương hòa hợp.'
  },
  {
    id: 'terra_vital8_tea',
    name: 'Khôn Linh Trà',
    parentCropA: 'draco_song_melon',
    parentCropB: 'magnif_hua5_tea',
    minSweetness: 82,
    minYield: 82,
    resultCropId: 'terra_vital8_tea',
    baseGenetics: { sweetness: 91, yield: 91, resistance: 82 },
    discoveryText: 'Linh diệu qua và côi hoa trà thức tỉnh sức mạnh thái sơ, hỗn nguyên quy nhất.'
  },
  {
    id: 'primal_vital8_shoot',
    name: 'Nguyên Linh Duẩn',
    parentCropA: 'draco_song_melon',
    parentCropB: 'radiant_hua5_shoot',
    minSweetness: 82,
    minYield: 82,
    resultCropId: 'primal_vital8_shoot',
    baseGenetics: { sweetness: 91, yield: 91, resistance: 83 },
    discoveryText: 'Linh diệu qua và hi hoa duẩn giáng hạ ánh sáng thiên cực, vạn vật quy nguyên.'
  },
  {
    id: 'chaos_vital8_lotus',
    name: 'Hỗn Linh Liên',
    parentCropA: 'draco_song_melon',
    parentCropB: 'lustrous_hua5_lotus',
    minSweetness: 83,
    minYield: 83,
    resultCropId: 'chaos_vital8_lotus',
    baseGenetics: { sweetness: 91, yield: 91, resistance: 83 },
    discoveryText: 'Linh diệu qua và ly hoa liên mở ra nguyên khí hỗn độn, thái nhất hiển hóa.'
  },
  {
    id: 'supreme_glory8_wheat',
    name: 'Thái Hoa Mạch',
    parentCropA: 'draco_song_melon',
    parentCropB: 'precious_dewdrop_wheat',
    minSweetness: 83,
    minYield: 83,
    resultCropId: 'supreme_glory8_wheat',
    baseGenetics: { sweetness: 92, yield: 92, resistance: 84 },
    discoveryText: 'Linh diệu qua và dao lộ mạch ngưng tụ linh khí đất trời, nguyên khí dồi dào.'
  },
  {
    id: 'firmament_glory8_sesame',
    name: 'Càn Hoa Chi',
    parentCropA: 'draco_song_melon',
    parentCropB: 'rare_dewdrop_sesame',
    minSweetness: 84,
    minYield: 84,
    resultCropId: 'firmament_glory8_sesame',
    baseGenetics: { sweetness: 92, yield: 92, resistance: 84 },
    discoveryText: 'Linh diệu qua và quỳnh lộ chi giao hòa càn khôn, âm dương hòa hợp.'
  },
  {
    id: 'terra_glory8_pepper',
    name: 'Khôn Hoa Tiêu',
    parentCropA: 'draco_song_melon',
    parentCropB: 'magnif_dewdrop_pepper',
    minSweetness: 84,
    minYield: 84,
    resultCropId: 'terra_glory8_pepper',
    baseGenetics: { sweetness: 93, yield: 93, resistance: 85 },
    discoveryText: 'Linh diệu qua và côi lộ tiêu thức tỉnh sức mạnh thái sơ, hỗn nguyên quy nhất.'
  },
  {
    id: 'primal_glory8_root',
    name: 'Nguyên Hoa Sâm',
    parentCropA: 'draco_song_melon',
    parentCropB: 'radiant_dewdrop_root',
    minSweetness: 85,
    minYield: 85,
    resultCropId: 'primal_glory8_root',
    baseGenetics: { sweetness: 93, yield: 93, resistance: 86 },
    discoveryText: 'Linh diệu qua và hi lộ sâm giáng hạ ánh sáng thiên cực, vạn vật quy nguyên.'
  },
  {
    id: 'chaos_glory8_sprout',
    name: 'Hỗn Hoa Nha',
    parentCropA: 'draco_song_melon',
    parentCropB: 'lustrous_dewdrop_sprout',
    minSweetness: 85,
    minYield: 85,
    resultCropId: 'chaos_glory8_sprout',
    baseGenetics: { sweetness: 93, yield: 93, resistance: 86 },
    discoveryText: 'Linh diệu qua và ly lộ nha mở ra nguyên khí hỗn độn, thái nhất hiển hóa.'
  },
  {
    id: 'supreme_zenith_vine',
    name: 'Thái Cực Đằng',
    parentCropA: 'draco_song_melon',
    parentCropB: 'precious_soul_vine',
    minSweetness: 86,
    minYield: 86,
    resultCropId: 'supreme_zenith_vine',
    baseGenetics: { sweetness: 94, yield: 94, resistance: 87 },
    discoveryText: 'Linh diệu qua và dao linh đằng ngưng tụ linh khí đất trời, nguyên khí dồi dào.'
  },
  {
    id: 'firmament_zenith_bud',
    name: 'Càn Cực Lôi',
    parentCropA: 'draco_song_melon',
    parentCropB: 'rare_soul_bud',
    minSweetness: 86,
    minYield: 86,
    resultCropId: 'firmament_zenith_bud',
    baseGenetics: { sweetness: 94, yield: 94, resistance: 87 },
    discoveryText: 'Linh diệu qua và quỳnh linh lôi giao hòa càn khôn, âm dương hòa hợp.'
  },
  {
    id: 'terra_zenith_orchid',
    name: 'Khôn Cực Lan',
    parentCropA: 'draco_song_melon',
    parentCropB: 'magnif_soul_orchid',
    minSweetness: 87,
    minYield: 87,
    resultCropId: 'terra_zenith_orchid',
    baseGenetics: { sweetness: 94, yield: 94, resistance: 88 },
    discoveryText: 'Linh diệu qua và côi linh lan thức tỉnh sức mạnh thái sơ, hỗn nguyên quy nhất.'
  },
  {
    id: 'primal_zenith_gourd',
    name: 'Nguyên Cực Hồ',
    parentCropA: 'draco_song_melon',
    parentCropB: 'radiant_soul_gourd',
    minSweetness: 87,
    minYield: 87,
    resultCropId: 'primal_zenith_gourd',
    baseGenetics: { sweetness: 95, yield: 95, resistance: 89 },
    discoveryText: 'Linh diệu qua và hi linh hồ giáng hạ ánh sáng thiên cực, vạn vật quy nguyên.'
  },
  {
    id: 'chaos_zenith_herb',
    name: 'Hỗn Cực Thảo',
    parentCropA: 'draco_song_melon',
    parentCropB: 'lustrous_soul_herb',
    minSweetness: 88,
    minYield: 88,
    resultCropId: 'chaos_zenith_herb',
    baseGenetics: { sweetness: 95, yield: 95, resistance: 89 },
    discoveryText: 'Linh diệu qua và ly linh thảo mở ra nguyên khí hỗn độn, thái nhất hiển hóa.'
  },
  {
    id: 'supreme_core_chestnut',
    name: 'Thái Nguyên Lật',
    parentCropA: 'draco_song_melon',
    parentCropB: 'precious_silk5_chestnut',
    minSweetness: 88,
    minYield: 88,
    resultCropId: 'supreme_core_chestnut',
    baseGenetics: { sweetness: 96, yield: 96, resistance: 90 },
    discoveryText: 'Linh diệu qua và dao cẩm lật ngưng tụ linh khí đất trời, nguyên khí dồi dào.'
  },
  {
    id: 'firmament_core_apricot',
    name: 'Càn Nguyên Hạnh',
    parentCropA: 'draco_song_melon',
    parentCropB: 'rare_silk5_apricot',
    minSweetness: 89,
    minYield: 89,
    resultCropId: 'firmament_core_apricot',
    baseGenetics: { sweetness: 96, yield: 96, resistance: 90 },
    discoveryText: 'Linh diệu qua và quỳnh cẩm hạnh giao hòa càn khôn, âm dương hòa hợp.'
  },
  {
    id: 'terra_core_pear',
    name: 'Khôn Nguyên Lê',
    parentCropA: 'draco_song_melon',
    parentCropB: 'magnif_silk5_pear',
    minSweetness: 89,
    minYield: 89,
    resultCropId: 'terra_core_pear',
    baseGenetics: { sweetness: 96, yield: 96, resistance: 91 },
    discoveryText: 'Linh diệu qua và côi cẩm lê thức tỉnh sức mạnh thái sơ, hỗn nguyên quy nhất.'
  },
  {
    id: 'primal_core_berry',
    name: 'Nguyên Nguyên Môi',
    parentCropA: 'draco_song_melon',
    parentCropB: 'radiant_silk5_berry',
    minSweetness: 90,
    minYield: 90,
    resultCropId: 'primal_core_berry',
    baseGenetics: { sweetness: 97, yield: 97, resistance: 91 },
    discoveryText: 'Linh diệu qua và hi cẩm môi giáng hạ ánh sáng thiên cực, vạn vật quy nguyên.'
  },
  {
    id: 'chaos_core_peach_t',
    name: 'Hỗn Nguyên Đào',
    parentCropA: 'draco_song_melon',
    parentCropB: 'lustrous_silk5_peach_t',
    minSweetness: 90,
    minYield: 90,
    resultCropId: 'chaos_core_peach_t',
    baseGenetics: { sweetness: 97, yield: 97, resistance: 92 },
    discoveryText: 'Linh diệu qua và ly cẩm đào mở ra nguyên khí hỗn độn, thái nhất hiển hóa.'
  },
  // === 九代杂交作物 ===,
  {
    id: 'vast_meng_melon',
    name: 'Hồng Mông Qua',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'spirit_wonder_melon',
    minSweetness: 82,
    minYield: 82,
    resultCropId: 'vast_meng_melon',
    baseGenetics: { sweetness: 92, yield: 92, resistance: 85 },
    discoveryText: 'Long ngâm qua và linh diệu qua giao hội sức mạnh hồng mông, thông linh hóa cảnh.'
  },
  {
    id: 'ancient_meng_bean',
    name: 'Cổ Mông Đậu',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'fairy_wonder_bean',
    minSweetness: 82,
    minYield: 82,
    resultCropId: 'ancient_meng_bean',
    baseGenetics: { sweetness: 92, yield: 92, resistance: 85 },
    discoveryText: 'Long ngâm qua và tiên diệu đậu tỏa ra thái cổ hồng hoang chi khí, khai thiên lập địa.'
  },
  {
    id: 'infinite_meng_rice',
    name: 'Vô Mông Đạo',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'holy_wonder_rice',
    minSweetness: 83,
    minYield: 83,
    resultCropId: 'infinite_meng_rice',
    baseGenetics: { sweetness: 93, yield: 93, resistance: 86 },
    discoveryText: 'Long ngâm qua và thánh diệu đạo hiển hiện vô cực chi đạo, huyền diệu vô cùng.'
  },
  {
    id: 'primeval_meng_tuber',
    name: 'Hồng Mông Thự',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'divine_wonder_tuber',
    minSweetness: 83,
    minYield: 83,
    resultCropId: 'primeval_meng_tuber',
    baseGenetics: { sweetness: 93, yield: 93, resistance: 86 },
    discoveryText: 'Long ngâm qua và thần diệu thự bùng nổ sức mạnh hồng hoang, siêu việt vạn vật.'
  },
  {
    id: 'genesis_meng_green',
    name: 'Khai Mông Thái',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'trueth_wonder_green',
    minSweetness: 84,
    minYield: 84,
    resultCropId: 'genesis_meng_green',
    baseGenetics: { sweetness: 93, yield: 93, resistance: 87 },
    discoveryText: 'Long ngâm qua và chân diệu thái phán định thuở hồng mông, đất trời vì thế mà biến sắc.'
  },
  {
    id: 'vast_apex9_fruit',
    name: 'Hồng Cực Quả',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'spirit_grace6_fruit',
    minSweetness: 84,
    minYield: 84,
    resultCropId: 'vast_apex9_fruit',
    baseGenetics: { sweetness: 93, yield: 93, resistance: 87 },
    discoveryText: 'Long ngâm qua và linh hoa quả giao hội sức mạnh hồng mông, thông linh hóa cảnh.'
  },
  {
    id: 'ancient_apex9_bloom',
    name: 'Cổ Cực Hoa',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'fairy_grace6_bloom',
    minSweetness: 85,
    minYield: 85,
    resultCropId: 'ancient_apex9_bloom',
    baseGenetics: { sweetness: 94, yield: 94, resistance: 88 },
    discoveryText: 'Long ngâm qua và tiên hoa hoa tỏa ra thái cổ hồng hoang chi khí, khai thiên lập địa.'
  },
  {
    id: 'infinite_apex9_tea',
    name: 'Vô Cực Trà',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'holy_grace6_tea',
    minSweetness: 85,
    minYield: 85,
    resultCropId: 'infinite_apex9_tea',
    baseGenetics: { sweetness: 94, yield: 94, resistance: 88 },
    discoveryText: 'Long ngâm qua và thánh hoa trà hiển hiện vô cực chi đạo, huyền diệu vô cùng.'
  },
  {
    id: 'primeval_apex9_shoot',
    name: 'Hồng Cực Duẩn',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'divine_grace6_shoot',
    minSweetness: 86,
    minYield: 86,
    resultCropId: 'primeval_apex9_shoot',
    baseGenetics: { sweetness: 94, yield: 94, resistance: 89 },
    discoveryText: 'Long ngâm qua và thần hoa duẩn bùng nổ sức mạnh hồng hoang, siêu việt vạn vật.'
  },
  {
    id: 'genesis_apex9_lotus',
    name: 'Khai Cực Liên',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'trueth_grace6_lotus',
    minSweetness: 86,
    minYield: 86,
    resultCropId: 'genesis_apex9_lotus',
    baseGenetics: { sweetness: 95, yield: 95, resistance: 89 },
    discoveryText: 'Long ngâm qua và chân hoa liên phán định thuở hồng mông, đất trời vì thế mà biến sắc.'
  },
  {
    id: 'vast_wilder_wheat',
    name: 'Hồng Hoang Mạch',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'spirit_phantom_wheat',
    minSweetness: 87,
    minYield: 87,
    resultCropId: 'vast_wilder_wheat',
    baseGenetics: { sweetness: 95, yield: 95, resistance: 90 },
    discoveryText: 'Long ngâm qua và linh huyễn mạch giao hội sức mạnh hồng mông, thông linh hóa cảnh.'
  },
  {
    id: 'ancient_wilder_sesame',
    name: 'Cổ Hoang Chi',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'fairy_phantom_sesame',
    minSweetness: 87,
    minYield: 87,
    resultCropId: 'ancient_wilder_sesame',
    baseGenetics: { sweetness: 95, yield: 95, resistance: 90 },
    discoveryText: 'Long ngâm qua và tiên huyễn chi tỏa ra thái cổ hồng hoang chi khí, khai thiên lập địa.'
  },
  {
    id: 'infinite_wilder_pepper',
    name: 'Vô Hoang Tiêu',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'holy_phantom_pepper',
    minSweetness: 88,
    minYield: 88,
    resultCropId: 'infinite_wilder_pepper',
    baseGenetics: { sweetness: 96, yield: 96, resistance: 91 },
    discoveryText: 'Long ngâm qua và thánh huyễn tiêu hiển hiện vô cực chi đạo, huyền diệu vô cùng.'
  },
  {
    id: 'primeval_wilder_root',
    name: 'Hồng Hoang Sâm',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'divine_phantom_root',
    minSweetness: 88,
    minYield: 88,
    resultCropId: 'primeval_wilder_root',
    baseGenetics: { sweetness: 96, yield: 96, resistance: 91 },
    discoveryText: 'Long ngâm qua và thần huyễn sâm bùng nổ sức mạnh hồng hoang, siêu việt vạn vật.'
  },
  {
    id: 'genesis_wilder_sprout',
    name: 'Khai Hoang Nha',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'trueth_phantom_sprout',
    minSweetness: 88,
    minYield: 88,
    resultCropId: 'genesis_wilder_sprout',
    baseGenetics: { sweetness: 96, yield: 96, resistance: 91 },
    discoveryText: 'Long ngâm qua và chân huyễn nha phán định thuở hồng mông, đất trời vì thế mà biến sắc.'
  },
  {
    id: 'vast_empyrean_vine',
    name: 'Hồng Thiên Đằng',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'spirit_dream_vine',
    minSweetness: 89,
    minYield: 89,
    resultCropId: 'vast_empyrean_vine',
    baseGenetics: { sweetness: 96, yield: 96, resistance: 92 },
    discoveryText: 'Long ngâm qua và linh mộng đằng giao hội sức mạnh hồng mông, thông linh hóa cảnh.'
  },
  {
    id: 'ancient_empyrean_bud',
    name: 'Cổ Thiên Lôi',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'fairy_dream_bud',
    minSweetness: 89,
    minYield: 89,
    resultCropId: 'ancient_empyrean_bud',
    baseGenetics: { sweetness: 97, yield: 97, resistance: 92 },
    discoveryText: 'Long ngâm qua và tiên mộng lôi tỏa ra thái cổ hồng hoang chi khí, khai thiên lập địa.'
  },
  {
    id: 'infinite_empyrean_orchid',
    name: 'Vô Thiên Lan',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'holy_dream_orchid',
    minSweetness: 90,
    minYield: 90,
    resultCropId: 'infinite_empyrean_orchid',
    baseGenetics: { sweetness: 97, yield: 97, resistance: 93 },
    discoveryText: 'Long ngâm qua và thánh mộng lan hiển hiện vô cực chi đạo, huyền diệu vô cùng.'
  },
  {
    id: 'primeval_empyrean_gourd',
    name: 'Hồng Thiên Hồ',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'divine_dream_gourd',
    minSweetness: 90,
    minYield: 90,
    resultCropId: 'primeval_empyrean_gourd',
    baseGenetics: { sweetness: 97, yield: 97, resistance: 93 },
    discoveryText: 'Long ngâm qua và thần mộng hồ bùng nổ sức mạnh hồng hoang, siêu việt vạn vật.'
  },
  {
    id: 'genesis_empyrean_herb',
    name: 'Khai Thiên Thảo',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'trueth_dream_herb',
    minSweetness: 91,
    minYield: 91,
    resultCropId: 'genesis_empyrean_herb',
    baseGenetics: { sweetness: 98, yield: 98, resistance: 94 },
    discoveryText: 'Long ngâm qua và chân mộng thảo phán định thuở hồng mông, đất trời vì thế mà biến sắc.'
  },
  {
    id: 'vast_spirit9_chestnut',
    name: 'Hồng Linh Lật',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'spirit_zen_chestnut',
    minSweetness: 91,
    minYield: 91,
    resultCropId: 'vast_spirit9_chestnut',
    baseGenetics: { sweetness: 98, yield: 98, resistance: 94 },
    discoveryText: 'Long ngâm qua và linh thiền lật giao hội sức mạnh hồng mông, thông linh hóa cảnh.'
  },
  {
    id: 'ancient_spirit9_apricot',
    name: 'Cổ Linh Hạnh',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'fairy_zen_apricot',
    minSweetness: 92,
    minYield: 92,
    resultCropId: 'ancient_spirit9_apricot',
    baseGenetics: { sweetness: 98, yield: 98, resistance: 95 },
    discoveryText: 'Long ngâm qua và tiên thiền hạnh tỏa ra thái cổ hồng hoang chi khí, khai thiên lập địa.'
  },
  {
    id: 'infinite_spirit9_pear',
    name: 'Vô Linh Lê',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'holy_zen_pear',
    minSweetness: 92,
    minYield: 92,
    resultCropId: 'infinite_spirit9_pear',
    baseGenetics: { sweetness: 98, yield: 98, resistance: 95 },
    discoveryText: 'Long ngâm qua và thánh thiền lê hiển hiện vô cực chi đạo, huyền diệu vô cùng.'
  },
  {
    id: 'primeval_spirit9_berry',
    name: 'Hồng Linh Môi',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'divine_zen_berry',
    minSweetness: 93,
    minYield: 93,
    resultCropId: 'primeval_spirit9_berry',
    baseGenetics: { sweetness: 99, yield: 99, resistance: 96 },
    discoveryText: 'Long ngâm qua và thần thiền môi bùng nổ sức mạnh hồng hoang, siêu việt vạn vật.'
  },
  {
    id: 'genesis_spirit9_peach_t',
    name: 'Khai Linh Đào',
    parentCropA: 'supreme_origin_melon',
    parentCropB: 'trueth_zen_peach_t',
    minSweetness: 93,
    minYield: 93,
    resultCropId: 'genesis_spirit9_peach_t',
    baseGenetics: { sweetness: 99, yield: 99, resistance: 96 },
    discoveryText: 'Long ngâm qua và chân thiền đào phán định thuở hồng mông, đất trời vì thế mà biến sắc.'
  },
  // === 十代杂交作物 ===,
  {
    id: 'creation_change_melon',
    name: 'Tạo Hóa Qua',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'draco_song_melon',
    minSweetness: 88,
    minYield: 88,
    resultCropId: 'creation_change_melon',
    baseGenetics: { sweetness: 96, yield: 96, resistance: 90 },
    discoveryText: 'Thái sơ qua và long ngâm qua mượn tạo hóa chi lực thành tựu, tuyệt phẩm vĩnh hằng bất hủ.'
  },
  {
    id: 'eternal_change_bean',
    name: 'Vĩnh Hóa Đậu',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'fenghuang_song_bean',
    minSweetness: 88,
    minYield: 88,
    resultCropId: 'eternal_change_bean',
    baseGenetics: { sweetness: 96, yield: 96, resistance: 90 },
    discoveryText: 'Thái sơ qua và phượng ngâm đậu thiên mệnh sở quy, vạn tượng canh tân.'
  },
  {
    id: 'undying_change_rice',
    name: 'Bất Hóa Đạo',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'qilin_song_rice',
    minSweetness: 89,
    minYield: 89,
    resultCropId: 'undying_change_rice',
    baseGenetics: { sweetness: 96, yield: 96, resistance: 91 },
    discoveryText: 'Thái sơ qua và lân ngâm đạo luân hồi bất hủ, niết bàn trọng sinh.'
  },
  {
    id: 'heavenly_change_tuber',
    name: 'Thiên Hóa Thự',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'crane_song_tuber',
    minSweetness: 89,
    minYield: 89,
    resultCropId: 'heavenly_change_tuber',
    baseGenetics: { sweetness: 97, yield: 97, resistance: 91 },
    discoveryText: 'Thái sơ qua và hạc ngâm thự mượn tạo hóa trêu người, cuối cùng thành chí bảo.'
  },
  {
    id: 'myriad_change_green',
    name: 'Vạn Hóa Thái',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'tiger_song_green',
    minSweetness: 90,
    minYield: 90,
    resultCropId: 'myriad_change_green',
    baseGenetics: { sweetness: 97, yield: 97, resistance: 92 },
    discoveryText: 'Ánh sáng vĩnh hằng bất diệt của thái sơ qua và hổ ngâm thái, chiếu rọi khắp đất trời.'
  },
  {
    id: 'creation_lasting_fruit',
    name: 'Tạo Hằng Quả',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'draco_dance_fruit',
    minSweetness: 90,
    minYield: 90,
    resultCropId: 'creation_lasting_fruit',
    baseGenetics: { sweetness: 97, yield: 97, resistance: 92 },
    discoveryText: 'Thái sơ qua và long vũ quả mượn tạo hóa chi lực thành tựu, tuyệt phẩm vĩnh hằng bất hủ.'
  },
  {
    id: 'eternal_lasting_bloom',
    name: 'Vĩnh Hằng Hoa',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'fenghuang_dance_bloom',
    minSweetness: 91,
    minYield: 91,
    resultCropId: 'eternal_lasting_bloom',
    baseGenetics: { sweetness: 97, yield: 97, resistance: 93 },
    discoveryText: 'Thái sơ qua và phượng vũ hoa thiên mệnh sở quy, vạn tượng canh tân.'
  },
  {
    id: 'undying_lasting_tea',
    name: 'Bất Hằng Trà',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'qilin_dance_tea',
    minSweetness: 91,
    minYield: 91,
    resultCropId: 'undying_lasting_tea',
    baseGenetics: { sweetness: 97, yield: 97, resistance: 93 },
    discoveryText: 'Thái sơ qua và lân vũ trà luân hồi bất hủ, niết bàn trọng sinh.'
  },
  {
    id: 'heavenly_lasting_shoot',
    name: 'Thiên Hằng Duẩn',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'crane_dance_shoot',
    minSweetness: 91,
    minYield: 91,
    resultCropId: 'heavenly_lasting_shoot',
    baseGenetics: { sweetness: 97, yield: 97, resistance: 93 },
    discoveryText: 'Thái sơ qua và hạc vũ duẩn mượn tạo hóa trêu người, cuối cùng thành chí bảo.'
  },
  {
    id: 'myriad_lasting_lotus',
    name: 'Vạn Hằng Liên',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'tiger_dance_lotus',
    minSweetness: 92,
    minYield: 92,
    resultCropId: 'myriad_lasting_lotus',
    baseGenetics: { sweetness: 98, yield: 98, resistance: 94 },
    discoveryText: 'Ánh sáng vĩnh hằng bất diệt của thái sơ qua và hổ vũ liên, chiếu rọi khắp đất trời.'
  },
  {
    id: 'creation_timeless_wheat',
    name: 'Tạo Hủ Mạch',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'draco_gleam7_wheat',
    minSweetness: 92,
    minYield: 92,
    resultCropId: 'creation_timeless_wheat',
    baseGenetics: { sweetness: 98, yield: 98, resistance: 94 },
    discoveryText: 'Thái sơ qua và long huy mạch mượn tạo hóa chi lực thành tựu, tuyệt phẩm vĩnh hằng bất hủ.'
  },
  {
    id: 'eternal_timeless_sesame',
    name: 'Vĩnh Hủ Chi',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'fenghuang_gleam7_sesame',
    minSweetness: 93,
    minYield: 93,
    resultCropId: 'eternal_timeless_sesame',
    baseGenetics: { sweetness: 98, yield: 98, resistance: 95 },
    discoveryText: 'Thái sơ qua và phượng huy chi thiên mệnh sở quy, vạn tượng canh tân.'
  },
  {
    id: 'undying_timeless_pepper',
    name: 'Bất Hủ Tiêu',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'qilin_gleam7_pepper',
    minSweetness: 93,
    minYield: 93,
    resultCropId: 'undying_timeless_pepper',
    baseGenetics: { sweetness: 98, yield: 98, resistance: 95 },
    discoveryText: 'Thái sơ qua và lân huy tiêu luân hồi bất hủ, niết bàn trọng sinh.'
  },
  {
    id: 'heavenly_timeless_root',
    name: 'Thiên Hủ Sâm',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'crane_gleam7_root',
    minSweetness: 93,
    minYield: 93,
    resultCropId: 'heavenly_timeless_root',
    baseGenetics: { sweetness: 98, yield: 98, resistance: 95 },
    discoveryText: 'Thái sơ qua và hạc huy sâm mượn tạo hóa trêu người, cuối cùng thành chí bảo.'
  },
  {
    id: 'myriad_timeless_sprout',
    name: 'Vạn Hủ Nha',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'tiger_gleam7_sprout',
    minSweetness: 94,
    minYield: 94,
    resultCropId: 'myriad_timeless_sprout',
    baseGenetics: { sweetness: 98, yield: 98, resistance: 96 },
    discoveryText: 'Ánh sáng vĩnh hằng bất diệt của thái sơ qua và hổ huy nha, chiếu rọi khắp đất trời.'
  },
  {
    id: 'creation_destiny_vine',
    name: 'Tạo Mệnh Đằng',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'draco_shadow_vine',
    minSweetness: 94,
    minYield: 94,
    resultCropId: 'creation_destiny_vine',
    baseGenetics: { sweetness: 99, yield: 99, resistance: 96 },
    discoveryText: 'Thái sơ qua và long ảnh đằng mượn tạo hóa chi lực thành tựu, tuyệt phẩm vĩnh hằng bất hủ.'
  },
  {
    id: 'eternal_destiny_bud',
    name: 'Vĩnh Mệnh Lôi',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'fenghuang_shadow_bud',
    minSweetness: 95,
    minYield: 95,
    resultCropId: 'eternal_destiny_bud',
    baseGenetics: { sweetness: 99, yield: 99, resistance: 97 },
    discoveryText: 'Thái sơ qua và phượng ảnh lôi thiên mệnh sở quy, vạn tượng canh tân.'
  },
  {
    id: 'undying_destiny_orchid',
    name: 'Bất Mệnh Lan',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'qilin_shadow_orchid',
    minSweetness: 95,
    minYield: 95,
    resultCropId: 'undying_destiny_orchid',
    baseGenetics: { sweetness: 99, yield: 99, resistance: 97 },
    discoveryText: 'Thái sơ qua và lân ảnh lan luân hồi bất hủ, niết bàn trọng sinh.'
  },
  {
    id: 'heavenly_destiny_gourd',
    name: 'Thiên Mệnh Hồ',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'crane_shadow_gourd',
    minSweetness: 96,
    minYield: 96,
    resultCropId: 'heavenly_destiny_gourd',
    baseGenetics: { sweetness: 99, yield: 99, resistance: 98 },
    discoveryText: 'Thái sơ qua và hạc ảnh hồ mượn tạo hóa trêu người, cuối cùng thành chí bảo.'
  },
  {
    id: 'myriad_destiny_herb',
    name: 'Vạn Mệnh Thảo',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'tiger_shadow_herb',
    minSweetness: 96,
    minYield: 96,
    resultCropId: 'myriad_destiny_herb',
    baseGenetics: { sweetness: 99, yield: 99, resistance: 98 },
    discoveryText: 'Ánh sáng vĩnh hằng bất diệt của thái sơ qua và hổ ảnh thảo, chiếu rọi khắp đất trời.'
  },
  {
    id: 'creation_form_chestnut',
    name: 'Tạo Tượng Lật',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'draco_roar_chestnut',
    minSweetness: 96,
    minYield: 96,
    resultCropId: 'creation_form_chestnut',
    baseGenetics: { sweetness: 99, yield: 99, resistance: 98 },
    discoveryText: 'Thái sơ qua và long khiếu lật mượn tạo hóa chi lực thành tựu, tuyệt phẩm vĩnh hằng bất hủ.'
  },
  {
    id: 'eternal_form_apricot',
    name: 'Vĩnh Tượng Hạnh',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'fenghuang_roar_apricot',
    minSweetness: 97,
    minYield: 97,
    resultCropId: 'eternal_form_apricot',
    baseGenetics: { sweetness: 100, yield: 100, resistance: 99 },
    discoveryText: 'Thái sơ qua và phượng khiếu hạnh thiên mệnh sở quy, vạn tượng canh tân.'
  },
  {
    id: 'undying_form_pear',
    name: 'Bất Tượng Lê',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'qilin_roar_pear',
    minSweetness: 97,
    minYield: 97,
    resultCropId: 'undying_form_pear',
    baseGenetics: { sweetness: 100, yield: 100, resistance: 99 },
    discoveryText: 'Thái sơ qua và lân khiếu lê luân hồi bất hủ, niết bàn trọng sinh.'
  },
  {
    id: 'heavenly_form_berry',
    name: 'Thiên Tượng Môi',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'crane_roar_berry',
    minSweetness: 98,
    minYield: 98,
    resultCropId: 'heavenly_form_berry',
    baseGenetics: { sweetness: 100, yield: 100, resistance: 100 },
    discoveryText: 'Thái sơ qua và hạc khiếu môi mượn tạo hóa trêu người, cuối cùng thành chí bảo.'
  },
  {
    id: 'myriad_form_peach_t',
    name: 'Vạn Tượng Đào',
    parentCropA: 'vast_meng_melon',
    parentCropB: 'tiger_roar_peach_t',
    minSweetness: 98,
    minYield: 98,
    resultCropId: 'myriad_form_peach_t',
    baseGenetics: { sweetness: 100, yield: 100, resistance: 100 },
    discoveryText: 'Ánh sáng vĩnh hằng bất diệt của thái sơ qua và hổ khiếu đào, chiếu rọi khắp đất trời.'
  }
]

/** 杂交品种阶层 (tier) 划分：基于 HYBRID_DEFS 数组顺序 */
const TIER_COUNTS = [100, 50, 50, 50, 25, 25, 25, 25, 25, 25] // T1..T10
const _tierMap = new Map<string, number>()
let _offset = 0
for (let t = 0; t < TIER_COUNTS.length; t++) {
  for (let i = 0; i < TIER_COUNTS[t]!; i++) {
    const def = HYBRID_DEFS[_offset + i]
    if (def) _tierMap.set(def.id, t + 1)
  }
  _offset += TIER_COUNTS[t]!
}

/** 获取杂交品种所属阶层 (1-10) */
export const getHybridTier = (hybridId: string): number => _tierMap.get(hybridId) ?? 1

/** 查找可能的杂交配方 */
export const findPossibleHybrid = (cropIdA: string, cropIdB: string): HybridDef | null => {
  return (
    HYBRID_DEFS.find(
      h => (h.parentCropA === cropIdA && h.parentCropB === cropIdB) || (h.parentCropA === cropIdB && h.parentCropB === cropIdA)
    ) ?? null
  )
}

/** 根据杂交种ID查找配方 */
export const findPossibleHybridById = (hybridId: string): HybridDef | null => {
  return HYBRID_DEFS.find(h => h.id === hybridId) ?? null
}

/** 种子制造机产出育种种子的概率 */
export const getSeedMakerGeneticChance = (farmingLevel: number): number => {
  return 0.3 + farmingLevel * 0.03
}
