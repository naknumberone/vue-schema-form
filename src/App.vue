<script setup lang="ts">
import { useSchema } from '@/composables'
import { ref } from 'vue'
import { SchemaForm } from './components'

const SCHEMA_URL = 'schema-1.json'

const result = ref(0)

const evaluate = (exp: string) => Function(`return (${exp})`)()

const params = ref({ url: SCHEMA_URL })

const { data, loading, error } = useSchema(params)

const handleSubmit = (values: Record<string, number | string>) => {
  const expression = Object.keys(values).reduce((acc, key) => acc + values[key], '')

  result.value = evaluate(expression)
}
</script>

<template>
  <div class="wrapper">
    <template v-if="!loading && data">
      <SchemaForm :schema="data" @on-submit="handleSubmit" />
      <h2>Result: {{ result }}</h2>
    </template>
    <h2 v-if="error">Something went wrong!</h2>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
</style>
