import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  zIndex = 1030,
  className = '',
  style,
  overlayClassName = '',
  overlayStyle,
  ...props
}, ref) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [actualPlacement, setActualPlacement] = useState(placement);
  
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLElement>(null);
  const enterTimerRef = useRef<NodeJS.Timeout>();
  const leaveTimerRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLElement | null>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const setOpen = useCallback((open: boolean) => {
    if (!isControlled) {
      setInternalOpen(open);
    }
    onOpenChange?.(open);
  }, [isControlled, onOpenChange]);

  // Calculate position
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewport = { width: window.innerWidth, height: window.innerHeight };

    let finalPlacement = placement;
    let top = 0;
    let left = 0;

    // Calculate base position
    switch (placement) {
      case 'top':
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'topLeft':
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.left;
        break;
      case 'topRight':
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.right - popoverRect.width;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'bottomLeft':
        top = triggerRect.bottom + 8;
        left = triggerRect.left;
        break;
      case 'bottomRight':
        top = triggerRect.bottom + 8;
        left = triggerRect.right - popoverRect.width;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.left - popoverRect.width - 8;
        break;
      case 'leftTop':
        top = triggerRect.top;
        left = triggerRect.left - popoverRect.width - 8;
        break;
      case 'leftBottom':
        top = triggerRect.bottom - popoverRect.height;
        left = triggerRect.left - popoverRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.right + 8;
        break;
      case 'rightTop':
        top = triggerRect.top;
        left = triggerRect.right + 8;
        break;
      case 'rightBottom':
        top = triggerRect.bottom - popoverRect.height;
        left = triggerRect.right + 8;
        break;
    }

    // Auto-adjust if overflow
    if (autoAdjustOverflow) {
      if (left < 8) {
        left = 8;
      } else if (left + popoverRect.width > viewport.width - 8) {
        left = viewport.width - popoverRect.width - 8;
      }

      if (top < 8) {
        if (placement.startsWith('top') && triggerRect.bottom + popoverRect.height + 16 < viewport.height) {
          top = triggerRect.bottom + 8;
          finalPlacement = placement.replace('top', 'bottom') as typeof placement;
        } else {
          top = 8;
        }
      } else if (top + popoverRect.height > viewport.height - 8) {
        if (placement.startsWith('bottom') && triggerRect.top - popoverRect.height - 16 > 0) {
          top = triggerRect.top - popoverRect.height - 8;
          finalPlacement = placement.replace('bottom', 'top') as typeof placement;
        } else {
          top = viewport.height - popoverRect.height - 8;
        }
      }
    }

    setPosition({ top, left });
    setActualPlacement(finalPlacement);
  }, [placement, autoAdjustOverflow]);

  // Event handlers
  const handleMouseEnter = useCallback(() => {
    if (!triggers.includes('hover')) return;
    
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = undefined;
    }

    enterTimerRef.current = setTimeout(() => {
      setOpen(true);
    }, mouseEnterDelay * 1000);
  }, [triggers, mouseEnterDelay, setOpen]);

  const handleMouseLeave = useCallback(() => {
    if (!triggers.includes('hover')) return;
    
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = undefined;
    }

    leaveTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, mouseLeaveDelay * 1000);
  }, [triggers, mouseLeaveDelay, setOpen]);

  const handleClick = useCallback(() => {
    if (!triggers.includes('click')) return;
    setOpen(!isOpen);
  }, [triggers, isOpen, setOpen]);

  const handleFocus = useCallback(() => {
    if (!triggers.includes('focus')) return;
    setOpen(true);
  }, [triggers, setOpen]);

  const handleBlur = useCallback(() => {
    if (!triggers.includes('focus')) return;
    setOpen(false);
  }, [triggers, setOpen]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (!triggers.includes('contextMenu')) return;
    e.preventDefault();
    setOpen(true);
  }, [triggers, setOpen]);

  // Set up container
  useEffect(() => {
    if (triggerRef.current) {
      const container = getPopupContainer 
        ? getPopupContainer(triggerRef.current)
        : document.body;
      containerRef.current = container;
    }
  }, [getPopupContainer]);

  // Calculate position when open
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(calculatePosition, 0);
      
      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen, calculatePosition]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen || !triggers.includes('click')) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        popoverRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, triggers, setOpen]);

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, setOpen]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  // Clone trigger element with event handlers
  const triggerElement = React.cloneElement(children, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onContextMenu: handleContextMenu,
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
    `ui-popover--${actualPlacement}`,
    !showArrow && 'ui-popover--no-arrow',
    pointAtCenter && 'ui-popover--point-at-center',
    color && 'ui-popover--custom-color',
    className,
  ].filter(Boolean).join(' ');

  const popoverStyle: React.CSSProperties = {
    ...style,
    top: position.top,
    left: position.left,
    zIndex,
    ...(color && { '--popover-bg-color': color } as any),
  };

  const popoverContent = (
    <>
      {/* Overlay for click outside detection */}
      {isOpen && triggers.includes('click') && (
        <div 
          className={`ui-popover-overlay ${isOpen ? 'ui-popover-overlay--visible' : ''}`}
          style={{ zIndex: zIndex - 1, ...overlayStyle }}
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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