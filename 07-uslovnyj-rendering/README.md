# Практика 7. Условный рендеринг и CSS Modules

Сайт студии NovaTech с тремя вкладками: «О нас», «Услуги», «Контакты». Вкладки переключаются без перезагрузки и без React Router, адрес в браузере не меняется.

Как запустить:

```bash
npm install
npm run dev
```

## Файлы

| Файл | За что отвечает |
|---|---|
| `src/App.jsx` | хранит активную вкладку и решает, что показать |
| `src/App.module.css` | рамка страницы и отступы контента |
| `src/components/Tabs/Tabs.jsx` | панель с тремя кнопками |
| `src/components/Tabs/Tabs.module.css` | серые кнопки и синяя активная |
| `src/components/About/About.jsx` + `.module.css` | вкладка «О нас» |
| `src/components/Services/Services.jsx` + `.module.css` | вкладка «Услуги» с карточками |
| `src/components/Contacts/Contacts.jsx` + `.module.css` | вкладка «Контакты» |
| `src/index.css` | общий фон и шрифт |

## Что такое CSS Modules

Файл с именем `*.module.css` подключается как объект: `import styles from './About.module.css'`. Класс пишется как `className={styles.title}`. При сборке Vite превращает `title` в уникальное имя вроде `_title_1x2y3`. Поэтому класс `.title` есть и в About, и в Services, и в Contacts, и они не мешают друг другу.

## src/App.jsx

```jsx
import Tabs from './components/Tabs/Tabs'
import About from './components/About/About'
import Services from './components/Services/Services'
import Contacts from './components/Contacts/Contacts'
import styles from './App.module.css'
```
Подключает панель вкладок, три компонента контента и свои стили.

```jsx
const tabs = [
  { id: 'about', label: 'О нас' },
  { id: 'services', label: 'Услуги' },
  { id: 'contacts', label: 'Контакты' },
]
```
Список вкладок: служебный id и надпись на кнопке.

```jsx
const [activeTab, setActiveTab] = useState('about')
```
Состояние: какая вкладка открыта. По умолчанию «О нас».

```jsx
<Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
```
Панель кнопок. Получает список вкладок, активную вкладку и функцию, которая меняет активную вкладку.

```jsx
<main className={styles.content}>
  {activeTab === 'about' && <About />}
  {activeTab === 'services' && <Services />}
  {activeTab === 'contacts' && <Contacts />}
</main>
```
Условный рендеринг. Показывается только тот компонент, чей id совпадает с `activeTab`. При смене вкладки React перерисовывает эту часть, страница не перезагружается.

## src/App.module.css

```css
.page { max-width: 860px; margin: 40px auto; border: 1px solid #d1d5db; background: #fff; }
.content { padding: 24px 28px 32px; }
```
Белая рамка страницы по центру и отступы вокруг контента.

## src/components/Tabs/Tabs.jsx

```jsx
function Tabs({ tabs, activeTab, onChange }) {
```
Получает всё от `App` через пропсы. Своего состояния нет.

```jsx
{tabs.map((tab) => (
  <button
    key={tab.id}
    className={tab.id === activeTab ? `${styles.tab} ${styles.active}` : styles.tab}
    onClick={() => onChange(tab.id)}
  >
    {tab.label}
  </button>
))}
```
Делает кнопку для каждой вкладки. У активной два класса, `tab` и `active`, поэтому она синяя. У остальных только `tab`, они серые. Клик передаёт id вкладки в `App`.

## src/components/Tabs/Tabs.module.css

```css
.tabs { display: flex; }
```
Кнопки в одну строку.

```css
.tab { background: #f3f4f6; ... }
.tab:hover { background: #e5e7eb; }
```
Неактивная кнопка серая, при наведении чуть темнее.

```css
.active,
.active:hover {
  background: #1d74d0;
  color: #fff;
}
```
Активная кнопка синяя с белым текстом.

## src/components/About/About.jsx

```jsx
<section>
  <h1 className={styles.title}>О нас</h1>
  <p className={styles.text}>NovaTech это студия, которая создаёт веб-приложения. ...</p>
</section>
```
Заголовок и текст о студии. Стили из `About.module.css`.

## src/components/Services/Services.jsx

```jsx
const services = [
  {
    title: 'Создание сайтов',
    prices: [
      { name: 'Личный кабинет', price: 'от 40 000 ₽' },
      { name: 'CRM для бизнеса', price: 'от 80 000 ₽' },
    ],
  },
  ...
]
```
Данные трёх карточек: название услуги и строки с ценами.

```jsx
<div className={styles.grid}>
  {services.map((service) => (
    <article key={service.title} className={styles.card}>
      <h2 className={styles.cardTitle}>{service.title}</h2>
```
Сетка карточек. Для каждой услуги карточка с заголовком.

```jsx
{service.prices.map((item) => (
  <div key={item.name} className={styles.row}>
    <span>{item.name}</span>
    <b className={styles.price}>{item.price}</b>
  </div>
))}
```
Строки внутри карточки: слева название, справа цена жирным.

```jsx
<button className={styles.button}>Подробнее</button>
```
Кнопка внизу карточки.

## src/components/Services/Services.module.css

| Класс | За что отвечает |
|---|---|
| `.grid` | три карточки в ряд одинаковой ширины |
| `.card` | серая карточка со скруглёнными углами |
| `.cardTitle` | заголовок карточки |
| `.row` | строка «название — цена» с линией снизу |
| `.price` | цена не переносится на две строки |
| `.button`, `.button:hover` | белая круглая кнопка, синеет при наведении |

## src/components/Contacts/Contacts.jsx

```jsx
<p className={styles.line}>
  E-mail: <a className={styles.link} href="mailto:hello@mail.ru">hello@mail.ru</a>
</p>
<p className={styles.line}>
  Телефон: <a className={styles.link} href="tel:+79990000000">+7 (999) 000-00-00</a>
</p>
```
Почта и телефон. Ссылка `mailto:` открывает почтовую программу, `tel:` на телефоне начинает звонок.

## src/components/Contacts/Contacts.module.css

```css
.title { ... }
.line { margin: 8px 0; font-size: 17px; }
.link { color: #1d74d0; }
```
Заголовок, отступы между строками и синие ссылки.

## src/index.css

```css
body { margin: 0; font-family: Arial, sans-serif; background: #f9fafb; color: #111827; }
```
Общие стили страницы: шрифт, фон, цвет текста. Это обычный CSS, он действует на всю страницу.
