<template>
  <main aria-labelledby="farm-title">
    <h1 id="farm-title" class="sr-only">{{ $i18n.locale === 'vi' ? 'Nông trại' : 'Trang trại' }}</h1>
    <!-- 标签切换 -->
    <div class="flex space-x-1.5 mb-3">
      <Button
        class="flex-1 justify-center"
        :class="{ '!bg-accent !text-bg': farmTab === 'field' }"
        :icon="Sprout"
        @click="farmTab = 'field'"
      >
        {{ $t('farm.tab_field') }}
      </Button>
      <Button
        class="flex-1 justify-center"
        :class="{ '!bg-accent !text-bg': farmTab === 'tree' }"
        :icon="TreeDeciduous"
        @click="farmTab = 'tree'"
      >
        {{ $t('farm.tab_tree') }}
      </Button>
    </div>

    <!-- 田庄标签 -->
    <section v-if="farmTab === 'field'" aria-labelledby="field-title">
      <div class="flex items-center justify-between mb-1">
        <h2 id="field-title" class="flex items-center space-x-1.5 text-sm text-accent">
          <Sprout :size="14" aria-hidden="true" />
          <span>{{ $t('farm.field') }} ({{ farmStore.farmSize }}×{{ farmStore.farmSize }})</span>
        </h2>
        <div class="text-xs text-muted flex space-x-3">
          <span v-if="farmStore.scarecrows > 0" class="inline-flex items-center space-x-0.5">
            <Bird :size="12" />
            <span>{{ $t('farm.scarecrow') }} {{ farmStore.scarecrows }}</span>
          </span>
          <span v-else class="text-danger/80 inline-flex items-center space-x-0.5">
            <Bird :size="12" />
            <span>{{ $t('farm.no_scarecrow') }}</span>
          </span>
          <span v-if="farmStore.lightningRods > 0" class="inline-flex items-center space-x-0.5">
            <Zap :size="12" />
            <span>{{ $t('farm.lightning_rod') }} {{ farmStore.lightningRods }}</span>
          </span>
        </div>
      </div>

      <!-- 新手引导 -->
      <p v-if="tutorialHint" class="text-[10px] text-muted/50 mb-2">{{ tutorialHint }}</p>

      <!-- 批量操作入口 -->
      <div class="mb-3">
        <Button class="w-full md:w-auto" :icon-size="12" :icon="Wrench" @click="showBatchActions = true">{{ $t('farm.batch_action') }}</Button>
      </div>

      <!-- 田庄特殊功能 -->
      <div v-if="gameStore.farmMapType === 'riverland' && gameStore.creekCatch.length > 0" class="mb-3">
        <div
                class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
          @click="handleCollectCreekCatch"
                @keydown.enter.prevent="handleCollectCreekCatch"
                @keydown.space.prevent="handleCollectCreekCatch"
        >
          <div>
            <p class="text-xs text-accent">{{ $t('farm.creek_catch') }}</p>
            <p class="text-[10px] text-muted">{{ $t('farm.creek_catch_desc', { count: gameStore.creekCatch.length }) }}</p>
          </div>
          <span class="text-xs text-success">{{ $t('farm.collect') }}</span>
        </div>
      </div>

      <div v-if="gameStore.farmMapType === 'hilltop' && gameStore.surfaceOrePatch" class="mb-3">
        <div
                class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
          @click="handleMineSurfaceOre"
                @keydown.enter.prevent="handleMineSurfaceOre"
                @keydown.space.prevent="handleMineSurfaceOre"
        >
          <div>
            <p class="text-xs text-accent">{{ $t('farm.surface_ore') }}</p>
            <p class="text-[10px] text-muted">{{ $t('farm.surface_ore_desc', { name: surfaceOreName, count: gameStore.surfaceOrePatch.quantity }) }}</p>
          </div>
          <span class="text-xs text-success">{{ $t('farm.mine_ore') }}</span>
        </div>
      </div>

      <!-- 批量操作弹窗 -->
      <Transition name="panel-fade">
        <div
          v-if="showBatchActions"
          class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          @click.self="showBatchActions = false"
        >
          <div ref="modalRef_4d0b8" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
            <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showBatchActions = false">
              <X :size="14" />
            </button>
            <p class="text-accent text-sm mb-2">{{ $t('farm.batch_action') }}</p>
            <div class="flex flex-col space-y-1.5" role="list">
              <button class="btn text-xs w-full justify-between" :disabled="unwateredCount === 0" @click="doBatchAction('water')">
                <span class="flex items-center space-x-1">
                  <Droplets :size="12" />
                  <span>{{ $t('farm.batch_water') }}</span>
                </span>
                <span class="text-muted">{{ unwateredCount }} {{ $t('farm.unit_plot') }}</span>
              </button>
              <button class="btn text-xs w-full justify-between" :disabled="wastelandCount === 0" @click="doBatchAction('till')">
                <span class="flex items-center space-x-1">
                  <Shovel :size="12" />
                  <span>{{ $t('farm.batch_till') }}</span>
                </span>
                <span class="text-muted">{{ wastelandCount }} {{ $t('farm.unit_plot') }}</span>
              </button>
              <button class="btn text-xs w-full justify-between" :disabled="harvestableCount === 0" @click="doBatchAction('harvest')">
                <span class="flex items-center space-x-1">
                  <Wheat :size="12" />
                  <span>{{ $t('farm.batch_harvest') }}</span>
                </span>
                <span class="text-muted">{{ harvestableCount }} {{ $t('farm.unit_plot') }}</span>
              </button>
              <button
                class="btn text-xs w-full justify-between"
                :disabled="tilledEmptyCount === 0 || (plantableSeeds.length === 0 && plantableBreedingSeeds.length === 0)"
                @click="doBatchAction('plant')"
              >
                <span class="flex items-center space-x-1">
                  <Sprout :size="12" />
                  <span>{{ $t('farm.batch_plant') }}</span>
                </span>
                <span class="text-muted">{{ tilledEmptyCount }} {{ $t('farm.unit_plot') }}</span>
              </button>
              <button
                class="btn text-xs w-full justify-between"
                :disabled="fertilizableCount === 0 || fertilizerItems.length === 0"
                @click="doBatchAction('fertilize')"
              >
                <span class="flex items-center space-x-1">
                  <CirclePlus :size="12" />
                  <span>{{ $t('farm.batch_fertilize') }}</span>
                </span>
                <span class="text-muted">{{ fertilizableCount }} {{ $t('farm.unit_plot') }}</span>
              </button>
              <button class="btn text-xs w-full justify-between" :disabled="infestedCount === 0" @click="doBatchAction('curePest')">
                <span class="flex items-center space-x-1">
                  <Bug :size="12" />
                  <span>{{ $t('farm.batch_cure_pest') }}</span>
                </span>
                <span class="text-muted">{{ infestedCount }} {{ $t('farm.unit_plot') }}</span>
              </button>
              <button class="btn text-xs w-full justify-between" :disabled="weedyCount === 0" @click="doBatchAction('clearWeed')">
                <span class="flex items-center space-x-1">
                  <Leaf :size="12" />
                  <span>{{ $t('farm.batch_clear_weed') }}</span>
                </span>
                <span class="text-muted">{{ weedyCount }} {{ $t('farm.unit_plot') }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- 农场网格 -->
      <div class="border border-accent/20 rounded-xs p-2">
        <div class="grid gap-0.5 max-w-full md:max-w-md" :style="{ gridTemplateColumns: `repeat(${farmStore.farmSize}, minmax(0, 1fr))` }">
          <button
            v-for="plot in farmStore.plots"
            :key="plot.id"
            class="farm-plot rounded-xs cursor-pointer transition-colors relative leading-tight"
            :class="[
              getPlotDisplay(plot).color,
              getPlotDisplay(plot).bg,
              needsWater(plot)
                ? 'border-2 border-danger/50'
                : isSprinklerCovered(plot.id)
                  ? 'border border-water/40'
                  : 'border border-accent/15',
              plot.state === 'harvestable' ? 'hover:border-accent/60' : 'hover:border-accent/40'
            ]"
            :title="getPlotTooltip(plot)"
            :aria-label="getPlotTooltip(plot)"
            @click="activePlotId = plot.id"
          >
            <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <component :is="getPlotDisplay(plot).icon" :size="14" />
              <span v-if="plot.cropId" class="text-[10px] opacity-60 truncate max-w-full px-0.5 mt-1">{{ getCropName(plot.cropId) }}</span>
              <!-- 角标 -->
              <Droplets
                v-if="(plot.state === 'planted' || plot.state === 'growing') && !plot.watered"
                :size="8"
                class="absolute bottom-0 right-0 text-danger drop-shadow-sm"
              />
              <Droplet v-if="hasSprinkler(plot.id)" :size="8" class="absolute top-0 right-0 text-water drop-shadow-sm" />
              <CirclePlus v-if="plot.fertilizer" :size="8" class="absolute bottom-0 left-0 text-success drop-shadow-sm" />
              <Bug v-if="plot.infested" :size="8" class="absolute top-0 left-0 text-danger drop-shadow-sm" />
              <Leaf
                v-if="plot.weedy"
                :size="8"
                class="absolute top-0 left-0 text-success drop-shadow-sm"
                :class="{ 'left-2': plot.infested }"
              />
            </div>
          </button>
        </div>
      </div>

      <!-- 地chặn操作弹窗 -->
      <Transition name="panel-fade">
        <div
          v-if="activePlot"
          class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          @click.self="activePlotId = null"
        >
          <div ref="modalRef_ikp6g" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
            <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="activePlotId = null">
              <X :size="14" />
            </button>
            <p class="text-accent text-sm mb-2">{{ $t('farm.plot_num', { id: activePlot.id + 1 }) }}</p>
            <p class="text-xs text-muted mb-2">
              {{ plotStateLabel }}
              <template v-if="activePlot.giantCropGroup !== null">{{ $i18n.locale === 'vi' ? ' (Khổng lồ)' : '(Jumbo)' }}</template>
              <template v-if="activePlot.cropId">
                · {{ activePlot.giantCropGroup !== null ? ($i18n.locale === 'vi' ? 'Khổng lồ ' : 'khổng lồ') : '' }}{{ getCropName(activePlot.cropId) }}
                <span v-if="plotCropRegrowth" class="text-success">[{{ $i18n.locale === 'vi' ? 'Nhiều vụ' : 'Nhiều loại cây trồng' }} {{ activePlot.harvestCount }}/{{ plotCropMaxHarvests }}]</span>
              </template>
              <template v-if="activePlot.cropId && activePlot.giantCropGroup === null">
                ·
                <span :class="activePlot.watered ? 'text-water' : 'text-danger'">{{ activePlot.watered ? ($i18n.locale === 'vi' ? 'Đã tưới' : 'Tưới nước') : ($i18n.locale === 'vi' ? 'Chưa tưới' : 'không tưới nước') }}</span>
              </template>
              <template v-if="activePlot.fertilizer">
                ·
                <span class="text-success">{{ plotFertName }}</span>
              </template>
              <template v-if="hasSprinkler(activePlot.id)">
                ·
                <span class="text-water">{{ $i18n.locale === 'vi' ? 'Vòi phun' : 'vòi phun nước' }}</span>
              </template>
              <template v-if="activePlot.infested">
                ·
                <span class="text-danger">{{ $i18n.locale === 'vi' ? 'Sâu bọ' : 'loài gây hại' }}({{ activePlot.infestedDays }}{{ $i18n.locale === 'vi' ? ' ngày' : 'ngày' }})</span>
              </template>
              <template v-if="activePlot.weedy">
                ·
                <span class="text-success">{{ $i18n.locale === 'vi' ? 'Cỏ dại' : 'cỏ dại' }}({{ activePlot.weedyDays }}{{ $i18n.locale === 'vi' ? ' ngày' : 'ngày' }})</span>
              </template>
            </p>
            <!-- 生长进度条 -->
            <div v-if="activePlot.cropId && activePlot.state !== 'harvestable'" class="flex items-center space-x-2 mb-2">
              <span class="text-xs text-muted shrink-0">{{ $i18n.locale === 'vi' ? 'Sinh trưởng' : 'Phát triển' }}</span>
              <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
                <div
                  class="h-full rounded-xs bg-success transition-all"
                  :style="{ width: Math.min(100, Math.floor((activePlot.growthDays / (Number(plotCropGrowthDays) || 1)) * 100)) + '%' }"
                />
              </div>
              <span class="text-xs text-muted whitespace-nowrap">
                {{ Number(activePlot.growthDays.toFixed(2)) }}/{{ plotCropGrowthDays }}{{ $i18n.locale === 'vi' ? ' ngày' : 'ngày' }}
              </span>
            </div>
            <p v-if="activePlot.giantCropGroup !== null" class="text-xs text-accent mb-2">{{ $i18n.locale === 'vi' ? 'Thu hoạch sẽ nhận được nhiều nông sản!' : 'Thu hoạch để có được hàng tấn cây trồng!' }}</p>

            <!-- 操作列表 -->
            <div class="flex flex-col space-y-1 max-h-60 overflow-y-auto">
              <Button
                v-if="activePlot.state === 'wasteland'"
                class="w-full justify-center shrink-0"
                :icon-size="12"
                :icon="Shovel"
                @click="doTill"
              >
                {{ $i18n.locale === 'vi' ? 'Khai khẩn' : 'sự khai hoang' }}
              </Button>
              <Button v-if="canWater" class="w-full justify-center shrink-0" :icon-size="12" :icon="Droplets" @click="doWater">{{ $i18n.locale === 'vi' ? 'Tưới nước' : 'tưới nước' }}</Button>
              <Button
                v-if="activePlot.infested"
                class="w-full justify-center shrink-0 !bg-danger !text-text"
                :icon-size="12"
                :icon="Bug"
                @click="doCurePest"
              >
                {{ $i18n.locale === 'vi' ? 'Diệt côn trùng' : 'Loại bỏ sâu bệnh' }}
              </Button>
              <Button
                v-if="activePlot.weedy"
                class="w-full justify-center shrink-0 !bg-success !text-bg"
                :icon-size="12"
                :icon="Leaf"
                @click="doClearWeed"
              >
                {{ $i18n.locale === 'vi' ? 'Nhổ cỏ' : 'làm cỏ' }}
              </Button>
              <Button
                v-if="activePlot.state === 'harvestable'"
                class="w-full justify-center shrink-0 !bg-accent !text-bg"
                :icon-size="12"
                :icon="Wheat"
                @click="doHarvest"
              >
                {{ $i18n.locale === 'vi' ? 'Thu hoạch' : 'Thu hoạch' }}
              </Button>
              <Button
                v-if="activePlot.state === 'planted' || activePlot.state === 'growing' || activePlot.state === 'harvestable'"
                class="w-full justify-center shrink-0"
                :icon-size="12"
                :icon="Trash2"
                @click="doRemoveCrop"
              >
                {{ $i18n.locale === 'vi' ? 'Xẻng nhổ' : 'diệt trừ' }}
              </Button>
              <template v-if="activePlot.state === 'tilled' && plantableSeeds.length > 0">
                <Divider :label="$i18n.locale === 'vi' ? 'Trồng' : 'trồng cây'" />
                <button
                  v-for="seed in plantableSeeds"
                  :key="seed.cropId + ':' + seed.quality"
                  class="btn text-xs justify-between mr-1 shrink-0"
                  @click="doPlant(seed.cropId, seed.quality)"
                >
                  <span :class="seed.colorClass">
                    {{ seed.name }}
                    <span
                      v-if="seed.quality !== 'normal'"
                      :class="{
                        'text-quality-fine': seed.quality === 'fine',
                        'text-quality-excellent': seed.quality === 'excellent',
                        'text-quality-supreme': seed.quality === 'supreme'
                      }"
                      class="ml-0.5"
                    >
                      [{{ QUALITY_NAMES[seed.quality] }}]
                    </span>
                    <span v-if="seed.regrowth" class="text-success ml-1">[{{ $i18n.locale === 'vi' ? 'Nhiều vụ' : 'Nhiều loại cây trồng' }}]</span>
                  </span>
                  <span class="text-muted">×{{ seed.count }}</span>
                </button>
              </template>
              <template v-if="activePlot.state === 'tilled' && plantableBreedingSeeds.length > 0">
                <Divider :label="$i18n.locale === 'vi' ? 'Hạt giống lai' : 'hạt giống nhân giống'" class="!my-2" />
                <button
                  v-for="seed in plantableBreedingSeeds"
                  :key="seed.genetics.id"
                  class="btn text-xs justify-between mr-1 shrink-0"
                  @click="doPlantGeneticSeed(seed.genetics.id)"
                >
                  <span>{{ getCropName(seed.genetics.cropId) }} G{{ seed.genetics.generation }}</span>
                  <span class="text-muted flex items-center space-x-px">
                    <Star v-for="n in getStarRating(seed.genetics)" :key="n" :size="10" />
                  </span>
                </button>
              </template>
              <!-- loài子trống rỗngTrạng thái -->
              <div
                v-if="activePlot.state === 'tilled' && plantableSeeds.length === 0 && plantableBreedingSeeds.length === 0"
                class="flex flex-col items-center py-4"
              >
                <Sprout :size="32" class="text-muted/30" />
                <p class="text-xs text-muted mt-2">{{ $i18n.locale === 'vi' ? 'Không có hạt giống trồng được vào mùa này trong balo' : 'Không có hạt giống nào để trồng trong mùa hiện tại trong ba lô.' }}</p>
                <Button v-if="isWanwupuOpen" class="mt-2" :icon-size="12" :icon="Store" @click="goToShop">{{ $i18n.locale === 'vi' ? 'Đến cửa hàng mua' : 'Đến cửa hàng để mua' }}</Button>
                <p v-else class="text-[10px] text-muted/60 mt-1">{{ wanwupuClosedReason }}</p>
              </div>
              <template v-if="canFertilize && fertilizerItems.length > 0">
                <Divider :label="$i18n.locale === 'vi' ? 'Bón phân' : 'bón phân'" />
                <button
                  v-for="f in fertilizerItems"
                  :key="f.itemId"
                  class="btn text-xs justify-between mr-1 shrink-0"
                  @click="doFertilize(f.type)"
                >
                  <span :class="f.colorClass">{{ f.name }}</span>
                  <span class="text-muted">×{{ f.count }}</span>
                </button>
              </template>
              <template v-if="!hasSprinkler(activePlot.id) && sprinklerItems.length > 0">
                <Divider :label="$i18n.locale === 'vi' ? 'Vòi phun' : 'vòi phun nước'" />
                <button
                  v-for="s in sprinklerItems"
                  :key="s.itemId"
                  class="btn text-xs justify-between mr-1 shrink-0"
                  @click="doPlaceSprinkler(s.type)"
                >
                  <span :class="s.colorClass">{{ s.name }}</span>
                  <span class="text-muted">×{{ s.count }}</span>
                </button>
              </template>
              <Button v-if="hasSprinkler(activePlot.id)" class="mr-1 justify-center shrink-0" @click="doRemoveSprinkler">{{ $i18n.locale === 'vi' ? 'Gỡ vòi phun' : 'Loại bỏ vòi phun nước' }}</Button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Trồng cây bằng một cú nhấp chuột弹窗 -->
      <Transition name="panel-fade">
        <div
          v-if="showBatchPlant"
          class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          @click.self="showBatchPlant = false"
        >
          <div ref="modalRef_c6vja" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
            <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showBatchPlant = false">
              <X :size="14" />
            </button>
            <p class="text-accent text-sm mb-2">{{ $i18n.locale === 'vi' ? 'Gieo hạt hàng loạt' : 'Trồng cây bằng một cú nhấp chuột' }}</p>
            <p class="text-xs text-muted mb-2">{{ $i18n.locale === 'vi' ? 'Đất trống' : 'đất nông nghiệp trống' }} {{ tilledEmptyCount }} {{ $i18n.locale === 'vi' ? 'mảnh, chọn hạt giống để gieo:' : 'chặn, chọn hạt giống để trồng:' }}</p>
            <div class="flex flex-col space-y-1 max-h-40 overflow-y-auto">
              <button
                v-for="seed in plantableSeeds"
                :key="seed.cropId"
                class="btn text-xs justify-between mr-1 shrink-0"
                @click="doBatchPlant(seed.cropId)"
              >
                <span :class="seed.colorClass">
                  {{ seed.name }}
                  <span v-if="seed.regrowth" class="text-success ml-1">[{{ $i18n.locale === 'vi' ? 'Nhiều vụ' : 'Nhiều loại cây trồng' }}]</span>
                </span>
                <span class="text-muted">×{{ seed.count }}</span>
              </button>
            </div>
            <template v-if="batchBreedingSeedGroups.length > 0">
              <Divider :label="$i18n.locale === 'vi' ? 'Hạt giống lai' : 'hạt giống nhân giống'" class="!my-2" />
              <div class="flex flex-col space-y-1 max-h-40 overflow-y-auto">
                <button
                  v-for="group in batchBreedingSeedGroups"
                  :key="group.cropId"
                  class="btn text-xs justify-between mr-1 shrink-0"
                  @click="doBatchPlantBreeding(group.cropId)"
                >
                  <span>
                    {{ group.name }}
                    <span class="text-muted">G{{ group.minGen }}{{ group.minGen !== group.maxGen ? `~${group.maxGen}` : '' }}</span>
                  </span>
                  <span class="text-muted">×{{ group.count }}</span>
                </button>
              </div>
            </template>
            <div v-if="plantableSeeds.length === 0 && batchBreedingSeedGroups.length === 0" class="flex flex-col items-center py-4">
              <Sprout :size="32" class="text-muted/30" />
              <p class="text-xs text-muted mt-2">{{ $i18n.locale === 'vi' ? 'Không có hạt giống trồng được vào mùa này' : 'Không có hạt giống để trồng theo mùa' }}</p>
              <Button v-if="isWanwupuOpen" class="mt-2" :icon-size="12" :icon="Store" @click="goToShop">{{ $i18n.locale === 'vi' ? 'Đến cửa hàng mua' : 'Đến cửa hàng để mua' }}</Button>
              <p v-else class="text-[10px] text-muted/60 mt-1">{{ wanwupuClosedReason }}</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Thụ tinh bằng một cú nhấp chuột弹窗 -->
      <Transition name="panel-fade">
        <div
          v-if="showBatchFertilize"
          class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          @click.self="showBatchFertilize = false"
        >
          <div ref="modalRef_ul74v" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
            <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showBatchFertilize = false">
              <X :size="14" />
            </button>
            <p class="text-accent text-sm mb-2">{{ $i18n.locale === 'vi' ? 'Bón phân hàng loạt' : 'Thụ tinh bằng một cú nhấp chuột' }}</p>
            <p class="text-xs text-muted mb-2">{{ $i18n.locale === 'vi' ? 'Đất có thể bón phân' : 'Đất bón phân' }} {{ fertilizableCount }} {{ $i18n.locale === 'vi' ? 'mảnh, chọn phân bón:' : 'Chặn, chọn phân bón:' }}</p>
            <div class="flex flex-col space-y-1 max-h-60 overflow-y-auto">
              <button
                v-for="f in fertilizerItems"
                :key="f.itemId"
                class="btn text-xs justify-between mr-1 shrink-0"
                @click="doBatchFertilize(f.type)"
              >
                <span :class="f.colorClass">{{ f.name }}</span>
                <span class="text-muted">×{{ f.count }}</span>
              </button>
            </div>
            <div v-if="fertilizerItems.length === 0" class="flex flex-col items-center py-4">
              <CirclePlus :size="32" class="text-muted/30" />
              <p class="text-xs text-muted mt-2">{{ $i18n.locale === 'vi' ? 'Không có phân bón' : 'Không có phân bón' }}</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- 图例与提示 -->
      <div class="mt-2 border border-accent/10 rounded-xs p-2">
        <div class="grid grid-cols-4 md:space-x-3 md:flex md:flex-wrap text-xs text-muted" role="list">
          <span v-for="(item, i) in PLOT_LEGENDS" :key="i">
            <component :is="item.icon" :size="10" :class="[item.color, 'inline']" />
            {{ item.label }}
          </span>
        </div>
        <div v-if="plotWarnings.length > 0" class="flex flex-wrap space-x-2 mt-1.5 border border-accent/20 rounded-xs p-2">
          <span v-for="(w, i) in plotWarnings" :key="i" class="inline-flex items-center space-x-0.5 text-xs" :class="w.color">
            {{ w.text }}
          </span>
        </div>
      </div>

      <!-- hộp vận chuyển入口 -->
      <div
                class="mt-3 flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
        @click="showShippingBox = true"
                @keydown.enter.prevent="showShippingBox = true"
                @keydown.space.prevent="showShippingBox = true"
      >
        <div class="flex items-center space-x-1.5">
          <Package :size="14" class="text-accent" />
          <span class="text-sm text-accent">{{ $i18n.locale === 'vi' ? 'Thùng hàng xuất' : 'hộp vận chuyển' }}</span>
          <span v-if="shopStore.shippingBox.length > 0" class="text-xs text-muted">{{ shopStore.shippingBox.length }}{{ $i18n.locale === 'vi' ? ' loại' : 'loài' }}</span>
        </div>
        <span v-if="shippingBoxTotal > 0" class="text-xs text-accent">≈{{ shippingBoxTotal }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
        <span v-else class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Trống' : 'trống rỗng' }}</span>
      </div>

      <!-- hộp vận chuyển弹窗 -->
      <Transition name="panel-fade">
        <div
          v-if="showShippingBox"
          class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          @click.self="showShippingBox = false"
        >
          <div ref="modalRef_xihe8" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
            <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showShippingBox = false">
              <X :size="14" />
            </button>
            <div class="flex items-center space-x-1.5 text-sm text-accent mb-1">
              <Package :size="14" />
              <span>{{ $i18n.locale === 'vi' ? 'Thùng hàng xuất' : 'hộp vận chuyển' }}</span>
            </div>
            <p class="text-xs text-muted mb-2">{{ $i18n.locale === 'vi' ? 'Vật phẩm đã cho vào sẽ được thanh toán vào ngày mai.' : 'Các mặt hàng được đặt sẽ được giải quyết vào ngày hôm sau.' }}</p>
            <p v-if="inventoryStore.getRingEffectValue('sell_price_bonus') > 0" class="text-success text-xs mb-2">
              {{ $i18n.locale === 'vi' ? 'Hiệu ứng nhẫn: Giá bán' : 'Tiền thưởng nhẫn: giá bán' }} +{{ Math.round(inventoryStore.getRingEffectValue('sell_price_bonus') * 100) }}%
            </p>

            <!-- đã được đặt的物品 -->
            <div v-if="shopStore.shippingBox.length > 0" class="border border-accent/10 rounded-xs p-2 mb-2">
              <p class="text-xs text-muted mb-1">{{ $i18n.locale === 'vi' ? 'Đã cho vào' : 'đã được đặt' }}</p>
              <div class="flex flex-col space-y-1 max-h-36 overflow-y-auto">
                <div
                v-for="(entry, idx) in shopStore.shippingBox"
                  :key="idx"
                  class="flex items-center justify-between border border-accent/20 rounded-xs px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
                  @click="handleRemoveFromBox(entry.itemId, entry.quantity, entry.quality)"
                @keydown.enter.prevent="handleRemoveFromBox(entry.itemId, entry.quantity, entry.quality)"
                @keydown.space.prevent="handleRemoveFromBox(entry.itemId, entry.quantity, entry.quality)"
                >
                  <div class="min-w-0">
                    <span
                      class="text-xs"
                      :class="{
                        'text-quality-fine': entry.quality === 'fine',
                        'text-quality-excellent': entry.quality === 'excellent',
                        'text-quality-supreme': entry.quality === 'supreme'
                      }"
                    >
                      {{ getItemName(entry.itemId) }}
                    </span>
                    <span class="text-muted text-xs ml-1">×{{ entry.quantity }}</span>
                  </div>
                  <span class="text-xs text-accent whitespace-nowrap ml-2">
                    ≈{{ shopStore.calculateSellPrice(entry.itemId, entry.quantity, entry.quality) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}
                  </span>
                </div>
              </div>
              <p class="text-xs text-accent mt-1.5">{{ $i18n.locale === 'vi' ? 'Dự kiến thu nhập:' : 'Thu nhập ước tính:' }}{{ shippingBoxTotal }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</p>
            </div>
            <div v-else class="flex flex-col items-center justify-center py-4 text-muted mb-2">
              <Package :size="32" class="text-muted/30" />
              <p class="text-xs mt-2">{{ $i18n.locale === 'vi' ? 'Thùng trống' : 'Hộp vận chuyển trống rỗng' }}</p>
            </div>

            <!-- 可đưa vào的Vật phẩm ba lô -->
            <div v-if="shippableItems.length > 0" class="border border-accent/10 rounded-xs p-2">
              <p class="text-xs text-muted mb-1">{{ $i18n.locale === 'vi' ? 'Vật phẩm trong balo' : 'Vật phẩm ba lô' }}</p>
              <div class="flex flex-col space-y-1 overflow-auto max-h-48">
                <div
                  v-for="item in shippableItems"
                  :key="item.itemId + item.quality"
                  class="flex items-center justify-between border border-accent/10 rounded-xs px-2 py-1 mr-1"
                >
                  <div class="min-w-0 flex items-center space-x-1">
                    <span
                      class="text-xs"
                      :class="{
                        'text-quality-fine': item.quality === 'fine',
                        'text-quality-excellent': item.quality === 'excellent',
                        'text-quality-supreme': item.quality === 'supreme'
                      }"
                    >
                      {{ item.def?.name }}
                    </span>
                    <span class="text-muted text-xs">×{{ item.quantity }}</span>
                    <span v-if="shopStore.shippedItems.includes(item.itemId)" class="text-[10px] text-success/60">[{{ $i18n.locale === 'vi' ? 'Đã xuất' : 'Đã vận chuyển' }}]</span>
                  </div>
                  <div class="flex space-x-1">
                    <Button @click="handleAddToBox(item.itemId, 1, item.quality)">{{ $i18n.locale === 'vi' ? 'Cho vào 1' : 'đưa vào1' }}</Button>
                    <Button v-if="item.quantity > 1" @click="handleAddToBox(item.itemId, item.quantity, item.quality)">{{ $i18n.locale === 'vi' ? 'Tất cả' : 'Tất cả' }}</Button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col items-center py-3 text-muted">
              <Wheat :size="32" class="text-muted/30" />
              <p class="text-xs mt-2">{{ $i18n.locale === 'vi' ? 'Không có vật phẩm xuất kho được trong balo' : 'Không có vật phẩm nào trong ba lô có thể được vận chuyển' }}</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- nhà kính入口 -->
      <div
                v-if="showGreenhouse"
        class="mt-3 flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
        @click="showGreenhouseModal = true"
                @keydown.enter.prevent="showGreenhouseModal = true"
                @keydown.space.prevent="showGreenhouseModal = true"
      >
        <div class="flex items-center space-x-1.5">
          <Warehouse :size="14" class="text-accent" />
          <span class="text-sm text-accent">{{ $i18n.locale === 'vi' ? 'Nhà kính' : 'nhà kính' }}</span>
          <span v-if="ghHarvestableCount > 0" class="text-xs text-accent">{{ ghHarvestableCount }} {{ $i18n.locale === 'vi' ? 'ô có thể thu hoạch' : 'Khối có thể được thu hoạch' }}</span>
        </div>
        <span class="text-xs text-muted">{{ farmStore.greenhousePlots.length }} {{ $i18n.locale === 'vi' ? 'ô đất' : 'mảnh đất' }}</span>
      </div>
    </section>

    <!-- 林木标签 -->
    <div v-if="farmTab === 'tree'">
      <!-- 果树区 -->
      <section class="border border-accent/20 rounded-xs p-3" aria-labelledby="fruit-tree-title">
        <div class="flex items-center justify-between mb-2">
          <h2 id="fruit-tree-title" class="flex items-center space-x-1.5 text-sm text-accent">
            <TreeDeciduous :size="14" aria-hidden="true" />
            <span>{{ $t('farm.fruit_trees') }}</span>
          </h2>
          <span class="text-xs text-muted">{{ farmStore.fruitTrees.length }}/{{ MAX_FRUIT_TREES }}</span>
        </div>
        <div v-if="farmStore.fruitTrees.length > 0" class="flex flex-col space-y-1.5 mb-2">
          <div v-for="tree in farmStore.fruitTrees" :key="tree.id" class="border border-accent/10 rounded-xs px-3 py-2">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold" :class="tree.mature ? 'text-accent' : 'text-muted'">{{ getTreeName(tree.type) }}</span>
              <span v-if="tree.mature" class="text-[10px] text-muted">{{ $t('farm.mature_year', { year: tree.yearAge }) }}</span>
            </div>
            <template v-if="!tree.mature">
              <div class="flex items-center space-x-2 mb-1.5">
                <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
                  <div
                    class="h-full rounded-xs bg-success transition-all"
                    :style="{ width: Math.min(100, Math.floor((tree.growthDays / 28) * 100)) + '%' }"
                  />
                </div>
                <span class="text-[10px] text-muted whitespace-nowrap">{{ tree.growthDays }}/28 {{ $t('time.days') }}</span>
              </div>
              <div class="flex justify-end">
                <Button :icon-size="12" :icon="Axe" @click.stop="chopFruitTreeTarget = { id: tree.id, type: tree.type }">
                  {{ $t('farm.chop') }}
                </Button>
              </div>
            </template>
            <template v-else>
              <div class="flex items-center justify-between">
                <span v-if="tree.todayFruit" class="text-[10px] text-accent">{{ $t('farm.today_fruit') }}</span>
                <span v-else class="text-[10px] text-success">{{ $t('farm.fruit_season', { season: getTreeFruitSeason(tree.type) }) }}</span>
                <Button :icon-size="12" :icon="Axe" @click.stop="chopFruitTreeTarget = { id: tree.id, type: tree.type }">
                  {{ $t('farm.chop') }}
                </Button>
              </div>
            </template>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-4 text-muted mb-2">
          <TreeDeciduous :size="32" class="text-muted/30" />
          <p class="text-xs mt-2">{{ $t('farm.no_fruit_tree') }}</p>
          <p class="text-[10px] text-muted/60 mt-0.5">{{ $t('farm.no_fruit_tree_desc') }}</p>
        </div>
        <div v-if="plantableSaplings.length > 0 && farmStore.fruitTrees.length < MAX_FRUIT_TREES" class="flex space-x-1.5 flex-wrap">
          <Button v-for="s in plantableSaplings" :key="s.saplingId" :icon-size="12" :icon="TreePine" @click="handlePlantTree(s.type)">
            {{ $t('farm.plant_sapling', { name: s.name, count: s.count }) }}
          </Button>
        </div>
      </section>

      <!-- 砍cắt giảm果树确认弹窗 -->
      <Transition name="panel-fade">
        <div
          v-if="chopFruitTreeTarget"
          class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          @click.self="chopFruitTreeTarget = null"
        >
          <div ref="modalRef_5eeez" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
            <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="chopFruitTreeTarget = null">
              <X :size="14" />
            </button>
            <p class="text-accent text-sm mb-2">{{ $t('farm.chop_fruit_tree') }}</p>
            <p class="text-xs text-text mb-3">
              {{ $t('farm.confirm_chop_fruit_tree', { name: getTreeName(chopFruitTreeTarget.type) }) }}
            </p>
            <div class="flex space-x-2">
              <Button class="flex-1" @click="chopFruitTreeTarget = null">{{ $t('farm.cancel') }}</Button>
              <Button class="flex-1 !bg-danger !text-text" :icon-size="12" :icon="Axe" @click="confirmChopFruitTree">
                {{ $t('farm.confirm_chop') }}
              </Button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- cây dạikhai thác gỗ确认弹窗 -->
      <Transition name="panel-fade">
        <div
          v-if="chopWildTreeTarget"
          class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          @click.self="chopWildTreeTarget = null"
        >
          <div ref="modalRef_vuef5" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
            <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="chopWildTreeTarget = null">
              <X :size="14" />
            </button>
            <p class="text-accent text-sm mb-2">{{ $i18n.locale === 'vi' ? 'Đốn củi' : 'khai thác gỗ' }}</p>
            <p class="text-xs text-text mb-2">
              {{ $i18n.locale === 'vi' ? 'Xác nhận đốn củi ' : 'Đảm bảo' }}
              <span class="text-accent">{{ getWildTreeName(chopWildTreeTarget.type) }}</span>
              {{ $i18n.locale === 'vi' ? ' không?' : 'Ghi nhật ký?' }}
            </p>
            <p class="text-xs text-danger mb-3">
              {{ $i18n.locale === 'vi' ? 'Đã đốn' : 'đã đăng nhập' }} {{ chopWildTreeTarget.chopCount }}/3 {{ $i18n.locale === 'vi' ? 'lần, đốn thêm' : 'Lại cắt nữa' }} {{ 3 - chopWildTreeTarget.chopCount }} {{ $i18n.locale === 'vi' ? 'lần nữa cây sẽ biến mất.' : 'Sau thời gian này cây sẽ biến mất.' }}
            </p>
            <div class="flex space-x-2">
              <Button class="flex-1" @click="chopWildTreeTarget = null">{{ $i18n.locale === 'vi' ? 'Hủy' : 'Hủy' }}</Button>
              <Button
                class="flex-1"
                :class="chopWildTreeTarget.chopCount >= 2 ? '!bg-danger !text-text' : '!bg-accent !text-bg'"
                :icon-size="12"
                :icon="Axe"
                @click="confirmChopWildTree"
              >
                {{ chopWildTreeTarget.chopCount >= 2 ? ($i18n.locale === 'vi' ? 'Xác nhận' : 'Xác nhận') : ($i18n.locale === 'vi' ? 'Xác nhận đốn' : 'Xác nhận ghi nhật ký') }}
              </Button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- cây dại区 -->
      <section class="mt-3 border border-accent/20 rounded-xs p-3" aria-labelledby="wild-tree-title">
        <div class="flex items-center justify-between mb-2">
          <h2 id="wild-tree-title" class="flex items-center space-x-1.5 text-sm text-accent">
            <TreePine :size="14" aria-hidden="true" />
            <span>{{ $i18n.locale === 'vi' ? 'Cây rừng' : 'cây dại' }}</span>
          </h2>
          <span class="text-xs text-muted">{{ farmStore.wildTrees.length }}/{{ MAX_WILD_TREES }}</span>
        </div>
        <div v-if="farmStore.wildTrees.length > 0" class="flex flex-col space-y-1.5 mb-2">
          <div v-for="tree in farmStore.wildTrees" :key="tree.id" class="border border-accent/10 rounded-xs px-3 py-2">
            <!-- 第一行：树名 + Trạng thái标签 -->
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center space-x-1.5">
                <span class="text-xs font-bold" :class="tree.mature ? 'text-accent' : 'text-muted'">{{ getWildTreeName(tree.type) }}</span>
                <span v-if="tree.chopCount > 0" class="text-[10px] text-danger">{{ $i18n.locale === 'vi' ? 'Đốn' : 'cắt giảm' }}{{ tree.chopCount }}/3</span>
              </div>
              <span v-if="!tree.mature" class="text-[10px] text-muted">{{ $i18n.locale === 'vi' ? 'Đang lớn' : 'đang phát triển' }}</span>
              <span v-else-if="tree.hasTapper && tree.tapReady" class="text-[10px] text-accent">{{ $i18n.locale === 'vi' ? 'Có thể thu' : 'Có thể tính phí' }}</span>
              <span v-else-if="tree.hasTapper" class="text-[10px] text-muted">{{ $i18n.locale === 'vi' ? 'Đang lấy nhựa' : 'Chọn chất béo' }}</span>
              <span v-else class="text-[10px] text-success">{{ $i18n.locale === 'vi' ? 'Đã trưởng thành' : 'trưởng thành' }}</span>
            </div>
            <!-- 第二行：进度/详情 + 操作按钮 -->
            <template v-if="!tree.mature">
              <div class="flex items-center space-x-2 mb-1.5">
                <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
                  <div
                    class="h-full rounded-xs bg-success transition-all"
                    :style="{
                      width: Math.min(100, Math.floor((tree.growthDays / (getWildTreeDef(tree.type)?.growthDays ?? 28)) * 100)) + '%'
                    }"
                  />
                </div>
                <span class="text-[10px] text-muted whitespace-nowrap">
                  {{ tree.growthDays }}/{{ getWildTreeDef(tree.type)?.growthDays ?? '?' }}{{ $i18n.locale === 'vi' ? ' ngày' : 'ngày' }}
                </span>
              </div>
            </template>
            <template v-else-if="tree.hasTapper">
              <div class="flex items-center space-x-2 mb-1.5">
                <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
                  <div
                    class="h-full rounded-xs transition-all"
                    :class="tree.tapReady ? 'bg-accent' : 'bg-success'"
                    :style="{
                      width: tree.tapReady
                        ? '100%'
                        : Math.floor((tree.tapDaysElapsed / (getWildTreeDef(tree.type)?.tapCycleDays ?? 7)) * 100) + '%'
                    }"
                  />
                </div>
                <span class="text-[10px] text-muted whitespace-nowrap">
                  {{ tree.tapReady ? ($i18n.locale === 'vi' ? 'Đã xong' : 'Đã hoàn thành') : `${tree.tapDaysElapsed}/${getWildTreeDef(tree.type)?.tapCycleDays ?? '?'}${$i18n.locale === 'vi' ? ' ngày' : 'ngày'}` }}
                </span>
              </div>
            </template>
            <div class="flex items-center justify-end space-x-1.5">
              <Button
                v-if="tree.mature && tree.hasTapper && tree.tapReady"
                class="!bg-accent !text-bg"
                :icon-size="12"
                :icon="Gift"
                @click.stop="handleCollectTapProduct(tree.id)"
              >
                {{ $i18n.locale === 'vi' ? 'Thu' : 'Thu thập' }}
              </Button>
              <Button
                v-if="tree.mature && !tree.hasTapper && hasTapper"
                :icon-size="12"
                :icon="Wrench"
                @click.stop="handleAttachTapper(tree.id)"
              >
                {{ $i18n.locale === 'vi' ? 'Lắp máy lấy nhựa' : 'Lắp đặt thiết bị hút mỡ' }}
              </Button>
              <span v-if="tree.mature && !tree.hasTapper && !hasTapper" class="text-[10px] text-muted">{{ $i18n.locale === 'vi' ? 'Cần chế tạo máy lấy nhựa' : 'Cần chế tạo thiết bị hút mỡ' }}</span>
              <Button v-if="tree.mature" :icon-size="12" :icon="Axe" @click.stop="handleChopTree(tree.id)">{{ $i18n.locale === 'vi' ? 'Đốn củi' : 'khai thác gỗ' }}</Button>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-4 text-muted mb-2">
          <TreePine :size="32" class="text-muted/30" />
          <p class="text-xs mt-2">{{ $i18n.locale === 'vi' ? 'Chưa có cây rừng' : 'Chưa có cây dại' }}</p>
          <p class="text-[10px] text-muted/60 mt-0.5">{{ $i18n.locale === 'vi' ? 'Có thể dùng hạt giống cây rừng để trồng' : 'Có thể trồng bằng hạt cây dại' }}</p>
        </div>
        <div v-if="plantableWildSeeds.length > 0 && farmStore.wildTrees.length < MAX_WILD_TREES" class="flex space-x-1.5 flex-wrap">
          <Button v-for="s in plantableWildSeeds" :key="s.type" :icon-size="12" :icon="TreePine" @click="handlePlantWildTree(s.type)">
            {{ $i18n.locale === 'vi' ? 'Trồng ' : 'loài' }}{{ s.name }} (×{{ s.count }})
          </Button>
        </div>
      </section>
    </div>

    <!-- nhà kính弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showGreenhouseModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showGreenhouseModal = false"
      >
        <div ref="modalRef_qjksa" class="game-panel max-w-sm w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showGreenhouseModal = false">
            <X :size="14" />
          </button>
          <div class="flex items-center space-x-1.5 text-sm text-accent mb-1">
            <Warehouse :size="14" />
            <span>{{ $i18n.locale === 'vi' ? 'Nhà kính' : 'nhà kính' }}</span>
          </div>
          <p class="text-xs text-muted mb-3">{{ $i18n.locale === 'vi' ? 'Không giới hạn mùa' : 'Không có hạn chế theo mùa' }} · {{ $i18n.locale === 'vi' ? 'Tưới tự động' : 'tưới nước tự động' }} · {{ farmStore.greenhousePlots.length }}{{ $i18n.locale === 'vi' ? ' ô đất' : 'mảnh đất' }}</p>

          <!-- 操作按钮 -->
          <div class="flex space-x-2 mb-3">
            <Button
              class="flex-1 justify-center"
              :class="{ '!bg-accent !text-bg': ghHarvestableCount > 0 }"
              :disabled="ghHarvestableCount === 0"
              :icon-size="12"
              :icon="Wheat"
              @click="doGhBatchHarvest"
            >
              {{ $i18n.locale === 'vi' ? 'Thu hoạch hàng loạt' : 'Thu hoạch chỉ bằng một cú nhấp chuột' }}{{ ghHarvestableCount > 0 ? ` (${ghHarvestableCount}${$i18n.locale === 'vi' ? ' ô' : 'chặn'})` : '' }}
            </Button>
            <Button
              class="flex-1 justify-center"
              :disabled="ghTilledEmptyCount === 0 || allSeeds.length === 0"
              :icon-size="12"
              :icon="Sprout"
              @click="showGhBatchPlant = true"
            >
              {{ $i18n.locale === 'vi' ? 'Trồng hàng loạt' : 'Trồng cây bằng một cú nhấp chuột' }}{{ ghTilledEmptyCount > 0 ? ` (${ghTilledEmptyCount}${$i18n.locale === 'vi' ? ' ô' : 'chặn'})` : '' }}
            </Button>
            <Button v-if="nextGhUpgrade" class="flex-1 justify-center" :icon-size="12" :icon="ArrowUp" @click="showGhUpgradeModal = true">
              {{ $i18n.locale === 'vi' ? 'Nâng cấp nhà kính' : 'Nâng cấp nhà kính' }}
            </Button>
          </div>

          <!-- lô đất nhà kính网格 -->
          <div class="grid gap-1 max-w-full" :style="{ gridTemplateColumns: `repeat(${ghGridCols}, minmax(0, 1fr))` }">
            <button
              v-for="plot in farmStore.greenhousePlots"
              :key="plot.id"
              class="aspect-square border border-accent/20 rounded-xs flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-accent/60 hover:bg-panel/80 leading-tight"
              :class="getPlotDisplay(plot).color"
              :title="getPlotTooltip(plot)"
              :aria-label="getPlotTooltip(plot)"
              @click="activeGhPlotId = plot.id"
            >
              <component :is="getPlotDisplay(plot).icon" :size="14" />
              <span v-if="plot.cropId" class="text-[10px] opacity-70 truncate max-w-full px-0.5">{{ getCropName(plot.cropId) }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- nhà kính升级确认弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showGhUpgradeModal && nextGhUpgrade"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showGhUpgradeModal = false"
      >
        <div ref="modalRef_h03zy" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showGhUpgradeModal = false">
            <X :size="14" />
          </button>
          <p class="text-accent text-sm mb-2">{{ nextGhUpgrade.name }}</p>
          <p class="text-xs text-muted mb-3">{{ nextGhUpgrade.description }}</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-3">
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="text-muted">{{ $i18n.locale === 'vi' ? 'Chi phí' : 'Chi phí' }}</span>
              <span :class="playerStore.money >= nextGhUpgrade.cost ? 'text-success' : 'text-danger'">{{ nextGhUpgrade.cost }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
            <div v-for="mat in nextGhUpgrade.materialCost" :key="mat.itemId" class="flex items-center justify-between text-xs">
              <span class="text-muted">{{ getItemName(mat.itemId) }}</span>
              <span :class="inventoryStore.getItemCount(mat.itemId) >= mat.quantity ? 'text-success' : 'text-danger'">
                {{ inventoryStore.getItemCount(mat.itemId) }}/{{ mat.quantity }}
              </span>
            </div>
          </div>

          <div class="flex space-x-2">
            <Button class="flex-1" @click="showGhUpgradeModal = false">{{ $i18n.locale === 'vi' ? 'Hủy' : 'Hủy' }}</Button>
            <Button class="flex-1 !bg-accent !text-bg" :icon-size="12" :icon="ArrowUp" @click="handleGhUpgrade">{{ $i18n.locale === 'vi' ? 'Xác nhận' : 'Xác nhận nâng cấp' }}</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Trồng nhà kính bằng một cú nhấp chuột弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showGhBatchPlant"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showGhBatchPlant = false"
      >
        <div ref="modalRef_5e1nt" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showGhBatchPlant = false">
            <X :size="14" />
          </button>
          <p class="text-accent text-sm mb-2">{{ $i18n.locale === 'vi' ? 'Trồng nhà kính hàng loạt' : 'Trồng nhà kính bằng một cú nhấp chuột' }}</p>
          <p class="text-xs text-muted mb-2">{{ $i18n.locale === 'vi' ? 'Đất trống' : 'đất nông nghiệp trống' }} {{ ghTilledEmptyCount }} {{ $i18n.locale === 'vi' ? 'mảnh, chọn hạt giống:' : 'chặn, chọn hạt giống để trồng:' }}</p>
          <div class="flex flex-col space-y-1 max-h-60 overflow-y-auto">
            <button
              v-for="seed in allSeeds"
              :key="seed.cropId"
              class="btn text-xs justify-between mr-1 shrink-0"
              @click="doGhBatchPlant(seed.cropId)"
            >
              <span>
                {{ seed.name }}
                <span v-if="seed.regrowth" class="text-success ml-1">[{{ $i18n.locale === 'vi' ? 'Nhiều vụ' : 'Nhiều loại cây trồng' }}]</span>
              </span>
              <span class="text-muted">×{{ seed.count }}</span>
            </button>
          </div>
          <div v-if="allSeeds.length === 0" class="flex flex-col items-center py-4">
            <Sprout :size="32" class="text-muted/30" />
            <p class="text-xs text-muted mt-2">{{ $i18n.locale === 'vi' ? 'Không có hạt giống gieo được' : 'Không có hạt để trồng' }}</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- lô đất nhà kính操作弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="activeGhPlot"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="activeGhPlotId = null"
      >
        <div ref="modalRef_pw54i" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="activeGhPlotId = null">
            <X :size="14" />
          </button>
          <p class="text-accent text-sm mb-2">{{ $i18n.locale === 'vi' ? 'Ô nhà kính ' : 'lô đất nhà kính ' }}#{{ activeGhPlot.id + 1 }}</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex flex-col space-y-1">
              <div class="flex items-center justify-between">
                <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Trạng thái' : 'Trạng thái' }}</span>
                <span class="text-xs">{{ ghPlotStateLabel }}</span>
              </div>
              <div v-if="activeGhPlot.cropId" class="flex items-center justify-between">
                <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Nông sản' : 'cây trồng' }}</span>
                <span class="text-xs">
                  {{ getCropName(activeGhPlot.cropId) }}
                  <span v-if="ghPlotCropRegrowth" class="text-success ml-1">
                    [{{ $i18n.locale === 'vi' ? 'Nhiều vụ' : 'Nhiều loại cây trồng' }} {{ activeGhPlot.harvestCount }}/{{ ghPlotCropMaxHarvests }}]
                  </span>
                </span>
              </div>
              <div v-if="activeGhPlot.cropId && activeGhPlot.state !== 'harvestable'" class="flex items-center space-x-2">
                <span class="text-xs text-muted shrink-0">{{ $i18n.locale === 'vi' ? 'Sinh trưởng' : 'Phát triển' }}</span>
                <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
                  <div
                    class="h-full rounded-xs bg-success transition-all"
                    :style="{
                      width: Math.min(100, Math.floor((activeGhPlot.growthDays / (Number(ghPlotCropGrowthDays) || 1)) * 100)) + '%'
                    }"
                  />
                </div>
                <span class="text-xs text-muted whitespace-nowrap">{{ activeGhPlot.growthDays }}/{{ ghPlotCropGrowthDays }}{{ $i18n.locale === 'vi' ? ' ngày' : 'ngày' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Đặc tính' : 'Tính năng' }}</span>
                <span class="text-xs text-water">{{ $i18n.locale === 'vi' ? 'Tưới tự động · Không giới hạn mùa' : 'tưới nước tự động · Không có hạn chế theo mùa' }}</span>
              </div>
              <div v-if="activeGhPlot.seedGenetics" class="flex items-center justify-between">
                <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Nhân giống' : 'Lai tạo giống' }}</span>
                <span class="text-xs text-accent">
                  G{{ activeGhPlot.seedGenetics.generation }} {{ $i18n.locale === 'vi' ? 'Ngọt' : 'ngọt ngào' }}{{ activeGhPlot.seedGenetics.sweetness }} {{ $i18n.locale === 'vi' ? 'Sản lượng' : 'sản xuất' }}{{
                    activeGhPlot.seedGenetics.yield
                  }}
                  {{ $i18n.locale === 'vi' ? 'Kháng' : 'chống lại' }}{{ activeGhPlot.seedGenetics.resistance }}
                </span>
              </div>
            </div>
          </div>

          <!-- 操作区 -->
          <div class="flex flex-col space-y-1.5" role="list">
            <!-- đã cày → trồng cây（所有loài子) -->
            <div v-if="activeGhPlot.state === 'tilled' && allSeeds.length > 0" class="border border-accent/10 rounded-xs p-2">
              <p class="text-xs text-muted mb-1">{{ $i18n.locale === 'vi' ? 'Trồng' : 'trồng cây' }}</p>
              <div class="flex flex-wrap space-x-1">
                <Button v-for="seed in allSeeds" :key="seed.cropId" @click="doGhPlant(seed.cropId)">
                  {{ seed.name }}
                  <span v-if="seed.regrowth" class="text-success ml-1">[{{ $i18n.locale === 'vi' ? 'Nhiều vụ' : 'Nhiều loại cây trồng' }}]</span>
                  (×{{ seed.count }})
                </Button>
              </div>
            </div>
            <!-- đã cày → hạt giống nhân giốngtrồng cây -->
            <template v-if="activeGhPlot.state === 'tilled' && ghPlantableBreedingSeeds.length > 0">
              <Divider :label="$i18n.locale === 'vi' ? 'Hạt giống lai' : 'hạt giống nhân giống'" class="!my-2" />
              <button
                v-for="seed in ghPlantableBreedingSeeds"
                :key="seed.genetics.id"
                class="btn text-xs justify-between mr-1 shrink-0"
                @click="doGhPlantGeneticSeed(seed.genetics.id)"
              >
                <span>{{ getCropName(seed.genetics.cropId) }} G{{ seed.genetics.generation }}</span>
                <span class="text-muted flex items-center space-x-px">
                  <Star v-for="n in getStarRating(seed.genetics)" :key="n" :size="10" />
                </span>
              </button>
            </template>
            <!-- đã cày无loài子trống rỗngTrạng thái -->
            <div v-else-if="activeGhPlot.state === 'tilled' && allSeeds.length === 0" class="flex flex-col items-center py-4">
              <Sprout :size="32" class="text-muted/30" />
              <p class="text-xs text-muted mt-2">{{ $i18n.locale === 'vi' ? 'Trong balo không có hạt giống' : 'Không có hạt giống trong ba lô' }}</p>
              <Button v-if="isWanwupuOpen" class="mt-2" :icon-size="12" :icon="Store" @click="goToShop">{{ $i18n.locale === 'vi' ? 'Đến cửa hàng mua' : 'Đến cửa hàng để mua' }}</Button>
              <p v-else class="text-[10px] text-muted/60 mt-1">{{ wanwupuClosedReason }}</p>
            </div>

            <!-- có thể thu hoạch được → Thu hoạch -->
            <Button
              v-if="activeGhPlot.state === 'harvestable'"
              class="w-full justify-center !bg-accent !text-bg"
              :icon-size="12"
              :icon="Wheat"
              @click="doGhHarvest"
            >
              {{ $i18n.locale === 'vi' ? 'Thu hoạch' : 'Thu hoạch' }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">

  import { useFocusTrap } from '@/composables/useFocusTrap'
  import { ref, computed, type Component } from 'vue'
  import i18n from '@/locales'
  import {
    Droplets,
    Droplet,
    TreePine,
    TreeDeciduous,
    ArrowUp,
    Wrench,
    Gift,
    CirclePlus,
    X,
    Shovel,
    Wheat,
    Sprout,
    Package,
    Warehouse,
    Store,
    Axe,
    Trash2,
    Bug,
    Leaf,
    Star,
    Bird,
    Zap,
    Square,
    Flower2
  } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import Divider from '@/components/game/Divider.vue'
  import { useBreedingStore } from '@/stores/useBreedingStore'
  import { useCookingStore } from '@/stores/useCookingStore'
  import { useFarmStore } from '@/stores/useFarmStore'
  import { useGameStore, SEASON_NAMES } from '@/stores/useGameStore'
  import { useHomeStore } from '@/stores/useHomeStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { useShopStore } from '@/stores/useShopStore'
  import { useSkillStore } from '@/stores/useSkillStore'
  import { useTutorialStore } from '@/stores/useTutorialStore'
  import { useWalletStore } from '@/stores/useWalletStore'
  import { getCropById, getCropsBySeason, getItemById } from '@/data'
  import { getStarRating, shouldReturnBreedingSeed, generateGeneticsId } from '@/data/breeding'
  import { FRUIT_TREE_DEFS, MAX_FRUIT_TREES } from '@/data/fruitTrees'
  import { GREENHOUSE_UPGRADES } from '@/data/buildings'
  import { WILD_TREE_DEFS, MAX_WILD_TREES, getWildTreeDef } from '@/data/wildTrees'
  import { CROPS } from '@/data/crops'
  import { FERTILIZERS, getFertilizerById } from '@/data/processing'
  import { ACTION_TIME_COSTS } from '@/data/timeConstants'
  import { addLog, showFloat } from '@/composables/useGameLog'
  import { navigateToPanel } from '@/composables/useNavigation'
  import { handleEndDay } from '@/composables/useEndDay'
  import { getShopById, isShopAvailable, getShopClosedReason } from '@/data/shops'
  import {
    handlePlotClick,
    useFarmActions,
    handleBatchWater,
    handleBatchTill,
    handleBatchHarvest,
    handleBatchPlant,
    handleBatchFertilize,
    handleRemoveCrop,
    handleCurePest,
    handleBatchCurePest,
    handleClearWeed,
    handleBatchClearWeed,
    QUALITY_NAMES,
    applyCropBlessing
  } from '@/composables/useFarmActions'
  import type { SprinklerType, FertilizerType, FruitTreeType, WildTreeType, Quality } from '@/types'
  import type { SeedGenetics } from '@/types/breeding'
  import { sfxHarvest, sfxPlant } from '@/composables/useAudio'


  const modalRef_4d0b8 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_4d0b8);
  const modalRef_ikp6g = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_ikp6g);
  const modalRef_c6vja = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_c6vja);
  const modalRef_ul74v = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_ul74v);
  const modalRef_xihe8 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_xihe8);
  const modalRef_5eeez = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_5eeez);
  const modalRef_vuef5 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_vuef5);
  const modalRef_qjksa = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_qjksa);
  const modalRef_h03zy = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_h03zy);
  const modalRef_5e1nt = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_5e1nt);
  const modalRef_pw54i = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_pw54i);



  const { selectedSeed } = useFarmActions()

  const farmTab = ref<'field' | 'tree'>('field')

  const farmStore = useFarmStore()
  const inventoryStore = useInventoryStore()
  const gameStore = useGameStore()
  const homeStore = useHomeStore()
  const playerStore = usePlayerStore()
  const shopStore = useShopStore()
  const breedingStore = useBreedingStore()

  // === 田庄特殊功能 ===

  const tutorialStore = useTutorialStore()
  const tutorialHint = computed(() => {
    if (!tutorialStore.enabled || gameStore.year > 1) return null
    if (farmStore.plots.every(p => p.state === 'wasteland')) return i18n.global.locale.value === 'vi' ? 'Nhấp vào 「Thao tác nhanh」→「Khai khẩn hàng loạt」bên dưới để khai khẩn, hoặc nhấp từng ô.' : 'Bấm vào bên dưới「Thao tác bằng một cú nhấp chuột」→「Thu hồi bằng một cú nhấp chuột」để khai hoang đất hoang hoặc bấm trực tiếp vào các ô để vận hành từng ô một.'
    const hasPlanted = farmStore.plots.some(p => p.state === 'planted' || p.state === 'growing' || p.state === 'harvestable')
    if (!hasPlanted && farmStore.plots.some(p => p.state === 'tilled'))
      return i18n.global.locale.value === 'vi' ? 'Khung đất đã khai khẩn có thể trồng cây. Dùng 「Gieo hạt hàng loạt」 để gieo nhiều hạt giống.' : 'Cây trồng có thể được trồng trên các mảnh đất khai hoang. sử dụng「Trồng cây bằng một cú nhấp chuột」Hạt giống trong ba lô có thể được gieo theo đợt.'
    if (farmStore.plots.some(p => (p.state === 'planted' || p.state === 'growing') && !p.watered) && !gameStore.isRainy)
      return i18n.global.locale.value === 'vi' ? 'Nông sản cần tưới nước mỗi ngày mới lớn. Dùng 「Tưới hàng loạt」 có thể tưới tất cả.' : 'Cây trồng cần tưới nước hàng ngày để phát triển.「Tưới nước chỉ bằng một cú nhấp chuột」Tất cả các loại cây trồng có thể được tưới nước cùng một lúc.'
    if (farmStore.plots.some(p => p.state === 'harvestable')) return i18n.global.locale.value === 'vi' ? 'Ô được tô sáng vàng báo hiệu nông sản đã chín, nhấp 「Thu hoạch hàng loạt」 để thu.' : 'Ô được tô sáng màu vàng cho biết cây trồng đã trưởng thành, nhấp vào「Thu hoạch chỉ bằng một cú nhấp chuột」Có thể thu hoạch theo đợt.'
    return null
  })

  const surfaceOreName = computed(() => {
    const patch = gameStore.surfaceOrePatch
    if (!patch) return ''
    return getItemById(patch.oreId)?.name ?? (i18n.global.locale.value === 'vi' ? 'Quặng' : 'quặng')
  })

  const handleCollectCreekCatch = () => {
    const catches = gameStore.creekCatch
    if (catches.length === 0) return
    const names: string[] = []
    const failed: typeof catches = []
    for (const c of catches) {
      const added = inventoryStore.addItem(c.fishId, 1, c.quality)
      if (added) {
        const fishDef = getItemById(c.fishId)
        if (fishDef) names.push(fishDef.name)
      } else {
        failed.push(c)
      }
    }
    gameStore.creekCatch = failed
    if (names.length > 0) {
      addLog(i18n.global.locale.value === 'vi' ? `Đã thu hoạch cá suối: ${names.join(', ')}.` : `Cá suối thu được:${names.join(',')}.`)
    }
    if (failed.length > 0) {
      addLog(i18n.global.locale.value === 'vi' ? 'Balo đã đầy, một số cá chưa được thu.' : 'Ba lô đã đầy và một số cá không thể thu thập được.')
    }
  }

  const handleMineSurfaceOre = () => {
    const patch = gameStore.surfaceOrePatch
    if (!patch) return
    if (!playerStore.consumeStamina(5)) {
      addLog(i18n.global.locale.value === 'vi' ? 'Không đủ thể lực, không thể khai thác.' : 'Không đủ sức mạnh thể chất để khai thác.')
      return
    }
    const added = inventoryStore.addItem(patch.oreId, patch.quantity)
    if (!added) {
      playerStore.restoreStamina(5)
      addLog(i18n.global.locale.value === 'vi' ? 'Balo đã đầy, không thể khai thác.' : 'Ba lô đã đầy và không thể khai thác được.')
      return
    }
    const oreName = getItemById(patch.oreId)?.name ?? (i18n.global.locale.value === 'vi' ? 'Quặng' : 'quặng')
    const skillStore = useSkillStore()
    skillStore.addExp('mining', 8)
    gameStore.surfaceOrePatch = null
    addLog(i18n.global.locale.value === 'vi' ? `Đã khai thác mạch khoáng trên mặt đất, nhận được ${patch.quantity} ${oreName}. (+8 EXP đào)` : `Các mạch bề mặt được khai thác và thu được${patch.quantity}một${oreName}.(+8Kinh nghiệm khai thác)`)
    const tr = gameStore.advanceTime(1)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  }

  // === hộp vận chuyển ===

  const showShippingBox = ref(false)
  const showBatchPlant = ref(false)
  const showBatchFertilize = ref(false)
  const showBatchActions = ref(false)
  const showGreenhouseModal = ref(false)
  const showGhUpgradeModal = ref(false)
  const showGhBatchPlant = ref(false)
  const chopFruitTreeTarget = ref<{ id: number; type: string } | null>(null)
  const chopWildTreeTarget = ref<{ id: number; type: string; chopCount: number } | null>(null)

  const goToShop = () => {
    if (!isWanwupuOpen.value) {
      showFloat(wanwupuClosedReason.value, 'danger')
      return
    }
    activePlotId.value = null
    activeGhPlotId.value = null
    showBatchPlant.value = false
    showBatchFertilize.value = false
    showBatchActions.value = false
    showGreenhouseModal.value = false
    navigateToPanel('shop')
  }

  const wanwupu = getShopById('wanwupu')!

  const isWanwupuOpen = computed(() => {
    return isShopAvailable(wanwupu, gameStore.day, gameStore.hour, gameStore.weather, gameStore.season)
  })

  const wanwupuClosedReason = computed(() => {
    return (i18n.global.locale.value === 'vi' ? 'Tiệm Vạn Vật' : 'Cửa hàng bách hóa') + getShopClosedReason(wanwupu, gameStore.day, gameStore.hour, gameStore.weather, gameStore.season)
  })

  const getItemName = (itemId: string): string => getItemById(itemId)?.name ?? itemId

  const shippableItems = computed(() => {
    return inventoryStore.items
      .map(inv => ({ ...inv, def: getItemById(inv.itemId) }))
      .filter(item => item.def && item.def.category !== 'seed' && item.def.category !== 'machine' && item.def.category !== 'sprinkler')
  })

  const shippingBoxTotal = computed(() => {
    return shopStore.shippingBox.reduce((sum, entry) => sum + shopStore.calculateSellPrice(entry.itemId, entry.quantity, entry.quality), 0)
  })

  const handleAddToBox = (itemId: string, quantity: number, quality: Quality) => {
    if (shopStore.addToShippingBox(itemId, quantity, quality)) {
      const name = getItemName(itemId)
      addLog(i18n.global.locale.value === 'vi' ? `Đã bỏ ${name}×${quantity} vào thùng hàng.` : `sẽ${name}×${quantity}Đặt trong hộp vận chuyển.`)
    }
  }

  const handleRemoveFromBox = (itemId: string, quantity: number, quality: Quality) => {
    if (shopStore.removeFromShippingBox(itemId, quantity, quality)) {
      const name = getItemName(itemId)
      addLog(i18n.global.locale.value === 'vi' ? `Đã lấy ${name}×${quantity} ra khỏi thùng hàng.` : `Đã gỡ bỏ khỏi hộp vận chuyển${name}×${quantity}.`)
    }
  }

  // === 地chặn弹窗Trạng thái ===

  const activePlotId = ref<number | null>(null)
  const activePlot = computed(() => (activePlotId.value !== null ? (farmStore.plots.find(p => p.id === activePlotId.value) ?? null) : null))

  const activeGhPlotId = ref<number | null>(null)
  const activeGhPlot = computed(() => (activeGhPlotId.value !== null ? (farmStore.greenhousePlots[activeGhPlotId.value] ?? null) : null))

  // === 弹窗显示辅助 ===

  const STATE_LABELS = computed<Record<string, string>>(() => ({
    wasteland: i18n.global.locale.value === 'vi' ? 'Đất hoang' : 'đất hoang',
    tilled: i18n.global.locale.value === 'vi' ? 'Đã cuốc' : 'đã cày',
    planted: i18n.global.locale.value === 'vi' ? 'Đã gieo' : 'Đã trồng rồi',
    growing: i18n.global.locale.value === 'vi' ? 'Đang lớn' : 'đang phát triển',
    harvestable: i18n.global.locale.value === 'vi' ? 'Có thể gặt' : 'có thể thu hoạch được'
  }))

  const plotStateLabel = computed(() => (activePlot.value ? (STATE_LABELS.value[activePlot.value.state] ?? '?') : ''))
  const ghPlotStateLabel = computed(() => (activeGhPlot.value ? (STATE_LABELS.value[activeGhPlot.value.state] ?? '?') : ''))

  const plotCropGrowthDays = computed(() => {
    if (!activePlot.value?.cropId) return '?'
    const baseDays = getCropById(activePlot.value.cropId)?.growthDays
    if (!baseDays) return '?'
    const fertDef = activePlot.value.fertilizer ? getFertilizerById(activePlot.value.fertilizer) : null
    const speedup = (fertDef?.growthSpeedup ?? 0) + useWalletStore().getCropGrowthBonus()
    return speedup > 0 ? Math.max(1, Math.floor(baseDays * (1 - speedup))) : baseDays
  })

  const plotCropRegrowth = computed(() => {
    if (!activePlot.value?.cropId) return false
    return getCropById(activePlot.value.cropId)?.regrowth ?? false
  })

  const plotCropMaxHarvests = computed(() => {
    if (!activePlot.value?.cropId) return 0
    return getCropById(activePlot.value.cropId)?.maxHarvests ?? 0
  })

  const ghPlotCropGrowthDays = computed(() => {
    if (!activeGhPlot.value?.cropId) return '?'
    const baseDays = getCropById(activeGhPlot.value.cropId)?.growthDays
    if (!baseDays) return '?'
    const fertDef = activeGhPlot.value.fertilizer ? getFertilizerById(activeGhPlot.value.fertilizer) : null
    const speedup = (fertDef?.growthSpeedup ?? 0) + useWalletStore().getCropGrowthBonus()
    return speedup > 0 ? Math.max(1, Math.floor(baseDays * (1 - speedup))) : baseDays
  })

  const ghPlotCropRegrowth = computed(() => {
    if (!activeGhPlot.value?.cropId) return false
    return getCropById(activeGhPlot.value.cropId)?.regrowth ?? false
  })

  const ghPlotCropMaxHarvests = computed(() => {
    if (!activeGhPlot.value?.cropId) return 0
    return getCropById(activeGhPlot.value.cropId)?.maxHarvests ?? 0
  })

  const plotFertName = computed(() => {
    if (!activePlot.value?.fertilizer) return ''
    return getFertilizerById(activePlot.value.fertilizer)?.name ?? activePlot.value.fertilizer
  })

  const canWater = computed(() => {
    if (!activePlot.value) return false
    return (activePlot.value.state === 'planted' || activePlot.value.state === 'growing') && !activePlot.value.watered
  })

  const canFertilize = computed(() => {
    if (!activePlot.value) return false
    return activePlot.value.state !== 'wasteland' && !activePlot.value.fertilizer
  })

  // === Vật phẩm ba lô列表 ===

  const sprinklerItems = computed(() => {
    const types: { type: SprinklerType; itemId: string; name: string; colorClass: string }[] = [
      { type: 'bamboo_sprinkler', itemId: 'bamboo_sprinkler', name: i18n.global.locale.value === 'vi' ? 'Vòi phun tre' : 'Vòi phun tre', colorClass: '' },
      { type: 'copper_sprinkler', itemId: 'copper_sprinkler', name: i18n.global.locale.value === 'vi' ? 'Vòi phun đồng' : 'vòi phun nước ống đồng', colorClass: 'text-quality-fine' },
      { type: 'gold_sprinkler', itemId: 'gold_sprinkler', name: i18n.global.locale.value === 'vi' ? 'Vòi phun vàng' : 'vòi phun nước vàng', colorClass: 'text-quality-supreme' }
    ]
    return types.map(s => ({ ...s, count: inventoryStore.getItemCount(s.itemId) })).filter(s => s.count > 0)
  })

  const fertilizerItems = computed(() => {
    return FERTILIZERS.map(f => ({
      type: f.id as FertilizerType,
      itemId: f.id,
      name: f.name,
      count: inventoryStore.getItemCount(f.id),
      colorClass: itemValueColor(f.shopPrice ?? 0)
    })).filter(f => f.count > 0)
  })

  const QUALITY_ORDER: Quality[] = ['normal', 'fine', 'excellent', 'supreme']

  const plantableSeeds = computed(() => {
    const result: {
      cropId: string
      seedId: string
      name: string
      quality: Quality
      count: number
      colorClass: string
      regrowth: boolean
      regrowthDays?: number
    }[] = []
    for (const crop of getCropsBySeason(gameStore.season)) {
      for (const q of QUALITY_ORDER) {
        const count = inventoryStore.getItemCount(crop.seedId, q)
        if (count > 0) {
          result.push({
            cropId: crop.id,
            seedId: crop.seedId,
            name: crop.name,
            quality: q,
            count,
            colorClass: cropValueColor(crop.sellPrice),
            regrowth: crop.regrowth ?? false,
            regrowthDays: crop.regrowthDays
          })
        }
      }
    }
    return result
  })

  /** 当季可loài的hạt giống nhân giống */
  const plantableBreedingSeeds = computed(() => {
    const season = gameStore.season
    return breedingStore.breedingBox.filter(seed => {
      const crop = getCropById(seed.genetics.cropId)
      if (!crop) return false
      return crop.season.includes(season)
    })
  })

  /** 根据cây trồng售价返回品质颜色 */
  const cropValueColor = (sellPrice: number): string => {
    if (sellPrice >= 180) return 'text-quality-supreme'
    if (sellPrice >= 100) return 'text-quality-excellent'
    if (sellPrice >= 60) return 'text-quality-fine'
    return ''
  }

  /** 根据道具价格返回品质颜色 */
  const itemValueColor = (price: number): string => {
    if (price >= 100) return 'text-quality-supreme'
    if (price >= 75) return 'text-quality-excellent'
    if (price >= 40) return 'text-quality-fine'
    return ''
  }

  // === 地chặn显示 ===

  const getCropName = (cropId: string): string => {
    const crop = getCropById(cropId)
    return crop?.name ?? cropId
  }

  const hasSprinkler = (plotId: number): boolean => {
    return farmStore.sprinklers.some(s => s.plotId === plotId)
  }

  /** vòi phun nước覆盖范围（含放置vòi phun nước的地chặn自身) */
  const sprinklerCoverage = computed(() => farmStore.getAllWateredBySprinklers())

  const isSprinklerCovered = (plotId: number): boolean => sprinklerCoverage.value.has(plotId)

  const needsWater = (plot: (typeof farmStore.plots)[number]): boolean => {
    return (plot.state === 'planted' || plot.state === 'growing') && !plot.watered && !sprinklerCoverage.value.has(plot.id)
  }

  const unwateredCount = computed(() => farmStore.plots.filter(needsWater).length)
  const wastelandCount = computed(() => farmStore.plots.filter(p => p.state === 'wasteland').length)
  const harvestableCount = computed(() => farmStore.plots.filter(p => p.state === 'harvestable').length)
  const tilledEmptyCount = computed(() => farmStore.plots.filter(p => p.state === 'tilled').length)
  const fertilizableCount = computed(() => farmStore.plots.filter(p => p.state !== 'wasteland' && !p.fertilizer).length)
  const infestedCount = computed(() => farmStore.plots.filter(p => p.infested).length)
  const weedyCount = computed(() => farmStore.plots.filter(p => p.weedy).length)

  const PLOT_LEGENDS: { icon: Component; color: string; label: string }[] = [
    { icon: Shovel, color: 'text-muted', label: i18n.global.locale.value === 'vi' ? 'Đất hoang' : 'đất hoang' },
    { icon: Square, color: 'text-earth', label: i18n.global.locale.value === 'vi' ? 'Đã cày' : 'đã cày' },
    { icon: Sprout, color: 'text-success/60', label: i18n.global.locale.value === 'vi' ? 'Đã trồng' : 'Đã trồng rồi' },
    { icon: Flower2, color: 'text-success', label: i18n.global.locale.value === 'vi' ? 'Đang lớn' : 'đang phát triển' },
    { icon: Droplets, color: 'text-water', label: i18n.global.locale.value === 'vi' ? 'Đã tưới' : 'Tưới nước' },
    { icon: Wheat, color: 'text-accent', label: i18n.global.locale.value === 'vi' ? 'Có thể thu' : 'có thể thu hoạch được' },
    { icon: Star, color: 'text-accent', label: i18n.global.locale.value === 'vi' ? 'Khổng lồ' : 'khổng lồ' },
    { icon: Droplet, color: 'text-water', label: i18n.global.locale.value === 'vi' ? 'Vòi phun' : 'vòi phun nước' },
    { icon: CirclePlus, color: 'text-success', label: i18n.global.locale.value === 'vi' ? 'Phân bón' : 'phân bón' },
    { icon: Droplets, color: 'text-danger', label: i18n.global.locale.value === 'vi' ? 'Cần tưới' : 'Cần tưới nước' },
    { icon: Bug, color: 'text-danger', label: i18n.global.locale.value === 'vi' ? 'Sâu bọ' : 'loài gây hại' },
    { icon: Leaf, color: 'text-success', label: i18n.global.locale.value === 'vi' ? 'Cỏ dại' : 'cỏ dại' }
  ]

  const plotWarnings = computed(() => {
    const list: { color: string; text: string }[] = []
    if (unwateredCount.value > 0) list.push({ color: 'text-danger', text: `${unwateredCount.value} ${i18n.global.locale.value==='vi'?'ô cần tưới nước':'Khối cần tưới nước'}` })
    if (infestedCount.value > 0) list.push({ color: 'text-danger', text: `${infestedCount.value} ${i18n.global.locale.value==='vi'?'ô sâu bọ':'chặn sự phá hoại của côn trùng'}` })
    if (weedyCount.value > 0) list.push({ color: 'text-success', text: `${weedyCount.value} ${i18n.global.locale.value==='vi'?'ô cỏ cỏ':'cục cỏ dại'}` })
    return list
  })

  const doBatchAction = (action: 'water' | 'till' | 'harvest' | 'plant' | 'fertilize' | 'curePest' | 'clearWeed') => {
    showBatchActions.value = false
    if (action === 'water') handleBatchWater()
    else if (action === 'till') handleBatchTill()
    else if (action === 'harvest') handleBatchHarvest()
    else if (action === 'plant') showBatchPlant.value = true
    else if (action === 'fertilize') showBatchFertilize.value = true
    else if (action === 'curePest') handleBatchCurePest()
    else if (action === 'clearWeed') handleBatchClearWeed()
  }
  /** 按cropId分组的当季hạt giống nhân giống（用于Trồng cây bằng một cú nhấp chuột弹窗) */
  const batchBreedingSeedGroups = computed(() => {
    const groups: Record<string, { cropId: string; name: string; count: number; minGen: number; maxGen: number }> = {}
    for (const seed of plantableBreedingSeeds.value) {
      const cid = seed.genetics.cropId
      if (!groups[cid]) {
        groups[cid] = { cropId: cid, name: getCropName(cid), count: 0, minGen: seed.genetics.generation, maxGen: seed.genetics.generation }
      }
      groups[cid]!.count++
      if (seed.genetics.generation < groups[cid]!.minGen) groups[cid]!.minGen = seed.genetics.generation
      if (seed.genetics.generation > groups[cid]!.maxGen) groups[cid]!.maxGen = seed.genetics.generation
    }
    return Object.values(groups)
  })

  const doBatchPlant = (cropId: string) => {
    handleBatchPlant(cropId)
    showBatchPlant.value = false
  }

  const doBatchPlantBreeding = (cropId: string) => {
    const skillStore = useSkillStore()
    const cookingStore = useCookingStore()
    const targets = farmStore.plots.filter(p => p.state === 'tilled')
    if (targets.length === 0) {
      addLog(i18n.global.locale.value === 'vi' ? 'Không có đất cày trống để trồng.' : 'Không còn đất trống để trồng trọt.')
      showBatchPlant.value = false
      return
    }
    const seeds = plantableBreedingSeeds.value.filter(s => s.genetics.cropId === cropId)
    let planted = 0
    const plantRingFarmReduction = inventoryStore.getRingEffectValue('farming_stamina')
    const plantRingGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
    for (const plot of targets) {
      if (seeds.length === 0) break
      const seed = seeds.shift()!
      const farmingBuff = cookingStore.activeBuff?.type === 'farming' ? cookingStore.activeBuff.value / 100 : 0
      const cost = Math.max(
        1,
        Math.floor(
          3 *
            inventoryStore.getToolStaminaMultiplier('hoe') *
            (1 - skillStore.getStaminaReduction('farming')) *
            (1 - farmingBuff) *
            (1 - plantRingFarmReduction) *
            (1 - plantRingGlobalReduction)
        )
      )
      if (!playerStore.consumeStamina(cost)) break
      if (farmStore.plantGeneticSeed(plot.id, seed.genetics)) {
        breedingStore.removeFromBox(seed.genetics.id)
        planted++
      }
    }
    if (planted > 0) {
      addLog(i18n.global.locale.value === 'vi' ? `Trồng nhanh ${planted} hạt giống lai (${getCropName(cropId)}). (-${planted} thể lực)` : `Trồng bằng một cú nhấp chuột${planted}hạt giống giống (${getCropName(cropId)}).(-${planted}sức mạnh thể chất)`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.plant * planted)
      if (tr.message) addLog(tr.message)
    } else {
      addLog(i18n.global.locale.value === 'vi' ? 'Cạn thể lực, không thể trồng.' : 'Không đủ thể lực để trồng cây.')
    }
    showBatchPlant.value = false
  }
  const doBatchFertilize = (type: FertilizerType) => {
    handleBatchFertilize(type)
    showBatchFertilize.value = false
  }

  const doRemoveCrop = () => {
    if (activePlotId.value === null) return
    handleRemoveCrop(activePlotId.value)
    activePlotId.value = null
  }

  const doCurePest = () => {
    if (activePlotId.value === null) return
    handleCurePest(activePlotId.value)
    activePlotId.value = null
  }

  const doClearWeed = () => {
    if (activePlotId.value === null) return
    handleClearWeed(activePlotId.value)
    activePlotId.value = null
  }

  const getPlotDisplay = (plot: (typeof farmStore.plots)[number]): { icon: Component; color: string; bg: string } => {
    // khổng lồcây trồng特殊显示（仅在trưởng thành时才显示khổng lồ图标)
    if (plot.giantCropGroup !== null && plot.state === 'harvestable') {
      return { icon: Star, color: 'text-accent', bg: 'bg-accent/10' }
    }
    // loài gây hại显示
    if (plot.infested) {
      return { icon: Bug, color: 'text-danger', bg: 'bg-danger/10' }
    }
    // cỏ dại显示
    if (plot.weedy) {
      return { icon: Leaf, color: 'text-success/70', bg: 'bg-success/10' }
    }
    switch (plot.state) {
      case 'wasteland':
        return { icon: Shovel, color: 'text-muted', bg: 'bg-panel/40' }
      case 'tilled':
        return { icon: Square, color: 'text-earth', bg: 'bg-earth/8' }
      case 'planted':
        return {
          icon: plot.watered ? Droplets : Sprout,
          color: plot.watered ? 'text-water' : 'text-success/60',
          bg: plot.watered ? 'bg-water/8' : 'bg-success/5'
        }
      case 'growing': {
        const crop = getCropById(plot.cropId!)
        const fertDef = plot.fertilizer ? getFertilizerById(plot.fertilizer) : null
        const speedup = (fertDef?.growthSpeedup ?? 0) + useWalletStore().getCropGrowthBonus()
        const effectiveDays = crop ? (speedup > 0 ? Math.max(1, Math.floor(crop.growthDays * (1 - speedup))) : crop.growthDays) : 1
        const progress = crop ? Math.floor((plot.growthDays / effectiveDays) * 100) : 0
        return {
          icon: plot.watered ? Droplets : Leaf,
          color: plot.watered ? 'text-water' : progress > 60 ? 'text-success' : 'text-success/80',
          bg: plot.watered ? 'bg-water/8' : 'bg-success/8'
        }
      }
      case 'harvestable':
        return { icon: Wheat, color: 'text-accent', bg: 'bg-accent/15' }
      default:
        return { icon: Square, color: 'text-muted', bg: 'bg-panel/40' }
    }
  }

  const getPlotTooltip = (plot: (typeof farmStore.plots)[number]): string => {
    let tip = ''
    if (plot.state === 'wasteland') tip = i18n.global.locale.value === 'vi' ? 'Đất hoang (Nhấn để khai khẩn)' : 'Đất hoang (bấm vào để lấy lại)'
    else if (plot.state === 'tilled') tip = i18n.global.locale.value === 'vi' ? 'Đã cày (Nhấn để gieo)' : 'Đất đã cày (click để gieo)'
    else if (plot.state === 'harvestable') {
      const crop = getCropById(plot.cropId!)
      tip = i18n.global.locale.value === 'vi' ? `${crop?.name ?? ''} đã chín (Nhấn để thu hoạch)` : `${crop?.name ?? ''}Chín (bấm vào để thu hoạch)`
    } else if (plot.state === 'planted' || plot.state === 'growing') {
      const crop = getCropById(plot.cropId!)
      const fertDef = plot.fertilizer ? getFertilizerById(plot.fertilizer) : null
      const speedup = (fertDef?.growthSpeedup ?? 0) + useWalletStore().getCropGrowthBonus()
      const effectiveDays = crop ? (speedup > 0 ? Math.max(1, Math.floor(crop.growthDays * (1 - speedup))) : crop.growthDays) : '?'
      tip = i18n.global.locale.value === 'vi' ? `${crop?.name ?? ''} ${plot.growthDays}/${effectiveDays} ngày ${plot.watered ? 'Đã tưới' : 'Cần tưới'}` : `${crop?.name ?? ''} ${plot.growthDays}/${effectiveDays}ngày ${plot.watered ? 'Tưới nước' : 'Cần tưới nước'}`
    }
    if (hasSprinkler(plot.id)) tip += i18n.global.locale.value === 'vi' ? ' [Vòi phun]' : ' [vòi phun nước]'
    if (plot.fertilizer) {
      const fertDef = getFertilizerById(plot.fertilizer)
      tip += ` [${fertDef?.name ?? plot.fertilizer}]`
    }
    if (plot.infested) tip += i18n.global.locale.value === 'vi' ? ` [Sâu bọ ${plot.infestedDays} ngày]` : ` [loài gây hại${plot.infestedDays}ngày]`
    if (plot.weedy) tip += i18n.global.locale.value === 'vi' ? ` [Cỏ dại ${plot.weedyDays} ngày]` : ` [cỏ dại${plot.weedyDays}ngày]`
    return tip
  }

  // === 弹窗操作：农场 ===

  const doTill = () => {
    if (activePlotId.value === null) return
    selectedSeed.value = null
    handlePlotClick(activePlotId.value)
    activePlotId.value = null
  }

  const doPlant = (cropId: string, quality?: Quality) => {
    if (activePlotId.value === null) return
    selectedSeed.value = { cropId, quality }
    handlePlotClick(activePlotId.value)
    selectedSeed.value = null
    activePlotId.value = null
  }

  const doPlantGeneticSeed = (seedId: string) => {
    if (activePlotId.value === null) return
    const seed = breedingStore.breedingBox.find(s => s.genetics.id === seedId)
    if (!seed) return
    if (farmStore.plantGeneticSeed(activePlotId.value, seed.genetics)) {
      breedingStore.removeFromBox(seedId)
      addLog(i18n.global.locale.value === 'vi' ? `Gieo hạt giống lai: ${getCropName(seed.genetics.cropId)} G${seed.genetics.generation}.` : `Hạt giống đã được gieo:${getCropName(seed.genetics.cropId)} G${seed.genetics.generation}.`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.plant)
      if (tr.message) addLog(tr.message)
    }
    activePlotId.value = null
  }

  const doWater = () => {
    if (activePlotId.value === null) return
    selectedSeed.value = null
    handlePlotClick(activePlotId.value)
    activePlotId.value = null
  }

  const doHarvest = () => {
    if (activePlotId.value === null) return
    const plot = farmStore.plots.find(p => p.id === activePlotId.value)
    if (plot && plot.giantCropGroup !== null) {
      const result = farmStore.harvestGiantCrop(activePlotId.value)
      if (result) {
        inventoryStore.addItem(result.cropId, result.quantity)
        const cropName = getCropName(result.cropId)
        addLog(i18n.global.locale.value === 'vi' ? `Đã thu hoạch ${cropName} khổng lồ! Nhận được ${result.quantity} ${cropName}!` : `Thu hoạch được một lượng lớn${cropName}! có${result.quantity}một${cropName}!`)
        showFloat(i18n.global.locale.value === 'vi' ? `${cropName} khổng lồ ×${result.quantity}` : `khổng lồ${cropName} ×${result.quantity}`, 'accent')
        sfxHarvest()
      }
      activePlotId.value = null
      return
    }
    selectedSeed.value = null
    handlePlotClick(activePlotId.value)
    activePlotId.value = null
  }

  const doFertilize = (type: FertilizerType) => {
    if (activePlotId.value === null) return
    if (!inventoryStore.removeItem(type)) {
      addLog(i18n.global.locale.value === 'vi' ? 'Không còn phân bón này.' : 'Không còn phân bón.')
      return
    }
    if (farmStore.applyFertilizer(activePlotId.value, type)) {
      const fertDef = getFertilizerById(type)
      addLog(i18n.global.locale.value === 'vi' ? `Đã bón ${fertDef?.name ?? 'phân'}.` : `áp dụng${fertDef?.name ?? 'phân bón'}.`)
    } else {
      inventoryStore.addItem(type)
      addLog(i18n.global.locale.value === 'vi' ? 'Không thể bón phân ở đây (cần đất đã cày và chưa bón).' : 'Ở đây không thể bón phân (cần có lô đất sạch và chưa bón phân).')
    }
    activePlotId.value = null
  }

  const doPlaceSprinkler = (type: SprinklerType) => {
    if (activePlotId.value === null) return
    if (!inventoryStore.removeItem(type)) {
      addLog(i18n.global.locale.value === 'vi' ? 'Không còn vòi phun này.' : 'Không còn vòi phun nước nữa.')
      return
    }
    if (farmStore.placeSprinkler(activePlotId.value, type)) {
      addLog(i18n.global.locale.value === 'vi' ? 'Đã đặt vòi phun, xung quanh ô sẽ được tưới tự động.' : 'Các vòi phun nước được đặt và các ô xung quanh sẽ được tưới nước tự động.')
    } else {
      inventoryStore.addItem(type)
      addLog(i18n.global.locale.value === 'vi' ? 'Không thể đặt vòi phun ở đây.' : 'Vòi phun nước không thể được đặt ở đây.')
    }
    activePlotId.value = null
  }

  const doRemoveSprinkler = () => {
    if (activePlotId.value === null) return
    const plotId = activePlotId.value
    const type = farmStore.removeSprinkler(plotId)
    if (type) {
      if (inventoryStore.addItem(type)) {
        addLog(i18n.global.locale.value === 'vi' ? 'Đã gỡ vòi phun, thu hồi vào balo.' : 'Vòi phun nước đã được tháo ra và chiếc ba lô đã được thu hồi.')
      } else {
        // 背包满，放回原处
        farmStore.placeSprinkler(plotId, type)
        addLog(i18n.global.locale.value === 'vi' ? 'Balo đã đầy, không thể thu hồi vòi phun.' : 'Ba lô đã đầy và vòi phun nước không thể lấy lại được.')
      }
    }
    activePlotId.value = null
  }

  // === 果树 ===

  const getTreeName = (type: string): string => {
    return FRUIT_TREE_DEFS.find(d => d.type === type)?.name ?? type
  }

  const getTreeFruitSeason = (type: string): string => {
    const def = FRUIT_TREE_DEFS.find(d => d.type === type)
    if (!def) return '?'
    return SEASON_NAMES[def.fruitSeason as keyof typeof SEASON_NAMES]
  }

  const plantableSaplings = computed(() => {
    return FRUIT_TREE_DEFS.filter(d => inventoryStore.hasItem(d.saplingId)).map(d => ({
      type: d.type as FruitTreeType,
      saplingId: d.saplingId,
      name: d.name,
      count: inventoryStore.getItemCount(d.saplingId)
    }))
  })

  const plantableWildSeeds = computed(() => {
    return WILD_TREE_DEFS.filter(d => inventoryStore.hasItem(d.seedItemId)).map(d => ({
      type: d.type as WildTreeType,
      seedItemId: d.seedItemId,
      name: d.name,
      count: inventoryStore.getItemCount(d.seedItemId)
    }))
  })

  const hasTapper = computed(() => inventoryStore.getItemCount('tapper') > 0)

  const handlePlantTree = (treeType: FruitTreeType) => {
    const def = FRUIT_TREE_DEFS.find(d => d.type === treeType)
    if (!def) return
    if (!inventoryStore.removeItem(def.saplingId)) {
      addLog(i18n.global.locale.value === 'vi' ? 'Không có cây non này trong balo.' : 'Cây non không có trong ba lô.')
      return
    }
    if (farmStore.plantFruitTree(treeType)) {
      addLog(i18n.global.locale.value === 'vi' ? `Đã trồng ${def.name} non, cần 28 ngày để lớn.` : `gieo${def.name}cây giống, cần28Ngày đã chín muồi.`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.plantTree)
      if (tr.message) addLog(tr.message)
    } else {
      inventoryStore.addItem(def.saplingId)
      addLog(i18n.global.locale.value === 'vi' ? `Hết chỗ trồng cây ăn quả (Vượt quá ${MAX_FRUIT_TREES} cây).` : `Khe cắm cây ăn quả đã đầy (tối đa${MAX_FRUIT_TREES}cây).`)
    }
  }

  const confirmChopFruitTree = () => {
    const target = chopFruitTreeTarget.value
    if (!target) return
    chopFruitTreeTarget.value = null
    if (gameStore.isPastBedtime) {
      addLog(i18n.global.locale.value === 'vi' ? 'Muộn rồi, không chặt được.' : 'Đã quá muộn để cắt nó xuống.')
      return
    }
    if (!inventoryStore.isToolAvailable('axe')) {
      addLog(i18n.global.locale.value === 'vi' ? 'Rìu đang nâng cấp, không chặt được.' : 'Rìu đang được nâng cấp và không thể chặt được.')
      return
    }
    const skillStore = useSkillStore()
    const cost = Math.max(
      1,
      Math.floor(5 * inventoryStore.getToolStaminaMultiplier('axe') * (1 - skillStore.getStaminaReduction('foraging')))
    )
    if (!playerStore.consumeStamina(cost)) {
      addLog(i18n.global.locale.value === 'vi' ? 'Không đủ thể lực, không chặt được.' : 'Không đủ thể lực để cắt giảm.')
      return
    }
    const treeName = getTreeName(target.type)
    const woodQty = farmStore.removeFruitTree(target.id)
    if (woodQty > 0) {
      inventoryStore.addItem('wood', woodQty)
      addLog(i18n.global.locale.value === 'vi' ? `Đã gieo ${treeName}, nhận được ${woodQty} gỗ. (Thể lực-${cost})` : `cắt đứt${treeName}, nhận được${woodQty}Một mảnh gỗ. (Sức mạnh thể chất-${cost})`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.chopTree)
      if (tr.message) addLog(tr.message)
    }
  }

  // === cây dại ===

  const getWildTreeName = (type: string): string => {
    return getWildTreeDef(type)?.name ?? type
  }

  const handlePlantWildTree = (treeType: WildTreeType) => {
    const def = WILD_TREE_DEFS.find(d => d.type === treeType)
    if (!def) return
    if (!inventoryStore.removeItem(def.seedItemId)) {
      addLog(i18n.global.locale.value === 'vi' ? 'Không có hạt giống này trong balo.' : 'Hạt giống không có trong kho.')
      return
    }
    if (farmStore.plantWildTree(treeType)) {
      addLog(i18n.global.locale.value === 'vi' ? `Trồng ${def.name}, cần ${def.growthDays} ngày để chín.` : `gieo${def.name}, cần${def.growthDays}Ngày đã chín muồi.`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.plantTree)
      if (tr.message) addLog(tr.message)
    } else {
      inventoryStore.addItem(def.seedItemId)
      addLog(i18n.global.locale.value === 'vi' ? `Đã hết chỗ cho cây hoang dã (tối đa ${MAX_WILD_TREES}).` : `Khe cắm cây hoang dã đã đầy (tối đa${MAX_WILD_TREES}cây).`)
    }
  }

  const handleAttachTapper = (treeId: number) => {
    if (!inventoryStore.removeItem('tapper')) {
      addLog(i18n.global.locale.value === 'vi' ? 'Không có dụng cụ thu gom nhựa trong balo.' : 'Không có thiết bị hút mỡ trong ba lô.')
      return
    }
    if (farmStore.attachTapper(treeId)) {
      addLog(i18n.global.locale.value === 'vi' ? 'Cài đặt thiết bị thu nhựa, tạo nhựa tự động.' : 'Bộ thu dầu mỡ được lắp đặt và sẽ sản xuất nhựa thường xuyên.')
    } else {
      inventoryStore.addItem('tapper')
      addLog(i18n.global.locale.value === 'vi' ? 'Không thể cài dụng cụ (yêu cầu cây trưởng thành không có dụng cụ).' : 'Không thể lắp đặt bộ thu môi (yêu cầu cây dại trưởng thành không có bộ thu môi).')
    }
  }

  const handleCollectTapProduct = (treeId: number) => {
    const productId = farmStore.collectTapProduct(treeId)
    if (productId) {
      inventoryStore.addItem(productId)
      const def = WILD_TREE_DEFS.find(d => d.tapProduct === productId)
      addLog(i18n.global.locale.value === 'vi' ? `Thu được ${def?.tapProductName ?? productId}!` : `Đã tính phí${def?.tapProductName ?? productId}!`)
    }
  }

  const handleChopTree = (treeId: number) => {
    const tree = farmStore.wildTrees.find(t => t.id === treeId)
    if (!tree) return
    chopWildTreeTarget.value = { id: tree.id, type: tree.type, chopCount: tree.chopCount }
  }

  const confirmChopWildTree = () => {
    const target = chopWildTreeTarget.value
    if (!target) return
    chopWildTreeTarget.value = null
    if (gameStore.isPastBedtime) {
      addLog(i18n.global.locale.value === 'vi' ? 'Đã trễ, không đốn củi được ráp.' : 'Đã quá muộn để chặt cây.')
      return
    }
    if (!inventoryStore.isToolAvailable('axe')) {
      addLog(i18n.global.locale.value === 'vi' ? 'Rìu đang nâng cấp, không đốn được củi.' : 'Rìu đang được nâng cấp và không thể chặt gỗ.')
      return
    }
    const skillStore = useSkillStore()
    const cost = Math.max(
      1,
      Math.floor(5 * inventoryStore.getToolStaminaMultiplier('axe') * (1 - skillStore.getStaminaReduction('foraging')))
    )
    if (!playerStore.consumeStamina(cost)) {
      addLog(i18n.global.locale.value === 'vi' ? 'Cạn thể lực, không thể đốn củi.' : 'Không đủ sức lực để chặt cây.')
      return
    }
    const baseQty = 2
    const hasLumberjack = skillStore.getSkill('foraging').perk5 === 'lumberjack' || skillStore.getSkill('foraging').perk10 === 'forester'
    const qty = baseQty + (hasLumberjack ? 2 : Math.random() < 0.5 ? 1 : 0)
    inventoryStore.addItem('wood', qty)
    const { removed } = farmStore.chopWildTree(target.id)
    const treeName = getWildTreeName(target.type)
    if (removed) {
      addLog(i18n.global.locale.value === 'vi' ? `Thu được ${qty} gỗ, ${treeName} đã bị đốn ngã. (Thể lực-${cost})` : `Ghi nhật ký đạt được${qty}một mảnh gỗ,${treeName}Nó đã bị cắt giảm và biến mất. (Sức mạnh thể chất-${cost})`)
    } else {
      addLog(i18n.global.locale.value === 'vi' ? `Lấy được ${qty} gỗ. (Thể lực-${cost})` : `Ghi nhật ký đạt được${qty}Một mảnh gỗ. (Sức mạnh thể chất-${cost})`)
    }
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.chopTree)
    if (tr.message) addLog(tr.message)
  }

  // === nhà kính ===

  const showGreenhouse = computed(() => homeStore.greenhouseUnlocked)

  const ghHarvestableCount = computed(() => farmStore.greenhousePlots.filter(p => p.state === 'harvestable').length)

  const ghTilledEmptyCount = computed(() => farmStore.greenhousePlots.filter(p => p.state === 'tilled').length)

  const ghGridCols = computed(() => {
    const upgradeDef = GREENHOUSE_UPGRADES[farmStore.greenhouseLevel - 1]
    return upgradeDef?.gridCols ?? 4
  })

  const nextGhUpgrade = computed(() => GREENHOUSE_UPGRADES[farmStore.greenhouseLevel] ?? null)

  const allSeeds = computed(() => {
    return CROPS.filter(crop => inventoryStore.hasItem(crop.seedId)).map(crop => ({
      cropId: crop.id,
      seedId: crop.seedId,
      name: crop.name,
      count: inventoryStore.getItemCount(crop.seedId),
      regrowth: crop.regrowth ?? false
    }))
  })

  // === 弹窗操作：nhà kính ===

  const doGhPlant = (cropId: string) => {
    if (activeGhPlotId.value === null) return
    const crop = getCropById(cropId)
    if (!crop) return
    if (!inventoryStore.removeItem(crop.seedId)) {
      addLog(i18n.global.locale.value === 'vi' ? 'Không có hạt giống này trong balo.' : 'Hạt giống không còn trong kho.')
      return
    }
    if (farmStore.greenhousePlantCrop(activeGhPlotId.value, cropId)) {
      addLog(i18n.global.locale.value === 'vi' ? `Gieo hạt ${crop.name} ở nhà kính.` : `Gieo trong nhà kính${crop.name}.`)
    } else {
      inventoryStore.addItem(crop.seedId)
    }
    activeGhPlotId.value = null
  }

  const doGhHarvest = () => {
    if (activeGhPlotId.value === null) return
    if (!playerStore.consumeStamina(1)) {
      addLog(i18n.global.locale.value === 'vi' ? 'Không đủ thể lực để thu hoạch.' : 'Không đủ năng lượng để thu hoạch.')
      return
    }
    const result = farmStore.greenhouseHarvestPlot(activeGhPlotId.value)
    if (result.cropId) {
      const cropId = result.cropId
      const genetics = result.genetics
      const cropDef = getCropById(cropId)
      const skillStore = useSkillStore()
      let quality = skillStore.rollCropQualityWithBonus(0)
      quality = applyCropBlessing(quality)
      // 育loàisản xuất量加成
      const yieldDouble = genetics && Math.random() < (genetics.yield / 100) * 0.3
      const harvestQty = yieldDouble ? 2 : 1
      inventoryStore.addItem(cropId, harvestQty, quality)
      const qualityLabel = quality !== 'normal' ? `(${QUALITY_NAMES[quality]})` : ''
      const qtyLabel = yieldDouble ? '×2' : ''
      sfxHarvest()
      showFloat(`+${cropDef?.name ?? cropId}${qtyLabel}${qualityLabel}`, 'success')
      let msg = (i18n.global.locale.value === 'vi') ? `Thu hoạch trong nhà kính ${cropDef?.name ?? cropId}${qtyLabel}${qualityLabel}! (-1 thể lực)` : `Thu hoạch trong nhà kính${cropDef?.name ?? cropId}${qtyLabel}${qualityLabel}!(-1sức mạnh thể chất)`
      if (yieldDouble) msg += i18n.global.locale.value === 'vi' ? ' Thưởng năng suất nhai giống!' : ' Thưởng năng suất chăn nuôi!'
      // 育loàiPhần thưởng ngọt ngào
      if (genetics && genetics.sweetness > 0 && cropDef) {
        const bonusMoney = Math.floor((cropDef.sellPrice * harvestQty * genetics.sweetness) / 200)
        if (bonusMoney > 0) {
          playerStore.earnMoney(bonusMoney)
          msg += i18n.global.locale.value === 'vi' ? ` Thưởng vị ngọt +${bonusMoney} xu` : ` Phần thưởng ngọt ngào+${bonusMoney}văn bản`
        }
      }
      // 杂交loài记录
      if (genetics?.isHybrid && genetics.hybridId) {
        breedingStore.recordHybridGrown(genetics.hybridId)
      }
      // hạt giống nhân giống回收
      if (genetics && shouldReturnBreedingSeed(quality)) {
        const returned: SeedGenetics = { ...genetics, id: generateGeneticsId() }
        if (breedingStore.addToBox(returned)) {
          msg += i18n.global.locale.value === 'vi' ? ' Hạt giống lai đã hồi phục.' : ' Hạt giống đã được thu hồi.'
        } else {
          msg += i18n.global.locale.value === 'vi' ? ' Thùng hạt giống đã đầy, hạt giống lai mất!' : ' Hộp hạt giống đầy và hạt giống bị thất lạc!'
        }
      }
      addLog(msg)
    }
    activeGhPlotId.value = null
  }

  const doGhBatchHarvest = () => {
    const skillStore = useSkillStore()
    const results = farmStore.greenhouseBatchHarvest()
    if (results.length === 0) return
    let harvested = 0
    let seedsReturned = 0
    let totalBonusMoney = 0
    for (const { cropId, genetics } of results) {
      if (!playerStore.consumeStamina(1)) break
      harvested++
      let quality = skillStore.rollCropQualityWithBonus(0)
      quality = applyCropBlessing(quality)
      const yieldDouble = genetics && Math.random() < (genetics.yield / 100) * 0.3
      const harvestQty = yieldDouble ? 2 : 1
      inventoryStore.addItem(cropId, harvestQty, quality)
      // 育loàiPhần thưởng ngọt ngào
      if (genetics && genetics.sweetness > 0) {
        const cropDef = getCropById(cropId)
        if (cropDef) {
          const bonusMoney = Math.floor((cropDef.sellPrice * harvestQty * genetics.sweetness) / 200)
          if (bonusMoney > 0) {
            playerStore.earnMoney(bonusMoney)
            totalBonusMoney += bonusMoney
          }
        }
      }
      // 杂交loài记录
      if (genetics?.isHybrid && genetics.hybridId) {
        breedingStore.recordHybridGrown(genetics.hybridId)
      }
      // hạt giống nhân giống回收
      if (genetics && shouldReturnBreedingSeed(quality)) {
        const returned: SeedGenetics = { ...genetics, id: generateGeneticsId() }
        if (breedingStore.addToBox(returned)) seedsReturned++
      }
    }
    if (harvested > 0) {
      sfxHarvest()
      showFloat(i18n.global.locale.value === 'vi' ? `Thu hoạch trong nhà kính ×${harvested}` : `thu hoạch nhà kính ×${harvested}`, 'success')
      let msg = (i18n.global.locale.value === 'vi') ? `Thu hoạch nhanh ${harvested} cây trồng trong nhà kính. (-${harvested} thể lực)` : `Thu hoạch trong nhà kính chỉ bằng một cú nhấp chuột${harvested}cây trồng.(-${harvested}sức mạnh thể chất)`
      if (totalBonusMoney > 0) msg += ` Phần thưởng ngọt ngào+${totalBonusMoney}văn bản`
      addLog(msg)
    }
    if (seedsReturned > 0) {
      addLog(i18n.global.locale.value === 'vi' ? `${seedsReturned} hạt giống lai đã trở lại thùng hạt giống.` : `${seedsReturned}Hạt giống đã được đưa trở lại hộp hạt giống.`)
    }
  }

  /** nhà kính可loàihạt giống nhân giống（nhà kínhKhông có hạn chế theo mùa，所有hạt giống nhân giống都可loài) */
  const ghPlantableBreedingSeeds = computed(() => {
    return breedingStore.breedingBox.filter(seed => {
      const crop = getCropById(seed.genetics.cropId)
      return !!crop
    })
  })

  const doGhPlantGeneticSeed = (seedId: string) => {
    if (activeGhPlotId.value === null) return
    const seed = breedingStore.breedingBox.find(s => s.genetics.id === seedId)
    if (!seed) return
    if (farmStore.greenhousePlantGeneticSeed(activeGhPlotId.value, seed.genetics)) {
      breedingStore.removeFromBox(seedId)
      addLog(i18n.global.locale.value === 'vi' ? `Đã trồng trong nhà kính hạt giống lai: ${getCropName(seed.genetics.cropId)} G${seed.genetics.generation}.` : `Hạt giống được gieo trong nhà kính:${getCropName(seed.genetics.cropId)} G${seed.genetics.generation}.`)
    }
    activeGhPlotId.value = null
  }

  const doGhBatchPlant = (cropId: string) => {
    const crop = getCropById(cropId)
    if (!crop) return
    const targets = farmStore.greenhousePlots.filter(p => p.state === 'tilled')
    if (targets.length === 0) return
    let planted = 0
    for (const plot of targets) {
      if (!inventoryStore.hasItem(crop.seedId)) break
      if (!playerStore.consumeStamina(1)) break
      inventoryStore.removeItem(crop.seedId)
      farmStore.greenhousePlantCrop(plot.id, cropId)
      planted++
    }
    if (planted > 0) {
      sfxPlant()
      showFloat(i18n.global.locale.value === 'vi' ? `Trồng ${crop.name} ở nhà kính ×${planted}` : `canh tác nhà kính ${crop.name} ×${planted}`, 'success')
      addLog(i18n.global.locale.value === 'vi' ? `Đã trồng ${planted} cây ${crop.name} trong nhà kính. (-${planted} thể lực)` : `Trồng trong nhà kính chỉ bằng một cú nhấp chuột${planted}căng thẳng${crop.name}.(-${planted}sức mạnh thể chất)`)
    } else {
      addLog(i18n.global.locale.value === 'vi' ? 'Không đủ thể lực hoặc không đủ hạt giống, không thể trồng.' : 'Không đủ năng lượng hoặc hạt giống để trồng.')
    }
    showGhBatchPlant.value = false
  }

  const handleGhUpgrade = () => {
    const upgrade = nextGhUpgrade.value
    if (!upgrade) return
    for (const mat of upgrade.materialCost) {
      if (inventoryStore.getItemCount(mat.itemId) < mat.quantity) {
        addLog(i18n.global.locale.value === 'vi' ? 'Thiếu nguyên liệu, không thể nâng cấp nhà kính.' : 'Không đủ vật liệu để nâng cấp nhà kính.')
        return
      }
    }
    if (!playerStore.spendMoney(upgrade.cost)) {
      addLog(i18n.global.locale.value === 'vi' ? 'Không đủ tiền đồng, không thể nâng cấp.' : 'Không đủ tiền đồng để nâng cấp nhà kính.')
      return
    }
    for (const mat of upgrade.materialCost) {
      inventoryStore.removeItem(mat.itemId, mat.quantity)
    }
    farmStore.upgradeGreenhouse(upgrade.plotCount)
    addLog(i18n.global.locale.value === 'vi' ? `Nhà kính đã được nâng cấp lên ${upgrade.name}! (${upgrade.plotCount} ô đất)` : `Nhà kính đã được nâng cấp lên${upgrade.name}! (${upgrade.plotCount}lô)`)
    showGhUpgradeModal.value = false
  }
</script>

<style scoped>
  .farm-plot {
    height: 0;
    padding-bottom: 100%;
  }
</style>
