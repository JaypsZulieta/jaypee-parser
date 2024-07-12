import { unknown } from "zod";
import { Parser } from "../../src/parser";
import {
  NumberValidationException,
  UndefinedFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getNumberOrNull", () => {
  test("Should throw an UndefinedFieldValidationException if the value is undefined", () => {
    const data = {} as unknown;
    const action = () => {
      Parser.parseFrom(data).getNumberOrNull("foo");
    };
    expect(action).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw a NumberValidationException if the value is not a number", () => {
    const data = { foo: "bar" } as unknown;
    const action = () => {
      Parser.parseFrom(data).getNumberOrNull("foo");
    };
    expect(action).toThrow(NumberValidationException);
  });

  test("Should return null if the value is null", () => {
    const data = { foo: null } as unknown;
    expect(Parser.parseFrom(data).getNumberOrNull("foo")).toBeNull();
  });

  test("Should return a number", () => {
    const data = { foo: 420 } as unknown;
    expect(Parser.parseFrom(data).getNumberOrNull("foo")).toBe(420);
  });
});
