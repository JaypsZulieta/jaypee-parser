import { isNotAListOfObjects } from "../../src/validation-functions";

describe("isNotAListOfObjects", () => {
  test("Should return false if given a list of objects", () => {
    const list = [{ foo: "Bar" }] as unknown;
    expect(isNotAListOfObjects(list)).toBe(false);
  });

  test("Should return true if given a list of numbers", () => {
    const list = [1, 2, 3, 4, 5] as unknown;
    expect(isNotAListOfObjects(list)).toBe(true);
  });

  test("Should return true if given a list of strings", () => {
    const list = ["Foo", "Bar"] as unknown;
    expect(isNotAListOfObjects(list)).toBe(true);
  });

  test("Should return true if given a list of booleans", () => {
    const list = [true, false, true] as unknown;
    expect(isNotAListOfObjects(list)).toBe(true);
  });
});
