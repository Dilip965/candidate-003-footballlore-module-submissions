import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-montserrat font-bold transition-all duration-200';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-opacity-90',
    ghost: 'border border-primary text-primary hover:bg-primary hover:bg-opacity-10'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 