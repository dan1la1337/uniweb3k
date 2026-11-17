import { useState } from 'react'
import Button from 'components/ui/Button'
import { truncateText } from 'utils/stringHelpers'

const text =
  'React это библиотека для создания интерфейсов. Интерфейс собирается из небольших компонентов, каждый из которых отвечает за свою часть страницы. Компоненты можно переиспользовать и комбинировать между собой.'

function HomePage() {
  const [isFull, setIsFull] = useState(false)

  return (
    <section className="page">
      <h1>Главная</h1>
      <p>{isFull ? text : truncateText(text, 60)}</p>
      <Button onClick={() => setIsFull(!isFull)}>
        {isFull ? 'Свернуть' : 'Читать дальше'}
      </Button>
    </section>
  )
}

export default HomePage
