import React from 'react'

import { Accordion } from '../ui/Accordion.tsx'
import { Input } from '../ui/Input.tsx'
import type { ScrollSettings } from '../../types/demoSettings'

type Props = {
	value: ScrollSettings
	onChange: React.Dispatch<React.SetStateAction<ScrollSettings>>
}

export const ScrollSettingsSection = ({ value, onChange }: Props) => (
	<Accordion title='Scroll settings' open={true}>
		<Input
			type='checkbox'
			checked={value.isScrollTop}
			onChange={next =>
				onChange(prev => ({
					...prev,
					isScrollTop: next as boolean,
				}))
			}
			label='Follow scroll to top'
		/>

		<Input
			type='checkbox'
			checked={value.isScrollBottom}
			onChange={next =>
				onChange(prev => ({
					...prev,
					isScrollBottom: next as boolean,
				}))
			}
			label='Follow scroll to bottom'
		/>

		<Input
			type='checkbox'
			checked={value.isKeepBottom}
			onChange={next =>
				onChange(prev => ({
					...prev,
					isKeepBottom: next as boolean,
				}))
			}
			label='Keep scrollbar at bottom'
		/>
	</Accordion>
)
