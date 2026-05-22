<template>
  <div>
    <!-- 标题 -->
    <div class="flex items-center justify-between mb-1">
      <div class="flex items-center space-x-1.5 text-sm text-accent">
        <Wrench :size="14" />
        <span>{{ $t('tool_upgrade.title') }}</span>
      </div>
      <span class="text-xs text-muted">{{ $t('tool_upgrade.blacksmith') }}</span>
    </div>
    <p class="text-xs text-muted mb-3">{{ $t('tool_upgrade.desc') }}</p>

    <!-- 正在升级提示 -->
    <div v-if="inventoryStore.pendingUpgrade" class="border border-accent/30 rounded-xs px-3 py-2 mb-3 flex items-center justify-between">
      <div class="flex items-center space-x-1.5">
        <Clock :size="12" class="text-accent shrink-0" />
        <span class="text-xs text-accent">
          {{ $t('tool_upgrade.is_upgrading', { tool: $t('tool.' + inventoryStore.pendingUpgrade.toolType), tier: $t('tier.' + inventoryStore.pendingUpgrade.targetTier) }) }}
        </span>
      </div>
      <span class="text-xs text-muted whitespace-nowrap ml-2">{{ $t('tool_upgrade.days_remaining', { days: inventoryStore.pendingUpgrade.daysRemaining }) }}</span>
    </div>

    <div class="flex flex-col space-y-1.5" role="list">
      <div
        v-for="tool in inventoryStore.tools"
        :key="tool.type"
        class="flex items-center justify-between border rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5 focus:outline-none focus:ring-2 focus:ring-accent/40"
        :class="isUpgrading(tool.type) ? 'border-accent/30' : 'border-accent/20'"
        role="button"
        tabindex="0"
        :aria-label="`${$t('tool.' + tool.type)} ${$t('tier.' + tool.tier)}. ${isUpgrading(tool.type) ? $t('tool_upgrade.upgrading') : (getUpgradeCost(tool.type, tool.tier) ? '→ ' + $t('tier.' + getUpgradeCost(tool.type, tool.tier)!.toTier) : '')}`"
        @click="selectedTool = tool.type"
        @keydown.enter.prevent="selectedTool = tool.type"
        @keydown.space.prevent="selectedTool = tool.type"
      >
        <div class="min-w-0" aria-hidden="true">
          <span class="text-sm" :class="isUpgrading(tool.type) ? 'text-accent' : ''">{{ $t('tool.' + tool.type) }}</span>
          <p class="text-xs text-muted">{{ $t('tier.' + tool.tier) }}</p>
        </div>
        <span v-if="isUpgrading(tool.type)" class="text-xs text-accent whitespace-nowrap ml-2" aria-hidden="true">{{ $t('tool_upgrade.upgrading') }}</span>
        <span v-else-if="getUpgradeCost(tool.type, tool.tier)" class="text-xs text-muted whitespace-nowrap ml-2" aria-hidden="true">
          → {{ $t('tier.' + getUpgradeCost(tool.type, tool.tier)!.toTier) }}
        </span>
        <CircleCheck v-else :size="14" class="text-success shrink-0 ml-2" aria-hidden="true" />
      </div>
    </div>

    <!-- 工具详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="selectedTool"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="selectedTool = null"
      >
        <div ref="modalRef_s2m9c" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="selectedTool = null">
            <X :size="14" />
          </button>

          <p class="text-sm mb-2" :class="isUpgrading(selectedTool) ? 'text-accent' : 'text-text'">
            {{ $t('tool.' + selectedTool) }}
          </p>

          <!-- 当前状态 -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ $t('tool_upgrade.current_tier') }}</span>
              <span class="text-xs">{{ $t('tier.' + selectedToolObj!.tier) }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('tool_upgrade.stamina_discount') }}</span>
              <span class="text-xs">{{ staminaText(selectedToolObj!.tier) }}</span>
            </div>
            <template v-if="selectedTool === 'fishingRod'">
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-xs text-muted">{{ $t('tool_upgrade.hook_range') }}</span>
                <span class="text-xs">{{ ROD_HOOK[selectedToolObj!.tier] }}</span>
              </div>
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-xs text-muted">{{ $t('tool_upgrade.fishing_limit') }}</span>
                <span class="text-xs">{{ ROD_TIME[selectedToolObj!.tier] }}{{ $i18n.locale === 'vi' ? ' giây' : 'giây' }}</span>
              </div>
            </template>
            <div v-if="isUpgrading(selectedTool)" class="flex items-center justify-between mt-1">
              <span class="text-xs text-muted">{{ $t('tool_upgrade.forge_target') }}</span>
              <span class="text-xs text-accent">{{ $t('tier.' + inventoryStore.pendingUpgrade!.targetTier) }}</span>
            </div>
            <div v-if="isUpgrading(selectedTool)" class="flex items-center space-x-2 mt-1.5">
              <span class="text-xs text-muted shrink-0">{{ $t('tool_upgrade.progress') }}</span>
              <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
                <div
                  class="h-full rounded-xs bg-accent transition-all"
                  :style="{ width: ((2 - inventoryStore.pendingUpgrade!.daysRemaining) / 2) * 100 + '%' }"
                />
              </div>
              <span class="text-xs text-muted whitespace-nowrap">{{ 2 - inventoryStore.pendingUpgrade!.daysRemaining }}/2{{ $i18n.locale === 'vi' ? ' ngày' : 'ngày' }}</span>
            </div>
          </div>

          <!-- 升级信息 -->
          <template v-if="!isUpgrading(selectedTool) && selectedUpgradeCost">
            <div class="border border-accent/10 rounded-xs p-2 mb-2">
              <p class="text-xs text-muted mb-1">{{ $t('tool_upgrade.upgrade_to', { tier: $t('tier.' + selectedUpgradeCost.toTier) }) }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-muted">{{ $t('tool_upgrade.money') }}</span>
                <span class="text-xs" :class="playerStore.money >= selectedUpgradeCost.money ? '' : 'text-danger'">
                  {{ selectedUpgradeCost.money }}{{ $t('tool_upgrade.money_unit_xu') }}
                </span>
              </div>
              <div v-for="mat in selectedUpgradeCost.materials" :key="mat.itemId" class="flex items-center justify-between mt-0.5">
                <span class="text-xs text-muted">{{ getItemById(mat.itemId)?.name ?? mat.itemId }}</span>
                <span class="text-xs" :class="getCombinedItemCount(mat.itemId) >= mat.quantity ? '' : 'text-danger'">
                  {{ getCombinedItemCount(mat.itemId) }}/{{ mat.quantity }}
                </span>
              </div>
              <template v-if="selectedFriendshipReq">
                <div class="flex items-center justify-between mt-0.5">
                  <span class="text-xs text-muted">{{ $t('tool_upgrade.friendship_req') }}</span>
                  <span
                    class="text-xs"
                    :class="meetsLevel(npcStore.getFriendshipLevel('xiao_man'), selectedFriendshipReq) ? '' : 'text-danger'"
                  >
                    {{ $t('tool_upgrade.level_order.' + npcStore.getFriendshipLevel('xiao_man')) }} / {{ $t('tool_upgrade.level_order.' + selectedFriendshipReq) }}
                  </span>
                </div>
              </template>
            </div>

            <!-- 升级效果预览 -->
            <div class="border border-success/20 rounded-xs p-2 mb-2">
              <p class="text-xs text-muted mb-1">{{ $t('tool_upgrade.upgrade_effect') }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-muted">{{ $t('tool_upgrade.stamina_discount') }}</span>
                <span class="text-xs">
                  {{ staminaText(selectedToolObj!.tier) }} →
                  <span class="text-success">{{ staminaText(selectedUpgradeCost.toTier) }}</span>
                </span>
              </div>
              <template v-if="selectedTool === 'fishingRod'">
                <div class="flex items-center justify-between mt-0.5">
                  <span class="text-xs text-muted">{{ $t('tool_upgrade.hook_range') }}</span>
                  <span class="text-xs">
                    {{ ROD_HOOK[selectedToolObj!.tier] }} →
                    <span class="text-success">{{ ROD_HOOK[selectedUpgradeCost.toTier] }}</span>
                  </span>
                </div>
                <div class="flex items-center justify-between mt-0.5">
                  <span class="text-xs text-muted">{{ $t('tool_upgrade.fishing_limit') }}</span>
                  <span class="text-xs">
                    {{ ROD_TIME[selectedToolObj!.tier] }}{{ i18n.global.locale.value === 'vi' ? ' giây' : 'giây' }} →
                    <span class="text-success">{{ ROD_TIME[selectedUpgradeCost.toTier] }}{{ i18n.global.locale.value === 'vi' ? ' giây' : 'giây' }}</span>
                  </span>
                </div>
              </template>
            </div>

            <p v-if="getUpgradeBlockReason(selectedTool)" class="text-xs text-danger mb-2">
              {{ getUpgradeBlockReason(selectedTool) }}
            </p>

            <button
              class="btn text-xs w-full justify-center"
              :class="{ '!bg-accent !text-bg': canUpgrade(selectedTool) }"
              :disabled="!canUpgrade(selectedTool)"
              @click="handleUpgradeAndClose(selectedTool)"
            >
              <ArrowUp :size="12" />
              {{ $t('tool_upgrade.upgrade_btn') }} {{ selectedUpgradeCost.money }}{{ $t('tool_upgrade.money_unit_xu') }}
            </button>
          </template>

          <!-- 满级 -->
          <div v-else-if="!isUpgrading(selectedTool)" class="border border-success/30 rounded-xs p-2">
            <div class="flex items-center justify-center space-x-1">
              <CircleCheck :size="12" class="text-success" />
              <span class="text-xs text-success">{{ $t('tool_upgrade.max_tier_reached') }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">

  import { useFocusTrap } from '@/composables/useFocusTrap'
  import { ref, computed } from 'vue'
  import { ArrowUp, Wrench, Clock, CircleCheck, X } from 'lucide-vue-next'
  import { useGameStore } from '@/stores/useGameStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { useNpcStore } from '@/stores/useNpcStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { getCombinedItemCount, removeCombinedItem } from '@/composables/useCombinedInventory'
  import { getUpgradeCost, TOOL_NAMES, TIER_NAMES, getItemById } from '@/data'
  import { ACTION_TIME_COSTS } from '@/data/timeConstants'
  import { addLog } from '@/composables/useGameLog'
  import { handleEndDay } from '@/composables/useEndDay'
  import type { ToolType, ToolTier, FriendshipLevel } from '@/types'
  import i18n from '@/locales'


  const modalRef_s2m9c = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_s2m9c);



  /** 升级目标等级 → 所需小满好感 */
  const TIER_FRIENDSHIP_REQ: Partial<Record<ToolTier, FriendshipLevel>> = {
    iron: 'acquaintance',
    steel: 'friendly',
    iridium: 'bestFriend'
  }

  /** 各等级体力消耗倍率（与 useInventoryStore 一致） */
  const STAMINA_MULTIPLIERS: Record<ToolTier, number> = { basic: 1.0, iron: 0.8, steel: 0.6, iridium: 0.4 }
  const ROD_HOOK: Record<ToolTier, number> = { basic: 40, iron: 45, steel: 50, iridium: 60 }
  const ROD_TIME: Record<ToolTier, number> = { basic: 30, iron: 33, steel: 36, iridium: 40 }

  const staminaText = (tier: ToolTier): string => {
    const r = Math.round((1 - STAMINA_MULTIPLIERS[tier]) * 100)
    return r > 0 ? `-${r}%` : i18n.global.t('tool_upgrade.no_bonus')
  }
  const LEVEL_ORDER: FriendshipLevel[] = ['stranger', 'acquaintance', 'friendly', 'bestFriend']
  const LEVEL_NAMES: Record<FriendshipLevel, string> = {
    stranger: i18n.global.locale.value === 'vi' ? 'Người lạ' : 'kỳ lạ',
    acquaintance: i18n.global.locale.value === 'vi' ? 'Quen biết' : 'người quen',
    friendly: i18n.global.locale.value === 'vi' ? 'Thân thiết' : 'quen thuộc với',
    bestFriend: i18n.global.locale.value === 'vi' ? 'Bạn thân' : 'bạn thân'
  }
  const meetsLevel = (current: FriendshipLevel, required: FriendshipLevel): boolean =>
    LEVEL_ORDER.indexOf(current) >= LEVEL_ORDER.indexOf(required)

  const inventoryStore = useInventoryStore()
  const playerStore = usePlayerStore()
  const npcStore = useNpcStore()
  const gameStore = useGameStore()

  // === 弹窗状态 ===

  const selectedTool = ref<ToolType | null>(null)

  const selectedToolObj = computed(() => {
    if (!selectedTool.value) return null
    return inventoryStore.getTool(selectedTool.value) ?? null
  })

  const selectedUpgradeCost = computed(() => {
    if (!selectedToolObj.value) return null
    return getUpgradeCost(selectedToolObj.value.type, selectedToolObj.value.tier) ?? null
  })

  const selectedFriendshipReq = computed(() => {
    if (!selectedUpgradeCost.value) return null
    return TIER_FRIENDSHIP_REQ[selectedUpgradeCost.value.toTier] ?? null
  })

  /** 该工具是否正在升级中 */
  const isUpgrading = (type: ToolType): boolean => {
    return inventoryStore.pendingUpgrade?.toolType === type
  }

  const canUpgrade = (type: ToolType): boolean => {
    // 已有工具在升级中，不能再升级
    if (inventoryStore.pendingUpgrade) return false

    const tool = inventoryStore.getTool(type)
    if (!tool) return false
    const cost = getUpgradeCost(type, tool.tier)
    if (!cost) return false

    const requiredLevel = TIER_FRIENDSHIP_REQ[cost.toTier]
    if (requiredLevel && !meetsLevel(npcStore.getFriendshipLevel('xiao_man'), requiredLevel)) return false

    if (playerStore.money < cost.money) return false
    for (const mat of cost.materials) {
      if (getCombinedItemCount(mat.itemId) < mat.quantity) return false
    }
    return true
  }

  /** 返回升级被阻止的原因（用于 UI 提示），可升级时返回空字符串 */
  const getUpgradeBlockReason = (type: ToolType): string => {
    if (inventoryStore.pendingUpgrade) return i18n.global.t('tool_upgrade.block_already_upgrading')

    const tool = inventoryStore.getTool(type)
    if (!tool) return ''
    const cost = getUpgradeCost(type, tool.tier)
    if (!cost) return ''

    const requiredLevel = TIER_FRIENDSHIP_REQ[cost.toTier]
    if (requiredLevel && !meetsLevel(npcStore.getFriendshipLevel('xiao_man'), requiredLevel)) {
      return i18n.global.t('tool_upgrade.block_friendship', { level: i18n.global.t('tool_upgrade.level_order.' + requiredLevel) })
    }

    if (playerStore.money < cost.money) return i18n.global.t('tool_upgrade.block_money')
    for (const mat of cost.materials) {
      if (getCombinedItemCount(mat.itemId) < mat.quantity) {
        const itemName = getItemById(mat.itemId)?.name ?? mat.itemId
        return i18n.global.t('tool_upgrade.block_material', { item: itemName, current: getCombinedItemCount(mat.itemId), required: mat.quantity })
      }
    }
    return ''
  }

  const handleUpgradeAndClose = (type: ToolType) => {
    const tool = inventoryStore.getTool(type)
    if (!tool) return
    const cost = getUpgradeCost(type, tool.tier)
    if (!cost) return
    if (!canUpgrade(type)) {
      addLog(i18n.global.t('tool_upgrade.not_enough_conditions'))
      return
    }

    playerStore.spendMoney(cost.money)
    for (const mat of cost.materials) {
      removeCombinedItem(mat.itemId, mat.quantity)
    }
    inventoryStore.startUpgrade(type, cost.toTier)

    addLog(i18n.global.t('tool_upgrade.submit_upgrade_msg', { tool: i18n.global.t('tool.' + type), cost: cost.money }))
    selectedTool.value = null
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.toolUpgrade)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) {
      handleEndDay()
      return
    }
  }
</script>
