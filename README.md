# React TypeScript Scrollbar

A customizable scrollbar component for React applications built with TypeScript. This component provides a modern, flexible, and easy-to-use scrollbar solution with full TypeScript support.

## Features

- 🎨 Highly customizable scrollbar styling
- 📦 TypeScript support with full type definitions
- 🔄 ESM and CommonJS builds
- ⚛️ React 16.8+ support
- 🚀 Smooth scrolling behavior
- 🖱️ Track click to scroll
- 🎯 Thumb drag to scroll
- 📐 Auto-resize handling
- 🔒 Optional bottom scroll lock
- 🎯 Zero dependencies
- 📱 Responsive design

## Installation

```bash
npm install react-ts-scrollbar
# or
yarn add react-ts-scrollbar
# or
pnpm add react-ts-scrollbar
```

## Quick Start

```tsx
import { Scrollbar } from 'react-ts-scrollbar'

function App() {
	return (
		<Scrollbar style={{ height: '400px' }}>{/* Your content here */}</Scrollbar>
	)
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

## Advanced Usage

### Custom Styling Example

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
			{/* Your content here */}
		</Scrollbar>
	)
}
```

### With Bottom Lock

```tsx
import { Scrollbar } from 'react-ts-scrollbar'

function ChatScrollbar() {
	return (
		<Scrollbar keepItBottom={true} style={{ height: '400px' }}>
			{/* Chat messages */}
		</Scrollbar>
	)
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the package
npm run build

# Preview production build
npm run preview
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [mastero4ek](https://github.com/Mastero4ek)
