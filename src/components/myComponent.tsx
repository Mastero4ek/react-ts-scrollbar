import React from 'react';

type TMyComponentProps = {
	children: React.ReactNode
}

export const MyComponent = ({ children }: TMyComponentProps) => {
	return <div>{children}</div>
}
