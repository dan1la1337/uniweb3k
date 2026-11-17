# Практика 5. Состояние и обработка событий

Два компонента: трекер задач и светофор.

Как запустить:

```bash
npm install
npm run dev
```

## Файлы

| Файл | За что отвечает |
|---|---|
| `src/components/TaskTracker.jsx` | задача 1, трекер задач с чекбоксами |
| `src/components/TrafficLight.jsx` | задача 2, светофор |
| `src/App.jsx` | выводит оба компонента |
| `src/index.css` | стили |

## src/components/TaskTracker.jsx

```jsx
const [tasks, setTasks] = useState([])
const [text, setText] = useState('')
```
Два состояния. `tasks` — массив задач, сначала пустой. `text` — то, что сейчас написано в поле ввода.

```jsx
function addTask(event) {
  event.preventDefault()
```
Добавление задачи. `preventDefault` не даёт форме перезагрузить страницу.

```jsx
const value = text.trim()
if (!value) return
```
Убирает пробелы по краям. Пустую задачу не добавляет.

```jsx
setTasks([...tasks, { id: Date.now(), text: value, completed: false }])
setText('')
```
Создаёт новый массив: все старые задачи плюс новая. Старый массив не меняется, так требует React. `Date.now()` даёт уникальный id. `completed: false` — задача ещё не выполнена. Потом поле ввода очищается.

```jsx
function removeTask(id) {
  setTasks(tasks.filter((task) => task.id !== id))
}
```
Удаление: новый массив из всех задач, кроме задачи с этим id.

```jsx
function toggleTodo(id) {
  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    ),
  )
}
```
Отметка о выполнении. Проходит по задачам. У нужной задачи делает копию с обратным значением `completed`, остальные оставляет как есть.

```jsx
<form className="tracker__form" onSubmit={addTask}>
  <input
    value={text}
    onChange={(event) => setText(event.target.value)}
    placeholder="Новая задача"
  />
  <button type="submit">Добавить</button>
</form>
```
Поле и кнопка внутри формы. Форма отправляется и по кнопке «Добавить», и по клавише Enter, в обоих случаях вызывается `addTask`. `value` и `onChange` связывают поле с состоянием `text`.

```jsx
{tasks.map((task) => (
  <li key={task.id} className="tracker__item">
```
Выводит каждую задачу строкой списка.

```jsx
<input
  type="checkbox"
  checked={task.completed}
  onChange={() => toggleTodo(task.id)}
/>
```
Чекбокс. Галочка стоит, если задача выполнена. Клик вызывает `toggleTodo`.

```jsx
<span className={task.completed ? 'tracker__text tracker__text--done' : 'tracker__text'}>
  {task.text}
</span>
```
Текст задачи. У выполненной задачи текст зелёный и зачёркнутый.

```jsx
<button onClick={() => removeTask(task.id)}>Удалить</button>
```
Красная кнопка удаления рядом с задачей.

```jsx
{tasks.length === 0 && <p className="tracker__empty">Задач пока нет</p>}
```
Если задач нет, показывает подсказку.

## src/components/TrafficLight.jsx

```jsx
const sequence = ['red', 'yellow', 'green', 'yellow']
```
Порядок цветов: красный, жёлтый, зелёный, жёлтый, и снова по кругу.

```jsx
const lamps = ['red', 'yellow', 'green']
const names = { red: 'Красный', yellow: 'Желтый', green: 'Зеленый' }
```
Три лампы светофора сверху вниз и русские названия цветов для подписи.

```jsx
const [step, setStep] = useState(0)
const color = sequence[step]
```
`step` — номер шага в последовательности. По нему берётся текущий цвет.

```jsx
function next() {
  setStep((step + 1) % sequence.length)
}
```
Переход на следующий шаг. `% sequence.length` возвращает к нулю после последнего шага, так получается цикл.

```jsx
{lamps.map((lamp) => (
  <div
    key={lamp}
    className="light__lamp"
    style={{ background: lamp === color ? lamp : '#444' }}
  />
))}
```
Рисует три круга. Круг текущего цвета закрашен этим цветом, остальные тёмно-серые.

```jsx
<p>Сейчас горит: {names[color]}</p>
<button onClick={next}>Дальше</button>
```
Подпись с текущим цветом и кнопка «Дальше».

## src/App.jsx

```jsx
<div className="container">
  <TaskTracker />
  <TrafficLight />
</div>
```
Выводит трекер и светофор один под другим.

## src/index.css

| Классы | За что отвечают |
|---|---|
| `.container`, `.box` | колонка по центру, белые блоки |
| `button` | синие кнопки |
| `.tracker__form`, `.tracker__input` | поле ввода растянуто, кнопка справа |
| `.tracker__item` | строка задачи: чекбокс, текст, кнопка в ряд |
| `.tracker__item button` | кнопка «Удалить» красная |
| `.tracker__text--done` | зачёркнутый зелёный текст выполненной задачи |
| `.light`, `.light__lamp` | чёрный корпус светофора и три круглые лампы |
