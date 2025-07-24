<script setup lang="ts">
const props = defineProps({
  statusCounts: {
    type: Array,
    required: true,
    default: () => [],
  },
})

// make a function to get the status name as lowercase, and if multiple words remove _ and make second word capitalized
const getStatusClass = (status) => {
  return status
    .toLowerCase() // Lowercase the entire string
    .split('_') // Split by underscores
    .map(
      (word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)), // Capitalize first letter after `_`
    )
    .join('')
}
</script>

<template>
  <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-12 p-6">
    <div
      v-for="item in statusCounts"
      :key="item.status"
      class="bg-white rounded-lg border border-gray-200 shadow-sm pt-3 hover:shadow-md transition-shadow"
    >
      <!-- Count -->
      <p
        class="text-2xl font-bold mb-2 text-center"
        :class="`text-status-${getStatusClass(item.status)}`"
      >
        {{ item.count }}
      </p>

      <!-- Status Label -->
      <div
        class="text-xs font-medium text-center py-1 rounded-b-md border-l-2 border-r-2"
        :class="`bg-status-${getStatusClass(item.status)} border-status-${getStatusClass(item.status)}`"
      >
        <span :class="`text-status-${getStatusClass(item.status)}`">
          {{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}
        </span>
      </div>
    </div>
  </div>
</template>
