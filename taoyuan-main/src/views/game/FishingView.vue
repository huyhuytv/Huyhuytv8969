<template>
  <div>
    <h3 class="text-accent text-sm mb-3">
      <Fish :size="14" class="inline" />
      {{ currentLocationName }}câu cá
    </h3>
    <p v-if="tutorialHint" class="text-[10px] text-muted/50 mb-2">{{ tutorialHint }}</p>

    <!-- câu cá地点 -->
    <div class="border border-accent/20 rounded-xs p-3 mb-4">
      <p class="text-sm text-accent mb-2">
        <MapPin :size="14" class="inline" />
        Điểm câu cá
      </p>
      <div class="grid grid-cols-3 gap-1" role="list">
        <div
                v-for="loc in FISHING_LOCATIONS"
          :key="loc.id"
          class="text-center border rounded-xs px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40"
                role="button"
                tabindex="0"
          :class="fishingStore.fishingLocation === loc.id ? 'border-accent/60 bg-accent/10' : 'border-accent/20 hover:bg-accent/5'"
          @click="handleSetLocation(loc.id)"
                @keydown.enter.prevent="handleSetLocation(loc.id)"
                @keydown.space.prevent="handleSetLocation(loc.id)"
        >
          <span class="text-xs" :class="fishingStore.fishingLocation === loc.id ? 'text-accent' : ''">
            {{ loc.name }}
          </span>
        </div>
      </div>
      <p class="text-xs text-muted mt-2">{{ currentLocationDesc }}</p>
    </div>

    <!-- 装备 -->
    <div class="border border-accent/20 rounded-xs p-3 mb-4">
      <p class="text-sm text-accent mb-2">Trang bị</p>
      <div class="flex flex-col space-y-1">
        <!-- 鱼竿 -->
        <div class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5">
          <span class="text-xs">Cần câu</span>
          <span class="text-xs text-accent">{{ rodTierName }}</span>
        </div>
        <!-- 鱼饵 -->
        <div
                class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
          @click="showBaitModal = true"
                @keydown.enter.prevent="showBaitModal = true"
                @keydown.space.prevent="showBaitModal = true"
        >
          <span class="text-xs">Mồi câu</span>
          <span class="text-xs" :class="fishingStore.equippedBait ? 'text-accent' : 'text-muted'">
            <template v-if="fishingStore.equippedBait">
              {{ getBaitName(fishingStore.equippedBait) }}
              <span class="text-muted">(&times;{{ inventoryStore.getItemCount(fishingStore.equippedBait) }})</span>
            </template>
            <template v-else>Chưa trang bị</template>
          </span>
        </div>
        <!-- 浮漂 -->
        <div
          class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5"
          :class="canEquipTackle ? 'cursor-pointer hover:bg-accent/5' : 'opacity-50'"
          @click="canEquipTackle && (showTackleModal = true)"
        >
          <span class="text-xs">Phao câu</span>
          <span class="text-xs" :class="fishingStore.equippedTackle ? 'text-accent' : 'text-muted'">
            <template v-if="fishingStore.equippedTackle">
              {{ getTackleName(fishingStore.equippedTackle) }}
              <span class="text-muted">({{ fishingStore.tackleDurability }})</span>
            </template>
            <template v-else>{{ canEquipTackle ? 'Chưa trang bị' : 'Yêu cầu thanh sắt trở lên' }}</template>
          </span>
        </div>
      </div>
    </div>

    <!-- câu cá操作 -->
    <div class="border border-accent/20 rounded-xs p-3 mb-4">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm text-accent">Câu cá</p>
        <span class="text-xs text-muted">{{ playerStore.stamina }}/{{ playerStore.maxStamina }} sức mạnh thể chất</span>
      </div>
      <div
                class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
        @click="handleStartFishing"
                @keydown.enter.prevent="handleStartFishing"
                @keydown.space.prevent="handleStartFishing"
      >
        <span class="text-xs">
          <Target :size="12" class="inline" />
          Quăng cần
        </span>
        <span class="text-xs text-muted">Tiêu hao thể lực · {{ fishTimeLabel }}</span>
      </div>
    </div>

    <!-- câu cá结果 -->
    <div class="border border-accent/20 rounded-xs p-3 mb-4">
      <p class="text-sm text-accent mb-2">Kết quả câu</p>
      <div v-if="lastResult" class="border border-accent/10 rounded-xs px-3 py-1.5">
        <span class="text-xs">{{ lastResult }}</span>
      </div>
      <div v-else class="flex flex-col items-center justify-center py-6 text-muted">
        <Fish :size="32" class="text-muted/30 mb-2" />
        <p class="text-xs">Nếu bạn chưa câu cá, hãy thử.</p>
      </div>
    </div>

    <!-- 当前可câu cá类 -->
    <div class="border border-accent/20 rounded-xs p-3 mb-4">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm text-accent">Loại cá câu được</p>
        <span class="text-xs text-muted">{{ fishingStore.availableFish.length }}loài</span>
      </div>
      <div v-if="fishingStore.availableFish.length > 0" class="flex flex-col space-y-1">
        <div
                v-for="f in fishingStore.availableFish"
          :key="f.name"
          class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
          @click="selectedFish = f"
                @keydown.enter.prevent="selectedFish = f"
                @keydown.space.prevent="selectedFish = f"
        >
          <span class="text-xs" :class="DIFFICULTY_COLORS[f.difficulty]">{{ f.name }}</span>
          <span class="text-[10px]" :class="DIFFICULTY_COLORS[f.difficulty]">
            {{ DIFFICULTY_NAMES[f.difficulty] }}
          </span>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center py-6 text-muted">
        <Fish :size="32" class="text-muted/30 mb-2" />
        <p class="text-xs">Giai đoạn hiện tại/thời tiết/Không có cá để đánh bắt tại địa điểm.</p>
      </div>
    </div>

    <!-- 蟹笼管理 -->
    <div class="border border-accent/20 rounded-xs p-3 mb-4">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm text-accent">
          <Box :size="14" class="inline" />
          Lồng cua
        </p>
        <span class="text-xs text-muted">{{ fishingStore.crabPots.length }}/10</span>
      </div>
      <div v-if="crabPotLocations.length > 0" class="flex flex-col space-y-1 mb-2">
        <div v-for="loc in crabPotLocations" :key="loc.id" class="border border-accent/10 rounded-xs p-2">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs text-accent">{{ loc.name }}</span>
            <div class="flex space-x-1">
              <Button class="py-0 px-1" @click="handleBaitCrabPots(loc.id)">Mồi</Button>
              <Button class="py-0 px-1" @click="handleRemoveCrabPot(loc.id)">Tái chế</Button>
            </div>
          </div>
          <p class="text-[10px] text-muted">{{ loc.total }}một · {{ loc.baited }}bị mồi</p>
        </div>
      </div>
      <div v-else-if="!hasCrabPotInBag" class="flex flex-col items-center justify-center py-6 text-muted mb-2">
        <Box :size="32" class="text-muted/30 mb-2" />
        <p class="text-xs">Chậu cua có thể được đặt ở đây sau khi mua hoặc chế tạo chúng.</p>
      </div>
      <div
                v-if="hasCrabPotInBag"
        class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
        @click="handlePlaceCrabPot"
                @keydown.enter.prevent="handlePlaceCrabPot"
                @keydown.space.prevent="handlePlaceCrabPot"
      >
        <span class="text-xs">Đặt lồng cua</span>
        <span class="text-xs text-muted">{{ currentLocationName }}</span>
      </div>
    </div>

    <!-- 淘金 -->
    <div class="border border-accent/20 rounded-xs p-3">
      <p class="text-sm text-accent mb-2">
        <CircleDot :size="14" class="inline" />
        Đãi vàng
      </p>
      <div v-if="canPan">
        <p class="text-xs text-muted mb-2">Khi nước sông dâng cao vào những ngày mưa, bạn có thể dùng ch���o vàng để đãi vàng theo dòng nước.</p>
        <div
                class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
          @click="handlePan"
                @keydown.enter.prevent="handlePan"
                @keydown.space.prevent="handlePan"
        >
          <span class="text-xs">Đãi vàng 1 lần</span>
          <span class="text-xs text-muted">Tiêu hao thể lực · {{ Math.round(panTime * 60) }}phút</span>
        </div>
        <div v-if="panResult" class="border border-accent/10 rounded-xs px-3 py-1.5 mt-1">
          <span class="text-xs">{{ panResult }}</span>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center py-6 text-muted">
        <CircleDot :size="32" class="text-muted/30 mb-2" />
        <p class="text-xs">{{ panDisabledReason }}</p>
      </div>
    </div>

    <!-- 鱼饵选择弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showBaitModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showBaitModal = false"
      >
        <div ref="modalRef_424o5" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showBaitModal = false">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">Mồi câu</p>
          <!-- 当前装备 -->
          <div v-if="fishingStore.equippedBait" class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-[10px] text-muted mb-1">Đang trang bị</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-accent">{{ getBaitName(fishingStore.equippedBait) }}</span>
              <Button class="py-0 px-1" @click="handleUnequipBait">Tháo ra</Button>
            </div>
          </div>
          <!-- 可用鱼饵列表 -->
          <div v-if="availableBaits.length > 0" class="border border-accent/10 rounded-xs p-2">
            <p class="text-[10px] text-muted mb-1">Mồi câu trong ba lô</p>
            <div class="flex flex-col space-y-1">
              <div
                v-for="b in availableBaits"
                :key="b.id"
                class="flex items-center justify-between border border-accent/10 rounded-xs px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
                @click="handleEquipBaitFromModal(b.id)"
                @keydown.enter.prevent="handleEquipBaitFromModal(b.id)"
                @keydown.space.prevent="handleEquipBaitFromModal(b.id)"
              >
                <span class="text-xs">{{ b.name }}</span>
                <span class="text-xs text-muted">&times;{{ b.count }}</span>
              </div>
            </div>
          </div>
          <div v-else-if="!fishingStore.equippedBait" class="flex flex-col items-center justify-center py-4 text-muted">
            <Target :size="28" class="text-muted/30 mb-2" />
            <p class="text-xs">Không có mồi trong ba lô</p>
            <p class="text-[10px] text-muted/60 mt-0.5">Có thể mua tại cửa hàng hoặc sản xuất</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 浮漂选择弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showTackleModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showTackleModal = false"
      >
        <div ref="modalRef_fz06t" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showTackleModal = false">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">Phao câu</p>
          <!-- 当前装备 -->
          <div v-if="fishingStore.equippedTackle" class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-[10px] text-muted mb-1">Đang trang bị</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-accent">{{ getTackleName(fishingStore.equippedTackle) }}</span>
              <div class="flex items-center space-x-2">
                <span class="text-[10px] text-muted">Bền bỉ {{ fishingStore.tackleDurability }}</span>
                <Button class="py-0 px-1" @click="handleUnequipTackle">Tháo ra</Button>
              </div>
            </div>
          </div>
          <!-- 可用浮漂列表 -->
          <div v-if="availableTackles.length > 0" class="border border-accent/10 rounded-xs p-2">
            <p class="text-[10px] text-muted mb-1">nổi trong ba lô</p>
            <div class="flex flex-col space-y-1">
              <div
                v-for="t in availableTackles"
                :key="t.id"
                class="flex items-center justify-between border border-accent/10 rounded-xs px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
                @click="handleEquipTackleFromModal(t.id)"
                @keydown.enter.prevent="handleEquipTackleFromModal(t.id)"
                @keydown.space.prevent="handleEquipTackleFromModal(t.id)"
              >
                <span class="text-xs">{{ t.name }}</span>
                <span class="text-xs text-muted">&times;{{ t.count }}</span>
              </div>
            </div>
          </div>
          <div v-else-if="!fishingStore.equippedTackle" class="flex flex-col items-center justify-center py-4 text-muted">
            <MapPin :size="28" class="text-muted/30 mb-2" />
            <p class="text-xs">Không có phao trong ba lô</p>
            <p class="text-[10px] text-muted/60 mt-0.5">Có thể mua tại cửa hàng hoặc sản xuất</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- câu cá游戏弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showFishingModal && miniGameParams"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="handleCloseFishingModal"
      >
        <div ref="modalRef_vw9by" class="game-panel max-w-sm w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="handleCloseFishingModal">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">
            <Fish :size="14" class="inline" />
            Câu cá
          </p>
          <!-- 放弃确认 -->
          <div v-if="showCloseConfirm" class="border border-danger/40 rounded-xs p-3 mb-3">
            <p class="text-xs text-danger mb-2">Cá vẫn cắn câu, bạn có chắc muốn bỏ cuộc không?</p>
            <div class="flex space-x-2">
              <Button class="text-danger" @click="handleConfirmClose">Từ bỏ</Button>
              <Button @click="showCloseConfirm = false">Tiếp tục câu</Button>
            </div>
          </div>
          <FishingMiniGame v-bind="miniGameParams" @complete="handleMiniGameComplete" />
        </div>
      </div>
    </Transition>

    <!-- câu cá结果弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="catchResult" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div ref="modalRef_rxvo6" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="dismissCatchResult">
            <X :size="14" />
          </button>

          <p
            class="text-sm mb-2"
            :class="
              catchResult.success && catchResult.quality
                ? QUALITY_COLORS[catchResult.quality]
                : catchResult.success
                  ? 'text-accent'
                  : 'text-danger'
            "
          >
            {{ catchResult.fishName }}
          </p>

          <div v-if="catchResult.description" class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ catchResult.description }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Kết quả</span>
              <span class="text-xs" :class="catchResult.success ? 'text-success' : 'text-danger'">
                {{ catchResult.success ? 'Bắt thành công' : 'Cá sổng mất' }}
              </span>
            </div>
            <div v-if="catchResult.success && catchResult.quantity" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Số lượng</span>
              <span class="text-xs">×{{ catchResult.quantity }}</span>
            </div>
            <div v-if="catchResult.success && catchResult.quality" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Phẩm chất</span>
              <span class="text-xs" :class="QUALITY_COLORS[catchResult.quality]">{{ QUALITY_NAMES[catchResult.quality] }}</span>
            </div>
            <div v-if="catchResult.difficulty" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Độ khó</span>
              <span class="text-xs" :class="DIFFICULTY_COLORS[catchResult.difficulty]">{{ DIFFICULTY_NAMES[catchResult.difficulty] }}</span>
            </div>
            <div v-if="catchResult.sellPrice" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Giá bán</span>
              <span class="text-xs text-accent">{{ catchResult.sellPrice }}văn bản</span>
            </div>
          </div>

          <p v-if="catchResult.message.includes('rương kho báu')" class="text-xs text-accent mb-2">
            {{ catchResult.message.slice(catchResult.message.indexOf('rương kho báu')) }}
          </p>

          <Button class="w-full justify-center !bg-accent !text-bg" @click="dismissCatchResult">Xác nhận</Button>
        </div>
      </div>
    </Transition>

    <!-- 鱼类详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="selectedFish"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="selectedFish = null"
      >
        <div ref="modalRef_yun2w" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="selectedFish = null">
            <X :size="14" />
          </button>
          <p class="text-sm mb-2" :class="DIFFICULTY_COLORS[selectedFish.difficulty]">{{ selectedFish.name }}</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ selectedFish.description }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Độ khó</span>
              <span class="text-xs" :class="DIFFICULTY_COLORS[selectedFish.difficulty]">
                {{ DIFFICULTY_NAMES[selectedFish.difficulty] }}
              </span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Giá bán</span>
              <span class="text-xs text-accent">{{ selectedFish.sellPrice }}văn bản</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">mùa</span>
              <span class="text-xs">{{ selectedFish.season.map(s => SEASON_LABEL[s] ?? s).join(',') }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">thời tiết</span>
              <span class="text-xs">{{ selectedFish.weather.map(w => WEATHER_LABEL[w] ?? w).join(',') }}</span>
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
  import { Fish, X, Target, MapPin, Box, CircleDot } from 'lucide-vue-next'
  import { useAchievementStore } from '@/stores/useAchievementStore'
  import { useFishingStore } from '@/stores/useFishingStore'
  import { useGameStore } from '@/stores/useGameStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { useSkillStore } from '@/stores/useSkillStore'
  import { useTutorialStore } from '@/stores/useTutorialStore'
  import { getBaitById, getTackleById } from '@/data/processing'
  import { FISHING_LOCATIONS } from '@/data/fish'
  import type { BaitType, TackleType, FishingLocation, FishDef, MiniGameParams, MiniGameResult, Quality } from '@/types'
  import { ACTION_TIME_COSTS, TOOL_TIME_SAVINGS, SKILL_TIME_REDUCTION_PER_LEVEL, MIN_ACTION_MINUTES } from '@/data/timeConstants'
  import { sfxFishCatch, sfxLineBroken, sfxClick } from '@/composables/useAudio'
  import { addLog } from '@/composables/useGameLog'
  import { handleEndDay } from '@/composables/useEndDay'
  import FishingMiniGame from '@/components/game/FishingMiniGame.vue'
  import Button from '@/components/game/Button.vue'


  const modalRef_424o5 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_424o5);
  const modalRef_fz06t = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_fz06t);
  const modalRef_vw9by = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_vw9by);
  const modalRef_rxvo6 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_rxvo6);
  const modalRef_yun2w = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_yun2w);



  const fishingStore = useFishingStore()
  const gameStore = useGameStore()
  const inventoryStore = useInventoryStore()
  const playerStore = usePlayerStore()
  const skillStore = useSkillStore()
  const achievementStore = useAchievementStore()
  const tutorialStore = useTutorialStore()

  const tutorialHint = computed(() => {
    if (!tutorialStore.enabled || gameStore.year > 1) return null
    if (achievementStore.stats.totalFishCaught === 0) return 'Chọn địa điểm câu cá và nhấp chuột「bắt đầu câu cá」. Sau khi câu được cá, bạn cần hoàn thành một mini game để bắt được nó.'
    return null
  })

  // === State ===

  const lastResult = ref<string | null>(null)
  const miniGameParams = ref<MiniGameParams | null>(null)
  const panResult = ref<string | null>(null)

  const showBaitModal = ref(false)
  const showTackleModal = ref(false)
  const showFishingModal = ref(false)
  const showCloseConfirm = ref(false)
  const miniGameCompleted = ref(false)
  const selectedFish = ref<FishDef | null>(null)
  const catchResult = ref<{
    fishName: string
    fishId?: string
    difficulty?: string
    sellPrice?: number
    description?: string
    quality?: Quality
    quantity?: number
    success: boolean
    message: string
  } | null>(null)

  // === Computed ===

  /** câu cá耗时（小时），受工具和技能减免 */
  const fishTime = computed(() => {
    const baseMin = ACTION_TIME_COSTS.fishStart * 60
    const toolTier = inventoryStore.getTool('fishingRod')?.tier ?? 'basic'
    const saving = TOOL_TIME_SAVINGS[toolTier] ?? 0
    const skillReduction = skillStore.getSkill('fishing').level * SKILL_TIME_REDUCTION_PER_LEVEL
    return Math.max(MIN_ACTION_MINUTES, Math.round((baseMin - saving) * (1 - skillReduction))) / 60
  })

  const fishTimeLabel = computed(() => `${Math.round(fishTime.value * 60)}phút`)

  /** 淘金耗时（小时），受工具和技能减免 */
  const panTime = computed(() => {
    const baseMin = ACTION_TIME_COSTS.pan * 60
    const toolTier = inventoryStore.getTool('pan')?.tier ?? 'basic'
    const saving = TOOL_TIME_SAVINGS[toolTier] ?? 0
    const skillReduction = skillStore.getSkill('fishing').level * SKILL_TIME_REDUCTION_PER_LEVEL
    return Math.max(MIN_ACTION_MINUTES, Math.round((baseMin - saving) * (1 - skillReduction))) / 60
  })

  const currentLocationName = computed(() => {
    return FISHING_LOCATIONS.find(l => l.id === fishingStore.fishingLocation)?.name ?? 'dòng suối'
  })

  const currentLocationDesc = computed(() => {
    return FISHING_LOCATIONS.find(l => l.id === fishingStore.fishingLocation)?.description ?? ''
  })

  const rodTierName = computed(() => {
    const tier = inventoryStore.getTool?.('fishingRod')?.tier ?? 'basic'
    const names: Record<string, string> = { basic: 'Cột tre', iron: 'thanh sắt', steel: 'cột thép', iridium: 'Thanh Iridium' }
    return names[tier] ?? tier
  })

  const canEquipTackle = computed(() => {
    const tier = inventoryStore.getTool?.('fishingRod')?.tier ?? 'basic'
    return tier !== 'basic'
  })

  const ALL_BAIT_TYPES: BaitType[] = ['standard_bait', 'wild_bait', 'magic_bait', 'deluxe_bait', 'targeted_bait']
  const availableBaits = computed(() => {
    return ALL_BAIT_TYPES.map(id => ({ id, name: getBaitById(id)?.name ?? id, count: inventoryStore.getItemCount(id) })).filter(
      b => b.count > 0
    )
  })

  const availableTackles = computed(() => {
    const tackleTypes: TackleType[] = ['spinner', 'trap_bobber', 'cork_bobber', 'quality_bobber', 'lead_bobber']
    if (!canEquipTackle.value) return []
    return tackleTypes
      .map(id => ({ id, name: getTackleById(id)?.name ?? id, count: inventoryStore.getItemCount(id) }))
      .filter(t => t.count > 0)
  })

  const hasCrabPotInBag = computed(() => inventoryStore.getItemCount('crab_pot') > 0)

  const crabPotLocations = computed(() => {
    const result: { id: string; name: string; total: number; baited: number }[] = []
    for (const loc of FISHING_LOCATIONS) {
      const info = fishingStore.crabPotsByLocation[loc.id as FishingLocation]
      if (info) {
        result.push({ id: loc.id, name: loc.name, total: info.total, baited: info.baited })
      }
    }
    return result
  })

  const PAN_LOCATIONS: FishingLocation[] = ['creek', 'river', 'waterfall']
  const canPan = computed(() => gameStore.isRainy && PAN_LOCATIONS.includes(fishingStore.fishingLocation))
  const panDisabledReason = computed(() => {
    if (!gameStore.isRainy) return 'Phải có ngày mưa mới đãi vàng (vàng cát lộ ra khi nước sông dâng cao).'
    if (!PAN_LOCATIONS.includes(fishingStore.fishingLocation)) return 'Không thể đào vàng ở vị trí hiện tại. Bạn cần đi đến suối, sông hoặc thác nước.'
    return ''
  })

  const DIFFICULTY_NAMES: Record<string, string> = {
    easy: 'Dễ',
    normal: 'Thường',
    hard: 'Khó',
    legendary: 'Truyền thuyết'
  }
  const DIFFICULTY_COLORS: Record<string, string> = {
    easy: 'text-success',
    normal: 'text-muted',
    hard: 'text-danger',
    legendary: 'text-accent'
  }

  const SEASON_LABEL: Record<string, string> = { spring: 'Xuân', summer: 'Hạ', autumn: 'Thu', winter: 'Đông' }
  const WEATHER_LABEL: Record<string, string> = {
    any: 'Bất kỳ',
    sunny: 'Nắng',
    rainy: 'Mưa',
    stormy: 'Mưa bão',
    snowy: 'Tuyết',
    windy: 'Gió lớn'
  }

  // === Helpers ===

  const getBaitName = (type: BaitType): string => getBaitById(type)?.name ?? type
  const getTackleName = (type: TackleType): string => getTackleById(type)?.name ?? type

  // === Location ===

  const handleSetLocation = (loc: FishingLocation) => {
    fishingStore.setLocation(loc)
    sfxClick()
  }

  // === Equipment ===

  const handleEquipBaitFromModal = (baitId: BaitType) => {
    const result = fishingStore.equipBait(baitId)
    addLog(result.message)
    showBaitModal.value = false
  }

  const handleUnequipBait = () => {
    const msg = fishingStore.unequipBait()
    addLog(msg)
  }

  const handleEquipTackleFromModal = (tackleId: TackleType) => {
    const result = fishingStore.equipTackle(tackleId)
    addLog(result.message)
    showTackleModal.value = false
  }

  const handleUnequipTackle = () => {
    const msg = fishingStore.unequipTackle()
    addLog(msg)
  }

  // === Fishing ===

  const handleStartFishing = () => {
    if (gameStore.isPastBedtime) {
      addLog('Đã quá muộn để câu cá.')
      handleEndDay()
      return
    }
    if (!inventoryStore.isToolAvailable('fishingRod')) {
      addLog('Cần câu đang nâng cấp nên không câu được.')
      return
    }
    const result = fishingStore.startFishing()
    if (result.success) {
      sfxClick()
      const tr = gameStore.advanceTime(fishTime.value)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) {
        handleEndDay()
        return
      }
      if (result.junk) {
        // 垃圾直接入包，不进入小游戏
        lastResult.value = result.message
      } else {
        miniGameParams.value = fishingStore.calculateMiniGameParams()
        miniGameCompleted.value = false
        showCloseConfirm.value = false
        showFishingModal.value = true
      }
    }
    addLog(result.message)
    if (!result.success) {
      lastResult.value = result.message
    }
  }

  const QUALITY_NAMES: Record<Quality, string> = {
    normal: 'Thường',
    fine: 'Tốt',
    excellent: 'chất lượng cao',
    supreme: 'Hoàn hảo'
  }

  const QUALITY_COLORS: Record<Quality, string> = {
    normal: 'text-muted',
    fine: 'text-quality-fine',
    excellent: 'text-quality-excellent',
    supreme: 'text-quality-supreme'
  }

  const handleMiniGameComplete = (result: MiniGameResult) => {
    miniGameCompleted.value = true

    const ratingNames: Record<string, string> = {
      perfect: 'Hoàn hảo',
      excellent: 'Xuất sắc',
      good: 'Tốt',
      poor: 'Thất bại'
    }
    addLog(`Đánh giá trò chơi nhỏ:${ratingNames[result.rating]}!`)

    const catchData = fishingStore.completeFishing(result.rating)
    if (catchData) {
      addLog(catchData.message)
      lastResult.value = catchData.message
      if (catchData.success) sfxFishCatch()
      else sfxLineBroken()

      // 显示结果弹窗
      catchResult.value = {
        fishName: catchData.fishName ?? '',
        fishId: catchData.fishId,
        difficulty: catchData.difficulty,
        sellPrice: catchData.sellPrice,
        description: catchData.description,
        quality: catchData.quality,
        quantity: catchData.quantity,
        success: catchData.success,
        message: catchData.message
      }
    }

    showFishingModal.value = false
    showCloseConfirm.value = false
    miniGameParams.value = null
  }

  const dismissCatchResult = () => {
    catchResult.value = null
  }

  const handleCloseFishingModal = () => {
    if (!miniGameCompleted.value) {
      showCloseConfirm.value = true
    } else {
      showFishingModal.value = false
      miniGameParams.value = null
    }
  }

  const handleConfirmClose = () => {
    showCloseConfirm.value = false
    showFishingModal.value = false
    miniGameParams.value = null
    lastResult.value = 'Tôi bỏ câu cá và cá bỏ chạy.'
    addLog('Tôi bỏ câu cá và cá bỏ chạy.')
  }

  // === Crab Pots ===

  const handlePlaceCrabPot = () => {
    const result = fishingStore.placeCrabPot(fishingStore.fishingLocation)
    addLog(result.message)
  }

  const handleRemoveCrabPot = (locId: string) => {
    const result = fishingStore.removeCrabPot(locId as FishingLocation)
    addLog(result.message)
  }

  const handleBaitCrabPots = (locId: string) => {
    const result = fishingStore.baitCrabPots(locId as FishingLocation)
    addLog(result.message)
  }

  // === Panning ===

  const handlePan = () => {
    if (gameStore.isPastBedtime) {
      addLog('Đã quá muộn để giành lấy vàng.')
      handleEndDay()
      return
    }

    if (!inventoryStore.isToolAvailable('pan')) {
      addLog('Chảo vàng đang được nâng cấp nên không thể đãi vàng được.')
      return
    }

    const panMultiplier = inventoryStore.getToolStaminaMultiplier('pan')
    const cost = Math.max(1, Math.floor(4 * panMultiplier))
    if (!playerStore.consumeStamina(cost)) {
      addLog('Thể chất không đủ khỏe để đãi vàng.')
      return
    }

    const panTier = inventoryStore.getTool('pan')?.tier ?? 'basic'
    const tiers: string[] = ['basic', 'iron', 'steel', 'iridium']
    const tierIndex = tiers.indexOf(panTier)

    const roll = Math.random()
    let itemId: string
    let qty = 1
    let name: string

    if (roll < 0.4) {
      itemId = 'copper_ore'
      qty = 1
      name = 'mỏ đồng'
    } else if (roll < 0.62) {
      itemId = tierIndex >= 1 ? 'iron_ore' : 'copper_ore'
      qty = 1
      name = tierIndex >= 1 ? 'quặng sắt' : 'mỏ đồng'
    } else if (roll < 0.75) {
      itemId = tierIndex >= 2 ? 'gold_ore' : 'iron_ore'
      qty = 1
      name = tierIndex >= 2 ? 'mỏ vàng' : 'quặng sắt'
    } else if (roll < 0.84) {
      itemId = 'quartz'
      qty = 1
      name = 'Thạch anh'
    } else if (roll < 0.9) {
      itemId = 'jade'
      qty = 1
      name = 'Ngọc bích'
    } else if (roll < 0.95) {
      itemId = 'ruby'
      qty = 1
      name = 'Hồng ngọc'
    } else {
      const goldNuggetChance = tierIndex >= 3 ? 0.12 : 0.04
      if (Math.random() < goldNuggetChance / 0.05) {
        itemId = 'gold_nugget'
        qty = 1
        name = 'cát vàng'
      } else {
        itemId = 'copper_ore'
        qty = 1
        name = 'mỏ đồng'
      }
    }

    inventoryStore.addItem(itemId, qty)
    achievementStore.discoverItem(itemId)
    skillStore.addExp('mining', 5)
    panResult.value = `Hiểu rồi${name}!(-${cost}sức mạnh thể chất)`
    addLog(`cơn sốt vàng đã đạt được${name}.(-${cost}sức mạnh thể chất)`)

    const tr = gameStore.advanceTime(panTime.value)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  }
</script>
