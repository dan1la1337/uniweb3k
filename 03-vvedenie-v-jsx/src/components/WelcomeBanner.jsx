function WelcomeBanner({ isMorning }) {
  return (
    <div className={isMorning ? 'banner banner--morning' : 'banner banner--evening'}>
      {isMorning ? '☀️ Доброе утро!' : '🌙 Добрый вечер!'}
    </div>
  )
}

export default WelcomeBanner
