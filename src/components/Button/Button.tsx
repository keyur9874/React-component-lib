import React, { forwardRef } from 'react';
import './Button.css';

export interface ButtonProps {
  children?: React.ReactNode;
  color?: 'default' | 'primary' | 'danger' | 'pink' | 'purple' | 'cyan';
  variant?: 'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link';
  size?: 'small' | 'medium' | 'large';
  shape?: 'default' | 'circle' | 'round';
  disabled?: boolean;
  loading?: boolean | { delay?: number; icon?: React.ReactNode };
  ghost?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  'aria-selected'?: boolean;
  'aria-disabled'?: boolean;
  tabIndex?: number;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  color = 'default',
  variant = 'solid',
  size = 'medium',
  shape = 'default',
  disabled = false,
  loading = false,
  ghost = false,
  icon,
  iconPosition = 'start',
  onClick,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  type = 'button',
  className = '',
  style,
  href,
  role,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHasPopup,
  'aria-selected': ariaSelected,
  'aria-disabled': ariaDisabled,
  tabIndex,
}, ref) => {
  const baseClass = 'ui-button';
  const colorClass = `ui-button--${color}`;
  const variantClass = `ui-button--${variant}`;
  const sizeClass = `ui-button--${size}`;
  const shapeClass = `ui-button--${shape}`;
  const disabledClass = disabled || loading ? 'ui-button--disabled' : '';
  const loadingClass = loading ? 'ui-button--loading' : '';
  const ghostClass = ghost ? 'ui-button--ghost' : '';
  const iconOnlyClass = icon && !children ? 'ui-button--icon-only' : '';
  
  const classes = [
    baseClass,
    colorClass,
    variantClass,
    sizeClass,
    shapeClass,
    disabledClass,
    loadingClass,
    ghostClass,
    iconOnlyClass,
    className
  ]
    .filter(Boolean)
    .join(' ');

  // Handle loading configuration
  const isLoading = typeof loading === 'boolean' ? loading : false;
  const loadingIcon = typeof loading === 'object' && loading.icon ? loading.icon : null;

  // Default loading spinner
  const defaultSpinner = <span className="ui-button__spinner" />;
  const spinner = loadingIcon || defaultSpinner;

  // Render icon with proper spacing
  const renderIcon = (iconElement: React.ReactNode, position: 'start' | 'end') => {
    if (!iconElement) return null;
    
    const iconClass = `ui-button__icon ui-button__icon--${position}`;
    return <span className={iconClass}>{iconElement}</span>;
  };

  const buttonContent = (
    <>
      {isLoading && iconPosition === 'start' && (
        <span className="ui-button__icon ui-button__icon--start ui-button__icon--loading">
          {spinner}
        </span>
      )}
      
      {!isLoading && icon && iconPosition === 'start' && renderIcon(icon, 'start')}
      
      {children && <span className="ui-button__content">{children}</span>}
      
      {!isLoading && icon && iconPosition === 'end' && renderIcon(icon, 'end')}
      
      {isLoading && iconPosition === 'end' && (
        <span className="ui-button__icon ui-button__icon--end ui-button__icon--loading">
          {spinner}
        </span>
      )}
    </>
  );

  // Common props for both button and anchor elements
  const commonProps = {
    className: classes,
    style,
    onClick,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'aria-selected': ariaSelected,
    'aria-disabled': ariaDisabled || disabled || isLoading,
    tabIndex,
  };

  if (variant === 'link' && href) {
    return (
      <a
        {...commonProps}
        href={href}
        onClick={onClick as any}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      {...commonProps}
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
    >
      {buttonContent}
    </button>
  );
});

Button.displayName = 'Button';
