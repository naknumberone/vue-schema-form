import type { IValidator } from './types'
import { RuleTypes } from '@/types'

export const required: IValidator<RuleTypes.required> = (value) => {
  return value !== ''
}
