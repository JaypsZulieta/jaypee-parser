import { Parser } from "../../src/parser";
import {
  NullFieldValidationException,
  ObjectArrayValidationException,
} from "../../src/validation-exception";

describe("Parser.getObjectsOrUndefined", () => {
  test("Should throw a NullFieldValidationException if the value is null", () => {
    const data = { list: null };
    expect(() => {
      Parser.parseFrom(data).getObjectsOrUndefined("list");
    }).toThrow(NullFieldValidationException);
  });

  test("Should throw a ObjectArrayValidationException if the value is not an array", () => {
    const data = { list: 420 };
    expect(() => {
      Parser.parseFrom(data).getObjectsOrUndefined("list");
    }).toThrow(ObjectArrayValidationException);
  });

  test("Should throw a ObjectArrayValidationException if the value is not an array of objects", () => {
    const data = { list: [1, 2, 3, 4, 5, 6, 7, 8] };
    expect(() => {
      Parser.parseFrom(data).getObjectsOrUndefined("list");
    }).toThrow(ObjectArrayValidationException);
  });

  test("Should return undefined if the value is undefined", () => {
    const data = {};
    expect(Parser.parseFrom(data).getObjectsOrUndefined("list")).toBeUndefined();
  });

  test("Should return an array of objects", () => {
    const data = { list: [{ name: "John" }, { name: "Joe" }] };
    expect(Parser.parseFrom(data).getObjectsOrUndefined("list")).toEqual([
      { name: "John" },
      { name: "Joe" },
    ]);
  });
});
