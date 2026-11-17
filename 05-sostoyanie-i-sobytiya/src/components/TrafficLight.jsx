import { useState } from 'react'

const sequence = ['red', 'yellow', 'green', 'yellow']
const lamps = ['red', 'yellow', 'green']
const names = { red: 'Красный', yellow: 'Желтый', green: 'Зеленый' }

function TrafficLight() {
  const [step, setStep] = useState(0)
  const color = sequence[step]

  function next() {
    setStep((step + 1) % sequence.length)
  }

  return (
    <div className="box">
      <h2>Светофор</h2>
      <div className="light">
        {lamps.map((lamp) => (
          <div
            key={lamp}
            className="light__lamp"
            style={{ background: lamp === color ? lamp : '#444' }}
          />
        ))}
      </div>
      <p>Сейчас горит: {names[color]}</p>
      <button onClick={next}>Дальше</button>
    </div>
  )
}

export default TrafficLight
