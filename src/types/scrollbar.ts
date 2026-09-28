import React from 'react'

export type ScrollbarRef = {
	readonly element: HTMLElement | null

	get scrollTop(): number
	set scrollTop(value: number)

	readonly scrollHeight: number
	readonly clientHeight: number
	readonly scrollable: boolean

	scrollTo(options?: ScrollToOptions): void
	scrollBy(options?: ScrollToOptions): void
	scrollToTop(behavior?: ScrollBehavior): void
	scrollToBottom(behavior?: ScrollBehavior): void
}

export type ScrollbarProps = {
	style?: React.CSSProperties
	children: React.ReactNode
	units?: string
	contentHeight?: number
	contentPadding?: number

	keepItBottom?: boolean

	barPosition?: 'left' | 'right'

	barColor?: string
	barHoverColor?: string
	barWidth?: number
	barRadius?: number
	barShadow?: string
	barBorderColor?: string
	barBorderWidth?: number
	barTransition?: number

	thumbColor?: string
	thumbHoverColor?: string
	thumbWidth?: number
	thumbRadius?: number
	thumbShadow?: string
	thumbTransition?: number

	thumbImage?: string
	thumbImageWidth?: number
	thumbImageHeight?: number

	mask?: boolean
	maskSize?: number

	onScrollTop?: () => void
	onScrollBottom?: () => void
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>
