import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { HIDDEN_NPCS, getHiddenNpcById } from '@/data/hiddenNpcs'
import { getHiddenNpcHeartEvents } from '@/data/hiddenNpcHeartEvents'
import { useGameStore } from './useGameStore'
import { useSkillStore } from './useSkillStore'
import { useAchievementStore } from './useAchievementStore'
import { useNpcStore } from './useNpcStore'
import { useQuestStore } from './useQuestStore'
import { useInventoryStore } from './useInventoryStore'
import { usePlayerStore } from './usePlayerStore'
import router from '@/router'
import type { HiddenNpcState, DiscoveryCondition, DiscoveryStep, AffinityLevel, BondBonusType } from '@/types/hiddenNpc'
import type { Quality, HeartEventDef } from '@/types'
import { AFFINITY_THRESHOLDS, MAX_AFFINITY, AFFINITY_DECAY_BONDED, AFFINITY_DECAY_COURTING, MAX_OFFERS_PER_WEEK } from '@/types/hiddenNpc'

/** 供奉基础缘分值 */
const OFFERING_RESONANT = 100
const OFFERING_PLEASED = 50
const OFFERING_NEUTRAL = 10
const OFFERING_REPELLED = -40

/** 品质乘数 */
const QUALITY_MULTIPLIER: Record<Quality, number> = {
  normal: 1,
  fine: 1.25,
  excellent: 1.5,
  supreme: 2
}

/** 显灵日供奉乘数 */
const MANIFESTATION_BONUS = 3

const defaultState = (npcId: string): HiddenNpcState => ({
  npcId,
  discoveryPhase: 'unknown',
  completedSteps: [],
  affinity: 0,
  interactedToday: false,
  offeredToday: false,
  offersThisWeek: 0,
  specialInteractionCooldown: 0,
  courting: false,
  bonded: false,
  triggeredHeartEvents: [],
  unlockedAbilities: []
})

export const useHiddenNpcStore = defineStore('hiddenNpc', () => {
  const hiddenNpcStates = ref<HiddenNpcState[]>(HIDDEN_NPCS.map(n => defaultState(n.id)))

  // ==================== 基础查询 ====================

  const getHiddenNpcState = (npcId: string): HiddenNpcState | undefined => hiddenNpcStates.value.find(s => s.npcId === npcId)

  const getAffinityLevel = (npcId: string): AffinityLevel => {
    const state = getHiddenNpcState(npcId)
    if (!state) return 'wary'
    for (const t of AFFINITY_THRESHOLDS) {
      if (state.affinity >= t.min) return t.level
    }
    return 'wary'
  }

  const getRevealedNpcs = computed(() =>
    HIDDEN_NPCS.filter(n => {
      const s = getHiddenNpcState(n.id)
      return s && s.discoveryPhase === 'revealed'
    })
  )

  const getRumorNpcs = computed(() =>
    HIDDEN_NPCS.filter(n => {
      const s = getHiddenNpcState(n.id)
      return s && (s.discoveryPhase === 'rumor' || s.discoveryPhase === 'glimpse')
    })
  )

  const getBondedNpc = computed(() => {
    const state = hiddenNpcStates.value.find(s => s.bonded)
    return state ? getHiddenNpcById(state.npcId) : undefined
  })

  /** 是否为显灵日 */
  const isManifestationDay = (npcId: string): boolean => {
    const def = getHiddenNpcById(npcId)
    if (!def) return false
    const gameStore = useGameStore()
    return gameStore.season === def.manifestationDay.season && gameStore.day === def.manifestationDay.day
  }

  // ==================== 发现系统 ====================

  /** 评估单个发现条件 */
  const evaluateCondition = (cond: DiscoveryCondition): boolean => {
    const gameStore = useGameStore()
    const skillStore = useSkillStore()
    const achievementStore = useAchievementStore()
    const npcStore = useNpcStore()
    const questStore = useQuestStore()
    const inventoryStore = useInventoryStore()
    const playerStore = usePlayerStore()

    switch (cond.type) {
      case 'season':
        return gameStore.season === cond.season
      case 'weather':
        return gameStore.weather === cond.weather
      case 'timeRange':
        return gameStore.hour >= cond.minHour && gameStore.hour <= cond.maxHour
      case 'location': {
        const routeName = router.currentRoute.value.name
        return routeName === cond.panel
      }
      case 'item':
        return inventoryStore.getItemCount(cond.itemId) >= (cond.quantity ?? 1)
      case 'skill':
        return skillStore.getSkill(cond.skillType as any).level >= cond.minLevel
      case 'npcFriendship': {
        const npcState = npcStore.getNpcState(cond.npcId)
        return npcState ? npcState.friendship >= cond.minFriendship : false
      }
      case 'questComplete':
        return questStore.completedMainQuests.includes(cond.questId)
      case 'mineFloor':
        return achievementStore.stats.highestMineFloor >= cond.minFloor
      case 'fishCaught':
        return achievementStore.discoveredItems.includes(cond.fishId)
      case 'money':
        return playerStore.money >= cond.minAmount
      case 'yearMin':
        return gameStore.year >= cond.year
      case 'day':
        return gameStore.day === cond.day
      default:
        return false
    }
  }

  /** 检查所有NPC的发现进度 */
  const checkDiscoveryConditions = (): { npcId: string; step: DiscoveryStep }[] => {
    const triggered: { npcId: string; step: DiscoveryStep }[] = []

    for (const npc of HIDDEN_NPCS) {
      const state = getHiddenNpcState(npc.id)
      if (!state || state.discoveryPhase === 'revealed') continue

      // 发现链中按顺序找到下一个未完成的步骤
      for (const step of npc.discoverySteps) {
        if (state.completedSteps.includes(step.id)) continue

        // 检查所有条件
        const allMet = step.conditions.every(evaluateCondition)
        if (allMet) {
          state.completedSteps.push(step.id)
          state.discoveryPhase = step.phase
          triggered.push({ npcId: npc.id, step })
        }
        break // Mỗi lần một bước
      }
    }

    return triggered
  }

  // ==================== 互动系统 ====================

  /** 增减缘分 */
  const addAffinity = (npcId: string, amount: number) => {
    const state = getHiddenNpcState(npcId)
    if (!state) return
    state.affinity = Math.max(0, Math.min(MAX_AFFINITY, state.affinity + amount))
  }

  /** 供奉物品 */
  const performOffering = (
    npcId: string,
    itemId: string,
    quality: Quality
  ): { success: boolean; message: string; affinityChange: number } => {
    const state = getHiddenNpcState(npcId)
    const def = getHiddenNpcById(npcId)
    if (!state || !def) return { success: false, message: 'Thần tiên này không thể được tìm thấy.', affinityChange: 0 }
    if (state.discoveryPhase !== 'revealed') return { success: false, message: 'Chưa có liên lạc nào được thiết lập với fae này.', affinityChange: 0 }
    if (state.offeredToday) return { success: false, message: 'Ngày nay nó đã được tôn thờ.', affinityChange: 0 }
    if (state.offersThisWeek >= MAX_OFFERS_PER_WEEK) return { success: false, message: 'Số lượng quà tặng trong tuần này đã đạt.', affinityChange: 0 }

    const inventoryStore = useInventoryStore()
    if (!inventoryStore.removeItem(itemId, 1, quality)) {
      return { success: false, message: 'Vật phẩm này không có trong ba lô.', affinityChange: 0 }
    }

    let base = OFFERING_NEUTRAL
    if (def.resonantOfferings.includes(itemId)) base = OFFERING_RESONANT
    else if (def.pleasedOfferings.includes(itemId)) base = OFFERING_PLEASED
    else if (def.repelledOfferings.includes(itemId)) base = OFFERING_REPELLED

    let multiplier = QUALITY_MULTIPLIER[quality]
    if (isManifestationDay(npcId)) multiplier *= MANIFESTATION_BONUS

    const change = Math.round(base * multiplier)
    addAffinity(npcId, change)
    state.offeredToday = true
    state.offersThisWeek++

    let reaction = '……'
    if (base === OFFERING_RESONANT) reaction = `${def.name}Cảm thấy được kết nối.`
    else if (base === OFFERING_PLEASED) reaction = `${def.name}Thể hiện sự chấp thuận.`
    else if (base === OFFERING_REPELLED) reaction = `${def.name}Anh cau mày.`
    else reaction = `${def.name}Lời đề nghị đã được chấp nhận.`

    return { success: true, message: reaction, affinityChange: change }
  }

  /** 执行独特互动 */
  const performSpecialInteraction = (npcId: string): { success: boolean; message: string; affinityChange: number } => {
    const state = getHiddenNpcState(npcId)
    const def = getHiddenNpcById(npcId)
    if (!state || !def) return { success: false, message: 'Thần tiên này không thể được tìm thấy.', affinityChange: 0 }
    if (state.discoveryPhase !== 'revealed') return { success: false, message: 'Chưa có liên lạc nào được thiết lập với fae này.', affinityChange: 0 }
    if (state.interactedToday) return { success: false, message: 'Đã tương tác ngày hôm nay.', affinityChange: 0 }
    if (state.specialInteractionCooldown > 0)
      return { success: false, message: `cần phải đợi${state.specialInteractionCooldown}Ngày.`, affinityChange: 0 }

    const skillStore = useSkillStore()
    let affinityGain = 30
    let message = ''

    switch (def.interactionType) {
      case 'meditation': {
        // 参悟：缘分增加 = 总技能等级 × 3
        const totalLevels =
          skillStore.getSkill('farming').level +
          skillStore.getSkill('foraging').level +
          skillStore.getSkill('fishing').level +
          skillStore.getSkill('mining').level
        affinityGain = totalLevels * 3
        message = `bạn và${def.name}Ngồi lặng lẽ bên dòng nước và thiền định.`
        break
      }
      case 'music': {
        // 奏乐：基础30，随机额外 0-20
        affinityGain = 30 + Math.floor(Math.random() * 21)
        message = `bạn và${def.name}Một bài hát đã được chơi cùng nhau.`
        break
      }
      case 'ritual': {
        // 祭仪：固定40
        affinityGain = 40
        message = `bạn và${def.name}Một nghi lễ đã được hoàn thành.`
        break
      }
      case 'dreamwalk': {
        // 入梦：固定35
        affinityGain = 35
        message = `bạn và${def.name}Chúng ta đã cùng nhau đi qua một giấc mơ.`
        break
      }
      case 'cultivation': {
        // 修炼：成功率 = 挖矿×5 + 采集×5，成功+40，失败+10
        const successRate = skillStore.getSkill('mining').level * 5 + skillStore.getSkill('foraging').level * 5
        if (Math.random() * 100 < successRate) {
          affinityGain = 40
          message = `Thực hành thành công! bạn và${def.name}Cùng nhau cảm nhận hào quang của trời và đất.`
          const playerStore = usePlayerStore()
          playerStore.restoreStamina(10)
        } else {
          affinityGain = 10
          message = `Việc tu luyện không đạt đến mức hoàn hảo, nhưng${def.name}Gật đầu để ghi nhận nỗ lực của bạn.`
        }
        break
      }
    }

    addAffinity(npcId, affinityGain)
    state.interactedToday = true
    state.specialInteractionCooldown = 1

    return { success: true, message, affinityChange: affinityGain }
  }

  // ==================== 求缘với结缘 ====================

  const startCourting = (npcId: string): { success: boolean; message: string } => {
    const state = getHiddenNpcState(npcId)
    const def = getHiddenNpcById(npcId)
    if (!state || !def) return { success: false, message: 'Thần tiên này không thể được tìm thấy.' }
    if (!def.bondable) return { success: false, message: 'Nàng tiên này không thể hình thành một mối liên kết.' }
    if (state.courting) return { success: false, message: 'Đã tìm kiếm số phận.' }
    if (state.bonded) return { success: false, message: 'Đã gắn kết rồi.' }
    if (state.affinity < def.courtshipThreshold) return { success: false, message: `Số phận không đủ (đòi hỏi${def.courtshipThreshold}).` }

    // 检查是否已有结缘对象
    const existingBond = hiddenNpcStates.value.find(s => s.bonded || s.courting)
    if (existingBond && existingBond.npcId !== npcId) {
      return { success: false, message: 'Đã được gắn kết bởi số phận với các nàng tiên khác.' }
    }

    const inventoryStore = useInventoryStore()
    if (!inventoryStore.removeItem(def.courtshipItemId, 1)) {
      return { success: false, message: `cần「${def.courtshipItemId}」.` }
    }

    state.courting = true
    return { success: true, message: `${def.name}Tôi đã chấp nhận yêu cầu của bạn.` }
  }

  const formBond = (npcId: string): { success: boolean; message: string } => {
    const state = getHiddenNpcState(npcId)
    const def = getHiddenNpcById(npcId)
    if (!state || !def) return { success: false, message: 'Thần tiên này không thể được tìm thấy.' }
    if (!state.courting) return { success: false, message: 'Bạn cần tìm kiếm số phận trước tiên.' }
    if (state.bonded) return { success: false, message: 'Đã gắn kết rồi.' }
    if (state.affinity < def.bondThreshold) return { success: false, message: `Số phận không đủ (đòi hỏi${def.bondThreshold}).` }

    const inventoryStore = useInventoryStore()
    if (!inventoryStore.removeItem(def.bondItemId, 1)) {
      return { success: false, message: `cần「${def.bondItemId}」.` }
    }

    state.bonded = true
    return { success: true, message: `bạn và${def.name}Đã tạo nên một mối quan hệ vĩnh cửu.` }
  }

  const dissolveBond = (npcId: string): { success: boolean; message: string } => {
    const state = getHiddenNpcState(npcId)
    const def = getHiddenNpcById(npcId)
    if (!state || !def) return { success: false, message: 'Thần tiên này không thể được tìm thấy.' }
    if (!state.bonded && !state.courting) return { success: false, message: 'Sự ràng buộc của số phận có thể bị phá vỡ.' }

    const playerStore = usePlayerStore()
    if (playerStore.money < 10000) return { success: false, message: 'cần10000Chữ.' }
    playerStore.spendMoney(10000)

    state.bonded = false
    state.courting = false
    state.affinity = Math.min(state.affinity, 1000)
    return { success: true, message: `với${def.name}Số phận đã được giải quyết.` }
  }

  // ==================== 仙灵物品制作 ====================

  const craftSpiritItem = (npcId: string, type: 'courtship' | 'bond'): { success: boolean; message: string } => {
    const def = getHiddenNpcById(npcId)
    if (!def) return { success: false, message: 'Thần tiên này không thể được tìm thấy.' }

    const costs = type === 'courtship' ? def.courtshipCraftCost : def.bondCraftCost
    const outputItemId = type === 'courtship' ? def.courtshipItemId : def.bondItemId

    const inventoryStore = useInventoryStore()

    // 检查材料
    for (const cost of costs) {
      if (inventoryStore.getItemCount(cost.itemId) < cost.quantity) {
        return { success: false, message: 'Không đủ vật liệu.' }
      }
    }

    // 扣除材料
    for (const cost of costs) {
      inventoryStore.removeItem(cost.itemId, cost.quantity)
    }

    // 添加产物
    inventoryStore.addItem(outputItemId, 1)
    return { success: true, message: 'Sản xuất thành công!' }
  }

  // ==================== 心事件 ====================

  const checkHeartEvent = (npcId: string): HeartEventDef | null => {
    const state = getHiddenNpcState(npcId)
    const def = getHiddenNpcById(npcId)
    if (!state || !def || state.discoveryPhase !== 'revealed') return null

    const events = getHiddenNpcHeartEvents(npcId)
    for (const event of events) {
      if (state.affinity >= event.requiredFriendship && !state.triggeredHeartEvents.includes(event.id)) {
        return event
      }
    }
    return null
  }

  /** 标记心事件为已触发 */
  const markHeartEventTriggered = (npcId: string, eventId: string) => {
    const state = getHiddenNpcState(npcId)
    if (state && !state.triggeredHeartEvents.includes(eventId)) {
      state.triggeredHeartEvents.push(eventId)
    }
  }

  // ==================== 能力系统 ====================

  const checkAbilityUnlocks = (): { id: string; npcId: string; name: string; description: string }[] => {
    const newlyUnlocked: { id: string; npcId: string; name: string; description: string }[] = []

    for (const npc of HIDDEN_NPCS) {
      const state = getHiddenNpcState(npc.id)
      if (!state || state.discoveryPhase !== 'revealed') continue

      for (const ability of npc.abilities) {
        if (state.affinity >= ability.affinityRequired && !state.unlockedAbilities.includes(ability.id)) {
          state.unlockedAbilities.push(ability.id)
          newlyUnlocked.push({ id: ability.id, npcId: npc.id, name: ability.name, description: ability.description })
        }
      }
    }

    return newlyUnlocked
  }

  /** 查询指定能力是否已激活 */
  const isAbilityActive = (abilityId: string): boolean => {
    return getActiveAbilities.value.some(a => a.id === abilityId)
  }

  /** 获取指定能力的被动值（未激活则返回0） */
  const getAbilityValue = (abilityId: string): number => {
    const ability = getActiveAbilities.value.find(a => a.id === abilityId)
    return ability?.passive.value ?? 0
  }

  /** 获取当前结缘对象的 bondBonus 类型（无结缘返回 null） */
  const getBondBonusType = (): string | null => {
    const bondedState = hiddenNpcStates.value.find(s => s.bonded)
    if (!bondedState) return null
    const def = getHiddenNpcById(bondedState.npcId)
    return def?.bondBonuses[0]?.type ?? null
  }

  /** 按类型查找结缘奖励（支持多奖励NPC） */
  const getBondBonusByType = (type: string): BondBonusType | null => {
    for (const state of hiddenNpcStates.value) {
      if (!state.bonded) continue
      const def = getHiddenNpcById(state.npcId)
      if (!def) continue
      const found = def.bondBonuses.find(b => b.type === type)
      if (found) return found
    }
    return null
  }

  /** 获取当前结缘对象的完整 bondBonus（兼容：返回第一个） */
  const getBondBonus = (): BondBonusType | null => {
    const bondedState = hiddenNpcStates.value.find(s => s.bonded)
    if (!bondedState) return null
    const def = getHiddenNpcById(bondedState.npcId)
    return def?.bondBonuses[0] ?? null
  }

  /** 获取所有激活的被动能力 */
  const getActiveAbilities = computed(() => {
    const abilities: {
      npcId: string
      id: string
      name: string
      passive: NonNullable<(typeof HIDDEN_NPCS)[0]['abilities'][0]['passive']>
    }[] = []

    for (const npc of HIDDEN_NPCS) {
      const state = getHiddenNpcState(npc.id)
      if (!state || state.discoveryPhase !== 'revealed') continue

      for (const ability of npc.abilities) {
        if (state.unlockedAbilities.includes(ability.id) && ability.passive) {
          abilities.push({ npcId: npc.id, id: ability.id, name: ability.name, passive: ability.passive })
        }
      }
    }

    return abilities
  })

  // ==================== 每日处理 ====================

  /** 处理结缘每日奖励 */
  const dailyBondBonus = (): { messages: string[] } => {
    const messages: string[] = []
    const bondedState = hiddenNpcStates.value.find(s => s.bonded)
    if (!bondedState) return { messages }

    const def = getHiddenNpcById(bondedState.npcId)
    if (!def) return { messages }

    const bonus = def.bondBonuses
    for (const b of bonus) {
      switch (b.type) {
        case 'weather_control': {
          if (Math.random() < b.chance) {
            // 龙灵控天：将明日天气设为晴天
            const gameStore = useGameStore()
            gameStore.setTomorrowWeather('sunny')
            messages.push(`${def.name}Sức mạnh tinh thần của ngày mai đã xua tan mây mù của ngày mai, ngày mai sẽ có nắng.`)
          }
          break
        }
        case 'crop_blessing': {
          if (Math.random() < b.chance) {
            messages.push(`${def.name}phước lành giáng xuống các cánh đồng.`)
          }
          break
        }
        case 'animal_blessing': {
          // 被动效果，在动物产品品质判定时检查
          break
        }
        case 'stamina_restore': {
          const playerStore = usePlayerStore()
          playerStore.restoreStamina(b.amount)
          messages.push(`${def.name}đã khôi phục cho bạn${b.amount}Một số sức mạnh thể chất.`)
          break
        }
        case 'spirit_shield': {
          messages.push(`${def.name}Một lá chắn tinh thần bao quanh bạn.`)
          break
        }
        case 'sell_bonus': {
          // 被动效果，在出售时检查
          break
        }
        case 'fish_attraction': {
          if (Math.random() < b.chance) {
            messages.push(`${def.name}Nó thu hút hơi thở của cá thần.`)
          }
          break
        }
      }
    }

    return { messages }
  }

  /** 每日重置 */
  const dailyReset = () => {
    const gameStore = useGameStore()

    for (const state of hiddenNpcStates.value) {
      if (state.discoveryPhase !== 'revealed') continue

      // 缘分衰减（未互动且未供奉时）
      if (!state.interactedToday && !state.offeredToday) {
        if (state.bonded) {
          state.affinity = Math.max(0, state.affinity - AFFINITY_DECAY_BONDED)
        } else if (state.courting) {
          state.affinity = Math.max(0, state.affinity - AFFINITY_DECAY_COURTING)
        }
      }

      // 重置每日标记
      state.interactedToday = false
      state.offeredToday = false

      // 冷却递减
      if (state.specialInteractionCooldown > 0) {
        state.specialInteractionCooldown--
      }

      // 每周重置供奉次数（第7/14/21/28天）
      if (gameStore.day % 7 === 0) {
        state.offersThisWeek = 0
      }
    }
  }

  // ==================== 序列化 ====================

  const serialize = () => ({
    hiddenNpcStates: hiddenNpcStates.value
  })

  const deserialize = (data: ReturnType<typeof serialize>) => {
    const savedStates = (data.hiddenNpcStates ?? []).map((s: any) => ({
      ...defaultState(s.npcId),
      ...s
    }))
    // 合并：保留已保存的，为新增NPC补充默认状态
    const savedIds = new Set(savedStates.map((s: HiddenNpcState) => s.npcId))
    const newStates = HIDDEN_NPCS.filter(n => !savedIds.has(n.id)).map(n => defaultState(n.id))
    hiddenNpcStates.value = [...savedStates, ...newStates]
  }

  return {
    hiddenNpcStates,
    getHiddenNpcState,
    getAffinityLevel,
    getRevealedNpcs,
    getRumorNpcs,
    getBondedNpc,
    isManifestationDay,
    evaluateCondition,
    checkDiscoveryConditions,
    addAffinity,
    performOffering,
    performSpecialInteraction,
    startCourting,
    formBond,
    dissolveBond,
    craftSpiritItem,
    checkHeartEvent,
    markHeartEventTriggered,
    checkAbilityUnlocks,
    getActiveAbilities,
    isAbilityActive,
    getAbilityValue,
    getBondBonusType,
    getBondBonus,
    getBondBonusByType,
    dailyBondBonus,
    dailyReset,
    serialize,
    deserialize
  }
})
