<template>
  <!-- Background Overlay -->
  <div v-if="eventStore.activeEvent" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
    <!-- Modal Container -->
    <div class="bg-[#e8d5b5] border-4 border-[#8b5a2b] p-6 max-w-lg w-full rounded-xl shadow-2xl relative">
      
      <!-- Event Image (If any) -->
      <div v-if="eventStore.activeEvent.image" class="w-full h-40 mb-4 rounded overflow-hidden border-2 border-[#8b5a2b]">
        <!-- Fallback if not string path -->
        <img :src="eventStore.activeEvent.image" alt="Event" class="w-full h-full object-cover pixelated" />
      </div>

      <!-- Lottie or some default icon if no image -->
      <div v-else class="text-center mb-4 text-[#8b5a2b]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <!-- Title & Description -->
      <h2 class="text-2xl font-bold text-center text-[#5c3a21] mb-2">{{ eventStore.activeEvent.title }}</h2>
      <p class="text-[#4a3b32] text-lg text-center mb-6 leading-relaxed">{{ eventStore.activeEvent.description }}</p>

      <!-- Choices -->
      <div class="flex flex-col gap-3">
        <button
          v-for="choice in eventStore.activeEvent.choices"
          :key="choice.id"
          class="bg-[#8b5a2b] hover:bg-[#a66d35] disabled:bg-gray-400 disabled:cursor-not-allowed text-[#f4e4c9] py-3 px-4 rounded font-bold shadow transition-colors w-full text-center"
          :disabled="choice.canSelect && !choice.canSelect()"
          @click="eventStore.resolveChoice(choice)"
        >
          {{ choice.text }}
          <!-- Show requirement note if disabled/provided -->
          <span v-if="choice.requirementText" class="block text-sm font-normal mt-1 opacity-80">
            {{ choice.requirementText }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDynamicEventStore } from '@/stores/useDynamicEventStore'

const eventStore = useDynamicEventStore()
</script>
