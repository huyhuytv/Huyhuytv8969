<template>
  <div>
    <!-- 标题 -->
    <div class="flex items-center space-x-1.5 text-sm text-accent mb-3">
      <ClipboardList :size="14" />
      <span>{{ $t('quest.title') }}</span>
    </div>

    <!-- 主线任务 -->
    <div class="border border-accent/20 rounded-xs p-3 mb-3">
      <p class="text-xs text-muted mb-2">
        <BookOpen :size="12" class="inline" />
        {{ $t('quest.main_quest') }}
      </p>
      <div
        v-if="mainQuestDef"
        class="flex items-center justify-between border rounded-xs px-3 py-1.5 cursor-pointer"
        :class="
          questStore.mainQuest?.accepted && questStore.canSubmitMainQuest()
            ? 'border-success/50 bg-success/5 hover:bg-success/10'
            : 'border-accent/20 hover:bg-accent/5'
        "
        @click="questModal = { type: 'main' }"
      >
        <div class="min-w-0">
          <p class="text-xs text-accent truncate">
            {{ $i18n.locale === 'vi' ? 'Chương ' : 'Thứ ' }}{{ mainQuestDef.chapter }}{{ $i18n.locale === 'vi' ? '' : 'chương' }} · {{ mainQuestDef.title }}
          </p>
          <p class="text-xs text-muted truncate">{{ mainQuestDef.description }}</p>
        </div>
        <span
          class="text-xs whitespace-nowrap ml-2"
          :class="questStore.canSubmitMainQuest() ? 'text-success' : questStore.mainQuest?.accepted ? 'text-accent' : 'text-muted'"
        >
          {{ questStore.canSubmitMainQuest() ? $t('quest.accepted_or_not.can_submit') : questStore.mainQuest?.accepted ? $t('quest.accepted_or_not.in_progress') : $t('quest.accepted_or_not.not_accepted') }}
        </span>
      </div>
      <div v-else-if="questStore.completedMainQuests.length >= 50" class="flex flex-col items-center justify-center py-4 text-muted">
        <CheckCircle :size="24" />
        <p class="text-xs mt-1">{{ $t('quest.main_completed') }}</p>
      </div>
    </div>

    <!-- 今日委托 -->
    <div class="border border-accent/20 rounded-xs p-3 mb-3">
      <p class="text-xs text-muted mb-2">
        <Calendar :size="12" class="inline" />
        {{ $t('quest.daily_commission') }}
      </p>
      <div v-if="questStore.boardQuests.length === 0" class="flex flex-col items-center justify-center py-4 text-muted">
        <Calendar :size="24" />
        <p class="text-xs mt-1">{{ $t('quest.no_daily_commission') }}</p>
      </div>
      <div v-else class="flex flex-col space-y-1.5">
        <div
          v-for="quest in questStore.boardQuests"
          :key="quest.id"
          class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
          @click="questModal = { type: 'board', questId: quest.id }"
        >
          <p class="text-xs truncate min-w-0">{{ quest.description }}</p>
          <span class="text-xs text-accent whitespace-nowrap ml-2">{{ quest.moneyReward }}{{ $t('quest.money_unit_xu') }}</span>
        </div>
      </div>
    </div>

    <!-- 特殊订单 -->
    <div v-if="questStore.specialOrder" class="border border-accent/20 rounded-xs p-3 mb-3">
      <p class="text-xs text-muted mb-2">
        <Star :size="12" class="inline" />
        {{ $t('quest.special_order') }}
      </p>
      <div
        class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
        @click="questModal = { type: 'special' }"
      >
        <div class="min-w-0">
          <p class="text-xs truncate">{{ questStore.specialOrder.description }}</p>
        </div>
        <span class="text-xs text-accent whitespace-nowrap ml-2">{{ questStore.specialOrder.moneyReward }}{{ $t('quest.money_unit_xu') }}</span>
      </div>
    </div>

    <!-- 进行中 -->
    <div class="border border-accent/20 rounded-xs p-3 mb-3">
      <p class="text-xs text-muted mb-2">
        <Clock :size="12" class="inline" />
        {{ $t('quest.active_quests', { current: questStore.activeQuests.length, max: questStore.MAX_ACTIVE_QUESTS }) }}
      </p>
      <div v-if="questStore.activeQuests.length === 0" class="flex flex-col items-center justify-center py-4 text-muted">
        <Clock :size="24" />
        <p class="text-xs mt-1">{{ $t('quest.no_active_quests') }}</p>
      </div>
      <div v-else class="flex flex-col space-y-1.5">
        <div
          v-for="quest in questStore.activeQuests"
          :key="quest.id"
          class="border rounded-xs px-3 py-1.5 cursor-pointer"
          :class="
            canSubmit(quest)
              ? 'border-success/50 bg-success/5 hover:bg-success/10'
              : quest.type === 'special_order'
                ? 'border-accent/30 hover:bg-accent/5'
                : 'border-accent/20 hover:bg-accent/5'
          "
          @click="questModal = { type: 'active', questId: quest.id }"
        >
          <div class="flex items-center justify-between">
            <p class="text-xs truncate min-w-0">{{ quest.description }}</p>
            <span class="text-xs whitespace-nowrap ml-2" :class="canSubmit(quest) ? 'text-success' : 'text-muted'">
              {{ canSubmit(quest) ? $t('quest.accepted_or_not.can_submit') : $t('quest.days_remaining', { days: quest.daysRemaining }) }}
            </span>
          </div>
          <div v-if="quest.type !== 'delivery'" class="mt-1 flex items-center space-x-2">
            <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
              <div
                class="h-full rounded-xs bg-accent transition-all"
                :style="{ width: Math.floor((getEffectiveProgress(quest) / quest.targetQuantity) * 100) + '%' }"
              />
            </div>
            <span class="text-xs text-muted">{{ getEffectiveProgress(quest) }}/{{ quest.targetQuantity }}</span>
          </div>
          <div v-else class="mt-0.5">
            <span class="text-xs text-muted">{{ $t('quest.in_bag') }} {{ inventoryStore.getItemCount(quest.targetItemId) }}/{{ quest.targetQuantity }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计 -->
    <div class="border border-accent/10 rounded-xs p-2 text-center">
      <p class="text-xs text-muted">
        {{ $t('quest.commission_count', { count: questStore.completedQuestCount, main: questStore.completedMainQuests.length }) }}
      </p>
    </div>

    <!-- 任务详情弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="questModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" @click.self="questModal = null">
        <div ref="modalRef_0g5vh" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="questModal = null">
            <X :size="14" />
          </button>

          <!-- 主线任务详情 -->
          <template v-if="questModal.type === 'main' && mainQuestDef">
            <p class="text-accent text-sm mb-1">
              {{ $i18n.locale === 'vi' ? 'Chương ' : 'Thứ ' }}{{ mainQuestDef.chapter }}{{ $i18n.locale === 'vi' ? '' : 'chương' }}「{{ chapterTitle }}」
            </p>
            <p class="text-xs font-bold text-accent mb-1">{{ mainQuestDef.title }}</p>
            <p class="text-xs text-muted leading-relaxed mb-2">{{ mainQuestDef.description }}</p>
            <div class="border border-accent/10 rounded-xs p-2 mb-2">
              <p class="text-xs text-muted mb-1">{{ $t('quest.objectives') }}</p>
              <div v-for="(obj, i) in mainQuestDef.objectives" :key="i" class="flex items-center space-x-1">
                <CircleCheck v-if="mainQuestProgress[i]" :size="12" class="text-success shrink-0" />
                <Circle v-else :size="12" class="text-danger shrink-0" />
                <span class="text-xs" :class="mainQuestProgress[i] ? 'text-success' : ''">{{ obj.label }}</span>
              </div>
            </div>
            <div class="border border-accent/10 rounded-xs p-2 mb-3">
              <p class="text-xs text-muted mb-1">{{ $t('quest.rewards') }}</p>
              <p class="text-xs">
                {{ mainQuestDef.moneyReward }}{{ $t('quest.money_unit_xu') }}
                <template v-if="mainQuestDef.friendshipReward?.length">{{ $t('quest.friendship_plus') }}</template>
                <template v-if="mainQuestDef.itemReward?.length">
                  + {{ mainQuestDef.itemReward.map(i => `${getItemName(i.itemId)}×${i.quantity}`).join(', ') }}
                </template>
              </p>
            </div>
            <Button
              v-if="!questStore.mainQuest?.accepted"
              class="w-full justify-center"
              :icon="Plus"
              :icon-size="12"
              @click="handleAcceptMain"
            >
              {{ $t('quest.accept_quest') }}
            </Button>
            <Button
              v-else
              class="w-full justify-center"
              :class="{ '!bg-accent !text-bg': questStore.canSubmitMainQuest() }"
              :icon="CheckCircle"
              :icon-size="12"
              :disabled="!questStore.canSubmitMainQuest()"
              @click="handleSubmitMain"
            >
              {{ $t('quest.submit_quest') }}
            </Button>
          </template>

          <!-- 委托详情 -->
          <template v-if="questModal.type === 'board' && selectedBoardQuest">
            <p class="text-accent text-sm mb-2">{{ $t('quest.commission_details') }}</p>
            <p class="text-xs leading-relaxed mb-2">{{ selectedBoardQuest.description }}</p>
            <div class="border border-accent/10 rounded-xs p-2 mb-2">
              <p class="text-xs text-muted mb-1">{{ $t('quest.objectives') }}</p>
              <p class="text-xs">{{ selectedBoardQuest.targetItemName }} × {{ selectedBoardQuest.targetQuantity }}</p>
            </div>
            <div class="border border-accent/10 rounded-xs p-2 mb-3">
              <p class="text-xs text-muted mb-1">{{ $t('quest.rewards') }}</p>
              <p class="text-xs">
                {{ selectedBoardQuest.moneyReward }}{{ $t('quest.money_unit_xu') }} {{ $t('quest.friendship_val', { amount: selectedBoardQuest.friendshipReward }) }}
              </p>
            </div>
            <Button
              class="w-full justify-center"
              :icon="Plus"
              :icon-size="12"
              :disabled="questStore.activeQuests.length >= questStore.MAX_ACTIVE_QUESTS"
              @click="handleAccept(selectedBoardQuest.id)"
            >
              {{ $t('quest.accept_commission_btn') }}
            </Button>
          </template>

          <!-- 特殊订单详情 -->
          <template v-if="questModal.type === 'special' && questStore.specialOrder">
            <p class="text-accent text-sm mb-2">
              {{ $t('quest.special_order') }}
              <span v-if="questStore.specialOrder.tierLabel" class="text-[10px] text-muted border border-accent/20 rounded-xs px-1 ml-1">
                {{ questStore.specialOrder.tierLabel }}
              </span>
            </p>
            <p class="text-xs leading-relaxed mb-2">{{ questStore.specialOrder.description }}</p>
            <div class="border border-accent/10 rounded-xs p-2 mb-2">
              <p class="text-xs text-muted mb-1">{{ $t('quest.objectives') }}</p>
              <p class="text-xs">{{ questStore.specialOrder.targetItemName }} × {{ questStore.specialOrder.targetQuantity }}</p>
            </div>
            <div class="border border-accent/10 rounded-xs p-2 mb-2">
              <p class="text-xs text-muted mb-1">{{ $t('quest.time_limit') }}</p>
              <p class="text-xs">{{ $t('quest.time_days', { days: questStore.specialOrder.daysRemaining }) }}</p>
            </div>
            <div class="border border-accent/10 rounded-xs p-2 mb-3">
              <p class="text-xs text-muted mb-1">{{ $t('quest.rewards') }}</p>
              <p class="text-xs">
                {{ questStore.specialOrder.moneyReward }}{{ $t('quest.money_unit_xu') }} {{ $t('quest.friendship_val', { amount: questStore.specialOrder.friendshipReward }) }}
                <template v-if="questStore.specialOrder.itemReward?.length">
                  + {{ questStore.specialOrder.itemReward.map(i => `${getItemName(i.itemId)}×${i.quantity}`).join(', ') }}
                </template>
              </p>
            </div>
            <Button
              class="w-full justify-center"
              :icon="Plus"
              :icon-size="12"
              :disabled="questStore.activeQuests.length >= questStore.MAX_ACTIVE_QUESTS"
              @click="handleAcceptSpecialOrder"
            >
              {{ $t('quest.accept_order_btn') }}
            </Button>
          </template>

          <!-- 进行中任务详情 -->
          <template v-if="questModal.type === 'active' && selectedActiveQuest">
            <p class="text-accent text-sm mb-2">
              {{ selectedActiveQuest.type === 'special_order' ? $t('quest.active_special_order') : $t('quest.active_commission') }}
            </p>
            <p class="text-xs leading-relaxed mb-2">{{ selectedActiveQuest.description }}</p>
            <div class="border border-accent/10 rounded-xs p-2 mb-2">
              <p class="text-xs text-muted mb-1">{{ $t('quest.objectives') }}</p>
              <div v-if="selectedActiveQuest.type !== 'delivery'" class="flex items-center space-x-2">
                <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                  <div
                    class="h-full rounded-xs bg-accent transition-all"
                    :style="{
                      width: Math.floor((getEffectiveProgress(selectedActiveQuest) / selectedActiveQuest.targetQuantity) * 100) + '%'
                    }"
                  />
                </div>
                <span class="text-xs text-muted">
                  {{ getEffectiveProgress(selectedActiveQuest) }}/{{ selectedActiveQuest.targetQuantity }}
                </span>
              </div>
              <p v-else class="text-xs">
                {{ $t('quest.in_bag_detailed', { current: inventoryStore.getItemCount(selectedActiveQuest.targetItemId), target: selectedActiveQuest.targetQuantity }) }}
              </p>
            </div>
            <div class="border border-accent/10 rounded-xs p-2 mb-2">
              <p class="text-xs text-muted mb-1">{{ $t('quest.time_left') }}</p>
              <p class="text-xs">{{ $t('quest.time_days', { days: selectedActiveQuest.daysRemaining }) }}</p>
            </div>
            <div class="border border-accent/10 rounded-xs p-2 mb-3">
              <p class="text-xs text-muted mb-1">{{ $t('quest.rewards') }}</p>
              <p class="text-xs">
                {{ selectedActiveQuest.moneyReward }}{{ $t('quest.money_unit_xu') }}
                <template v-if="selectedActiveQuest.itemReward?.length">
                  + {{ selectedActiveQuest.itemReward.map(i => `${getItemName(i.itemId)}×${i.quantity}`).join(', ') }}
                </template>
              </p>
            </div>
            <Button
              class="w-full justify-center"
              :class="{ '!bg-accent !text-bg': canSubmit(selectedActiveQuest) }"
              :icon="CheckCircle"
              :icon-size="12"
              :disabled="!canSubmit(selectedActiveQuest)"
              @click="handleSubmit(selectedActiveQuest.id)"
            >
              {{ $t('quest.submit_quest') }}
            </Button>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">

  import { useFocusTrap } from '@/composables/useFocusTrap'
  import { ref, computed } from 'vue'
  import { ClipboardList, Calendar, Clock, Plus, CheckCircle, CircleCheck, Circle, Star, BookOpen, X } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import type { QuestInstance } from '@/types'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { useQuestStore } from '@/stores/useQuestStore'
  import { getItemById, getStoryQuestById, CHAPTER_TITLES } from '@/data'
  import { addLog } from '@/composables/useGameLog'


  const modalRef_0g5vh = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_0g5vh);



  const questStore = useQuestStore()
  const inventoryStore = useInventoryStore()

  const getItemName = (id: string): string => {
    return getItemById(id)?.name ?? id
  }

  // === 弹窗状态 ===

  type QuestModalState = { type: 'main' } | { type: 'board'; questId: string } | { type: 'special' } | { type: 'active'; questId: string }

  const questModal = ref<QuestModalState | null>(null)

  const selectedBoardQuest = computed(() => {
    const m = questModal.value
    if (!m || m.type !== 'board') return null
    return questStore.boardQuests.find(q => q.id === m.questId) ?? null
  })

  const selectedActiveQuest = computed(() => {
    const m = questModal.value
    if (!m || m.type !== 'active') return null
    return questStore.activeQuests.find(q => q.id === m.questId) ?? null
  })

  // === 主线任务 ===

  const mainQuestDef = computed(() => {
    if (!questStore.mainQuest) return null
    return getStoryQuestById(questStore.mainQuest.questId) ?? null
  })

  const chapterTitle = computed(() => {
    if (!mainQuestDef.value) return ''
    return CHAPTER_TITLES[mainQuestDef.value.chapter] ?? ''
  })

  const mainQuestProgress = computed(() => {
    return questStore.mainQuest?.objectiveProgress ?? []
  })

  const handleAcceptMain = () => {
    const result = questStore.acceptMainQuest()
    addLog(result.message)
    questModal.value = null
  }

  const handleSubmitMain = () => {
    const result = questStore.submitMainQuest()
    addLog(result.message)
    questModal.value = null
  }

  // === 日常委托 ===

  /** 非送货类任务的有效进度（取追踪数量和背包数量的较大值） */
  const getEffectiveProgress = (quest: QuestInstance): number => {
    return Math.min(Math.max(quest.collectedQuantity, inventoryStore.getItemCount(quest.targetItemId)), quest.targetQuantity)
  }

  const canSubmit = (quest: QuestInstance): boolean => {
    if (quest.type === 'delivery') {
      return inventoryStore.getItemCount(quest.targetItemId) >= quest.targetQuantity
    }
    return getEffectiveProgress(quest) >= quest.targetQuantity
  }

  const handleAccept = (questId: string) => {
    const result = questStore.acceptQuest(questId)
    addLog(result.message)
    questModal.value = null
  }

  const handleAcceptSpecialOrder = () => {
    const result = questStore.acceptSpecialOrder()
    addLog(result.message)
    questModal.value = null
  }

  const handleSubmit = (questId: string) => {
    const result = questStore.submitQuest(questId)
    addLog(result.message)
    questModal.value = null
  }
</script>
