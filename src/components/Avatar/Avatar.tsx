import React, { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import './Avatar.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | number;
  shape?: 'circle' | 'square';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  icon?: React.ReactNode;
  gap?: number;
  draggable?: boolean;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  loading?: 'eager' | 'lazy';
  srcSet?: string;
  sizes?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  shape = 'circle',
  children,
  className = '',
  style,
  onClick,
  onError,
  icon,
  gap = 4,
  draggable = false,
  crossOrigin,
  loading = 'lazy',
  srcSet,
  sizes,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const textRef = useRef<HTMLSpanElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const baseClass = 'ui-avatar';
  const sizeClass = typeof size === 'number' ? '' : `ui-avatar--${size}`;
  const shapeClass = `ui-avatar--${shape}`;
  const clickableClass = onClick ? 'ui-avatar--clickable' : '';
  const loadingClass = src && !imageLoaded && !imageError ? 'ui-avatar--loading' : '';

  const classes = [baseClass, sizeClass, shapeClass, clickableClass, loadingClass, className]
    .filter(Boolean)
    .join(' ');

  // Calculate custom size styles
  const customSizeStyle = typeof size === 'number' ? {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${Math.max(size * 0.4, 12)}px`,
  } : {};

  const combinedStyle = { ...customSizeStyle, ...style };

  // Auto-scale text to fit avatar
  useEffect(() => {
    if (textRef.current && avatarRef.current && children && typeof children === 'string') {
      const textElement = textRef.current;
      const avatarElement = avatarRef.current;
      
      const avatarWidth = avatarElement.offsetWidth;
      const textWidth = textElement.scrollWidth;
      
      if (textWidth > avatarWidth - gap * 2) {
        const newScale = (avatarWidth - gap * 2) / textWidth;
        setScale(Math.max(newScale, 0.5)); // Minimum scale of 0.5
      } else {
        setScale(1);
      }
    }
  }, [children, size, gap]);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
    setImageLoaded(false);
    onError?.(event);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const getInitials = (name: string) => {
    if (!name) return '';
    
    // Handle different name formats
    const words = name.trim().split(/\s+/);
    
    if (words.length === 1) {
      // Single word - take first 2 characters
      return words[0].slice(0, 2).toUpperCase();
    } else if (words.length === 2) {
      // Two words - take first character of each
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    } else {
      // More than two words - take first character of first and last word
      return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
    }
  };

  const getColorFromName = (name: string) => {
    if (!name) return 0;
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 6; // 6 color variations
  };

  const renderContent = () => {
    // Priority: Image > Icon > Children > Default Icon
    if (src && !imageError) {
      return (
        <>
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt || 'Avatar'}
            className="ui-avatar__image"
            onError={handleImageError}
            onLoad={handleImageLoad}
            crossOrigin={crossOrigin}
            loading={loading}
            draggable={draggable}
          />
          {!imageLoaded && (
            <div className="ui-avatar__loading">
              <div className="ui-avatar__spinner" />
            </div>
          )}
        </>
      );
    }

    if (icon) {
      return <span className="ui-avatar__icon">{icon}</span>;
    }

    if (children) {
      if (typeof children === 'string') {
        const initials = getInitials(children);
        const colorIndex = getColorFromName(children);
        
        return (
          <span 
            ref={textRef}
            className={`ui-avatar__text ui-avatar__text--color-${colorIndex}`}
            style={{ transform: `scale(${scale})` }}
          >
            {initials}
          </span>
        );
      }
      return <span className="ui-avatar__content">{children}</span>;
    }

    // Default fallback icon
    return (
      <span className="ui-avatar__icon ui-avatar__icon--default">
        <User />
      </span>
    );
  };

  return (
    <div 
      ref={avatarRef}
      className={classes} 
      onClick={onClick}
      style={combinedStyle}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e as any);
        }
      } : undefined}
    >
      {renderContent()}
    </div>
  );
};