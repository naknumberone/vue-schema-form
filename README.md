## vue-schema-form

### Запуск

```sh
npm install
```

```sh
npm run dev
```

### Пример конфигурации JSON-файла

Расположен в /public/schema-1.json

```json5
{
  title: 'My awesome form', // Заголовок формы
  fields: {
    myField: { // Именем поля выступает ключ
      label: 'My field', // Заголовок поля
      type: 'number', // Доступный тип для поля(number, select, и прочие, добавленные в будущем)
      rules: [
        // Список правил валидации
        {
          type: 'range',
          min: 0,
          max: 10,
          message: 'Value must be between 0 and 10'
        },
        {
          type: 'required',
          message: 'Required!'
        }
      ]
    }
  }
}
```

## Расширение функциональности

### 1. Обработка нового правила валидации

Например, мы хотим, чтобы количество введенных символов было не более 10.

В /src/types/rules.ts:

1. Расширить enum `RuleTypes`
2. Наследовать новый интерфейс от `IBaseRule`

```ts
export enum RuleTypes {
  // ...
  maxLength = 'maxLength'
}

interface IBaseRule {
  message: string
}

// ...

interface IMaxLengthRule extends IBaseRule {
  type: RuleTypes.maxLength
  length: 10
}
```

Теперь добавим наш тип в union `TSchemaRule` /src/types/schema.ts

```ts
export type TSchemaRule = IRequiredRule | IRangeRule | IMaxLengthRule
```

Затем, добавим новую функцию валидации в /src/components/SchemaForm/validators/maxLength.ts

```ts
export const maxLength: IValidator<RuleTypes.maxLength> = (value, rule) =>
  value.toString().length <= rule.length
```

Добавим ее выбор в функцию `validate` /src/components/SchemaForm/validators/validateAll

```ts
const validate = (value: TFormStateFieldValue, rule: TSchemaRule) => {
  switch (rule.type) {
    // ...
    case maxLength:
      return maxLength(value, rule)
    // ...
  }
}
```

Все! Новое правило валидации доступно :)
Осталось добавить его в наш JSON

```json5
{
  // ...
  fields: {
    myField: {
      // ...
      rules: [
        {
          type: 'maxLength',
          length: 10,
          message: 'Max length is 10!'
        }
      ]
    }
  }
}
```

---

### 2. Добавление нового типа поля и связанного с ним компонента

В нашей форме мы можем сколько угодно переиспользовать уже созданные ранее компоненты, но для демонстрации пройдем полный цикл.

В конфигурации JSON мы используем поле `type`, что бы указать вариант компонента для обработки поля. 
Давайте добавим новый! Допустим, это будет поле ввода пароля

Создадим в нашем JSON поле с `type: password`

```json5
{
  // ...
  fields: {
    myField: {
      type: 'password'
    }
  }
}
```

Расширим `enum FieldTypes` в /src/types/schema.ts нашим новым полем

```ts
export enum FieldTypes {
  // ...
  password = 'password'
}
```

Создадим компонент в /src/components/SchemaForm/FieldPassword.vue и импортируем его в SchemaForm.vue, добавив в `components`

```ts
import FieldPassword from './FieldPassword.vue'

const components: Record<string, Component> = {
  // ...
  [FieldTypes.password]: FieldPassword
}
```

Расширим тип возможных параметров новым по адресу /src/components/SchemaForm/types:

```ts
export interface IFieldProps {
  type?: 'number' | 'password'
}
```

И добавим необходимые нам параметры для компонента в функцию `getFieldPropFromField`

```ts
const getFieldPropFromField = (field: TSchemaField): IFieldProps => {
  switch (field.type) {
    // ...
    case FieldTypes.password:
      return {
        type: 'password'
      }
    // ...
  }
}
```

Готово! Поле нового типа доступно для использования
