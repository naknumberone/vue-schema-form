<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ modelValue: number | string }>()

const emit = defineEmits<{ (e: 'update:modelValue', value: number | string): void }>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input v-model.number="value" />
</template>
