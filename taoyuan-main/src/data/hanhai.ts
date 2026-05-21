import type {
  HanhaiShopItemDef,
  RouletteOutcome,
  CricketDef,
  PokerSuit,
  PokerRank,
  PokerCard,
  PokerHandType,
  PokerHandResult,
  TexasStreet,
  TexasTierId,
  TexasTierDef,
  PokerActionType,
  ShellType,
  TradeShopUpgradeDef,
  TradeExchangeItemDef
} from '@/types'

/** 瀚海驿站固定商品（每周都有） */
export const HANHAI_FIXED_ITEMS: HanhaiShopItemDef[] = [
  { itemId: 'hanhai_cactus_seed', name: 'Hạt Giống Xương Rồng', price: 500, description: 'Hạt giống cây cối kỳ lạ đến từ Tây Vực.', weeklyLimit: 5 },
  { itemId: 'hanhai_date_seed', name: 'Hạt giống táo đỏ', price: 400, description: 'Hạt giống cây ăn quả mang đến từ Con Đường Tơ Lụa.', weeklyLimit: 5 },
  { itemId: 'hanhai_map', name: 'Bản Đồ Kho Báu', price: 1000, description: 'Bản đồ đánh dấu vị trí kho báu tại hoang mạc.', weeklyLimit: 1 },
  { itemId: 'mega_bomb_recipe', name: 'Công Thức Bom Khổng Lồ', price: 5000, description: 'Phương thức bí truyền nghe nói có thể phá nổ cả một tầng hang mỏ.', weeklyLimit: 1 }
]

/** 瀚海驿站轮换商品池（每周随机抽4个上架） */
export const HANHAI_ROTATING_POOL: HanhaiShopItemDef[] = [
  { itemId: 'hanhai_spice', name: 'Hương Liệu Tây Vực', price: 300, description: 'Hương liệu mang phong tình dị vực, cực phẩm nấu ăn.', weeklyLimit: 3 },
  { itemId: 'hanhai_silk', name: 'Tơ Lụa', price: 800, description: 'Tơ lụa thượng hạng mềm mịn trơn bóng.', weeklyLimit: 2 },
  { itemId: 'hanhai_turquoise', name: 'Ngọc Lục Bảo', price: 600, description: 'Đá quý trân quý đặc sản của Tây Vực.', weeklyLimit: 2 },
  { itemId: 'hanhai_incense', name: 'Trầm Hương Hãn Hải', price: 500, description: 'Hương liệu trân quý của Tây Vực, quà tặng tuyệt hảo.', weeklyLimit: 2 },
  { itemId: 'hanhai_carpet', name: 'Mảnh Thảm Bay', price: 1200, description: 'Mảnh vỡ thảm bay trong truyền thuyết, vật phẩm sưu tầm quý giá.', weeklyLimit: 1 },
  { itemId: 'hanhai_amber', name: 'Hổ Phách Gobi', price: 450, description: 'Hổ phách tự nhiên trên sa mạc Gobi.', weeklyLimit: 3 },
  { itemId: 'hanhai_dried_fruit', name: 'Trái Cây Khô Tây Vực', price: 200, description: 'Trái cây khô dị vực ngọt ngào, giúp hồi phục thể lực.', weeklyLimit: 5 },
  { itemId: 'hanhai_pottery', name: 'Gốm Màu', price: 350, description: 'Gốm màu Tây Vực tinh xảo, quà tặng tuyệt hảo.', weeklyLimit: 2 },
  { itemId: 'hanhai_saddle_leather', name: 'Da Yên Ngựa', price: 700, description: 'Da thuộc làm yên ngựa Tây Vực thượng hạng.', weeklyLimit: 2 },
  { itemId: 'hanhai_lapis', name: 'Đá Lapis Lazuli', price: 550, description: 'Đá quý màu xanh lam đậm trân quý.', weeklyLimit: 2 }
]

/** 兼容旧代码：合并固定+轮换池的全部商品 */
export const HANHAI_SHOP_ITEMS: HanhaiShopItemDef[] = [...HANHAI_FIXED_ITEMS, ...HANHAI_ROTATING_POOL]

/** 根据年份+季节+周数生成本周轮换商品（确定性伪随机） */
export const getWeeklyRotatingItems = (year: number, seasonIndex: number, day: number): HanhaiShopItemDef[] => {
  const weekNumber = Math.ceil(day / 7)
  const seed = year * 10000 + seasonIndex * 100 + weekNumber
  // 简易确定性随机：基于种子打乱
  const pool = [...HANHAI_ROTATING_POOL]
  let s = seed
  for (let i = pool.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[pool[i], pool[j]] = [pool[j]!, pool[i]!]
  }
  return pool.slice(0, 4)
}

/** 轮盘赔率 */
export const ROULETTE_OUTCOMES: RouletteOutcome[] = [
  { label: 'Trống', multiplier: 0, chance: 72 },
  { label: 'Gấp Đôi', multiplier: 2, chance: 18 },
  { label: 'Gấp Ba', multiplier: 3, chance: 7 },
  { label: 'Gấp Năm', multiplier: 5, chance: 3 }
]

/** 轮盘投注档位 */
export const ROULETTE_BET_TIERS = [100, 500, 1000] as const

/** 骰子投注金额 */
export const DICE_BET_AMOUNT = 200

/** 每天最大赌博次数 */
export const MAX_DAILY_BETS = 10

/** 解锁瀚海所需费用 */
export const HANHAI_UNLOCK_COST = 100000

/** 根据概率随机选择轮盘结果 */
export const spinRoulette = (): RouletteOutcome => {
  let roll = Math.random() * 100
  for (const outcome of ROULETTE_OUTCOMES) {
    roll -= outcome.chance
    if (roll <= 0) return outcome
  }
  return ROULETTE_OUTCOMES[0]!
}

/** 骰子游戏：投大小 */
export const rollDice = (): { dice1: number; dice2: number; total: number; isBig: boolean } => {
  const dice1 = Math.floor(Math.random() * 6) + 1
  const dice2 = Math.floor(Math.random() * 6) + 1
  const total = dice1 + dice2
  return { dice1, dice2, total, isBig: total >= 7 }
}

// ==================== 猜杯 ====================

/** 猜杯投注金额 */
export const CUP_BET_AMOUNT = 250

/** 猜杯倍率 */
export const CUP_WIN_MULTIPLIER = 3

/** 猜杯游戏：球藏在哪个杯子下 */
export const playCupRound = (): { correctCup: number } => {
  return { correctCup: Math.floor(Math.random() * 3) }
}

// ==================== 斗蛐蛐 ====================

/** 斗蛐蛐投注金额 */
export const CRICKET_BET_AMOUNT = 300

/** 斗蛐蛐赢赔率 */
export const CRICKET_WIN_MULTIPLIER = 2.5

/** 可选蛐蛐 */
export const CRICKETS: CricketDef[] = [
  { id: 'general', name: 'Tướng Quân', description: 'Thể hình cường tráng, công thủ toàn diện.' },
  { id: 'ironhead', name: 'Đầu Sắt', description: 'Đầu cứng như sắt, giỏi lối đánh trực diện.' },
  { id: 'dragonfly', name: 'Thanh Long', description: 'Thân pháp linh hoạt, ra đòn bất ngờ.' }
]

/** 斗蛐蛐：双方各掷力量，高者胜 */
export const fightCricket = (): { playerPower: number; opponentPower: number } => {
  const playerPower = Math.floor(Math.random() * 10) + 1
  const opponentPower = Math.floor(Math.random() * 10) + 1
  return { playerPower, opponentPower }
}

// ==================== 翻牌寻宝 ====================

/** 翻牌投注金额 */
export const CARD_BET_AMOUNT = 150

/** 翻牌赢赔率 */
export const CARD_WIN_MULTIPLIER = 2.5

/** 翻牌总数 */
export const CARD_TOTAL = 5

/** 翻牌trong宝牌数量 */
export const CARD_TREASURE_COUNT = 2

/** 翻牌游戏：生成宝牌位置 */
export const dealCards = (): { treasures: number[] } => {
  const positions = [0, 1, 2, 3, 4]
  // Fisher-Yates shuffle
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[positions[i], positions[j]] = [positions[j]!, positions[i]!]
  }
  return { treasures: positions.slice(0, CARD_TREASURE_COUNT) }
}

// ==================== 瀚海扑克 ====================

/** 场次配置 */
export const TEXAS_TIERS: TexasTierDef[] = [
  { id: 'beginner', name: 'Sân Tân Thủ', entryFee: 200, blind: 10, rake: 20, minMoney: 500, rounds: 3 },
  { id: 'normal', name: 'Sân Thường', entryFee: 500, blind: 25, rake: 50, minMoney: 2000, rounds: 5 },
  { id: 'expert', name: 'Sân Cao Thủ', entryFee: 2000, blind: 100, rake: 200, minMoney: 10000, rounds: 8 }
]

/** 根据ID获取场次配置 */
export const getTexasTier = (id: TexasTierId): TexasTierDef => TEXAS_TIERS.find(t => t.id === id)!

/** 花色显示符号 */
export const SUIT_LABELS: Record<PokerSuit, string> = {
  spade: '\u2660',
  heart: '\u2665',
  diamond: '\u2666',
  club: '\u2663'
}

/** 点数显示 */
export const RANK_LABELS: Record<number, string> = {
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
  14: 'A'
}

/** 牌型trong文名称 */
export const HAND_LABELS: Record<PokerHandType, string> = {
  royal_flush: 'Sảnh Rồng',
  straight_flush: 'Thùng Phá Sảnh',
  four_kind: 'Tứ Quý',
  full_house: 'Cù Lũ',
  flush: 'Thùng',
  straight: 'Sảnh',
  three_kind: 'Sám Cô',
  two_pair: 'Thú',
  one_pair: 'Đôi',
  high_card: 'Mậu Thầu'
}

/** 牌型优先级（越大越mạnh mẽ） */
const HAND_TYPE_RANK: Record<PokerHandType, number> = {
  high_card: 0,
  one_pair: 1,
  two_pair: 2,
  three_kind: 3,
  straight: 4,
  flush: 5,
  full_house: 6,
  four_kind: 7,
  straight_flush: 8,
  royal_flush: 9
}

const ALL_SUITS: PokerSuit[] = ['spade', 'heart', 'diamond', 'club']
const ALL_RANKS: PokerRank[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

/** 创建并洗牌（Fisher-Yates） */
export const createShuffledDeck = (): PokerCard[] => {
  const deck: PokerCard[] = []
  for (const suit of ALL_SUITS) {
    for (const rank of ALL_RANKS) {
      deck.push({ suit, rank })
    }
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j]!, deck[i]!]
  }
  return deck
}

/** 评估5张牌的牌型 */
export const evaluateHand = (cards: PokerCard[]): PokerHandResult => {
  const sorted = [...cards].sort((a, b) => b.rank - a.rank)
  const ranks = sorted.map(c => c.rank)

  // 检查同花
  const isFlush = sorted.every(c => c.suit === sorted[0]!.suit)

  // 检查顺子
  let isStraight = false
  let straightHighRank = ranks[0]!

  // 普通顺子
  if (ranks[0]! - ranks[4]! === 4 && new Set(ranks).size === 5) {
    isStraight = true
  }
  // A-2-3-4-5 小顺子
  if (ranks[0] === 14 && ranks[1] === 5 && ranks[2] === 4 && ranks[3] === 3 && ranks[4] === 2) {
    isStraight = true
    straightHighRank = 5 // Alàm tối thiểu
  }

  // 统计频率
  const freq = new Map<number, number>()
  for (const r of ranks) {
    freq.set(r, (freq.get(r) ?? 0) + 1)
  }
  const counts = [...freq.values()].sort((a, b) => b - a)
  // 按频率降序、同频率按rank降序排列
  const groupedRanks = [...freq.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0]).map(e => e[0])

  // 判定牌型
  let type: PokerHandType
  let compareRanks: number[]

  if (isFlush && isStraight && ranks[0] === 14 && ranks[1] === 13) {
    type = 'royal_flush'
    compareRanks = [14]
  } else if (isFlush && isStraight) {
    type = 'straight_flush'
    compareRanks = [straightHighRank]
  } else if (counts[0] === 4) {
    type = 'four_kind'
    compareRanks = groupedRanks
  } else if (counts[0] === 3 && counts[1] === 2) {
    type = 'full_house'
    compareRanks = groupedRanks
  } else if (isFlush) {
    type = 'flush'
    compareRanks = ranks
  } else if (isStraight) {
    type = 'straight'
    compareRanks = [straightHighRank]
  } else if (counts[0] === 3) {
    type = 'three_kind'
    compareRanks = groupedRanks
  } else if (counts[0] === 2 && counts[1] === 2) {
    type = 'two_pair'
    compareRanks = groupedRanks
  } else if (counts[0] === 2) {
    type = 'one_pair'
    compareRanks = groupedRanks
  } else {
    type = 'high_card'
    compareRanks = ranks
  }

  return {
    type,
    typeRank: HAND_TYPE_RANK[type],
    ranks: compareRanks,
    label: HAND_LABELS[type]
  }
}

/** 从 n 张trong生成所有 C(n,5) 组合 */
const combinations5 = (cards: PokerCard[]): PokerCard[][] => {
  const result: PokerCard[][] = []
  const n = cards.length
  for (let i = 0; i < n - 4; i++) {
    for (let j = i + 1; j < n - 3; j++) {
      for (let k = j + 1; k < n - 2; k++) {
        for (let l = k + 1; l < n - 1; l++) {
          for (let m = l + 1; m < n; m++) {
            result.push([cards[i]!, cards[j]!, cards[k]!, cards[l]!, cards[m]!])
          }
        }
      }
    }
  }
  return result
}

/** 比较两手牌: >0 = a胜, <0 = b胜, 0 = 平 */
export const compareHands = (a: PokerHandResult, b: PokerHandResult): number => {
  if (a.typeRank !== b.typeRank) return a.typeRank - b.typeRank
  for (let i = 0; i < Math.min(a.ranks.length, b.ranks.length); i++) {
    if (a.ranks[i]! !== b.ranks[i]!) return a.ranks[i]! - b.ranks[i]!
  }
  return 0
}

/** 从7张trong选最佳5张牌型 */
export const evaluateBestHand = (cards: PokerCard[]): PokerHandResult => {
  const combos = combinations5(cards)
  let best = evaluateHand(combos[0]!)
  for (let i = 1; i < combos.length; i++) {
    const hand = evaluateHand(combos[i]!)
    if (compareHands(hand, best) > 0) {
      best = hand
    }
  }
  return best
}

/** 发一局瀚海扑克 */
export const dealTexas = (): {
  playerHole: PokerCard[]
  dealerHole: PokerCard[]
  community: PokerCard[]
} => {
  const deck = createShuffledDeck()
  return {
    playerHole: [deck[0]!, deck[1]!],
    dealerHole: [deck[2]!, deck[3]!],
    community: [deck[4]!, deck[5]!, deck[6]!, deck[7]!, deck[8]!]
  }
}

/** 庄家AI决策 */
export const texasDealerAI = (
  dealerHole: PokerCard[],
  community: PokerCard[],
  street: TexasStreet,
  pot: number,
  dealerStack: number,
  playerBet: number,
  dealerBet: number,
  playerAllIn: boolean,
  blind: number
): { action: PokerActionType; amount: number } => {
  const toCall = playerBet - dealerBet

  // 评估当前牌力
  const visibleCards = [...dealerHole, ...community]
  let strength = 0 // 0=yếu đuối 1=trong 2=mạnh mẽ
  if (visibleCards.length >= 5) {
    const hand = evaluateBestHand(visibleCards)
    if (hand.typeRank >= 3)
      strength = 2 // Sanjo+
    else if (hand.typeRank >= 1) strength = 1 // một cặp+
  } else if (visibleCards.length >= 2) {
    // preflop: 简单评估手牌
    const r1 = dealerHole[0]!.rank
    const r2 = dealerHole[1]!.rank
    const paired = r1 === r2
    const highCard = Math.max(r1, r2) >= 11
    const suited = dealerHole[0]!.suit === dealerHole[1]!.suit
    if (paired || (highCard && suited)) strength = 2
    else if (highCard || suited) strength = 1
  }

  // 玩家已全押 → 只能跟或弃
  if (playerAllIn) {
    if (toCall <= 0) return { action: 'check', amount: 0 }
    if (strength >= 1 || toCall <= pot * 0.3) return { action: 'call', amount: toCall }
    return Math.random() < 0.3 ? { action: 'call', amount: toCall } : { action: 'fold', amount: 0 }
  }

  // 无需跟注
  if (toCall <= 0) {
    if (strength >= 2 && Math.random() < 0.6) {
      const raiseAmt = Math.min(blind * (street === 'preflop' ? 2 : 3), dealerStack)
      return raiseAmt > 0 ? { action: 'raise', amount: raiseAmt } : { action: 'check', amount: 0 }
    }
    if (strength >= 1 && Math.random() < 0.3) {
      const raiseAmt = Math.min(blind * 2, dealerStack)
      return raiseAmt > 0 ? { action: 'raise', amount: raiseAmt } : { action: 'check', amount: 0 }
    }
    return { action: 'check', amount: 0 }
  }

  // 需要跟注
  const potOdds = toCall / (pot + toCall)

  if (strength >= 2) {
    // mạnh mẽ牌：跟注或加注
    if (Math.random() < 0.4 && dealerStack > toCall + blind) {
      const raiseAmt = toCall + Math.min(blind * 2, dealerStack - toCall)
      return { action: 'raise', amount: raiseAmt }
    }
    return { action: 'call', amount: toCall }
  }

  if (strength >= 1) {
    // trong等牌：大部分跟注，大注可能弃
    if (potOdds > 0.5 && street === 'river') {
      return Math.random() < 0.5 ? { action: 'fold', amount: 0 } : { action: 'call', amount: toCall }
    }
    return { action: 'call', amount: toCall }
  }

  // yếu đuối牌
  if (potOdds > 0.4) {
    return Math.random() < 0.7 ? { action: 'fold', amount: 0 } : { action: 'call', amount: toCall }
  }
  return Math.random() < 0.3 ? { action: 'fold', amount: 0 } : { action: 'call', amount: toCall }
}

// ==================== 恶魔轮盘 ====================

/** 恶魔轮盘投注金额 */
export const BUCKSHOT_BET_AMOUNT = 400

/** 恶魔轮盘赢赔率 */
export const BUCKSHOT_WIN_MULTIPLIER = 3

/** 双方初始HP */
export const BUCKSHOT_PLAYER_HP = 2
export const BUCKSHOT_DEALER_HP = 2

/** 实弹数量 */
export const BUCKSHOT_LIVE_COUNT = 4

/** 空弹数量 */
export const BUCKSHOT_BLANK_COUNT = 4

/** 生成弹仓（打乱顺序） */
export const loadShotgun = (): ShellType[] => {
  const shells: ShellType[] = []
  for (let i = 0; i < BUCKSHOT_LIVE_COUNT; i++) shells.push('live')
  for (let i = 0; i < BUCKSHOT_BLANK_COUNT; i++) shells.push('blank')
  // Fisher-Yates
  for (let i = shells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shells[i], shells[j]] = [shells[j]!, shells[i]!]
  }
  return shells
}

/** 庄家AI决策 */
export const dealerDecide = (shells: ShellType[], currentIndex: number, knowsCurrent: boolean): 'self' | 'opponent' => {
  if (knowsCurrent) {
    return shells[currentIndex] === 'blank' ? 'self' : 'opponent'
  }
  // 统计剩余弹药
  let liveLeft = 0
  let blankLeft = 0
  for (let i = currentIndex; i < shells.length; i++) {
    if (shells[i] === 'live') liveLeft++
    else blankLeft++
  }
  return blankLeft > liveLeft ? 'self' : 'opponent'
}

// === 通商系统 ===

/** 通商店铺升级定义 */
export const TRADE_SHOP_UPGRADES: TradeShopUpgradeDef[] = [
  { level: 1, name: 'Sạp Hàng', maxSlots: 2, sellDays: 3, cost: 0, materialCost: [] },
  {
    level: 2,
    name: 'Cửa Hiệu',
    maxSlots: 3,
    sellDays: 3,
    cost: 20000,
    materialCost: [
      { itemId: 'wood', quantity: 150 },
      { itemId: 'iron_bar', quantity: 5 }
    ]
  },
  {
    level: 3,
    name: 'Cửa Hiệu Lớn',
    maxSlots: 4,
    sellDays: 2,
    cost: 50000,
    materialCost: [
      { itemId: 'wood', quantity: 250 },
      { itemId: 'gold_bar', quantity: 5 }
    ]
  },
  {
    level: 4,
    name: 'Thương Hành',
    maxSlots: 5,
    sellDays: 2,
    cost: 100000,
    materialCost: [
      { itemId: 'wood', quantity: 400 },
      { itemId: 'gold_bar', quantity: 15 }
    ]
  },
  {
    level: 5,
    name: 'Thương Hội',
    maxSlots: 6,
    sellDays: 1,
    cost: 200000,
    materialCost: [
      { itemId: 'wood', quantity: 500 },
      { itemId: 'iridium_bar', quantity: 3 }
    ]
  }
]

/** 积分兑换商品 */
export const TRADE_EXCHANGE_ITEMS: TradeExchangeItemDef[] = [
  { itemId: 'trade_star_fragment', name: 'Mảnh Vỡ Tinh Thần', pointsCost: 50, description: 'Nguyên liệu quý hiếm, dùng để chế tạo cao cấp.', weeklyLimit: 3 },
  // { itemId: 'trade_golden_coconut', name: '金椰子', pointsCost: 80, description: '打开可获得随机稀有物品。', weeklyLimit: 2 },
  // { itemId: 'trade_desert_totem', name: '沙漠图腾', pointsCost: 30, description: '立即传送至瀚海（不消耗时间）。', weeklyLimit: 5 },
  { itemId: 'trade_spice_bundle', name: 'Gói Quà Hương Liệu', pointsCost: 40, description: 'Nhận được Hương Liệu Tây Vực ×5.', weeklyLimit: 3 },
  {
    itemId: 'trade_turquoise_pendant',
    name: 'Dây chuyền ngọc lục bảo',
    pointsCost: 120,
    description: 'Trang sức, Tấn công +2, Phòng ngự +3%.',
    totalLimit: 1,
    equipType: 'ring'
  },
  { itemId: 'trade_silk_robe', name: 'Trường Bào Tơ Lụa', pointsCost: 150, description: 'Mũ, Tấn công +3, HP +20.', totalLimit: 1, equipType: 'hat' },
  {
    itemId: 'trade_desert_blade',
    name: 'Loan Đao Sa Mạc',
    pointsCost: 200,
    description: 'Vũ khí, Tấn công 40, Bạo kích 8%.',
    totalLimit: 1,
    equipType: 'weapon'
  },
  {
    itemId: 'trade_prosperity_seal',
    name: 'Kim Ấn Thông Thương',
    pointsCost: 300,
    description: 'Vật phẩm túi tiền, Điểm thông thương nhận được +20%.',
    totalLimit: 1,
    isWalletItem: true
  }
]

/** 积分计算：物品售价转通商积分 */
export const TRADE_QUALITY_MULTIPLIER: Record<string, number> = {
  normal: 1.0,
  fine: 1.25,
  excellent: 1.5,
  supreme: 2.0
}

export const calcTradePoints = (sellPrice: number, quality: string): number => {
  const multiplier = TRADE_QUALITY_MULTIPLIER[quality] ?? 1.0
  return Math.ceil(sellPrice * multiplier * 0.1)
}
