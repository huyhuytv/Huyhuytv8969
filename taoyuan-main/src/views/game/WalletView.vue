<template>
  <div>
    <!-- 标题 -->
    <div class="flex items-center justify-between mb-1">
      <div class="flex items-center space-x-1.5 text-sm text-accent">
        <Wallet :size="14" />
        <span>{{ $t('wallet.title') }}</span>
      </div>
      <span class="text-xs text-muted">{{ unlockedCount }}/{{ WALLET_ITEMS.length }}</span>
    </div>
    <p class="text-xs text-muted mb-3">{{ $t('wallet.unlocked_desc') }}</p>

    <div class="flex flex-col space-y-1.5">
      <div
        v-for="item in WALLET_ITEMS"
        :key="item.id"
        class="border rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
        :class="walletStore.has(item.id) ? 'border-accent/20' : 'border-accent/10 opacity-50'"
        @click="selectedItem = item"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm" :class="walletStore.has(item.id) ? 'text-accent' : 'text-muted'">
            {{ $te('wallet_items.' + item.id) ? $t('wallet_items.' + item.id + '.name') : item.name }}
          </span>
          <CircleCheck v-if="walletStore.has(item.id)" :size="14" class="text-success shrink-0" />
          <Lock v-else :size="14" class="text-muted shrink-0" />
        </div>
        <p class="text-xs text-muted mt-0.5">
          {{ $te('wallet_items.' + item.id) ? $t('wallet_items.' + item.id + '.description') : item.description }}
        </p>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="selectedItem"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="selectedItem = null"
      >
        <div ref="modalRef_1hxh2" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="selectedItem = null">
            <X :size="14" />
          </button>
          <p class="text-sm mb-2" :class="walletStore.has(selectedItem.id) ? 'text-accent' : 'text-muted'">
            {{ $te('wallet_items.' + selectedItem.id) ? $t('wallet_items.' + selectedItem.id + '.name') : selectedItem.name }}
          </p>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted mb-1">{{ $t('wallet.effect') }}</p>
            <p class="text-xs">
              {{ $te('wallet_items.' + selectedItem.id) ? $t('wallet_items.' + selectedItem.id + '.description') : selectedItem.description }}
            </p>
          </div>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted mb-1">{{ $t('wallet.unlock_condition') }}</p>
            <p class="text-xs">
              {{ $te('wallet_items.' + selectedItem.id) ? $t('wallet_items.' + selectedItem.id + '.condition') : selectedItem.unlockCondition }}
            </p>
          </div>
          <div class="border rounded-xs p-2" :class="walletStore.has(selectedItem.id) ? 'border-success/30' : 'border-accent/10'">
            <div class="flex items-center justify-center space-x-1">
              <CircleCheck v-if="walletStore.has(selectedItem.id)" :size="12" class="text-success" />
              <Lock v-else :size="12" class="text-muted" />
              <span class="text-xs" :class="walletStore.has(selectedItem.id) ? 'text-success' : 'text-muted'">
                {{ walletStore.has(selectedItem.id) ? $t('wallet.unlocked') : $t('wallet.locked') }}
              </span>
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
  import { Wallet, CircleCheck, Lock, X } from 'lucide-vue-next'
  import { useWalletStore } from '@/stores/useWalletStore'
  import { WALLET_ITEMS } from '@/data/wallet'
  import type { WalletItemDef } from '@/types'


  const modalRef_1hxh2 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_1hxh2);



  const walletStore = useWalletStore()

  const selectedItem = ref<WalletItemDef | null>(null)

  const unlockedCount = computed(() => WALLET_ITEMS.filter(i => walletStore.has(i.id)).length)
</script>
