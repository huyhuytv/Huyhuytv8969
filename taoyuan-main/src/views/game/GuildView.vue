<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <div class="flex items-center space-x-1.5 text-sm text-accent">
        <Swords :size="14" />
        <span>Hội mạo hiểm giả Lv.{{ guildStore.guildLevel }}</span>
      </div>
      <div class="flex items-center space-x-2 text-xs">
        <span class="text-muted">
          Điểm đóng góp:
          <span class="text-accent">{{ guildStore.contributionPoints }}</span>
        </span>
      </div>
    </div>

    <!-- 标签页 -->
    <div class="flex space-x-1 mb-3">
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'goals' }" @click="tab = 'goals'">Thảo phạt</Button>
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'donate' }" @click="tab = 'donate'">Quyên góp</Button>
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'shop' }" @click="tab = 'shop'">Cửa hàng</Button>
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'bestiary' }" @click="tab = 'bestiary'">Thư viện</Button>
    </div>

    <!-- 讨伐任务 -->
    <div v-if="tab === 'goals'">
      <!-- 空状态 -->
      <div v-if="!hasAnyKills" class="flex flex-col items-center justify-center py-8 space-y-3 mb-3">
        <Swords :size="48" class="text-accent/30" />
        <p class="text-sm text-muted">Chưa có quái vật nào bị đánh bại</p>
        <p class="text-xs text-muted/60 text-center max-w-60">Đi đến mỏ để đánh bại quái vật và hoàn thành mục tiêu thập tự chinh để nhận phần thưởng.</p>
      </div>

      <!-- 区域筛选 -->
      <div class="grid grid-cols-3 md:grid-cols-none md:flex gap-1 md:space-x-1 mb-2 flex-wrap">
        <button
          v-for="z in ZONE_FILTERS"
          :key="z.key"
          class="btn text-xs"
          :class="{ '!bg-accent !text-bg': goalZone === z.key }"
          @click="goalZone = z.key"
        >
          {{ z.label }}
        </button>
      </div>

      <div class="flex flex-col space-y-2 max-h-72 overflow-y-auto">
        <div
          v-for="goal in filteredGoals"
          :key="goal.monsterId"
          class="border rounded-xs px-3 py-2 cursor-pointer hover:bg-accent/5 mr-1"
          :class="isGoalClaimed(goal.monsterId) ? 'border-success/30' : 'border-accent/20'"
          @click="selectedGoal = goal"
        >
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center space-x-1.5">
              <CircleCheck v-if="isGoalClaimed(goal.monsterId)" :size="12" class="text-success shrink-0" />
              <Circle
                v-else
                :size="12"
                class="shrink-0"
                :class="getKillCount(goal.monsterId) >= goal.killTarget ? 'text-accent' : 'text-muted'"
              />
              <span class="text-xs" :class="isGoalClaimed(goal.monsterId) ? 'text-success' : 'text-text'">{{ goal.monsterName }}</span>
            </div>
            <span class="text-xs text-muted">{{ getKillCount(goal.monsterId) }}/{{ goal.killTarget }}</span>
          </div>
          <!-- 进度条 -->
          <div class="h-1 bg-bg rounded-xs overflow-hidden">
            <div
              class="h-full transition-all"
              :class="getKillCount(goal.monsterId) >= goal.killTarget ? 'bg-success' : 'bg-accent/60'"
              :style="{ width: Math.min(100, (getKillCount(goal.monsterId) / goal.killTarget) * 100) + '%' }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 讨伐目标详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="selectedGoal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="selectedGoal = null"
      >
        <div ref="modalRef_68tcb" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="selectedGoal = null">
            <X :size="14" />
          </button>

          <p class="text-sm mb-2" :class="isGoalClaimed(selectedGoal.monsterId) ? 'text-success' : 'text-accent'">
            {{ selectedGoal.monsterName }}
          </p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ selectedGoal.description }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Tiến độ</span>
              <span class="text-xs">{{ getKillCount(selectedGoal.monsterId) }}/{{ selectedGoal.killTarget }}</span>
            </div>
            <div class="h-1.5 bg-bg rounded-xs overflow-hidden mt-1.5">
              <div
                class="h-full transition-all"
                :class="getKillCount(selectedGoal.monsterId) >= selectedGoal.killTarget ? 'bg-success' : 'bg-accent/60'"
                :style="{ width: Math.min(100, (getKillCount(selectedGoal.monsterId) / selectedGoal.killTarget) * 100) + '%' }"
              />
            </div>
          </div>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted mb-1">phần thưởng</p>
            <p class="text-xs text-accent">
              {{ selectedGoal.reward.money }}văn bản{{
                selectedGoal.reward.items
                  ? ' + ' + selectedGoal.reward.items.map(i => `${getDropName(i.itemId)}×${i.quantity}`).join(',')
                  : ''
              }}
              + {{ getGoalBonusPoints(selectedGoal) }}Điểm đóng góp
            </p>
          </div>

          <div v-if="isGoalClaimed(selectedGoal.monsterId)" class="border border-success/30 rounded-xs p-2">
            <div class="flex justify-center items-center space-x-1">
              <CircleCheck :size="12" class="text-success" />
              <span class="text-xs text-success">Đã hoàn thành</span>
            </div>
          </div>
          <Button
            :icon="Gift"
            v-else-if="getKillCount(selectedGoal.monsterId) >= selectedGoal.killTarget"
            class="btn text-xs w-full justify-center !bg-accent !text-bg"
            @click="handleClaimGoal(selectedGoal.monsterId)"
          >
            Nhận thưởng
          </Button>
        </div>
      </div>
    </Transition>

    <!-- Đóng góp -->
    <div v-if="tab === 'donate'">
      <div class="flex flex-col space-y-2 max-h-72 overflow-y-auto">
        <div
          v-for="item in donatableItems"
          :key="item.itemId"
          class="flex items-center justify-between border rounded-xs px-3 py-2 mr-1"
          :class="item.count > 0 ? 'border-accent/20 cursor-pointer hover:bg-accent/5' : 'border-accent/10 opacity-50'"
          @click="item.count > 0 && openDonateModal(item)"
        >
          <div class="flex-1">
            <p class="text-xs" :class="item.count > 0 ? 'text-text' : 'text-muted'">{{ item.name }}</p>
            <p class="text-xs text-muted">giữ {{ item.count }} · mỗi {{ item.points }} Điểm đóng góp</p>
          </div>
          <span class="text-xs ml-2" :class="item.count > 0 ? 'text-accent' : 'text-muted'">{{ item.count * item.points }}điểm</span>
        </div>
      </div>
    </div>

    <!-- Đóng góp弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="donateModalItem"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="donateModalItem = null"
      >
        <div ref="modalRef_iucyg" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="donateModalItem = null">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-2">Đóng góp{{ donateModalItem.name }}</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Số lượng nắm giữ</span>
              <span class="text-xs">{{ donateModalItem.count }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">điểm đóng góp duy nhất</span>
              <span class="text-xs text-accent">{{ donateModalItem.points }}</span>
            </div>
          </div>

          <!-- 数量选择 -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs text-muted">Số lượng góp</span>
              <div class="flex items-center space-x-1">
                <Button
                  class="h-6 px-1.5 py-0.5 text-xs justify-center"
                  :disabled="donateQuantity <= 1"
                  @click="donateQuantity = Math.max(1, donateQuantity - 1)"
                >
                  -
                </Button>
                <input
                  type="number"
                  :value="donateQuantity"
                  min="1"
                  :max="donateModalItem.count"
                  class="w-24 h-6 px-2 py-0.5 bg-bg border border-accent/30 rounded-xs text-xs text-center text-accent outline-none focus:border-accent transition-colors"
                  @input="onDonateInput"
                />
                <Button
                  class="h-6 px-1.5 py-0.5 text-xs justify-center"
                  :disabled="donateQuantity >= donateModalItem.count"
                  @click="donateQuantity = Math.min(donateModalItem.count, donateQuantity + 1)"
                >
                  +
                </Button>
              </div>
            </div>
            <div class="flex space-x-1">
              <Button class="flex-1 justify-center" :disabled="donateQuantity <= 1" @click="donateQuantity = 1">Ít nhất</Button>
              <Button
                class="flex-1 justify-center"
                :disabled="donateQuantity >= donateModalItem.count"
                @click="donateQuantity = donateModalItem.count"
              >
                Nhiều nhất
              </Button>
            </div>
            <div class="flex items-center justify-between mt-1.5">
              <span class="text-xs text-muted">Dự kiến nhận</span>
              <span class="text-xs text-accent">{{ donateQuantity * donateModalItem.points }} Điểm đóng góp</span>
            </div>
          </div>

          <!-- 确认状态 -->
          <div v-if="!donateConfirmed" class="flex flex-col space-y-1">
            <Button class="btn text-xs w-full justify-center !bg-accent !text-bg" :icon="HandHeart" @click="donateConfirmed = true">
              Xác nhận góp
            </Button>
          </div>
          <div v-else class="flex flex-col space-y-1">
            <p class="text-xs text-center text-danger mb-1">xác nhận quyên góp {{ donateQuantity }} một{{ donateModalItem.name }}?</p>
            <div class="flex space-x-2">
              <Button class="flex-1 btn text-xs justify-center" @click="donateConfirmed = false">Hủy</Button>
              <Button class="flex-1 btn text-xs justify-center !bg-accent !text-bg" :icon="HandHeart" @click="executeDonate">Quyên góp</Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- bang hội商店 -->
    <div v-if="tab === 'shop'" class="flex flex-col space-y-2">
      <div
        v-for="item in GUILD_SHOP_ITEMS"
        :key="item.itemId"
        class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-2 cursor-pointer hover:bg-accent/5"
        @click="openShopModal(item)"
      >
        <div>
          <p class="text-sm" :class="guildStore.isShopItemUnlocked(item.itemId) ? '' : 'text-muted'">{{ item.name }}</p>
          <p class="text-xs text-muted">{{ item.description }}</p>
          <p v-if="item.materials && guildStore.isShopItemUnlocked(item.itemId)" class="text-xs text-muted mt-0.5">
            Chất liệu:
            <span
              v-for="(mat, idx) in item.materials"
              :key="mat.itemId"
              :class="inventoryStore.getItemCount(mat.itemId) >= mat.quantity ? 'text-success' : 'text-danger'"
            >
              {{ getMaterialName(mat.itemId) }}×{{ mat.quantity }}
              <span v-if="idx < item.materials.length - 1">,</span>
            </span>
          </p>
          <p v-if="item.unlockGuildLevel && !guildStore.isShopItemUnlocked(item.itemId)" class="text-xs text-danger mt-0.5">
            <Lock :size="10" class="inline" />
            bang hội Lv.{{ item.unlockGuildLevel }} Mở khóa
          </p>
          <p v-if="item.dailyLimit && guildStore.isShopItemUnlocked(item.itemId)" class="text-xs text-muted mt-0.5">
            Còn lại hôm nay: {{ guildStore.getDailyRemaining(item.itemId, item.dailyLimit) }}/{{ item.dailyLimit }}
          </p>
          <p v-if="item.weeklyLimit && guildStore.isShopItemUnlocked(item.itemId)" class="text-xs text-muted mt-0.5">
            Phần còn lại của tuần: {{ guildStore.getWeeklyRemaining(item.itemId, item.weeklyLimit) }}/{{ item.weeklyLimit }}
          </p>
          <p v-if="item.totalLimit && guildStore.isShopItemUnlocked(item.itemId)" class="text-xs text-muted mt-0.5">
            Tổng giới hạn mua hàng: {{ guildStore.getTotalRemaining(item.itemId, item.totalLimit) }}/{{ item.totalLimit }}
          </p>
        </div>
        <span class="text-xs whitespace-nowrap ml-2" :class="item.contributionCost ? 'text-success' : 'text-accent'">
          {{ item.contributionCost ? `${item.contributionCost}Đóng góp` : `${item.price}văn bản` }}
        </span>
      </div>
    </div>

    <!-- 商店mua弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="shopModalItem"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-40 p-4"
        @click.self="shopModalItem = null"
      >
        <div ref="modalRef_9kg7j" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="shopModalItem = null">
            <X :size="14" />
          </button>
          <p class="text-sm text-accent mb-2">{{ shopModalItem.name }}</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ shopModalItem.description }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">{{ shopBuyQty > 1 ? 'Đơn giá' : 'Giá' }}</span>
              <span class="text-xs" :class="shopModalItem.contributionCost ? 'text-success' : 'text-accent'">
                {{ shopModalItem.contributionCost ? `${shopModalItem.contributionCost} Điểm đóng góp` : `${shopModalItem.price}văn bản` }}
              </span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Đang có</span>
              <span class="text-xs">{{ inventoryStore.getItemCount(shopModalItem.itemId) }}</span>
            </div>
            <div v-if="shopModalItem.contributionCost" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Điểm cống hiến hiện có</span>
              <span
                class="text-xs"
                :class="guildStore.contributionPoints >= (shopModalItem.contributionCost ?? 0) * shopBuyQty ? 'text-text' : 'text-danger'"
              >
                {{ guildStore.contributionPoints }}
              </span>
            </div>
            <div v-else class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Đồng tiền hiện có</span>
              <span class="text-xs" :class="playerStore.money >= shopModalItem.price * shopBuyQty ? 'text-text' : 'text-danger'">
                {{ playerStore.money }}văn bản
              </span>
            </div>
            <template v-if="shopModalItem.materials">
              <div class="border-t border-accent/10 mt-1.5 pt-1.5">
                <span class="text-xs text-muted">Vật liệu cần</span>
              </div>
              <div v-for="mat in shopModalItem.materials" :key="mat.itemId" class="flex items-center justify-between mt-0.5">
                <span class="text-xs">{{ getMaterialName(mat.itemId) }} ×{{ mat.quantity * shopBuyQty }}</span>
                <span
                  class="text-xs"
                  :class="inventoryStore.getItemCount(mat.itemId) >= mat.quantity * shopBuyQty ? 'text-success' : 'text-danger'"
                >
                  {{ inventoryStore.getItemCount(mat.itemId) }}/{{ mat.quantity * shopBuyQty }}
                </span>
              </div>
            </template>
            <div v-if="shopModalItem.dailyLimit" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Hôm nay còn</span>
              <span class="text-xs">
                {{ guildStore.getDailyRemaining(shopModalItem.itemId, shopModalItem.dailyLimit) }}/{{ shopModalItem.dailyLimit }}
              </span>
            </div>
            <div v-if="shopModalItem.weeklyLimit" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Tuần này còn</span>
              <span class="text-xs">
                {{ guildStore.getWeeklyRemaining(shopModalItem.itemId, shopModalItem.weeklyLimit) }}/{{ shopModalItem.weeklyLimit }}
              </span>
            </div>
            <div v-if="shopModalItem.totalLimit" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Tổng giới hạn mua hàng còn lại</span>
              <span class="text-xs">
                {{ guildStore.getTotalRemaining(shopModalItem.itemId, shopModalItem.totalLimit) }}/{{ shopModalItem.totalLimit }}
              </span>
            </div>
          </div>

          <!-- 数量选择（可批量mua时显示） -->
          <div v-if="maxShopBuyQty > 1" class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs text-muted">Số lượng</span>
              <div class="flex items-center space-x-1">
                <Button class="h-6 px-1.5 py-0.5 text-xs justify-center" :disabled="shopBuyQty <= 1" @click="addShopBuyQty(-1)">-</Button>
                <input
                  type="number"
                  :value="shopBuyQty"
                  min="1"
                  :max="maxShopBuyQty"
                  class="w-24 h-6 px-2 py-0.5 bg-bg border border-accent/30 rounded-xs text-xs text-center text-accent outline-none focus:border-accent transition-colors"
                  @input="onShopBuyQtyInput"
                />
                <Button class="h-6 px-1.5 py-0.5 text-xs justify-center" :disabled="shopBuyQty >= maxShopBuyQty" @click="addShopBuyQty(1)">
                  +
                </Button>
              </div>
            </div>
            <div class="flex space-x-1">
              <Button class="flex-1 justify-center" :disabled="shopBuyQty <= 1" @click="setShopBuyQty(1)">Ít nhất</Button>
              <Button class="flex-1 justify-center" :disabled="shopBuyQty >= maxShopBuyQty" @click="setShopBuyQty(maxShopBuyQty)">
                Nhiều nhất
              </Button>
            </div>
            <div class="flex items-center justify-between mt-1.5">
              <span class="text-xs text-muted">Tổng cộng</span>
              <span class="text-xs" :class="shopModalItem.contributionCost ? 'text-success' : 'text-accent'">
                {{ shopBuyTotalCost }}{{ shopModalItem.contributionCost ? 'Điểm đóng góp' : ' xu' }}
              </span>
            </div>
          </div>

          <p v-if="shopModalItem.unlockGuildLevel && !guildStore.isShopItemUnlocked(shopModalItem.itemId)" class="text-xs text-danger mb-2">
            <Lock :size="10" class="inline" />
            bang hội Lv.{{ shopModalItem.unlockGuildLevel }} Mở khóa
          </p>
          <Button
            v-else
            class="btn text-xs w-full justify-center"
            :class="canBuyItem(shopModalItem) ? '!bg-accent !text-bg' : 'opacity-50 cursor-not-allowed'"
            :icon="ShoppingCart"
            :disabled="!canBuyItem(shopModalItem)"
            @click="handleBuyShopItem"
          >
            {{
              maxShopBuyQty > 1
                ? `mua ×${shopBuyQty}`
                : `mua ${shopModalItem.contributionCost ? `${shopModalItem.contributionCost}Đóng góp` : `${shopModalItem.price}văn bản`}`
            }}
          </Button>
        </div>
      </div>
    </Transition>

    <!-- 怪物图鉴 -->
    <div v-if="tab === 'bestiary'">
      <div v-if="guildStore.encounteredMonsters.length === 0" class="flex flex-col items-center justify-center py-8 space-y-3">
        <BookOpen :size="48" class="text-accent/30" />
        <p class="text-sm text-muted">Chưa có ghi chép nào trong sách minh họa</p>
        <p class="text-xs text-muted/60 text-center max-w-60">Sau khi gặp quái vật trong hầm mỏ, thông tin của chúng sẽ được ghi lại tại đây</p>
      </div>
      <template v-else>
        <p class="text-xs text-muted mb-2">Đã tìm thấy {{ guildStore.encounteredMonsters.length }}/{{ allMonsters.length }}</p>
        <div class="max-h-72 overflow-y-auto flex flex-col space-y-3">
          <div v-for="group in monsterGroups" :key="group.label">
            <p class="text-xs text-accent mb-1">{{ group.label }}</p>
            <div class="grid grid-cols-3 md:grid-cols-5 gap-1 mr-1">
              <div
                v-for="monster in group.monsters"
                :key="monster.id"
                class="border rounded-xs p-1.5 text-xs text-center transition-colors truncate"
                :class="
                  guildStore.isEncountered(monster.id)
                    ? 'border-accent/20 cursor-pointer hover:bg-accent/5 text-text'
                    : 'border-accent/10 text-muted/30'
                "
                @click="guildStore.isEncountered(monster.id) && (selectedMonster = monster)"
              >
                <template v-if="guildStore.isEncountered(monster.id)">{{ monster.name }}</template>
                <Lock v-else :size="12" class="mx-auto text-muted/30" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 怪物详情弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="selectedMonster"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="selectedMonster = null"
      >
        <div ref="modalRef_8ajaq" class="game-panel max-w-xs w-full relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="selectedMonster = null">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-2">{{ selectedMonster.name }}</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">HP</span>
              <span class="text-xs text-danger">{{ selectedMonster.hp }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Công</span>
              <span class="text-xs text-accent">{{ selectedMonster.attack }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Thủ</span>
              <span class="text-xs">{{ selectedMonster.defense }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Số kill</span>
              <span class="text-xs">{{ guildStore.getKillCount(selectedMonster.id) }}</span>
            </div>
          </div>

          <div v-if="selectedMonster.drops.length > 0" class="border border-accent/10 rounded-xs p-2">
            <p class="text-xs text-muted mb-1">Vật rơi ra</p>
            <div v-for="drop in selectedMonster.drops" :key="drop.itemId" class="flex items-center justify-between mt-0.5">
              <span class="text-xs">{{ getDropName(drop.itemId) }}</span>
              <span class="text-xs text-muted">{{ Math.round(drop.chance * 100) }}%</span>
            </div>
          </div>

          <div v-if="getEquipDrops(selectedMonster).length > 0" class="border border-accent/10 rounded-xs p-2 mt-2">
            <p class="text-xs text-muted mb-1">Trang bị rơi</p>
            <div v-for="(drop, idx) in getEquipDrops(selectedMonster)" :key="idx" class="flex items-center justify-between mt-0.5">
              <span class="text-xs">
                {{ drop.name }}
                <span v-if="drop.firstKill" class="text-[10px] text-accent">(giết đầu tiên)</span>
              </span>
              <span v-if="drop.chance !== null" class="text-xs text-muted">{{ Math.round(drop.chance * 100) }}%</span>
              <span v-else class="text-xs text-success">Chắc chắn nhận</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 底部统计 -->
    <div class="mt-3 border border-accent/20 rounded-xs p-2">
      <div class="flex items-center space-x-2 text-xs mb-1.5">
        <span class="text-muted shrink-0">Tiến độ thảo phạt</span>
        <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
          <div
            class="h-full bg-accent rounded-xs transition-all"
            :style="{ width: Math.round((guildStore.completedGoalCount / MONSTER_GOALS.length) * 100) + '%' }"
          />
        </div>
        <span class="text-accent whitespace-nowrap">{{ Math.round((guildStore.completedGoalCount / MONSTER_GOALS.length) * 100) }}%</span>
      </div>
      <div class="grid grid-cols-2 gap-x-3 gap-y-0.5">
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Thập tự chinh đã hoàn thành</span>
          <span class="text-xs">{{ guildStore.completedGoalCount }}/{{ MONSTER_GOALS.length }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Đã nhận được phần thưởng</span>
          <span class="text-xs">{{ guildStore.claimedGoals.length }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Gặp phải quái vật</span>
          <span class="text-xs">{{ guildStore.encounteredMonsters.length }}/{{ allMonsters.length }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Cấp bang hội</span>
          <span class="text-xs text-accent">Lv.{{ guildStore.guildLevel }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

  import { useFocusTrap } from '@/composables/useFocusTrap'
  import { ref, computed } from 'vue'
  import { Swords, Gift, CircleCheck, Circle, Lock, ShoppingCart, BookOpen, X, HandHeart } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import { useGuildStore } from '@/stores/useGuildStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { MONSTER_GOALS, GUILD_SHOP_ITEMS, GUILD_DONATIONS } from '@/data/guild'
  import { MONSTERS, BOSS_MONSTERS, ZONE_MONSTERS, SKULL_CAVERN_MONSTERS } from '@/data/mine'
  import { MONSTER_DROP_WEAPONS, BOSS_DROP_WEAPONS, getWeaponById } from '@/data/weapons'
  import { MONSTER_DROP_RINGS, BOSS_DROP_RINGS, getRingById } from '@/data/rings'
  import { MONSTER_DROP_HATS, BOSS_DROP_HATS, getHatById } from '@/data/hats'
  import { MONSTER_DROP_SHOES, BOSS_DROP_SHOES, getShoeById } from '@/data/shoes'
  import type { MonsterDef, GuildShopItemDef, MonsterGoalDef } from '@/types'
  import { getItemById } from '@/data/items'
  import { addLog } from '@/composables/useGameLog'


  const modalRef_68tcb = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_68tcb);
  const modalRef_iucyg = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_iucyg);
  const modalRef_9kg7j = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_9kg7j);
  const modalRef_8ajaq = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_8ajaq);



  type Tab = 'goals' | 'shop' | 'bestiary' | 'donate'

  const guildStore = useGuildStore()
  const playerStore = usePlayerStore()
  const inventoryStore = useInventoryStore()

  const tab = ref<Tab>('goals')
  const goalZone = ref('all')
  const shopModalItem = ref<GuildShopItemDef | null>(null)
  const shopBuyQty = ref(1)
  const selectedGoal = ref<MonsterGoalDef | null>(null)
  const selectedMonster = ref<MonsterDef | null>(null)

  const openShopModal = (item: GuildShopItemDef) => {
    shopModalItem.value = item
    shopBuyQty.value = 1
  }

  /** 最大可mua数量 */
  const maxShopBuyQty = computed(() => {
    const item = shopModalItem.value
    if (!item) return 1
    if (!guildStore.isShopItemUnlocked(item.itemId)) return 0
    if (item.equipType) return 1
    let max = 999
    if (item.contributionCost) {
      max = Math.min(max, Math.floor(guildStore.contributionPoints / item.contributionCost))
    } else if (item.price > 0) {
      max = Math.min(max, Math.floor(playerStore.money / item.price))
    }
    if (item.materials) {
      for (const mat of item.materials) {
        max = Math.min(max, Math.floor(inventoryStore.getItemCount(mat.itemId) / mat.quantity))
      }
    }
    if (item.dailyLimit) max = Math.min(max, guildStore.getDailyRemaining(item.itemId, item.dailyLimit))
    if (item.weeklyLimit) max = Math.min(max, guildStore.getWeeklyRemaining(item.itemId, item.weeklyLimit))
    if (item.totalLimit) max = Math.min(max, guildStore.getTotalRemaining(item.itemId, item.totalLimit))
    return Math.max(0, max)
  })

  const shopBuyTotalCost = computed(() => {
    if (!shopModalItem.value) return 0
    if (shopModalItem.value.contributionCost) return shopModalItem.value.contributionCost * shopBuyQty.value
    return shopModalItem.value.price * shopBuyQty.value
  })

  const setShopBuyQty = (val: number) => {
    shopBuyQty.value = Math.max(1, Math.min(val, maxShopBuyQty.value))
  }

  const addShopBuyQty = (delta: number) => {
    setShopBuyQty(shopBuyQty.value + delta)
  }

  const onShopBuyQtyInput = (e: Event) => {
    const val = parseInt((e.target as HTMLInputElement).value, 10)
    if (!isNaN(val)) setShopBuyQty(val)
  }

  const handleBuyShopItem = () => {
    if (!shopModalItem.value) return
    const itemId = shopModalItem.value.itemId
    const qty = Math.min(shopBuyQty.value, maxShopBuyQty.value)
    for (let i = 0; i < qty; i++) {
      if (!guildStore.buyShopItem(itemId)) break
    }
    shopModalItem.value = null
  }

  const handleClaimGoal = (monsterId: string) => {
    guildStore.claimGoal(monsterId)
    selectedGoal.value = null
  }

  /** 计算讨伐目标的Điểm đóng gópphần thưởng */
  const getGoalBonusPoints = (goal: MonsterGoalDef): number => {
    return Math.floor((goal.reward.money ?? 0) / 20) + goal.killTarget
  }

  /** Đóng góp弹窗状态 */
  const donateModalItem = ref<{ itemId: string; name: string; count: number; points: number } | null>(null)
  const donateQuantity = ref(1)
  const donateConfirmed = ref(false)

  const openDonateModal = (item: { itemId: string; name: string; count: number; points: number }) => {
    donateModalItem.value = item
    donateQuantity.value = 1
    donateConfirmed.value = false
  }

  const onDonateInput = (e: Event) => {
    const val = parseInt((e.target as HTMLInputElement).value)
    if (!donateModalItem.value || isNaN(val)) return
    donateQuantity.value = Math.max(1, Math.min(donateModalItem.value.count, val))
  }

  const executeDonate = () => {
    if (!donateModalItem.value) return
    const result = guildStore.donateItem(donateModalItem.value.itemId, donateQuantity.value)
    if (result.success) {
      addLog(`Đã quyên góp${donateModalItem.value.name}×${donateQuantity.value}, nhận được ${result.pointsGained} Điểm đóng góp.`)
    }
    donateModalItem.value = null
    donateConfirmed.value = false
  }

  /** 获取Chất liệu名称 */
  const getMaterialName = (itemId: string): string => {
    return getItemById(itemId)?.name ?? itemId
  }

  /** 判断能否mua商品 */
  const canBuyItem = (item: GuildShopItemDef): boolean => {
    if (!guildStore.isShopItemUnlocked(item.itemId)) return false
    if (item.dailyLimit && guildStore.getDailyRemaining(item.itemId, item.dailyLimit) <= 0) return false
    if (item.weeklyLimit && guildStore.getWeeklyRemaining(item.itemId, item.weeklyLimit) <= 0) return false
    if (item.totalLimit && guildStore.getTotalRemaining(item.itemId, item.totalLimit) <= 0) return false
    if (item.materials) {
      for (const mat of item.materials) {
        if (inventoryStore.getItemCount(mat.itemId) < mat.quantity) return false
      }
    }
    if (item.contributionCost) return guildStore.contributionPoints >= item.contributionCost
    return playerStore.money >= item.price
  }

  const hasAnyKills = computed(() => Object.values(guildStore.monsterKills).some(v => v > 0))

  /** 可Đóng góp物品列表 */
  const donatableItems = computed(() => {
    return GUILD_DONATIONS.map(donation => {
      const count = inventoryStore.getItemCount(donation.itemId)
      const def = getItemById(donation.itemId)
      return { itemId: donation.itemId, name: def?.name ?? donation.itemId, count, points: donation.points }
    })
  })

  const ZONE_FILTERS = [
    { key: 'all', label: 'Tất cả' },
    { key: 'shallow', label: 'Tầng cạn' },
    { key: 'frost', label: 'Băng giá' },
    { key: 'lava', label: 'Dung nham' },
    { key: 'crystal', label: 'Pha lê' },
    { key: 'shadow', label: 'Bóng tối' },
    { key: 'abyss', label: 'Vực thẳm' },
    { key: 'boss', label: 'BOSS' },
    { key: 'skull', label: 'Động khô lâu' }
  ]

  const filteredGoals = computed(() => {
    if (goalZone.value === 'all') return MONSTER_GOALS
    return MONSTER_GOALS.filter(g => g.zone === goalZone.value)
  })

  const getKillCount = (monsterId: string): number => {
    return guildStore.getKillCount(monsterId)
  }

  const isGoalClaimed = (monsterId: string): boolean => {
    return guildStore.claimedGoals.includes(monsterId)
  }

  /** 怪物图鉴：合并普通怪+BOSS+骷髅矿穴 */
  const allMonsters = computed<MonsterDef[]>(() => {
    const list: MonsterDef[] = []
    for (const m of Object.values(MONSTERS)) {
      list.push(m)
    }
    for (const m of Object.values(BOSS_MONSTERS)) {
      list.push(m)
    }
    for (const m of Object.values(SKULL_CAVERN_MONSTERS)) {
      list.push(m)
    }
    return list
  })

  /** 怪物图鉴分组 */
  const monsterGroups = computed(() => [
    { label: 'Quái vật thông thường', monsters: Object.values(MONSTERS) as MonsterDef[] },
    { label: 'BOSS', monsters: Object.values(BOSS_MONSTERS) as MonsterDef[] },
    { label: 'Động khô lâu', monsters: Object.values(SKULL_CAVERN_MONSTERS) as MonsterDef[] }
  ])

  const getDropName = (itemId: string): string => {
    return getItemById(itemId)?.name ?? itemId
  }

  /** 获取Quái vật thông thường所在区域 */
  const getMonsterZone = (monsterId: string): string | null => {
    for (const [zone, monsters] of Object.entries(ZONE_MONSTERS)) {
      if (monsters.some(m => m.id === monsterId)) return zone
    }
    return null
  }

  /** 获取 BOSS 所在楼层 */
  const getBossFloor = (monsterId: string): number | null => {
    for (const [floor, monster] of Object.entries(BOSS_MONSTERS)) {
      if (monster.id === monsterId) return Number(floor)
    }
    return null
  }

  /** 获取怪物的装备掉落列表 */
  const getEquipDrops = (monster: MonsterDef): { name: string; chance: number | null; firstKill: boolean }[] => {
    const drops: { name: string; chance: number | null; firstKill: boolean }[] = []
    const zone = getMonsterZone(monster.id)
    const bossFloor = getBossFloor(monster.id)

    if (zone) {
      for (const d of MONSTER_DROP_WEAPONS[zone] ?? []) {
        drops.push({ name: getWeaponById(d.weaponId)?.name ?? d.weaponId, chance: d.chance, firstKill: false })
      }
      for (const d of MONSTER_DROP_RINGS[zone] ?? []) {
        drops.push({ name: getRingById(d.ringId)?.name ?? d.ringId, chance: d.chance, firstKill: false })
      }
      for (const d of MONSTER_DROP_HATS[zone] ?? []) {
        drops.push({ name: getHatById(d.hatId)?.name ?? d.hatId, chance: d.chance, firstKill: false })
      }
      for (const d of MONSTER_DROP_SHOES[zone] ?? []) {
        drops.push({ name: getShoeById(d.shoeId)?.name ?? d.shoeId, chance: d.chance, firstKill: false })
      }
    } else if (bossFloor !== null) {
      const w = BOSS_DROP_WEAPONS[bossFloor]
      if (w) drops.push({ name: getWeaponById(w)?.name ?? w, chance: null, firstKill: true })
      const r = BOSS_DROP_RINGS[bossFloor]
      if (r) drops.push({ name: getRingById(r)?.name ?? r, chance: null, firstKill: false })
      const h = BOSS_DROP_HATS[bossFloor]
      if (h) drops.push({ name: getHatById(h)?.name ?? h, chance: null, firstKill: false })
      const s = BOSS_DROP_SHOES[bossFloor]
      if (s) drops.push({ name: getShoeById(s)?.name ?? s, chance: null, firstKill: false })
    }
    return drops
  }
</script>
