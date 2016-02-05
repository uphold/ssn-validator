
/**
 * Module dependencies.
 */

import { default as isValidSsn, mask } from '../src';
import should from 'should';

/**
 * SSN sample numbers.
 */

const invalidNumbers = [
  '00123456',
  '078051120',
  '219099999',
  '457555462'
];
const validNumbers = [
  '011234567',
  '021234567',
  '031234567'
];

/**
 * Test.
 */

describe('isValidSsn', () => {
  describe('default()', () => {
    it('should return `false` if ssn is invalid', () => {
      for (const ssn of invalidNumbers) {
        isValidSsn(ssn).should.be.false();
      }
    });

    it('should return `true` if ssn is valid', () => {
      for (const ssn of validNumbers) {
        isValidSsn(ssn).should.be.true();
      }
    });
  });

  describe('mask()', () => {
    it('should mask a valid ssn', () => {
      mask('031234567').should.equal('XXXXX4567');
    });

    it('should throw an error if ssn is invalid', () => {
      try {
        mask('457-55-5462');

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Error);
        e.message.should.equal('Invalid Social Security Number');
      }
    });
  });
});
