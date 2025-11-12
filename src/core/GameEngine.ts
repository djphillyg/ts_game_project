import { Cell, Position } from '../types/types'
import { ParsedLevel } from '../levels/LevelParser'

/**
 * Represents the current state of the game
 */
export interface GameState {
  grid: Cell[][]
  playerPos: Position
  boxes: Set<string>
  goals: Set<string>
  moveCount: number
  levelName: string
}

export type Direction = 'up' | 'down' | 'left' | 'right'

/**
 * Handles game logic and state management for Sokoban
 */
export class GameEngine {
  private state: GameState

  constructor(level: ParsedLevel) {
    console.log(level, 'this is the level')
    this.state = {
      grid: level.grid,
      playerPos: { ...level.playerPos },
      boxes: new Set([...level.boxes]),
      goals: new Set([...level.goals]),
      moveCount: 0,
      levelName: level.levelName,
    }
  }

  /**
   * Get current game state (read-only)
   */
  getState(): Readonly<GameState> {
    return this.state
  }
  // render the game for the UI
  render(): string {
    // create visual representation grid
    const visual: string[][] = this.state.grid.map(row =>
      row.map(cell => {
        switch (cell) {
          case 'wall':
            return '#'
          case 'floor':
            return ' '
          case 'goal':
            return '.'
          case 'box on goal':
            return '*'
          default:
            return ' '
        }
      })
    )
    // place goals - .
    for (const goalKey of this.state.goals) {
      const [x, y] = goalKey.split(',').map(Number)
      if (visual[x][y] === ' ') {
        visual[x][y] = '.'
      }
    }

    // place boxes -
    for (const boxKey of this.state.boxes) {
      const [x, y] = boxKey.split(',').map(Number)
      // box on goal = '*', box on floor '$'
      visual[x][y] = this.state.goals.has(boxKey) ? '*' : '$'
    }
    // place player
    const playerKey = this.posToKey(this.state.playerPos)
    visual[this.state.playerPos.x][this.state.playerPos.y] =
      this.state.goals.has(playerKey) ? '+' : '@'

    // convert to string with newlines
    return visual.map(row => row.join('')).join('\n')
  }

  /**
   * Check if the level is completed (all boxes on goals)
   */
  isLevelComplete(): boolean {
    for (const box of this.state.boxes) {
      if (!this.state.goals.has(box)) {
        return false
      }
    }
    return true
  }

  /**
   * Attempt to move the player in a direction
   * Returns true if move was successful
   */
  move(direction: Direction): boolean {
    // first, retrieve the delta that would occur of the position move
    const directionDelta: Position = this.getDirectionDelta(direction)
    /**
     * now that we have the direction delta, we need to know what takes up that spot
     */
    const desiredPos: Position = {
      x: this.getState().playerPos.x + directionDelta.x,
      y: this.getState().playerPos.y + directionDelta.y,
    }
    console.log('desired position', desiredPos)
    // first check if its a valid position
    if (!this.isValidPosition(desiredPos)) {
      return false
    }
    // lets turn this into a pos key
    const desiredPosKey: string = this.posToKey(desiredPos)
    console.log(desiredPosKey, this.state.boxes)
    // case: in this position contains a box
    if (this.state.boxes.has(desiredPosKey)) {
      console.log('what is going on in here')
      console.log(this.state.boxes, desiredPosKey)
      // if this is true, we have to check the spot after
      // if it exists in the spot after, then we can move it over there
      const desiredBoxPos: Position = {
        x: desiredPos.x + directionDelta.x,
        y: desiredPos.y + directionDelta.y,
      }
      if (!this.isValidPosition(desiredBoxPos)) {
        return false
      }
      // its a valid position, so we should check if its a goal
      const desiredBoxPosKey: string = this.posToKey(desiredBoxPos)
      console.log('these should be equal', desiredBoxPosKey, this.state.goals)
      if (this.state.goals.has(desiredBoxPosKey)) {
        // remove the box from the grid
        this.state.boxes.delete(desiredPosKey)
        // change the grid to box on goal
        this.state.grid[desiredBoxPos.x][desiredBoxPos.y] = 'box on goal'
      } else {
        // theres no goal, so add the new position as a box
        this.state.boxes.add(desiredBoxPosKey)
      }
    }
    // move the player to the desired position
    this.state.playerPos = desiredPos
    // increase the move count
    this.state.moveCount++
    return true
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
      levelName: level.levelName,
    }
  }

  /**
   * Get the delta for a direction
   */
  private getDirectionDelta(direction: Direction): Position {
    switch (direction) {
      case 'up':
        return { x: -1, y: 0 }
      case 'down':
        return { x: 1, y: 0 }
      case 'left':
        return { x: 0, y: -1 }
      case 'right':
        return { x: 0, y: 1 }
    }
  }

  /**
   * Check if a position is valid (within bounds and not a wall)
   */
  private isValidPosition(pos: Position): boolean {
    if (pos.x < 0 || pos.x >= this.state.grid.length) {
      return false
    }
    if (pos.y < 0 || pos.y >= this.state.grid[0].length) {
      return false
    }
    return !['wall', 'box on goal'].includes(this.state.grid[pos.x][pos.y])
  }

  /**
   * Convert position to string key for Set operations
   */
  private posToKey(pos: Position): string {
    return `${pos.x},${pos.y}`
  }
}
