<template>
  <div class="game-panel max-w-xs w-full">
    <Divider title class="!mb-1" :label="$t('buckshot.title')" />

    <!-- 弹仓信息 -->
    <div class="border border-accent/20 rounded-xs p-2 mb-3">
      <div class="flex items-center justify-between text-xs">
        <span class="text-muted">{{ $t('buckshot.magazine') }}</span>
        <span>
          <span v-for="i in liveRemaining" :key="'l' + i" class="text-danger">&bull;</span>
          <span v-for="i in blankRemaining" :key="'b' + i" class="text-muted">&bull;</span>
          <span class="text-muted ml-1">({{ $t('buckshot.live', { count: liveRemaining }) }}{{ $t('buckshot.blank', { count: blankRemaining }) }})</span>
        </span>
      </div>
      <div class="flex items-center justify-between text-xs mt-0.5">
        <span class="text-muted">{{ $t('buckshot.progress') }}</span>
        <span>{{ $t('buckshot.shot_x_of_y', { current: shellIndex + 1, total: shells.length }) }}</span>
      </div>
    </div>

    <!-- HP 显示 -->
    <div class="flex items-center space-x-3 mb-3">
      <!-- 玩家HP -->
      <div class="flex-1">
        <div class="flex items-center justify-between text-xs mb-0.5">
          <span :class="isPlayerTurn && !gameOver ? 'text-accent' : 'text-muted'">{{ $t('buckshot.you') }}</span>
          <span class="text-text">{{ playerHP }}/{{ maxPlayerHP }}</span>
        </div>
        <div class="h-1.5 bg-panel rounded-full overflow-hidden" :class="{ 'buckshot-flash-red': playerHit }">
          <div
            class="h-full transition-all duration-300"
            :class="playerHP > 2 ? 'bg-success' : playerHP > 1 ? 'bg-accent' : 'bg-danger'"
            :style="{ width: (playerHP / maxPlayerHP) * 100 + '%' }"
          />
        </div>
      </div>

      <span class="text-xs text-muted/40">VS</span>

      <!-- 庄家HP -->
      <div class="flex-1">
        <div class="flex items-center justify-between text-xs mb-0.5">
          <span :class="!isPlayerTurn && !gameOver ? 'text-danger' : 'text-muted'">{{ $t('buckshot.dealer') }}</span>
          <span class="text-text">{{ dealerHP }}/{{ maxDealerHP }}</span>
        </div>
        <div class="h-1.5 bg-panel rounded-full overflow-hidden" :class="{ 'buckshot-flash-red': dealerHit }">
          <div
            class="h-full transition-all duration-300"
            :class="dealerHP > 2 ? 'bg-success' : dealerHP > 1 ? 'bg-accent' : 'bg-danger'"
            :style="{ width: (dealerHP / maxDealerHP) * 100 + '%' }"
          />
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div v-if="isPlayerTurn && !gameOver" class="flex space-x-2 mb-3">
      <Button class="flex-1 justify-center" :disabled="animating" @click="shootOpponent">{{ $t('buckshot.shoot_dealer') }}</Button>
      <Button class="flex-1 justify-center" :disabled="animating" @click="shootSelf">{{ $t('buckshot.shoot_self') }}</Button>
    </div>

    <!-- 庄家回合提示 -->
    <p v-if="!isPlayerTurn && !gameOver" class="text-xs text-muted/40 text-center mb-3">{{ $t('buckshot.dealer_thinking') }}</p>

    <!-- 行动日志 -->
    <div v-if="actionLog.length > 0" class="border border-accent/10 rounded-xs p-2 mb-3 max-h-24 overflow-y-auto" role="log" aria-live="polite">
      <p
        v-for="(log, i) in actionLog"
        :key="i"
        class="text-[10px] leading-relaxed"
        :class="i === actionLog.length - 1 ? 'text-text' : 'text-muted/60'"
      >
        {{ log }}
      </p>
    </div>

    <!-- 结果 -->
    <template v-if="gameOver">
      <div class="border border-accent/10 rounded-xs p-3 text-center mb-3">
        <p class="text-sm" :class="won ? 'text-success' : draw ? 'text-accent' : 'text-danger'">
          {{ won ? $t('buckshot.win') : draw ? $t('buckshot.draw') : $t('buckshot.lose') }}
        </p>
        <p class="text-xs mt-0.5" :class="won ? 'text-success' : draw ? 'text-accent' : 'text-danger'">
          {{
            won
              ? '+' + BUCKSHOT_BET_AMOUNT * BUCKSHOT_WIN_MULTIPLIER + $t('status_bar.money_unit')
              : draw
                ? $t('buckshot.refund') + BUCKSHOT_BET_AMOUNT + $t('status_bar.money_unit')
                : '-' + BUCKSHOT_BET_AMOUNT + $t('status_bar.money_unit')
          }}
        </p>
      </div>
      <Button class="w-full justify-center" @click="emit('complete', won, draw)">{{ $t('buckshot.confirm') }}</Button>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, nextTick, onMounted } from 'vue'
  import { BUCKSHOT_BET_AMOUNT, BUCKSHOT_WIN_MULTIPLIER, dealerDecide } from '@/data/hanhai'
  import { sfxGunshot, sfxGunEmpty, sfxCasinoWin, sfxCasinoLose } from '@/composables/useAudio'
  import type { BuckshotSetup, ShellType } from '@/types'
  import Button from '@/components/game/Button.vue'
  import Divider from '@/components/game/Divider.vue'
  import i18n from '@/locales'

  const props = defineProps<{ setup: BuckshotSetup }>()
  const emit = defineEmits<{ complete: [won: boolean, draw: boolean] }>()

  // 游戏状态
  const shells = ref<ShellType[]>([...props.setup.shells])
  const shellIndex = ref(0)
  const playerHP = ref(props.setup.playerHP)
  const dealerHP = ref(props.setup.dealerHP)
  const maxPlayerHP = props.setup.playerHP
  const maxDealerHP = props.setup.dealerHP
  const playerFirst = Math.random() < 0.5
  const isPlayerTurn = ref(playerFirst)
  const gameOver = ref(false)
  const won = ref(false)
  const draw = ref(false)
  const actionLog = ref<string[]>([])
  const animating = ref(false)

  // 受击动画
  const playerHit = ref(false)
  const dealerHit = ref(false)

  const liveRemaining = computed(() => {
    let count = 0
    for (let i = shellIndex.value; i < shells.value.length; i++) {
      if (shells.value[i] === 'live') count++
    }
    return count
  })

  const blankRemaining = computed(() => {
    let count = 0
    for (let i = shellIndex.value; i < shells.value.length; i++) {
      if (shells.value[i] === 'blank') count++
    }
    return count
  })

  const addActionLog = (msg: string) => {
    actionLog.value.push(msg)
  }

  const triggerHitAnim = (target: 'player' | 'dealer') => {
    if (target === 'player') {
      playerHit.value = true
      setTimeout(() => {
        playerHit.value = false
      }, 400)
    } else {
      dealerHit.value = true
      setTimeout(() => {
        dealerHit.value = false
      }, 400)
    }
  }

  const getCurrentShell = (): ShellType | null => {
    if (shellIndex.value >= shells.value.length) return null
    return shells.value[shellIndex.value]!
  }

  const consumeShell = () => {
    shellIndex.value++
  }

  const checkGameEnd = () => {
    if (playerHP.value <= 0) {
      gameOver.value = true
      won.value = false
      sfxCasinoLose()
      addActionLog(i18n.global.t('buckshot.msg_you_die'))
      return true
    }
    if (dealerHP.value <= 0) {
      gameOver.value = true
      won.value = true
      sfxCasinoWin()
      addActionLog(i18n.global.t('buckshot.msg_dealer_die'))
      return true
    }
    if (shellIndex.value >= shells.value.length) {
      // 弹药用完，比较剩余HP
      if (playerHP.value > dealerHP.value) {
        gameOver.value = true
        won.value = true
        sfxCasinoWin()
        addActionLog(i18n.global.t('buckshot.msg_ammo_out_win'))
      } else if (playerHP.value < dealerHP.value) {
        gameOver.value = true
        won.value = false
        sfxCasinoLose()
        addActionLog(i18n.global.t('buckshot.msg_ammo_out_lose'))
      } else {
        // 平局，退还下注
        gameOver.value = true
        draw.value = true
        addActionLog(i18n.global.t('buckshot.msg_ammo_out_draw'))
      }
      return true
    }
    return false
  }

  const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

  /** 玩家射击对方 */
  const shootOpponent = async () => {
    if (animating.value || gameOver.value) return
    animating.value = true
    const shell = getCurrentShell()
    consumeShell()

    if (shell === 'live') {
      sfxGunshot()
      dealerHP.value = Math.max(0, dealerHP.value - 1)
      triggerHitAnim('dealer')
      addActionLog(i18n.global.t('buckshot.msg_you_shoot_dealer_live'))
    } else {
      sfxGunEmpty()
      addActionLog(i18n.global.t('buckshot.msg_you_shoot_dealer_blank'))
    }

    await nextTick()

    if (!checkGameEnd()) {
      isPlayerTurn.value = false
      await delay(800)
      animating.value = false
      void dealerTurn()
    } else {
      animating.value = false
    }
  }

  /** 玩家射击自己 */
  const shootSelf = async () => {
    if (animating.value || gameOver.value) return
    animating.value = true
    const shell = getCurrentShell()
    consumeShell()

    if (shell === 'blank') {
      sfxGunEmpty()
      addActionLog(i18n.global.t('buckshot.msg_you_shoot_self_blank'))
      // 额外回合，不切换
      await delay(400)
      animating.value = false
      if (checkGameEnd()) return
    } else {
      sfxGunshot()
      playerHP.value = Math.max(0, playerHP.value - 1)
      triggerHitAnim('player')
      addActionLog(i18n.global.t('buckshot.msg_you_shoot_self_live'))
      await nextTick()

      if (!checkGameEnd()) {
        isPlayerTurn.value = false
        await delay(800)
        animating.value = false
        void dealerTurn()
      } else {
        animating.value = false
      }
    }
  }

  /** 庄家回合 */
  const dealerTurn = async () => {
    if (gameOver.value) return
    animating.value = true

    await delay(800)

    if (shellIndex.value >= shells.value.length) {
      checkGameEnd()
      animating.value = false
      return
    }

    const decision = dealerDecide(shells.value, shellIndex.value, false)
    const shell = getCurrentShell()
    consumeShell()

    if (decision === 'opponent') {
      // 射玩家
      if (shell === 'live') {
        sfxGunshot()
        playerHP.value = Math.max(0, playerHP.value - 1)
        triggerHitAnim('player')
        addActionLog(i18n.global.t('buckshot.msg_dealer_shoot_you_live'))
      } else {
        sfxGunEmpty()
        addActionLog(i18n.global.t('buckshot.msg_dealer_shoot_you_blank'))
      }
      await nextTick()

      if (!checkGameEnd()) {
        isPlayerTurn.value = true
        animating.value = false
      } else {
        animating.value = false
      }
    } else {
      // 射自己
      if (shell === 'blank') {
        sfxGunEmpty()
        addActionLog(i18n.global.t('buckshot.msg_dealer_shoot_self_blank'))
        await delay(600)
        if (!checkGameEnd()) {
          await dealerTurn()
        } else {
          animating.value = false
        }
      } else {
        sfxGunshot()
        dealerHP.value = Math.max(0, dealerHP.value - 1)
        triggerHitAnim('dealer')
        addActionLog(i18n.global.t('buckshot.msg_dealer_shoot_self_live'))
        await nextTick()

        if (!checkGameEnd()) {
          isPlayerTurn.value = true
          animating.value = false
        } else {
          animating.value = false
        }
      }
    }
  }

  onMounted(() => {
    if (playerFirst) {
      addActionLog(i18n.global.t('buckshot.msg_you_first'))
    } else {
      addActionLog(i18n.global.t('buckshot.msg_dealer_first'))
      void dealerTurn()
    }
  })
</script>

<style scoped>
  .buckshot-flash-red {
    animation: buckshot-hit 0.3s ease-in-out;
  }

  @keyframes buckshot-hit {
    0%,
    100% {
      background-color: rgb(var(--color-panel));
    }
    50% {
      background-color: rgba(195, 64, 67, 0.4);
    }
  }
</style>
