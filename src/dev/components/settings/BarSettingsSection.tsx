import React from 'react'

import { Accordion } from '../ui/Accordion.tsx'
import { ColorPicker } from '../ui/ColorPicker.tsx'
import { Input } from '../ui/Input.tsx'
import type { BarSettings } from '../../types/demoSettings'

type Props = {
	value: BarSettings
	onChange: React.Dispatch<React.SetStateAction<BarSettings>>
	openColorPicker: string | null
	onToggleColorPicker: (id: string) => void
}

export const BarSettingsSection = ({
	value,
	onChange,
	openColorPicker,
	onToggleColorPicker,
}: Props) => (
	<Accordion title='Bar settings' className='actions-stack'>
		<div className='actions-column'>
			<div className='actions-item'>
				<Input
					type='checkbox'
					checked={value.overlay}
					onChange={next =>
						onChange(prev => ({
							...prev,
							overlay: next as boolean,
						}))
					}
					label='Overlay mode'
				/>
			</div>
		</div>

		<div className='actions-column'>
			<div className='actions-item'>
				<Input
					type='checkbox'
					checked={value.autoHide}
					onChange={next =>
						onChange(prev => ({
							...prev,
							autoHide: next as boolean,
						}))
					}
					label='Auto hide'
				/>
			</div>

			<div className='actions-column-item'>
				<Input
					label='Auto hide delay'
					disabled={!value.autoHide}
					type='range'
					min={200}
					max={5000}
					step={100}
					value={value.autoHideDelay}
					onChange={next =>
						onChange(prev => ({
							...prev,
							autoHideDelay: next as number,
						}))
					}
				/>
			</div>
		</div>

		<div className='actions-column'>
			<div className='actions-item'>
				<Input
					type='radio'
					name='barPosition'
					value='left'
					checked={value.barPosition === 'left'}
					onChange={() =>
						onChange(prev => ({
							...prev,
							barPosition: 'left',
						}))
					}
					label='Left position'
				/>
			</div>

			<div className='actions-item'>
				<Input
					type='radio'
					name='barPosition'
					value='right'
					checked={value.barPosition === 'right'}
					onChange={() =>
						onChange(prev => ({
							...prev,
							barPosition: 'right',
						}))
					}
					label='Right position'
				/>
			</div>
		</div>

		<div className='actions-column'>
			<div className='actions-column-item'>
				<ColorPicker
					label='Color'
					value={value.barColor}
					onChange={next => onChange(prev => ({ ...prev, barColor: next }))}
					id='barColor'
					isOpen={openColorPicker === 'barColor'}
					onToggle={onToggleColorPicker}
				/>
			</div>

			<div className='actions-column-item'>
				<ColorPicker
					label='Hover color'
					value={value.barHoverColor}
					onChange={next =>
						onChange(prev => ({ ...prev, barHoverColor: next }))
					}
					id='barHoverColor'
					isOpen={openColorPicker === 'barHoverColor'}
					onToggle={onToggleColorPicker}
				/>
			</div>

			<div className='actions-column-item'>
				<ColorPicker
					label='Border color'
					value={value.barBorderColor}
					onChange={next =>
						onChange(prev => ({ ...prev, barBorderColor: next }))
					}
					id='barBorderColor'
					isOpen={openColorPicker === 'barBorderColor'}
					onToggle={onToggleColorPicker}
				/>
			</div>
		</div>

		<div className='actions-column'>
			<div className='actions-column-item'>
				<Input
					label='Width'
					type='range'
					value={value.barWidth}
					onChange={next =>
						onChange(prev => ({
							...prev,
							barWidth: next as number,
						}))
					}
				/>
			</div>

			<div className='actions-column-item'>
				<Input
					label='Border width'
					max={10}
					type='range'
					value={value.barBorderWidth}
					onChange={next =>
						onChange(prev => ({
							...prev,
							barBorderWidth: next as number,
						}))
					}
				/>
			</div>

			<div className='actions-column-item'>
				<Input
					label='Radius'
					type='range'
					value={value.barRadius}
					onChange={next =>
						onChange(prev => ({
							...prev,
							barRadius: next as number,
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
					value={value.barTransition}
					onChange={next =>
						onChange(prev => ({
							...prev,
							barTransition: next as number,
						}))
					}
				/>
			</div>
		</div>
	</Accordion>
)
