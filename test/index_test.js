
/**
 * Module dependencies.
 */

import should from 'should';
import { isValid, mask } from '../src';

/**
 * `Social Security Number` samples.
 */

const numbers = {
  invalid: ['00123456', '078051120', '219099999', '457555462'],
  valid: ['011234567', '021234567', '031234567']
};

/**
 * Test `ssn-validator`.
 */

describe('SsnValidator', () => {
  describe('isValid()', () => {
    it('should return `false` if value is invalid', () => {
      for (let i = 0; i < numbers.invalid.length; i++) {
        isValid(numbers.invalid[i]).should.be.false();
      }
    });

    it('should return `false` if value is correctly formatted and `options.strict` is `true`', () => {
      isValid('011-23-4567', { strict: true }).should.be.false();
    });

    it('should return `false` if value is correctly formatted and `options.strict` is `false`', () => {
      isValid('011 -23  -  4567', { strict: false }).should.be.true();
    });

    it('should return `true` if value is valid and `options.strict` is `true`', () => {
      for (let i = 0; i < numbers.valid.length; i++) {
        isValid(numbers.valid[i], { strict: true }).should.be.true();
      }
    });

    it('should be `strict` by default', () => {
      isValid('011-23-4567').should.be.false();
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

    it('should throw an error even if value is correctly formatted', () => {
      try {
        mask('011-23-4567');

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Error);
        e.message.should.equal('Invalid Social Security Number');
      }
    });

    it('should mask a valid value if correctly formatted and `options.strict` is `false`', () => {
      mask('011-23-4567', { strict: false }).should.equal('XXX-XX-4567');
    });

    it('should mask a valid value', () => {
      mask(numbers.valid[0]).should.equal('XXXXX4567');
    });
  });
});
