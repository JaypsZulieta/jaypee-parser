import { isNotAnObject } from "../src/validation-fucntions";

describe("isNotAnObject", () => {
  test("Should return true if the data passed is NOT an object.", () => {
    const data = "foo" as unknown;
    expect(isNotAnObject(data)).toBe(true);
  });

  test("Should return false if the data IS an object.", () => {
    const data = { message: "Hello, World" };
    expect(isNotAnObject(data)).toBe(false);
  });

  test("Should return false if the data is an empty object", () => {
    const data = {};
    expect(isNotAnObject(data)).toBe(false);
  });
});
