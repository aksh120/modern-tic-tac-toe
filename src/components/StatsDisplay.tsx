import React from 'react';
import { GameStats, Player } from '../types/game';

interface StatsDisplayProps {
  stats: GameStats;
  elapsedTime: string;
  currentPlayer: Player;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  elapsedTime,
  currentPlayer,
}) => {
  const players: Player[] = ['X', 'O'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800/80 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700 shadow-md theme-transition">
          <span className="theme-text-secondary block text-sm font-medium">Round</span>
          <p className="theme-text text-2xl font-bold mt-1">{stats.roundNumber}</p>
        </div>
        <div className="bg-white dark:bg-gray-800/80 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700 shadow-md theme-transition">
          <span className="theme-text-secondary block text-sm font-medium">Time</span>
          <p className="theme-text text-2xl font-mono mt-1">{elapsedTime}</p>
        </div>
        <div className="bg-white dark:bg-gray-800/80 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700 shadow-md theme-transition">
          <span className="theme-text-secondary block text-sm font-medium">Turn</span>
          <p className={`text-2xl font-bold mt-1 ${
            currentPlayer === 'X' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'
          } theme-transition`}>
            Player {currentPlayer}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800/80 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md theme-transition">
        <h2 className="text-xl font-bold mb-4 theme-text">Game Statistics</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 theme-border">
                <th className="text-left py-2 theme-text">Player</th>
                <th className="text-center py-2 theme-text">Won</th>
                <th className="text-center py-2 theme-text">Lost</th>
                <th className="text-center py-2 theme-text">Total</th>
              </tr>
            </thead>
            <tbody>
              {players.map(player => (
                <tr key={player} className="border-b theme-border">
                  <td className="py-3 font-semibold theme-text">Player {player}</td>
                  <td className="text-center text-green-600 dark:text-green-400 theme-transition">
                    {stats.playerStats[player]?.gamesWon ?? 0}
                  </td>
                  <td className="text-center text-red-600 dark:text-red-400 theme-transition">
                    {stats.playerStats[player]?.gamesLost ?? 0}
                  </td>
                  <td className="text-center theme-text">
                    {stats.playerStats[player]?.gamesPlayed ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};