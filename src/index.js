
/**
 * Social Security number (SSN) is a nine-digit number issued to U.S. citizens, permanent residents,
 * and * temporary (working) residents under section 205(c)(2) of the Social Security Act, codified
 * as 42 U.S.C. 405(c)(2).
 *
 * See `http://www.irs.gov/Individuals/General-ITIN-Information` for more information.
 */

/**
 * Blacklist.
 */

const blacklist = ['078051120', '219099999', '457555462'];

/**
 * Expression.
 */

const expression = /^(?!666|000|9\d{2})\d{3}[- ]{0,1}(?!00)\d{2}[- ]{0,1}(?!0{4})\d{4}$/;

/**
 * Validate function.
 */

export function isValid(value) {
  if (!expression.test(value)) {
    return false;
  }

  return blacklist.indexOf(value.replace(/\D/g, '')) === -1;
}

/**
 * Mask the SSN with "X" placeholders to protect sensitive data,
 * while keeping some of the original digits for contextual recognition.
 *
 * E.g. "123456789" -> "XXXXX6789", "123-45-6789" -> "XXX-XX-6789".
 */

export function mask(value) {
  if (!isValid(value)) {
    throw new Error('Invalid Social Security Number');
  }

  return `${value.substr(0, value.length - 4).replace(/[\w]/g, 'X')}${value.substr(-4)}`;
}
