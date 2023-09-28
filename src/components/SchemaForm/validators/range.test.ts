import { describe, expect, it } from 'vitest'
import { range } from './range'
import { type IRangeRule, RuleTypes } from '@/types'

const RULE_MOCK: IRangeRule = {
  type: RuleTypes.range,
  message: 'My message',
  min: 0,
  max: 10
}

describe('range', () => {
  it('Should be correctly behavior after call `range`', () => {
    expect(range(-1, RULE_MOCK)).toBe(false)

    Array.from({ length: 11 }).forEach((_, i) => {
      expect(range(i, RULE_MOCK)).toBe(true)
    })

    expect(range(11, RULE_MOCK)).toBe(false)
    expect(range('', RULE_MOCK)).toBe(false)
  })
})
