import { act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderScrollbar } from '../helpers/render-scrollbar'

describe('Scrollbar edge-trigger callbacks', () => {
	describe('happy path', () => {
		it('onScrollTop fires once on enter, again after leave', () => {
			const onScrollTop = vi.fn()
			const { viewport } = renderScrollbar({
				props: { onScrollTop },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			act(() => {
				viewport.scrollTo({ top: 0 })
			})
			expect(onScrollTop).toHaveBeenCalledTimes(1)

			act(() => {
				viewport.scrollTo({ top: 0 })
			})
			expect(onScrollTop).toHaveBeenCalledTimes(1)

			act(() => {
				viewport.scrollTo({ top: 80 })
				viewport.scrollTo({ top: 0 })
			})
			expect(onScrollTop).toHaveBeenCalledTimes(2)
		})

		it('onScrollBottom fires once on enter, again after leave', () => {
			const onScrollBottom = vi.fn()
			const { viewport } = renderScrollbar({
				props: { onScrollBottom },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			act(() => {
				viewport.scrollTo({ top: 600 })
			})
			expect(onScrollBottom).toHaveBeenCalledTimes(1)

			act(() => {
				viewport.scrollTo({ top: 600 })
			})
			expect(onScrollBottom).toHaveBeenCalledTimes(1)

			act(() => {
				viewport.scrollTo({ top: 400 })
				viewport.scrollTo({ top: 600 })
			})
			expect(onScrollBottom).toHaveBeenCalledTimes(2)
		})
	})

	describe('error path', () => {
		it('does not fire while staying at edge or scrolling in the middle', () => {
			const onScrollTop = vi.fn()
			const onScrollBottom = vi.fn()
			const { viewport } = renderScrollbar({
				props: { onScrollTop, onScrollBottom },
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			act(() => {
				viewport.scrollTo({ top: 150 })
				viewport.scrollTo({ top: 200 })
				viewport.scrollTo({ top: 250 })
			})
			expect(onScrollTop).not.toHaveBeenCalled()
			expect(onScrollBottom).not.toHaveBeenCalled()

			act(() => {
				viewport.scrollTo({ top: 0 })
			})
			expect(onScrollTop).toHaveBeenCalledTimes(1)

			act(() => {
				viewport.scrollTo({ top: 0 })
				viewport.scrollTo({ top: 0 })
			})
			expect(onScrollTop).toHaveBeenCalledTimes(1)
		})

		it('undefined callbacks do not throw on edge scroll', () => {
			const { viewport } = renderScrollbar({
				metrics: { scrollHeight: 800, clientHeight: 200, scrollTop: 100 },
			})

			expect(() => {
				act(() => {
					viewport.scrollTo({ top: 0 })
					viewport.scrollTo({ top: 600 })
				})
			}).not.toThrow()
		})
	})
})
