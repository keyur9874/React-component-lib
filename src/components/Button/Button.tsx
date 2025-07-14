import React from 'react';
import './Button.css';

export interface ButtonProps {
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'danger' | 'pink' | 'purple' | 'cyan';
  variant?: 'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  ghost?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  color = 'default',
  variant = 'solid',
  size = 'medium',
  disabled = false,
  loading = false,
  ghost = false,
  onClick,
  type = 'button',
  className = '',
  href,
}) => {
  const baseClass = 'ui-button';
  const colorClass = `ui-button--${color}`;
  const variantClass = `ui-button--${variant}`;
  const sizeClass = `ui-button--${size}`;
  const disabledClass = disabled || loading ? 'ui-button--disabled' : '';
  const loadingClass = loading ? 'ui-button--loading' : '';
  const ghostClass = ghost ? 'ui-button--ghost' : '';

  const classes = [
    baseClass,
    colorClass,
    variantClass,
    sizeClass,
    disabledClass,
    loadingClass,
    ghostClass,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const buttonContent = (
    <>
      {loading && <span className="ui-button__spinner" />}
      <span className={loading ? 'ui-button__content--loading' : 'ui-button__content'}>
        {children}
      </span>
    </>
  );

  if (variant === 'link' && href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick as any}
        aria-disabled={disabled || loading}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};