import React from 'react';
import { Cell as CellType } from '../types/game';
import { X, Circle } from 'lucide-react';

interface CellProps {
  value: CellType;
  onClick: () => void;
  winning?: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, onClick, winning }) => {
  return (
    <button
      onClick={onClick}
      className={`aspect-square flex items-center justify-center text-4xl font-bold
        transition-all duration-200 hover:bg-gray-100
        ${winning ? 'bg-green-100' : 'bg-white'}
        border-2 border-gray-300 rounded-lg`}
      disabled={value !== null}
    >
      {value === 'X' && (
        <X className="w-12 h-12 text-blue-600 transition-all duration-300" 
          strokeWidth={2.5} />
      )}
      {value === 'O' && (
        <Circle className="w-12 h-12 text-red-600 transition-all duration-300" 
          strokeWidth={2.5} />
      )}
    </button>
  );
};