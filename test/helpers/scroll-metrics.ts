type ScrollMetrics = {
	scrollHeight: number
	clientHeight: number
	scrollTop?: number
}

type MockScrollHandle = {
	setMetrics: (next: Partial<ScrollMetrics>) => void
	getScrollTop: () => number
}

const resizeObservers: Array<{ callback: ResizeObserverCallback }> = []

export function resetResizeObservers() {
	resizeObservers.length = 0
}

export function triggerAllResizeObservers() {
	// Flush MockResizeObserver.instances from test/setup.ts
	const MockRO = globalThis.ResizeObserver as unknown as {
		instances?: Array<{ callback: ResizeObserverCallback }>
	}
	if (MockRO?.instances) {
		for (const instance of [...MockRO.instances]) {
			instance.callback([], instance as unknown as ResizeObserver)
		}
	}
	for (const observer of [...resizeObservers]) {
		observer.callback([], observer as unknown as ResizeObserver)
	}
}

export function mockScrollable(
	el: HTMLElement,
	metrics: ScrollMetrics
): MockScrollHandle {
	let scrollTop = metrics.scrollTop ?? 0
	let scrollHeight = metrics.scrollHeight
	let clientHeight = metrics.clientHeight

	const clamp = (value: number) => {
		const max = Math.max(0, scrollHeight - clientHeight)
		return Math.max(0, Math.min(value, max))
	}

	const dispatchScroll = () => {
		el.dispatchEvent(new Event('scroll'))
	}

	Object.defineProperties(el, {
		scrollHeight: {
			configurable: true,
			get: () => scrollHeight,
		},
		clientHeight: {
			configurable: true,
			get: () => clientHeight,
		},
		scrollTop: {
			configurable: true,
			get: () => scrollTop,
			set: (value: number) => {
				scrollTop = clamp(value)
				dispatchScroll()
			},
		},
		scrollTo: {
			configurable: true,
			value: (options?: ScrollToOptions | number, y?: number) => {
				if (typeof options === 'number') {
					scrollTop = clamp(typeof y === 'number' ? y : options)
				} else if (options && typeof options.top === 'number') {
					scrollTop = clamp(options.top)
				}
				dispatchScroll()
			},
		},
		scrollBy: {
			configurable: true,
			value: (options?: ScrollToOptions | number, y?: number) => {
				if (typeof options === 'number') {
					scrollTop = clamp(
						scrollTop + (typeof y === 'number' ? y : options)
					)
				} else if (options && typeof options.top === 'number') {
					scrollTop = clamp(scrollTop + options.top)
				}
				dispatchScroll()
			},
		},
	})

	return {
		setMetrics: next => {
			if (next.scrollHeight != null) scrollHeight = next.scrollHeight
			if (next.clientHeight != null) clientHeight = next.clientHeight
			if (next.scrollTop != null) scrollTop = next.scrollTop
		},
		getScrollTop: () => scrollTop,
	}
}

export function mockElementSize(
	el: HTMLElement,
	size: { clientHeight: number; clientWidth?: number; top?: number }
) {
	const clientHeight = size.clientHeight
	const clientWidth = size.clientWidth ?? 12
	const top = size.top ?? 0

	Object.defineProperties(el, {
		clientHeight: {
			configurable: true,
			get: () => clientHeight,
		},
		clientWidth: {
			configurable: true,
			get: () => clientWidth,
		},
	})

	el.getBoundingClientRect = () =>
		({
			x: 0,
			y: top,
			top,
			left: 0,
			bottom: top + clientHeight,
			right: clientWidth,
			width: clientWidth,
			height: clientHeight,
			toJSON() {
				return {}
			},
		}) as DOMRect
}
