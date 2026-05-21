/** 技能类型 */
export type SkillType = 'farming' | 'foraging' | 'fishing' | 'mining' | 'combat'

/** 技能专精（等级5选择） */
export type SkillPerk5 =
  | 'harvester'
  | 'rancher' // nông nghiệp
  | 'lumberjack'
  | 'herbalist' // Thu thập
  | 'fisher'
  | 'trapper' // câu cá
  | 'miner'
  | 'geologist' // Khai thác mỏ
  | 'fighter'
  | 'defender' // chiến đấu

/** 技能专精（等级10选择，基于等级5chi nhánh） */
export type SkillPerk10 =
  | 'intensive'
  | 'artisan' // nông nghiệp: harvesterchi nhánh
  | 'coopmaster'
  | 'shepherd' // nông nghiệp: rancherchi nhánh
  | 'botanist'
  | 'alchemist' // Thu thập: herbalistchi nhánh
  | 'forester'
  | 'tracker' // Thu thập: lumberjackchi nhánh
  | 'angler'
  | 'aquaculture' // câu cá: fisherchi nhánh
  | 'mariner'
  | 'luremaster' // câu cá: trapperchi nhánh
  | 'prospector'
  | 'blacksmith' // Khai thác mỏ: minerchi nhánh
  | 'excavator'
  | 'mineralogist' // Khai thác mỏ: geologistchi nhánh
  | 'warrior'
  | 'brute' // chiến đấu: fighterchi nhánh
  | 'acrobat'
  | 'tank' // chiến đấu: defenderchi nhánh

/** 技能状态 */
export interface SkillState {
  type: SkillType
  exp: number
  level: number
  perk5: SkillPerk5 | null
  perk10: SkillPerk10 | null
}

/** câu cá小游戏评级 */
export type MiniGameRating = 'perfect' | 'excellent' | 'good' | 'poor'

/** câu cá小游戏参数 */
export interface MiniGameParams {
  fishName: string
  difficulty: 'easy' | 'normal' | 'hard' | 'legendary'
  hookHeight: number
  fishSpeed: number
  fishChangeDir: number
  gravity: number
  liftSpeed: number
  scoreGain: number
  scoreLoss: number
  timeLimit: number
}

/** câu cá小游戏结果 */
export interface MiniGameResult {
  rating: MiniGameRating
  score: number
  perfect: boolean
}

/** câu cá地点 */
export type FishingLocation = 'creek' | 'pond' | 'river' | 'mine' | 'waterfall' | 'swamp'

/** 鱼定义 */
export interface FishDef {
  id: string
  name: string
  season: ('spring' | 'summer' | 'autumn' | 'winter')[]
  weather: ('sunny' | 'rainy' | 'stormy' | 'snowy' | 'windy' | 'any')[]
  difficulty: 'easy' | 'normal' | 'hard' | 'legendary'
  sellPrice: number
  description: string
  /** câu cá地点（默认creek） */
  location?: FishingLocation
  /** 小游戏鱼移动速度（覆盖难度默认值） */
  miniGameSpeed?: number
  /** 小游戏鱼改变方向概率（覆盖难度默认值） */
  miniGameDirChange?: number
}

/** 矿洞层定义 */
export interface MineFloorDef {
  floor: number
  zone: 'shallow' | 'frost' | 'lava' | 'crystal' | 'shadow' | 'abyss'
  ores: string[] // Quặng có sẵnID
  monsters: MonsterDef[]
  isSafePoint: boolean // Đó có phải là điểm an toàn (mỗi5lớp)
  specialType: 'mushroom' | 'treasure' | 'infested' | 'dark' | 'boss' | null // Các loại sàn đặc biệt
}

/** 怪物定义 */
export interface MonsterDef {
  id: string
  name: string
  hp: number
  attack: number // gây raHPthiệt hại
  defense: number
  expReward: number // Kinh nghiệm chiến đấu được cung cấp bởi việc giết chóc
  drops: { itemId: string; chance: number }[]
  description: string
}

/** chiến đấu状态 */
export interface CombatState {
  monster: MonsterDef
  monsterHp: number
  round: number
  log: string[]
  isBoss: boolean
}

/** chiến đấu操作 */
export type CombatAction = 'attack' | 'defend' | 'flee'

/** 食谱定义 */
export interface RecipeDef {
  id: string
  name: string
  ingredients: { itemId: string; quantity: number }[]
  effect: {
    staminaRestore: number
    healthRestore?: number
    buff?: {
      type: 'fishing' | 'mining' | 'giftBonus' | 'speed' | 'defense' | 'luck' | 'farming' | 'stamina' | 'all_skills'
      value: number // tỷ lệ phần trăm hoặc tỷ lệ
      description: string
    }
  }
  unlockSource: string // Mở khóa mô tả nguồn
  description: string
  /** 需要的技能等级才能烹饪 */
  requiredSkill?: { type: SkillType; level: number }
}
