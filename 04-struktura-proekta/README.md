# Практика 4. Структура проекта и связывание компонентов

Проект разложен по папкам `components`, `pages`, `utils`. Файлы импортируются по абсолютным путям вида `components/ui/Button` без `../../`.

Как запустить:

```bash
npm install
npm run dev
```

## Структура

```
src/
  components/
    ui/
      Button.jsx        кнопка, экспорт по умолчанию
  pages/
    HomePage.jsx        главная страница
    AboutPage.jsx       страница «О проекте»
  utils/
    stringHelpers.js    функция truncateText, именованный экспорт
  App.jsx               собирает страницы
  main.jsx              запуск React
  index.css             стили
jsconfig.json           подсказывает редактору, что пути считаются от src
vite.config.js          учит Vite понимать абсолютные пути
```

## jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```
Говорит редактору (VS Code), что пути вида `components/...` начинаются от папки `src`. Тогда работают подсказки и переход к файлу по клику.

## vite.config.js

```js
resolve: {
  alias: {
    components: path.resolve(import.meta.dirname, 'src/components'),
    pages: path.resolve(import.meta.dirname, 'src/pages'),
    utils: path.resolve(import.meta.dirname, 'src/utils'),
  },
},
```
`jsconfig.json` нужен только редактору. Сам Vite про `baseUrl` не знает, поэтому здесь ему явно сказано: `components` это папка `src/components`, `pages` это `src/pages`, `utils` это `src/utils`. В проекте на Create React App хватило бы одного `jsconfig.json`.

## src/components/ui/Button.jsx

```jsx
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}
```
Своя кнопка. `children` — то, что написано между `<Button>` и `</Button>`, это текст кнопки. `onClick` — функция, которая сработает при нажатии.

```jsx
export default Button
```
Экспорт по умолчанию. Импортируется без фигурных скобок: `import Button from 'components/ui/Button'`.

## src/utils/stringHelpers.js

```js
export function truncateText(text, maxLength) {
```
Именованный экспорт. Импортируется в фигурных скобках: `import { truncateText } from 'utils/stringHelpers'`.

```js
if (text.length <= maxLength) {
  return text
}
```
Если текст и так короткий, возвращает его без изменений.

```js
return text.slice(0, maxLength) + '...'
```
Иначе отрезает первые `maxLength` символов и дописывает троеточие.

## src/pages/HomePage.jsx

```jsx
import { useState } from 'react'
import Button from 'components/ui/Button'
import { truncateText } from 'utils/stringHelpers'
```
Абсолютные импорты: кнопка без скобок (default), функция в скобках (named).

```jsx
const text = 'React это библиотека ...'
```
Длинный текст, который будем обрезать.

```jsx
const [isFull, setIsFull] = useState(false)
```
Состояние: показан ли текст целиком. Сначала нет.

```jsx
<p>{isFull ? text : truncateText(text, 60)}</p>
```
Если `isFull` ложно, показывает первые 60 символов с троеточием. Если истинно, весь текст.

```jsx
<Button onClick={() => setIsFull(!isFull)}>
  {isFull ? 'Свернуть' : 'Читать дальше'}
</Button>
```
Наша кнопка. При нажатии переключает `isFull`, текст разворачивается или сворачивается. Надпись на кнопке меняется.

```jsx
export default HomePage
```
Экспорт страницы по умолчанию.

## src/pages/AboutPage.jsx

```jsx
function AboutPage() {
  return (
    <section className="page">
      <h1>О проекте</h1>
      <p>Учебный проект про структуру папок, импорт и экспорт.</p>
    </section>
  )
}
```
Вторая страница из задания 1, простой блок с заголовком и текстом.

## src/App.jsx

```jsx
import HomePage from 'pages/HomePage'
import AboutPage from 'pages/AboutPage'
```
Импорт страниц по абсолютному пути.

```jsx
<div className="container">
  <HomePage />
  <AboutPage />
</div>
```
Выводит обе страницы одну под другой.

## src/index.css

| Классы | За что отвечают |
|---|---|
| `.container` | колонка шириной 560px по центру |
| `.page` | белый блок страницы со скруглёнными углами |
| `.button`, `.button:hover` | синяя кнопка, темнеет при наведении |
