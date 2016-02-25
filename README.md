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
3. `[options.strict=true]` _(boolean|string)_: Whether or not formatting characters such as dashes or spaces should be rejected and if they must be in their precise location.

#### Returns
*(boolean)*:  Returns `true` if `value` is a valid Social Security Number, else `false`.

#### Example
```js
isValid({});
// => false

isValid('123-12-3123');
// => false

isValid('1-2-3123123', { strict: false });
// => true

isValid('1-2-3123123', { strict: 'format' });
// => false

isValid('123-12-3123', { strict: 'format' });
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
3. `[options.strict=true]` _(boolean|string)_: Whether or not formatting characters such as dashes or spaces should be rejected and if they must be in their precise location.

#### Returns
*(string)*: Returns the masked value.

#### Example
```js
mask({});
// Throws an Error.

mask('123-12-3123');
// Throws an Error.

mask('1-2-3123123', { strict: false });
// => X-X-XXX3123

mask('1-2-3123123', { strict: 'format' });
// Throws an Error.

mask('123-12-3123', { strict: 'format' });
// => XXX-XX-3123

mask('123123123');
// => XXXXX3123
```

* * *

## Tests

```sh
npm test
```

## Release

```sh
npm version [<newversion> | major | minor | patch] -m "Release %s"
```

## License
MIT

## Credits

Many thanks to [miguelmota/is-valid-ssn](https://github.com/miguelmota/is-valid-ssn) for the original inspiration.

[npm-image]: https://img.shields.io/npm/v/ssn-validator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ssn-validator
[travis-image]: https://img.shields.io/travis/seegno/ssn-validator.svg?style=flat-square
[travis-url]: https://img.shields.io/travis/seegno/ssn-validator.svg?style=flat-square
