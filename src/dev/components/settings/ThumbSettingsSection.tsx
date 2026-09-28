import React from 'react'

import { Accordion } from '../ui/Accordion.tsx'
import { ColorPicker } from '../ui/ColorPicker.tsx'
import { Input } from '../ui/Input.tsx'
import type { ThumbSettings } from '../../types/demoSettings'

type Props = {
	value: ThumbSettings
	onChange: React.Dispatch<React.SetStateAction<ThumbSettings>>
	openColorPicker: string | null
	onToggleColorPicker: (id: string) => void
}

export const ThumbSettingsSection = ({
	value,
	onChange,
	openColorPicker,
	onToggleColorPicker,
}: Props) => (
	<Accordion title='Thumb settings' className='actions-column'>
		<div className='actions-item'>
			<ColorPicker
				label='Color'
				value={value.thumbColor}
				onChange={next => onChange(prev => ({ ...prev, thumbColor: next }))}
				id='thumbColor'
				isOpen={openColorPicker === 'thumbColor'}
				onToggle={onToggleColorPicker}
			/>
		</div>

		<div className='actions-item'>
			<ColorPicker
				label='Hover color'
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

		<div className='actions-item'></div>

		<div className='actions-item'></div>

		<div className='actions-column-item'>
			<Input
				label='Width'
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
				label={
					<Input
						type='checkbox'
						checked={value.withImage}
						onChange={next =>
							onChange(prev => ({
								...prev,
								withImage: next as boolean,
							}))
						}
						label='Image'
					/>
				}
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

		<div className='actions-column-item'>
			<Input
				label='Transition'
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
	</Accordion>
)
