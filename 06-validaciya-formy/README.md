# Практика 6. Валидация формы и подъём состояния

Форма регистрации с проверкой полей и аккордеон, в котором открыт только один пункт.

Как запустить:

```bash
npm install
npm run dev
```

## Файлы

| Файл | За что отвечает |
|---|---|
| `src/components/validate.js` | правила проверки полей |
| `src/components/RegisterForm.jsx` | форма регистрации |
| `src/components/Accordion.jsx` | аккордеон, хранит открытый пункт |
| `src/components/AccordionItem.jsx` | один пункт аккордеона |
| `src/App.jsx` | выводит форму и аккордеон, хранит вопросы |
| `src/index.css` | стили |

## src/components/validate.js

```js
const lettersOnly = /^[a-zA-Zа-яА-ЯёЁ]+$/
```
Шаблон «только буквы»: латиница и кириллица, без цифр, пробелов и знаков.

```js
export function validate(values) {
  const errors = {}
```
Функция получает значения всех полей и собирает объект ошибок. Ключ — имя поля, значение — текст ошибки.

```js
if (!values.firstName.trim()) {
  errors.firstName = 'Введите имя'
} else if (!lettersOnly.test(values.firstName.trim())) {
  errors.firstName = 'Имя может содержать только буквы'
}
```
Имя не пустое и состоит только из букв. Фамилия проверяется так же.

```js
const at = values.email.indexOf('@')
if (at < 1 || values.email.indexOf('.', at) === -1) {
  errors.email = 'Email должен содержать @ и точку после него'
}
```
Ищет `@`. Перед ней должен быть хотя бы один символ, а после неё должна быть точка.

```js
if (values.password.length < 6) { ... }
```
Пароль не короче 6 символов.

```js
if (values.message.trim().length < 10) { ... }
```
Сообщение не короче 10 символов.

```js
return errors
```
Если всё правильно, объект пустой.

## src/components/RegisterForm.jsx

```jsx
const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  message: '',
}
```
Пустая форма. С неё форма начинается, к ней же сбрасывается после отправки.

```jsx
const [values, setValues] = useState(emptyForm)
const [errors, setErrors] = useState(validate(emptyForm))
const [touched, setTouched] = useState({})
const [isSent, setIsSent] = useState(false)
```
Четыре состояния:
- `values` — что введено в поля;
- `errors` — текущие ошибки; пустая форма с ошибками, поэтому кнопка сразу неактивна;
- `touched` — какие поля пользователь уже покинул;
- `isSent` — была ли успешная отправка.

```jsx
function handleChange(event) {
  const { name, value } = event.target
  const nextValues = { ...values, [name]: value }
  setValues(nextValues)
  setErrors(validate(nextValues))
  setIsSent(false)
}
```
Срабатывает при каждом вводе символа. По атрибуту `name` понимает, какое поле изменилось, и записывает новое значение. Сразу пересчитывает ошибки. Убирает надпись «Спасибо!», если пользователь начал заполнять форму заново.

```jsx
function handleBlur(event) {
  setTouched({ ...touched, [event.target.name]: true })
}
```
Срабатывает, когда пользователь уходит из поля (onBlur). Отмечает поле как тронутое. С этого момента под ним видны ошибки.

```jsx
function handleSubmit(event) {
  event.preventDefault()
  const currentErrors = validate(values)
  setErrors(currentErrors)
  setTouched({ firstName: true, lastName: true, email: true, password: true, message: true })
  if (Object.keys(currentErrors).length > 0) return
```
Отправка формы. `preventDefault` не даёт странице перезагрузиться. Ещё раз проверяет поля и показывает все ошибки. Если ошибки есть, дальше не идёт.

```jsx
setIsSent(true)
setValues(emptyForm)
setErrors(validate(emptyForm))
setTouched({})
```
Если ошибок нет: показывает «Спасибо!», очищает поля и сбрасывает отметки.

```jsx
function showError(name) {
  return touched[name] && errors[name] ? <p className="form__error">{errors[name]}</p> : null
}
```
Выводит красный текст ошибки под полем, но только если поле уже тронуто и в нём есть ошибка.

```jsx
<form className="box form" onSubmit={handleSubmit} noValidate>
```
Форма. `noValidate` отключает встроенные подсказки браузера, работает только наша проверка.

```jsx
<label className="form__label">
  Имя
  <input className="form__input" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
</label>
{showError('firstName')}
```
Поле «Имя». `value` берётся из состояния, `onChange` записывает ввод, `onBlur` отмечает уход из поля. Под полем место для ошибки. Фамилия, Email, Пароль и Сообщение устроены так же. Для сообщения используется `textarea`, для пароля `type="password"`.

```jsx
<button className="form__button" type="submit" disabled={Object.keys(errors).length > 0}>
  Зарегистрироваться
</button>
```
Кнопка неактивна (`disabled`), пока в объекте ошибок есть хотя бы одна ошибка.

```jsx
{isSent && <p className="form__success">Спасибо!</p>}
```
После успешной отправки показывает «Спасибо!».

## src/components/Accordion.jsx

```jsx
function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null)
```
Аккордеон получает список пунктов. Хранит номер открытого пункта `activeIndex`. `null` — всё закрыто. Это и есть поднятое состояние: оно лежит в родителе, а не в каждом пункте.

```jsx
function toggle(index) {
  setActiveIndex(activeIndex === index ? null : index)
}
```
Клик по открытому пункту закрывает его. Клик по другому открывает его, а прежний закрывается сам, потому что открытым может быть только один номер.

```jsx
{items.map((item, index) => (
  <AccordionItem
    key={item.title}
    title={item.title}
    isOpen={activeIndex === index}
    onToggle={() => toggle(index)}
  >
    {item.text}
  </AccordionItem>
))}
```
Для каждого пункта рисует `AccordionItem`. Передаёт заголовок, открыт ли он (`isOpen`) и функцию переключения (`onToggle`). Текст пункта передаётся как `children`.

## src/components/AccordionItem.jsx

```jsx
function AccordionItem({ title, children, isOpen, onToggle }) {
```
Пункт сам ничего не хранит. Всё получает от родителя через пропсы.

```jsx
<button className="accordion__title" onClick={onToggle}>
  {title}
  <span>{isOpen ? '−' : '+'}</span>
</button>
```
Заголовок пункта. Клик сообщает родителю, что пункт нажали. Справа «+» у закрытого пункта и «−» у открытого.

```jsx
{isOpen && <div className="accordion__content">{children}</div>}
```
Содержимое показывается только у открытого пункта.

## src/App.jsx

```jsx
const questions = [
  { title: 'Что такое React?', text: '...' },
  ...
]
```
Данные для аккордеона: заголовок и текст каждого пункта.

```jsx
<RegisterForm />
<Accordion items={questions} />
```
Выводит форму и аккордеон.

## src/index.css

| Классы | За что отвечают |
|---|---|
| `.container`, `.box` | колонка по центру, белые блоки |
| `.form__label`, `.form__input` | подписи и поля на всю ширину |
| `.form__error` | красный мелкий текст ошибки |
| `.form__button`, `.form__button:disabled` | синяя кнопка, серая когда неактивна |
| `.form__success` | зелёная надпись «Спасибо!» |
| `.accordion__item`, `.accordion__title`, `.accordion__content` | строки аккордеона с линией снизу, заголовок на всю ширину, серый текст |
