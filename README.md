# Assertate

> TypeScript 3.7 assertion helper library

A minimal library exposing basic
[TypeScript 3.7 assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
helpers with the goal of providing the out of the box assertions that most
people need and have to rewrite for every project.

## Requirements

| Requirement | Version   | Note |
| ----------- | --------- | ---- |
| TypeScript  | `>=3.7.0` | \*   |
| ECMA-262    |           | \*\* |

- \* This library will work both with vanilla JavaScript as well as lower
  versions of TypeScript. Assertions will throw Errors when the in all
  environments, however the the TS compiler will only know the narrowed type
  after an assertion passes in version `>=3.7.0`.
- \*\* This library offers helpers around
  [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
  and
  [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol).
  These functions may not work on some browsers which do not yet support those
  APIs.

## Installation

```sh
yarn add assertate
```

Or

```sh
npm install assertate
```

## Examples

### The Basics

The library provides the of the box assertions and control flow type-predicates
functions that you will need to validate basic data and primitive types.

```typescript
import {
  assert,
  assertIsNumber,
  getAssertionMessage,
  getType,
  isNumber,
  isString,
  setAssertionMessage
} from "assertate";

////////////////////////////////////////////////////////////////////////////////
// Control-flow type-predicates
//------------------------------------------------------------------------------
// This feature has been in TypeScript for a while and is the foundation for
// being able to write type assertions.
// Using the `is...` functions, we can do type narrowing of using control-flow
// operators and functions such as `if` and `.filter`
////////////////////////////////////////////////////////////////////////////////
const stringA: unknown = "a";
const stringB: unknown = "b";
const numberA: unknown = 123;

if (isNumber(numberA)) {
  // compiler now knows that in this if block, `anotherNumber` is a number
  const numberAAsFixedPointZero = numberA.toFixed(0);
}

const stringsAsUpper = [stringA, stringB, numberA]
  .filter(isString)
  .map(str => str.toUpperCase()); // compiler knows that it is mapping over strings

////////////////////////////////////////////////////////////////////////////////
// Error/Exception based assertions
//------------------------------------------------------------------------------
// Use the `assertIs...` and `assert` functions for exception based assertions.
// These assertions use the `is...` type predicates under the hood and our
// useful for allowing  based control flows.
////////////////////////////////////////////////////////////////////////////////
try {
  const someUndefinedVar: unknown = undefined;
  assertIsNumber(someUndefinedVar); // will throw an Error
} catch (err) {
  console.error(err); // An assertion Error will be logged
}

const someNumber: unknown = 123.456;
assertIsNumber(someNumber); // will not throw
// compiler now knows `someNumber` is a number and has all instance methods that a number has
const asFixedPointZero = someNumber.toFixed(0);

////////////////////////////////////////////////////////////////////////////////
// General assertion
//------------------------------------------------------------------------------
// use the `assert` function if you need to write or compose more custom
// assertions
////////////////////////////////////////////////////////////////////////////////
const someNumberOrString: unknown = "123";
// you can compose the `is` assertions using `assert`
// compiler now knows someNumberOrString is of type `number | string`
assert(isNumber(someNumberOrString) || isString(someNumberOrString));

// you can write custom standard type-guards using assert as well
assert(typeof someNumberOrString === "string");
// compiler now knows that someNumberOrString is a string
const someNumberOrStringChars = someNumberOrString.split(",");

////////////////////////////////////////////////////////////////////////////////
// Set your own assertion messages
//------------------------------------------------------------------------------
// A default assertion message is provided; will most likely be good enough for
// most cases
////////////////////////////////////////////////////////////////////////////////
const defaultAssertionMessage = getAssertionMessage();
setAssertionMessage(
  (someValue, expectedType) =>
    `Im your message! Expected a ${expectedType}, got a ${getType(someValue)}`
);
try {
  const aNumber: unknown = 123;
  assertIsString(aNumber);
} catch (err) {
  console.log(err); // An error with message 'Im your message! Expected a string, got a number' will be logged
}
```

### Complex Example -- Assertions on your domain data

When interacting with data over the wire, its important that we validate the
data we receive is valid to what our domain logic expects. With assertions, we
can safely validate the data we receive both matches the expected types, but
also add custom domain logic to validate that the data has the a valid value.

```typescript
////////////////////////////////////////////////////////////////////////////////
// In this example we our going to write a Wizard validator.
// A Wizard is just a human that can do magic!
////////////////////////////////////////////////////////////////////////////////
type Human = {
  name: string;
  age: number;
};

type Magical = {
  canDoMagic: true;
};

type Wizard = Human & Magical;

////////////////////////////////////////////////////////////////////////////////
// Now lets write some type-predicates to validate our domain logic
////////////////////////////////////////////////////////////////////////////////
/**
 * Determines if the `value` is a valid Human
 * - Has some non-empty string name
 * - Age is greater than 0
 */
function isHuman(value: unknown): value is Human {
  // we can now validate the data in the object matches our expected types
  if (isObject(value) && isString(value?.name) && isNumber(value?.age)) {
    const { name, age } = value; // compiler knows `name` is a string and `age` is a number
    // we can do our own custom validations against the type-checked data as well
    // humans must be older than 0 and have a non-empty string name
    if (age >= 0 && name.length > 0) {
      return true;
    }
  }
  return false;
}

/**
 * Determines if the `value` has a magical property
 */
function isMagical(value: unknown): value is Magical {
  return isObject(value) && value?.magical === true;
}

/**
 * Determines if the `value` is a Wizard
 * - is a human
 * - is magical
 */
function isWizard(value: unknown): value is Wizard {
  return isHuman(value) && isMagical(value);
}

////////////////////////////////////////////////////////////////////////////////
// Lets write some type assertions that use the type-predicates we wrote
////////////////////////////////////////////////////////////////////////////////
/**
 * Asserts that `value` is a Human object
 */
function assertIsHuman(value: unknown): asserts value is Human {
  assert(isHuman(value));
}

/**
 * Asserts that `value` is a Magical object
 */
function assertIsMagical(value: unknown): asserts value is Magical {
  assert(isMagical(value));
}

/**
 * Asserts that `value` is a Wizard
 */
function assertIsWizard(value: unknown): asserts value is Wizard {
  assert(isWizard(value));
}

////////////////////////////////////////////////////////////////////////////////
// Now imagine the following two humans are fetched from over the wire and that
// we know absolutely nothing about the data received.
// For the sake of the example, we know that they both have the 3 valid
// properties needed to be type-checked; but when receiving them from over
// a REST endpoint or some random JSON file, we would know absolutely nothing.
// The data retrieved could be a list, an object, a number, a string, anything.
//
// With the `assertIs...` functions we wrote, we can validate that:
//  - the data received is in fact an object
//  - the object has the expected keys
//  - the values of the keys conform to our expected domain logic for Human,
//    Magical, and Wizard
////////////////////////////////////////////////////////////////////////////////
// Dr. Strange? He's magic!
const stephenStrange: unknown = {
  name: "Stephen Strange",
  age: 90, // born 1930
  canDoMagic: true
};

// Iron Man? sadly not
const tonyStark: unknown = {
  name: "Tony Stark",
  age: 50, // born 1970
  canDoMagic: false
};

assertIsHuman(stephenStrange); // no Error thrown
assertIsHuman(tonyStark); // no Error thrown
// compiler now knows that both people are humans
for (const person of [stephenStrange, tonyStark]) {
  try {
    assertIsMagical(person); // no Error thrown for stephenStrange, Error thrown for tonyStark
    assertIsWizard(person); // no Error thrown for stephenStrange, code won't be reached for tonyStark
  } catch (err) {
    console.error(`${person.name} isn't a wizard :(`); // we can access `person.name` because the compiler knows the person is a human
  }
}
```

## API

Swing by the [docs](https://evanlouie.github.io/assertate/) to get a full look
at the available functions.
