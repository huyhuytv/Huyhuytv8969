<template>
  <main
    class="flex min-h-screen flex-col items-center justify-center space-y-8 px-4"
    @click.once="startBgm"
    :class="{ 'py-10': Capacitor.isNativePlatform() }"
    @click="slotMenuOpen = null"
    aria-labelledby="main-title"
  >
    <!-- 标题 -->
    <header class="flex items-center space-x-3">
      <div class="logo" aria-hidden="true" />
      <h1 id="main-title" class="text-accent text-2xl md:text-4xl tracking-widest">{{ pkg.title }}</h1>
    </header>

    <!-- 主菜单 -->
    <nav class="flex flex-col space-y-3 w-full md:w-6/12" aria-label="Main menu">
      <Button class="text-center justify-center py-3" :icon="Play" @click="showPrivacy = true">{{ $t('menu.new_game') }}</Button>

      <!-- 存档列表 -->
      <div v-for="info in slots" :key="info.slot" class="w-full">
        <div v-if="info.exists" class="flex space-x-1 w-full">
          <button class="btn flex-1 !justify-between" @click="handleLoadGame(info.slot)">
            <span class="inline-flex items-center space-x-1">
              <FolderOpen :size="14" />
              <span>{{ $t('menu.slot', { num: info.slot + 1 }) }}</span>
            </span>
            <span class="text-muted text-xs">
              {{ info.playerName ?? $t('menu.unnamed') }} · {{ $t('menu.year', { year: info.year }) }} {{ SEASON_NAMES[info.season as keyof typeof SEASON_NAMES] }} {{
                $t('menu.day', { day: info.day })
              }}
            </span>
          </button>
          <div class="relative">
            <Button
              class="px-2 h-full"
              :icon="Settings"
              :icon-size="12"
              @click.stop="slotMenuOpen = slotMenuOpen === info.slot ? null : info.slot"
            />
            <div
              v-if="slotMenuOpen === info.slot"
              class="absolute right-0 top-full mt-1 z-10 flex flex-col border border-accent/30 rounded-xs overflow-hidden w-30"
            >
              <Button
                v-if="!Capacitor.isNativePlatform()"
                class="text-center !rounded-none justify-center !text-sm"
                :icon="Download"
                :icon-size="12"
                @click="handleExportSlot(info.slot)"
              >
                {{ $t('menu.export') }}
              </Button>
              <Button
                class="btn-danger !rounded-none text-center justify-center !text-sm"
                :icon="Trash2"
                :icon-size="12"
                @click="handleDeleteSlot(info.slot)"
              >
                {{ $t('menu.delete') }}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- 导入存档 -->
      <template v-if="!Capacitor.isNativePlatform()">
        <Button class="text-center justify-center" :icon="Upload" @click="triggerImport">{{ $t('menu.import_save') }}</Button>
        <input ref="fileInputRef" type="file" accept=".tyx" class="hidden" @change="handleImportFile" />
      </template>
      <!-- 关于 -->
      <Button class="text-center justify-center text-muted" :icon="Info" @click="showAbout = true">{{ $t('menu.about_game') }}</Button>
    </nav>

    <!-- 关于弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="showAbout" class="fixed inset-0 z-50 flex items-center justify-center bg-bg/80" @click.self="showAbout = false">
        <div ref="modalRef_e251o" class="game-panel w-full max-w-md mx-4 text-center relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showAbout = false">
            <X :size="14" />
          </button>
          <h2 class="text-accent text-lg mb-3">{{ $t('menu.about_title', { title: pkg.title }) }}</h2>
          <!-- 分区标签 -->
          <div class="flex space-x-1.5 mb-3">
            <Button
              class="flex-1 justify-center"
              :class="{ '!bg-accent !text-bg': aboutTab === 'about' }"
              :icon="Info"
              @click="aboutTab = 'about'"
            >
              {{ $t('menu.about') }}
            </Button>
            <Button
              class="flex-1 justify-center"
              :class="{ '!bg-accent !text-bg': aboutTab === 'author' }"
              :icon="UserRound"
              @click="aboutTab = 'author'"
            >
              {{ $t('menu.sponsor') }}
            </Button>
          </div>
          <!-- 关于 -->
          <div v-if="aboutTab === 'about'" class="flex flex-col space-y-3 text-sm">
            <p class="text-xs text-muted">{{ $t('menu.inspiration') }}</p>
            <div class="border border-accent/20 rounded-xs p-3">
              <p class="text-muted text-xs mb-1">{{ $t('menu.current_version') }}</p>
              <p class="text-accent">v{{ pkg.version }}</p>
            </div>
            <div class="border border-accent/20 rounded-xs p-3">
              <p class="text-muted text-xs mb-1">{{ $t('menu.qq_group') }}</p>
              <a href="https://qm.qq.com/q/2BVaTTwDkI" target="_blank" class="text-accent underline break-all">
                {{ pkg.qq }}
              </a>
            </div>
            <div class="border border-accent/20 rounded-xs p-3">
              <p class="text-muted text-xs mb-1">{{ $t('menu.github_repo') }}</p>
              <a :href="`https://github.com/${pkg.author}/${pkg.name}`" target="_blank" class="text-accent underline break-all">
                https://github.com/{{ pkg.author }}/{{ pkg.name }}
              </a>
            </div>
            <div class="border border-accent/20 rounded-xs p-3">
              <p class="text-muted text-xs mb-1">TapTap</p>
              <a :href="`https://www.taptap.cn/app/${pkg.tapid}`" target="_blank" class="text-accent underline break-all">
                https://www.taptap.cn/app/{{ pkg.tapid }}
              </a>
            </div>
          </div>
          <!-- 赞助作者 -->
          <div v-if="aboutTab === 'author'" class="flex flex-col space-y-3 text-sm">
            <p class="text-xs text-muted">{{ $t('menu.sponsor_desc') }}</p>
            <div class="flex space-x-3">
              <div class="flex-1 border border-accent/20 rounded-xs p-3">
                <p class="text-muted text-xs mb-2">{{ $t('menu.alipay') }}</p>
                <img
                  src="@/assets/alipay.png"
                  :alt="i18n.global.locale.value === 'vi' ? 'Alipay' : 'Alipay'"
                  class="mx-auto"
                  style="width: 120px; height: 120px; image-rendering: pixelated"
                />
              </div>
              <div class="flex-1 border border-accent/20 rounded-xs p-3">
                <p class="text-muted text-xs mb-2">{{ $t('menu.wechat') }}</p>
                <img src="@/assets/wechat.png" :alt="i18n.global.locale.value === 'vi' ? 'WeChat' : 'WeChat'" class="mx-auto" style="width: 120px; height: 120px; image-rendering: pixelated" />
              </div>
            </div>
            <div class="border border-accent/20 rounded-xs p-3">
              <p class="text-muted text-xs mb-1">{{ $t('menu.afdian') }}</p>
              <a :href="`https://afdian.com/a/${pkg.author}`" target="_blank" class="text-accent underline break-all">
                https://afdian.com/a/{{ pkg.author }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 角色创建弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="showCharCreate && !showFarmSelect" class="fixed inset-0 z-50 flex items-center justify-center bg-bg/80">
        <div ref="modalRef_9kc7v" class="game-panel w-full max-w-xs mx-4 relative" role="dialog" aria-modal="true" tabindex="-1">
          <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="handleBackToMenu">
            <X :size="14" />
          </button>
          <p class="text-accent text-sm mb-4 text-center">{{ $t('menu.create_char') }}</p>
          <div class="flex flex-col space-y-4">
            <!-- 名字输入 -->
            <div>
              <label class="text-xs text-muted mb-1 block">{{ $t('menu.your_name') }}</label>
              <input
                v-model="charName"
                type="text"
                maxlength="4"
                :placeholder="$t('menu.name_placeholder')"
                class="w-full px-3 py-2 bg-bg border border-accent/30 rounded-xs text-sm focus:border-accent outline-none"
              />
            </div>
            <!-- 性别选择 -->
            <div>
              <label id="gender-group-label" class="text-xs text-muted mb-1 block">{{ $t('menu.gender') }}</label>
              <div class="flex space-x-3" role="radiogroup" aria-labelledby="gender-group-label">
                <Button
                  class="flex-1 justify-center py-2"
                  :class="charGender === 'male' ? '!border-accent !bg-accent/10' : ''"
                  role="radio"
                  :aria-checked="charGender === 'male'"
                  @click="charGender = 'male'"
                >
                  {{ $t('menu.male') }}
                </Button>
                <Button
                  class="flex-1 justify-center py-2"
                  :class="charGender === 'female' ? '!border-accent !bg-accent/10' : ''"
                  role="radio"
                  :aria-checked="charGender === 'female'"
                  @click="charGender = 'female'"
                >
                  {{ $t('menu.female') }}
                </Button>
              </div>
            </div>
          </div>
          <div class="flex space-x-3 justify-center mt-4">
            <Button :icon-size="12" :icon="ArrowLeft" @click="handleBackToMenu">{{ $t('menu.back') }}</Button>
            <Button class="px-6" :disabled="!charName.trim()" :icon-size="12" :icon="Play" @click="handleCharCreateNext">{{ $t('menu.next') }}</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 农场选择弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="showFarmSelect" class="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4">
        <div ref="modalRef_co6cp" class="game-panel w-full max-w-xl max-h-[80vh] flex flex-col relative" role="dialog" aria-modal="true" tabindex="-1">
          <button class="absolute top-2 right-2 text-muted hover:text-text z-10" @click="handleBackToCharCreate">
            <X :size="14" />
          </button>
          <p id="farm-group-label" class="text-accent text-sm mb-3 text-center shrink-0">{{ $t('menu.select_farm') }}</p>
          <div class="flex-1 overflow-y-auto min-h-0">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2" role="radiogroup" aria-labelledby="farm-group-label">
              <button
                v-for="farm in FARM_MAP_DEFS"
                :key="farm.type"
                class="border border-accent/20 rounded-xs p-3 text-left transition-all cursor-pointer hover:border-accent/50"
                role="radio"
                :aria-checked="selectedMap === farm.type"
                @click="handleSelectFarm(farm.type)"
              >
                <div class="text-sm mb-0.5">{{ farm.name }}</div>
                <div class="text-muted text-xs mb-1">{{ farm.description }}</div>
                <div class="text-accent text-xs">{{ farm.bonus }}</div>
              </button>
            </div>
          </div>
          <div class="flex justify-center mt-3 shrink-0">
            <Button :icon-size="12" :icon="ArrowLeft" @click="handleBackToCharCreate">{{ $t('menu.back') }}</Button>
          </div>
        </div>

        <!-- 田庄确认弹窗 -->
        <Transition name="panel-fade">
          <div
            v-if="showFarmConfirm"
            class="fixed inset-0 z-60 flex items-center justify-center bg-bg/80"
            @click.self="showFarmConfirm = false"
          >
            <div ref="modalRef_1cmmh" class="game-panel w-full max-w-xs mx-4 text-center relative" role="dialog" aria-modal="true" tabindex="-1">
              <button aria-label="Close" class="absolute top-2 right-2 text-muted hover:text-text" @click="showFarmConfirm = false">
                <X :size="14" />
              </button>
              <Divider title>{{ selectedFarmDef?.name }}</Divider>
              <p class="text-xs text-muted mb-2">{{ selectedFarmDef?.description }}</p>
              <p class="text-xs text-accent mb-4">{{ selectedFarmDef?.bonus }}</p>
              <div class="flex space-x-3 justify-center">
                <Button :icon-size="12" :icon="ArrowLeft" @click="showFarmConfirm = false">{{ $t('menu.cancel_btn') }}</Button>
                <Button class="px-6" :icon-size="12" :icon="Play" @click="handleNewGame">{{ $t('menu.start_journey') }}</Button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- 旧存档身份设置弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="showIdentitySetup" class="fixed inset-0 z-50 flex items-center justify-center bg-bg/80">
        <div ref="modalRef_zhoey" class="game-panel w-full max-w-xs mx-4 relative" role="dialog" aria-modal="true" tabindex="-1">
          <p class="text-accent text-sm mb-2 text-center">{{ $t('menu.setup_char') }}</p>
          <p class="text-xs text-muted mb-4 text-center">{{ $t('menu.setup_desc') }}</p>
          <div class="flex flex-col space-y-4">
            <div>
              <label class="text-xs text-muted mb-1 block">{{ $t('menu.your_name') }}</label>
              <input
                v-model="charName"
                type="text"
                maxlength="4"
                :placeholder="$t('menu.name_placeholder')"
                class="w-full px-3 py-2 bg-bg border border-accent/30 rounded-xs text-sm focus:border-accent outline-none"
              />
            </div>
            <div>
              <label class="text-xs text-muted mb-1 block">{{ $t('menu.gender') }}</label>
              <div class="flex space-x-3">
                <Button
                  class="flex-1 justify-center py-2"
                  :class="charGender === 'male' ? '!border-accent !bg-accent/10' : ''"
                  @click="charGender = 'male'"
                >
                  {{ $t('menu.male') }}
                </Button>
                <Button
                  class="flex-1 justify-center py-2"
                  :class="charGender === 'female' ? '!border-accent !bg-accent/10' : ''"
                  @click="charGender = 'female'"
                >
                  {{ $t('menu.female') }}
                </Button>
              </div>
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <Button class="px-6" :disabled="!charName.trim()" :icon-size="12" :icon="Play" @click="handleIdentityConfirm">
              {{ $t('menu.confirm_continue') }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 删除存档确认弹窗 -->
    <Transition name="panel-fade">
      <div
        v-if="deleteTargetSlot !== null"
        class="fixed inset-0 z-50 flex items-center justify-center bg-bg/80"
        @click.self="deleteTargetSlot = null"
      >
        <div ref="modalRef_08pn4" class="game-panel w-full max-w-xs mx-4 text-center" role="dialog" aria-modal="true" tabindex="-1">
          <p class="text-danger text-sm mb-3">{{ $t('menu.confirm_delete', { num: deleteTargetSlot + 1 }) }}</p>
          <p class="text-xs text-muted mb-4">{{ $t('menu.unrecoverable') }}</p>
          <div class="flex space-x-3 justify-center">
            <Button @click="deleteTargetSlot = null">{{ $t('menu.cancel_btn') }}</Button>
            <Button class="btn-danger" @click="confirmDeleteSlot">{{ $t('menu.delete_btn') }}</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 隐私协议弹窗 -->
    <Transition name="panel-fade">
      <div role="presentation" v-if="showPrivacy" class="fixed inset-0 z-50 flex items-center justify-center bg-bg/80" @click.self="handlePrivacyDecline">
        <div ref="modalRef_bydl8" class="game-panel w-full max-w-md mx-4 max-h-[80vh] flex flex-col" role="dialog" aria-modal="true" tabindex="-1">
          <h2 class="text-accent text-lg mb-3 text-center">
            <ShieldCheck :size="14" class="inline" />
            {{ $t('menu.privacy') }}
          </h2>
          <div class="flex-1 overflow-y-auto text-xs text-muted space-y-2 mb-4 pr-1">
            <p>{{ $t('menu.privacy_intro') }}</p>
            <p class="text-text">{{ $t('menu.privacy_1_title') }}</p>
            <p>{{ $t('menu.privacy_1_desc') }}</p>
            <p class="text-text">{{ $t('menu.privacy_2_title') }}</p>
            <p>{{ $t('menu.privacy_2_desc') }}</p>
            <p class="text-text">{{ $t('menu.privacy_3_title') }}</p>
            <p>{{ $t('menu.privacy_3_desc') }}</p>
            <p class="text-text">{{ $t('menu.privacy_4_title') }}</p>
            <p>{{ $t('menu.privacy_4_desc') }}</p>
            <p class="text-text">{{ $t('menu.privacy_5_title') }}</p>
            <p>{{ $t('menu.privacy_5_desc') }}</p>
            <p class="text-text">{{ $t('menu.privacy_6_title') }}</p>
            <p>{{ $t('menu.privacy_6_desc') }}</p>
          </div>
          <div class="flex space-x-3 justify-center">
            <Button class="!text-sm" :icon="ArrowLeft" @click="handlePrivacyDecline">{{ $t('menu.disagree') }}</Button>
            <Button class="!text-sm px-6" :icon="ShieldCheck" @click="handlePrivacyAgree">{{ $t('menu.agree_continue') }}</Button>
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">

  import { useFocusTrap } from '@/composables/useFocusTrap'
  import { Play, FolderOpen, ArrowLeft, Trash2, Download, Upload, Info, Settings, ShieldCheck, X, UserRound } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import Divider from '@/components/game/Divider.vue'
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useGameStore, SEASON_NAMES } from '@/stores/useGameStore'
  import { useSaveStore } from '@/stores/useSaveStore'
  import { useFarmStore } from '@/stores/useFarmStore'
  import { useAnimalStore } from '@/stores/useAnimalStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { useQuestStore } from '@/stores/useQuestStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { FARM_MAP_DEFS } from '@/data/farmMaps'
  import _pkg from '../../package.json'
  import { useAudio } from '@/composables/useAudio'
  import { showFloat, addLog } from '@/composables/useGameLog'
  import { resetAllStoresForNewGame } from '@/composables/useResetGame'
  import { useTutorialStore } from '@/stores/useTutorialStore'
  import type { FarmMapType, Gender } from '@/types'
  import { Capacitor } from '@capacitor/core'
  import i18n from '@/locales'


  const modalRef_e251o = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_e251o);
  const modalRef_9kc7v = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_9kc7v);
  const modalRef_co6cp = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_co6cp);
  const modalRef_1cmmh = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_1cmmh);
  const modalRef_zhoey = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_zhoey);
  const modalRef_08pn4 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_08pn4);
  const modalRef_bydl8 = ref<HTMLElement | null>(null);
  useFocusTrap(modalRef_bydl8);



  const router = useRouter()
  const { startBgm } = useAudio()
  const pkg = _pkg as typeof _pkg & { title: string; qq: string; version: string; name: string; author: string }

  const gameStore = useGameStore()
  const saveStore = useSaveStore()
  const farmStore = useFarmStore()
  const animalStore = useAnimalStore()
  const playerStore = usePlayerStore()
  const questStore = useQuestStore()
  const inventoryStore = useInventoryStore()

  const slots = ref(saveStore.getSlots())
  const showCharCreate = ref(false)
  const showFarmSelect = ref(false)
  const showIdentitySetup = ref(false)
  const showAbout = ref(false)
  const aboutTab = ref<'about' | 'author'>('about')
  const slotMenuOpen = ref<number | null>(null)
  const selectedMap = ref<FarmMapType>('standard')
  const charName = ref('')
  const charGender = ref<Gender>('male')
  const showPrivacy = ref(false)
  const showFarmConfirm = ref(false)

  const deleteTargetSlot = ref<number | null>(null)

  const selectedFarmDef = computed(() => FARM_MAP_DEFS.find(f => f.type === selectedMap.value))

  const handleSelectFarm = (type: FarmMapType) => {
    selectedMap.value = type
    showFarmConfirm.value = true
  }

  const handlePrivacyAgree = () => {
    localStorage.setItem('taoyuan_privacy_agreed', '1')
    showPrivacy.value = false
    showCharCreate.value = true
  }

  const handlePrivacyDecline = () => {
    showPrivacy.value = false
  }

  const refreshSlots = () => {
    slots.value = saveStore.getSlots()
  }

  const handleBackToMenu = () => {
    showCharCreate.value = false
    showFarmSelect.value = false
    selectedMap.value = 'standard'
    charName.value = ''
    charGender.value = 'male'
  }

  const handleCharCreateNext = () => {
    showFarmSelect.value = true
  }

  const handleBackToCharCreate = () => {
    showFarmSelect.value = false
    showFarmConfirm.value = false
  }

  const handleNewGame = () => {
    // 分配空闲存档槽位
    const slot = saveStore.assignNewSlot()
    if (slot < 0) {
      showFloat(i18n.global.t('menu.slot_full'))
      return
    }
    // 重置所有游戏 store 到初始状态，防止上一个存档数据残留
    resetAllStoresForNewGame()
    playerStore.setIdentity((charName.value.trim() || (i18n.global.locale.value === 'vi' ? 'Vô Danh' : 'Chưa đặt tên')).slice(0, 4), charGender.value)
    gameStore.startNewGame(selectedMap.value)
    // 标准农场初始6×6，其余4×4
    farmStore.resetFarm(selectedMap.value === 'standard' ? 6 : 4)
    // 新手赠送：10个青菜种子
    inventoryStore.addItem('seed_cabbage', 10)
    // 草地农场：免费鸡舍 + 2只鸡
    if (selectedMap.value === 'meadowlands') {
      const coop = animalStore.buildings.find(b => b.type === 'coop')
      if (coop) {
        coop.built = true
        coop.level = 1
      }
      animalStore.animals.push(
        {
          id: 'chicken_init_1',
          type: 'chicken',
          name: (i18n.global.locale.value === 'vi' ? 'Tiểu Hoa' : 'bông hoa'),
          friendship: 100,
          mood: 200,
          daysOwned: 0,
          daysSinceProduct: 0,
          wasFed: false,
          fedWith: null,
          wasPetted: false,
          hunger: 0,
          sick: false,
          sickDays: 0
        },
        {
          id: 'chicken_init_2',
          type: 'chicken',
          name: (i18n.global.locale.value === 'vi' ? 'Tiểu Bạch' : 'Tiểu Bạch'),
          friendship: 100,
          mood: 200,
          daysOwned: 0,
          daysSinceProduct: 0,
          wasFed: false,
          fedWith: null,
          wasPetted: false,
          hunger: 0,
          sick: false,
          sickDays: 0
        }
      )
    }
    questStore.initMainQuest()
    // 新手引导：游戏开始时立即显示欢迎提示
    const tutorialStore = useTutorialStore()
    if (tutorialStore.enabled) {
      addLog(i18n.global.locale.value === 'vi' ? 'Trưởng thôn: "Chào mừng đến với Đào Nguyên Hương! Trong balo có hạt giống bắp cải, hãy ra nông trại khai khẩn đất và trồng trọt nhé."' : 'Trưởng thôn Liễu nói:「Chào mừng đến với thị trấn Đào Viên! Có hạt bắp cải trong ba lô của bạn. Đến trang trại để xới đất và gieo hạt.」')
      tutorialStore.markTipShown('tip_welcome')
    }
    void router.push('/game')
  }

  const handleLoadGame = (slot: number) => {
    if (saveStore.loadFromSlot(slot)) {
      if (playerStore.needsIdentitySetup) {
        // 旧存档没有性别/名字数据，先让玩家设置
        showIdentitySetup.value = true
      } else {
        void router.push('/game')
      }
    }
  }

  /** 旧存档身份设置完成 */
  const handleIdentityConfirm = () => {
    playerStore.setIdentity((charName.value.trim() || (i18n.global.locale.value === 'vi' ? 'Vô Danh' : 'Chưa đặt tên')).slice(0, 4), charGender.value)
    showIdentitySetup.value = false
    void router.push('/game')
  }

  const handleDeleteSlot = (slot: number) => {
    deleteTargetSlot.value = slot
  }

  const confirmDeleteSlot = () => {
    if (deleteTargetSlot.value !== null) {
      saveStore.deleteSlot(deleteTargetSlot.value)
      refreshSlots()
      deleteTargetSlot.value = null
      slotMenuOpen.value = null
    }
  }

  const handleExportSlot = (slot: number) => {
    if (!saveStore.exportSave(slot)) {
      showFloat(i18n.global.t('menu.export_fail'), 'danger')
    }
  }

  const fileInputRef = ref<HTMLInputElement | null>(null)

  const triggerImport = () => {
    fileInputRef.value?.click()
  }

  const handleImportFile = (e: Event) => {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const content = reader.result as string
      // 找到第一个空槽位导入，没有则提示
      const emptySlot = slots.value.find(s => !s.exists)
      if (!emptySlot) {
        showFloat(i18n.global.t('menu.slot_full'))
      } else if (saveStore.importSave(emptySlot.slot, content)) {
        refreshSlots()
        showFloat(i18n.global.t('menu.import_success', { num: emptySlot.slot + 1 }), 'success')
      } else {
        showFloat(i18n.global.t('menu.import_fail'), 'danger')
      }
      input.value = ''
    }
    reader.readAsText(file)
  }
</script>

<style scoped>
  .logo {
    width: 50px;
    height: 50px;
    background: url(@/assets/logo.png) center / contain no-repeat;
    image-rendering: pixelated;
    flex-shrink: 0;
  }
</style>
