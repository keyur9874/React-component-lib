import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input, InputProps } from './Input';

export interface InputPasswordProps extends Omit<InputProps, 'type' | 'suffix'> {
  visibilityToggle?: boolean;
  iconRender?: (visible: boolean) => React.ReactNode;
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(({
  visibilityToggle = true,
  iconRender,
  suffix,
  ...props
}, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const renderIcon = () => {
    if (!visibilityToggle) return suffix;

    const defaultIcon = visible ? <EyeOff size={14} /> : <Eye size={14} />;
    const icon = iconRender ? iconRender(visible) : defaultIcon;

    return (
      <div 
        className="ui-input-icon" 
        onClick={toggleVisibility}
        style={{ cursor: 'pointer' }}
      >
        {icon}
      </div>
    );
  };

  return (
    <Input
      {...props}
      ref={ref}
      type={visible ? 'text' : 'password'}
      className={`ui-input-password ${props.className || ''}`}
      suffix={renderIcon()}
    />
  );
});