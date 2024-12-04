import React, { useEffect, useRef } from 'react';
import { Player } from '../types/game';
import { Timer } from 'lucide-react';

interface GameOverModalProps {
  winner: Player | null;
  isDraw: boolean;
  countdown: number;
  onNewGame: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  winner,
  isDraw,
  countdown,
  onNewGame,
}) => {
  const frameRef = useRef<number>();

  useEffect(() => {
    if (countdown === 0) {
      onNewGame();
    }
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [countdown, onNewGame]);

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 modal-backdrop flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl border-2 border-gray-200 dark:border-gray-700 theme-transition">
        <h2 className="text-3xl font-bold text-center mb-4 theme-text">
          {winner ? (
            <span className={`${winner === 'X' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
              Player {winner} Wins!
            </span>
          ) : isDraw ? (
            "It's a Draw!"
          ) : (
            'Game Over!'
          )}
        </h2>
        
        <div className="flex items-center justify-center gap-4 mb-6">
          <Timer className="w-6 h-6 theme-text-secondary" />
          <span className="text-4xl font-mono font-bold theme-text">
            {countdown}
          </span>
        </div>

        <button
          onClick={onNewGame}
          className="w-full py-3 px-4 bg-gray-800 dark:bg-gray-700 text-white rounded-lg
            hover:bg-gray-700 dark:hover:bg-gray-600 theme-transition font-semibold"
        >
          Start New Round Now
        </button>
      </div>
    </div>
  );
};