import { act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderScrollbar } from '../helpers/render-scrollbar'
import { triggerAllResizeObservers } from '../helpers/scroll-metrics'

describe('Scrollbar resize / scrollable', () => {
	describe('happy path', () => {
		it('shows bar and thumb when content overflows', () => {
			const { bar, thumb, ref } = renderScrollbar({
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			expect(ref.current!.scrollable).toBe(true)
			expect(bar).not.toBeNull()
			expect(bar!.style.display).toBe('block')
			expect(thumb).not.toBeNull()
			expect(Number.parseFloat(thumb!.style.height)).toBeGreaterThan(0)
		})

		it('recalculates when metrics grow via ResizeObserver', () => {
			const { bar, scroll, ref } = renderScrollbar({
				metrics: { scrollHeight: 100, clientHeight: 200, scrollTop: 0 },
			})

			expect(ref.current!.scrollable).toBe(false)
			expect(bar!.style.display).toBe('none')

			act(() => {
				scroll.setMetrics({ scrollHeight: 900, clientHeight: 200 })
				triggerAllResizeObservers()
			})

			expect(ref.current!.scrollable).toBe(true)
			expect(bar!.style.display).toBe('block')
		})
	})

	describe('error path', () => {
		it('hides bar when content does not overflow', () => {
			const { bar, ref } = renderScrollbar({
				metrics: { scrollHeight: 150, clientHeight: 200, scrollTop: 0 },
			})

			expect(ref.current!.scrollable).toBe(false)
			expect(bar!.style.display).toBe('none')
			expect(bar!.style.opacity).toBe('0')
		})

		it('ResizeObserver after unmount does not throw', () => {
			const { unmount } = renderScrollbar()

			unmount()

			expect(() => {
				act(() => {
					triggerAllResizeObservers()
				})
			}).not.toThrow()
		})
	})
})
