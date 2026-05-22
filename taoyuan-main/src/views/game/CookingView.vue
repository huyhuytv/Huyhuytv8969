<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-accent text-sm">{{ $t('cooking.stove') }}</h3>
      <button
        class="text-[10px] px-2 py-0.5 border rounded-xs"
        :class="showOnlyMakeable ? 'border-accent text-accent' : 'border-accent/20 text-muted'"
        @click="showOnlyMakeable = !showOnlyMakeable"
      >
        {{ showOnlyMakeable ? $t('cooking.only_makeable') : $t('cooking.all') }}
      </button>
    </div>
    <p v-if="tutorialHint" class="text-[10px] text-muted/50 mb-2">{{ tutorialHint }}</p>

    <!-- 当前增益 -->
    <div v-if="cookingStore.activeBuff" class="border border-water/20 rounded-xs px-3 py-1.5 mb-3">
      <p class="text-[10px] text-water">
        <Zap :size="12" class="inline mr-0.5" />
        {{ $t('cooking.active_buff') }}{{ cookingStore.activeBuff.description }}
      </p>
    </div>

    <!-- 食谱列表 -->
    <div v-if="displayedRecipeInfos.length > 0" class="border border-accent/20 rounded-xs divide-y divide-accent/10 mb-4">
      <div
                v-for="info in displayedRecipeInfos"
        :key="info.recipe.id"
        class="px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
        @click="openModal(info.recipe.id)"
                @keydown.enter.prevent="openModal(info.recipe.id)"
                @keydown.space.prevent="openModal(info.recipe.id)"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs" :class="info.canCook ? 'text-text' : 'text-muted'">
            {{ info.recipe.name }}
            <span v-if="info.canCook && info.quality !== 'normal'" class="text-[10px] ml-0.5" :class="qualityTextClass(info.quality)">
              [{{ QUALITY_NAMES[info.quality] }}]
            </span>
          </span>
          <span class="text-[10px] whitespace-nowrap ml-2" :class="info.canCook ? 'text-success' : 'text-muted/50'">
            {{ $t('cooking.stamina_restore', { amount: info.recipe.effect.staminaRestore }) }}
            <span v-if="info.recipe.effect.healthRestore">{{ $t('cooking.health_restore', { amount: info.recipe.effect.healthRestore }) }}</span>
          </span>
        </div>
        <p v-if="info.recipe.effect.buff" class="text-[10px] text-water mt-0.5">{{ info.recipe.effect.buff.description }}</p>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center py-8 mb-4">
      <UtensilsCrossed :size="36" class="text-accent/20 mb-2" />
      <p v-if="showOnlyMakeable" class="text-xs text-muted">{{ $t('cooking.no_recipe') }}</p>
      <p v-else-if="cookingStore.recipes.length === 0" class="text-xs text-muted">{{ $t('cooking.no_recipe_all') }}</p>
      <p v-if="showOnlyMakeable" class="text-[10px] text-muted/50 mt-0.5">{{ $t('cooking.no_recipe_hint') }}</p>
      <p v-else-if="cookingStore.recipes.length === 0" class="text-[10px] text-muted/50 mt-0.5">{{ $t('cooking.no_recipe_hint_all') }}</p>
    </div>

    <!-- 烹饪弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="modalInfo" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" @click.self="closeModal">
        <div ref="modalRef_grcty" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="closeModal">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-2">
            {{ modalInfo.recipe.name }}
            <span
              v-if="modalInfo.canCook && modalInfo.quality !== 'normal'"
              class="text-[10px] ml-0.5"
              :class="qualityTextClass(modalInfo.quality)"
            >
              [{{ QUALITY_NAMES[modalInfo.quality] }}]
            </span>
          </p>

          <!-- 功效 -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-success">
              {{ $t('cooking.stamina_restore', { amount: modalInfo.recipe.effect.staminaRestore }) }}
              <span v-if="modalInfo.recipe.effect.healthRestore" class="text-danger ml-1">
                {{ $t('cooking.health_restore', { amount: modalInfo.recipe.effect.healthRestore }) }}
              </span>
            </p>
            <p v-if="modalInfo.recipe.effect.buff" class="text-xs text-water mt-0.5">
              {{ modalInfo.recipe.effect.buff.description }}
            </p>
          </div>

          <!-- 材料 -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted mb-1">{{ $t('cooking.ingredients') }}</p>
            <div v-for="ing in modalInfo.ingredients" :key="ing.itemId" class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ ing.name }}</span>
              <span class="text-xs" :class="ing.enough ? '' : 'text-danger'">{{ ing.available }}/{{ ing.quantity }}</span>
            </div>
          </div>

          <!-- 数量选择 -->
          <div v-if="modalInfo.maxQty > 1" class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs text-muted">{{ $t('cooking.quantity') }}</span>
              <div class="flex items-center space-x-1">
                <Button class="h-6 px-1.5 py-0.5 text-xs justify-center" :disabled="modalQty <= 1" @click="modalQty--">
                  <Minus :size="12" />
                </Button>
                <input
                  type="number"
                  :value="modalQty"
                  min="1"
                  :max="modalInfo.maxQty"
                  class="w-24 h-6 px-2 py-0.5 bg-bg border border-accent/30 rounded-xs text-xs text-center text-accent outline-none focus:border-accent transition-colors"
                  @input="onModalQtyInput"
                />
                <Button class="h-6 px-1.5 py-0.5 text-xs justify-center" :disabled="modalQty >= modalInfo.maxQty" @click="modalQty++">
                  <Plus :size="12" />
                </Button>
              </div>
            </div>
            <div class="flex space-x-1">
              <Button class="flex-1 justify-center" :disabled="modalQty <= 1" @click="modalQty = 1">{{ $t('cooking.min') }}</Button>
              <Button class="flex-1 justify-center" :disabled="modalQty >= modalInfo.maxQty" @click="modalQty = modalInfo.maxQty">
                {{ $t('cooking.max') }}
              </Button>
            </div>
            <div class="flex items-center justify-between mt-1.5">
              <span class="text-xs text-muted">{{ $t('cooking.makeable') }}</span>
              <span class="text-xs text-accent">{{ modalInfo.maxQty }} {{ $t('cooking.unit') }}</span>
            </div>
          </div>

          <!-- 烹饪按钮 -->
          <Button
            class="w-full justify-center"
            :class="{ '!bg-accent !text-bg': modalInfo.canCook }"
            :icon="UtensilsCrossed"
            :icon-size="12"
            :disabled="!modalInfo.canCook"
            @click="handleCookFromModal"
          >
            {{ $t('cooking.cook') }}{{ modalQty > 1 ? ` ×${modalQty}` : '' }}
          </Button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">

  import { useFocusTrap } from '@/composables/useFocusTrap'
  import { ref, computed } from 'vue'
  import { UtensilsCrossed, Zap, X, Minus, Plus } from 'lucide-vue-next'
  import { useAchievementStore } from '@/stores/useAchievementStore'
  import { useCookingStore } from '@/stores/useCookingStore'
  import { useGameStore } from '@/stores/useGameStore'
  import { useTutorialStore } from '@/stores/useTutorialStore'
  import { getCombinedItemCount } from '@/composables/useCombinedInventory'
  import { getItemById } from '@/data'
  import { ACTION_TIME_COSTS } from '@/data/timeConstants'
  import { sfxClick } from '@/composables/useAudio'
  import { addLog } from '@/composables/useGameLog'
  import { handleEndDay } from '@/composables/useEndDay'
  import { QUALITY_NAMES } from '@/composables/useFarmActions'
  import type { Quality } from '@/types'
  import Button from '@/components/game/Button.vue'
  import i18n from '@/locales'


  const modalRef_grcty = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_grcty);



  const cookingStore = useCookingStore()
  const gameStore = useGameStore()
  const achievementStore = useAchievementStore()
  const tutorialStore = useTutorialStore()

  const showOnlyMakeable = ref(false)
  const modalRecipeId = ref<string | null>(null)
  const modalQty = ref(1)

  /** 预计算食谱信息（不含数量，避免改数量触发全量重算） */
  const recipeInfos = computed(() => {
    return cookingStore.recipes.map(recipe => {
      const canCook = cookingStore.canCook(recipe.id)
      const maxQty = cookingStore.maxCookable(recipe.id)
      const quality = cookingStore.previewCookQuality(recipe.id)
      const ingredients = recipe.ingredients.map(ing => {
        const item = getItemById(ing.itemId)
        const available = getCombinedItemCount(ing.itemId)
        return {
          itemId: ing.itemId,
          name: item?.name ?? ing.itemId,
          quantity: ing.quantity,
          available,
          enough: available >= ing.quantity
        }
      })
      return { recipe, canCook, maxQty, quality, ingredients }
    })
  })

  const displayedRecipeInfos = computed(() => {
    if (!showOnlyMakeable.value) return recipeInfos.value
    return recipeInfos.value.filter(info => info.canCook)
  })

  /** 当前弹窗对应的食谱信息（响应式，材料变化时自动更新） */
  const modalInfo = computed(() => {
    if (!modalRecipeId.value) return null
    return recipeInfos.value.find(i => i.recipe.id === modalRecipeId.value) ?? null
  })

  const openModal = (recipeId: string) => {
    modalRecipeId.value = recipeId
    modalQty.value = 1
  }

  const closeModal = () => {
    modalRecipeId.value = null
  }

  const onModalQtyInput = (event: Event) => {
    const val = parseInt((event.target as HTMLInputElement).value) || 1
    const max = modalInfo.value?.maxQty ?? 1
    modalQty.value = Math.max(1, Math.min(val, max))
  }

  const qualityTextClass = (quality: Quality): string => {
    if (quality === 'fine') return 'text-quality-fine'
    if (quality === 'excellent') return 'text-quality-excellent'
    if (quality === 'supreme') return 'text-quality-supreme'
    return ''
  }

  const tutorialHint = computed(() => {
    if (!tutorialStore.enabled || gameStore.year > 1) return null
    if (achievementStore.stats.totalRecipesCooked === 0)
      return i18n.global.t('cooking.tutorial_hint')
    return null
  })

  const handleCookFromModal = () => {
    if (!modalInfo.value || !modalInfo.value.canCook) return
    if (gameStore.isPastBedtime) {
      addLog(i18n.global.t('cooking.too_late'))
      handleEndDay()
      closeModal()
      return
    }
    const qty = Math.min(modalQty.value, modalInfo.value.maxQty)
    const result = cookingStore.cook(modalInfo.value.recipe.id, qty)
    sfxClick()
    addLog(result.message)
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.cook * qty)
    if (tr.message) addLog(tr.message)
    closeModal()
    if (tr.passedOut) handleEndDay()
  }
</script>
