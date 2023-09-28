import type { TSchemaRule } from '@/types'
import type { TFormStateFieldValue } from '../types'

export interface IValidator<T> {
  (value: TFormStateFieldValue, rule: Extract<TSchemaRule, { type: T }>): boolean
}
