import './App.css'

const skills = ['HTML и CSS', 'JavaScript', 'React', 'Git']
const hobbies = ['Компьютерные игры', 'Музыка', 'Спорт']

function App() {
  return (
    <div className="card">
      <h1 className="card__name">Данила</h1>
      <p className="card__greeting">Привет, мир! Я изучаю React!</p>

      <h2 className="card__heading">Умения</h2>
      <ul className="card__list">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h2 className="card__heading">Увлечения</h2>
      <ul className="card__list">
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
