import type { TSchemaFields } from '@/types'
import type { TFormStateFields } from '../types'

export const getFormStateFields = (schemaFields: TSchemaFields): TFormStateFields => {
  const fields: TFormStateFields = {}

  Object.keys(schemaFields).forEach((fieldName) => {
    fields[fieldName] = {
      value: '',
      state: {
        valid: true
      }
    }
  })

  return fields
}
