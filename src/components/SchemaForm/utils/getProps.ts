import { FieldTypes, type TSchemaField, type TSchemaFields } from '@/types'
import type { IFieldProps } from '../types'

export const getProps = (fields: TSchemaFields) => {
  return Object.keys(fields).reduce<Record<string, IFieldProps>>((acc, fieldName) => {
    acc[fieldName] = getFieldPropFromField(fields[fieldName])

    return acc
  }, {})
}

const getFieldPropFromField = (field: TSchemaField): IFieldProps => {
  switch (field.type) {
    case FieldTypes.number:
      return {
        type: 'number'
      }
    case FieldTypes.select:
      return {
        options: field.options
      }
    default:
      return {}
  }
}
