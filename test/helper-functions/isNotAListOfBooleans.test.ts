import { isNotAListOfBooleans } from "../../src/validation-fucntions";

describe("isNotAListOfBooleans", () => {
  test("Should return false given a list of booleans", () => {
    const list = [true, false, true, false] as unknown;
    expect(isNotAListOfBooleans(list)).toBe(false);
  });

  test("Should return true given a list of numbers", () => {
    const list = [1, 2, 3, 4, , 5, 6, 7] as unknown;
    expect(isNotAListOfBooleans(list)).toBe(true);
  });

  test("Should return true given a list of strings", () => {
    const list = ["Foo", "Bar", "Baz"] as unknown;
    expect(isNotAListOfBooleans(list)).toBe(true);
  });

  test("Should return true given a list of objects", () => {
    const list = [{ foo: "Bar" }];
    expect(isNotAListOfBooleans(list)).toBe(true);
  });
});
