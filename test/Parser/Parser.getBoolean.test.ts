import { Parser } from "../../src/parser";
import {
  BooleanValidationException,
  NullFieldValidationException,
  UndefinedFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getBoolean", () => {
  test("Should throw a NullFieldValidationException if the value is null", () => {
    const parser = Parser.parseFrom({ isHandsome: null });
    const action = () => {
      parser.getBoolean("isHandsome");
    };
    expect(action).toThrow(NullFieldValidationException);
  });

  test("Should throw a UndefinedFieldValidationException if the value is undefined", () => {
    const parser = Parser.parseFrom({});
    const action = () => {
      parser.getBoolean("isHandsome");
    };
    expect(action).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw a BooleanValidationException if the value is not a boolean", () => {
    const parser = Parser.parseFrom({ isHandsome: 69 });
    const action = () => {
      parser.getBoolean("isHandsome");
    };
    expect(action).toThrow(BooleanValidationException);
  });

  test("Should return a boolean", () => {
    const parser = Parser.parseFrom({ isHandsome: true });
    expect(parser.getBoolean("isHandsome")).toBe(true);
  });

  test("Should return true if the value is 1", () => {
    const parser = Parser.parseFrom({ isHandsome: 1 });
    expect(parser.getBoolean("isHandsome")).toBe(true);
  });

  test("Should return false if the value is 0", () => {
    const parser = Parser.parseFrom({ isHandsome: 0 });
    expect(parser.getBoolean("isHandsome")).toBe(false);
  });
});
