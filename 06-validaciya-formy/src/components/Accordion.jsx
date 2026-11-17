import { useState } from 'react'
import AccordionItem from './AccordionItem'

function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null)

  function toggle(index) {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="box accordion">
      <h2>Частые вопросы</h2>
      {items.map((item, index) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          isOpen={activeIndex === index}
          onToggle={() => toggle(index)}
        >
          {item.text}
        </AccordionItem>
      ))}
    </div>
  )
}

export default Accordion
