<template>
  <div>
    <h3 class="text-accent text-sm mb-3">
      <Star :size="14" class="inline" />
      {{ $t('skillView.title') }}
    </h3>
    <div class="space-y-3">
      <div v-for="skill in skillStore.skills" :key="skill.type" class="game-panel">
        <!-- 标题行：图标 + 名称等级 + 经验 -->
        <div class="flex justify-between items-center mb-1.5">
          <div class="flex items-center space-x-1.5">
            <component :is="SKILL_ICONS[skill.type]" :size="14" class="text-accent" />
            <span class="text-sm">{{ $t('skills.' + skill.type) }}</span>
            <span class="text-xs text-accent">Lv.{{ skill.level }}</span>
          </div>
          <p v-if="expInfo(skill.type)" class="text-[10px] text-muted">
            {{ expInfo(skill.type)!.current }}/{{ expInfo(skill.type)!.required }}
          </p>
          <span v-else class="text-[10px] text-accent border border-accent/30 rounded-xs px-1">{{ $t('skillView.max_level') }}</span>
        </div>

        <!-- 经验条 -->
        <div class="bg-bg rounded-xs h-1.5 mb-2">
          <div class="h-full bg-accent rounded-xs transition-all" :style="{ width: expPercent(skill.type) + '%' }" />
        </div>

        <!-- 介绍 + 每级加成 -->
        <div class="border border-accent/20 rounded-xs px-2 py-1.5 mb-2">
          <p class="text-[10px] text-muted leading-relaxed">{{ $t('skillView.descs.' + skill.type) }}</p>
          <p class="text-[10px] text-muted mt-0.5">{{ $t('skillView.bonus_prefix') }}{{ $t('skillView.bonuses.' + skill.type) }}</p>
        </div>

        <!-- 天赋 -->
        <div v-if="skill.perk5 || skill.perk10" class="flex flex-col space-y-1">
          <div v-if="skill.perk5" class="flex items-center space-x-1.5 border border-water rounded-xs px-2 py-1">
            <span class="text-[10px] text-water shrink-0">Lv5</span>
            <span class="text-xs text-water shrink-0">{{ $t('skills.' + skill.perk5) }}</span>
            <span class="text-[10px] text-muted">{{ $t('skills.' + skill.perk5 + '_desc') }}</span>
          </div>
          <div v-if="skill.perk10" class="flex items-center space-x-1.5 border border-water rounded-xs px-2 py-1">
            <span class="text-[10px] text-water shrink-0">Lv10</span>
            <span class="text-xs text-water shrink-0">{{ $t('skills.' + skill.perk10) }}</span>
            <span class="text-[10px] text-muted">{{ $t('skills.' + skill.perk10 + '_desc') }}</span>
          </div>
        </div>
        <p v-else-if="skill.level < 5" class="text-[10px] text-muted">{{ $t('skillView.perk_level5_10') }}</p>
        <p v-else class="text-[10px] text-muted">{{ $t('skillView.upgrade_to_perk', { level: !skill.perk5 ? 5 : 10 }) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { type Component } from 'vue'
  import { Star, Wheat, TreePine, Fish, Pickaxe, Sword } from 'lucide-vue-next'
  import { useSkillStore } from '@/stores/useSkillStore'
  import type { SkillType, SkillPerk5, SkillPerk10 } from '@/types'

  const skillStore = useSkillStore()

  const SKILL_ICONS: Record<SkillType, Component> = {
    farming: Wheat,
    foraging: TreePine,
    fishing: Fish,
    mining: Pickaxe,
    combat: Sword
  }

  const SKILL_NAMES: Record<SkillType, string> = {} as any
  const SKILL_DESCS: Record<SkillType, string> = {} as any
  const SKILL_LEVEL_BONUS: Record<SkillType, string> = {} as any
  const PERK_DESCS: Record<SkillPerk5 | SkillPerk10, string> = {} as any
  const PERK_NAMES: Record<SkillPerk5 | SkillPerk10, string> = {} as any

  const expInfo = (type: SkillType) => {
    return skillStore.getExpToNextLevel(type)
  }

  const expPercent = (type: SkillType): number => {
    const info = skillStore.getExpToNextLevel(type)
    if (!info) return 100
    return Math.round((info.current / info.required) * 100)
  }
</script>
