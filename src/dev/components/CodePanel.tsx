import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import copyDoneImage from '../assets/images/copy-done.png'
import copyImage from '../assets/images/copy.png'
import { Spinner } from './ui/Spinner.tsx'

type Props = {
	syntax: string
	isLoading: boolean
	copySuccess: boolean
	onCopy: () => void
}

export const CodePanel = ({
	syntax,
	isLoading,
	copySuccess,
	onCopy,
}: Props) => (
	<div
		className='container'
		style={{ width: '100%', height: isLoading ? '466px' : 'auto' }}
	>
		{isLoading ? (
			<Spinner />
		) : (
			<>
				<SyntaxHighlighter language='tsx' style={solarizedlight}>
					{syntax}
				</SyntaxHighlighter>

				<button
					disabled={copySuccess}
					className='copy-button'
					type='button'
					onClick={onCopy}
				>
					<img
						alt='Copy to clipboard'
						src={copySuccess ? copyDoneImage : copyImage}
					/>
				</button>
			</>
		)}
	</div>
)
