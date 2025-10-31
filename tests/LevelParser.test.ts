import { describe, it, expect } from 'vitest';
import { LevelParser } from '../src/levels/LevelParser';

describe('LevelParser', () => {
  describe('parseFromString', () => {
    it('should parse a simple level with player, box, and goal', () => {
      const level = `#####
#@$.#
#####`;

      const result = LevelParser.parseFromString(level, 'test-level');

      expect(result.levelName).toBe('test-level');
      expect(result.playerPos).toEqual({ x: 1, y: 1 });
      expect(result.boxes.has('2,1')).toBe(true);
      expect(result.goals.has('3,1')).toBe(true);
    });

    it('should parse walls correctly', () => {
      const level = `###
#@#
###`;

      const result = LevelParser.parseFromString(level);

      expect(result.grid[0][0]).toBe('wall');
      expect(result.grid[0][1]).toBe('wall');
      expect(result.grid[0][2]).toBe('wall');
    });

    it('should parse floor cells correctly', () => {
      const level = `###
#@_#
###`;

      const result = LevelParser.parseFromString(level);

      expect(result.grid[1][1]).toBe('floor'); // @ on floor
      expect(result.grid[1][2]).toBe('floor'); // _ is floor
    });

    it('should parse goal cells correctly', () => {
      const level = `###
#.@#
###`;

      const result = LevelParser.parseFromString(level);

      expect(result.grid[1][1]).toBe('goal');
      expect(result.goals.has('1,1')).toBe(true);
    });

    it('should parse box on goal (*)correctly', () => {
      const level = `###
#*@#
###`;

      const result = LevelParser.parseFromString(level);

      expect(result.grid[1][1]).toBe('goal'); // Base terrain is goal
      expect(result.boxes.has('1,1')).toBe(true); // Box is at this position
      expect(result.goals.has('1,1')).toBe(true); // Goal is at this position
    });

    it('should parse player on goal (+) correctly', () => {
      const level = `###
#+$#
###`;

      const result = LevelParser.parseFromString(level);

      expect(result.grid[1][1]).toBe('goal'); // Base terrain is goal
      expect(result.playerPos).toEqual({ x: 1, y: 1 });
    });

    it('should throw error if no player exists', () => {
      const level = `###
#$.#
###`;

      expect(() => LevelParser.parseFromString(level)).toThrow('No player exists');
    });

    it('should throw error for invalid character', () => {
      const level = `###
#@X#
###`;

      expect(() => LevelParser.parseFromString(level)).toThrow('Invalid character');
    });

    it('should handle multiple boxes and goals', () => {
      const level = `#####
#@$$.#
#  ..#
#####`;

      const result = LevelParser.parseFromString(level);

      expect(result.boxes.size).toBe(2);
      expect(result.goals.size).toBe(3);
    });
  });
});