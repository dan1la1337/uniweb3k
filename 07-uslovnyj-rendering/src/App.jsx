import { useState } from 'react'
import Tabs from './components/Tabs/Tabs'
import About from './components/About/About'
import Services from './components/Services/Services'
import Contacts from './components/Contacts/Contacts'
import styles from './App.module.css'

const tabs = [
  { id: 'about', label: 'О нас' },
  { id: 'services', label: 'Услуги' },
  { id: 'contacts', label: 'Контакты' },
]

function App() {
  const [activeTab, setActiveTab] = useState('about')

  return (
    <div className={styles.page}>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <main className={styles.content}>
        {activeTab === 'about' && <About />}
        {activeTab === 'services' && <Services />}
        {activeTab === 'contacts' && <Contacts />}
      </main>
    </div>
  )
}

export default App
