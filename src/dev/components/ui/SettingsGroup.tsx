import React from 'react'

type Props = {
	title: string
	children: React.ReactNode
	className?: string
}

export const SettingsGroup = ({ title, children, className }: Props) => (
	<div className={['actions-group', className].filter(Boolean).join(' ')}>
		<h4 className='actions-group-title'>{title}</h4>
		{children}
	</div>
)

