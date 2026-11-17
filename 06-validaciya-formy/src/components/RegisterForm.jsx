import { useState } from 'react'
import { validate } from './validate'

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  message: '',
}

function RegisterForm() {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState(validate(emptyForm))
  const [touched, setTouched] = useState({})
  const [isSent, setIsSent] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    setErrors(validate(nextValues))
    setIsSent(false)
  }

  function handleBlur(event) {
    setTouched({ ...touched, [event.target.name]: true })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const currentErrors = validate(values)
    setErrors(currentErrors)
    setTouched({ firstName: true, lastName: true, email: true, password: true, message: true })
    if (Object.keys(currentErrors).length > 0) return

    setIsSent(true)
    setValues(emptyForm)
    setErrors(validate(emptyForm))
    setTouched({})
  }

  function showError(name) {
    return touched[name] && errors[name] ? <p className="form__error">{errors[name]}</p> : null
  }

  return (
    <form className="box form" onSubmit={handleSubmit} noValidate>
      <h2>Регистрация</h2>

      <label className="form__label">
        Имя
        <input className="form__input" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
      </label>
      {showError('firstName')}

      <label className="form__label">
        Фамилия
        <input className="form__input" name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
      </label>
      {showError('lastName')}

      <label className="form__label">
        Email
        <input className="form__input" type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
      </label>
      {showError('email')}

      <label className="form__label">
        Пароль
        <input className="form__input" type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
      </label>
      {showError('password')}

      <label className="form__label">
        Сообщение
        <textarea className="form__input" name="message" rows="4" value={values.message} onChange={handleChange} onBlur={handleBlur} />
      </label>
      {showError('message')}

      <button className="form__button" type="submit" disabled={Object.keys(errors).length > 0}>
        Зарегистрироваться
      </button>

      {isSent && <p className="form__success">Спасибо!</p>}
    </form>
  )
}

export default RegisterForm
