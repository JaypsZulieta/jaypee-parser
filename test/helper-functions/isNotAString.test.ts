import { isNotAString } from "../../src/validation-functions";

describe("isNotAString", () => {
  test("Should return true if the data passed is NOT a string.", () => {
    const data = 69 as unknown;
    expect(isNotAString(data)).toBe(true);
  });

  test("Should return false if the data passed IS a string.", () => {
    const data = "Foo" as unknown;
    expect(isNotAString(data)).toBe(false);
  });
});
