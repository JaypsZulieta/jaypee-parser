import { isNotABoolean, isNotANumber } from "../../src/validation-fucntions";

describe("isNotABoolean", () => {
  test("Should return true if the data passed is NOT a boolean", () => {
    const data = "Foo" as unknown;
    expect(isNotABoolean(data)).toBe(true);
  });

  test("Should return false if the data passed is number 1", () => {
    const data = 1 as unknown;
    expect(isNotANumber(data)).toBe(false);
  });

  test("Should return false if the data passed is number 0", () => {
    const data = 0 as unknown;
    expect(isNotANumber(data)).toBe(false);
  });

  test("Should return false if the data passed IS a boolean", () => {
    const data = true as unknown;
    expect(isNotABoolean(data)).toBe(false);
  });
});
