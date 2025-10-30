/**
 * Custom Error classes for better error handling and debugging
 */

/**
 * Base error class for CLI-related errors
 */
export class CLIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CLIError'
  }
}

/**
 * Error thrown when validation of input arguments fails
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 * Error thrown when parsing arguments fails
 */
export class ParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ParseError'
  }
}