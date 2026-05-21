<script setup lang="ts">
  import { type Component, computed, useSlots } from 'vue'

  const props = withDefaults(
    defineProps<{
      icon?: Component
      iconSize?: number
      ariaLabel?: string
      title?: string
    }>(),
    { iconSize: 14 }
  )

  const slots = useSlots()
  const isIconOnly = computed(() => !!props.icon && !slots.default)
</script>

<template>
  <button 
    class="btn text-xs" 
    :aria-label="ariaLabel || title || (isIconOnly ? 'Button' : undefined)"
    :title="title || ariaLabel"
  >
    <component v-if="icon" :is="icon" :size="iconSize" aria-hidden="true" />
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>
