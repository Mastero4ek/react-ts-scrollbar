import React from 'react'

import type { ThumbSettings } from '../../types/demoSettings'
import { Accordion } from '../ui/Accordion.tsx'
import { ColorPicker } from '../ui/ColorPicker.tsx'
import { Input } from '../ui/Input.tsx'
import { SettingsGroup } from '../ui/SettingsGroup.tsx'

type Props = {
	value: ThumbSettings
	onChange: React.Dispatch<React.SetStateAction<ThumbSettings>>
	scrollbarType: 'vertical' | 'horizontal'
	openColorPicker: string | null
	onToggleColorPicker: (id: string) => void
	open: boolean
	onOpenChange: (open: boolean) => void
}

export const ThumbSettingsSection = ({
	value,
	onChange,
	scrollbarType,
	openColorPicker,
	onToggleColorPicker,
	open,
	onOpenChange,
}: Props) => {
	const thicknessLabel = scrollbarType === 'horizontal' ? 'Height' : 'Width'

	return (
	<Accordion
		title='Thumb settings'
		className='actions-stack'
		open={open}
		onOpenChange={onOpenChange}
	>
		<SettingsGroup title='Size'>
			<div className='actions-column'>
				<div className='actions-column-item'>
					<Input
						label={thicknessLabel}
						type='range'
						value={value.thumbWidth}
						onChange={next =>
							onChange(prev => ({
								...prev,
								thumbWidth: next as number,
							}))
						}
					/>
				</div>

				<div className='actions-column-item'>
					<Input
						label='Radius'
						type='range'
						value={value.thumbRadius}
						onChange={next =>
							onChange(prev => ({
								...prev,
								thumbRadius: next as number,
							}))
						}
					/>
				</div>
			</div>
		</SettingsGroup>

		<SettingsGroup title='Colors'>
			<div className='actions-column'>
				<div className='actions-column-item'>
					<ColorPicker
						label='Default'
						value={value.thumbColor}
						onChange={next => onChange(prev => ({ ...prev, thumbColor: next }))}
						id='thumbColor'
						isOpen={openColorPicker === 'thumbColor'}
						onToggle={onToggleColorPicker}
					/>
				</div>

				<div className='actions-column-item'>
					<ColorPicker
						label='Hover'
						value={value.thumbHoverColor}
						onChange={next =>
							onChange(prev => ({
								...prev,
								thumbHoverColor: next,
							}))
						}
						id='thumbHoverColor'
						isOpen={openColorPicker === 'thumbHoverColor'}
						onToggle={onToggleColorPicker}
					/>
				</div>
			</div>
		</SettingsGroup>

		<SettingsGroup title='Image'>
			<div className='actions-column'>
				<div className='actions-column-item'>
					<Input
						label='Size'
						disabled={!value.withImage}
						type='range'
						value={value.imageSize}
						onChange={next =>
							onChange(prev => ({
								...prev,
								imageSize: next as number,
							}))
						}
					/>
				</div>

				<div className='actions-item'>
					<Input
						type='checkbox'
						checked={value.withImage}
						onChange={next =>
							onChange(prev => ({
								...prev,
								withImage: next as boolean,
							}))
						}
						label='Visible'
					/>
				</div>
			</div>
		</SettingsGroup>

		<SettingsGroup title='Transition'>
			<div className='actions-column'>
				<div className='actions-column-item'>
					<Input
						label='Duration'
						max={5}
						step={0.1}
						type='range'
						value={value.thumbTransition}
						onChange={next =>
							onChange(prev => ({
								...prev,
								thumbTransition: next as number,
							}))
						}
					/>
				</div>
			</div>
		</SettingsGroup>
	</Accordion>
	)
}
