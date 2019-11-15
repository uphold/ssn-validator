'use strict';

/**
 * Module dependencies.
 */

const { isValid, mask } = require('../src');

/**
 * `Social Security Number` samples.
 */

const numbers = {
  invalid: ['011-234-567', '011#23#4567', '011  23--4567', '0-1-1    234567', '078051120', '219099999', '457555462'],
  valid: ['011-23-4567', '011-23 4567', '011 23 4567', '011234567']
};

/**
 * Test `ssn-validator`.
 */

describe('SsnValidator', () => {
  describe('isValid()', () => {
    it('should return `false` if number is invalid', () => {
      numbers.invalid.forEach(number => expect(isValid(number)).toBeFalsy());
    });

    it('should return `true` if number is valid', () => {
      numbers.valid.forEach(number => expect(isValid(number)).toBeTruthy());
    });
  });

  describe('mask()', () => {
    it('should throw an error if value is invalid', () => {
      try {
        mask(numbers.invalid[0]);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toEqual('Invalid Social Security Number');
      }
    });

    it('should mask a valid value', () => {
      expect(mask(numbers.valid[0])).toEqual('XXX-XX-4567');
      expect(mask(numbers.valid[1])).toEqual('XXX-XX 4567');
      expect(mask(numbers.valid[2])).toEqual('XXX XX 4567');
      expect(mask(numbers.valid[3])).toEqual('XXXXX4567');
    });
  });
});
