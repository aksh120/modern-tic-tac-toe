import { GameStats, Player, PlayerStats } from '../types/game';

const STORAGE_KEY = 'tictactoe_stats';

const getDefaultPlayerStats = (): PlayerStats => ({
  gamesWon: 0,
  gamesLost: 0,
  gamesPlayed: 0,
});

export const getDefaultStats = (): GameStats => ({
  roundNumber: 1,
  startTime: Date.now(),
  playerStats: {
    'X': getDefaultPlayerStats(),
    'O': getDefaultPlayerStats()
  }
});

export const loadStats = (): GameStats => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultStats();
    
    const parsedStats = JSON.parse(stored);
    // Ensure the stats object has all required properties
    return {
      roundNumber: parsedStats.roundNumber ?? 1,
      startTime: parsedStats.startTime ?? Date.now(),
      playerStats: {
        'X': {
          gamesWon: parsedStats.playerStats?.X?.gamesWon ?? 0,
          gamesLost: parsedStats.playerStats?.X?.gamesLost ?? 0,
          gamesPlayed: parsedStats.playerStats?.X?.gamesPlayed ?? 0
        },
        'O': {
          gamesWon: parsedStats.playerStats?.O?.gamesWon ?? 0,
          gamesLost: parsedStats.playerStats?.O?.gamesLost ?? 0,
          gamesPlayed: parsedStats.playerStats?.O?.gamesPlayed ?? 0
        }
      }
    };
  } catch {
    return getDefaultStats();
  }
};

export const saveStats = (stats: GameStats): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
};

export const updatePlayerStats = (
  stats: GameStats,
  winner: Player | null
): GameStats => {
  const newStats = {
    ...stats,
    playerStats: {
      'X': { ...stats.playerStats['X'] },
      'O': { ...stats.playerStats['O'] }
    }
  };

  if (winner) {
    newStats.playerStats[winner].gamesWon++;
    newStats.playerStats[winner === 'X' ? 'O' : 'X'].gamesLost++;
  }

  newStats.playerStats['X'].gamesPlayed++;
  newStats.playerStats['O'].gamesPlayed++;
  newStats.roundNumber++;
  
  saveStats(newStats);
  return newStats;
};