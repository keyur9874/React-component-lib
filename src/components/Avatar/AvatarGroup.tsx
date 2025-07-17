import React from 'react';
import { Avatar, AvatarProps } from './Avatar';
import './AvatarGroup.css';

export interface AvatarGroupProps {
  children: React.ReactElement<AvatarProps>[];
  max?: number;
  maxCount?: number; // Alias for max
  size?: AvatarProps['size'];
  shape?: AvatarProps['shape'];
  className?: string;
  style?: React.CSSProperties;
  maxStyle?: React.CSSProperties;
  maxPopoverPlacement?: 'top' | 'bottom';
  maxPopoverTrigger?: 'hover' | 'focus' | 'click';
  onMaxClick?: () => void;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  maxCount,
  size,
  shape,
  className = '',
  style,
  maxStyle,
  maxPopoverPlacement = 'top',
  maxPopoverTrigger = 'hover',
  onMaxClick,
}) => {
  const maxLimit = max || maxCount;
  const avatars = React.Children.toArray(children) as React.ReactElement<AvatarProps>[];
  
  const visibleAvatars = maxLimit ? avatars.slice(0, maxLimit) : avatars;
  const hiddenCount = maxLimit ? Math.max(0, avatars.length - maxLimit) : 0;

  const baseClass = 'ui-avatar-group';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  // Clone avatars with group props
  const renderAvatars = visibleAvatars.map((avatar, index) => {
    const avatarProps = {
      ...avatar.props,
      size: size || avatar.props.size,
      shape: shape || avatar.props.shape,
      key: avatar.key || index,
    };

    return React.cloneElement(avatar, avatarProps);
  });

  // Render overflow avatar
  const renderOverflowAvatar = () => {
    if (hiddenCount <= 0) return null;

    const overflowProps: AvatarProps = {
      size: size || 'medium',
      shape: shape || 'circle',
      className: 'ui-avatar-group__overflow',
      style: maxStyle,
      onClick: onMaxClick,
      children: `+${hiddenCount}`,
    };

    return <Avatar {...overflowProps} />;
  };

  return (
    <div className={classes} style={style}>
      {renderAvatars}
      {renderOverflowAvatar()}
    </div>
  );
};