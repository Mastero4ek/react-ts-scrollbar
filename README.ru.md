# React TypeScript Scrollbar

Настраиваемый компонент скроллбара для React-приложений, построенный с использованием TypeScript. Этот компонент предоставляет современное, гибкое и простое в использовании решение для скроллбара с полной поддержкой TypeScript.

## Возможности

- 🎨 Высокая настраиваемость стилей скроллбара
- 📦 Поддержка TypeScript с полными определениями типов
- 🔄 Сборка в форматах ESM и CommonJS
- ⚛️ Поддержка React 16.8+
- 🚀 Плавная прокрутка
- 🖱️ Прокрутка по клику на трек
- 🎯 Прокрутка перетаскиванием ползунка
- 📐 Автоматическая обработка изменения размеров
- 🔒 Опциональная блокировка прокрутки внизу
- 🎯 Отсутствие зависимостей
- 📱 Адаптивный дизайн

## Установка

```bash
npm install react-ts-scrollbar
# или
yarn add react-ts-scrollbar
# или
pnpm add react-ts-scrollbar
```

## Быстрый старт

```tsx
import { Scrollbar } from 'react-ts-scrollbar'

function App() {
	return (
		<Scrollbar style={{ height: '400px' }}>{/* Ваш контент здесь */}</Scrollbar>
	)
}
```

## Свойства

| Свойство        | Тип           | По умолчанию         | Описание                                                  |
| --------------- | ------------- | -------------------- | --------------------------------------------------------- |
| style           | CSSProperties | {}                   | Пользовательские стили для контейнера скроллбара          |
| children        | ReactNode     | undefined            | Контент для отображения внутри скроллбара                 |
| keepItBottom    | boolean       | false                | Сохранять ли скроллбар внизу при изменении контента       |
| units           | string        | 'px'                 | CSS-единицы для измерений                                 |
| barShadow       | string        | 'none'               | CSS-тень для трека скроллбара                             |
| thumbShadow     | string        | 'none'               | CSS-тень для ползунка скроллбара                          |
| barColor        | string        | '#87ceeb'            | Цвет фона трека скроллбара                                |
| thumbColor      | string        | 'rgba(0, 0, 0, 0.5)' | Цвет фона ползунка скроллбара                             |
| barBorderColor  | string        | 'transparent'        | Цвет границы трека скроллбара                             |
| barBorderWidth  | number        | 0                    | Ширина границы трека скроллбара                           |
| contentPadding  | number        | 10                   | Отступы области контента                                  |
| barWidth        | number        | 12                   | Ширина трека скроллбара                                   |
| barRadius       | number        | 10                   | Радиус скругления трека скроллбара                        |
| thumbRadius     | number        | undefined            | Радиус скругления ползунка (по умолчанию равен barRadius) |
| thumbWidth      | number        | undefined            | Ширина ползунка (по умолчанию равна barWidth)             |
| barHoverColor   | string        | undefined            | Цвет фона трека при наведении                             |
| thumbHoverColor | string        | undefined            | Цвет фона ползунка при наведении                          |
| contentHeight   | number        | 300                  | Фиксированная высота области контента                     |

## Расширенное использование

### Пример пользовательской стилизации

```tsx
import { Scrollbar } from 'react-ts-scrollbar'

function CustomScrollbar() {
	return (
		<Scrollbar
			style={{ height: '500px', width: '100%' }}
			barColor='#f0f0f0'
			thumbColor='#888'
			barWidth={8}
			thumbWidth={6}
			barRadius={4}
			thumbRadius={4}
			barHoverColor='#e0e0e0'
			thumbHoverColor='#666'
		>
			{/* Ваш контент здесь */}
		</Scrollbar>
	)
}
```

### С блокировкой внизу

```tsx
import { Scrollbar } from 'react-ts-scrollbar'

function ChatScrollbar() {
	return (
		<Scrollbar keepItBottom={true} style={{ height: '400px' }}>
			{/* Сообщения чата */}
		</Scrollbar>
	)
}
```

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка пакета
npm run build

# Предпросмотр production-сборки
npm run preview
```

## Поддержка браузеров

- Chrome (последняя версия)
- Firefox (последняя версия)
- Safari (последняя версия)
- Edge (последняя версия)

## Вклад в проект

Мы приветствуем ваш вклад! Пожалуйста, не стесняйтесь отправлять Pull Request.

## Лицензия

MIT © [mastero4ek](https://github.com/Mastero4ek)
