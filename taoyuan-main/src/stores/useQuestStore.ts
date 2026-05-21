import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { QuestInstance, Season, MainQuestState, MainQuestObjective } from '@/types'
import { generateQuest, generateSpecialOrder as _generateSpecialOrder } from '@/data/quests'
import { getStoryQuestById, getNextStoryQuest, getFirstStoryQuest, STORY_QUESTS } from '@/data/storyQuests'
import { getNpcById } from '@/data/npcs'
import { useInventoryStore } from './useInventoryStore'
import { usePlayerStore } from './usePlayerStore'
import { useNpcStore } from './useNpcStore'
import { useAchievementStore } from './useAchievementStore'
import { useSkillStore } from './useSkillStore'
import { useShopStore } from './useShopStore'
import { useAnimalStore } from './useAnimalStore'
import i18n from '@/locales'
const tText = (zh: string, vi: string) => { return i18n.global.locale.value === 'vi' ? vi : zh }


export const useQuestStore = defineStore('quest', () => {
  const inventoryStore = useInventoryStore()
  const playerStore = usePlayerStore()
  const npcStore = useNpcStore()
  const achievementStore = useAchievementStore()

  /** 告示栏上的可接取任务 */
  const boardQuests = ref<QuestInstance[]>([])

  /** 已接取的进行中任务 */
  const activeQuests = ref<QuestInstance[]>([])

  /** 累计完成任务数 */
  const completedQuestCount = ref<number>(0)

  /** 当前可接取的特殊订单 */
  const specialOrder = ref<QuestInstance | null>(null)

  /** 最大同时接取任务数 */
  const MAX_ACTIVE_QUESTS = 3

  /** 每日生成新任务到告示栏 */
  const generateDailyQuests = (season: Season, day: number) => {
    boardQuests.value = [] // Xóa bảng tin cũ
    const count = 1 + Math.floor(Math.random() * 2) // 1-2một
    for (let i = 0; i < count; i++) {
      const quest = generateQuest(season, day)
      if (quest) {
        boardQuests.value.push(quest)
      }
    }
  }

  /** 按梯度生成特殊订单 (tier: 1-4 对应 第7/14/21/28天) */
  const generateSpecialOrder = (season: Season, tier: number) => {
    const order = _generateSpecialOrder(season, tier)
    specialOrder.value = order
  }

  /** 接取任务 */
  const acceptQuest = (questId: string): { success: boolean; message: string } => {
    if (activeQuests.value.length >= MAX_ACTIVE_QUESTS) {
      return { success: false, message: tText(`Truy cập đồng thời tối đa${MAX_ACTIVE_QUESTS}nhiệm vụ.`, `Có thể chấp nhận tối đa ${MAX_ACTIVE_QUESTS} nhiệm vụ cùng một lúc. `) }
    }
    const idx = boardQuests.value.findIndex(q => q.id === questId)
    if (idx === -1) return { success: false, message: tText('Nhiệm vụ không tồn tại.', 'Nhiệm vụ không tồn tại.') }

    const quest = boardQuests.value[idx]!
    quest.accepted = true

    // 非送货类委托：检查Trong ba lô已有的物品数量
    if (quest.type !== 'delivery') {
      quest.collectedQuantity = Math.min(inventoryStore.getItemCount(quest.targetItemId), quest.targetQuantity)
    }

    activeQuests.value.push(quest)
    boardQuests.value.splice(idx, 1)
    return { success: true, message: tText(`Đã nhận nhiệm vụ:${quest.description}`, `Đã chấp nhận nhiệm vụ: ${quest.description}`) }
  }

  /** 接取特殊订单 */
  const acceptSpecialOrder = (): { success: boolean; message: string } => {
    if (!specialOrder.value) return { success: false, message: tText('Không có đơn đặt hàng đặc biệt có sẵn để thực hiện.', 'Không có đơn đặt hàng đặc biệt có sẵn để thực hiện.') }
    if (activeQuests.value.length >= MAX_ACTIVE_QUESTS) {
      return { success: false, message: tText(`Truy cập đồng thời tối đa${MAX_ACTIVE_QUESTS}nhiệm vụ.`, `Có thể chấp nhận tối đa ${MAX_ACTIVE_QUESTS} nhiệm vụ cùng một lúc. `) }
    }

    const order = specialOrder.value
    order.accepted = true
    order.collectedQuantity = Math.min(inventoryStore.getItemCount(order.targetItemId), order.targetQuantity)

    activeQuests.value.push(order)
    specialOrder.value = null
    return { success: true, message: tText(`Lệnh đặc biệt được thực hiện:${order.description}`, `Đã nhận được đơn hàng đặc biệt: ${order.description}`) }
  }

  /** 提交完成的任务 */
  const submitQuest = (questId: string): { success: boolean; message: string } => {
    const idx = activeQuests.value.findIndex(q => q.id === questId)
    if (idx === -1) return { success: false, message: tText('Nhiệm vụ không tồn tại.', 'Nhiệm vụ không tồn tại.') }

    const quest = activeQuests.value[idx]!

    // 送货类委托：提交时从背包扣除物品
    if (quest.type === 'delivery') {
      if (!inventoryStore.hasItem(quest.targetItemId, quest.targetQuantity)) {
        return { success: false, message: tText(`Trong ba lô${quest.targetItemName}Không đủ.`, `Không đủ ${quest.targetItemName} trong ba lô. `) }
      }
      inventoryStore.removeItem(quest.targetItemId, quest.targetQuantity)
    } else {
      // 钓鱼/挖矿/采集/特殊订单类：检查收集进度或背包数量
      const effectiveProgress = Math.max(quest.collectedQuantity, inventoryStore.getItemCount(quest.targetItemId))
      if (effectiveProgress < quest.targetQuantity) {
        return { success: false, message: `${quest.targetItemName}Tiến độ thu thập không đủ (${effectiveProgress}/${quest.targetQuantity}).` }
      }
    }

    // 发放铜钱奖励
    playerStore.earnMoney(quest.moneyReward)
    npcStore.adjustFriendship(quest.npcId, quest.friendshipReward)

    // 发放物品奖励
    if (quest.itemReward) {
      for (const item of quest.itemReward) {
        inventoryStore.addItem(item.itemId, item.quantity)
      }
    }

    // 记录完成
    completedQuestCount.value++

    // 从活跃列表移除
    activeQuests.value.splice(idx, 1)

    let message = tText(`đã hoàn thành${quest.npcName}hoa hồng! nhận được${quest.moneyReward}văn bản,${quest.npcName}ấn tượng tốt+${quest.friendshipReward}.`, `Đã hoàn thành nhiệm vụ ${quest.npcName}! Nhận tin nhắn ${quest.moneyReward}, ủng hộ ${quest.npcName} +${quest.friendshipReward}. `)
    if (quest.itemReward && quest.itemReward.length > 0) {
      const itemNames = quest.itemReward.map(i => tText(`${i.quantity}đồ vật`, `${i.quantity} mặt hàng`)).join(',')
      message += tText(` tăng thêm${itemNames}.`, ` Nhận thêm ${itemNames}. `)
    }

    return { success: true, message }
  }

  /** 当玩家获得某物品时，更新进行中任务的进度(钓鱼/挖矿/采集类) */
  const onItemObtained = (itemId: string, quantity: number = 1) => {
    for (const quest of activeQuests.value) {
      if (quest.type === 'delivery') continue // Các mặt hàng giao hàng không được theo dõi tự động
      if (quest.targetItemId === itemId && quest.collectedQuantity < quest.targetQuantity) {
        quest.collectedQuantity = Math.min(quest.collectedQuantity + quantity, quest.targetQuantity)
      }
    }

    // 同步刷新主线任务中 deliverItem 目标的进度
    if (mainQuest.value?.accepted) {
      const def = getStoryQuestById(mainQuest.value.questId)
      if (def) {
        for (let i = 0; i < def.objectives.length; i++) {
          const obj = def.objectives[i]!
          if (obj.type === 'deliverItem' && obj.itemId === itemId && !mainQuest.value.objectiveProgress[i]) {
            mainQuest.value.objectiveProgress[i] = evaluateObjective(obj)
          }
        }
      }
    }
  }

  /** 每日更新：天数递减，过期移除 */
  const dailyUpdate = () => {
    // 活跃委托剩余天数递减
    const expired: QuestInstance[] = []
    activeQuests.value = activeQuests.value.filter(q => {
      q.daysRemaining--
      if (q.daysRemaining <= 0) {
        expired.push(q)
        return false
      }
      return true
    })

    // 特殊订单过期(未接取也会过期)
    if (specialOrder.value) {
      specialOrder.value.daysRemaining--
      if (specialOrder.value.daysRemaining <= 0) {
        specialOrder.value = null
      }
    }

    return expired
  }

  /** 检查是否有任务关注某物品 */
  const hasActiveQuestFor = (itemId: string): boolean => {
    return activeQuests.value.some(q => q.targetItemId === itemId)
  }

  // ============================================================
  // 主线任务
  // ============================================================

  /** 当前主线任务状态 */
  const mainQuest = ref<MainQuestState | null>(null)

  /** 已完成的主线任务ID列表 */
  const completedMainQuests = ref<string[]>([])

  /** ấn tượng tốt等级层级顺序 */
  const LEVEL_ORDER = ['stranger', 'acquaintance', 'friendly', 'bestFriend'] as const
  const meetsLevel = (current: string, required: string): boolean => {
    return LEVEL_ORDER.indexOf(current as (typeof LEVEL_ORDER)[number]) >= LEVEL_ORDER.indexOf(required as (typeof LEVEL_ORDER)[number])
  }

  /** 评估单một目标是否达成 */
  const evaluateObjective = (obj: MainQuestObjective): boolean => {
    const skillStore = useSkillStore()
    const shopStore = useShopStore()
    const animalStore = useAnimalStore()

    switch (obj.type) {
      case 'earnMoney':
        return achievementStore.stats.totalMoneyEarned >= (obj.target ?? 0)
      case 'reachMineFloor':
        return achievementStore.stats.highestMineFloor >= (obj.target ?? 0)
      case 'reachSkullFloor':
        return achievementStore.stats.skullCavernBestFloor >= (obj.target ?? 0)
      case 'skillLevel':
        if (obj.skillType) {
          return skillStore.getSkill(obj.skillType as 'farming' | 'foraging' | 'fishing' | 'mining' | 'combat').level >= (obj.target ?? 0)
        }
        // 无指定技能类型 = 任意技能达标
        return skillStore.skills.some(s => s.level >= (obj.target ?? 0))
      case 'allSkillsLevel':
        return skillStore.skills.every(s => s.level >= (obj.target ?? 0))
      case 'harvestCrops':
        return achievementStore.stats.totalCropsHarvested >= (obj.target ?? 0)
      case 'catchFish':
        return achievementStore.stats.totalFishCaught >= (obj.target ?? 0)
      case 'cookRecipes':
        return achievementStore.stats.totalRecipesCooked >= (obj.target ?? 0)
      case 'killMonsters':
        return achievementStore.stats.totalMonstersKilled >= (obj.target ?? 0)
      case 'discoverItems':
        return achievementStore.discoveredItems.length >= (obj.target ?? 0)
      case 'npcFriendship': {
        if (obj.npcId === '_any') {
          // 任意NPC达到指定ấn tượng tốt
          return npcStore.npcStates.some(n => meetsLevel(npcStore.getFriendshipLevel(n.npcId), obj.friendshipLevel ?? 'acquaintance'))
        }
        const level = npcStore.getFriendshipLevel(obj.npcId ?? '')
        return meetsLevel(level, obj.friendshipLevel ?? 'acquaintance')
      }
      case 'npcAllFriendly':
        return npcStore.npcStates.every(n => meetsLevel(npcStore.getFriendshipLevel(n.npcId), obj.friendshipLevel ?? 'friendly'))
      case 'completeBundles':
        return achievementStore.completedBundles.length >= (obj.target ?? 0)
      case 'completeQuests':
        return completedQuestCount.value >= (obj.target ?? 0)
      case 'shipItems':
        return shopStore.shippedItems.length >= (obj.target ?? 0)
      case 'ownAnimals':
        return animalStore.animals.length >= (obj.target ?? 0)
      case 'married':
        return npcStore.getSpouse() !== null
      case 'hasChild':
        return npcStore.children.length > 0
      case 'deliverItem':
        // deliverItem 只检查背包有足够物品(提交时才扣除)
        return inventoryStore.hasItem(obj.itemId ?? '', obj.itemQuantity ?? 1)
      default:
        return false
    }
  }

  /** 初始化主线任务：如果没有当前任务，设置下一một可接取的 */
  const initMainQuest = () => {
    if (mainQuest.value) return // Có một nhiệm vụ hiện tại
    if (completedMainQuests.value.length >= STORY_QUESTS.length) return // Tất cả đã xong

    // 找到下一một未完成的主线任务
    const nextQuest =
      completedMainQuests.value.length === 0
        ? getFirstStoryQuest()
        : getNextStoryQuest(completedMainQuests.value[completedMainQuests.value.length - 1]!)

    if (nextQuest) {
      mainQuest.value = {
        questId: nextQuest.id,
        accepted: false,
        objectiveProgress: nextQuest.objectives.map(() => false)
      }
    }
  }

  /** 接取主线任务 */
  const acceptMainQuest = (): { success: boolean; message: string } => {
    if (!mainQuest.value) return { success: false, message: tText('Không có nhiệm vụ chính có sẵn.', 'Không có nhiệm vụ chính có sẵn.') }
    if (mainQuest.value.accepted) return { success: false, message: tText('Nhiệm vụ chính đã được chấp nhận.', 'Nhiệm vụ chính đã được chấp nhận.') }

    const def = getStoryQuestById(mainQuest.value.questId)
    if (!def) return { success: false, message: tText('Dữ liệu nhiệm vụ chính là bất thường.', 'Dữ liệu nhiệm vụ chính là bất thường.') }

    mainQuest.value.accepted = true

    // 接取时立即评估一次进度
    for (let i = 0; i < def.objectives.length; i++) {
      mainQuest.value.objectiveProgress[i] = evaluateObjective(def.objectives[i]!)
    }

    const npcDef = getNpcById(def.npcId)
    const npcName = npcDef?.name ?? def.npcId
    return { success: true, message: tText(`Đã chấp nhận nhiệm vụ chính:${def.title}(${npcName})`, `Đã chấp nhận nhiệm vụ chính: ${def.title} (${npcName})`) }
  }

  /** 每日更新主线任务进度 */
  const updateMainQuestProgress = () => {
    if (!mainQuest.value || !mainQuest.value.accepted) return

    const def = getStoryQuestById(mainQuest.value.questId)
    if (!def) return

    for (let i = 0; i < def.objectives.length; i++) {
      if (!mainQuest.value.objectiveProgress[i]) {
        mainQuest.value.objectiveProgress[i] = evaluateObjective(def.objectives[i]!)
      }
    }
  }

  /** 检查主线任务是否可提交(实时评估未完成的目标) */
  const canSubmitMainQuest = (): boolean => {
    if (!mainQuest.value || !mainQuest.value.accepted) return false

    const def = getStoryQuestById(mainQuest.value.questId)
    if (!def) return false

    // 实时刷新未完成目标的进度，使 UI 同步显示最新状态
    for (let i = 0; i < def.objectives.length; i++) {
      if (!mainQuest.value.objectiveProgress[i]) {
        mainQuest.value.objectiveProgress[i] = evaluateObjective(def.objectives[i]!)
      }
    }

    return mainQuest.value.objectiveProgress.every(p => p)
  }

  /** 提交主线任务 */
  const submitMainQuest = (): { success: boolean; message: string } => {
    if (!mainQuest.value || !mainQuest.value.accepted) {
      return { success: false, message: tText('Không có nhiệm vụ chính để gửi.', 'Không có nhiệm vụ chính để gửi.') }
    }

    const def = getStoryQuestById(mainQuest.value.questId)
    if (!def) return { success: false, message: tText('Dữ liệu nhiệm vụ chính là bất thường.', 'Dữ liệu nhiệm vụ chính là bất thường.') }

    // 最终验证所有目标
    for (let i = 0; i < def.objectives.length; i++) {
      mainQuest.value.objectiveProgress[i] = evaluateObjective(def.objectives[i]!)
    }
    if (!mainQuest.value.objectiveProgress.every(p => p)) {
      return { success: false, message: tText('Tất cả các mục tiêu nhiệm vụ chính vẫn chưa được hoàn thành.', 'Tất cả các mục tiêu nhiệm vụ chính vẫn chưa được hoàn thành.') }
    }

    // deliverItem 类型扣除背包物品
    for (const obj of def.objectives) {
      if (obj.type === 'deliverItem' && obj.itemId && obj.itemQuantity) {
        if (!inventoryStore.removeItem(obj.itemId, obj.itemQuantity)) {
          return { success: false, message: tText(`Không có đủ vật phẩm trong ba lô để nộp.`, 'Không có đủ vật phẩm trong ba lô để nộp.') }
        }
      }
    }

    // 发放铜钱奖励
    playerStore.earnMoney(def.moneyReward)

    // 发放ấn tượng tốt奖励
    if (def.friendshipReward) {
      for (const fr of def.friendshipReward) {
        npcStore.adjustFriendship(fr.npcId, fr.amount)
      }
    }

    // 发放物品奖励
    if (def.itemReward) {
      for (const item of def.itemReward) {
        inventoryStore.addItem(item.itemId, item.quantity)
      }
    }

    // 记录完成
    completedMainQuests.value.push(mainQuest.value.questId)
    mainQuest.value = null

    // 自动初始化下一một主线任务
    initMainQuest()

    const npcDef = getNpcById(def.npcId)
    const npcName = npcDef?.name ?? def.npcId
    let message = tText(`【Dòng chính đã hoàn thành】${def.title}!${npcName}:có được${def.moneyReward}Chữ.`, `[Cốt truyện chính đã hoàn thành]${def.title}! ${npcName}: Nhận văn bản ${def.moneyReward}. `)
    if (def.itemReward && def.itemReward.length > 0) {
      message += tText(` Nhận phần thưởng vật phẩm bổ sung.`, 'Nhận phần thưởng vật phẩm bổ sung.')
    }
    if (!mainQuest.value) {
      if (completedMainQuests.value.length >= STORY_QUESTS.length) {
        message += tText(` Chúc mừng! Bạn đã hoàn thành tất cả các nhiệm vụ chính ở thị trấn Đào Viên!`, 'Chúc mừng! Bạn đã hoàn thành tất cả các nhiệm vụ chính ở thị trấn Đào Viên!')
      }
    }

    return { success: true, message }
  }

  // ============================================================
  // 序列化
  // ============================================================

  const serialize = () => {
    return {
      boardQuests: boardQuests.value,
      activeQuests: activeQuests.value,
      completedQuestCount: completedQuestCount.value,
      specialOrder: specialOrder.value,
      mainQuest: mainQuest.value,
      completedMainQuests: completedMainQuests.value
    }
  }

  const deserialize = (data: ReturnType<typeof serialize>) => {
    boardQuests.value = data.boardQuests ?? []
    activeQuests.value = data.activeQuests ?? []
    completedQuestCount.value = data.completedQuestCount ?? 0
    specialOrder.value = ((data as Record<string, unknown>).specialOrder as QuestInstance | null) ?? null
    mainQuest.value = ((data as Record<string, unknown>).mainQuest as MainQuestState | null) ?? null
    completedMainQuests.value = ((data as Record<string, unknown>).completedMainQuests as string[] | undefined) ?? []
    // 加载后初始化主线任务(兼容旧存档)
    initMainQuest()
  }

  return {
    boardQuests,
    activeQuests,
    completedQuestCount,
    specialOrder,
    mainQuest,
    completedMainQuests,
    MAX_ACTIVE_QUESTS,
    generateDailyQuests,
    generateSpecialOrder,
    acceptQuest,
    acceptSpecialOrder,
    submitQuest,
    onItemObtained,
    dailyUpdate,
    hasActiveQuestFor,
    initMainQuest,
    acceptMainQuest,
    updateMainQuestProgress,
    canSubmitMainQuest,
    submitMainQuest,
    serialize,
    deserialize
  }
})
