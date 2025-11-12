import React, { useState, useEffect } from 'react'
import { Box, Text, useInput, useApp } from 'ink'
import { GameEngine, GameState, Direction } from '../core/GameEngine'
import { LevelParser, ParsedLevel } from '../levels/LevelParser'

interface GameComponentProps {
  levelPath: string
}

interface InkKeyInput {
  upArrow: boolean
  downArrow: boolean
  leftArrow: boolean
  rightArrow: boolean
  pageDown: boolean
  pageUp: boolean
  return: boolean
  escape: boolean
  ctrl: boolean
  shift: boolean
  tab: boolean
  backspace: boolean
  delete: boolean
  meta: boolean
}

/**
 * Main game component for rendering Sokoban in the terminal
 */
export const GameComponent: React.FC<GameComponentProps> = ({ levelPath }) => {
  const { exit } = useApp()
  const [engine, setEngine] = useState<GameEngine | null>(null)
  const [state, setState] = useState<GameState | null>(null)
  const [renderedGrid, setRenderedGrid] = useState<string | null>(null)
  const [message, setMessage] = useState<string>('')
  console.log(JSON.stringify(state))
  // TODO: Initialize the game
  // 1. Load level from levelPath using LevelParser.parseFromFile()
  // 2. Create new GameEngine with parsed level
  // 3. Set engine and state
  // 4. Set initial message with controls
  useEffect(() => {
    // YOUR CODE HERE
    const loadedLevel: ParsedLevel = LevelParser.parseFromFile(levelPath)
    console.log(loadedLevel, 'this is the loaded level')
    const newEngine: GameEngine = new GameEngine(loadedLevel)
    setEngine(newEngine)
    setState(newEngine.getState())
    setRenderedGrid(newEngine.render())
  }, [levelPath])

  function renderGrid(): React.ReactNode {
    // YOUR CODE HERE
    return <Text>${renderedGrid}</Text>
  }

  // TODO: Handle keyboard input
  // 1. Check for 'q' or 'Q' to quit (use exit())
  // 2. Check for 'r' or 'R' to restart level
  // 3. Check for arrow keys (key.upArrow, key.downArrow, etc.)
  // 4. Call engine.move() with appropriate direction
  // 5. Update state after move
  // 6. Check if level is complete with engine.isLevelComplete()
  /**
   *  {
  upArrow: true,
  downArrow: false,
  leftArrow: false,
  rightArrow: false,
  pageDown: false,
  pageUp: false,
  return: false,
  escape: false,
  ctrl: false,
  shift: false,
  tab: false,
  backspace: false,
  delete: false,
  meta: false
}
   */
  /**
   *  {
  upArrow: false,
  downArrow: false,
  leftArrow: true,
  rightArrow: false,
  pageDown: false,
  pageUp: false,
  return: false,
  escape: false,
  ctrl: false,
  shift: false,
  tab: false,
  backspace: false,
  delete: false,
  meta: false
}
   */
  useInput((input: string, key: InkKeyInput) => {
    if (!engine) return // Guard against null engine

    // YOUR CODE HERE
    // do a switch up,down, left, right, and then the exit key

    if (key.upArrow) {
      engine.move('up')
      console.log('Up arrow pressed')
    } else if (key.downArrow) {
      engine.move('down')
      console.log('Down arrow pressed')
    } else if (key.leftArrow) {
      engine.move('left')
      console.log('Left arrow pressed')
    } else if (key.rightArrow) {
      engine.move('right')
      console.log('Right arrow pressed')
    } else if (key.escape) {
      console.log('Exiting game')
      exit()
    } else {
      console.log('We need a valid key mama')
    }
    setRenderedGrid(engine.render())
    if (engine.isLevelComplete()) {
      console.log('the level is complete!!!!!')
    }
  })

  if (!state || !engine) {
    return <Text>Loading game...</Text>
  }

  // TODO: Render the game UI
  // 1. Display level name
  // 2. Display move count
  // 3. Render the grid (call renderGrid helper)
  // 4. Display message/instructions
  return (
    <Box flexDirection="column" padding={1}>
      {/* YOUR CODE HERE */}
      {renderGrid()}
    </Box>
  )
}

/**
 * TODO: Render the game grid with proper symbols
 *
 * For each cell in the grid, determine what to display:
 * - Player on goal: '+' (green)
 * - Player: '@' (green)
 * - Box on goal: '*' (magenta/purple)
 * - Box: '$' (yellow)
 * - Goal: '.' (blue)
 * - Wall: '#' (white)
 * - Floor: ' ' (space)
 *
 * Tips:
 * - Use state.grid to iterate rows and columns
 * - Check state.playerPos to find player position
 * - Use state.boxes.has(`${x},${y}`) to check for boxes
 * - Use state.goals.has(`${x},${y}`) to check for goals
 * - Return array of <Text> components for each row
 */
