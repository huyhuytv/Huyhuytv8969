<template>
  <div class="game-panel max-w-sm w-full">
    <h3 class="text-accent text-sm mb-3 flex items-center space-x-1">
      <Target :size="14" />
      <span>{{ $t('pot_throwing.title') }}</span>
    </h3>

    <!-- 准备 -->
    <div v-if="phase === 'ready'">
      <p class="text-xs text-muted mb-3">{{ $t('pot_throwing.desc') }}</p>
      <Button class="w-full" @click="startGame">{{ $t('pot_throwing.btn_start') }}</Button>
    </div>

    <!-- 瞄准中 -->
    <div v-else-if="phase === 'aiming'">
      <div class="flex items-center justify-between mb-2">
        <p class="text-xs text-muted">{{ $t('pot_throwing.throw_x_of_y', { current: throwIndex + 1, total: 5 }) }}</p>
        <p class="text-xs text-muted">
          {{ $t('pot_throwing.total_score') }}
          <span class="text-accent">{{ totalScore }}</span>
        </p>
      </div>

      <!-- 投掷进度点 -->
      <div class="flex justify-center space-x-1.5 mb-3">
        <div v-for="i in 5" :key="i" class="w-2 h-2" :class="throwDotClass(i - 1)" />
      </div>

      <!-- 瞄准条 -->
      <div class="relative h-8 bg-bg border border-accent/20 mb-2">
        <!-- 区域着色 -->
        <div class="absolute inset-0 flex">
          <div class="flex-1 bg-danger/5" />
          <div class="flex-1 bg-success/5" />
          <div class="flex-1 bg-accent/10" />
          <div class="flex-1 bg-success/5" />
          <div class="flex-1 bg-danger/5" />
        </div>
        <!-- 中心区域标记 -->
        <div class="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 border-x border-success/40" />
        <div class="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 bg-accent/25" />
        <!-- 摆动指针 -->
        <div class="absolute top-0 bottom-0 w-1 bg-accent" :style="{ left: `${aimPosition}%`, transition: 'none' }" />
        <!-- 区域标签 -->
        <div class="absolute bottom-0 w-full flex text-center" style="font-size: 9px">
          <span class="flex-1 text-danger/40">{{ $t('pot_throwing.far') }}</span>
          <span class="flex-1 text-success/40">{{ $t('pot_throwing.near') }}</span>
          <span class="flex-1 text-accent/60">{{ $t('pot_throwing.center') }}</span>
          <span class="flex-1 text-success/40">{{ $t('pot_throwing.near') }}</span>
          <span class="flex-1 text-danger/40">{{ $t('pot_throwing.far') }}</span>
        </div>
      </div>

      <!-- 壶 -->
      <div class="text-center mb-3">
        <div class="inline-block border-2 border-accent/40 px-4 py-2 relative">
          <div class="text-accent text-sm">{{ $t('pot_throwing.pot') }}</div>
          <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-1 border border-accent/40 bg-panel" />
        </div>
      </div>

      <Button class="w-full py-2" :icon="ArrowUp" @click="throwArrow">{{ $t('pot_throwing.btn_throw') }}</Button>
    </div>

    <!-- 投掷动画 -->
    <div v-else-if="phase === 'throwing'" class="text-center py-6">
      <div class="arrow-fly mb-3">
        <ArrowUp :size="24" class="text-accent mx-auto" />
      </div>
    </div>

    <!-- 单次结果 -->
    <div v-else-if="phase === 'hit'" class="text-center py-2">
      <!-- 投掷进度点 -->
      <div class="flex justify-center space-x-1.5 mb-3">
        <div v-for="i in 5" :key="i" class="w-2 h-2" :class="throwDotClass(i - 1)" />
      </div>

      <div :class="lastResult === 'bullseye' ? 'pot-hit' : lastResult === 'good' ? '' : 'wrong-shake'">
        <p
          class="text-sm mb-1"
          :class="{
            'text-accent': lastResult === 'bullseye',
            'text-success': lastResult === 'good',
            'text-danger': lastResult === 'miss'
          }"
        >
          {{ lastResult === 'bullseye' ? $t('pot_throwing.hit_bullseye') : lastResult === 'good' ? $t('pot_throwing.hit_good') : $t('pot_throwing.hit_miss') }}
        </p>
        <p
          class="text-xs score-pop"
          :class="{
            'text-accent': lastResult === 'bullseye',
            'text-success': lastResult === 'good',
            'text-muted': lastResult === 'miss'
          }"
        >
          {{ $t('pot_throwing.score_earned', { score: lastScore }) }}
        </p>
      </div>
    </div>

    <!-- 最终结果 -->
    <div v-else>
      <p class="text-xs text-muted mb-2">{{ $t('pot_throwing.end_title') }}</p>

      <!-- 投掷进度点（最终） -->
      <div class="flex justify-center space-x-1.5 mb-3">
        <div v-for="i in 5" :key="i" class="w-2 h-2" :class="throwDotClass(i - 1)" />
      </div>

      <div class="border border-accent/20 p-2 mb-3">
        <div
          v-for="(r, i) in throwResults"
          :key="i"
          class="flex items-center justify-between text-xs py-0.5 border-b border-accent/10 last:border-0"
        >
          <span class="text-muted">{{ $t('pot_throwing.throw_idx', { index: i + 1 }) }}</span>
          <span
            :class="{
              'text-accent': r.result === 'bullseye',
              'text-success': r.result === 'good',
              'text-danger': r.result === 'miss'
            }"
          >
            {{ r.result === 'bullseye' ? $t('pot_throwing.grade_bullseye') : r.result === 'good' ? $t('pot_throwing.grade_good') : $t('pot_throwing.grade_miss') }}
          </span>
          <span class="text-muted">{{ $t('pot_throwing.points', { score: r.score }) }}</span>
        </div>
      </div>

      <div class="border border-accent/20 p-2 mb-3 text-center">
        <p class="text-xs mb-1">
          {{ $t('pot_throwing.total_score') }}
          <span class="text-accent">{{ totalScore }}</span>
          / 500
        </p>
        <p class="text-xs">
          {{ $t('pot_throwing.prize') }}
          <span class="text-accent">{{ prize }}</span>
          {{ $t('status_bar.money_unit') }}
        </p>
      </div>
      <Button class="w-full" @click="handleClaim">{{ $t('pot_throwing.btn_claim') }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onUnmounted } from 'vue'
  import { Target, ArrowUp } from 'lucide-vue-next'
  import {
    sfxGameStart,
    sfxArrowFly,
    sfxPotClang,
    sfxMiniGood,
    sfxMiniFail,
    sfxRankFirst,
    sfxRankSecond,
    sfxRewardClaim
  } from '@/composables/useAudio'
  import Button from '@/components/game/Button.vue'

  const emit = defineEmits<{ complete: [prize: number] }>()

  type Phase = 'ready' | 'aiming' | 'throwing' | 'hit' | 'finished'
  type ThrowResult = 'bullseye' | 'good' | 'miss'

  const phase = ref<Phase>('ready')
  const throwIndex = ref(0)
  const aimPosition = ref(50)
  const totalScore = ref(0)
  const lastResult = ref<ThrowResult>('miss')
  const lastScore = ref(0)
  const throwResults = ref<{ result: ThrowResult; score: number }[]>([])

  let aimTimer: ReturnType<typeof setInterval> | null = null
  let phaseTimeout: ReturnType<typeof setTimeout> | null = null
  let aimDirection = 1

  /** 难度随回合递增: 第1投2.0 → 第5投4.0 */
  const getAimSpeed = () => 2.0 + throwIndex.value * 0.5

  const prize = computed(() => {
    if (totalScore.value >= 500) return 800
    if (totalScore.value >= 300) return 500
    if (totalScore.value >= 100) return 200
    return 50
  })

  const throwDotClass = (idx: number) => {
    if (idx >= throwResults.value.length) {
      if (idx === throwIndex.value && phase.value !== 'finished') return 'bg-accent dot-pulse'
      return 'bg-accent/20'
    }
    const r = throwResults.value[idx]!
    if (r.result === 'bullseye') return 'bg-accent'
    if (r.result === 'good') return 'bg-success'
    return 'bg-danger'
  }

  const startGame = () => {
    sfxGameStart()
    throwIndex.value = 0
    totalScore.value = 0
    throwResults.value = []
    startAiming()
  }

  const startAiming = () => {
    phase.value = 'aiming'
    aimPosition.value = 0
    aimDirection = 1

    aimTimer = setInterval(() => {
      aimPosition.value += getAimSpeed() * aimDirection
      if (aimPosition.value >= 100) {
        aimPosition.value = 100
        aimDirection = -1
      } else if (aimPosition.value <= 0) {
        aimPosition.value = 0
        aimDirection = 1
      }
    }, 30)
  }

  const throwArrow = () => {
    sfxArrowFly()
    if (aimTimer) clearInterval(aimTimer)
    aimTimer = null

    // 计算偏移（50为中心）
    const offset = Math.abs(aimPosition.value - 50)
    let result: ThrowResult
    let score: number

    if (offset <= 5) {
      result = 'bullseye'
      score = 100
    } else if (offset <= 15) {
      result = 'good'
      score = 60
    } else {
      result = 'miss'
      score = 10
    }

    lastResult.value = result
    lastScore.value = score
    totalScore.value += score
    throwResults.value.push({ result, score })

    phase.value = 'throwing'
    phaseTimeout = setTimeout(() => {
      // 命中结果音效
      if (result === 'bullseye') sfxPotClang()
      else if (result === 'good') sfxMiniGood()
      else sfxMiniFail()
      phase.value = 'hit'
      phaseTimeout = setTimeout(() => {
        throwIndex.value++
        if (throwIndex.value >= 5) {
          phase.value = 'finished'
          // 最终排名音效
          if (totalScore.value >= 500) sfxRankFirst()
          else if (totalScore.value >= 300) sfxRankSecond()
        } else {
          startAiming()
        }
      }, 1200)
    }, 600)
  }

  const handleClaim = () => {
    sfxRewardClaim()
    emit('complete', prize.value)
  }

  onUnmounted(() => {
    if (aimTimer) clearInterval(aimTimer)
    if (phaseTimeout) clearTimeout(phaseTimeout)
  })
</script>

<style scoped>
  .arrow-fly {
    animation: arrow-fly 0.5s ease-in;
  }

  @keyframes arrow-fly {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-30px) scale(0.6);
      opacity: 0.3;
    }
  }

  .pot-hit {
    animation: pot-hit 0.4s ease-in-out;
  }

  @keyframes pot-hit {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.1);
    }
    60% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }

  .score-pop {
    animation: score-pop 0.5s ease-out;
  }

  @keyframes score-pop {
    0% {
      transform: translateY(5px);
      opacity: 0;
    }
    50% {
      transform: translateY(-3px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .dot-pulse {
    animation: dot-pulse 1s ease-in-out infinite;
  }

  @keyframes dot-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  .wrong-shake {
    animation: wrong-shake 0.4s ease-in-out;
  }

  @keyframes wrong-shake {
    0%,
    100% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-3px);
    }
    40% {
      transform: translateX(3px);
    }
    60% {
      transform: translateX(-2px);
    }
    80% {
      transform: translateX(2px);
    }
  }
</style>
