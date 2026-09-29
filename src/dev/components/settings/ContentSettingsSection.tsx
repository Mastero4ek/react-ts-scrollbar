import React from 'react'

import type { BarSettings, ContentSettings } from '../../types/demoSettings'
import { Accordion } from '../ui/Accordion.tsx'
import { Input } from '../ui/Input.tsx'
import { SettingsGroup } from '../ui/SettingsGroup.tsx'

type Props = {
	value: ContentSettings
	onChange: React.Dispatch<React.SetStateAction<ContentSettings>>
	scrollbarType: BarSettings['type']
	open: boolean
	onOpenChange: (open: boolean) => void
}

export const ContentSettingsSection = ({
	value,
	onChange,
	scrollbarType,
	open,
	onOpenChange,
}: Props) => {
	const isHorizontal = scrollbarType === 'horizontal'

	return (
		<Accordion
			title='Content settings'
			className='actions-stack'
			open={open}
			onOpenChange={onOpenChange}
		>
			<SettingsGroup title='Size'>
				<div className='actions-column'>
					<div className='actions-column-item'>
						<Input
							label='Padding'
							type='range'
							value={value.contentPadding}
							onChange={next =>
								onChange(prev => ({
									...prev,
									contentPadding: next as number,
								}))
							}
						/>
					</div>

					<div className='actions-column-item'>
						{isHorizontal ? (
							<Input
								label='Max width'
								type='range'
								disabled={value.contentSizeAuto}
								value={value.contentWidth}
								min={120}
								max={600}
								onChange={next =>
									onChange(prev => ({
										...prev,
										contentWidth: next as number,
									}))
								}
							/>
						) : (
							<Input
								label='Max height'
								type='range'
								disabled={value.contentSizeAuto}
								value={value.contentHeight}
								max={300}
								onChange={next =>
									onChange(prev => ({
										...prev,
										contentHeight: next as number,
									}))
								}
							/>
						)}
					</div>

					<div className='actions-item'>
						<Input
							type='checkbox'
							checked={value.contentSizeAuto}
							onChange={next =>
								onChange(prev => ({
									...prev,
									contentSizeAuto: next as boolean,
								}))
							}
							label={isHorizontal ? 'Auto width' : 'Auto height'}
						/>
					</div>
				</div>
			</SettingsGroup>

			<SettingsGroup title='Mask'>
				<div className='actions-column'>
					<div className='actions-column-item'>
						<Input
							label='Size'
							disabled={!value.isMask}
							type='range'
							value={value.maskSize}
							onChange={next =>
								onChange(prev => ({
									...prev,
									maskSize: next as number,
								}))
							}
						/>
					</div>

					<div className='actions-item'>
						<Input
							type='checkbox'
							checked={value.isMask}
							onChange={next =>
								onChange(prev => ({
									...prev,
									isMask: next as boolean,
								}))
							}
							label='Visible'
						/>
					</div>
				</div>
			</SettingsGroup>
		</Accordion>
	)
}
