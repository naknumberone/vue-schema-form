import type { IRangeRule, IRequiredRule } from './rules'

export enum FieldTypes {
  number = 'number',
  select = 'select'
}

export interface ISchemaSelectOptions {
  title: string
  value: string
}

export type TSchemaRule = IRequiredRule | IRangeRule

interface ISchemaBaseField {
  label: string
  rules: TSchemaRule[]
}

export interface ISchemaNumberField extends ISchemaBaseField {
  type: FieldTypes.number
}

export interface ISchemaSelectField extends ISchemaBaseField {
  type: FieldTypes.select
  options: ISchemaSelectOptions[]
}

export type TSchemaField = ISchemaNumberField | ISchemaSelectField

export type TSchemaFields = Record<string, TSchemaField>

export interface ISchema {
  title: string
  fields: TSchemaFields
}
