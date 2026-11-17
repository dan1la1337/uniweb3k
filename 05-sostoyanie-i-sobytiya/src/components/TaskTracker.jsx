import { useState } from 'react'

function TaskTracker() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('')

  function addTask(event) {
    event.preventDefault()
    const value = text.trim()
    if (!value) return
    setTasks([...tasks, { id: Date.now(), text: value, completed: false }])
    setText('')
  }

  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function toggleTodo(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  return (
    <div className="box">
      <h2>Трекер задач</h2>
      <form className="tracker__form" onSubmit={addTask}>
        <input
          className="tracker__input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Новая задача"
        />
        <button type="submit">Добавить</button>
      </form>

      <ul className="tracker__list">
        {tasks.map((task) => (
          <li key={task.id} className="tracker__item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTodo(task.id)}
            />
            <span className={task.completed ? 'tracker__text tracker__text--done' : 'tracker__text'}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p className="tracker__empty">Задач пока нет</p>}
    </div>
  )
}

export default TaskTracker
