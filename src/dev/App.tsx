import './assets/styles/main.scss'

import React, { useCallback, useEffect, useState } from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { Scrollbar } from '../Scrollbar'
import copyDoneImage from './assets/images/copy-done.png'
import copyImage from './assets/images/copy.png'
import scrollImage from './assets/images/scroll-image.png'
import { Accordion } from './components/Accordion.tsx'
import { ColorPicker } from './components/ColorPicker.tsx'
import { Input } from './components/Input.tsx'
import { Spinner } from './components/Spinner.tsx'

const SyntaxHighlighterComponent = SyntaxHighlighter as any

const App = () => {
	const syntaxText = `<Scrollbar
	style={{backgroundColor: '#f5f5f5', padding: '20px'}}
	units='px'
	contentHeight={200}
	contentPadding={30}
	barColor='#e0e0e0'
	barHoverColor='#d0d0d0'
	barWidth={12}
	barRadius={10}
	barBorderWidth={2}
	barBorderColor='#666666'
	thumbColor='#888888'
	thumbHoverColor='#666666'
	thumbWidth={8}
	thumbRadius={4}
>
	<ul>
		{/* your-content-here */}
	</ul>
</Scrollbar>
`

	const [items, setItems] = useState<number[]>([])
	const [syntax, setSyntax] = useState<string>(syntaxText)

	const [copySuccess, setCopySuccess] = useState<boolean>(false)
	const [openColorPicker, setOpenColorPicker] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const [scrollSettings, setScrollSettings] = useState({
		isKeepBottom: false,
		isScrollBottom: false,
		isScrollTop: false,
	})

	const [contentSettings, setContentSettings] = useState({
		contentHeight: 200,
		contentPadding: 30,
		isMask: false,
		maskSize: 50,
	})

	const [barSettings, setBarSettings] = useState({
		barWidth: 12,
		barRadius: 10,
		barColor: '#e0e0e0',
		barHoverColor: '#d0d0d0',
		barBorderWidth: 2,
		barBorderColor: '#666666',
		barTransition: 0,
		barPosition: 'right',
	})

	const [thumbSettings, setThumbSettings] = useState({
		thumbWidth: 8,
		thumbRadius: 4,
		thumbColor: '#888888',
		thumbHoverColor: '#666666',
		thumbTransition: 0,
		withImage: false,
		imageSize: 50,
	})

	const hasChanges = useCallback(() => {
		const defaultValues = {
			scrollSettings: {
				isKeepBottom: false,
				isScrollBottom: false,
				isScrollTop: false,
			},
			contentSettings: {
				contentHeight: 200,
				contentPadding: 30,
				isMask: false,
				maskSize: 50,
			},
			barSettings: {
				barWidth: 12,
				barRadius: 10,
				barColor: '#e0e0e0',
				barHoverColor: '#d0d0d0',
				barBorderWidth: 2,
				barBorderColor: '#666666',
				barTransition: 0,
				barPosition: 'right',
			},
			thumbSettings: {
				thumbWidth: 8,
				thumbRadius: 4,
				thumbColor: '#888888',
				thumbHoverColor: '#666666',
				thumbTransition: 0,
				withImage: false,
				imageSize: 50,
			},
		}

		const hasItems = items.length > 0
		const hasScrollChanges =
			JSON.stringify(scrollSettings) !==
			JSON.stringify(defaultValues.scrollSettings)
		const hasContentChanges =
			JSON.stringify(contentSettings) !==
			JSON.stringify(defaultValues.contentSettings)
		const hasBarChanges =
			JSON.stringify(barSettings) !== JSON.stringify(defaultValues.barSettings)
		const hasThumbChanges =
			JSON.stringify(thumbSettings) !==
			JSON.stringify(defaultValues.thumbSettings)

		return (
			hasItems ||
			hasScrollChanges ||
			hasContentChanges ||
			hasBarChanges ||
			hasThumbChanges
		)
	}, [items, scrollSettings, contentSettings, barSettings, thumbSettings])

	const resetAll = useCallback(() => {
		if (!hasChanges()) {
			return
		}

		fakeLoading()

		setItems([])
		setScrollSettings({
			isKeepBottom: false,
			isScrollBottom: false,
			isScrollTop: false,
		})
		setContentSettings({
			contentHeight: 200,
			contentPadding: 30,
			isMask: false,
			maskSize: 50,
		})
		setBarSettings({
			barWidth: 12,
			barRadius: 10,
			barColor: '#e0e0e0',
			barHoverColor: '#d0d0d0',
			barBorderWidth: 2,
			barBorderColor: '#666666',
			barTransition: 0,
			barPosition: 'right',
		})
		setThumbSettings({
			thumbWidth: 8,
			thumbRadius: 4,
			thumbColor: '#888888',
			thumbHoverColor: '#666666',
			thumbTransition: 0,
			withImage: false,
			imageSize: 50,
		})
		setOpenColorPicker(null)
		setSyntax(syntaxText)
	}, [hasChanges])

	const generateListItems = () => {
		if (items.length === 0) {
			return '\t\t{/* your-content-here */}'
		}

		return items.map(item => `\t\t<li>Item - ${item}</li>`).join('\n')
	}

	const copyToClipboard = () => {
		navigator.clipboard.writeText(syntax)
		setCopySuccess(true)

		setTimeout(() => {
			setCopySuccess(false)
		}, 2000)
	}

	const clearExistingProps = (syntax: string): string => {
		const propPatterns = [
			/\s*contentPadding=\{[^}]*\}/g,
			/\s*barWidth=\{[^}]*\}/g,
			/\s*thumbWidth=\{[^}]*\}/g,
			/\s*barRadius=\{[^}]*\}/g,
			/\s*thumbRadius=\{[^}]*\}/g,
			/\s*barColor=\{[^}]*\}/g,
			/\s*barColor='[^']*'/g,
			/\s*barHoverColor=\{[^}]*\}/g,
			/\s*barHoverColor='[^']*'/g,
			/\s*thumbColor=\{[^}]*\}/g,
			/\s*thumbColor='[^']*'/g,
			/\s*thumbHoverColor=\{[^}]*\}/g,
			/\s*thumbHoverColor='[^']*'/g,
			/\s*keepItBottom=\{[^}]*\}/g,
			/\s*onScrollTop=\{[^}]*\}/g,
			/\s*onScrollBottom=\{[^}]*\}/g,
			/\s*thumbImage=\{[^}]*\}/g,
			/\s*thumbImageWidth=\{[^}]*\}/g,
			/\s*thumbImageHeight=\{[^}]*\}/g,
			/\s*mask=\{[^}]*\}/g,
			/\s*maskSize=\{[^}]*\}/g,
			/\s*contentHeight=\{[^}]*\}/g,
			/\s*barBorderWidth=\{[^}]*\}/g,
			/\s*barBorderColor='[^']*'/g,
			/\s*barTransition=\{[^}]*\}/g,
			/\s*thumbTransition=\{[^}]*\}/g,
			/\s*barPosition='[^']*'/g,
		]

		return propPatterns.reduce(
			(syntax, pattern) => syntax.replace(pattern, ''),
			syntax
		)
	}

	const updateListContent = (syntax: string): string => {
		const listItems = generateListItems()

		return syntax.replace(
			/\t<ul>[\s\S]*?<\/ul>/g,
			`\t<ul>\n${listItems}\n\t</ul>`
		)
	}

	const generateBasicProps = (): string[] => [
		`\tcontentHeight={${contentSettings.contentHeight}}`,
		`\tcontentPadding={${contentSettings.contentPadding}}`,
		`\tbarWidth={${barSettings.barWidth}}`,
		`\tthumbWidth={${thumbSettings.thumbWidth}}`,
		`\tbarRadius={${barSettings.barRadius}}`,
		`\tthumbRadius={${thumbSettings.thumbRadius}}`,
		`\tbarColor='${barSettings.barColor}'`,
		`\tbarHoverColor='${barSettings.barHoverColor}'`,
		`\tthumbColor='${thumbSettings.thumbColor}'`,
		`\tthumbHoverColor='${thumbSettings.thumbHoverColor}'`,
		`\tbarBorderWidth={${barSettings.barBorderWidth}}`,
		`\tbarBorderColor='${barSettings.barBorderColor}'`,
	]

	const generateConditionalProps = (): string[] => {
		const props: string[] = []

		const transitionProps = [
			{
				condition: barSettings.barTransition > 0,
				prop: `\tbarTransition={${barSettings.barTransition.toFixed(1)}}`,
			},
			{
				condition: thumbSettings.thumbTransition > 0,
				prop: `\tthumbTransition={${thumbSettings.thumbTransition.toFixed(1)}}`,
			},
		]

		const scrollProps = [
			{ condition: scrollSettings.isKeepBottom, prop: '\tkeepItBottom={true}' },
			{
				condition: scrollSettings.isScrollTop,
				prop: "\tonScrollTop={() => alert('Top reached')}",
			},
			{
				condition: scrollSettings.isScrollBottom,
				prop: "\tonScrollBottom={() => alert('Bottom reached')}",
			},
		]

		const imageProps = [
			{
				condition: thumbSettings.withImage,
				prop: "\tthumbImage={'./your/image/path'}",
			},
			{
				condition: thumbSettings.withImage,
				prop: `\tthumbImageWidth={${thumbSettings.imageSize}}`,
			},
			{
				condition: thumbSettings.withImage,
				prop: `\tthumbImageHeight={${thumbSettings.imageSize}}`,
			},
		]

		const maskProps = [
			{ condition: contentSettings.isMask, prop: '\tmask={true}' },
			{
				condition: contentSettings.isMask,
				prop: `\tmaskSize={${contentSettings.maskSize}}`,
			},
		]

		const positionProps = [
			{
				condition: barSettings.barPosition === 'right',
				prop: `\tbarPosition='right'`,
			},
		]

		const allProps = [
			...transitionProps,
			...scrollProps,
			...imageProps,
			...maskProps,
			...positionProps,
		]

		for (const { condition, prop } of allProps) {
			if (condition) {
				props.push(prop)
			}
		}

		return props
	}

	const insertProps = (syntax: string): string => {
		const allProps = [...generateBasicProps(), ...generateConditionalProps()]

		if (allProps.length > 0) {
			return syntax.replace('>', `${allProps.join('\n')}\n>`)
		}

		return syntax
	}

	const fakeLoading = () => {
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
		}, 1000)
	}

	useEffect(() => {
		fakeLoading()
	}, [])

	useEffect(() => {
		setSyntax(prevSyntax => {
			let newSyntax = clearExistingProps(prevSyntax)

			newSyntax = updateListContent(newSyntax)
			newSyntax = insertProps(newSyntax)

			return newSyntax
		})
	}, [contentSettings, barSettings, thumbSettings, scrollSettings, items])

	return (
		<div className='app'>
			<div className='container'>
				<div className='settings'>
					<h1>TypeScript React Scrollbar</h1>

					<p className='units-info'>
						This is demo use 'px' units! If you want to use 'rem' units, you
						need to set the units prop to 'rem'. <br />
						All props you can find in the{' '}
						<a
							href='https://github.com/Mastero4ek/react-ts-scrollbar/blob/main/README.md'
							target='_blank'
							rel='noopener noreferrer'
						>
							link
						</a>
						.
					</p>

					<hr />

					<Accordion title='Scroll settings' open={true}>
						<Input
							type='checkbox'
							checked={scrollSettings.isScrollTop}
							onChange={value =>
								setScrollSettings(prev => ({
									...prev,
									isScrollTop: value as boolean,
								}))
							}
							label='Follow scroll to top'
						/>

						<Input
							type='checkbox'
							checked={scrollSettings.isScrollBottom}
							onChange={value =>
								setScrollSettings(prev => ({
									...prev,
									isScrollBottom: value as boolean,
								}))
							}
							label='Follow scroll to bottom'
						/>

						<Input
							type='checkbox'
							checked={scrollSettings.isKeepBottom}
							onChange={value =>
								setScrollSettings(prev => ({
									...prev,
									isKeepBottom: value as boolean,
								}))
							}
							label='Keep scrollbar at bottom'
						/>
					</Accordion>

					<hr />

					<Accordion title='Content settings' className='actions-column'>
						<div className='actions-column-item'>
							<Input
								label='Max Height'
								type='range'
								value={contentSettings.contentHeight}
								max={300}
								onChange={value =>
									setContentSettings(prev => ({
										...prev,
										contentHeight: value as number,
									}))
								}
							/>
						</div>

						<div className='actions-column-item'>
							<Input
								label='Padding'
								type='range'
								value={contentSettings.contentPadding}
								onChange={value =>
									setContentSettings(prev => ({
										...prev,
										contentPadding: value as number,
									}))
								}
							/>
						</div>

						<div className='actions-column-item'>
							<Input
								label={
									<Input
										label='Mask'
										type='checkbox'
										checked={contentSettings.isMask}
										onChange={value =>
											setContentSettings(prev => ({
												...prev,
												isMask: value as boolean,
											}))
										}
									/>
								}
								disabled={!contentSettings.isMask}
								type='range'
								value={contentSettings.maskSize}
								onChange={value =>
									setContentSettings(prev => ({
										...prev,
										maskSize: value as number,
									}))
								}
							/>
						</div>

						<div className='actions-column-item'></div>
					</Accordion>

					<hr />

					<Accordion title='Bar settings' className='actions-column'>
						<div className='actions-item'>
							<Input
								type='checkbox'
								checked={barSettings.barPosition === 'right'}
								onChange={value =>
									setBarSettings(prev => ({
										...prev,
										barPosition: value ? 'right' : 'left',
									}))
								}
								label='Position: Right'
							/>
						</div>

						<div />
						<div />
						<div />

						<div className='actions-item'>
							<ColorPicker
								label='Color'
								value={barSettings.barColor}
								onChange={value =>
									setBarSettings(prev => ({ ...prev, barColor: value }))
								}
								id='barColor'
								isOpen={openColorPicker === 'barColor'}
								onToggle={setOpenColorPicker}
							/>
						</div>

						<div className='actions-item'>
							<ColorPicker
								label='Hover color'
								value={barSettings.barHoverColor}
								onChange={value =>
									setBarSettings(prev => ({ ...prev, barHoverColor: value }))
								}
								id='barHoverColor'
								isOpen={openColorPicker === 'barHoverColor'}
								onToggle={setOpenColorPicker}
							/>
						</div>

						<div className='actions-item'>
							<ColorPicker
								label='Border color'
								value={barSettings.barBorderColor}
								onChange={value =>
									setBarSettings(prev => ({ ...prev, barBorderColor: value }))
								}
								id='barBorderColor'
								isOpen={openColorPicker === 'barBorderColor'}
								onToggle={setOpenColorPicker}
							/>
						</div>

						<div className='actions-column-item'>
							<Input
								label='Width'
								type='range'
								value={barSettings.barWidth}
								onChange={value =>
									setBarSettings(prev => ({
										...prev,
										barWidth: value as number,
									}))
								}
							/>
						</div>

						<div className='actions-column-item'>
							<Input
								label='Border width'
								max={10}
								type='range'
								value={barSettings.barBorderWidth}
								onChange={value =>
									setBarSettings(prev => ({
										...prev,
										barBorderWidth: value as number,
									}))
								}
							/>
						</div>

						<div className='actions-column-item'>
							<Input
								label='Radius'
								type='range'
								value={barSettings.barRadius}
								onChange={value =>
									setBarSettings(prev => ({
										...prev,
										barRadius: value as number,
									}))
								}
							/>
						</div>

						<div className='actions-column-item'>
							<Input
								label='Transition'
								max={5}
								step={0.1}
								type='range'
								value={barSettings.barTransition}
								onChange={value =>
									setBarSettings(prev => ({
										...prev,
										barTransition: value as number,
									}))
								}
							/>
						</div>
					</Accordion>

					<hr />

					<Accordion title='Thumb settings' className='actions-column'>
						<div className='actions-item'>
							<ColorPicker
								label='Color'
								value={thumbSettings.thumbColor}
								onChange={value =>
									setThumbSettings(prev => ({ ...prev, thumbColor: value }))
								}
								id='thumbColor'
								isOpen={openColorPicker === 'thumbColor'}
								onToggle={setOpenColorPicker}
							/>
						</div>

						<div className='actions-item'>
							<ColorPicker
								label='Hover color'
								value={thumbSettings.thumbHoverColor}
								onChange={value =>
									setThumbSettings(prev => ({
										...prev,
										thumbHoverColor: value,
									}))
								}
								id='thumbHoverColor'
								isOpen={openColorPicker === 'thumbHoverColor'}
								onToggle={setOpenColorPicker}
							/>
						</div>

						<div className='actions-item'></div>

						<div className='actions-item'></div>

						<div className='actions-column-item'>
							<Input
								label='Width'
								type='range'
								value={thumbSettings.thumbWidth}
								onChange={value =>
									setThumbSettings(prev => ({
										...prev,
										thumbWidth: value as number,
									}))
								}
							/>
						</div>

						<div className='actions-column-item'>
							<Input
								label={
									<Input
										type='checkbox'
										checked={thumbSettings.withImage}
										onChange={value =>
											setThumbSettings(prev => ({
												...prev,
												withImage: value as boolean,
											}))
										}
										label='Image'
									/>
								}
								disabled={!thumbSettings.withImage}
								type='range'
								value={thumbSettings.imageSize}
								onChange={value =>
									setThumbSettings(prev => ({
										...prev,
										imageSize: value as number,
									}))
								}
							/>
						</div>

						<div className='actions-column-item'>
							<Input
								label='Radius'
								type='range'
								value={thumbSettings.thumbRadius}
								onChange={value =>
									setThumbSettings(prev => ({
										...prev,
										thumbRadius: value as number,
									}))
								}
							/>
						</div>

						<div className='actions-column-item'>
							<Input
								label='Transition'
								max={5}
								step={0.1}
								type='range'
								value={thumbSettings.thumbTransition}
								onChange={value =>
									setThumbSettings(prev => ({
										...prev,
										thumbTransition: value as number,
									}))
								}
							/>
						</div>
					</Accordion>

					<hr />

					<div className='buttons'>
						<button
							type='button'
							style={{ backgroundColor: '#6bd26b' }}
							onClick={() => setItems(prev => [...prev, prev.length + 1])}
						>
							Add item
						</button>

						<button
							onClick={() => setItems(prev => prev.slice(0, -1))}
							type='button'
							style={{
								backgroundColor: items.length > 0 ? '#fba930' : '#cccccc',
								cursor: items.length > 0 ? 'pointer' : 'not-allowed',
							}}
						>
							Remove item
						</button>

						<button
							onClick={() => setItems([])}
							type='button'
							style={{
								backgroundColor: items.length > 0 ? '#fb7030' : '#cccccc',
								cursor: items.length > 0 ? 'pointer' : 'not-allowed',
							}}
						>
							Clear items
						</button>

						<button
							onClick={resetAll}
							type='button'
							disabled={!hasChanges()}
							style={{
								marginLeft: 'auto',
								backgroundColor: hasChanges() ? '#e95656' : '#cccccc',
								cursor: hasChanges() ? 'pointer' : 'not-allowed',
							}}
						>
							Reset all settings
						</button>
					</div>
				</div>

				<div className='content'>
					<div className='content-item'>
						<Scrollbar
							style={{
								backgroundColor: '#f5f5f5',
								borderRadius: '10px',
								padding: '20px',
								border: '2px solid #ddd',
							}}
							thumbImage={thumbSettings.withImage ? scrollImage : undefined}
							thumbImageWidth={thumbSettings.imageSize}
							thumbImageHeight={thumbSettings.imageSize}
							barBorderWidth={barSettings.barBorderWidth}
							barBorderColor={barSettings.barBorderColor}
							barTransition={barSettings.barTransition}
							thumbTransition={thumbSettings.thumbTransition}
							contentHeight={contentSettings.contentHeight}
							contentPadding={contentSettings.contentPadding}
							mask={contentSettings.isMask}
							maskSize={contentSettings.maskSize}
							barColor={barSettings.barColor}
							thumbColor={thumbSettings.thumbColor}
							barHoverColor={barSettings.barHoverColor}
							thumbHoverColor={thumbSettings.thumbHoverColor}
							barWidth={barSettings.barWidth}
							thumbWidth={thumbSettings.thumbWidth}
							barRadius={barSettings.barRadius}
							thumbRadius={thumbSettings.thumbRadius}
							barPosition={barSettings.barPosition as 'left' | 'right'}
							onScrollTop={() =>
								scrollSettings.isScrollTop && alert('Top reached')
							}
							onScrollBottom={() =>
								scrollSettings.isScrollBottom && alert('Bottom reached')
							}
							keepItBottom={scrollSettings.isKeepBottom}
						>
							<ul className='content-item-list'>
								{items &&
									items.length > 0 &&
									items.map((item, index) => (
										<li key={index} className='content-item-list-item'>
											<span>Item - {item}</span>
										</li>
									))}
							</ul>
						</Scrollbar>
					</div>
				</div>
			</div>

			<div
				className='container'
				style={{ width: '550px', height: isLoading ? '466px' : 'auto' }}
			>
				{isLoading ? (
					<Spinner />
				) : (
					<>
						<SyntaxHighlighterComponent language='tsx' style={solarizedlight}>
							{syntax}
						</SyntaxHighlighterComponent>

						<button
							disabled={copySuccess}
							className='copy-button'
							type='button'
							onClick={copyToClipboard}
						>
							<img
								alt='Copy to clipboard'
								src={copySuccess ? copyDoneImage : copyImage}
							/>
						</button>
					</>
				)}
			</div>
		</div>
	)
}

export default App
