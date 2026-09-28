import './assets/styles/main.scss'

import React, { useCallback } from 'react'

import { CodePanel } from './components/CodePanel.tsx'
import { Preview } from './components/Preview.tsx'
import { SettingsPanel } from './components/settings/SettingsPanel.tsx'
import { useDemoSettings } from './hooks/use-demo-settings'
import { useFakeLoading } from './hooks/use-fake-loading'
import { useGeneratedSyntax } from './hooks/use-generated-syntax'

const App = () => {
	const {
		items,
		setItems,
		openColorPicker,
		setOpenColorPicker,
		scrollSettings,
		setScrollSettings,
		contentSettings,
		setContentSettings,
		barSettings,
		setBarSettings,
		thumbSettings,
		setThumbSettings,
		hasChanges,
		resetSettings,
	} = useDemoSettings()

	const { syntax, copySuccess, copyToClipboard, resetSyntax } =
		useGeneratedSyntax({
			items,
			scrollSettings,
			contentSettings,
			barSettings,
			thumbSettings,
		})

	const { isLoading, fakeLoading } = useFakeLoading()

	const resetAll = useCallback(() => {
		if (!hasChanges()) {
			return
		}

		fakeLoading()
		resetSettings()
		resetSyntax()
	}, [hasChanges, fakeLoading, resetSettings, resetSyntax])

	return (
		<div className='app'>
			<div className='container'>
				<SettingsPanel
					scrollSettings={scrollSettings}
					setScrollSettings={setScrollSettings}
					contentSettings={contentSettings}
					setContentSettings={setContentSettings}
					barSettings={barSettings}
					setBarSettings={setBarSettings}
					thumbSettings={thumbSettings}
					setThumbSettings={setThumbSettings}
					openColorPicker={openColorPicker}
					setOpenColorPicker={setOpenColorPicker}
					itemsCount={items.length}
					hasChanges={hasChanges()}
					onAddItem={() => setItems(prev => [...prev, prev.length + 1])}
					onRemoveItem={() => setItems(prev => prev.slice(0, -1))}
					onClearItems={() => setItems([])}
					onResetAll={resetAll}
				/>

				<Preview
					items={items}
					scrollSettings={scrollSettings}
					contentSettings={contentSettings}
					barSettings={barSettings}
					thumbSettings={thumbSettings}
				/>
			</div>

			<CodePanel
				syntax={syntax}
				isLoading={isLoading}
				copySuccess={copySuccess}
				onCopy={copyToClipboard}
			/>
		</div>
	)
}

export default App
