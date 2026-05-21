import type { MonsterDef, MineFloorDef } from '@/types'
import { getItemById } from './items'

/** 矿洞总层数 */
export const MAX_MINE_FLOOR = 120

/** 区域矿石/宝石映射（铜1-40/铁41-80/金81-120，各区附加特色矿石） */
const ZONE_ORES: Record<MineFloorDef['zone'], string[]> = {
  shallow: ['copper_ore', 'quartz'],
  frost: ['copper_ore', 'jade'],
  lava: ['iron_ore', 'ruby'],
  crystal: ['iron_ore', 'crystal_ore', 'moonstone'],
  shadow: ['gold_ore', 'shadow_ore', 'obsidian'],
  abyss: ['gold_ore', 'void_ore', 'dragon_jade']
}

/** 蘑菇层奖励 */
export const getMushroomRewards = (floor: number): { itemId: string; quantity: number }[] => {
  if (floor <= 20) {
    return [
      { itemId: 'wild_mushroom', quantity: 2 },
      { itemId: 'herb', quantity: 1 }
    ]
  }
  if (floor <= 40) {
    const rewards = [
      { itemId: 'wild_mushroom', quantity: 2 },
      { itemId: 'herb', quantity: 2 }
    ]
    if (Math.random() < 0.1) rewards.push({ itemId: 'ginseng', quantity: 1 })
    return rewards
  }
  if (floor <= 60) {
    return [
      { itemId: 'wild_mushroom', quantity: 3 },
      { itemId: 'ginseng', quantity: 1 }
    ]
  }
  if (floor <= 80) {
    return [
      { itemId: 'wild_mushroom', quantity: 3 },
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'herb', quantity: 3 }
    ]
  }
  if (floor <= 100) {
    return [
      { itemId: 'ginseng', quantity: 2 },
      { itemId: 'wild_mushroom', quantity: 4 }
    ]
  }
  return [
    { itemId: 'ginseng', quantity: 3 },
    { itemId: 'wild_mushroom', quantity: 5 }
  ]
}

/** 宝箱层奖励 */
export const getTreasureRewards = (floor: number): { items: { itemId: string; quantity: number }[]; money: number } => {
  const zoneIndex = Math.floor((floor - 1) / 20)
  const zones: MineFloorDef['zone'][] = ['shallow', 'frost', 'lava', 'crystal', 'shadow', 'abyss']
  const zone = zones[zoneIndex] ?? 'abyss'
  const orePool = ZONE_ORES[zone]!
  const ore = orePool[Math.floor(Math.random() * orePool.length)]!

  const rewardTable: Record<string, { qty: number; minMoney: number; maxMoney: number }> = {
    shallow: { qty: 3, minMoney: 50, maxMoney: 100 },
    frost: { qty: 2, minMoney: 100, maxMoney: 200 },
    lava: { qty: 3, minMoney: 200, maxMoney: 500 },
    crystal: { qty: 2, minMoney: 300, maxMoney: 600 },
    shadow: { qty: 2, minMoney: 500, maxMoney: 1000 },
    abyss: { qty: 3, minMoney: 800, maxMoney: 1500 }
  }
  const r = rewardTable[zone]!
  const items: { itemId: string; quantity: number }[] = [{ itemId: ore, quantity: r.qty }]

  // 化石/古物掉落（20%概率，按区域抽取）
  if (Math.random() < 0.2) {
    const ZONE_TREASURE_DROPS: Record<string, string[]> = {
      shallow: ['trilobite_fossil', 'shell_fossil'],
      frost: ['trilobite_fossil', 'shell_fossil'],
      lava: ['ammonite_fossil', 'bronze_mirror', 'painted_pottery'],
      crystal: ['ammonite_fossil', 'jade_disc', 'jade_pendant'],
      shadow: ['oracle_bone', 'amber', 'ancient_coin'],
      abyss: ['dragon_tooth', 'bone_fragment', 'ancient_seed']
    }
    const pool = ZONE_TREASURE_DROPS[zone]
    if (pool && pool.length > 0) {
      const drop = pool[Math.floor(Math.random() * pool.length)]!
      items.push({ itemId: drop, quantity: 1 })
    }
  }

  // 深渊层宝箱极小概率掉落仙桃
  if (zone === 'abyss' && Math.random() < 0.02) {
    items.push({ itemId: 'stamina_fruit', quantity: 1 })
  }

  return {
    items,
    money: r.minMoney + Math.floor(Math.random() * (r.maxMoney - r.minMoney + 1))
  }
}

/** 暗河层奖励 - 可获得稀有矿石（无视区域限制） */
export const getDarkFloorOres = (): string[] => {
  return [
    'copper_ore',
    'iron_ore',
    'gold_ore',
    'crystal_ore',
    'shadow_ore',
    'void_ore',
    'quartz',
    'jade',
    'ruby',
    'moonstone',
    'obsidian',
    'dragon_jade'
  ]
}

/** 暗河层陷阱伤害（随深度增加） */
export const getDarkFloorTrapDamage = (floor: number): number => {
  const zoneIndex = Math.floor((floor - 1) / 20)
  const base = 5 + zoneIndex * 5
  const range = 10 + zoneIndex * 5
  return base + Math.floor(Math.random() * (range + 1))
}

/** 暗河层隐藏宝藏铜钱 */
export const getDarkFloorTreasureMoney = (floor: number): number => {
  const zoneIndex = Math.floor((floor - 1) / 20)
  const base = 50 + zoneIndex * 50
  const range = 150 + zoneIndex * 50
  return base + Math.floor(Math.random() * (range + 1))
}

/** 感染层清除奖励 */
export const getInfestedClearRewards = (floor: number): { items: { itemId: string; quantity: number }[]; money: number } => {
  const zoneIndex = Math.floor((floor - 1) / 20)
  const zones: MineFloorDef['zone'][] = ['shallow', 'frost', 'lava', 'crystal', 'shadow', 'abyss']
  const zone = zones[zoneIndex] ?? 'abyss'
  const orePool = ZONE_ORES[zone]!
  const ore = orePool[0]! // quặng chính

  const moneyTable = [
    { min: 30, max: 50 },
    { min: 60, max: 100 },
    { min: 100, max: 150 },
    { min: 150, max: 250 },
    { min: 200, max: 350 },
    { min: 300, max: 500 }
  ]
  const m = moneyTable[zoneIndex] ?? moneyTable[5]!
  return {
    items: [{ itemId: ore, quantity: 3 }],
    money: m.min + Math.floor(Math.random() * (m.max - m.min + 1))
  }
}

/** 获取奖励物品名称列表 */
export const getRewardNames = (items: { itemId: string; quantity: number }[]): string => {
  return items
    .map(r => {
      const def = getItemById(r.itemId)
      return `${def?.name ?? r.itemId}×${r.quantity}`
    })
    .join(',')
}

// ==================== 怪物定义 ====================

/** 普通怪物定义 */
export const MONSTERS: Record<string, MonsterDef> = {
  // 浅矿 (1-20)
  mud_worm: {
    id: 'mud_worm',
    name: 'Trùn đất',
    hp: 15,
    attack: 5,
    defense: 1,
    expReward: 5,
    drops: [
      { itemId: 'copper_ore', chance: 0.5 },
      { itemId: 'quartz', chance: 0.1 }
    ],
    description: 'Trùn đất bò ngoằn ngoèo, không nguy hiểm lắm.'
  },
  stone_crab: {
    id: 'stone_crab',
    name: 'Cua đá',
    hp: 25,
    attack: 6,
    defense: 3,
    expReward: 8,
    drops: [
      { itemId: 'copper_ore', chance: 0.6 },
      { itemId: 'iron_ore', chance: 0.15 }
    ],
    description: 'Bọ cánh cứng vỏ cứng, phòng ngự khá cao.'
  },
  // 冰霜 (21-40)
  ice_bat: {
    id: 'ice_bat',
    name: 'Dơi băng',
    hp: 30,
    attack: 8,
    defense: 2,
    expReward: 12,
    drops: [
      { itemId: 'iron_ore', chance: 0.5 },
      { itemId: 'jade', chance: 0.1 }
    ],
    description: 'Dơi bay lượn trong hàn băng.'
  },
  ghost: {
    id: 'ghost',
    name: 'U linh',
    hp: 20,
    attack: 10,
    defense: 0,
    expReward: 15,
    drops: [
      { itemId: 'jade', chance: 0.2 },
      { itemId: 'quartz', chance: 0.3 }
    ],
    description: 'U linh trôi nổi bất định, tấn công cao phòng ngự thấp.'
  },
  // 熔岩 (41-60)
  fire_bat: {
    id: 'fire_bat',
    name: 'Dơi lửa',
    hp: 35,
    attack: 9,
    defense: 3,
    expReward: 18,
    drops: [
      { itemId: 'gold_ore', chance: 0.55 },
      { itemId: 'ruby', chance: 0.15 }
    ],
    description: 'Dơi rực lửa toàn thân.'
  },
  shadow_warrior: {
    id: 'shadow_warrior',
    name: 'Chiến sĩ bóng tối',
    hp: 50,
    attack: 10,
    defense: 4,
    expReward: 28,
    drops: [
      { itemId: 'gold_ore', chance: 0.65 },
      { itemId: 'ruby', chance: 0.25 }
    ],
    description: 'Kẻ địch mạnh mẽ nơi sâu thẳm hang mỏ.'
  },
  // 水晶 (61-80)
  crystal_golem: {
    id: 'crystal_golem',
    name: 'Ma tượng pha lê',
    hp: 110,
    attack: 18,
    defense: 10,
    expReward: 45,
    drops: [
      { itemId: 'crystal_ore', chance: 0.55 },
      { itemId: 'moonstone', chance: 0.15 }
    ],
    description: 'Ma tượng ngưng tụ từ pha lê, tỏa ra ánh sáng chói mắt.'
  },
  prism_spider: {
    id: 'prism_spider',
    name: 'Nhện lăng kính',
    hp: 75,
    attack: 22,
    defense: 5,
    expReward: 50,
    drops: [
      { itemId: 'crystal_ore', chance: 0.5 },
      { itemId: 'moonstone', chance: 0.2 }
    ],
    description: 'Loài nhện khổng lồ biết dệt nên ánh sáng.'
  },
  // 暗影 (81-100)
  shadow_lurker: {
    id: 'shadow_lurker',
    name: 'Kẻ rình rập bóng tối',
    hp: 150,
    attack: 28,
    defense: 10,
    expReward: 65,
    drops: [
      { itemId: 'shadow_ore', chance: 0.55 },
      { itemId: 'obsidian', chance: 0.15 }
    ],
    description: 'Thợ săn ẩn nấp trong bóng đêm.'
  },
  void_wraith: {
    id: 'void_wraith',
    name: 'U hồn hư không',
    hp: 100,
    attack: 35,
    defense: 4,
    expReward: 70,
    drops: [
      { itemId: 'shadow_ore', chance: 0.5 },
      { itemId: 'obsidian', chance: 0.2 }
    ],
    description: 'Oán linh trôi nổi trong hư không, tấn công cao phòng ngự thấp.'
  },
  // 深渊 (101-120)
  abyss_serpent: {
    id: 'abyss_serpent',
    name: 'Cự mãng vực thẳm',
    hp: 200,
    attack: 35,
    defense: 14,
    expReward: 85,
    drops: [
      { itemId: 'void_ore', chance: 0.55 },
      { itemId: 'dragon_jade', chance: 0.15 }
    ],
    description: 'Con rắn khổng lồ cổ xưa trấn giữ vực thẳm.'
  },
  bone_dragon: {
    id: 'bone_dragon',
    name: 'Cốt Long',
    hp: 250,
    attack: 40,
    defense: 16,
    expReward: 100,
    drops: [
      { itemId: 'void_ore', chance: 0.6 },
      { itemId: 'dragon_jade', chance: 0.25 }
    ],
    description: 'Sự hiện diện đáng sợ phục sinh từ xương rồng.'
  }
}

/** 骷髅矿穴专属怪物 */
export const SKULL_CAVERN_MONSTERS: Record<string, MonsterDef> = {
  iridium_golem: {
    id: 'iridium_golem',
    name: 'Ma tượng Iridium',
    hp: 400,
    attack: 55,
    defense: 30,
    expReward: 150,
    drops: [
      { itemId: 'iridium_ore', chance: 0.6 },
      { itemId: 'prismatic_shard', chance: 0.03 }
    ],
    description: 'Vệ binh bất tử đúc từ Iridium.'
  },
  skull_serpent: {
    id: 'skull_serpent',
    name: 'Phi xà đầu lâu',
    hp: 300,
    attack: 65,
    defense: 14,
    expReward: 130,
    drops: [
      { itemId: 'iridium_ore', chance: 0.5 },
      { itemId: 'shadow_ore', chance: 0.2 }
    ],
    description: 'Rắn độc bay lượn trong huyệt mỏ Đầu Lâu.'
  },
  ancient_mummy: {
    id: 'ancient_mummy',
    name: 'Xác ướp viễn cổ',
    hp: 550,
    attack: 45,
    defense: 35,
    expReward: 180,
    drops: [
      { itemId: 'iridium_ore', chance: 0.65 },
      { itemId: 'prismatic_shard', chance: 0.05 }
    ],
    description: 'Hộ vệ bất tử của nền văn minh viễn cổ.'
  }
}

/** 区域怪物映射 */
export const ZONE_MONSTERS: Record<MineFloorDef['zone'], MonsterDef[]> = {
  shallow: [MONSTERS.mud_worm!, MONSTERS.stone_crab!],
  frost: [MONSTERS.ice_bat!, MONSTERS.ghost!],
  lava: [MONSTERS.fire_bat!, MONSTERS.shadow_warrior!],
  crystal: [MONSTERS.crystal_golem!, MONSTERS.prism_spider!],
  shadow: [MONSTERS.shadow_lurker!, MONSTERS.void_wraith!],
  abyss: [MONSTERS.abyss_serpent!, MONSTERS.bone_dragon!]
}

// ==================== BOSS 定义 ====================

/** BOSS 怪物定义 */
export const BOSS_MONSTERS: Record<number, MonsterDef> = {
  20: {
    id: 'mud_golem',
    name: 'Cự thú bùn đá',
    hp: 80,
    attack: 8,
    defense: 5,
    expReward: 50,
    drops: [
      { itemId: 'copper_ore', chance: 1.0 },
      { itemId: 'quartz', chance: 1.0 }
    ],
    description: 'Bá chủ của khu vực mỏ nông, thân hình khổng lồ như đá tảng.'
  },
  40: {
    id: 'frost_queen',
    name: 'Nữ hoàng Băng Giá',
    hp: 120,
    attack: 12,
    defense: 6,
    expReward: 80,
    drops: [
      { itemId: 'iron_ore', chance: 1.0 },
      { itemId: 'jade', chance: 1.0 }
    ],
    description: 'Kẻ thống trị sông ngầm băng giá, hàn khí thấu xương.'
  },
  60: {
    id: 'lava_lord',
    name: 'Chúa tể Dung Nham',
    hp: 180,
    attack: 16,
    defense: 8,
    expReward: 120,
    drops: [
      { itemId: 'gold_ore', chance: 1.0 },
      { itemId: 'ruby', chance: 1.0 }
    ],
    description: 'Sự hiện diện nơi sâu nhất của tầng dung nham, vị vua của lửa đỏ.'
  },
  80: {
    id: 'crystal_king',
    name: 'Vua Pha Lê',
    hp: 400,
    attack: 32,
    defense: 16,
    expReward: 220,
    drops: [
      { itemId: 'crystal_ore', chance: 1.0 },
      { itemId: 'moonstone', chance: 1.0 }
    ],
    description: 'Thế ý chí tụ họp từ hàng vạn pha lê, khúc xạ ánh sáng chí mạng.'
  },
  100: {
    id: 'shadow_sovereign',
    name: 'Chúa tể Bóng Tối',
    hp: 600,
    attack: 42,
    defense: 20,
    expReward: 350,
    drops: [
      { itemId: 'shadow_ore', chance: 1.0 },
      { itemId: 'obsidian', chance: 1.0 }
    ],
    description: 'Kẻ thống trị tối cao nơi sâu thẳm khe nứt bóng tối.'
  },
  120: {
    id: 'abyss_dragon',
    name: 'Long Vương Vực Thẳm',
    hp: 900,
    attack: 55,
    defense: 25,
    expReward: 500,
    drops: [
      { itemId: 'void_ore', chance: 1.0 },
      { itemId: 'dragon_jade', chance: 1.0 }
    ],
    description: 'Vua rồng cổ đại đang ngủ trong vực thẳm không đáy, kẻ thù cuối cùng.'
  }
}

/** BOSS 额外掉落铜钱 */
export const BOSS_MONEY_REWARDS: Record<number, number> = {
  20: 100,
  40: 200,
  60: 500,
  80: 800,
  100: 1500,
  120: 3000
}

/** BOSS 额外掉落矿石 */
export const BOSS_ORE_REWARDS: Record<number, { itemId: string; quantity: number }[]> = {
  20: [{ itemId: 'copper_ore', quantity: 3 }],
  40: [{ itemId: 'iron_ore', quantity: 3 }],
  60: [{ itemId: 'gold_ore', quantity: 3 }],
  80: [{ itemId: 'crystal_ore', quantity: 3 }],
  100: [{ itemId: 'shadow_ore', quantity: 3 }],
  120: [{ itemId: 'void_ore', quantity: 5 }]
}

/** 获取弱化版 BOSS（重进时降低 30% 属性） */
export const getWeakenedBoss = (floor: number): MonsterDef | undefined => {
  const boss = BOSS_MONSTERS[floor]
  if (!boss) return undefined
  return {
    ...boss,
    hp: Math.floor(boss.hp * 0.7),
    attack: Math.floor(boss.attack * 0.7),
    defense: Math.floor(boss.defense * 0.7)
  }
}

// ==================== 楼层生成 ====================

/** 生成矿洞层数据（120层） */
const generateFloors = (): MineFloorDef[] => {
  const floors: MineFloorDef[] = []
  const zones: MineFloorDef['zone'][] = ['shallow', 'frost', 'lava', 'crystal', 'shadow', 'abyss']

  for (let i = 1; i <= MAX_MINE_FLOOR; i++) {
    const zoneIndex = Math.floor((i - 1) / 20)
    const zone = zones[zoneIndex]!
    const posInZone = ((i - 1) % 20) + 1 // 1-20
    const posInHalf = ((i - 1) % 10) + 1 // 1-10(mỗi10mô hình lặp lại lớp)

    let specialType: MineFloorDef['specialType'] = null
    if (posInZone === 20) specialType = 'boss'
    else if (posInHalf === 3) specialType = 'mushroom'
    else if (posInHalf === 4) specialType = 'dark'
    else if (posInHalf === 6) specialType = 'infested'
    else if (posInHalf === 8) specialType = 'treasure'

    floors.push({
      floor: i,
      zone,
      ores: ZONE_ORES[zone]!,
      monsters: ZONE_MONSTERS[zone]!,
      isSafePoint: i % 5 === 0,
      specialType
    })
  }
  return floors
}

export const MINE_FLOORS = generateFloors()

/** 获取指定层数据 */
export const getFloor = (floor: number): MineFloorDef | undefined => {
  return MINE_FLOORS[floor - 1]
}

/** 矿洞区域中文名 */
export const ZONE_NAMES: Record<MineFloorDef['zone'], string> = {
  shallow: 'Mỏ Nông - Hang Đất Đá',
  frost: 'Động Băng - Sông Ngầm Băng Giá',
  lava: 'Tầng Dung Nham - Lửa Ngầm Cuộn Trào',
  crystal: 'Động Pha Lê - Mê Cung Tinh Thể',
  shadow: 'U Cảnh - Khe Nứt Bóng Tối',
  abyss: 'Vực Thẳm - Vực Sâu Không Đáy'
}

// ==================== 骷髅矿穴 ====================

/** 骷髅矿穴楼层数据（运行时生成） */
export interface SkullCavernFloorDef {
  floor: number
  ores: string[]
  monsters: MonsterDef[]
  specialType: MineFloorDef['specialType']
  scaleFactor: number
  isSafePoint: boolean
}

/** 骷髅矿穴矿石池 */
const SKULL_CAVERN_BASE_ORES = [
  'copper_ore',
  'iron_ore',
  'gold_ore',
  'crystal_ore',
  'shadow_ore',
  'void_ore',
  'quartz',
  'jade',
  'ruby',
  'moonstone',
  'obsidian',
  'dragon_jade',
  'iridium_ore'
]

/** 生成骷髅矿穴楼层 */
export const generateSkullCavernFloor = (floor: number): SkullCavernFloorDef => {
  const scaleFactor = 1 + (floor - 1) * 0.03

  // 矿石池：深层增加铱矿权重
  const ores = [...SKULL_CAVERN_BASE_ORES]
  if (floor > 20) ores.push('iridium_ore')
  if (floor > 50) ores.push('iridium_ore')
  if (floor > 30 && Math.random() < 0.05 + floor * 0.001) {
    ores.push('prismatic_shard')
  }

  // 怪物池
  const monsterPool: MonsterDef[] = Object.values(SKULL_CAVERN_MONSTERS)
  if (floor > 10) {
    monsterPool.push(MONSTERS.shadow_lurker!, MONSTERS.bone_dragon!)
  }

  // 特殊层
  let specialType: MineFloorDef['specialType'] = null
  if (floor % 25 === 0) specialType = 'boss'
  else if (floor % 10 === 3) specialType = 'mushroom'
  else if (floor % 10 === 5) specialType = 'infested'
  else if (floor % 10 === 7) specialType = 'treasure'

  return {
    floor,
    ores,
    monsters: monsterPool,
    specialType,
    scaleFactor,
    isSafePoint: floor % 10 === 0
  }
}

/** 缩放怪物属性（骷髅矿穴用） */
export const scaleMonster = (monster: MonsterDef, scaleFactor: number): MonsterDef => {
  return {
    ...monster,
    hp: Math.floor(monster.hp * scaleFactor),
    attack: Math.floor(monster.attack * scaleFactor),
    defense: Math.floor(monster.defense * scaleFactor),
    expReward: Math.floor(monster.expReward * scaleFactor)
  }
}

/** 获取骷髅矿穴小BOSS(mỗi25层，随机BOSS×2倍缩放） */
export const getSkullCavernBoss = (floor: number): MonsterDef | undefined => {
  if (floor % 25 !== 0) return undefined
  const bossFloors = Object.keys(BOSS_MONSTERS).map(Number)
  const randomFloor = bossFloors[Math.floor(Math.random() * bossFloors.length)]!
  const boss = BOSS_MONSTERS[randomFloor]!
  const scaleFactor = 2 * (1 + (floor - 1) * 0.03)
  return scaleMonster(boss, scaleFactor)
}

// ==================== 格子探索系统 ====================

import type { MineTile, MineTileData, FloorTileDistribution, FloorSpecialType } from '@/types'
import { GRID_SIZE, GRID_TOTAL, MIN_STAIRS_DISTANCE } from '@/types'

/** 获取 6×6 边缘位置索引（第一行/最后一行/第一列/最后列） */
export const getEdgeIndices = (): number[] => {
  const edges: number[] = []
  for (let i = 0; i < GRID_TOTAL; i++) {
    const row = Math.floor(i / GRID_SIZE)
    const col = i % GRID_SIZE
    if (row === 0 || row === GRID_SIZE - 1 || col === 0 || col === GRID_SIZE - 1) {
      edges.push(i)
    }
  }
  return edges
}

/** 获取相邻格子索引（上下左右） */
export const getAdjacentIndices = (index: number): number[] => {
  const row = Math.floor(index / GRID_SIZE)
  const col = index % GRID_SIZE
  const adj: number[] = []
  if (row > 0) adj.push((row - 1) * GRID_SIZE + col)
  if (row < GRID_SIZE - 1) adj.push((row + 1) * GRID_SIZE + col)
  if (col > 0) adj.push(row * GRID_SIZE + col - 1)
  if (col < GRID_SIZE - 1) adj.push(row * GRID_SIZE + col + 1)
  return adj
}

/** 曼哈顿距离 */
export const manhattanDistance = (a: number, b: number): number => {
  const ar = Math.floor(a / GRID_SIZE)
  const ac = a % GRID_SIZE
  const br = Math.floor(b / GRID_SIZE)
  const bc = b % GRID_SIZE
  return Math.abs(ar - br) + Math.abs(ac - bc)
}

/** 获取炸弹范围内的索引 */
export const getBombIndices = (center: number, bombId: string): number[] => {
  const cr = Math.floor(center / GRID_SIZE)
  const cc = center % GRID_SIZE
  const indices: number[] = []

  if (bombId === 'cherry_bomb') {
    // 3×3
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const r = cr + dr
        const c = cc + dc
        if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
          indices.push(r * GRID_SIZE + c)
        }
      }
    }
  } else if (bombId === 'bomb') {
    // 曼哈顿距离 ≤ 2（十字+菱形）
    for (let i = 0; i < GRID_TOTAL; i++) {
      if (manhattanDistance(center, i) <= 2) indices.push(i)
    }
  } else if (bombId === 'mega_bomb') {
    // 全部 36 格
    for (let i = 0; i < GRID_TOTAL; i++) indices.push(i)
  }

  return indices
}

/** 获取楼层格子分布配置 */
export const getFloorDistribution = (specialType: FloorSpecialType): FloorTileDistribution => {
  switch (specialType) {
    case 'mushroom':
      return {
        oreCount: [1, 2],
        monsterCount: [1, 2],
        trapCount: [0, 1],
        mushroomCount: [6, 8],
        stairsHiddenUntilClear: false
      }
    case 'treasure':
      return {
        oreCount: [2, 3],
        monsterCount: [2, 3],
        trapCount: [1, 1],
        treasureCount: [1, 2],
        stairsHiddenUntilClear: false
      }
    case 'dark':
      return {
        oreCount: [2, 3],
        monsterCount: [2, 2],
        trapCount: [4, 5],
        stairsHiddenUntilClear: false
      }
    case 'infested':
      return {
        oreCount: [1, 2],
        monsterCount: [8, 10],
        trapCount: [0, 0],
        stairsHiddenUntilClear: true
      }
    case 'boss':
      return {
        oreCount: [1, 2],
        monsterCount: [0, 0],
        trapCount: [0, 1],
        bossCount: [1, 1],
        stairsHiddenUntilClear: true
      }
    default:
      // 普通层
      return {
        oreCount: [3, 4],
        monsterCount: [3, 4],
        trapCount: [1, 2],
        stairsHiddenUntilClear: false
      }
  }
}

/** 范围内随机整数 [min, max] */
const randInt = (min: number, max: number): number => min + Math.floor(Math.random() * (max - min + 1))

/** 从数组中随机选一个 */
const randPick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!

/** 生成楼层 6×6 格子 */
export const generateFloorGrid = (
  floorData: MineFloorDef,
  floorNum: number,
  isSkullCavern: boolean,
  scaleFactor: number
): { tiles: MineTile[]; entryIndex: number; totalMonsters: number; stairsUsable: boolean } => {
  const dist = getFloorDistribution(floorData.specialType)
  const tiles: MineTile[] = []

  // 1. 创建 36 个 hidden/empty 格
  for (let i = 0; i < GRID_TOTAL; i++) {
    tiles.push({ index: i, type: 'empty', state: 'hidden' })
  }

  // 2. 入口：随机边缘格
  const edges = getEdgeIndices()
  const entryIndex = randPick(edges)
  tiles[entryIndex]!.state = 'revealed'

  // 3. 放置楼梯（距入口 ≥ MIN_STAIRS_DISTANCE）
  const stairsCandidates = []
  for (let i = 0; i < GRID_TOTAL; i++) {
    if (i !== entryIndex && manhattanDistance(entryIndex, i) >= MIN_STAIRS_DISTANCE) {
      stairsCandidates.push(i)
    }
  }
  const stairsIndex = randPick(stairsCandidates)
  tiles[stairsIndex]!.type = 'stairs'

  // 已占用位置集合
  const used = new Set<number>([entryIndex, stairsIndex])

  /** 在随机空闲位置放置格子 */
  const placeRandom = (type: MineTile['type'], data?: MineTileData): number => {
    const candidates = []
    for (let i = 0; i < GRID_TOTAL; i++) {
      if (!used.has(i)) candidates.push(i)
    }
    if (candidates.length === 0) return -1
    const idx = randPick(candidates)
    used.add(idx)
    tiles[idx]!.type = type
    if (data) tiles[idx]!.data = data
    return idx
  }

  // 4. BOSS 层：放 boss 格在中心区域
  const bossCount = dist.bossCount ? randInt(dist.bossCount[0], dist.bossCount[1]) : 0
  let totalMonsters = 0
  if (bossCount > 0) {
    // 中心 2×2 区域（行2-3，列2-3）
    const centerCandidates = [2 * GRID_SIZE + 2, 2 * GRID_SIZE + 3, 3 * GRID_SIZE + 2, 3 * GRID_SIZE + 3].filter(i => !used.has(i))

    if (centerCandidates.length > 0) {
      const bossIdx = randPick(centerCandidates)
      used.add(bossIdx)

      // 获取 BOSS 数据
      let bossMonster: MonsterDef | undefined
      if (isSkullCavern) {
        bossMonster = getSkullCavernBoss(floorNum)
      } else {
        const bossId = BOSS_MONSTERS[floorNum]?.id
        const isFirstKill = bossId ? true : true // Phát hiện tiêu diệt đầu tiên trong store xử lý trung bình
        bossMonster = isFirstKill ? BOSS_MONSTERS[floorNum] : getWeakenedBoss(floorNum)
      }

      if (bossMonster) {
        tiles[bossIdx]!.type = 'boss'
        tiles[bossIdx]!.data = { monster: bossMonster, isBoss: true }
        totalMonsters++
      }
    }
  }

  // 5. 放置矿石
  const oreCount = randInt(dist.oreCount[0], dist.oreCount[1])
  // 暗河层使用特殊矿石池
  const orePool = floorData.specialType === 'dark' ? getDarkFloorOres() : floorData.ores
  for (let i = 0; i < oreCount; i++) {
    const oreId = randPick(orePool)
    placeRandom('ore', { oreId, oreQuantity: 1 })
  }

  // 6. 放置怪物
  const monsterCount = randInt(dist.monsterCount[0], dist.monsterCount[1])
  for (let i = 0; i < monsterCount; i++) {
    if (floorData.monsters.length === 0) break
    let monster = randPick(floorData.monsters)
    if (isSkullCavern && scaleFactor > 1) {
      monster = scaleMonster(monster, scaleFactor)
    }
    placeRandom('monster', { monster })
    totalMonsters++
  }

  // 7. 放置陷阱
  const trapCount = randInt(dist.trapCount[0], dist.trapCount[1])
  for (let i = 0; i < trapCount; i++) {
    const trapDamage = getDarkFloorTrapDamage(floorNum)
    placeRandom('trap', { trapDamage })
  }

  // 8. 放置宝箱
  if (dist.treasureCount) {
    const treasureCount = randInt(dist.treasureCount[0], dist.treasureCount[1])
    for (let i = 0; i < treasureCount; i++) {
      const rewards = getTreasureRewards(floorNum)
      placeRandom('treasure', { treasureItems: rewards.items, treasureMoney: rewards.money })
    }
  }

  // 9. 放置蘑菇
  if (dist.mushroomCount) {
    const mushCount = randInt(dist.mushroomCount[0], dist.mushroomCount[1])
    for (let i = 0; i < mushCount; i++) {
      // 每格 1-2 个蘑菇/药草
      const items: { itemId: string; quantity: number }[] = []
      if (floorNum <= 40) {
        items.push({ itemId: Math.random() < 0.7 ? 'wild_mushroom' : 'herb', quantity: 1 })
      } else if (floorNum <= 80) {
        items.push({ itemId: Math.random() < 0.5 ? 'wild_mushroom' : 'ginseng', quantity: 1 })
      } else {
        items.push({ itemId: Math.random() < 0.4 ? 'ginseng' : 'wild_mushroom', quantity: 1 })
        if (Math.random() < 0.3) items.push({ itemId: 'herb', quantity: 1 })
      }
      placeRandom('mushroom', { mushroomItems: items })
    }
  }

  // 10. 入口格的邻居如果都是 hidden，自动翻开入口的空格邻居（让玩家有可操作选择）
  // 入口本身已经 revealed，玩家可以点击其邻格

  const stairsUsable = !dist.stairsHiddenUntilClear
  return { tiles, entryIndex, totalMonsters, stairsUsable }
}
