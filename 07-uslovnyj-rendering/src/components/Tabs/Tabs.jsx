import styles from './Tabs.module.css'

function Tabs({ tabs, activeTab, onChange }) {
  return (
    <nav className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={tab.id === activeTab ? `${styles.tab} ${styles.active}` : styles.tab}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

export default Tabs
