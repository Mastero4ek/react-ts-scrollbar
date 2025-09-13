export type ScrollbarProps = {
	style?: React.CSSProperties
	children: React.ReactNode
	units?: string
	barTransition?: number
	thumbTransition?: number
	contentPadding?: number
	contentHeight?: number
	barWidth?: number
	thumbWidth?: number
	barColor?: string
	thumbColor?: string
	barHoverColor?: string
	thumbHoverColor?: string
	barRadius?: number
	thumbRadius?: number
	barShadow?: string
	thumbShadow?: string
	barBorderWidth?: number
	barBorderColor?: string
	thumbImage?: string
	thumbImageWidth?: number
	thumbImageHeight?: number
	keepItBottom?: boolean
	onScrollTop?: () => void
	onScrollBottom?: () => void
} & React.ComponentPropsWithoutRef<'div'>
