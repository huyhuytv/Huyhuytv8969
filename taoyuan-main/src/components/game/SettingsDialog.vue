<template>
  <Transition name="panel-fade">
    <div v-if="open" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" @click.self="$emit('close')" role="presentation">
      <div 
        ref="dialogRef"
        class="game-panel w-full max-w-xs text-center relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-dialog-title"
        tabindex="-1"
      >
        <button class="absolute top-2 right-2 text-muted hover:text-text" @click="$emit('close')" aria-label="Close Settings">
          <X :size="14" aria-hidden="true" />
        </button>
        <Divider title class="my-4" :label="$t('settings.title')" id="settings-dialog-title" />
        <!-- 分类导航 -->
        <div class="grid grid-cols-3 justify-center gap-1 mb-3" role="tablist" aria-label="Cài đặt">
          <button
            v-for="tab in SETTINGS_TABS"
            :key="tab.key"
            class="text-xs py-1 px-3 border rounded-xs transition-colors"
            :class="activeTab === tab.key ? 'border-accent bg-accent/20 text-accent' : 'border-accent/20 text-muted hover:text-text'"
            @click="activeTab = tab.key"
            role="tab"
            :aria-selected="activeTab === tab.key"
          >
            <component :is="tab.icon" :size="12" class="inline-block align-[-2px] mr-1" aria-hidden="true" />
            {{ tab.label }}
          </button>
        </div>

        <div class="flex flex-col space-y-3">
          <!-- ===== 通用 ===== -->
          <template v-if="activeTab === 'general'">
            <div class="max-h-[40vh] overflow-y-auto">
              <!-- 时间控制 -->
              <div class="border border-accent/20 rounded-xs p-3 mr-1 mb-2">
                <p class="text-xs text-muted mb-2">{{ $t('settings.time_control') }}</p>
                <div class="flex items-center justify-center space-x-2">
                  <Button :icon="isPaused ? Play : Pause" :icon-size="12" class="py-1 px-3" @click="togglePause">
                    {{ isPaused ? $t('settings.resume') : $t('settings.pause') }}
                  </Button>
                  <Button class="py-1 px-3" @click="cycleSpeed">{{ $t('settings.speed', { speed: gameSpeed }) }}</Button>
                </div>
                <div class="flex items-center justify-center mt-3 pt-2 border-t border-accent/20">
                  <span class="text-xs text-muted mr-2">{{ $t('settings.pause_on_hidden') }}</span>
                  <div class="flex space-x-1">
                    <Button
                      class="py-0.5 px-2 text-[10px]"
                      :class="{ '!bg-accent !text-bg': settingsStore.pauseOnVisibilityChange }"
                      @click="settingsStore.pauseOnVisibilityChange = true"
                    >
                      {{ $t('settings.on') }}
                    </Button>
                    <Button
                      class="py-0.5 px-2 text-[10px]"
                      :class="{ '!bg-accent !text-bg': !settingsStore.pauseOnVisibilityChange }"
                      @click="settingsStore.pauseOnVisibilityChange = false"
                    >
                      {{ $t('settings.off') }}
                    </Button>
                  </div>
                </div>
              </div>

              <!-- 音频控制 -->
              <div class="border border-accent/20 rounded-xs p-3 mr-1 mb-2">
                <p class="text-xs text-muted mb-2">{{ $t('settings.audio') }}</p>
                <div class="flex items-center justify-center space-x-2">
                  <Button :icon="sfxEnabled ? Volume2 : VolumeX" :icon-size="12" class="py-1 px-3" @click="toggleSfx">{{ $t('settings.sfx') }}</Button>
                  <Button :icon="bgmEnabled ? Headphones : HeadphoneOff" :icon-size="12" class="py-1 px-3" @click="toggleBgm">{{ $t('settings.bgm') }}</Button>
                </div>
              </div>

              <!-- 新手提示 -->
              <div class="border border-accent/20 rounded-xs p-3 mr-1 mb-2">
                <p class="text-xs text-muted mb-2">{{ $t('settings.tutorial_tips') }}</p>
                <p class="text-[10px] text-muted/50 mb-2">{{ $t('settings.tutorial_desc') }}</p>
                <div class="flex items-center justify-center space-x-2">
                  <Button class="py-1 px-3" :class="{ '!bg-accent !text-bg': tutorialStore.enabled }" @click="tutorialStore.enabled = true">
                    {{ $t('settings.on') }}
                  </Button>
                  <Button
                    class="py-1 px-3"
                    :class="{ '!bg-accent !text-bg': !tutorialStore.enabled }"
                    @click="tutorialStore.enabled = false"
                  >
                    {{ $t('settings.off') }}
                  </Button>
                </div>
              </div>

              <!-- WebDAV 云同步 -->
              <div class="border border-accent/20 rounded-xs p-3 mr-1">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-xs text-muted">{{ $t('settings.webdav_sync') }}</p>
                  <div class="flex space-x-1">
                    <Button
                      class="py-0.5 px-2 text-[10px]"
                      :class="{ '!bg-accent !text-bg': webdavConfig.enabled }"
                      @click="setWebdavEnabled(true)"
                    >
                      {{ $t('settings.on') }}
                    </Button>
                    <Button
                      class="py-0.5 px-2 text-[10px]"
                      :class="{ '!bg-accent !text-bg': !webdavConfig.enabled }"
                      @click="setWebdavEnabled(false)"
                    >
                      {{ $t('settings.off') }}
                    </Button>
                  </div>
                </div>
                <template v-if="webdavConfig.enabled">
                  <div class="flex flex-col space-y-2">
                    <div>
                      <label class="text-[10px] text-muted mb-0.5 block">{{ $t('settings.server_url') }}</label>
                      <input
                        v-model="webdavConfig.serverUrl"
                        :placeholder="$t('settings.server_url_placeholder')"
                        class="w-full px-2 py-1.5 bg-bg border border-accent/30 rounded-xs text-xs text-text focus:border-accent outline-none placeholder:text-muted/40 transition-colors"
                        @change="saveWebdavConfig"
                      />
                    </div>
                    <div>
                      <label class="text-[10px] text-muted mb-0.5 block">{{ $t('settings.save_path') }}</label>
                      <input
                        v-model="webdavConfig.path"
                        :placeholder="$t('settings.save_path_placeholder')"
                        class="w-full px-2 py-1.5 bg-bg border border-accent/30 rounded-xs text-xs text-text focus:border-accent outline-none placeholder:text-muted/40 transition-colors"
                        @change="saveWebdavConfig"
                      />
                      <p class="text-[10px] text-muted/50 mt-0.5">{{ $t('settings.save_path_desc') }}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <div>
                        <label class="text-[10px] text-muted mb-0.5 block">{{ $t('settings.username') }}</label>
                        <input
                          v-model="webdavConfig.username"
                          :placeholder="$t('settings.username_placeholder')"
                          class="w-full px-2 py-1.5 bg-bg border border-accent/30 rounded-xs text-xs text-text focus:border-accent outline-none placeholder:text-muted/40 transition-colors"
                          @change="saveWebdavConfig"
                        />
                      </div>
                      <div>
                        <label class="text-[10px] text-muted mb-0.5 block">{{ $t('settings.password') }}</label>
                        <input
                          v-model="webdavConfig.password"
                          type="password"
                          :placeholder="$t('settings.password_placeholder')"
                          class="w-full px-2 py-1.5 bg-bg border border-accent/30 rounded-xs text-xs text-text focus:border-accent outline-none placeholder:text-muted/40 transition-colors"
                          @change="saveWebdavConfig"
                        />
                      </div>
                    </div>
                    <Button
                      class="py-1 px-3 text-xs w-full justify-center"
                      :disabled="webdavTestStatus === 'testing' || !webdavConfig.serverUrl"
                      @click="handleTestWebdav"
                    >
                      {{ webdavTestStatus === 'testing' ? $t('settings.testing') : $t('settings.test_connection') }}
                    </Button>
                    <p v-if="webdavTestStatus === 'success'" class="text-success text-xs text-center mt-1 break-words">{{ $t('settings.connect_success') }}</p>
                    <p v-if="webdavTestStatus === 'failed'" class="text-danger text-xs text-center mt-1 break-words">
                      {{ webdavTestError || $t('settings.connect_failed') }}
                    </p>
                    <div v-if="webdavTraceLogs.length" class="border border-accent/20 rounded-xs p-2 bg-bg/40">
                      <div class="flex items-center justify-between mb-1">
                        <p class="text-[10px] text-muted">{{ $t('settings.request_log') }}</p>
                        <button class="text-[10px] text-muted hover:text-text" @click="clearWebdavTrace">{{ $t('settings.clear') }}</button>
                      </div>
                      <div class="max-h-28 overflow-y-auto text-left">
                        <p v-for="(line, idx) in webdavTraceLogs" :key="idx" class="text-[10px] text-muted/80 leading-4 break-all">
                          {{ line }}
                        </p>
                      </div>
                      <button class="webdav-log-copy text-[10px] text-muted hover:text-text">{{ $t('settings.copy_log') }}</button>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>

          <!-- ===== 外观 ===== -->
          <template v-if="activeTab === 'display'">
            <!-- 字体大小 -->
            <div class="border border-accent/20 rounded-xs p-3">
              <p class="text-xs text-muted mb-2">{{ $t('settings.font_size') }}</p>
              <div class="flex items-center justify-center space-x-3">
                <Button
                  class="py-1 px-3"
                  :icon="Minus"
                  :icon-size="12"
                  :disabled="settingsStore.fontSize <= 12"
                  @click="settingsStore.changeFontSize(-1)"
                />
                <span class="text-sm w-8 text-center">{{ settingsStore.fontSize }}</span>
                <Button
                  class="py-1 px-3"
                  :icon="Plus"
                  :icon-size="12"
                  :disabled="settingsStore.fontSize >= 24"
                  @click="settingsStore.changeFontSize(1)"
                />
              </div>
            </div>

            <!-- 配色主题 -->
            <div class="border border-accent/20 rounded-xs p-3">
              <p class="text-xs text-muted mb-2">{{ $t('settings.color_theme') }}</p>
              <div class="flex items-center justify-center space-x-2">
                <button
                  v-for="t in THEMES"
                  :key="t.key"
                  class="w-8 h-8 border rounded-xs flex items-center justify-center text-[10px] transition-colors"
                  :class="settingsStore.theme === t.key ? 'border-accent' : 'border-accent/20'"
                  :style="{ backgroundColor: t.bg, color: t.text }"
                  :title="t.name"
                  @click="settingsStore.changeTheme(t.key)"
                >
                  {{ t.name.charAt(0) }}
                </button>
              </div>
            </div>
          </template>

          <!-- ===== 通知 ===== -->
          <template v-if="activeTab === 'notification'">
            <div class="max-h-[40vh] overflow-y-auto flex flex-col space-y-3">
              <!-- 通知位置 -->
              <div class="border border-accent/20 rounded-xs p-3 mr-1">
                <p class="text-xs text-muted mb-2">{{ $t('settings.popup_position') }}</p>
                <div class="grid grid-cols-3 gap-1 w-24 mx-auto">
                  <button
                    v-for="pos in QMSG_POSITIONS"
                    :key="pos.value"
                    class="w-8 h-6 border rounded-xs transition-colors flex items-center justify-center"
                    :class="
                      settingsStore.qmsgPosition === pos.value ? 'border-accent bg-accent/20 text-accent' : 'border-accent/20 text-muted'
                    "
                    :title="$t(pos.labelKey)"
                    @click="settingsStore.changeQmsgPosition(pos.value)"
                  >
                    <component :is="pos.icon" :size="10" />
                  </button>
                </div>
              </div>

              <!-- 持续时间 -->
              <div class="border border-accent/20 rounded-xs p-3 mr-1">
                <p class="text-xs text-muted mb-2">{{ $t('settings.duration') }}</p>
                <div class="flex items-center justify-center space-x-2">
                  <Button
                    class="py-0 px-1.5"
                    :icon="Minus"
                    :icon-size="10"
                    :disabled="settingsStore.qmsgTimeout <= 500"
                    @click="changeTimeout(-500)"
                  />
                  <span class="text-xs w-12 text-center">{{ (settingsStore.qmsgTimeout / 1000).toFixed(1) }}s</span>
                  <Button
                    class="py-0 px-1.5"
                    :icon="Plus"
                    :icon-size="10"
                    :disabled="settingsStore.qmsgTimeout >= 10000"
                    @click="changeTimeout(500)"
                  />
                </div>
              </div>

              <!-- 最大数量 -->
              <div class="border border-accent/20 rounded-xs p-3 mr-1">
                <p class="text-xs text-muted mb-2">{{ $t('settings.max_count') }}</p>
                <div class="flex items-center justify-center space-x-2">
                  <Button
                    class="py-0 px-1.5"
                    :icon="Minus"
                    :icon-size="10"
                    :disabled="settingsStore.qmsgMaxNums <= 1"
                    @click="changeMaxNums(-1)"
                  />
                  <span class="text-xs w-6 text-center">{{ settingsStore.qmsgMaxNums }}</span>
                  <Button
                    class="py-0 px-1.5"
                    :icon="Plus"
                    :icon-size="10"
                    :disabled="settingsStore.qmsgMaxNums >= 20"
                    @click="changeMaxNums(1)"
                  />
                </div>
              </div>

              <!-- 宽度限制 -->
              <div class="border border-accent/20 rounded-xs p-3 mr-1">
                <p class="text-xs text-muted mb-2">{{ $t('settings.limit_width') }}</p>
                <div class="flex items-center justify-center space-x-1 mb-2">
                  <Button
                    class="py-0 px-2"
                    :class="settingsStore.qmsgIsLimitWidth ? '!bg-accent/20 !text-accent !border-accent' : ''"
                    @click="setBool('qmsgIsLimitWidth', true)"
                  >
                    {{ $t('settings.on') }}
                  </Button>
                  <Button
                    class="py-0 px-2"
                    :class="!settingsStore.qmsgIsLimitWidth ? '!bg-accent/20 !text-accent !border-accent' : ''"
                    @click="setBool('qmsgIsLimitWidth', false)"
                  >
                    {{ $t('settings.off') }}
                  </Button>
                </div>
                <template v-if="settingsStore.qmsgIsLimitWidth">
                  <p class="text-xs text-muted mb-2">{{ $t('settings.width_px') }}</p>
                  <div class="flex items-center justify-center space-x-2 mb-2">
                    <Button
                      class="py-0 px-1.5"
                      :icon="Minus"
                      :icon-size="10"
                      :disabled="settingsStore.qmsgLimitWidthNum <= 100"
                      @click="changeLimitWidth(-50)"
                    />
                    <span class="text-xs w-10 text-center">{{ settingsStore.qmsgLimitWidthNum }}</span>
                    <Button
                      class="py-0 px-1.5"
                      :icon="Plus"
                      :icon-size="10"
                      :disabled="settingsStore.qmsgLimitWidthNum >= 800"
                      @click="changeLimitWidth(50)"
                    />
                  </div>
                  <p class="text-xs text-muted mb-2">{{ $t('settings.overflow_handle') }}</p>
                  <div class="flex items-center justify-center space-x-1">
                    <Button
                      v-for="opt in WRAP_OPTIONS"
                      :key="opt.value"
                      class="!text-[10px] py-0 px-1.5"
                      :class="settingsStore.qmsgLimitWidthWrap === opt.value ? '!bg-accent/20 !text-accent !border-accent' : ''"
                      @click="changeWrap(opt.value)"
                    >
                      {{ $t(opt.labelKey) }}
                    </Button>
                  </div>
                </template>
              </div>

              <!-- 开关选项 -->
              <div class="border border-accent/20 rounded-xs p-3 mr-1 flex flex-col space-y-2">
                <div v-for="opt in TOGGLE_OPTIONS" :key="opt.key" class="flex flex-col items-center space-y-1">
                  <span class="text-xs text-muted">{{ $t(opt.labelKey) }}</span>
                  <div class="flex items-center space-x-1">
                    <Button
                      class="py-0 px-2"
                      :class="settingsStore[opt.key] ? '!bg-accent/20 !text-accent !border-accent' : ''"
                      @click="setBool(opt.key, true)"
                    >
                      {{ $t('settings.on') }}
                    </Button>
                    <Button
                      class="py-0 px-2"
                      :class="!settingsStore[opt.key] ? '!bg-accent/20 !text-accent !border-accent' : ''"
                      @click="setBool(opt.key, false)"
                    >
                      {{ $t('settings.off') }}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- 存档管理（全局底部） -->
        <Button :icon="FolderOpen" :icon-size="12" class="py-1 px-3 w-full justify-center mt-3" @click="showSaveManager = true">
          {{ $t('settings.save_manager') }}
        </Button>
      </div>
    </div>
  </Transition>

  <!-- 存档管理弹窗 -->
  <Transition name="panel-fade">
    <SaveManager v-if="showSaveManager" @close="showSaveManager = false" />
  </Transition>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, watch, type Component } from 'vue'
  import {
    X,
    Pause,
    Play,
    Volume2,
    VolumeX,
    Headphones,
    HeadphoneOff,
    FolderOpen,
    Minus,
    Plus,
    ArrowUpLeft,
    ArrowUp,
    ArrowUpRight,
    ArrowLeft,
    Circle,
    ArrowRight,
    ArrowDownLeft,
    ArrowDown,
    ArrowDownRight,
    Settings,
    Palette,
    Bell
  } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import Divider from '@/components/game/Divider.vue'
  import { useAudio } from '@/composables/useAudio'
  import { useGameClock } from '@/composables/useGameClock'
  import { useGameLog } from '@/composables/useGameLog'
  import { useSettingsStore, type QmsgPosition, type QmsgLimitWidthWrap } from '@/stores/useSettingsStore'
  import { useTutorialStore } from '@/stores/useTutorialStore'
  import { useWebdav } from '@/composables/useWebdav'
  import { THEMES } from '@/data/themes'
  import SaveManager from '@/components/game/SaveManager.vue'
  import ClipboardJS from 'clipboard'
  import i18n from '@/locales'
  import { useFocusTrap } from '@/composables/useFocusTrap'

  type SettingsTab = 'general' | 'display' | 'notification'

  type BoolSettingKey = 'qmsgIsLimitWidth' | 'qmsgAnimation' | 'qmsgAutoClose' | 'qmsgShowClose' | 'qmsgShowIcon' | 'qmsgShowReverse'

  const SETTINGS_TABS: { key: SettingsTab; label: string; icon: Component }[] = [
    { key: 'general', get label() { return i18n.global.t('settings.general') }, icon: Settings },
    { key: 'display', get label() { return i18n.global.t('settings.appearance') }, icon: Palette },
    { key: 'notification', get label() { return i18n.global.t('settings.notification') }, icon: Bell }
  ]

  const QMSG_POSITIONS: { value: QmsgPosition; labelKey: string; icon: Component }[] = [
    { value: 'topleft', labelKey: 'settings.pos_topleft', icon: ArrowUpLeft },
    { value: 'top', labelKey: 'settings.pos_top', icon: ArrowUp },
    { value: 'topright', labelKey: 'settings.pos_topright', icon: ArrowUpRight },
    { value: 'left', labelKey: 'settings.pos_left', icon: ArrowLeft },
    { value: 'center', labelKey: 'settings.pos_center', icon: Circle },
    { value: 'right', labelKey: 'settings.pos_right', icon: ArrowRight },
    { value: 'bottomleft', labelKey: 'settings.pos_bottomleft', icon: ArrowDownLeft },
    { value: 'bottom', labelKey: 'settings.pos_bottom', icon: ArrowDown },
    { value: 'bottomright', labelKey: 'settings.pos_bottomright', icon: ArrowDownRight }
  ]

  const WRAP_OPTIONS: { value: QmsgLimitWidthWrap; labelKey: string }[] = [
    { value: 'no-wrap', labelKey: 'settings.no_wrap' },
    { value: 'wrap', labelKey: 'settings.wrap' },
    { value: 'ellipsis', labelKey: 'settings.ellipsis' }
  ]

  const TOGGLE_OPTIONS: { key: BoolSettingKey; labelKey: string }[] = [
    { key: 'qmsgAnimation', labelKey: 'settings.popup_anim' },
    { key: 'qmsgAutoClose', labelKey: 'settings.auto_close' },
    { key: 'qmsgShowClose', labelKey: 'settings.show_close_icon' },
    { key: 'qmsgShowIcon', labelKey: 'settings.show_left_icon' },
    { key: 'qmsgShowReverse', labelKey: 'settings.reverse_dir' }
  ]

  const props = defineProps<{ open: boolean }>()
  const emit = defineEmits<{ close: [] }>()

  const dialogRef = ref<HTMLElement | null>(null)
  
  // Conditionally trap focus only when open
  watch(() => props.open, (isOpen) => {
    // Note: useFocusTrap initializes on mounted, so its logic expects the ref to point to the DOM element
    // Let's modify the usage slightly or use the ref directly since it mounts conditionally
  })
  useFocusTrap(dialogRef)

  const activeTab = ref<SettingsTab>('general')
  const { sfxEnabled, bgmEnabled, toggleSfx, toggleBgm } = useAudio()
  const { isPaused, gameSpeed, togglePause, cycleSpeed } = useGameClock()
  const { showFloat } = useGameLog()
  const settingsStore = useSettingsStore()
  const tutorialStore = useTutorialStore()
  const {
    webdavConfig,
    webdavTestStatus,
    webdavTestError,
    webdavTraceLogs,
    saveConfig: saveWebdavConfig,
    clearTrace: clearWebdavTrace,
    testConnection
  } = useWebdav()

  const showSaveManager = ref(false)
  let clipboard: ClipboardJS | null = null

  onMounted(() => {
    clipboard = new ClipboardJS('.webdav-log-copy', {
      text: () => webdavTraceLogs.value.join('\n')
    })
    clipboard.on('success', e => {
      e.clearSelection()
      showFloat(i18n.global.t('settings.log_copied'), 'success')
    })
    clipboard.on('error', () => {
      document.body.classList.remove('select-none')
      showFloat(i18n.global.t('settings.copy_failed'), 'danger')
    })
  })

  onBeforeUnmount(() => {
    clipboard?.destroy()
    clipboard = null
  })

  const handleTestWebdav = async () => {
    await testConnection()
  }

  const setWebdavEnabled = (val: boolean) => {
    webdavConfig.value.enabled = val
    saveWebdavConfig()
  }

  const changeTimeout = (delta: number) => {
    settingsStore.qmsgTimeout = Math.min(10000, Math.max(500, settingsStore.qmsgTimeout + delta))
    settingsStore.syncQmsgConfig()
  }

  const changeMaxNums = (delta: number) => {
    settingsStore.qmsgMaxNums = Math.min(20, Math.max(1, settingsStore.qmsgMaxNums + delta))
    settingsStore.syncQmsgConfig()
  }

  const changeLimitWidth = (delta: number) => {
    settingsStore.qmsgLimitWidthNum = Math.min(800, Math.max(100, settingsStore.qmsgLimitWidthNum + delta))
    settingsStore.syncQmsgConfig()
  }

  const changeWrap = (value: QmsgLimitWidthWrap) => {
    settingsStore.qmsgLimitWidthWrap = value
    settingsStore.syncQmsgConfig()
  }

  const setBool = (key: BoolSettingKey, value: boolean) => {
    settingsStore[key] = value
    settingsStore.syncQmsgConfig()
  }
</script>

<style scoped>
  .yes-select {
    -webkit-user-select: unset;
    user-select: unset;
    -webkit-touch-callout: unset;
  }
</style>
