'use strict';

/**
 * Module dependencies.
 */

const { isValid, mask } = require('../src');
const should = require('should');

/**
 * `Social Security Number` samples.
 */

const numbers = {
  invalid: ['011-234-567', '011#23#4567', '011  23--4567', '0-1-1    234567', '078051120', '219099999', '457555462', '123456789', '1234567890', '0123456789', '9012345678', '987654321', '876543210', '111111111'],
  valid: ['011-23-4567', '011-23 4567', '011 23 4567', '011234567']
};

/**
 * Test `ssn-validator`.
 */

describe('SsnValidator', () => {
  describe('isValid()', () => {
    it('should return `false` if number is invalid', () => {
      numbers.invalid.forEach(number => isValid(number).should.be.false());
    });

    it('should return `true` if number is valid', () => {
      numbers.valid.forEach(number => isValid(number).should.be.true());
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
      mask(numbers.valid[0]).should.equal('XXX-XX-4567');
      mask(numbers.valid[1]).should.equal('XXX-XX 4567');
      mask(numbers.valid[2]).should.equal('XXX XX 4567');
      mask(numbers.valid[3]).should.equal('XXXXX4567');
    });
  });
});
