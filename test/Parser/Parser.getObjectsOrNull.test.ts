import { Parser } from "../../src/parser";
import {
  ObjectArrayValidationException,
  UndefinedFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getObjectsOrNull", () => {
  test("Should throw a UndefinedFieldValidationException if the value is undefined", () => {
    expect(() => {
      Parser.parseFrom({}).getObjectsOrNull("foo");
    }).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw a ObjectArrayValidationException if the value is not an array", () => {
    expect(() => {
      Parser.parseFrom({ list: 210 }).getObjectsOrNull("list");
    }).toThrow(ObjectArrayValidationException);
  });

  test("Should throw a ObjectArrayValidationException if the value is not an array of objects", () => {
    expect(() => {
      Parser.parseFrom({ list: [1, 2, 3] }).getObjectsOrNull("list");
    }).toThrow(ObjectArrayValidationException);
  });

  test("Should return null if the value is null", () => {
    const data = { list: null };
    expect(Parser.parseFrom(data).getObjectsOrNull("list")).toBeNull();
  });

  test("Should return an array of objects", () => {
    const data = { list: [{ name: "John" }, { name: "Jane" }] };
    expect(Parser.parseFrom(data).getObjectsOrNull("list")).toEqual(data.list);
  });
});
