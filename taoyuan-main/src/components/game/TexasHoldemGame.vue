<template>
  <div class="game-panel max-w-sm w-full">
    <Divider title class="!mb-1">{{ $t('texas_holdem.title', { name: tier.name }) }}</Divider>
    <div class="flex items-center justify-center space-x-2 mb-2">
      <span class="text-xs text-muted">{{ $t('texas_holdem.round', { current: currentRound, total: tier.rounds }) }}</span>
      <span class="text-xs text-muted">{{ $t('texas_holdem.entry_fee', { fee: tier.entryFee + $t('status_bar.money_unit') }) }}</span>
      <span class="text-xs text-muted">{{ $t('texas_holdem.rake', { rake: tier.rake + $t('status_bar.money_unit') }) }}</span>
    </div>

    <!-- 底池 + 街 -->
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs text-muted">{{ streetLabel }}</span>
      <span class="text-xs text-accent">{{ $t('texas_holdem.pot', { amount: pot }) }}</span>
    </div>

    <!-- 公共牌 -->
    <div class="mb-2">
      <p class="text-xs text-muted mb-1">{{ $t('texas_holdem.community_cards') }}</p>
      <div class="flex justify-center space-x-1">
        <span
          v-for="(card, i) in currentCommunity"
          :key="i"
          class="poker-card"
          :class="{
            'poker-card-hidden': !isCommunityVisible(i),
            'poker-card-red': isCommunityVisible(i) && isRedSuit(card.suit),
            'poker-card-reveal': isCommunityVisible(i)
          }"
        >
          <template v-if="isCommunityVisible(i)">
            <span class="poker-card-suit">{{ SUIT_LABELS[card.suit] }}</span>
            <span class="poker-card-rank">{{ RANK_LABELS[card.rank] }}</span>
          </template>
          <template v-else>?</template>
        </span>
      </div>
    </div>

    <!-- 玩家tay牌 + 筹码 -->
    <div class="mb-2">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs text-muted">{{ $t('texas_holdem.your_hand') }}</span>
        <span class="text-xs">{{ $t('texas_holdem.chips', { amount: playerStack }) }}</span>
      </div>
      <div class="flex justify-center space-x-1">
        <span
          v-for="(card, i) in currentPlayerHole"
          :key="i"
          class="poker-card poker-card-reveal"
          :class="{ 'poker-card-red': isRedSuit(card.suit) }"
        >
          <span class="poker-card-suit">{{ SUIT_LABELS[card.suit] }}</span>
          <span class="poker-card-rank">{{ RANK_LABELS[card.rank] }}</span>
        </span>
      </div>
      <p v-if="playerHandResult" class="text-xs text-center mt-1 text-accent">{{ playerHandResult.label }}</p>
    </div>

    <!-- nhân viên ngân hàngtay牌 + 筹码 -->
    <div class="mb-2">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs text-muted">{{ $t('texas_holdem.dealer_hand') }}</span>
        <span class="text-xs">{{ $t('texas_holdem.chips', { amount: dealerStack }) }}</span>
      </div>
      <div class="flex justify-center space-x-1">
        <span
          v-for="(card, i) in currentDealerHole"
          :key="i"
          class="poker-card"
          :class="{
            'poker-card-hidden': !showDealerCards,
            'poker-card-red': showDealerCards && isRedSuit(card.suit),
            'poker-card-reveal': showDealerCards
          }"
        >
          <template v-if="showDealerCards">
            <span class="poker-card-suit">{{ SUIT_LABELS[card.suit] }}</span>
            <span class="poker-card-rank">{{ RANK_LABELS[card.rank] }}</span>
          </template>
          <template v-else>?</template>
        </span>
      </div>
      <p v-if="dealerHandResult" class="text-xs text-center mt-1 text-accent">{{ dealerHandResult.label }}</p>
    </div>

    <!-- 操作按钮 -->
    <div v-if="!handOver && isPlayerTurn && !animating" class="flex flex-wrap space-x-1 mb-2">
      <template v-if="toCall <= 0">
        <Button class="flex-1 justify-center" @click="doCheck">{{ $t('texas_holdem.check') }}</Button>
        <Button
          v-if="!dealerAllIn && playerStack >= tier.blind * 2"
          class="flex-1 justify-center"
          @click="doRaise(playerBetRound + tier.blind * 2)"
        >
          {{ $t('texas_holdem.raise', { amount: tier.blind * 2 }) }}
        </Button>
        <Button
          v-if="!dealerAllIn && playerStack >= tier.blind * 4"
          class="flex-1 justify-center"
          @click="doRaise(playerBetRound + tier.blind * 4)"
        >
          {{ $t('texas_holdem.raise', { amount: tier.blind * 4 }) }}
        </Button>
      </template>
      <template v-else>
        <Button class="flex-1 justify-center" @click="doCall">{{ $t('texas_holdem.call', { amount: toCall }) }}</Button>
        <Button v-if="!dealerAllIn && playerStack > toCall" class="flex-1 justify-center" @click="doRaise(dealerBetRound + tier.blind * 2)">
          {{ $t('texas_holdem.raise', { amount: toCall + tier.blind * 2 }) }}
        </Button>
      </template>
      <Button v-if="!dealerAllIn" class="flex-1 justify-center" @click="doAllIn">{{ $t('texas_holdem.all_in') }}</Button>
      <Button class="flex-1 justify-center text-danger" @click="doFold">{{ $t('texas_holdem.fold') }}</Button>
    </div>

    <!-- nhân viên ngân hàng思考中 -->
    <p v-if="!handOver && !isPlayerTurn && animating" class="text-xs text-muted/40 text-center mb-2">{{ $t('texas_holdem.dealer_thinking') }}</p>

    <!-- 日志 -->
    <div class="border border-accent/10 rounded-xs p-2 mb-2 max-h-24 overflow-y-auto" ref="logRef" role="log" aria-live="polite">
      <p v-for="(msg, i) in actionLog" :key="i" class="text-xs text-muted leading-relaxed">{{ msg }}</p>
    </div>

    <!-- 最终结算 -->
    <template v-if="sessionOver && finalResult">
      <div class="border border-accent/10 rounded-xs p-3 text-center mb-2">
        <p class="text-sm" :class="finalResult.won ? 'text-success' : finalResult.draw ? 'text-accent' : 'text-danger'">
          {{ finalResult.won ? $t('texas_holdem.win') : finalResult.draw ? $t('texas_holdem.draw') : $t('texas_holdem.lose') }}
        </p>
        <p class="text-xs mt-0.5" :class="finalResult.netProfit >= 0 ? 'text-success' : 'text-danger'">
          {{ finalResult.netProfit >= 0 ? '+' + finalResult.netProfit + $t('status_bar.money_unit') : finalResult.netProfit + $t('status_bar.money_unit') }}
        </p>
        <p class="text-xs text-muted mt-0.5">{{ $t('texas_holdem.dealer_tip', { amount: tier.rake + $t('status_bar.money_unit') }) }}</p>
        <p class="text-xs text-muted mt-0.5">{{ $t('texas_holdem.summary', { rounds: currentRound, chips: playerStack }) }}</p>
      </div>
      <Button class="w-full justify-center" @click="emit('complete', playerStack, tier.name)">{{ $t('texas_holdem.confirm') }}</Button>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, nextTick } from 'vue'
  import { SUIT_LABELS, RANK_LABELS, evaluateBestHand, compareHands, texasDealerAI, dealTexas } from '@/data/hanhai'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { sfxChipBet, sfxFoldCards, sfxCardFlip, sfxCasinoWin, sfxCasinoLose } from '@/composables/useAudio'
  import Button from '@/components/game/Button.vue'
  import Divider from '@/components/game/Divider.vue'
  import type { TexasSetup, TexasStreet, PokerSuit, PokerHandResult, PokerCard } from '@/types'
  import i18n from '@/locales'

  const playerStore = usePlayerStore()

  const props = defineProps<{ setup: TexasSetup }>()
  const emit = defineEmits<{ complete: [finalChips: number, tierName: string] }>()

  const tier = props.setup.tier

  // === 多tay牌管理 ===
  const currentRound = ref(1)
  const currentPlayerHole = ref<PokerCard[]>(props.setup.playerHole)
  const currentDealerHole = ref<PokerCard[]>(props.setup.dealerHole)
  const currentCommunity = ref<PokerCard[]>(props.setup.community)

  // === 单tay牌状态 ===
  const street = ref<TexasStreet>('preflop')
  const playerStack = ref(tier.entryFee)
  const dealerStack = ref(tier.entryFee)
  const pot = ref(0)
  const playerBetRound = ref(0)
  const dealerBetRound = ref(0)
  const isPlayerTurn = ref(true)
  const animating = ref(false)
  const handOver = ref(false)
  const handResult = ref<'won' | 'draw' | 'lost' | null>(null)
  const playerFolded = ref(false)
  const dealerFolded = ref(false)
  const playerAllIn = ref(false)
  const dealerAllIn = ref(false)
  const showDealerCards = ref(false)
  const playerHandResult = ref<PokerHandResult | null>(null)
  const dealerHandResult = ref<PokerHandResult | null>(null)
  const sessionOver = ref(false)
  const finalResult = ref<{ won: boolean; draw: boolean; netProfit: number } | null>(null)
  const totalInvested = ref(0) // Đầu tư tích lũy ngoài địa điểm (không bao gồm phí nhập học ban đầu)
  const actionLog = ref<string[]>([])
  const logRef = ref<HTMLElement | null>(null)

  const toCall = computed(() => Math.max(0, dealerBetRound.value - playerBetRound.value))

  const streetLabel = computed(() => {
    return i18n.global.t(`texas_holdem.street_${street.value}`)
  })

  const isRedSuit = (suit: PokerSuit) => suit === 'heart' || suit === 'diamond'

  const isCommunityVisible = (index: number) => {
    if (street.value === 'showdown') return true
    if (index < 3) return street.value === 'flop' || street.value === 'turn' || street.value === 'river'
    if (index === 3) return street.value === 'turn' || street.value === 'river'
    return street.value === 'river'
  }

  const visibleCommunity = computed(() => {
    const s = street.value
    if (s === 'preflop') return []
    if (s === 'flop') return currentCommunity.value.slice(0, 3)
    if (s === 'turn') return currentCommunity.value.slice(0, 4)
    return currentCommunity.value.slice(0, 5)
  })

  const addActionLog = (msg: string) => {
    actionLog.value.push(msg)
    void nextTick(() => {
      if (logRef.value) logRef.value.scrollTop = logRef.value.scrollHeight
    })
  }

  /** 将筹码从一方移入底池 */
  const betFromPlayer = (amount: number) => {
    const actual = Math.min(amount, playerStack.value)
    playerStack.value -= actual
    playerBetRound.value += actual
    if (playerStack.value <= 0) playerAllIn.value = true
    return actual
  }

  const betFromDealer = (amount: number) => {
    const actual = Math.min(amount, dealerStack.value)
    dealerStack.value -= actual
    dealerBetRound.value += actual
    if (dealerStack.value <= 0) dealerAllIn.value = true
    return actual
  }

  /** 收集本轮下注到底池（处理不等额all-in退还多余筹码） */
  const collectBets = () => {
    const pBet = playerBetRound.value
    const dBet = dealerBetRound.value
    const matched = Math.min(pBet, dBet)
    pot.value += matched * 2

    // 退还多余的筹码
    if (pBet > matched) {
      const refund = pBet - matched
      playerStack.value += refund
    }
    if (dBet > matched) {
      const refund = dBet - matched
      dealerStack.value += refund
    }

    playerBetRound.value = 0
    dealerBetRound.value = 0
  }

  /** 进入下一街 */
  const advanceStreet = () => {
    collectBets()
    const order: TexasStreet[] = ['preflop', 'flop', 'turn', 'river', 'showdown']
    const idx = order.indexOf(street.value)
    if (idx >= 3 || street.value === 'river') {
      doShowdown()
      return
    }
    street.value = order[idx + 1]!
    sfxCardFlip()
    addActionLog(`—— ${streetLabel.value} ——`)

    if (playerAllIn.value || dealerAllIn.value) {
      setTimeout(() => advanceStreet(), 600)
      return
    }

    isPlayerTurn.value = true
  }

  /** 检查本轮是否结束 */
  const checkRoundEnd = (playerActed: boolean) => {
    const pBet = playerBetRound.value
    const dBet = dealerBetRound.value
    // 下注匹配，或下注少的一方已all-in（无法再加）
    const settled = pBet === dBet || (pBet < dBet && playerAllIn.value) || (dBet < pBet && dealerAllIn.value)

    if (settled) {
      advanceStreet()
      return
    }

    // 还需要对方行动
    if (playerActed) {
      isPlayerTurn.value = false
      animating.value = true
      setTimeout(() => dealerTurn(), 800)
    } else {
      isPlayerTurn.value = true
      animating.value = false
    }
  }

  // === 玩家操作 ===

  const doCheck = () => {
    sfxChipBet()
    addActionLog(i18n.global.locale.value === 'vi' ? 'Bạn xem bài' : 'bạn kiểm tra')
    isPlayerTurn.value = false
    animating.value = true
    setTimeout(() => dealerTurn(), 800)
  }

  const doCall = () => {
    const amount = betFromPlayer(toCall.value)
    sfxChipBet()
    addActionLog(i18n.global.locale.value === 'vi' ? `Bạn theo cược ${amount}` : `Bạn gọi ${amount}`)
    checkRoundEnd(true)
  }

  const doRaise = (total: number) => {
    const needed = total - playerBetRound.value
    const amount = betFromPlayer(needed)
    sfxChipBet()
    addActionLog(i18n.global.locale.value === 'vi' ? `Bạn tố thêm ${amount}` : `bạn tăng ${amount}`)
    isPlayerTurn.value = false
    animating.value = true
    setTimeout(() => dealerTurn(), 800)
  }

  const doAllIn = () => {
    const amount = betFromPlayer(playerStack.value)
    sfxChipBet()
    addActionLog(i18n.global.locale.value === 'vi' ? `Bạn All-in ${amount}` : `Bạn chơi all-in ${amount}`)
    playerAllIn.value = true
    isPlayerTurn.value = false
    animating.value = true
    setTimeout(() => dealerTurn(), 800)
  }

  const doFold = () => {
    sfxFoldCards()
    addActionLog(i18n.global.locale.value === 'vi' ? 'Bạn bỏ bài' : 'bạn gấp')
    playerFolded.value = true
    collectBets()
    endHand('lost')
  }

  // === nhân viên ngân hàngAI ===

  const dealerTurn = () => {
    const decision = texasDealerAI(
      currentDealerHole.value,
      visibleCommunity.value,
      street.value,
      pot.value + playerBetRound.value + dealerBetRound.value,
      dealerStack.value,
      playerBetRound.value,
      dealerBetRound.value,
      playerAllIn.value,
      tier.blind
    )

    if (decision.action === 'fold') {
      sfxFoldCards()
      addActionLog(i18n.global.locale.value === 'vi' ? 'Nhà cái bỏ bài' : 'Đại lý gấp')
      dealerFolded.value = true
      collectBets()
      animating.value = false
      endHand('won')
      return
    }

    if (decision.action === 'check') {
      sfxChipBet()
      addActionLog(i18n.global.locale.value === 'vi' ? 'Nhà cái xem bài' : 'Kiểm tra đại lý')
      animating.value = false
      checkRoundEnd(false)
      return
    }

    if (decision.action === 'call') {
      const callAmt = playerBetRound.value - dealerBetRound.value
      const amount = betFromDealer(callAmt)
      sfxChipBet()
      addActionLog(i18n.global.locale.value === 'vi' ? `Nhà cái theo cược ${amount}` : `cuộc gọi ngân hàng ${amount}`)
      animating.value = false
      checkRoundEnd(false)
      return
    }

    if (decision.action === 'allin') {
      const amount = betFromDealer(dealerStack.value)
      sfxChipBet()
      addActionLog(i18n.global.locale.value === 'vi' ? `Nhà cái All-in ${amount}` : `Nhân viên ngân hàng dốc toàn lực ${amount}`)
      dealerAllIn.value = true
      animating.value = false
      if (dealerBetRound.value > playerBetRound.value && !playerAllIn.value) {
        isPlayerTurn.value = true
      } else {
        checkRoundEnd(false)
      }
      return
    }

    // raise
    const amount = betFromDealer(decision.amount)
    sfxChipBet()
    addActionLog(i18n.global.locale.value === 'vi' ? `Nhà cái tố thêm ${amount}` : `Nhân viên ngân hàng tăng lương ${amount}`)
    animating.value = false
    isPlayerTurn.value = true
  }

  // === Showdown ===

  const doShowdown = () => {
    street.value = 'showdown'
    showDealerCards.value = true
    sfxCardFlip()
    addActionLog(i18n.global.locale.value === 'vi' ? '—— Lật bài ——' : '—— Trận đấu ——')

    const allCards = currentCommunity.value
    const pHand = evaluateBestHand([...currentPlayerHole.value, ...allCards])
    const dHand = evaluateBestHand([...currentDealerHole.value, ...allCards])
    playerHandResult.value = pHand
    dealerHandResult.value = dHand

    addActionLog(i18n.global.locale.value === 'vi' ? `Bạn: ${pHand.label}` : `bạn: ${pHand.label}`)
    addActionLog(i18n.global.locale.value === 'vi' ? `Nhà cái: ${dHand.label}` : `nhân viên ngân hàng: ${dHand.label}`)

    const cmp = compareHands(pHand, dHand)
    const result = cmp > 0 ? 'won' : cmp === 0 ? 'draw' : 'lost'

    setTimeout(() => endHand(result), 800)
  }

  // === 单tay结算 ===

  const endHand = (result: 'won' | 'draw' | 'lost') => {
    handOver.value = true
    if (dealerFolded.value || playerFolded.value) {
      showDealerCards.value = true
    }

    // 筹码结算：赢家拿走底池
    if (result === 'won') {
      playerStack.value += pot.value
      sfxCasinoWin()
      addActionLog(i18n.global.locale.value === 'vi' ? `Bạn thắng! Nhận tiền cược ${pot.value}` : `Bạn thắng ván bài này! Lấy cái nồi ${pot.value}`)
    } else if (result === 'draw') {
      const half = Math.floor(pot.value / 2)
      playerStack.value += half
      dealerStack.value += pot.value - half
      addActionLog(i18n.global.locale.value === 'vi' ? `Hòa, chia đều tiền cược` : `Buộc, nồi chia đều`)
    } else {
      dealerStack.value += pot.value
      sfxCasinoLose()
      addActionLog(i18n.global.locale.value === 'vi' ? `Bạn thua, nhà cái nhận tiền cược ${pot.value}` : `Bạn thua ván bài và người chia bài sẽ nhận được tiền thưởng ${pot.value}`)
    }
    pot.value = 0
    handResult.value = result

    // 检查是否已打完所有tay数，或玩家筹码+场外资金都不够继续
    const playerBroke = playerStack.value <= 0 && playerStore.money <= 0
    if (playerBroke || currentRound.value >= tier.rounds) {
      endSession()
    } else {
      // 还有剩余tay数，自动开始下一tay
      setTimeout(() => startNextHand(), 1000)
    }
  }

  // === 开始下一tay ===

  const startNextHand = () => {
    currentRound.value++
    const deal = dealTexas()
    currentPlayerHole.value = deal.playerHole
    currentDealerHole.value = deal.dealerHole
    currentCommunity.value = deal.community
    sfxCardFlip()

    // nhân viên ngân hàng筹码不足时补充到入场费
    if (dealerStack.value < tier.blind * 2) {
      const refill = tier.entryFee - dealerStack.value
      dealerStack.value = tier.entryFee
      addActionLog(i18n.global.locale.value === 'vi' ? `Nhà cái nạp thêm phỉnh ${refill}` : `Nhân viên ngân hàng bổ sung chip ${refill}`)
    }

    // 玩家筹码不足时，从场外资金补充
    if (playerStack.value < tier.blind * 2) {
      const needed = tier.entryFee - playerStack.value
      const canAfford = Math.min(needed, playerStore.money)
      if (canAfford > 0) {
        playerStore.spendMoney(canAfford)
        playerStack.value += canAfford
        totalInvested.value += canAfford
        addActionLog(i18n.global.locale.value === 'vi' ? `Nạp thêm phỉnh từ bên ngoài ${canAfford}` : `Bổ sung chip từ bên ngoài địa điểm ${canAfford}`)
      }
    }

    // 重置单tay状态
    street.value = 'preflop'
    pot.value = 0
    playerBetRound.value = 0
    dealerBetRound.value = 0
    isPlayerTurn.value = true
    animating.value = false
    handOver.value = false
    handResult.value = null
    playerFolded.value = false
    dealerFolded.value = false
    playerAllIn.value = false
    dealerAllIn.value = false
    showDealerCards.value = false
    playerHandResult.value = null
    dealerHandResult.value = null

    // 下盲注
    betFromPlayer(tier.blind)
    betFromDealer(tier.blind)
    collectBets()
    addActionLog(i18n.global.locale.value === 'vi' ? `—— Ván thứ ${currentRound.value} ——` : `—— Không. ${currentRound.value} tay ——`)
    addActionLog(i18n.global.locale.value === 'vi' ? `Hai bên đặt cược mù ${tier.blind}` : `Cả hai bên đặt cược mù ${tier.blind}`)
    addActionLog(i18n.global.locale.value === 'vi' ? '—— Trước khi lật bài (Pre-flop) ——' : '—— vòng trước ——')
    isPlayerTurn.value = true
  }

  // === 整场结算 ===

  const endSession = () => {
    sessionOver.value = true
    // netProfit: 最终筹码 - 初始入场费 - 场外补充 (不含抽水，抽水已在store扣除)
    const net = playerStack.value - tier.entryFee - totalInvested.value
    const won = net > 0
    const draw = net === 0

    finalResult.value = { won, draw, netProfit: net }

    if (won) {
      addActionLog(i18n.global.locale.value === 'vi' ? `Kết thúc phiên! Bạn thắng! Lãi ròng ${net}` : `Buổi biểu diễn đã kết thúc! Bạn thắng! lợi nhuận ròng ${net}`)
    } else if (draw) {
      addActionLog(i18n.global.locale.value === 'vi' ? `Kết thúc phiên! Hòa vốn` : `Buổi biểu diễn đã kết thúc! Không lãi, không lỗ`)
    } else {
      addActionLog(i18n.global.locale.value === 'vi' ? `Kết thúc phiên! Bạn thua… Lỗ ròng ${Math.abs(net)}` : `Buổi biểu diễn đã kết thúc! bạn thua…lỗ ròng ${Math.abs(net)}`)
    }
  }

  // === 初始化 ===

  onMounted(() => {
    betFromPlayer(tier.blind)
    betFromDealer(tier.blind)
    collectBets()
    addActionLog(i18n.global.locale.value === 'vi' ? `—— Ván thứ 1 ——` : `—— Không. 1 tay ——`)
    addActionLog(`Cả hai bên đặt cược mù ${tier.blind}`)
    addActionLog('—— vòng trước ——')
    isPlayerTurn.value = true
  })
</script>

<style scoped>
  .poker-card {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 3rem;
    border: 1px solid rgba(200, 164, 92, 0.3);
    border-radius: 2px;
    font-weight: bold;
    transition: all 0.3s;
  }

  .poker-card-suit {
    position: absolute;
    top: 2px;
    left: 3px;
    font-size: 0.55rem;
    line-height: 1;
  }

  .poker-card-rank {
    font-size: 0.85rem;
    line-height: 1;
  }

  .poker-card-hidden {
    background: rgba(200, 164, 92, 0.08);
    color: var(--color-muted);
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
  }

  .poker-card-reveal {
    background: rgba(232, 228, 217, 0.08);
    color: rgb(var(--color-text));
    animation: poker-flip 0.4s ease;
  }

  .poker-card-red {
    color: var(--color-danger);
  }

  @keyframes poker-flip {
    0% {
      transform: scaleX(0);
    }
    50% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }
</style>
