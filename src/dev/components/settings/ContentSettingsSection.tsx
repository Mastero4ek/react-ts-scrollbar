import React from 'react'

import { Accordion } from '../ui/Accordion.tsx'
import { Input } from '../ui/Input.tsx'
import type { ContentSettings } from '../../types/demoSettings'

type Props = {
	value: ContentSettings
	onChange: React.Dispatch<React.SetStateAction<ContentSettings>>
}

export const ContentSettingsSection = ({ value, onChange }: Props) => (
	<Accordion title='Content settings'>
		<div className='actions-column-item'>
			<Input
				label='Max Height'
				type='range'
				value={value.contentHeight}
				max={300}
				onChange={next =>
					onChange(prev => ({
						...prev,
						contentHeight: next as number,
					}))
				}
			/>
		</div>

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
			<Input
				label={
					<Input
						label='Mask'
						type='checkbox'
						checked={value.isMask}
						onChange={next =>
							onChange(prev => ({
								...prev,
								isMask: next as boolean,
							}))
						}
					/>
				}
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
	</Accordion>
)
