<script setup>
const statusCounts = [
  { status: 'pending', count: 12 },
  { status: 'take', count: 5 },
  { status: 'callAgain', count: 8 },
  { status: 'confirmed', count: 15 },
  { status: 'shipped', count: 20 },
  { status: 'returned', count: 3 },
  { status: 'paid', count: 25 },
  { status: 'trash', count: 2 },
  { status: 'canceled', count: 4 },
]
</script>

<template>
  <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-12 p-6">
    <div
      v-for="item in statusCounts"
      :key="item.status"
      class="bg-white rounded-lg border border-gray-200 shadow-sm pt-3 hover:shadow-md transition-shadow"
    >
      <!-- Count -->
      <p class="text-2xl font-bold mb-2 text-center" :class="`text-status-${item.status}`">
        {{ item.count }}
      </p>

      <!-- Status Label -->
      <div
        class="text-xs font-medium text-center py-1 rounded-b-md border-l-2 border-r-2"
        :class="`bg-status-${item.status} border-status-${item.status}`"
      >
        <span :class="`text-status-${item.status}`">
          {{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}
        </span>
      </div>
    </div>
  </div>
</template>
