<script setup>
const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => {
      return [
        'pending',
        'take',
        'callAgain',
        'confirmed',
        'shipped',
        'returned',
        'paid',
        'trash',
        'canceled',
      ].includes(value)
    },
  },
})

const statusConfig = {
  pending: { bg: 'bg-status-pending', text: 'text-amber-800' },
  take: { bg: 'bg-status-take', text: 'text-purple-800' },
  callAgain: { bg: 'bg-status-callAgain', text: 'text-green-800' },
  confirmed: { bg: 'bg-status-confirmed', text: 'text-green-800' },
  shipped: { bg: 'bg-status-shipped', text: 'text-gray-800' },
  returned: { bg: 'bg-status-returned', text: 'text-pink-800' },
  paid: { bg: 'bg-status-paid', text: 'text-white' },
  trash: { bg: 'bg-status-trash', text: 'text-white' },
  canceled: { bg: 'bg-status-canceled', text: 'text-white' },
}
</script>

<template>
  <span
    class="px-3 py-1.5 rounded-lg text-sm font-medium text-center"
    :class="[statusConfig[status].bg, statusConfig[status].text]"
  >
    {{ status.charAt(0).toUpperCase() + status.slice(1) }}
  </span>
</template>
