import React, { 
  forwardRef, 
  useState, 
  useRef, 
  useEffect, 
  useImperativeHandle,
  useCallback,
  useMemo
} from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import './Dropdown.css';

export interface DropdownOption {
  key: string | number;
  label: React.ReactNode;
  value: any;
  disabled?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
  group?: string;
}

export interface DropdownProps {
  options?: DropdownOption[];
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  placement?: 'bottom' | 'top' | 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  trigger?: 'hover' | 'click';
  multiple?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  allowClear?: boolean;
  maxTagCount?: number;
  maxTagTextLength?: number;
  showSearch?: boolean;
  filterOption?: (input: string, option: DropdownOption) => boolean;
  onSelect?: (value: any, option: DropdownOption) => void;
  onChange?: (value: any, option: DropdownOption | DropdownOption[]) => void;
  onSearch?: (value: string) => void;
  onDropdownVisibleChange?: (visible: boolean) => void;
  onClear?: () => void;
  className?: string;
  style?: React.CSSProperties;
  dropdownClassName?: string;
  dropdownStyle?: React.CSSProperties;
  children?: React.ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export interface DropdownRef {
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
}

export const Dropdown = forwardRef<DropdownRef, DropdownProps>(({
  options = [],
  value,
  defaultValue,
  placeholder = 'Select an option',
  disabled = false,
  loading = false,
  size = 'medium',
  placement = 'bottom',
  trigger = 'click',
  multiple = false,
  searchable = false,
  searchPlaceholder = 'Search...',
  allowClear = false,
  maxTagCount = 3,
  maxTagTextLength = 20,
  showSearch = false,
  filterOption,
  onSelect,
  onChange,
  onSearch,
  onDropdownVisibleChange,
  onClear,
  className = '',
  style,
  dropdownClassName = '',
  dropdownStyle,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState(multiple ? [] : defaultValue);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    
    return options.filter(option => {
      if (filterOption) {
        return filterOption(searchValue, option);
      }
      
      const label = typeof option.label === 'string' ? option.label : option.key.toString();
      return label.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [options, searchValue, filterOption]);

  // Group options
  const groupedOptions = useMemo(() => {
    const groups: { [key: string]: DropdownOption[] } = {};
    const ungrouped: DropdownOption[] = [];

    filteredOptions.forEach(option => {
      if (option.group) {
        if (!groups[option.group]) {
          groups[option.group] = [];
        }
        groups[option.group].push(option);
      } else {
        ungrouped.push(option);
      }
    });

    return { groups, ungrouped };
  }, [filteredOptions]);

  // Get display value
  const getDisplayValue = useCallback(() => {
    if (loading) {
      return (
        <div className="ui-dropdown__loading">
          <div className="ui-dropdown__loading-spinner" />
          Loading...
        </div>
      );
    }

    if (multiple) {
      const values = Array.isArray(currentValue) ? currentValue : [];
      if (values.length === 0) return placeholder;

      const selectedOptions = values.map(val => 
        options.find(opt => opt.value === val)
      ).filter(Boolean) as DropdownOption[];

      if (selectedOptions.length <= maxTagCount) {
        return (
          <div className="ui-dropdown__tags">
            {selectedOptions.map(option => (
              <span key={option.key} className="ui-dropdown__tag">
                <span className="ui-dropdown__tag-text">
                  {typeof option.label === 'string' 
                    ? option.label.length > maxTagTextLength 
                      ? `${option.label.slice(0, maxTagTextLength)}...`
                      : option.label
                    : option.label
                  }
                </span>
                <X 
                  className="ui-dropdown__tag-close" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveValue(option.value);
                  }}
                />
              </span>
            ))}
          </div>
        );
      } else {
        return `${selectedOptions.length} items selected`;
      }
    }

    const selectedOption = options.find(opt => opt.value === currentValue);
    return selectedOption ? selectedOption.label : placeholder;
  }, [currentValue, options, placeholder, loading, multiple, maxTagCount, maxTagTextLength, handleRemoveValue]);

  // Handle value selection
  const handleSelect = useCallback((option: DropdownOption) => {
    if (option.disabled) return;

    if (multiple) {
      const values = Array.isArray(currentValue) ? [...currentValue] : [];
      const index = values.indexOf(option.value);
      
      if (index > -1) {
        values.splice(index, 1);
      } else {
        values.push(option.value);
      }

      if (!isControlled) {
        setInternalValue(values);
      }

      const selectedOptions = values.map(val => 
        options.find(opt => opt.value === val)
      ).filter(Boolean) as DropdownOption[];

      onChange?.(values, selectedOptions);
      onSelect?.(option.value, option);
    } else {
      if (!isControlled) {
        setInternalValue(option.value);
      }

      onChange?.(option.value, option);
      onSelect?.(option.value, option);
      setIsOpen(false);
    }
  }, [currentValue, multiple, isControlled, onChange, onSelect, options]);

  // Handle remove value (for multiple)
  const handleRemoveValue = useCallback((valueToRemove: any) => {
    if (!multiple) return;

    const values = Array.isArray(currentValue) ? [...currentValue] : [];
    const index = values.indexOf(valueToRemove);
    
    if (index > -1) {
      values.splice(index, 1);
      
      if (!isControlled) {
        setInternalValue(values);
      }

      const selectedOptions = values.map(val => 
        options.find(opt => opt.value === val)
      ).filter(Boolean) as DropdownOption[];

      onChange?.(values, selectedOptions);
    }
  }, [currentValue, multiple, isControlled, onChange, options]);

  // Handle clear
  const handleClear = useCallback(() => {
    const newValue = multiple ? [] : undefined;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }

    const selectedOptions = multiple ? [] : undefined;
    onChange?.(newValue, selectedOptions);
    onClear?.();
  }, [multiple, isControlled, onChange, onClear]);

  // Handle dropdown toggle
  const handleToggle = useCallback(() => {
    if (disabled || loading) return;

    const newOpen = !isOpen;
    setIsOpen(newOpen);
    onDropdownVisibleChange?.(newOpen);

    if (newOpen) {
      setFocusedIndex(-1);
      if (searchable || showSearch) {
        setTimeout(() => searchRef.current?.focus(), 100);
      }
    } else {
      setSearchValue('');
      setFocusedIndex(-1);
    }
  }, [isOpen, disabled, loading, searchable, showSearch, onDropdownVisibleChange]);

  // Handle search
  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
    setFocusedIndex(-1);
    onSearch?.(value);
  }, [onSearch]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          e.preventDefault();
          handleToggle();
        } else if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          e.preventDefault();
          handleSelect(filteredOptions[focusedIndex]);
        }
        break;
      
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
          onDropdownVisibleChange?.(false);
          triggerRef.current?.focus();
        }
        break;
      
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          handleToggle();
        } else {
          const nextIndex = Math.min(focusedIndex + 1, filteredOptions.length - 1);
          setFocusedIndex(nextIndex);
          itemRefs.current[nextIndex]?.scrollIntoView({ block: 'nearest' });
        }
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          const prevIndex = Math.max(focusedIndex - 1, 0);
          setFocusedIndex(prevIndex);
          itemRefs.current[prevIndex]?.scrollIntoView({ block: 'nearest' });
        }
        break;
      
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(0);
          itemRefs.current[0]?.scrollIntoView({ block: 'nearest' });
        }
        break;
      
      case 'End':
        if (isOpen) {
          e.preventDefault();
          const lastIndex = filteredOptions.length - 1;
          setFocusedIndex(lastIndex);
          itemRefs.current[lastIndex]?.scrollIntoView({ block: 'nearest' });
        }
        break;
    }
  }, [disabled, isOpen, focusedIndex, filteredOptions, handleToggle, handleSelect, onDropdownVisibleChange]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onDropdownVisibleChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onDropdownVisibleChange]);

  // Hover handlers
  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover' && !disabled && !loading) {
      setIsOpen(true);
      onDropdownVisibleChange?.(true);
    }
  }, [trigger, disabled, loading, onDropdownVisibleChange]);

  const handleMouseLeave = useCallback(() => {
    if (trigger === 'hover' && !disabled && !loading) {
      setIsOpen(false);
      onDropdownVisibleChange?.(false);
    }
  }, [trigger, disabled, loading, onDropdownVisibleChange]);

  // Imperative handle
  useImperativeHandle(ref, () => ({
    focus: () => triggerRef.current?.focus(),
    blur: () => triggerRef.current?.blur(),
    open: () => {
      if (!disabled && !loading) {
        setIsOpen(true);
        onDropdownVisibleChange?.(true);
      }
    },
    close: () => {
      setIsOpen(false);
      onDropdownVisibleChange?.(false);
    }
  }));

  // Build class names
  const baseClass = 'ui-dropdown';
  const sizeClass = `ui-dropdown--${size}`;
  const classes = [baseClass, sizeClass, className].filter(Boolean).join(' ');

  const triggerClasses = [
    'ui-dropdown__trigger',
    disabled && 'ui-dropdown__trigger--disabled',
    loading && 'ui-dropdown__trigger--loading',
    isOpen && 'ui-dropdown__trigger--open'
  ].filter(Boolean).join(' ');

  const contentClasses = [
    'ui-dropdown__content',
    isOpen && 'ui-dropdown__content--open',
    placement.includes('top') && 'ui-dropdown__content--top',
    placement.includes('Right') && 'ui-dropdown__content--right',
    dropdownClassName
  ].filter(Boolean).join(' ');

  // Render options
  const renderOptions = () => {
    const { groups, ungrouped } = groupedOptions;
    const items: React.ReactNode[] = [];
    let currentIndex = 0;

    // Render ungrouped options first
    ungrouped.forEach((option, index) => {
      const isSelected = multiple 
        ? Array.isArray(currentValue) && currentValue.includes(option.value)
        : currentValue === option.value;
      
      const isFocused = currentIndex === focusedIndex;

      const itemClasses = [
        'ui-dropdown__item',
        multiple && 'ui-dropdown__item--multi',
        isSelected && !multiple && 'ui-dropdown__item--selected',
        option.disabled && 'ui-dropdown__item--disabled',
        option.danger && 'ui-dropdown__item--danger'
      ].filter(Boolean).join(' ');

      items.push(
        <button
          key={option.key}
          ref={el => itemRefs.current[currentIndex] = el}
          className={itemClasses}
          disabled={option.disabled}
          onClick={() => handleSelect(option)}
          onMouseEnter={() => setFocusedIndex(currentIndex)}
          role="option"
          aria-selected={isSelected}
          tabIndex={-1}
        >
          {multiple && (
            <div className={`ui-dropdown__checkbox ${isSelected ? 'ui-dropdown__checkbox--checked' : ''}`} />
          )}
          {option.icon && <span className="ui-dropdown__item-icon">{option.icon}</span>}
          <span className="ui-dropdown__item-label">{option.label}</span>
        </button>
      );
      currentIndex++;
    });

    // Render grouped options
    Object.entries(groups).forEach(([groupName, groupOptions]) => {
      if (items.length > 0) {
        items.push(<div key={`divider-${groupName}`} className="ui-dropdown__divider" />);
      }
      
      items.push(
        <div key={`group-${groupName}`} className="ui-dropdown__group">
          {groupName}
        </div>
      );

      groupOptions.forEach((option, groupIndex) => {
        const isSelected = multiple 
          ? Array.isArray(currentValue) && currentValue.includes(option.value)
          : currentValue === option.value;
        
        const isFocused = currentIndex === focusedIndex;

        const itemClasses = [
          'ui-dropdown__item',
          multiple && 'ui-dropdown__item--multi',
          isSelected && !multiple && 'ui-dropdown__item--selected',
          option.disabled && 'ui-dropdown__item--disabled',
          option.danger && 'ui-dropdown__item--danger'
        ].filter(Boolean).join(' ');

        items.push(
          <button
            key={option.key}
            ref={el => itemRefs.current[currentIndex] = el}
            className={itemClasses}
            disabled={option.disabled}
            onClick={() => handleSelect(option)}
            onMouseEnter={() => setFocusedIndex(currentIndex)}
            role="option"
            aria-selected={isSelected}
            tabIndex={-1}
          >
            {multiple && (
              <div className={`ui-dropdown__checkbox ${isSelected ? 'ui-dropdown__checkbox--checked' : ''}`} />
            )}
            {option.icon && <span className="ui-dropdown__item-icon">{option.icon}</span>}
            <span className="ui-dropdown__item-label">{option.label}</span>
          </button>
        );
        currentIndex++;
      });
    });

    return items;
  };

  return (
    <div 
      className={classes}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        className={triggerClasses}
        disabled={disabled}
        onClick={trigger === 'click' ? handleToggle : undefined}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        type="button"
      >
        <span className="ui-dropdown__trigger-content">
          {children || getDisplayValue()}
        </span>
        <ChevronDown className="ui-dropdown__arrow" />
      </button>

      <div
        ref={contentRef}
        className={contentClasses}
        style={dropdownStyle}
        role="listbox"
        aria-multiselectable={multiple}
      >
        {(searchable || showSearch) && (
          <input
            ref={searchRef}
            className="ui-dropdown__search"
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                contentRef.current?.focus();
                handleKeyDown(e);
              }
            }}
          />
        )}

        <div className="ui-dropdown__menu">
          {filteredOptions.length === 0 ? (
            <div className="ui-dropdown__empty">
              {searchValue ? 'No results found' : 'No options available'}
            </div>
          ) : (
            renderOptions()
          )}
        </div>
      </div>
    </div>
  );
});

Dropdown.displayName = 'Dropdown';