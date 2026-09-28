import { act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderScrollbar } from '../helpers/render-scrollbar'

describe('Scrollbar ref API', () => {
	describe('happy path', () => {
		it('exposes element and scrollable metrics', () => {
			const { ref, viewport } = renderScrollbar()

			expect(ref.current).not.toBeNull()
			expect(ref.current!.element).toBe(viewport)
			expect(ref.current!.scrollable).toBe(true)
			expect(ref.current!.scrollHeight).toBe(800)
			expect(ref.current!.clientHeight).toBe(200)
		})

		it('scrollTo / scrollBy / scrollTop get-set move scrollTop', () => {
			const { ref, scroll } = renderScrollbar()

			act(() => {
				ref.current!.scrollTo({ top: 50 })
			})
			expect(ref.current!.scrollTop).toBe(50)
			expect(scroll.getScrollTop()).toBe(50)

			act(() => {
				ref.current!.scrollBy({ top: 25 })
			})
			expect(ref.current!.scrollTop).toBe(75)

			act(() => {
				ref.current!.scrollTop = 10
			})
			expect(ref.current!.scrollTop).toBe(10)
		})

		it('scrollToTop and scrollToBottom', () => {
			const { ref } = renderScrollbar()

			act(() => {
				ref.current!.scrollToBottom()
			})
			expect(ref.current!.scrollTop).toBe(600)

			act(() => {
				ref.current!.scrollToTop()
			})
			expect(ref.current!.scrollTop).toBe(0)
		})
	})

	describe('error path', () => {
		it('ref is null before mount and after unmount', () => {
			const { ref, unmount } = renderScrollbar()
			expect(ref.current).not.toBeNull()

			unmount()
			expect(ref.current).toBeNull()
		})

		it('scrollTo without options / empty overflow does not throw', () => {
			const { ref } = renderScrollbar({
				metrics: { scrollHeight: 100, clientHeight: 100, scrollTop: 0 },
			})

			expect(ref.current!.scrollable).toBe(false)
			expect(() => {
				act(() => {
					ref.current!.scrollTo()
					ref.current!.scrollBy()
					ref.current!.scrollToTop()
					ref.current!.scrollToBottom()
					ref.current!.scrollTop = 0
				})
			}).not.toThrow()
		})
	})
})
