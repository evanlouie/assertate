////////////////////////////////////////////////////////////////////////////////
// Assertion Helpers
////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a refined type of an object. Defaults to `typeof` unless the value is
 * null, in which case 'null' is returned
 *
 * @param value value to get the type of
 */
export function getType(value: unknown) {
  if (value === null) {
    return "null";
  }
  return typeof value;
}

export type AssertionMessageType = (
  value: unknown,
  type: string,
  variableName?: string,
  additionalMessage?: string
) => string;

/**
 * Generates an type assertion message for the given `value`
 *
 * @param value value being type-checked
 * @param type the expected value as a string; eg 'string', 'boolean', 'number'
 * @param variableName the name of the variable being type-checked
 * @param additionalMessage further information on failure
 */
let AssertionMessage: AssertionMessageType = (
  value,
  type,
  variableName?,
  additionalMessage?
): string => {
  let message = variableName
    ? `${variableName} must be of type '${type}', '${getType(value)}' provided`
    : `expected value of type '${type}', '${getType(value)}' provided`;
    return additionalMessage ? `${message}: ${additionalMessage}`: message
  };

/**
 * Sets the global AssertionMessage with the `message` provided
 *
 * @param message assertion message generator to replace the current generator with
 */
export function setAssertionMessage(message: AssertionMessageType) {
  AssertionMessage = message;
}

/**
 * Gets the currently set global AssertionMessage
 */
export function getAssertionMessage() {
  return AssertionMessage;
}

/**
 * Returns the boolean and hoisted type-check value that `value` is a number
 *
 * @param value value to type-check as a number
 */
export function isNumber(value: unknown): value is number {
  return getType(value) === "number";
}

/**
 * Returns the boolean and hoisted type-check value that `value` is a bigint
 *
 * @param value value to type-check as a bigint
 */
export function isBigInt(value: unknown): value is bigint {
  return getType(value) === "bigint";
}

/**
 * Returns the boolean and hoisted type-check value that `value` is a boolean
 *
 * @param value value to type-check as a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return getType(value) === "boolean";
}

/**
 * Returns the boolean and hoisted type-check value that `value` is a string
 *
 * @param value value to type-check as a string
 */
export function isString(value: unknown): value is string {
  return getType(value) === "string";
}

/**
 * Returns the boolean and hoisted type-check value that `value` is an array
 *
 * @param value value to type-check as an array
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Returns the boolean and hoisted type-check value that `value` is an object.
 * null is not considered an 'object'.
 *
 * @param value value to type-check as an object
 */
export function isObject<T extends { [key: string]: unknown }>(
  value: unknown
): value is T {
  return getType(value) === "object";
}

/**
 * Returns the boolean and hoisted type-check value that `value` is not undefined (NonNullable)
 *
 * @param value value to type-check as NonNullable
 */
export function isDefined(value: unknown): value is NonNullable<any> {
  return !(value === undefined || value === null);
}

/**
 * Returns the boolean and hoisted type-check value that `value` is undefined
 *
 * @param value value to type-check as undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return getType(value) === "undefined";
}

/**
 * Returns the boolean and hoisted type-check value that `value` is null
 *
 * @param value value to type-check as null
 */
export function isNull(value: unknown): value is null {
  return getType(value) === "null";
}

/**
 * Returns the boolean and hoisted type-check value that `value` is a symbol
 *
 * @param value value to type-check as a symbol
 */
export function isSymbol(value: unknown): value is symbol {
  return getType(value) === "symbol";
}

/**
 * Type-checks the provided `value` to be a string, throws an Error if it is not
 *
 * @param value the value to type-check as a string
 * @param variableName the name of the variable to be type-checked
 * @param additionalMessage further information on failure
 * @throws {Error}
 */
export function assertIsString(
  value: unknown,
  variableName?: string,
  additionalMessage?: string
): asserts value is string {
  assert(isString(value), AssertionMessage(value, "string", variableName, additionalMessage));
}

/**
 * Type-checks the provided `value` to be a boolean, throws an Error if it is
 * not
 *
 * @param value the value to type-check as a boolean
 * @param variableName the name of the variable to be type-checked
 * @param additionalMessage further information on failure
 * @throws {Error}
 */
export function assertIsBoolean(
  value: unknown,
  variableName?: string,
  additionalMessage?: string,
): asserts value is boolean {
  assert(isBoolean(value), AssertionMessage(value, "boolean", variableName, additionalMessage));
}

/**
 * Type-checks the provided 'value' to be a number, throws an Error if it is not
 *
 * @param value the value to type-check as a number
 * @param variableName the name of the variable to be type-checked
 * @param additionalMessage further information on failure
 * @throws {Error}
 */
export function assertIsNumber(
  value: unknown,
  variableName?: string,
  additionalMessage?: string
): asserts value is number {
  assert(isNumber(value), AssertionMessage(value, "number", variableName, additionalMessage));
}

/**
 * Type-checks the provided 'value' to be a bigint, throws an Error if it is not
 *
 * @param value the value to type-check as a bigint
 * @param variableName the name of the variable to be type-checked
 * @param additionalMessage further information on failure
 * @throws {Error}
 */
export function assertIsBigInt(
  value: unknown,
  variableName?: string,
  additionalMessage?: string
): asserts value is bigint {
  assert(isBigInt(value), AssertionMessage(value, "bigint", variableName, additionalMessage));
}

/**
 * Type-checks the provided `value` to be an array, throws an Error if it is not
 *
 * @param value the value to type-check as an array
 * @param variableName the name of the variable to be type-checked
 * @param additionalMessage further information on failure
 * @throws {Error}
 */
export function assertIsArray<T>(
  value: unknown,
  variableName?: string,
  additionalMessage?: string
): asserts value is T[] {
  assert(isArray(value), AssertionMessage(value, "array", variableName, additionalMessage));
}

/**
 * Type-checks the provided `value` to be null, throws an Error if it is not
 *
 * @param value the value to type-check as null
 * @param variableName the name of the variable to be type-checked
 * @param additionalMessage further information on failure
 * @throws {Error}
 */
export function assertIsNull(
  value: unknown,
  variableName?: string,
  additionalMessage?: string
): asserts value is null {
  assert(isNull(value), AssertionMessage(value, "null", variableName, additionalMessage));
}

/**
 * Type-checks the provided `value` to be an object, throws an Error if it is
 * not
 *
 * @param value the value to type-check as an object
 * @param variableName the name of the variable to be type-checked
 * @param additionalMessage further information on failure
 * @throws {Error}
 */
export function assertIsObject(
  value: unknown,
  variableName?: string,
  additionalMessage?: string
): asserts value is object {
  assert(isObject(value), AssertionMessage(value, "object", variableName, additionalMessage));
}

/**
 * Type-checks the provided `value` to be a symbol, throws an Error if it is not
 *
 * @param value the value to type-check as a symbol
 * @param variableName the name of the variable to be type-checked
 * @param additionalMessage further information on failure
 * @throws {Error}
 */
export function assertIsSymbol(
  value: unknown,
  variableName?: string,
  additionalMessage?: string
): asserts value is symbol {
  assert(isSymbol(value), AssertionMessage(value, "symbol", variableName, additionalMessage));
}

/**
 * Type-checks the provided `value` to be undefined, throws an Error if it is
 * not
 *
 * @param value the value to type-check as undefined
 * @param variableName the name of the variable to be type-checked
 * @param additionalMessage further information on failure
 * @throws {Error}
 */
export function assertIsUndefined(
  value: unknown,
  variableName?: string,
  additionalMessage?: string
): asserts value is undefined {
  assert(
    isUndefined(value),
    AssertionMessage(value, "undefined", variableName, additionalMessage)
  );
}

export function assertIsDefined(
  value: unknown,
  variableName?: string,
  additionalMessage?: string
): asserts value is NonNullable<any> {
    assert(
      isDefined(value),
      AssertionMessage(value, "defined", variableName, additionalMessage)
    );
  }
/**
 * General assertion helper. Asserts the provided `condition` is met, if it is
 * not, throws an Error with the provided `message`
 *
 * @param condition the condition to be asserted
 * @throws {Error}
 */
export function assert(
  condition: unknown,
  message?: string
): asserts condition {
  if (!condition) {
    throw Error(message);
  }
}
