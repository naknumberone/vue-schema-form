import { range } from './range'
import { required } from './required'
import { RuleTypes, type TSchemaRule } from '@/types'
import type { IFieldState, TFormStateFieldValue } from '../types'

export const validateAll = (value: TFormStateFieldValue, rules: TSchemaRule[]): IFieldState => {
  const invalidIdx = rules.findIndex((rule: TSchemaRule) => !validate(value, rule))

  return ~invalidIdx ? { valid: false, message: rules[invalidIdx].message } : { valid: true }
}

const validate = (value: TFormStateFieldValue, rule: TSchemaRule) => {
  switch (rule.type) {
    case RuleTypes.required:
      return required(value, rule)
    case RuleTypes.range:
      return range(value, rule)
    default:
      return false
  }
}
