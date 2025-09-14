import '../assets/styles/main.scss';

import React from 'react';

import { Range } from './Range.tsx';

export const Input = ({
	type,
	checked,
	value,
	onChange,
	label,
	disabled,
	min,
	max,
	step,
}: {
	type: 'checkbox' | 'range'
	checked?: boolean
	value?: number
	onChange: (value: boolean | number) => void
	label?: string | React.ReactNode
	disabled?: boolean
	min?: number
	max?: number
	step?: number
}) => {
	return type === 'checkbox' ? (
		<label className='checkbox' style={{ opacity: !checked ? 0.5 : 1 }}>
			<input
				disabled={disabled}
				type='checkbox'
				checked={checked}
				onChange={e => onChange(e.target.checked)}
			/>

			<span>{label}</span>

			<div className='checkbox-mark'></div>
		</label>
	) : type === 'range' ? (
		<Range
			value={value || 0}
			onChange={onChange}
			disabled={disabled}
			label={label}
			min={min}
			max={max}
			step={step}
		/>
	) : null
}
