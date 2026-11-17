const lettersOnly = /^[a-zA-Zа-яА-ЯёЁ]+$/

export function validate(values) {
  const errors = {}

  if (!values.firstName.trim()) {
    errors.firstName = 'Введите имя'
  } else if (!lettersOnly.test(values.firstName.trim())) {
    errors.firstName = 'Имя может содержать только буквы'
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Введите фамилию'
  } else if (!lettersOnly.test(values.lastName.trim())) {
    errors.lastName = 'Фамилия может содержать только буквы'
  }

  const at = values.email.indexOf('@')
  if (at < 1 || values.email.indexOf('.', at) === -1) {
    errors.email = 'Email должен содержать @ и точку после него'
  }

  if (values.password.length < 6) {
    errors.password = 'Пароль должен быть не короче 6 символов'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Сообщение должно быть не короче 10 символов'
  }

  return errors
}
