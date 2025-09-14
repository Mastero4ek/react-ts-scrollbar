import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState, } from 'react';
import { injectStyles } from './styles';
export const Scrollbar = ({ children, ...props }) => {
    const { style, units = 'px', contentHeight = 300, contentPadding = 10, keepItBottom = false, barColor = '#87ceeb', barHoverColor, barWidth = 12, barRadius = 10, barShadow = 'none', barBorderColor = 'transparent', barBorderWidth = 0, barTransition = 0, thumbColor = 'rgba(0, 0, 0, 0.5)', thumbHoverColor, thumbWidth, thumbRadius, thumbShadow = 'none', thumbTransition = 0, thumbImage = null, thumbImageWidth = 10, thumbImageHeight = 10, mask = false, maskSize = 20, onScrollTop, onScrollBottom, } = props;
    // Refs
    const contentRef = useRef(null);
    const scrollTrackRef = useRef(null);
    const scrollThumbRef = useRef(null);
    const observer = useRef(null);
    const mutationObserver = useRef(null);
    // States
    const [isTop, setIsTop] = useState(false);
    const [isBottom, setIsBottom] = useState(false);
    const [initialScrollTop, setInitialScrollTop] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isScrollable, setIsScrollable] = useState(true);
    const [thumbHeight, setThumbHeight] = useState(20);
    const [scrollStartPosition, setScrollStartPosition] = useState(null);
    // Handle scroll position and trigger callbacks
    const handleScroll = useCallback(() => {
        if (!contentRef.current)
            return;
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const isAtTop = scrollTop === 0;
        const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
        setIsTop(isAtTop);
        setIsBottom(isAtBottom);
        if (isAtTop && onScrollTop) {
            onScrollTop();
        }
        if (isAtBottom && onScrollBottom) {
            onScrollBottom();
        }
    }, [onScrollTop, onScrollBottom]);
    // Handle the resize of the track
    const handleResize = (ref, trackSize) => {
        const { clientHeight, scrollHeight } = ref;
        const minThumbHeight = 20;
        const maxThumbHeight = trackSize;
        const newThumbHeight = Math.min(Math.max((clientHeight / scrollHeight) * trackSize, minThumbHeight), maxThumbHeight);
        setThumbHeight(newThumbHeight);
        const shouldBeScrollable = scrollHeight > clientHeight + 1;
        setIsScrollable(shouldBeScrollable);
    };
    // Scroll to bottom
    const scrollToBottom = useCallback(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, []);
    // Click on the track to scroll
    const handleTrackClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const { current: trackCurrent } = scrollTrackRef;
        const { current: contentCurrent } = contentRef;
        if (trackCurrent && contentCurrent) {
            const { clientY } = e;
            const target = e.target;
            const rect = target.getBoundingClientRect();
            const trackTop = rect.top;
            const clickRatio = (clientY - trackTop) / trackCurrent.clientHeight;
            const scrollAmount = Math.floor(clickRatio *
                (contentCurrent.scrollHeight - contentCurrent.clientHeight));
            contentCurrent.scrollTo({
                top: scrollAmount,
                behavior: 'smooth',
            });
        }
    }, []);
    // Update the thumb position
    const handleThumbPosition = useCallback(() => {
        if (!contentRef.current ||
            !scrollTrackRef.current ||
            !scrollThumbRef.current) {
            return;
        }
        const { scrollTop: contentTop, scrollHeight: contentHeight, clientHeight: contentClientHeight, } = contentRef.current;
        const scrollableDistance = contentHeight - contentClientHeight;
        if (scrollableDistance <= 0)
            return;
        const scrollPercentage = (contentTop / scrollableDistance) * 100;
        const topValue = Math.max(0, Math.min(scrollPercentage, 100));
        const thumb = scrollThumbRef.current;
        thumb.style.top = `${topValue}%`;
        thumb.style.transform = `translateX(-50%) translateY(-${topValue}%)`;
    }, []);
    // Start dragging the thumb
    const handleThumbMousedown = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setScrollStartPosition(e.clientY);
        if (contentRef.current) {
            setInitialScrollTop(contentRef.current.scrollTop);
        }
        setIsDragging(true);
    }, []);
    // Stop dragging the thumb
    const handleThumbMouseup = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);
    // Drag the thumb
    const handleThumbMousemove = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDragging && contentRef.current && scrollStartPosition !== null) {
            const { scrollHeight: contentScrollHeight, clientHeight: contentClientHeight, } = contentRef.current;
            const scrollableDistance = contentScrollHeight - contentClientHeight;
            if (scrollableDistance <= 0)
                return;
            const trackHeight = scrollTrackRef.current?.clientHeight || 0;
            const deltaY = e.clientY - scrollStartPosition;
            const scrollPercentage = (deltaY / trackHeight) * 100;
            const newScrollTop = Math.min(Math.max(0, initialScrollTop + (scrollPercentage / 100) * scrollableDistance), scrollableDistance);
            contentRef.current.scrollTop = newScrollTop;
        }
    }, [isDragging, scrollStartPosition, initialScrollTop]);
    // Inject styles when component mounts
    useEffect(() => {
        injectStyles();
    }, []);
    // Handle keepItBottom functionality
    useEffect(() => {
        if (contentRef.current && keepItBottom) {
            const observer = new MutationObserver(() => {
                requestAnimationFrame(() => {
                    scrollToBottom();
                });
            });
            const resizeObserver = new ResizeObserver(() => {
                requestAnimationFrame(() => {
                    scrollToBottom();
                });
            });
            observer.observe(contentRef.current, {
                attributes: true,
                attributeFilter: ['style', 'class', 'height'],
                subtree: false,
                childList: false,
                characterData: false,
            });
            observer.observe(contentRef.current, {
                childList: true,
                subtree: true,
                attributes: false,
                characterData: false,
            });
            resizeObserver.observe(contentRef.current);
            return () => {
                observer.disconnect();
                resizeObserver.disconnect();
            };
        }
    }, [keepItBottom, scrollToBottom]);
    // Handle content changes and resize observations
    useEffect(() => {
        if (contentRef.current) {
            mutationObserver.current = new MutationObserver(() => {
                requestAnimationFrame(() => {
                    if (scrollTrackRef.current && contentRef.current) {
                        handleResize(contentRef.current, scrollTrackRef.current.clientHeight);
                        handleThumbPosition();
                    }
                });
            });
            mutationObserver.current.observe(contentRef.current, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true,
                attributeFilter: ['style', 'class', 'height', 'width'],
            });
            observer.current = new ResizeObserver(() => {
                requestAnimationFrame(() => {
                    if (scrollTrackRef.current && contentRef.current) {
                        handleResize(contentRef.current, scrollTrackRef.current.clientHeight);
                        handleThumbPosition();
                    }
                });
            });
            observer.current.observe(contentRef.current);
            return () => {
                mutationObserver.current?.disconnect();
                observer.current?.disconnect();
            };
        }
    }, [handleResize, handleThumbPosition]);
    // Handle scroll events
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.addEventListener('scroll', handleThumbPosition);
            contentRef.current.addEventListener('scroll', handleScroll);
            return () => {
                contentRef.current?.removeEventListener('scroll', handleThumbPosition);
                contentRef.current?.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll, handleThumbPosition]);
    // Handle mouse events
    useEffect(() => {
        document.addEventListener('mousemove', handleThumbMousemove);
        document.addEventListener('mouseup', handleThumbMouseup);
        document.addEventListener('mouseleave', handleThumbMouseup);
        return () => {
            document.removeEventListener('mousemove', handleThumbMousemove);
            document.removeEventListener('mouseup', handleThumbMouseup);
            document.removeEventListener('mouseleave', handleThumbMouseup);
        };
    }, [handleThumbMousemove, handleThumbMouseup]);
    return (_jsxs("div", { className: 'scrollbar_wrapper', style: {
            gridTemplate: `auto / 1fr ${barWidth}${units}`,
            ...style,
        }, children: [_jsx("article", { className: 'scrollbar_content', ref: contentRef, style: {
                    paddingRight: `${contentPadding}${units}`,
                    height: `${contentHeight}${units}`,
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
                }, children: children }), _jsx("div", { className: 'scrollbar', style: {
                    borderRadius: `${barRadius}${units}`,
                    boxShadow: `${barShadow}`,
                    display: isScrollable ? 'block' : 'none',
                    animation: `fadeIn ${barTransition}s forwards`,
                }, children: _jsxs("div", { className: 'scrollbar_track_and_thumb', style: {
                        width: `${barWidth}${units}`,
                    }, children: [_jsx("div", { className: 'scrollbar_track', ref: scrollTrackRef, onClick: handleTrackClick, style: {
                                cursor: isDragging ? 'grabbing' : 'pointer',
                                width: `${barWidth}${units}`,
                                background: `${barColor}`,
                                borderRadius: `${barRadius}${units}`,
                                ['--bar-hover-color']: barHoverColor || barColor,
                                ['--bar-border-width']: `-${barBorderWidth}${units}`,
                                ['--bar-border-color']: barBorderColor,
                            } }), thumbImage ? (_jsx("div", { ref: scrollThumbRef, onMouseDown: handleThumbMousedown, className: 'scrollbar_thumb_image', style: {
                                width: `${thumbImageWidth}${units}`,
                                height: `${thumbImageHeight}${units}`,
                                cursor: isDragging ? 'grabbing' : 'grab',
                                transition: `all ${thumbTransition}s ease`,
                            }, children: _jsx("img", { src: thumbImage, alt: 'thumb' }) })) : (_jsx("div", { className: 'scrollbar_thumb', ref: scrollThumbRef, onMouseDown: handleThumbMousedown, style: {
                                boxShadow: `${thumbShadow}`,
                                minHeight: `10%`,
                                height: `${thumbHeight}${units}`,
                                cursor: isDragging ? 'grabbing' : 'grab',
                                background: `${thumbColor}`,
                                borderRadius: `${thumbRadius || barRadius}${units}`,
                                width: `${thumbWidth || barWidth}${units}`,
                                maxWidth: `${barWidth}${units}`,
                                ['--thumb-hover-color']: thumbHoverColor || thumbColor,
                                transition: `all ${thumbTransition}s ease`,
                            } }))] }) })] }));
};
