import React from 'react';
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
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
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
  type = 'button',
  className = '',
  style,
  href,
}) => {
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

  if (variant === 'link' && href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick as any}
        aria-disabled={disabled || isLoading}
        style={style}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={style}
    >
      {buttonContent}
    </button>
  );
};
