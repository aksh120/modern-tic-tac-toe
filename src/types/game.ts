export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];
export type GameStatus = 'playing' | 'won' | 'draw';

export interface PlayerStats {
  gamesWon: number;
  gamesLost: number;
  gamesPlayed: number;
}

export interface GameStats {
  roundNumber: number;
  startTime: number;
  playerStats: Record<Player, PlayerStats>;
}