import { act, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderScrollbar } from '../helpers/render-scrollbar'

describe('Scrollbar drag / pointer', () => {
	describe('happy path', () => {
		it('pointer drag on thumb changes scrollTop', () => {
			const { thumb, track, scroll } = renderScrollbar({
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			expect(thumb).not.toBeNull()
			expect(track).not.toBeNull()
			const before = scroll.getScrollTop()

			act(() => {
				fireEvent.pointerDown(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 0,
					clientY: 40,
				})
				fireEvent.pointerMove(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 0,
					clientY: 120,
				})
				fireEvent.pointerUp(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 0,
					clientY: 120,
				})
			})

			expect(scroll.getScrollTop()).toBeGreaterThan(before)
		})

		it('track click scrolls toward click position', () => {
			const { track, scroll } = renderScrollbar({
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 0 },
			})

			expect(track).not.toBeNull()

			act(() => {
				fireEvent.click(track!, { clientY: 100 })
			})

			// track height 200, click at mid → ~50% of scrollable (600) = 300
			expect(scroll.getScrollTop()).toBe(300)
		})
	})

	describe('error path', () => {
		it('ignores non-primary mouse button on pointerdown', () => {
			const { thumb, scroll } = renderScrollbar({
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})
			const before = scroll.getScrollTop()

			act(() => {
				fireEvent.pointerDown(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 2,
					clientY: 40,
				})
				fireEvent.pointerMove(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 2,
					clientY: 160,
				})
			})

			expect(scroll.getScrollTop()).toBe(before)
		})

		it('pointer move without preceding down is ignored', () => {
			const { thumb, scroll } = renderScrollbar({
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})
			const before = scroll.getScrollTop()

			act(() => {
				fireEvent.pointerMove(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 0,
					clientY: 200,
				})
			})

			expect(scroll.getScrollTop()).toBe(before)
		})

		it('pointercancel ends drag so further moves do nothing', () => {
			const { thumb, track, scroll } = renderScrollbar({
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			act(() => {
				fireEvent.pointerDown(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 0,
					clientY: 40,
				})
			})
			expect(track!.style.cursor).toBe('grabbing')

			act(() => {
				fireEvent.pointerCancel(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 0,
					clientY: 40,
				})
			})
			expect(track!.style.cursor).toBe('pointer')

			const afterCancel = scroll.getScrollTop()
			act(() => {
				fireEvent.pointerMove(thumb!, {
					pointerId: 1,
					pointerType: 'mouse',
					button: 0,
					clientY: 200,
				})
			})
			expect(scroll.getScrollTop()).toBe(afterCancel)
		})
	})
})
