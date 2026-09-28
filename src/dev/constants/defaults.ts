import type {
	BarSettings,
	ContentSettings,
	ScrollSettings,
	ThumbSettings,
} from '../types/demoSettings'

export const INITIAL_SYNTAX = `<Scrollbar
	style={{backgroundColor: '#f5f5f5', padding: '20px'}}
	units='px'
	contentHeight={200}
	contentPadding={30}
	barColor='#e0e0e0'
	barHoverColor='#d0d0d0'
	barWidth={12}
	barRadius={10}
	barBorderWidth={2}
	barBorderColor='#666666'
	thumbColor='#888888'
	thumbHoverColor='#666666'
	thumbWidth={8}
	thumbRadius={4}
>
	<ul>
		{/* your-content-here */}
	</ul>
</Scrollbar>
`

export const DEFAULT_SCROLL_SETTINGS: ScrollSettings = {
	isKeepBottom: false,
	isScrollBottom: false,
	isScrollTop: false,
}

export const DEFAULT_CONTENT_SETTINGS: ContentSettings = {
	contentHeight: 200,
	contentPadding: 30,
	isMask: false,
	maskSize: 50,
}

export const DEFAULT_BAR_SETTINGS: BarSettings = {
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
