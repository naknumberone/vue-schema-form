import { type Ref, ref, watch } from 'vue'

export const useSchema = (params: Ref<{ url: string }>) => {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(false)

  watch(
    () => params.value.url,
    async (url) => {
      loading.value = true
      try {
        const response = await fetch(url)
        data.value = await response.json()
      } catch (e) {
        error.value = true
      } finally {
        loading.value = false
      }
    },
    { immediate: true }
  )

  return { data, loading, error }
}
