# ssn-validator
Validate and mask U.S. Social Security Numbers.

## Status
[![npm version][npm-image]][npm-url] [![build status][travis-image]][travis-url]

## Installation
Install the package via `npm`:

```sh
npm install ssn-validator --save
```

## Usage

### `isValid(value, [options])`

This method validates if the given value is a valid `Social Security Number`.

#### Arguments

1. `value` *(&#42;)*: The value to validate.
2. `[options]` *(Object)*: The options object.
3. `[options.strict=true]` _(boolean)_: Whether or not formatting characters such as dashes or spaces should be rejected.

#### Returns
*(boolean)*:  Returns `true` if `value` is a valid Social Security Number, else `false`.

#### Example
```js
isValid({});
// => false

isValid('123-123-123');
// => false

isValid('123-123-123', { strict: false });
// => true

isValid('123123123');
// => true
```
--------------------------------------------------------------------------------

### `mask(value, [options])`

This method will help you protect this sensitive piece of information by obfuscating some digits.

#### Arguments

1. `value` *(&#42;)*: The value to mask.
2. `[options]` *(Object)*: The options object.
3. `[options.strict=true]` _(boolean)_: Whether or not formatting characters such as dashes or spaces should be rejected.

#### Returns
*(string)*: Returns the masked value.

#### Example
```js
mask({});
// Throws an Error.

mask('123-123-123');
// Throws an Error.

mask('123-123-123', { strict: false });
// => XXX-X23-123

mask('123123123');
// => XXXX23123
```

* * *

## Tests

```sh
npm test
```

## License
MIT

## Credits

Many thanks to [miguelmota/is-valid-ssn](https://github.com/miguelmota/is-valid-ssn) for the original inspiration.

[npm-image]: https://img.shields.io/npm/v/ssn-validator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ssn-validator
[travis-image]: https://img.shields.io/travis/seegno/ssn-validator.svg?style=flat-square
[travis-url]: https://img.shields.io/travis/seegno/ssn-validator.svg?style=flat-square
