import { Parser } from "../../src/parser";
import {
  NullFieldValidationException,
  NumberValidationException,
} from "../../src/validation-exception";

describe("Parser.getNumberOrUndefined", () => {
  test("Should throw a NullFieldValidationException if value is null", () => {
    const data = { foo: null } as unknown;
    const action = () => {
      Parser.parseFrom(data).getNumberOrUndefined("foo");
    };
    expect(action).toThrow(NullFieldValidationException);
  });

  test("Should throw a NumberValidationException if the value isn't a number", () => {
    const data = { foo: "bar" } as unknown;
    const action = () => {
      Parser.parseFrom(data).getNumberOrUndefined("foo");
    };
    expect(action).toThrow(NumberValidationException);
  });

  test("Should return undefined if the value is undefined", () => {
    const data = {} as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getNumberOrUndefined("foo")).toBeUndefined();
  });

  test("Should return a number", () => {
    const data = { foo: 69 } as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getNumber("foo")).toBe(69);
  });
});
