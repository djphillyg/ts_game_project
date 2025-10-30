# JavaScript Command-Line Interpreter Template

A lightweight template for building CLI applications using Bun, extracted from the ASCII Art Factory project.

## Features

- **Command-based architecture** - Easy-to-extend command structure
- **Argument parsing** - Handles flags (--key=value, --key value, -k) and positional arguments
- **Built-in validation** - Custom error classes for better error handling
- **Help system** - Automatic help generation for commands
- **Bun-powered** - Fast execution and dependency management
- **Linting & Formatting** - ESLint and Prettier preconfigured

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Installation

```bash
# Install dependencies
bun install

# Make the CLI executable (if not already)
chmod +x index.js

# Link globally (optional)
bun link
```

### Usage

```bash
# Run directly
bun run index.js <command> [options]

# Or if linked globally
mycli <command> [options]

# Show all commands
mycli --help

# Show help for a specific command
mycli <command> --help
```

### Example Commands

```bash
# Hello command
mycli hello --name=World
mycli hello --name=Alice --greeting=Hi

# Example command
mycli example --option1=value --flag1
```

## Project Structure

```
js_commandline_interpreter/
├── index.js         # Main CLI entry point with command definitions
├── parser.js        # Argument parsing logic
├── errors.js        # Custom error classes
├── package.json     # Project configuration for Bun
├── eslint.config.js # ESLint configuration
├── .prettierrc      # Prettier configuration
└── README.md        # This file
```

## Adding New Commands

To add a new command, add an entry to the `commands` object in `index.js`:

```javascript
const commands = {
  mycommand: {
    aliases: ['mc'],                    // Short aliases
    description: 'Does something cool', // Brief description
    usage: 'mycommand [options]',       // Usage string
    options: [                          // Available options
      '--option1=<value> Description',
      '--flag1 Boolean flag',
    ],
    examples: [                         // Usage examples
      'mycommand --option1=value',
    ],
    validator: (options) => {          // Validation function
      const { flags } = options
      if (!flags.option1) {
        throw new ValidationError('--option1 is required')
      }
    },
    handler: (options) => {            // Command logic
      const { flags, positional } = options
      // Implement your command here
      console.log('Command executed!')
    },
  },
}
```

## Command Structure

Each command has the following properties:

- **aliases**: Array of short command names
- **description**: Brief description shown in help
- **usage**: Usage pattern shown in command help
- **options**: Array of option descriptions
- **examples**: Array of example usage strings
- **validator**: Function to validate arguments (optional)
- **handler**: Function that executes the command logic

### Options Object

The `options` parameter passed to validators and handlers contains:

```javascript
{
  flags: {
    // Named flags like --name=value or -n value
    name: 'value',
    flag: true,  // Boolean flags
  },
  positional: [
    // Arguments without flags
    'arg1', 'arg2'
  ]
}
```

## Development

```bash
# Run with auto-reload on changes
bun run dev

# Lint code
bun run lint

# Fix linting issues
bun run lint:fix

# Format code
bun run format

# Check formatting
bun run format:check
```

## Error Handling

The template includes custom error classes in `errors.js`:

- **CLIError**: General CLI errors
- **ValidationError**: Argument validation failures
- **ParseError**: Argument parsing errors

Use these for consistent error handling:

```javascript
import { ValidationError } from './errors.js'

if (!isValid) {
  throw new ValidationError('Invalid input')
}
```

## Argument Parsing

The parser supports multiple flag formats:

```bash
# Double dash with equals
--name=value

# Double dash with space
--name value

# Single dash
-n value

# Boolean flags
--flag
-f

# Negative numbers (not treated as flags)
--count=-5
```

## License

MIT
