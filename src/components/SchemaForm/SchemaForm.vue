<script setup lang="ts">
import { type Component, computed, ref, watch } from 'vue'
import { getFormStateFields, getProps } from './utils'
import { FieldTypes, type ISchema } from '@/types'
import FieldNumber from './FieldNumber.vue'
import FieldSelect from './FieldSelect.vue'
import { validateAll } from './validators'
import type { TFormStateFields } from './types'

const components: Record<string, Component> = {
  [FieldTypes.number]: FieldNumber,
  [FieldTypes.select]: FieldSelect
}

const props = defineProps<{ schema: ISchema }>()

const emit = defineEmits<{ (e: 'onSubmit', value: any): void }>()

const formState = ref<TFormStateFields>({})

const fieldProps = computed(() => getProps(props.schema.fields))

watch(
  () => props.schema.fields,
  (fields) => {
    formState.value = getFormStateFields(fields)
  },
  { immediate: true }
)

const handleSubmit = () => {
  const result = Object.keys(formState.value).reduce(
    (acc, fieldName) => {
      const field = formState.value[fieldName]

      const validationData = validateAll(field.value, props.schema.fields[fieldName].rules)

      field.state = validationData

      return {
        ready: !validationData.valid ? false : acc.ready,
        values: {
          ...acc.values,
          [fieldName]: field.value
        }
      }
    },
    {
      ready: true,
      values: {}
    }
  )

  if (result.ready) {
    emit('onSubmit', result.values)
  }
}
</script>

<template>
  <form class="form">
    <fieldset class="fieldset">
      <legend>{{ schema.title }}</legend>
      <div class="field" v-for="(field, fieldName) in formState" :key="fieldName">
        <label :for="fieldName">{{ schema.fields[fieldName].label }}</label>
        <component
          :id="fieldName"
          :is="components[schema.fields[fieldName].type]"
          v-model="field.value"
          v-bind="fieldProps[fieldName]"
        />
        <div class="error">{{ field.state.message }}</div>
      </div>
    </fieldset>
    <button @click.prevent="handleSubmit">Submit</button>
  </form>
</template>

<style scoped>
.form {
  width: 100%;
  max-width: 324px;
}

.fieldset {
  margin-bottom: 24px;
}

.field {
  display: flex;
  flex-flow: column nowrap;
  gap: 4px;
}

.error {
  height: 20px;
  font-size: 14px;
  color: coral;
}
</style>
