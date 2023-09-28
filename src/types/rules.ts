export enum RuleTypes {
  required = 'required',
  range = 'range'
}

interface IBaseRule {
  message: string
}

export interface IRequiredRule extends IBaseRule {
  type: RuleTypes.required
}

export interface IRangeRule extends IBaseRule {
  type: RuleTypes.range
  min: number
  max: number
}
