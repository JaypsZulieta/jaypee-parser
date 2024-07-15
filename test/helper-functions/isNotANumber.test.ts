import { isNotANumber } from "../../src/validation-functions";

describe("isNotANumber", () => {
  test("Should return true if the data passed is NOT a number.", () => {
    const data = "Foo" as unknown;
    expect(isNotANumber(data)).toBe(true);
  });

  test("Should return true if the data passed is a string of a number.", () => {
    const data = "69" as unknown;
    expect(isNotANumber(data)).toBe(true);
  });

  test("Should return false if the data passed IS a number.", () => {
    const data = 69 as unknown;
    expect(isNotANumber(data)).toBe(false);
  });
});
