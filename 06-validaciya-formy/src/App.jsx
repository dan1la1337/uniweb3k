import RegisterForm from './components/RegisterForm'
import Accordion from './components/Accordion'

const questions = [
  { title: 'Что такое React?', text: 'Библиотека для создания пользовательских интерфейсов из компонентов.' },
  { title: 'Что такое состояние?', text: 'Данные компонента, при изменении которых React перерисовывает интерфейс.' },
  { title: 'Что значит поднять состояние?', text: 'Перенести состояние в общий родительский компонент и передавать его детям через пропсы.' },
]

function App() {
  return (
    <div className="container">
      <RegisterForm />
      <Accordion items={questions} />
    </div>
  )
}

export default App
