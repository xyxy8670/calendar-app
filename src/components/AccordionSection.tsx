import React, { useState } from 'react';

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ 
  title, 
  children, 
  defaultOpen = false,
  icon 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors duration-200"
      >
        <div className="flex items-center space-x-2">
          {icon && <span className="text-slate-600">{icon}</span>}
          <span className="font-semibold text-slate-800">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className={`transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="p-4 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;