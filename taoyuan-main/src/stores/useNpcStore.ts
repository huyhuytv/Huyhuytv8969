import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  NpcState,
  FriendshipLevel,
  HeartEventDef,
  Quality,
  ChildState,
  PregnancyState,
  PregnancyStage,
  ProposalResponse,
  FarmHelperTask,
  HiredHelper
} from '@/types'
import { NPCS, getNpcById, getHeartEventsForNpc, RECIPES } from '@/data'
import { WEATHER_TIPS, getFortuneTip, getLivingTip, getRecipeTipMessage, NO_RECIPE_TIP, TIP_NPC_IDS } from '@/data/npcTips'
import { getItemById } from '@/data/items'
import { useInventoryStore } from './useInventoryStore'
import { useGameStore } from './useGameStore'
import { usePlayerStore } from './usePlayerStore'
import { useCookingStore } from './useCookingStore'
import { useFarmStore } from './useFarmStore'
import { useAnimalStore } from './useAnimalStore'
import { useFishPondStore } from './useFishPondStore'
import { useFishingStore } from './useFishingStore'

/** ấn tượng tốt等级阈值 (10trái tim制, 每trái tim250点, 上限2500) */
const FRIENDSHIP_THRESHOLDS: { level: FriendshipLevel; min: number }[] = [
  { level: 'bestFriend', min: 2000 },
  { level: 'friendly', min: 1000 },
  { level: 'acquaintance', min: 500 },
  { level: 'stranger', min: 0 }
]

export const useNpcStore = defineStore('npc', () => {
  const npcStates = ref<NpcState[]>(
    NPCS.map(npc => ({
      npcId: npc.id,
      friendship: 0,
      talkedToday: false,
      giftedToday: false,
      giftsThisWeek: 0,
      dating: false,
      married: false,
      zhiji: false,
      triggeredHeartEvents: []
    }))
  )

  /** 每日提示NPC是否已给过提示 */
  const tipGivenToday = ref<Record<string, boolean>>({})

  /** 子女列表 */
  const children = ref<ChildState[]>([])

  /** 子女ID自增计数器(避免释放后ID冲突） */
  const nextChildId = ref<number>(0)

  /** 结婚天数计数 */
  const daysMarried = ref<number>(0)

  /** người bạn tâm giao天数计数 */
  const daysZhiji = ref<number>(0)

  /** 孕期状态(null = 无孕期） */
  const pregnancy = ref<PregnancyState | null>(null)

  /** vợ/chồng是否已提议要孩子(等待玩家回应） */
  const childProposalPending = ref<boolean>(false)

  /** 提议被拒绝次数(影响再次提议冷却） */
  const childProposalDeclinedCount = ref<number>(0)

  /** 距上次拒绝/等待的天数 */
  const daysSinceProposalDecline = ref<number>(0)

  /** 婚礼倒计时 (0=无婚礼待举行) */
  const weddingCountdown = ref<number>(0)

  /** 婚礼对象NPC ID */
  const weddingNpcId = ref<string | null>(null)

  // ============================================================
  // lao động làm thuê系统
  // ============================================================

  const hiredHelpers = ref<HiredHelper[]>([])
  const MAX_HELPERS = 2

  /** lao động làm thuêlương hàng ngày */
  const HELPER_WAGES: Record<FarmHelperTask, number> = {
    water: 100,
    feed: 150,
    harvest: 200,
    weed: 100,
    bait: 80
  }

  /** lao động làm thuê任务名称 */
  const HELPER_TASK_NAMES: Record<FarmHelperTask, string> = {
    water: 'tưới nước',
    feed: 'cho ăn',
    harvest: 'Thu hoạch',
    weed: 'Làm cỏ và kiểm soát sâu bệnh',
    bait: 'Mồi'
  }

  /** 可雇佣的NPC列表(ấn tượng tốt>=1000 且 未被雇佣 且 非vợ/chồng/người bạn tâm giao） */
  const getHireableNpcs = (): { npcId: string; name: string; friendship: number }[] => {
    return npcStates.value
      .filter(s => {
        if (s.friendship < 1000) return false
        if (s.married || s.zhiji) return false
        if (hiredHelpers.value.some(h => h.npcId === s.npcId)) return false
        return true
      })
      .map(s => {
        const def = getNpcById(s.npcId)
        return { npcId: s.npcId, name: def?.name ?? s.npcId, friendship: s.friendship }
      })
  }

  /** 雇佣NPC */
  const hireHelper = (npcId: string, task: FarmHelperTask): { success: boolean; message: string } => {
    const state = getNpcState(npcId)
    if (!state) return { success: false, message: 'NPCKhông tồn tại.' }
    if (state.friendship < 1000) return { success: false, message: 'Không đủ sự thuận lợi (yêu cầu4trái tim/1000).' }
    if (state.married || state.zhiji) return { success: false, message: 'Bạn đồng hành và người bạn tâm tình không có sẵn để thuê.' }
    if (hiredHelpers.value.length >= MAX_HELPERS) return { success: false, message: `Được tuyển dụng nhiều nhất${MAX_HELPERS}người trợ giúp tên.` }
    if (hiredHelpers.value.some(h => h.npcId === npcId)) return { success: false, message: 'Người này đã được tuyển dụng.' }

    const npcDef = getNpcById(npcId)
    const name = npcDef?.name ?? npcId
    hiredHelpers.value.push({ npcId, task, dailyWage: HELPER_WAGES[task] })
    return { success: true, message: `${name}bắt đầu giúp đỡ bạn${HELPER_TASK_NAMES[task]}Hiểu rồi!(lương hàng ngày${HELPER_WAGES[task]}văn bản)` }
  }

  /** 解雇 */
  const dismissHelper = (npcId: string): { success: boolean; message: string } => {
    const idx = hiredHelpers.value.findIndex(h => h.npcId === npcId)
    if (idx < 0) return { success: false, message: 'Người này không có việc làm.' }

    const npcDef = getNpcById(npcId)
    const name = npcDef?.name ?? npcId
    hiredHelpers.value.splice(idx, 1)
    return { success: true, message: `${name}đã rời đi.` }
  }

  /** 每日lao động làm thuê结算(useEndDay调用） */
  const processDailyHelpers = (taskFilter?: FarmHelperTask[]): { messages: string[]; dismissedNpcs: string[]; allFed: boolean } => {
    const playerStore = usePlayerStore()
    const farmStore = useFarmStore()
    const animalStore = useAnimalStore()
    const inventoryStore = useInventoryStore()
    const messages: string[] = []
    const dismissed: string[] = []
    let allFed = false

    for (const helper of [...hiredHelpers.value]) {
      // 按任务类型过滤
      if (taskFilter && !taskFilter.includes(helper.task)) continue

      const npcDef = getNpcById(helper.npcId)
      const name = npcDef?.name ?? 'lao động làm thuê'
      const state = getNpcState(helper.npcId)

      // 已变为vợ/chồng/người bạn tâm giao → 自动解雇(不收工资）
      if (state && (state.married || state.zhiji)) {
        hiredHelpers.value = hiredHelpers.value.filter(h => h.npcId !== helper.npcId)
        messages.push(`${name}đã trở thành của bạn${state.married ? 'bạn đồng hành' : 'người bạn tâm giao'}, không còn là nhân viên nữa.`)
        dismissed.push(helper.npcId)
        continue
      }

      const efficiency = state && state.friendship >= 2000 ? 1.5 : 1.0

      // 扣工资
      if (!playerStore.spendMoney(helper.dailyWage)) {
        hiredHelpers.value = hiredHelpers.value.filter(h => h.npcId !== helper.npcId)
        messages.push(`Không đủ khả năng${name}tiền lương,${name}Từ bỏ.`)
        dismissed.push(helper.npcId)
        continue
      }

      switch (helper.task) {
        case 'water': {
          const unwatered = farmStore.plots.filter(p => (p.state === 'planted' || p.state === 'growing') && !p.watered)
          const count = Math.min(unwatered.length, Math.floor(4 * efficiency) + Math.floor(Math.random() * 3))
          for (let i = 0; i < count; i++) farmStore.waterPlot(unwatered[i]!.id)
          if (count > 0) messages.push(`${name}Tưới nước cho bạn${count}mảnh đất.(-${helper.dailyWage}văn bản)`)
          else messages.push(`${name}Hôm nay không có gì để tưới nước.(-${helper.dailyWage}văn bản)`)
          break
        }
        case 'feed': {
          const result = animalStore.feedAll()
          const fishPondStore = useFishPondStore()
          const fedFish = fishPondStore.pond.built && !fishPondStore.pond.fedToday ? fishPondStore.feedFish() : false
          allFed = result.noFeedCount === 0 && result.fedCount > 0
          if (result.fedCount > 0 && fedFish) {
            messages.push(`${name}Giúp bạn cho ăn${result.fedCount}Trong ao chỉ có gia súc và cá.(-${helper.dailyWage}văn bản)`)
          } else if (result.fedCount > 0) {
            messages.push(`${name}Giúp bạn cho ăn${result.fedCount}Chỉ có chăn nuôi.(-${helper.dailyWage}văn bản)`)
          } else if (fedFish) {
            messages.push(`${name}Giúp bạn cho cá ăn trong ao cá.(-${helper.dailyWage}văn bản)`)
          } else if (result.noFeedCount > 0) {
            messages.push(`${name}Nhận thấy không đủ thức ăn,${result.noFeedCount}Gia súc không được cho ăn.(-${helper.dailyWage}văn bản)`)
          } else {
            messages.push(`${name}Hôm nay chẳng có gì để nuôi.(-${helper.dailyWage}văn bản)`)
          }
          break
        }
        case 'harvest': {
          const harvestable = farmStore.plots.filter(p => p.state === 'harvestable')
          const count = Math.min(harvestable.length, Math.floor(5 * efficiency))
          let harvested = 0
          for (let i = 0; i < count; i++) {
            const result = farmStore.harvestPlot(harvestable[i]!.id)
            if (result.cropId) {
              inventoryStore.addItem(result.cropId, 1, 'normal')
              harvested++
            }
          }
          if (harvested > 0) messages.push(`${name}Thu thập nó cho bạn${harvested}Cánh đồng trồng trọt.(-${helper.dailyWage}văn bản)`)
          else messages.push(`${name}Hôm nay chẳng có gì phải mang đi cả.(-${helper.dailyWage}văn bản)`)
          break
        }
        case 'weed': {
          let cleared = 0
          for (const plot of farmStore.plots) {
            if (plot.weedy) {
              farmStore.clearWeed(plot.id)
              cleared++
            }
            if (plot.infested) {
              farmStore.curePest(plot.id)
              cleared++
            }
          }
          if (cleared > 0) messages.push(`${name}Dọn dẹp${cleared}Sự phá hoại của cỏ dại và côn trùng.(-${helper.dailyWage}văn bản)`)
          else messages.push(`${name}Cánh đồng hôm nay khá sạch sẽ.(-${helper.dailyWage}văn bản)`)
          break
        }
        case 'bait': {
          const fishingStore = useFishingStore()
          const baited = fishingStore.baitAllCrabPots()
          if (baited > 0) messages.push(`${name}Giúp bạn đưa ra${baited}Một nồi cua chứa đầy mồi.(-${helper.dailyWage}văn bản)`)
          else messages.push(`${name}Các chậu cua hôm nay đều có mồi.(-${helper.dailyWage}văn bản)`)
          break
        }
      }
    }
    return { messages, dismissedNpcs: dismissed, allFed }
  }

  /** 子女名字池(按性别） */
  const CHILD_NAMES_MALE = ['Tiểu Long', 'Tiểu Bảo', 'bánh bao', 'hàng năm']
  const CHILD_NAMES_FEMALE = ['Tiểu Phong', 'Ahua', 'Đậu Đậu', 'nhân dân tệ']

  /** 获取NPC状态 */
  const getNpcState = (npcId: string): NpcState | undefined => {
    return npcStates.value.find(s => s.npcId === npcId)
  }

  /** 获取ấn tượng tốt等级 */
  const getFriendshipLevel = (npcId: string): FriendshipLevel => {
    const state = getNpcState(npcId)
    if (!state) return 'stranger'
    for (const t of FRIENDSHIP_THRESHOLDS) {
      if (state.friendship >= t.min) return t.level
    }
    return 'stranger'
  }

  /** 检查NPC今天是否生日 */
  const isBirthday = (npcId: string): boolean => {
    const npcDef = getNpcById(npcId)
    if (!npcDef?.birthday) return false
    const gameStore = useGameStore()
    return npcDef.birthday.season === gameStore.season && npcDef.birthday.day === gameStore.day
  }

  /** 获取今天过生日的NPC (null if none) */
  const getTodayBirthdayNpc = (): string | null => {
    const gameStore = useGameStore()
    for (const npc of NPCS) {
      if (npc.birthday && npc.birthday.season === gameStore.season && npc.birthday.day === gameStore.day) {
        return npc.id
      }
    }
    return null
  }

  /** 检查是否Có可触发的trái tim事件(对话后调用） */
  const checkHeartEvent = (npcId: string): HeartEventDef | null => {
    const state = getNpcState(npcId)
    if (!state) return null
    const events = getHeartEventsForNpc(npcId)
    for (const event of events) {
      // người bạn tâm giao事件仅người bạn tâm giao触发
      if (event.requiresZhiji && !state.zhiji) continue
      // người bạn tâm giao不触发恋爱告白(heart_8）
      if (!event.requiresZhiji && state.zhiji && event.id.endsWith('_heart_8')) continue
      if (state.friendship >= event.requiredFriendship && !state.triggeredHeartEvents.includes(event.id)) {
        return event
      }
    }
    return null
  }

  /** 标记trái tim事件为已触发 */
  const markHeartEventTriggered = (npcId: string, eventId: string) => {
    const state = getNpcState(npcId)
    if (state && !state.triggeredHeartEvents.includes(eventId)) {
      state.triggeredHeartEvents.push(eventId)
    }
  }

  /** 调整ấn tượng tốt度(trái tim事件选择结果） */
  const adjustFriendship = (npcId: string, amount: number) => {
    const state = getNpcState(npcId)
    if (state) {
      state.friendship = Math.max(0, state.friendship + amount)
    }
  }

  /** 替换对话中的占位符 */
  const replaceDialoguePlaceholders = (text: string): string => {
    const playerStore = usePlayerStore()
    return text.replace(/\{player\}/g, playerStore.playerName).replace(/\{title\}/g, playerStore.honorific)
  }

  /** 与NPC对话 (+20ấn tượng tốt) */
  const talkTo = (npcId: string): { message: string; friendshipGain: number } | null => {
    const state = getNpcState(npcId)
    if (!state) return null
    if (state.talkedToday) return null

    state.talkedToday = true
    state.friendship += 20

    const npcDef = getNpcById(npcId)
    if (!npcDef) return null

    // 已婚NPCCó特殊对话
    if (state.married) {
      const playerStore = usePlayerStore()
      const gameStore = useGameStore()
      const name = playerStore.playerName

      const marriedDialogues = [
        `${name}, Hôm nay tôi đã làm việc chăm chỉ rồi, về sớm ăn tối nhé.`,
        `tôi cho${name}Thức ăn còn sót lại và vẫn còn nóng.`,
        'Bạn đã hoàn thành công việc trên cánh đồng chưa? Đừng quá mệt mỏi.',
        `Có${name}Ở bên cạnh khiến tôi hạnh phúc mỗi ngày.`,
        'Hôm nay bạn muốn ăn gì? Tôi sẽ chuẩn bị sẵn sàng.',
        'Nhà cửa đã dọn dẹp xong, xin hãy nghỉ ngơi nhé.',
        `và${name}Đó là khoảng thời gian tuyệt vời bên nhau.`,
        `${name}, hôm nay bạn có tinh thần tốt.`
      ]

      const seasonDialogues: Record<string, string[]> = {
        spring: [`Mùa xuân đã đến, hoa ngoài sân đang nở rộ.`, `${name}, bạn đã gieo xong vụ xuân chưa?`],
        summer: [`Nóng quá……${name}Uống nhiều nước.`, 'Dưa hấu là cách giải nhiệt tốt nhất trong mùa hè.'],
        autumn: [`Gió mùa thu thật dễ chịu.${name}, bạn có muốn đi dạo cùng nhau không?`, 'Vào mùa thu hoạch, mọi công sức bỏ ra đều được đền đáp.'],
        winter: [`Ngoài trời lạnh quá,${name}Hãy vào trong và sưởi ấm.`, 'Vào mùa đông, là lúc ở nhà và uống trà nóng.']
      }

      const weatherDialogues: Record<string, string | null> = {
        rainy: 'Trời đang mưa. Không cần phải tưới ruộng. Chỉ cần nghỉ ngơi ở nhà.',
        stormy: 'Bên ngoài trời rất gió và mưa. Hôm nay đừng đi xa nhé.',
        snowy: 'Tuyết đang rơi, ngoài trời trắng xóa quá. Nó thật đẹp.',
        windy: 'Gió rất mạnh, hãy cẩn thận đừng để bị cảm lạnh khi ra ngoài.',
        sunny: null,
        cloudy: null,
        green_rain: null
      }

      const pool = [...marriedDialogues, ...(seasonDialogues[gameStore.season] ?? [])]
      const weatherLine = weatherDialogues[gameStore.weather]
      if (weatherLine) pool.push(weatherLine)

      const message = pool[Math.floor(Math.random() * pool.length)]!
      return { message, friendshipGain: 20 }
    }

    // người bạn tâm giaoNPC使用người bạn tâm giao专属对话
    if (state.zhiji && npcDef.zhijiDialogues?.length) {
      const raw = npcDef.zhijiDialogues[Math.floor(Math.random() * npcDef.zhijiDialogues.length)]!
      const message = replaceDialoguePlaceholders(raw)
      return { message, friendshipGain: 20 }
    }

    // 约会中NPC使用约会对话
    if (state.dating && npcDef.datingDialogues && npcDef.datingDialogues.length > 0) {
      const raw = npcDef.datingDialogues[Math.floor(Math.random() * npcDef.datingDialogues.length)]!
      const message = replaceDialoguePlaceholders(raw)
      return { message, friendshipGain: 20 }
    }

    const level = getFriendshipLevel(npcId)
    const dialogues = npcDef.dialogues[level]
    const raw = dialogues[Math.floor(Math.random() * dialogues.length)]!
    const message = replaceDialoguePlaceholders(raw)

    return { message, friendshipGain: 20 }
  }

  /** 送礼给NPC (每天1次, 每周2次) */
  const giveGift = (
    npcId: string,
    itemId: string,
    giftBonusMultiplier: number = 1,
    quality: Quality = 'normal'
  ): { gain: number; reaction: string } | null => {
    const state = getNpcState(npcId)
    if (!state) return null
    if (state.giftedToday) return null
    if (state.giftsThisWeek >= 2) return null

    const inventoryStore = useInventoryStore()
    if (!inventoryStore.removeItem(itemId, 1, quality)) return null

    state.giftedToday = true
    state.giftsThisWeek++
    const npcDef = getNpcById(npcId)
    if (!npcDef) return null

    let gain: number
    let reaction: string

    if (npcDef.lovedItems.includes(itemId)) {
      gain = 80
      reaction = 'Thích lắm'
    } else if (npcDef.likedItems.includes(itemId)) {
      gain = 45
      reaction = 'Không tệ'
    } else if (npcDef.hatedItems.includes(itemId)) {
      gain = -40
      reaction = 'ghét'
    } else {
      gain = 20
      reaction = 'trung bình'
    }

    // 品质加成
    const qualityMultiplier: Record<Quality, number> = { normal: 1.0, fine: 1.25, excellent: 1.5, supreme: 2.0 }
    // 生日加成 (4倍)
    const birthdayMultiplier = isBirthday(npcId) ? 4 : 1

    gain = Math.floor(gain * qualityMultiplier[quality] * birthdayMultiplier * giftBonusMultiplier)
    state.friendship = Math.max(0, state.friendship + gain)

    return { gain, reaction }
  }

  /** 赠帕开启约会 (需2000ấn tượng tốt/8trái tim) */
  const startDating = (npcId: string): { success: boolean; message: string } => {
    const state = getNpcState(npcId)
    if (!state) return { success: false, message: 'NPCKhông tồn tại.' }

    const npcDef = getNpcById(npcId)
    if (!npcDef?.marriageable) return { success: false, message: 'Không thể hẹn hò với người này.' }

    const playerStore = usePlayerStore()
    if (npcDef.gender === playerStore.gender) {
      return { success: false, message: 'Bạn chỉ có thể đưa khăn tay cho người khác giới.' }
    }

    if (state.dating) return { success: false, message: 'Bạn đã hẹn hò rồi.' }
    if (state.married) return { success: false, message: 'Bạn đã kết hôn rồi.' }
    if (npcStates.value.some(s => s.married)) return { success: false, message: 'Bạn đã kết hôn rồi.' }
    if (state.friendship < 2000) return { success: false, message: 'Không đủ sự thuận lợi (yêu cầu8trái tim/2000).' }

    const inventoryStore = useInventoryStore()
    if (!inventoryStore.removeItem('silk_ribbon')) {
      return { success: false, message: 'Cần một chiếc khăn lụa.' }
    }

    state.dating = true
    state.friendship += 160
    return { success: true, message: `${npcDef.name}Đỏ mặt ngượng ngùng, tôi cầm lấy chiếc khăn tay lụa của bạn.……Các bạn bắt đầu hẹn hò!` }
  }

  /** 求婚 (需2500ấn tượng tốt/10trái tim) */
  const propose = (npcId: string): { success: boolean; message: string } => {
    const state = getNpcState(npcId)
    if (!state) return { success: false, message: 'NPCKhông tồn tại.' }

    const npcDef = getNpcById(npcId)
    if (!npcDef?.marriageable) return { success: false, message: 'Người đàn ông này không thể cầu hôn.' }

    // 只允许异性求婚
    const playerStore = usePlayerStore()
    if (npcDef.gender === playerStore.gender) {
      return { success: false, message: 'Bạn chỉ có thể cầu hôn người khác giới.' }
    }

    // 检查是否已Cóvợ/chồng
    const alreadyMarried = npcStates.value.some(s => s.married)
    if (alreadyMarried) return { success: false, message: 'Bạn đã kết hôn rồi.' }

    // 检查是否正在筹备婚礼
    if (weddingCountdown.value > 0) return { success: false, message: 'Đám cưới đang được chuẩn bị.' }

    // 需要先约会
    if (!state.dating) return { success: false, message: 'Bạn cần đưa khăn tay để hẹn hò trước.' }

    if (state.friendship < 2500) return { success: false, message: 'Không đủ sự thuận lợi (yêu cầu10trái tim/2500).' }

    const inventoryStore = useInventoryStore()
    if (!inventoryStore.removeItem('jade_ring')) {
      return { success: false, message: 'Cần một chiếc nhẫn ngọc lục bảo.' }
    }

    // 设置婚礼倒计时而非立即结婚
    weddingCountdown.value = 3
    weddingNpcId.value = npcId
    state.friendship += 400
    return { success: true, message: `${npcDef.name}Anh rơi nước mắt nhận chiếc nhẫn ngọc lục bảo của em……Lễ cưới sẽ diễn ra vào lúc3Nữ hoàng giữ nó!` }
  }

  /** 获取已婚vợ/chồng状态 */
  const getSpouse = (): NpcState | null => {
    return npcStates.value.find(s => s.married) ?? null
  }

  /** 获取người bạn tâm giao状态 */
  const getZhiji = (): NpcState | null => {
    return npcStates.value.find(s => s.zhiji) ?? null
  }

  /** 赠玉结为người bạn tâm giao (需同性+2000ấn tượng tốt) */
  const becomeZhiji = (npcId: string): { success: boolean; message: string } => {
    const state = getNpcState(npcId)
    if (!state) return { success: false, message: 'NPCKhông tồn tại.' }

    const npcDef = getNpcById(npcId)
    if (!npcDef?.marriageable) return { success: false, message: 'Không có cách nào để trở thành bạn thân với người này.' }

    const playerStore = usePlayerStore()
    if (npcDef.gender !== playerStore.gender) {
      return { success: false, message: 'Bạn chỉ có thể làm bạn với những người cùng giới tính.' }
    }

    if (state.zhiji) return { success: false, message: 'Bạn đã là bạn thân rồi.' }
    if (state.dating || state.married) return { success: false, message: 'Không thể trở thành bạn thân với người yêu hoặc bạn đời.' }
    if (npcStates.value.some(s => s.zhiji)) return { success: false, message: 'Bạn đã có một người bạn tâm giao rồi.' }
    if (state.friendship < 2000) return { success: false, message: 'Không đủ sự thuận lợi (yêu cầu8trái tim/2000).' }

    const inventoryStore = useInventoryStore()
    if (!inventoryStore.removeItem('zhiji_jade')) {
      return { success: false, message: 'Tôi cần một mặt dây chuyền ngọc bích cho một người bạn thân.' }
    }

    state.zhiji = true
    state.friendship += 160
    const label = playerStore.gender === 'male' ? 'Lan Yên tâm sự' : 'người bạn tâm giao'
    return { success: true, message: `${npcDef.name}Anh long trọng nhận mặt dây chuyền ngọc……bạn đã kết hôn${label}!` }
  }

  /** 断绝người bạn tâm giao之缘 */
  const dissolveZhiji = (): { success: boolean; message: string } => {
    const zhijiState = getZhiji()
    if (!zhijiState) return { success: false, message: 'Bạn vẫn chưa có người bạn tâm giao.' }

    const playerStore = usePlayerStore()
    if (!playerStore.spendMoney(10000)) {
      return { success: false, message: 'Không đủ tiền (cần10000chữ).' }
    }

    const npcDef = getNpcById(zhijiState.npcId)
    zhijiState.zhiji = false
    zhijiState.friendship = 1000
    daysZhiji.value = 0

    return { success: true, message: `bạn và${npcDef?.name ?? 'người bạn tâm giao'}Mối ràng buộc của người bạn tâm tình đã bị cắt đứt.` }
  }

  /** 每日婚礼倒计时更新 */
  const dailyWeddingUpdate = (): { weddingToday: boolean; npcId: string | null } => {
    if (weddingCountdown.value <= 0 || !weddingNpcId.value) {
      return { weddingToday: false, npcId: null }
    }
    weddingCountdown.value--
    if (weddingCountdown.value <= 0) {
      const npcId = weddingNpcId.value
      const state = getNpcState(npcId)
      if (state) {
        state.married = true
        state.dating = false
        state.friendship = Math.max(state.friendship, 3500)
      }
      weddingNpcId.value = null
      return { weddingToday: true, npcId }
    }
    return { weddingToday: false, npcId: null }
  }

  /** 取消婚礼 */
  const cancelWedding = () => {
    weddingCountdown.value = 0
    weddingNpcId.value = null
  }

  /** 离婚 */
  const divorce = (): { success: boolean; message: string } => {
    const spouse = getSpouse()
    if (!spouse) return { success: false, message: 'Bạn vẫn chưa kết hôn.' }

    const playerStore = usePlayerStore()
    if (!playerStore.spendMoney(30000)) {
      return { success: false, message: 'Không đủ tiền (cần30000chữ).' }
    }

    const npcDef = getNpcById(spouse.npcId)
    spouse.married = false
    spouse.dating = false
    spouse.friendship = 1000
    pregnancy.value = null
    childProposalPending.value = false
    daysMarried.value = 0
    cancelWedding()

    return { success: true, message: `bạn và${npcDef?.name ?? 'vợ/chồng'}cuộc hôn nhân của anh đã kết thúc.` }
  }

  /** 放生子女 */
  const releaseChild = (childId: number): { success: boolean; message: string } => {
    const child = children.value.find(c => c.id === childId)
    if (!child) return { success: false, message: 'Đứa trẻ không thể được tìm thấy.' }

    const playerStore = usePlayerStore()
    if (!playerStore.spendMoney(10000)) {
      return { success: false, message: 'Không đủ tiền (cần10000chữ).' }
    }

    const name = child.name
    children.value = children.value.filter(c => c.id !== childId)
    return { success: true, message: `${name}Anh được gửi đến sống với một người họ hàng xa.` }
  }

  // ============================================================
  // 孕期养成系统
  // ============================================================

  const PREGNANCY_STAGE_CONFIG: Record<PregnancyStage, { days: number; label: string }> = {
    early: { days: 5, label: 'Giai đoạn đầu' },
    mid: { days: 5, label: 'trung hạn' },
    late: { days: 5, label: 'giai đoạn sau' },
    ready: { days: 3, label: 'Thời gian chờ đợi' }
  }

  const STAGE_ORDER: PregnancyStage[] = ['early', 'mid', 'late', 'ready']

  const MEDICAL_PLANS = {
    normal: { cost: 1000, successRate: 0.8, label: 'Giao hàng thông thường' },
    advanced: { cost: 5000, successRate: 0.95, label: 'Hộ sinh nâng cao' },
    luxury: { cost: 15000, successRate: 1.0, label: 'giao hàng sang trọng' }
  } as const

  /** 检查vợ/chồng是否应提议要孩子(每日调用） */
  const checkChildProposal = (): boolean => {
    const spouse = getSpouse()
    if (!spouse) return false
    if (children.value.length >= 2) return false
    if (pregnancy.value !== null) return false
    if (childProposalPending.value) return false
    if (daysMarried.value < 7) return false
    if (spouse.friendship < 3000) return false
    // 拒绝冷却：7天基础 + 每次拒绝额外7天
    if (childProposalDeclinedCount.value > 0) {
      const cooldownDays = 7 + childProposalDeclinedCount.value * 7
      if (daysSinceProposalDecline.value < cooldownDays) return false
    }
    return Math.random() < 0.05
  }

  /** 触发提议(设置等待标记） */
  const triggerChildProposal = () => {
    childProposalPending.value = true
  }

  /** 玩家回应提议 */
  const respondToChildProposal = (response: ProposalResponse): { message: string; friendshipChange: number } => {
    childProposalPending.value = false
    const spouse = getSpouse()

    switch (response) {
      case 'accept':
        pregnancy.value = {
          stage: 'early',
          daysInStage: 0,
          stageDays: PREGNANCY_STAGE_CONFIG.early.days,
          careScore: 50,
          caredToday: false,
          giftedForPregnancy: false,
          companionToday: false,
          medicalPlan: null
        }
        if (spouse) spouse.friendship += 100
        childProposalDeclinedCount.value = 0
        daysSinceProposalDecline.value = 0
        return { message: 'Bạn đã quyết định chào đón một thành viên mới trong gia đình.', friendshipChange: 100 }

      case 'decline':
        if (spouse) spouse.friendship = Math.max(0, spouse.friendship - 50)
        childProposalDeclinedCount.value++
        daysSinceProposalDecline.value = 0
        return { message: 'Bạn đã từ chối một cách lịch sự.', friendshipChange: -50 }

      case 'wait':
        daysSinceProposalDecline.value = 0
        childProposalDeclinedCount.value++ // Cũng tính thời gian hồi chiêu
        return { message: 'Bạn nói chờ xem.', friendshipChange: 0 }
    }
  }

  /** 孕期照料操作 */
  const performPregnancyCare = (
    action: 'gift' | 'companion' | 'supplement' | 'rest'
  ): { success: boolean; message: string; careGain: number } => {
    if (!pregnancy.value) return { success: false, message: 'Không mong có con.', careGain: 0 }

    let careGain = 0
    let message = ''

    switch (action) {
      case 'gift': {
        if (pregnancy.value.giftedForPregnancy) {
          return { success: false, message: 'Hôm nay tôi đã tặng quà.', careGain: 0 }
        }
        pregnancy.value.giftedForPregnancy = true
        careGain = pregnancy.value.stage === 'early' ? 5 : 3
        message = 'Bạn đã tặng một món quà chu đáo.'
        break
      }
      case 'companion': {
        if (pregnancy.value.companionToday) {
          return { success: false, message: 'Tôi đã ở bên bạn ngày hôm nay.', careGain: 0 }
        }
        pregnancy.value.companionToday = true
        careGain = pregnancy.value.stage === 'mid' ? 5 : 3
        message = 'Bạn đã ở bên tôi một thời gian và nói rất nhiều.'
        break
      }
      case 'supplement': {
        const inventoryStore = useInventoryStore()
        const supplementItems: { id: string; gain: number }[] = [
          { id: 'ginseng', gain: 6 },
          { id: 'ginseng_tea', gain: 5 },
          { id: 'herb', gain: 3 },
          { id: 'green_tea_drink', gain: 3 },
          { id: 'chrysanthemum_tea', gain: 3 },
          { id: 'osmanthus_tea', gain: 3 }
        ]
        let found = false
        for (const si of supplementItems) {
          if (inventoryStore.removeItem(si.id, 1)) {
            found = true
            careGain = si.gain
            const itemDef = getItemById(si.id)
            message = `Đã chụp${itemDef?.name ?? 'chất bổ sung'}.`
            break
          }
        }
        if (!found) {
          return { success: false, message: 'Không có chất bổ sung phù hợp (nhân sâm/thuốc thảo dược/trà).', careGain: 0 }
        }
        break
      }
      case 'rest': {
        if (pregnancy.value.caredToday) {
          return { success: false, message: 'Hôm nay tôi đã sắp xếp nghỉ ngơi rồi.', careGain: 0 }
        }
        careGain = pregnancy.value.stage === 'late' ? 5 : 2
        message = 'Bạn đã cho vợ/chồng mình một ngày nghỉ ngơi vui vẻ.'
        break
      }
    }

    pregnancy.value.careScore = Math.min(100, pregnancy.value.careScore + careGain)
    pregnancy.value.caredToday = true
    return { success: true, message, careGain }
  }

  /** 选择接生方式(仅Thời gian chờ đợi） */
  const chooseMedicalPlan = (plan: 'normal' | 'advanced' | 'luxury'): { success: boolean; message: string } => {
    if (!pregnancy.value) return { success: false, message: 'Không mong có con.' }
    if (pregnancy.value.stage !== 'ready') return { success: false, message: 'Vẫn chưa đến ngày đáo hạn.' }

    const planInfo = MEDICAL_PLANS[plan]
    const playerStore = usePlayerStore()
    if (!playerStore.spendMoney(planInfo.cost)) {
      return { success: false, message: `Không đủ tiền (cần${planInfo.cost}chữ).` }
    }

    pregnancy.value.medicalPlan = plan
    return { success: true, message: `đã chọn${planInfo.label}(${planInfo.cost}chữ).` }
  }

  /** 分娩处理(内部方法） */
  const handleDelivery = (): {
    born?: { name: string; quality: 'normal' | 'premature' | 'healthy' }
    miscarriage?: boolean
  } => {
    if (!pregnancy.value) return {}

    const plan = pregnancy.value.medicalPlan ?? 'normal'
    const planInfo = MEDICAL_PLANS[plan]

    // 成功率 = 医疗方案基础率 + 安产分加成(最高+15%）
    const careBonus = (pregnancy.value.careScore / 100) * 0.15
    const totalSuccessRate = Math.min(1.0, planInfo.successRate + careBonus)

    const success = Math.random() < totalSuccessRate

    if (!success) {
      pregnancy.value = null
      const spouse = getSpouse()
      if (spouse) {
        spouse.friendship = Math.max(0, spouse.friendship - 200)
      }
      return { miscarriage: true }
    }

    // 根据安产分决定出生品质
    const birthQuality: 'normal' | 'premature' | 'healthy' =
      pregnancy.value.careScore >= 80 ? 'healthy' : pregnancy.value.careScore < 40 ? 'premature' : 'normal'

    const isBoy = Math.random() < 0.5
    const namePool = isBoy ? CHILD_NAMES_MALE : CHILD_NAMES_FEMALE
    const usedNames = children.value.map(c => c.name)
    const availableNames = namePool.filter(n => !usedNames.includes(n))
    const name = availableNames[Math.floor(Math.random() * availableNames.length)] ?? 'Tiểu Bảo'

    children.value.push({
      id: nextChildId.value++,
      name,
      daysOld: 0,
      stage: 'baby',
      friendship: birthQuality === 'healthy' ? 30 : 0,
      interactedToday: false,
      birthQuality
    })

    pregnancy.value = null
    return { born: { name, quality: birthQuality } }
  }

  /** 每日孕期更新 */
  const dailyPregnancyUpdate = (): {
    stageChanged?: { from: PregnancyStage; to: PregnancyStage }
    born?: { name: string; quality: 'normal' | 'premature' | 'healthy' }
    miscarriage?: boolean
  } => {
    // 结婚天数递增
    if (getSpouse()) daysMarried.value++

    // 拒绝冷却计时递增
    if (childProposalDeclinedCount.value > 0) {
      daysSinceProposalDecline.value++
    }

    if (!pregnancy.value) return {}

    // 重置每日照料标记
    pregnancy.value.caredToday = false
    pregnancy.value.giftedForPregnancy = false
    pregnancy.value.companionToday = false

    pregnancy.value.daysInStage++

    // 检查阶段完成
    if (pregnancy.value.daysInStage >= pregnancy.value.stageDays) {
      const currentStageIndex = STAGE_ORDER.indexOf(pregnancy.value.stage)

      if (pregnancy.value.stage === 'ready') {
        // 分娩
        return handleDelivery()
      }

      // 进入下一阶段
      const from = pregnancy.value.stage
      const nextStage = STAGE_ORDER[currentStageIndex + 1]!
      pregnancy.value.stage = nextStage
      pregnancy.value.daysInStage = 0
      pregnancy.value.stageDays = PREGNANCY_STAGE_CONFIG[nextStage].days

      return { stageChanged: { from, to: nextStage } }
    }

    return {}
  }

  /** 每日子女成长更新(仅已出生子女） */
  const dailyChildUpdate = () => {
    for (const child of children.value) {
      child.daysOld++
      child.interactedToday = false
      if (child.stage === 'baby' && child.daysOld >= 14) {
        child.stage = 'toddler'
      } else if (child.stage === 'toddler' && child.daysOld >= 28) {
        child.stage = 'child'
      } else if (child.stage === 'child' && child.daysOld >= 56) {
        child.stage = 'teen'
      }
    }
  }

  /** 与子女互动 */
  const interactWithChild = (childId: number): { message: string; item?: string } | null => {
    const child = children.value.find(c => c.id === childId)
    if (!child) return null
    if (child.interactedToday) return null
    if (child.stage === 'baby') return null

    child.interactedToday = true
    child.friendship = Math.min(300, child.friendship + 2)

    if (child.stage === 'child' && Math.random() < 0.1) {
      const finds = ['wood', 'herb', 'pine_cone', 'wild_berry']
      const item = finds[Math.floor(Math.random() * finds.length)]!
      return { message: `${child.name}Đưa cho bạn một cái gì đó.`, item }
    }

    return { message: `bạn và${child.name}Chơi được một lúc.(+2ấn tượng tốt)` }
  }

  /** 检查NPC是否Có每日提示功能 */
  const hasDailyTip = (npcId: string): boolean => {
    return (TIP_NPC_IDS as readonly string[]).includes(npcId)
  }

  /** 检查NPC今天是否已给过提示 */
  const isTipGivenToday = (npcId: string): boolean => {
    return tipGivenToday.value[npcId] ?? false
  }

  /** 获取NPC的每日提示 */
  const getDailyTip = (npcId: string): string | null => {
    if (!hasDailyTip(npcId)) return null
    if (tipGivenToday.value[npcId]) return null

    tipGivenToday.value[npcId] = true
    const gameStore = useGameStore()

    switch (npcId) {
      case 'li_yu':
        return WEATHER_TIPS[gameStore.tomorrowWeather]
      case 'zhou_xiucai':
        return getFortuneTip(gameStore.dailyLuck)
      case 'wang_dashen': {
        const cookingStore = useCookingStore()
        const unlockedRecipes = RECIPES.filter(r => cookingStore.unlockedRecipes.includes(r.id))
        if (unlockedRecipes.length === 0) return NO_RECIPE_TIP
        // 每周推荐一个固定食谱(基于年+周数的种子）
        const weekIndex = Math.floor((gameStore.day - 1) / 7)
        const seed = (gameStore.year - 1) * 16 + ['spring', 'summer', 'autumn', 'winter'].indexOf(gameStore.season) * 4 + weekIndex
        const recipe = unlockedRecipes[seed % unlockedRecipes.length]!
        const ingredientNames = recipe.ingredients.map(ing => {
          const item = getItemById(ing.itemId)
          return item ? `${item.name}×${ing.quantity}` : ing.itemId
        })
        return getRecipeTipMessage(recipe.name, ingredientNames)
      }
      case 'liu_cunzhang':
        return getLivingTip(gameStore.day, gameStore.year)
      default:
        return null
    }
  }

  /** 每日重置对话và送礼状态 + bạn đồng hànhấn tượng tốt衰减 */
  const dailyReset = () => {
    const gameStore = useGameStore()

    // 重置每日提示
    tipGivenToday.value = {}

    for (const state of npcStates.value) {
      // 只Có已婚bạn đồng hành不聊天才会掉ấn tượng tốt，普通NPC不衰减
      if (!state.talkedToday && state.married) {
        state.friendship = Math.max(0, state.friendship - 10)
      }
      // người bạn tâm giao不聊天也会掉ấn tượng tốt(衰减较少）
      if (!state.talkedToday && state.zhiji) {
        state.friendship = Math.max(0, state.friendship - 5)
      }
      state.talkedToday = false
      state.giftedToday = false
      // 每周日重置周送礼计数 (day 7,14,21,28)
      if (gameStore.day % 7 === 0) {
        state.giftsThisWeek = 0
      }
    }

    // người bạn tâm giao天数递增
    if (getZhiji()) daysZhiji.value++
  }

  const serialize = () => {
    return {
      npcStates: npcStates.value,
      children: children.value,
      nextChildId: nextChildId.value,
      daysMarried: daysMarried.value,
      daysZhiji: daysZhiji.value,
      pregnancy: pregnancy.value,
      childProposalPending: childProposalPending.value,
      childProposalDeclinedCount: childProposalDeclinedCount.value,
      daysSinceProposalDecline: daysSinceProposalDecline.value,
      // 旧字段保留以兼容
      pendingChild: false,
      childCountdown: 0,
      weddingCountdown: weddingCountdown.value,
      weddingNpcId: weddingNpcId.value,
      hiredHelpers: hiredHelpers.value,
      friendshipVersion: 2
    }
  }

  const deserialize = (data: ReturnType<typeof serialize>) => {
    const isOldScale = !(data as any).friendshipVersion || (data as any).friendshipVersion < 2
    const savedStates = data.npcStates.map(s => ({
      ...s,
      // 旧存档ấn tượng tốt度迁移: ×8 (300制→2500制)
      friendship: isOldScale ? Math.round(s.friendship * 8) : s.friendship,
      married: s.married ?? false,
      dating: s.dating ?? false,
      zhiji: (s as any).zhiji ?? false,
      giftsThisWeek: (s as any).giftsThisWeek ?? 0,
      triggeredHeartEvents: s.triggeredHeartEvents ?? []
    }))
    // 合并：保留已保存的状态，为新增NPC补充默认状态
    const savedIds = new Set(savedStates.map(s => s.npcId))
    const newNpcStates: NpcState[] = NPCS.filter(npc => !savedIds.has(npc.id)).map(npc => ({
      npcId: npc.id,
      friendship: 0,
      talkedToday: false,
      giftedToday: false,
      giftsThisWeek: 0,
      dating: false,
      married: false,
      zhiji: false,
      triggeredHeartEvents: []
    }))
    npcStates.value = [...savedStates, ...newNpcStates]
    children.value = ((data as any).children ?? []).map((c: any) => ({
      ...c,
      birthQuality: c.birthQuality ?? 'normal'
    }))
    // 旧存档无 nextChildId → 从已Có子女推算
    nextChildId.value =
      (data as any).nextChildId ?? (children.value.length > 0 ? Math.max(...children.value.map((c: ChildState) => c.id)) + 1 : 0)
    daysMarried.value = (data as any).daysMarried ?? 0
    daysZhiji.value = (data as any).daysZhiji ?? 0

    // 新孕期系统
    pregnancy.value = (data as any).pregnancy ?? null
    childProposalPending.value = (data as any).childProposalPending ?? false
    childProposalDeclinedCount.value = (data as any).childProposalDeclinedCount ?? 0
    daysSinceProposalDecline.value = (data as any).daysSinceProposalDecline ?? 0

    // 旧存档迁移：pendingChild → pregnancy
    if ((data as any).pendingChild && !pregnancy.value) {
      const oldCountdown: number = (data as any).childCountdown ?? 0
      let stage: PregnancyStage = 'early'
      if (oldCountdown <= 3) stage = 'ready'
      else if (oldCountdown <= 8) stage = 'late'
      else if (oldCountdown <= 13) stage = 'mid'
      pregnancy.value = {
        stage,
        daysInStage: 0,
        stageDays: PREGNANCY_STAGE_CONFIG[stage].days,
        careScore: 50,
        caredToday: false,
        giftedForPregnancy: false,
        companionToday: false,
        medicalPlan: null
      }
    }

    weddingCountdown.value = (data as any).weddingCountdown ?? 0
    weddingNpcId.value = (data as any).weddingNpcId ?? null
    hiredHelpers.value = (data as any).hiredHelpers ?? []
  }

  return {
    npcStates,
    children,
    nextChildId,
    daysMarried,
    daysZhiji,
    pregnancy,
    childProposalPending,
    childProposalDeclinedCount,
    daysSinceProposalDecline,
    weddingCountdown,
    weddingNpcId,
    hiredHelpers,
    HELPER_WAGES,
    HELPER_TASK_NAMES,
    getNpcState,
    getFriendshipLevel,
    isBirthday,
    getTodayBirthdayNpc,
    checkHeartEvent,
    markHeartEventTriggered,
    adjustFriendship,
    talkTo,
    giveGift,
    startDating,
    propose,
    getSpouse,
    getZhiji,
    becomeZhiji,
    dissolveZhiji,
    dailyWeddingUpdate,
    cancelWedding,
    divorce,
    releaseChild,
    getHireableNpcs,
    hireHelper,
    dismissHelper,
    processDailyHelpers,
    checkChildProposal,
    triggerChildProposal,
    respondToChildProposal,
    performPregnancyCare,
    chooseMedicalPlan,
    dailyPregnancyUpdate,
    interactWithChild,
    dailyChildUpdate,
    dailyReset,
    hasDailyTip,
    isTipGivenToday,
    getDailyTip,
    tipGivenToday,
    PREGNANCY_STAGE_CONFIG,
    MEDICAL_PLANS,
    serialize,
    deserialize
  }
})
