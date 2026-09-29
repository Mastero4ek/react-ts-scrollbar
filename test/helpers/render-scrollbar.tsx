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
		scrollHeight?: number
		clientHeight?: number
		scrollTop?: number
		scrollWidth?: number
		clientWidth?: number
		scrollLeft?: number
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
	scrollWidth: 0,
	clientWidth: 0,
	scrollLeft: 0,
}

export function renderScrollbar(
	options: RenderScrollbarOptions = {}
): RenderScrollbarResult {
	const metrics = { ...DEFAULT_METRICS, ...options.metrics }
	const { children: propsChildren, ...restProps } = options.props ?? {}
	const ref = createRef<ScrollbarRef>()
	const isHorizontal = restProps.type === 'horizontal'

	const result = render(
		<Scrollbar
			ref={ref}
			contentHeight={isHorizontal ? 0 : 200}
			contentWidth={isHorizontal ? 200 : 0}
			{...restProps}
		>
			{options.children ?? propsChildren ?? (
				<div data-testid='content'>content</div>
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
		if (isHorizontal) {
			mockElementSize(track, {
				clientWidth: metrics.clientWidth || 200,
				clientHeight: 12,
			})
		} else {
			mockElementSize(track, {
				clientHeight: metrics.clientHeight || 200,
				clientWidth: 12,
			})
		}
	}

	act(() => {
		triggerAllResizeObservers()
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
