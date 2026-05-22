<template>
  <div>
    <p v-if="tutorialHint" class="text-[10px] text-muted/50 mb-2">{{ tutorialHint }}</p>

    <!-- 返回按钮(在子商铺时显示） -->
    <Button v-if="shopStore.currentShopId" class="mb-3 w-full md:w-auto" :icon="ChevronLeft" @click="shopStore.currentShopId = null">
      {{ $t('shopView.back_to_dist_btn') }}
    </Button>

    <!-- 移动端：购买/để bán切换 -->
    <div class="flex space-x-1.5 mb-3 md:hidden">
      <Button
        class="flex-1 justify-center"
        :class="{ '!bg-accent !text-bg': mobileTab === 'buy' }"
        :icon="ShoppingCart"
        @click="mobileTab = 'buy'"
      >
        {{ $t('shopView.mobile_tab_buy') }}
      </Button>
      <Button
        class="flex-1 justify-center"
        :class="{ '!bg-accent !text-bg': mobileTab === 'sell' }"
        :icon="Coins"
        @click="mobileTab = 'sell'"
      >
        {{ $t('shopView.mobile_tab_sell') }}
      </Button>
    </div>

    <div class="flex flex-col md:flex-row space-x-0 md:space-x-4 md:space-y-6">
      <!-- 左侧：购买区 -->
      <div class="flex-1" :class="{ 'hidden md:block': mobileTab === 'sell' }">
        <!-- 折扣提示 -->
        <p v-if="hasDiscount" class="text-success text-xs mb-3">{{ $t('shopView.discount_active_prefix', { percent: discountPercent }) }}</p>

        <!-- ====== 商圈总览 ====== -->
        <template v-if="!shopStore.currentShopId">
          <h3 class="text-accent text-sm mb-3">
            <Store :size="14" class="inline" />
            {{ $t('shopView.tao_dist_overview') }}
          </h3>
          <p class="text-muted text-xs mb-3">{{ $t('shopView.tao_dist_desc') }}</p>

          <!-- 旅行商人(仅周五/日） -->
          <div v-if="shopStore.isMerchantHere" class="mb-4">
            <h4 class="text-accent text-sm mb-2">
              <MapPin :size="14" class="inline" />
              {{ $t('shopView.merchant_traveling') }}
            </h4>
            <p class="text-muted text-xs mb-2">{{ $t('shopView.merchant_traveling_badge') }}</p>
            <div class="flex flex-col space-y-2" role="list">
              <div
                v-for="item in shopStore.travelingStock"
                :key="item.itemId"
                class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2"
                :class="item.quantity > 0 ? 'cursor-pointer hover:bg-accent/5' : 'opacity-50'"
                @click="
                  item.quantity > 0 &&
                  openBatchBuyModal(
                    getLocalizedItemName(item.name, item.itemId),
                    getLocalizedItemDesc(getTravelerItemDesc(item.itemId, item.quantity), item.itemId),
                    discounted(item.price),
                    () => handleBuyFromTraveler(item.itemId, item.name, item.price),
                    () => item.quantity > 0 && playerStore.money >= discounted(item.price),
                    count => handleBatchBuyFromTraveler(item.itemId, item.name, item.price, count),
                    () => getMaxBuyable(discounted(item.price), item.quantity),
                    item.itemId
                  )
                "
              >
                <div>
                  <p class="text-sm">{{ getLocalizedItemName(item.name, item.itemId) }}</p>
                  <p class="text-muted text-xs">{{ getLocalizedItemDesc(getTravelerItemDesc(item.itemId, item.quantity), item.itemId) }}</p>
                </div>
                <span class="text-xs text-accent whitespace-nowrap">{{ $t('shopView.coins_unit', { price: discounted(item.price) }) }}</span>
              </div>
            </div>
          </div>

          <!-- 六大商铺卡片 -->
          <div class="flex flex-col space-y-2" role="list">
            <div
              v-for="shop in SHOPS"
              :key="shop.id"
              class="flex items-center justify-between border rounded-xs px-3 py-2"
              :class="isOpen(shop) ? 'border-accent/30 cursor-pointer hover:bg-accent/5' : 'border-accent/10 opacity-50'"
              @click="isOpen(shop) && enterShop(shop.id)"
            >
              <div>
                <span class="text-sm">{{ getLocalizedShopName(shop.id, shop.name) }}</span>
                <span class="text-muted text-xs ml-2">{{ getLocalizedNpcName(shop.npcName) }}</span>
                <span v-if="!isOpen(shop)" class="text-danger text-xs ml-2">{{ getLocalizedClosedReason(closedReason(shop)) }}</span>
              </div>
              <ChevronRight v-if="isOpen(shop)" :size="14" class="text-muted" />
            </div>
          </div>
        </template>

        <!-- ====== 万物铺 ====== -->
        <template v-else-if="shopStore.currentShopId === 'wanwupu'">
          <ShopHeader :name="getLocalizedShopName('wanwupu', 'Cửa hàng bách hóa')" :npc="getLocalizedNpcName('chú Trần')" />

          <!-- 当mùahạt giống -->
          <h4 class="text-accent text-sm mb-2 mt-3">
            <Sprout :size="14" class="inline" />
            {{ $t('shopView.wanwupu_seasonal_seed') }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="seed in shopStore.availableSeeds"
              :key="seed.seedId"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBatchBuyModal(
                  getLocalizedItemName(seed.cropName + 'hạt giống', seed.seedId),
                  getLocalizedSeedDesc(seed),
                  discounted(seed.price),
                  () => handleBuySeed(seed.seedId),
                  () => playerStore.money >= discounted(seed.price),
                  count => handleBatchBuySeed(seed.seedId, count),
                  () => getMaxBuyable(discounted(seed.price)),
                  seed.seedId
                )
              "
                @keydown.enter.prevent="
                openBatchBuyModal(
                  getLocalizedItemName(seed.cropName + 'hạt giống', seed.seedId),
                  getLocalizedSeedDesc(seed),
                  discounted(seed.price),
                  () => handleBuySeed(seed.seedId),
                  () => playerStore.money >= discounted(seed.price),
                  count => handleBatchBuySeed(seed.seedId, count),
                  () => getMaxBuyable(discounted(seed.price)),
                  seed.seedId
                )
              "
                @keydown.space.prevent="
                openBatchBuyModal(
                  getLocalizedItemName(seed.cropName + 'hạt giống', seed.seedId),
                  getLocalizedSeedDesc(seed),
                  discounted(seed.price),
                  () => handleBuySeed(seed.seedId),
                  () => playerStore.money >= discounted(seed.price),
                  count => handleBatchBuySeed(seed.seedId, count),
                  () => getMaxBuyable(discounted(seed.price)),
                  seed.seedId
                )
              "
            >
              <div>
                <p class="text-sm">
                  {{ getLocalizedItemName(seed.cropName + 'hạt giống', seed.seedId) }}
                  <span v-if="seed.regrowth" class="text-success text-xs ml-1">{{ $t('shopView.wanwupu_regrowth_tag') }}</span>
                </p>
                <p class="text-muted text-xs">
                  {{ getLocalizedSeedDesc(seed) }}
                </p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ $t('shopView.coins_unit', { price: discounted(seed.price) }) }}</span>
            </div>
            <div v-if="shopStore.availableSeeds.length === 0" class="flex flex-col items-center justify-center py-4 text-muted">
              <Sprout :size="24" class="text-muted/30 mb-2" />
              <p class="text-xs">{{ $t('shopView.wanwupu_no_seed_present') }}</p>
            </div>
          </div>

          <!-- cửa hàng tạp hóa -->
          <h4 class="text-accent text-sm mb-2 mt-4">
            <Package :size="14" class="inline" />
            {{ $t('shopView.wanwupu_grocery') }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <!-- Mở rộng ba lô -->
            <div
                v-if="inventoryStore.capacity < 60"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBuyModal(
                  getLocalizedItemName('Mở rộng ba lô', 'expand_bag'),
                  getLocalizedItemDesc(`hiện tại${inventoryStore.capacity}lưới → ${inventoryStore.capacity + 4}lưới`, 'expand_bag'),
                  discounted(bagPrice),
                  handleBuyBag,
                  () => playerStore.money >= discounted(bagPrice)
                )
              "
                @keydown.enter.prevent="
                openBuyModal(
                  getLocalizedItemName('Mở rộng ba lô', 'expand_bag'),
                  getLocalizedItemDesc(`hiện tại${inventoryStore.capacity}lưới → ${inventoryStore.capacity + 4}lưới`, 'expand_bag'),
                  discounted(bagPrice),
                  handleBuyBag,
                  () => playerStore.money >= discounted(bagPrice)
                )
              "
                @keydown.space.prevent="
                openBuyModal(
                  getLocalizedItemName('Mở rộng ba lô', 'expand_bag'),
                  getLocalizedItemDesc(`hiện tại${inventoryStore.capacity}lưới → ${inventoryStore.capacity + 4}lưới`, 'expand_bag'),
                  discounted(bagPrice),
                  handleBuyBag,
                  () => playerStore.money >= discounted(bagPrice)
                )
              "
            >
              <div>
                <p class="text-sm">{{ getLocalizedItemName('Mở rộng ba lô', 'expand_bag') }}</p>
                <p class="text-muted text-xs">{{ getLocalizedItemDesc(`hiện tại${inventoryStore.capacity}lưới → ${inventoryStore.capacity + 4}lưới`, 'expand_bag') }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ $t('shopView.coins_unit', { price: discounted(bagPrice) }) }}</span>
            </div>

            <div
                v-if="warehouseStore.unlocked && warehouseStore.maxChests < warehouseStore.MAX_CHESTS_CAP"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBuyModal(
                  getLocalizedItemName('Mở rộng kho hàng', 'expand_warehouse'),
                  getLocalizedItemDesc(`khe ngực ${warehouseStore.maxChests} → ${warehouseStore.maxChests + 1}`, 'expand_warehouse'),
                  discounted(warehouseExpandPrice),
                  handleBuyWarehouseExpand,
                  () => playerStore.money >= discounted(warehouseExpandPrice)
                )
              "
                @keydown.enter.prevent="
                openBuyModal(
                  getLocalizedItemName('Mở rộng kho hàng', 'expand_warehouse'),
                  getLocalizedItemDesc(`khe ngực ${warehouseStore.maxChests} → ${warehouseStore.maxChests + 1}`, 'expand_warehouse'),
                  discounted(warehouseExpandPrice),
                  handleBuyWarehouseExpand,
                  () => playerStore.money >= discounted(warehouseExpandPrice)
                )
              "
                @keydown.space.prevent="
                openBuyModal(
                  getLocalizedItemName('Mở rộng kho hàng', 'expand_warehouse'),
                  getLocalizedItemDesc(`khe ngực ${warehouseStore.maxChests} → ${warehouseStore.maxChests + 1}`, 'expand_warehouse'),
                  discounted(warehouseExpandPrice),
                  handleBuyWarehouseExpand,
                  () => playerStore.money >= discounted(warehouseExpandPrice)
                )
              "
            >
              <div>
                <p class="text-sm">{{ getLocalizedItemName('Mở rộng kho hàng', 'expand_warehouse') }}</p>
                <p class="text-muted text-xs">{{ getLocalizedItemDesc(`khe ngực ${warehouseStore.maxChests} → ${warehouseStore.maxChests + 1}`, 'expand_warehouse') }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ $t('shopView.coins_unit', { price: discounted(warehouseExpandPrice) }) }}</span>
            </div>

            <!-- mở rộng trang trại -->
            <div
                v-if="farmExpandInfo"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBuyModal(
                  getLocalizedItemName('mở rộng trang trại', 'expand_farm'),
                  `${farmStore.farmSize}×${farmStore.farmSize} → ${farmExpandInfo.newSize}×${farmExpandInfo.newSize}`,
                  discounted(farmExpandInfo.price),
                  handleBuyFarmExpand,
                  () => playerStore.money >= discounted(farmExpandInfo!.price)
                )
              "
                @keydown.enter.prevent="
                openBuyModal(
                  getLocalizedItemName('mở rộng trang trại', 'expand_farm'),
                  `${farmStore.farmSize}×${farmStore.farmSize} → ${farmExpandInfo.newSize}×${farmExpandInfo.newSize}`,
                  discounted(farmExpandInfo.price),
                  handleBuyFarmExpand,
                  () => playerStore.money >= discounted(farmExpandInfo!.price)
                )
              "
                @keydown.space.prevent="
                openBuyModal(
                  getLocalizedItemName('mở rộng trang trại', 'expand_farm'),
                  `${farmStore.farmSize}×${farmStore.farmSize} → ${farmExpandInfo.newSize}×${farmExpandInfo.newSize}`,
                  discounted(farmExpandInfo.price),
                  handleBuyFarmExpand,
                  () => playerStore.money >= discounted(farmExpandInfo!.price)
                )
              "
            >
              <div>
                <p class="text-sm">{{ getLocalizedItemName('mở rộng trang trại', 'expand_farm') }}</p>
                <p class="text-muted text-xs">
                  {{ farmStore.farmSize }}×{{ farmStore.farmSize }} → {{ farmExpandInfo.newSize }}×{{ farmExpandInfo.newSize }}
                </p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ $t('shopView.coins_unit', { price: discounted(farmExpandInfo.price) }) }}</span>
            </div>

            <!-- cây non -->
            <div
                v-for="tree in FRUIT_TREE_DEFS"
              :key="tree.saplingId"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBatchBuyModal(
                  getLocalizedItemName(tree.name + 'cây giống', tree.saplingId),
                  getLocalizedItemDesc(`28trưởng thành · ${seasonName(tree.fruitSeason)}Sản phẩm theo mùa${tree.fruitName}`, tree.saplingId),
                  discounted(tree.saplingPrice),
                  () => handleBuySapling(tree.saplingId, tree.saplingPrice, tree.name),
                  () => playerStore.money >= discounted(tree.saplingPrice),
                  count => handleBatchBuySapling(tree.saplingId, tree.saplingPrice, tree.name, count),
                  () => getMaxBuyable(discounted(tree.saplingPrice)),
                  tree.saplingId
                )
              "
                @keydown.enter.prevent="
                openBatchBuyModal(
                  getLocalizedItemName(tree.name + 'cây giống', tree.saplingId),
                  getLocalizedItemDesc(`28trưởng thành · ${seasonName(tree.fruitSeason)}Sản phẩm theo mùa${tree.fruitName}`, tree.saplingId),
                  discounted(tree.saplingPrice),
                  () => handleBuySapling(tree.saplingId, tree.saplingPrice, tree.name),
                  () => playerStore.money >= discounted(tree.saplingPrice),
                  count => handleBatchBuySapling(tree.saplingId, tree.saplingPrice, tree.name, count),
                  () => getMaxBuyable(discounted(tree.saplingPrice)),
                  tree.saplingId
                )
              "
                @keydown.space.prevent="
                openBatchBuyModal(
                  getLocalizedItemName(tree.name + 'cây giống', tree.saplingId),
                  getLocalizedItemDesc(`28trưởng thành · ${seasonName(tree.fruitSeason)}Sản phẩm theo mùa${tree.fruitName}`, tree.saplingId),
                  discounted(tree.saplingPrice),
                  () => handleBuySapling(tree.saplingId, tree.saplingPrice, tree.name),
                  () => playerStore.money >= discounted(tree.saplingPrice),
                  count => handleBatchBuySapling(tree.saplingId, tree.saplingPrice, tree.name, count),
                  () => getMaxBuyable(discounted(tree.saplingPrice)),
                  tree.saplingId
                )
              "
            >
              <div>
                <p class="text-sm">{{ getLocalizedItemName(tree.name + 'cây giống', tree.saplingId) }}</p>
                <p class="text-muted text-xs">{{ getLocalizedItemDesc(`28trưởng thành · ${seasonName(tree.fruitSeason)}Sản phẩm theo mùa${tree.fruitName}`, tree.saplingId) }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ $t('shopView.coins_unit', { price: discounted(tree.saplingPrice) }) }}</span>
            </div>

            <!-- cỏ khô -->
            <div
                class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBatchBuyModal(
                  getLocalizedItemName('cỏ khô', 'hay'),
                  getLocalizedItemDesc('Cho gia súc ăn', 'hay'),
                  discounted(HAY_PRICE),
                  handleBuyHay,
                  () => playerStore.money >= discounted(HAY_PRICE),
                  count => handleBatchBuyItem('hay', HAY_PRICE, 'cỏ khô', count),
                  () => getMaxBuyable(discounted(HAY_PRICE)),
                  'hay'
                )
              "
                @keydown.enter.prevent="
                openBatchBuyModal(
                  getLocalizedItemName('cỏ khô', 'hay'),
                  getLocalizedItemDesc('Cho gia súc ăn', 'hay'),
                  discounted(HAY_PRICE),
                  handleBuyHay,
                  () => playerStore.money >= discounted(HAY_PRICE),
                  count => handleBatchBuyItem('hay', HAY_PRICE, 'cỏ khô', count),
                  () => getMaxBuyable(discounted(HAY_PRICE)),
                  'hay'
                )
              "
                @keydown.space.prevent="
                openBatchBuyModal(
                  getLocalizedItemName('cỏ khô', 'hay'),
                  getLocalizedItemDesc('Cho gia súc ăn', 'hay'),
                  discounted(HAY_PRICE),
                  handleBuyHay,
                  () => playerStore.money >= discounted(HAY_PRICE),
                  count => handleBatchBuyItem('hay', HAY_PRICE, 'cỏ khô', count),
                  () => getMaxBuyable(discounted(HAY_PRICE)),
                  'hay'
                )
              "
            >
              <div>
                <p class="text-sm">{{ getLocalizedItemName('cỏ khô', 'hay') }}</p>
                <p class="text-muted text-xs">{{ getLocalizedItemDesc('Cho gia súc ăn', 'hay') }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ $t('shopView.coins_unit', { price: discounted(HAY_PRICE) }) }}</span>
            </div>

            <!-- gỗ -->
            <div
                class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBatchBuyModal(
                  getLocalizedItemName('gỗ', 'wood'),
                  getLocalizedItemDesc('Vật liệu cơ bản cho xây dựng và gia công', 'wood'),
                  discounted(WOOD_PRICE),
                  () => handleBuyItem('wood', WOOD_PRICE, 'gỗ'),
                  () => playerStore.money >= discounted(WOOD_PRICE),
                  count => handleBatchBuyItem('wood', WOOD_PRICE, 'gỗ', count),
                  () => getMaxBuyable(discounted(WOOD_PRICE)),
                  'wood'
                )
              "
                @keydown.enter.prevent="
                openBatchBuyModal(
                  getLocalizedItemName('gỗ', 'wood'),
                  getLocalizedItemDesc('Vật liệu cơ bản cho xây dựng và gia công', 'wood'),
                  discounted(WOOD_PRICE),
                  () => handleBuyItem('wood', WOOD_PRICE, 'gỗ'),
                  () => playerStore.money >= discounted(WOOD_PRICE),
                  count => handleBatchBuyItem('wood', WOOD_PRICE, 'gỗ', count),
                  () => getMaxBuyable(discounted(WOOD_PRICE)),
                  'wood'
                )
              "
                @keydown.space.prevent="
                openBatchBuyModal(
                  getLocalizedItemName('gỗ', 'wood'),
                  getLocalizedItemDesc('Vật liệu cơ bản cho xây dựng và gia công', 'wood'),
                  discounted(WOOD_PRICE),
                  () => handleBuyItem('wood', WOOD_PRICE, 'gỗ'),
                  () => playerStore.money >= discounted(WOOD_PRICE),
                  count => handleBatchBuyItem('wood', WOOD_PRICE, 'gỗ', count),
                  () => getMaxBuyable(discounted(WOOD_PRICE)),
                  'wood'
                )
              "
            >
              <div>
                <p class="text-sm">{{ getLocalizedItemName('gỗ', 'wood') }}</p>
                <p class="text-muted text-xs">{{ getLocalizedItemDesc('Vật liệu cơ bản cho xây dựng và gia công', 'wood') }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ $t('shopView.coins_unit', { price: discounted(WOOD_PRICE) }) }}</span>
            </div>

            <!-- vật tổ mưa -->
            <div
                class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBatchBuyModal(
                  getLocalizedItemName('vật tổ mưa', 'rain_totem'),
                  getLocalizedItemDesc('Hãy dùng nó để làm mưa vào ngày mai', 'rain_totem'),
                  discounted(RAIN_TOTEM_PRICE),
                  () => handleBuyItem('rain_totem', RAIN_TOTEM_PRICE, 'vật tổ mưa'),
                  () => playerStore.money >= discounted(RAIN_TOTEM_PRICE),
                  count => handleBatchBuyItem('rain_totem', RAIN_TOTEM_PRICE, 'vật tổ mưa', count),
                  () => getMaxBuyable(discounted(RAIN_TOTEM_PRICE)),
                  'rain_totem'
                )
              "
                @keydown.enter.prevent="
                openBatchBuyModal(
                  getLocalizedItemName('vật tổ mưa', 'rain_totem'),
                  getLocalizedItemDesc('Hãy dùng nó để làm mưa vào ngày mai', 'rain_totem'),
                  discounted(RAIN_TOTEM_PRICE),
                  () => handleBuyItem('rain_totem', RAIN_TOTEM_PRICE, 'vật tổ mưa'),
                  () => playerStore.money >= discounted(RAIN_TOTEM_PRICE),
                  count => handleBatchBuyItem('rain_totem', RAIN_TOTEM_PRICE, 'vật tổ mưa', count),
                  () => getMaxBuyable(discounted(RAIN_TOTEM_PRICE)),
                  'rain_totem'
                )
              "
                @keydown.space.prevent="
                openBatchBuyModal(
                  getLocalizedItemName('vật tổ mưa', 'rain_totem'),
                  getLocalizedItemDesc('Hãy dùng nó để làm mưa vào ngày mai', 'rain_totem'),
                  discounted(RAIN_TOTEM_PRICE),
                  () => handleBuyItem('rain_totem', RAIN_TOTEM_PRICE, 'vật tổ mưa'),
                  () => playerStore.money >= discounted(RAIN_TOTEM_PRICE),
                  count => handleBatchBuyItem('rain_totem', RAIN_TOTEM_PRICE, 'vật tổ mưa', count),
                  () => getMaxBuyable(discounted(RAIN_TOTEM_PRICE)),
                  'rain_totem'
                )
              "
            >
              <div>
                <p class="text-sm">{{ getLocalizedItemName('vật tổ mưa', 'rain_totem') }}</p>
                <p class="text-muted text-xs">{{ getLocalizedItemDesc('Hãy dùng nó để làm mưa vào ngày mai', 'rain_totem') }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ $t('shopView.coins_unit', { price: discounted(RAIN_TOTEM_PRICE) }) }}</span>
            </div>
          </div>
        </template>

        <!-- ====== 铁匠铺 ====== -->
        <template v-else-if="shopStore.currentShopId === 'tiejiangpu'">
          <ShopHeader :name="getLocalizedShopName('tiejiangpu', 'Lò rèn')" :npc="getLocalizedNpcName('Tôn Thiết Giang')" />

          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="item in shopStore.blacksmithItems"
              :key="item.itemId"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBatchBuyModal(
                  item.name,
                  item.description,
                  discounted(item.price),
                  () => handleBuyItem(item.itemId, item.price, item.name),
                  () => playerStore.money >= discounted(item.price),
                  count => handleBatchBuyItem(item.itemId, item.price, item.name, count),
                  () => getMaxBuyable(discounted(item.price)),
                  item.itemId
                )
              "
                @keydown.enter.prevent="
                openBatchBuyModal(
                  item.name,
                  item.description,
                  discounted(item.price),
                  () => handleBuyItem(item.itemId, item.price, item.name),
                  () => playerStore.money >= discounted(item.price),
                  count => handleBatchBuyItem(item.itemId, item.price, item.name, count),
                  () => getMaxBuyable(discounted(item.price)),
                  item.itemId
                )
              "
                @keydown.space.prevent="
                openBatchBuyModal(
                  item.name,
                  item.description,
                  discounted(item.price),
                  () => handleBuyItem(item.itemId, item.price, item.name),
                  () => playerStore.money >= discounted(item.price),
                  count => handleBatchBuyItem(item.itemId, item.price, item.name, count),
                  () => getMaxBuyable(discounted(item.price)),
                  item.itemId
                )
              "
            >
              <div>
                <p class="text-sm">{{ item.name }}</p>
                <p class="text-muted text-xs">{{ item.description }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ discounted(item.price) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>

          <!-- Tổng hợp vòng -->
          <h4 class="text-accent text-sm mb-2 mt-4">
            <CircleDot :size="14" class="inline" />
            {{ $i18n.locale === 'vi' ? 'Ghép Nhẫn' : 'Tổng hợp vòng' }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="ring in craftableRings"
              :key="ring.id"
              class="flex items-center justify-between border rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              :class="canCraftRing(ring) ? 'border-success/50 bg-success/5' : 'border-accent/20'"
              @click="openRingModal(ring)"
                @keydown.enter.prevent="openRingModal(ring)"
                @keydown.space.prevent="openRingModal(ring)"
            >
              <div>
                <p class="text-sm">
                  {{ ring.name }}
                  <span v-if="inventoryStore.hasRing(ring.id)" class="text-success text-xs ml-1">{{ $i18n.locale === 'vi' ? 'Đã sở hữu' : 'Đã sở hữu' }}</span>
                </p>
                <p class="text-muted text-xs">{{ ring.description }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ ring.recipeMoney }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
            <div v-if="craftableRings.length === 0" class="flex flex-col items-center justify-center py-4 text-muted">
              <CircleDot :size="24" class="text-muted/30 mb-2" />
              <p class="text-xs">{{ $i18n.locale === 'vi' ? 'Không có nhẫn để ghép' : 'Không có chiếc nhẫn nào có thể chế tạo được' }}</p>
            </div>
          </div>

          <!-- tổng hợp mũ -->
          <h4 class="text-accent text-sm mb-2 mt-4">
            <Crown :size="14" class="inline" />
            {{ $i18n.locale === 'vi' ? 'Ghép Mũ' : 'tổng hợp mũ' }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="hat in CRAFTABLE_HATS"
              :key="hat.id"
              class="flex items-center justify-between border rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              :class="canCraftHat(hat) ? 'border-success/50 bg-success/5' : 'border-accent/20'"
              @click="openHatCraftModal(hat)"
                @keydown.enter.prevent="openHatCraftModal(hat)"
                @keydown.space.prevent="openHatCraftModal(hat)"
            >
              <div>
                <p class="text-sm">
                  {{ hat.name }}
                  <span v-if="inventoryStore.hasHat(hat.id)" class="text-success text-xs ml-1">{{ $i18n.locale === 'vi' ? 'Đã sở hữu' : 'Đã sở hữu' }}</span>
                </p>
                <p class="text-muted text-xs">{{ hat.description }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ hat.recipeMoney }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>

          <!-- giày tổng hợp -->
          <h4 class="text-accent text-sm mb-2 mt-4">
            <Footprints :size="14" class="inline" />
            {{ $i18n.locale === 'vi' ? 'Ghép Giày' : 'giày tổng hợp' }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="shoe in CRAFTABLE_SHOES"
              :key="shoe.id"
              class="flex items-center justify-between border rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              :class="canCraftShoe(shoe) ? 'border-success/50 bg-success/5' : 'border-accent/20'"
              @click="openShoeCraftModal(shoe)"
                @keydown.enter.prevent="openShoeCraftModal(shoe)"
                @keydown.space.prevent="openShoeCraftModal(shoe)"
            >
              <div>
                <p class="text-sm">
                  {{ shoe.name }}
                  <span v-if="inventoryStore.hasShoe(shoe.id)" class="text-success text-xs ml-1">{{ $i18n.locale === 'vi' ? 'Đã sở hữu' : 'Đã sở hữu' }}</span>
                </p>
                <p class="text-muted text-xs">{{ shoe.description }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ shoe.recipeMoney }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>
        </template>

        <!-- ====== 镖局 ====== -->
        <template v-else-if="shopStore.currentShopId === 'biaoju'">
          <ShopHeader :name="getLocalizedShopName('biaoju', 'Tiêu cục')" :npc="getLocalizedNpcName('Vân Phi')" />

          <!-- vũ khí -->
          <h4 class="text-accent text-sm mb-2">
            <Sword :size="14" class="inline" />
            {{ $i18n.locale === 'vi' ? 'Vũ khí' : 'vũ khí' }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="w in SHOP_WEAPONS"
              :key="w.id"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="openWeaponModal(w)"
                @keydown.enter.prevent="openWeaponModal(w)"
                @keydown.space.prevent="openWeaponModal(w)"
            >
              <div>
                <p class="text-sm">
                  {{ w.name }}
                  <span v-if="inventoryStore.hasWeapon(w.id)" class="text-success text-xs ml-1">{{ $i18n.locale === 'vi' ? 'Đã sở hữu' : 'Đã sở hữu' }}</span>
                </p>
                <p class="text-muted text-xs">{{ WEAPON_TYPE_NAMES[w.type] }} · {{ $i18n.locale === 'vi' ? 'Công' : 'Công' }}{{ w.attack }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ discounted(w.shopPrice!) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>
        </template>

        <!-- ====== 渔具铺 ====== -->
        <template v-else-if="shopStore.currentShopId === 'yugupu'">
          <ShopHeader :name="getLocalizedShopName('buyugu', 'Cửa hàng đồ câu')" :npc="getLocalizedNpcName('Thu Nguyệt')" />

          <!-- 鱼饵 -->
          <h4 class="text-accent text-sm mb-2">
            <Fish :size="14" class="inline" />
            {{ $i18n.locale === 'vi' ? 'Mồi câu' : 'Mồi câu' }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="b in shopStore.shopBaits"
              :key="b.id"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBatchBuyModal(
                  b.name,
                  b.description,
                  discounted(b.price),
                  () => handleBuyItem(b.id, b.price, b.name),
                  () => playerStore.money >= discounted(b.price),
                  count => handleBatchBuyItem(b.id, b.price, b.name, count),
                  () => getMaxBuyable(discounted(b.price)),
                  b.id
                )
              "
                @keydown.enter.prevent="
                openBatchBuyModal(
                  b.name,
                  b.description,
                  discounted(b.price),
                  () => handleBuyItem(b.id, b.price, b.name),
                  () => playerStore.money >= discounted(b.price),
                  count => handleBatchBuyItem(b.id, b.price, b.name, count),
                  () => getMaxBuyable(discounted(b.price)),
                  b.id
                )
              "
                @keydown.space.prevent="
                openBatchBuyModal(
                  b.name,
                  b.description,
                  discounted(b.price),
                  () => handleBuyItem(b.id, b.price, b.name),
                  () => playerStore.money >= discounted(b.price),
                  count => handleBatchBuyItem(b.id, b.price, b.name, count),
                  () => getMaxBuyable(discounted(b.price)),
                  b.id
                )
              "
            >
              <div>
                <p class="text-sm">{{ b.name }}</p>
                <p class="text-muted text-xs">{{ b.description }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ discounted(b.price) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>

          <!-- 浮漂 -->
          <h4 class="text-accent text-sm mb-2 mt-4">
            <Fish :size="14" class="inline" />
            {{ $i18n.locale === 'vi' ? 'Phao câu' : 'Phao câu' }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="t in shopStore.shopTackles"
              :key="t.id"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBatchBuyModal(
                  t.name,
                  t.description,
                  discounted(t.price),
                  () => handleBuyItem(t.id, t.price, t.name),
                  () => playerStore.money >= discounted(t.price),
                  count => handleBatchBuyItem(t.id, t.price, t.name, count),
                  () => getMaxBuyable(discounted(t.price)),
                  t.id
                )
              "
                @keydown.enter.prevent="
                openBatchBuyModal(
                  t.name,
                  t.description,
                  discounted(t.price),
                  () => handleBuyItem(t.id, t.price, t.name),
                  () => playerStore.money >= discounted(t.price),
                  count => handleBatchBuyItem(t.id, t.price, t.name, count),
                  () => getMaxBuyable(discounted(t.price)),
                  t.id
                )
              "
                @keydown.space.prevent="
                openBatchBuyModal(
                  t.name,
                  t.description,
                  discounted(t.price),
                  () => handleBuyItem(t.id, t.price, t.name),
                  () => playerStore.money >= discounted(t.price),
                  count => handleBatchBuyItem(t.id, t.price, t.name, count),
                  () => getMaxBuyable(discounted(t.price)),
                  t.id
                )
              "
            >
              <div>
                <p class="text-sm">{{ t.name }}</p>
                <p class="text-muted text-xs">{{ t.description }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ discounted(t.price) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>

          <!-- Khác -->
          <h4 class="text-accent text-sm mb-2 mt-4">
            <Fish :size="14" class="inline" />
            {{ $i18n.locale === 'vi' ? 'Khác' : 'Khác' }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="item in shopStore.fishingShopItems"
              :key="item.itemId"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBatchBuyModal(
                  item.name,
                  item.description,
                  discounted(item.price),
                  () => handleBuyItem(item.itemId, item.price, item.name),
                  () => playerStore.money >= discounted(item.price),
                  count => handleBatchBuyItem(item.itemId, item.price, item.name, count),
                  () => getMaxBuyable(discounted(item.price)),
                  item.itemId
                )
              "
                @keydown.enter.prevent="
                openBatchBuyModal(
                  item.name,
                  item.description,
                  discounted(item.price),
                  () => handleBuyItem(item.itemId, item.price, item.name),
                  () => playerStore.money >= discounted(item.price),
                  count => handleBatchBuyItem(item.itemId, item.price, item.name, count),
                  () => getMaxBuyable(discounted(item.price)),
                  item.itemId
                )
              "
                @keydown.space.prevent="
                openBatchBuyModal(
                  item.name,
                  item.description,
                  discounted(item.price),
                  () => handleBuyItem(item.itemId, item.price, item.name),
                  () => playerStore.money >= discounted(item.price),
                  count => handleBatchBuyItem(item.itemId, item.price, item.name, count),
                  () => getMaxBuyable(discounted(item.price)),
                  item.itemId
                )
              "
            >
              <div>
                <p class="text-sm">{{ item.name }}</p>
                <p class="text-muted text-xs">{{ item.description }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ discounted(item.price) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>
        </template>

        <!-- ====== 药铺 ====== -->
        <template v-else-if="shopStore.currentShopId === 'yaopu'">
          <ShopHeader :name="getLocalizedShopName('baicaotang', 'Tiệm thuốc')" :npc="getLocalizedNpcName('Ông Lâm')" />

          <!-- phân bón -->
          <h4 class="text-accent text-sm mb-2">
            <Leaf :size="14" class="inline" />
            {{ $i18n.locale === 'vi' ? 'Phân bón' : 'phân bón' }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="f in shopStore.shopFertilizers"
              :key="f.id"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBatchBuyModal(
                  f.name,
                  f.description,
                  discounted(f.price),
                  () => handleBuyItem(f.id, f.price, f.name),
                  () => playerStore.money >= discounted(f.price),
                  count => handleBatchBuyItem(f.id, f.price, f.name, count),
                  () => getMaxBuyable(discounted(f.price)),
                  f.id
                )
              "
                @keydown.enter.prevent="
                openBatchBuyModal(
                  f.name,
                  f.description,
                  discounted(f.price),
                  () => handleBuyItem(f.id, f.price, f.name),
                  () => playerStore.money >= discounted(f.price),
                  count => handleBatchBuyItem(f.id, f.price, f.name, count),
                  () => getMaxBuyable(discounted(f.price)),
                  f.id
                )
              "
                @keydown.space.prevent="
                openBatchBuyModal(
                  f.name,
                  f.description,
                  discounted(f.price),
                  () => handleBuyItem(f.id, f.price, f.name),
                  () => playerStore.money >= discounted(f.price),
                  count => handleBatchBuyItem(f.id, f.price, f.name, count),
                  () => getMaxBuyable(discounted(f.price)),
                  f.id
                )
              "
            >
              <div>
                <p class="text-sm">{{ f.name }}</p>
                <p class="text-muted text-xs">{{ f.description }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ discounted(f.price) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>

          <!-- thuốc thảo dược -->
          <h4 class="text-accent text-sm mb-2 mt-4">
            <Sprout :size="14" class="inline" />
            {{ $i18n.locale === 'vi' ? 'Thảo dược' : 'thuốc thảo dược' }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="item in shopStore.apothecaryItems"
              :key="item.itemId"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBatchBuyModal(
                  item.name,
                  item.description,
                  discounted(item.price),
                  () => handleBuyItem(item.itemId, item.price, item.name),
                  () => playerStore.money >= discounted(item.price),
                  count => handleBatchBuyItem(item.itemId, item.price, item.name, count),
                  () => getMaxBuyable(discounted(item.price)),
                  item.itemId
                )
              "
                @keydown.enter.prevent="
                openBatchBuyModal(
                  item.name,
                  item.description,
                  discounted(item.price),
                  () => handleBuyItem(item.itemId, item.price, item.name),
                  () => playerStore.money >= discounted(item.price),
                  count => handleBatchBuyItem(item.itemId, item.price, item.name, count),
                  () => getMaxBuyable(discounted(item.price)),
                  item.itemId
                )
              "
                @keydown.space.prevent="
                openBatchBuyModal(
                  item.name,
                  item.description,
                  discounted(item.price),
                  () => handleBuyItem(item.itemId, item.price, item.name),
                  () => playerStore.money >= discounted(item.price),
                  count => handleBatchBuyItem(item.itemId, item.price, item.name, count),
                  () => getMaxBuyable(discounted(item.price)),
                  item.itemId
                )
              "
            >
              <div>
                <p class="text-sm">{{ item.name }}</p>
                <p class="text-muted text-xs">{{ item.description }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ discounted(item.price) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>
        </template>

        <!-- ====== 绸缎庄 ====== -->
        <template v-else-if="shopStore.currentShopId === 'chouduanzhuang'">
          <ShopHeader :name="getLocalizedShopName('nishangge', 'Tiệm lụa')" :npc="getLocalizedNpcName('susu')" />

          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="item in shopStore.textileItems"
              :key="item.itemId"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="
                openBatchBuyModal(
                  item.name,
                  item.description,
                  discounted(item.price),
                  () => handleBuyItem(item.itemId, item.price, item.name),
                  () => playerStore.money >= discounted(item.price),
                  count => handleBatchBuyItem(item.itemId, item.price, item.name, count),
                  () => getMaxBuyable(discounted(item.price)),
                  item.itemId
                )
              "
                @keydown.enter.prevent="
                openBatchBuyModal(
                  item.name,
                  item.description,
                  discounted(item.price),
                  () => handleBuyItem(item.itemId, item.price, item.name),
                  () => playerStore.money >= discounted(item.price),
                  count => handleBatchBuyItem(item.itemId, item.price, item.name, count),
                  () => getMaxBuyable(discounted(item.price)),
                  item.itemId
                )
              "
                @keydown.space.prevent="
                openBatchBuyModal(
                  item.name,
                  item.description,
                  discounted(item.price),
                  () => handleBuyItem(item.itemId, item.price, item.name),
                  () => playerStore.money >= discounted(item.price),
                  count => handleBatchBuyItem(item.itemId, item.price, item.name, count),
                  () => getMaxBuyable(discounted(item.price)),
                  item.itemId
                )
              "
            >
              <div>
                <p class="text-sm">{{ item.name }}</p>
                <p class="text-muted text-xs">{{ item.description }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ discounted(item.price) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>

          <!-- 帽子 -->
          <h4 class="text-accent text-sm mb-2 mt-4">
            <Crown :size="14" class="inline" />
            {{ $i18n.locale === 'vi' ? 'Mũ' : 'Mũ' }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="hat in SHOP_HATS"
              :key="hat.id"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="openHatShopModal(hat)"
                @keydown.enter.prevent="openHatShopModal(hat)"
                @keydown.space.prevent="openHatShopModal(hat)"
            >
              <div>
                <p class="text-sm">
                  {{ hat.name }}
                  <span v-if="inventoryStore.hasHat(hat.id)" class="text-success text-xs ml-1">{{ $i18n.locale === 'vi' ? 'Đã sở hữu' : 'Đã sở hữu' }}</span>
                </p>
                <p class="text-muted text-xs">{{ hat.description }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ discounted(hat.shopPrice!) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>

          <!-- 鞋子 -->
          <h4 class="text-accent text-sm mb-2 mt-4">
            <Footprints :size="14" class="inline" />
            {{ $i18n.locale === 'vi' ? 'Giày' : 'Giày' }}
          </h4>
          <div class="flex flex-col space-y-2" role="list">
            <div
                v-for="shoe in SHOP_SHOES"
              :key="shoe.id"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
              @click="openShoeShopModal(shoe)"
                @keydown.enter.prevent="openShoeShopModal(shoe)"
                @keydown.space.prevent="openShoeShopModal(shoe)"
            >
              <div>
                <p class="text-sm">
                  {{ shoe.name }}
                  <span v-if="inventoryStore.hasShoe(shoe.id)" class="text-success text-xs ml-1">{{ $i18n.locale === 'vi' ? 'Đã sở hữu' : 'Đã sở hữu' }}</span>
                </p>
                <p class="text-muted text-xs">{{ shoe.description }}</p>
              </div>
              <span class="text-xs text-accent whitespace-nowrap">{{ discounted(shoe.shopPrice!) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>
        </template>
      </div>

      <!-- 右侧：để bán区 -->
      <div class="flex-1" :class="{ 'hidden md:block': mobileTab === 'buy' }">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-accent text-sm">
            <TrendingUp :size="14" class="inline" />
            {{ $i18n.locale === 'vi' ? 'Vật phẩm bán' : 'mặt hàng để bán' }}
          </h3>
          <div class="flex space-x-1.5">
            <Button
              class="py-0 px-1.5"
              :class="{ '!bg-accent !text-bg': isSellFilterActive }"
              :icon="Filter"
              :icon-size="12"
              @click="openSellFilterModal"
            >
              {{ $i18n.locale === 'vi' ? 'Lọc' : 'Lọc' }}
            </Button>
            <Button v-if="sellableItems.length > 0" class="btn-danger" :icon="Coins" @click="showSellAllConfirm = true">
              {{ $i18n.locale === 'vi' ? 'Bán tất cả' : 'Bán tất cả chỉ bằng một cú nhấp chuột' }}
            </Button>
          </div>
        </div>
        <!-- Tăng giá bán提示 -->
        <p v-if="hasSellBonus" class="text-success text-xs mb-2">{{ $i18n.locale === 'vi' ? 'Hiệu ứng nhẫn: Giá bán tất cả' : 'Tiền thưởng nhẫn: tất cả giá bán' }} +{{ sellBonusPercent }}%</p>

        <!-- Trích dẫn hôm nay -->
        <div class="border border-accent/30 rounded-xs p-2 mb-3">
          <p class="text-[10px] text-muted mb-1">{{ $i18n.locale === 'vi' ? 'Thị trường hôm nay' : 'Trích dẫn hôm nay' }}</p>
          <div class="grid grid-cols-4" role="list"> role="list"
            <span v-for="m in todayMarket" :key="m.category" class="text-[10px] whitespace-nowrap mt-2">
              <span class="text-muted">{{ MARKET_CATEGORY_NAMES[m.category] }}</span>
              <span v-if="m.trend === 'stable'" class="text-muted/40 ml-0.5">—</span>
              <span v-else class="ml-0.5" :class="trendColor(m.trend)">
                {{ m.multiplier >= 1 ? '↑' : '↓' }}{{ Math.round(Math.abs(m.multiplier - 1) * 100) }}%
              </span>
            </span>
          </div>
        </div>
        <div class="flex flex-col space-y-2" role="list">
          <div
                v-for="item in sellableItems"
            :key="item.originalIndex"
            class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 hover:bg-accent/5"
                role="button"
                tabindex="0"
            @click="openSellModal(item.itemId, item.quality, item.originalIndex)"
                @keydown.enter.prevent="openSellModal(item.itemId, item.quality, item.originalIndex)"
                @keydown.space.prevent="openSellModal(item.itemId, item.quality, item.originalIndex)"
          >
            <div>
              <span class="text-sm" :class="qualityTextClass(item.quality)">{{ item.def?.name }}</span>
              <span class="text-muted text-xs ml-1">×{{ item.quantity }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <span class="text-xs text-accent whitespace-nowrap">{{ shopStore.calculateSellPrice(item.itemId, 1, item.quality) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
              <span v-if="getItemTrend(item.itemId) === 'rising' || getItemTrend(item.itemId) === 'boom'" class="text-[10px] text-success">
                ↑{{ Math.round((getItemMultiplier(item.itemId) - 1) * 100) }}%
              </span>
              <span
                v-else-if="getItemTrend(item.itemId) === 'falling' || getItemTrend(item.itemId) === 'crash'"
                class="text-[10px]"
                :class="getItemTrend(item.itemId) === 'crash' ? 'text-danger' : 'text-warning'"
              >
                ↓{{ Math.round((1 - getItemMultiplier(item.itemId)) * 100) }}%
              </span>
            </div>
          </div>
          <div v-if="sellableItems.length === 0" class="flex flex-col items-center justify-center py-4 text-muted">
            <Package :size="100" class="text-muted/30 my-4" />
            <p class="text-xs">{{ $i18n.locale === 'vi' ? 'Trong balo không có vật phẩm có thể bán' : 'Không có vật phẩm để bán trong ba lô' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Cần bán bộ lọc弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showSellFilterModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showSellFilterModal = false"
      >
        <div ref="modalRef_o45x4" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showSellFilterModal = false">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">{{ $i18n.locale === 'vi' ? 'Lọc bán' : 'Cần bán bộ lọc' }}</p>
          <p class="text-[10px] text-muted mb-2">{{ $i18n.locale === 'vi' ? 'Chọn phân loại, không chọn thì sẽ hiển thị tất cả' : 'Chọn các danh mục sẽ được hiển thị. Nếu không được chọn, tất cả sẽ được hiển thị.' }}</p>
          <div class="grid grid-cols-3 gap-1.5 mb-3" :aria-label="$i18n.locale === 'vi' ? 'Bản lọc bán' : 'Cần bán bộ lọc'" role="list">
            <div
                v-for="cat in SELL_FILTER_CATEGORIES"
              :key="cat"
              class="border rounded-xs px-1.5 py-1 text-center text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 transition-colors"
                :class="
                tempSellFilter.has(cat) ? 'border-accent/50 bg-accent/10 text-accent' : 'border-accent/20 text-muted hover:bg-accent/5'
              "
              role="checkbox"
              :aria-checked="tempSellFilter.has(cat)"
              tabindex="0"
              @click="toggleSellCategory(cat)"
              @keydown.enter.prevent="toggleSellCategory(cat)"
              @keydown.space.prevent="toggleSellCategory(cat)"
            >
              {{ SELL_CATEGORY_NAMES[cat] }}
            </div>
          </div>
          <div class="flex space-x-1.5">
            <Button class="flex-1 justify-center" @click="handleClearSellFilter">{{ $i18n.locale === 'vi' ? 'Hiển thị tất cả' : 'Hiển thị tất cả' }}</Button>
            <Button class="flex-1 justify-center !bg-accent !text-bg" @click="handleSaveSellFilter">{{ $i18n.locale === 'vi' ? 'Lưu' : 'lưu lại' }}</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 一键để bán确认弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="showSellAllConfirm"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="showSellAllConfirm = false"
      >
        <div ref="modalRef_wgs1a" class="game-panel max-w-xs w-full" role="dialog" aria-modal="true" tabindex="-1">
          <p class="text-sm text-accent mb-2">{{ $i18n.locale === 'vi' ? 'Xác nhận bán tất cả' : 'Xác nhận bán hàng bằng một cú nhấp chuột' }}</p>
          <p class="text-xs text-muted mb-3">{{ $i18n.locale === 'vi' ? 'Sẽ bán tất cả các vật phẩm không khóa không phải là hạt giống trong balo' : 'Tất cả các vật phẩm không phải hạt giống đã mở khóa trong ba lô của bạn sẽ được bán' }}({{ $i18n.locale === 'vi' ? 'tổng' : 'tổng cộng' }}{{ sellableItems.length }}{{ $i18n.locale === 'vi' ? ' loại' : 'loài' }}),{{ $i18n.locale === 'vi' ? 'xác nhận tiếp tục?' : 'Bạn có chắc chắn tiếp tục không?' }}</p>
          <div class="flex space-x-1.5">
            <Button class="flex-1 justify-center" @click="showSellAllConfirm = false">{{ $i18n.locale === 'vi' ? 'Hủy' : 'Hủy' }}</Button>
            <Button class="flex-1 justify-center btn-danger" :icon="Coins" @click="confirmSellAll">{{ $i18n.locale === 'vi' ? 'Xác nhận bán' : 'Xác nhận bán hàng' }}</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 商品详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="buyModalData || (sellModalData && sellModalItem)"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-40 p-4"
        @click.self="shopModal = null"
      >
        <!-- 购买弹窗 -->
        <div v-if="buyModalData" class="game-panel max-w-xs w-full relative">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="shopModal = null">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2 pr-6">{{ buyModalData.name }}</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ buyModalData.description }}</p>
            <p v-for="(line, i) in buyModalData.extraLines" :key="i" class="text-xs text-muted mt-0.5">{{ line }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ buyModalData.batchBuy ? ($i18n.locale === 'vi' ? 'Đơn giá' : 'Đơn giá') : ($i18n.locale === 'vi' ? 'Giá' : 'Giá') }}</span>
              <span class="text-xs text-accent">{{ buyModalData.price }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
            <div v-if="buyModalData.itemId" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Đang có' : 'Đang có' }}</span>
              <span class="text-xs">{{ inventoryStore.getItemCount(buyModalData.itemId) }}</span>
            </div>
          </div>

          <!-- 批量购买数量选择器 -->
          <div v-if="buyModalData.batchBuy" class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Số lượng' : 'Số lượng' }}</span>
              <div class="flex items-center space-x-1">
                <Button class="h-6 px-1.5 py-0.5 text-xs justify-center" :disabled="buyQuantity <= 1" @click="addBuyQuantity(-1)">-</Button>
                <input
                  type="number"
                  :value="buyQuantity"
                  min="1"
                  :max="maxBuyQuantity"
                  class="w-24 h-6 px-2 py-0.5 bg-bg border border-accent/30 rounded-xs text-xs text-center text-accent outline-none focus:border-accent transition-colors"
                  @input="onBuyQuantityInput"
                />
                <Button
                  class="h-6 px-1.5 py-0.5 text-xs justify-center"
                  :disabled="buyQuantity >= maxBuyQuantity"
                  @click="addBuyQuantity(1)"
                >
                  +
                </Button>
              </div>
            </div>
            <div class="flex space-x-1">
              <Button class="flex-1 justify-center" :disabled="buyQuantity <= 1" @click="setBuyQuantity(1)">{{ $i18n.locale === 'vi' ? 'Ít nhất' : 'Ít nhất' }}</Button>
              <Button class="flex-1 justify-center" :disabled="buyQuantity >= maxBuyQuantity" @click="setBuyQuantity(maxBuyQuantity)">
                {{ $i18n.locale === 'vi' ? 'Nhiều nhất' : 'Nhiều nhất' }}
              </Button>
            </div>
            <div class="flex items-center justify-between mt-1.5">
              <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Tổng giá' : 'tổng giá' }}</span>
              <span class="text-xs text-accent">{{ buyTotalPrice }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>

          <div class="flex flex-col space-y-1.5" role="list">
            <Button
              v-if="buyModalData.batchBuy"
              class="w-full justify-center"
              :class="{ '!bg-accent !text-bg': buyModalData.canBuy() }"
              :disabled="!buyModalData.canBuy()"
              :icon="ShoppingCart"
              @click="buyModalData.batchBuy!.onBuy(buyQuantity)"
            >
              {{ $i18n.locale === 'vi' ? 'Mua' : 'Mua' }} ×{{ buyQuantity }}
            </Button>
            <Button
              v-else
              class="w-full justify-center"
              :class="{ '!bg-accent !text-bg': buyModalData.canBuy() }"
              :disabled="!buyModalData.canBuy()"
              :icon="buyModalData.buttonText ? Hammer : ShoppingCart"
              @click="buyModalData.onBuy()"
            >
              {{ buyModalData.buttonText ?? ($i18n.locale === 'vi' ? 'Mua' : 'Mua') }}
            </Button>
          </div>
        </div>

        <!-- để bán弹窗 -->
        <div v-else-if="sellModalData && sellModalItem && sellModalDef" class="game-panel max-w-xs w-full relative">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="shopModal = null">
            <X :size="14" />
          </button>
          <p class="text-sm mb-2 pr-6" :class="qualityTextClass(sellModalItem.quality, 'text-accent')">
            {{ sellModalDef.name }}
          </p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ sellModalDef.description }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Số lượng' : 'Số lượng' }}</span>
              <span class="text-xs">×{{ sellModalItem.quantity }}</span>
            </div>
            <div v-if="sellModalItem.quality !== 'normal'" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Chất lượng' : 'Phẩm chất' }}</span>
              <span class="text-xs" :class="qualityTextClass(sellModalItem.quality)">{{ QUALITY_NAMES[sellModalItem.quality] }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Giá bán' : 'Giá bán' }}</span>
              <span class="text-xs flex items-center space-x-1">
                <span
                  v-if="getItemTrend(sellModalData!.itemId) && getItemTrend(sellModalData!.itemId) !== 'stable'"
                  class="line-through text-muted/40"
                >
                  {{ shopStore.calculateBaseSellPrice(sellModalData!.itemId, 1, sellModalData!.quality) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}
                </span>
                <span class="text-accent">{{ shopStore.calculateSellPrice(sellModalData!.itemId, 1, sellModalData!.quality) }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
              </span>
            </div>
            <div
              v-if="getItemTrend(sellModalData!.itemId) && getItemTrend(sellModalData!.itemId) !== 'stable'"
              class="flex items-center justify-between mt-0.5"
            >
              <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Thị trường' : 'Báo giá' }}</span>
              <span class="text-xs" :class="trendColor(getItemTrend(sellModalData!.itemId)!)">
                {{ TREND_NAMES[getItemTrend(sellModalData!.itemId)!] }} ×{{ getItemMultiplier(sellModalData!.itemId) }}
              </span>
            </div>
            <div v-if="hasSellBonus" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Hiệu ứng nhẫn' : 'Phần thưởng nhẫn' }}</span>
              <span class="text-xs text-success">+{{ sellBonusPercent }}%</span>
            </div>
          </div>

          <!-- 数量选择器(物品数量>1时显示） -->
          <div v-if="sellModalItem.quantity > 1" class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'S.L Bán' : 'Số lượng bán' }}</span>
              <div class="flex items-center space-x-1">
                <Button class="h-6 px-1.5 py-0.5 text-xs justify-center" :disabled="sellQuantity <= 1" @click="addSellQuantity(-1)">
                  -
                </Button>
                <input
                  type="number"
                  :value="sellQuantity"
                  min="1"
                  :max="maxSellQuantity"
                  class="w-24 h-6 px-2 py-0.5 bg-bg border border-accent/30 rounded-xs text-xs text-center text-accent outline-none focus:border-accent transition-colors"
                  @input="onSellQuantityInput"
                />
                <Button
                  class="h-6 px-1.5 py-0.5 text-xs justify-center"
                  :disabled="sellQuantity >= maxSellQuantity"
                  @click="addSellQuantity(1)"
                >
                  +
                </Button>
              </div>
            </div>
            <div class="flex space-x-1">
              <Button class="flex-1 justify-center" :disabled="sellQuantity <= 1" @click="setSellQuantity(1)">{{ $i18n.locale === 'vi' ? 'Ít nhất' : 'Ít nhất' }}</Button>
              <Button class="flex-1 justify-center" :disabled="sellQuantity >= maxSellQuantity" @click="setSellQuantity(maxSellQuantity)">
                {{ $i18n.locale === 'vi' ? 'Nhiều nhất' : 'Nhiều nhất' }}
              </Button>
            </div>
            <div class="flex items-center justify-between mt-1.5">
              <span class="text-xs text-muted">{{ $i18n.locale === 'vi' ? 'Tổng giá' : 'tổng giá' }}</span>
              <span class="text-xs text-accent">{{ sellTotalPrice }}{{ $i18n.locale === 'vi' ? ' xu' : ' xu' }}</span>
            </div>
          </div>

          <div class="flex flex-col space-y-1.5" role="list">
            <Button class="w-full justify-center" :icon="Coins" @click="handleModalSell(sellQuantity)">{{ $i18n.locale === 'vi' ? 'Bán' : 'để bán' }} ×{{ sellQuantity }}</Button>
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
    ShoppingCart,
    Coins,
    Sprout,
    Package,
    TrendingUp,
    Fish,
    Leaf,
    Sword,
    MapPin,
    ChevronRight,
    ChevronLeft,
    Store,
    CircleDot,
    Hammer,
    X,
    Crown,
    Footprints,
    Filter
  } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import { useFarmStore } from '@/stores/useFarmStore'
  import { useGameStore, SEASON_NAMES } from '@/stores/useGameStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { useShopStore } from '@/stores/useShopStore'
  import { useWalletStore } from '@/stores/useWalletStore'
  import { useWarehouseStore } from '@/stores/useWarehouseStore'
  import { getItemById } from '@/data'
  import { getCropBySeedId } from '@/data/crops'
  import { SHOPS, isShopAvailable, getShopClosedReason } from '@/data/shops'
  import type { ShopDef } from '@/data/shops'
  import { SHOP_WEAPONS, WEAPON_TYPE_NAMES } from '@/data/weapons'
  import type { WeaponDef, RingDef, RingEffectType, Season, Quality, HatDef, ShoeDef, ItemCategory } from '@/types'
  import { FRUIT_TREE_DEFS } from '@/data/fruitTrees'
  import { CRAFTABLE_RINGS } from '@/data/rings'
  import { SHOP_HATS, CRAFTABLE_HATS } from '@/data/hats'
  import { SHOP_SHOES, CRAFTABLE_SHOES } from '@/data/shoes'
  import { HAY_PRICE } from '@/data/animals'
  import { addLog } from '@/composables/useGameLog'
  import { sfxBuy } from '@/composables/useAudio'
  import { showFloat } from '@/composables/useGameLog'
  import { handleBuySeed, handleSellItem, handleSellItemAll, handleSellAll, QUALITY_NAMES } from '@/composables/useFarmActions'
  import { getDailyMarketInfo, MARKET_CATEGORY_NAMES, TREND_NAMES } from '@/data/market'
  import type { MarketTrend } from '@/data/market'
  import { useTutorialStore } from '@/stores/useTutorialStore'
  import { useAchievementStore } from '@/stores/useAchievementStore'
  import i18n from '@/locales'


  const modalRef_o45x4 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_o45x4);
  const modalRef_wgs1a = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_wgs1a);



  const getLocalizedShopName = (shopId: string, defaultName: string): string => {
    if (i18n.global.locale.value === 'vi') {
      const map: Record<string, string> = {
        'wanwupu': 'Tiệm Vạn Vật',
        'tiejiangpu': 'Tiệm Rèn',
        'biaoju': 'Tiêu Cục',
        'buyugu': 'Ngư Cụ Các',
        'baicaotang': 'Bách Thảo Đường',
        'nishangge': 'Nghê Thường Các'
      }
      return map[shopId] || defaultName
    }
    return defaultName
  }

  const getLocalizedNpcName = (npcName: string): string => {
    if (i18n.global.locale.value === 'vi') {
      const map: Record<string, string> = {
        'chú Trần': 'Trần bá',
        'Tôn Thiết Giang': 'Tôn thợ rèn',
        'Vân Phi': 'Vân Phi',
        'Ahai': 'A Hải',
        'bác sĩ Xue': 'Tiết đại phu',
        'thợ may lu': 'La thợ may',
        'Thu Nguyệt': 'Thu Nguyệt',
        'Ông Lâm': 'Lâm lão',
        'susu': 'Tố Tố'
      }
      return map[npcName] || npcName
    }
    return npcName
  }

  const getLocalizedItemName = (name: string, itemId: string): string => {
    if (i18n.global.locale.value === 'vi') {
      const map: Record<string, string> = {
        'củ cải vàng': 'Cải bắp',
        'hạt giống rau mùi tây': 'Hạt giống cải bắp',
        'củ cải trắng': 'Củ cải trắng',
        'Hạt củ cải trắng': 'Hạt giống củ cải trắng',
        'khoai tây': 'Khoai tây',
        'hạt khoai tây': 'Hạt giống khoai tây',
        'cỏ khô': 'Cỏ khô',
        'gỗ': 'Gỗ',
        'vật tổ mưa': 'Linh tượng mưa',
        // 'vật tổ mưa': 'Linh tượng mưa',
        'Sản phẩm hoang dã mùa xuân': 'Sản vật dã sinh mùa xuân',
        'Sản phẩm hoang dã mùa hè': 'Sản vật dã sinh mùa hè',
        'Sản phẩm hoang dã mùa thu': 'Sản vật dã sinh mùa thu',
        'Sản phẩm hoang dã mùa đông': 'Sản vật dã sinh mùa đông',
        'Quặng đồng': 'Quặng đồng',
        'Quặng sắt': 'Quặng sắt',
        'Than': 'Than đá',
        'Quặng vàng': 'Quặng vàng',
        'Quặng Iridium': 'Quặng iridi',
        'Đá': 'Đá',
        'Thuốc thú y': 'Thuốc thú y',
        'Kháng sinh': 'Kháng sinh',
        'Vắc xin': 'Vắc-xin',
        'kháng sinh tiên tiến': 'Kháng sinh cao cấp',
        'Kháng sinh cực mạnh': 'Kháng sinh cực hiệu',
        'Mở rộng ba lô': 'Mở rộng túi đeo',
        'Mở rộng kho hàng': 'Mở rộng nhà kho',
        'mở rộng trang trại': 'Mở rộng điền trang',
        'Cây Đào': 'Đào',
        'Cây Vải': 'Vải',
        'Cây Quýt': 'Quýt',
        'Cây Mai': 'Mai',
        'Cây Hạnh': 'Mơ',
        'Cây Lựu': 'Lựu',
        'Cây Hồng': 'Hồng',
        'Cây Sơn trà': 'Sơn tra'
      }
      if (map[name]) return map[name]
      if (name.endsWith('hạt giống')) {
        const crop = name.replace('hạt giống', '')
        const viCrop = map[crop] || crop
        return `Hạt giống ${viCrop}`
      }
      if (name.endsWith('cây non')) {
        const tree = name.replace('cây non', '')
        const viTree = map[tree] || tree
        return `Cây giống ${viTree}`
      }
      if (name.endsWith('cây giống')) {
        const tree = name.replace('cây giống', '')
        const viTree = map[tree] || tree
        return `Cây giống ${viTree}`
      }
      return map[name] || name
    }
    return name
  }

  const getLocalizedItemDesc = (desc: string, itemId: string): string => {
    if (i18n.global.locale.value === 'vi') {
      const map: Record<string, string> = {
        'hay': 'Dùng làm thức ăn cho gia súc gia cầm.',
        'wood': 'Nguyên liệu cơ bản để chế tạo và nâng cấp xây dựng.',
        'rain_totem': 'Kích hoạt tượng thần để gọi mưa vào ngày hôm sau.',
        'coal': 'Chất đốt và vật liệu luyện kim.'
      }
      if (map[itemId]) return map[itemId]

      if (desc.includes('hiện tại') && desc.includes('lưới → ')) {
        const cleaned = desc.replace('hiện tại', '').replace(/lưới/g, '')
        const parts = cleaned.split('→')
        if (parts.length === 2) {
          return `Hiện tại ${parts[0].trim()} ô → ${parts[1].trim()} ô`
        }
      }
      if (desc.includes('khe ngực')) {
        const cleaned = desc.replace('khe ngực', '')
        const parts = cleaned.split('→')
        if (parts.length === 2) {
          return `Hầm chứa hòm ${parts[0].trim()} → ${parts[1].trim()}`
        }
      }
      if (desc.includes('trưởng thành') && desc.includes('Sản phẩm theo mùa')) {
        let res = desc
        res = res.replace('28trưởng thành', '28 ngày chín')
        res = res.replace('Sản xuất mùa xuân', ' · Mùa xuân sản xuất ')
        res = res.replace('sản xuất vào mùa hè', ' · Mùa hạ sản xuất ')
        res = res.replace('sản xuất mùa thu', ' · Mùa thu sản xuất ')
        res = res.replace('sản xuất vào mùa đông', ' · Mùa đông sản xuất ')
        res = res.replace('đào tươi', 'Đào tươi')
        res = res.replace('vải thiều', 'quả Vải')
        res = res.replace('trái cam', 'Quýt')
        res = res.replace('hoa mận', 'Hoa mai')
        res = res.replace('quả mơ', 'Mơ')
        res = res.replace('quả lựu', 'Lựu')
        res = res.replace('hồng tươi', 'Hồng tươi')
        res = res.replace('táo gai', 'Sơn tra')
        return res
      }
      return map[itemId] || desc
    }
    return desc
  }

  const getLocalizedClosedReason = (reason: string): string => {
    if (i18n.global.locale.value === 'vi') {
      if (reason === 'Đóng cửa mùa này') return 'Nghỉ vụ này'
      if (reason === 'Đóng cửa do thời tiết') return 'Nghỉ vì thời tiết'
      if (reason === 'Hôm nay nghỉ ngơi') return 'Hôm nay nghỉ'
      if (reason.endsWith('Bấm để mở cửa')) {
        const hour = reason.replace('Bấm để mở cửa', '')
        return `Mở cửa lúc ${hour}h`
      }
      if (reason === 'Đã đóng') return 'Đã đóng cửa'
    }
    return reason
  }

  const getLocalizedSeasonName = (season: string): string => {
    if (i18n.global.locale.value === 'vi') {
      const map: Record<string, string> = {
        'spring': 'Xuân',
        'summer': 'Hạ',
        'autumn': 'Thu',
        'winter': 'Đông'
      }
      return map[season] || season
    }
    return SEASON_NAMES[season as Season] || season
  }

  const getLocalizedSeedDesc = (seed: any): string => {
    if (i18n.global.locale.value === 'vi') {
      const seasonStr = seed.season.map((s: string) => getLocalizedSeasonName(s)).join('/')
      const regrowthStr = seed.regrowth ? ` · mỗi ${seed.regrowthDays} ngày ra vụ` : ''
      return `Vụ ${seasonStr} · ${seed.growthDays} ngày chín${regrowthStr} → bán ${seed.sellPrice} xu`
    }
    return `${seed.season.map((s: any) => SEASON_NAMES[s as keyof typeof SEASON_NAMES]).join('/')}mùa · ${seed.growthDays}trưởng thành → để bán${seed.sellPrice}văn bản`
  }

  const RAIN_TOTEM_PRICE = 300
  const WOOD_PRICE = 50

  const shopStore = useShopStore()
  const playerStore = usePlayerStore()
  const inventoryStore = useInventoryStore()
  const farmStore = useFarmStore()
  const warehouseStore = useWarehouseStore()
  const walletStore = useWalletStore()
  const gameStore = useGameStore()
  const tutorialStore = useTutorialStore()
  const achievementStore = useAchievementStore()

  const tutorialHint = computed(() => {
    if (!tutorialStore.enabled || gameStore.year > 1) return null
    if (achievementStore.stats.totalCropsHarvested === 0) return 'Wanwupu bán nhiều loại hạt giống và sau khi mua sẽ đến trang trại để trồng. Bạn có thể chuyển đổi ở trên cùng「Mua」và「bán」.'
    return null
  })

  // === Báo giá系统 ===

  const todayMarket = computed(() =>
    getDailyMarketInfo(gameStore.year, gameStore.seasonIndex, gameStore.day, shopStore.getRecentShipping())
  )

  const getItemTrend = (itemId: string): MarketTrend | null => {
    const def = getItemById(itemId)
    if (!def) return null
    const info = todayMarket.value.find(m => m.category === def.category)
    return info?.trend ?? null
  }

  const getItemMultiplier = (itemId: string): number => {
    const def = getItemById(itemId)
    if (!def) return 1
    return todayMarket.value.find(m => m.category === def.category)?.multiplier ?? 1
  }

  const trendColor = (trend: MarketTrend): string => {
    if (trend === 'boom') return 'text-danger'
    if (trend === 'rising') return 'text-success'
    if (trend === 'falling') return 'text-warning'
    if (trend === 'crash') return 'text-danger'
    return 'text-muted/40'
  }

  // 每次进入商圈页面，重置到商圈总览(避免跳过营业时间检查）
  shopStore.currentShopId = null

  // === 移动端切换 ===

  const mobileTab = ref<'buy' | 'sell'>('buy')

  // === 一键để bán确认 ===

  const showSellAllConfirm = ref(false)

  const confirmSellAll = () => {
    showSellAllConfirm.value = false
    handleSellAll(sellFilter.value)
  }

  // === 弹窗系统 ===

  type BuyModalState = {
    type: 'buy'
    name: string
    description: string
    price: number
    onBuy: () => void
    canBuy: () => boolean
    extraLines?: string[]
    buttonText?: string
    itemId?: string
    batchBuy?: {
      onBuy: (count: number) => void
      maxCount: () => number
    }
  }

  type SellModalState = {
    type: 'sell'
    itemId: string
    quality: Quality
    inventoryIndex: number
  }

  const shopModal = ref<BuyModalState | SellModalState | null>(null)

  const buyModalData = computed(() => {
    if (!shopModal.value || shopModal.value.type !== 'buy') return null
    return shopModal.value
  })

  const sellModalData = computed(() => {
    if (!shopModal.value || shopModal.value.type !== 'sell') return null
    return shopModal.value
  })

  const sellModalItem = computed(() => {
    const data = sellModalData.value
    if (!data) return null
    const item = inventoryStore.items[data.inventoryIndex]
    if (item && item.itemId === data.itemId && item.quality === data.quality) return item
    return inventoryStore.items.find(i => i.itemId === data.itemId && i.quality === data.quality) ?? null
  })

  const sellModalDef = computed(() => {
    const data = sellModalData.value
    if (!data) return null
    return getItemById(data.itemId) ?? null
  })

  const buyQuantity = ref(1)

  const buyTotalPrice = computed(() => {
    if (!buyModalData.value) return 0
    return buyModalData.value.price * buyQuantity.value
  })

  const maxBuyQuantity = computed(() => {
    if (!buyModalData.value?.batchBuy) return 1
    return Math.max(1, buyModalData.value.batchBuy.maxCount())
  })

  const setBuyQuantity = (val: number) => {
    buyQuantity.value = Math.max(1, Math.min(val, maxBuyQuantity.value))
  }

  const addBuyQuantity = (delta: number) => {
    setBuyQuantity(buyQuantity.value + delta)
  }

  const onBuyQuantityInput = (e: Event) => {
    const val = parseInt((e.target as HTMLInputElement).value, 10)
    if (!isNaN(val)) setBuyQuantity(val)
  }

  const getMaxBuyable = (unitPrice: number, stockLimit?: number): number => {
    const affordable = unitPrice > 0 ? Math.floor(playerStore.money / unitPrice) : 0
    let max = Math.max(1, affordable)
    if (stockLimit !== undefined) max = Math.min(max, stockLimit)
    return Math.min(max, 999)
  }

  const openBuyModal = (
    name: string,
    description: string,
    price: number,
    onBuy: () => void,
    canBuy: () => boolean,
    extraLines?: string[],
    buttonText?: string,
    itemId?: string
  ) => {
    shopModal.value = { type: 'buy', name, description, price, onBuy, canBuy, extraLines, buttonText, itemId }
  }

  const openBatchBuyModal = (
    name: string,
    description: string,
    unitPrice: number,
    onBuySingle: () => void,
    canBuy: () => boolean,
    batchOnBuy: (count: number) => void,
    batchMaxCount: () => number,
    itemId?: string
  ) => {
    buyQuantity.value = 1
    shopModal.value = {
      type: 'buy',
      name,
      description,
      price: unitPrice,
      onBuy: onBuySingle,
      canBuy,
      batchBuy: { onBuy: batchOnBuy, maxCount: batchMaxCount },
      itemId
    }
  }

  const sellQuantity = ref(1)

  const sellUnitPrice = computed(() => {
    const data = sellModalData.value
    if (!data) return 0
    return shopStore.calculateSellPrice(data.itemId, 1, data.quality)
  })

  const sellTotalPrice = computed(() => {
    return sellUnitPrice.value * sellQuantity.value
  })

  const maxSellQuantity = computed(() => {
    const item = sellModalItem.value
    if (!item) return 1
    return item.quantity
  })

  const setSellQuantity = (val: number) => {
    sellQuantity.value = Math.max(1, Math.min(val, maxSellQuantity.value))
  }

  const addSellQuantity = (delta: number) => {
    setSellQuantity(sellQuantity.value + delta)
  }

  const onSellQuantityInput = (e: Event) => {
    const val = parseInt((e.target as HTMLInputElement).value, 10)
    if (!isNaN(val)) setSellQuantity(val)
  }

  const openSellModal = (itemId: string, quality: Quality, inventoryIndex: number) => {
    sellQuantity.value = 1
    shopModal.value = { type: 'sell', itemId, quality, inventoryIndex }
  }

  const openWeaponModal = (w: WeaponDef) => {
    const lines = [`${WEAPON_TYPE_NAMES[w.type]} · tấn công${w.attack} · đòn chí mạng${Math.round(w.critRate * 100)}%`]
    if (w.shopMaterials.length > 0) {
      lines.push('Vật liệu cần thiết:' + w.shopMaterials.map(m => `${getItemById(m.itemId)?.name ?? m.itemId}×${m.quantity}`).join(','))
    }
    openBuyModal(
      w.name,
      w.description,
      discounted(w.shopPrice!),
      () => handleBuyWeapon(w),
      () => !inventoryStore.hasWeapon(w.id) && playerStore.money >= discounted(w.shopPrice!) && hasWeaponMaterials(w),
      lines
    )
  }

  const openRingModal = (ring: RingDef) => {
    const lines = [
      (i18n.global.locale.value === 'vi' ? 'Hiệu quả: ' : 'Hiệu ứng:') +
        ring.effects
          .map(eff => RING_EFFECT_LABELS[eff.type] + (eff.value > 0 && eff.value < 1 ? Math.round(eff.value * 100) + '%' : '+' + eff.value))
          .join(','),
      (i18n.global.locale.value === 'vi' ? 'Vật liệu: ' : 'Chất liệu:') +
        (ring.recipe?.map(m => `${getItemById(m.itemId)?.name ?? m.itemId}×${m.quantity}`).join(',') ?? '') +
        i18n.global.locale.value === 'vi' ? ` + ${ring.recipeMoney} xu` : i18n.global.locale.value === 'vi' ? ` + ${ring.recipeMoney} xu` : ` + ${ring.recipeMoney}văn bản`
    ]
    openBuyModal(
      ring.name,
      ring.description,
      ring.recipeMoney,
      () => handleCraftRing(ring.id),
      () => canCraftRing(ring),
      lines,
      'tổng hợp'
    )
  }

  const handleModalSell = (count: number) => {
    const modal = shopModal.value
    if (!modal || modal.type !== 'sell') return
    if (count === 1) {
      handleSellItem(modal.itemId, modal.quality)
    } else {
      handleSellItemAll(modal.itemId, count, modal.quality)
    }
    // 物品消耗完则关闭弹窗，否则修正Số lượng bán
    const remaining = inventoryStore.items.find(i => i.itemId === modal.itemId && i.quality === modal.quality)
    if (!remaining) {
      shopModal.value = null
    } else if (sellQuantity.value > remaining.quantity) {
      sellQuantity.value = remaining.quantity
    }
  }

  // === 折扣系统 ===

  const hasDiscount = computed(() => walletStore.getShopDiscount() > 0 || inventoryStore.getRingEffectValue('shop_discount') > 0)
  const discountPercent = computed(() => {
    const w = walletStore.getShopDiscount()
    const r = inventoryStore.getRingEffectValue('shop_discount')
    return Math.round((1 - (1 - w) * (1 - r)) * 100)
  })

  const discounted = (price: number): number => {
    const walletDiscount = walletStore.getShopDiscount()
    const ringDiscount = inventoryStore.getRingEffectValue('shop_discount')
    return Math.floor(price * (1 - walletDiscount) * (1 - ringDiscount))
  }

  // === Tăng giá bán ===

  const hasSellBonus = computed(() => inventoryStore.getRingEffectValue('sell_price_bonus') > 0)
  const sellBonusPercent = computed(() => Math.round(inventoryStore.getRingEffectValue('sell_price_bonus') * 100))

  // === 商铺开放状态 ===

  const isOpen = (shop: ShopDef): boolean => {
    return isShopAvailable(shop, gameStore.day, gameStore.hour, gameStore.weather, gameStore.season)
  }

  const closedReason = (shop: ShopDef): string => {
    return getShopClosedReason(shop, gameStore.day, gameStore.hour, gameStore.weather, gameStore.season)
  }

  const enterShop = (shopId: string) => {
    shopStore.currentShopId = shopId
  }

  // === 旅行商人 ===

  if (shopStore.isMerchantHere) {
    shopStore.refreshMerchantStock()
  }

  const handleBuyFromTraveler = (itemId: string, name: string, originalPrice: number) => {
    const actualPrice = discounted(originalPrice)
    if (shopStore.buyFromTraveler(itemId)) {
      sfxBuy()
      showFloat(`-${actualPrice}văn bản`, 'danger')
      addLog(`Mua từ thương gia du lịch${name}.(-${actualPrice}văn bản)`)
    } else {
      addLog('Không đủ tiền hoặc ba lô đã đầy.')
    }
  }

  // === 万物铺 ===

  const bagPrice = computed(() => {
    const level = (inventoryStore.capacity - 24) / 4
    return 500 + level * 500
  })

  const farmExpandInfo = computed(() => {
    const prices: Record<number, { newSize: number; price: number }> = {
      4: { newSize: 6, price: 2000 },
      6: { newSize: 8, price: 5000 }
    }
    if (gameStore.farmMapType === 'standard') {
      prices[8] = { newSize: 10, price: 10000 }
    }
    return prices[farmStore.farmSize] ?? null
  })

  const handleBuyBag = () => {
    const actualPrice = discounted(bagPrice.value)
    if (!playerStore.spendMoney(actualPrice)) {
      addLog('Không đủ tiền đồng.')
      return
    }
    if (inventoryStore.expandCapacity()) {
      addLog(`Dung lượng ba lô được mở rộng đến${inventoryStore.capacity}Lưới!(-${actualPrice}văn bản)`)
    } else {
      playerStore.earnMoney(actualPrice)
      addLog('Ba lô đã được sử dụng tối đa.')
    }
  }

  const warehouseExpandPrice = computed(() => {
    const level = warehouseStore.maxChests - 3
    return 2000 + level * 2000
  })

  const handleBuyWarehouseExpand = () => {
    const actualPrice = discounted(warehouseExpandPrice.value)
    if (!playerStore.spendMoney(actualPrice)) {
      addLog('Không đủ tiền đồng.')
      return
    }
    if (warehouseStore.expandMaxChests()) {
      addLog(`Kho hàng được mở rộng${warehouseStore.maxChests}Một khe hộp!(-${actualPrice}văn bản)`)
    } else {
      playerStore.earnMoney(actualPrice)
      addLog('Kho đã ở mức đầy đủ.')
    }
  }

  const handleBuyFarmExpand = () => {
    const info = farmExpandInfo.value
    if (!info) return
    const actualPrice = discounted(info.price)
    if (!playerStore.spendMoney(actualPrice)) {
      addLog('Không đủ tiền đồng.')
      return
    }
    const newSize = farmStore.expandFarm()
    if (newSize) {
      addLog(`Trang trại được mở rộng đến${newSize}×${newSize}!(-${actualPrice}văn bản)`)
    } else {
      playerStore.earnMoney(actualPrice)
      addLog('Trang trại đã đạt mức tối đa.')
    }
  }

  const seasonName = (season: Season): string => {
    return SEASON_NAMES[season] ?? season
  }

  const getTravelerItemDesc = (itemId: string, quantity: number): string => {
    const crop = getCropBySeedId(itemId)
    if (crop) {
      return `${crop.season.map(s => SEASON_NAMES[s]).join('/')}mùa · ${crop.growthDays}trưởng thành · Còn lại${quantity}một`
    }
    return i18n.global.locale.value === 'vi' ? `Còn ${quantity} cái` : `Còn lại${quantity}một`
  }

  const handleBuySapling = (saplingId: string, price: number, treeName: string) => {
    const actualPrice = discounted(price)
    if (!playerStore.spendMoney(actualPrice)) {
      addLog('Không đủ tiền đồng.')
      return
    }
    if (!inventoryStore.addItem(saplingId)) {
      playerStore.earnMoney(actualPrice)
      addLog('Ba lô đã đầy và không thể mua được.')
      return
    }
    addLog(`đã mua${treeName}Cây con.(-${actualPrice}văn bản)`)
  }

  const handleBuyHay = () => {
    const actualPrice = discounted(HAY_PRICE)
    if (!playerStore.spendMoney(actualPrice)) {
      addLog('Không đủ tiền đồng.')
      return
    }
    if (!inventoryStore.addItem('hay')) {
      playerStore.earnMoney(actualPrice)
      addLog('Ba lô đã đầy và không thể mua được.')
      return
    }
    addLog(`Hay đã được mua.(-${actualPrice}văn bản)`)
  }

  // === 批量购买处理 ===

  const handleBatchBuySeed = (seedId: string, count: number) => {
    const seed = shopStore.availableSeeds.find(s => s.seedId === seedId)
    if (!seed) return
    const unitPrice = discounted(seed.price)
    if (shopStore.buySeed(seedId, count)) {
      sfxBuy()
      showFloat(`-${unitPrice * count}văn bản`, 'danger')
      addLog(`đã mua${count}một${seed.cropName}hạt giống.(-${unitPrice * count}văn bản)`)
    } else {
      addLog('Không đủ tiền hoặc ba lô đã đầy.')
    }
  }

  const handleBatchBuyItem = (itemId: string, price: number, name: string, count: number) => {
    const unitPrice = discounted(price)
    if (shopStore.buyItem(itemId, price, count)) {
      sfxBuy()
      showFloat(`-${unitPrice * count}văn bản`, 'danger')
      addLog(`đã mua${count}một${name}.(-${unitPrice * count}văn bản)`)
    } else {
      addLog('Không đủ tiền hoặc ba lô đã đầy.')
    }
  }

  const handleBatchBuySapling = (saplingId: string, price: number, treeName: string, count: number) => {
    const unitPrice = discounted(price)
    let bought = 0
    for (let i = 0; i < count; i++) {
      if (!playerStore.spendMoney(unitPrice)) break
      if (!inventoryStore.addItem(saplingId)) {
        playerStore.earnMoney(unitPrice)
        break
      }
      bought++
    }
    if (bought > 0) {
      sfxBuy()
      showFloat(`-${unitPrice * bought}văn bản`, 'danger')
      addLog(`đã mua${bought}một${treeName}Cây con.(-${unitPrice * bought}văn bản)`)
    } else {
      addLog('Không đủ tiền hoặc ba lô đã đầy.')
    }
  }

  const handleBatchBuyFromTraveler = (itemId: string, name: string, originalPrice: number, count: number) => {
    const unitPrice = discounted(originalPrice)
    let bought = 0
    for (let i = 0; i < count; i++) {
      if (!shopStore.buyFromTraveler(itemId)) break
      bought++
    }
    if (bought > 0) {
      sfxBuy()
      showFloat(`-${unitPrice * bought}văn bản`, 'danger')
      addLog(`Mua từ thương gia du lịch${bought}một${name}.(-${unitPrice * bought}văn bản)`)
    } else {
      addLog('Không đủ tiền hoặc ba lô đã đầy.')
    }
  }

  // === 镖局 ===

  const hasWeaponMaterials = (w: WeaponDef): boolean => {
    for (const mat of w.shopMaterials) {
      if (inventoryStore.getItemCount(mat.itemId) < mat.quantity) return false
    }
    return true
  }

  const handleBuyWeapon = (w: WeaponDef) => {
    if (inventoryStore.hasWeapon(w.id)) {
      addLog('Bạn đã có vũ khí này.')
      return
    }
    if (w.shopPrice === null) return
    const actualPrice = discounted(w.shopPrice)
    if (!playerStore.spendMoney(actualPrice)) {
      addLog('Không đủ tiền đồng.')
      return
    }
    for (const mat of w.shopMaterials) {
      if (!inventoryStore.removeItem(mat.itemId, mat.quantity)) {
        playerStore.earnMoney(actualPrice)
        addLog('Không đủ vật liệu.')
        return
      }
    }
    inventoryStore.addWeapon(w.id)
    const matStr =
      w.shopMaterials.length > 0 ? ' + ' + w.shopMaterials.map(m => `${getItemById(m.itemId)?.name}×${m.quantity}`).join(' + ') : ''
    addLog(`đã mua${w.name}.(-${actualPrice}văn bản${matStr})`)
  }

  // === Tổng hợp vòng ===

  const RING_EFFECT_LABELS: Record<RingEffectType, string> = {
    attack_bonus: i18n.global.locale.value === 'vi' ? 'Công' : 'Công',
    crit_rate_bonus: i18n.global.locale.value === 'vi' ? 'Bạo kích' : 'Bạo kích',
    defense_bonus: i18n.global.locale.value === 'vi' ? 'Giảm sát thương' : 'Giảm sát thương',
    vampiric: i18n.global.locale.value === 'vi' ? 'Hút máu' : 'Ma cà rồng',
    max_hp_bonus: i18n.global.locale.value === 'vi' ? 'Máu' : 'HP',
    stamina_reduction: i18n.global.locale.value === 'vi' ? 'Giảm tiêu hao thể lực' : 'Giảm sức chịu đựng toàn cầu',
    mining_stamina: i18n.global.locale.value === 'vi' ? 'Giảm thể lực đào mỏ' : 'Khai thác giảm thể lực',
    farming_stamina: i18n.global.locale.value === 'vi' ? 'Giảm thể lực làm nông' : 'Giảm thể lực khi farm',
    fishing_stamina: i18n.global.locale.value === 'vi' ? 'Giảm thể lực câu cá' : 'Giảm sức chịu đựng khi câu cá',
    crop_quality_bonus: i18n.global.locale.value === 'vi' ? 'Chất lượng nông sản' : 'chất lượng cây trồng',
    crop_growth_bonus: i18n.global.locale.value === 'vi' ? 'Tăng tốc phát triển' : 'tăng tốc tăng trưởng',
    fish_quality_bonus: i18n.global.locale.value === 'vi' ? 'Chất lượng cá' : 'chất lượng cá',
    fishing_calm: i18n.global.locale.value === 'vi' ? 'Giảm tốc độ cá' : 'tốc độ cá giảm',
    sell_price_bonus: i18n.global.locale.value === 'vi' ? 'Tăng giá bán' : 'Tăng giá bán',
    shop_discount: i18n.global.locale.value === 'vi' ? 'Giảm giá cửa hàng' : 'cửa hàng giảm giá',
    gift_friendship: i18n.global.locale.value === 'vi' ? 'Độ hảo cảm quà tặng' : 'Thiện chí như một món quà',
    monster_drop_bonus: i18n.global.locale.value === 'vi' ? 'Rớt đồ quái vật' : 'Giọt quái vật',
    exp_bonus: i18n.global.locale.value === 'vi' ? 'Tăng kinh nghiệm' : 'tiền thưởng kinh nghiệm',
    treasure_find: i18n.global.locale.value === 'vi' ? 'Xác suất rương báu' : 'Xác suất rương kho báu',
    ore_bonus: i18n.global.locale.value === 'vi' ? 'Quặng bổ sung' : 'Quặng thêm',
    luck: i18n.global.locale.value === 'vi' ? 'May mắn' : 'may mắn',
    travel_speed: i18n.global.locale.value === 'vi' ? 'Tăng tốc độ di chuyển' : 'Du lịch tăng tốc'
  }

  const craftableRings = computed(() => CRAFTABLE_RINGS)

  const canCraftRing = (ring: RingDef): boolean => {
    if (!ring.recipe) return false
    if (playerStore.money < ring.recipeMoney) return false
    for (const mat of ring.recipe) {
      if (inventoryStore.getItemCount(mat.itemId) < mat.quantity) return false
    }
    return true
  }

  const handleCraftRing = (defId: string) => {
    const result = inventoryStore.craftRing(defId)
    if (result.success) {
      sfxBuy()
      showFloat(result.message, 'success')
      addLog(result.message)
    } else {
      addLog(result.message)
    }
  }

  // === 帽子/鞋子商店 ===

  const formatEffectLabel = (eff: { type: RingEffectType; value: number }): string => {
    const label = RING_EFFECT_LABELS[eff.type]
    return label + (eff.value > 0 && eff.value < 1 ? Math.round(eff.value * 100) + '%' : '+' + eff.value)
  }

  const openHatShopModal = (hat: HatDef) => {
    const lines = [(i18n.global.locale.value === 'vi' ? 'Hiệu quả: ' : 'Hiệu ứng:') + hat.effects.map(formatEffectLabel).join(',')]
    openBuyModal(
      hat.name,
      hat.description,
      discounted(hat.shopPrice!),
      () => handleBuyHat(hat),
      () => !inventoryStore.hasHat(hat.id) && playerStore.money >= discounted(hat.shopPrice!),
      lines
    )
  }

  const openShoeShopModal = (shoe: ShoeDef) => {
    const lines = ['Hiệu ứng:' + shoe.effects.map(formatEffectLabel).join(',')]
    openBuyModal(
      shoe.name,
      shoe.description,
      discounted(shoe.shopPrice!),
      () => handleBuyShoe(shoe),
      () => !inventoryStore.hasShoe(shoe.id) && playerStore.money >= discounted(shoe.shopPrice!),
      lines
    )
  }

  const openHatCraftModal = (hat: HatDef) => {
    const lines = [
      'Hiệu ứng:' + hat.effects.map(formatEffectLabel).join(','),
      (i18n.global.locale.value === 'vi' ? 'Vật liệu: ' : 'Chất liệu:') +
        (hat.recipe?.map(m => `${getItemById(m.itemId)?.name ?? m.itemId}×${m.quantity}`).join(',') ?? '') +
        i18n.global.locale.value === 'vi' ? ` + ${hat.recipeMoney} xu` : i18n.global.locale.value === 'vi' ? ` + ${hat.recipeMoney} xu` : ` + ${hat.recipeMoney}văn bản`
    ]
    openBuyModal(
      hat.name,
      hat.description,
      hat.recipeMoney,
      () => handleCraftHat(hat.id),
      () => canCraftHat(hat),
      lines,
      'tổng hợp'
    )
  }

  const openShoeCraftModal = (shoe: ShoeDef) => {
    const lines = [
      'Hiệu ứng:' + shoe.effects.map(formatEffectLabel).join(','),
      'Chất liệu:' +
        (shoe.recipe?.map(m => `${getItemById(m.itemId)?.name ?? m.itemId}×${m.quantity}`).join(',') ?? '') +
        i18n.global.locale.value === 'vi' ? ` + ${shoe.recipeMoney} xu` : i18n.global.locale.value === 'vi' ? ` + ${shoe.recipeMoney} xu` : ` + ${shoe.recipeMoney}văn bản`
    ]
    openBuyModal(
      shoe.name,
      shoe.description,
      shoe.recipeMoney,
      () => handleCraftShoe(shoe.id),
      () => canCraftShoe(shoe),
      lines,
      'tổng hợp'
    )
  }

  const handleBuyHat = (hat: HatDef) => {
    if (inventoryStore.hasHat(hat.id)) {
      addLog('Bạn đã có chiếc mũ này rồi.')
      return
    }
    if (hat.shopPrice === null) return
    const actualPrice = discounted(hat.shopPrice)
    if (!playerStore.spendMoney(actualPrice)) {
      addLog('Không đủ tiền đồng.')
      return
    }
    inventoryStore.addHat(hat.id)
    sfxBuy()
    showFloat(`-${actualPrice}văn bản`, 'danger')
    addLog(`đã mua${hat.name}.(-${actualPrice}văn bản)`)
  }

  const handleBuyShoe = (shoe: ShoeDef) => {
    if (inventoryStore.hasShoe(shoe.id)) {
      addLog('Bạn đã sở hữu đôi giày này rồi.')
      return
    }
    if (shoe.shopPrice === null) return
    const actualPrice = discounted(shoe.shopPrice)
    if (!playerStore.spendMoney(actualPrice)) {
      addLog('Không đủ tiền đồng.')
      return
    }
    inventoryStore.addShoe(shoe.id)
    sfxBuy()
    showFloat(`-${actualPrice}văn bản`, 'danger')
    addLog(`đã mua${shoe.name}.(-${actualPrice}văn bản)`)
  }

  const canCraftHat = (hat: HatDef): boolean => {
    if (!hat.recipe) return false
    if (playerStore.money < hat.recipeMoney) return false
    for (const mat of hat.recipe) {
      if (inventoryStore.getItemCount(mat.itemId) < mat.quantity) return false
    }
    return true
  }

  const canCraftShoe = (shoe: ShoeDef): boolean => {
    if (!shoe.recipe) return false
    if (playerStore.money < shoe.recipeMoney) return false
    for (const mat of shoe.recipe) {
      if (inventoryStore.getItemCount(mat.itemId) < mat.quantity) return false
    }
    return true
  }

  const handleCraftHat = (defId: string) => {
    const result = inventoryStore.craftHat(defId)
    if (result.success) {
      sfxBuy()
      showFloat(result.message, 'success')
      addLog(result.message)
    } else {
      addLog(result.message)
    }
  }

  const handleCraftShoe = (defId: string) => {
    const result = inventoryStore.craftShoe(defId)
    if (result.success) {
      sfxBuy()
      showFloat(result.message, 'success')
      addLog(result.message)
    } else {
      addLog(result.message)
    }
  }

  // === 通用 ===

  const handleBuyItem = (itemId: string, price: number, name: string) => {
    const actualPrice = discounted(price)
    if (shopStore.buyItem(itemId, price)) {
      addLog(`đã mua${name}.(-${actualPrice}văn bản)`)
    } else {
      addLog('Không đủ tiền hoặc ba lô đã đầy.')
    }
  }

  const qualityTextClass = (q: Quality, fallback = ''): string => {
    if (q === 'fine') return 'text-quality-fine'
    if (q === 'excellent') return 'text-quality-excellent'
    if (q === 'supreme') return 'text-quality-supreme'
    return fallback
  }

  // === Cần bán bộ lọc ===

  const SELL_FILTER_CATEGORIES: ItemCategory[] = [
    'crop',
    'fruit',
    'fish',
    'animal_product',
    'processed',
    'food',
    'ore',
    'gem',
    'material',
    'gift',
    'fossil',
    'artifact',
    'misc'
  ]

  const SELL_CATEGORY_NAMES: Partial<Record<ItemCategory, string>> = {
    crop: i18n.global.locale.value === 'vi' ? 'Nông sản' : 'cây trồng',
    fruit: i18n.global.locale.value === 'vi' ? 'Hoa quả' : 'trái cây',
    fish: i18n.global.locale.value === 'vi' ? 'Cá' : 'cá',
    animal_product: i18n.global.locale.value === 'vi' ? 'Động vật' : 'chăn nuôi',
    processed: i18n.global.locale.value === 'vi' ? 'Đồ chế biến' : 'Sản phẩm đã qua chế biến',
    food: i18n.global.locale.value === 'vi' ? 'Món ăn' : 'ẩm thực',
    ore: i18n.global.locale.value === 'vi' ? 'Quặng' : 'quặng',
    gem: i18n.global.locale.value === 'vi' ? 'Đá quý' : 'đá quý',
    material: i18n.global.locale.value === 'vi' ? 'Vật liệu' : 'Chất liệu',
    gift: i18n.global.locale.value === 'vi' ? 'Quà tặng' : 'quà tặng',
    fossil: i18n.global.locale.value === 'vi' ? 'Hóa thạch' : 'hóa thạch',
    artifact: i18n.global.locale.value === 'vi' ? 'Cổ vật' : 'di tích văn hóa',
    misc: i18n.global.locale.value === 'vi' ? 'Tạp hóa' : 'cửa hàng tạp hóa'
  }

  const showSellFilterModal = ref(false)
  const sellFilter = ref<ItemCategory[]>([])
  const tempSellFilter = ref<Set<ItemCategory>>(new Set())

  const isSellFilterActive = computed(() => sellFilter.value.length > 0)

  const openSellFilterModal = () => {
    tempSellFilter.value = new Set(sellFilter.value)
    showSellFilterModal.value = true
  }

  const toggleSellCategory = (cat: ItemCategory) => {
    if (tempSellFilter.value.has(cat)) {
      tempSellFilter.value.delete(cat)
    } else {
      tempSellFilter.value.add(cat)
    }
  }

  const handleSaveSellFilter = () => {
    sellFilter.value = [...tempSellFilter.value]
    showSellFilterModal.value = false
  }

  const handleClearSellFilter = () => {
    tempSellFilter.value = new Set()
  }

  const sellableItems = computed(() => {
    const allowed = sellFilter.value.length > 0 ? new Set(sellFilter.value) : null
    return inventoryStore.items
      .map((inv, index) => {
        const def = getItemById(inv.itemId)
        return { ...inv, def, originalIndex: index }
      })
      .filter(item => item.def && !item.locked && (!allowed || allowed.has(item.def!.category)))
  })
</script>

<!-- ShopHeader 内联子组件 -->
<script lang="ts">
  import { defineComponent, h } from 'vue'

  const ShopHeader = defineComponent({
    name: 'ShopHeader',
    props: {
      name: { type: String, required: true },
      npc: { type: String, required: true }
    },
    setup(props) {
      return () =>
        h('div', { class: 'flex items-center space-x-2 mb-3' }, [
          h('h3', { class: 'text-accent text-sm' }, [`${props.name} · ${props.npc}`])
        ])
    }
  })

  export default { components: { ShopHeader } }
</script>
