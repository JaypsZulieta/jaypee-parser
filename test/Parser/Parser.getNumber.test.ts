import { Parser } from "../../src/parser";
import {
  NullFieldValidationException,
  NumberValidationException,
  UndefinedFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getNumber", () => {
  test("Should throw a NullFieldValidationException if the value is null", () => {
    const data = { foo: null } as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getNumber("foo");
    };
    expect(action).toThrow(NullFieldValidationException);
  });

  test("Should throw an UndefinedFieldException if the value is undefined", () => {
    const data = {} as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getNumber("foo");
    };
    expect(action).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw a NumberValidationException if the value is not a number", () => {
    const data = { foo: true } as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getNumber("foo");
    };
    expect(action).toThrow(NumberValidationException);
  });

  test("Should return a number", () => {
    const data = { foo: 69 } as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getNumber("foo")).toBe(69);
  });
});
