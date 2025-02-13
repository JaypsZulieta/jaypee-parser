import { Parser } from "../../src/parser";
import {
  DateValidationException,
  NullFieldValidationException,
  UndefinedFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getDate", () => {
  test("Should throw a NullFieldValidationException if the value is null", () => {
    expect(() => {
      Parser.parseFrom({ date: null }).getDate("date");
    }).toThrow(NullFieldValidationException);
  });

  test("Should throw a UndefinedFieldValidationException if the value is undefined", () => {
    expect(() => {
      Parser.parseFrom({}).getDate("date");
    }).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw a DateValidationException if the value is not a date", () => {
    expect(() => {
      Parser.parseFrom({ date: 420 }).getDate("date");
    }).toThrow(DateValidationException);
  });

  test("Should return a Date based on a date string", () => {
    const date = "2003-12-20";
    expect(Parser.parseFrom({ date }).getDate("date")).toEqual(new Date("2003-12-20"));
  });

  test("Should throw a DateValidationException if the date string is not valid", () => {
    const date = "Foo Bar";
    expect(() => {
      Parser.parseFrom({ date }).getDate("date");
    }).toThrow(DateValidationException);
  });

  test("Should return a Date", () => {
    const date = new Date("2003-12-20");
    expect(Parser.parseFrom({ date }).getDate("date")).toEqual(date);
  });
});
