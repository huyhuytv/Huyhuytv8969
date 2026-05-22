<template>
  <div>
    <!-- 标题 -->
    <div class="flex items-center justify-between mb-1">
      <div class="flex items-center space-x-1.5 text-sm text-accent">
        <FlaskConical :size="14" />
        <span>Lai tạo giống</span>
      </div>
      <span class="text-xs text-muted">hộp hạt giống {{ breedingStore.boxCount }}/{{ breedingStore.maxSeedBox }}</span>
    </div>

    <!-- 两栏切换 -->
    <div class="flex space-x-1 mb-3">
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'breeding' }" @click="tab = 'breeding'">Bàn lai tạo</Button>
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'compendium' }" @click="tab = 'compendium'">
        Thư viện
      </Button>
    </div>

    <!-- ===== bàn chăn nuôi Tab ===== -->
    <template v-if="tab === 'breeding'">
      <!-- bàn chăn nuôi区 -->
      <div class="mb-3">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs text-muted">bàn chăn nuôi {{ breedingStore.stationCount }}/{{ MAX_BREEDING_STATIONS }}</span>
          <Button v-if="breedingStore.stationCount < MAX_BREEDING_STATIONS" :icon="Plus" :icon-size="12" @click="showCraftModal = true">
            Xây dựng
          </Button>
        </div>

        <!-- 无bàn chăn nuôi空状态 -->
        <div v-if="breedingStore.stationCount === 0" class="border border-accent/10 rounded-xs py-6 flex flex-col items-center space-y-2">
          <Dna :size="32" class="text-muted/30" />
          <p class="text-xs text-muted">Chưa xây bàn lai tạo</p>
          <p class="text-xs text-muted/60">Xây xong có thể lai giống</p>
        </div>

        <!-- bàn chăn nuôi列表 -->
        <div v-else class="flex flex-col space-y-1.5">
          <div v-for="(slot, idx) in breedingStore.stations" :key="idx" class="border border-accent/20 rounded-xs px-3 py-2">
            <!-- miễn phí -->
            <template v-if="!slot.parentA && !slot.ready">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-1.5">
                  <FlaskConical :size="12" class="text-muted/40" />
                  <span class="text-xs text-muted">bàn chăn nuôi #{{ idx + 1 }} · miễn phí</span>
                </div>
                <Button :icon="Dna" :icon-size="12" :disabled="breedingStore.boxCount < 2" @click="openBreedingSelect(idx)">Lai tạo giống</Button>
              </div>
            </template>
            <!-- 加工中 -->
            <template v-else-if="slot.parentA && !slot.ready">
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center space-x-1.5">
                  <FlaskConical :size="12" class="text-accent" />
                  <span class="text-xs text-accent">bàn chăn nuôi #{{ idx + 1 }} · Đang canh tác</span>
                </div>
                <span class="text-xs text-muted">{{ slot.daysProcessed }}/{{ slot.totalDays }}ngày</span>
              </div>
              <div class="h-1 bg-bg rounded-xs border border-accent/10">
                <div
                  class="h-full rounded-xs bg-accent transition-all"
                  :style="{ width: (slot.daysProcessed / slot.totalDays) * 100 + '%' }"
                />
              </div>
            </template>
            <!-- Hoàn thành -->
            <template v-else-if="slot.ready">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-1.5">
                  <Sprout :size="12" class="text-success" />
                  <span class="text-xs text-success">bàn chăn nuôi #{{ idx + 1 }} · Hoàn thành</span>
                </div>
                <Button :icon="Check" :icon-size="12" @click="handleCollect(idx)">Thu thập</Button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- hộp hạt giống -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs text-muted">hộp hạt giống {{ breedingStore.boxCount }}/{{ breedingStore.maxSeedBox }}</span>
          <button
            v-if="nextSeedBoxUpgrade || breedingStore.seedBoxLevel > 0"
            class="text-[10px] px-2 py-0.5 border rounded-xs"
            :class="nextSeedBoxUpgrade ? 'border-accent/30 text-accent hover:bg-accent/5 cursor-pointer' : 'border-accent/10 text-muted'"
            @click="showSeedBoxUpgradeModal = true"
          >
            <ArrowUpCircle :size="10" class="inline mr-0.5" />
            Lv.{{ breedingStore.seedBoxLevel }}
          </button>
        </div>
        <!-- 空状态 -->
        <div v-if="breedingStore.boxCount === 0" class="border border-accent/10 rounded-xs py-6 flex flex-col items-center space-y-2">
          <PackageOpen :size="32" class="text-muted/30" />
          <p class="text-xs text-muted">Hộp hạt trống</p>
          <p class="text-xs text-muted/60">Có cơ hội nhận được hạt giống khi thu thập sản phẩm từ máy làm hạt giống.</p>
        </div>
        <div v-else class="grid grid-cols-3 md:grid-cols-5 gap-1 max-h-60 overflow-y-auto">
          <button
            v-for="seed in breedingStore.breedingBox"
            :key="seed.genetics.id"
            class="border rounded-xs px-1 py-1.5 text-center cursor-pointer hover:bg-accent/5 transition-colors mr-1"
            :class="selectedSeedIds.includes(seed.genetics.id) ? 'border-accent bg-accent/10' : 'border-accent/20'"
            @click="openSeedDetail(seed)"
          >
            <p class="text-xs truncate" :class="seedStarColor(seed.genetics)">{{ getCropName(seed.genetics.cropId) }}</p>
            <p class="text-xs text-muted">G{{ seed.genetics.generation }}</p>
            <p class="text-xs flex items-center justify-center space-x-px" :class="seedStarColor(seed.genetics)">
              <Star v-for="n in getStarRating(seed.genetics)" :key="n" :size="10" />
            </p>
          </button>
        </div>
      </div>
    </template>

    <!-- ===== 图鉴 Tab ===== -->
    <template v-if="tab === 'compendium'">
      <!-- 育种规则 -->
      <div class="border border-accent/10 rounded-xs mb-2">
        <button class="w-full flex items-center justify-between p-2 text-xs text-accent hover:bg-accent/5" @click="showRules = !showRules">
          <span>Quy tắc lai tạo</span>
          <ChevronDown :size="12" :class="{ 'transform rotate-180': showRules }" />
        </button>
        <div v-if="showRules" class="px-2 pb-2 border-t border-accent/10">
          <ul class="text-xs text-muted leading-relaxed mt-1.5 flex flex-col space-y-1">
            <li>
              · Khi thu hoạch cây trồng
              <span class="text-accent">30%+Mức độ trồng×3%</span>
              Xác suất thu được hạt giống
            </li>
            <li>· Máy sản xuất hạt giống còn có cơ hội tạo ra hạt giống khi chế biến cây trồng.</li>
            <li>· Hạt giống có các đặc tính di truyền độc lập (vị ngọt/Năng suất/sức đề kháng), bất kể chất lượng vật phẩm</li>
            <li>
              ·
              <span class="text-accent">Lai cùng loại</span>
              : Việc lai hai hạt giống của cùng một loại cây trồng có thể cải thiện các đặc tính di truyền của con cái.
            </li>
            <li>
              ·
              <span class="text-accent">Lai khác loại</span>
              : Bằng cách lai hai hạt giống của các loại cây trồng khác nhau, có thể phát hiện ra các giống mới khi các đặc tính trung bình của bố mẹ đáp ứng tiêu chuẩn.
            </li>
            <li>· Trước tiên hãy cải thiện các thuộc tính thông qua việc nhân giống cùng loài, sau đó thử lai tạo để có kết quả tốt hơn.</li>
          </ul>
        </div>
      </div>
      <!-- 说明提示 -->
      <div v-if="totalDiscovered === 0" class="border border-accent/10 rounded-xs p-2 mb-2">
        <p class="text-xs text-muted leading-relaxed">
          Đã được thông qua trong sách minh họa
          <span class="text-accent">Lai khác loại</span>
          Loài mới được phát hiện. kết hợp hai
          <span class="text-accent">cây trồng khác nhau</span>
          Hạt giống được đặt trên bệ nhân giống, giống lai có thể được phát hiện khi các đặc tính trung bình của bố mẹ đáp ứng tiêu chuẩn.
        </p>
        <p class="text-xs text-muted mt-1 leading-relaxed">
          Mẹo: Vượt qua trước
          <span class="text-accent">Lai cùng loại</span>
          Cải thiện các thuộc tính về độ ngọt và năng suất của hạt, sau đó thử lai tạo.
        </p>
      </div>
      <!-- 阶层筛选 -->
      <div class="flex flex-wrap mb-1">
        <Button
          v-for="tf in TIER_FILTERS"
          :key="tf.value"
          class="grow shrink-0 basis-[calc(25%-4px)] md:grow-0 md:shrink md:basis-auto justify-center mr-1 mb-1"
          :class="{ '!bg-accent !text-bg': tierFilter === tf.value }"
          @click="tierFilter = tf.value"
        >
          {{ tf.label }}
        </Button>
      </div>

      <!-- 进度 -->
      <p class="text-xs text-muted mb-2">Đã tìm thấy {{ filteredDiscoveredCount }}/{{ filteredHybrids.length }}</p>

      <!-- 图鉴网lưới -->
      <div class="grid grid-cols-3 md:grid-cols-5 gap-1 max-h-72 overflow-y-auto" role="list">
        <div
          v-for="hybrid in filteredHybrids"
          :key="hybrid.id"
          class="border rounded-xs p-1.5 text-xs text-center transition-colors truncate mr-1"
          :class="
            isDiscovered(hybrid.id)
              ? 'border-accent/20 cursor-pointer hover:bg-accent/5 ' + tierColor(hybrid.id)
              : 'border-accent/10 text-muted/30'
          "
          @click="isDiscovered(hybrid.id) && (activeHybrid = hybrid)"
        >
          <template v-if="isDiscovered(hybrid.id)">{{ hybrid.name }}</template>
          <Lock v-else :size="12" class="mx-auto text-muted/30" />
        </div>
      </div>

      <!-- 图鉴Hoàn thành度 -->
      <div class="mt-3 border border-accent/20 rounded-xs p-2">
        <div class="flex items-center space-x-2 text-xs mb-1.5">
          <span class="text-xs text-muted shrink-0">Tiến độ</span>
          <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
            <div class="h-full bg-accent rounded-xs transition-all" :style="{ width: completionPercent + '%' }" />
          </div>
          <span class="text-xs text-accent whitespace-nowrap">{{ totalDiscovered }}/{{ HYBRID_DEFS.length }}</span>
        </div>
        <div class="grid grid-cols-2 gap-x-3 gap-y-0.5" role="list">
          <div v-for="ts in tierStats" :key="ts.tier" class="flex items-center justify-between">
            <span class="text-xs text-muted">{{ ts.label }}</span>
            <span class="text-xs">{{ ts.discovered }}/{{ ts.total }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- 建造确认弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showCraftModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showCraftModal = false"
      >
        <div ref="modalRef_f9adj" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showCraftModal = false">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-2">Xây bàn lai tạo</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted mb-1">Vật liệu cần</p>
            <div v-for="mat in craftMaterials" :key="mat.itemId" class="flex items-center justify-between mt-0.5">
              <span class="text-xs">{{ mat.name }}</span>
              <span class="text-xs" :class="mat.enough ? 'text-success' : 'text-danger'">{{ mat.owned }}/{{ mat.required }}</span>
            </div>
          </div>

          <div class="border border-accent/10 rounded-xs p-2 mb-3">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Chi phí</span>
              <span class="text-xs" :class="playerStore.money >= BREEDING_STATION_COST.money ? 'text-accent' : 'text-danger'">
                {{ BREEDING_STATION_COST.money }}văn bản
              </span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Đang có</span>
              <span class="text-xs">{{ playerStore.money }}văn bản</span>
            </div>
          </div>

          <Button
            class="w-full justify-center"
            :class="{ '!bg-accent !text-bg': canCraftStation }"
            :icon="Plus"
            :icon-size="12"
            :disabled="!canCraftStation"
            @click="handleCraftStation"
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </Transition>

    <!-- 种子详情弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="detailSeed" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" @click.self="detailSeed = null">
        <div ref="modalRef_v2s6z" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="detailSeed = null">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-2">{{ getCropName(detailSeed.genetics.cropId) }} · G{{ detailSeed.genetics.generation }}</p>
          <p class="text-xs mb-2 flex items-center space-x-1" :class="seedStarColor(detailSeed.genetics)">
            <span class="flex items-center space-x-px">
              <Star v-for="n in getStarRating(detailSeed.genetics)" :key="n" :size="10" />
            </span>
            <span>(Tổng cộng{{ getTotalStats(detailSeed.genetics) }})</span>
          </p>

          <!-- 属性条 -->
          <div class="flex flex-col space-y-1 mb-3">
            <div v-for="attr in seedAttributes" :key="attr.key" class="flex items-center space-x-2">
              <span class="text-xs text-muted w-10 shrink-0">{{ attr.label }}</span>
              <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                <div class="h-full rounded-xs transition-all" :class="attr.barClass" :style="{ width: attr.value + '%' }" />
              </div>
              <span class="text-xs w-6 text-right">{{ attr.value }}</span>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex flex-col space-y-1">
            <Button class="w-full justify-center text-danger" :icon="Trash2" :icon-size="12" @click="handleDiscard">Vứt</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 图鉴详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="activeHybrid"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="activeHybrid = null"
      >
        <div ref="modalRef_x0i9y" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="activeHybrid = null">
            <X :size="14" />
          </button>

          <p class="text-sm mb-2" :class="tierColor(activeHybrid.id)">{{ activeHybrid.name }}</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ activeHybrid.discoveryText }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Bậc</span>
              <span class="text-xs">{{ TIER_LABELS[getHybridTier(activeHybrid.id)] ?? 'Một' }}thế hệ</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Bố</span>
              <span class="text-xs">{{ getCropName(activeHybrid.parentCropA) }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Mẹ</span>
              <span class="text-xs">{{ getCropName(activeHybrid.parentCropB) }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Y/c độ ngọt</span>
              <span class="text-xs text-accent">≥{{ activeHybrid.minSweetness }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Y/c sản lượng</span>
              <span class="text-xs text-accent">≥{{ activeHybrid.minYield }}</span>
            </div>
          </div>

          <div class="border border-accent/10 rounded-xs p-2">
            <p class="text-xs text-muted mb-1">Chỉ số cơ bản</p>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Độ ngọt</span>
              <span class="text-xs">{{ activeHybrid.baseGenetics.sweetness }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Sản lượng</span>
              <span class="text-xs">{{ activeHybrid.baseGenetics.yield }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Kháng</span>
              <span class="text-xs">{{ activeHybrid.baseGenetics.resistance }}</span>
            </div>
            <div v-if="getCompendiumEntry(activeHybrid.id)" class="flex items-center justify-between mt-1 pt-1 border-t border-accent/10">
              <span class="text-xs text-muted">Số lần trồng</span>
              <span class="text-xs">{{ getCompendiumEntry(activeHybrid.id)?.timesGrown ?? 0 }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- hộp hạt giống升级弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showSeedBoxUpgradeModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showSeedBoxUpgradeModal = false"
      >
        <div ref="modalRef_lbt08" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showSeedBoxUpgradeModal = false">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-2">
            <ArrowUpCircle :size="14" class="inline mr-0.5" />
            Thông tin hộp hạt
          </p>

          <!-- 当前状态 -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Cấp hiện tại</span>
              <span class="text-xs text-accent">Lv.{{ breedingStore.seedBoxLevel }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Sức chứa tối đa</span>
              <span class="text-xs text-text">{{ breedingStore.maxSeedBox }} lưới</span>
            </div>
          </div>

          <!-- 下一级升级 -->
          <template v-if="nextSeedBoxUpgrade">
            <div class="border border-accent/10 rounded-xs p-2 mb-2">
              <p class="text-xs text-muted mb-1">Nâng cấp lên Lv.{{ breedingStore.seedBoxLevel + 1 }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-muted">Sức chứa tối đa</span>
                <span class="text-xs text-text">
                  {{ breedingStore.maxSeedBox }} → {{ breedingStore.maxSeedBox + SEED_BOX_UPGRADE_INCREMENT }}
                </span>
              </div>
            </div>

            <!-- 所需材料 -->
            <div class="border border-accent/10 rounded-xs p-2 mb-2">
              <p class="text-xs text-muted mb-1">Vật liệu cần</p>
              <div v-for="mat in nextSeedBoxUpgrade.materials" :key="mat.itemId" class="flex items-center justify-between">
                <span class="text-xs text-muted">{{ getItemById(mat.itemId)?.name }}</span>
                <span class="text-xs" :class="getCombinedItemCount(mat.itemId) >= mat.quantity ? '' : 'text-danger'">
                  {{ getCombinedItemCount(mat.itemId) }}/{{ mat.quantity }}
                </span>
              </div>
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-xs text-muted">Tiền xu</span>
                <span class="text-xs" :class="playerStore.money >= nextSeedBoxUpgrade.cost ? '' : 'text-danger'">
                  {{ nextSeedBoxUpgrade.cost }}văn bản
                </span>
              </div>
            </div>

            <!-- 扩容按钮 -->
            <Button
              v-if="!showSeedBoxUpgradeConfirm"
              class="w-full justify-center"
              :class="{ '!bg-accent !text-bg': canUpgradeSeedBox }"
              :icon="ArrowUpCircle"
              :icon-size="12"
              :disabled="!canUpgradeSeedBox"
              @click="showSeedBoxUpgradeConfirm = true"
            >
              Mở rộng hộp
            </Button>

            <!-- 确认 -->
            <div v-else class="flex space-x-1">
              <Button class="flex-1 justify-center" @click="showSeedBoxUpgradeConfirm = false">Hủy</Button>
              <Button class="flex-1 justify-center !bg-accent !text-bg" :icon="ArrowUpCircle" :icon-size="12" @click="handleSeedBoxUpgrade">
                Xác nhận mở rộng
              </Button>
            </div>
          </template>

          <p v-else class="text-[10px] text-muted text-center">Hộp hạt giống đã đạt đến mức tối đa.</p>
        </div>
      </div>
    </Transition>

    <!-- 育种选种弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="breedingSelectSlot !== null"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="cancelBreedingSelect"
      >
        <div ref="modalRef_9hzkx" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="cancelBreedingSelect">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-1">Chọn 2 hạt giống</p>
          <p class="text-xs text-muted mb-2">Đã chọn {{ selectedSeedIds.length }}/2</p>

          <div class="flex flex-col space-y-1 max-h-60 overflow-y-auto mb-3">
            <button
              v-for="seed in breedingStore.breedingBox"
              :key="seed.genetics.id"
              class="flex items-center justify-between px-2 py-1 border rounded-xs text-xs cursor-pointer hover:bg-accent/5"
              :class="selectedSeedIds.includes(seed.genetics.id) ? 'border-accent bg-accent/10' : 'border-accent/20'"
              @click="toggleSeedSelect(seed.genetics.id)"
            >
              <span :class="seedStarColor(seed.genetics)">{{ getCropName(seed.genetics.cropId) }} G{{ seed.genetics.generation }}</span>
              <span class="text-muted flex items-center space-x-1">
                <span class="flex items-center space-x-px">
                  <Star v-for="n in getStarRating(seed.genetics)" :key="n" :size="10" />
                </span>
                <span>{{ getTotalStats(seed.genetics) }}</span>
              </span>
            </button>
          </div>

          <!-- 杂交配方提示 -->
          <div
            v-if="crossBreedHint"
            class="border rounded-xs p-2 mb-3"
            :class="crossBreedHint.type === 'recipe' && crossBreedHint.canSucceed ? 'border-success/30' : 'border-accent/10'"
          >
            <template v-if="crossBreedHint.type === 'same'">
              <p class="text-xs text-muted">Nhân giống cùng loài: Cải thiện đặc tính của con cái và không tạo ra giống mới.</p>
            </template>
            <template v-else-if="crossBreedHint.type === 'no_recipe'">
              <p class="text-xs text-muted">Không có công thức lai tạo nào được biết đến cho hai giống chó này.</p>
            </template>
            <template v-else-if="crossBreedHint.type === 'recipe'">
              <p class="text-xs text-accent mb-1">Có thể lai:{{ crossBreedHint.name }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-muted">Độ ngọt</span>
                <span class="text-xs" :class="crossBreedHint.sweetOk ? 'text-success' : 'text-danger'">
                  {{ crossBreedHint.avgSweet }} / {{ crossBreedHint.minSweet }}
                </span>
              </div>
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-xs text-muted">Sản lượng</span>
                <span class="text-xs" :class="crossBreedHint.yieldOk ? 'text-success' : 'text-danger'">
                  {{ crossBreedHint.avgYield }} / {{ crossBreedHint.minYield }}
                </span>
              </div>
              <p v-if="!crossBreedHint.canSucceed" class="text-xs text-danger mt-1">Nếu các thuộc tính không đạt tiêu chuẩn thì phép thập phân sẽ thất bại. Hãy trồng cùng một loài trước để cải thiện thuộc tính.</p>
              <p v-else class="text-xs text-success mt-1">Nếu các thuộc tính đạt tiêu chuẩn, việc lai tạo có thể thành công!</p>
            </template>
          </div>

          <Button
            class="w-full justify-center"
            :class="{ '!bg-accent !text-bg': selectedSeedIds.length === 2 }"
            :icon="Dna"
            :icon-size="12"
            :disabled="selectedSeedIds.length !== 2"
            @click="handleStartBreeding"
          >
            Bắt đầu lai tạo
          </Button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">

  import { useFocusTrap } from '@/composables/useFocusTrap'
  import { ref, computed } from 'vue'
  import { FlaskConical, Plus, Check, ChevronDown, X, Dna, Trash2, Sprout, PackageOpen, Star, Lock, ArrowUpCircle } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import { useBreedingStore } from '@/stores/useBreedingStore'
  import { useGameStore } from '@/stores/useGameStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { getCombinedItemCount, removeCombinedItem } from '@/composables/useCombinedInventory'
  import { getCropById } from '@/data/crops'
  import { getItemById } from '@/data/items'
  import {
    MAX_BREEDING_STATIONS,
    BREEDING_STATION_COST,
    SEED_BOX_UPGRADE_INCREMENT,
    getStarRating,
    getTotalStats,
    HYBRID_DEFS,
    getHybridTier,
    findPossibleHybrid
  } from '@/data/breeding'
  import { ACTION_TIME_COSTS } from '@/data/timeConstants'
  import { addLog } from '@/composables/useGameLog'
  import { handleEndDay } from '@/composables/useEndDay'
  import type { BreedingSeed, HybridDef } from '@/types/breeding'


  const modalRef_f9adj = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_f9adj);
  const modalRef_v2s6z = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_v2s6z);
  const modalRef_x0i9y = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_x0i9y);
  const modalRef_lbt08 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_lbt08);
  const modalRef_9hzkx = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_9hzkx);



  const breedingStore = useBreedingStore()
  const playerStore = usePlayerStore()
  const gameStore = useGameStore()

  // === Tabs ===

  type Tab = 'breeding' | 'compendium'
  const tab = ref<Tab>('breeding')

  // === 育种规则展示 ===
  const showRules = ref(false)

  // === 图鉴阶层筛选 ===

  const TIER_LABELS: Record<number, string> = {
    1: 'Một',
    2: 'Hai',
    3: 'Ba',
    4: 'Bốn',
    5: 'Năm',
    6: 'Sáu',
    7: 'Bảy',
    8: 'Tám',
    9: 'Chín',
    10: 'Mười'
  }

  const TIER_FILTERS = [
    { value: 0, label: 'Tất cả' },
    { value: 1, label: 'Đời 1' },
    { value: 2, label: 'Đời 2' },
    { value: 3, label: 'Đời 3' },
    { value: 4, label: 'Đời 4' },
    { value: 5, label: 'Đời 5' },
    { value: 6, label: 'Đời 6' },
    { value: 7, label: 'Đời 7' },
    { value: 8, label: 'Đời 8' },
    { value: 9, label: 'Đời 9' },
    { value: 10, label: 'Đời 10' }
  ]

  const tierFilter = ref(0)

  const filteredHybrids = computed(() => {
    if (tierFilter.value === 0) return HYBRID_DEFS
    return HYBRID_DEFS.filter(h => getHybridTier(h.id) === tierFilter.value)
  })

  const filteredDiscoveredCount = computed(() => {
    return filteredHybrids.value.filter(h => isDiscovered(h.id)).length
  })

  const totalDiscovered = computed(() => {
    return breedingStore.compendium.length
  })

  const completionPercent = computed(() => {
    if (HYBRID_DEFS.length === 0) return 0
    return Math.floor((totalDiscovered.value / HYBRID_DEFS.length) * 100)
  })

  const tierStats = computed(() => {
    const stats: { tier: number; label: string; total: number; discovered: number }[] = []
    for (let t = 1; t <= 10; t++) {
      const hybrids = HYBRID_DEFS.filter(h => getHybridTier(h.id) === t)
      const discovered = hybrids.filter(h => isDiscovered(h.id)).length
      stats.push({ tier: t, label: `${TIER_LABELS[t]}thế hệ`, total: hybrids.length, discovered })
    }
    return stats
  })

  /** 根据阶层给Đã tìm thấy品种上色 */
  const TIER_COLOR_MAP: Record<number, string> = {
    1: 'text-accent',
    2: 'text-quality-fine',
    3: 'text-accent',
    4: 'text-quality-fine',
    5: 'text-quality-excellent',
    6: 'text-quality-excellent',
    7: 'text-quality-supreme',
    8: 'text-quality-supreme',
    9: 'text-quality-supreme',
    10: 'text-quality-supreme'
  }

  const tierColor = (hybridId: string): string => {
    return TIER_COLOR_MAP[getHybridTier(hybridId)] ?? 'text-accent'
  }

  // === 图鉴详情 ===

  const activeHybrid = ref<HybridDef | null>(null)

  // === 种子详情 ===

  const detailSeed = ref<BreedingSeed | null>(null)

  const openSeedDetail = (seed: BreedingSeed) => {
    detailSeed.value = seed
  }

  const seedAttributes = computed(() => {
    if (!detailSeed.value) return []
    const g = detailSeed.value.genetics
    return [
      { key: 'sweetness', label: 'Độ ngọt', value: g.sweetness, barClass: 'bg-accent' },
      { key: 'yield', label: 'Sản lượng', value: g.yield, barClass: 'bg-success' },
      { key: 'resistance', label: 'Kháng', value: g.resistance, barClass: 'bg-water' },
      { key: 'stability', label: 'Ổn định', value: g.stability, barClass: 'bg-muted' },
      { key: 'mutationRate', label: 'Đột biến', value: g.mutationRate, barClass: 'bg-danger' }
    ]
  })

  const handleDiscard = () => {
    if (!detailSeed.value) return
    breedingStore.removeFromBox(detailSeed.value.genetics.id)
    addLog('Một hạt giống đã bị loại bỏ.')
    detailSeed.value = null
  }

  // === 育种选种 ===

  const breedingSelectSlot = ref<number | null>(null)
  const selectedSeedIds = ref<string[]>([])

  const openBreedingSelect = (slotIdx: number) => {
    breedingSelectSlot.value = slotIdx
    selectedSeedIds.value = []
  }

  const cancelBreedingSelect = () => {
    breedingSelectSlot.value = null
    selectedSeedIds.value = []
  }

  const toggleSeedSelect = (id: string) => {
    const idx = selectedSeedIds.value.indexOf(id)
    if (idx >= 0) {
      selectedSeedIds.value.splice(idx, 1)
    } else if (selectedSeedIds.value.length < 2) {
      selectedSeedIds.value.push(id)
    }
  }

  /** 选中两颗种子时，检查是否存在杂交配方并显示属性要求 */
  const crossBreedHint = computed(() => {
    if (selectedSeedIds.value.length !== 2) return null
    const seedA = breedingStore.breedingBox.find(s => s.genetics.id === selectedSeedIds.value[0])
    const seedB = breedingStore.breedingBox.find(s => s.genetics.id === selectedSeedIds.value[1])
    if (!seedA || !seedB) return null
    const a = seedA.genetics
    const b = seedB.genetics
    if (a.cropId === b.cropId) return { type: 'same' as const }
    const hybrid = findPossibleHybrid(a.cropId, b.cropId)
    if (!hybrid) return { type: 'no_recipe' as const }
    const avgSweet = Math.round((a.sweetness + b.sweetness) / 2)
    const avgYield = Math.round((a.yield + b.yield) / 2)
    const sweetOk = avgSweet >= hybrid.minSweetness
    const yieldOk = avgYield >= hybrid.minYield
    return {
      type: 'recipe' as const,
      name: hybrid.name,
      avgSweet,
      avgYield,
      minSweet: hybrid.minSweetness,
      minYield: hybrid.minYield,
      sweetOk,
      yieldOk,
      canSucceed: sweetOk && yieldOk
    }
  })

  const handleStartBreeding = () => {
    if (breedingSelectSlot.value === null || selectedSeedIds.value.length !== 2) return
    const ok = breedingStore.startBreeding(breedingSelectSlot.value, selectedSeedIds.value[0]!, selectedSeedIds.value[1]!)
    if (ok) {
      addLog('Quá trình sinh sản bắt đầu,2Kết quả sẽ có sau đó vài ngày.')
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.breeding)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) {
        handleEndDay()
      }
    } else {
      addLog('Bắt đầu chăn nuôi không thành công.')
    }
    cancelBreedingSelect()
  }

  const handleCollect = (slotIdx: number) => {
    const result = breedingStore.collectResult(slotIdx)
    if (result) {
      const crop = getCropById(result.cropId)
      const stars = getStarRating(result)
      addLog(`Hạt giống thu được:${crop?.name ?? result.cropId}(${stars}ngôi sao).`)
    }
  }

  // === 制造bàn chăn nuôi ===

  const showCraftModal = ref(false)

  const canCraftStation = computed(() => {
    return breedingStore.canCraftStation(playerStore.money, (id: string) => getCombinedItemCount(id))
  })

  const craftMaterials = computed(() => {
    return BREEDING_STATION_COST.materials.map(m => ({
      itemId: m.itemId,
      name: getItemById(m.itemId)?.name ?? m.itemId,
      required: m.quantity,
      owned: getCombinedItemCount(m.itemId),
      enough: getCombinedItemCount(m.itemId) >= m.quantity
    }))
  })

  const handleCraftStation = () => {
    if (!canCraftStation.value) return
    breedingStore.craftStation(
      (amount: number) => playerStore.spendMoney(amount),
      (id: string, qty: number) => removeCombinedItem(id, qty)
    )
    addLog('Một chuồng chăn nuôi đã được xây dựng.')
    showCraftModal.value = false
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.breeding)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) {
      handleEndDay()
    }
  }

  // === hộp hạt giống升级 ===

  const showSeedBoxUpgradeModal = ref(false)
  const showSeedBoxUpgradeConfirm = ref(false)

  const nextSeedBoxUpgrade = computed(() => breedingStore.getNextSeedBoxUpgrade())

  const canUpgradeSeedBox = computed(() => {
    return breedingStore.canUpgradeSeedBox(playerStore.money, (id: string) => getCombinedItemCount(id))
  })

  const handleSeedBoxUpgrade = () => {
    const result = breedingStore.upgradeSeedBox(
      (amount: number) => playerStore.spendMoney(amount),
      (id: string, qty: number) => removeCombinedItem(id, qty)
    )
    addLog(result.message)
    if (result.success) {
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.breeding)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    }
    showSeedBoxUpgradeConfirm.value = false
    showSeedBoxUpgradeModal.value = false
  }

  // === 图鉴 ===

  const isDiscovered = (hybridId: string): boolean => {
    return breedingStore.compendium.some(e => e.hybridId === hybridId)
  }

  const getCompendiumEntry = (hybridId: string) => {
    return breedingStore.compendium.find(e => e.hybridId === hybridId) ?? null
  }

  // === 辅助 ===

  const getCropName = (cropId: string): string => {
    return getCropById(cropId)?.name ?? cropId
  }

  const seedStarColor = (g: { sweetness: number; yield: number; resistance: number }): string => {
    const total = g.sweetness + g.yield + g.resistance
    if (total >= 250) return 'text-quality-supreme'
    if (total >= 200) return 'text-quality-excellent'
    if (total >= 150) return 'text-quality-fine'
    return ''
  }
</script>
