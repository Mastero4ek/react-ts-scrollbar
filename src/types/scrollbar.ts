import React from 'react';

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
} & React.ComponentPropsWithoutRef<'div'>
