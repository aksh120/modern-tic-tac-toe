import React, { useState, useEffect, useCallback } from 'react';
import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { StatsDisplay } from './components/StatsDisplay';
import { GameOverModal } from './components/GameOverModal';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ResetStats } from './components/ResetStats';
import { Toast } from './components/Toast';
import { Player } from './types/game';
import { checkWinner, checkDraw, getInitialBoard } from './utils/gameLogic';
import { loadStats, updatePlayerStats } from './utils/storage';
import { useGameTimer } from './hooks/useGameTimer';
import { useToast } from './hooks/useToast';

function App() {
  const [board, setBoard] = useState(getInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [stats, setStats] = useState(loadStats());
  const [countdown, setCountdown] = useState<number | null>(null);
  const { toast, showToast, hideToast } = useToast();
  
  const winner = checkWinner(board);
  const isDraw = checkDraw(board);
  const elapsedTime = useGameTimer(stats.startTime);

  const resetGame = useCallback(() => {
    setBoard(getInitialBoard());
    setCurrentPlayer('X');
    setCountdown(null);
    if (winner || isDraw) {
      setStats(prev => ({
        ...updatePlayerStats(prev, winner),
        startTime: Date.now(),
      }));
    }
  }, [winner, isDraw]);

  const handleStatsReset = useCallback(() => {
    setStats(loadStats());
  }, []);

  useEffect(() => {
    if (winner || isDraw) {
      setCountdown(7);
    }
  }, [winner, isDraw]);

  useEffect(() => {
    if (countdown === null) return;
    
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleCellClick = (index: number) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="container mx-auto p-8">
        <ThemeSwitcher />
        <ResetStats onReset={handleStatsReset} />

        <div className="bg-white dark:bg-dark-surface rounded-xl shadow-xl">
          <h1 className="text-4xl font-bold text-center py-8 border-b border-gray-200 dark:border-dark-border">
            Tic Tac Toe
          </h1>

          <div className="flex flex-col lg:flex-row gap-8 p-8">
            <div className="flex-1 flex flex-col items-center justify-center">
              <GameStatus
                winner={winner}
                isDraw={isDraw}
                currentPlayer={currentPlayer}
              />
              <Board
                board={board}
                winningCombination={winner ? checkWinner(board, true) : null}
                onCellClick={handleCellClick}
              />
            </div>

            <div className="flex-1 lg:border-l lg:border-gray-200 dark:lg:border-dark-border lg:pl-8">
              <StatsDisplay
                stats={stats}
                elapsedTime={elapsedTime}
                currentPlayer={currentPlayer}
              />
            </div>
          </div>
        </div>

        {(winner || isDraw) && countdown !== null && (
          <GameOverModal
            winner={winner}
            isDraw={isDraw}
            countdown={countdown}
            onNewGame={resetGame}
          />
        )}

        {toast && <Toast message={toast} onClose={hideToast} />}
      </div>
    </div>
  );
}

export default App;