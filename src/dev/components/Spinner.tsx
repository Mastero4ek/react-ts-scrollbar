import '../assets/styles/main.scss';

import React from 'react';

export const Spinner = (): React.JSX.Element => {
	return (
		<div className={'loading-spinner'}>
			<div className={'spinner'}></div>
		</div>
	)
}
