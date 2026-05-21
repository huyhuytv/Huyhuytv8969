import type { Component } from 'vue'
import router from '@/router'
import { useGameStore } from '@/stores/useGameStore'
import { isShopOpen, TAB_TO_LOCATION_GROUP } from '@/data/timeConstants'
import { addLog, showFloat } from './useGameLog'
import { handleEndDay } from './useEndDay'
import { sfxClick, useAudio } from './useAudio'
import { useGameClock } from './useGameClock'
import { useTutorialStore } from '@/stores/useTutorialStore'
import {
  Wheat,
  Egg,
  Home,
  Heart,
  Building,
  Users,
  Store,
  TreePine,
  Fish,
  Pickaxe,
  Flame,
  Cog,
  Wrench,
  Package,
  Star,
  BookOpen,
  Wallet,
  ScrollText,
  User,
  FlaskConical,
  Landmark,
  Swords,
  Tent,
  Waves
} from 'lucide-vue-next'
import { useNpcStore } from '@/stores/useNpcStore'

export type PanelKey =
  | 'farm'
  | 'shop'
  | 'inventory'
  | 'fishing'
  | 'mining'
  | 'village'
  | 'cooking'
  | 'forage'
  | 'upgrade'
  | 'skills'
  | 'workshop'
  | 'achievement'
  | 'animal'
  | 'home'
  | 'wallet'
  | 'quest'
  | 'charinfo'
  | 'breeding'
  | 'museum'
  | 'guild'
  | 'hanhai'
  | 'fishpond'
  | 'cottage'

import i18n from '@/locales'

export const TABS: { key: PanelKey; label: string; icon: Component; getIcon?: () => Component }[] = [
  { key: 'farm', get label() { return i18n.global.t('nav.farm') }, icon: Wheat },
  { key: 'animal', get label() { return i18n.global.t('nav.animal') }, icon: Egg },
  { key: 'cottage', get label() { return i18n.global.t('nav.cottage') }, icon: Home, getIcon: () => (useNpcStore().getSpouse() ? Heart : Home) },
  { key: 'home', get label() { return i18n.global.t('nav.home') }, icon: Building },
  { key: 'breeding', get label() { return i18n.global.t('nav.breeding') }, icon: FlaskConical },
  { key: 'fishpond', get label() { return i18n.global.t('nav.fishpond') }, icon: Waves },
  { key: 'village', get label() { return i18n.global.t('nav.village') }, icon: Users },
  { key: 'shop', get label() { return i18n.global.t('nav.shop') }, icon: Store },
  { key: 'forage', get label() { return i18n.global.t('nav.forage') }, icon: TreePine },
  { key: 'fishing', get label() { return i18n.global.t('nav.fishing') }, icon: Fish },
  { key: 'mining', get label() { return i18n.global.t('nav.mining') }, icon: Pickaxe },
  { key: 'cooking', get label() { return i18n.global.t('nav.cooking') }, icon: Flame },
  { key: 'workshop', get label() { return i18n.global.t('nav.workshop') }, icon: Cog },
  { key: 'upgrade', get label() { return i18n.global.t('nav.upgrade') }, icon: Wrench },
  { key: 'charinfo', get label() { return i18n.global.t('nav.charinfo') }, icon: User },
  { key: 'inventory', get label() { return i18n.global.t('nav.inventory') }, icon: Package },
  { key: 'skills', get label() { return i18n.global.t('nav.skills') }, icon: Star },
  { key: 'achievement', get label() { return i18n.global.t('nav.achievement') }, icon: BookOpen },
  { key: 'wallet', get label() { return i18n.global.t('nav.wallet') }, icon: Wallet },
  { key: 'quest', get label() { return i18n.global.t('nav.quest') }, icon: ScrollText },
  { key: 'museum', get label() { return i18n.global.t('nav.museum') }, icon: Landmark },
  { key: 'guild', get label() { return i18n.global.t('nav.guild') }, icon: Swords },
  { key: 'hanhai', get label() { return i18n.global.t('nav.hanhai') }, icon: Tent }
]

/** 导航到游戏面板，检查旅行时间、就寝时间和商店营业时间 */
export const navigateToPanel = (panelKey: PanelKey) => {
  const gameStore = useGameStore()
  const { startBgm } = useAudio()

  if (gameStore.isPastBedtime) {
    addLog(i18n.global.t('app.sleep_passout_desc'))
    handleEndDay()
    // 确保新一天时钟恢复运转
    const { resumeClock: resumeAfterEnd } = useGameClock()
    resumeAfterEnd()
    return
  }

  // 商店营业检查
  const shopCheck = isShopOpen(panelKey, gameStore.day, gameStore.hour)
  if (!shopCheck.open) {
    showFloat(shopCheck.reason!, 'danger')
    return
  }

  // 旅行时间
  const travelResult = gameStore.travelTo(panelKey)
  if (travelResult.timeCost > 0) {
    addLog(travelResult.message)
  }
  if (travelResult.passedOut) {
    handleEndDay()
    return
  }

  sfxClick()
  startBgm()
  void router.push({ name: panelKey })
  useTutorialStore().markPanelVisited(panelKey)

  // UI 面板（无地点）暂停时钟，游戏面板恢复
  const { pauseClock, resumeClock } = useGameClock()
  const targetGroup = TAB_TO_LOCATION_GROUP[panelKey]
  if (targetGroup === null || targetGroup === undefined) {
    pauseClock()
  } else {
    resumeClock()
  }
}

export const useNavigation = () => {
  return {
    TABS,
    navigateToPanel
  }
}
