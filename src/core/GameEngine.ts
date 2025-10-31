import { Cell, Position } from '../types/types';
import { ParsedLevel } from '../levels/LevelParser';

/**
 * Represents the current state of the game
 */
export interface GameState {
  grid: Cell[][];
  playerPos: Position;
  boxes: Set<string>;
  goals: Set<string>;
  moveCount: number;
  levelName: string;
}

/**
 * Handles game logic and state management for Sokoban
 */
export class GameEngine {
  private state: GameState;

  constructor(level: ParsedLevel) {
    this.state = {
      grid: level.grid,
      playerPos: { ...level.playerPos },
      boxes: new Set(level.boxes),
      goals: new Set(level.goals),
      moveCount: 0,
      levelName: level.levelName
    };
  }

  /**
   * Get current game state (read-only)
   */
  getState(): Readonly<GameState> {
    return this.state;
  }

  /**
   * Check if the level is completed (all boxes on goals)
   */
  isLevelComplete(): boolean {
    for (const box of this.state.boxes) {
      if (!this.state.goals.has(box)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Attempt to move the player in a direction
   * Returns true if move was successful
   */
  move(direction: 'up' | 'down' | 'left' | 'right'): boolean {
    const delta = this.getDirectionDelta(direction);
    const newPos: Position = {
      x: this.state.playerPos.x + delta.x,
      y: this.state.playerPos.y + delta.y
    };

    // Check if new position is valid (not a wall)
    if (!this.isValidPosition(newPos)) {
      return false;
    }

    const newPosKey = this.posToKey(newPos);

    // Check if there's a box at the new position
    if (this.state.boxes.has(newPosKey)) {
      // Try to push the box
      const boxNewPos: Position = {
        x: newPos.x + delta.x,
        y: newPos.y + delta.y
      };

      // Check if box can be pushed
      if (!this.isValidPosition(boxNewPos)) {
        return false; // Can't push into wall
      }

      const boxNewPosKey = this.posToKey(boxNewPos);
      if (this.state.boxes.has(boxNewPosKey)) {
        return false; // Can't push into another box
      }

      // Move the box
      this.state.boxes.delete(newPosKey);
      this.state.boxes.add(boxNewPosKey);
    }

    // Move the player
    this.state.playerPos = newPos;
    this.state.moveCount++;
    return true;
  }

  /**
   * Reset the level to initial state
   */
  reset(level: ParsedLevel): void {
    this.state = {
      grid: level.grid,
      playerPos: { ...level.playerPos },
      boxes: new Set(level.boxes),
      goals: new Set(level.goals),
      moveCount: 0,
      levelName: level.levelName
    };
  }

  /**
   * Get the delta for a direction
   */
  private getDirectionDelta(direction: 'up' | 'down' | 'left' | 'right'): Position {
    switch (direction) {
      case 'up': return { x: 0, y: -1 };
      case 'down': return { x: 0, y: 1 };
      case 'left': return { x: -1, y: 0 };
      case 'right': return { x: 1, y: 0 };
    }
  }

  /**
   * Check if a position is valid (within bounds and not a wall)
   */
  private isValidPosition(pos: Position): boolean {
    if (pos.y < 0 || pos.y >= this.state.grid.length) {
      return false;
    }
    if (pos.x < 0 || pos.x >= this.state.grid[0].length) {
      return false;
    }
    return this.state.grid[pos.y][pos.x] !== 'wall';
  }

  /**
   * Convert position to string key for Set operations
   */
  private posToKey(pos: Position): string {
    return `${pos.x},${pos.y}`;
  }
}
