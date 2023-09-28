import { describe, expect, it } from 'vitest'
import { required } from './required'
import type { IRequiredRule } from '@/types'
import { RuleTypes } from '@/types'

const RULE_MOCK: IRequiredRule = {
  type: RuleTypes.required,
  message: 'My message'
}

describe('required', () => {
  it('Should be correctly behavior after call `range` with empty string', () => {
    expect(required('', RULE_MOCK)).toBe(false)
  })

  it('Should be correctly behavior after call `range` with `0`', () => {
    expect(required(0, RULE_MOCK)).toBe(true)
  })
})
