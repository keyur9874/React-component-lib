import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import './Switch.css';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  checked,
  defaultChecked = false,
  disabled = false,
  loading = false,
  size = 'medium',
  variant = 'primary',
  checkedChildren,
  unCheckedChildren,
  onChange,
  onClick,
  className = '',
  style,
  autoFocus = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current!);

  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || loading) {
      return;
    }

    const newChecked = event.target.checked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked, event);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }

    // Focus the hidden input for accessibility
    inputRef.current?.focus();

    onClick?.(currentChecked, event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (!disabled && !loading) {
        // Trigger the input change
        const inputEvent = {
          target: { checked: !currentChecked },
          currentTarget: { checked: !currentChecked },
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleChange(inputEvent);
      }
    }
  };

  // Build class names
  const baseClass = 'ui-switch';
  const sizeClass = `ui-switch--${size}`;
  const variantClass = variant !== 'primary' ? `ui-switch--${variant}` : '';
  const checkedClass = currentChecked ? 'ui-switch--checked' : '';
  const disabledClass = disabled ? 'ui-switch--disabled' : '';
  const loadingClass = loading ? 'ui-switch--loading' : '';

  const classes = [baseClass, sizeClass, variantClass, checkedClass, disabledClass, loadingClass, className]
    .filter(Boolean)
    .join(' ');

  // Determine inner content
  const innerContent = currentChecked ? checkedChildren : unCheckedChildren;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={currentChecked}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      className={classes}
      style={style}
      disabled={disabled || loading}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
    >
      <input
        {...props}
        ref={inputRef}
        type="checkbox"
        className="ui-switch-input"
        checked={currentChecked}
        disabled={disabled}
        onChange={handleChange}
        autoFocus={autoFocus}
        tabIndex={-1}
        aria-hidden="true"
      />
      <span className="ui-switch-handle" />
      {innerContent && (
        <span className="ui-switch-inner">
          {innerContent}
        </span>
      )}
    </button>
  );
});

Switch.displayName = 'Switch';