<template>
  <div>
    <h3 class="text-accent text-sm mb-3 flex items-center justify-between">
      <span>
        <component :is="npcStore.getSpouse() ? Heart : Home" :size="14" class="inline" />
        Nhà
      </span>
      <button
        class="text-muted hover:text-accent transition-colors"
        :aria-label="$i18n.locale === 'vi' ? 'Xem lịch năm' : '查看年历'"
        @click="showCalendarModal = true"
      >
        <Calendar :size="14" />
      </button>
    </h3>

    <!-- 农舍升级 -->
    <div class="border border-accent/20 rounded-xs p-3 mb-4">
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm text-accent">{{ homeStore.farmhouseName }}</span>
        <span class="text-xs text-muted">cấp độ {{ homeStore.farmhouseLevel }}</span>
      </div>
      <p class="text-xs text-muted mb-2">{{ currentBenefit }}</p>
      <div
        v-if="homeStore.nextUpgrade"
        class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
        @click="showUpgradeModal = true"
      >
        <span class="text-xs">nâng cấp lên「{{ homeStore.nextUpgrade.name }}」</span>
        <span class="text-xs text-accent whitespace-nowrap">{{ homeStore.nextUpgrade.cost }}văn bản</span>
      </div>
    </div>

    <!-- 家人 -->
    <div v-if="npcStore.getSpouse()" class="border border-accent/20 rounded-xs p-3 mb-4">
      <p class="text-sm text-accent mb-2">
        <Users :size="14" class="inline" />
        Gia đình
      </p>

      <!-- 配偶互动 -->
      <div class="border border-accent/10 rounded-xs p-2 mb-2">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs text-accent">{{ spouseDef?.name }}</span>
          <span class="text-[10px] text-danger">
            <Heart :size="10" class="inline" />
            Vợ/chồng
          </span>
        </div>
        <div v-if="spouseDialogue" class="border border-accent/10 rounded-xs p-2 mb-1.5">
          <p class="text-[10px] text-accent mb-0.5">「{{ spouseDef?.name }}」</p>
          <p class="text-xs">{{ spouseDialogue }}</p>
        </div>
        <div class="flex space-x-1.5">
          <Button
            class="flex-1 justify-center py-0.5"
            :icon="MessageCircle"
            :icon-size="10"
            :disabled="spouseState?.talkedToday"
            @click="handleSpouseTalk"
          >
            {{ spouseState?.talkedToday ? 'Đã trò chuyện' : 'Trò chuyện' }}
          </Button>
          <Button
            class="flex-1 justify-center py-0.5"
            :icon="Gift"
            :icon-size="10"
            :disabled="spouseState?.giftedToday || (spouseState?.giftsThisWeek ?? 0) >= 2"
            @click="showSpouseGiftModal = true"
          >
            {{ spouseState?.giftedToday ? 'Đã tặng' : (spouseState?.giftsThisWeek ?? 0) >= 2 ? 'Đã đạt giới hạn tuần' : 'Tặng quà' }}
          </Button>
        </div>
      </div>

      <!-- 提议通知 -->
      <div v-if="npcStore.childProposalPending" class="border border-accent/30 rounded-xs p-2 mb-2">
        <p class="text-xs text-accent mb-1.5">Vợ/chồng bạn có điều gì muốn nói với bạn……</p>
        <Button class="w-full justify-center" @click="showChildProposalDialog">Phản hồi</Button>
      </div>

      <!-- Mang thai面板 -->
      <div v-if="npcStore.pregnancy" class="border border-success/20 rounded-xs p-2 mb-2">
        <p class="text-xs text-success mb-2">Mang thai · {{ PREGNANCY_STAGE_LABELS[npcStore.pregnancy.stage] }}</p>
        <!-- 阶段进度条 -->
        <div class="flex items-center space-x-1 mb-1.5">
          <span class="text-[10px] text-muted w-8 shrink-0">Tiến độ</span>
          <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
            <div
              class="h-full rounded-xs bg-success transition-all"
              :style="{ width: Math.floor((npcStore.pregnancy.daysInStage / npcStore.pregnancy.stageDays) * 100) + '%' }"
            />
          </div>
          <span class="text-[10px] text-muted shrink-0">{{ npcStore.pregnancy.daysInStage }}/{{ npcStore.pregnancy.stageDays }}ngày</span>
        </div>
        <!-- Tỷ lệ giao hàng an toàn条 -->
        <div class="flex items-center space-x-1 mb-2">
          <span class="text-[10px] text-muted w-8 shrink-0">Sinh nở an toàn</span>
          <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
            <div
              class="h-full rounded-xs transition-all"
              :class="npcStore.pregnancy.careScore >= 70 ? 'bg-success' : npcStore.pregnancy.careScore >= 40 ? 'bg-accent' : 'bg-danger'"
              :style="{ width: npcStore.pregnancy.careScore + '%' }"
            />
          </div>
          <span class="text-[10px] text-muted shrink-0">{{ npcStore.pregnancy.careScore }}%</span>
        </div>
        <!-- 阶段提示 -->
        <p class="text-[10px] text-muted/60 mb-2">{{ STAGE_TIPS[npcStore.pregnancy.stage] }}</p>
        <!-- 照料操作 -->
        <div class="grid grid-cols-2 gap-1 mb-1">
          <Button
            class="py-0.5 px-1 text-[10px] justify-center"
            :disabled="npcStore.pregnancy.giftedForPregnancy"
            @click="handlePregnancyCare('gift')"
          >
            {{ npcStore.pregnancy.giftedForPregnancy ? 'Đã tặng' : 'Tặng quà' }}
          </Button>
          <Button
            class="py-0.5 px-1 text-[10px] justify-center"
            :disabled="npcStore.pregnancy.companionToday"
            @click="handlePregnancyCare('companion')"
          >
            {{ npcStore.pregnancy.companionToday ? 'Đã ở cùng' : 'Trò chuyện cùng' }}
          </Button>
          <Button class="py-0.5 px-1 text-[10px] justify-center" @click="handlePregnancyCare('supplement')">Uống thuốc bổ</Button>
          <Button
            class="py-0.5 px-1 text-[10px] justify-center"
            :disabled="npcStore.pregnancy.caredToday"
            @click="handlePregnancyCare('rest')"
          >
            {{ npcStore.pregnancy.caredToday ? 'Đã nghỉ' : 'Sắp xếp nghỉ ngơi' }}
          </Button>
        </div>
        <!-- 医疗方案(待产期) -->
        <div v-if="npcStore.pregnancy.stage === 'ready'" class="border border-accent/20 rounded-xs p-2 mt-2">
          <p class="text-[10px] text-accent mb-1.5">Chọn cách sinh</p>
          <div v-if="!npcStore.pregnancy.medicalPlan" class="flex flex-col space-y-1">
            <Button class="py-0.5 px-1 text-[10px] w-full justify-center" @click="handleChooseMedical('normal')">
              Giao hàng thông thường (1000văn bản · 80%an toàn)
            </Button>
            <Button class="py-0.5 px-1 text-[10px] w-full justify-center" @click="handleChooseMedical('advanced')">
              Hộ sinh cao cấp (5000văn bản · 95%an toàn)
            </Button>
            <Button class="py-0.5 px-1 text-[10px] w-full justify-center text-accent" @click="handleChooseMedical('luxury')">
              Giao hàng sang trọng (15000văn bản · 100%an toàn)
            </Button>
          </div>
          <p v-else class="text-[10px] text-success">Đã chọn:{{ MEDICAL_LABELS[npcStore.pregnancy.medicalPlan] }}</p>
        </div>
      </div>

      <!-- 无子女无Mang thai -->
      <div v-if="npcStore.children.length === 0 && !npcStore.pregnancy && !npcStore.childProposalPending">
        <div class="flex flex-col items-center justify-center py-6 text-muted">
          <Users :size="32" class="mb-2" />
          <p class="text-xs">Cuộc sống sau hôn nhân ổn định, có thể sau này sẽ có em bé.</p>
        </div>
      </div>

      <!-- 子女列表 -->
      <div v-if="npcStore.children.length > 0" class="flex flex-col space-y-1">
        <div v-for="child in npcStore.children" :key="child.id" class="border border-accent/10 rounded-xs p-2">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs text-accent">
              {{ child.name }}
              <span v-if="child.birthQuality === 'healthy'" class="text-[10px] text-success ml-0.5">[sức khỏe]</span>
              <span v-else-if="child.birthQuality === 'premature'" class="text-[10px] text-muted/60 ml-0.5">[sinh non]</span>
            </span>
            <div class="flex items-center space-x-1">
              <Button
                v-if="child.stage !== 'baby' && !child.interactedToday"
                class="py-0 px-1"
                :icon="Heart"
                @click="handleInteractChild(child.id)"
              >
                Tương tác
              </Button>
              <span v-else-if="child.stage !== 'baby'" class="text-xs text-muted">Đã tương tác</span>
              <span v-else class="text-xs text-muted">Còn quá nhỏ</span>
              <Button class="py-0 px-1 text-danger" @click="releaseConfirmChildId = child.id">Gửi đi</Button>
            </div>
          </div>
          <p class="text-[10px] text-muted mb-0.5">{{ CHILD_STAGE_NAMES[child.stage] }} · {{ child.daysOld }}ngày</p>
          <div v-if="child.stage !== 'baby'" class="flex items-center space-x-0.5">
            <Heart
              v-for="h in 10"
              :key="h"
              :size="10"
              class="flex-shrink-0"
              :class="child.friendship >= h * 30 ? 'text-danger' : 'text-muted/30'"
              :fill="child.friendship >= h * 30 ? 'currentColor' : 'none'"
            />
          </div>
        </div>
      </div>
      <!-- 送走子女确认 -->
      <div v-if="releaseConfirmChildId !== null" class="mt-2 game-panel border-danger/40">
        <p class="text-xs text-danger mb-2">quyết tâm{{ getChildName(releaseConfirmChildId) }}Gửi nó cho một người họ hàng xa? (chi phí10000văn bản)</p>
        <div class="grid grid-cols-2 gap-2">
          <Button class="text-danger" @click="handleReleaseChild">Xác nhận</Button>
          <Button @click="releaseConfirmChildId = null">Hủy</Button>
        </div>
      </div>
    </div>

    <!-- 雇工管理 -->
    <div class="border border-accent/20 rounded-xs p-3 mb-4">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm text-accent">
          <Hammer :size="14" class="inline" />
          Người làm
        </p>
        <Button v-if="currentHelpers.length < 2" class="py-0 px-1.5" :icon="UserPlus" :icon-size="12" @click="showHireModal = true">
          Chiêu mộ
        </Button>
      </div>
      <p class="text-xs text-muted mb-2">Việc làm thuận lợi≥4Dân làng ở Xin giúp quản lý trang trại và trả lương hàng ngày.</p>

      <!-- 当前雇工 -->
      <div v-if="currentHelpers.length > 0" class="flex flex-col space-y-1 mb-2">
        <div
          v-for="h in currentHelpers"
          :key="h.npcId"
          class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5"
        >
          <div>
            <span class="text-xs text-accent">{{ getNpcById(h.npcId)?.name }}</span>
            <span class="text-xs text-muted ml-1">{{ npcStore.HELPER_TASK_NAMES[h.task] }}</span>
          </div>
          <div class="flex items-center space-x-1.5">
            <span class="text-[10px] text-muted">{{ h.dailyWage }}văn bản/ngày</span>
            <Button class="py-0 px-1 btn-danger" :icon="X" :icon-size="10" @click="dismissConfirmNpcId = h.npcId" />
          </div>
        </div>
      </div>
      <div v-if="currentHelpers.length === 0" class="flex flex-col items-center justify-center py-6 text-muted">
        <Hammer :size="32" class="mb-2" />
        <p class="text-xs">Chưa thuê</p>
      </div>
    </div>

    <!-- hầm rượu -->
    <div v-if="homeStore.hasCellar" class="border border-accent/20 rounded-xs p-3">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm text-accent">
          <Wine :size="14" class="inline" />
          hầm rượu·Lv.{{ homeStore.cellarLevel }}
          <span class="text-[10px] text-muted ml-1">({{ homeStore.cellarSlots.length }}/{{ homeStore.cellarMaxSlots }})</span>
        </p>
        <Button v-if="homeStore.nextCellarUpgrade" class="py-0 px-1" @click="showCellarUpgradeModal = true">
          <ArrowUp :size="12" class="inline" />
          Nâng cấp
        </Button>
      </div>
      <div v-if="homeStore.cellarSlots.length > 0" class="flex flex-col space-y-1.5 mb-3">
        <div v-for="(slot, idx) in homeStore.cellarSlots" :key="idx" class="border border-accent/10 rounded-xs p-2">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center space-x-1">
              <span class="text-xs text-accent">{{ getItemName(slot.itemId) }}</span>
              <span v-if="slot.upgradeCount >= 16" class="text-[10px] text-success">Rượu lâu năm{{ Math.floor(slot.upgradeCount / 16) }}năm</span>
            </div>
            <Button class="py-0 px-1" @click="removeAgingConfirmIdx = idx">Lấy ra</Button>
          </div>
          <div class="flex items-center justify-between mb-0.5">
            <span class="text-[10px] text-muted">Giá trị gia tăng+{{ slot.addedValue }}Văn bản (quảng bá{{ slot.upgradeCount }}lần)</span>
          </div>
          <div class="flex items-center space-x-1">
            <span class="text-[10px] text-muted w-6">Chu kỳ</span>
            <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
              <div
                class="h-full rounded-xs bg-accent transition-all"
                :style="{ width: Math.min(100, Math.floor((slot.daysAging / 7) * 100)) + '%' }"
              />
            </div>
            <span class="text-[10px] text-muted">{{ slot.daysAging }}/7ngày</span>
          </div>
        </div>
      </div>
      <div v-if="homeStore.cellarSlots.length === 0" class="flex flex-col items-center justify-center py-6 text-muted mb-3">
        <Wine :size="32" class="mb-2" />
        <p class="text-xs">Hầm rượu trống rỗng</p>
      </div>

      <!-- 放入新酒 -->
      <Button
        class="w-full"
        v-if="homeStore.cellarSlots.length < homeStore.cellarMaxSlots && ageableInInventory.length > 0"
        @click="showAgingModal = true"
      >
        Bỏ vào hầm
      </Button>
    </div>

    <!-- 升级农舍弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showUpgradeModal && homeStore.nextUpgrade"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showUpgradeModal = false"
      >
        <div ref="modalRef_2wpqi" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showUpgradeModal = false">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-2">Nâng cấp nhà</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs">nâng cấp lên「{{ homeStore.nextUpgrade.name }}」</p>
            <p class="text-xs text-muted mt-0.5">{{ homeStore.nextUpgrade.description }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2 mb-2 space-y-1">
            <p class="text-xs text-muted mb-1">Vật liệu cần</p>
            <div v-for="mat in homeStore.nextUpgrade.materialCost" :key="mat.itemId" class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ getItemName(mat.itemId) }}</span>
              <span class="text-xs" :class="getCombinedItemCount(mat.itemId) >= mat.quantity ? '' : 'text-danger'">
                {{ getCombinedItemCount(mat.itemId) }}/{{ mat.quantity }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Tiền xu</span>
              <span class="text-xs" :class="playerStore.money >= homeStore.nextUpgrade.cost ? '' : 'text-danger'">
                {{ homeStore.nextUpgrade.cost }}văn bản
              </span>
            </div>
          </div>

          <Button
            class="w-full justify-center"
            :class="{ '!bg-accent !text-bg': canUpgradeFarmhouse }"
            :disabled="!canUpgradeFarmhouse"
            :icon="ArrowUp"
            :icon-size="12"
            @click="handleUpgradeFromModal"
          >
            Nâng cấp
          </Button>
        </div>
      </div>
    </Transition>

    <!-- 放入Rượu lâu năm列表弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showAgingModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showAgingModal = false"
      >
        <div ref="modalRef_kjqfh" class="game-panel max-w-xs w-full" role="dialog" aria-modal="true" tabindex="-1">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-accent">Bỏ vào hầm</p>
            <Button class="py-0 px-1" :icon="X" :icon-size="12" @click="showAgingModal = false" />
          </div>
          <div class="flex flex-col space-y-1">
            <div
              v-for="item in ageableInInventory"
              :key="item.itemId + item.quality"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
              @click="handleStartAgingFromModal(item.itemId, item.quality)"
            >
              <span
                class="text-xs"
                :class="{
                  'text-quality-fine': item.quality === 'fine',
                  'text-quality-excellent': item.quality === 'excellent',
                  'text-quality-supreme': item.quality === 'supreme'
                }"
              >
                {{ getItemName(item.itemId) }}
              </span>
              <span class="text-xs text-muted">&times;{{ item.quantity }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 时历弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showCalendarModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showCalendarModal = false"
      >
        <div ref="modalRef_h7v6h" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showCalendarModal = false">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-2">
            <Calendar :size="14" class="inline" />
            Lịch
          </p>

          <!-- 季节切换 -->
          <div class="grid grid-cols-4 gap-2 mb-2">
            <button
              v-for="s in SEASONS"
              :key="s"
              class="text-[10px] px-2 py-0.5 border rounded-xs transition-colors"
              :class="calendarSeason === s ? 'bg-accent/20 border-accent/40 text-accent' : 'border-accent/10 text-muted hover:text-text'"
              @click="handleSelectSeason(s)"
            >
              {{ SEASON_NAMES[s] }}
            </button>
          </div>

          <!-- 28ngày网格 -->
          <div class="grid grid-cols-7 gap-px">
            <div v-for="wd in WEEKDAYS" :key="wd" class="text-center py-0.5">
              <span class="text-[10px]" :class="wd === 'sat' || wd === 'sun' ? 'text-accent' : 'text-muted'">{{ WEEKDAY_NAMES[wd] }}</span>
            </div>
            <div
              v-for="entry in calendarDays"
              :key="entry.day"
              class="text-center py-1 border border-transparent transition-colors"
              :class="[
                entry.isToday ? 'bg-accent/20 border-accent/40' : '',
                entry.festivals.length > 0 || entry.birthdays.length > 0 ? 'cursor-pointer hover:bg-accent/10 rounded-sm' : '',
                selectedCalendarDay === entry.day ? 'border-accent/30' : ''
              ]"
              @click="handleSelectDay(entry)"
            >
              <span class="text-[10px]" :class="entry.isToday ? 'text-accent' : 'text-muted'">
                {{ entry.day }}
              </span>
              <div class="flex justify-center space-x-px mt-px min-h-1.5">
                <span v-if="entry.festivals.length > 0" class="w-1 h-1 rounded-full bg-danger inline-block" />
                <span v-if="entry.birthdays.length > 0" class="w-1 h-1 rounded-full bg-success inline-block" />
              </div>
            </div>
          </div>

          <!-- 图例 -->
          <div class="flex items-center space-x-3 mt-1.5">
            <span class="text-[10px] text-muted flex items-center space-x-0.5">
              <span class="w-1.5 h-1.5 rounded-full bg-danger inline-block" />
              <span>Lễ</span>
            </span>
            <span class="text-[10px] text-muted flex items-center space-x-0.5">
              <span class="w-1.5 h-1.5 rounded-full bg-success inline-block" />
              <span>Sinh nhật</span>
            </span>
          </div>

          <!-- 选中ngày详情 -->
          <div
            v-if="selectedDayEntry && (selectedDayEntry.festivals.length > 0 || selectedDayEntry.birthdays.length > 0)"
            class="border border-accent/10 rounded-xs p-2 mt-2"
          >
            <p class="text-[10px] text-accent mb-1">
              {{ SEASON_NAMES[calendarSeason] }}{{ selectedCalendarDay }}ngày
              <span v-if="selectedDayEntry.isToday" class="text-danger ml-1">(hôm nay)</span>
            </p>
            <div v-for="f in selectedDayEntry.festivals" :key="f.name" class="mb-0.5">
              <span class="text-[10px] text-danger">{{ f.name }}</span>
              <span class="text-[10px] text-muted ml-1">{{ f.description }}</span>
            </div>
            <div v-for="b in selectedDayEntry.birthdays" :key="b.npcName">
              <span class="text-[10px] text-success">{{ b.npcName }}sinh nhật</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 配偶送礼弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showSpouseGiftModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showSpouseGiftModal = false"
      >
        <div ref="modalRef_1aqo3" class="game-panel max-w-sm w-full" role="dialog" aria-modal="true" tabindex="-1">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-accent">tặng quà cho{{ spouseDef?.name }}</p>
            <Button class="py-0 px-1" :icon="X" :icon-size="12" @click="showSpouseGiftModal = false" />
          </div>
          <div class="flex flex-col space-y-1 max-h-60 overflow-y-auto">
            <div
              v-for="item in spouseGiftableItems"
              :key="item.itemId + item.quality"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
              @click="handleSpouseGift(item.itemId, item.quality)"
            >
              <span class="flex items-center space-x-1">
                <span class="text-xs" :class="qualityTextClass(item.quality)">
                  {{ getItemById(item.itemId)?.name }}
                </span>
                <span
                  v-if="getSpouseGiftPref(item.itemId) !== 'neutral'"
                  class="text-[10px]"
                  :class="GIFT_PREF_CLASS[getSpouseGiftPref(item.itemId)]"
                >
                  {{ GIFT_PREF_LABELS[getSpouseGiftPref(item.itemId)] }}
                </span>
              </span>
              <span class="text-xs text-muted">&times;{{ item.quantity }}</span>
            </div>
          </div>
          <div v-if="spouseGiftableItems.length === 0" class="py-4 text-center text-xs text-muted">Không có vật phẩm nào trong ba lô để cho đi</div>
        </div>
      </div>
    </Transition>

    <!-- 招募雇工弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="showHireModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" @click.self="closeHireModal">
        <div ref="modalRef_dznqf" class="game-panel max-w-sm w-full" role="dialog" aria-modal="true" tabindex="-1">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-accent">Thuê người</p>
            <Button class="py-0 px-1" :icon="X" :icon-size="12" @click="closeHireModal" />
          </div>

          <!-- 任务选择 -->
          <p class="text-xs text-muted mb-1">Chọn nhiệm vụ</p>
          <div class="grid grid-cols-4 gap-1 mb-3">
            <button
              v-for="(label, key) in npcStore.HELPER_TASK_NAMES"
              :key="key"
              class="text-xs py-1 rounded-xs border"
              :class="selectedHireTask === key ? 'border-accent text-accent' : 'border-accent/20 text-muted'"
              @click="selectHireTask(key as FarmHelperTask)"
            >
              {{ label }}
            </button>
          </div>
          <p class="text-xs text-muted mb-2">Lương hàng ngày:{{ npcStore.HELPER_WAGES[selectedHireTask] }}văn bản</p>

          <!-- 确认雇佣 -->
          <div v-if="hireConfirmNpc" class="border border-accent/30 rounded-xs p-3 mb-2">
            <p class="text-xs text-accent mb-2">
              Xác nhận thuê
              <span class="text-text">{{ hireConfirmNpc.name }}</span>
              Phụ trách
              <span class="text-text">{{ npcStore.HELPER_TASK_NAMES[selectedHireTask] }}</span>
               Không?
            </p>
            <p class="text-[10px] text-muted mb-2">Lương hàng ngày:{{ npcStore.HELPER_WAGES[selectedHireTask] }}văn bản</p>
            <div class="flex space-x-2">
              <Button class="py-0.5 px-2 text-xs" @click="handleHire(hireConfirmNpcId!)">Đóng</Button>
              <Button class="py-0.5 px-2 text-xs" @click="hireConfirmNpcId = null">Hủy</Button>
            </div>
          </div>

          <!-- 可雇佣NPC列表 -->
          <div v-else class="flex flex-col space-y-1 max-h-48 overflow-y-auto">
            <div
              v-for="npc in hireableNpcs"
              :key="npc.npcId"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
              @click="hireConfirmNpcId = npc.npcId"
            >
              <span class="text-xs">{{ npc.name }}</span>
              <span class="text-[10px] text-muted">
                <Heart :size="10" class="inline" />
                {{ Math.floor(npc.friendship / 250) }}trái tim
              </span>
            </div>
          </div>
          <p v-if="!hireConfirmNpc && hireableNpcs.length === 0" class="text-xs text-muted text-center py-3">
            Không có dân làng nào để thuê (yêu cầu sự ưu ái≥4trái tim, không phải là đối tác/người bạn tâm tình)
          </p>
        </div>
      </div>
    </Transition>

    <!-- 解雇确认弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="dismissConfirmNpcId"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="dismissConfirmNpcId = null"
      >
        <div ref="modalRef_ye0c5" class="game-panel max-w-xs w-full text-center" role="dialog" aria-modal="true" tabindex="-1">
          <p class="text-sm text-danger mb-3">xác nhận sa thải{{ getNpcById(dismissConfirmNpcId)?.name }}?</p>
          <p class="text-xs text-muted mb-4">Cần tuyển dụng sau khi sa thải.</p>
          <div class="flex space-x-3 justify-center">
            <Button @click="dismissConfirmNpcId = null">Hủy</Button>
            <Button class="btn-danger" @click="handleDismiss(dismissConfirmNpcId!)">Xác nhận sa thải</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 取出Rượu lâu năm确认弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="removeAgingConfirmSlot"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="removeAgingConfirmIdx = null"
      >
        <div ref="modalRef_69c7j" class="game-panel max-w-xs w-full text-center" role="dialog" aria-modal="true" tabindex="-1">
          <p class="text-sm text-accent mb-3">Xác nhận để lấy ra{{ getItemName(removeAgingConfirmSlot.itemId) }}?</p>
          <p class="text-xs text-muted mb-2">
            Giá trị gia tăng+{{ removeAgingConfirmSlot.addedValue }}Văn bản (quảng bá{{ removeAgingConfirmSlot.upgradeCount }}lần)
          </p>
          <p v-if="removeAgingConfirmSlot.upgradeCount >= 16" class="text-xs text-success mb-2">
            đã trở nên già đi{{ Math.floor(removeAgingConfirmSlot.upgradeCount / 16) }}Năm, lấy nó ra và nó sẽ sáng lên cuốn sách minh họa!
          </p>
          <p v-if="removeAgingConfirmSlot.addedValue > 0" class="text-xs text-accent mb-4">
            Khi bạn lấy nó ra bạn sẽ nhận được{{ removeAgingConfirmSlot.addedValue }}Văn Tăng đáng giá đồng tiền.
          </p>
          <p v-else class="text-xs text-muted mb-4">Chưa có giá trị gia tăng, đầy đủ7Trời có thể gia tăng giá trị.</p>
          <div class="flex space-x-3 justify-center">
            <Button @click="removeAgingConfirmIdx = null">Hủy</Button>
            <Button @click="handleRemoveAging(removeAgingConfirmIdx!)">Xác nhận lấy ra</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- hầm rượu升级弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showCellarUpgradeModal && homeStore.nextCellarUpgrade"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showCellarUpgradeModal = false"
      >
        <div ref="modalRef_koows" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showCellarUpgradeModal = false">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-2">Nâng cấp hầm rượu</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs">nâng cấp lên「{{ homeStore.nextCellarUpgrade.name }}」</p>
            <p class="text-xs text-muted mt-0.5">
              giá trị gia tăng mọi lúc{{ homeStore.nextCellarUpgrade.valuePerCycle }}văn bản, dung lượng tối đa{{ homeStore.nextCellarUpgrade.maxSlots }}một
            </p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2 mb-2 space-y-1">
            <p class="text-xs text-muted mb-1">Vật liệu cần</p>
            <div v-for="mat in homeStore.nextCellarUpgrade.materialCost" :key="mat.itemId" class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ getItemName(mat.itemId) }}</span>
              <span class="text-xs" :class="getCombinedItemCount(mat.itemId) >= mat.quantity ? '' : 'text-danger'">
                {{ getCombinedItemCount(mat.itemId) }}/{{ mat.quantity }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Tiền xu</span>
              <span class="text-xs" :class="playerStore.money >= homeStore.nextCellarUpgrade.cost ? '' : 'text-danger'">
                {{ homeStore.nextCellarUpgrade.cost }}văn bản
              </span>
            </div>
          </div>

          <Button
            class="w-full justify-center"
            :class="{ '!bg-accent !text-bg': canUpgradeCellar }"
            :disabled="!canUpgradeCellar"
            :icon="ArrowUp"
            :icon-size="12"
            @click="handleUpgradeCellar"
          >
            Nâng cấp
          </Button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">

  import { useFocusTrap } from '@/composables/useFocusTrap'
  import { computed, ref } from 'vue'
  import { ArrowUp, Calendar, Gift, Hammer, Home, Heart, MessageCircle, UserPlus, Users, Wine, X } from 'lucide-vue-next'
  import { useCookingStore } from '@/stores/useCookingStore'
  import { useGameStore } from '@/stores/useGameStore'
  import { useHomeStore } from '@/stores/useHomeStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { useNpcStore } from '@/stores/useNpcStore'
  import { useAchievementStore } from '@/stores/useAchievementStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { SEASON_NAMES } from '@/stores/useGameStore'
  import { getCombinedItemCount } from '@/composables/useCombinedInventory'
  import { getItemById, getNpcById, NPCS } from '@/data'
  import { SEASON_EVENTS } from '@/data/events'
  import { ACTION_TIME_COSTS, WEEKDAYS, WEEKDAY_NAMES } from '@/data/timeConstants'
  import type { Quality, ChildStage, PregnancyStage, Season, FarmHelperTask } from '@/types'
  import { addLog } from '@/composables/useGameLog'
  import { showChildProposal, triggerHeartEvent } from '@/composables/useDialogs'
  import { handleEndDay } from '@/composables/useEndDay'
  import Button from '@/components/game/Button.vue'


  const modalRef_2wpqi = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_2wpqi);
  const modalRef_kjqfh = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_kjqfh);
  const modalRef_h7v6h = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_h7v6h);
  const modalRef_1aqo3 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_1aqo3);
  const modalRef_dznqf = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_dznqf);
  const modalRef_ye0c5 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_ye0c5);
  const modalRef_69c7j = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_69c7j);
  const modalRef_koows = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_koows);



  const homeStore = useHomeStore()
  const inventoryStore = useInventoryStore()
  const gameStore = useGameStore()
  const npcStore = useNpcStore()
  const playerStore = usePlayerStore()

  const releaseConfirmChildId = ref<number | null>(null)
  const showUpgradeModal = ref(false)
  const showAgingModal = ref(false)
  const showCalendarModal = ref(false)
  const showSpouseGiftModal = ref(false)
  const showHireModal = ref(false)
  const selectedHireTask = ref<FarmHelperTask>('water')
  const hireConfirmNpcId = ref<string | null>(null)
  const dismissConfirmNpcId = ref<string | null>(null)
  const removeAgingConfirmIdx = ref<number | null>(null)
  const showCellarUpgradeModal = ref(false)
  const removeAgingConfirmSlot = computed(() =>
    removeAgingConfirmIdx.value !== null ? (homeStore.cellarSlots[removeAgingConfirmIdx.value] ?? null) : null
  )

  const hireableNpcs = computed(() => npcStore.getHireableNpcs())
  const currentHelpers = computed(() => npcStore.hiredHelpers)
  const hireConfirmNpc = computed(() => (hireConfirmNpcId.value ? getNpcById(hireConfirmNpcId.value) : null))

  const handleHire = (npcId: string) => {
    const result = npcStore.hireHelper(npcId, selectedHireTask.value)
    addLog(result.message)
    if (result.success) {
      hireConfirmNpcId.value = null
      showHireModal.value = false
    }
  }

  const closeHireModal = () => {
    showHireModal.value = false
    hireConfirmNpcId.value = null
  }

  const selectHireTask = (task: FarmHelperTask) => {
    selectedHireTask.value = task
    hireConfirmNpcId.value = null
  }

  const handleDismiss = (npcId: string) => {
    const result = npcStore.dismissHelper(npcId)
    addLog(result.message)
    dismissConfirmNpcId.value = null
  }

  // === 配偶互动 ===

  const spouseState = computed(() => npcStore.getSpouse())
  const spouseDef = computed(() => (spouseState.value ? getNpcById(spouseState.value.npcId) : null))
  const spouseDialogue = ref<string | null>(null)

  const handleSpouseTalk = () => {
    if (!spouseState.value) return
    if (gameStore.isPastBedtime) {
      addLog('Đã quá muộn rồi, đã đến lúc phải nghỉ ngơi.')
      handleEndDay()
      return
    }
    const result = npcStore.talkTo(spouseState.value.npcId)
    if (result) {
      spouseDialogue.value = result.message
      addLog(`với${spouseDef.value?.name}Trò chuyện.(+${result.friendshipGain}ấn tượng tốt)`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.talk)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) {
        handleEndDay()
        return
      }
      const heartEvent = npcStore.checkHeartEvent(spouseState.value.npcId)
      if (heartEvent) triggerHeartEvent(heartEvent)
    }
  }

  type GiftPreference = 'loved' | 'liked' | 'hated' | 'neutral'

  const getSpouseGiftPref = (itemId: string): GiftPreference => {
    if (!spouseDef.value) return 'neutral'
    if (spouseDef.value.lovedItems.includes(itemId)) return 'loved'
    if (spouseDef.value.likedItems.includes(itemId)) return 'liked'
    if (spouseDef.value.hatedItems.includes(itemId)) return 'hated'
    return 'neutral'
  }

  const GIFT_PREF_LABELS: Record<GiftPreference, string> = { loved: 'Rất thích', liked: 'Thích', hated: 'Ghét', neutral: '' }
  const GIFT_PREF_CLASS: Record<GiftPreference, string> = { loved: 'text-danger', liked: 'text-success', hated: 'text-muted', neutral: '' }
  const GIFT_PREF_ORDER: Record<GiftPreference, number> = { loved: 0, liked: 1, neutral: 2, hated: 3 }

  const spouseGiftableItems = computed(() => {
    const filtered = inventoryStore.items.filter(i => {
      const def = getItemById(i.itemId)
      return def && def.category !== 'seed'
    })
    if (!spouseDef.value) return filtered
    return [...filtered].sort((a, b) => GIFT_PREF_ORDER[getSpouseGiftPref(a.itemId)] - GIFT_PREF_ORDER[getSpouseGiftPref(b.itemId)])
  })

  const handleSpouseGift = (itemId: string, quality: Quality) => {
    if (!spouseState.value) return
    const cookingStore = useCookingStore()
    const cookingGiftBonus = cookingStore.activeBuff?.type === 'giftBonus' ? cookingStore.activeBuff.value : 1
    const ringGiftBonus = inventoryStore.getRingEffectValue('gift_friendship')
    const giftMultiplier = cookingGiftBonus * (1 + ringGiftBonus)
    const result = npcStore.giveGift(spouseState.value.npcId, itemId, giftMultiplier, quality)
    if (result) {
      const itemName = getItemById(itemId)?.name ?? itemId
      const name = spouseDef.value?.name
      if (result.gain > 0) {
        addLog(`đưa cho${name}${itemName},${name}cảm thấy${result.reaction}.(+${result.gain}ấn tượng tốt)`)
      } else if (result.gain < 0) {
        addLog(`đưa cho${name}${itemName},${name}${result.reaction}cái này……(${result.gain}ấn tượng tốt)`)
      } else {
        addLog(`đưa cho${name}${itemName},${name}cảm thấy${result.reaction}.`)
      }
      showSpouseGiftModal.value = false
      const heartEvent = npcStore.checkHeartEvent(spouseState.value.npcId)
      if (heartEvent) triggerHeartEvent(heartEvent)
    }
  }

  const qualityTextClass = (q: Quality): string => {
    if (q === 'fine') return 'text-quality-fine'
    if (q === 'excellent') return 'text-quality-excellent'
    if (q === 'supreme') return 'text-quality-supreme'
    return ''
  }

  const CHILD_STAGE_NAMES: Record<ChildStage, string> = {
    baby: 'Em bé',
    toddler: 'Trẻ em',
    child: 'Thiếu nhi',
    teen: 'Thiếu niên'
  }

  const PREGNANCY_STAGE_LABELS: Record<PregnancyStage, string> = {
    early: 'Giai đoạn đầu (cần dinh dưỡng)',
    mid: 'Trung hạn (cần đồng hành)',
    late: 'Chậm kinh (cần nghỉ ngơi)',
    ready: 'Thời gian chờ đợi (chuẩn bị giao hàng)'
  }

  const STAGE_TIPS: Record<PregnancyStage, string> = {
    early: 'Bạn cần chú ý đến dinh dưỡng trong giai đoạn đầu của thai kỳ, bổ sung một số thực phẩm hoặc thực phẩm bổ sung sẽ có tác dụng tốt nhất.',
    mid: 'Trong tam cá nguyệt thứ hai, cần có nhiều sự đồng hành hơn và trò chuyện nhiều hơn có thể cải thiện đáng kể tỷ lệ sinh nở an toàn.',
    late: 'Hãy chú ý nghỉ ngơi trong ba tháng thứ ba của thai kỳ và để vợ/chồng bạn hồi phục sức khỏe.',
    ready: 'Khi bạn sắp sinh, hãy chọn phương pháp sinh nở và chuẩn bị những bước cuối cùng.'
  }

  const MEDICAL_LABELS: Record<string, string> = {
    normal: 'Sinh thường',
    advanced: 'Sinh cao cấp',
    luxury: 'Sinh xa hoa'
  }

  const AGEABLE_ITEMS = ['watermelon_wine', 'osmanthus_wine', 'peach_wine', 'jujube_wine', 'corn_wine', 'rice_vinegar']

  // === ngày历 ===

  const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter']
  const calendarSeason = ref<Season>(gameStore.season)
  const selectedCalendarDay = ref<number | null>(null)

  const calendarDays = computed(() => {
    const s = calendarSeason.value
    const entries = []
    for (let d = 1; d <= 28; d++) {
      const festivals = SEASON_EVENTS.filter(e => e.season === s && e.day === d).map(e => ({ name: e.name, description: e.description }))
      const birthdays = NPCS.filter(npc => npc.birthday?.season === s && npc.birthday?.day === d).map(npc => ({ npcName: npc.name }))
      entries.push({ day: d, festivals, birthdays, isToday: s === gameStore.season && d === gameStore.day })
    }
    return entries
  })

  const selectedDayEntry = computed(() => {
    if (selectedCalendarDay.value === null) return null
    return calendarDays.value[selectedCalendarDay.value - 1] ?? null
  })

  const handleSelectSeason = (s: Season) => {
    calendarSeason.value = s
    selectedCalendarDay.value = null
  }

  const handleSelectDay = (entry: { day: number; festivals: { name: string }[]; birthdays: { npcName: string }[] }) => {
    if (entry.festivals.length > 0 || entry.birthdays.length > 0) {
      selectedCalendarDay.value = selectedCalendarDay.value === entry.day ? null : entry.day
    }
  }

  const currentBenefit = computed(() => {
    switch (homeStore.farmhouseLevel) {
      case 0:
        return 'Một túp lều đơn giản.'
      case 1:
        return 'Nâng cấp nhà bếp, phục hồi nấu ăn+20%.'
      case 2:
        return 'Ngôi nhà được mở rộng và phục hồi mỗi đêm10%sức mạnh thể chất.'
      case 3:
        return 'Hầm rượu dưới lòng đất được mở và có thể ủ rượu hảo hạng để nâng cao chất lượng.'
      default:
        return ''
    }
  })

  const canUpgradeFarmhouse = computed(() => {
    const upgrade = homeStore.nextUpgrade
    if (!upgrade) return false
    if (playerStore.money < upgrade.cost) return false
    return upgrade.materialCost.every(mat => getCombinedItemCount(mat.itemId) >= mat.quantity)
  })

  const ageableInInventory = computed(() => {
    return inventoryStore.items.filter(inv => AGEABLE_ITEMS.includes(inv.itemId))
  })

  const getItemName = (itemId: string): string => {
    return getItemById(itemId)?.name ?? itemId
  }

  const getChildName = (childId: number): string => {
    return npcStore.children.find(c => c.id === childId)?.name ?? 'đứa trẻ'
  }

  // === 操作处理 ===

  const handleUpgradeFromModal = () => {
    const upgrade = homeStore.nextUpgrade
    if (!upgrade) return
    if (homeStore.upgradeFarmhouse()) {
      addLog(`Trang trại được nâng cấp lên「${upgrade.name}」!${upgrade.description}`)
      showUpgradeModal.value = false
    } else {
      addLog('Không đủ xu hoặc nguyên liệu để nâng cấp.')
    }
  }

  const handleInteractChild = (childId: number) => {
    const result = npcStore.interactWithChild(childId)
    if (result) {
      addLog(result.message)
      if (result.item) {
        inventoryStore.addItem(result.item)
        const itemDef = getItemById(result.item)
        addLog(`có${itemDef?.name ?? result.item}!`)
      }
    }
  }

  const handleReleaseChild = () => {
    if (releaseConfirmChildId.value === null) return
    const result = npcStore.releaseChild(releaseConfirmChildId.value)
    addLog(result.message)
    releaseConfirmChildId.value = null
  }

  const showChildProposalDialog = () => {
    showChildProposal()
  }

  const handlePregnancyCare = (action: 'gift' | 'companion' | 'supplement' | 'rest') => {
    const result = npcStore.performPregnancyCare(action)
    addLog(result.message)
    if (result.careGain > 0) addLog(`Tỷ lệ giao hàng an toàn +${result.careGain}%`)
  }

  const handleChooseMedical = (plan: 'normal' | 'advanced' | 'luxury') => {
    const result = npcStore.chooseMedicalPlan(plan)
    addLog(result.message)
  }

  const handleStartAgingFromModal = (itemId: string, quality: Quality) => {
    if (homeStore.startAging(itemId, quality)) {
      const name = getItemName(itemId)
      addLog(`sẽ${name}Được ủ trong hầm rượu.`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.aging)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    } else {
      addLog('Không thể đặt trong hầm rượu (đầy hoặc vật phẩm không thể để lâu).')
    }
    // hầm rượu满或无剩余可Rượu lâu năm物品时关闭弹窗
    if (homeStore.cellarSlots.length >= homeStore.cellarMaxSlots || ageableInInventory.value.length === 0) {
      showAgingModal.value = false
    }
  }

  const handleRemoveAging = (index: number) => {
    // 取出前先记录剩余ngày数
    const slotBeforeRemove = homeStore.cellarSlots[index]
    const remainingDays = slotBeforeRemove?.daysAging ?? 0
    const result = homeStore.removeAging(index)
    if (result) {
      inventoryStore.addItem(result.itemId, 1, result.quality)
      const name = getItemName(result.itemId)
      const totalDays = result.upgradeCount * 7 + remainingDays
      let msg = `Lấy từ hầm rượu${name}`
      if (result.addedValue > 0) {
        msg += `(Tuổi${totalDays}Ngày, giá trị gia tăng+${result.addedValue}văn bản)`
      }
      addLog(msg + '.')
      // 满1năm点亮图鉴
      if (result.upgradeCount >= 16) {
        const achievementStore = useAchievementStore()
        achievementStore.discoverItem('aged_' + result.itemId)
        addLog(`sáng lên${name}Hướng dẫn minh họa về cách ủ rượu!`)
      }
    }
    removeAgingConfirmIdx.value = null
  }

  const canUpgradeCellar = computed(() => {
    const upgrade = homeStore.nextCellarUpgrade
    if (!upgrade) return false
    if (playerStore.money < upgrade.cost) return false
    return upgrade.materialCost.every(mat => getCombinedItemCount(mat.itemId) >= mat.quantity)
  })

  const handleUpgradeCellar = () => {
    const upgrade = homeStore.nextCellarUpgrade
    if (!upgrade) return
    if (homeStore.upgradeCellar()) {
      addLog(`Hầm rượu được nâng cấp thành「${upgrade.name}」! giá trị gia tăng mọi lúc${upgrade.valuePerCycle}văn bản, dung lượng tối đa${upgrade.maxSlots}.`)
      showCellarUpgradeModal.value = false
    } else {
      addLog('Không đủ xu hoặc nguyên liệu để nâng cấp hầm rượu.')
    }
  }
</script>
