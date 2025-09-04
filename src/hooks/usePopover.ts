import { useState, useRef, useEffect, useCallback } from 'react';

export interface PopoverPosition {
  top: number;
  left: number;
  placement: string;
}

export interface UsePopoverOptions {
  placement?: string;
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | Array<string>;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  autoAdjustOverflow?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  arrow?: boolean | { pointAtCenter: boolean };
}

export const usePopover = (options: UsePopoverOptions = {}) => {
  const {
    placement = 'top',
    trigger = 'hover',
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    autoAdjustOverflow = true,
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    arrow = true,
  } = options;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [position, setPosition] = useState<PopoverPosition>({ top: 0, left: 0, placement });
  
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLElement>(null);
  const enterTimerRef = useRef<NodeJS.Timeout>();
  const leaveTimerRef = useRef<NodeJS.Timeout>();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const setOpen = useCallback((open: boolean) => {
    if (!isControlled) {
      setInternalOpen(open);
    }
    onOpenChange?.(open);
  }, [isControlled, onOpenChange]);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

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

    // Auto-adjust if overflow and autoAdjustOverflow is enabled
    if (autoAdjustOverflow) {
      // Check if popover goes outside viewport and adjust
      if (left < 8) {
        left = 8;
      } else if (left + popoverRect.width > viewport.width - 8) {
        left = viewport.width - popoverRect.width - 8;
      }

      if (top < 8) {
        // Flip to bottom if there's more space
        if (placement.startsWith('top') && triggerRect.bottom + popoverRect.height + 16 < viewport.height) {
          top = triggerRect.bottom + 8;
          finalPlacement = placement.replace('top', 'bottom');
        } else {
          top = 8;
        }
      } else if (top + popoverRect.height > viewport.height - 8) {
        // Flip to top if there's more space
        if (placement.startsWith('bottom') && triggerRect.top - popoverRect.height - 16 > 0) {
          top = triggerRect.top - popoverRect.height - 8;
          finalPlacement = placement.replace('bottom', 'top');
        } else {
          top = viewport.height - popoverRect.height - 8;
        }
      }
    }

    setPosition({ top, left, placement: finalPlacement });
  }, [placement, autoAdjustOverflow]);

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

  // Calculate position when open
  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      
      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);
      
      return () => {
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
      if (enterTimerRef.current) {
        clearTimeout(enterTimerRef.current);
      }
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
      }
    };
  }, []);

  return {
    isOpen,
    position,
    triggerRef,
    popoverRef,
    setOpen,
    triggerProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onContextMenu: handleContextMenu,
    },
    popoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
};