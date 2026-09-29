import { act, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { renderScrollbar } from '../helpers/render-scrollbar'

const H_METRICS = {
	scrollWidth: 800,
	clientWidth: 200,
	scrollLeft: 100,
	scrollHeight: 100,
	clientHeight: 100,
	scrollTop: 0,
}

describe('Scrollbar horizontal', () => {
	describe('happy path', () => {
		it('uses row grid for beside layout', () => {
			const { container, bar } = renderScrollbar({
				props: { type: 'horizontal', barWidth: 12 },
				metrics: H_METRICS,
			})

			const wrapper = container.querySelector(
				'.scrollbar_wrapper'
			) as HTMLElement
			expect(wrapper.className).toContain('scrollbar_wrapper--horizontal')
			expect(wrapper.style.gridTemplate).toBe('1fr 12px / max-content')
			expect(bar!.style.display).toBe('block')
		})

		it('places overlay bar on bottom by default and top when barPosition=top', () => {
			const bottom = renderScrollbar({
				props: { type: 'horizontal', overlay: true },
				metrics: H_METRICS,
			})
			expect(bottom.bar!.style.bottom).toBe('0px')

			const top = renderScrollbar({
				props: { type: 'horizontal', overlay: true, barPosition: 'top' },
				metrics: H_METRICS,
			})
			expect(top.bar!.style.top).toBe('0px')
			expect(top.container.querySelector('.scrollbar_wrapper')!.className).toContain(
				'scrollbar_wrapper--overlay'
			)
		})

		it('pointer drag on thumb changes scrollLeft', () => {
			const { thumb, scroll } = renderScrollbar({
				props: { type: 'horizontal' },
				metrics: H_METRICS,
			})
			const before = scroll.getScrollLeft()

			act(() => {
				fireEvent.pointerDown(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 0,
					clientX: 40,
					clientY: 0,
				})
				fireEvent.pointerMove(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 0,
					clientX: 120,
					clientY: 0,
				})
				fireEvent.pointerUp(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 0,
					clientX: 120,
					clientY: 0,
				})
			})

			expect(scroll.getScrollLeft()).toBeGreaterThan(before)
		})

		it('keyboard arrows change scrollLeft', () => {
			const { thumb, scroll } = renderScrollbar({
				props: { type: 'horizontal' },
				metrics: { ...H_METRICS, scrollLeft: 100 },
			})

			act(() => {
				fireEvent.keyDown(thumb!, { key: 'ArrowRight' })
			})
			expect(scroll.getScrollLeft()).toBeGreaterThan(100)

			act(() => {
				fireEvent.keyDown(thumb!, { key: 'Home' })
			})
			expect(scroll.getScrollLeft()).toBe(0)
		})

		it('ref scrollLeft / scrollToStart / scrollToEnd work', () => {
			const { ref, scroll } = renderScrollbar({
				props: { type: 'horizontal' },
				metrics: { ...H_METRICS, scrollLeft: 0 },
			})

			act(() => {
				ref.current!.scrollLeft = 50
			})
			expect(scroll.getScrollLeft()).toBe(50)

			act(() => {
				ref.current!.scrollToEnd()
			})
			expect(scroll.getScrollLeft()).toBe(600)

			act(() => {
				ref.current!.scrollToStart()
			})
			expect(scroll.getScrollLeft()).toBe(0)
		})

		it('fires onScrollStart with onScrollTop alias at start edge', () => {
			const onScrollStart = vi.fn()
			const onScrollTop = vi.fn()
			const onScrollEnd = vi.fn()
			const onScrollBottom = vi.fn()
			const { viewport } = renderScrollbar({
				props: {
					type: 'horizontal',
					onScrollStart,
					onScrollTop,
					onScrollEnd,
					onScrollBottom,
				},
				metrics: { ...H_METRICS, scrollLeft: 100 },
			})

			act(() => {
				viewport.scrollTo({ left: 0 })
			})
			expect(onScrollStart).toHaveBeenCalledTimes(1)
			expect(onScrollTop).toHaveBeenCalledTimes(1)
			expect(onScrollEnd).not.toHaveBeenCalled()
			expect(onScrollBottom).not.toHaveBeenCalled()

			act(() => {
				viewport.scrollTo({ left: 0 })
			})
			expect(onScrollStart).toHaveBeenCalledTimes(1)
			expect(onScrollTop).toHaveBeenCalledTimes(1)

			act(() => {
				viewport.scrollTo({ left: 600 })
			})
			expect(onScrollEnd).toHaveBeenCalledTimes(1)
			expect(onScrollBottom).toHaveBeenCalledTimes(1)
		})
	})

	describe('error path', () => {
		it('hides bar when not scrollable horizontally', () => {
			const { bar } = renderScrollbar({
				props: { type: 'horizontal' },
				metrics: {
					scrollWidth: 100,
					clientWidth: 200,
					scrollLeft: 0,
					scrollHeight: 100,
					clientHeight: 100,
				},
			})
			expect(bar!.style.display).toBe('none')
		})

		it('falls back barPosition=left to bottom on horizontal', () => {
			const { bar } = renderScrollbar({
				props: { type: 'horizontal', overlay: true, barPosition: 'left' },
				metrics: H_METRICS,
			})
			expect(bar!.style.bottom).toBe('0px')
		})
	})
})

describe('Scrollbar horizontal autoHide', () => {
	beforeEach(() => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('hides after delay and shows on scroll', () => {
		const { bar, viewport } = renderScrollbar({
			props: {
				type: 'horizontal',
				overlay: true,
				autoHide: true,
				autoHideDelay: 300,
				barTransition: 0,
			},
			metrics: H_METRICS,
		})

		expect(bar!.style.opacity).toBe('1')

		act(() => {
			vi.advanceTimersByTime(300)
		})
		expect(bar!.style.opacity).toBe('0')

		act(() => {
			viewport.dispatchEvent(new Event('scroll'))
		})
		expect(bar!.style.opacity).toBe('1')
	})
})

describe('Scrollbar content size', () => {
	it('contentWidth number sets maxWidth and max-content column', () => {
		const { container, viewport } = renderScrollbar({
			props: { type: 'horizontal', contentWidth: 320, barWidth: 12 },
			metrics: H_METRICS,
		})
		const wrapper = container.querySelector(
			'.scrollbar_wrapper'
		) as HTMLElement

		expect(viewport.style.maxWidth).toBe('320px')
		expect(wrapper.style.gridTemplate).toBe('1fr 12px / max-content')
	})

	it('contentWidth=auto fills parent width', () => {
		const { container, viewport } = renderScrollbar({
			props: {
				type: 'horizontal',
				contentWidth: 'auto',
				overlay: true,
			},
			metrics: H_METRICS,
		})
		const wrapper = container.querySelector(
			'.scrollbar_wrapper'
		) as HTMLElement

		expect(viewport.style.width).toBe('100%')
		expect(viewport.style.maxWidth).toBe('100%')
		expect(wrapper.style.gridTemplate).toBe('1fr / minmax(0, 1fr)')
	})

	it('contentHeight=auto fills parent height', () => {
		const { container, viewport } = renderScrollbar({
			props: { contentHeight: 'auto', overlay: true },
			metrics: {
				scrollHeight: 800,
				clientHeight: 200,
				scrollTop: 0,
			},
		})
		const wrapper = container.querySelector(
			'.scrollbar_wrapper'
		) as HTMLElement

		expect(viewport.style.height).toBe('100%')
		expect(viewport.style.maxHeight).toBe('100%')
		expect(wrapper.style.gridTemplate).toBe('minmax(0, 1fr) / 1fr')
	})
})
