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
- 🖼️ Поддержка пользовательского изображения ползунка
- 🎭 Маскирование контента с эффектами затухания
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

### Основные свойства

| Свойство       | Тип           | По умолчанию | Описание                                         |
| -------------- | ------------- | ------------ | ------------------------------------------------ |
| style          | CSSProperties | {}           | Пользовательские стили для контейнера скроллбара |
| children       | ReactNode     | undefined    | Контент для отображения внутри скроллбара        |
| units          | string        | 'px'         | CSS-единицы для измерений                        |
| contentHeight  | number        | 300          | Фиксированная высота области контента            |
| contentPadding | number        | 10           | Отступы области контента                         |

### Свойства поведения

| Свойство     | Тип     | По умолчанию | Описание                                            |
| ------------ | ------- | ------------ | --------------------------------------------------- |
| keepItBottom | boolean | false        | Сохранять ли скроллбар внизу при изменении контента |

### Свойства стилизации трека

| Свойство       | Тип    | По умолчанию  | Описание                                              |
| -------------- | ------ | ------------- | ----------------------------------------------------- |
| barColor       | string | '#87ceeb'     | Цвет фона трека скроллбара                            |
| barHoverColor  | string | undefined     | Цвет фона трека при наведении                         |
| barWidth       | number | 12            | Ширина трека скроллбара                               |
| barRadius      | number | 10            | Радиус скругления трека скроллбара                    |
| barShadow      | string | 'none'        | CSS-тень для трека скроллбара                         |
| barBorderColor | string | 'transparent' | Цвет границы трека скроллбара                         |
| barBorderWidth | number | 0             | Ширина границы трека скроллбара                       |
| barTransition  | number | 0             | Длительность перехода в секундах для трека скроллбара |

### Свойства стилизации ползунка

| Свойство        | Тип    | По умолчанию         | Описание                                                  |
| --------------- | ------ | -------------------- | --------------------------------------------------------- |
| thumbColor      | string | 'rgba(0, 0, 0, 0.5)' | Цвет фона ползунка скроллбара                             |
| thumbHoverColor | string | undefined            | Цвет фона ползунка при наведении                          |
| thumbWidth      | number | undefined            | Ширина ползунка (по умолчанию равна barWidth)             |
| thumbRadius     | number | undefined            | Радиус скругления ползунка (по умолчанию равен barRadius) |
| thumbShadow     | string | 'none'               | CSS-тень для ползунка скроллбара                          |
| thumbTransition | number | 0                    | Длительность перехода в секундах для ползунка скроллбара  |

### Свойства изображения ползунка

| Свойство         | Тип    | По умолчанию | Описание                                              |
| ---------------- | ------ | ------------ | ----------------------------------------------------- |
| thumbImage       | string | null         | URL или путь к пользовательскому изображению ползунка |
| thumbImageWidth  | number | 10           | Ширина пользовательского изображения ползунка         |
| thumbImageHeight | number | 10           | Высота пользовательского изображения ползунка         |

### Свойства маски

| Свойство | Тип     | По умолчанию | Описание                                    |
| -------- | ------- | ------------ | ------------------------------------------- |
| mask     | boolean | false        | Включить маскирование контента с затуханием |
| maskSize | number  | 20           | Размер маски затухания в процентах          |

### Свойства обратных вызовов событий

| Свойство       | Тип        | По умолчанию | Описание                                        |
| -------------- | ---------- | ------------ | ----------------------------------------------- |
| onScrollTop    | () => void | undefined    | Функция обратного вызова при прокрутке до верха |
| onScrollBottom | () => void | undefined    | Функция обратного вызова при прокрутке до низа  |

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
			barTransition={0.2}
			thumbTransition={0.15}
		>
			{/* Ваш контент здесь */}
		</Scrollbar>
	)
}
```

### С плавными переходами

```tsx
import { Scrollbar } from 'react-ts-scrollbar'

function SmoothScrollbar() {
	return (
		<Scrollbar
			style={{ height: '400px' }}
			barTransition={0.3}
			thumbTransition={0.2}
			barHoverColor='#4a90e2'
			thumbHoverColor='#2c5aa0'
		>
			{/* Контент с плавными эффектами при наведении */}
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

### С пользовательским изображением ползунка

```tsx
import { Scrollbar } from 'react-ts-scrollbar'

function ImageThumbScrollbar() {
	return (
		<Scrollbar
			style={{ height: '400px' }}
			thumbImage='/путь/к/вашему/изображению-ползунка.png'
			thumbImageWidth={20}
			thumbImageHeight={20}
			barWidth={16}
		>
			{/* Контент с пользовательским изображением ползунка */}
		</Scrollbar>
	)
}
```

### С маскированием контента

```tsx
import { Scrollbar } from 'react-ts-scrollbar'

function MaskedScrollbar() {
	return (
		<Scrollbar style={{ height: '400px' }} mask={true} maskSize={30}>
			{/* Контент с эффектами затухания на границах скролла */}
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
