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
- 🖼️ Custom thumb image support
- 🎭 Content masking with fade effects
- 🎯 Zero dependencies
- 📱 Responsive design

You can see the component in action and test all its features in our interactive demo:

**[🚀 Live Demo](https://mastero4ek.github.io/react-ts-scrollbar/)**

The demo includes:

- Real-time customization of all scrollbar properties
- Interactive examples with different configurations
- Code generation for your custom settings
- Visual preview of all styling options

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

### Basic Props

| Prop           | Type          | Default   | Description                                  |
| -------------- | ------------- | --------- | -------------------------------------------- |
| style          | CSSProperties | {}        | Custom styles for the scrollbar container    |
| children       | ReactNode     | undefined | Content to be displayed inside the scrollbar |
| units          | string        | 'px'      | CSS units to use for measurements            |
| contentHeight  | number        | 300       | Fixed height of the content area             |
| contentPadding | number        | 10        | Padding of the content area                  |

### Behavior Props

| Prop         | Type    | Default | Description                                                      |
| ------------ | ------- | ------- | ---------------------------------------------------------------- |
| keepItBottom | boolean | false   | Whether to keep the scrollbar at the bottom when content changes |

### Track Styling Props

| Prop           | Type   | Default       | Description                                            |
| -------------- | ------ | ------------- | ------------------------------------------------------ |
| barColor       | string | '#87ceeb'     | Background color of the scrollbar track                |
| barHoverColor  | string | undefined     | Background color of the scrollbar track on hover       |
| barWidth       | number | 12            | Width of the scrollbar track                           |
| barRadius      | number | 10            | Border radius of the scrollbar track                   |
| barShadow      | string | 'none'        | CSS shadow for the scrollbar track                     |
| barBorderColor | string | 'transparent' | Border color of the scrollbar track                    |
| barBorderWidth | number | 0             | Border width of the scrollbar track                    |
| barTransition  | number | 0             | Transition duration in seconds for the scrollbar track |

### Thumb Styling Props

| Prop            | Type   | Default              | Description                                                  |
| --------------- | ------ | -------------------- | ------------------------------------------------------------ |
| thumbColor      | string | 'rgba(0, 0, 0, 0.5)' | Background color of the scrollbar thumb                      |
| thumbHoverColor | string | undefined            | Background color of the scrollbar thumb on hover             |
| thumbWidth      | number | undefined            | Width of the scrollbar thumb (defaults to barWidth)          |
| thumbRadius     | number | undefined            | Border radius of the scrollbar thumb (defaults to barRadius) |
| thumbShadow     | string | 'none'               | CSS shadow for the scrollbar thumb                           |
| thumbTransition | number | 0                    | Transition duration in seconds for the scrollbar thumb       |

### Thumb Image Props

| Prop             | Type   | Default | Description                                         |
| ---------------- | ------ | ------- | --------------------------------------------------- |
| thumbImage       | string | null    | URL or path to custom image for the scrollbar thumb |
| thumbImageWidth  | number | 10      | Width of the custom thumb image                     |
| thumbImageHeight | number | 10      | Height of the custom thumb image                    |

### Mask Props

| Prop     | Type    | Default | Description                              |
| -------- | ------- | ------- | ---------------------------------------- |
| mask     | boolean | false   | Enable content masking with fade effects |
| maskSize | number  | 20      | Size of the fade mask in percent         |

### Event Callback Props

| Prop           | Type       | Default   | Description                                              |
| -------------- | ---------- | --------- | -------------------------------------------------------- |
| onScrollTop    | () => void | undefined | Callback function triggered when scrolling to the top    |
| onScrollBottom | () => void | undefined | Callback function triggered when scrolling to the bottom |

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
			barTransition={0.2}
			thumbTransition={0.15}
		>
			{/* Your content here */}
		</Scrollbar>
	)
}
```

### With Smooth Transitions

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
			{/* Content with smooth hover effects */}
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

### With Custom Thumb Image

```tsx
import { Scrollbar } from 'react-ts-scrollbar'

function ImageThumbScrollbar() {
	return (
		<Scrollbar
			style={{ height: '400px' }}
			thumbImage='/path/to/your/thumb-image.png'
			thumbImageWidth={20}
			thumbImageHeight={20}
			barWidth={16}
		>
			{/* Content with custom thumb image */}
		</Scrollbar>
	)
}
```

### With Content Masking

```tsx
import { Scrollbar } from 'react-ts-scrollbar'

function MaskedScrollbar() {
	return (
		<Scrollbar style={{ height: '400px' }} mask={true} maskSize={30}>
			{/* Content with fade effects at scroll boundaries */}
		</Scrollbar>
	)
}
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
