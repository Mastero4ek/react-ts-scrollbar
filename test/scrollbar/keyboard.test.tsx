import { act, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderScrollbar } from '../helpers/render-scrollbar'

describe('Scrollbar keyboard', () => {
	describe('happy path', () => {
		it('ArrowDown on thumb scrolls content', () => {
			const { thumb, scroll } = renderScrollbar({
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			expect(thumb).not.toBeNull()
			expect(thumb!.tabIndex).toBe(0)
			const before = scroll.getScrollTop()

			act(() => {
				fireEvent.keyDown(thumb!, { key: 'ArrowDown' })
			})

			expect(scroll.getScrollTop()).toBe(before + 40)
		})
	})

	describe('error path', () => {
		it('keyboard is no-op when not scrollable', () => {
			const { thumb, scroll, bar } = renderScrollbar({
				metrics: { scrollHeight: 100, clientHeight: 200, scrollTop: 0 },
			})

			expect(bar!.style.display).toBe('none')
			expect(thumb!.tabIndex).toBe(-1)
			const before = scroll.getScrollTop()

			act(() => {
				fireEvent.keyDown(thumb!, { key: 'ArrowDown' })
				fireEvent.keyDown(thumb!, { key: 'PageDown' })
				fireEvent.keyDown(thumb!, { key: 'End' })
			})

			expect(scroll.getScrollTop()).toBe(before)
		})
	})
})
