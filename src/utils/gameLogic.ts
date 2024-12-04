import { Board, Player } from '../types/game';

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export const checkWinner = (board: Board, returnCombination?: boolean): Player | null | number[] => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return returnCombination ? combination : board[a];
    }
  }
  return null;
};

export const checkDraw = (board: Board): boolean => {
  return board.every(cell => cell !== null);
};

export const getInitialBoard = (): Board => Array(9).fill(null);