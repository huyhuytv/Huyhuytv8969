<template>
  <div>
    <!-- 标题 -->
    <div class="flex items-center justify-between mb-1">
      <div class="flex items-center space-x-1.5 text-sm text-accent">
        <User :size="14" />
        <span>{{ $t('charInfoView.title') }}</span>
      </div>
      <span class="text-xs text-muted">
        {{ $i18n.locale === 'vi' ? 'Năm thứ ' : 'Thứ ' }}{{ gameStore.year }}{{ $i18n.locale === 'vi' ? '' : 'Năm' }} {{ $t('time.' + (gameStore.season === 'spring' ? 'spring' : gameStore.season === 'summer' ? 'summer' : gameStore.season === 'autumn' ? 'autumn' : 'winter')) }}
      </span>
    </div>

    <!-- 角色身份 + 属性 -->
    <div class="border border-accent/20 rounded-xs p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-accent/40" 
         tabindex="0" 
         :aria-label="`${playerStore.playerName}, ${genderLabel}. ${$t('charInfoView.stamina')}: ${playerStore.stamina}/${playerStore.maxStamina}. ${$t('charInfoView.hp')}: ${playerStore.hp}/${playerStore.getMaxHp()}. ${$t('charInfoView.money')}: ${playerStore.money}${$t('status_bar.money_unit')}`">
      <div aria-hidden="true">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-accent">{{ playerStore.playerName }}</span>
          <span class="text-xs text-muted">{{ genderLabel }}</span>
        </div>

        <div class="flex flex-col space-y-1.5" role="list">
          <!-- 体力 -->
          <div class="flex items-center space-x-2">
            <span class="text-xs text-muted shrink-0">{{ $t('charInfoView.stamina') }}</span>
            <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
              <div
                class="h-full rounded-xs transition-all"
                :class="playerStore.staminaPercent > 35 ? 'bg-success' : 'bg-danger'"
                :style="{ width: playerStore.staminaPercent + '%' }"
              />
            </div>
            <span class="text-xs whitespace-nowrap">{{ playerStore.stamina }}/{{ playerStore.maxStamina }}</span>
          </div>
          <!-- 生命 -->
          <div class="flex items-center space-x-2">
            <span class="text-xs text-muted shrink-0">{{ $t('charInfoView.hp') }}</span>
            <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
              <div
                class="h-full rounded-xs transition-all"
                :class="playerStore.getHpPercent() > 25 ? 'bg-success' : 'bg-danger'"
                :style="{ width: playerStore.getHpPercent() + '%' }"
              />
            </div>
            <span class="text-xs whitespace-nowrap">{{ playerStore.hp }}/{{ playerStore.getMaxHp() }}</span>
          </div>
          <!-- 铜钱 -->
          <div class="flex items-center justify-between">
            <span class="text-xs text-muted">{{ $t('charInfoView.money') }}</span>
            <span class="text-xs text-accent">{{ playerStore.money }}{{ $t('status_bar.money_unit') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 装备槽位 -->
    <div class="border border-accent/20 rounded-xs p-2 mb-3">
      <p class="text-xs text-muted mb-1.5">{{ $t('charInfoView.weapons') }}</p>
      <div class="grid grid-cols-3 gap-1 mb-1" role="list">
        <button
          class="block w-full border border-accent/10 rounded-xs px-2 py-1 text-center cursor-pointer hover:bg-accent/5 focus:outline-accent bg-transparent"
          @click="activeSlot = 'weapon'"
          :aria-label="`${$t('charInfoView.weapons')}: ${equippedWeaponName}`"
        >
          <span class="text-[10px] text-muted block" aria-hidden="true">{{ $t('charInfoView.weapons') }}</span>
          <span class="text-xs text-accent truncate block" aria-hidden="true">{{ equippedWeaponName }}</span>
        </button>
        <button
          class="block w-full border border-accent/10 rounded-xs px-2 py-1 text-center cursor-pointer hover:bg-accent/5 focus:outline-accent bg-transparent"
          @click="activeSlot = 'ring1'"
          :aria-label="`${$t('charInfoView.ring_slot_1')}: ${equippedRing1 ? equippedRing1.name : $t('charInfoView.empty')}`"
        >
          <span class="text-[10px] text-muted block" aria-hidden="true">{{ $t('charInfoView.ring_slot_1') }}</span>
          <span class="text-xs truncate block" :class="equippedRing1 ? 'text-accent' : 'text-muted/40'" aria-hidden="true">
            {{ equippedRing1?.name ?? $t('charInfoView.empty') }}
          </span>
        </button>
        <button
          class="block w-full border border-accent/10 rounded-xs px-2 py-1 text-center cursor-pointer hover:bg-accent/5 focus:outline-accent bg-transparent"
          @click="activeSlot = 'ring2'"
          :aria-label="`${$t('charInfoView.ring_slot_2')}: ${equippedRing2 ? equippedRing2.name : $t('charInfoView.empty')}`"
        >
          <span class="text-[10px] text-muted block" aria-hidden="true">{{ $t('charInfoView.ring_slot_2') }}</span>
          <span class="text-xs truncate block" :class="equippedRing2 ? 'text-accent' : 'text-muted/40'" aria-hidden="true">
            {{ equippedRing2?.name ?? $t('charInfoView.empty') }}
          </span>
        </button>
      </div>
      <div class="grid grid-cols-2 gap-1" role="list">
        <button 
          class="block w-full border border-accent/10 rounded-xs px-2 py-1 text-center cursor-pointer hover:bg-accent/5 focus:outline-accent bg-transparent" 
          @click="activeSlot = 'hat'"
          :aria-label="`${$t('charInfoView.hats')}: ${equippedHatName ?? $t('charInfoView.empty')}`"
        >
          <span class="text-[10px] text-muted block" aria-hidden="true">{{ $t('charInfoView.hats') }}</span>
          <span class="text-xs truncate block" :class="equippedHatName ? 'text-accent' : 'text-muted/40'" aria-hidden="true">
            {{ equippedHatName ?? $t('charInfoView.empty') }}
          </span>
        </button>
        <button 
          class="block w-full border border-accent/10 rounded-xs px-2 py-1 text-center cursor-pointer hover:bg-accent/5 focus:outline-accent bg-transparent" 
          @click="activeSlot = 'shoe'"
          :aria-label="`${$t('charInfoView.shoes')}: ${equippedShoeName ?? $t('charInfoView.empty')}`"
        >
          <span class="text-[10px] text-muted block" aria-hidden="true">{{ $t('charInfoView.shoes') }}</span>
          <span class="text-xs truncate block" :class="equippedShoeName ? 'text-accent' : 'text-muted/40'" aria-hidden="true">
            {{ equippedShoeName ?? $t('charInfoView.empty') }}
          </span>
        </button>
      </div>
    </div>

    <!-- 装备选择弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="activeSlot" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" @click.self="activeSlot = null">
        <div ref="modalRef_5te79" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="activeSlot = null">
            <X :size="14" />
          </button>

          <!-- 武器弹窗 -->
          <template v-if="activeSlot === 'weapon'">
            <p class="text-sm text-accent mb-2">{{ $t('charInfoView.select_weapon') }}</p>
            <div class="flex flex-col space-y-1 max-h-60 overflow-y-auto">
              <div
                v-for="(weapon, index) in inventoryStore.ownedWeapons"
                :key="index"
                class="flex items-center justify-between border rounded-xs px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5 mr-1"
                role="button"
                tabindex="0"
                :class="index === inventoryStore.equippedWeaponIndex ? 'border-accent/30' : 'border-accent/10'"
                @click="handleEquipWeapon(index)"
                @keydown.enter.prevent="handleEquipWeapon(index)"
                @keydown.space.prevent="handleEquipWeapon(index)"
              >
                <div class="min-w-0">
                  <span class="text-xs" :class="index === inventoryStore.equippedWeaponIndex ? 'text-accent' : ''">
                    {{ getWeaponDisplayName(weapon.defId, weapon.enchantmentId) }}
                  </span>
                  <p class="text-[10px] text-muted truncate">
                    {{ $i18n.locale === 'vi' ? 'Công ' : 'Công ' }}{{ getWeaponStats(weapon).attack }} · {{ $i18n.locale === 'vi' ? 'Bạo kích ' : 'Bạo kích' }}{{ Math.round(getWeaponStats(weapon).critRate * 100) }}%
                    <template v-if="weapon.enchantmentId">· {{ getEnchantName(weapon.enchantmentId) }}</template>
                  </p>
                </div>
                <span v-if="index === inventoryStore.equippedWeaponIndex" class="text-[10px] text-accent shrink-0 ml-1">{{ $t('charInfoView.active_preset') }}</span>
              </div>
            </div>
          </template>

          <!-- 戒指弹窗 -->
          <template v-else-if="activeSlot === 'ring1' || activeSlot === 'ring2'">
            <p class="text-sm text-accent mb-2">{{ $t('charInfoView.select_ring', { slot: activeSlot === 'ring1' ? '1' : '2' }) }}</p>
            <div class="flex flex-col space-y-1 max-h-60 overflow-y-auto">
              <!-- 卸下按钮 -->
              <div
                v-if="(activeSlot === 'ring1' ? inventoryStore.equippedRingSlot1 : inventoryStore.equippedRingSlot2) >= 0"
                class="flex items-center border border-danger/20 rounded-xs px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-danger/5 mr-1"
                role="button"
                tabindex="0"
                @click="handleUnequipRingFromPopup"
                @keydown.enter.prevent="handleUnequipRingFromPopup"
                @keydown.space.prevent="handleUnequipRingFromPopup"
              >
                <span class="text-xs text-danger">{{ $t('charInfoView.unequip_current_ring') }}</span>
              </div>
              <!-- 戒指列表 -->
              <template v-if="inventoryStore.ownedRings.length > 0">
                <div
                v-for="(ring, idx) in ownedRingList"
                  :key="idx"
                  class="flex items-center justify-between border rounded-xs px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5 mr-1"
                role="button"
                tabindex="0"
                  :class="isRingInCurrentSlot(idx) ? 'border-accent/30' : 'border-accent/10'"
                  @click="handleEquipRingFromPopup(idx)"
                @keydown.enter.prevent="handleEquipRingFromPopup(idx)"
                @keydown.space.prevent="handleEquipRingFromPopup(idx)"
                >
                  <div class="min-w-0">
                    <span class="text-xs" :class="isRingInCurrentSlot(idx) ? 'text-accent' : ''">{{ ring.name }}</span>
                    <p class="text-[10px] text-muted truncate">{{ ring.effectText }}</p>
                  </div>
                  <span v-if="isRingInCurrentSlot(idx)" class="text-[10px] text-accent shrink-0 ml-1">{{ $t('charInfoView.active_preset') }}</span>
                  <span v-else-if="isRingInOtherSlot(idx)" class="text-[10px] text-muted shrink-0 ml-1">
                    {{ $t('charInfoView.active_other_slot', { slot: activeSlot === 'ring1' ? '2' : '1' }) }}
                  </span>
                </div>
              </template>
              <p v-else class="text-xs text-muted/40 text-center py-2">{{ $t('charInfoView.no_rings') }}</p>
            </div>
          </template>

          <!-- 帽子弹窗 -->
          <template v-else-if="activeSlot === 'hat'">
            <p class="text-sm text-accent mb-2">{{ $t('charInfoView.select_hat') }}</p>
            <div class="flex flex-col space-y-1 max-h-60 overflow-y-auto">
              <div
                v-if="inventoryStore.equippedHatIndex >= 0"
                class="flex items-center border border-danger/20 rounded-xs px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-danger/5 mr-1"
                role="button"
                tabindex="0"
                @click="handleUnequipHatFromPopup"
                @keydown.enter.prevent="handleUnequipHatFromPopup"
                @keydown.space.prevent="handleUnequipHatFromPopup"
              >
                <span class="text-xs text-danger">{{ $t('charInfoView.unequip_current_hat') }}</span>
              </div>
              <template v-if="inventoryStore.ownedHats.length > 0">
                <div
                v-for="hat in ownedHatList"
                  :key="hat.index"
                  class="flex items-center justify-between border rounded-xs px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5 mr-1"
                role="button"
                tabindex="0"
                  :class="hat.index === inventoryStore.equippedHatIndex ? 'border-accent/30' : 'border-accent/10'"
                  @click="handleEquipHatFromPopup(hat.index)"
                @keydown.enter.prevent="handleEquipHatFromPopup(hat.index)"
                @keydown.space.prevent="handleEquipHatFromPopup(hat.index)"
                >
                  <div class="min-w-0">
                    <span class="text-xs" :class="hat.index === inventoryStore.equippedHatIndex ? 'text-accent' : ''">{{ hat.name }}</span>
                    <p class="text-[10px] text-muted truncate">{{ hat.effectText }}</p>
                  </div>
                  <span v-if="hat.index === inventoryStore.equippedHatIndex" class="text-[10px] text-accent shrink-0 ml-1">{{ $t('charInfoView.active_preset') }}</span>
                </div>
              </template>
              <p v-else class="text-xs text-muted/40 text-center py-2">{{ $t('charInfoView.no_hats') }}</p>
            </div>
          </template>

          <!-- 鞋子弹窗 -->
          <template v-else-if="activeSlot === 'shoe'">
            <p class="text-sm text-accent mb-2">{{ $t('charInfoView.select_shoe') }}</p>
            <div class="flex flex-col space-y-1 max-h-60 overflow-y-auto">
              <div
                v-if="inventoryStore.equippedShoeIndex >= 0"
                class="flex items-center border border-danger/20 rounded-xs px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-danger/5 mr-1"
                role="button"
                tabindex="0"
                @click="handleUnequipShoeFromPopup"
                @keydown.enter.prevent="handleUnequipShoeFromPopup"
                @keydown.space.prevent="handleUnequipShoeFromPopup"
              >
                <span class="text-xs text-danger">{{ $t('charInfoView.unequip_current_shoe') }}</span>
              </div>
              <template v-if="inventoryStore.ownedShoes.length > 0">
                <div
                v-for="shoe in ownedShoeList"
                  :key="shoe.index"
                  class="flex items-center justify-between border rounded-xs px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5 mr-1"
                role="button"
                tabindex="0"
                  :class="shoe.index === inventoryStore.equippedShoeIndex ? 'border-accent/30' : 'border-accent/10'"
                  @click="handleEquipShoeFromPopup(shoe.index)"
                @keydown.enter.prevent="handleEquipShoeFromPopup(shoe.index)"
                @keydown.space.prevent="handleEquipShoeFromPopup(shoe.index)"
                >
                  <div class="min-w-0">
                    <span class="text-xs" :class="shoe.index === inventoryStore.equippedShoeIndex ? 'text-accent' : ''">
                      {{ shoe.name }}
                    </span>
                    <p class="text-[10px] text-muted truncate">{{ shoe.effectText }}</p>
                  </div>
                  <span v-if="shoe.index === inventoryStore.equippedShoeIndex" class="text-[10px] text-accent shrink-0 ml-1">{{ $t('charInfoView.active_preset') }}</span>
                </div>
              </template>
              <p v-else class="text-xs text-muted/40 text-center py-2">{{ $t('charInfoView.no_shoes') }}</p>
            </div>
          </template>
        </div>
      </div>
    </Transition>

    <!-- 工具一览 -->
    <div class="border border-accent/20 rounded-xs p-2 mb-3">
      <div class="flex items-center justify-between mb-1.5">
        <p class="text-xs text-muted">{{ $t('charInfoView.tools') }}</p>
        <button class="text-xs text-accent hover:underline" @click="goToUpgrade">{{ $t('charInfoView.go_to_upgrade') }}</button>
      </div>
      <div class="flex flex-col space-y-1" role="list">
        <div
          v-for="tool in inventoryStore.tools"
          :key="tool.type"
          class="flex items-center justify-between border border-accent/10 rounded-xs px-2 py-1 focus:outline-none focus:ring-2 focus:ring-accent/40"
          tabindex="0"
          role="listitem"
          :aria-label="`${$t('tool_upgrade.names.' + tool.type)} ${$t('tool_upgrade.tiers.' + tool.tier)}. -${Math.round((1 - inventoryStore.getToolStaminaMultiplier(tool.type)) * 100)}% ${$t('charInfoView.stamina')}`"
        >
          <div aria-hidden="true" class="flex-1 flex justify-between">
            <div>
              <span class="text-xs">{{ $t('tool_upgrade.names.' + tool.type) }}</span>
              <span class="text-xs text-muted ml-1">{{ $t('tool_upgrade.tiers.' + tool.tier) }}</span>
            </div>
            <span class="text-[10px] text-muted">-{{ Math.round((1 - inventoryStore.getToolStaminaMultiplier(tool.type)) * 100) }}%{{ $t('charInfoView.stamina') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能总览 -->
    <div class="border border-accent/20 rounded-xs p-2 mb-3">
      <div class="flex items-center justify-between mb-1.5">
        <p class="text-xs text-muted">{{ $t('charInfoView.skills') }}</p>
        <button class="text-xs text-accent hover:underline" @click="goToSkills">{{ $t('charInfoView.view_details') }}</button>
      </div>
      <div class="flex flex-col space-y-0.5 mt-2" role="list">
        <div 
          v-for="skill in skillStore.skills" :key="skill.type" 
          class="flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-xs p-1 -mx-1"
          tabindex="0"
          role="listitem"
          :aria-label="`${$t('skills.' + skill.type)} Lv.${skill.level}. ${skill.perk5 ? $t('skills.' + skill.perk5) : ''} ${skill.perk10 ? $t('skills.' + skill.perk10) : ''}`"
        >
          <span class="text-xs text-muted" aria-hidden="true">{{ $t('skills.' + skill.type) }}</span>
          <div class="flex items-center space-x-1.5" aria-hidden="true">
            <span class="text-xs text-accent">Lv.{{ skill.level }}</span>
            <span v-if="skill.perk5" class="text-[10px] text-success">{{ $t('skills.' + skill.perk5) }}</span>
            <span v-if="skill.perk10" class="text-[10px] text-success">{{ $t('skills.' + skill.perk10) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 被动加成 -->
    <div v-if="unlockedWalletItems.length > 0" class="border border-accent/20 rounded-xs p-2 mb-3">
      <p class="text-xs text-muted mb-1.5">{{ $t('charInfoView.passive_bonus') }}</p>
      <div class="flex flex-col space-y-0.5" role="list">
        <div 
          v-for="item in unlockedWalletItems" :key="item.id" 
          class="flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-xs p-1 -mx-1"
          tabindex="0"
          role="listitem"
          :aria-label="`${item.name}. ${item.description}`"
        >
          <span class="text-xs text-accent" aria-hidden="true">{{ item.name }}</span>
          <span class="text-xs text-muted" aria-hidden="true">{{ item.description }}</span>
        </div>
      </div>
    </div>

    <!-- 家庭 -->
    <div v-if="spouseInfo" class="border border-accent/20 rounded-xs p-2">
      <p class="text-xs text-muted mb-1.5">{{ $t('charInfoView.family') }}</p>
      <div class="flex flex-col space-y-0.5" role="list">
        <div class="flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-xs p-1 -mx-1" tabindex="0" role="listitem" :aria-label="`${$t('charInfoView.spouse')}: ${spouseInfo.name}`">
          <span class="text-xs text-muted" aria-hidden="true">{{ $t('charInfoView.spouse') }}</span>
          <span class="text-xs text-accent" aria-hidden="true">{{ spouseInfo.name }}</span>
        </div>
        <div v-for="child in npcStore.children" :key="child.id" class="flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-xs p-1 -mx-1" tabindex="0" role="listitem" :aria-label="`${child.name}: ${$t('charInfoView.children_stages.' + child.stage)}`">
          <span class="text-xs text-muted" aria-hidden="true">{{ child.name }}</span>
          <span class="text-xs" aria-hidden="true">{{ $t('charInfoView.children_stages.' + child.stage) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

  import { useFocusTrap } from '@/composables/useFocusTrap'
  import { ref, computed } from 'vue'
  import { User, X } from 'lucide-vue-next'
  import { useGameStore } from '@/stores/useGameStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { useNpcStore } from '@/stores/useNpcStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { useSkillStore } from '@/stores/useSkillStore'
  import { useWalletStore } from '@/stores/useWalletStore'
  import { getNpcById } from '@/data'
  import { getWeaponById, getEnchantmentById, getWeaponDisplayName } from '@/data/weapons'
  import { getRingById } from '@/data/rings'
  import { getHatById } from '@/data/hats'
  import { getShoeById } from '@/data/shoes'
  import type { EquipmentEffectType } from '@/types'
  import { WALLET_ITEMS } from '@/data/wallet'
  import { navigateToPanel } from '@/composables/useNavigation'
  import { addLog } from '@/composables/useGameLog'
  import i18n from '@/locales'


  const modalRef_5te79 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_5te79);



  const playerStore = usePlayerStore()
  const inventoryStore = useInventoryStore()
  const skillStore = useSkillStore()
  const walletStore = useWalletStore()
  const npcStore = useNpcStore()
  const gameStore = useGameStore()

  // === 身份 ===
  const genderLabel = computed(() => (playerStore.gender === 'male' ? i18n.global.t('menu.male') : i18n.global.t('menu.female')))

  // === 装备槽位 ===

  const activeSlot = ref<'weapon' | 'ring1' | 'ring2' | 'hat' | 'shoe' | null>(null)

  // === 武器 ===

  const equippedWeaponName = computed(() => {
    const weapon = inventoryStore.ownedWeapons[inventoryStore.equippedWeaponIndex]
    if (!weapon) return i18n.global.t('charInfoView.unarmed')
    return getWeaponDisplayName(weapon.defId, weapon.enchantmentId)
  })

  const getWeaponStats = (weapon: any): { attack: number; critRate: number } => {
    const def = getWeaponById(weapon.defId)
    if (!def) return { attack: 0, critRate: 0 }
    let attack = def.attack
    let critRate = def.critRate
    if (weapon.enchantmentId) {
      const enchant = getEnchantmentById(weapon.enchantmentId)
      if (enchant) {
        attack += enchant.attackBonus
        critRate += enchant.critBonus
      }
    }
    return { attack, critRate }
  }

  const getEnchantName = (enchantmentId: string): string => {
    return getEnchantmentById(enchantmentId)?.name ?? ''
  }

  const handleEquipWeapon = (index: number) => {
    if (inventoryStore.equipWeapon(index)) {
      const weapon = inventoryStore.ownedWeapons[index]!
      const name = getWeaponDisplayName(weapon.defId, weapon.enchantmentId)
      addLog(i18n.global.t('charInfoView.log_equipped', { name }))
    }
  }

  // === 戒指 ===

  const RING_EFFECT_SHORT: Record<EquipmentEffectType, string> = {
    attack_bonus: i18n.global.t('skills.combat'),
    crit_rate_bonus: 'Bạo',
    defense_bonus: 'Giảm sát thương',
    vampiric: 'Hút HP',
    max_hp_bonus: 'HP',
    stamina_reduction: 'Giảm thể lực',
    mining_stamina: 'Giảm TL đào',
    farming_stamina: 'Giảm TL gieo',
    fishing_stamina: 'Giảm TL câu',
    crop_quality_bonus: 'Phẩm chất nông sản',
    crop_growth_bonus: 'Tăng trưởng',
    fish_quality_bonus: 'Phẩm chất cá',
    fishing_calm: 'Câu vững',
    sell_price_bonus: 'Giá',
    shop_discount: 'Khuyến mãi',
    gift_friendship: 'Tình cảm',
    monster_drop_bonus: 'Rớt đồ',
    exp_bonus: 'EXP',
    treasure_find: 'Rương',
    ore_bonus: 'Quặng',
    luck: 'May mắn',
    travel_speed: 'Tốc độ'
  }

  const formatRingEffects = (defId: string): string => {
    const def = getRingById(defId)
    if (!def) return ''
    return def.effects
      .map(e => {
        const label = RING_EFFECT_SHORT[e.type]
        return e.value > 0 && e.value < 1 ? `${label}${Math.round(e.value * 100)}%` : `${label}+${e.value}`
      })
      .join(' ')
  }

  const getRingInfo = (index: number): { name: string; effectText: string } | null => {
    if (index < 0 || index >= inventoryStore.ownedRings.length) return null
    const ring = inventoryStore.ownedRings[index]!
    const def = getRingById(ring.defId)
    if (!def) return null
    return { name: def.name, effectText: formatRingEffects(ring.defId) }
  }

  const equippedRing1 = computed(() => getRingInfo(inventoryStore.equippedRingSlot1))
  const equippedRing2 = computed(() => getRingInfo(inventoryStore.equippedRingSlot2))

  const ownedRingList = computed(() =>
    inventoryStore.ownedRings.map((ring, index) => ({
      index,
      name: getRingById(ring.defId)?.name ?? ring.defId,
      effectText: formatRingEffects(ring.defId)
    }))
  )

  const handleEquipRingFromPopup = (ringIndex: number) => {
    const slot: 0 | 1 = activeSlot.value === 'ring1' ? 0 : 1
    if (inventoryStore.equipRing(ringIndex, slot)) {
      const def = getRingById(inventoryStore.ownedRings[ringIndex]!.defId)
      addLog(i18n.global.t('charInfoView.log_equipped_slot', { name: def?.name ?? 'Nhẫn', slot: slot + 1 }))
      activeSlot.value = null
    }
  }

  const handleUnequipRingFromPopup = () => {
    const slot: 0 | 1 = activeSlot.value === 'ring1' ? 0 : 1
    const idx = slot === 0 ? inventoryStore.equippedRingSlot1 : inventoryStore.equippedRingSlot2
    const def = idx >= 0 ? getRingById(inventoryStore.ownedRings[idx]!.defId) : null
    if (inventoryStore.unequipRing(slot)) {
      addLog(i18n.global.t('charInfoView.log_unequipped', { name: def?.name ?? 'Nhẫn' }))
      activeSlot.value = null
    }
  }

  const isRingInCurrentSlot = (idx: number): boolean => {
    if (activeSlot.value === 'ring1') return inventoryStore.equippedRingSlot1 === idx
    return inventoryStore.equippedRingSlot2 === idx
  }

  const isRingInOtherSlot = (idx: number): boolean => {
    if (activeSlot.value === 'ring1') return inventoryStore.equippedRingSlot2 === idx
    return inventoryStore.equippedRingSlot1 === idx
  }

  // === 帽子 ===

  const equippedHatName = computed(() => {
    const hat = inventoryStore.ownedHats[inventoryStore.equippedHatIndex]
    if (!hat) return null
    return getHatById(hat.defId)?.name ?? null
  })

  const formatEquipEffects = (effects: { type: EquipmentEffectType; value: number }[]): string => {
    return effects
      .map(e => {
        const label = RING_EFFECT_SHORT[e.type]
        return e.value > 0 && e.value < 1 ? `${label}${Math.round(e.value * 100)}%` : `${label}+${e.value}`
      })
      .join(' ')
  }

  const ownedHatList = computed(() =>
    inventoryStore.ownedHats.map((hat, index) => {
      const def = getHatById(hat.defId)
      return {
        index,
        name: def?.name ?? hat.defId,
        effectText: def ? formatEquipEffects(def.effects) : ''
      }
    })
  )

  const handleEquipHatFromPopup = (index: number) => {
    if (inventoryStore.equipHat(index)) {
      const def = getHatById(inventoryStore.ownedHats[index]!.defId)
      addLog(i18n.global.t('charInfoView.log_equipped', { name: def?.name ?? 'Mũ' }))
      activeSlot.value = null
    }
  }

  const handleUnequipHatFromPopup = () => {
    const idx = inventoryStore.equippedHatIndex
    const def = idx >= 0 ? getHatById(inventoryStore.ownedHats[idx]!.defId) : null
    if (inventoryStore.unequipHat()) {
      addLog(i18n.global.t('charInfoView.log_unequipped', { name: def?.name ?? 'Mũ' }))
      activeSlot.value = null
    }
  }

  // === 鞋子 ===

  const equippedShoeName = computed(() => {
    const shoe = inventoryStore.ownedShoes[inventoryStore.equippedShoeIndex]
    if (!shoe) return null
    return getShoeById(shoe.defId)?.name ?? null
  })

  const ownedShoeList = computed(() =>
    inventoryStore.ownedShoes.map((shoe, index) => {
      const def = getShoeById(shoe.defId)
      return {
        index,
        name: def?.name ?? shoe.defId,
        effectText: def ? formatEquipEffects(def.effects) : ''
      }
    })
  )

  const handleEquipShoeFromPopup = (index: number) => {
    if (inventoryStore.equipShoe(index)) {
      const def = getShoeById(inventoryStore.ownedShoes[index]!.defId)
      addLog(i18n.global.t('charInfoView.log_equipped', { name: def?.name ?? 'Giày' }))
      activeSlot.value = null
    }
  }

  const handleUnequipShoeFromPopup = () => {
    const idx = inventoryStore.equippedShoeIndex
    const def = idx >= 0 ? getShoeById(inventoryStore.ownedShoes[idx]!.defId) : null
    if (inventoryStore.unequipShoe()) {
      addLog(i18n.global.t('charInfoView.log_unequipped', { name: def?.name ?? 'Giày' }))
      activeSlot.value = null
    }
  }

  // === 被动 ===
  const unlockedWalletItems = computed(() => WALLET_ITEMS.filter(w => walletStore.has(w.id)))

  // === 家庭 ===
  const spouseInfo = computed(() => {
    const spouseState = npcStore.getSpouse()
    if (!spouseState) return null
    const npcDef = getNpcById(spouseState.npcId)
    return npcDef ? { name: npcDef.name } : null
  })

  // === 导航 ===
  const goToUpgrade = () => {
    navigateToPanel('upgrade')
  }

  const goToSkills = () => {
    navigateToPanel('skills')
  }
</script>
