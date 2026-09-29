import type {
	BarSettings,
	ContentSettings,
	ScrollSettings,
	ThumbSettings,
} from '../types/demoSettings'

export const INITIAL_SYNTAX = `<Scrollbar>
	<ul>
		{/* your-content-here */}
	</ul>
</Scrollbar>
`

export const DEFAULT_SCROLL_SETTINGS: ScrollSettings = {
	isKeepEnd: false,
	isScrollEnd: false,
	isScrollStart: false,
}

export const DEFAULT_CONTENT_SETTINGS: ContentSettings = {
	contentHeight: 200,
	contentWidth: 320,
	contentSizeAuto: false,
	contentPadding: 30,
	isMask: false,
	maskSize: 50,
}

export const DEFAULT_BAR_SETTINGS: BarSettings = {
	type: 'vertical',
	barWidth: 12,
	barRadius: 10,
	barColor: '#e0e0e0',
	barHoverColor: '#d0d0d0',
	barBorderWidth: 2,
	barBorderColor: '#666666',
	barTransition: 0,
	barPosition: 'right',
	overlay: false,
	autoHide: false,
	autoHideDelay: 1500,
}

export const DEFAULT_THUMB_SETTINGS: ThumbSettings = {
	thumbWidth: 8,
	thumbRadius: 4,
	thumbColor: '#888888',
	thumbHoverColor: '#666666',
	thumbTransition: 0,
	withImage: false,
	imageSize: 50,
}
