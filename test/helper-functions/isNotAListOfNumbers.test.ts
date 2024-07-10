import { isNotAListOfNumbers } from "../../src/validation-fucntions";

describe("isNotAListOfNumbers", () => {
  test("Should return false if given an array of numbers", () => {
    const list = [1, 2, 3, 4, 5] as unknown;
    expect(isNotAListOfNumbers(list)).toBe(false);
  });

  test("Should return true if given an array of strings", () => {
    const list = ["foo", "bar"] as unknown;
    expect(isNotAListOfNumbers(list)).toBe(true);
  });

  test("Should return true if given an array of booleans", () => {
    const list = [true, false, false] as unknown;
    expect(isNotAListOfNumbers(list)).toBe(true);
  });

  test("Should return true given an array of objects", () => {
    const list = [{ foo: "Bar" }];
    expect(isNotAListOfNumbers(list)).toBe(true);
  });
});
