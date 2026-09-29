import React from 'react'

import type { BarSettings } from '../../types/demoSettings'
import { Accordion } from '../ui/Accordion.tsx'
import { ColorPicker } from '../ui/ColorPicker.tsx'
import { Input } from '../ui/Input.tsx'
import { SettingsGroup } from '../ui/SettingsGroup.tsx'

type Props = {
	value: BarSettings
	onChange: React.Dispatch<React.SetStateAction<BarSettings>>
	openColorPicker: string | null
	onToggleColorPicker: (id: string) => void
	open: boolean
	onOpenChange: (open: boolean) => void
}

export const BarSettingsSection = ({
	value,
	onChange,
	openColorPicker,
	onToggleColorPicker,
	open,
	onOpenChange,
}: Props) => {
	const thicknessLabel = value.type === 'horizontal' ? 'Height' : 'Width'

	return (
	<Accordion
		title='Bar settings'
		className='actions-stack'
		open={open}
		onOpenChange={onOpenChange}
	>
		<SettingsGroup title='Overlay'>
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
						label='Enabled'
					/>
				</div>
			</div>
		</SettingsGroup>

		<SettingsGroup title='Orientation'>
			<div className='actions-column actions-column--keep'>
				<div className='actions-item'>
					<Input
						type='radio'
						name='scrollbarType'
						value='vertical'
						checked={value.type === 'vertical'}
						onChange={() =>
							onChange(prev => ({
								...prev,
								type: 'vertical',
								barPosition:
									prev.barPosition === 'top' || prev.barPosition === 'bottom'
										? 'right'
										: prev.barPosition,
							}))
						}
						label='Vertical'
					/>
				</div>

				<div className='actions-item'>
					<Input
						type='radio'
						name='scrollbarType'
						value='horizontal'
						checked={value.type === 'horizontal'}
						onChange={() =>
							onChange(prev => ({
								...prev,
								type: 'horizontal',
								barPosition:
									prev.barPosition === 'left' || prev.barPosition === 'right'
										? 'bottom'
										: prev.barPosition,
							}))
						}
						label='Horizontal'
					/>
				</div>
			</div>

			<div className='actions-column actions-column--keep'>
				{value.type === 'vertical' ? (
					<>
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
								label='Left'
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
								label='Right'
							/>
						</div>
					</>
				) : (
					<>
						<div className='actions-item'>
							<Input
								type='radio'
								name='barPosition'
								value='top'
								checked={value.barPosition === 'top'}
								onChange={() =>
									onChange(prev => ({
										...prev,
										barPosition: 'top',
									}))
								}
								label='Top'
							/>
						</div>

						<div className='actions-item'>
							<Input
								type='radio'
								name='barPosition'
								value='bottom'
								checked={value.barPosition === 'bottom'}
								onChange={() =>
									onChange(prev => ({
										...prev,
										barPosition: 'bottom',
									}))
								}
								label='Bottom'
							/>
						</div>
					</>
				)}
			</div>
		</SettingsGroup>

		<SettingsGroup title='Size'>
			<div className='actions-column'>
				<div className='actions-column-item'>
					<Input
						label={thicknessLabel}
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
						label='Border'
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
			</div>
		</SettingsGroup>

		<SettingsGroup title='Colors'>
			<div className='actions-column'>
				<div className='actions-column-item'>
					<ColorPicker
						label='Default'
						value={value.barColor}
						onChange={next => onChange(prev => ({ ...prev, barColor: next }))}
						id='barColor'
						isOpen={openColorPicker === 'barColor'}
						onToggle={onToggleColorPicker}
					/>
				</div>

				<div className='actions-column-item'>
					<ColorPicker
						label='Hover'
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
						label='Border'
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
		</SettingsGroup>

		<SettingsGroup title='Auto hide'>
			<div className='actions-column'>
				<div className='actions-column-item'>
					<Input
						label='Delay'
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
						label='Enabled'
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
		</SettingsGroup>
	</Accordion>
	)
}
