import { act, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import React from 'react'

import { Scrollbar } from '../../src/Scrollbar'
import { renderScrollbar } from '../helpers/render-scrollbar'

const STYLE_ID = 'react-typescript-scrollbar-styles'

describe('Scrollbar injectStyles', () => {
	describe('happy path', () => {
		it('injects a single style tag on mount', () => {
			renderScrollbar()
			expect(document.getElementById(STYLE_ID)).not.toBeNull()
		})
	})

	describe('error path', () => {
		it('shares one style tag across mounts and removes on last unmount', () => {
			const first = render(
				<Scrollbar contentHeight={200}>
					<div>a</div>
				</Scrollbar>
			)
			const second = render(
				<Scrollbar contentHeight={200}>
					<div>b</div>
				</Scrollbar>
			)

			expect(document.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1)

			act(() => {
				first.unmount()
			})
			expect(document.getElementById(STYLE_ID)).not.toBeNull()

			act(() => {
				second.unmount()
			})
			expect(document.getElementById(STYLE_ID)).toBeNull()
		})
	})
})
