const todos = [
  { id: 1, text: 'Сделать практику по React', completed: true },
  { id: 2, text: 'Прочитать лекцию про JSX', completed: true },
  { id: 3, text: 'Сходить в магазин', completed: false },
  { id: 4, text: 'Подготовиться к экзамену', completed: false },
]

function TodoList() {
  return (
    <ul className="todos">
      {todos.map((todo) => (
        <li key={todo.id} className="todos__item">
          <span className={todo.completed ? 'todos__mark todos__mark--done' : 'todos__mark'}>
            {todo.completed ? '✓' : '✕'}
          </span>
          {todo.text}
        </li>
      ))}
    </ul>
  )
}

export default TodoList
