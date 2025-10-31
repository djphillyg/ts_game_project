
export type Cell = 'wall' | 'floor' | 'goal'

export interface Position {
    x: number  // column (horizontal position)
    y: number  // row (vertical position)
}


export interface GameState {
    moveCount: number
    boxes: Set<Position>
    goals: Set<Position>
    playerPosition: Position
}

