import React from 'react';
import './FormItem.css';

export interface FormItemProps {
  children: React.ReactNode;
  label?: React.ReactNode;
  name?: string;
  required?: boolean;
  help?: React.ReactNode;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  hasFeedback?: boolean;
  className?: string;
  style?: React.CSSProperties;
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };
}

export const FormItem: React.FC<FormItemProps> = ({
  children,
  label,
  name,
  required = false,
  help,
  validateStatus,
  hasFeedback = false,
  className = '',
  style,
  labelCol,
  wrapperCol,
}) => {
  const baseClass = 'ui-form-item';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  // Clone children and pass validation status
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps: any = {};
      
      if (validateStatus && validateStatus !== 'validating') {
        childProps.status = validateStatus;
      }
      
      if (name) {
        childProps.name = name;
      }
      
      return React.cloneElement(child, { ...childProps, ...child.props });
    }
    return child;
  });

  return (
    <div className={classes} style={style}>
      {label && (
        <div className="ui-form-item-label">
          <label className={required ? 'ui-form-item-label-required' : ''}>
            {label}
          </label>
        </div>
      )}
      
      <div className="ui-form-item-control">
        {clonedChildren}
        
        {help && (
          <div 
            className={`ui-form-item-explain ${
              validateStatus ? `ui-form-item-explain-${validateStatus}` : ''
            }`}
          >
            {help}
          </div>
        )}
      </div>
    </div>
  );
};