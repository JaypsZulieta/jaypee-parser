import { isNotAListOfStrings } from "../../src/validation-functions";

describe("isNotAListOfStrings", () => {
  test("Should return false if given a list of strings", () => {
    const list = ["Foo", "Bar"] as unknown;
    expect(isNotAListOfStrings(list)).toBe(false);
  });

  test("Should return true if given a list of numbers", () => {
    const list = [1, 2, 3] as unknown;
    expect(isNotAListOfStrings(list)).toBe(true);
  });

  test("Should return true if given a list of booleans", () => {
    const list = [true, false, true, true, false] as unknown;
    expect(isNotAListOfStrings(list)).toBe(true);
  });

  test("Should return true if given a list that have string items but not all are strings", () => {
    const list = [1, 2, true, "foo", "bar"] as unknown;
    expect(isNotAListOfStrings(list)).toBe(true);
  });
});
