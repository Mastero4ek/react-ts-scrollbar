import '../assets/styles/main.scss';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

export const Range = ({
	value,
	onChange,
	disabled,
	label,
	min = 0,
	max = 100,
	step = 1,
}: {
	value: number
	onChange: (value: number) => void
	disabled?: boolean
	label?: string | React.ReactNode
	min?: number
	max?: number
	step?: number
}) => {
	const rangeRef = useRef<HTMLDivElement>(null)
	const thumbRef = useRef<HTMLDivElement>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [thumbPosition, setThumbPosition] = useState(0)
	const [tempInputValue, setTempInputValue] = useState<string>('')

	const handleTextInputChange = (inputValue: string) => {
		if (inputValue === '') {
			setTempInputValue('')
			return
		}

		const hasDecimalStep = step < 1 && step.toString().includes('.')
		const numberRegex = hasDecimalStep ? /^\d*\.?\d*$/ : /^\d+$/

		if (!numberRegex.test(inputValue)) {
			return
		}

		if ((inputValue.match(/\./g) || []).length > 1) {
			return
		}

		if (
			inputValue.endsWith('.') ||
			(hasDecimalStep &&
				inputValue.includes('.') &&
				!inputValue.match(/\.\d+$/))
		) {
			setTempInputValue(inputValue)
			return
		}

		if (hasDecimalStep) {
			setTempInputValue(inputValue)
			return
		}

		setTempInputValue(inputValue)

		if (inputValue && !isNaN(Number(inputValue))) {
			const numValue = Number(inputValue)
			const constrainedValue = Math.max(min, Math.min(max, numValue))

			onChange(constrainedValue)
		}
	}

	const handleBlur = () => {
		if (tempInputValue !== undefined) {
			const hasDecimalStep = step < 1 && step.toString().includes('.')
			const numValue = tempInputValue === '' ? 0 : Number(tempInputValue)
			const constrainedValue = Math.max(min, Math.min(max, numValue))
			const finalValue = hasDecimalStep
				? Math.round(constrainedValue * 10) / 10
				: constrainedValue

			onChange(finalValue)
			setTempInputValue('')
		}
	}

	const calculateThumbPosition = (val: number) => {
		if (!rangeRef.current || !thumbRef.current) return 0

		const percentage = ((val - min) / (max - min)) * 100
		const rangeRect = rangeRef.current.getBoundingClientRect()
		const thumbRect = thumbRef.current.getBoundingClientRect()
		const thumbHalfWidthPercent = (thumbRect.width / 2 / rangeRect.width) * 100
		const minPosition = thumbHalfWidthPercent
		const maxPosition = 100 - thumbHalfWidthPercent

		return Math.max(minPosition, Math.min(maxPosition, percentage))
	}

	const getValueFromPosition = (clientX: number) => {
		if (!rangeRef.current || !thumbRef.current) return value

		const rangeRect = rangeRef.current.getBoundingClientRect()
		const thumbRect = thumbRef.current.getBoundingClientRect()
		const thumbHalfWidth = thumbRect.width / 2
		const adjustedLeft = rangeRect.left + thumbHalfWidth
		const adjustedWidth = rangeRect.width - thumbHalfWidth * 2
		const percentage = Math.max(
			0,
			Math.min(1, (clientX - adjustedLeft) / adjustedWidth)
		)
		const newValue = min + percentage * (max - min)

		return Math.round(newValue / step) * step
	}

	const handleMouseDown = (e: React.MouseEvent) => {
		if (disabled) return

		e.preventDefault()
		setIsDragging(true)

		const newValue = getValueFromPosition(e.clientX)
		onChange(newValue)
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging || disabled) return

		const newValue = getValueFromPosition(e.clientX)
		onChange(newValue)
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	const handleBarClick = (e: React.MouseEvent) => {
		if (disabled) return

		const newValue = getValueFromPosition(e.clientX)
		onChange(newValue)
	}

	useEffect(() => {
		setThumbPosition(calculateThumbPosition(value))
	}, [value])

	useEffect(() => {
		const handleResize = () => {
			setThumbPosition(calculateThumbPosition(value))
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [value])

	useEffect(() => {
		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)

			return () => {
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
			}
		}
	}, [isDragging, disabled])

	return (
		<div className='range'>
			<div className='range-label'>
				<span>{label}</span>

				<input
					onChange={e => handleTextInputChange(e.target.value)}
					onBlur={handleBlur}
					disabled={disabled}
					type='text'
					value={
						tempInputValue ||
						(step < 1 && step.toString().includes('.')
							? value.toFixed(1)
							: value)
					}
				/>
			</div>

			<input
				disabled={disabled}
				type='range'
				id='padding-size'
				value={value}
				onChange={e => onChange(Number(e.target.value) || 0)}
				min={min}
				max={max}
				step={step}
			/>

			<div
				style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
				className='range-wrapper'
				ref={rangeRef}
				onMouseDown={handleMouseDown}
			>
				<div
					style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
					className='range-bar'
					onClick={handleBarClick}
				></div>

				<div
					className='range-thumb'
					ref={thumbRef}
					style={{
						left: `${thumbPosition}%`,
						transform: 'translateX(-50%) translateY(-50%)',
						cursor: disabled ? 'not-allowed' : isDragging ? 'grabbing' : 'grab',
						opacity: 0.5,
					}}
				></div>
			</div>
		</div>
	)
}
