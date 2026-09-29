import React from 'react'

import type { ScrollSettings } from '../../types/demoSettings'
import { Accordion } from '../ui/Accordion.tsx'
import { Input } from '../ui/Input.tsx'
import { SettingsGroup } from '../ui/SettingsGroup.tsx'

type Props = {
	value: ScrollSettings
	onChange: React.Dispatch<React.SetStateAction<ScrollSettings>>
	open: boolean
	onOpenChange: (open: boolean) => void
}

export const ScrollSettingsSection = ({
	value,
	onChange,
	open,
	onOpenChange,
}: Props) => (
	<Accordion
		title='Scroll settings'
		className='actions-stack'
		open={open}
		onOpenChange={onOpenChange}
	>
		<SettingsGroup title='Follow'>
			<div className='actions'>
				<div className='actions-item'>
					<Input
						type='checkbox'
						checked={value.isScrollStart}
						onChange={next =>
							onChange(prev => ({
								...prev,
								isScrollStart: next as boolean,
							}))
						}
						label='Follow scroll to start'
					/>
				</div>

				<div className='actions-item'>
					<Input
						type='checkbox'
						checked={value.isScrollEnd}
						onChange={next =>
							onChange(prev => ({
								...prev,
								isScrollEnd: next as boolean,
							}))
						}
						label='Follow scroll to end'
					/>
				</div>

				<div className='actions-item'>
					<Input
						type='checkbox'
						checked={value.isKeepEnd}
						onChange={next =>
							onChange(prev => ({
								...prev,
								isKeepEnd: next as boolean,
							}))
						}
						label='Keep scrollbar at end'
					/>
				</div>
			</div>
		</SettingsGroup>
	</Accordion>
)
