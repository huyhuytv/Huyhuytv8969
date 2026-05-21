import type { QuestTemplateDef, QuestInstance, QuestType } from '@/types/quest'
import type { Season } from '@/types/game'
import { getNpcById } from './npcs'

export const QUEST_TEMPLATES: QuestTemplateDef[] = [
  {
    type: 'delivery',
    targets: [
      // 常见作物 — 混合季节
      { itemId: 'cabbage', name: 'Cải xanh', minQty: 2, maxQty: 5, seasons: ['spring'], unitPrice: 35 },
      { itemId: 'radish', name: 'Củ cải', minQty: 2, maxQty: 4, seasons: ['spring'], unitPrice: 55 },
      { itemId: 'potato', name: 'Khoai tây', minQty: 2, maxQty: 4, seasons: ['spring'], unitPrice: 50 },
      { itemId: 'rice', name: 'Gạo', minQty: 2, maxQty: 5, seasons: ['summer'], unitPrice: 40 },
      { itemId: 'watermelon', name: 'Dưa hấu', minQty: 1, maxQty: 3, seasons: ['summer'], unitPrice: 80 },
      { itemId: 'chili', name: 'Ớt', minQty: 2, maxQty: 4, seasons: ['summer'], unitPrice: 45 },
      { itemId: 'pumpkin', name: 'Bí đỏ', minQty: 1, maxQty: 3, seasons: ['autumn'], unitPrice: 100 },
      { itemId: 'sweet_potato', name: 'Khoai lang', minQty: 2, maxQty: 4, seasons: ['autumn'], unitPrice: 60 },
      { itemId: 'winter_wheat', name: 'Lúa mì mùa đông', minQty: 2, maxQty: 5, seasons: ['winter'], unitPrice: 45 },
      { itemId: 'garlic', name: 'Tỏi', minQty: 2, maxQty: 4, seasons: ['winter'], unitPrice: 50 }
    ],
    npcPool: ['chen_bo', 'liu_niang', 'lin_lao', 'xiao_man'],
    rewardMultiplier: 3,
    friendshipReward: 5
  },
  {
    type: 'fishing',
    targets: [
      { itemId: 'crucian', name: 'Cá diếc', minQty: 1, maxQty: 3, seasons: [], unitPrice: 15 },
      { itemId: 'carp', name: 'Cá chép', minQty: 1, maxQty: 2, seasons: ['spring', 'summer'], unitPrice: 25 },
      { itemId: 'grass_carp', name: 'Cá trắm cỏ', minQty: 1, maxQty: 2, seasons: ['summer', 'autumn'], unitPrice: 30 },
      { itemId: 'catfish', name: 'Cá trê', minQty: 1, maxQty: 2, seasons: ['summer'], unitPrice: 40 },
      { itemId: 'bass', name: 'Cá vược', minQty: 1, maxQty: 2, seasons: ['autumn'], unitPrice: 35 },
      { itemId: 'loach', name: 'Cá chạch', minQty: 1, maxQty: 3, seasons: ['summer', 'autumn'], unitPrice: 20 },
      { itemId: 'creek_shrimp', name: 'Tôm suối', minQty: 2, maxQty: 4, seasons: ['spring', 'summer', 'autumn'], unitPrice: 30 },
      { itemId: 'silver_carp', name: 'Cá mè trắng', minQty: 1, maxQty: 2, seasons: ['summer'], unitPrice: 25 }
    ],
    npcPool: ['qiu_yue', 'chen_bo', 'lin_lao'],
    rewardMultiplier: 3,
    friendshipReward: 3
  },
  {
    type: 'mining',
    targets: [
      { itemId: 'copper_ore', name: 'Quặng đồng', minQty: 3, maxQty: 8, seasons: [], unitPrice: 10 },
      { itemId: 'iron_ore', name: 'Quặng sắt', minQty: 3, maxQty: 6, seasons: [], unitPrice: 20 },
      { itemId: 'gold_ore', name: 'Quặng vàng', minQty: 2, maxQty: 4, seasons: [], unitPrice: 40 },
      { itemId: 'quartz', name: 'Thạch anh', minQty: 1, maxQty: 3, seasons: [], unitPrice: 30 },
      { itemId: 'jade', name: 'Phỉ thúy', minQty: 1, maxQty: 2, seasons: [], unitPrice: 80 }
    ],
    npcPool: ['a_shi', 'xiao_man', 'chen_bo'],
    rewardMultiplier: 2,
    friendshipReward: 3
  },
  {
    type: 'gathering',
    targets: [
      { itemId: 'wood', name: 'Gỗ', minQty: 5, maxQty: 10, seasons: [], unitPrice: 5 },
      { itemId: 'herb', name: 'Thảo dược', minQty: 2, maxQty: 5, seasons: ['spring', 'summer', 'autumn'], unitPrice: 15 },
      { itemId: 'firewood', name: 'Củi khô', minQty: 5, maxQty: 10, seasons: [], unitPrice: 3 },
      { itemId: 'bamboo', name: 'Tre trúc', minQty: 3, maxQty: 6, seasons: ['spring', 'summer'], unitPrice: 10 },
      { itemId: 'pine_cone', name: 'Quả thông', minQty: 2, maxQty: 4, seasons: ['autumn', 'winter'], unitPrice: 10 },
      { itemId: 'wild_mushroom', name: 'Nấm rừng', minQty: 2, maxQty: 4, seasons: ['autumn'], unitPrice: 20 },
      { itemId: 'wild_berry', name: 'Quả dại', minQty: 3, maxQty: 5, seasons: ['summer'], unitPrice: 10 },
      { itemId: 'ginseng', name: 'Nhân Sâm', minQty: 1, maxQty: 2, seasons: ['autumn', 'winter'], unitPrice: 50 }
    ],
    npcPool: ['lin_lao', 'liu_niang', 'xiao_man'],
    rewardMultiplier: 3,
    friendshipReward: 5
  }
]

// 委托类型描述映射（预留）
export const QUEST_TYPE_LABELS: Record<QuestType, string> = {
  delivery: 'Tặng',
  fishing: 'Câu',
  mining: 'Hái',
  gathering: 'Thu thập',
  special_order: 'Đặc biệt'
}

const QUEST_TYPE_VERBS: Record<QuestType, string> = {
  delivery: 'Tặng cho',
  fishing: 'Câu được',
  mining: 'Thu hoạch',
  gathering: 'Thu thập',
  special_order: 'Thu thập'
}

/** 特殊订单模板 */
interface SpecialOrderTemplate {
  name: string
  targetItemId: string
  targetItemName: string
  quantity: number
  days: number
  moneyReward: number
  itemReward: { itemId: string; quantity: number }[]
  seasons: Season[]
  npcId: string
  /** 难度梯度: 1=第7天(简单), 2=第14天(普通), 3=第21天(困难), 4=第28天(极难) */
  tier: number
}

/** 按梯度分层的特殊订单模板 */
const SPECIAL_ORDER_TEMPLATES: SpecialOrderTemplate[] = [
  // === 第1梯度 (第7天): 简单, 7天时限, 数量少, 奖励适中 ===
  {
    name: 'Thu mua quặng đồng',
    targetItemId: 'copper_ore',
    targetItemName: 'Quặng đồng',
    quantity: 15,
    days: 7,
    moneyReward: 600,
    itemReward: [{ itemId: 'iron_ore', quantity: 3 }],
    seasons: [],
    npcId: 'a_shi',
    tier: 1
  },
  {
    name: 'Thu gom cá tươi',
    targetItemId: 'crucian',
    targetItemName: 'Cá diếc',
    quantity: 8,
    days: 7,
    moneyReward: 500,
    itemReward: [{ itemId: 'standard_bait', quantity: 10 }],
    seasons: [],
    npcId: 'qiu_yue',
    tier: 1
  },
  {
    name: 'Thu mua rau củ',
    targetItemId: 'cabbage',
    targetItemName: 'Cải xanh',
    quantity: 10,
    days: 7,
    moneyReward: 500,
    itemReward: [{ itemId: 'basic_fertilizer', quantity: 5 }],
    seasons: ['spring'],
    npcId: 'liu_niang',
    tier: 1
  },
  {
    name: 'Chuẩn bị gỗ',
    targetItemId: 'wood',
    targetItemName: 'Gỗ',
    quantity: 30,
    days: 7,
    moneyReward: 400,
    itemReward: [{ itemId: 'charcoal', quantity: 5 }],
    seasons: [],
    npcId: 'chen_bo',
    tier: 1
  },
  // === 第2梯度 (第14天): 普通, 7天时限, 数量中等, 奖励较好 ===
  {
    name: 'Chuẩn bị quặng sắt',
    targetItemId: 'iron_ore',
    targetItemName: 'Quặng sắt',
    quantity: 15,
    days: 7,
    moneyReward: 1200,
    itemReward: [{ itemId: 'charcoal', quantity: 10 }],
    seasons: [],
    npcId: 'a_shi',
    tier: 2
  },
  {
    name: 'Lệnh thu gom cá quý',
    targetItemId: 'catfish',
    targetItemName: 'Cá trê',
    quantity: 5,
    days: 7,
    moneyReward: 1000,
    itemReward: [{ itemId: 'standard_bait', quantity: 20 }],
    seasons: ['summer'],
    npcId: 'qiu_yue',
    tier: 2
  },
  {
    name: 'Dự trữ mùa đông',
    targetItemId: 'winter_wheat',
    targetItemName: 'Lúa mì mùa đông',
    quantity: 15,
    days: 7,
    moneyReward: 1200,
    itemReward: [{ itemId: 'seed_garlic', quantity: 5 }],
    seasons: ['winter'],
    npcId: 'chen_bo',
    tier: 2
  },
  {
    name: 'Thu thập dược liệu',
    targetItemId: 'herb',
    targetItemName: 'Thảo dược',
    quantity: 15,
    days: 7,
    moneyReward: 800,
    itemReward: [{ itemId: 'quality_fertilizer', quantity: 3 }],
    seasons: ['spring', 'summer', 'autumn'],
    npcId: 'lin_lao',
    tier: 2
  },
  // === 第3梯度 (第21天): 困难, 7天时限, 数量大, 奖励丰厚 ===
  {
    name: 'Kế hoạch bội thu',
    targetItemId: 'pumpkin',
    targetItemName: 'Bí đỏ',
    quantity: 10,
    days: 7,
    moneyReward: 2000,
    itemReward: [{ itemId: 'quality_fertilizer', quantity: 5 }],
    seasons: ['autumn'],
    npcId: 'liu_niang',
    tier: 3
  },
  {
    name: 'Mùa dưa hấu bội thu',
    targetItemId: 'watermelon',
    targetItemName: 'Dưa hấu',
    quantity: 10,
    days: 7,
    moneyReward: 2200,
    itemReward: [{ itemId: 'seed_watermelon', quantity: 5 }],
    seasons: ['summer'],
    npcId: 'xiao_man',
    tier: 3
  },
  {
    name: 'Quặng vàng tầng sâu',
    targetItemId: 'gold_ore',
    targetItemName: 'Quặng vàng',
    quantity: 15,
    days: 7,
    moneyReward: 2500,
    itemReward: [{ itemId: 'gold_ore', quantity: 5 }],
    seasons: [],
    npcId: 'a_shi',
    tier: 3
  },
  {
    name: 'Tích trữ dược liệu',
    targetItemId: 'ginseng',
    targetItemName: 'Nhân Sâm',
    quantity: 6,
    days: 7,
    moneyReward: 2000,
    itemReward: [{ itemId: 'herb', quantity: 15 }],
    seasons: ['autumn', 'winter'],
    npcId: 'lin_lao',
    tier: 3
  },
  // === 第4梯度 (第28天): 极难, 7天时限, 数量极大, 奖励最丰厚 ===
  {
    name: 'Thu gom quặng đá lớn',
    targetItemId: 'gold_ore',
    targetItemName: 'Quặng vàng',
    quantity: 25,
    days: 7,
    moneyReward: 4000,
    itemReward: [
      { itemId: 'gold_ore', quantity: 10 },
      { itemId: 'jade', quantity: 2 }
    ],
    seasons: [],
    npcId: 'a_shi',
    tier: 4
  },
  {
    name: 'Yến tiệc năm trúng mùa',
    targetItemId: 'pumpkin',
    targetItemName: 'Bí đỏ',
    quantity: 20,
    days: 7,
    moneyReward: 4500,
    itemReward: [
      { itemId: 'quality_fertilizer', quantity: 10 },
      { itemId: 'speed_gro', quantity: 5 }
    ],
    seasons: ['autumn'],
    npcId: 'liu_niang',
    tier: 4
  },
  {
    name: 'Thử thách Ngư Vương',
    targetItemId: 'catfish',
    targetItemName: 'Cá trê',
    quantity: 12,
    days: 7,
    moneyReward: 3500,
    itemReward: [{ itemId: 'wild_bait', quantity: 10 }],
    seasons: ['summer'],
    npcId: 'qiu_yue',
    tier: 4
  },
  {
    name: 'Tích trữ lớn ngày đông',
    targetItemId: 'winter_wheat',
    targetItemName: 'Lúa mì mùa đông',
    quantity: 30,
    days: 7,
    moneyReward: 3500,
    itemReward: [
      { itemId: 'seed_garlic', quantity: 10 },
      { itemId: 'charcoal', quantity: 10 }
    ],
    seasons: ['winter'],
    npcId: 'chen_bo',
    tier: 4
  }
]

const TIER_LABELS = ['Đơn giản', 'Thường', 'Khó', 'Cực khó']
const TIER_FRIENDSHIP = [5, 8, 12, 15]

/** 根据当前季节和梯度生成特殊订单 (tier: 1-4 对应 第7/14/21/28天) */
export const generateSpecialOrder = (season: Season, tier: number): QuestInstance | null => {
  const clampedTier = Math.max(1, Math.min(4, tier))
  const valid = SPECIAL_ORDER_TEMPLATES.filter(t => t.tier === clampedTier && (t.seasons.length === 0 || t.seasons.includes(season)))
  if (valid.length === 0) return null

  const template = valid[Math.floor(Math.random() * valid.length)]!
  const npcDef = getNpcById(template.npcId)
  const npcName = npcDef?.name ?? template.npcId
  const tierLabel = TIER_LABELS[clampedTier - 1]

  questCounter++
  return {
    id: `special_${Date.now()}_${questCounter}`,
    type: 'special_order',
    npcId: template.npcId,
    npcName,
    tierLabel,
    description: `${npcName}cần gấp${template.quantity}một${template.targetItemName}.`,
    targetItemId: template.targetItemId,
    targetItemName: template.targetItemName,
    targetQuantity: template.quantity,
    collectedQuantity: 0,
    moneyReward: template.moneyReward,
    friendshipReward: TIER_FRIENDSHIP[clampedTier - 1]!,
    daysRemaining: template.days,
    accepted: false,
    itemReward: template.itemReward
  }
}

let questCounter = 0

/** 根据当前季节生成随机委托 */
export const generateQuest = (season: Season, _day: number): QuestInstance | null => {
  // 随机选择委托类型
  const typeIndex = Math.floor(Math.random() * QUEST_TEMPLATES.length)
  const template = QUEST_TEMPLATES[typeIndex]!

  // 按季节过滤目标
  const validTargets = template.targets.filter(t => t.seasons.length === 0 || t.seasons.includes(season))
  if (validTargets.length === 0) return null

  // 随机选择目标
  const target = validTargets[Math.floor(Math.random() * validTargets.length)]!

  // 从候选池随机选择 NPC
  const npcId = template.npcPool[Math.floor(Math.random() * template.npcPool.length)]!
  const npcDef = getNpcById(npcId)
  const npcName = npcDef?.name ?? npcId

  // 随机数量（范围内）
  const quantity = target.minQty + Math.floor(Math.random() * (target.maxQty - target.minQty + 1))

  // 奖励计算
  const moneyReward = Math.floor(target.unitPrice * quantity * template.rewardMultiplier)

  questCounter++
  const verb = QUEST_TYPE_VERBS[template.type]
  const description =
    template.type === 'delivery'
      ? `${npcName} cần ${quantity} ${target.name}, vui lòng ${verb} cho ${npcName}.`
      : `${npcName} ủy thác: ${verb} ${quantity} ${target.name}.`

  return {
    id: `quest_${Date.now()}_${questCounter}`,
    type: template.type,
    npcId,
    npcName,
    description,
    targetItemId: target.itemId,
    targetItemName: target.name,
    targetQuantity: quantity,
    collectedQuantity: 0,
    moneyReward,
    friendshipReward: template.friendshipReward,
    daysRemaining: 2,
    accepted: false
  }
}
