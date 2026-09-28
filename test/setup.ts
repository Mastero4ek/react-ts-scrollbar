import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

import { resetResizeObservers } from './helpers/scroll-metrics'

type ROCallback = ResizeObserverCallback

class MockResizeObserver {
	callback: ROCallback
	constructor(callback: ROCallback) {
		this.callback = callback
		MockResizeObserver.instances.push(this)
	}
	observe() {}
	unobserve() {}
	disconnect() {
		const i = MockResizeObserver.instances.indexOf(this)
		if (i >= 0) MockResizeObserver.instances.splice(i, 1)
	}
	static instances: MockResizeObserver[] = []
}

beforeEach(() => {
	MockResizeObserver.instances = []
	resetResizeObservers()
	vi.stubGlobal('ResizeObserver', MockResizeObserver)
	vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
		cb(0)
		return 0
	})
	vi.stubGlobal('cancelAnimationFrame', () => {})

	if (!Element.prototype.setPointerCapture) {
		Element.prototype.setPointerCapture = () => {}
	}
	if (!Element.prototype.releasePointerCapture) {
		Element.prototype.releasePointerCapture = () => {}
	}
	if (!Element.prototype.hasPointerCapture) {
		Element.prototype.hasPointerCapture = () => false
	}
})

afterEach(() => {
	cleanup()
	document.getElementById('react-typescript-scrollbar-styles')?.remove()
	vi.unstubAllGlobals()
	resetResizeObservers()
})

export { MockResizeObserver }
