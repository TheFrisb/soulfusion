<script setup>
import { ref } from 'vue'

const periods = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last Week', value: 'lastWeek' },
]

const selectedPeriod = ref('today')
const startDate = ref('')
const endDate = ref('')
const emit = defineEmits(['period-change'])

function changePeriod(period) {
  selectedPeriod.value = period
  emit('period-change', period)
}
</script>

<template>
  <div class="flex items-center space-x-4">
    <button
      v-for="period in periods"
      :key="period.value"
      @click="changePeriod(period.value)"
      class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      :class="
        selectedPeriod === period.value
          ? 'bg-primary-600 text-white shadow-sm'
          : 'bg-white text-gray-600 hover:text-primary-600 hover:bg-primary-50 border border-gray-200'
      "
    >
      {{ period.label }}
    </button>

    <div class="flex items-center space-x-2">
      <input
        type="date"
        v-model="startDate"
        class="px-3 py-2 rounded-lg text-sm border border-gray-200 focus:border-primary-300 focus:ring-1 focus:ring-primary-300"
      />
      <span class="text-gray-500">to</span>
      <input
        type="date"
        v-model="endDate"
        class="px-3 py-2 rounded-lg text-sm border border-gray-200 focus:border-primary-300 focus:ring-1 focus:ring-primary-300"
      />
    </div>
  </div>
</template>
