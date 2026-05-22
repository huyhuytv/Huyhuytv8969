<template>
  <main aria-labelledby="inventory-title">
    <!-- 标题 -->
    <h1 id="inventory-title" class="flex items-center justify-between mb-1">
      <div class="flex items-center space-x-1.5 text-sm text-accent">
        <Package :size="14" aria-hidden="true" />
        <span>{{ $t('inventoryView.title') }}</span>
      </div>
      <span class="text-xs text-muted">
        {{ inventoryStore.items.length }}/{{ inventoryStore.capacity }}
        <span v-if="inventoryStore.tempItems.length > 0" class="text-danger">+{{ inventoryStore.tempItems.length }}{{ $t('inventoryView.spill') }}</span>
      </span>
    </h1>

    <!-- 页签切换 -->
    <div class="flex space-x-1 mb-3">
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'items' }" @click="tab = 'items'">{{ $t('inventoryView.tab_items') }}</Button>
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'tools' }" @click="tab = 'tools'">{{ $t('inventoryView.tab_tools') }}</Button>
      <Button
        class="flex-1 justify-center"
        :class="{ '!bg-danger !text-text': tab === 'temp', 'text-danger': tab !== 'temp' && inventoryStore.tempItems.length > 0 }"
        @click="tab = 'temp'"
      >
        {{ $t('inventoryView.tab_temp') }}{{ inventoryStore.tempItems.length > 0 ? `(${inventoryStore.tempItems.length})` : '' }}
      </Button>
    </div>

    <!-- 物品页 -->
    <section v-if="tab === 'items'" aria-labelledby="tab-items-title">
      <h2 id="tab-items-title" class="sr-only">{{ $t('inventoryView.tab_items') }}</h2>
      <div v-if="inventoryStore.items.length > 1" class="flex justify-end mb-1.5 space-x-1">
        <Button
          class="py-0 px-1.5"
          :class="{ '!bg-accent !text-bg': isFilterActive }"
          :icon="Filter"
          :icon-size="12"
          @click="openFilterModal"
        >
          {{ $t('inventoryView.btn_filter') }}
        </Button>
        <Button class="py-0 px-1.5" :icon="ArrowDown01" :icon-size="12" @click="inventoryStore.sortItems()">{{ $t('inventoryView.btn_sort') }}</Button>
      </div>
      <div v-if="filteredItems.length > 0" class="grid grid-cols-3 md:grid-cols-5 gap-1.5" role="list">
        <div
          v-for="(item, idx) in filteredItems"
          :key="idx"
          class="border border-accent/20 rounded-xs p-1.5 text-center cursor-pointer hover:bg-accent/5 transition-colors relative focus:outline-none focus:ring-2 focus:ring-accent/40"
          role="button"
          tabindex="0"
          :aria-label="`${getItemById(item.itemId)?.name} x${item.quantity}. ${item.locked ? $t('inventoryView.btn_lock') : ''}. ${item.quality !== 'normal' ? QUALITY_NAMES[item.quality] : ''}`"
          @click="activeItemKey = item.itemId + ':' + item.quality"
          @keydown.enter.prevent="activeItemKey = item.itemId + ':' + item.quality"
          @keydown.space.prevent="activeItemKey = item.itemId + ':' + item.quality"
        >
          <Lock v-if="item.locked" :size="10" class="absolute top-0.5 left-0.5 text-accent/60" aria-hidden="true" />
          <div
            class="text-xs truncate"
            :class="{
              'text-quality-fine': item.quality === 'fine',
              'text-quality-excellent': item.quality === 'excellent',
              'text-quality-supreme': item.quality === 'supreme'
            }"
            aria-hidden="true"
          >
            {{ getItemById(item.itemId)?.name }}
          </div>
          <div class="text-xs text-muted" aria-hidden="true">×{{ item.quantity }}</div>
        </div>

        <!-- 空格子 -->
        <div
          v-for="i in isFilterActive ? 0 : Math.max(0, inventoryStore.capacity - inventoryStore.items.length)"
          :key="'empty-' + i"
          class="border border-accent/10 rounded-xs p-1.5 text-center text-xs text-muted/30"
        >
          {{ $t('inventoryView.slot_empty') }}
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center py-4 text-muted">
        <Package :size="24" />
        <p class="text-xs mt-1">{{ $t('inventoryView.empty_pack') }}</p>
      </div>
    </section>

    <!-- 临时背包页 -->
    <section v-if="tab === 'temp'" aria-labelledby="tab-temp-title">
      <h2 id="tab-temp-title" class="sr-only">{{ $t('inventoryView.tab_temp') }}</h2>
      <div v-if="inventoryStore.tempItems.length > 0">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-[10px] text-muted">{{ $t('inventoryView.temp_desc') }}</span>
          <Button v-if="!inventoryStore.isFull" class="py-0 px-1.5" @click="handleMoveAllFromTemp">{{ $t('inventoryView.btn_all_retrieve') }}</Button>
        </div>
        <div class="grid grid-cols-3 md:grid-cols-5 gap-1.5" role="list">
          <div
            v-for="(item, idx) in inventoryStore.tempItems"
            :key="'temp-' + idx"
            class="border border-danger/30 rounded-xs p-1.5 text-center cursor-pointer hover:bg-danger/5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40"
            role="button"
            tabindex="0"
            :aria-label="`${getItemById(item.itemId)?.name} x${item.quantity}. ${item.quality !== 'normal' ? QUALITY_NAMES[item.quality] : ''}`"
            @click="activeTempIdx = idx"
             @keydown.enter.prevent="activeTempIdx = idx"
            @keydown.space.prevent="activeTempIdx = idx"
          >
            <div
              class="text-xs truncate"
              :class="{
                'text-quality-fine': item.quality === 'fine',
                'text-quality-excellent': item.quality === 'excellent',
                'text-quality-supreme': item.quality === 'supreme'
              }"
              aria-hidden="true"
            >
              {{ getItemById(item.itemId)?.name }}
            </div>
            <div class="text-xs text-muted" aria-hidden="true">×{{ item.quantity }}</div>
          </div>

          <!-- 空格子 -->
          <div
            v-for="i in Math.max(0, 10 - inventoryStore.tempItems.length)"
            :key="'temp-empty-' + i"
            class="border border-danger/10 rounded-xs p-1.5 text-center text-xs text-muted/30"
          >
            {{ $t('inventoryView.slot_empty') }}
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center py-4 text-muted">
        <Archive :size="24" />
        <p class="text-xs mt-1">{{ $t('inventoryView.empty_temp_pack') }}</p>
      </div>
    </section>

    <!-- 装备页 -->
    <section v-if="tab === 'tools'" aria-labelledby="tab-tools-title">
      <h2 id="tab-tools-title" class="sr-only">{{ $t('inventoryView.tab_tools') }}</h2>
      <!-- kế hoạch按钮 -->
      <div class="flex items-center justify-end mb-1.5 space-x-1.5">
        <span v-if="activePresetName" class="text-[10px] text-success truncate">{{ activePresetName }}</span>
        <Button class="py-0 px-1.5" :icon="ArrowDown01" :icon-size="12" @click="inventoryStore.sortEquipment()">{{ $t('inventoryView.btn_sort') }}</Button>
        <Button class="py-0 px-1.5" :icon="BookMarked" :icon-size="12" @click="showPresetModal = true">{{ $t('inventoryView.btn_presets') }}</Button>
      </div>
      <div class="border border-accent/20 rounded-xs p-2 mb-3">
        <p class="text-xs text-muted mb-1">{{ $t('inventoryView.weapon_title') }}</p>
        <div class="flex flex-col space-y-1 max-h-40 overflow-y-auto" role="list">
          <div
            v-for="(weapon, idx) in inventoryStore.ownedWeapons"
            :key="idx"
            class="flex items-center justify-between border rounded-xs px-2 py-1 mr-1 cursor-pointer hover:bg-accent/5 focus:outline-none focus:ring-2 focus:ring-accent/40"
            :class="idx === inventoryStore.equippedWeaponIndex ? 'border-accent/30' : 'border-accent/10'"
            role="button"
            tabindex="0"
            :aria-label="`${getWeaponDisplayName(weapon.defId, weapon.enchantmentId)}. ${idx === inventoryStore.equippedWeaponIndex ? $t('inventoryView.equipped') : getWeaponSellPrice(weapon.defId, weapon.enchantmentId) + $t('status_bar.money_unit')}`"
            @click="activeWeaponIdx = idx"
            @keydown.enter.prevent="activeWeaponIdx = idx"
            @keydown.space.prevent="activeWeaponIdx = idx"
          >
            <span class="text-xs" :class="idx === inventoryStore.equippedWeaponIndex ? 'text-accent' : ''" aria-hidden="true">
              {{ getWeaponDisplayName(weapon.defId, weapon.enchantmentId) }}
            </span>
            <span v-if="idx === inventoryStore.equippedWeaponIndex" class="text-xs text-accent" aria-hidden="true">{{ $t('inventoryView.equipped') }}</span>
            <span v-else class="text-xs text-muted" aria-hidden="true">{{ getWeaponSellPrice(weapon.defId, weapon.enchantmentId) }}{{ $t('status_bar.money_unit') }}</span>
          </div>
        </div>
      </div>

      <!-- 帽子 -->
      <div class="border border-accent/20 rounded-xs p-2 mb-3">
        <p class="text-xs text-muted mb-1">{{ $t('inventoryView.hat_title') }}</p>
        <div v-if="inventoryStore.ownedHats.length > 0" class="flex flex-col space-y-1">
          <!-- 槽位 -->
          <div class="border border-accent/10 rounded-xs px-2 py-1 text-center mb-1">
            <p class="text-[10px] text-muted">{{ $t('inventoryView.equipped') }}</p>
            <p class="text-xs" :class="equippedHatName ? 'text-accent' : 'text-muted/40'">
              {{ equippedHatName ?? $t('inventoryView.slot_empty') }}
            </p>
          </div>
          <!-- 拥有的帽子列表 -->
          <div class="max-h-40 overflow-y-auto flex flex-col space-y-1" role="list">
            <div
              v-for="(hat, idx) in inventoryStore.ownedHats"
              :key="idx"
              class="flex items-center justify-between border rounded-xs px-2 py-1 mr-1 cursor-pointer hover:bg-accent/5 focus:outline-none focus:ring-2 focus:ring-accent/40"
              :class="inventoryStore.equippedHatIndex === idx ? 'border-accent/30' : 'border-accent/10'"
              role="button"
              tabindex="0"
              :aria-label="`${getHatById(hat.defId)?.name ?? hat.defId}. ${getHatById(hat.defId)?.description}. ${inventoryStore.equippedHatIndex === idx ? $t('inventoryView.equipped') : ''}`"
              @click="activeHatIdx = idx"
              @keydown.enter.prevent="activeHatIdx = idx"
              @keydown.space.prevent="activeHatIdx = idx"
            >
              <div class="min-w-0" aria-hidden="true">
                <span class="text-xs" :class="inventoryStore.equippedHatIndex === idx ? 'text-accent' : ''">
                  {{ getHatById(hat.defId)?.name ?? hat.defId }}
                </span>
                <p class="text-[10px] text-muted truncate">{{ getHatById(hat.defId)?.description }}</p>
              </div>
              <Button
                class="py-0 px-1.5 shrink-0 ml-2"
                :class="inventoryStore.equippedHatIndex === idx ? '!bg-accent !text-bg' : ''"
                @click.stop="handleToggleHat(idx)"
              >
                {{ inventoryStore.equippedHatIndex === idx ? $t('inventoryView.btn_unequip') : $t('inventoryView.btn_equip') }}
              </Button>
            </div>
          </div>
        </div>
        <p v-else class="text-xs text-muted/40 text-center py-2">{{ $t('inventoryView.no_hat') }}</p>
      </div>

      <!-- 鞋子 -->
      <div class="border border-accent/20 rounded-xs p-2 mb-3">
        <p class="text-xs text-muted mb-1">{{ $t('inventoryView.shoe_title') }}</p>
        <div v-if="inventoryStore.ownedShoes.length > 0" class="flex flex-col space-y-1">
          <!-- 槽位 -->
          <div class="border border-accent/10 rounded-xs px-2 py-1 text-center mb-1">
            <p class="text-[10px] text-muted">{{ $t('inventoryView.equipped') }}</p>
            <p class="text-xs" :class="equippedShoeName ? 'text-accent' : 'text-muted/40'">
              {{ equippedShoeName ?? $t('inventoryView.slot_empty') }}
            </p>
          </div>
          <!-- 拥有的鞋子列表 -->
          <div class="max-h-40 overflow-y-auto flex flex-col space-y-1" role="list">
            <div
              v-for="(shoe, idx) in inventoryStore.ownedShoes"
              :key="idx"
              class="flex items-center justify-between border rounded-xs px-2 py-1 mr-1 cursor-pointer hover:bg-accent/5 focus:outline-none focus:ring-2 focus:ring-accent/40"
              :class="inventoryStore.equippedShoeIndex === idx ? 'border-accent/30' : 'border-accent/10'"
              role="button"
              tabindex="0"
              :aria-label="`${getShoeById(shoe.defId)?.name ?? shoe.defId}. ${getShoeById(shoe.defId)?.description}. ${inventoryStore.equippedShoeIndex === idx ? $t('inventoryView.equipped') : ''}`"
              @click="activeShoeIdx = idx"
              @keydown.enter.prevent="activeShoeIdx = idx"
              @keydown.space.prevent="activeShoeIdx = idx"
            >
              <div class="min-w-0" aria-hidden="true">
                <span class="text-xs" :class="inventoryStore.equippedShoeIndex === idx ? 'text-accent' : ''">
                  {{ getShoeById(shoe.defId)?.name ?? shoe.defId }}
                </span>
                <p class="text-[10px] text-muted truncate">{{ getShoeById(shoe.defId)?.description }}</p>
              </div>
              <Button
                class="py-0 px-1.5 shrink-0 ml-2"
                :class="inventoryStore.equippedShoeIndex === idx ? '!bg-accent !text-bg' : ''"
                @click.stop="handleToggleShoe(idx)"
              >
                {{ inventoryStore.equippedShoeIndex === idx ? $t('inventoryView.btn_unequip') : $t('inventoryView.btn_equip') }}
              </Button>
            </div>
          </div>
        </div>
        <p v-else class="text-xs text-muted/40 text-center py-2">{{ $t('inventoryView.no_shoe') }}</p>
      </div>

      <!-- 戒指 -->
      <div class="border border-accent/20 rounded-xs p-2">
        <p class="text-xs text-muted mb-1">{{ $t('inventoryView.ring_title') }}</p>
        <div v-if="inventoryStore.ownedRings.length > 0" class="flex flex-col space-y-1">
          <!-- 槽位 -->
          <div class="flex space-x-1 mb-1">
            <div class="flex-1 border border-accent/10 rounded-xs px-2 py-1 text-center">
              <p class="text-[10px] text-muted">{{ $t('inventoryView.slot_title1') }}</p>
              <p class="text-xs" :class="equippedRing1Name ? 'text-accent' : 'text-muted/40'">
                {{ equippedRing1Name ?? $t('inventoryView.slot_empty') }}
              </p>
            </div>
            <div class="flex-1 border border-accent/10 rounded-xs px-2 py-1 text-center">
              <p class="text-[10px] text-muted">{{ $t('inventoryView.slot_title2') }}</p>
              <p class="text-xs" :class="equippedRing2Name ? 'text-accent' : 'text-muted/40'">
                {{ equippedRing2Name ?? $t('inventoryView.slot_empty') }}
              </p>
            </div>
          </div>
          <!-- 拥有的戒指列表 -->
          <div class="max-h-40 overflow-y-auto flex flex-col space-y-1" role="list">
            <div
              v-for="(ring, idx) in inventoryStore.ownedRings"
              :key="idx"
              class="flex items-center justify-between border rounded-xs px-2 py-1 mr-1 cursor-pointer hover:bg-accent/5 focus:outline-none focus:ring-2 focus:ring-accent/40"
              :class="isRingEquipped(idx) ? 'border-accent/30' : 'border-accent/10'"
              role="button"
              tabindex="0"
              :aria-label="`${getRingById(ring.defId)?.name ?? ring.defId}. ${getRingById(ring.defId)?.description}. ${inventoryStore.equippedRingSlot1 === idx ? $t('inventoryView.slot1') : inventoryStore.equippedRingSlot2 === idx ? $t('inventoryView.slot2') : ''}`"
              @click="activeRingIdx = idx"
              @keydown.enter.prevent="activeRingIdx = idx"
              @keydown.space.prevent="activeRingIdx = idx"
            >
              <div class="min-w-0" aria-hidden="true">
                <span class="text-xs" :class="isRingEquipped(idx) ? 'text-accent' : ''">
                  {{ getRingById(ring.defId)?.name ?? ring.defId }}
                </span>
                <p class="text-[10px] text-muted truncate">{{ getRingById(ring.defId)?.description }}</p>
              </div>
              <div class="flex space-x-1 shrink-0 ml-2">
                <Button
                  class="py-0 px-1.5"
                  :class="
                    inventoryStore.equippedRingSlot1 === idx
                      ? '!bg-accent !text-bg'
                      : isRingBlockedForSlot(idx, 0)
                        ? 'opacity-30 cursor-not-allowed'
                        : ''
                  "
                  :disabled="isRingBlockedForSlot(idx, 0)"
                  @click.stop="handleToggleRingSlot(idx, 0)"
                >
                  {{ $t('inventoryView.slot1') }}
                </Button>
                <Button
                  class="py-0 px-1.5"
                  :class="
                    inventoryStore.equippedRingSlot2 === idx
                      ? '!bg-accent !text-bg'
                      : isRingBlockedForSlot(idx, 1)
                        ? 'opacity-30 cursor-not-allowed'
                        : ''
                  "
                  :disabled="isRingBlockedForSlot(idx, 1)"
                  @click.stop="handleToggleRingSlot(idx, 1)"
                >
                  {{ $t('inventoryView.slot2') }}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="text-xs text-muted/40 text-center py-2">{{ $t('inventoryView.no_ring') }}</p>
      </div>

      <!-- 套装效果 -->
      <div v-if="inventoryStore.activeSets.length > 0" class="border border-accent/20 rounded-xs p-2 mt-3">
        <p class="text-xs text-muted mb-1">{{ $t('inventoryView.set_effect') }}</p>
        <div v-for="set in inventoryStore.activeSets" :key="set.id" class="border border-accent/10 rounded-xs p-2 mb-1.5 last:mb-0">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs text-accent">{{ set.name }}</span>
            <span class="text-xs text-muted">{{ set.equippedCount }}/3</span>
          </div>
          <div v-for="bonus in set.bonuses" :key="bonus.count" class="text-[10px]" :class="bonus.active ? 'text-success' : 'text-muted/40'">
            ({{ bonus.count }}{{ $i18n.locale === 'vi' ? ' món' : 'miếng' }}) {{ bonus.description }}
          </div>
        </div>
      </div>
    </section>

    <!-- 装备kế hoạch弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showPresetModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showPresetModal = false"
      >
        <div ref="modalRef_d9r6j" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showPresetModal = false">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">{{ $t('inventoryView.presets_title') }}</p>
          <div v-if="inventoryStore.equipmentPresets.length > 0" class="flex flex-col space-y-1.5 mb-3 max-h-60 overflow-y-auto">
            <div
              v-for="preset in inventoryStore.equipmentPresets"
              :key="preset.id"
              class="border rounded-xs p-2"
              :class="activePresetId === preset.id ? 'border-accent/40' : 'border-accent/10'"
            >
              <div class="flex items-center justify-between mb-1">
                <template v-if="renamingPresetId === preset.id">
                  <input
                    v-model="renameValue"
                    class="bg-transparent border border-accent/30 rounded-xs px-1 py-0.5 text-xs text-text w-full mr-2 outline-none"
                    @keyup.enter="confirmRename(preset.id)"
                    @blur="confirmRename(preset.id)"
                  />
                </template>
                <template v-else>
                  <span class="text-xs text-accent truncate">{{ preset.name }}</span>
                </template>
                <span v-if="activePresetId === preset.id" class="text-[10px] text-success shrink-0 ml-1">{{ $t('inventoryView.using') }}</span>
              </div>
              <div class="flex space-x-1">
                <Button
                  class="py-0 px-1.5 flex-1 justify-center"
                  :disabled="activePresetId === preset.id"
                  @click="handleApplyPreset(preset.id)"
                >
                  {{ $t('inventoryView.btn_use') }}
                </Button>
                <Button class="py-0 px-1.5 flex-1 justify-center" @click="handleSaveToPreset(preset.id)">{{ $t('inventoryView.btn_save') }}</Button>
                <Button class="py-0 px-1.5" @click="startRename(preset)">{{ $t('inventoryView.btn_rename') }}</Button>
                <Button class="py-0 px-1.5 text-danger" :disabled="activePresetId === preset.id" @click="handleDeletePreset(preset.id)">
                  {{ $t('inventoryView.btn_delete') }}
                </Button>
              </div>
            </div>
          </div>
          <div v-else class="flex flex-col items-center justify-center py-6 mb-3">
            <BookMarked :size="24" class="text-muted/30" />
            <p class="text-xs text-muted mt-1">{{ $t('inventoryView.no_presets') }}</p>
            <p class="text-[10px] text-muted/60 mt-0.5">{{ $t('inventoryView.presets_desc') }}</p>
          </div>
          <Button class="w-full justify-center" :disabled="inventoryStore.equipmentPresets.length >= 5" @click="handleCreatePreset">
            {{ $t('inventoryView.btn_new_preset') }}
          </Button>
        </div>
      </div>
    </Transition>

    <!-- 临时背包物品详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showFilterModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showFilterModal = false"
      >
        <div ref="modalRef_43zkv" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showFilterModal = false">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">{{ $t('inventoryView.filter_title') }}</p>
          <p class="text-[10px] text-muted mb-2">{{ $t('inventoryView.filter_desc') }}</p>
          <div class="grid grid-cols-3 gap-1.5 mb-3" aria-label="Lọc theo loại vật phẩm" role="list">
            <div
                v-for="cat in FILTER_CATEGORIES"
              :key="cat"
              class="border rounded-xs px-1.5 py-1 text-center text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 transition-colors"
                :class="tempFilter.has(cat) ? 'border-accent/50 bg-accent/10 text-accent' : 'border-accent/20 text-muted hover:bg-accent/5'"
              role="checkbox"
              :aria-checked="tempFilter.has(cat)"
              tabindex="0"
              @click="toggleCategory(cat)"
              @keydown.enter.prevent="toggleCategory(cat)"
              @keydown.space.prevent="toggleCategory(cat)"
            >
              {{ $t('inventoryView.categories.' + cat) }}
            </div>
          </div>
          <div class="flex space-x-1.5">
            <Button class="flex-1 justify-center" @click="handleClearFilter">{{ $t('inventoryView.btn_show_all') }}</Button>
            <Button class="flex-1 justify-center !bg-accent !text-bg" @click="handleSaveFilter">{{ $t('inventoryView.btn_save') }}</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 临时背包物品详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="activeTempItem"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="activeTempIdx = null"
      >
        <div ref="modalRef_uod0l" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="activeTempIdx = null">
            <X :size="14" />
          </button>
          <p
            class="text-sm mb-2"
            :class="{
              'text-quality-fine': activeTempItem.quality === 'fine',
              'text-quality-excellent': activeTempItem.quality === 'excellent',
              'text-quality-supreme': activeTempItem.quality === 'supreme',
              'text-accent': activeTempItem.quality === 'normal'
            }"
          >
            {{ activeTempItemDef?.name }}
            <span class="text-xs text-danger ml-1">{{ $t('inventoryView.temp_tag') }}</span>
          </p>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ activeTempItemDef?.description }}</p>
          </div>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ $t('inventoryView.qty') }}</span>
              <span class="text-xs">×{{ activeTempItem.quantity }}</span>
            </div>
            <div v-if="activeTempItem.quality !== 'normal'" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.quality') }}</span>
              <span
                class="text-xs"
                :class="{
                  'text-quality-fine': activeTempItem.quality === 'fine',
                  'text-quality-excellent': activeTempItem.quality === 'excellent',
                  'text-quality-supreme': activeTempItem.quality === 'supreme'
                }"
              >
                {{ QUALITY_NAMES[activeTempItem.quality] }}
              </span>
            </div>
          </div>
          <div class="flex flex-col space-y-1.5" role="list">
            <Button
              class="w-full justify-center"
              :class="inventoryStore.isFull ? 'opacity-50' : ''"
              :icon="ArrowRight"
              :icon-size="12"
              :disabled="inventoryStore.isFull"
              @click="handleMoveFromTemp"
            >
              {{ $t('inventoryView.btn_move_to_bag') }}
            </Button>
            <Button class="w-full justify-center text-danger border-danger/40" @click="handleDiscardTemp">{{ $t('inventoryView.btn_discard') }}</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 物品详情弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="activeItem" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" @click.self="activeItemKey = null">
        <div ref="modalRef_z91r1" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="activeItemKey = null">
            <X :size="14" />
          </button>

          <p
            class="text-sm mb-2"
            :class="{
              'text-quality-fine': activeItem.quality === 'fine',
              'text-quality-excellent': activeItem.quality === 'excellent',
              'text-quality-supreme': activeItem.quality === 'supreme',
              'text-accent': activeItem.quality === 'normal'
            }"
          >
            {{ activeItemDef?.name }}
          </p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ activeItemDef?.description }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ $t('inventoryView.qty') }}</span>
              <span class="text-xs">×{{ activeItem.quantity }}</span>
            </div>
            <div v-if="activeItem.quality !== 'normal'" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.quality') }}</span>
              <span
                class="text-xs"
                :class="{
                  'text-quality-fine': activeItem.quality === 'fine',
                  'text-quality-excellent': activeItem.quality === 'excellent',
                  'text-quality-supreme': activeItem.quality === 'supreme'
                }"
              >
                {{ QUALITY_NAMES[activeItem.quality] }}
              </span>
            </div>
            <div v-if="activeItemDef?.sellPrice" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.sell_price') }}</span>
              <span class="text-xs text-accent">{{ activeItemDef.sellPrice }}{{ $t('status_bar.money_unit') }}</span>
            </div>
            <div v-if="activeItemDef?.staminaRestore" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.restore') }}</span>
              <span class="text-xs text-success">
                +{{ activeItemDef.staminaRestore }}{{ $t('inventoryView.stamina') }}
                <template v-if="activeItemDef.healthRestore">/ +{{ activeItemDef.healthRestore }}HP</template>
              </span>
            </div>
            <div v-if="activeItemBuff" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.buff') }}</span>
              <span class="text-xs text-accent">{{ activeItemBuff.description }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.source') }}</span>
              <span class="text-xs text-muted">{{ getItemSource(activeItem.itemId) }}</span>
            </div>
          </div>

          <div class="flex flex-col space-y-1.5" role="list">
            <Button
              class="w-full justify-center"
              :icon="activeItem.locked ? LockOpen : Lock"
              :icon-size="12"
              @click="inventoryStore.toggleLock(activeItem.itemId, activeItem.quality)"
            >
              {{ activeItem.locked ? $t('inventoryView.btn_unlock') : $t('inventoryView.btn_lock') }}
            </Button>
            <Button
              v-if="isEdible(activeItem.itemId)"
              class="w-full justify-center"
              :icon="Apple"
              :icon-size="12"
              @click="handleEat(activeItem.itemId, activeItem.quality)"
            >
              {{ $t('inventoryView.btn_eat') }}
            </Button>
            <Button
              v-if="isUsable(activeItem.itemId)"
              class="w-full justify-center"
              :icon="Zap"
              :icon-size="12"
              @click="handleUse(activeItem.itemId, activeItem.quality)"
            >
              {{ $t('inventoryView.btn_use') }}
            </Button>
            <!-- 丢弃 -->
            <template v-if="!activeItem.locked">
              <div v-if="discardMode" class="flex items-center space-x-1">
                <input
                  v-model.number="discardQty"
                  type="number"
                  :min="1"
                  :max="activeItem.quantity"
                  class="flex-1 bg-bg border border-accent/20 rounded-xs px-1.5 py-0.5 text-xs text-text w-12 text-center"
                />
                <Button class="flex-1 justify-center !bg-danger !text-text" @click="confirmDiscard">{{ $t('inventoryView.btn_confirm_discard') }}</Button>
                <Button class="flex-1 justify-center" @click="cancelDiscard">{{ $t('inventoryView.btn_cancel') }}</Button>
              </div>
              <Button
                v-else
                class="w-full justify-center text-danger border-danger/40"
                :icon="Trash2"
                :icon-size="12"
                @click="enterDiscardMode"
              >
                {{ $t('inventoryView.btn_discard') }}
              </Button>
            </template>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 武器详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="activeWeaponIdx !== null && activeWeaponDef"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="activeWeaponIdx = null"
      >
        <div ref="modalRef_xkvwm" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="activeWeaponIdx = null">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">{{ activeWeaponName }}</p>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ activeWeaponDef.description }}</p>
          </div>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ $t('inventoryView.weapon_type') }}</span>
              <span class="text-xs">{{ WEAPON_TYPE_NAMES[activeWeaponDef.type] }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.attack') }}</span>
              <span class="text-xs">{{ activeWeaponDef.attack }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.crit_rate') }}</span>
              <span class="text-xs">{{ Math.round(activeWeaponDef.critRate * 100) }}%</span>
            </div>
            <div v-if="activeWeaponEnchant" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.enchant') }}</span>
              <span class="text-xs text-accent">{{ activeWeaponEnchant.name }}:{{ activeWeaponEnchant.description }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.sell_price') }}</span>
              <span class="text-xs text-accent">{{ activeWeaponPrice }}{{ $t('status_bar.money_unit') }}</span>
            </div>
          </div>
          <div class="flex flex-col space-y-1.5" role="list">
            <Button v-if="activeWeaponIdx !== inventoryStore.equippedWeaponIndex" class="w-full justify-center" @click="handleEquipWeapon">
              {{ $t('inventoryView.btn_equip') }}
            </Button>
            <Button
              v-if="activeWeaponIdx !== inventoryStore.equippedWeaponIndex && inventoryStore.ownedWeapons.length > 1"
              class="w-full justify-center text-danger border-danger/40"
              @click="handleSellWeapon"
            >
              {{ $t('inventoryView.btn_sell_price', { price: activeWeaponPrice }) }}
            </Button>
            <p v-if="activeWeaponIdx === inventoryStore.equippedWeaponIndex" class="text-[10px] text-muted text-center">
              {{ $t('inventoryView.weapon_sell_blocked') }}
            </p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 戒指详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="activeRingIdx !== null && activeRingDef"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="activeRingIdx = null"
      >
        <div ref="modalRef_in3qa" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="activeRingIdx = null">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">{{ activeRingDef.name }}</p>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ activeRingDef.description }}</p>
          </div>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div v-for="eff in activeRingDef.effects" :key="eff.type" class="flex items-center justify-between mt-0.5 first:mt-0">
              <span class="text-xs text-muted">{{ RING_EFFECT_NAMES[eff.type] ?? eff.type }}</span>
              <span class="text-xs text-success">+{{ formatEffectValue(eff) }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.sell_price') }}</span>
              <span class="text-xs text-accent">{{ activeRingDef.sellPrice }}{{ $t('status_bar.money_unit') }}</span>
            </div>
          </div>
          <div class="flex flex-col space-y-1.5" role="list">
            <div class="flex space-x-1.5">
              <Button
                class="flex-1 justify-center"
                :class="activeRingIdx !== null && isRingBlockedForSlot(activeRingIdx, 0) ? 'opacity-30 cursor-not-allowed' : ''"
                :disabled="activeRingIdx !== null && isRingBlockedForSlot(activeRingIdx, 0)"
                @click="handleEquipRingFromPopup(0)"
              >
                {{ inventoryStore.equippedRingSlot1 === activeRingIdx ? $t('inventoryView.btn_unequip_slot1') : $t('inventoryView.btn_equip_slot1') }}
              </Button>
              <Button
                class="flex-1 justify-center"
                :class="activeRingIdx !== null && isRingBlockedForSlot(activeRingIdx, 1) ? 'opacity-30 cursor-not-allowed' : ''"
                :disabled="activeRingIdx !== null && isRingBlockedForSlot(activeRingIdx, 1)"
                @click="handleEquipRingFromPopup(1)"
              >
                {{ inventoryStore.equippedRingSlot2 === activeRingIdx ? $t('inventoryView.btn_unequip_slot2') : $t('inventoryView.btn_equip_slot2') }}
              </Button>
            </div>
            <Button class="w-full justify-center text-danger border-danger/40" @click="handleSellRing">
              {{ $t('inventoryView.btn_sell_price', { price: activeRingDef.sellPrice }) }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 帽子详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="activeHatIdx !== null && activeHatDef"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="activeHatIdx = null"
      >
        <div ref="modalRef_g72vq" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="activeHatIdx = null">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">{{ activeHatDef.name }}</p>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ activeHatDef.description }}</p>
          </div>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div v-for="eff in activeHatDef.effects" :key="eff.type" class="flex items-center justify-between mt-0.5 first:mt-0">
              <span class="text-xs text-muted">{{ RING_EFFECT_NAMES[eff.type] ?? eff.type }}</span>
              <span class="text-xs text-success">+{{ formatEffectValue(eff) }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.sell_price') }}</span>
              <span class="text-xs text-accent">{{ activeHatDef.sellPrice }}{{ $t('status_bar.money_unit') }}</span>
            </div>
          </div>
          <div class="flex flex-col space-y-1.5" role="list">
            <Button class="w-full justify-center" @click="handleToggleHatFromPopup">
              {{ inventoryStore.equippedHatIndex === activeHatIdx ? $t('inventoryView.btn_unequip') : $t('inventoryView.btn_equip') }}
            </Button>
            <Button class="w-full justify-center text-danger border-danger/40" @click="handleSellHat">
              {{ $t('inventoryView.btn_sell_price', { price: activeHatDef.sellPrice }) }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 鞋子详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="activeShoeIdx !== null && activeShoeDef"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="activeShoeIdx = null"
      >
        <div ref="modalRef_74zns" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="activeShoeIdx = null">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">{{ activeShoeDef.name }}</p>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ activeShoeDef.description }}</p>
          </div>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div v-for="eff in activeShoeDef.effects" :key="eff.type" class="flex items-center justify-between mt-0.5 first:mt-0">
              <span class="text-xs text-muted">{{ RING_EFFECT_NAMES[eff.type] ?? eff.type }}</span>
              <span class="text-xs text-success">+{{ formatEffectValue(eff) }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('inventoryView.sell_price') }}</span>
              <span class="text-xs text-accent">{{ activeShoeDef.sellPrice }}{{ $t('status_bar.money_unit') }}</span>
            </div>
          </div>
          <div class="flex flex-col space-y-1.5" role="list">
            <Button class="w-full justify-center" @click="handleToggleShoeFromPopup">
              {{ inventoryStore.equippedShoeIndex === activeShoeIdx ? $t('inventoryView.btn_unequip') : $t('inventoryView.btn_equip') }}
            </Button>
            <Button class="w-full justify-center text-danger border-danger/40" @click="handleSellShoe">
              {{ $t('inventoryView.btn_sell_price', { price: activeShoeDef.sellPrice }) }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">

  import { useFocusTrap } from '@/composables/useFocusTrap'
  import { ref, computed, watch } from 'vue'
  import { Apple, Archive, ArrowDown01, ArrowRight, BookMarked, Filter, Lock, LockOpen, Package, Trash2, X, Zap } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import { useCookingStore } from '@/stores/useCookingStore'
  import { useGameStore } from '@/stores/useGameStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { useSettingsStore } from '@/stores/useSettingsStore'
  import { useSkillStore } from '@/stores/useSkillStore'
  import { getItemById, getItemSource } from '@/data'
  import { getRecipeById } from '@/data/recipes'
  import { getWeaponById, getWeaponDisplayName, getWeaponSellPrice, getEnchantmentById, WEAPON_TYPE_NAMES } from '@/data/weapons'
  import { getRingById } from '@/data/rings'
  import { getHatById } from '@/data/hats'
  import { getShoeById } from '@/data/shoes'
  import { QUALITY_NAMES } from '@/composables/useFarmActions'
  import { addLog } from '@/composables/useGameLog'
  import i18n from '@/locales'
  import type { Quality, RingEffectType, ItemCategory } from '@/types'


  const modalRef_d9r6j = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_d9r6j);
  const modalRef_43zkv = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_43zkv);
  const modalRef_uod0l = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_uod0l);
  const modalRef_z91r1 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_z91r1);
  const modalRef_xkvwm = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_xkvwm);
  const modalRef_in3qa = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_in3qa);
  const modalRef_g72vq = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_g72vq);
  const modalRef_74zns = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_74zns);



  const inventoryStore = useInventoryStore()
  const playerStore = usePlayerStore()
  const skillStore = useSkillStore()
  const gameStore = useGameStore()
  const cookingStore = useCookingStore()
  const settingsStore = useSettingsStore()

  // === 页签 ===

  const tab = ref<'items' | 'tools' | 'temp'>('items')

  // === 物品筛选 ===

  const FILTER_CATEGORIES: ItemCategory[] = [
    'seed',
    'crop',
    'fruit',
    'fish',
    'animal_product',
    'processed',
    'food',
    'ore',
    'gem',
    'material',
    'machine',
    'sprinkler',
    'fertilizer',
    'bait',
    'tackle',
    'bomb',
    'sapling',
    'gift',
    'fossil',
    'artifact',
    'misc'
  ]

  const showFilterModal = ref(false)
  const tempFilter = ref<Set<ItemCategory>>(new Set())

  const isFilterActive = computed(() => settingsStore.inventoryFilter.length > 0)

  const filteredItems = computed(() => {
    if (settingsStore.inventoryFilter.length === 0) return inventoryStore.items
    const allowed = new Set(settingsStore.inventoryFilter)
    return inventoryStore.items.filter(item => {
      const def = getItemById(item.itemId)
      return def && allowed.has(def.category)
    })
  })

  const openFilterModal = () => {
    tempFilter.value = new Set(settingsStore.inventoryFilter)
    showFilterModal.value = true
  }

  const toggleCategory = (cat: ItemCategory) => {
    if (tempFilter.value.has(cat)) {
      tempFilter.value.delete(cat)
    } else {
      tempFilter.value.add(cat)
    }
  }

  const handleSaveFilter = () => {
    settingsStore.inventoryFilter = [...tempFilter.value]
    showFilterModal.value = false
  }

  const handleClearFilter = () => {
    tempFilter.value = new Set()
  }

  // === 装备kế hoạch ===

  const showPresetModal = ref(false)
  const renamingPresetId = ref<string | null>(null)
  const renameValue = ref('')

  const activePresetId = computed(() => inventoryStore.activePresetId)

  const activePresetName = computed(() => {
    if (!activePresetId.value) return null
    return inventoryStore.equipmentPresets.find(p => p.id === activePresetId.value)?.name ?? null
  })

  const handleCreatePreset = () => {
    inventoryStore.createEquipmentPreset((i18n.global.locale.value === 'vi' ? 'Gợi ý ' : 'kế hoạch') + (inventoryStore.equipmentPresets.length + 1))
  }

  const startRename = (preset: { id: string; name: string }) => {
    renamingPresetId.value = preset.id
    renameValue.value = preset.name
  }

  const confirmRename = (id: string) => {
    if (renamingPresetId.value === null) return
    inventoryStore.renameEquipmentPreset(id, renameValue.value)
    renamingPresetId.value = null
  }

  const handleSaveToPreset = (id: string) => {
    if (renamingPresetId.value) confirmRename(renamingPresetId.value)
    inventoryStore.saveCurrentToPreset(id)
    addLog(i18n.global.locale.value === 'vi' ? 'Đã lưu trang bị hiện tại vào gợi ý.' : 'Các thiết bị hiện tại đã được lưu vào kế hoạch.')
  }

  const handleApplyPreset = (id: string) => {
    if (renamingPresetId.value) confirmRename(renamingPresetId.value)
    const result = inventoryStore.applyEquipmentPreset(id)
    addLog(result.message)
  }

  const handleDeletePreset = (id: string) => {
    if (renamingPresetId.value) confirmRename(renamingPresetId.value)
    inventoryStore.deleteEquipmentPreset(id)
  }

  // === 戒指辅助 ===

  const equippedRing1Name = computed(() => {
    const idx = inventoryStore.equippedRingSlot1
    const ring = inventoryStore.ownedRings[idx]
    if (!ring) return null
    return getRingById(ring.defId)?.name ?? null
  })

  const equippedRing2Name = computed(() => {
    const idx = inventoryStore.equippedRingSlot2
    const ring = inventoryStore.ownedRings[idx]
    if (!ring) return null
    return getRingById(ring.defId)?.name ?? null
  })

  const isRingEquipped = (idx: number): boolean => {
    return inventoryStore.equippedRingSlot1 === idx || inventoryStore.equippedRingSlot2 === idx
  }

  /** 检查戒指是否因同defId冲突被另一槽位阻止 */
  const isRingBlockedForSlot = (ringIdx: number, slot: 0 | 1): boolean => {
    const otherSlotIdx = slot === 0 ? inventoryStore.equippedRingSlot2 : inventoryStore.equippedRingSlot1
    if (otherSlotIdx < 0 || otherSlotIdx === ringIdx) return false
    if (otherSlotIdx >= inventoryStore.ownedRings.length) return false
    return inventoryStore.ownedRings[ringIdx]?.defId === inventoryStore.ownedRings[otherSlotIdx]?.defId
  }

  /** 切换戒指槽位（点击高亮按钮 → 卸下；点击非高亮按钮 → 装备/换位） */
  const handleToggleRingSlot = (ringIdx: number, slot: 0 | 1) => {
    const slotRef = slot === 0 ? inventoryStore.equippedRingSlot1 : inventoryStore.equippedRingSlot2
    if (slotRef === ringIdx) {
      inventoryStore.unequipRing(slot)
    } else {
      if (isRingBlockedForSlot(ringIdx, slot)) return
      inventoryStore.equipRing(ringIdx, slot)
    }
  }

  // === 戒指效果显示 ===

  const RING_EFFECT_NAMES: Record<RingEffectType, string> = {
    attack_bonus: i18n.global.locale.value === 'vi' ? 'Tấn công' : 'Tấn công',
    crit_rate_bonus: i18n.global.locale.value === 'vi' ? 'Bạo kích' : 'Tỷ lệ trúng đòn chí mạng',
    defense_bonus: i18n.global.locale.value === 'vi' ? 'Phòng thủ' : 'Thủ',
    vampiric: i18n.global.locale.value === 'vi' ? 'Hút máu' : 'Ma cà rồng',
    max_hp_bonus: i18n.global.locale.value === 'vi' ? 'HP tối đa' : 'tối đaHP',
    stamina_reduction: i18n.global.locale.value === 'vi' ? 'Tiêu hao TT' : 'nỗ lực thể chất',
    mining_stamina: i18n.global.locale.value === 'vi' ? 'TT Khai thác' : 'Khai thác sức mạnh thể chất',
    farming_stamina: i18n.global.locale.value === 'vi' ? 'TT Trồng trọt' : 'Làm nông thể lực',
    fishing_stamina: i18n.global.locale.value === 'vi' ? 'TT Câu cá' : 'Sức bền câu cá',
    crop_quality_bonus: i18n.global.locale.value === 'vi' ? 'Cấp 작 vật' : 'chất lượng cây trồng',
    crop_growth_bonus: i18n.global.locale.value === 'vi' ? 'Trưởng thành' : 'tăng trưởng cây trồng',
    fish_quality_bonus: i18n.global.locale.value === 'vi' ? 'Cấp độ cá' : 'chất lượng cá',
    fishing_calm: i18n.global.locale.value === 'vi' ? 'Câu cá tĩnh' : 'Câu cá ổn định',
    sell_price_bonus: i18n.global.locale.value === 'vi' ? 'Giá bán thêm' : 'Tăng giá bán',
    shop_discount: i18n.global.locale.value === 'vi' ? 'Giảm giá mua' : 'cửa hàng giảm giá',
    gift_friendship: i18n.global.locale.value === 'vi' ? 'Tặng quà' : 'Thiện chí như một món quà',
    monster_drop_bonus: i18n.global.locale.value === 'vi' ? 'Tỉ lệ rớt' : 'Tỷ lệ rớt',
    exp_bonus: i18n.global.locale.value === 'vi' ? 'Kinh nghiệm' : 'tiền thưởng kinh nghiệm',
    treasure_find: i18n.global.locale.value === 'vi' ? 'Tỉ lệ vật báu' : 'Xác suất rương kho báu',
    ore_bonus: i18n.global.locale.value === 'vi' ? 'Thêm quặng' : 'Tiền thưởng quặng',
    luck: i18n.global.locale.value === 'vi' ? 'May mắn' : 'may mắn',
    travel_speed: i18n.global.locale.value === 'vi' ? 'Tốc độ di chuyển' : 'Du lịch tăng tốc'
  }

  const PERCENTAGE_EFFECTS: Set<RingEffectType> = new Set([
    'crit_rate_bonus',
    'vampiric',
    'stamina_reduction',
    'mining_stamina',
    'farming_stamina',
    'fishing_stamina',
    'crop_quality_bonus',
    'crop_growth_bonus',
    'fish_quality_bonus',
    'fishing_calm',
    'sell_price_bonus',
    'shop_discount',
    'gift_friendship',
    'monster_drop_bonus',
    'exp_bonus',
    'treasure_find',
    'ore_bonus',
    'luck',
    'travel_speed'
  ])

  const formatEffectValue = (eff: { type: RingEffectType; value: number }): string => {
    if (PERCENTAGE_EFFECTS.has(eff.type)) return `${Math.round(eff.value * 100)}%`
    return `${eff.value}`
  }

  // === 武器弹窗 ===

  const activeWeaponIdx = ref<number | null>(null)

  const activeWeaponDef = computed(() => {
    if (activeWeaponIdx.value === null) return null
    const weapon = inventoryStore.ownedWeapons[activeWeaponIdx.value]
    if (!weapon) return null
    return getWeaponById(weapon.defId) ?? null
  })

  const activeWeaponName = computed(() => {
    if (activeWeaponIdx.value === null) return ''
    const weapon = inventoryStore.ownedWeapons[activeWeaponIdx.value]
    if (!weapon) return ''
    return getWeaponDisplayName(weapon.defId, weapon.enchantmentId)
  })

  const activeWeaponEnchant = computed(() => {
    if (activeWeaponIdx.value === null) return null
    const weapon = inventoryStore.ownedWeapons[activeWeaponIdx.value]
    if (!weapon?.enchantmentId) return null
    return getEnchantmentById(weapon.enchantmentId) ?? null
  })

  const activeWeaponPrice = computed(() => {
    if (activeWeaponIdx.value === null) return 0
    const weapon = inventoryStore.ownedWeapons[activeWeaponIdx.value]
    if (!weapon) return 0
    return getWeaponSellPrice(weapon.defId, weapon.enchantmentId)
  })

  const handleEquipWeapon = () => {
    if (activeWeaponIdx.value === null) return
    inventoryStore.equipWeapon(activeWeaponIdx.value)
    activeWeaponIdx.value = null
  }

  const handleSellWeapon = () => {
    if (activeWeaponIdx.value === null) return
    const result = inventoryStore.sellWeapon(activeWeaponIdx.value)
    addLog(result.message)
    activeWeaponIdx.value = null
  }

  // === 戒指弹窗 ===

  const activeRingIdx = ref<number | null>(null)

  const activeRingDef = computed(() => {
    if (activeRingIdx.value === null) return null
    const ring = inventoryStore.ownedRings[activeRingIdx.value]
    if (!ring) return null
    return getRingById(ring.defId) ?? null
  })

  const handleEquipRingFromPopup = (slot: 0 | 1) => {
    if (activeRingIdx.value === null) return
    if (isRingBlockedForSlot(activeRingIdx.value, slot)) return
    const slotRef = slot === 0 ? inventoryStore.equippedRingSlot1 : inventoryStore.equippedRingSlot2
    if (slotRef === activeRingIdx.value) {
      inventoryStore.unequipRing(slot)
    } else {
      inventoryStore.equipRing(activeRingIdx.value, slot)
    }
  }

  const handleSellRing = () => {
    if (activeRingIdx.value === null) return
    const result = inventoryStore.sellRing(activeRingIdx.value)
    addLog(result.message)
    activeRingIdx.value = null
  }

  // === 帽子辅助 ===

  const equippedHatName = computed(() => {
    const idx = inventoryStore.equippedHatIndex
    const hat = inventoryStore.ownedHats[idx]
    if (!hat) return null
    return getHatById(hat.defId)?.name ?? null
  })

  const handleToggleHat = (idx: number) => {
    if (inventoryStore.equippedHatIndex === idx) {
      inventoryStore.unequipHat()
    } else {
      inventoryStore.equipHat(idx)
    }
  }

  // === 帽子弹窗 ===

  const activeHatIdx = ref<number | null>(null)

  const activeHatDef = computed(() => {
    if (activeHatIdx.value === null) return null
    const hat = inventoryStore.ownedHats[activeHatIdx.value]
    if (!hat) return null
    return getHatById(hat.defId) ?? null
  })

  const handleToggleHatFromPopup = () => {
    if (activeHatIdx.value === null) return
    handleToggleHat(activeHatIdx.value)
  }

  const handleSellHat = () => {
    if (activeHatIdx.value === null) return
    const result = inventoryStore.sellHat(activeHatIdx.value)
    addLog(result.message)
    activeHatIdx.value = null
  }

  // === 鞋子辅助 ===

  const equippedShoeName = computed(() => {
    const idx = inventoryStore.equippedShoeIndex
    const shoe = inventoryStore.ownedShoes[idx]
    if (!shoe) return null
    return getShoeById(shoe.defId)?.name ?? null
  })

  const handleToggleShoe = (idx: number) => {
    if (inventoryStore.equippedShoeIndex === idx) {
      inventoryStore.unequipShoe()
    } else {
      inventoryStore.equipShoe(idx)
    }
  }

  // === 鞋子弹窗 ===

  const activeShoeIdx = ref<number | null>(null)

  const activeShoeDef = computed(() => {
    if (activeShoeIdx.value === null) return null
    const shoe = inventoryStore.ownedShoes[activeShoeIdx.value]
    if (!shoe) return null
    return getShoeById(shoe.defId) ?? null
  })

  const handleToggleShoeFromPopup = () => {
    if (activeShoeIdx.value === null) return
    handleToggleShoe(activeShoeIdx.value)
  }

  const handleSellShoe = () => {
    if (activeShoeIdx.value === null) return
    const result = inventoryStore.sellShoe(activeShoeIdx.value)
    addLog(result.message)
    activeShoeIdx.value = null
  }

  // === 临时背包 ===

  const activeTempIdx = ref<number | null>(null)

  const activeTempItem = computed(() => {
    if (activeTempIdx.value === null) return null
    return inventoryStore.tempItems[activeTempIdx.value] ?? null
  })

  const activeTempItemDef = computed(() => {
    if (!activeTempItem.value) return null
    return getItemById(activeTempItem.value.itemId) ?? null
  })

  const handleMoveFromTemp = () => {
    if (activeTempIdx.value === null) return
    const success = inventoryStore.moveFromTemp(activeTempIdx.value)
    if (success) {
      addLog(i18n.global.locale.value === 'vi' ? 'Vật phẩm đã được chuyển sang Balo.' : 'Vật phẩm đã được chuyển vào ba lô.')
      activeTempIdx.value = null
    } else {
      addLog(i18n.global.locale.value === 'vi' ? 'Không gian balo không đủ, một số vật phẩm vẫn ở balo tạm thời.' : 'Không có đủ chỗ trong ba lô và một số vật dụng vẫn còn trong ba lô tạm thời.')
    }
  }

  const handleMoveAllFromTemp = () => {
    const moved = inventoryStore.moveAllFromTemp()
    if (moved > 0) {
      addLog(i18n.global.locale.value === 'vi' ? `Đã chuyển ${moved} mục vật phẩm từ balo tạm thời sang Balo.` : `Đã rồi${moved}Vật phẩm được chuyển từ ba lô tạm thời sang ba lô.`)
    }
    if (inventoryStore.tempItems.length > 0) {
      addLog(i18n.global.locale.value === 'vi' ? 'Một số vật phẩm không đủ không gian vẫn ở balo tạm thời.' : 'Một số vật dụng vẫn còn trong ba lô tạm thời do thiếu chỗ.')
    }
  }

  const handleDiscardTemp = () => {
    if (activeTempIdx.value === null) return
    const item = inventoryStore.tempItems[activeTempIdx.value]
    const name = getItemById(item?.itemId ?? '')?.name ?? ''
    inventoryStore.discardTempItem(activeTempIdx.value)
    addLog(i18n.global.locale.value === 'vi' ? `Đã vứt bỏ ${name}.` : `bỏ đi${name}.`)
    activeTempIdx.value = null
  }

  // === 物品弹窗 ===

  const activeItemKey = ref<string | null>(null)

  const activeItem = computed(() => {
    if (!activeItemKey.value) return null
    const [itemId, quality] = activeItemKey.value.split(':')
    return inventoryStore.items.find(i => i.itemId === itemId && i.quality === quality) ?? null
  })

  const activeItemDef = computed(() => {
    if (!activeItem.value) return null
    return getItemById(activeItem.value.itemId) ?? null
  })

  /** 烹饪品的buff描述 */
  const activeItemBuff = computed(() => {
    if (!activeItem.value) return null
    const itemId = activeItem.value.itemId
    if (!itemId.startsWith('food_')) return null
    const recipe = getRecipeById(itemId.slice(5))
    return recipe?.effect.buff ?? null
  })

  const isEdible = (itemId: string): boolean => {
    const def = getItemById(itemId)
    return !!def?.edible && !!def.staminaRestore
  }

  const handleEat = (itemId: string, quality: Quality) => {
    const def = getItemById(itemId)
    if (!def?.edible || !def.staminaRestore) return
    const staminaFull = playerStore.stamina >= playerStore.maxStamina
    const hpFull = playerStore.hp >= playerStore.getMaxHp()
    if (staminaFull && hpFull) {
      addLog(i18n.global.locale.value === 'vi' ? 'Thể lực và HP đều đã đầy, không cần thiết phải dùng.' : 'Thể lực và điểm máu đều đầy đủ nên không cần phải ăn.')
      return
    }

    // 烹饪品走 cookingStore.eat()，以正确应用buff,厨房加成等
    if (itemId.startsWith('food_')) {
      const recipeId = itemId.slice(5) // loại bỏ 'food_' tiền tố
      const result = cookingStore.eat(recipeId, quality)
      if (result.success) {
        addLog(result.message)
      } else {
        addLog(result.message)
      }
      // 物品消耗完则关闭弹窗
      if (!inventoryStore.items.find(i => i.itemId === itemId && i.quality === quality)) {
        activeItemKey.value = null
      }
      return
    }

    if (!inventoryStore.removeItem(itemId, 1, quality)) return
    // 炼金师专精:食物恢复+50%
    const alchemistBonus = skillStore.getSkill('foraging').perk10 === 'alchemist' ? 1.5 : 1.0
    const staminaRestore = Math.floor(def.staminaRestore * alchemistBonus)
    playerStore.restoreStamina(staminaRestore)
    let msg = i18n.global.locale.value === 'vi' ? `Ăn ${def.name}, phục hồi ${staminaRestore} thể lực` : `đã ăn${def.name}, khôi phục${staminaRestore}sức mạnh thể chất`
    if (def.healthRestore) {
      const healthRestore = Math.floor(def.healthRestore * alchemistBonus)
      playerStore.restoreHealth(healthRestore)
      msg += i18n.global.locale.value === 'vi' ? `, ${healthRestore} HP` : `,${healthRestore}HP`
    }
    msg += '.'
    addLog(msg)
    // 物品消耗完则关闭弹窗
    if (!inventoryStore.items.find(i => i.itemId === itemId && i.quality === quality)) {
      activeItemKey.value = null
    }
  }

  /** 可使用的特殊物品 */
  const USABLE_ITEMS = new Set(['rain_totem', 'stamina_fruit'])

  const isUsable = (itemId: string): boolean => {
    return USABLE_ITEMS.has(itemId)
  }

  const handleUse = (itemId: string, quality: Quality) => {
    if (itemId === 'rain_totem') {
      if (!inventoryStore.removeItem(itemId, 1, quality)) return
      gameStore.setTomorrowWeather('rainy')
      addLog(i18n.global.locale.value === 'vi' ? 'Sử dụng Totem Mưa, ngày mai trời sẽ mưa.' : 'Bạn đã sử dụng Rain Totem và ngày mai trời sẽ mưa.')
    }
    if (itemId === 'stamina_fruit') {
      if (playerStore.staminaCapLevel >= 4) {
        addLog(i18n.global.locale.value === 'vi' ? 'Thể lực tối đa đã đạt giới hạn cao nhất, không thể ăn Tiên Đào nữa.' : 'Giới hạn trên của thể lực đã đạt đến mức tối đa và Tiên Đào không thể sử dụng được nữa.')
        return
      }
      if (!inventoryStore.removeItem(itemId, 1, quality)) return
      playerStore.upgradeMaxStamina()
      addLog(i18n.global.locale.value === 'vi' ? `Ăn Tiên Đào, thể lực tối đa vĩnh viễn tăng đến ${playerStore.maxStamina}!` : `Sau khi ăn Tiên Đào, giới hạn thể lực trên vĩnh viễn tăng lên thành${playerStore.maxStamina}!`)
    }
    // 物品消耗完则关闭弹窗
    if (!inventoryStore.items.find(i => i.itemId === itemId && i.quality === quality)) {
      activeItemKey.value = null
    }
  }

  // === 丢弃物品 ===

  const discardMode = ref(false)
  const discardQty = ref(1)

  watch(activeItemKey, () => {
    discardMode.value = false
  })

  /** 进入丢弃模式 */
  const enterDiscardMode = () => {
    discardMode.value = true
    discardQty.value = 1
  }

  /** 确认丢弃 */
  const confirmDiscard = () => {
    if (!activeItem.value) return
    const { itemId, quality } = activeItem.value
    const name = activeItemDef.value?.name ?? ''
    const qty = Math.min(discardQty.value, activeItem.value.quantity)
    if (qty <= 0) return
    if (!inventoryStore.removeItem(itemId, qty, quality)) return
    addLog(i18n.global.locale.value === 'vi' ? `Đã vứt bỏ ${name}×${qty}.` : `bỏ đi${name}×${qty}.`)
    discardMode.value = false
    // 物品消耗完则关闭弹窗
    if (!inventoryStore.items.find(i => i.itemId === itemId && i.quality === quality)) {
      activeItemKey.value = null
    }
  }

  /** 取消丢弃 */
  const cancelDiscard = () => {
    discardMode.value = false
  }
</script>
