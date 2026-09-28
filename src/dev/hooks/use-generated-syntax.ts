import { useEffect, useState } from 'react'

import { INITIAL_SYNTAX } from '../constants/defaults'
import type {
	BarSettings,
	ContentSettings,
	ScrollSettings,
	ThumbSettings,
} from '../types/demoSettings'
import { regenerateSyntax } from '../utils/generateSyntax'

type UseGeneratedSyntaxArgs = {
	items: number[]
	scrollSettings: ScrollSettings
	contentSettings: ContentSettings
	barSettings: BarSettings
	thumbSettings: ThumbSettings
}

export const useGeneratedSyntax = ({
	items,
	scrollSettings,
	contentSettings,
	barSettings,
	thumbSettings,
}: UseGeneratedSyntaxArgs) => {
	const [syntax, setSyntax] = useState<string>(INITIAL_SYNTAX)
	const [copySuccess, setCopySuccess] = useState<boolean>(false)

	useEffect(() => {
		setSyntax(prevSyntax =>
			regenerateSyntax(
				prevSyntax,
				items,
				scrollSettings,
				contentSettings,
				barSettings,
				thumbSettings
			)
		)
	}, [contentSettings, barSettings, thumbSettings, scrollSettings, items])

	const copyToClipboard = () => {
		navigator.clipboard.writeText(syntax)
		setCopySuccess(true)

		setTimeout(() => {
			setCopySuccess(false)
		}, 2000)
	}

	const resetSyntax = () => {
		setSyntax(INITIAL_SYNTAX)
	}

	return {
		syntax,
		copySuccess,
		copyToClipboard,
		resetSyntax,
	}
}
