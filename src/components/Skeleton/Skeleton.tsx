import React, { forwardRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import './Skeleton.css';

export interface SkeletonProps {
  /** Whether to show animation */
  active?: boolean;
  /** Whether to show avatar placeholder */
  avatar?: boolean | {
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    shape?: 'circle' | 'square';
  };
  /** Whether to show loading state */
  loading?: boolean;
  /** Number of paragraph lines */
  paragraph?: boolean | {
    rows?: number;
    width?: number | string | Array<number | string>;
  };
  /** Whether to show title placeholder */
  title?: boolean | {
    width?: number | string;
  };
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Whether to use round corners */
  round?: boolean;
  /** Custom className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Children to show when not loading */
  children?: React.ReactNode;
}

export interface SkeletonAvatarProps {
  /** Avatar size */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /** Avatar shape */
  shape?: 'circle' | 'square';
  /** Whether to show animation */
  active?: boolean;
  /** Custom className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface SkeletonButtonProps {
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Button shape */
  shape?: 'default' | 'circle' | 'round';
  /** Whether to show animation */
  active?: boolean;
  /** Custom className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface SkeletonInputProps {
  /** Input size */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show animation */
  active?: boolean;
  /** Custom className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface SkeletonImageProps {
  /** Image size */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show animation */
  active?: boolean;
  /** Custom className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface SkeletonNodeProps {
  /** Whether to show animation */
  active?: boolean;
  /** Custom className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Children content */
  children?: React.ReactNode;
}

// Avatar Skeleton Component
export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(({
  size = 'medium',
  shape = 'circle',
  active = true,
  className = '',
  style,
  ...props
}, ref) => {
  const classes = [
    'ui-skeleton-element',
    'ui-skeleton-avatar',
    `ui-skeleton-avatar--${size}`,
    `ui-skeleton-avatar--${shape}`,
    active && 'ui-skeleton-element--active',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      {...props}
      ref={ref}
      className={classes}
      style={style}
      aria-label="Loading avatar"
    />
  );
});

SkeletonAvatar.displayName = 'SkeletonAvatar';

// Button Skeleton Component
export const SkeletonButton = forwardRef<HTMLDivElement, SkeletonButtonProps>(({
  size = 'medium',
  shape = 'default',
  active = true,
  className = '',
  style,
  ...props
}, ref) => {
  const classes = [
    'ui-skeleton-element',
    'ui-skeleton-button',
    `ui-skeleton-button--${size}`,
    shape !== 'default' && `ui-skeleton-button--${shape}`,
    active && 'ui-skeleton-element--active',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      {...props}
      ref={ref}
      className={classes}
      style={style}
      aria-label="Loading button"
    />
  );
});

SkeletonButton.displayName = 'SkeletonButton';

// Input Skeleton Component
export const SkeletonInput = forwardRef<HTMLDivElement, SkeletonInputProps>(({
  size = 'medium',
  active = true,
  className = '',
  style,
  ...props
}, ref) => {
  const classes = [
    'ui-skeleton-element',
    'ui-skeleton-input',
    `ui-skeleton-input--${size}`,
    active && 'ui-skeleton-element--active',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      {...props}
      ref={ref}
      className={classes}
      style={style}
      aria-label="Loading input"
    />
  );
});

SkeletonInput.displayName = 'SkeletonInput';

// Image Skeleton Component
export const SkeletonImage = forwardRef<HTMLDivElement, SkeletonImageProps>(({
  size = 'medium',
  active = false,
  className = '',
  style,
  ...props
}, ref) => {
  const classes = [
    'ui-skeleton-image',
    `ui-skeleton-image--${size}`,
    active && 'ui-skeleton-element--active',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      {...props}
      ref={ref}
      className={classes}
      style={style}
      aria-label="Loading image"
    >
      <ImageIcon size={size === 'small' ? 18 : size === 'large' ? 32 : 24} />
    </div>
  );
});

SkeletonImage.displayName = 'SkeletonImage';

// Node Skeleton Component
export const SkeletonNode = forwardRef<HTMLDivElement, SkeletonNodeProps>(({
  active = true,
  className = '',
  style,
  children,
  ...props
}, ref) => {
  const classes = [
    'ui-skeleton-node',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      {...props}
      ref={ref}
      className={classes}
      style={style}
    >
      <div className="ui-skeleton-node-avatar">
        <SkeletonAvatar size="medium" active={active} />
      </div>
      <div className="ui-skeleton-node-content">
        <div className={`ui-skeleton-element ui-skeleton-node-title ${active ? 'ui-skeleton-element--active' : ''}`} />
        <div className={`ui-skeleton-element ui-skeleton-node-description ${active ? 'ui-skeleton-element--active' : ''}`} />
        {children}
      </div>
    </div>
  );
});

SkeletonNode.displayName = 'SkeletonNode';

// Main Skeleton Component
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({
  active = true,
  avatar = false,
  loading = true,
  paragraph = true,
  title = true,
  size = 'medium',
  round = false,
  className = '',
  style,
  children,
  ...props
}, ref) => {
  // If not loading, show children
  if (!loading && children) {
    return <>{children}</>;
  }

  const classes = [
    'ui-skeleton',
    `ui-skeleton--${size}`,
    round && 'ui-skeleton--round',
    active && 'ui-skeleton--active',
    className
  ].filter(Boolean).join(' ');

  // Parse avatar config
  const avatarConfig = typeof avatar === 'object' ? avatar : { size: 'medium', shape: 'circle' };
  const showAvatar = !!avatar;

  // Parse title config
  const titleConfig = typeof title === 'object' ? title : { width: '38%' };
  const showTitle = !!title;

  // Parse paragraph config
  const paragraphConfig = typeof paragraph === 'object' ? paragraph : { rows: 3 };
  const showParagraph = !!paragraph;

  // Generate paragraph widths
  const generateParagraphWidths = (rows: number, customWidth?: number | string | Array<number | string>) => {
    if (Array.isArray(customWidth)) {
      return customWidth.slice(0, rows);
    }
    
    if (customWidth) {
      return Array(rows).fill(customWidth);
    }

    // Default widths for natural look
    const defaultWidths = ['100%', '100%', '100%', '100%', '75%'];
    return defaultWidths.slice(0, rows);
  };

  const paragraphWidths = generateParagraphWidths(
    paragraphConfig.rows || 3,
    paragraphConfig.width
  );

  return (
    <div
      {...props}
      ref={ref}
      className={classes}
      style={style}
      aria-label="Loading content"
      role="status"
      aria-live="polite"
    >
      <div className="ui-skeleton-content">
        {/* Header with Avatar and Title */}
        {(showAvatar || showTitle) && (
          <div className="ui-skeleton-header">
            {showAvatar && (
              <SkeletonAvatar
                size={avatarConfig.size}
                shape={avatarConfig.shape}
                active={active}
              />
            )}
            {showTitle && (
              <div
                className={`ui-skeleton-element ui-skeleton-title ${active ? 'ui-skeleton-element--active' : ''}`}
                style={{ width: titleConfig.width }}
              />
            )}
          </div>
        )}

        {/* Paragraph */}
        {showParagraph && (
          <ul className="ui-skeleton-paragraph">
            {paragraphWidths.map((width, index) => (
              <li
                key={index}
                className={`ui-skeleton-element ui-skeleton-paragraph-line ${active ? 'ui-skeleton-element--active' : ''}`}
                style={{ width }}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

Skeleton.displayName = 'Skeleton';

// Attach sub-components
(Skeleton as any).Avatar = SkeletonAvatar;
(Skeleton as any).Button = SkeletonButton;
(Skeleton as any).Input = SkeletonInput;
(Skeleton as any).Image = SkeletonImage;
(Skeleton as any).Node = SkeletonNode;