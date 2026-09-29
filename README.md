# React TypeScript Scrollbar

A customizable scrollbar component for React applications built with TypeScript. This component provides a modern, flexible, and easy-to-use scrollbar solution with full TypeScript support.

## Features

- 🎨 Highly customizable scrollbar styling
- 📦 TypeScript support with full type definitions
- 🔄 ESM and CommonJS builds
- ⚛️ React 18+ support
- 🚀 Smooth scrolling behavior
- 🖱️ Track click to scroll
- 🎯 Thumb drag to scroll
- 📐 Auto-resize handling
- ↕️ Vertical and horizontal scroll axes
- 🔒 Optional end-edge scroll lock
- 🪟 Overlay mode (track over content, no reserved column)
- 👻 Auto-hide when idle
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
npm install react-typescript-scrollbar
# or
yarn add react-typescript-scrollbar
# or
pnpm add react-typescript-scrollbar
```

## Quick Start

```tsx
import { Scrollbar } from 'react-typescript-scrollbar'

function App() {
	return (
		<Scrollbar style={{ height: '400px' }}>{/* Your content here */}</Scrollbar>
	)
}
```

## Props

### Basic Props

| Prop           | Type               | Default   | Description                                                                  |
| -------------- | ------------------ | --------- | ---------------------------------------------------------------------------- |
| style          | CSSProperties      | {}        | Custom styles for the scrollbar container                                    |
| children       | ReactNode          | undefined | Content to be displayed inside the scrollbar                                 |
| units          | string             | 'px'      | CSS units to use for measurements                                            |
| contentHeight  | `number \| 'auto'` | 300       | Max height (vertical). `'auto'` = fill parent height (parent needs a height) |
| contentWidth   | `number \| 'auto'` | 0         | Max width (horizontal). `0` = no maxWidth; `'auto'` = fill parent width      |
| contentPadding | number             | 10        | Padding of the content area                                                  |

### Behavior Props

| Prop          | Type                                     | Default    | Description                                                                            |
| ------------- | ---------------------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| keepItEnd     | boolean                                  | false      | Stick to the end edge when content changes (bottom if vertical, right if horizontal)   |
| keepItBottom  | boolean                                  | false      | Alias of `keepItEnd` (legacy)                                                          |
| type          | `'vertical' \| 'horizontal'`             | 'vertical' | Scroll axis                                                                            |
| barPosition   | `'left' \| 'right' \| 'top' \| 'bottom'` | 'right'    | Track side (`left`/`right` vertical; `top`/`bottom` horizontal)                        |
| overlay       | boolean                                  | false      | If true, track overlays content (no reserved grid track)                               |
| autoHide      | `boolean \| number`                      | false      | Hide track when idle. Number = delay ms override. Beside: track collapses while hidden |
| autoHideDelay | number                                   | 1500       | Idle delay in ms when `autoHide` is `true`                                             |

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

Edge-triggered: fire once when the content **enters** the start/end edge of the active axis, not on every scroll event while staying at the edge. Re-fires after leaving the edge and reaching it again. Prefer `onScrollStart` / `onScrollEnd`; `onScrollTop` / `onScrollBottom` are legacy aliases (same edges).

| Prop           | Type       | Default   | Description                               |
| -------------- | ---------- | --------- | ----------------------------------------- |
| onScrollStart  | () => void | undefined | Called when scroll reaches the start edge |
| onScrollEnd    | () => void | undefined | Called when scroll reaches the end edge   |
| onScrollTop    | () => void | undefined | Alias of `onScrollStart` (legacy)         |
| onScrollBottom | () => void | undefined | Alias of `onScrollEnd` (legacy)           |

### Imperative API (`ref`)

```tsx
import { useRef } from 'react'
import { Scrollbar, type ScrollbarRef } from 'react-typescript-scrollbar'

function Example() {
	const scrollbarRef = useRef<ScrollbarRef>(null)

	return (
		<>
			<button
				type='button'
				onClick={() => scrollbarRef.current?.scrollToStart()}
			>
				Start
			</button>
			<button
				type='button'
				onClick={() => scrollbarRef.current?.scrollToEnd('smooth')}
			>
				End
			</button>
			<button
				type='button'
				onClick={() =>
					scrollbarRef.current?.scrollTo({ top: 120, behavior: 'smooth' })
				}
			>
				Go to 120px
			</button>
			<Scrollbar ref={scrollbarRef} style={{ height: '400px' }}>
				{/* content */}
			</Scrollbar>
		</>
	)
}
```

| Member           | Type                                  | Description                                  |
| ---------------- | ------------------------------------- | -------------------------------------------- |
| `element`        | `HTMLElement \| null`                 | Scroll viewport DOM node                     |
| `scrollTop`      | `number` (get/set)                    | Current scroll offset                        |
| `scrollHeight`   | `number` (readonly)                   | Content scroll height                        |
| `clientHeight`   | `number` (readonly)                   | Viewport height                              |
| `scrollLeft`     | `number` (get/set)                    | Horizontal scroll offset                     |
| `scrollWidth`    | `number` (readonly)                   | Content scroll width                         |
| `clientWidth`    | `number` (readonly)                   | Viewport width                               |
| `scrollable`     | `boolean` (readonly)                  | Whether content overflows on the active axis |
| `scrollTo`       | `(options?: ScrollToOptions) => void` | Same as element `scrollTo`                   |
| `scrollBy`       | `(options?: ScrollToOptions) => void` | Same as element `scrollBy`                   |
| `scrollToTop`    | `(behavior?: ScrollBehavior) => void` | Scroll to top (vertical DOM)                 |
| `scrollToBottom` | `(behavior?: ScrollBehavior) => void` | Scroll to bottom (vertical DOM)              |
| `scrollToStart`  | `(behavior?: ScrollBehavior) => void` | Scroll to start of active axis               |
| `scrollToEnd`    | `(behavior?: ScrollBehavior) => void` | Scroll to end of active axis                 |

## Advanced Usage

### Custom Styling Example

```tsx
import { Scrollbar } from 'react-typescript-scrollbar'

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
import { Scrollbar } from 'react-typescript-scrollbar'

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

### With End-Edge Lock

```tsx
import { Scrollbar } from 'react-typescript-scrollbar'

function ChatScrollbar() {
	return (
		<Scrollbar keepItEnd={true} style={{ height: '400px' }}>
			{/* Chat messages — stays at end when content grows */}
		</Scrollbar>
	)
}
```

### With Custom Thumb Image

```tsx
import { Scrollbar } from 'react-typescript-scrollbar'

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
import { Scrollbar } from 'react-typescript-scrollbar'

function MaskedScrollbar() {
	return (
		<Scrollbar style={{ height: '400px' }} mask={true} maskSize={30}>
			{/* Content with fade effects at scroll boundaries */}
		</Scrollbar>
	)
}
```

### Overlay + Auto Hide

`overlay` — track over content (no layout shift).  
`autoHide` — works with or without overlay; in beside mode the bar track collapses while hidden.

```tsx
import { Scrollbar } from 'react-typescript-scrollbar'

function OverlayScrollbar() {
	return (
		<Scrollbar
			style={{ height: '400px' }}
			overlay
			autoHide
			autoHideDelay={1500}
		>
			{/* Content */}
		</Scrollbar>
	)
}
```

### Horizontal

```tsx
import { Scrollbar } from 'react-typescript-scrollbar'

function HorizontalScrollbar() {
	return (
		<Scrollbar
			type='horizontal'
			contentWidth={400}
			barPosition='bottom'
			style={{ width: '100%' }}
		>
			<div style={{ display: 'flex', width: 'max-content' }}>
				{/* wide content */}
			</div>
		</Scrollbar>
	)
}
```

### Fill parent (`'auto'`)

Parent must have a defined size on the scroll axis.

```tsx
import { Scrollbar } from 'react-typescript-scrollbar'

function FillParentVertical() {
	return (
		<div style={{ height: 400 }}>
			<Scrollbar contentHeight='auto'>{/* tall content */}</Scrollbar>
		</div>
	)
}

function FillParentHorizontal() {
	return (
		<div style={{ width: '100%' }}>
			<Scrollbar type='horizontal' contentWidth='auto'>
				<div style={{ display: 'flex', width: 'max-content' }}>
					{/* wide content */}
				</div>
			</Scrollbar>
		</div>
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
