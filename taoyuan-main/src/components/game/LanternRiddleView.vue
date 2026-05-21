<template>
  <div class="game-panel max-w-sm w-full">
    <h3 class="text-accent text-sm mb-3 flex items-center space-x-1">
      <Lightbulb :size="14" />
      <span>{{ $t('lantern_riddle.title') }}</span>
    </h3>

    <!-- 准备 -->
    <div v-if="phase === 'ready'">
      <p class="text-xs text-muted mb-3">{{ $t('lantern_riddle.desc') }}</p>
      <Button class="w-full" @click="startGame">{{ $t('lantern_riddle.btn_start') }}</Button>
    </div>

    <!-- 展示灯笼 -->
    <div v-else-if="phase === 'showing'" class="text-center py-4">
      <div class="lantern-drop mb-3">
        <div class="inline-block border-2 border-accent/50 px-6 py-3">
          <Lamp :size="20" class="text-accent mx-auto mb-1" />
          <p class="text-accent text-xs">{{ $t('lantern_riddle.question_num', { num: currentIndex + 1 }) }}</p>
        </div>
      </div>
      <!-- 进度点 -->
      <div class="flex justify-center space-x-2 mt-2">
        <div v-for="i in 5" :key="i" class="w-2 h-2" :class="dotClass(i - 1)" />
      </div>
    </div>

    <!-- 答题中 -->
    <div v-else-if="phase === 'answering'">
      <!-- 进度点 + 倒计时 -->
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center space-x-1.5">
          <div v-for="i in 5" :key="i" class="w-2 h-2" :class="dotClass(i - 1)" />
        </div>
        <p class="text-xs" :class="countdown <= 3 ? 'text-danger time-pulse' : 'text-accent'">
          <Timer :size="12" class="inline -mt-0.5" />
          {{ countdown }}s
        </p>
      </div>

      <!-- 倒计时条 -->
      <div class="h-1 bg-bg border border-accent/20 mb-3">
        <div
          class="h-full transition-all duration-1000 ease-linear"
          :class="countdown <= 3 ? 'bg-danger/60' : 'bg-accent/60'"
          :style="{ width: `${(countdown / currentTimeLimit) * 100}%` }"
        />
      </div>

      <!-- 谜面 -->
      <div class="border border-accent/30 p-3 mb-3 text-center">
        <p class="text-xs text-muted mb-1">{{ $t('lantern_riddle.riddle') }}</p>
        <p class="text-xs text-text leading-relaxed">{{ currentRiddle.question }}</p>
      </div>

      <!-- 选项 -->
      <div class="flex flex-col space-y-2">
        <Button
          v-for="(opt, i) in currentRiddle.options"
          :key="i"
          class="text-left w-full"
          :disabled="answered"
          :class="{ 'opacity-50': answered }"
          @click="answer(i)"
        >
          <span class="text-accent mr-1">{{ getLetter(i) }}.</span>
          {{ opt }}
        </Button>
      </div>
    </div>

    <!-- 单题结果 -->
    <div v-else-if="phase === 'result'" class="text-center">
      <!-- 进度点 -->
      <div class="flex justify-center space-x-1.5 mb-3">
        <div v-for="i in 5" :key="i" class="w-2 h-2" :class="dotClass(i - 1)" />
      </div>

      <div :class="lastCorrect ? 'correct-flash' : 'wrong-shake'" class="mb-3 py-3 border border-accent/20">
        <p class="text-sm mb-1" :class="lastCorrect ? 'text-success' : 'text-danger'">
          {{ lastCorrect ? $t('lantern_riddle.correct') + $t('status_bar.money_unit') : $t('lantern_riddle.wrong') }}
        </p>
        <p class="text-xs text-muted mt-1">
          {{ $t('lantern_riddle.correct_ans_is') }}
          <span class="text-accent">{{ currentRiddle.options[currentRiddle.answer] }}</span>
        </p>
      </div>
      <p class="text-xs text-muted">
        {{ $t('lantern_riddle.current_score') }}
        <span class="text-accent">{{ score }}</span>
        {{ $t('status_bar.money_unit') }}
      </p>
    </div>

    <!-- 最终结果 -->
    <div v-else>
      <p class="text-xs text-muted mb-2">{{ $t('lantern_riddle.end_title') }}</p>

      <!-- 进度点（最终状态） -->
      <div class="flex justify-center space-x-1.5 mb-3">
        <div v-for="i in 5" :key="i" class="w-2 h-2" :class="dotClass(i - 1)" />
      </div>

      <div class="border border-accent/20 p-3 mb-3 text-center">
        <p class="text-xs mb-1">
          {{ $t('lantern_riddle.correct_count') }}
          <span class="text-success">{{ correctCount }}</span>
          / 5
        </p>
        <p class="text-xs">
          {{ $t('lantern_riddle.total_prize') }}
          <span class="text-accent">{{ score }}</span>
          {{ $t('status_bar.money_unit') }}
          <span v-if="correctCount === 5" class="text-accent finish-flash">{{ $t('lantern_riddle.all_clear') }}</span>
        </p>
      </div>
      <Button class="w-full" @click="handleClaim">{{ $t('lantern_riddle.btn_claim') }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onUnmounted } from 'vue'
  import { Lightbulb, Lamp, Timer } from 'lucide-vue-next'
  import {
    sfxGameStart,
    sfxRewardClaim,
    sfxCountdownTick,
    sfxCountdownFinal,
    sfxRiddleReveal,
    sfxRiddleWrong,
    sfxMiniGood,
    sfxMiniPerfect
  } from '@/composables/useAudio'
  import Button from '@/components/game/Button.vue'
  import i18n from '@/locales'

  const emit = defineEmits<{ complete: [prize: number] }>()

  type Phase = 'ready' | 'showing' | 'answering' | 'result' | 'finished'
  const phase = ref<Phase>('ready')

  interface Riddle {
    question: string
    options: string[]
    answer: number
  }

  // 获取灯谜池
  const getRiddlePool = (): Riddle[] => {
    return i18n.global.tm('lantern_riddle.riddles') as Riddle[]
  }

  const getLetter = (index: number): string => {
    const letters = i18n.global.tm('lantern_riddle.letters') as string[]
    return letters[index] || ''
  }

  /** 前2题7秒，后3题6秒 */
  const currentTimeLimit = ref(7)

  const gameRiddles = ref<Riddle[]>([])
  const currentIndex = ref(0)
  const countdown = ref(7)
  const score = ref(0)
  const correctCount = ref(0)
  const lastCorrect = ref(false)
  const answered = ref(false)
  const results = ref<(boolean | null)[]>([null, null, null, null, null])

  let countdownTimer: ReturnType<typeof setInterval> | null = null
  const phaseTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

  const currentRiddle = ref<Riddle>({ question: '', options: [], answer: 0 })

  const dotClass = (idx: number) => {
    const r = results.value[idx]
    if (r === true) return 'bg-success'
    if (r === false) return 'bg-danger'
    if (idx === currentIndex.value && phase.value !== 'finished') return 'bg-accent dot-pulse'
    return 'bg-accent/20'
  }

  const pickRiddles = (): Riddle[] => {
    const pool = [...getRiddlePool()]
    const picked: Riddle[] = []
    for (let i = 0; i < 5; i++) {
      if (pool.length === 0) break
      const idx = Math.floor(Math.random() * pool.length)
      picked.push(pool.splice(idx, 1)[0]!)
    }
    return picked
  }

  const startGame = () => {
    sfxGameStart()
    gameRiddles.value = pickRiddles()
    currentIndex.value = 0
    score.value = 0
    correctCount.value = 0
    results.value = [null, null, null, null, null]
    showNextRiddle()
  }

  const showNextRiddle = () => {
    currentRiddle.value = gameRiddles.value[currentIndex.value]!
    answered.value = false
    currentTimeLimit.value = currentIndex.value < 2 ? 7 : 6
    sfxRiddleReveal()
    phase.value = 'showing'
    phaseTimeout.value = setTimeout(() => {
      phase.value = 'answering'
      countdown.value = currentTimeLimit.value
      countdownTimer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 3 && countdown.value > 0) sfxCountdownFinal()
        else if (countdown.value > 3) sfxCountdownTick()
        if (countdown.value <= 0) {
          answer(-1)
        }
      }, 1000)
    }, 800)
  }

  const answer = (choice: number) => {
    if (answered.value) return
    answered.value = true

    if (countdownTimer) clearInterval(countdownTimer)
    countdownTimer = null

    const correct = choice === currentRiddle.value.answer
    lastCorrect.value = correct
    results.value[currentIndex.value] = correct
    if (correct) {
      sfxMiniGood()
      correctCount.value++
      score.value += 100
    } else {
      sfxRiddleWrong()
    }
    phase.value = 'result'

    phaseTimeout.value = setTimeout(() => {
      currentIndex.value++
      if (currentIndex.value >= 5) {
        if (correctCount.value === 5) {
          score.value += 300
          sfxMiniPerfect()
        }
        phase.value = 'finished'
      } else {
        showNextRiddle()
      }
    }, 1500)
  }

  const handleClaim = () => {
    sfxRewardClaim()
    emit('complete', score.value)
  }

  onUnmounted(() => {
    if (countdownTimer) clearInterval(countdownTimer)
    if (phaseTimeout.value) clearTimeout(phaseTimeout.value)
  })
</script>

<style scoped>
  .lantern-drop {
    animation: lantern-drop 0.6s ease-out;
  }

  @keyframes lantern-drop {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    60% {
      transform: translateY(3px);
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

  .time-pulse {
    animation: time-pulse 0.5s ease-in-out infinite;
  }

  @keyframes time-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .correct-flash {
    animation: correct-flash 0.4s ease-in-out;
  }

  @keyframes correct-flash {
    0% {
      background-color: transparent;
    }
    30% {
      background-color: rgba(90, 158, 111, 0.2);
    }
    100% {
      background-color: transparent;
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
      transform: translateX(-4px);
    }
    40% {
      transform: translateX(4px);
    }
    60% {
      transform: translateX(-3px);
    }
    80% {
      transform: translateX(3px);
    }
  }

  .finish-flash {
    animation: finish-flash 0.6s ease-in-out 3;
  }

  @keyframes finish-flash {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
</style>
