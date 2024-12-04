import React from 'react';
import { Player } from '../types/game';

interface GameStatusProps {
  winner: Player | null;
  isDraw: boolean;
  currentPlayer: Player;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  winner,
  isDraw,
  currentPlayer,
}) => {
  return (
    <div className="text-2xl font-bold text-center mb-8">
      {winner ? (
        <span className="text-green-600 dark:text-green-400">Player {winner} wins!</span>
      ) : isDraw ? (
        <span className="text-gray-600 dark:text-gray-400">It's a draw!</span>
      ) : (
        <span className={currentPlayer === 'X' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}>
          Player {currentPlayer}'s turn
        </span>
      )}
    </div>
  );
};