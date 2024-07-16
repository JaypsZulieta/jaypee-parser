import { Parser } from "../../src/parser";
import {
  DateValidationException,
  NullFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getDateOrUndefined", () => {
  test("Should throw a NullFieldValidationException if the value is null", () => {
    const parser = Parser.parseFrom({ date: null });
    const action = () => {
      parser.getDateOrUndefined("date");
    };
    expect(action).toThrow(NullFieldValidationException);
  });

  test("Should throw a DateValidationException if the value is not a Date", () => {
    const parser = Parser.parseFrom({ date: 420 });
    const action = () => {
      parser.getDateOrUndefined("date");
    };
    expect(action).toThrow(DateValidationException);
  });

  test("Should throw a DateValidationException if the string value is not a valid date", () => {
    const parser = Parser.parseFrom({ date: "invalid date" });
    const action = () => {
      parser.getDateOrUndefined("date");
    };
    expect(action).toThrow(DateValidationException);
  });

  test("Should return undefined if the value is undefined", () => {
    const parser = Parser.parseFrom({});
    expect(parser.getDateOrUndefined("date")).toBeUndefined();
  });

  test("Should return a date if the value is a valid date string", () => {
    const parser = Parser.parseFrom({ date: "2022-01-01" });
    expect(parser.getDateOrUndefined("date")).toEqual(new Date("2022-01-01"));
  });

  test("Should return a date if the value is a date object", () => {
    const parser = Parser.parseFrom({ date: new Date("2022-01-01") });
    expect(parser.getDateOrUndefined("date")).toEqual(new Date("2022-01-01"));
  });
});
