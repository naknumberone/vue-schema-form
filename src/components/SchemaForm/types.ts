import { type ISchemaSelectOptions } from '@/types'

export interface IFieldState {
  valid: boolean
  message?: string
}

export type TFormStateFieldValue = string | number

export interface IFormStateField {
  value: TFormStateFieldValue
  state: IFieldState
}

export interface IFieldProps {
  type?: 'number'
  options?: ISchemaSelectOptions[]
}

export type TFormStateFields = Record<string, IFormStateField>
