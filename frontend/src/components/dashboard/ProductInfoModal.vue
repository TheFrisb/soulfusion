<script setup>
import { defineEmits, defineProps, ref } from 'vue'

const props = defineProps({
  productName: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['close'])
const activeTab = ref('faq')

// Mock data - in production this would come from an API or store
const faq = [
  {
    question: 'What are the key features?',
    answer:
      'Our Premium Widget includes advanced functionality, seamless integration capabilities, and a user-friendly interface. It comes with 24/7 technical support and regular updates.',
  },
  {
    question: 'What is the warranty period?',
    answer:
      'The product comes with a 2-year manufacturer warranty covering all defects in materials and workmanship.',
  },
  {
    question: 'Is there a return policy?',
    answer:
      "30-day money-back guarantee with free return shipping if you're not completely satisfied.",
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'We accept all major credit cards, PayPal, and bank transfers. Payment plans are available for orders over $500.',
  },
  {
    question: 'How long is the delivery time?',
    answer:
      'Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee.',
  },
]

const script = {
  introduction: `
    Thank you for your interest in our Premium Widget. This product has been designed to meet the highest industry standards and has helped thousands of customers improve their productivity.
  `,
  keyPoints: [
    'Built with premium-grade materials for lasting durability',
    'Intuitive interface requiring minimal training',
    'Seamless integration with existing systems',
    'Regular software updates and improvements',
    '24/7 dedicated technical support',
  ],
  valueProposition: `
    Our Premium Widget stands out from competitors due to its superior build quality, comprehensive feature set, and industry-leading support package. The total value of the included features and support would cost over $500 if purchased separately.
  `,
  closingPoints: [
    'Limited-time promotional pricing',
    'Exclusive bonus features for early adopters',
    'Risk-free 30-day trial period',
    'Free priority shipping on orders placed today',
  ],
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">{{ productName }} - Product Information</h2>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-500 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-gray-200">
        <button
          v-for="tab in ['faq', 'script']"
          :key="tab"
          @click="activeTab = tab"
          class="px-6 py-3 text-sm font-medium transition-colors relative"
          :class="
            activeTab === tab
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          "
        >
          {{ tab.toUpperCase() }}
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- FAQ Tab -->
        <div v-if="activeTab === 'faq'" class="space-y-6">
          <div v-for="(item, index) in faq" :key="index" class="space-y-2">
            <h3 class="text-lg font-medium text-gray-900">
              {{ item.question }}
            </h3>
            <p class="text-gray-600">
              {{ item.answer }}
            </p>
          </div>
        </div>

        <!-- Script Tab -->
        <div v-else class="space-y-8">
          <!-- Introduction -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">Introduction</h3>
            <p class="text-gray-600">{{ script.introduction }}</p>
          </div>

          <!-- Key Points -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">Key Features</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li v-for="(point, index) in script.keyPoints" :key="index" class="text-gray-600">
                {{ point }}
              </li>
            </ul>
          </div>

          <!-- Value Proposition -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">Value Proposition</h3>
            <p class="text-gray-600">{{ script.valueProposition }}</p>
          </div>

          <!-- Closing Points -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">Closing Points</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li v-for="(point, index) in script.closingPoints" :key="index" class="text-gray-600">
                {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
