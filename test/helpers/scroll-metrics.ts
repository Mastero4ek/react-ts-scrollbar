type ScrollMetrics = {
	scrollHeight?: number
	clientHeight?: number
	scrollTop?: number
	scrollWidth?: number
	clientWidth?: number
	scrollLeft?: number
}

type MockScrollHandle = {
	setMetrics: (next: Partial<ScrollMetrics>) => void
	getScrollTop: () => number
	getScrollLeft: () => number
}

const resizeObservers: Array<{ callback: ResizeObserverCallback }> = []

export function resetResizeObservers() {
	resizeObservers.length = 0
}

export function triggerAllResizeObservers() {
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
	let scrollHeight = metrics.scrollHeight ?? 0
	let clientHeight = metrics.clientHeight ?? 0
	let scrollLeft = metrics.scrollLeft ?? 0
	let scrollWidth = metrics.scrollWidth ?? 0
	let clientWidth = metrics.clientWidth ?? 0

	const clampY = (value: number) => {
		const max = Math.max(0, scrollHeight - clientHeight)
		return Math.max(0, Math.min(value, max))
	}
	const clampX = (value: number) => {
		const max = Math.max(0, scrollWidth - clientWidth)
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
				scrollTop = clampY(value)
				dispatchScroll()
			},
		},
		scrollWidth: {
			configurable: true,
			get: () => scrollWidth,
		},
		clientWidth: {
			configurable: true,
			get: () => clientWidth,
		},
		scrollLeft: {
			configurable: true,
			get: () => scrollLeft,
			set: (value: number) => {
				scrollLeft = clampX(value)
				dispatchScroll()
			},
		},
		scrollTo: {
			configurable: true,
			value: (options?: ScrollToOptions | number, y?: number) => {
				if (typeof options === 'number') {
					scrollLeft = clampX(options)
					if (typeof y === 'number') scrollTop = clampY(y)
				} else if (options) {
					if (typeof options.top === 'number') {
						scrollTop = clampY(options.top)
					}
					if (typeof options.left === 'number') {
						scrollLeft = clampX(options.left)
					}
				}
				dispatchScroll()
			},
		},
		scrollBy: {
			configurable: true,
			value: (options?: ScrollToOptions | number, y?: number) => {
				if (typeof options === 'number') {
					scrollLeft = clampX(scrollLeft + options)
					if (typeof y === 'number') scrollTop = clampY(scrollTop + y)
				} else if (options) {
					if (typeof options.top === 'number') {
						scrollTop = clampY(scrollTop + options.top)
					}
					if (typeof options.left === 'number') {
						scrollLeft = clampX(scrollLeft + options.left)
					}
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
			if (next.scrollWidth != null) scrollWidth = next.scrollWidth
			if (next.clientWidth != null) clientWidth = next.clientWidth
			if (next.scrollLeft != null) scrollLeft = next.scrollLeft
		},
		getScrollTop: () => scrollTop,
		getScrollLeft: () => scrollLeft,
	}
}

export function mockElementSize(
	el: HTMLElement,
	size: {
		clientHeight?: number
		clientWidth?: number
		top?: number
		left?: number
	}
) {
	const clientHeight = size.clientHeight ?? 12
	const clientWidth = size.clientWidth ?? 12
	const top = size.top ?? 0
	const left = size.left ?? 0

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
			x: left,
			y: top,
			top,
			left,
			bottom: top + clientHeight,
			right: left + clientWidth,
			width: clientWidth,
			height: clientHeight,
			toJSON() {
				return {}
			},
		}) as DOMRect
}
