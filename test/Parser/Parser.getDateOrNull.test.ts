import { Parser } from "../../src/parser";
import {
  DateValidationException,
  UndefinedFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getDateOrNull", () => {
  test("Should throw an UndefinedFieldValidationException if the value is undefined", () => {
    const data = {} as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getDateOrNull("date");
    };
    expect(action).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw a DateValidationException if the value is not a date", () => {
    const data = { date: 420 } as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getDateOrNull("date");
    };
    expect(action).toThrow(DateValidationException);
  });

  test("Should throw a DateValidationException if the value is not a valid date string", () => {
    const parser = Parser.parseFrom({ date: "invalid date" });
    const action = () => {
      parser.getDateOrNull("date");
    };
    expect(action).toThrow(DateValidationException);
  });

  test("Should return null if the value is null", () => {
    const parser = Parser.parseFrom({ date: null });
    expect(parser.getDateOrNull("date")).toBeNull();
  });

  test("Should return a date if the value is a valid date string", () => {
    const parser = Parser.parseFrom({ date: "2022-01-01" });
    expect(parser.getDateOrNull("date")).toEqual(new Date("2022-01-01"));
  });

  test("Should return a date if the value is a date object", () => {
    const parser = Parser.parseFrom({ date: new Date("2022-01-01") });
    expect(parser.getDateOrNull("date")).toEqual(new Date("2022-01-01"));
  });
});
