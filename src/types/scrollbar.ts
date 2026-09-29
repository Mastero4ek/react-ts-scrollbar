import React from 'react'

export type ScrollbarType = 'vertical' | 'horizontal'

export type ScrollbarRef = {
	readonly element: HTMLElement | null

	get scrollTop(): number
	set scrollTop(value: number)

	readonly scrollHeight: number
	readonly clientHeight: number

	get scrollLeft(): number
	set scrollLeft(value: number)

	readonly scrollWidth: number
	readonly clientWidth: number
	readonly scrollable: boolean

	scrollTo(options?: ScrollToOptions): void
	scrollBy(options?: ScrollToOptions): void
	scrollToTop(behavior?: ScrollBehavior): void
	scrollToBottom(behavior?: ScrollBehavior): void
	scrollToStart(behavior?: ScrollBehavior): void
	scrollToEnd(behavior?: ScrollBehavior): void
}

export type ScrollbarProps = {
	style?: React.CSSProperties
	children: React.ReactNode
	units?: string
	contentHeight?: number | 'auto'
	contentWidth?: number | 'auto'
	contentPadding?: number
	/** @deprecated Prefer `keepItEnd`. Stick to end edge when content changes. */
	keepItBottom?: boolean
	keepItEnd?: boolean
	type?: ScrollbarType
	overlay?: boolean
	autoHide?: boolean | number
	autoHideDelay?: number
	barPosition?: 'left' | 'right' | 'top' | 'bottom'
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
	/** @deprecated Prefer `onScrollStart`. */
	onScrollTop?: () => void
	/** @deprecated Prefer `onScrollEnd`. */
	onScrollBottom?: () => void
	onScrollStart?: () => void
	onScrollEnd?: () => void
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>
