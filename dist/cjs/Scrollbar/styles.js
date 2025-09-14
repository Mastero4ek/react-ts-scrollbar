"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectStyles = exports.styles = void 0;
exports.styles = `
.scrollbar_wrapper {
	display: grid;
	height: 100%;
	position: relative;
}

.scrollbar_content {
	-ms-overflow-style: none;
	overflow: auto;
	scrollbar-width: none;
	height: 100%;
	max-height: 100%;
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
	opacity: 0;
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
}

.scrollbar_thumb:hover {
	background: var(--thumb-hover-color) !important;
}

.scrollbar_thumb_image{
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	max-height: 100%;
	z-index: 100;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
`;
// Function to inject styles into the document
const injectStyles = () => {
    if (typeof document !== 'undefined') {
        const styleElement = document.createElement('style');
        styleElement.textContent = exports.styles;
        document.head.appendChild(styleElement);
    }
};
exports.injectStyles = injectStyles;
