import type {
	BarSettings,
	ContentSettings,
	ScrollSettings,
	ThumbSettings,
} from '../types/demoSettings'

const PROP_PATTERNS = [
	/\s*contentPadding=\{[^}]*\}/g,
	/\s*barWidth=\{[^}]*\}/g,
	/\s*thumbWidth=\{[^}]*\}/g,
	/\s*barRadius=\{[^}]*\}/g,
	/\s*thumbRadius=\{[^}]*\}/g,
	/\s*barColor=\{[^}]*\}/g,
	/\s*barColor='[^']*'/g,
	/\s*barHoverColor=\{[^}]*\}/g,
	/\s*barHoverColor='[^']*'/g,
	/\s*thumbColor=\{[^}]*\}/g,
	/\s*thumbColor='[^']*'/g,
	/\s*thumbHoverColor=\{[^}]*\}/g,
	/\s*thumbHoverColor='[^']*'/g,
	/\s*keepItBottom=\{[^}]*\}/g,
	/\s*onScrollTop=\{[^}]*\}/g,
	/\s*onScrollBottom=\{[^}]*\}/g,
	/\s*thumbImage=\{[^}]*\}/g,
	/\s*thumbImageWidth=\{[^}]*\}/g,
	/\s*thumbImageHeight=\{[^}]*\}/g,
	/\s*mask=\{[^}]*\}/g,
	/\s*maskSize=\{[^}]*\}/g,
	/\s*contentHeight=\{[^}]*\}/g,
	/\s*barBorderWidth=\{[^}]*\}/g,
	/\s*barBorderColor='[^']*'/g,
	/\s*barTransition=\{[^}]*\}/g,
	/\s*thumbTransition=\{[^}]*\}/g,
	/\s*barPosition='[^']*'/g,
	/\s*overlay=\{[^}]*\}/g,
	/\s*autoHide=\{[^}]*\}/g,
	/\s*autoHideDelay=\{[^}]*\}/g,
]

export const clearExistingProps = (syntax: string): string =>
	PROP_PATTERNS.reduce((result, pattern) => result.replace(pattern, ''), syntax)

const generateListItems = (items: number[]): string => {
	if (items.length === 0) {
		return '\t\t{/* your-content-here */}'
	}

	return items.map(item => `\t\t<li>Item - ${item}</li>`).join('\n')
}

export const updateListContent = (syntax: string, items: number[]): string => {
	const listItems = generateListItems(items)

	return syntax.replace(
		/\t<ul>[\s\S]*?<\/ul>/g,
		`\t<ul>\n${listItems}\n\t</ul>`
	)
}

const generateBasicProps = (
	contentSettings: ContentSettings,
	barSettings: BarSettings,
	thumbSettings: ThumbSettings
): string[] => [
	`\tcontentHeight={${contentSettings.contentHeight}}`,
	`\tcontentPadding={${contentSettings.contentPadding}}`,
	`\tbarWidth={${barSettings.barWidth}}`,
	`\tthumbWidth={${thumbSettings.thumbWidth}}`,
	`\tbarRadius={${barSettings.barRadius}}`,
	`\tthumbRadius={${thumbSettings.thumbRadius}}`,
	`\tbarColor='${barSettings.barColor}'`,
	`\tbarHoverColor='${barSettings.barHoverColor}'`,
	`\tthumbColor='${thumbSettings.thumbColor}'`,
	`\tthumbHoverColor='${thumbSettings.thumbHoverColor}'`,
	`\tbarBorderWidth={${barSettings.barBorderWidth}}`,
	`\tbarBorderColor='${barSettings.barBorderColor}'`,
]

const generateConditionalProps = (
	scrollSettings: ScrollSettings,
	contentSettings: ContentSettings,
	barSettings: BarSettings,
	thumbSettings: ThumbSettings
): string[] => {
	const props: string[] = []

	const transitionProps = [
		{
			condition: barSettings.barTransition > 0,
			prop: `\tbarTransition={${barSettings.barTransition.toFixed(1)}}`,
		},
		{
			condition: thumbSettings.thumbTransition > 0,
			prop: `\tthumbTransition={${thumbSettings.thumbTransition.toFixed(1)}}`,
		},
	]

	const scrollProps = [
		{ condition: scrollSettings.isKeepBottom, prop: '\tkeepItBottom={true}' },
		{
			condition: scrollSettings.isScrollTop,
			prop: "\tonScrollTop={() => alert('Top reached')}",
		},
		{
			condition: scrollSettings.isScrollBottom,
			prop: "\tonScrollBottom={() => alert('Bottom reached')}",
		},
		{
			condition: barSettings.overlay,
			prop: '\toverlay={true}',
		},
		{
			condition: barSettings.autoHide,
			prop: '\tautoHide={true}',
		},
		{
			condition: barSettings.autoHide,
			prop: `\tautoHideDelay={${barSettings.autoHideDelay}}`,
		},
	]

	const imageProps = [
		{
			condition: thumbSettings.withImage,
			prop: "\tthumbImage={'./your/image/path'}",
		},
		{
			condition: thumbSettings.withImage,
			prop: `\tthumbImageWidth={${thumbSettings.imageSize}}`,
		},
		{
			condition: thumbSettings.withImage,
			prop: `\tthumbImageHeight={${thumbSettings.imageSize}}`,
		},
	]

	const maskProps = [
		{ condition: contentSettings.isMask, prop: '\tmask={true}' },
		{
			condition: contentSettings.isMask,
			prop: `\tmaskSize={${contentSettings.maskSize}}`,
		},
	]

	const positionProps = [
		{
			condition: true,
			prop: `\tbarPosition='${barSettings.barPosition}'`,
		},
	]

	const allProps = [
		...transitionProps,
		...scrollProps,
		...imageProps,
		...maskProps,
		...positionProps,
	]

	for (const { condition, prop } of allProps) {
		if (condition) {
			props.push(prop)
		}
	}

	return props
}

export const insertProps = (
	syntax: string,
	scrollSettings: ScrollSettings,
	contentSettings: ContentSettings,
	barSettings: BarSettings,
	thumbSettings: ThumbSettings
): string => {
	const allProps = [
		...generateBasicProps(contentSettings, barSettings, thumbSettings),
		...generateConditionalProps(
			scrollSettings,
			contentSettings,
			barSettings,
			thumbSettings
		),
	]

	if (allProps.length > 0) {
		return syntax.replace('>', `${allProps.join('\n')}\n>`)
	}

	return syntax
}

export const regenerateSyntax = (
	prevSyntax: string,
	items: number[],
	scrollSettings: ScrollSettings,
	contentSettings: ContentSettings,
	barSettings: BarSettings,
	thumbSettings: ThumbSettings
): string => {
	let next = clearExistingProps(prevSyntax)
	next = updateListContent(next, items)
	next = insertProps(
		next,
		scrollSettings,
		contentSettings,
		barSettings,
		thumbSettings
	)
	return next
}
