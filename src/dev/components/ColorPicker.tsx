import React, {
  useEffect,
  useState,
} from 'react';

import { HexColorPicker } from 'react-colorful';

export const ColorPicker = ({
	value,
	onChange,
	label,
	id,
	isOpen,
	onToggle,
}: {
	value: string
	onChange: (color: string) => void
	label?: string
	id: string
	isOpen: boolean
	onToggle: (id: string) => void
}) => {
	const [tempColor, setTempColor] = useState<string>(value)

	const handleColorChange = (color: string) => {
		setTempColor(color)
		onChange(color)
	}

	const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value

		inputValue = inputValue.replace('#', '')
		inputValue = inputValue.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6)

		const valueWithHash = '#' + inputValue

		setTempColor(valueWithHash)

		if (inputValue.length === 6) {
			onChange(valueWithHash)
		}
	}

	const handleColorInputBlur = () => {
		const hexPart = tempColor.replace('#', '')

		if (hexPart.length < 6) {
			const paddedHex = hexPart.padEnd(6, '0')
			const fullColor = '#' + paddedHex

			setTempColor(fullColor)
			onChange(fullColor)
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element

			if (!target.closest('.color-picker-wrapper')) {
				onToggle('')
			}
		}

		if (isOpen) {
			document.addEventListener('click', handleClickOutside)
		}

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [isOpen, onToggle])

	useEffect(() => {
		setTempColor(value)
	}, [value])

	return (
		<div className='color-picker-wrapper'>
			{label && <label>{label}</label>}

			<div className='color-picker'>
				<div
					className='color-picker-input'
					style={{ backgroundColor: value }}
					onClick={e => {
						e.stopPropagation()
						onToggle(isOpen ? '' : id)
					}}
				/>

				<input
					placeholder='000000'
					type='text'
					value={tempColor}
					maxLength={7}
					onChange={handleColorInputChange}
					onBlur={handleColorInputBlur}
					onKeyDown={e => {
						if (
							!/[0-9A-Fa-f]/.test(e.key) &&
							![
								'Backspace',
								'Delete',
								'Tab',
								'Enter',
								'ArrowLeft',
								'ArrowRight',
							].includes(e.key)
						) {
							e.preventDefault()
						}
					}}
				/>
			</div>

			{isOpen && (
				<div className='color-picker-table' onClick={e => e.stopPropagation()}>
					<HexColorPicker
						color={value}
						onChange={handleColorChange}
						style={{ width: '200px' }}
					/>
				</div>
			)}
		</div>
	)
}
