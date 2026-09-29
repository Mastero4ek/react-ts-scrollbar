import React, {
	forwardRef,
	useCallback,
	useEffect,
	useId,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import { ScrollbarProps, ScrollbarRef, ScrollbarType } from '../types/scrollbar'
import { injectStyles } from './styles'

const resolveAutoHideDelay = (
	autoHide: boolean | number | undefined,
	autoHideDelay: number,
): { active: boolean; delay: number } => {
	if (autoHide === true) {
		return { active: true, delay: autoHideDelay }
	}
	if (typeof autoHide === 'number') {
		return { active: true, delay: autoHide }
	}
	return { active: false, delay: autoHideDelay }
}

type Axis = {
	scrollPos: 'scrollTop' | 'scrollLeft'
	scrollSize: 'scrollHeight' | 'scrollWidth'
	clientSize: 'clientHeight' | 'clientWidth'
	clientCoord: 'clientY' | 'clientX'
	trackClientSize: 'clientHeight' | 'clientWidth'
	thumbPos: 'top' | 'left'
	ariaOrientation: 'vertical' | 'horizontal'
	ariaLabel: string
	arrowDec: string
	arrowInc: string
	scrollToKey: 'top' | 'left'
}

const VERTICAL_AXIS: Axis = {
	scrollPos: 'scrollTop',
	scrollSize: 'scrollHeight',
	clientSize: 'clientHeight',
	clientCoord: 'clientY',
	trackClientSize: 'clientHeight',
	thumbPos: 'top',
	ariaOrientation: 'vertical',
	ariaLabel: 'Vertical scrollbar',
	arrowDec: 'ArrowUp',
	arrowInc: 'ArrowDown',
	scrollToKey: 'top',
}

const HORIZONTAL_AXIS: Axis = {
	scrollPos: 'scrollLeft',
	scrollSize: 'scrollWidth',
	clientSize: 'clientWidth',
	clientCoord: 'clientX',
	trackClientSize: 'clientWidth',
	thumbPos: 'left',
	ariaOrientation: 'horizontal',
	ariaLabel: 'Horizontal scrollbar',
	arrowDec: 'ArrowLeft',
	arrowInc: 'ArrowRight',
	scrollToKey: 'left',
}

const getAxis = (type: ScrollbarType): Axis =>
	type === 'horizontal' ? HORIZONTAL_AXIS : VERTICAL_AXIS

const getScrollPos = (el: HTMLElement, axis: Axis) => el[axis.scrollPos]
const setScrollPos = (el: HTMLElement, axis: Axis, value: number) => {
	el[axis.scrollPos] = value
}
const getScrollSize = (el: HTMLElement, axis: Axis) => el[axis.scrollSize]
const getClientSize = (el: HTMLElement, axis: Axis) => el[axis.clientSize]

export const Scrollbar = forwardRef<ScrollbarRef, ScrollbarProps>(
	function Scrollbar(
		{
			children,
			className,
			style,
			units = 'px',
			contentHeight = 300,
			contentWidth = 0,
			contentPadding = 10,
			keepItBottom = false,
			keepItEnd,
			type = 'vertical',
			overlay = false,
			autoHide = false,
			autoHideDelay = 1500,
			barPosition = 'right',
			barColor = '#87ceeb',
			barHoverColor,
			barWidth = 12,
			barRadius = 10,
			barShadow = 'none',
			barBorderColor = 'transparent',
			barBorderWidth = 0,
			barTransition = 0,
			thumbColor = 'rgba(0, 0, 0, 0.5)',
			thumbHoverColor,
			thumbWidth,
			thumbRadius,
			thumbShadow = 'none',
			thumbTransition = 0,
			thumbImage,
			thumbImageWidth = 10,
			thumbImageHeight = 10,
			mask = false,
			maskSize = 20,
			onScrollTop,
			onScrollBottom,
			onScrollStart,
			onScrollEnd,
			...rest
		},
		ref,
	) {
		const wrapperRef = useRef<HTMLDivElement>(null)
		const contentRef = useRef<HTMLDivElement>(null)
		const scrollTrackRef = useRef<HTMLDivElement>(null)
		const scrollThumbRef = useRef<HTMLDivElement>(null)
		const observer = useRef<ResizeObserver | null>(null)
		const mutationObserver = useRef<MutationObserver | null>(null)
		const contentId = useId()

		const [isStart, setIsStart] = useState(false)
		const [isEnd, setIsEnd] = useState(false)
		const [isDragging, setIsDragging] = useState(false)
		const [isScrollable, setIsScrollable] = useState(false)
		const [thumbSize, setThumbSize] = useState(20)
		const [scrollValue, setScrollValue] = useState(0)
		const [autoHideVisible, setAutoHideVisible] = useState(true)
		const dragRef = useRef<{
			active: boolean
			pointerId: number | null
			startCoord: number
			initialScrollPos: number
		}>({ active: false, pointerId: null, startCoord: 0, initialScrollPos: 0 })
		const edgeRef = useRef({ start: false, end: false })
		const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

		const isVertical = type === 'vertical'
		const axis = getAxis(type)
		const stickToEnd = Boolean(keepItEnd || keepItBottom)
		const resolvedBarPosition =
			isVertical && (barPosition === 'top' || barPosition === 'bottom')
				? 'right'
				: !isVertical && (barPosition === 'left' || barPosition === 'right')
					? 'bottom'
					: barPosition
		const isBarAtStart =
			resolvedBarPosition === 'left' || resolvedBarPosition === 'top'
		const { active: autoHideEnabled, delay: hideDelay } = resolveAutoHideDelay(
			autoHide,
			autoHideDelay,
		)
		const barVisible = autoHideEnabled ? autoHideVisible : true

		const clearAutoHideTimer = useCallback(() => {
			if (autoHideTimerRef.current != null) {
				clearTimeout(autoHideTimerRef.current)
				autoHideTimerRef.current = null
			}
		}, [])

		const scheduleAutoHide = useCallback(() => {
			clearAutoHideTimer()
			if (!autoHideEnabled || isDragging) return
			autoHideTimerRef.current = setTimeout(() => {
				setAutoHideVisible(false)
				autoHideTimerRef.current = null
			}, hideDelay)
		}, [autoHideEnabled, clearAutoHideTimer, hideDelay, isDragging])

		const bumpAutoHide = useCallback(() => {
			if (!autoHideEnabled) return
			setAutoHideVisible(true)
			scheduleAutoHide()
		}, [autoHideEnabled, scheduleAutoHide])

		const scrollToStart = useCallback(
			(behavior: ScrollBehavior = 'auto') => {
				contentRef.current?.scrollTo({
					[axis.scrollToKey]: 0,
					behavior,
				} as ScrollToOptions)
			},
			[axis.scrollToKey],
		)

		const scrollToEnd = useCallback(
			(behavior: ScrollBehavior = 'auto') => {
				const el = contentRef.current
				if (!el) return
				el.scrollTo({
					[axis.scrollToKey]: getScrollSize(el, axis),
					behavior,
				} as ScrollToOptions)
			},
			[axis],
		)

		useImperativeHandle(
			ref,
			() => ({
				get element() {
					return contentRef.current
				},
				get scrollTop() {
					return contentRef.current?.scrollTop ?? 0
				},
				set scrollTop(value: number) {
					if (contentRef.current) {
						contentRef.current.scrollTop = value
					}
				},
				get scrollHeight() {
					return contentRef.current?.scrollHeight ?? 0
				},
				get clientHeight() {
					return contentRef.current?.clientHeight ?? 0
				},
				get scrollLeft() {
					return contentRef.current?.scrollLeft ?? 0
				},
				set scrollLeft(value: number) {
					if (contentRef.current) {
						contentRef.current.scrollLeft = value
					}
				},
				get scrollWidth() {
					return contentRef.current?.scrollWidth ?? 0
				},
				get clientWidth() {
					return contentRef.current?.clientWidth ?? 0
				},
				get scrollable() {
					const el = contentRef.current
					if (!el) return false
					return getScrollSize(el, axis) > getClientSize(el, axis) + 1
				},
				scrollTo(options) {
					contentRef.current?.scrollTo(options)
				},
				scrollBy(options) {
					contentRef.current?.scrollBy(options)
				},
				scrollToTop(behavior = 'auto') {
					contentRef.current?.scrollTo({ top: 0, behavior })
				},
				scrollToBottom(behavior = 'auto') {
					const el = contentRef.current
					if (!el) return
					el.scrollTo({ top: el.scrollHeight, behavior })
				},
				scrollToStart,
				scrollToEnd,
			}),
			[axis, scrollToEnd, scrollToStart],
		)

		useEffect(() => {
			if (!autoHideEnabled) {
				clearAutoHideTimer()
				setAutoHideVisible(true)
				return
			}

			setAutoHideVisible(true)
			scheduleAutoHide()

			const viewport = contentRef.current
			const wrapper = wrapperRef.current
			const onActivity = () => bumpAutoHide()

			viewport?.addEventListener('scroll', onActivity)
			wrapper?.addEventListener('pointerenter', onActivity)
			wrapper?.addEventListener('pointermove', onActivity)
			wrapper?.addEventListener('focusin', onActivity)

			return () => {
				clearAutoHideTimer()
				viewport?.removeEventListener('scroll', onActivity)
				wrapper?.removeEventListener('pointerenter', onActivity)
				wrapper?.removeEventListener('pointermove', onActivity)
				wrapper?.removeEventListener('focusin', onActivity)
			}
		}, [
			autoHideEnabled,
			hideDelay,
			bumpAutoHide,
			scheduleAutoHide,
			clearAutoHideTimer,
		])

		useEffect(() => {
			if (!autoHideEnabled) return
			if (isDragging) {
				clearAutoHideTimer()
				setAutoHideVisible(true)
				return
			}
			scheduleAutoHide()
		}, [isDragging, autoHideEnabled, clearAutoHideTimer, scheduleAutoHide])

		const handleScroll = useCallback(() => {
			if (!contentRef.current) return
			const el = contentRef.current
			const pos = getScrollPos(el, axis)
			const scrollableDistance =
				getScrollSize(el, axis) - getClientSize(el, axis)
			const atStart = pos === 0
			const atEnd = Math.abs(scrollableDistance - pos) < 1
			const wasStart = edgeRef.current.start
			const wasEnd = edgeRef.current.end

			setIsStart(atStart)
			setIsEnd(atEnd)
			setScrollValue(
				scrollableDistance <= 0
					? 0
					: Math.round((pos / scrollableDistance) * 100),
			)
			edgeRef.current = { start: atStart, end: atEnd }

			if (atStart && !wasStart) {
				onScrollStart?.()
				onScrollTop?.()
			}
			if (atEnd && !wasEnd) {
				onScrollEnd?.()
				onScrollBottom?.()
			}
		}, [axis, onScrollBottom, onScrollEnd, onScrollStart, onScrollTop])

		const handleResize = useCallback(
			(el: HTMLDivElement, trackSize: number) => {
				const client = getClientSize(el, axis)
				const scroll = getScrollSize(el, axis)
				const minThumb = 20
				const newThumb = Math.min(
					Math.max((client / scroll) * trackSize, minThumb),
					trackSize,
				)
				setThumbSize(newThumb)
				setIsScrollable(scroll > client + 1)
			},
			[axis],
		)

		const scrollToEndKeep = useCallback(() => {
			const el = contentRef.current
			if (!el) return
			setScrollPos(el, axis, getScrollSize(el, axis))
		}, [axis])

		const handleTrackClick = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				e.preventDefault()
				e.stopPropagation()
				const track = scrollTrackRef.current
				const content = contentRef.current
				if (!track || !content) return

				const rect = (e.target as HTMLDivElement).getBoundingClientRect()
				const coord = e[axis.clientCoord]
				const trackOrigin = isVertical ? rect.top : rect.left
				const trackSize = track[axis.trackClientSize]
				const clickRatio = (coord - trackOrigin) / trackSize
				const scrollAmount = Math.floor(
					clickRatio *
						(getScrollSize(content, axis) - getClientSize(content, axis)),
				)
				content.scrollTo({
					[axis.scrollToKey]: scrollAmount,
					behavior: 'smooth',
				} as ScrollToOptions)
			},
			[axis, isVertical],
		)

		const handleThumbPosition = useCallback(() => {
			const content = contentRef.current
			const thumb = scrollThumbRef.current
			if (!content || !scrollTrackRef.current || !thumb) return

			const scrollableDistance =
				getScrollSize(content, axis) - getClientSize(content, axis)
			if (scrollableDistance <= 0) return

			const pct = (getScrollPos(content, axis) / scrollableDistance) * 100
			const value = Math.max(0, Math.min(pct, 100))

			if (isVertical) {
				thumb.style.left = ''
				thumb.style.top = `${value}%`
				thumb.style.transform = `translateX(-50%) translateY(-${value}%)`
			} else {
				thumb.style.top = ''
				thumb.style.left = `${value}%`
				thumb.style.transform = `translateY(-50%) translateX(-${value}%)`
			}
		}, [axis, isVertical])

		const handleThumbPointerDown = useCallback(
			(e: React.PointerEvent<HTMLDivElement>) => {
				if (e.pointerType === 'mouse' && e.button !== 0) return
				e.preventDefault()
				e.stopPropagation()
				e.currentTarget.setPointerCapture(e.pointerId)
				dragRef.current = {
					active: true,
					pointerId: e.pointerId,
					startCoord: e[axis.clientCoord],
					initialScrollPos: contentRef.current
						? getScrollPos(contentRef.current, axis)
						: 0,
				}
				setIsDragging(true)
			},
			[axis],
		)

		const handleThumbPointerMove = useCallback(
			(e: React.PointerEvent<HTMLDivElement>) => {
				const drag = dragRef.current
				const content = contentRef.current
				if (!drag.active || drag.pointerId !== e.pointerId || !content) return

				e.preventDefault()
				e.stopPropagation()
				const scrollableDistance =
					getScrollSize(content, axis) - getClientSize(content, axis)
				if (scrollableDistance <= 0) return

				const trackSize = scrollTrackRef.current?.[axis.trackClientSize] || 0
				const delta = e[axis.clientCoord] - drag.startCoord
				const scrollPercentage = (delta / trackSize) * 100
				const next = Math.min(
					Math.max(
						0,
						drag.initialScrollPos +
							(scrollPercentage / 100) * scrollableDistance,
					),
					scrollableDistance,
				)
				setScrollPos(content, axis, next)
			},
			[axis],
		)

		const handleThumbPointerUp = useCallback(
			(e: React.PointerEvent<HTMLDivElement>) => {
				const drag = dragRef.current
				if (!drag.active || drag.pointerId !== e.pointerId) return
				if (e.currentTarget.hasPointerCapture(e.pointerId)) {
					e.currentTarget.releasePointerCapture(e.pointerId)
				}
				dragRef.current = {
					active: false,
					pointerId: null,
					startCoord: 0,
					initialScrollPos: 0,
				}
				setIsDragging(false)
			},
			[],
		)

		useEffect(() => injectStyles(), [])

		useEffect(() => {
			if (!contentRef.current || !scrollTrackRef.current) return
			const track = scrollTrackRef.current
			handleResize(contentRef.current, track[axis.trackClientSize])
			handleThumbPosition()
			const el = contentRef.current
			const pos = getScrollPos(el, axis)
			const scrollableDistance =
				getScrollSize(el, axis) - getClientSize(el, axis)
			const atStart = pos === 0
			const atEnd = Math.abs(scrollableDistance - pos) < 1
			setIsStart(atStart)
			setIsEnd(atEnd)
			setScrollValue(
				scrollableDistance <= 0
					? 0
					: Math.round((pos / scrollableDistance) * 100),
			)
			edgeRef.current = { start: atStart, end: atEnd }
		}, [axis, handleResize, handleThumbPosition, type])

		useEffect(() => {
			if (!contentRef.current) return

			const sync = () => {
				requestAnimationFrame(() => {
					if (!scrollTrackRef.current || !contentRef.current) return
					handleResize(
						contentRef.current,
						scrollTrackRef.current[axis.trackClientSize],
					)
					handleThumbPosition()
					if (stickToEnd) {
						scrollToEndKeep()
					}
				})
			}

			mutationObserver.current = new MutationObserver(sync)
			mutationObserver.current.observe(contentRef.current, {
				childList: true,
				subtree: true,
				characterData: true,
				attributes: true,
				attributeFilter: ['style', 'class', 'height', 'width'],
			})
			observer.current = new ResizeObserver(sync)
			observer.current.observe(contentRef.current)
			return () => {
				mutationObserver.current?.disconnect()
				observer.current?.disconnect()
			}
		}, [
			axis.trackClientSize,
			handleResize,
			handleThumbPosition,
			stickToEnd,
			scrollToEndKeep,
		])

		useEffect(() => {
			const el = contentRef.current
			if (!el) return
			el.addEventListener('scroll', handleThumbPosition)
			el.addEventListener('scroll', handleScroll)
			return () => {
				el.removeEventListener('scroll', handleThumbPosition)
				el.removeEventListener('scroll', handleScroll)
			}
		}, [handleScroll, handleThumbPosition])

		const handleThumbKeyDown = useCallback(
			(e: React.KeyboardEvent<HTMLDivElement>) => {
				if (!contentRef.current || !isScrollable) return
				const el = contentRef.current
				const line = 40
				const page = getClientSize(el, axis) * 0.9

				switch (e.key) {
					case axis.arrowDec:
						e.preventDefault()
						el.scrollBy({
							[axis.scrollToKey]: -line,
						} as ScrollToOptions)
						break
					case axis.arrowInc:
						e.preventDefault()
						el.scrollBy({
							[axis.scrollToKey]: line,
						} as ScrollToOptions)
						break
					case 'PageUp':
						e.preventDefault()
						el.scrollBy({
							[axis.scrollToKey]: -page,
						} as ScrollToOptions)
						break
					case 'PageDown':
						e.preventDefault()
						el.scrollBy({
							[axis.scrollToKey]: page,
						} as ScrollToOptions)
						break
					case 'Home':
						e.preventDefault()
						setScrollPos(el, axis, 0)
						break
					case 'End':
						e.preventDefault()
						setScrollPos(el, axis, getScrollSize(el, axis))
						break
				}
			},
			[axis, isScrollable],
		)

		const { gap, ...restStyle } = style || {}
		const showBar = isScrollable && barVisible
		const reserveBarTrack = isScrollable && !overlay && showBar
		const barUnit = `${barWidth}${units}`
		const fillParentMain =
			(isVertical && contentHeight === 'auto') ||
			(!isVertical && contentWidth === 'auto')
		const mainTrack = fillParentMain ? 'minmax(0, 1fr)' : 'max-content'

		const gridTemplate = (() => {
			if (!reserveBarTrack) {
				return isVertical ? `${mainTrack} / 1fr` : `1fr / ${mainTrack}`
			}
			if (isVertical) {
				return isBarAtStart
					? `${mainTrack} / ${barUnit} 1fr`
					: `${mainTrack} / 1fr ${barUnit}`
			}
			return isBarAtStart
				? `${barUnit} 1fr / ${mainTrack}`
				: `1fr ${barUnit} / ${mainTrack}`
		})()

		const contentSizeStyle = (() => {
			if (isVertical) {
				if (contentHeight === 'auto') {
					return { height: '100%', maxHeight: '100%' }
				}
				return {
					height: 'auto' as const,
					...(typeof contentHeight === 'number' &&
						contentHeight > 0 && {
							maxHeight: `${contentHeight}${units}`,
						}),
				}
			}
			if (contentWidth === 'auto') {
				return { width: '100%', maxWidth: '100%' }
			}
			return {
				...(typeof contentWidth === 'number' &&
					contentWidth > 0 && {
						maxWidth: `${contentWidth}${units}`,
					}),
			}
		})()

		const contentPadStyle = (() => {
			if (!reserveBarTrack) {
				return {
					paddingRight: 0,
					paddingLeft: 0,
					paddingTop: 0,
					paddingBottom: 0,
				}
			}
			const pad = `${contentPadding}${units}`
			if (isVertical) {
				return {
					paddingRight: !isBarAtStart ? pad : 0,
					paddingLeft: isBarAtStart ? pad : 0,
					paddingTop: 0,
					paddingBottom: 0,
				}
			}
			return {
				paddingRight: 0,
				paddingLeft: 0,
				paddingTop: isBarAtStart ? pad : 0,
				paddingBottom: !isBarAtStart ? pad : 0,
			}
		})()

		const contentOrder = overlay ? undefined : isBarAtStart ? 2 : 1
		const barOrder = overlay ? undefined : isBarAtStart ? 1 : 2

		const barSideStyle = (() => {
			if (!overlay) return undefined
			if (isVertical) {
				return isBarAtStart
					? { left: 0, right: 'auto' as const }
					: { right: 0, left: 'auto' as const }
			}
			return isBarAtStart
				? { top: 0, bottom: 'auto' as const }
				: { bottom: 0, top: 'auto' as const }
		})()

		const maskStyles = (() => {
			if (!mask || !isScrollable) return undefined
			const startGrad = isVertical
				? `linear-gradient(to bottom, black ${maskSize}%, transparent 100%)`
				: `linear-gradient(to right, black ${maskSize}%, transparent 100%)`
			const endGrad = isVertical
				? `linear-gradient(to top, black ${maskSize}%, transparent 100%)`
				: `linear-gradient(to left, black ${maskSize}%, transparent 100%)`
			const both = `${startGrad}, ${endGrad}`
			const image = isStart ? startGrad : isEnd ? endGrad : both
			return {
				maskImage: image,
				WebkitMaskImage: image,
				maskComposite: 'intersect' as const,
				WebkitMaskComposite: 'source-in' as const,
			}
		})()

		const thumbA11yProps = {
			role: 'scrollbar' as const,
			'aria-orientation': axis.ariaOrientation,
			'aria-controls': contentId,
			'aria-valuemin': 0,
			'aria-valuemax': 100,
			'aria-valuenow': scrollValue,
			'aria-label': axis.ariaLabel,
			tabIndex: isScrollable ? 0 : -1,
			onKeyDown: handleThumbKeyDown,
			onPointerDown: handleThumbPointerDown,
			onPointerMove: handleThumbPointerMove,
			onPointerUp: handleThumbPointerUp,
			onPointerCancel: handleThumbPointerUp,
		}

		const trackThicknessStyle = isVertical
			? { width: barUnit }
			: { height: barUnit }

		const thumbBoxStyle = isVertical
			? {
					minHeight: '10%',
					height: `${thumbSize}${units}`,
					width: `${thumbWidth || barWidth}${units}`,
					maxWidth: barUnit,
				}
			: {
					minWidth: '10%',
					width: `${thumbSize}${units}`,
					height: `${thumbWidth || barWidth}${units}`,
					maxHeight: barUnit,
				}

		return (
			<div
				{...rest}
				ref={wrapperRef}
				className={[
					'scrollbar_wrapper',
					!isVertical ? 'scrollbar_wrapper--horizontal' : null,
					overlay ? 'scrollbar_wrapper--overlay' : null,
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={{
					...restStyle,
					gridTemplate,
					gap: reserveBarTrack ? gap : 0,
				}}
			>
				<article
					id={contentId}
					className='scrollbar_content'
					ref={contentRef}
					style={{
						...contentPadStyle,
						order: contentOrder,
						...contentSizeStyle,
						...maskStyles,
					}}
				>
					{children}
				</article>
				<div
					className='scrollbar'
					style={{
						order: barOrder,
						borderRadius: `${barRadius}${units}`,
						boxShadow: `${barShadow}`,
						display: !isScrollable || (!showBar && !overlay) ? 'none' : 'block',
						opacity: showBar ? 1 : 0,
						pointerEvents: showBar ? 'auto' : 'none',
						transition: `opacity ${barTransition}s ease`,
						...(overlay ? trackThicknessStyle : undefined),
						...barSideStyle,
					}}
				>
					<div
						className='scrollbar_track_and_thumb'
						style={trackThicknessStyle}
					>
						<div
							className='scrollbar_track'
							ref={scrollTrackRef}
							onClick={handleTrackClick}
							style={{
								cursor: isDragging ? 'grabbing' : 'pointer',
								...trackThicknessStyle,
								background: `${barColor}`,
								borderRadius: `${barRadius}${units}`,
								['--bar-hover-color' as string]: barHoverColor || barColor,
								['--bar-border-width' as string]: `-${barBorderWidth}${units}`,
								['--bar-border-color' as string]: barBorderColor,
							}}
						></div>
						{thumbImage ? (
							<div
								{...thumbA11yProps}
								ref={scrollThumbRef}
								className='scrollbar_thumb_image'
								style={{
									width: `${thumbImageWidth}${units}`,
									height: `${thumbImageHeight}${units}`,
									cursor: isDragging ? 'grabbing' : 'grab',
									transition: `all ${thumbTransition}s ease`,
									touchAction: 'none',
								}}
							>
								<img src={thumbImage} alt='' aria-hidden />
							</div>
						) : (
							<div
								{...thumbA11yProps}
								className='scrollbar_thumb'
								ref={scrollThumbRef}
								style={{
									boxShadow: `${thumbShadow}`,
									...thumbBoxStyle,
									cursor: isDragging ? 'grabbing' : 'grab',
									background: `${thumbColor}`,
									borderRadius: `${thumbRadius || barRadius}${units}`,
									['--thumb-hover-color' as string]:
										thumbHoverColor || thumbColor,
									transition: `all ${thumbTransition}s ease`,
									touchAction: 'none',
								}}
							></div>
						)}
					</div>
				</div>
			</div>
		)
	},
)

Scrollbar.displayName = 'Scrollbar'
