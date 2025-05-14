# React TypeScript Scrollbar

A customizable scrollbar component for React applications built with TypeScript.

## Installation

```bash
npm install react-ts-scrollbar
# or
yarn add react-ts-scrollbar
```

## Usage

```tsx
import { Scrollbar } from 'react-ts-scrollbar'

function App() {
	return <Scrollbar>{/* Your content here */}</Scrollbar>
}
```

## Props

| Prop            | Type          | Default              | Description                                                      |
| --------------- | ------------- | -------------------- | ---------------------------------------------------------------- |
| style           | CSSProperties | {}                   | Custom styles for the scrollbar container                        |
| children        | ReactNode     | undefined            | Content to be displayed inside the scrollbar                     |
| keepItBottom    | boolean       | false                | Whether to keep the scrollbar at the bottom when content changes |
| units           | string        | 'px'                 | CSS units to use for measurements                                |
| barShadow       | string        | 'none'               | CSS shadow for the scrollbar track                               |
| thumbShadow     | string        | 'none'               | CSS shadow for the scrollbar thumb                               |
| barColor        | string        | '#87ceeb'            | Background color of the scrollbar track                          |
| thumbColor      | string        | 'rgba(0, 0, 0, 0.5)' | Background color of the scrollbar thumb                          |
| barBorderColor  | string        | 'transparent'        | Border color of the scrollbar track                              |
| barBorderWidth  | number        | 0                    | Border width of the scrollbar track                              |
| contentPadding  | number        | 10                   | Padding of the content area                                      |
| barWidth        | number        | 12                   | Width of the scrollbar track                                     |
| barRadius       | number        | 10                   | Border radius of the scrollbar track                             |
| thumbRadius     | number        | undefined            | Border radius of the scrollbar thumb (defaults to barRadius)     |
| thumbWidth      | number        | undefined            | Width of the scrollbar thumb (defaults to barWidth)              |
| barHoverColor   | string        | undefined            | Background color of the scrollbar track on hover                 |
| thumbHoverColor | string        | undefined            | Background color of the scrollbar thumb on hover                 |
| contentHeight   | number        | 300                  | Fixed height of the content area                                 |

## Features

- Customizable scrollbar styling
- TypeScript support
- ESM and CommonJS builds
- React 16.8+ support
- Smooth scrolling
- Track click to scroll
- Thumb drag to scroll
- Auto-resize handling
- Optional bottom scroll lock

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the package
npm run build
```

## License

MIT
