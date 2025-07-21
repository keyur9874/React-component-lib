import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './Input.css';

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value' | 'defaultValue'> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'filled' | 'borderless';
  status?: 'error' | 'warning' | 'success';
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  formatter?: (value: number | undefined) => string;
  parser?: (displayValue: string | undefined) => number;
  controls?: boolean;
  keyboard?: boolean;
  stringMode?: boolean;
  onChange?: (value: number | null) => void;
  onStep?: (value: number, info: { offset: number; type: 'up' | 'down' }) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(({
  size = 'medium',
  variant = 'outlined',
  status,
  value,
  defaultValue,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision,
  formatter,
  parser,
  controls = true,
  keyboard = true,
  stringMode = false,
  disabled = false,
  className = '',
  style,
  onChange,
  onStep,
  onPressEnter,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState<number | null>(defaultValue ?? null);
  const [displayValue, setDisplayValue] = useState<string>('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current!);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Format number for display
  const formatValue = (val: number | null): string => {
    if (val === null || val === undefined) return '';
    
    if (formatter) {
      return formatter(val);
    }
    
    if (precision !== undefined) {
      return val.toFixed(precision);
    }
    
    return String(val);
  };

  // Parse display value to number
  const parseValue = (displayVal: string): number | null => {
    if (!displayVal.trim()) return null;
    
    if (parser) {
      return parser(displayVal);
    }
    
    const parsed = parseFloat(displayVal);
    return isNaN(parsed) ? null : parsed;
  };

  // Clamp value within min/max bounds
  const clampValue = (val: number | null): number | null => {
    if (val === null) return null;
    return Math.max(min, Math.min(max, val));
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);
    
    const parsedValue = parseValue(inputValue);
    const clampedValue = clampValue(parsedValue);
    
    if (!isControlled) {
      setInternalValue(clampedValue);
    }
    
    onChange?.(clampedValue);
  };

  // Handle blur - format the display value
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    
    if (currentValue !== null) {
      setDisplayValue(formatValue(currentValue));
    }
    
    props.onBlur?.(e);
  };

  // Handle focus
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    props.onFocus?.(e);
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!keyboard) {
      props.onKeyDown?.(e);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleStep('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleStep('down');
    } else if (e.key === 'Enter') {
      onPressEnter?.(e);
    }
    
    props.onKeyDown?.(e);
  };

  // Handle step up/down
  const handleStep = (type: 'up' | 'down') => {
    if (disabled) return;
    
    const offset = type === 'up' ? step : -step;
    const baseValue = currentValue ?? 0;
    const newValue = clampValue(baseValue + offset);
    
    if (newValue === null) return;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    setDisplayValue(formatValue(newValue));
    onChange?.(newValue);
    onStep?.(newValue, { offset, type });
  };

  // Build class names
  const baseClass = 'ui-input-number';
  const inputClass = 'ui-input';
  const sizeClass = `ui-input--${size}`;
  const variantClass = `ui-input--${variant}`;
  const statusClass = status ? `ui-input--${status}` : '';
  const disabledClass = disabled ? 'ui-input--disabled' : '';

  const classes = [baseClass, className].filter(Boolean).join(' ');
  const inputClasses = [inputClass, sizeClass, variantClass, statusClass, disabledClass]
    .filter(Boolean)
    .join(' ');

  // Get current display value
  const currentDisplayValue = focused ? displayValue : formatValue(currentValue);

  return (
    <div className={classes} style={style}>
      <input
        {...props}
        ref={inputRef}
        className={inputClasses}
        type="text"
        value={currentDisplayValue}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      {controls && (
        <div className="ui-input-number-handler-wrap">
          <span
            className="ui-input-number-handler ui-input-number-handler-up"
            onClick={() => handleStep('up')}
          >
            <ChevronUp size={12} />
          </span>
          <span
            className="ui-input-number-handler ui-input-number-handler-down"
            onClick={() => handleStep('down')}
          >
            <ChevronDown size={12} />
          </span>
        </div>
      )}
    </div>
  );
});