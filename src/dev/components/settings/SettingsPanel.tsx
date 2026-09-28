import React from 'react'

import type {
	BarSettings,
	ContentSettings,
	ScrollSettings,
	ThumbSettings,
} from '../../types/demoSettings'
import { BarSettingsSection } from './BarSettingsSection.tsx'
import { ContentSettingsSection } from './ContentSettingsSection.tsx'
import { DemoActions } from './DemoActions.tsx'
import { ScrollSettingsSection } from './ScrollSettingsSection.tsx'
import { ThumbSettingsSection } from './ThumbSettingsSection.tsx'

type Props = {
	scrollSettings: ScrollSettings
	setScrollSettings: React.Dispatch<React.SetStateAction<ScrollSettings>>
	contentSettings: ContentSettings
	setContentSettings: React.Dispatch<React.SetStateAction<ContentSettings>>
	barSettings: BarSettings
	setBarSettings: React.Dispatch<React.SetStateAction<BarSettings>>
	thumbSettings: ThumbSettings
	setThumbSettings: React.Dispatch<React.SetStateAction<ThumbSettings>>
	openColorPicker: string | null
	setOpenColorPicker: React.Dispatch<React.SetStateAction<string | null>>
	itemsCount: number
	hasChanges: boolean
	onAddItem: () => void
	onRemoveItem: () => void
	onClearItems: () => void
	onResetAll: () => void
}

export const SettingsPanel = ({
	scrollSettings,
	setScrollSettings,
	contentSettings,
	setContentSettings,
	barSettings,
	setBarSettings,
	thumbSettings,
	setThumbSettings,
	openColorPicker,
	setOpenColorPicker,
	itemsCount,
	hasChanges,
	onAddItem,
	onRemoveItem,
	onClearItems,
	onResetAll,
}: Props) => (
	<div className='settings'>
		<h1>TypeScript React Scrollbar</h1>

		<p className='units-info'>
			This is demo use 'px' units! If you want to use 'rem' units, you need to
			set the units prop to 'rem'. <br />
			All props you can find in the{' '}
			<a
				href='https://github.com/Mastero4ek/react-ts-scrollbar/blob/main/README.md'
				target='_blank'
				rel='noopener noreferrer'
			>
				link
			</a>
			.
		</p>

		<hr />

		<ScrollSettingsSection
			value={scrollSettings}
			onChange={setScrollSettings}
		/>

		<hr />

		<ContentSettingsSection
			value={contentSettings}
			onChange={setContentSettings}
		/>

		<hr />

		<BarSettingsSection
			value={barSettings}
			onChange={setBarSettings}
			openColorPicker={openColorPicker}
			onToggleColorPicker={id => setOpenColorPicker(id)}
		/>

		<hr />

		<ThumbSettingsSection
			value={thumbSettings}
			onChange={setThumbSettings}
			openColorPicker={openColorPicker}
			onToggleColorPicker={id => setOpenColorPicker(id)}
		/>

		<hr />

		<DemoActions
			itemsCount={itemsCount}
			hasChanges={hasChanges}
			onAddItem={onAddItem}
			onRemoveItem={onRemoveItem}
			onClearItems={onClearItems}
			onResetAll={onResetAll}
		/>
	</div>
)
