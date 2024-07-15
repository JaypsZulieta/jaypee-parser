import { Parser } from "../../src/parser";
import {
  BooleanValidationException,
  UndefinedFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getBooleanOrNull", () => {
  test("Should throw an UndefinedFieldException if the value is undefined", () => {
    const action = () => {
      Parser.parseFrom({}).getBooleanOrNull("isAdmin");
    };
    expect(action).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw a BooleanValidationExcepton if the value is not a boolean", () => {
    const action = () => {
      Parser.parseFrom({ isAdmin: 420 }).getBooleanOrNull("isAdmin");
    };
    expect(action).toThrow(BooleanValidationException);
  });

  test("Should return null if the value is null", () => {
    expect(Parser.parseFrom({ isAdmin: null }).getBooleanOrNull("isAdmin")).toBeNull();
  });

  test("Should return false if the value is false", () => {
    expect(Parser.parseFrom({ isAdmin: false }).getBooleanOrNull("isAdmin")).toBe(false);
  });

  test("Should return true if the value is true", () => {
    expect(Parser.parseFrom({ isAdmin: true }).getBooleanOrNull("isAdmin")).toBe(true);
  });

  test("Should return true if the value is 1", () => {
    expect(Parser.parseFrom({ isAdmin: 1 }).getBooleanOrNull("isAdmin")).toBe(true);
  });

  test("Should return false if the value is 0", () => {
    expect(Parser.parseFrom({ isAdmin: 0 }).getBooleanOrNull("isAdmin")).toBe(false);
  });
});
