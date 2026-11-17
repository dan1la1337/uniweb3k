function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="accordion__item">
      <button className="accordion__title" onClick={onToggle}>
        {title}
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="accordion__content">{children}</div>}
    </div>
  )
}

export default AccordionItem
