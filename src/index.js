'use strict';

/**
 * Social Security number (SSN) is a nine-digit number issued to U.S. citizens, permanent residents,
 * and * temporary (working) residents under section 205(c)(2) of the Social Security Act, codified
 * as 42 U.S.C. 405(c)(2).
 *
 * See `http://www.irs.gov/Individuals/General-ITIN-Information` for more information.
 */

/**
 * Excludes repeated numbers as TIN e.g. 111111111.
 */

const repeatedNumbers = Array.from({ length: 10 }, (_, i) => i).map(current => String(current).repeat(9));

/**
 * Blacklist.
 */

const blacklist = ['078051120', '219099999', '457555462'].concat(repeatedNumbers);

/**
 * Excludes ascending and descending sequence as TIN e.g. 123456789.
 */

const sequence = Array.from({ length: 10 }, (_, i) => i).reduce((acc, current) => acc + current, '').repeat(2);
const reverseSequence = sequence.split('').reverse().join('');

/**
 * Expression.
 */
const expression = /^(?!666|000|9\d{2})\d{3}[- ]{0,1}(?!00)\d{2}[- ]{0,1}(?!0{4})\d{4}$/;

/**
 * Validate function.
 */

function isValid(value) {
  if (!expression.test(value)) {
    return false;
  }

  if (blacklist.indexOf(value.replace(/\D/g, '')) !== -1) {
    return false;
  }

  return !sequence.includes(value) && !reverseSequence.includes(value);
}

/**
 * Mask the SSN with "X" placeholders to protect sensitive data,
 * while keeping some of the original digits for contextual recognition.
 *
 * E.g. "123456789" -> "XXXXX6789", "123-45-6789" -> "XXX-XX-6789".
 */

function mask(value) {
  if (!isValid(value)) {
    throw new Error('Invalid Social Security Number');
  }

  return `${value.substr(0, value.length - 4).replace(/[\w]/g, 'X')}${value.substr(-4)}`;
}

/**
 * Exports.
 */

module.exports = { isValid, mask };
