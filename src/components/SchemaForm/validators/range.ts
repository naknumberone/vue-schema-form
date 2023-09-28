import type { IValidator } from './types'
import { RuleTypes } from '@/types'

export const range: IValidator<RuleTypes.range> = (value, rule) => {
  return typeof value === 'number' && !isNaN(value) && value >= rule.min && value <= rule.max
}
