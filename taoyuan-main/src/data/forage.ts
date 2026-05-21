import type { Weather, Season } from '@/types'
import type { MonsterDef } from '@/types/skill'

/** 采集物定义 */
export interface ForageItemDef {
  itemId: string
  name: string
  season: ('spring' | 'summer' | 'autumn' | 'winter')[]
  chance: number // Xác suất xảy ra 0-1
  expReward: number
}

/** 天气对采集概率的修正 */
export const WEATHER_FORAGE_MODIFIER: Record<Weather, number> = {
  sunny: 1.0,
  rainy: 1.15,
  stormy: 0.8,
  snowy: 0.9,
  windy: 1.1,
  green_rain: 1.5
}

/** 竹林采集物 */
export const FORAGE_ITEMS: ForageItemDef[] = [
  { itemId: 'bamboo', name: 'Tre trúc', season: ['spring', 'summer', 'autumn'], chance: 0.5, expReward: 3 },
  { itemId: 'wood', name: 'Gỗ', season: ['spring', 'summer', 'autumn', 'winter'], chance: 0.6, expReward: 2 },
  { itemId: 'herb', name: 'Thảo dược', season: ['spring', 'summer', 'autumn'], chance: 0.3, expReward: 5 },
  { itemId: 'firewood', name: 'Củi khô', season: ['spring', 'summer', 'autumn', 'winter'], chance: 0.7, expReward: 1 },
  { itemId: 'winter_bamboo_shoot', name: 'Măng Đông', season: ['winter'], chance: 0.35, expReward: 8 },
  { itemId: 'wintersweet', name: 'Hoa Mai', season: ['winter'], chance: 0.2, expReward: 10 },
  { itemId: 'wild_mushroom', name: 'Nấm rừng', season: ['autumn'], chance: 0.35, expReward: 6 },
  { itemId: 'ginseng', name: 'Nhân Sâm', season: ['autumn', 'winter'], chance: 0.1, expReward: 15 },
  { itemId: 'wild_berry', name: 'Quả dại', season: ['summer'], chance: 0.4, expReward: 4 },
  { itemId: 'pine_cone', name: 'Quả thông', season: ['autumn', 'winter'], chance: 0.3, expReward: 5 },
  { itemId: 'camphor_seed', name: 'Hạt Giống Cây Long Não', season: ['spring', 'summer'], chance: 0.15, expReward: 5 },
  { itemId: 'mulberry', name: 'Quả Dâu Tằm', season: ['summer', 'autumn'], chance: 0.2, expReward: 4 },

  // ===== 稀有采集物（博物馆化石/古物） =====
  { itemId: 'ancient_pottery', name: 'Mảnh gốm cổ', season: ['spring', 'summer', 'autumn', 'winter'], chance: 0.03, expReward: 12 },
  { itemId: 'bamboo_scroll', name: 'Thẻ tre', season: ['spring', 'summer', 'autumn'], chance: 0.03, expReward: 12 },
  { itemId: 'stone_axe_head', name: 'Rìu đá', season: ['spring', 'summer', 'autumn', 'winter'], chance: 0.04, expReward: 10 },
  { itemId: 'fern_fossil', name: 'Hóa thạch lá dương xỉ', season: ['spring', 'summer', 'autumn'], chance: 0.03, expReward: 12 },
  { itemId: 'petrified_wood', name: 'Gỗ hóa đá', season: ['autumn', 'winter'], chance: 0.04, expReward: 10 }
]

/** 获取当前季节可采集物 */
export const getForageItems = (season: string): ForageItemDef[] => {
  return FORAGE_ITEMS.filter(f => f.season.includes(season as any))
}

// ===== 竹林动物遭遇 =====

/** 竹林动物遭遇概率 */
export const FOREST_ENCOUNTER_CHANCE = 0.15

/** 温和动物定义 */
export interface FriendlyAnimalDef {
  id: string
  name: string
  productItemId: string
  collectExp: number
  chaseExp: number
  season: Season[]
  weight: number
}

export const FRIENDLY_ANIMALS: FriendlyAnimalDef[] = [
  {
    id: 'wild_chicken',
    name: 'Gà Rừng',
    productItemId: 'egg',
    collectExp: 5,
    chaseExp: 8,
    season: ['spring', 'summer', 'autumn', 'winter'],
    weight: 4
  },
  { id: 'wild_cow', name: 'Bò Rừng', productItemId: 'milk', collectExp: 5, chaseExp: 8, season: ['spring', 'summer', 'autumn'], weight: 3 },
  {
    id: 'wild_rabbit',
    name: 'Thỏ Rừng',
    productItemId: 'rabbit_fur',
    collectExp: 5,
    chaseExp: 8,
    season: ['spring', 'summer', 'autumn', 'winter'],
    weight: 4
  },
  {
    id: 'wild_goat',
    name: 'Dê Rừng',
    productItemId: 'goat_milk',
    collectExp: 5,
    chaseExp: 8,
    season: ['spring', 'summer', 'autumn'],
    weight: 3
  }
]

/** 竹林野兽定义 */
export const HOSTILE_ANIMALS: MonsterDef[] = [
  {
    id: 'forest_wolf',
    name: 'Sói Rừng Trúc',
    hp: 40,
    attack: 12,
    defense: 3,
    expReward: 20,
    drops: [
      { itemId: 'wolf_pelt', chance: 0.6 },
      { itemId: 'wolf_fang', chance: 0.3 }
    ],
    description: 'Sói xám lảng vảng trong rừng trúc, cảnh giác và hung dữ.'
  },
  {
    id: 'forest_bear',
    name: 'Gấu Đen',
    hp: 70,
    attack: 18,
    defense: 5,
    expReward: 35,
    drops: [
      { itemId: 'bear_pelt', chance: 0.5 },
      { itemId: 'bear_gall', chance: 0.2 },
      { itemId: 'honey', chance: 0.4 }
    ],
    description: 'Gấu đen có thân hình to lớn, sức mạnh kinh người.'
  },
  {
    id: 'forest_tiger',
    name: 'Mãnh Hổ',
    hp: 100,
    attack: 25,
    defense: 8,
    expReward: 50,
    drops: [
      { itemId: 'tiger_pelt', chance: 0.4 },
      { itemId: 'tiger_bone', chance: 0.25 },
      { itemId: 'tiger_fang', chance: 0.3 }
    ],
    description: 'Vua của rừng trúc, dã thú cực kỳ nguy hiểm.'
  }
]

/** 竹林野兽战败惩罚 */
export const FOREST_DEFEAT_MONEY_PENALTY_RATE = 0.1
export const FOREST_DEFEAT_MONEY_PENALTY_CAP = 5000

/** 按季节随机抽取一个动物遭遇（温和70%/野兽30%） */
export const rollForestEncounter = (
  season: Season
): { type: 'friendly'; animal: FriendlyAnimalDef } | { type: 'hostile'; monster: MonsterDef } | null => {
  const friendlyCandidates = FRIENDLY_ANIMALS.filter(a => a.season.includes(season))
  const hostileCandidates = HOSTILE_ANIMALS

  if (friendlyCandidates.length === 0 && hostileCandidates.length === 0) return null

  if (Math.random() < 0.7 && friendlyCandidates.length > 0) {
    // 温和动物 — 按权重抽取
    const totalWeight = friendlyCandidates.reduce((s, a) => s + a.weight, 0)
    let roll = Math.random() * totalWeight
    for (const animal of friendlyCandidates) {
      roll -= animal.weight
      if (roll <= 0) return { type: 'friendly', animal }
    }
    return { type: 'friendly', animal: friendlyCandidates[0]! }
  } else if (hostileCandidates.length > 0) {
    // 野兽 — 等权随机
    const idx = Math.floor(Math.random() * hostileCandidates.length)
    return { type: 'hostile', monster: hostileCandidates[idx]! }
  }

  return null
}
