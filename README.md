# Social Security Number (SSN)

[![build status][travis-image]][travis-url]

This modules allows you to check if a number is a valid.

## Installation

Choose your preferred method:

* npm: `npm install --save is-valid-ssn`
* Download: [is-valid-ssn](https://github.com/seegno/is-valid-ssn)

## Usage

*NOTE:* The input number **must not** be formatted to `xxx-xxxxxx`.

> Check if number is valid.

```js
import isValidSsn from 'is-valid-ssn';

isValidSsn('xxxxxxxxx');
```

> Mask the number.

```js
import { mask } from 'is-valid-ssn';

mask('xxxxxxxxx');
```

## Running tests

```sh
npm test
```

[travis-image]: https://img.shields.io/travis/seegno/is-valid-ssn.svg?style=flat-square
[travis-url]: https://travis-ci.org/seegno/is-valid-ssn

## Credits

Many thanks to [miguelmota/is-valid-ssn](https://github.com/miguelmota/is-valid-ssn) for the original inspiration.
