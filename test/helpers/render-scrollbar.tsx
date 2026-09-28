import React, { createRef, type ReactNode } from 'react'

import { act, render, type RenderResult } from '@testing-library/react'

import { Scrollbar } from '../../src/Scrollbar'
import type { ScrollbarProps, ScrollbarRef } from '../../src/types/scrollbar'
import {
	mockElementSize,
	mockScrollable,
	triggerAllResizeObservers,
} from './scroll-metrics'

export type RenderScrollbarOptions = {
	props?: Partial<ScrollbarProps>
	metrics?: {
		scrollHeight: number
		clientHeight: number
		scrollTop?: number
	}
	children?: ReactNode
}

export type RenderScrollbarResult = RenderResult & {
	ref: React.RefObject<ScrollbarRef | null>
	viewport: HTMLElement
	track: HTMLElement | null
	thumb: HTMLElement | null
	bar: HTMLElement | null
	scroll: ReturnType<typeof mockScrollable>
}

const DEFAULT_METRICS = {
	scrollHeight: 800,
	clientHeight: 200,
	scrollTop: 100,
}

export function renderScrollbar(
	options: RenderScrollbarOptions = {}
): RenderScrollbarResult {
	const metrics = { ...DEFAULT_METRICS, ...options.metrics }
	const { children: propsChildren, ...restProps } = options.props ?? {}
	const ref = createRef<ScrollbarRef>()

	const result = render(
		<Scrollbar ref={ref} contentHeight={200} {...restProps}>
			{options.children ?? propsChildren ?? (
				<div data-testid='tall-content'>tall content</div>
			)}
		</Scrollbar>
	)

	const viewport = result.container.querySelector(
		'.scrollbar_content'
	) as HTMLElement
	const track = result.container.querySelector(
		'.scrollbar_track'
	) as HTMLElement | null
	const bar = result.container.querySelector('.scrollbar') as HTMLElement | null

	const scroll = mockScrollable(viewport, metrics)
	if (track) {
		mockElementSize(track, { clientHeight: metrics.clientHeight })
	}

	act(() => {
		triggerAllResizeObservers()
		// Sync edgeRef with mocked metrics (initial mount used jsdom zeros)
		viewport.dispatchEvent(new Event('scroll'))
	})

	const thumb =
		(result.container.querySelector('.scrollbar_thumb') as HTMLElement | null) ??
		(result.container.querySelector(
			'.scrollbar_thumb_image'
		) as HTMLElement | null)

	return {
		...result,
		ref,
		viewport,
		track,
		thumb,
		bar,
		scroll,
	}
}
