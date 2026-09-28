export const styles = `
.scrollbar_wrapper {
	display: grid;
	height: 100%;
	position: relative;
}
.scrollbar_wrapper--overlay .scrollbar {
	position: absolute;
	top: 0;
	bottom: 0;
	height: 100%;
}
.scrollbar_content {
	-ms-overflow-style: none;
	overflow: auto;
	scrollbar-width: none;
	display: flex;
	flex-direction: column;
}
.scrollbar_content::-webkit-scrollbar {
	display: none;
}
.scrollbar {
	display: grid;
	grid-template: 1fr / 1fr;
	place-items: center;
	height: 100%;
	position: relative;
	z-index: 300;
}
.scrollbar_track_and_thumb {
	display: block;
	height: 100%;
	position: relative;
	min-height: 10%;
}
.scrollbar_track {
	bottom: 0;
	cursor: pointer;
	position: absolute;
	top: 0;
	height: 100%;
}
.scrollbar_track::before {
	content: '';
	display: block;
	position: absolute;
	border-radius: inherit;
	z-index: -1;
	pointer-events: none;
	background: var(--bar-border-color);
	inset: var(--bar-border-width);
}
.scrollbar_track:hover {
	background: var(--bar-hover-color) !important;
}
.scrollbar_thumb {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	max-height: 100%;
	touch-action: none;
}
.scrollbar_thumb:hover {
	background: var(--thumb-hover-color) !important;
}
.scrollbar_thumb_image {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	max-height: 100%;
	z-index: 100;
	touch-action: none;
}
.scrollbar_thumb_image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	pointer-events: none;
}
`

const STYLE_ID = 'react-typescript-scrollbar-styles'
let refCount = 0

export const injectStyles = (): (() => void) => {
	if (typeof document === 'undefined') {
		return () => {}
	}

	refCount += 1

	if (!document.getElementById(STYLE_ID)) {
		const styleElement = document.createElement('style')
		styleElement.id = STYLE_ID
		styleElement.textContent = styles
		document.head.appendChild(styleElement)
	}

	return () => {
		refCount = Math.max(0, refCount - 1)
		if (refCount === 0) {
			document.getElementById(STYLE_ID)?.remove()
		}
	}
}
