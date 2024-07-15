import { Parser } from "../../src/parser";
import {
  BooleanValidationException,
  NullFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getBooleanOrUndefined", () => {
  test("Should throw a NullFieldException if the value is null", () => {
    expect(() => {
      Parser.parseFrom({ isAdmin: null }).getBooleanOrUndefined("isAdmin");
    }).toThrow(NullFieldValidationException);
  });

  test("Should throw a BooleanValidationException if the value is not a boolean", () => {
    expect(() => {
      Parser.parseFrom({ isAdmin: 420 }).getBooleanOrUndefined("isAdmin");
    }).toThrow(BooleanValidationException);
  });

  test("Should return undefined if the value is undefined", () => {
    expect(Parser.parseFrom({}).getBooleanOrUndefined("isAdmin")).toBeUndefined();
  });

  test("Should return true if the value is true", () => {
    expect(Parser.parseFrom({ isAdmin: true }).getBooleanOrUndefined("isAdmin")).toBe(true);
  });

  test("Should return false if the value is false", () => {
    expect(Parser.parseFrom({ isAdmin: false }).getBooleanOrUndefined("isAdmin")).toBe(false);
  });

  test("Should return true if the value is 1", () => {
    expect(Parser.parseFrom({ isAdmin: 1 }).getBooleanOrUndefined("isAdmin")).toBe(true);
  });

  test("Should return false if the value is 0", () => {
    expect(Parser.parseFrom({ isAdmin: 0 }).getBooleanOrUndefined("isAdmin")).toBe(false);
  });
});
