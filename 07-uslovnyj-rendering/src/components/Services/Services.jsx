import styles from './Services.module.css'

const services = [
  {
    title: 'Создание сайтов',
    prices: [
      { name: 'Личный кабинет', price: 'от 40 000 ₽' },
      { name: 'CRM для бизнеса', price: 'от 80 000 ₽' },
    ],
  },
  {
    title: 'Редизайн сайта',
    prices: [
      { name: 'Новый дизайн', price: 'от 25 000 ₽' },
      { name: 'Адаптивная вёрстка', price: 'от 15 000 ₽' },
    ],
  },
  {
    title: 'SEO-продвижение',
    prices: [
      { name: 'Аудит сайта', price: '10 000 ₽' },
      { name: 'Продвижение', price: 'от 20 000 ₽/мес' },
    ],
  },
]

function Services() {
  return (
    <section>
      <h1 className={styles.title}>Услуги</h1>
      <div className={styles.grid}>
        {services.map((service) => (
          <article key={service.title} className={styles.card}>
            <h2 className={styles.cardTitle}>{service.title}</h2>
            {service.prices.map((item) => (
              <div key={item.name} className={styles.row}>
                <span>{item.name}</span>
                <b className={styles.price}>{item.price}</b>
              </div>
            ))}
            <button className={styles.button}>Подробнее</button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services
