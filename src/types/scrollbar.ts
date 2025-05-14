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
} & React.ComponentPropsWithoutRef<'div'>
