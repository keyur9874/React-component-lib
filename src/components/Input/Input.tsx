import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'filled' | 'borderless';
  status?: 'error' | 'warning' | 'success';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  allowClear?: boolean;
  showCount?: boolean;
  maxLength?: number;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'medium',
  variant = 'outlined',
  status,
  prefix,
  suffix,
  addonBefore,
  addonAfter,
  allowClear = false,
  showCount = false,
  maxLength,
  disabled = false,
  className = '',
  style,
  value,
  defaultValue,
  onChange,
  onPressEnter,
  onClear,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current!);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter?.(e);
    }
    props.onKeyDown?.(e);
  };

  const handleClear = () => {
    const event = {
      target: { value: '' },
      currentTarget: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;

    if (!isControlled) {
      setInternalValue('');
    }
    
    onChange?.(event);
    onClear?.();
    inputRef.current?.focus();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    props.onBlur?.(e);
  };

  // Build class names
  const baseClass = 'ui-input';
  const sizeClass = `ui-input--${size}`;
  const variantClass = `ui-input--${variant}`;
  const statusClass = status ? `ui-input--${status}` : '';
  const disabledClass = disabled ? 'ui-input--disabled' : '';

  // If we have prefix, suffix, or addons, we need different rendering
  const hasAffixes = prefix || suffix || allowClear || showCount;
  const hasAddons = addonBefore || addonAfter;

  // Show clear button
  const showClearButton = allowClear && currentValue && !disabled;

  // Show count
  const showCountDisplay = showCount && maxLength;
  const currentLength = String(currentValue || '').length;

  // Render clear button
  const renderClearButton = () => {
    if (!showClearButton) return null;
    
    return (
      <span className="ui-input-icon" onClick={handleClear}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 4.586L10.293.293a1 1 0 111.414 1.414L7.414 6l4.293 4.293a1 1 0 01-1.414 1.414L6 7.414l-4.293 4.293a1 1 0 01-1.414-1.414L4.586 6 .293 1.707A1 1 0 011.707.293L6 4.586z"/>
        </svg>
      </span>
    );
  };

  // Render count display
  const renderCountDisplay = () => {
    if (!showCountDisplay) return null;
    
    return (
      <span className="ui-input-count">
        {currentLength}/{maxLength}
      </span>
    );
  };

  // Render basic input
  const renderInput = () => (
    <input
      {...props}
      ref={inputRef}
      value={currentValue}
      disabled={disabled}
      maxLength={maxLength}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );

  // Render with addons (InputGroup style)
  if (hasAddons) {
    const inputClasses = [baseClass, sizeClass, variantClass, statusClass, disabledClass]
      .filter(Boolean)
      .join(' ');

    return (
      <span className={`ui-input-group ui-input-group--${size} ${className}`} style={style}>
        {addonBefore && (
          <span className="ui-input-group-addon">{addonBefore}</span>
        )}
        <input
          {...props}
          ref={inputRef}
          className={inputClasses}
          value={currentValue}
          disabled={disabled}
          maxLength={maxLength}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {addonAfter && (
          <span className="ui-input-group-addon">{addonAfter}</span>
        )}
      </span>
    );
  }

  // Render with affixes (prefix/suffix)
  if (hasAffixes) {
    const wrapperClass = 'ui-input-affix-wrapper';
    const wrapperSizeClass = `ui-input-affix-wrapper--${size}`;
    const wrapperStatusClass = status ? `ui-input-affix-wrapper--${status}` : '';
    const wrapperDisabledClass = disabled ? 'ui-input-affix-wrapper--disabled' : '';

    return (
      <span 
        className={[wrapperClass, wrapperSizeClass, wrapperStatusClass, wrapperDisabledClass, className]
          .filter(Boolean)
          .join(' ')}
        style={style}
      >
        {prefix && (
          <span className="ui-input-prefix">
            <span className="ui-input-icon">{prefix}</span>
          </span>
        )}
        {renderInput()}
        {(suffix || showClearButton || showCountDisplay) && (
          <span className="ui-input-suffix">
            {suffix && <span className="ui-input-icon">{suffix}</span>}
            {renderClearButton()}
            {renderCountDisplay()}
          </span>
        )}
      </span>
    );
  }

  // Render basic input
  return (
    <input
      {...props}
      ref={inputRef}
      className={[baseClass, sizeClass, variantClass, statusClass, disabledClass, className]
        .filter(Boolean)
        .join(' ')}
      style={style}
      value={currentValue}
      disabled={disabled}
      maxLength={maxLength}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
});