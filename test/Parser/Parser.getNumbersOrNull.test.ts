import { Parser } from "../../src/parser";
import {
  NumberArrayValidationException,
  UndefinedFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getNumbersOrNull", () => {
  test("Should throw a UndefinedFieldValidationException if the field value is undefined", () => {
    const data = { numbers: undefined } as unknown;
    const action = () => {
      Parser.parseFrom(data).getNumbersOrNull("numbers");
    };
    expect(action).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw a NumberArrayValidationException if the field value is not an array of numbers", () => {
    const data = { numbers: true };
    const action = () => {
      Parser.parseFrom(data).getNumbersOrNull("numbers");
    };
    expect(action).toThrow(NumberArrayValidationException);
  });

  test("Should return null if the field value is null", () => {
    const data = { numbers: null };
    expect(Parser.parseFrom(data).getNumbersOrNull("numbers")).toBeNull();
  });

  test("Should return an array of numbers if the field value is an array of numbers", () => {
    const data = { numbers: [420, 69] };
    expect(Parser.parseFrom(data).getNumbersOrNull("numbers")).toEqual([420, 69]);
  });
});
