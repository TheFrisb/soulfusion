<script setup lang="ts">
import { ORDER_STATUS, ORDER_STATUS_CSS_MAP } from '@/utils/constants/orderStatus.js'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => {
      return Object.keys(ORDER_STATUS).includes(value)
    },
  },
})
</script>
<template>
  <span
    class="px-3 py-1.5 rounded-lg text-sm font-medium text-center"
    :class="[ORDER_STATUS_CSS_MAP[status].bg, ORDER_STATUS_CSS_MAP[status].text]"
  >
    {{ status }}
  </span>
</template>
