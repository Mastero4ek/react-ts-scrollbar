import '../../assets/styles/main.scss'

import React from 'react'

import { Range } from './Range.tsx'

type CheckboxProps = {
	type: 'checkbox'
	checked?: boolean
	onChange: (value: boolean) => void
	label?: string | React.ReactNode
	disabled?: boolean
}

type RangeProps = {
	type: 'range'
	value?: number
	onChange: (value: number) => void
	label?: string | React.ReactNode
	disabled?: boolean
	min?: number
	max?: number
	step?: number
}

type RadioProps = {
	type: 'radio'
	name: string
	checked?: boolean
	value: string
	onChange: (value: string) => void
	label?: string | React.ReactNode
	disabled?: boolean
}

type Props = CheckboxProps | RangeProps | RadioProps

export const Input = (props: Props) => {
	if (props.type === 'checkbox') {
		const { checked, onChange, label, disabled } = props
		return (
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
		)
	}

	if (props.type === 'radio') {
		const { name, checked, value, onChange, label, disabled } = props
		return (
			<label className='checkbox' style={{ opacity: !checked ? 0.5 : 1 }}>
				<input
					disabled={disabled}
					type='radio'
					name={name}
					value={value}
					checked={checked}
					onChange={e => onChange(e.target.value)}
				/>

				<span>{label}</span>

				<div className='checkbox-mark'></div>
			</label>
		)
	}

	const { value, onChange, disabled, label, min, max, step } = props
	return (
		<Range
			value={value || 0}
			onChange={onChange}
			disabled={disabled}
			label={label}
			min={min}
			max={max}
			step={step}
		/>
	)
}
