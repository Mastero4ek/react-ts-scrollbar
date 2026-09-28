import { useCallback, useState } from 'react'

import {
	DEFAULT_BAR_SETTINGS,
	DEFAULT_CONTENT_SETTINGS,
	DEFAULT_SCROLL_SETTINGS,
	DEFAULT_THUMB_SETTINGS,
} from '../constants/defaults'
import type {
	BarSettings,
	ContentSettings,
	ScrollSettings,
	ThumbSettings,
} from '../types/demoSettings'

export const useDemoSettings = () => {
	const [items, setItems] = useState<number[]>([])
	const [openColorPicker, setOpenColorPicker] = useState<string | null>(null)

	const [scrollSettings, setScrollSettings] = useState<ScrollSettings>(
		DEFAULT_SCROLL_SETTINGS,
	)
	const [contentSettings, setContentSettings] = useState<ContentSettings>(
		DEFAULT_CONTENT_SETTINGS,
	)
	const [barSettings, setBarSettings] =
		useState<BarSettings>(DEFAULT_BAR_SETTINGS)
	const [thumbSettings, setThumbSettings] = useState<ThumbSettings>(
		DEFAULT_THUMB_SETTINGS,
	)

	const hasChanges = useCallback(() => {
		const hasItems = items.length > 0
		const hasScrollChanges =
			JSON.stringify(scrollSettings) !== JSON.stringify(DEFAULT_SCROLL_SETTINGS)
		const hasContentChanges =
			JSON.stringify(contentSettings) !==
			JSON.stringify(DEFAULT_CONTENT_SETTINGS)
		const hasBarChanges =
			JSON.stringify(barSettings) !== JSON.stringify(DEFAULT_BAR_SETTINGS)
		const hasThumbChanges =
			JSON.stringify(thumbSettings) !== JSON.stringify(DEFAULT_THUMB_SETTINGS)

		return (
			hasItems ||
			hasScrollChanges ||
			hasContentChanges ||
			hasBarChanges ||
			hasThumbChanges
		)
	}, [items, scrollSettings, contentSettings, barSettings, thumbSettings])

	const resetSettings = useCallback(() => {
		setItems([])
		setScrollSettings(DEFAULT_SCROLL_SETTINGS)
		setContentSettings(DEFAULT_CONTENT_SETTINGS)
		setBarSettings(DEFAULT_BAR_SETTINGS)
		setThumbSettings(DEFAULT_THUMB_SETTINGS)
		setOpenColorPicker(null)
	}, [])

	return {
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
	}
}
