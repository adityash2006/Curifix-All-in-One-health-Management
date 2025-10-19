import { useState } from 'react';

const Dropdown = ({ trigger, children, className = '', position = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };

  return (
    <div className="relative group">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {trigger}
      </div>
      
      <div
        className={`
          absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 
          transition-all duration-200 z-50 ${positionClasses[position]}
          ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
          ${className}
        `}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;