import React, { forwardRef, useState, useEffect } from 'react';
import { 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  X,
  LucideIcon
} from 'lucide-react';
import './Alert.css';

export interface AlertProps {
  /** Type of Alert styles */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** Whether Alert can be closed */
  closable?: boolean;
  /** Close text to show */
  closeText?: React.ReactNode;
  /** Content of Alert */
  message: React.ReactNode;
  /** Additional content of Alert */
  description?: React.ReactNode;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Custom icon, effective when showIcon is true */
  icon?: React.ReactNode;
  /** Called when close animation is finished */
  afterClose?: () => void;
  /** Callback when Alert is closed */
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Whether to show as banner */
  banner?: boolean;
  /** Custom action buttons */
  action?: React.ReactNode;
  /** Additional className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Role for accessibility */
  role?: string;
  /** Whether to use outlined style */
  outlined?: boolean;
}

const defaultIcons: Record<string, LucideIcon> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(({
  type = 'info',
  closable = false,
  closeText,
  message,
  description,
  showIcon = true,
  icon,
  afterClose,
  onClose,
  banner = false,
  action,
  className = '',
  style,
  role = 'alert',
  outlined = false,
  ...props
}, ref) => {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClosing(true);
    
    // Start close animation
    setTimeout(() => {
      setVisible(false);
      onClose?.(e);
      afterClose?.();
    }, 300);
  };

  // Don't render if not visible
  if (!visible) {
    return null;
  }

  // Build class names
  const baseClass = 'ui-alert';
  const typeClass = `ui-alert--${type}`;
  const bannerClass = banner ? 'ui-alert--banner' : '';
  const outlinedClass = outlined ? 'ui-alert--outlined' : '';
  const withDescriptionClass = description ? 'ui-alert--with-description' : '';
  const noIconClass = !showIcon ? 'ui-alert--no-icon' : '';
  const closingClass = closing ? 'ui-alert-exit-active' : '';

  const classes = [
    baseClass,
    typeClass,
    bannerClass,
    outlinedClass,
    withDescriptionClass,
    noIconClass,
    closingClass,
    className
  ].filter(Boolean).join(' ');

  // Get icon component
  const IconComponent = icon || (showIcon && defaultIcons[type]);

  return (
    <div
      {...props}
      ref={ref}
      className={classes}
      style={style}
      role={role}
      aria-live="polite"
    >
      {/* Icon */}
      {showIcon && IconComponent && (
        <span className="ui-alert-icon">
          {React.isValidElement(IconComponent) ? (
            IconComponent
          ) : (
            React.createElement(IconComponent as LucideIcon, { size: description ? 24 : 16 })
          )}
        </span>
      )}

      {/* Content */}
      <div className="ui-alert-content">
        <div className="ui-alert-message">
          {message}
        </div>
        
        {description && (
          <div className="ui-alert-description">
            {description}
          </div>
        )}

        {/* Actions */}
        {action && (
          <div className="ui-alert-actions">
            {action}
          </div>
        )}
      </div>

      {/* Close Button */}
      {closable && (
        <button
          type="button"
          className="ui-alert-close-icon"
          onClick={handleClose}
          aria-label="Close alert"
        >
          {closeText || <X size={14} />}
        </button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';