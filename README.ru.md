# React TypeScript Scrollbar

Настраиваемый компонент скроллбара для React-приложений, написанный на TypeScript.

## Установка

```bash
npm install react-ts-scrollbar
# или
yarn add react-ts-scrollbar
```

## Использование

```tsx
import { Scrollbar } from 'react-ts-scrollbar'

function App() {
	return <Scrollbar>{/* Ваш контент здесь */}</Scrollbar>
}
```

## Свойства (Props)

| Свойство        | Тип           | По умолчанию         | Описание                                                 |
| --------------- | ------------- | -------------------- | -------------------------------------------------------- |
| style           | CSSProperties | {}                   | Пользовательские стили для контейнера скроллбара         |
| className       | string        | undefined            | Пользовательский класс для контейнера скроллбара         |
| children        | ReactNode     | undefined            | Контент, отображаемый внутри скроллбара                  |
| keepItBottom    | boolean       | false                | Сохранять ли скроллбар внизу при изменении контента      |
| units           | string        | 'px'                 | CSS-единицы измерения                                    |
| barShadow       | string        | 'none'               | CSS-тень для дорожки скроллбара                          |
| thumbShadow     | string        | 'none'               | CSS-тень для ползунка скроллбара                         |
| barColor        | string        | '#87ceeb'            | Цвет фона дорожки скроллбара                             |
| thumbColor      | string        | 'rgba(0, 0, 0, 0.5)' | Цвет фона ползунка скроллбара                            |
| barBorderColor  | string        | 'transparent'        | Цвет границы дорожки скроллбара                          |
| barBorderWidth  | number        | 0                    | Ширина границы дорожки скроллбара                        |
| contentPadding  | number        | 10                   | Отступ контента                                          |
| barWidth        | number        | 12                   | Ширина дорожки скроллбара                                |
| barRadius       | number        | 10                   | Скругление углов дорожки скроллбара                      |
| thumbRadius     | number        | undefined            | Скругление углов ползунка (по умолчанию равно barRadius) |
| thumbWidth      | number        | undefined            | Ширина ползунка (по умолчанию равна barWidth)            |
| barHoverColor   | string        | undefined            | Цвет фона дорожки при наведении                          |
| thumbHoverColor | string        | undefined            | Цвет фона ползунка при наведении                         |
| contentHeight   | number        | 300                  | Фиксированная высота области контента                    |

## Возможности

- Настраиваемый внешний вид скроллбара
- Поддержка TypeScript
- Сборка в форматах ESM и CommonJS
- Поддержка React 16.8+
- Плавная прокрутка
- Прокрутка по клику на дорожку
- Прокрутка перетаскиванием ползунка
- Автоматическая обработка изменения размеров
- Опциональная фиксация прокрутки внизу

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка пакета
npm run build
```

## Лицензия

MIT
