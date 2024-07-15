import { Parser } from "../../src/parser";
import {
  NullFieldValidationException,
  NullValidationException,
  NumberArrayValidationException,
  UndefinedFieldValidationException,
  UndefinedValidationException,
} from "../../src/validation-exception";

describe("Parser.getStrings", () => {
  test("Should throw a NullValidationException if the object itself is null", () => {
    const parser = Parser.parseFrom(null);
    const action = () => {
      parser.getNumbers();
    };
    expect(action).toThrow(NullValidationException);
  });

  test("Should throw a UndefinedValidationException if the object itself is undefined", () => {
    const parser = Parser.parseFrom(undefined);
    const action = () => {
      parser.getNumbers();
    };
    expect(action).toThrow(UndefinedValidationException);
  });

  test("Should throw a NumberArrayValidationException if the object itself is not an array of numbers", () => {
    const parser = Parser.parseFrom(true);
    const action = () => {
      parser.getNumbers();
    };
    expect(action).toThrow(NumberArrayValidationException);
  });

  test("Should return an array of numbers if the object itself is an array of numbers", () => {
    const parser = Parser.parseFrom([1, 2, 3, 4]);
    expect(parser.getNumbers()).toEqual([1, 2, 3, 4]);
  });

  test("Should throw a NullFieldValidationException if the field value is null", () => {
    const data = { numbers: null } as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getNumbers("numbers");
    };
    expect(action).toThrow(NullFieldValidationException);
  });

  test("Should throw a UndefinedFieldValidationException if the field value is undefined", () => {
    const parser = Parser.parseFrom({});
    const action = () => {
      parser.getNumbers("numbers");
    };
    expect(action).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw a NumberArrayValidationException if the field value is not an array number", () => {
    const parser = Parser.parseFrom({ numbers: 1 });
    const action = () => {
      parser.getNumbers("numbers");
    };
    expect(action).toThrow(NumberArrayValidationException);
  });

  test("Should return a number array if the field value is a number array", () => {
    const parser = Parser.parseFrom({ numbers: [1, 2, 3, 4] });
    expect(parser.getNumbers("numbers")).toEqual([1, 2, 3, 4]);
  });
});
