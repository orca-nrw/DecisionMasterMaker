import React from "react";

/**
 * Component that provides a closeable, absolutely rendered modal
 */
const Modal: React.FC<{ onClose: Function }> = ({ onClose, children }) => {
  return (
    <div className="absolute z-10 top-0 left-0 w-full h-full bg-black/75" onClick={() => onClose()}>
      <div className="overflow-y-auto max-h-[75%] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[65ch] p-4 shadow-lg shadow-black/50 rounded-md bg-white z-40" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2" onClick={() => onClose()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
