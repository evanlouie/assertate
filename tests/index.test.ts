import {
  assert,
  assertIsArray,
  assertIsBoolean,
  assertIsNull,
  assertIsNumber,
  assertIsString,
  assertIsUndefined
} from "../src/index";

/**
 * Returns a refined type of an object. Defaults to `typeof` unless the value is
 * an array or null, in which case 'array' or 'null' is returned
 *
 * @param value value to get the type of
 */
const getType = (value: any): string => {
  const type = typeof value;
  if (type !== "object") {
    return type;
  }
  if (Array.isArray(value)) {
    return "array";
  }
  if (value === null) {
    return "null";
  }

  return "object";
};

/**
 * Helper to check that `assertion` throws an error
 *
 * @param assertion the assertion which should throw
 */
const shouldThrow = (assertion: (...args: any) => void) => {
  let error: Error | undefined;
  try {
    assertion();
  } catch (err) {
    error = err;
  }
  expect(error).not.toBeUndefined();
};

/**
 * Helper to check that `assertion` does not throw an error
 *
 * @param assertion the assertion which should pass
 */
const shouldNotThrow = (assertion: (...args: any) => void) => {
  let error: Error | undefined;
  try {
    assertion();
  } catch (err) {
    error = err;
  }
  expect(error).toBeUndefined();
};

describe("assert", () => {
  test("passing assertions to not throw", () => {
    shouldNotThrow(() => assert(typeof 123 === "number", "should not throw"));
  });

  test("non-passing assertions throw", () => {
    shouldThrow(() => assert(typeof 123 === "string", "should throw"));
  });
});

describe("assertIsArray", () => {
  test("array does not throw", () => {
    for (const arr of [[], [1, 2, 3]]) {
      shouldNotThrow(() => assertIsArray(arr));
    }
  });

  for (const nonArray of ["not an array", 123, true, undefined, null, {}]) {
    test(`${getType(nonArray)} throws`, () => {
      shouldThrow(() => assertIsArray(nonArray));
    });
  }
});

describe("assertIsBoolean", () => {
  test("boolean does not throw", () => {
    for (const bool of [true, false]) {
      shouldNotThrow(() => assertIsBoolean(bool));
    }
  });

  for (const nonBool of ["not a boolean", 123, undefined, null, {}, []]) {
    test(`${getType(nonBool)} throws`, () => {
      shouldThrow(() => assertIsBoolean(nonBool));
    });
  }
});

describe("assertIsNull", () => {
  test("null does not throw", () => {
    shouldNotThrow(() => assertIsNull(null));
  });

  for (const nonNull of ["foo", 123, true, undefined, {}, []]) {
    test(`${getType(nonNull)} throws`, () => {
      shouldThrow(() => assertIsNull(nonNull));
    });
  }
});

describe("assertIsNumber", () => {
  test("number does not throw", () => {
    for (const num of [123, 0, -123, Number.MAX_VALUE]) {
      shouldNotThrow(() => assertIsNumber(num));
    }
  });

  test("NaN does throw", () => {
    shouldThrow(() => assertIsNumber(NaN));
  });

  for (const nonNum of ["not a number", true, undefined, null, {}, []]) {
    test(`${getType(nonNum)} throws`, () => {
      shouldThrow(() => assertIsNumber(nonNum));
    });
  }
});

describe("assertIsString", () => {
  test("string does not throw", () => {
    for (const str of ["", "123", "im a string"]) {
      shouldNotThrow(() => assertIsString(str));
    }
  });

  for (const nonStr of [123, true, undefined, null, {}, []]) {
    test(`${getType(nonStr)} throws`, () => {
      shouldThrow(() => assertIsString(nonStr));
    });
  }
});

describe("assertIsUndefined", () => {
  test("undefined does not throw", () => {
    shouldNotThrow(() => assertIsUndefined(undefined));
  });

  for (const nonUndef of ["foo", 123, true, null, {}, []]) {
    test(`${getType(nonUndef)} throws`, () => {
      shouldThrow(() => assertIsUndefined(nonUndef));
    });
  }
});
