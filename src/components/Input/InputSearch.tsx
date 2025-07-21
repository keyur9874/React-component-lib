import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';
import { Input, InputProps } from './Input';

export interface InputSearchProps extends Omit<InputProps, 'suffix'> {
  onSearch?: (value: string, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;
  enterButton?: boolean | React.ReactNode;
  loading?: boolean;
}

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(({
  onSearch,
  enterButton = false,
  loading = false,
  onPressEnter,
  addonAfter,
  suffix,
  ...props
}, ref) => {
  const handleSearch = (e: React.MouseEvent<HTMLElement>) => {
    const inputElement = (e.currentTarget.parentNode?.parentNode as HTMLElement)?.querySelector('input');
    const value = inputElement?.value || '';
    onSearch?.(value, e);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    onSearch?.(value, e);
    onPressEnter?.(e);
  };

  // Search icon
  const searchIcon = loading ? (
    <div className="ui-input-icon" style={{ animation: 'ui-button-spin 1s linear infinite' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12a9 9 0 11-6.219-8.56"/>
      </svg>
    </div>
  ) : (
    <div className="ui-input-icon" onClick={handleSearch} style={{ cursor: 'pointer' }}>
      <Search size={14} />
    </div>
  );

  if (enterButton) {
    // Render with button addon
    const buttonContent = enterButton === true ? (
      <Search size={14} />
    ) : enterButton;
    
    return (
      <Input
        {...props}
        ref={ref}
        onPressEnter={handlePressEnter}
        addonAfter={
          <div 
            onClick={handleSearch} 
            style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center',
              color: loading ? 'var(--text-tertiary)' : 'var(--primary-color)',
              transition: 'color 0.2s ease'
            }}
          >
            {buttonContent}
          </div>
        }
      />
    );
  }

  // Render with suffix icon
  return (
    <Input
      {...props}
      ref={ref}
      className={`ui-input-search ${props.className || ''}`}
      suffix={searchIcon}
      onPressEnter={handlePressEnter}
    />
  );
});