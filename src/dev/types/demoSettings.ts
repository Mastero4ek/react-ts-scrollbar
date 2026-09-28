export type ScrollSettings = {
	isKeepBottom: boolean
	isScrollBottom: boolean
	isScrollTop: boolean
}

export type ContentSettings = {
	contentHeight: number
	contentPadding: number
	isMask: boolean
	maskSize: number
}

export type BarSettings = {
	barWidth: number
	barRadius: number
	barColor: string
	barHoverColor: string
	barBorderWidth: number
	barBorderColor: string
	barTransition: number
	barPosition: 'left' | 'right'
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
