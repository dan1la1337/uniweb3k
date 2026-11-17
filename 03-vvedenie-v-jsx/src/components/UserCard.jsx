const firstName = 'Иван'
const lastName = 'Петров'
const age = 17
const avatarUrl = 'https://i.pravatar.cc/150?img=12'

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px',
  borderRadius: '12px',
  background: '#fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
}

function UserCard() {
  return (
    <div style={cardStyle}>
      <img className="avatar" src={avatarUrl} alt={firstName} />
      <div>
        <h2>{firstName} {lastName}</h2>
        <p>Возраст: {age}</p>
        <p className={age >= 18 ? 'badge badge--adult' : 'badge badge--minor'}>
          {age >= 18 ? 'Совершеннолетний' : 'Несовершеннолетний'}
        </p>
      </div>
    </div>
  )
}

export default UserCard
