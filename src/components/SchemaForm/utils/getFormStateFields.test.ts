import { describe, expect, it } from 'vitest'
import { FieldTypes, type TSchemaFields } from '@/types'
import { getFormStateFields } from './getFormStateFields'

const SCHEMA_FIELDS_MOCK: TSchemaFields = {
  firstField: {
    label: 'firstField',
    type: FieldTypes.number,
    rules: []
  },
  secondField: {
    label: 'secondField',
    type: FieldTypes.select,
    options: [],
    rules: []
  }
}

describe('getFormStateFields', () => {
  it('Should be correctly behavior after call `getFormStateFields`', () => {
    expect(getFormStateFields(SCHEMA_FIELDS_MOCK)).toEqual({
      firstField: {
        value: '',
        state: {
          valid: true
        }
      },
      secondField: {
        value: '',
        state: {
          valid: true
        }
      }
    })
  })
})
