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
}: Props) => (
	<div className='content'>
		<div className='content-item'>
			<Scrollbar
				style={{
					backgroundColor: '#f5f5f5',
					borderRadius: '10px',
					padding: '20px',
					border: '2px solid #ddd',
				}}
				thumbImage={thumbSettings.withImage ? scrollImage : undefined}
				thumbImageWidth={thumbSettings.imageSize}
				thumbImageHeight={thumbSettings.imageSize}
				barBorderWidth={barSettings.barBorderWidth}
				barBorderColor={barSettings.barBorderColor}
				barTransition={barSettings.barTransition}
				thumbTransition={thumbSettings.thumbTransition}
				contentHeight={contentSettings.contentHeight}
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
				onScrollTop={() => scrollSettings.isScrollTop && alert('Top reached')}
				onScrollBottom={() =>
					scrollSettings.isScrollBottom && alert('Bottom reached')
				}
				keepItBottom={scrollSettings.isKeepBottom}
			>
				<ul className='content-item-list'>
					{items &&
						items.length > 0 &&
						items.map((item, index) => (
							<li key={index} className='content-item-list-item'>
								<span>Item - {item}</span>
							</li>
						))}
				</ul>
			</Scrollbar>
		</div>
	</div>
)
