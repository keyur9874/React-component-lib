import React from 'react';
import './Badge.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium' | 'large';
  dot?: boolean;
  count?: number;
  showZero?: boolean;
  status?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  dot = false,
  count,
  showZero = false,
  status = false,
  className = '',
}) => {
  const baseClass = 'ui-badge';
  const variantClass = `ui-badge--${variant}`;
  const sizeClass = `ui-badge--${size}`;
  const dotClass = dot ? 'ui-badge--dot' : '';
  const statusClass = status ? 'ui-badge-status' : '';

  const classes = [baseClass, variantClass, sizeClass, dotClass, statusClass, className]
    .filter(Boolean)
    .join(' ');

  const shouldShowCount = count !== undefined && (count > 0 || showZero);
  const displayCount = count && count > 99 ? '99+' : count;

  if (dot) {
    return (
      <span className="ui-badge-wrapper">
        {children}
        <span className={classes} />
      </span>
    );
  }

  if (shouldShowCount) {
    return (
      <span className="ui-badge-wrapper">
        {children}
        <span className={classes}>{displayCount}</span>
      </span>
    );
  }

  return <span className={classes}>{children}</span>;
};