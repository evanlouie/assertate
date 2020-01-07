import {
  setAssertionMessage,
  assert,
  assertIsArray,
  assertIsBoolean,
  assertIsNull,
  assertIsNumber,
  assertIsBigInt,
  assertIsString,
  assertIsUndefined,
  assertIsSymbol,
  getType,
  isNumber,
  isBigInt,
  isString,
  isBoolean,
  isArray,
  isObject,
  isSymbol,
  isNull,
  isUndefined,
  assertIsObject
} from "../src/index";

const testValues = [
  "",
  "foo",
  "123",
  0,
  Number.MIN_VALUE,
  Number.MAX_VALUE,
  NaN,
  BigInt(0),
  BigInt(Number.MAX_VALUE),
  BigInt(Number.MIN_VALUE - 1),
  true,
  false,
  [],
  [0, 1, 2, 3],
  [null],
  [undefined],
  {},
  { foo: "bar", baz: 123 },
  Symbol(),
  Symbol(123),
  null,
  undefined
];
const stringList = testValues.filter(value => getType(value) === "string");
const numberList = testValues.filter(value => getType(value) === "number");
const bigintList = testValues.filter(value => getType(value) === "bigint");
const booleanList = testValues.filter(value => getType(value) === "boolean");
const arrayList = testValues.filter(value => Array.isArray(value));
const objectList = testValues.filter(value => getType(value) === "object");
const symbolList = testValues.filter(value => getType(value) === "symbol");
const nullList = testValues.filter(value => getType(value) === "null");
const undefinedList = testValues.filter(
  value => getType(value) === "undefined"
);

/**
 * Helper to check that `assertion` throws an error
 *
 * @param assertion the assertion which should throw
 */
function shouldThrow(assertion: (...args: any) => void) {
  let error: Error | undefined;
  try {
    assertion();
  } catch (err) {
    error = err;
  }
  expect(error).toBeDefined();
}

/**
 * Helper to check that `assertion` does not throw an error
 *
 * @param assertion the assertion which should pass
 */
function shouldNotThrow(assertion: (...args: any) => void) {
  let error: Error | undefined;
  try {
    assertion();
  } catch (err) {
    error = err;
  }
  expect(error).toBeUndefined();
}

describe("isString", () => {
  test("strings pass", () => {
    for (const str of stringList) {
      expect(isString(str)).toBe(true);
    }
  });

  test("non-strings fail", () => {
    for (const nonStr of testValues.filter(v => getType(v) !== "string")) {
      expect(isString(nonStr)).toBe(false);
    }
  });
});

describe("isNumber", () => {
  test("numbers pass", () => {
    for (const num of numberList) {
      expect(isNumber(num)).toBe(true);
    }
  });

  test("non-numbers fail", () => {
    for (const nonNum of testValues.filter(v => getType(v) !== "number")) {
      expect(isNumber(nonNum)).toBe(false);
    }
  });
});

describe("isBigInt", () => {
  test("bigint pass", () => {
    for (const bigint of bigintList) {
      expect(isBigInt(bigint)).toBe(true);
    }
  });

  test("non-bigint fail", () => {
    for (const nonBigInt of testValues.filter(v => getType(v) !== "bigint")) {
      expect(isBigInt(nonBigInt)).toBe(false);
    }
  });
});

describe("isBoolean", () => {
  test("booleans pass", () => {
    for (const bool of booleanList) {
      expect(isBoolean(bool)).toBe(true);
    }
  });

  test("non-booleans fail", () => {
    for (const nonBoolean of testValues.filter(v => getType(v) !== "boolean")) {
      expect(isBoolean(nonBoolean)).toBe(false);
    }
  });
});

describe("isArray", () => {
  test("arrays pass", () => {
    for (const arr of arrayList) {
      expect(isArray(arr)).toBe(true);
    }
  });

  test("non-array fail", () => {
    for (const nonArr of testValues.filter(v => !Array.isArray(v))) {
      expect(isArray(nonArr)).toBe(false);
    }
  });
});

describe("isObject", () => {
  test("objects pass", () => {
    for (const obj of objectList) {
      expect(isObject(obj)).toBe(true);
    }
  });

  test("non-objects fail", () => {
    for (const nonObj of testValues.filter(v => getType(v) !== "object")) {
      expect(isObject(nonObj)).toBe(false);
    }
  });
});

describe("isSymbol", () => {
  test("symbols pass", () => {
    for (const sym of symbolList) {
      expect(isSymbol(sym)).toBe(true);
    }
  });

  test("non-symbols fail", () => {
    for (const nonSym of testValues.filter(v => getType(v) !== "symbol")) {
      expect(isSymbol(nonSym)).toBe(false);
    }
  });
});

describe("isNull", () => {
  test("nulls pass", () => {
    for (const n of nullList) {
      expect(isNull(n)).toBe(true);
    }
  });

  test("non-symbols fail", () => {
    for (const nonNull of testValues.filter(v => getType(v) !== "null")) {
      expect(isNull(nonNull)).toBe(false);
    }
  });
});

describe("isUndefined", () => {
  test("undefined pass", () => {
    for (const undef of undefinedList) {
      expect(isUndefined(undef)).toBe(true);
    }
  });

  test("defined fail", () => {
    for (const defined of testValues.filter(v => getType(v) !== "undefined")) {
      expect(isUndefined(defined)).toBe(false);
    }
  });
});

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
    for (const arr of arrayList) {
      shouldNotThrow(() => assertIsArray(arr));
    }
  });

  for (const nonArray of testValues.filter(v => !Array.isArray(v))) {
    test(`${getType(nonArray)} throws`, () => {
      shouldThrow(() => assertIsArray(nonArray));
    });
  }
});

describe("assertIsBoolean", () => {
  test("boolean does not throw", () => {
    for (const bool of booleanList) {
      shouldNotThrow(() => assertIsBoolean(bool));
    }
  });

  for (const nonBool of testValues.filter(v => getType(v) !== "boolean")) {
    test(`${getType(nonBool)} throws`, () => {
      shouldThrow(() => assertIsBoolean(nonBool));
    });
  }
});

describe("assertIsNull", () => {
  test("null does not throw", () => {
    for (const nullIsh of nullList) {
      shouldNotThrow(() => assertIsNull(nullIsh));
    }
  });

  for (const nonNull of testValues.filter(v => getType(v) !== "null")) {
    test(`${getType(nonNull)} throws`, () => {
      shouldThrow(() => assertIsNull(nonNull));
    });
  }
});

describe("assertIsNumber", () => {
  test("number does not throw", () => {
    for (const num of numberList) {
      shouldNotThrow(() => assertIsNumber(num));
    }
  });

  test("NaN does not throw when includeNaN set to true", () => {
    shouldNotThrow(() => assertIsNumber(NaN));
    shouldNotThrow(() => assertIsNumber(NaN, undefined, true));
    shouldNotThrow(() => assertIsNumber(NaN, "foo", true));
  });

  test("Nan throws when includeNaN set to false", () => {
    shouldThrow(() => assertIsNumber(NaN, "foo", false));
  });

  for (const nonNum of testValues.filter(v => getType(v) !== "number")) {
    test(`${getType(nonNum)} throws`, () => {
      shouldThrow(() => assertIsNumber(nonNum));
    });
  }
});

describe("assertIsBigInt", () => {
  test("bigint does not throw", () => {
    for (const bigint of bigintList) {
      shouldNotThrow(() => assertIsBigInt(bigint));
    }
  });

  for (const nonBigInt of testValues.filter(v => getType(v) !== "bigint")) {
    test(`${getType(nonBigInt)} throws`, () => {
      shouldThrow(() => assertIsBigInt(nonBigInt));
    });
  }
});

describe("assertIsString", () => {
  test("string does not throw", () => {
    for (const str of stringList) {
      shouldNotThrow(() => assertIsString(str));
    }
  });

  for (const nonStr of testValues.filter(v => getType(v) !== "string")) {
    test(`${getType(nonStr)} throws`, () => {
      shouldThrow(() => assertIsString(nonStr));
    });
  }
});

describe("assertIsUndefined", () => {
  test("undefined does not throw", () => {
    for (const undef of undefinedList) {
      shouldNotThrow(() => assertIsUndefined(undef));
    }
  });

  for (const nonUndef of testValues.filter(v => getType(v) !== "undefined")) {
    test(`${getType(nonUndef)} throws`, () => {
      shouldThrow(() => assertIsUndefined(nonUndef));
    });
  }
});

describe("assertIsObject", () => {
  test("objects do not throw", () => {
    for (const obj of objectList) {
      shouldNotThrow(() => assertIsObject(obj));
    }
  });

  for (const nonObj of testValues.filter(v => getType(v) !== "object")) {
    test(`${getType(nonObj)} throws`, () => {
      shouldThrow(() => assertIsObject(nonObj));
    });
  }
});

describe("assertIsSymbol", () => {
  test("symbols do not throw", () => {
    for (const sym of symbolList) {
      shouldNotThrow(() => assertIsSymbol(sym));
    }
  });

  for (const nonSym of testValues.filter(v => getType(v) !== "symbol")) {
    test(`${getType(nonSym)} throws`, () => {
      shouldThrow(() => assertIsSymbol(nonSym));
    });
  }
});

describe("setAssertionMessage", () => {
  test("it is the default when not modified and variable name not provided", () => {
    let error: Error | undefined;
    try {
      assertIsNumber("not a number");
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error!.message).toBe(
      "expected value of type 'number', 'string' provided"
    );
  });

  test("it is the default when not modified and variable name provided", () => {
    let error: Error | undefined;
    try {
      assertIsNumber("not a number", "foobar");
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error!.message).toBe(
      "foobar must be of type 'number', 'string' provided"
    );
  });

  test("it is the custom message when set", () => {
    setAssertionMessage(
      (value, type, variableName) =>
        `I am a custom message: ${value} | ${type} | ${variableName}`
    );
    let error: Error | undefined;
    try {
      assertIsNumber("not a number", "foobar");
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error!.message).toBe(
      "I am a custom message: not a number | number | foobar"
    );
  });
});
