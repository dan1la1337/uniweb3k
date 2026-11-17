# Практика 2. Введение в React

Первый React-проект: страница-визитка с именем, приветствием, умениями и увлечениями.

Как запустить:

```bash
npm install
npm run dev
```

Потом открыть адрес из терминала (обычно http://localhost:5173).

## Задача 1. Проектирование компонентов

Пример: главная страница YouTube.

| Компонент | Что это | Какие данные получает извне |
|---|---|---|
| `Header` | верхняя полоса с логотипом и поиском | данные пользователя (аватар) |
| `SearchBar` | поле поиска | текст запроса, функция поиска |
| `Sidebar` | левое меню | список пунктов меню |
| `MenuItem` | одна строка меню | иконка, название, ссылка |
| `VideoPreview` | карточка видео | картинка, название, автор, просмотры, дата |
| `LikeButton` | кнопка лайка | число лайков, нажата ли кнопка |

`MenuItem`, `VideoPreview` и `LikeButton` повторяются много раз, поэтому их выгодно сделать отдельными компонентами.

## Задача 2. Создание проекта

Проект создан через Vite (вариант React + JavaScript). Проверка установки Node.js:

```bash
node -v
npm -v
```

Команды создания проекта:

```bash
npm create vite@latest
cd my-first-vite-app
npm install
npm run dev
```

Вместо стартового текста теперь стоит «Привет, мир! Я изучаю React!», а стартовая страница превращена в визитку.

## Файлы

| Файл | За что отвечает |
|---|---|
| `package.json` | название проекта, команды и список библиотек |
| `vite.config.js` | настройки сборщика Vite |
| `index.html` | единственная HTML-страница, в неё React вставляет приложение |
| `src/main.jsx` | точка входа: запускает React |
| `src/App.jsx` | главный компонент, сама визитка |
| `src/App.css` | стили визитки |
| `src/index.css` | общие стили страницы |

## package.json

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```
Команды проекта. `npm run dev` запускает сервер для разработки, `npm run build` собирает готовый сайт в папку `dist`, `npm run preview` показывает собранный сайт.

```json
"dependencies": { "react": ..., "react-dom": ... },
"devDependencies": { "@vitejs/plugin-react": ..., "vite": ... }
```
`react` — сама библиотека. `react-dom` — вывод React в браузер. `vite` и плагин нужны только для разработки и сборки.

## vite.config.js

```js
export default defineConfig({
  plugins: [react()],
})
```
Подключает к Vite поддержку React и JSX.

## index.html

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```
Пустой `div` с id `root` — место, куда React нарисует всё приложение. Скрипт запускает `main.jsx`.

## src/main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
```
Подключает React, функцию для вывода в браузер, главный компонент и общие стили.

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```
Находит `div#root` и рисует в нём компонент `App`. `StrictMode` в режиме разработки предупреждает об ошибках в коде.

## src/App.jsx

```jsx
import './App.css'
```
Подключает стили визитки.

```jsx
const skills = ['HTML и CSS', 'JavaScript', 'React', 'Git']
const hobbies = ['Компьютерные игры', 'Музыка', 'Спорт']
```
Данные визитки: массив умений и массив увлечений. Чтобы добавить пункт, достаточно дописать строку в массив.

```jsx
function App() {
  return (
    <div className="card">
```
Компонент `App` — функция, которая возвращает разметку. `className` в JSX это то же, что `class` в HTML.

```jsx
<h1 className="card__name">Данила</h1>
<p className="card__greeting">Привет, мир! Я изучаю React!</p>
```
Имя и приветствие.

```jsx
<h2 className="card__heading">Умения</h2>
<ul className="card__list">
  {skills.map((skill) => (
    <li key={skill}>{skill}</li>
  ))}
</ul>
```
Заголовок «Умения» и список. `map` проходит по массиву `skills` и для каждого умения делает строку `<li>`. `key` нужен React, чтобы отличать строки друг от друга.

```jsx
<h2 className="card__heading">Увлечения</h2>
<ul className="card__list">
  {hobbies.map((hobby) => (
    <li key={hobby}>{hobby}</li>
  ))}
</ul>
```
То же самое для увлечений.

```jsx
export default App
```
Экспорт компонента, чтобы `main.jsx` мог его импортировать.

## src/App.css

```css
.card { max-width: 420px; margin: 60px auto; border-radius: 16px; background: #fff; box-shadow: ...; }
```
Белая карточка с тенью по центру страницы.

```css
.card__name { ... }
.card__greeting { color: #6b7280; ... }
.card__heading { color: #2563eb; ... }
.card__list { line-height: 1.7; ... }
```
Крупное имя, серое приветствие, синие заголовки разделов, списки с увеличенным расстоянием между строками.

## src/index.css

```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #eef2f7;
}
```
Убирает отступ у страницы, задаёт шрифт и светло-серый фон.
