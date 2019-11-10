"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
////////////////////////////////////////////////////////////////////////////////
// Assertion Helpers
// Notes:
// - Assertion functions require their declaration to be name-qualified at runtime (not anonymous), ie; arrow-functions not allowed
////////////////////////////////////////////////////////////////////////////////
var assert_1 = require("assert");
/**
 * Generates an type assertion message for the given `value`
 *
 * @param value value being type-checked
 * @param type the expected value as a string; eg 'string', 'boolean', 'number'
 * @param variableName the name of the variable being type-checked
 */
exports.AssertionMessage = function (value, type, variableName) {
    var message = variableName
        ? variableName + " must be of type '" + type + "', " + typeof value + " provided"
        : "expected value of type '" + type + "', '" + typeof value + "' provided";
    return message;
};
/**
 * Type-checks the provided `value` to be a string, throws an AssertionError if
 * it is not
 *
 * @param value the value to type-check as a string
 * @param variableName the name of the variable to be type-checked
 * @throws {AssertionError}
 */
function assertIsString(value, variableName) {
    assert(typeof value === "string", exports.AssertionMessage(value, "string", variableName));
}
exports.assertIsString = assertIsString;
/**
 * Type-checks the provided `value` to be a boolean, throws an AssertionError
 * if it is not
 *
 * @param value the value to type-check as a boolean
 * @param variableName the name of the variable to be type-checked
 * @throws {AssertionError}
 */
function assertIsBoolean(value, variableName) {
    assert(typeof value === "boolean", exports.AssertionMessage(value, "boolean", variableName));
}
exports.assertIsBoolean = assertIsBoolean;
/**
 * Type-checks the provided 'value' to be a number, throws an AssertionError if
 * it is not
 *
 * @param value the value to type-check as a number
 * @param variableName the name of the variable to be type-checked
 * @throws {AssertionError}
 */
function assertIsNumber(value, variableName) {
    assert(typeof value === "number" && !isNaN(value), exports.AssertionMessage(value, "number", variableName));
}
exports.assertIsNumber = assertIsNumber;
/**
 * Type-checks the provided `value` to be an array, throws an AssertionError if
 * it is not
 *
 * @param value the value to type-check as an array
 * @param variableName the name of the variable to be type-checked
 * @throws {AssertionError}
 */
function assertIsArray(value, variableName) {
    assert(Array.isArray(value), exports.AssertionMessage(value, "array", variableName));
}
exports.assertIsArray = assertIsArray;
/**
 * Type-checks the provided `value` to be null, throws an AssertionError if it
 * is not
 *
 * @param value the value to type-check as null
 * @param variableName the name of the variable to be type-checked
 * @throws {AssertionError}
 */
function assertIsNull(value, variableName) {
    assert(value === null, exports.AssertionMessage(value, "null", variableName));
}
exports.assertIsNull = assertIsNull;
/**
 * Type-checks the provided `value` to be undefined, throws an AssertionError if
 * it is not
 *
 * @param value the value to type-check as undefined
 * @param variableName the name of the variable to be type-checked
 * @throws {AssertionError}
 */
function assertIsUndefined(value, variableName) {
    assert(typeof value === "undefined", exports.AssertionMessage(value, "undefined", variableName));
}
exports.assertIsUndefined = assertIsUndefined;
/**
 * General assertion helper. Asserts the provided `condition` is met, if it is
 * not, throws an AssertionError with the provided `message`
 *
 * @param condition the condition to be asserted
 * @throws {AssertionError}
 */
function assert(condition, message) {
    if (!condition) {
        throw new assert_1.AssertionError({ message: message });
    }
}
exports.assert = assert;
