import React, { useState } from 'react'

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

type SectionKey = 'scroll' | 'content' | 'bar' | 'thumb'

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

const CLOSED_SECTIONS: Record<SectionKey, boolean> = {
	scroll: false,
	content: false,
	bar: false,
	thumb: false,
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
}: Props) => {
	const [openSections, setOpenSections] =
		useState<Record<SectionKey, boolean>>(CLOSED_SECTIONS)

	const allOpen = Object.values(openSections).every(Boolean)

	const setSectionOpen = (key: SectionKey, open: boolean) => {
		setOpenSections(prev => ({ ...prev, [key]: open }))
	}

	const toggleAll = () => {
		const next = !allOpen
		setOpenSections({
			scroll: next,
			content: next,
			bar: next,
			thumb: next,
		})
	}

	return (
		<div className='settings'>
			<div className='settings-header'>
				<div className='settings-header-title-row'>
					<h1>TypeScript React Scrollbar</h1>

					<button
						type='button'
						className='settings-toggle-all'
						onClick={toggleAll}
					>
						{allOpen ? 'Hide all' : 'Show all'}
					</button>
				</div>

				<p className='units-info'>
					This is demo use 'px' units! If you want to use 'rem' units, you need
					to set the units prop to 'rem'. <br />
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
			</div>

			<hr />

			<ScrollSettingsSection
				value={scrollSettings}
				onChange={setScrollSettings}
				open={openSections.scroll}
				onOpenChange={open => setSectionOpen('scroll', open)}
			/>

			<hr />

			<ContentSettingsSection
				value={contentSettings}
				onChange={setContentSettings}
				scrollbarType={barSettings.type}
				open={openSections.content}
				onOpenChange={open => setSectionOpen('content', open)}
			/>

			<hr />

			<BarSettingsSection
				value={barSettings}
				onChange={next => {
					setBarSettings(prev => {
						const updated = typeof next === 'function' ? next(prev) : next
						if (updated.type !== prev.type) {
							setContentSettings(c => ({
								...c,
								contentSizeAuto: updated.type === 'horizontal',
							}))
						}
						return updated
					})
				}}
				openColorPicker={openColorPicker}
				onToggleColorPicker={id => setOpenColorPicker(id)}
				open={openSections.bar}
				onOpenChange={open => setSectionOpen('bar', open)}
			/>
			<hr />

			<ThumbSettingsSection
				value={thumbSettings}
				onChange={setThumbSettings}
				scrollbarType={barSettings.type}
				openColorPicker={openColorPicker}
				onToggleColorPicker={id => setOpenColorPicker(id)}
				open={openSections.thumb}
				onOpenChange={open => setSectionOpen('thumb', open)}
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
}
