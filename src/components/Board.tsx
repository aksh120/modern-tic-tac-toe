import React from 'react';
import { Cell } from './Cell';
import { Board as BoardType } from '../types/game';

interface BoardProps {
  board: BoardType;
  winningCombination: number[] | null;
  onCellClick: (index: number) => void;
}

export const Board: React.FC<BoardProps> = ({
  board,
  winningCombination,
  onCellClick,
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-[400px] aspect-square p-4">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          winning={winningCombination?.includes(index)}
          onClick={() => onCellClick(index)}
        />
      ))}
    </div>
  );
};