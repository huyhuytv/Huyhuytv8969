<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <div class="flex items-center space-x-1.5 text-sm text-accent">
        <Landmark :size="14" />
        <span>{{ $t('museum.title') }}</span>
      </div>
      <span class="text-xs text-muted">{{ museumStore.donatedCount }}/{{ museumStore.totalCount }}</span>
    </div>

    <!-- 空状态 -->
    <div
      v-if="museumStore.donatedCount === 0 && museumStore.donatableItems.length === 0"
      class="flex flex-col items-center justify-center py-10 space-y-3"
    >
      <Landmark :size="48" class="text-accent/30" />
      <p class="text-sm text-muted">{{ $t('museum.empty') }}</p>
      <p class="text-xs text-muted/60 text-center max-w-60">{{ $t('museum.empty_desc') }}</p>
    </div>

    <template v-else>
      <!-- 分类标签 -->
      <div class="grid grid-cols-3 md:grid-cols-6 gap-1 mb-3">
        <Button
          v-for="cat in MUSEUM_CATEGORIES"
          :key="cat.key"
          class="justify-center whitespace-nowrap"
          :class="{ '!bg-accent !text-bg': activeCategory === cat.key }"
          @click="activeCategory = cat.key"
        >
          {{ $t('museum.' + cat.key) }} ({{ getCategoryCount(cat.key) }}/{{ getCategoryTotal(cat.key) }})
        </Button>
      </div>

      <!-- 收藏格子 -->
      <div class="grid grid-cols-3 md:grid-cols-5 gap-1 mb-3 max-h-72 overflow-y-auto">
        <template v-for="item in filteredItems" :key="item.id">
          <div
            v-if="museumStore.isDonated(item.id)"
            @click="selectedItem = item"
            class="border rounded-xs p-1.5 text-center text-xs transition-colors truncate cursor-pointer border-success/40 bg-success/10 text-success"
          >
            {{ item.name }}
          </div>
          <div v-else class="border rounded-xs p-1.5 text-center text-xs transition-colors truncate border-accent/20 text-muted">
            <Lock :size="12" class="mx-auto text-muted/30" />
          </div>
        </template>
      </div>

      <!-- 快捷捐赠区 -->
      <div v-if="museumStore.donatableItems.length > 0" class="border border-accent/20 rounded-xs p-2 mb-3">
        <p class="text-xs text-accent mb-1">{{ $t('museum.donatable_items') }}</p>
        <div class="flex flex-wrap space-x-1">
          <Button v-for="itemId in museumStore.donatableItems" :key="itemId" :icon="Send" :icon-size="10" @click="handleDonate(itemId)">
            {{ getItemName(itemId) }}
          </Button>
        </div>
      </div>

      <!-- 里程碑 -->
      <div class="border border-accent/20 rounded-xs p-2">
        <p class="text-xs text-muted mb-2">{{ $t('museum.milestones') }}</p>
        <div class="flex flex-col space-y-1 max-h-52 overflow-y-auto">
          <div
            v-for="ms in MUSEUM_MILESTONES"
            :key="ms.count"
            class="flex items-center space-x-2 text-xs border border-accent/10 rounded-xs px-2 py-1 mr-1"
          >
            <CircleCheck v-if="isMilestoneClaimed(ms.count)" :size="12" class="text-success shrink-0" />
            <Circle v-else :size="12" class="shrink-0" :class="museumStore.donatedCount >= ms.count ? 'text-accent' : 'text-muted'" />
            <span class="flex-1" :class="museumStore.donatedCount >= ms.count ? 'text-text' : 'text-muted'">
              {{ $t('museum.ms_' + ms.count) }} ({{ ms.count }}{{ $i18n.locale === 'vi' ? ' món' : 'miếng' }})
            </span>
            <span class="text-muted">{{ ms.reward.money }}{{ $t('quest.money_unit_xu') }}{{ ms.reward.items ? ($i18n.locale === 'vi' ? ' +Vật phẩm' : '+Mặt hàng') : '' }}</span>
            <Button
              v-if="museumStore.donatedCount >= ms.count && !isMilestoneClaimed(ms.count)"
              class="!bg-accent !text-bg px-2 py-0.5"
              @click="museumStore.claimMilestone(ms.count)"
            >
              {{ $t('museum.claim') }}
            </Button>
          </div>
        </div>
      </div>

      <!-- 底部进度 -->
      <div class="mt-3 border border-accent/20 rounded-xs p-2">
        <div class="flex items-center space-x-2 text-xs mb-1.5">
          <span class="text-muted shrink-0">{{ $t('museum.progress') }}</span>
          <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
            <div
              class="h-full bg-accent rounded-xs transition-all"
              :style="{ width: Math.round((museumStore.donatedCount / museumStore.totalCount) * 100) + '%' }"
            />
          </div>
          <span class="text-accent whitespace-nowrap">{{ Math.round((museumStore.donatedCount / museumStore.totalCount) * 100) }}%</span>
        </div>
        <div class="grid grid-cols-2 gap-x-3 gap-y-0.5">
          <div class="flex items-center justify-between">
            <span class="text-xs text-muted">{{ $t('museum.donated') }}</span>
            <span class="text-xs">{{ museumStore.donatedCount }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-muted">{{ $t('museum.donatable') }}</span>
            <span class="text-xs">{{ museumStore.donatableItems.length }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-muted">{{ $t('museum.claimed_milestones') }}</span>
            <span class="text-xs">{{ museumStore.claimedMilestones.length }}/{{ MUSEUM_MILESTONES.length }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- Mặt hàng详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="selectedItem"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="selectedItem = null"
      >
        <div ref="modalRef_cxghh" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="selectedItem = null">
            <X :size="14" />
          </button>

          <p class="text-sm mb-2" :class="museumStore.isDonated(selectedItem.id) ? 'text-success' : 'text-accent'">
            <template v-if="museumStore.isDonated(selectedItem.id)">{{ selectedItem.name }}</template>
            <Lock v-else :size="14" class="inline text-muted/30" />
          </p>

          <!-- 来源提示 -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ selectedItem.sourceHint }}</p>
          </div>

          <!-- 状态信息 -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ $t('museum.category') }}</span>
              <span class="text-xs">{{ getCategoryLabel(selectedItem.category) }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('museum.status') }}</span>
              <span class="text-xs" :class="museumStore.isDonated(selectedItem.id) ? 'text-success' : 'text-muted'">
                {{ museumStore.isDonated(selectedItem.id) ? $t('museum.donated') : $t('museum.unregistered') }}
              </span>
            </div>
          </div>

          <!-- 操作 -->
          <div v-if="museumStore.isDonated(selectedItem.id)" class="border border-success/30 rounded-xs p-2">
            <div class="flex items-center justify-center space-x-1">
              <CircleCheck :size="12" class="text-success" />
              <span class="text-xs text-success">{{ $t('museum.already_donated') }}</span>
            </div>
          </div>
          <Button
            v-else-if="museumStore.canDonate(selectedItem.id)"
            class="w-full justify-center !bg-accent !text-bg"
            :icon="Send"
            :icon-size="12"
            @click="handleDonateAndClose(selectedItem.id)"
          >
            {{ $t('museum.donate') }}
          </Button>
          <div v-else class="border border-accent/10 rounded-xs p-2">
            <div class="flex items-center space-x-1">
              <Package :size="12" class="text-muted" />
              <span class="text-xs text-muted">{{ $t('museum.no_item_in_bag') }}</span>
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
  import { Landmark, Send, X, CircleCheck, Circle, Package, Lock } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import { useMuseumStore } from '@/stores/useMuseumStore'
  import { MUSEUM_ITEMS, MUSEUM_CATEGORIES, MUSEUM_MILESTONES } from '@/data/museum'
  import type { MuseumItemDef, MuseumCategory } from '@/types'
  import { getItemById } from '@/data/items'
  import i18n from '@/locales'


  const modalRef_cxghh = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_cxghh);



  const museumStore = useMuseumStore()

  const activeCategory = ref<MuseumCategory>('ore')
  const selectedItem = ref<MuseumItemDef | null>(null)

  const filteredItems = computed(() => MUSEUM_ITEMS.filter(i => i.category === activeCategory.value))

  const getCategoryCount = (cat: MuseumCategory): number => {
    return MUSEUM_ITEMS.filter(i => i.category === cat && museumStore.isDonated(i.id)).length
  }

  const getCategoryTotal = (cat: MuseumCategory): number => {
    return MUSEUM_ITEMS.filter(i => i.category === cat).length
  }

  const getCategoryLabel = (cat: MuseumCategory): string => {
    return i18n.global.t('museum.' + cat)
  }

  const getItemName = (id: string): string => {
    return getItemById(id)?.name ?? MUSEUM_ITEMS.find(i => i.id === id)?.name ?? id
  }

  const handleDonate = (itemId: string) => {
    museumStore.donateItem(itemId)
  }

  const handleDonateAndClose = (itemId: string) => {
    museumStore.donateItem(itemId)
    selectedItem.value = null
  }

  const isMilestoneClaimed = (count: number): boolean => {
    return museumStore.claimedMilestones.includes(count)
  }
</script>
