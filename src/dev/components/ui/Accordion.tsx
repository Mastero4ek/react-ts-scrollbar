import '../../assets/styles/main.scss'

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import dropdownArrow from '../../assets/images/dropdown-arrow.png'

export const Accordion = ({
	className,
	children,
	title,
	open,
	onOpenChange,
}: {
	className?: string
	children: React.ReactNode
	title: string
	open?: boolean
	onOpenChange?: (open: boolean) => void
}) => {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
	const isControlled = typeof open === 'boolean' && !!onOpenChange
	const isOpen = isControlled ? open : uncontrolledOpen

	const toggle = () => {
		const next = !isOpen
		if (isControlled) onOpenChange(next)
		else setUncontrolledOpen(next)
	}

	return (
		<div className='actions-wrapper' style={{ gap: isOpen ? '20px' : '0' }}>
			<div className='actions-header' onClick={toggle}>
				<h3>{title}</h3>

				<img
					src={dropdownArrow}
					alt='Open'
					style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
				/>
			</div>

			<motion.div
				className={`actions ${className}`}
				transition={{ type: 'spring', stiffness: 350, damping: 20 }}
				initial={{
					height: '0',
					opacity: 0,
					overflowY: 'hidden',
				}}
				animate={{
					height: isOpen ? 'auto' : '0',
					opacity: isOpen ? 1 : 0,
					overflowY: isOpen ? 'visible' : 'hidden',
				}}
			>
				{children}
			</motion.div>
		</div>
	)
}
