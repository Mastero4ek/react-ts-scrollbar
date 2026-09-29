import { act, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { renderScrollbar } from '../helpers/render-scrollbar'

describe('Scrollbar overlay', () => {
	describe('happy path', () => {
		it('does not reserve a grid column for the bar', () => {
			const { container, bar } = renderScrollbar({
				props: { overlay: true, barWidth: 12 },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			const wrapper = container.querySelector(
				'.scrollbar_wrapper'
			) as HTMLElement
			expect(wrapper.className).toContain('scrollbar_wrapper--overlay')
			expect(wrapper.style.gridTemplate).toBe('max-content / 1fr')
			expect(bar!.style.position || getComputedStyle(bar!).position).toBeTruthy()
			expect(bar!.style.right).toBe('0px')
		})

		it('places overlay bar on the left when barPosition=left', () => {
			const { bar } = renderScrollbar({
				props: { overlay: true, barPosition: 'left' },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			expect(bar!.style.left).toBe('0px')
		})

		it('does not pad content for the bar column', () => {
			const { viewport } = renderScrollbar({
				props: { overlay: true, contentPadding: 20, barWidth: 12 },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			expect(viewport.style.paddingRight).toBe('0px')
			expect(viewport.style.paddingLeft).toBe('0px')
		})
	})

	describe('error path', () => {
		it('hides bar when not scrollable', () => {
			const { bar } = renderScrollbar({
				props: { overlay: true },
				metrics: { scrollHeight: 100, clientHeight: 200, scrollTop: 0 },
			})

			expect(bar!.style.display).toBe('none')
		})

		it('keeps classic beside layout when overlay is false', () => {
			const { container } = renderScrollbar({
				props: { overlay: false, barWidth: 12 },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			const wrapper = container.querySelector(
				'.scrollbar_wrapper'
			) as HTMLElement
			expect(wrapper.className).not.toContain('scrollbar_wrapper--overlay')
			expect(wrapper.style.gridTemplate).toContain('12px')
		})
	})
})

describe('Scrollbar autoHide', () => {
	beforeEach(() => {
		// Keep setup's sync rAF stub (ResizeObserver → rAF); only fake hide timers
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	describe('happy path', () => {
		it('hides after delay and shows again on scroll', () => {
			const { bar, viewport } = renderScrollbar({
				props: { overlay: true, autoHide: true, autoHideDelay: 500, barTransition: 0 },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			expect(bar!.style.opacity).toBe('1')

			act(() => {
				vi.advanceTimersByTime(500)
			})
			expect(bar!.style.opacity).toBe('0')
			expect(bar!.style.pointerEvents).toBe('none')

			act(() => {
				viewport.dispatchEvent(new Event('scroll'))
			})
			expect(bar!.style.opacity).toBe('1')
		})

		it('shows again on pointerenter after hide', () => {
			const { bar, container } = renderScrollbar({
				props: { overlay: true, autoHide: true, autoHideDelay: 200, barTransition: 0 },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			act(() => {
				vi.advanceTimersByTime(200)
			})
			expect(bar!.style.opacity).toBe('0')

			const wrapper = container.querySelector(
				'.scrollbar_wrapper'
			) as HTMLElement
			act(() => {
				wrapper.dispatchEvent(new Event('pointerenter'))
			})
			expect(bar!.style.opacity).toBe('1')
		})

		it('stays visible while dragging', () => {
			const { bar, thumb } = renderScrollbar({
				props: { overlay: true, autoHide: true, autoHideDelay: 200, barTransition: 0 },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			act(() => {
				fireEvent.pointerDown(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 0,
					clientY: 40,
				})
				vi.advanceTimersByTime(500)
			})

			expect(bar!.style.opacity).toBe('1')

			act(() => {
				fireEvent.pointerUp(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 0,
					clientY: 40,
				})
			})

			act(() => {
				vi.advanceTimersByTime(200)
			})

			expect(bar!.style.opacity).toBe('0')
		})

		it('stays always-on when autoHide is false', () => {
			const { bar } = renderScrollbar({
				props: { overlay: true, autoHide: false, autoHideDelay: 100, barTransition: 0 },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			act(() => {
				vi.advanceTimersByTime(500)
			})
			expect(bar!.style.opacity).toBe('1')
			expect(bar!.style.pointerEvents).toBe('auto')
		})
	})

	describe('error path', () => {
		it('hides without overlay and collapses the beside column', () => {
			const { bar, container } = renderScrollbar({
				props: { overlay: false, autoHide: true, autoHideDelay: 100, barWidth: 12, barTransition: 0 },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			const wrapper = container.querySelector(
				'.scrollbar_wrapper'
			) as HTMLElement
			expect(wrapper.style.gridTemplate).toContain('12px')

			act(() => {
				vi.advanceTimersByTime(100)
			})

			expect(bar!.style.display).toBe('none')
			expect(wrapper.style.gridTemplate).toBe('max-content / 1fr')
		})

		it('accepts numeric autoHide as delay override', () => {
			const { bar } = renderScrollbar({
				props: { overlay: true, autoHide: 300, barTransition: 0 },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			act(() => {
				vi.advanceTimersByTime(299)
			})
			expect(bar!.style.opacity).toBe('1')

			act(() => {
				vi.advanceTimersByTime(1)
			})
			expect(bar!.style.opacity).toBe('0')
		})

		it('clears hide timer on unmount', () => {
			const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
			const { unmount } = renderScrollbar({
				props: { overlay: true, autoHide: true, autoHideDelay: 500, barTransition: 0 },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			unmount()

			act(() => {
				vi.advanceTimersByTime(1000)
			})

			expect(errorSpy).not.toHaveBeenCalled()
			errorSpy.mockRestore()
		})
	})
})

describe('Scrollbar type', () => {
	describe('happy path', () => {
		it('defaults to vertical and accepts explicit type=vertical', () => {
			const a = renderScrollbar({
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})
			expect(a.bar!.style.display).toBe('block')

			const b = renderScrollbar({
				props: { type: 'vertical' },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})
			expect(b.bar!.style.display).toBe('block')
		})
	})

	describe('error path', () => {
		it('falls back barPosition=top to right on vertical', () => {
			const { bar } = renderScrollbar({
				props: { type: 'vertical', overlay: true, barPosition: 'top' },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})
			expect(bar!.style.right).toBe('0px')
		})
	})
})
