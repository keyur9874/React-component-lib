import React, { forwardRef, useState, useRef, useImperativeHandle, useEffect } from 'react';
import './Input.css';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'filled' | 'borderless';
  status?: 'error' | 'warning' | 'success';
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  showCount?: boolean;
  allowClear?: boolean;
  onPressEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onResize?: (size: { width: number; height: number }) => void;
  onClear?: () => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  size = 'medium',
  variant = 'outlined',
  status,
  autoSize = false,
  showCount = false,
  allowClear = false,
  disabled = false,
  className = '',
  style,
  value,
  defaultValue,
  maxLength,
  onChange,
  onPressEnter,
  onResize,
  onClear,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [textareaHeight, setTextareaHeight] = useState<number | undefined>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textareaRef.current!);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Auto resize functionality
  const calculateHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea || !autoSize) return;

    const minRows = typeof autoSize === 'object' ? autoSize.minRows : undefined;
    const maxRows = typeof autoSize === 'object' ? autoSize.maxRows : undefined;

    // Reset height to calculate scroll height
    textarea.style.height = 'auto';
    
    const scrollHeight = textarea.scrollHeight;
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
    
    let newHeight = scrollHeight;

    if (minRows && lineHeight) {
      const minHeight = minRows * lineHeight + 8; // 8px for padding
      newHeight = Math.max(newHeight, minHeight);
    }

    if (maxRows && lineHeight) {
      const maxHeight = maxRows * lineHeight + 8; // 8px for padding
      newHeight = Math.min(newHeight, maxHeight);
    }

    setTextareaHeight(newHeight);
    onResize?.({ width: textarea.offsetWidth, height: newHeight });
  };

  // Effect for auto-resize
  useEffect(() => {
    if (autoSize) {
      calculateHeight();
    }
  }, [currentValue, autoSize]);

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(e);
    
    if (autoSize) {
      // Delay calculation to ensure DOM is updated
      setTimeout(calculateHeight, 0);
    }
  };

  // Handle key down
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      onPressEnter?.(e);
    }
    props.onKeyDown?.(e);
  };

  // Handle clear
  const handleClear = () => {
    const event = {
      target: { value: '' },
      currentTarget: { value: '' },
    } as React.ChangeEvent<HTMLTextAreaElement>;

    if (!isControlled) {
      setInternalValue('');
    }
    
    onChange?.(event);
    onClear?.();
    textareaRef.current?.focus();
  };

  // Build class names
  const baseClass = 'ui-textarea ui-input';
  const sizeClass = `ui-input--${size}`;
  const variantClass = `ui-input--${variant}`;
  const statusClass = status ? `ui-input--${status}` : '';
  const disabledClass = disabled ? 'ui-input--disabled' : '';
  const autoSizeClass = autoSize ? 'ui-textarea--auto-size' : '';

  const classes = [baseClass, sizeClass, variantClass, statusClass, disabledClass, autoSizeClass, className]
    .filter(Boolean)
    .join(' ');

  // Show clear button
  const showClearButton = allowClear && currentValue && !disabled;

  // Show count
  const showCountDisplay = showCount && maxLength;
  const currentLength = String(currentValue || '').length;

  // Calculate textarea style
  const textareaStyle = {
    ...style,
    ...(autoSize && textareaHeight ? { height: textareaHeight } : {}),
  };

  return (
    <div className="ui-textarea-wrapper" style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <textarea
        {...props}
        ref={textareaRef}
        className={classes}
        style={textareaStyle}
        value={currentValue}
        disabled={disabled}
        maxLength={maxLength}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      
      {/* Clear button and count display */}
      {(showClearButton || showCountDisplay) && (
        <div className="ui-textarea-controls">
          {showClearButton && (
            <span 
              className="ui-textarea-clear"
              onClick={handleClear}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 4.586L10.293.293a1 1 0 111.414 1.414L7.414 6l4.293 4.293a1 1 0 01-1.414 1.414L6 7.414l-4.293 4.293a1 1 0 01-1.414-1.414L4.586 6 .293 1.707A1 1 0 011.707.293L6 4.586z"/>
              </svg>
            </span>
          )}
          
          {showCountDisplay && (
            <span 
              className={`ui-textarea-count ${currentLength > maxLength! ? 'ui-textarea-count--error' : ''}`}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
});