import { Scrollbar } from '../../Scrollbar'
import scrollImage from '../assets/images/scroll-image.png'
import type {
	BarSettings,
	ContentSettings,
	ScrollSettings,
	ThumbSettings,
} from '../types/demoSettings'

type Props = {
	items: number[]
	scrollSettings: ScrollSettings
	contentSettings: ContentSettings
	barSettings: BarSettings
	thumbSettings: ThumbSettings
}

export const Preview = ({
	items,
	scrollSettings,
	contentSettings,
	barSettings,
	thumbSettings,
}: Props) => {
	const isHorizontal = barSettings.type === 'horizontal'
	const sizeAuto = contentSettings.contentSizeAuto
	const contentHeight = isHorizontal
		? 0
		: sizeAuto
			? 'auto'
			: contentSettings.contentHeight
	const contentWidth = !isHorizontal
		? 0
		: sizeAuto
			? 'auto'
			: contentSettings.contentWidth

	if (!items.length) {
		return null
	}

	return (
		<div className='content'>
			<div
				className='content-item'
				style={
					!isHorizontal && sizeAuto
						? { height: contentSettings.contentHeight }
						: undefined
				}
			>
				<Scrollbar
					style={
						isHorizontal
							? { width: '100%' }
							: sizeAuto
								? { height: '100%' }
								: undefined
					}
					type={barSettings.type}
					thumbImage={thumbSettings.withImage ? scrollImage : undefined}
					thumbImageWidth={thumbSettings.imageSize}
					thumbImageHeight={thumbSettings.imageSize}
					barBorderWidth={barSettings.barBorderWidth}
					barBorderColor={barSettings.barBorderColor}
					barTransition={barSettings.barTransition}
					thumbTransition={thumbSettings.thumbTransition}
					contentHeight={contentHeight}
					contentWidth={contentWidth}
					contentPadding={contentSettings.contentPadding}
					mask={contentSettings.isMask}
					maskSize={contentSettings.maskSize}
					barColor={barSettings.barColor}
					thumbColor={thumbSettings.thumbColor}
					barHoverColor={barSettings.barHoverColor}
					thumbHoverColor={thumbSettings.thumbHoverColor}
					barWidth={barSettings.barWidth}
					thumbWidth={thumbSettings.thumbWidth}
					barRadius={barSettings.barRadius}
					thumbRadius={thumbSettings.thumbRadius}
					barPosition={barSettings.barPosition}
					overlay={barSettings.overlay}
					autoHide={barSettings.autoHide}
					autoHideDelay={barSettings.autoHideDelay}
					onScrollStart={() =>
						scrollSettings.isScrollStart && alert('Start reached')
					}
					onScrollEnd={() =>
						scrollSettings.isScrollEnd && alert('End reached')
					}
					keepItEnd={scrollSettings.isKeepEnd}
				>
					<ul
						className='content-item-list'
						style={
							isHorizontal
								? {
										display: 'flex',
										flexDirection: 'row',
										flexWrap: 'nowrap',
										gap: '12px',
										margin: 0,
										padding: 0,
										listStyle: 'none',
										width: 'max-content',
								  }
								: undefined
						}
					>
						{items &&
							items.length > 0 &&
							items.map((item, index) => (
								<li
									key={index}
									className='content-item-list-item'
									style={
										isHorizontal
											? { minWidth: '140px', flexShrink: 0 }
											: undefined
									}
								>
									<span>Item - {item}</span>
								</li>
							))}
					</ul>
				</Scrollbar>
			</div>
		</div>
	)
}
