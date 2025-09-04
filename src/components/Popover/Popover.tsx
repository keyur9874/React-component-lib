import React, { forwardRef, useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { usePopover } from '../../hooks/usePopover';
import { popoverService } from '../../services/popoverService';
import './Popover.css';

export interface PopoverProps {
  /** Content of the popover */
  content: React.ReactNode;
  /** Title of the popover */
  title?: React.ReactNode;
  /** Trigger element */
  children: React.ReactElement;
  /** Placement of the popover */
  placement?: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom';
  /** Trigger mode */
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | Array<string>;
  /** Whether the popover is open */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Mouse enter delay in seconds */
  mouseEnterDelay?: number;
  /** Mouse leave delay in seconds */
  mouseLeaveDelay?: number;
  /** Whether to show arrow */
  arrow?: boolean | { pointAtCenter: boolean };
  /** Whether to auto adjust overflow */
  autoAdjustOverflow?: boolean;
  /** Background color */
  color?: string;
  /** Whether to destroy on hidden */
  destroyOnHidden?: boolean;
  /** Whether to keep content fresh */
  fresh?: boolean;
  /** Get popup container */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** Z-index */
  zIndex?: number;
  /** Additional className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Overlay className */
  overlayClassName?: string;
  /** Overlay style */
  overlayStyle?: React.CSSProperties;
  /** Align config */
  align?: {
    points?: [string, string];
    offset?: [number, number];
    targetOffset?: [number, number];
    overflow?: { adjustX?: boolean; adjustY?: boolean };
    useCssRight?: boolean;
    useCssBottom?: boolean;
    useCssTransform?: boolean;
  };
}

export const Popover = forwardRef<HTMLElement, PopoverProps>(({
  content,
  title,
  children,
  placement = 'top',
  trigger = 'hover',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  mouseEnterDelay = 0.1,
  mouseLeaveDelay = 0.1,
  arrow = true,
  autoAdjustOverflow = true,
  color,
  destroyOnHidden = false,
  fresh = false,
  getPopupContainer,
  zIndex,
  className = '',
  style,
  overlayClassName = '',
  overlayStyle,
  align,
  ...props
}, ref) => {
  const popoverId = useId();
  const containerRef = useRef<HTMLElement | null>(null);

  const {
    isOpen,
    position,
    triggerRef,
    popoverRef,
    setOpen,
    triggerProps,
    popoverProps,
  } = usePopover({
    placement,
    trigger,
    mouseEnterDelay,
    mouseLeaveDelay,
    autoAdjustOverflow,
    defaultOpen,
    open: controlledOpen,
    onOpenChange,
    arrow,
  });

  // Register/unregister popover
  useEffect(() => {
    popoverService.registerPopover(popoverId);
    return () => {
      popoverService.unregisterPopover(popoverId);
    };
  }, [popoverId]);

  // Set up container
  useEffect(() => {
    if (triggerRef.current) {
      const container = getPopupContainer 
        ? getPopupContainer(triggerRef.current)
        : popoverService.createPopupContainer(triggerRef.current);
      containerRef.current = container;
    }
  }, [getPopupContainer]);

  // Clone trigger element with event handlers
  const triggerElement = React.cloneElement(children, {
    ...triggerProps,
    ref: (node: HTMLElement) => {
      triggerRef.current = node;
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          ref.current = node;
        }
      }
      // Handle original ref
      const originalRef = (children as any).ref;
      if (originalRef) {
        if (typeof originalRef === 'function') {
          originalRef(node);
        } else {
          originalRef.current = node;
        }
      }
    },
  });

  // Don't render popover if not open and destroyOnHidden is true
  if (!isOpen && destroyOnHidden) {
    return triggerElement;
  }

  // Build class names
  const showArrow = arrow !== false;
  const pointAtCenter = typeof arrow === 'object' && arrow.pointAtCenter;

  const popoverClasses = [
    'ui-popover',
    `ui-popover--${position.placement}`,
    !showArrow && 'ui-popover--no-arrow',
    pointAtCenter && 'ui-popover--point-at-center',
    color && 'ui-popover--custom-color',
    className,
  ].filter(Boolean).join(' ');

  const finalZIndex = zIndex || popoverService.getNextZIndex();

  const popoverStyle: React.CSSProperties = {
    ...style,
    top: position.top,
    left: position.left,
    zIndex: finalZIndex,
    ...(color && { '--popover-bg-color': color } as any),
  };

  const popoverContent = (
    <>
      {/* Overlay for click outside detection */}
      {isOpen && trigger === 'click' && (
        <div 
          className={`ui-popover-overlay ${isOpen ? 'ui-popover-overlay--visible' : ''}`}
          style={{ zIndex: finalZIndex - 1, ...overlayStyle }}
        />
      )}
      
      {/* Popover */}
      <div
        {...props}
        ref={popoverRef}
        className={popoverClasses}
        style={popoverStyle}
        role="tooltip"
        aria-hidden={!isOpen}
        {...popoverProps}
      >
        <div className="ui-popover-content">
          {/* Arrow */}
          {showArrow && (
            <div className="ui-popover-arrow" />
          )}
          
          {/* Title */}
          {title && (
            <div className="ui-popover-title">
              {title}
            </div>
          )}
          
          {/* Content */}
          <div className="ui-popover-inner">
            <div className="ui-popover-inner-content">
              {fresh || isOpen ? content : content}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {triggerElement}
      {(isOpen || !destroyOnHidden) && containerRef.current && 
        createPortal(popoverContent, containerRef.current)
      }
    </>
  );
});

Popover.displayName = 'Popover';