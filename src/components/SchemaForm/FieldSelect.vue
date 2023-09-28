<script setup lang="ts">
import { computed } from 'vue'
import type { ISchemaSelectOptions } from '@/types'

const props = defineProps<{ options: ISchemaSelectOptions[]; modelValue: string }>()

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

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
  <select v-model="value">
    <option value="" disabled>Empty</option>
    <option v-for="(opt, index) in options" :value="opt.value" :key="index">{{ opt.title }}</option>
  </select>
</template>
