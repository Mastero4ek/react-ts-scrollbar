import React, { useCallback, useEffect, useRef, useState } from 'react'

import { ScrollbarProps } from '../types/scrollbar'
import { injectStyles } from './styles'

export const Scrollbar = ({ children, ...props }: ScrollbarProps) => {
	const {
		style,
		keepItBottom = false,
		units = 'px',
		barShadow = 'none',
		thumbShadow = 'none',
		barColor = '#87ceeb',
		thumbColor = 'rgba(0, 0, 0, 0.5)',
		barBorderColor = 'transparent',
		contentHeight = 300,
		barBorderWidth = 0,
		contentPadding = 10,
		barWidth = 12,
		barRadius = 10,
		thumbRadius,
		thumbWidth,
		barHoverColor,
		thumbHoverColor,
	} = props

	// Refs
	const contentRef = useRef<HTMLDivElement>(null)
	const scrollTrackRef = useRef<HTMLDivElement>(null)
	const scrollThumbRef = useRef<HTMLDivElement>(null)
	const observer = useRef<ResizeObserver | null>(null)
	const mutationObserver = useRef<MutationObserver | null>(null)

	// States
	const [initialScrollTop, setInitialScrollTop] = useState<number>(0)
	const [isDragging, setIsDragging] = useState<boolean>(false)
	const [isScrollable, setIsScrollable] = useState<boolean>(true)
	const [thumbHeight, setThumbHeight] = useState<number>(20)
	const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(
		null
	)

	// Handle the resize of the track
	const handleResize = (ref: HTMLDivElement, trackSize: number) => {
		const { clientHeight, scrollHeight } = ref
		const minThumbHeight = 20
		const maxThumbHeight = trackSize
		const newThumbHeight = Math.min(
			Math.max((clientHeight / scrollHeight) * trackSize, minThumbHeight),
			maxThumbHeight
		)

		setThumbHeight(newThumbHeight)

		const shouldBeScrollable = scrollHeight !== clientHeight

		setIsScrollable(shouldBeScrollable)
	}

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
			scrollHeight: contentHeight,
			clientHeight: contentClientHeight,
		} = contentRef.current

		const scrollableDistance = contentHeight - contentClientHeight

		if (scrollableDistance <= 0) return

		const scrollPercentage = (contentTop / scrollableDistance) * 100
		const topValue = Math.max(0, Math.min(scrollPercentage, 100))

		const thumb = scrollThumbRef.current

		thumb.style.top = `${topValue}%`
		thumb.style.transform = `translateX(-50%) translateY(-${topValue}%)`
	}, [])

	// Start dragging the thumb
	const handleThumbMousedown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.preventDefault()
			e.stopPropagation()

			setScrollStartPosition(e.clientY)

			if (contentRef.current) {
				setInitialScrollTop(contentRef.current.scrollTop)
			}

			setIsDragging(true)
		},
		[]
	)

	// Stop dragging the thumb
	const handleThumbMouseup = useCallback((e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		setIsDragging(false)
	}, [])

	// Drag the thumb
	const handleThumbMousemove = useCallback(
		(e: MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()

			if (isDragging && contentRef.current && scrollStartPosition !== null) {
				const {
					scrollHeight: contentScrollHeight,
					clientHeight: contentClientHeight,
				} = contentRef.current

				const scrollableDistance = contentScrollHeight - contentClientHeight

				if (scrollableDistance <= 0) return

				const trackHeight = scrollTrackRef.current?.clientHeight || 0
				const deltaY = e.clientY - scrollStartPosition
				const scrollPercentage = (deltaY / trackHeight) * 100
				const newScrollTop = Math.min(
					Math.max(
						0,
						initialScrollTop + (scrollPercentage / 100) * scrollableDistance
					),
					scrollableDistance
				)

				contentRef.current.scrollTop = newScrollTop
			}
		},
		[isDragging, scrollStartPosition, initialScrollTop]
	)

	// Inject styles when component mounts
	useEffect(() => {
		injectStyles()
	}, [])

	// Handle content changes
	useEffect(() => {
		if (keepItBottom && contentRef.current) {
			mutationObserver.current = new MutationObserver(() => {
				scrollToBottom()
			})

			mutationObserver.current.observe(contentRef.current, {
				childList: true,
				subtree: true,
				characterData: true,
			})

			return () => {
				mutationObserver.current?.disconnect()
			}
		}
	}, [keepItBottom, scrollToBottom])

	// Resize the track
	useEffect(() => {
		if (contentRef.current && scrollTrackRef.current) {
			const ref = contentRef.current
			const { clientHeight: trackSize } = scrollTrackRef.current

			observer.current = new ResizeObserver(() => {
				handleResize(ref, trackSize)
			})
			observer.current.observe(ref)
			ref.addEventListener('scroll', handleThumbPosition)

			return () => {
				observer.current?.unobserve(ref)
				ref.removeEventListener('scroll', handleThumbPosition)
			}
		}
	}, [])

	// Handle mouse events
	useEffect(() => {
		document.addEventListener('mousemove', handleThumbMousemove)
		document.addEventListener('mouseup', handleThumbMouseup)
		document.addEventListener('mouseleave', handleThumbMouseup)

		return () => {
			document.removeEventListener('mousemove', handleThumbMousemove)
			document.removeEventListener('mouseup', handleThumbMouseup)
			document.removeEventListener('mouseleave', handleThumbMouseup)
		}
	}, [handleThumbMousemove, handleThumbMouseup])

	return (
		<div
			className='scrollbar_wrapper'
			style={{
				gridTemplate: `auto / 1fr ${barWidth}${units}`,
				...style,
			}}
		>
			<article
				className='scrollbar_content'
				ref={contentRef}
				style={{
					paddingRight: `${contentPadding}${units}`,
					height: `${contentHeight}${units}`,
				}}
			>
				{children}
			</article>

			{isScrollable && (
				<div
					className='scrollbar'
					style={{
						borderRadius: `${barRadius}${units}`,
						boxShadow: `${barShadow}`,
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

						<div
							className='scrollbar_thumb'
							ref={scrollThumbRef}
							onMouseDown={handleThumbMousedown}
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
							}}
						></div>
					</div>
				</div>
			)}
		</div>
	)
}
