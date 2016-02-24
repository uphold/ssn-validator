
/**
 * Module dependencies.
 */

import should from 'should';
import { isValid, mask } from '../src';

/**
 * `Social Security Number` samples.
 */

const numbers = {
  invalid: ['00123456', '001_23_456', '078051120f', '219#09#9999'],
  valid: {
    format: ['011-23-4567', '021 23 4567', '031-23-4567'],
    soft: ['0-1-1    23 4567', '021 - 23 - 4 567', '-0 3 1 2 3-45 6 7'],
    strict: ['011234567', '021234567', '031234567']
  }
};

/**
 * Test `ssn-validator`.
 */

describe('SsnValidator', () => {
  describe('isValid()', () => {
    it('should return false if number is invalid', () => {
      for (let i = 0; i < numbers.invalid.length; i++) {
        isValid(numbers.invalid[i], { strict: 'format' }).should.be.false();
        isValid(numbers.invalid[i], { strict: false }).should.be.false();
        isValid(numbers.invalid[i], { strict: true }).should.be.false();
      }
    });

    it('should return true for strict and formatted numbers if strict is format', () => {
      const invalid = [].concat(numbers.invalid, numbers.valid.soft);
      const valid = [].concat(numbers.valid.format, numbers.valid.strict);

      for (let i = 0; i < invalid.length; i++) {
        isValid(invalid[i], { strict: 'format' }).should.be.false();
      }

      for (let i = 0; i < valid.length; i++) {
        isValid(valid[i], { strict: 'format' }).should.be.true();
      }
    });

    it('should return true for all valid numbers if strict is false', () => {
      const valid = [].concat(numbers.valid.format, numbers.valid.soft, numbers.valid.strict);

      for (let i = 0; i < numbers.invalid.length; i++) {
        isValid(numbers.invalid[i], { strict: false }).should.be.false();
      }

      for (let i = 0; i < valid.length; i++) {
        isValid(valid[i], { strict: false }).should.be.true();
      }
    });

    it('should return true only for strict numbers if strict is true', () => {
      const invalid = [].concat(numbers.invalid, numbers.valid.format, numbers.valid.soft);
      const valid = numbers.valid.strict;

      for (let i = 0; i < invalid.length; i++) {
        isValid(invalid[i], { strict: true }).should.be.false();
      }

      for (let i = 0; i < valid.length; i++) {
        isValid(valid[i], { strict: true }).should.be.true();
      }
    });

    it('should be `strict` by default', () => {
      isValid(numbers.valid.format[0]).should.be.false();
      isValid(numbers.valid.soft[0]).should.be.false();
      isValid(numbers.valid.strict[0]).should.be.true();
    });
  });

  describe('mask()', () => {
    it('should throw an error if value is invalid', () => {
      try {
        mask(numbers.invalid[0]);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Error);
        e.message.should.equal('Invalid Social Security Number');
      }
    });

    it('should mask a valid value', () => {
      mask(numbers.valid.format[0], { strict: 'format' }).should.equal('XXX-XX-4567');
      mask(numbers.valid.soft[0], { strict: false }).should.equal('X-X-X    XX 4567');
      mask(numbers.valid.strict[0], { strict: true }).should.equal('XXXXX4567');
    });
  });
});
