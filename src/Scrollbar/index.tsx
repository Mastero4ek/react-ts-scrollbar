import React, {
	forwardRef,
	useCallback,
	useEffect,
	useId,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import { ScrollbarProps, ScrollbarRef } from '../types/scrollbar'
import { injectStyles } from './styles'

export const Scrollbar = forwardRef<ScrollbarRef, ScrollbarProps>(
	function Scrollbar(
		{
			children,
			className,
			style,
			units = 'px',
			contentHeight = 300,
			contentPadding = 10,
			keepItBottom = false,
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
			...rest
		},
		ref
	) {
		// Refs
		const contentRef = useRef<HTMLDivElement>(null)
		const scrollTrackRef = useRef<HTMLDivElement>(null)
		const scrollThumbRef = useRef<HTMLDivElement>(null)
		const observer = useRef<ResizeObserver | null>(null)
		const mutationObserver = useRef<MutationObserver | null>(null)
		const contentId = useId()
		// States
		const [isTop, setIsTop] = useState<boolean>(false)
		const [isBottom, setIsBottom] = useState<boolean>(false)
		const [isDragging, setIsDragging] = useState<boolean>(false)
		const [isScrollable, setIsScrollable] = useState<boolean>(false)
		const [thumbHeight, setThumbHeight] = useState<number>(20)
		const [scrollValue, setScrollValue] = useState<number>(0)
		const dragRef = useRef<{
			active: boolean
			pointerId: number | null
			startY: number
			initialScrollTop: number
		}>({ active: false, pointerId: null, startY: 0, initialScrollTop: 0 })
		const edgeRef = useRef({ top: false, bottom: false })

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
				get scrollable() {
					const el = contentRef.current
					if (!el) return false
					return el.scrollHeight > el.clientHeight + 1
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
			}),
			[]
		)

		// Handle scroll position and trigger callbacks (edge-triggered)
		const handleScroll = useCallback(() => {
			if (!contentRef.current) return
			const { scrollTop, scrollHeight, clientHeight } = contentRef.current
			const scrollableDistance = scrollHeight - clientHeight
			const isAtTop = scrollTop === 0
			const isAtBottom = Math.abs(scrollableDistance - scrollTop) < 1
			const wasTop = edgeRef.current.top
			const wasBottom = edgeRef.current.bottom

			setIsTop(isAtTop)
			setIsBottom(isAtBottom)
			setScrollValue(
				scrollableDistance <= 0
					? 0
					: Math.round((scrollTop / scrollableDistance) * 100)
			)
			edgeRef.current = { top: isAtTop, bottom: isAtBottom }

			if (isAtTop && !wasTop) {
				onScrollTop?.()
			}
			if (isAtBottom && !wasBottom) {
				onScrollBottom?.()
			}
		}, [onScrollTop, onScrollBottom])
		// Handle the resize of the track
		const handleResize = useCallback(
			(el: HTMLDivElement, trackSize: number) => {
				const { clientHeight, scrollHeight } = el
				const minThumbHeight = 20
				const maxThumbHeight = trackSize
				const newThumbHeight = Math.min(
					Math.max((clientHeight / scrollHeight) * trackSize, minThumbHeight),
					maxThumbHeight
				)
				setThumbHeight(newThumbHeight)
				const shouldBeScrollable = scrollHeight > clientHeight + 1
				setIsScrollable(shouldBeScrollable)
			},
			[]
		)
		// Scroll to bottom
		const scrollToBottom = useCallback(() => {
			if (contentRef.current) {
				contentRef.current.scrollTop = contentRef.current.scrollHeight
			}
		}, [])
		// Click on the track to scroll
		const handleTrackClick = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				e.preventDefault()
				e.stopPropagation()
				const { current: trackCurrent } = scrollTrackRef
				const { current: contentCurrent } = contentRef
				if (trackCurrent && contentCurrent) {
					const { clientY } = e
					const target = e.target as HTMLDivElement
					const rect = target.getBoundingClientRect()
					const trackTop = rect.top
					const clickRatio = (clientY - trackTop) / trackCurrent.clientHeight
					const scrollAmount = Math.floor(
						clickRatio *
							(contentCurrent.scrollHeight - contentCurrent.clientHeight)
					)
					contentCurrent.scrollTo({
						top: scrollAmount,
						behavior: 'smooth',
					})
				}
			},
			[]
		)
		// Update the thumb position
		const handleThumbPosition = useCallback(() => {
			if (
				!contentRef.current ||
				!scrollTrackRef.current ||
				!scrollThumbRef.current
			) {
				return
			}
			const {
				scrollTop: contentTop,
				scrollHeight: contentScrollHeight,
				clientHeight: contentClientHeight,
			} = contentRef.current
			const scrollableDistance = contentScrollHeight - contentClientHeight
			if (scrollableDistance <= 0) return
			const scrollPercentage = (contentTop / scrollableDistance) * 100
			const topValue = Math.max(0, Math.min(scrollPercentage, 100))
			const thumb = scrollThumbRef.current
			thumb.style.top = `${topValue}%`
			thumb.style.transform = `translateX(-50%) translateY(-${topValue}%)`
		}, [])
		// Start dragging the thumb (mouse / touch / pen)
		const handleThumbPointerDown = useCallback(
			(e: React.PointerEvent<HTMLDivElement>) => {
				if (e.pointerType === 'mouse' && e.button !== 0) return
				e.preventDefault()
				e.stopPropagation()
				e.currentTarget.setPointerCapture(e.pointerId)
				dragRef.current = {
					active: true,
					pointerId: e.pointerId,
					startY: e.clientY,
					initialScrollTop: contentRef.current?.scrollTop ?? 0,
				}
				setIsDragging(true)
			},
			[]
		)
		// Drag the thumb
		const handleThumbPointerMove = useCallback(
			(e: React.PointerEvent<HTMLDivElement>) => {
				const drag = dragRef.current
				if (
					!drag.active ||
					drag.pointerId !== e.pointerId ||
					!contentRef.current
				) {
					return
				}
				e.preventDefault()
				e.stopPropagation()
				const {
					scrollHeight: contentScrollHeight,
					clientHeight: contentClientHeight,
				} = contentRef.current
				const scrollableDistance = contentScrollHeight - contentClientHeight
				if (scrollableDistance <= 0) return
				const trackHeight = scrollTrackRef.current?.clientHeight || 0
				const deltaY = e.clientY - drag.startY
				const scrollPercentage = (deltaY / trackHeight) * 100
				const newScrollTop = Math.min(
					Math.max(
						0,
						drag.initialScrollTop +
							(scrollPercentage / 100) * scrollableDistance
					),
					scrollableDistance
				)
				contentRef.current.scrollTop = newScrollTop
			},
			[]
		)
		// Stop dragging the thumb
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
					startY: 0,
					initialScrollTop: 0,
				}
				setIsDragging(false)
			},
			[]
		)
		// Inject styles when component mounts (shared, ref-counted)
		useEffect(() => injectStyles(), [])
		// Initial check for scrollability when component mounts
		useEffect(() => {
			if (contentRef.current && scrollTrackRef.current) {
				handleResize(contentRef.current, scrollTrackRef.current.clientHeight)
				const { scrollTop, scrollHeight, clientHeight } = contentRef.current
				const scrollableDistance = scrollHeight - clientHeight
				const isAtTop = scrollTop === 0
				const isAtBottom = Math.abs(scrollableDistance - scrollTop) < 1
				setIsTop(isAtTop)
				setIsBottom(isAtBottom)
				setScrollValue(
					scrollableDistance <= 0
						? 0
						: Math.round((scrollTop / scrollableDistance) * 100)
				)
				edgeRef.current = { top: isAtTop, bottom: isAtBottom }
			}
		}, [])
		// Handle content changes, resize, and keepItBottom
		useEffect(() => {
			if (!contentRef.current) return

			const sync = () => {
				requestAnimationFrame(() => {
					if (!scrollTrackRef.current || !contentRef.current) return
					handleResize(contentRef.current, scrollTrackRef.current.clientHeight)
					handleThumbPosition()
					if (keepItBottom) {
						scrollToBottom()
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
		}, [handleResize, handleThumbPosition, keepItBottom, scrollToBottom])
		// Handle scroll events
		useEffect(() => {
			if (contentRef.current) {
				contentRef.current.addEventListener('scroll', handleThumbPosition)
				contentRef.current.addEventListener('scroll', handleScroll)
				return () => {
					contentRef.current?.removeEventListener('scroll', handleThumbPosition)
					contentRef.current?.removeEventListener('scroll', handleScroll)
				}
			}
		}, [handleScroll, handleThumbPosition])

		const handleThumbKeyDown = useCallback(
			(e: React.KeyboardEvent<HTMLDivElement>) => {
				if (!contentRef.current || !isScrollable) return
				const el = contentRef.current
				const line = 40
				const page = el.clientHeight * 0.9

				switch (e.key) {
					case 'ArrowUp':
						e.preventDefault()
						el.scrollBy({ top: -line })
						break
					case 'ArrowDown':
						e.preventDefault()
						el.scrollBy({ top: line })
						break
					case 'PageUp':
						e.preventDefault()
						el.scrollBy({ top: -page })
						break
					case 'PageDown':
						e.preventDefault()
						el.scrollBy({ top: page })
						break
					case 'Home':
						e.preventDefault()
						el.scrollTop = 0
						break
					case 'End':
						e.preventDefault()
						el.scrollTop = el.scrollHeight
						break
				}
			},
			[isScrollable]
		)

		const { gap, ...restStyle } = style || {}
		const isLeft = barPosition === 'left'
		const thumbA11yProps = {
			role: 'scrollbar' as const,
			'aria-orientation': 'vertical' as const,
			'aria-controls': contentId,
			'aria-valuemin': 0,
			'aria-valuemax': 100,
			'aria-valuenow': scrollValue,
			'aria-label': 'Vertical scrollbar',
			tabIndex: isScrollable ? 0 : -1,
			onKeyDown: handleThumbKeyDown,
			onPointerDown: handleThumbPointerDown,
			onPointerMove: handleThumbPointerMove,
			onPointerUp: handleThumbPointerUp,
			onPointerCancel: handleThumbPointerUp,
		}

		return (
			<div
				{...rest}
				className={['scrollbar_wrapper', className].filter(Boolean).join(' ')}
				style={{
					...restStyle,
					gridTemplate: isScrollable
						? isLeft
							? `auto / ${barWidth}${units} 1fr`
							: `auto / 1fr ${barWidth}${units}`
						: `auto / 1fr`,
					gap: isScrollable ? gap : 0,
				}}
			>
				<article
					id={contentId}
					className='scrollbar_content'
					ref={contentRef}
					style={{
						paddingRight:
							isScrollable && !isLeft ? `${contentPadding}${units}` : 0,
						paddingLeft:
							isScrollable && isLeft ? `${contentPadding}${units}` : 0,
						order: isLeft ? 2 : 1,
						height: 'auto',
						...(contentHeight > 0 && { maxHeight: `${contentHeight}${units}` }),
						...(mask &&
							isScrollable && {
								maskImage: isTop
									? `linear-gradient(to bottom, black ${maskSize}%, transparent 100%)`
									: isBottom
									? `linear-gradient(to top, black ${maskSize}%, transparent 100%)`
									: `linear-gradient(to bottom, black ${maskSize}%, transparent 100%), linear-gradient(to top, black ${maskSize}%, transparent 100%)`,
								WebkitMaskImage: isTop
									? `linear-gradient(to bottom, black ${maskSize}%, transparent 100%)`
									: isBottom
									? `linear-gradient(to top, black ${maskSize}%, transparent 100%)`
									: `linear-gradient(to bottom, black ${maskSize}%, transparent 100%), linear-gradient(to top, black ${maskSize}%, transparent 100%)`,
								maskComposite: 'intersect',
								WebkitMaskComposite: 'source-in',
							}),
					}}
				>
					{children}
				</article>
				<div
					className='scrollbar'
					style={{
						order: isLeft ? 1 : 2,
						borderRadius: `${barRadius}${units}`,
						boxShadow: `${barShadow}`,
						display: isScrollable ? 'block' : 'none',
						opacity: isScrollable ? 1 : 0,
						transition: `opacity ${barTransition}s ease`,
					}}
				>
					<div
						className='scrollbar_track_and_thumb'
						style={{
							width: `${barWidth}${units}`,
						}}
					>
						<div
							className='scrollbar_track'
							ref={scrollTrackRef}
							onClick={handleTrackClick}
							style={{
								cursor: isDragging ? 'grabbing' : 'pointer',
								width: `${barWidth}${units}`,
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
									minHeight: `10%`,
									height: `${thumbHeight}${units}`,
									cursor: isDragging ? 'grabbing' : 'grab',
									background: `${thumbColor}`,
									borderRadius: `${thumbRadius || barRadius}${units}`,
									width: `${thumbWidth || barWidth}${units}`,
									maxWidth: `${barWidth}${units}`,
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
	}
)

Scrollbar.displayName = 'Scrollbar'
