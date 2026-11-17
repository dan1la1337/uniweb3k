import styles from './Contacts.module.css'

function Contacts() {
  return (
    <section>
      <h1 className={styles.title}>Контакты</h1>
      <p className={styles.line}>
        E-mail: <a className={styles.link} href="mailto:hello@mail.ru">hello@mail.ru</a>
      </p>
      <p className={styles.line}>
        Телефон: <a className={styles.link} href="tel:+79990000000">+7 (999) 000-00-00</a>
      </p>
    </section>
  )
}

export default Contacts
