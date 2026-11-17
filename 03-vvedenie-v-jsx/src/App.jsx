import UserCard from './components/UserCard'
import TodoList from './components/TodoList'
import WelcomeBanner from './components/WelcomeBanner'

function App() {
  const hour = new Date().getHours()

  return (
    <div className="container">
      <WelcomeBanner isMorning={hour < 12} />

      <h1>Карточка пользователя</h1>
      <UserCard />

      <h1>Список дел</h1>
      <TodoList />
    </div>
  )
}

export default App
