import React from 'react';
import PropTypes from 'prop-types';

const EditText = ({ 
  placeholder = '',
  value,
  onChange,
  type = 'text',
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        w-full bg-secondary-light rounded-lg px-4 py-4
        text-base font-poppins
        ${value ? 'text-primary-1' : 'text-muted-1'}
        placeholder-muted-1
        border-0 outline-none
        ${disabled ? 'cursor-not-allowed opacity-50' : 'focus:ring-2 focus:ring-primary-accent/20'}
        transition-all duration-200
        ${className}
      `}
      {...props}
    />
  );
};

EditText.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default EditText;