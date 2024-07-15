import { Parser } from "../../src/parser";
import {
  NullFieldValidationException,
  NumberArrayValidationException,
} from "../../src/validation-exception";

describe("Parser.getNumbersOrUndefined", () => {
  test("Should throw a NullFieldValidationException if the value is null", () => {
    const parser = Parser.parseFrom({ numbers: null });
    const action = () => {
      parser.getNumbersOrUndefined("numbers");
    };
    expect(action).toThrow(NullFieldValidationException);
  });

  test("Should throw a NumberArrayValidationException if the value is not an array of numbers", () => {
    const parser = Parser.parseFrom({ numbers: 69 });
    const action = () => {
      parser.getNumbersOrUndefined("numbers");
    };
    expect(action).toThrow(NumberArrayValidationException);
  });

  test("Should return undefined if the value is undefined", () => {
    const parser = Parser.parseFrom({});
    expect(parser.getNumbersOrUndefined("numbers")).toBeUndefined();
  });

  test("Should return an array of numbers", () => {
    const parser = Parser.parseFrom({ numbers: [1, 2, 3] });
    expect(parser.getNumbersOrNull("numbers")).toEqual([1, 2, 3]);
  });
});
