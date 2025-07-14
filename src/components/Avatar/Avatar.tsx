import React from 'react';
import './Avatar.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  shape?: 'circle' | 'square';
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  shape = 'circle',
  children,
  className = '',
  onClick,
}) => {
  const baseClass = 'ui-avatar';
  const sizeClass = `ui-avatar--${size}`;
  const shapeClass = `ui-avatar--${shape}`;
  const clickableClass = onClick ? 'ui-avatar--clickable' : '';

  const classes = [baseClass, sizeClass, shapeClass, clickableClass, className]
    .filter(Boolean)
    .join(' ');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderContent = () => {
    if (src) {
      return (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="ui-avatar__image"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }

    if (children) {
      if (typeof children === 'string') {
        return <span className="ui-avatar__text">{getInitials(children)}</span>;
      }
      return children;
    }

    return <span className="ui-avatar__text">U</span>;
  };

  return (
    <div className={classes} onClick={onClick}>
      {renderContent()}
    </div>
  );
};