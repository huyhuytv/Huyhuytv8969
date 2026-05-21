<template>
  <div class="border-b border-accent/30 pb-2 md:pb-3 flex flex-col space-y-1" role="region" aria-label="Thanh trạng thái nhân vật và trò chơi">
    <!-- 第一行：日期时间天气 + 铜钱 -->
    <div class="flex items-center justify-between text-xs md:text-sm">
      <div class="flex items-center space-x-2 md:space-x-3">
        <span class="text-accent font-bold">{{ $t('status_bar.game_title') }}</span>
        <span class="text-muted text-xs max-w-16 truncate" :aria-label="'Tên người chơi: ' + playerStore.playerName">{{ playerStore.playerName }}</span>
        <span class="hidden md:inline" :aria-label="'Năm: ' + gameStore.year">{{ $t('menu.year', { year: gameStore.year }) }}</span>
        <span :aria-label="'Mùa ' + SEASON_NAMES[gameStore.season] + ', Ngày ' + gameStore.day">{{ SEASON_NAMES[gameStore.season] }} {{ $t('menu.day', { day: gameStore.day }) }}</span>
        <span class="text-muted hidden md:inline" :aria-label="'Thứ ' + gameStore.weekdayName">({{ gameStore.weekdayName }})</span>
        <span :class="{ 'text-danger': gameStore.isLateNight }" :aria-label="'Thời gian game: ' + gameStore.timeDisplay">{{ gameStore.timeDisplay }}</span>
        <span class="text-muted" :aria-label="'Thời tiết: ' + WEATHER_NAMES[gameStore.weather]">{{ WEATHER_NAMES[gameStore.weather] }}</span>
      </div>
      <span class="text-accent shrink-0" :aria-label="'Số tiền: ' + playerStore.money + ' đồng vàng'">
        <Coins :size="12" class="inline" aria-hidden="true" />
        {{ playerStore.money }}{{ $t('status_bar.money_unit') }}
      </span>
    </div>

    <!-- 第二行：状态条 + 音频控制 -->
    <div class="flex items-center justify-between text-xs flex-wrap">
      <div class="flex items-center space-x-2 md:space-x-4 flex-wrap">
        <!-- 体力 -->
        <div class="flex items-center space-x-1" :aria-label="'Thể lực: ' + playerStore.stamina + ' trên ' + playerStore.maxStamina">
          <span :class="{ 'text-danger stamina-critical': playerStore.isExhausted }">
            <Zap :size="12" class="inline" aria-hidden="true" />
            {{ playerStore.stamina }}/{{ playerStore.maxStamina }}
          </span>
          <div 
            class="w-14 md:w-20 h-2 bg-bg rounded-xs border border-accent/20"
            role="progressbar"
            :aria-valuenow="playerStore.stamina"
            aria-valuemin="0"
            :aria-valuemax="playerStore.maxStamina"
            :aria-label="'Tiến trình thể lực: ' + playerStore.staminaPercent + '%'"
          >
            <div
              class="h-full rounded-xs transition-all duration-300"
              :class="staminaBarColor"
              :style="{ width: playerStore.staminaPercent + '%' }"
            />
          </div>
        </div>
        <!-- HP（矿洞或受伤时显示） -->
        <div v-if="showHpBar" class="flex items-center space-x-1" :aria-label="'Máu HP: ' + playerStore.hp + ' trên ' + playerStore.getMaxHp()">
          <span :class="{ 'text-danger stamina-critical': playerStore.getIsLowHp() }">
            <Heart :size="12" class="inline" aria-hidden="true" />
            {{ playerStore.hp }}/{{ playerStore.getMaxHp() }}
          </span>
          <div 
            class="w-12 md:w-16 h-2 bg-bg rounded-xs border border-accent/20"
            role="progressbar"
            :aria-valuenow="playerStore.hp"
            aria-valuemin="0"
            :aria-valuemax="playerStore.getMaxHp()"
            :aria-label="'Tiến trình máu HP: ' + playerStore.getHpPercent() + '%'"
          >
            <div
              class="h-full rounded-xs transition-all duration-300"
              :class="hpBarColor"
              :style="{ width: playerStore.getHpPercent() + '%' }"
            />
          </div>
        </div>
        <!-- 剩余时间 -->
        <div class="flex items-center space-x-1" :aria-label="'Thời gian còn lại trong ngày lẻ: ' + timePercent + '%'">
          <Clock :size="12" class="tinline" aria-hidden="true" />
          <div 
            class="w-12 md:w-16 h-2 bg-bg rounded-xs border border-accent/20"
            role="progressbar"
            :aria-valuenow="timePercent"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="'Tiến trình thời gian còn lại: ' + timePercent + '%'"
          >
            <div class="h-full rounded-xs transition-all duration-300" :class="timeBarColor" :style="{ width: timePercent + '%' }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useGameStore, SEASON_NAMES, WEATHER_NAMES } from '@/stores/useGameStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { DAY_START_HOUR, DAY_END_HOUR } from '@/data/timeConstants'
  import { Zap, Heart, Clock, Coins } from 'lucide-vue-next'

  const gameStore = useGameStore()
  const playerStore = usePlayerStore()

  const staminaBarColor = computed(() => {
    const pct = playerStore.staminaPercent
    if (pct <= 12) return 'bg-danger stamina-critical'
    if (pct <= 35) return 'bg-danger'
    if (pct <= 60) return 'bg-accent'
    return 'bg-success'
  })

  /** HP 条是否显示：在矿洞中或HP不满 */
  const showHpBar = computed(() => {
    return gameStore.currentLocationGroup === 'mine' || playerStore.hp < playerStore.getMaxHp()
  })

  const hpBarColor = computed(() => {
    const pct = playerStore.getHpPercent()
    if (pct <= 25) return 'bg-danger stamina-critical'
    if (pct <= 60) return 'bg-danger'
    return 'bg-success'
  })

  /** 剩余时间百分比 */
  const timePercent = computed(() => {
    const total = DAY_END_HOUR - DAY_START_HOUR // 20 hours
    const remaining = DAY_END_HOUR - gameStore.hour
    return Math.max(0, Math.round((remaining / total) * 100))
  })

  const timeBarColor = computed(() => {
    if (gameStore.isLateNight) return 'bg-danger'
    if (timePercent.value <= 25) return 'bg-danger'
    if (timePercent.value <= 50) return 'bg-accent'
    return 'bg-success'
  })
</script>

<style scoped>
  /* 体力条闪烁 */
  @keyframes staminaPulse {
    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.4;
    }
  }

  .stamina-critical {
    animation: staminaPulse 1s ease-in-out infinite;
  }
</style>
