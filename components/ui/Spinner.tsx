
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex space-x-1.5 justify-center items-center">
        <span className="sr-only">Loading...</span>
        <div className="h-2 w-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-slate-500 rounded-full animate-bounce"></div>
    </div>
  );
};
