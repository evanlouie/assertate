////////////////////////////////////////////////////////////////////////////////
// Assertion Helpers
// Notes:
// - Assertion functions require their declaration to be name-qualified at runtime (not anonymous), ie; arrow-functions not allowed
////////////////////////////////////////////////////////////////////////////////

/**
 * Generates an type assertion message for the given `value`
 *
 * @param value value being type-checked
 * @param type the expected value as a string; eg 'string', 'boolean', 'number'
 * @param variableName the name of the variable being type-checked
 */
function AssertionMessage(
  value: string,
  type: string,
  variableName?: string
): string {
  const message = variableName
    ? `${variableName} must be of type '${type}', ${typeof value} provided`
    : `expected value of type '${type}', '${typeof value}' provided`;
  return message;
}

/**
 * Type-checks the provided `value` to be a string, throws an Error if it is not
 *
 * @param value the value to type-check as a string
 * @param variableName the name of the variable to be type-checked
 * @throws {Error}
 */
export function assertIsString(
  value: any,
  variableName?: string
): asserts value is string {
  assert(
    typeof value === "string",
    AssertionMessage(value, "string", variableName)
  );
}

/**
 * Type-checks the provided `value` to be a boolean, throws an Error if it is
 * not
 *
 * @param value the value to type-check as a boolean
 * @param variableName the name of the variable to be type-checked
 * @throws {Error}
 */
export function assertIsBoolean(
  value: any,
  variableName?: string
): asserts value is boolean {
  assert(
    typeof value === "boolean",
    AssertionMessage(value, "boolean", variableName)
  );
}

/**
 * Type-checks the provided 'value' to be a number, throws an Error if it is not
 *
 * @param value the value to type-check as a number
 * @param variableName the name of the variable to be type-checked
 * @throws {Error}
 */
export function assertIsNumber(
  value: any,
  variableName?: string
): asserts value is number {
  assert(
    typeof value === "number" && !isNaN(value),
    AssertionMessage(value, "number", variableName)
  );
}

/**
 * Type-checks the provided `value` to be an array, throws an Error if it is not
 *
 * @param value the value to type-check as an array
 * @param variableName the name of the variable to be type-checked
 * @throws {Error}
 */
export function assertIsArray<T>(
  value: any,
  variableName?: string
): asserts value is T[] {
  assert(Array.isArray(value), AssertionMessage(value, "array", variableName));
}

/**
 * Type-checks the provided `value` to be null, throws an Error if it is not
 *
 * @param value the value to type-check as null
 * @param variableName the name of the variable to be type-checked
 * @throws {Error}
 */
export function assertIsNull(
  value: any,
  variableName?: string
): asserts value is null {
  assert(value === null, AssertionMessage(value, "null", variableName));
}

/**
 * Type-checks the provided `value` to be undefined, throws an Error if it is
 * not
 *
 * @param value the value to type-check as undefined
 * @param variableName the name of the variable to be type-checked
 * @throws {Error}
 */
export function assertIsUndefined(
  value: any,
  variableName?: string
): asserts value is undefined {
  assert(
    typeof value === "undefined",
    AssertionMessage(value, "undefined", variableName)
  );
}

/**
 * General assertion helper. Asserts the provided `condition` is met, if it is
 * not, throws an Error with the provided `message`
 *
 * @param condition the condition to be asserted
 * @throws {Error}
 */
export function assert(condition: any, message?: string): asserts condition {
  if (!condition) {
    throw Error(message);
  }
}
