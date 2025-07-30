import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ 
  placeholder = '',
  value,
  onChange,
  rows = 4,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      disabled={disabled}
      className={`
        w-full bg-secondary-light rounded-lg px-5 py-3
        text-base font-semibold font-poppins
        ${value ? 'text-primary-1' : 'text-secondary-1'}
        placeholder-secondary-1
        border-0 outline-none resize-vertical
        ${disabled ? 'cursor-not-allowed opacity-50' : 'focus:ring-2 focus:ring-primary-accent/20'}
        transition-all duration-200
        ${className}
      `}
      {...props}
    />
  );
};

TextArea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default TextArea;