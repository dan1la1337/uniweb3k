# Практика 3. Введение в JSX

Три компонента: карточка пользователя, список дел и приветствие по времени суток.

Как запустить:

```bash
npm install
npm run dev
```

## Файлы

| Файл | За что отвечает |
|---|---|
| `src/components/UserCard.jsx` | задача 1, карточка пользователя |
| `src/components/TodoList.jsx` | задача 2, список дел |
| `src/components/WelcomeBanner.jsx` | задача 3, утро или вечер |
| `src/App.jsx` | собирает три компонента на одной странице |
| `src/index.css` | стили |
| `package.json`, `vite.config.js`, `index.html`, `src/main.jsx` | запуск проекта, разобраны в практике 2 |

## src/components/UserCard.jsx

```jsx
const firstName = 'Иван'
const lastName = 'Петров'
const age = 17
const avatarUrl = 'https://i.pravatar.cc/150?img=12'
```
Переменные с данными пользователя: имя, фамилия, возраст и ссылка на аватар.

```jsx
const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  ...
}
```
Стили карточки в виде объекта. В JSX свойства CSS пишутся в camelCase: `alignItems` вместо `align-items`.

```jsx
<div style={cardStyle}>
```
Применяет объект стилей через атрибут `style`. Это первый способ стилизации из задания.

```jsx
<img className="avatar" src={avatarUrl} alt={firstName} />
```
Аватар. Ссылка подставляется из переменной через фигурные скобки. Класс `avatar` делает картинку круглой. Это второй способ стилизации, через `className`.

```jsx
<h2>{firstName} {lastName}</h2>
<p>Возраст: {age}</p>
```
Имя, фамилия и возраст из переменных.

```jsx
<p className={age >= 18 ? 'badge badge--adult' : 'badge badge--minor'}>
  {age >= 18 ? 'Совершеннолетний' : 'Несовершеннолетний'}
</p>
```
Условие: если возраст 18 и больше, пишет «Совершеннолетний» на зелёном фоне, иначе «Несовершеннолетний» на красном. Ровно 18 лет тоже считается совершеннолетием.

## src/components/TodoList.jsx

```jsx
const todos = [
  { id: 1, text: 'Сделать практику по React', completed: true },
  ...
]
```
Массив дел. У каждого дела есть `id`, текст `text` и признак выполнения `completed`.

```jsx
<ul className="todos">
  {todos.map((todo) => (
    <li key={todo.id} className="todos__item">
```
`map` превращает каждый объект массива в строку списка. `key={todo.id}` даёт каждой строке уникальный ключ.

```jsx
<span className={todo.completed ? 'todos__mark todos__mark--done' : 'todos__mark'}>
  {todo.completed ? '✓' : '✕'}
</span>
{todo.text}
```
Если дело выполнено, перед текстом зелёная галочка «✓». Если нет, красный крестик «✕».

## src/components/WelcomeBanner.jsx

```jsx
function WelcomeBanner({ isMorning }) {
```
Компонент получает проп `isMorning`: `true` или `false`.

```jsx
<div className={isMorning ? 'banner banner--morning' : 'banner banner--evening'}>
  {isMorning ? '☀️ Доброе утро!' : '🌙 Добрый вечер!'}
</div>
```
Тернарный оператор прямо в JSX. Утром жёлтый фон, солнце и «Доброе утро!». Вечером тёмный фон, луна и «Добрый вечер!».

## src/App.jsx

```jsx
import UserCard from './components/UserCard'
import TodoList from './components/TodoList'
import WelcomeBanner from './components/WelcomeBanner'
```
Подключает три компонента.

```jsx
const hour = new Date().getHours()
```
Текущий час, от 0 до 23.

```jsx
<WelcomeBanner isMorning={hour < 12} />
```
До 12 часов передаёт `true`, после — `false`. Баннер сам решает, что показать.

```jsx
<h1>Карточка пользователя</h1>
<UserCard />

<h1>Список дел</h1>
<TodoList />
```
Выводит карточку и список дел под заголовками.

## src/index.css

| Классы | За что отвечают |
|---|---|
| `.container` | колонка шириной 480px по центру |
| `.avatar` | круглый аватар 80×80 |
| `.badge`, `.badge--adult`, `.badge--minor` | плашка возраста: зелёная или красная |
| `.todos`, `.todos__item` | список дел без точек, каждое дело в белой полоске |
| `.todos__mark`, `.todos__mark--done` | крестик красный, галочка зелёная |
| `.banner`, `.banner--morning`, `.banner--evening` | баннер: светлый утром, тёмный вечером |
