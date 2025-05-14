export type ScrollbarProps = {
	children: React.ReactNode
	contentPadding?: number
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
} & React.ComponentPropsWithoutRef<'div'>
