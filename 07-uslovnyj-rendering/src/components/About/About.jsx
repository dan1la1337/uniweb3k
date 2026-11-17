import styles from './About.module.css'

function About() {
  return (
    <section>
      <h1 className={styles.title}>О нас</h1>
      <p className={styles.text}>
        NovaTech это студия, которая создаёт веб-приложения. Мы делаем корпоративные
        порталы, личные кабинеты и сервисы с уникальной логикой: от первого макета до запуска.
      </p>
    </section>
  )
}

export default About
