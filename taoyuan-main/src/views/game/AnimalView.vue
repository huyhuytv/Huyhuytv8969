<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-accent text-sm">
        <Home :size="14" class="inline" />
        {{ $t('animalView.tab_title') }}
      </h3>
      <Button v-if="unpettedCount > 0" :icon="Hand" @click="handlePetAll">{{ $t('animalView.pet_all_btn', { count: unpettedCount }) }}</Button>
    </div>

    <p v-if="tutorialHint" class="text-[10px] text-muted/50 mb-2">{{ tutorialHint }}</p>

    <!-- thú cưng区域 -->
    <div class="mb-4 border border-accent/20 rounded-xs p-3">
      <p class="text-xs text-muted mb-2">{{ $t('animalView.pet_sub') }}</p>
      <template v-if="animalStore.pet">
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center space-x-1">
            <template v-if="renamingId === 'pet'">
              <input
                v-model="renameInput"
                class="bg-bg border border-accent/30 rounded-xs px-1 py-0.5 text-xs text-text w-20 focus:border-accent outline-none placeholder:text-muted/40 transition-colors"
                maxlength="8"
                @keyup.enter="confirmRename"
                @keyup.escape="cancelRename"
              />
              <Button class="py-0 px-1" @click="confirmRename">{{ $t('animalView.confirm') }}</Button>
              <Button class="py-0 px-1" @click="cancelRename">{{ $t('animalView.cancel') }}</Button>
            </template>
            <template v-else>
              <span class="text-xs text-accent">{{ animalStore.pet.type === 'cat' ? $t('cat') : $t('dog') }} — {{ animalStore.pet.name }}</span>
              <button
                class="text-muted hover:text-accent"
                :aria-label="$i18n.locale === 'vi' ? 'Đổi tên thú cưng' : '重命名宠物'"
                @click="startRename('pet', animalStore.pet!.name)"
              >
                <Pencil :size="10" />
              </button>
            </template>
          </div>
          <Button class="py-0 px-1" :icon="Hand" :disabled="animalStore.pet.wasPetted" @click="handlePetThePet">
            {{ animalStore.pet.wasPetted ? $t('animalView.was_petted') : $t('animalView.pet') }}
          </Button>
        </div>
        <div class="flex items-center space-x-1">
          <span class="text-[10px] text-muted w-6">{{ $t('animalView.friendship') }}</span>
          <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
            <div class="h-full rounded-xs bg-danger transition-all" :style="{ width: Math.floor(animalStore.pet.friendship / 10) + '%' }" />
          </div>
          <span class="text-[10px] text-muted">{{ animalStore.pet.friendship }}/1000</span>
        </div>
        <p v-if="animalStore.pet.friendship >= 800" class="text-xs text-success mt-1">{{ $t('animalView.cozy_pet_bonus') }}</p>
      </template>
      <div v-else class="flex flex-col items-center justify-center py-6 text-muted">
        <Home :size="32" class="mb-2" />
        <p class="text-xs">{{ $t('animalView.no_pet') }}</p>
        <p class="text-[10px] mt-1">{{ $t('animalView.no_pet_desc') }}</p>
      </div>
    </div>

    <!-- chuồng ngựa列表 (鸡舍和牲口棚) -->
    <div v-for="bDef in mainBuildings" :key="bDef.type" class="mb-4 border border-accent/20 rounded-xs p-3">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-accent">{{ getBuildingDisplayName(bDef.type) }}</span>
        <div v-if="isBuildingBuilt(bDef.type)" class="flex items-center space-x-2">
          <span class="text-xs text-muted">{{ getAnimalsInBuilding(bDef.type).length }}/{{ getBuildingCapacity(bDef.type) }}</span>
          <Button v-if="getBuildingLevel(bDef.type) < 3" :icon="ArrowUp" @click="openUpgradeModal(bDef.type)">{{ $t('animalView.upgrade') }}</Button>
        </div>
        <Button v-else :icon="Hammer" @click="handleBuildBuilding(bDef.type)">{{ $t('animalView.build', { cost: bDef.cost }) }}</Button>
      </div>

      <template v-if="isBuildingBuilt(bDef.type)">
        <p v-if="animalStore.hasAutoPetter(bDef.type)" class="text-[10px] text-success mb-2">{{ $t('animalView.auto_petter_on') }}</p>
        <!-- 鸡舍孵化器(鸡舍2级以上) -->
        <div v-if="bDef.type === 'coop' && getBuildingLevel('coop') >= 2" class="mb-3 p-2 border border-accent/10 rounded-xs">
          <p class="text-xs text-accent mb-1">
            <Egg :size="14" class="inline" />
            {{ $t('animalView.incubator') }}
          </p>
          <div v-if="animalStore.incubating">
            <p class="text-xs text-muted">
              {{ $t('animalView.incubating_desc', { name: getAnimalName(animalStore.incubating.animalType), days: animalStore.incubating.daysLeft }) }}
            </p>
          </div>
          <div v-else-if="coopIncubatableEggs.length > 0" class="flex flex-col space-y-1">
            <div
              v-for="eggItem in coopIncubatableEggs"
              :key="eggItem.itemId"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
              @click="handleStartIncubation(eggItem.itemId)"
            >
              <span class="text-xs">{{ eggItem.name }}</span>
              <span class="text-xs text-muted">&times;{{ eggItem.count }}</span>
            </div>
          </div>
          <p v-else class="text-xs text-muted">{{ $t('animalView.no_incubating_eggs') }}</p>
        </div>

        <!-- 牲口棚孵化器(牲口棚2级以上) -->
        <div v-if="bDef.type === 'barn' && getBuildingLevel('barn') >= 2" class="mb-3 p-2 border border-accent/10 rounded-xs">
          <p class="text-xs text-accent mb-1">
            <Egg :size="14" class="inline" />
            {{ $t('animalView.incubator') }}
          </p>
          <div v-if="animalStore.barnIncubating">
            <p class="text-xs text-muted">
              {{ $t('animalView.incubating_desc', { name: getAnimalName(animalStore.barnIncubating.animalType), days: animalStore.barnIncubating.daysLeft }) }}
            </p>
          </div>
          <div v-else-if="barnIncubatableEggs.length > 0" class="flex flex-col space-y-1">
            <div
              v-for="eggItem in barnIncubatableEggs"
              :key="eggItem.itemId"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
              @click="handleStartBarnIncubation(eggItem.itemId)"
            >
              <span class="text-xs">{{ eggItem.name }}</span>
              <span class="text-xs text-muted">&times;{{ eggItem.count }}</span>
            </div>
          </div>
          <p v-else class="text-xs text-muted">{{ $t('animalView.no_barn_incubating_eggs') }}</p>
        </div>

        <!-- muađộng vật按钮 -->
        <Button class="w-full md:w-auto mb-3" :icon="ShoppingCart" @click="buyListBuilding = bDef.type">{{ $t('animalView.buy_animal_btn') }}</Button>

        <!-- động vật列表 -->
        <div v-if="getAnimalsInBuilding(bDef.type).length > 0" class="flex flex-col space-y-1 max-h-60 overflow-y-auto">
          <div v-for="animal in getAnimalsInBuilding(bDef.type)" :key="animal.id" class="border border-accent/10 rounded-xs p-2 mr-1">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center space-x-1">
                <template v-if="renamingId === animal.id">
                  <input
                    v-model="renameInput"
                    class="bg-bg border border-accent/30 rounded-xs px-1 py-0.5 text-xs text-text w-20 focus:border-accent outline-none placeholder:text-muted/40 transition-colors"
                    maxlength="8"
                    @keyup.enter="confirmRename"
                    @keyup.escape="cancelRename"
                  />
                  <Button class="py-0 px-1" @click="confirmRename">{{ $t('animalView.confirm') }}</Button>
                  <Button class="py-0 px-1" @click="cancelRename">{{ $t('animalView.cancel') }}</Button>
                </template>
                <template v-else>
                  <span class="text-xs text-accent">{{ animal.name }}</span>
                  <button
                    class="text-muted hover:text-accent"
                    :aria-label="$i18n.locale === 'vi' ? 'Đổi tên vật nuôi' : '重命名动物'"
                    @click="startRename(animal.id, animal.name)"
                  >
                    <Pencil :size="10" />
                  </button>
                </template>
              </div>
              <div class="flex items-center space-x-1">
                <Button class="py-0 px-1" :icon="Apple" :disabled="animal.wasFed" @click="handleFeedAnimal(animal.id, animal.name)">
                  {{ animal.wasFed ? $t('animalView.was_fed') : $t('animalView.feed') }}
                </Button>
                <Button class="py-0 px-1" :icon="Hand" :disabled="animal.wasPetted" @click="handlePetAnimal(animal.id)">
                  {{ animal.wasPetted ? $t('animalView.was_petted') : $t('animalView.pet') }}
                </Button>
                <Button class="py-0 px-1" :icon="Coins" @click="sellTarget = { id: animal.id, name: animal.name, type: animal.type }">
                  {{ $t('animalView.sell') }}
                </Button>
              </div>
            </div>
            <div class="space-y-0.5">
              <div class="flex items-center space-x-1">
                <span class="text-[10px] text-muted w-6">{{ $t('animalView.friendship') }}</span>
                <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                  <div class="h-full rounded-xs bg-danger transition-all" :style="{ width: Math.floor(animal.friendship / 10) + '%' }" />
                </div>
              </div>
              <div class="flex items-center space-x-1">
                <span class="text-[10px] text-muted w-6">{{ $t('animalView.mood') }}</span>
                <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                  <div
                    class="h-full rounded-xs transition-all"
                    :class="getMoodBarColor(animal.mood)"
                    :style="{ width: Math.floor((animal.mood / 255) * 100) + '%' }"
                  />
                </div>
                <span class="text-[10px] text-muted w-6">{{ getMoodText(animal.mood) }}</span>
              </div>
              <div v-if="animal.hunger > 0" class="flex items-center space-x-1">
                <span class="text-[10px] text-muted w-6">{{ $t('animalView.hunger') }}</span>
                <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                  <div class="h-full rounded-xs bg-danger transition-all" :style="{ width: Math.floor((animal.hunger / 7) * 100) + '%' }" />
                </div>
                <span class="text-[10px] text-danger w-6">{{ $t('animalView.hunger_unit', { days: animal.hunger }) }}</span>
              </div>
            </div>
            <div v-if="animal.sick" class="flex items-center justify-between mt-0.5">
              <p class="text-[10px] text-danger">{{ $t('animalView.sick_desc', { days: animal.sickDays }) }}</p>
              <Button class="py-0 px-1" :icon="Syringe" :disabled="medicineCount <= 0" @click="handleHealAnimal(animal.id, animal.name)">
                {{ $t('animalView.heal') }}
              </Button>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-6">
          <Home :size="36" class="text-accent/20 mb-2" />
          <p class="text-xs text-muted">{{ $t('animalView.no_animals') }}</p>
          <p class="text-[10px] text-muted/50 mt-0.5">{{ $t('animalView.no_animals_desc') }}</p>
        </div>
      </template>
      <template v-else>
        <p class="text-xs text-muted">{{ $t('animalView.stable_required') }} {{ bDef.materialCost.map(m => `${getItemName(m.itemId)}×${m.quantity}`).join(', ') }}</p>
      </template>
    </div>

    <!-- 马厩 -->
    <div class="mb-4 border border-accent/20 rounded-xs p-3">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-accent">{{ $t('animalView.stable') }}</span>
        <div v-if="animalStore.stableBuilt" class="flex items-center space-x-2">
          <span class="text-xs text-muted">{{ animalStore.getHorse ? '1/1' : '0/1' }}</span>
        </div>
        <Button v-else :icon="Hammer" @click="handleBuildBuilding('stable')">{{ $t('animalView.build', { cost: stableDef?.cost ?? 10000 }) }}</Button>
      </div>

      <template v-if="animalStore.stableBuilt">
        <div v-if="animalStore.getHorse" class="border border-accent/10 rounded-xs p-2">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center space-x-1">
              <template v-if="renamingId === animalStore.getHorse.id">
                <input
                  v-model="renameInput"
                  class="bg-bg border border-accent/30 rounded-xs px-1 py-0.5 text-xs text-text w-20 focus:border-accent outline-none placeholder:text-muted/40 transition-colors"
                  maxlength="8"
                  @keyup.enter="confirmRename"
                  @keyup.escape="cancelRename"
                />
                <Button class="py-0 px-1" @click="confirmRename">{{ $t('animalView.confirm') }}</Button>
                <Button class="py-0 px-1" @click="cancelRename">{{ $t('animalView.cancel') }}</Button>
              </template>
              <template v-else>
                <span class="text-xs text-accent">{{ animalStore.getHorse.name }}</span>
                <button
                  class="text-muted hover:text-accent"
                  :aria-label="$i18n.locale === 'vi' ? 'Đổi tên ngựa' : '重命名马匹'"
                  @click="startRename(animalStore.getHorse!.id, animalStore.getHorse!.name)"
                >
                  <Pencil :size="10" />
                </button>
              </template>
            </div>
            <div class="flex items-center space-x-1">
              <Button
                class="py-0 px-1"
                :icon="Apple"
                :disabled="animalStore.getHorse.wasFed"
                @click="handleFeedAnimal(animalStore.getHorse.id, animalStore.getHorse.name)"
              >
                {{ animalStore.getHorse.wasFed ? $t('animalView.was_fed') : $t('animalView.feed') }}
              </Button>
              <Button
                class="py-0 px-1"
                :icon="Hand"
                :disabled="animalStore.getHorse.wasPetted"
                @click="handlePetAnimal(animalStore.getHorse.id)"
              >
                {{ animalStore.getHorse.wasPetted ? $t('animalView.was_petted') : $t('animalView.pet') }}
              </Button>
              <Button
                class="py-0 px-1"
                :icon="Coins"
                @click="sellTarget = { id: animalStore.getHorse!.id, name: animalStore.getHorse!.name, type: animalStore.getHorse!.type }"
              >
                {{ $t('animalView.sell') }}
              </Button>
            </div>
          </div>
          <div class="space-y-0.5">
            <div class="flex items-center space-x-1">
              <span class="text-[10px] text-muted w-6">{{ $t('animalView.friendship') }}</span>
              <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                <div
                  class="h-full rounded-xs bg-danger transition-all"
                  :style="{ width: Math.floor(animalStore.getHorse.friendship / 10) + '%' }"
                />
              </div>
            </div>
            <div class="flex items-center space-x-1">
              <span class="text-[10px] text-muted w-6">{{ $t('animalView.mood') }}</span>
              <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                <div
                  class="h-full rounded-xs transition-all"
                  :class="getMoodBarColor(animalStore.getHorse.mood)"
                  :style="{ width: Math.floor((animalStore.getHorse.mood / 255) * 100) + '%' }"
                />
              </div>
              <span class="text-[10px] text-muted w-6">{{ getMoodText(animalStore.getHorse.mood) }}</span>
            </div>
            <div v-if="animalStore.getHorse.hunger > 0" class="flex items-center space-x-1">
              <span class="text-[10px] text-muted w-6">{{ $t('animalView.hunger') }}</span>
              <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                <div
                  class="h-full rounded-xs bg-danger transition-all"
                  :style="{ width: Math.floor((animalStore.getHorse.hunger / 7) * 100) + '%' }"
                />
              </div>
              <span class="text-[10px] text-danger w-6">{{ $t('animalView.hunger_unit', { days: animalStore.getHorse.hunger }) }}</span>
            </div>
          </div>
          <div v-if="animalStore.getHorse.sick" class="flex items-center justify-between mt-0.5">
            <p class="text-[10px] text-danger">{{ $t('animalView.sick_desc', { days: animalStore.getHorse.sickDays }) }}</p>
            <Button
              class="py-0 px-1"
              :icon="Syringe"
              :disabled="medicineCount <= 0"
              @click="handleHealAnimal(animalStore.getHorse!.id, animalStore.getHorse!.name)"
            >
              {{ $t('animalView.heal') }}
            </Button>
          </div>
          <p class="text-xs text-success mt-1">{{ $t('animalView.horse_desc') }}</p>
        </div>
        <div v-else>
          <div
            class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
            @click="
              openBuyModal(
                {
                  type: 'horse' as AnimalType,
                  name: (i18n.global.locale.value === 'vi' ? 'Ngựa' : 'Ngựa'),
                  building: 'stable' as AnimalBuildingType,
                  cost: 5000,
                  productId: '',
                  productName: (i18n.global.locale.value === 'vi' ? 'Không' : 'Không'),
                  produceDays: 0,
                  friendship: { min: 0, max: 1000 }
                },
                'stable'
              )
            "
          >
            <span class="text-xs">Ngựa</span>
            <span class="text-xs text-accent whitespace-nowrap">5000 xu</span>
          </div>
          <p class="text-xs text-muted mt-1">{{ $t('animalView.stable_unbuilt_desc') }}</p>
        </div>
      </template>
      <template v-else>
        <p class="text-xs text-muted">
          {{ $t('animalView.stable_required') }} {{ stableDef?.materialCost.map(m => `${getItemName(m.itemId)}×${m.quantity}`).join(', ') ?? '' }}
        </p>
        <p class="text-xs text-muted mt-1">{{ $t('animalView.stable_unbuilt_desc') }}</p>
      </template>
    </div>

    <!-- 饲养管理 -->
    <div class="border border-accent/20 rounded-xs p-3">
      <h3 class="text-accent text-sm mb-3">
        <Apple :size="14" class="inline" />
        {{ $t('animalView.feed_management') }}
      </h3>

      <!-- 饲料选择 -->
      <div class="mb-3">
        <p class="text-xs text-muted mb-1">{{ $t('animalView.feed_selection') }}</p>
        <div class="flex flex-col space-y-1">
          <div
            v-for="feed in feedCounts"
            :key="feed.id"
            class="flex items-center justify-between border rounded-xs px-3 py-1.5 cursor-pointer"
            :class="selectedFeed === feed.id ? 'border-accent bg-accent/10' : 'border-accent/20 hover:bg-accent/5'"
            @click="selectedFeed = feed.id"
          >
            <div class="flex items-center space-x-2">
              <span class="text-xs" :class="selectedFeed === feed.id ? 'text-accent' : ''">{{ getFeedDisplayName(feed.id) }}</span>
              <span class="text-[10px] text-muted">{{ getFeedDisplayDesc(feed.id) }}</span>
            </div>
            <span class="text-xs text-muted">{{ feed.count }}</span>
          </div>
        </div>
      </div>

      <!-- 喂食 -->
      <div class="mb-3">
        <div class="flex items-center justify-between mb-1">
          <p class="text-xs text-muted">{{ $t('animalView.feed_sub') }}</p>
          <span class="text-xs text-muted">{{ $t('animalView.feed_inventory', { name: getFeedDisplayName(selectedFeed), count: selectedFeedCount }) }}</span>
        </div>
        <div class="flex flex-col space-y-1">
          <div
            class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5"
            :class="unfedCount > 0 ? 'cursor-pointer hover:bg-accent/5' : 'opacity-50'"
            @click="unfedCount > 0 && handleFeedAll()"
          >
            <span class="text-xs">{{ $t('animalView.feed_all') }}</span>
            <span class="text-xs text-muted">{{ $t('animalView.feed_all_req', { name: getFeedDisplayName(selectedFeed), count: unfedCount }) }}</span>
          </div>
          <div
            class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5"
            :class="playerStore.money >= selectedFeedPrice ? 'cursor-pointer hover:bg-accent/5' : 'opacity-50'"
            @click="playerStore.money >= selectedFeedPrice && handleBuyFeed()"
          >
            <span class="text-xs">{{ $t('animalView.buy_feed_btn', { name: getFeedDisplayName(selectedFeed) }) }}</span>
            <span class="text-xs text-accent">{{ $t('animalView.buy_feed_cost', { price: selectedFeedPrice }) }}</span>
          </div>
        </div>
      </div>

      <!-- 放牧 -->
      <div>
        <p class="text-xs text-muted mb-1">{{ $t('animalView.grazing_sub') }}</p>
        <div
          class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5"
          :class="canGraze ? 'cursor-pointer hover:bg-accent/5' : 'opacity-50'"
          @click="canGraze && handleGraze()"
        >
          <span class="text-xs">{{ $t('animalView.graze_all') }}</span>
          <span v-if="grazeDisabledReason" class="text-xs text-muted">{{ grazeDisabledReason }}</span>
        </div>
      </div>

      <!-- 治疗 -->
      <div v-if="sickCount > 0" class="mt-3">
        <div class="flex items-center justify-between mb-1">
          <p class="text-xs text-muted">{{ $t('animalView.medicine') }}</p>
          <span class="text-xs text-muted">{{ $t('animalView.medicine_inventory', { count: medicineCount }) }}</span>
        </div>
        <div
          class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5"
          :class="medicineCount > 0 ? 'cursor-pointer hover:bg-accent/5' : 'opacity-50'"
          @click="medicineCount > 0 && handleHealAll()"
        >
          <span class="text-xs">{{ $t('animalView.heal_all') }}</span>
          <span class="text-xs text-muted">{{ $t('animalView.heal_all_req', { count: sickCount }) }}</span>
        </div>
      </div>
    </div>

    <!-- muađộng vật列表弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="buyListBuilding"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="buyListBuilding = null"
      >
        <div ref="modalRef_iokgy" class="game-panel max-w-xs w-full" role="dialog" aria-modal="true" tabindex="-1">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-accent">{{ $t('animalView.buy_animal_title') }}</p>
            <Button class="py-0 px-1" :icon="X" :icon-size="12" @click="buyListBuilding = null" />
          </div>
          <div class="flex flex-col space-y-1">
            <div
              v-for="aDef in getAnimalDefsForBuilding(buyListBuilding)"
              :key="aDef.type"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
              @click="handleSelectAnimalToBuy(aDef)"
            >
              <span class="text-xs">{{ getAnimalVietnameseNameByName(aDef.name) }}</span>
              <span class="text-xs text-accent whitespace-nowrap">{{ $t('animalView.coins_unit', { cost: aDef.cost }) }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- muađộng vật详情弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="buyModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4" @click.self="buyModal = null">
        <div ref="modalRef_bu9f2" class="game-panel max-w-xs w-full" role="dialog" aria-modal="true" tabindex="-1">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-accent">{{ getAnimalVietnameseNameByName(buyModal.name) }}</p>
            <Button class="py-0 px-1" :icon="X" :icon-size="12" @click="buyModal = null" />
          </div>
          <div class="text-xs space-y-1 mb-3 border-b border-accent/20 pb-2">
            <p v-if="buyModal.productName && buyModal.productName !== 'Không' && buyModal.productName !== 'Không'" class="text-muted">
              {{ $t('animalView.buy_animal_desc', { name: getItemName(buyModal.productId ?? '') || buyModal.productName, days: buyModal.produceDays }) }}
            </p>
            <p v-else class="text-muted">{{ $t('animalView.buy_animal_desc_misc') }}</p>
            <p>{{ $t('animalView.buy_animal_price', { price: buyModal.cost }) }}</p>
          </div>
          <Button class="w-full" :icon="ShoppingCart" :disabled="!buyModal.canBuy()" @click="handleBuyFromModal">{{ $t('animalView.buy_btn') }}</Button>
        </div>
      </div>
    </Transition>

    <!-- 出售động vật确认弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="sellTarget" class="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4" @click.self="sellTarget = null">
        <div ref="modalRef_vewb9" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="sellTarget = null">
            <X :size="14" />
          </button>
          <p class="text-accent text-sm mb-2">{{ $t('animalView.sell_animal_title') }}</p>
          <p class="text-xs text-text mb-1">
            {{ $t('animalView.sell_animal_confirm', { name: sellTarget.name }) }}
          </p>
          <p class="text-xs text-muted mb-3">
            {{ $t('animalView.sell_animal_refund', { price: sellTargetRefund }) }}
          </p>
          <div class="flex space-x-2">
            <Button class="flex-1" @click="sellTarget = null">{{ $t('animalView.cancel') }}</Button>
            <Button class="flex-1 !bg-danger !text-text" :icon="Coins" :icon-size="12" @click="confirmSellAnimal">{{ $t('animalView.sell_btn_confirm') }}</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 升级chuồng ngựa弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="upgradeModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="upgradeModal = null"
      >
        <div ref="modalRef_nt65d" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="upgradeModal = null">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-2">{{ $t('animalView.upgrade_building_title') }}</p>

          <!-- 当前等级信息 -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ $t('animalView.upgrade_current') }}</span>
              <span class="text-xs">{{ upgradeModal.currentName }}(Lv.{{ upgradeModal.currentLevel }})</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('animalView.upgrade_capacity') }}</span>
              <span class="text-xs">{{ $t('animalView.upgrade_capacity_qty', { count: upgradeModal.currentCapacity }) }}</span>
            </div>
          </div>

          <!-- 升级目标 -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ $t('animalView.upgrade_target') }}</span>
              <span class="text-xs text-accent">{{ upgradeModal.targetName }}(Lv.{{ upgradeModal.targetLevel }})</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ $t('animalView.upgrade_capacity') }}</span>
              <span class="text-xs text-accent">{{ $t('animalView.upgrade_capacity_qty', { count: upgradeModal.targetCapacity }) }}</span>
            </div>
          </div>

          <!-- 所需资源 -->
          <div class="border border-accent/10 rounded-xs p-2 mb-3">
            <p class="text-xs text-muted mb-1">{{ $t('animalView.upgrade_material_req') }}</p>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs">{{ $t('animalView.upgrade_money') }}</span>
              <span class="text-xs" :class="playerStore.money >= upgradeModal.cost ? 'text-success' : 'text-danger'">
                {{ playerStore.money }} / {{ $t('animalView.coins_unit', { cost: upgradeModal.cost }) }}
              </span>
            </div>
            <div v-for="mat in upgradeModal.materials" :key="mat.itemId" class="flex items-center justify-between mt-0.5">
              <span class="text-xs">{{ mat.name }}</span>
              <span class="text-xs" :class="mat.have >= mat.need ? 'text-success' : 'text-danger'">{{ mat.have }} / {{ mat.need }}</span>
            </div>
          </div>

          <Button
            class="w-full justify-center"
            :class="canConfirmUpgrade ? '!bg-accent !text-bg' : 'opacity-50'"
            :icon="ArrowUp"
            :icon-size="12"
            :disabled="!canConfirmUpgrade"
            @click="confirmUpgradeBuilding"
          >
            {{ $t('animalView.upgrade_confirm_btn') }}
          </Button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">

  import { useFocusTrap } from '@/composables/useFocusTrap'
  import { ref, computed } from 'vue'
  import { Hammer, ShoppingCart, Hand, Apple, Home, ArrowUp, Egg, X, Coins, Syringe, Pencil } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import { useAnimalStore } from '@/stores/useAnimalStore'
  import { useGameStore } from '@/stores/useGameStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { ANIMAL_BUILDINGS, ANIMAL_DEFS, HAY_ITEM_ID, getItemById, getBuildingUpgrade, INCUBATION_MAP, FEED_DEFS } from '@/data'
  import { ACTION_TIME_COSTS } from '@/data/timeConstants'
  import type { AnimalBuildingType, AnimalType, AnimalDef } from '@/types'
  import { addLog } from '@/composables/useGameLog'
  import { handleEndDay } from '@/composables/useEndDay'
  import { useTutorialStore } from '@/stores/useTutorialStore'
  import i18n from '@/locales'


  const modalRef_iokgy = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_iokgy);
  const modalRef_bu9f2 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_bu9f2);
  const modalRef_vewb9 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_vewb9);
  const modalRef_nt65d = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_nt65d);



  const animalStore = useAnimalStore()
  const inventoryStore = useInventoryStore()
  const playerStore = usePlayerStore()
  const gameStore = useGameStore()
  const tutorialStore = useTutorialStore()

  const tutorialHint = computed(() => {
    if (!tutorialStore.enabled || gameStore.year > 1) return null
    const coopBuilt = animalStore.buildings.find(b => b.type === 'coop')?.built ?? false
    const barnBuilt = animalStore.buildings.find(b => b.type === 'barn')?.built ?? false
    if (!coopBuilt && !barnBuilt) return i18n.global.locale.value === 'vi' ? 'Hãy đến Tiệm Tạp Hóa để xây chuồng gà hoặc chuồng gia súc trước, sau đó bạn có thể mua và nuôi thú.' : 'Đầu tiên hãy đến Cửa hàng Mọi thứ trong cửa hàng để xây chuồng gà hoặc đồng cỏ, sau đó bạn có thể mua và nuôi động vật.'
    if (animalStore.animals.length > 0 && animalStore.animals.every(a => !a.wasPetted))
      return i18n.global.locale.value === 'vi' ? 'Vuốt ve động vật mỗi ngày để tăng độ thân thiết, "Vuốt ve tất cả" có thể thực hiện hàng loạt.' : 'Vuốt ve động vật mỗi ngày có thể tăng tình bạn,「Một cú nhấp chuột chạm」Có thể được vận hành theo lô.'
    return null
  })

  // === mua弹窗 ===

  interface BuyAnimalModalData {
    productId?: string
    name: string
    productName: string
    produceDays: number
    cost: number
    onBuy: () => void
    canBuy: () => boolean
  }

  const buyModal = ref<BuyAnimalModalData | null>(null)
  const buyListBuilding = ref<AnimalBuildingType | null>(null)

  const handleSelectAnimalToBuy = (aDef: AnimalDef) => {
    if (!buyListBuilding.value) return
    openBuyModal(aDef, buyListBuilding.value)
    buyListBuilding.value = null
  }

  const openBuyModal = (aDef: AnimalDef, buildingType: AnimalBuildingType) => {
    buyModal.value = {
      name: aDef.name,
      productName: aDef.productName,
      produceDays: aDef.produceDays,
      cost: aDef.cost,
      onBuy: () => handleBuyAnimal(aDef.type),
      canBuy: () => {
        if (buildingType === 'stable') return !animalStore.getHorse && playerStore.money >= aDef.cost
        return getAnimalsInBuilding(buildingType).length < getBuildingCapacity(buildingType) && playerStore.money >= aDef.cost
      }
    }
  }

  const handleBuyFromModal = () => {
    if (!buyModal.value) return
    buyModal.value.onBuy()
    buyModal.value = null
  }

  // === 出售确认弹窗 ===

  const sellTarget = ref<{ id: string; name: string; type: AnimalType } | null>(null)

  const sellTargetRefund = computed(() => {
    if (!sellTarget.value) return 0
    const def = ANIMAL_DEFS.find(d => d.type === sellTarget.value!.type)
    return Math.floor((def?.cost ?? 0) / 2)
  })

  const confirmSellAnimal = () => {
    if (!sellTarget.value) return
    const result = animalStore.sellAnimal(sellTarget.value.id)
    sellTarget.value = null
    if (result.success) {
      addLog(i18n.global.locale.value === 'vi' ? `Đã bán ${result.name}, nhận được ${result.refund} xu.` : `đã bán${result.name}, nhận được${result.refund}Chữ.`)
    }
  }

  // === 数据计算 ===

  /** 只显示鸡舍和牲口棚(马厩单独渲染) */
  const mainBuildings = computed(() => ANIMAL_BUILDINGS.filter(b => b.type !== 'stable'))

  /** 马厩建筑定义 */
  const stableDef = computed(() => ANIMAL_BUILDINGS.find(b => b.type === 'stable'))

  /** 当前选择的饲料类型 */
  const selectedFeed = ref<string>(HAY_ITEM_ID)

  /** 各类饲料库存数量 */
  const feedCounts = computed(() =>
    FEED_DEFS.map(f => ({
      ...f,
      count: inventoryStore.getItemCount(f.id)
    }))
  )

  /** 当前选中饲料的名称 */
  const selectedFeedName = computed(() => FEED_DEFS.find(f => f.id === selectedFeed.value)?.name ?? (i18n.global.locale.value === 'vi' ? 'Cỏ khô' : 'cỏ khô'))

  /** 当前选中饲料的库存 */
  const selectedFeedCount = computed(() => inventoryStore.getItemCount(selectedFeed.value))

  /** 当前选中饲料的价格 */
  const selectedFeedPrice = computed(() => FEED_DEFS.find(f => f.id === selectedFeed.value)?.price ?? 50)

  /** 未喂食động vật数量 */
  const unfedCount = computed(() => animalStore.animals.filter(a => !a.wasFed).length)

  /** 兽药库存数量 */
  const medicineCount = computed(() => inventoryStore.getItemCount('animal_medicine'))

  /** 生病động vật数量 */
  const sickCount = computed(() => animalStore.animals.filter(a => a.sick).length)

  /** 可在鸡舍孵化的蛋列表 */
  const coopIncubatableEggs = computed(() => {
    const result: { itemId: string; name: string; count: number }[] = []
    for (const [itemId, mapping] of Object.entries(INCUBATION_MAP)) {
      if (mapping.building !== 'coop') continue
      const count = inventoryStore.getItemCount(itemId)
      if (count > 0) {
        const itemDef = getItemById(itemId)
        result.push({ itemId, name: itemDef?.name ?? itemId, count })
      }
    }
    return result
  })

  /** 可在牲口棚孵化的蛋列表 */
  const barnIncubatableEggs = computed(() => {
    const result: { itemId: string; name: string; count: number }[] = []
    for (const [itemId, mapping] of Object.entries(INCUBATION_MAP)) {
      if (mapping.building !== 'barn') continue
      const count = inventoryStore.getItemCount(itemId)
      if (count > 0) {
        const itemDef = getItemById(itemId)
        result.push({ itemId, name: itemDef?.name ?? itemId, count })
      }
    }
    return result
  })

  // === 工具函数 ===

  const getAnimalVietnameseNameByName = (rawName: string): string => {
    if (i18n.global.locale.value === 'vi') {
      const map: Record<string, string> = {
        'Mèo': 'Mèo',
        'Chó': 'Chó',
        'Ngựa': 'Ngựa',
        'Gà': 'Gà',
        'Gà trắng': 'Gà trắng',
        'Gà nâu': 'Gà nâu',
        'Gà hư không': 'Gà Hư Không',
        'Khủng long': 'Khủng long',
        'Gà con': 'Gà con',
        'Vịt': 'Vịt',
        'Vịt con': 'Vịt con',
        'Thỏ': 'Thỏ',
        'Thỏ con': 'Thỏ con',
        'Bò': 'Bò',
        'Bò sữa trắng': 'Bò sữa trắng',
        'Bò sữa nâu': 'Bò sữa nâu',
        'Bê': 'Bò con',
        'Bò sữa': 'Bò sữa',
        'Cừu': 'Cừu',
        'Cừu con': 'Cừu con',
        'Dê': 'Dê',
        'Dê con': 'Dê con',
        'Heo': 'Heo',
        'Heo con': 'Heo con',
        'Bò Tây Tạng': 'Bò Tây Tạng',
        'Bò Tây Tạng con': 'Bò Tây Tạng con'
      }
      return map[rawName] || rawName
    }
    return rawName
  }

  const getAnimalName = (type: AnimalType): string => {
    const raw = ANIMAL_DEFS.find(d => d.type === type)?.name ?? type
    return getAnimalVietnameseNameByName(raw)
  }

  const getItemName = (itemId: string): string => {
    return getItemById(itemId)?.name ?? itemId
  }

  const isBuildingBuilt = (type: AnimalBuildingType): boolean => {
    return animalStore.buildings.find(b => b.type === type)?.built ?? false
  }

  const getAnimalsInBuilding = (type: AnimalBuildingType) => {
    return animalStore.animals.filter(a => {
      const def = ANIMAL_DEFS.find(d => d.type === a.type)
      return def?.building === type
    })
  }

  const getAnimalDefsForBuilding = (type: AnimalBuildingType) => {
    return ANIMAL_DEFS.filter(d => d.building === type)
  }

  const getBuildingLevel = (type: AnimalBuildingType): number => {
    return animalStore.buildings.find(b => b.type === type)?.level ?? 0
  }

  const getBuildingDisplayName = (type: AnimalBuildingType): string => {
    const level = getBuildingLevel(type)
    if (level >= 2) {
      const upgrade = getBuildingUpgrade(type, level)
      if (upgrade) return upgrade.name
    }
    return ANIMAL_BUILDINGS.find(b => b.type === type)?.name ?? type
  }

  const getBuildingCapacity = (type: AnimalBuildingType): number => {
    const level = getBuildingLevel(type)
    if (type === 'stable') return 1
    return level * 4
  }

  const getMoodText = (mood: number): string => {
    if (mood > 200) return i18n.global.t('animalView.mood_happy')
    if (mood > 100) return i18n.global.t('animalView.mood_normal')
    return i18n.global.t('animalView.mood_sad')
  }

  const getMoodBarColor = (mood: number): string => {
    if (mood > 200) return 'bg-success'
    if (mood > 100) return 'bg-accent'
    return 'bg-danger'
  }

  const getFeedDisplayName = (id: string): string => {
    switch (id) {
      case 'hay': return i18n.global.t('items.hay') || 'Cỏ khô'
      case 'premium_feed': return 'Thức ăn tinh'
      case 'nourishing_feed': return 'Thức ăn bổ dưỡng'
      case 'vitality_feed': return 'Thức ăn sinh khí'
      default: return 'Cỏ khô'
    }
  }

  const getFeedDisplayDesc = (id: string): string => {
    switch (id) {
      case 'hay': return 'Thức ăn cơ bản'
      case 'premium_feed': return 'Tâm trạng +60, hảo cảm nhân đôi'
      case 'nourishing_feed': return 'Chu kỳ sản xuất -1 ngày'
      case 'vitality_feed': return '100% hồi phục bệnh trạng'
      default: return ''
    }
  }

  // === 放牧 ===

  const canGraze = computed(() => {
    if (animalStore.grazedToday) return false
    if (gameStore.isRainy) return false
    if (gameStore.season === 'winter') {
      return animalStore.animals.some(a => a.wasFed && a.type === 'yak')
    }
    const hasGrazeableAnimals = animalStore.animals.some(a => a.wasFed && a.type !== 'horse')
    return hasGrazeableAnimals
  })

  const grazeDisabledReason = computed(() => {
    if (animalStore.animals.filter(a => a.type !== 'horse').length === 0) return 'Không có gia súc'
    if (animalStore.grazedToday) return 'Hôm nay đã thả'
    if (gameStore.isRainy) return 'Trời mưa không thể chăn thả'
    if (gameStore.season === 'winter') {
      const hasYak = animalStore.animals.some(a => a.wasFed && a.type === 'yak')
      return hasYak ? '' : 'Mùa đông chỉ chăn thả được bò Tây Tạng'
    }
    if (!animalStore.animals.some(a => a.wasFed && a.type !== 'horse')) return 'Cho ăn rồi mới thả'
    return ''
  })

  // === 升级弹窗 ===

  interface UpgradeModalData {
    buildingType: AnimalBuildingType
    currentName: string
    currentLevel: number
    currentCapacity: number
    targetName: string
    targetLevel: number
    targetCapacity: number
    cost: number
    materials: { itemId: string; name: string; need: number; have: number }[]
  }

  const upgradeModal = ref<UpgradeModalData | null>(null)

  const openUpgradeModal = (type: AnimalBuildingType) => {
    const level = getBuildingLevel(type)
    const upgrade = getBuildingUpgrade(type, level + 1)
    if (!upgrade) return
    upgradeModal.value = {
      buildingType: type,
      currentName: getBuildingDisplayName(type),
      currentLevel: level,
      currentCapacity: level * 4,
      targetName: upgrade.name,
      targetLevel: upgrade.level,
      targetCapacity: upgrade.capacity,
      cost: upgrade.cost,
      materials: upgrade.materialCost.map(m => ({
        itemId: m.itemId,
        name: getItemName(m.itemId),
        need: m.quantity,
        have: inventoryStore.getItemCount(m.itemId)
      }))
    }
  }

  const canConfirmUpgrade = computed(() => {
    if (!upgradeModal.value) return false
    if (playerStore.money < upgradeModal.value.cost) return false
    return upgradeModal.value.materials.every(m => inventoryStore.getItemCount(m.itemId) >= m.need)
  })

  const confirmUpgradeBuilding = () => {
    if (!upgradeModal.value) return
    const type = upgradeModal.value.buildingType
    const targetName = upgradeModal.value.targetName
    const targetCapacity = upgradeModal.value.targetCapacity
    upgradeModal.value = null
    const success = animalStore.upgradeBuilding(type)
    if (success) {
      addLog(`Đã nâng cấp thành công lên${targetName}! Công suất tăng lên${targetCapacity}.`)
      const tr = gameStore.advanceTime(2)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    } else {
      addLog('Việc nâng cấp không thành công, vui lòng kiểm tra xem có đủ tiền đồng và nguyên liệu hay không.')
    }
  }

  // === 操作处理 ===

  const handleBuildBuilding = (type: AnimalBuildingType) => {
    const success = animalStore.buildBuilding(type)
    const bDef = ANIMAL_BUILDINGS.find(b => b.type === type)
    if (success) {
      addLog(`Đã xây dựng thành công${bDef?.name ?? 'chuồng ngựa'}!`)
      const tr = gameStore.advanceTime(2)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    } else {
      addLog(`xây dựng${bDef?.name ?? 'chuồng ngựa'}Nếu thất bại, vui lòng kiểm tra xem có đủ tiền đồng và nguyên liệu hay không.`)
    }
  }

  const handleBuyAnimal = (type: AnimalType) => {
    const aDef = ANIMAL_DEFS.find(d => d.type === type)
    if (!aDef) return
    const count = animalStore.animals.filter(a => a.type === type).length
    const defaultName = `${aDef.name}${count + 1}`
    const success = animalStore.buyAnimal(type, defaultName)
    if (success) {
      addLog(`đã mua một cái${aDef.name}, tên「${defaultName}」.`)
    } else {
      addLog(`mua${aDef.name}Nếu thất bại, vui lòng kiểm tra số xu và sức chứa của chuồng.`)
    }
  }

  const handlePetAnimal = (id: string) => {
    const success = animalStore.petAnimal(id)
    if (success) {
      const animal = animalStore.animals.find(a => a.id === id)
      addLog(`vuốt ve${animal?.name ?? 'động vật'}, sự thân thiện đã được cải thiện.`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.petAnimal)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    } else {
      addLog('Hôm nay đã chạm vào rồi.')
    }
  }

  const handlePetThePet = () => {
    const success = animalStore.petThePet()
    if (success) {
      addLog(`vuốt ve${animalStore.pet?.name ?? 'thú cưng'}, sự thuận lợi+5.`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.petAnimal)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    } else {
      addLog('Hôm nay đã chạm vào rồi.')
    }
  }

  const unpettedCount = computed(() => {
    let count = animalStore.animals.filter(a => !a.wasPetted).length
    if (animalStore.pet && !animalStore.pet.wasPetted) count++
    return count
  })

  const handlePetAll = () => {
    const STAMINA_COST = 2
    if (!playerStore.consumeStamina(STAMINA_COST)) {
      addLog('Không đủ thể lực để ch��m bằng một cú nhấp chuột.')
      return
    }
    const count = animalStore.petAllAnimals()
    if (count > 0) {
      addLog(`Chạm vào trong một hơi thở${count}Một con vật làm cho mọi người hạnh phúc!`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.batchPet)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    } else {
      addLog('Tôi đã chạm vào tất cả chúng ngày hôm nay.')
    }
  }

  const handleStartIncubation = (itemId: string) => {
    const result = animalStore.startIncubation(itemId)
    addLog(result.message)
  }

  const handleStartBarnIncubation = (itemId: string) => {
    const result = animalStore.startBarnIncubation(itemId)
    addLog(result.message)
  }

  const handleFeedAnimal = (animalId: string, animalName: string) => {
    const success = animalStore.feedAnimal(animalId, selectedFeed.value)
    if (success) {
      addLog(`sử dụng${selectedFeedName.value}Fed${animalName}.`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.petAnimal)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    } else {
      addLog(`${selectedFeedName.value}Không đủ để nuôi.`)
    }
  }

  const handleFeedAll = () => {
    const result = animalStore.feedAll(selectedFeed.value)
    const feedName = selectedFeedName.value
    if (result.fedCount > 0) {
      addLog(`sử dụng${feedName}Fed${result.fedCount}động vật.`)
    }
    if (result.noFeedCount > 0) {
      addLog(`${feedName}không đủ,${result.noFeedCount}Chỉ có động vật không ăn được.`)
    }
    if (result.fedCount === 0 && result.noFeedCount === 0) {
      addLog('Tất cả các loài động vật đã được cho ăn ngày hôm nay.')
    }
    if (result.fedCount > 0) {
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.feedAnimals)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    }
  }

  const handleBuyFeed = () => {
    const feed = FEED_DEFS.find(f => f.id === selectedFeed.value)
    if (!feed) return
    // 检查背包主区是否有空间(已有同类栈或有空位)，防止溢出到临时背包导致无法使sử dụng
    const hasStack = inventoryStore.items.some(s => s.itemId === feed.id && s.quality === 'normal' && s.quantity < 999)
    if (!hasStack && inventoryStore.isFull) {
      addLog('Ba lô đã đầy và không thể mua được.')
      return
    }
    if (!playerStore.spendMoney(feed.price)) {
      addLog(`Không đủ tiền đồng để mua${feed.name}.`)
      return
    }
    if (!inventoryStore.addItem(feed.id)) {
      // addItem 异常失败，退款
      playerStore.earnMoney(feed.price)
      addLog('Mua hàng không thành công và được hoàn tiền.')
      return
    }
    addLog(`đã mua1phần${feed.name}, chi tiêu${feed.price}Chữ.`)
  }

  const handleGraze = () => {
    const result = animalStore.grazeAnimals()
    addLog(result.message)
    if (result.success) {
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.graze)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    }
  }

  const handleHealAnimal = (animalId: string, animalName: string) => {
    const success = animalStore.healAnimal(animalId)
    if (success) addLog(`Chữa bệnh bằng thuốc thú y${animalName}.`)
    else addLog('Nếu điều trị thất bại, hãy kiểm tra thuốc thú y.')
  }

  const handleHealAll = () => {
    const result = animalStore.healAllSick()
    if (result.healedCount > 0) addLog(`Điều trị bằng thuốc thú y${result.healedCount}động vật.`)
    if (result.noMedicineCount > 0) addLog(`Thuốc thú y không đủ,${result.noMedicineCount}Chỉ có động vật không thể điều trị.`)
  }

  // === 改名 ===

  const renamingId = ref<string | null>(null)
  const renameInput = ref('')

  const startRename = (id: string, currentName: string) => {
    renamingId.value = id
    renameInput.value = currentName
  }

  const confirmRename = () => {
    if (!renamingId.value) return
    const success = animalStore.renameAnimal(renamingId.value, renameInput.value)
    if (success) {
      addLog(`đổi tên「${renameInput.value.trim()}」.`)
    } else {
      addLog('Không đổi được tên, cần phải có tên1-8từ.')
    }
    renamingId.value = null
  }

  const cancelRename = () => {
    renamingId.value = null
  }
</script>
