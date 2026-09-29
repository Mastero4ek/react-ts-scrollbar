export type ScrollSettings = {
	isKeepEnd: boolean
	isScrollEnd: boolean
	isScrollStart: boolean
}

export type ContentSettings = {
	contentHeight: number
	contentWidth: number
	contentSizeAuto: boolean
	contentPadding: number
	isMask: boolean
	maskSize: number
}

export type BarSettings = {
	type: 'vertical' | 'horizontal'
	barWidth: number
	barRadius: number
	barColor: string
	barHoverColor: string
	barBorderWidth: number
	barBorderColor: string
	barTransition: number
	barPosition: 'left' | 'right' | 'top' | 'bottom'
	overlay: boolean
	autoHide: boolean
	autoHideDelay: number
}

export type ThumbSettings = {
	thumbWidth: number
	thumbRadius: number
	thumbColor: string
	thumbHoverColor: string
	thumbTransition: number
	withImage: boolean
	imageSize: number
}

export type DemoSettings = {
	scrollSettings: ScrollSettings
	contentSettings: ContentSettings
	barSettings: BarSettings
	thumbSettings: ThumbSettings
}
