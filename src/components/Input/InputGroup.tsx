import React from 'react';
import './Input.css';

export interface InputGroupProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  size = 'medium',
  compact = false,
  className = '',
  style,
}) => {
  const baseClass = 'ui-input-group';
  const sizeClass = `ui-input-group--${size}`;
  const compactClass = compact ? 'ui-input-group--compact' : '';

  const classes = [baseClass, sizeClass, compactClass, className]
    .filter(Boolean)
    .join(' ');

  // Clone children and pass size prop
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { size, ...child.props });
    }
    return child;
  });

  return (
    <span className={classes} style={style}>
      {clonedChildren}
    </span>
  );
};