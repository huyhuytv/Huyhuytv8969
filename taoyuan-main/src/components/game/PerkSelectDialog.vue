<template>
  <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-40" role="presentation">
    <div 
      ref="dialogRef"
      class="game-panel max-w-md w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="perk-dialog-title"
      tabindex="-1"
    >
      <h3 id="perk-dialog-title" class="text-accent text-sm mb-2">{{ $t('skills.level_reach', { skill: SKILL_NAMES[skillType], level }) }}</h3>
      <p class="text-xs text-muted mb-4">{{ $t('skills.choose_perk') }}</p>

      <div class="flex flex-col space-y-3" role="group" aria-label="Perk choices">
        <button
          v-for="option in options"
          :key="option.id"
          class="btn text-xs text-left flex flex-col space-y-1 py-3"
          @click="handleSelect(option.id)"
        >
          <span class="text-accent">{{ $t(`skills.${option.id}`) }}</span>
          <span class="text-muted">{{ $t(`skills.${option.id}_desc`) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import type { SkillType, SkillPerk5, SkillPerk10 } from '@/types'
  import { useSkillStore } from '@/stores/useSkillStore'
  import i18n from '@/locales'
  import { useFocusTrap } from '@/composables/useFocusTrap'

  const props = defineProps<{
    skillType: SkillType
    level: 5 | 10
  }>()

  const emit = defineEmits<{
    select: [perk: SkillPerk5 | SkillPerk10]
  }>()

  const dialogRef = ref<HTMLElement | null>(null)
  useFocusTrap(dialogRef)

  const skillStore = useSkillStore()

  const SKILL_NAMES = computed<Record<SkillType, string>>(() => ({
    farming: i18n.global.t('skills.farming'),
    foraging: i18n.global.t('skills.foraging'),
    fishing: i18n.global.t('skills.fishing'),
    mining: i18n.global.t('skills.mining'),
    combat: i18n.global.t('skills.combat')
  }))

  interface PerkOption {
    id: SkillPerk5 | SkillPerk10
    name: string
    description: string
  }

  const PERK5_OPTIONS: Record<SkillType, PerkOption[]> = {
    farming: [
      { id: 'harvester', name: 'Người Thu Hoạch', description: '+10% giá bán nông sản' },
      { id: 'rancher', name: 'Mục Đồng', description: '+20% giá bán sản phẩm động vật' }
    ],
    foraging: [
      { id: 'lumberjack', name: 'Tiều Phu', description: '25% xác suất nhận thêm gỗ khi thu thập' },
      { id: 'herbalist', name: 'Gái Lá', description: '+20% xác suất nhận vật phẩm khi thu thập' }
    ],
    fishing: [
      { id: 'fisher', name: 'Ngư Dân', description: '+25% giá bán cá' },
      { id: 'trapper', name: 'Thợ Săn', description: '+15% tỷ lệ thành công khi cá vùng vẫy' }
    ],
    mining: [
      { id: 'miner', name: 'Thợ Mỏ', description: '50% xác suất Quặng +1' },
      { id: 'geologist', name: 'Nhà Địa Chất', description: 'Tăng mạnh xác suất ra quặng hiếm' }
    ],
    combat: [
      { id: 'fighter', name: 'Đấu Sĩ', description: '-15% sát thương nhận vào, +25 HP tối đa' },
      { id: 'defender', name: 'Vệ Binh', description: 'Hồi 5 HP khi phòng thủ' }
    ]
  }

  /** Lv10 专精按 Lv5 分支分组 */
  const PERK10_BRANCHES: Record<SkillType, Record<string, PerkOption[]>> = {
    farming: {
      harvester: [
        { id: 'artisan', name: 'Nghệ Nhân', description: '+25% giá bán sản phẩm gia công' },
        { id: 'intensive', name: 'Canh Tác Sâu', description: '20% xác suất thu hoạch nhân đôi' }
      ],
      rancher: [
        { id: 'coopmaster', name: 'Chủ Trang Trại', description: '+50% độ thân thiết với động vật' },
        { id: 'shepherd', name: 'Người Chăn Cừu', description: 'Tăng 1 bậc phẩm chất sản phẩm động vật' }
      ]
    },
    foraging: {
      lumberjack: [
        { id: 'forester', name: 'Thợ Đốn Gỗ', description: 'Chắc chắn nhận thêm gỗ khi thu thập' },
        { id: 'tracker', name: 'Kẻ Theo Dấu', description: 'Nhận thêm 1 vật phẩm mỗi lần thu thập' }
      ],
      herbalist: [
        { id: 'botanist', name: 'Nhà Thực Vật', description: 'Đồ thu thập chắc chắn đạt phẩm chất Hiếm' },
        { id: 'alchemist', name: 'Giả Kim Thuật', description: '+50% hiệu quả hồi phục từ thức ăn' }
      ]
    },
    fishing: {
      fisher: [
        { id: 'angler', name: 'Kiện Tướng Câu Cá', description: 'Tăng mạnh tỷ lệ xuất hiện cá Huyền thoại' },
        { id: 'aquaculture', name: 'Thương Nhân Thủy Sản', description: '+50% giá bán cá' }
      ],
      trapper: [
        { id: 'mariner', name: 'Thủy Thủ', description: 'Cá câu được ít nhất đạt phẩm chất Tốt' },
        { id: 'luremaster', name: 'Bậc Thầy Mồi Câu', description: 'Nhân đôi hiệu quả mồi câu' }
      ]
    },
    mining: {
      miner: [
        { id: 'prospector', name: 'Người Thăm Dò', description: '15% xác suất quặng nhân đôi' },
        { id: 'blacksmith', name: 'Thợ Rèn', description: '+50% giá bán quặng kim loại' }
      ],
      geologist: [
        { id: 'excavator', name: 'Máy Xúc', description: '30% xác suất không tiêu hao khi dùng bom' },
        { id: 'mineralogist', name: 'Nhà Ngọc Học', description: 'Rơi thêm quặng khi đánh bại quái vật' }
      ]
    },
    combat: {
      fighter: [
        { id: 'warrior', name: 'Võ Giả', description: '+40 HP tối đa' },
        { id: 'brute', name: 'Kẻ Cục Súc', description: '+25% sát thương tấn công' }
      ],
      defender: [
        { id: 'acrobat', name: 'Diễn Viên Xiếc', description: '25% xác suất né tránh và phản công' },
        { id: 'tank', name: 'Kỵ Sĩ Giáp Nặng', description: 'Giảm 70% sát thương khi phòng thủ' }
      ]
    }
  }

  const options = computed<PerkOption[]>(() => {
    if (props.level === 5) return PERK5_OPTIONS[props.skillType]
    // Lv10：根据 Lv5 选择的专精确定分支
    const perk5 = skillStore.getSkill(props.skillType).perk5
    if (perk5) {
      const branches = PERK10_BRANCHES[props.skillType]
      return branches[perk5] ?? []
    }
    return []
  })

  const handleSelect = (perkId: SkillPerk5 | SkillPerk10) => {
    emit('select', perkId)
  }
</script>
