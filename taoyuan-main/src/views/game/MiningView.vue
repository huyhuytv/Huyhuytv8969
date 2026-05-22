<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-accent text-sm">
        <Mountain :size="14" class="inline" />
        {{ miningStore.isInSkullCavern ? 'Động khô lâu' : 'Mỏ Vân Ẩn' }}
      </h3>
      <Button class="py-0 px-1" :icon="Map" @click="showMapModal = true" />
    </div>
    <p v-if="tutorialHint" class="text-[10px] text-muted/50 mb-2">{{ tutorialHint }}</p>

    <!-- 骷髅矿穴 -->
    <div v-if="miningStore.isSkullCavernUnlocked()" class="border border-accent/20 rounded-xs p-3 mb-4">
      <div class="flex items-center justify-between mb-1">
        <p class="text-sm text-danger">
          <Skull :size="14" class="inline" />
          Động khô lâu
        </p>
        <span v-if="miningStore.skullCavernBestFloor > 0" class="text-xs text-muted">sâu sắc nhất Không.{{ miningStore.skullCavernBestFloor }}lớp</span>
        <span v-else class="text-xs text-muted/40">Chưa khám phá</span>
      </div>
      <p class="text-xs text-muted">lớp vô hạn · mỗi10điểm bảo mật lớp · Nguồn quặng iridium · Quái vật mạnh lên theo chiều sâu</p>
      <p v-if="miningStore.skullSafePointFloor > 0" class="text-xs text-muted mt-0.5">Điểm an toàn: Không.{{ miningStore.skullSafePointFloor }}lớp</p>
    </div>

    <!-- 装备与状态 -->
    <div class="border border-accent/20 rounded-xs p-3 mb-4">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm text-accent">
          <Swords :size="14" class="inline" />
          Trang bị & Trạng thái
        </p>
      </div>
      <div class="flex flex-col space-y-1">
        <div class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5">
          <span class="text-xs">vũ khí</span>
          <span class="text-xs text-accent">{{ weaponDisplayName }}</span>
        </div>
        <div class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5">
          <span class="text-xs">Tấn công</span>
          <span class="text-xs text-accent">{{ weaponAttack }}</span>
        </div>
        <div class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5">
          <span class="text-xs">loại · đòn chí mạng</span>
          <span class="text-xs text-muted">{{ weaponTypeName }} · {{ critRateDisplay }}</span>
        </div>
        <div v-if="weaponEnchantName" class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5">
          <span class="text-xs">Cường hóa</span>
          <span class="text-xs text-success">{{ weaponEnchantName }}</span>
        </div>
        <div class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5">
          <span class="text-xs">HP</span>
          <div class="flex items-center space-x-2">
            <div class="w-20 h-1.5 bg-bg rounded-xs border border-accent/10">
              <div
                class="h-full rounded-xs transition-all"
                :class="playerStore.getIsLowHp() ? 'bg-danger' : 'bg-success'"
                :style="{ width: playerStore.getHpPercent() + '%' }"
              />
            </div>
            <span class="text-xs" :class="playerStore.getIsLowHp() ? 'text-danger' : 'text-muted'">
              {{ playerStore.hp }}/{{ playerStore.getMaxHp() }}
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5">
          <span class="text-xs">sức mạnh thể chất</span>
          <span class="text-xs text-muted">{{ playerStore.stamina }}/{{ playerStore.maxStamina }}</span>
        </div>
      </div>
    </div>

    <!-- 进入Của tôi -->
    <div
                class="border border-accent/20 rounded-xs px-3 py-2 mb-4 flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
      @click="hasElevator ? (showElevatorModal = true) : handleEnterMine(undefined)"
                @keydown.enter.prevent="hasElevator ? (showElevatorModal = true) : handleEnterMine(undefined)"
                @keydown.space.prevent="hasElevator ? (showElevatorModal = true) : handleEnterMine(undefined)"
    >
      <div class="flex items-center space-x-1.5">
        <Pickaxe :size="14" class="text-accent" />
        <span class="text-sm text-accent">Khám phá</span>
      </div>
      <span class="text-xs text-muted">Không.{{ miningStore.safePointFloor + 1 }}lớp</span>
    </div>

    <!-- 已击败BOSS -->
    <div v-if="miningStore.defeatedBosses.length > 0" class="border border-accent/20 rounded-xs p-3">
      <p class="text-sm text-accent mb-2">
        <Skull :size="14" class="inline" />
        Đã đánh bại sếp
      </p>
      <div class="flex flex-col space-y-1">
        <div
          v-for="zone in mineZones.filter(z => z.bossDefeated)"
          :key="zone.id"
          class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5"
        >
          <span class="text-xs text-success">{{ zone.bossName }}</span>
          <span class="text-xs text-muted">{{ zone.name }}</span>
        </div>
      </div>
    </div>

    <!-- Của tôi地图弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showMapModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showMapModal = false"
      >
        <div ref="modalRef_ejwnu" class="game-panel max-w-xs w-full" role="dialog" aria-modal="true" tabindex="-1">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-accent">
              <Map :size="14" class="inline" />
              Bản đồ mỏ
            </p>
            <Button class="py-0 px-1" :icon="X" :icon-size="12" @click="showMapModal = false" />
          </div>
          <p class="text-xs text-muted mb-2">Điểm an toàn:{{ miningStore.safePointFloor > 0 ? `Không.${miningStore.safePointFloor}lớp` : 'lối vào' }}</p>
          <div class="flex flex-col space-y-1.5" role="list">
            <div
              v-for="zone in mineZones"
              :key="zone.id"
              class="border rounded-xs p-2"
              :class="zone.isCurrentZone ? 'border-accent/40' : 'border-accent/10'"
            >
              <div class="flex justify-between items-center text-xs mb-1">
                <span :class="zone.isCurrentZone ? 'text-accent' : zone.reached ? 'text-text' : 'text-muted/40'">
                  {{ zone.name }}
                  <span class="text-muted ml-1">{{ zone.start }}-{{ zone.end }}lớp</span>
                </span>
                <span v-if="zone.bossDefeated" class="text-success flex items-center">
                  <Check :size="12" class="mr-0.5" />
                  {{ zone.bossName }}
                </span>
                <span v-else-if="zone.reached" class="text-danger/70">{{ zone.bossName }}</span>
                <span v-else class="text-muted/30">
                  <Lock :size="12" class="inline" />
                </span>
              </div>
              <div class="bg-bg rounded-xs h-1.5">
                <div class="h-1.5 rounded-xs transition-all" :class="zone.barColor" :style="{ width: zone.progress + '%' }" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 电梯弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showElevatorModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showElevatorModal = false"
      >
        <div ref="modalRef_i3ecc" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showElevatorModal = false">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-1">
            <Pickaxe :size="14" class="inline" />
            Khám phá
          </p>
          <p class="text-xs text-muted mb-2">Điểm an toàn:{{ miningStore.safePointFloor > 0 ? `Không.${miningStore.safePointFloor}lớp` : 'lối vào' }}</p>

          <!-- 进入Của tôi(前线) -->
          <div
                class="flex items-center justify-between border border-accent/30 rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5 mb-2"
                role="button"
                tabindex="0"
            @click="handleEnterMine(undefined)"
                @keydown.enter.prevent="handleEnterMine(undefined)"
                @keydown.space.prevent="handleEnterMine(undefined)"
          >
            <span class="text-xs text-accent">Vào mỏ</span>
            <span class="text-xs text-muted">Không.{{ miningStore.safePointFloor + 1 }}lớp</span>
          </div>

          <!-- 电梯楼lớp(按区域分组网格) -->
          <div v-if="elevatorZones.length > 0" class="max-h-48 overflow-y-auto mb-2">
            <div v-for="zone in elevatorZones" :key="zone.name" class="mb-2 last:mb-0">
              <p class="text-[10px] text-muted mb-1">{{ zone.name }}</p>
              <div class="flex flex-wrap space-x-1">
                <Button v-for="sp in zone.floors" :key="sp" class="py-0.5 px-0 min-w-9 justify-center" @click="handleEnterMine(sp)">
                  {{ sp + 1 }}
                </Button>
              </div>
            </div>
          </div>

          <!-- 骷髅矿穴 -->
          <div v-if="miningStore.isSkullCavernUnlocked()">
            <div
                class="flex items-center justify-between border border-danger/30 rounded-xs px-3 py-1.5 mb-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-danger/5"
                role="button"
                tabindex="0"
              @click="handleEnterSkullCavern(undefined)"
                @keydown.enter.prevent="handleEnterSkullCavern(undefined)"
                @keydown.space.prevent="handleEnterSkullCavern(undefined)"
            >
              <span class="text-xs text-danger">
                <Skull :size="12" class="inline" />
                Vào động khô lâu
              </span>
              <span class="text-xs text-muted">Không.{{ miningStore.skullSafePointFloor + 1 }}lớp</span>
            </div>
            <!-- 骷髅矿穴安全点楼lớp -->
            <div v-if="skullElevatorFloors.length > 0" class="max-h-48 overflow-y-auto grid-cols-5 grid m">
              <Button
                v-for="sp in skullElevatorFloors"
                :key="sp"
                class="py-0.5 px-0 min-w-9 justify-center !border-danger/30 !text-danger mb-1 mr-1"
                @click="handleEnterSkullCavern(sp)"
              >
                {{ sp + 1 }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Của tôi探索弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="miningStore.isExploring && !miningStore.inCombat"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      >
        <div ref="modalRef_5ugl7" class="game-panel max-w-sm w-full" role="dialog" aria-modal="true" tabindex="-1">
          <!-- 标题栏 -->
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-accent">
              Không.{{ activeFloorNum }}lớp
              <span v-if="!miningStore.isInSkullCavern" class="text-muted">{{ zoneName }}</span>
              <span v-if="currentFloorSpecial === 'mushroom'" class="text-success ml-1">Hang Nấm</span>
              <span v-if="currentFloorSpecial === 'treasure'" class="text-accent ml-1">Cấp độ rương kho báu</span>
              <span v-if="currentFloorSpecial === 'infested'" class="text-danger ml-1">lớp lây nhiễm</span>
              <span v-if="currentFloorSpecial === 'dark'" class="text-muted ml-1">tầng sông ngầm</span>
              <span v-if="currentFloorSpecial === 'boss'" class="text-danger ml-1">BOSSlớp</span>
            </p>
            <Button class="py-0 px-1" :icon="X" :icon-size="12" @click="showLeaveConfirm = true" />
          </div>

          <!-- vũ khí信息 -->
          <div class="text-xs text-muted mb-2 border-b border-accent/20 pb-2 space-y-0.5">
            <p>
              <Swords :size="12" class="inline" />
              {{ weaponDisplayName }}({{ weaponTypeName }} · tấn công {{ weaponAttack }} · đòn chí mạng {{ critRateDisplay }})
            </p>
            <p v-if="weaponEnchantName" class="text-success">Bùa mê:{{ weaponEnchantName }}</p>
          </div>

          <!-- lớp lây nhiễm提示 -->
          <p v-if="currentFloorSpecial === 'infested' && remainingMonsters > 0" class="text-xs text-danger mb-2">
            Lớp lây nhiễm: vẫn bị đánh bại {{ remainingMonsters }} quái vật
          </p>

          <!-- 炸弹模式指示 -->
          <div v-if="bombModeId" class="text-xs text-accent mb-2 border border-accent/30 rounded-xs px-2 py-1">
            <Zap :size="12" class="inline" />
            Chế độ bom: Nhấp vào lưới được khám phá làm trung tâm của vụ nổ
            <button class="text-muted ml-2 underline" @click="bombModeId = null">Hủy</button>
          </div>

          <!-- 6×6 格子 -->
          <div class="flex justify-center mb-3">
            <div class="grid grid-cols-6 gap-1" style="max-width: 264px" role="list">
              <button
                v-for="tile in miningStore.floorGrid"
                :key="tile.index"
                class="w-10 h-10 rounded-xs flex items-center justify-center text-xs border transition-colors"
                :class="getTileClass(tile)"
                :disabled="!isTileClickable(tile)"
                @click="handleTileClick(tile)"
              >
                {{ getTileIcon(tile) }}
              </button>
            </div>
          </div>

          <!-- 操作区 -->
          <div class="flex flex-col space-y-1 mb-3">
            <div v-for="bombItem in availableBombs" :key="bombItem.id">
              <div
                class="flex items-center justify-between border rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
                :class="bombModeId === bombItem.id ? 'border-accent text-accent' : 'border-accent/20'"
                @click="toggleBombMode(bombItem.id)"
                @keydown.enter.prevent="toggleBombMode(bombItem.id)"
                @keydown.space.prevent="toggleBombMode(bombItem.id)"
              >
                <span class="text-xs">
                  <Zap :size="12" class="inline" />
                  {{ bombItem.name }}
                </span>
                <span class="text-xs text-muted">&times;{{ bombItem.count }}</span>
              </div>
            </div>
            <div
                v-if="hasMonsterLure"
              class="flex items-center justify-between border border-danger/20 rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-danger/5"
                role="button"
                tabindex="0"
              @click="handleUseMonsterLure"
                @keydown.enter.prevent="handleUseMonsterLure"
                @keydown.space.prevent="handleUseMonsterLure"
            >
              <span class="text-xs text-danger">
                <Skull :size="12" class="inline" />
                Mồi quái thú
              </span>
              <span class="text-xs text-muted">&times;{{ inventoryStore.getItemCount('monster_lure') }}</span>
            </div>
            <div
                v-if="availableCombatItems.length > 0"
              class="flex items-center justify-between border border-success/20 rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-success/5"
                role="button"
                tabindex="0"
              @click="showCombatItems = true"
                @keydown.enter.prevent="showCombatItems = true"
                @keydown.space.prevent="showCombatItems = true"
            >
              <span class="text-xs text-success">
                <Backpack :size="12" class="inline" />
                Dùng đạo cụ
              </span>
              <span class="text-xs text-muted">{{ availableCombatItems.length }}loài</span>
            </div>
            <div
              v-if="miningStore.stairsFound"
              class="flex items-center justify-between border border-success/30 rounded-xs px-3 py-1.5"
              :class="miningStore.stairsUsable ? 'cursor-pointer hover:bg-success/5' : 'opacity-50'"
              @click="miningStore.stairsUsable && handleNextFloor()"
            >
              <span class="text-xs text-success">
                <ChevronDown :size="12" class="inline" />
                Tầng sau
              </span>
              <span v-if="!miningStore.stairsUsable" class="text-xs text-muted">Không thể dùng thang</span>
            </div>
            <div
                class="flex items-center justify-between border border-danger/30 rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-danger/5"
                role="button"
                tabindex="0"
              @click="showLeaveConfirm = true"
                @keydown.enter.prevent="showLeaveConfirm = true"
                @keydown.space.prevent="showLeaveConfirm = true"
            >
              <span class="text-xs text-danger">
                <LogOut :size="12" class="inline" />
                {{ miningStore.isInSkullCavern ? 'Rời khỏi mỏ xương' : 'Rời mỏ' }}
              </span>
            </div>
          </div>

          <!-- 探索日志 -->
          <div class="text-xs text-muted space-y-0.5 max-h-24 overflow-y-auto">
            <p v-for="(msg, i) in recentLog" :key="i" :class="{ 'text-text': i === recentLog.length - 1 }">{{ msg }}</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- chiến đấu斗弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="miningStore.inCombat" class="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4">
        <div ref="modalRef_iu81e" class="game-panel max-w-xs w-full" role="dialog" aria-modal="true" tabindex="-1">
          <!-- 标题 -->
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm" :class="miningStore.combatIsBoss ? 'text-danger' : 'text-accent'">
              {{ miningStore.combatIsBoss ? 'BOSS chiến đấu' : 'Gặp phải quái vật' }}
            </p>
          </div>

          <!-- 玩家 vs 怪物 -->
          <div class="grid grid-cols-[1fr_auto_1fr] gap-1.5 mb-3 items-center" role="list">
            <!-- 玩家 -->
            <div class="border border-accent/10 rounded-xs p-2 relative" :class="playerAnim">
              <p class="text-xs text-center mb-1.5 truncate">bạn</p>
              <div class="bg-bg rounded-xs h-1.5 mb-1">
                <div
                  class="h-1.5 rounded-xs transition-all"
                  :class="playerStore.getIsLowHp() ? 'bg-danger' : 'bg-success'"
                  :style="{ width: `${playerStore.getHpPercent()}%` }"
                />
              </div>
              <p class="text-[10px]" :class="playerStore.getIsLowHp() ? 'text-danger' : 'text-muted'">
                {{ playerStore.hp }}/{{ playerStore.getMaxHp() }}
              </p>
              <span
                v-if="playerFloat"
                :key="playerFloat.key"
                class="absolute -top-1 right-0 text-danger text-[11px] font-bold anim-float-up pointer-events-none"
              >
                {{ playerFloat.text }}
              </span>
            </div>
            <!-- VS -->
            <span class="text-[10px] text-muted/40">VS</span>
            <!-- 怪物 -->
            <div class="border border-danger/20 rounded-xs p-2 relative" :class="monsterAnim">
              <p class="text-xs text-center text-danger mb-1.5 truncate">
                {{ miningStore.combatMonster?.name }}
                <span v-if="miningStore.combatIsBoss" class="text-[10px]">[BOSS]</span>
              </p>
              <div class="bg-bg rounded-xs h-1.5 mb-1">
                <div
                  class="h-1.5 bg-danger rounded-xs transition-all"
                  :style="{
                    width: `${miningStore.combatMonster ? (miningStore.combatMonsterHp / miningStore.combatMonster.hp) * 100 : 0}%`
                  }"
                />
              </div>
              <p class="text-[10px] text-muted">{{ miningStore.combatMonsterHp }}/{{ miningStore.combatMonster?.hp }}</p>
              <span
                v-if="monsterFloat"
                :key="monsterFloat.key"
                class="absolute -top-1 right-0 text-accent text-[11px] font-bold anim-float-up pointer-events-none"
              >
                {{ monsterFloat.text }}
              </span>
            </div>
          </div>

          <!-- chiến đấu斗操作 -->
          <div class="mb-3 space-y-1">
            <!-- tấn công / 防御 / 逃跑 -->
            <div class="grid grid-cols-3 gap-1" role="list">
              <div
                class="flex flex-col items-center border border-accent/20 rounded-xs py-1.5"
                :class="combatAnimLock ? 'opacity-50' : 'cursor-pointer hover:bg-accent/5'"
                @click="!combatAnimLock && handleCombat('attack')"
              >
                <span class="text-xs">
                  <Swords :size="12" class="inline" />
                  Công
                </span>
                <span class="text-[10px] text-muted">{{ weaponAttack }}Sức mạnh tấn công</span>
              </div>
              <div
                class="flex flex-col items-center border border-accent/20 rounded-xs py-1.5"
                :class="combatAnimLock ? 'opacity-50' : 'cursor-pointer hover:bg-accent/5'"
                @click="!combatAnimLock && handleCombat('defend')"
              >
                <span class="text-xs">
                  <Shield :size="12" class="inline" />
                  Thủ
                </span>
                <span class="text-[10px] text-muted">Giảm sát thương</span>
              </div>
              <div
                class="flex flex-col items-center border rounded-xs py-1.5"
                :class="
                  miningStore.combatIsBoss || combatAnimLock
                    ? 'border-accent/10 opacity-50'
                    : 'border-danger/20 cursor-pointer hover:bg-danger/5'
                "
                @click="!miningStore.combatIsBoss && !combatAnimLock && handleCombat('flee')"
              >
                <span class="text-xs" :class="miningStore.combatIsBoss ? 'text-muted' : 'text-danger'">
                  <MoveRight :size="12" class="inline" />
                  {{ miningStore.combatIsBoss ? 'Không thể' : 'Bỏ chạy' }}
                </span>
                <span v-if="miningStore.combatIsBoss" class="text-[10px] text-muted/40">BOSSchiến đấu</span>
              </div>
            </div>
            <!-- sử dụngđạo cụ -->
            <div
                v-if="availableCombatItems.length > 0"
              class="flex items-center justify-between border border-success/20 rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-success/5"
                role="button"
                tabindex="0"
              @click="showCombatItems = true"
                @keydown.enter.prevent="showCombatItems = true"
                @keydown.space.prevent="showCombatItems = true"
            >
              <span class="text-xs text-success">
                <Backpack :size="12" class="inline" />
                Dùng đạo cụ
              </span>
              <span class="text-xs text-muted">{{ availableCombatItems.length }}loài</span>
            </div>
            <!-- 切换Sơ đồ thiết bị -->
            <div
                v-if="inventoryStore.equipmentPresets.length > 0"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="showPresetListModal = true"
                @keydown.enter.prevent="showPresetListModal = true"
                @keydown.space.prevent="showPresetListModal = true"
            >
              <span class="text-xs text-accent">
                <BookMarked :size="12" class="inline" />
                Đổi bộ trang bị
              </span>
              <span v-if="inventoryStore.activePresetId" class="text-[10px] text-muted">
                {{ inventoryStore.equipmentPresets.find(p => p.id === inventoryStore.activePresetId)?.name ?? '' }}
              </span>
            </div>
          </div>

          <!-- chiến đấu斗日志 -->
          <div class="text-xs space-y-0.5 max-h-28 overflow-y-auto">
            <p
              v-for="(msg, i) in miningStore.combatLog"
              :key="i"
              :class="i < miningStore.combatLog.length - 1 ? 'text-muted' : 'text-text'"
            >
              {{ msg }}
            </p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- đạo cụsử dụng弹窗(chiến đấu斗/探索共用) -->
    <Transition name="panel-fade">
      <div
        v-if="showCombatItems"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4"
        @click.self="showCombatItems = false"
      >
        <div ref="modalRef_iitny" class="game-panel max-w-xs w-full" role="dialog" aria-modal="true" tabindex="-1">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-accent">
              <Backpack :size="14" class="inline" />
              Dùng đạo cụ
            </p>
            <Button class="py-0 px-1" :icon="X" :icon-size="12" @click="showCombatItems = false" />
          </div>
          <div class="flex flex-col space-y-1 max-h-48 overflow-y-auto">
            <div
                v-for="item in availableCombatItems"
              :key="item.itemId"
              class="flex items-center justify-between border border-success/20 rounded-xs px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-success/5"
                role="button"
                tabindex="0"
              @click="handlePendingItem(item.itemId)"
                @keydown.enter.prevent="handlePendingItem(item.itemId)"
                @keydown.space.prevent="handlePendingItem(item.itemId)"
            >
              <div class="flex flex-col">
                <span class="text-xs">{{ item.name }}</span>
                <span class="text-[10px] text-muted">{{ item.desc }}</span>
              </div>
              <span class="text-xs text-muted">&times;{{ item.count }}</span>
            </div>
          </div>
          <p v-if="availableCombatItems.length === 0" class="text-xs text-muted text-center py-2">Không có mặt hàng nào</p>
        </div>
      </div>
    </Transition>

    <!-- đạo cụsử dụng确认弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="pendingItem"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4"
        @click.self="pendingItemId = null"
      >
        <div ref="modalRef_cizih" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="pendingItemId = null">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">Dùng đạo cụ</p>
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">đạo cụ</span>
              <span class="text-xs">{{ pendingItem.name }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Hiệu ứng</span>
              <span class="text-xs text-success">{{ pendingItem.desc }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Còn</span>
              <span class="text-xs">×{{ pendingItem.count }}</span>
            </div>
          </div>
          <!-- 批量数量选择(仅永久增益类đạo cụ) -->
          <div v-if="pendingCanBatch && pendingItem.count > 1" class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs text-muted">Số lượng dùng</span>
              <div class="flex items-center space-x-1">
                <Button class="h-6 px-1.5 py-0.5 text-xs justify-center" :disabled="pendingUseQty <= 1" @click="addUseQty(-1)">-</Button>
                <input
                  type="number"
                  :value="pendingUseQty"
                  min="1"
                  :max="pendingItem.count"
                  class="w-24 h-6 px-2 py-0.5 bg-bg border border-accent/30 rounded-xs text-xs text-center text-accent outline-none focus:border-accent transition-colors"
                  @input="onUseQtyInput"
                />
                <Button
                  class="h-6 px-1.5 py-0.5 text-xs justify-center"
                  :disabled="pendingUseQty >= pendingItem.count"
                  @click="addUseQty(1)"
                >
                  +
                </Button>
              </div>
            </div>
            <div class="flex space-x-1">
              <Button class="flex-1 justify-center" :disabled="pendingUseQty <= 1" @click="pendingUseQty = 1">Ít nhất</Button>
              <Button
                class="flex-1 justify-center"
                :disabled="pendingUseQty >= pendingItem.count"
                @click="pendingUseQty = pendingItem.count"
              >
                Nhiều nhất
              </Button>
            </div>
          </div>
          <div class="flex space-x-1.5">
            <Button class="flex-1 justify-center" @click="pendingItemId = null">Hủy</Button>
            <Button class="flex-1 justify-center !bg-accent !text-bg" @click="handleConfirmUseItem">
              Xác nhận sử dụng{{ pendingCanBatch && pendingUseQty > 1 ? ` ×${pendingUseQty}` : '' }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 离开Của tôi确认弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showLeaveConfirm"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4"
        @click.self="showLeaveConfirm = false"
      >
        <div ref="modalRef_uy2za" class="game-panel max-w-xs w-full" role="dialog" aria-modal="true" tabindex="-1">
          <p class="text-sm text-accent mb-2">Xác nhận rời khỏi</p>
          <p class="text-xs text-muted mb-3">Bạn có chắc chắn muốn rời đi không?{{ miningStore.isInSkullCavern ? 'Động khô lâu' : 'Của tôi' }}?{{ leaveHint }}</p>
          <div class="flex space-x-1.5">
            <Button class="flex-1 justify-center" @click="showLeaveConfirm = false">Tiếp tục khám phá</Button>
            <Button class="flex-1 justify-center btn-danger" :icon="LogOut" @click="confirmLeave">Xác nhận rời khỏi</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 快速切装：方案列表弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showPresetListModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-70 p-4"
        @click.self="showPresetListModal = false"
      >
        <div ref="modalRef_16k3b" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showPresetListModal = false">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">
            <BookMarked :size="14" class="inline" />
            Sơ đồ thiết bị
          </p>
          <div v-if="inventoryStore.equipmentPresets.length > 0" class="flex flex-col space-y-1.5 max-h-60 overflow-y-auto">
            <div
              v-for="preset in inventoryStore.equipmentPresets"
              :key="preset.id"
              class="border rounded-xs p-2"
              :class="inventoryStore.activePresetId === preset.id ? 'border-accent/40' : 'border-accent/10'"
            >
              <div class="flex items-center justify-between mb-1">
                <p class="text-xs text-accent truncate">{{ preset.name }}</p>
                <span v-if="inventoryStore.activePresetId === preset.id" class="text-[10px] text-success shrink-0 ml-1">Đang sử dụng</span>
              </div>
              <div class="grid grid-cols-2 gap-1" role="list">
                <Button
                  class="py-0 px-1.5 text-[10px]"
                  :disabled="inventoryStore.activePresetId === preset.id"
                  @click="quickApplyPreset(preset.id)"
                >
                  sử dụng
                </Button>
                <Button class="py-0 px-1.5 text-[10px]" @click="viewPresetDetail(preset.id)">Xem</Button>
              </div>
            </div>
          </div>
          <div v-else class="flex flex-col items-center justify-center py-6">
            <BookMarked :size="24" class="text-muted/30" />
            <p class="text-xs text-muted mt-1">Chưa có kế hoạch</p>
            <p class="text-[10px] text-muted/60 mt-0.5">Vào trang thiết bị ba lô để lập kế hoạch</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 快速切装：方案详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showPresetDetailModal && detailPreset"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-80 p-4"
        @click.self="showPresetDetailModal = false"
      >
        <div ref="modalRef_2wejk" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showPresetDetailModal = false">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">{{ detailPreset.name }}</p>
          <div class="flex flex-col space-y-1">
            <div
              class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5"
              :class="detailPreset.weaponDefId ? 'cursor-pointer hover:bg-accent/5' : ''"
              @click="detailPreset.weaponDefId && viewEquipProperty('weapon', detailPreset.weaponDefId)"
            >
              <span class="text-xs text-muted">vũ khí</span>
              <span class="text-xs" :class="detailPreset.weaponDefId ? 'text-accent' : 'text-muted/40'">
                {{ detailPreset.weaponDefId ? (getWeaponById(detailPreset.weaponDefId)?.name ?? 'không rõ') : 'Không' }}
              </span>
            </div>
            <div
              class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5"
              :class="detailPreset.ringSlot1DefId ? 'cursor-pointer hover:bg-accent/5' : ''"
              @click="detailPreset.ringSlot1DefId && viewEquipProperty('ring', detailPreset.ringSlot1DefId)"
            >
              <span class="text-xs text-muted">chiếc nhẫn1</span>
              <span class="text-xs" :class="detailPreset.ringSlot1DefId ? 'text-accent' : 'text-muted/40'">
                {{ detailPreset.ringSlot1DefId ? (getRingById(detailPreset.ringSlot1DefId)?.name ?? 'không rõ') : 'Không' }}
              </span>
            </div>
            <div
              class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5"
              :class="detailPreset.ringSlot2DefId ? 'cursor-pointer hover:bg-accent/5' : ''"
              @click="detailPreset.ringSlot2DefId && viewEquipProperty('ring', detailPreset.ringSlot2DefId)"
            >
              <span class="text-xs text-muted">chiếc nhẫn2</span>
              <span class="text-xs" :class="detailPreset.ringSlot2DefId ? 'text-accent' : 'text-muted/40'">
                {{ detailPreset.ringSlot2DefId ? (getRingById(detailPreset.ringSlot2DefId)?.name ?? 'không rõ') : 'Không' }}
              </span>
            </div>
            <div
              class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5"
              :class="detailPreset.hatDefId ? 'cursor-pointer hover:bg-accent/5' : ''"
              @click="detailPreset.hatDefId && viewEquipProperty('hat', detailPreset.hatDefId)"
            >
              <span class="text-xs text-muted">Mũ</span>
              <span class="text-xs" :class="detailPreset.hatDefId ? 'text-accent' : 'text-muted/40'">
                {{ detailPreset.hatDefId ? (getHatById(detailPreset.hatDefId)?.name ?? 'không rõ') : 'Không' }}
              </span>
            </div>
            <div
              class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5"
              :class="detailPreset.shoeDefId ? 'cursor-pointer hover:bg-accent/5' : ''"
              @click="detailPreset.shoeDefId && viewEquipProperty('shoe', detailPreset.shoeDefId)"
            >
              <span class="text-xs text-muted">Giày</span>
              <span class="text-xs" :class="detailPreset.shoeDefId ? 'text-accent' : 'text-muted/40'">
                {{ detailPreset.shoeDefId ? (getShoeById(detailPreset.shoeDefId)?.name ?? 'không rõ') : 'Không' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 快速切装：装备属性弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showEquipPropertyModal && equipPropertyInfo"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-90 p-4"
        @click.self="showEquipPropertyModal = false"
      >
        <div ref="modalRef_uytob" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showEquipPropertyModal = false">
            <X :size="14" />
          </button>
          <p class="text-[10px] text-muted mb-0.5">{{ equipPropertyInfo.category }}</p>
          <p class="text-sm text-accent mb-1">{{ equipPropertyInfo.name }}</p>
          <p class="text-xs text-muted mb-2">{{ equipPropertyInfo.description }}</p>
          <div v-if="equipPropertyInfo.effects.length > 0" class="flex flex-col space-y-1">
            <div
              v-for="(eff, i) in equipPropertyInfo.effects"
              :key="i"
              class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1"
            >
              <span class="text-xs text-muted">{{ eff.label }}</span>
              <span class="text-xs text-accent">{{ eff.value }}</span>
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
  import {
    Mountain,
    Pickaxe,
    Zap,
    ChevronDown,
    LogOut,
    Swords,
    Shield,
    MoveRight,
    Skull,
    X,
    Map,
    Backpack,
    Lock,
    BookMarked,
    Check
  } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import { useAchievementStore } from '@/stores/useAchievementStore'
  import { useGameStore } from '@/stores/useGameStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { useMiningStore } from '@/stores/useMiningStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { useSkillStore } from '@/stores/useSkillStore'
  import { useTutorialStore } from '@/stores/useTutorialStore'
  import { ZONE_NAMES, getFloor, BOSS_MONSTERS } from '@/data'
  import { getWeaponById, getEnchantmentById, getWeaponDisplayName, WEAPON_TYPE_NAMES } from '@/data/weapons'
  import { getRingById, getHatById, getShoeById } from '@/data'
  import type { EquipmentEffectType } from '@/types'
  import { ACTION_TIME_COSTS } from '@/data/timeConstants'
  import { BOMBS } from '@/data/processing'
  import { getItemById } from '@/data/items'
  import type { CombatAction, MineTile } from '@/types'
  import { sfxMine, sfxAttack, sfxHurt, sfxClick, sfxEncounter, sfxDefend, sfxFlee, sfxVictory } from '@/composables/useAudio'
  import { useAudio } from '@/composables/useAudio'
  import { addLog } from '@/composables/useGameLog'
  import { handleEndDay } from '@/composables/useEndDay'


  const modalRef_ejwnu = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_ejwnu);
  const modalRef_i3ecc = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_i3ecc);
  const modalRef_5ugl7 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_5ugl7);
  const modalRef_iu81e = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_iu81e);
  const modalRef_iitny = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_iitny);
  const modalRef_cizih = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_cizih);
  const modalRef_uy2za = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_uy2za);
  const modalRef_16k3b = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_16k3b);
  const modalRef_2wejk = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_2wejk);
  const modalRef_uytob = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_uytob);



  const miningStore = useMiningStore()
  const gameStore = useGameStore()
  const playerStore = usePlayerStore()
  const inventoryStore = useInventoryStore()
  const skillStore = useSkillStore()
  const achievementStore = useAchievementStore()
  const tutorialStore = useTutorialStore()
  const { startBattleBgm, resumeNormalBgm } = useAudio()

  const tutorialHint = computed(() => {
    if (!tutorialStore.enabled || gameStore.year > 1) return null
    if (achievementStore.stats.highestMineFloor === 0)
      return 'Mỏ là6x6lưới, bấm vào lưới để khám phá. Khi gặp quặng, bạn có thể khai thác chúng, còn khi gặp quái vật, bạn cần phải chiến đấu với chúng. Tìm cầu thang để đi xuống tầng tiếp theo.'
    return null
  })

  const exploreLog = ref<string[]>([])

  const showMapModal = ref(false)
  const showElevatorModal = ref(false)

  /** 炸弹模式 */
  const bombModeId = ref<string | null>(null)

  /** chiến đấu斗đạo cụ面板 */
  const showCombatItems = ref(false)

  /** đạo cụsử dụng确认 */
  const BATCH_USABLE_ITEMS = new Set(['guild_badge', 'life_talisman', 'lucky_coin', 'defense_charm'])
  const pendingItemId = ref<string | null>(null)
  const pendingUseQty = ref(1)
  const pendingItem = computed(() => {
    if (!pendingItemId.value) return null
    return availableCombatItems.value.find(i => i.itemId === pendingItemId.value) ?? null
  })
  const pendingCanBatch = computed(() => pendingItemId.value !== null && BATCH_USABLE_ITEMS.has(pendingItemId.value))

  const addUseQty = (delta: number) => {
    const max = pendingItem.value?.count ?? 1
    pendingUseQty.value = Math.max(1, Math.min(max, pendingUseQty.value + delta))
  }
  const onUseQtyInput = (e: Event) => {
    const val = parseInt((e.target as HTMLInputElement).value) || 1
    const max = pendingItem.value?.count ?? 1
    pendingUseQty.value = Math.max(1, Math.min(max, val))
  }

  /** 离开Của tôi确认 */
  const showLeaveConfirm = ref(false)

  // chiến đấu斗动画状态
  const combatAnimLock = ref(false)
  const playerAnim = ref('')
  const monsterAnim = ref('')
  const playerFloat = ref<{ text: string; key: number } | null>(null)
  const monsterFloat = ref<{ text: string; key: number } | null>(null)
  let floatCounter = 0

  const triggerAnim = (target: 'player' | 'monster', cls: string, duration: number = 400) => {
    if (target === 'player') {
      playerAnim.value = cls
      setTimeout(() => {
        playerAnim.value = ''
      }, duration)
    } else {
      monsterAnim.value = cls
      setTimeout(() => {
        monsterAnim.value = ''
      }, duration)
    }
  }

  const showDamageFloat = (target: 'player' | 'monster', text: string) => {
    const obj = { text, key: ++floatCounter }
    if (target === 'player') {
      playerFloat.value = obj
      setTimeout(() => {
        playerFloat.value = null
      }, 800)
    } else {
      monsterFloat.value = obj
      setTimeout(() => {
        monsterFloat.value = null
      }, 800)
    }
  }

  const parseDamage = (msg: string): { dealt: number; taken: number; isCrit: boolean } => {
    const dealt = msg.match(/nguyên nhân(\d+)thiệt hại/)
    const taken = msg.match(/nhận được(\d+)thiệt hại/)
    return {
      dealt: dealt ? parseInt(dealt[1]!) : 0,
      taken: taken ? parseInt(taken[1]!) : 0,
      isCrit: msg.includes('Bạo kích')
    }
  }

  const recentLog = computed(() => exploreLog.value.slice(-8))

  const activeFloorNum = computed(() => {
    return miningStore.isInSkullCavern ? miningStore.skullCavernFloor : miningStore.currentFloor
  })

  const availableBombs = computed(() => {
    return BOMBS.map(b => ({ id: b.id, name: b.name, count: inventoryStore.getItemCount(b.id) })).filter(b => b.count > 0)
  })

  /** chiến đấu斗中可用đạo cụ列表 */
  const availableCombatItems = computed(() => {
    const items: { itemId: string; name: string; desc: string; count: number }[] = []

    // Huy hiệu bang hội
    const badgeCount = inventoryStore.getItemCount('guild_badge')
    if (badgeCount > 0) {
      items.push({ itemId: 'guild_badge', name: 'Huy hiệu bang hội', desc: 'Sức tấn công vĩnh viễn+3', count: badgeCount })
    }

    // Bùa hộ mệnh của cuộc sống
    const talismanCount = inventoryStore.getItemCount('life_talisman')
    if (talismanCount > 0) {
      items.push({ itemId: 'life_talisman', name: 'Bùa hộ mệnh của cuộc sống', desc: 'Sức khỏe tối đa vĩnh viễn+15', count: talismanCount })
    }

    // đồng xu may mắn
    const coinCount = inventoryStore.getItemCount('lucky_coin')
    if (coinCount > 0) {
      items.push({ itemId: 'lucky_coin', name: 'đồng xu may mắn', desc: 'Tỷ lệ rớt vĩnh viễn+5%', count: coinCount })
    }

    // Bùa hộ mệnh
    const defenseCharmCount = inventoryStore.getItemCount('defense_charm')
    if (defenseCharmCount > 0) {
      items.push({ itemId: 'defense_charm', name: 'Bùa hộ mệnh', desc: 'Phòng thủ vĩnh viễn+3%', count: defenseCharmCount })
    }

    // Bùa săn quỷ
    if (!miningStore.slayerCharmActive) {
      const charmCount = inventoryStore.getItemCount('slayer_charm')
      if (charmCount > 0) {
        items.push({ itemId: 'slayer_charm', name: 'Bùa săn quỷ', desc: 'Tỷ lệ rớt+20%(cuộc khám phá này)', count: charmCount })
      }
    }

    // 所有可食用的恢复类đạo cụ
    const seen = new Set<string>(['guild_badge', 'slayer_charm', 'monster_lure', 'life_talisman', 'lucky_coin', 'defense_charm'])
    for (const invItem of inventoryStore.items) {
      if (invItem.quantity <= 0 || seen.has(invItem.itemId)) continue
      const def = getItemById(invItem.itemId)
      if (!def?.edible) continue
      if (!def.healthRestore && !def.staminaRestore) continue
      seen.add(invItem.itemId)

      const parts: string[] = []
      if (def.healthRestore) parts.push(def.healthRestore >= 999 ? 'HPđầy đủ' : `HP+${def.healthRestore}`)
      if (def.staminaRestore) parts.push(`sức mạnh thể chất+${def.staminaRestore}`)

      items.push({
        itemId: invItem.itemId,
        name: def.name,
        desc: parts.join(','),
        count: inventoryStore.getItemCount(invItem.itemId)
      })
    }

    return items
  })

  /** 是否有怪物诱饵 */
  const hasMonsterLure = computed(() => inventoryStore.getItemCount('monster_lure') > 0)

  const zoneName = computed(() => {
    const floor = getFloor(miningStore.currentFloor)
    return floor ? ZONE_NAMES[floor.zone] : ''
  })

  /** Của tôi地图区域数据 */
  const mineZones = computed(() => {
    const zones = [
      { id: 'shallow', name: 'Mỏ nông·Hang đất và đá', start: 1, end: 20, bossFloor: 20 },
      { id: 'frost', name: 'hang băng·Sông Sương', start: 21, end: 40, bossFloor: 40 },
      { id: 'lava', name: 'lớp dung nham·Dòng chảy ngầm lửa đất', start: 41, end: 60, bossFloor: 60 },
      { id: 'crystal', name: 'hang pha lê·mê cung pha lê', start: 61, end: 80, bossFloor: 80 },
      { id: 'shadow', name: 'vương quốc hẻo lánh·vết nứt bóng', start: 81, end: 100, bossFloor: 100 },
      { id: 'abyss', name: 'vực thẳm·vực thẳm không đáy', start: 101, end: 120, bossFloor: 120 }
    ]
    const sp = miningStore.safePointFloor
    return zones.map(z => {
      const reached = sp >= z.start - 1
      const boss = BOSS_MONSTERS[z.bossFloor]
      const bossDefeated = boss ? miningStore.defeatedBosses.includes(boss.id) : false
      const progress = Math.min(100, Math.max(0, ((sp - (z.start - 1)) / 20) * 100))
      const isCurrentZone = sp >= z.start - 1 && sp < z.end
      return {
        ...z,
        reached,
        bossName: boss?.name ?? '???',
        bossDefeated,
        progress: reached ? Math.max(5, progress) : 0,
        isCurrentZone,
        barColor: bossDefeated ? 'bg-success' : isCurrentZone ? 'bg-accent' : reached ? 'bg-accent/50' : 'bg-bg'
      }
    })
  })

  /** 当前lớp是否为特殊楼lớp */
  const currentFloorSpecial = computed(() => {
    const floor = miningStore.getActiveFloorData()
    return floor?.specialType ?? null
  })

  /** lớp lây nhiễm剩余怪物 */
  const remainingMonsters = computed(() => {
    return miningStore.totalMonstersOnFloor - miningStore.monstersDefeatedCount
  })

  /** 是否显示电梯(有可返回楼lớp或骷髅矿穴已解锁) */
  const hasElevator = computed(() => elevatorZones.value.length > 0 || miningStore.isSkullCavernUnlocked())

  /** vũ khí信息 */
  const weaponDisplayName = computed(() => {
    const owned = inventoryStore.getEquippedWeapon()
    return getWeaponDisplayName(owned.defId, owned.enchantmentId)
  })
  const weaponTypeName = computed(() => {
    const owned = inventoryStore.getEquippedWeapon()
    const def = getWeaponById(owned.defId)
    return def ? WEAPON_TYPE_NAMES[def.type] : 'không rõ'
  })
  const weaponAttack = computed(
    () =>
      inventoryStore.getWeaponAttack() +
      skillStore.combatLevel * 2 +
      inventoryStore.getRingEffectValue('attack_bonus') +
      miningStore.guildBadgeBonusAttack
  )
  const critRateDisplay = computed(
    () => `${Math.round((inventoryStore.getWeaponCritRate() + inventoryStore.getRingEffectValue('crit_rate_bonus')) * 100)}%`
  )
  const weaponEnchantName = computed(() => {
    const owned = inventoryStore.getEquippedWeapon()
    if (!owned.enchantmentId) return ''
    const enchant = getEnchantmentById(owned.enchantmentId)
    return enchant ? `${enchant.name} - ${enchant.description}` : ''
  })

  /** 电梯楼lớp按区域分组 */
  const elevatorZones = computed(() => {
    const allSafePoints = miningStore.getUnlockedSafePoints().filter(sp => sp < miningStore.safePointFloor)
    const zones = [
      { name: 'Mỏ nông', min: 0, max: 20 },
      { name: 'Động băng', min: 21, max: 40 },
      { name: 'Dung nham', min: 41, max: 60 },
      { name: 'Động pha lê', min: 61, max: 80 },
      { name: 'Khu U ám', min: 81, max: 100 },
      { name: 'Vực thẳm', min: 101, max: 120 }
    ]
    return zones
      .map(z => ({
        name: z.name,
        floors: allSafePoints.filter(sp => sp >= z.min && sp <= z.max)
      }))
      .filter(z => z.floors.length > 0)
  })

  /** 离开Của tôi提示文案 */
  const leaveHint = computed(() => {
    if (miningStore.isInSkullCavern) {
      const floorData = miningStore.getActiveFloorData()
      if (floorData?.isSafePoint) return `Điểm hiện tại là điểm an toàn và tiến độ sẽ được lưu vào${miningStore.skullCavernFloor}lớp.`
      const lastSafe = miningStore.skullSafePointFloor
      return lastSafe > 0 ? `Lần sau nó sẽ là từ${lastSafe + 1}lớp bắt đầu.` : 'Tiến độ hiện tại sẽ không được giữ lại.'
    }
    return 'Tiến độ hiện tại sẽ không được giữ lại.'
  })

  /** 骷髅矿穴可选安全点楼lớp(排除最高安全点,因为主按钮已默认从那里开始) */
  const skullElevatorFloors = computed(() => {
    return miningStore.getUnlockedSkullSafePoints().filter(sp => sp < miningStore.skullSafePointFloor)
  })

  // ==================== 格子 UI 辅助 ====================

  /** 格子样式 */
  const getTileClass = (tile: MineTile): string => {
    if (tile.state === 'hidden') {
      if (bombModeId.value) return 'bg-panel/50 border-accent/10 cursor-not-allowed opacity-40'
      if (miningStore.canRevealTile(tile.index)) return 'bg-panel border-accent/30 hover:border-accent cursor-pointer'
      return 'bg-panel/50 border-accent/10 cursor-not-allowed opacity-40'
    }
    switch (tile.type) {
      case 'empty':
        return 'bg-bg border-accent/10'
      case 'ore':
        return tile.state === 'collected' ? 'bg-bg border-accent/10' : 'bg-accent/20 border-accent/40'
      case 'monster':
        return tile.state === 'defeated' ? 'bg-bg border-accent/10' : 'bg-danger/20 border-danger/40 cursor-pointer'
      case 'boss':
        return tile.state === 'defeated' ? 'bg-bg border-accent/10' : 'bg-danger/30 border-danger/50 cursor-pointer'
      case 'stairs':
        return 'bg-success/20 border-success/40'
      case 'trap':
        return 'bg-danger/10 border-danger/20'
      case 'treasure':
        return tile.state === 'collected' ? 'bg-bg border-accent/10' : 'bg-accent/30 border-accent/50'
      case 'mushroom':
        return tile.state === 'collected' ? 'bg-bg border-accent/10' : 'bg-success/20 border-success/30'
      default:
        return 'bg-bg border-accent/10'
    }
  }

  /** 格子图标 */
  const getTileIcon = (tile: MineTile): string => {
    if (tile.state === 'hidden') return '?'
    switch (tile.type) {
      case 'empty':
        return '\u00B7'
      case 'ore':
        return tile.state === 'collected' ? '\u00B7' : '\u25C6'
      case 'monster':
        return tile.state === 'defeated' ? '\u00D7' : '!'
      case 'boss':
        return tile.state === 'defeated' ? '\u00D7' : '\u2620'
      case 'stairs':
        return '\u25BC'
      case 'trap':
        return '\u25B3'
      case 'treasure':
        return tile.state === 'collected' ? '\u00B7' : '\u2605'
      case 'mushroom':
        return tile.state === 'collected' ? '\u00B7' : '\u273F'
      default:
        return '\u00B7'
    }
  }

  /** 格子是否可点击 */
  const isTileClickable = (tile: MineTile): boolean => {
    if (bombModeId.value) {
      return tile.state !== 'hidden'
    }
    // 已揭示的怪物/BOSS格可以重新交chiến đấu
    if (tile.state === 'revealed' && (tile.type === 'monster' || tile.type === 'boss') && tile.data?.monster) {
      return true
    }
    return tile.state === 'hidden' && miningStore.canRevealTile(tile.index)
  }

  /** 格子点击处理 */
  const handleTileClick = (tile: MineTile) => {
    if (gameStore.isPastBedtime) {
      addLog('Đã quá muộn để tiếp tục khám phá.')
      handleEndDay()
      return
    }

    if (bombModeId.value) {
      const result = miningStore.useBombOnGrid(bombModeId.value, tile.index)
      if (result.success) {
        sfxMine()
        exploreLog.value.push(result.message)
        addLog(result.message)
        const tr = gameStore.advanceTime(ACTION_TIME_COSTS.mineOre)
        if (tr.message) addLog(tr.message)
        if (tr.passedOut) handleEndDay()
      } else {
        exploreLog.value.push(result.message)
      }
      bombModeId.value = null
      return
    }

    // 已揭示的怪物/BOSS格：重新交chiến đấu
    if (tile.state === 'revealed' && (tile.type === 'monster' || tile.type === 'boss') && tile.data?.monster) {
      const result = miningStore.engageRevealedMonster(tile.index)
      if (result.success) {
        exploreLog.value.push(result.message)
        addLog(result.message)
        if (result.startsCombat) {
          startBattleBgm()
          sfxEncounter()
        }
      } else {
        exploreLog.value.push(result.message)
        addLog(result.message)
      }
      return
    }

    const result = miningStore.revealTile(tile.index)
    if (result.success) {
      exploreLog.value.push(result.message)
      addLog(result.message)

      if (result.startsCombat) {
        startBattleBgm()
        sfxEncounter()
        const tr = gameStore.advanceTime(ACTION_TIME_COSTS.combat)
        if (tr.message) addLog(tr.message)
        if (tr.passedOut) handleEndDay()
      } else {
        sfxClick()
        const tr = gameStore.advanceTime(ACTION_TIME_COSTS.revealTile)
        if (tr.message) addLog(tr.message)
        if (tr.passedOut) handleEndDay()
      }
    } else {
      exploreLog.value.push(result.message)
      addLog(result.message)
    }
  }

  /** 切换炸弹模式 */
  const toggleBombMode = (bombId: string) => {
    bombModeId.value = bombModeId.value === bombId ? null : bombId
  }

  // ==================== 事件处理 ====================

  const handleEnterMine = (startFrom?: number) => {
    showElevatorModal.value = false
    showCombatItems.value = false
    const msg = miningStore.enterMine(startFrom)
    exploreLog.value = [msg]
    sfxClick()
    addLog(msg)
  }

  const handleEnterSkullCavern = (startFrom?: number) => {
    showElevatorModal.value = false
    showCombatItems.value = false
    const msg = miningStore.enterSkullCavern(startFrom)
    exploreLog.value = [msg]
    sfxClick()
    addLog(msg)
  }

  const handleCombat = (action: CombatAction) => {
    if (combatAnimLock.value) return
    combatAnimLock.value = true

    const result = miningStore.combatAction(action)
    const { dealt, taken, isCrit } = parseDamage(result.message)

    if (action === 'attack') sfxAttack()
    if (action === 'defend') sfxDefend()
    if (action === 'flee') sfxFlee()
    if (result.message.includes('nhận được')) sfxHurt()

    if (action === 'attack' && dealt > 0) {
      triggerAnim('monster', isCrit ? 'anim-shake-heavy' : 'anim-shake', isCrit ? 400 : 300)
      showDamageFloat('monster', isCrit ? `đòn chí mạng -${dealt}` : `-${dealt}`)
    }
    if (action === 'defend') {
      triggerAnim('player', 'anim-flash-defend', 400)
    }
    if (taken > 0) {
      triggerAnim('player', isCrit ? 'anim-shake-heavy anim-flash-red' : 'anim-flash-red', 400)
      showDamageFloat('player', `-${taken}`)
    }

    addLog(result.message)

    if (result.combatOver) {
      if (result.won) {
        sfxVictory()
        triggerAnim('monster', 'anim-victory', 1500)
      }
      resumeNormalBgm()
      showCombatItems.value = false
      if (!miningStore.isExploring) {
        exploreLog.value.push(result.message)
      }
    }

    setTimeout(() => {
      combatAnimLock.value = false
    }, 400)
  }

  const handleConfirmUseItem = () => {
    if (!pendingItemId.value) return
    const result = miningStore.useCombatItem(pendingItemId.value, pendingCanBatch.value ? pendingUseQty.value : 1)
    sfxClick()
    addLog(result.message)
    if (result.success) {
      exploreLog.value.push(result.message)
    }
    pendingItemId.value = null
  }

  const handlePendingItem = (itemId: string) => {
    pendingItemId.value = itemId
    pendingUseQty.value = 1
    showCombatItems.value = false
  }

  /** sử dụng怪物诱饵 */
  const handleUseMonsterLure = () => {
    const result = miningStore.useMonsterLure()
    sfxClick()
    addLog(result.message)
    if (result.success) {
      exploreLog.value.push(result.message)
    }
  }

  const handleNextFloor = () => {
    if (gameStore.isPastBedtime) {
      addLog('Đã quá muộn rồi, đã đến lúc phải quay lại.')
      handleEndDay()
      return
    }
    showCombatItems.value = false
    const result = miningStore.goNextFloor()
    if (result.success) {
      exploreLog.value = [result.message]
      bombModeId.value = null
    } else {
      exploreLog.value.push(result.message)
    }
    addLog(result.message)
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.nextFloor)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  }

  const handleLeave = () => {
    if (miningStore.inCombat) resumeNormalBgm()
    showCombatItems.value = false
    showLeaveConfirm.value = false
    const msg = miningStore.leaveMine()
    exploreLog.value = []
    bombModeId.value = null
    addLog(msg)
  }

  const confirmLeave = () => {
    handleLeave()
  }

  // ==================== 快速切装 ====================

  const showPresetListModal = ref(false)
  const showPresetDetailModal = ref(false)
  const detailPresetId = ref<string | null>(null)
  const showEquipPropertyModal = ref(false)

  interface EquipPropertyInfo {
    category: string
    name: string
    description: string
    effects: { label: string; value: string }[]
  }

  const equipPropertyInfo = ref<EquipPropertyInfo | null>(null)

  const EFFECT_NAMES: Record<EquipmentEffectType, string> = {
    attack_bonus: 'Tấn công',
    crit_rate_bonus: 'Tỷ lệ trúng đòn chí mạng',
    defense_bonus: 'Thủ',
    vampiric: 'Ma cà rồng',
    max_hp_bonus: 'tối đaHP',
    stamina_reduction: 'nỗ lực thể chất',
    mining_stamina: 'Khai thác sức mạnh thể chất',
    farming_stamina: 'Làm nông thể lực',
    fishing_stamina: 'Sức bền câu cá',
    crop_quality_bonus: 'chất lượng cây trồng',
    crop_growth_bonus: 'tăng trưởng cây trồng',
    fish_quality_bonus: 'chất lượng cá',
    fishing_calm: 'Câu cá ổn định',
    sell_price_bonus: 'Tăng giá bán',
    shop_discount: 'cửa hàng giảm giá',
    gift_friendship: 'Thiện chí như một món quà',
    monster_drop_bonus: 'Tỷ lệ rớt',
    exp_bonus: 'tiền thưởng kinh nghiệm',
    treasure_find: 'Xác suất rương kho báu',
    ore_bonus: 'Tiền thưởng quặng',
    luck: 'may mắn',
    travel_speed: 'Du lịch tăng tốc'
  }

  const PCTG_EFFECTS: Set<EquipmentEffectType> = new Set([
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
    'travel_speed',
    'defense_bonus'
  ])

  const fmtEffect = (eff: { type: EquipmentEffectType; value: number }): string => {
    if (PCTG_EFFECTS.has(eff.type)) return `+${Math.round(eff.value * 100)}%`
    return `+${eff.value}`
  }

  const detailPreset = computed(() => {
    if (!detailPresetId.value) return null
    return inventoryStore.equipmentPresets.find(p => p.id === detailPresetId.value) ?? null
  })

  const quickApplyPreset = (id: string) => {
    const result = inventoryStore.applyEquipmentPreset(id)
    addLog(result.message)
    showPresetListModal.value = false
  }

  const viewPresetDetail = (id: string) => {
    detailPresetId.value = id
    showPresetDetailModal.value = true
  }

  const viewEquipProperty = (type: 'weapon' | 'ring' | 'hat' | 'shoe', defId: string) => {
    if (type === 'weapon') {
      const def = getWeaponById(defId)
      if (!def) return
      equipPropertyInfo.value = {
        category: 'vũ khí',
        name: def.name,
        description: def.description,
        effects: [
          { label: 'Tấn công', value: `${def.attack}` },
          { label: 'loại', value: WEAPON_TYPE_NAMES[def.type] },
          { label: 'Tỷ lệ trúng đòn chí mạng', value: `${Math.round(def.critRate * 100)}%` }
        ]
      }
    } else if (type === 'ring') {
      const def = getRingById(defId)
      if (!def) return
      equipPropertyInfo.value = {
        category: 'Nhẫn',
        name: def.name,
        description: def.description,
        effects: def.effects.map(e => ({ label: EFFECT_NAMES[e.type], value: fmtEffect(e) }))
      }
    } else if (type === 'hat') {
      const def = getHatById(defId)
      if (!def) return
      equipPropertyInfo.value = {
        category: 'Mũ',
        name: def.name,
        description: def.description,
        effects: def.effects.map(e => ({ label: EFFECT_NAMES[e.type], value: fmtEffect(e) }))
      }
    } else {
      const def = getShoeById(defId)
      if (!def) return
      equipPropertyInfo.value = {
        category: 'Giày',
        name: def.name,
        description: def.description,
        effects: def.effects.map(e => ({ label: EFFECT_NAMES[e.type], value: fmtEffect(e) }))
      }
    }
    showEquipPropertyModal.value = true
  }
</script>

<style scoped>
  /* === chiến đấu斗动画 === */

  @keyframes combat-shake {
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

  @keyframes combat-shake-heavy {
    0%,
    100% {
      transform: translateX(0);
    }
    10% {
      transform: translate(-4px, 2px);
    }
    30% {
      transform: translate(4px, -2px);
    }
    50% {
      transform: translate(-3px, 1px);
    }
    70% {
      transform: translate(3px, -1px);
    }
    90% {
      transform: translate(-2px, 1px);
    }
  }

  @keyframes combat-flash-red {
    0%,
    100% {
      background-color: transparent;
    }
    50% {
      background-color: rgba(195, 64, 67, 0.3);
    }
  }

  @keyframes combat-flash-defend {
    0%,
    100% {
      background-color: transparent;
    }
    50% {
      background-color: rgba(76, 110, 138, 0.3);
    }
  }

  @keyframes combat-float-up {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-24px);
    }
  }

  @keyframes combat-victory-flash {
    0%,
    100% {
      border-color: rgba(200, 164, 92, 0.3);
    }
    50% {
      border-color: rgba(200, 164, 92, 0.8);
    }
  }

  .anim-shake {
    animation: combat-shake 0.3s ease-in-out;
  }
  .anim-shake-heavy {
    animation: combat-shake-heavy 0.4s ease-in-out;
  }
  .anim-flash-red {
    animation: combat-flash-red 0.3s ease-in-out;
  }
  .anim-flash-defend {
    animation: combat-flash-defend 0.4s ease-in-out;
  }
  .anim-victory {
    animation: combat-victory-flash 0.5s ease-in-out 3;
  }
  .anim-float-up {
    animation: combat-float-up 0.8s ease-out forwards;
  }
</style>
