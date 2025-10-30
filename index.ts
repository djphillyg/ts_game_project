#!/usr/bin/env bun
/**
 * CLI Template - Basic command-line interpreter structure
 */

import { CLIError, ValidationError, ParseError } from './errors.js'

// Command type definition
interface Command {
  aliases: string[]
  description: string
  usage: string
  options: string[]
  examples: string[]
  validator: (options: any) => void
  handler: (options: any) => void
}

// Command definitions - add your commands here
const commands: Record<string, Command> = {
  hello: {
    aliases: ['h'],
    description: 'Say hello to someone',
    usage: 'hello [options]',
    options: [
      '--name=<name> The name to greet (required)',
      '--greeting=<greeting> Custom greeting (default: "Hello")',
    ],
    examples: ['hello --name=World', 'hello --name=Alice --greeting=Hi'],
    validator: (options: any) => {
      const { flags } = options

      if (!flags.name) {
        throw new ValidationError(
          'Error: --name is required. Please specify a name to greet.'
        )
      }
    },
    handler: (options: any) => {
      const { flags } = options
      const greeting = flags.greeting || 'Hello'
      console.log(`${greeting}, ${flags.name}!`)
    },
  },

  // Add more commands here following the same pattern
  example: {
    aliases: ['ex'],
    description: 'Example command to demonstrate structure',
    usage: 'example [options]',
    options: [
      '--option1=<value> Description of option 1',
      '--flag1 Boolean flag example',
    ],
    examples: ['example --option1=value', 'example --flag1'],
    validator: (options: any) => {
      // Add validation logic here
      const { flags } = options
      // Example validation
      if (flags.option1 && flags.option1.length === 0) {
        throw new ValidationError('Error: --option1 cannot be empty.')
      }
    },
    handler: (options: any) => {
      // Add command logic here
      const { flags, positional } = options
      console.log('Example command executed!')
      console.log('Flags:', flags)
      console.log('Positional args:', positional)
    },
  },
}

/**
 * Helper function to find a command by name or alias
 * @param {string} commandName - Command name to find
 * @returns {Command|null} Command object or null if not found
 */
function findCommand(commandName: string): Command | null {
  if (!commandName) return null

  // Check direct command name
  if (commands[commandName]) {
    return commands[commandName]
  }

  // Check aliases
  for (const [, cmd] of Object.entries(commands)) {
    if (cmd.aliases && cmd.aliases.includes(commandName)) {
      return cmd
    }
  }

  return null
}

/**
 * Validates command-line arguments
 * @param {string[]} args - Arguments to validate
 * @returns {string} The command name
 * @throws {Error} If validation fails
 */
function validateArguments(args: any): any {
  // Check if no arguments provided at all
  if (args.length === 0) {
    throw new CLIError('Error: No command provided.')
  }

  // Check if they just want help
  if (args.length === 1 && args[0] === '--help') {
    showGeneralHelp()
    process.exit(0)
  }

  const [commandName] = args

  // Check if command name is malformed (starts with -)
  if (commandName && commandName.startsWith('-')) {
    throw new ParseError(
      'Error: Invalid command format. Commands cannot start with dashes.'
    )
  }

  // Validate flag format - check for malformed flags
  const remainingArgs = args.slice(1)
  for (const arg of remainingArgs) {
    if (arg.startsWith('--') && arg.length === 2) {
      throw new ParseError(
        'Error: Invalid flag format. Empty flag "--" is not allowed.'
      )
    }
    if (arg.startsWith('-') && arg.length === 1) {
      throw new ParseError(
        'Error: Invalid flag format. Empty flag "-" is not allowed.'
      )
    }
    if (arg.startsWith('---')) {
      throw new ParseError(
        'Error: Invalid flag format. Flags cannot start with "---".'
      )
    }
  }

  return commandName
}

/**
 * Displays general help message
 */
function showGeneralHelp() {
  console.log(`
Usage: mycli <command> [options]

Commands:`)

  Object.entries(commands).forEach(([name, cmd]: [string, Command]) => {
    const aliases = cmd.aliases.length ? ` (${cmd.aliases.join(', ')})` : ''
    console.log(
      `  ${name}${aliases.padEnd(20 - name.length)} ${cmd.description}`
    )

    // Show examples if they exist
    if (cmd.examples && cmd.examples.length > 0) {
      console.log('    Examples:')
      cmd.examples.forEach((example: any) => {
        console.log(`      mycli ${example}`)
      })
      console.log('') // Add spacing after examples
    }
  })

  console.log(`    Global Options:
  --help, -h           Show help for command

Use "mycli <command> --help" for more information about a command.`)
}

/**
 * Main entry point
 */
function main() {
  console.log('hello world!')
}

// Run the CLI
main()
