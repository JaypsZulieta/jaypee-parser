import { Parser } from "../../src/parser";
import {
  StringArrayValidationException,
  UndefinedFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getStringsOrNull", () => {
  test("Should throw an UndefinedFieldValidationException if the value is undefined", () => {
    const data = {} as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getStringsOrNull("key");
    };
    expect(action).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw a StringsArrayValidationException if the value is not an array os strings", () => {
    const data = { isAdmin: false } as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getStringsOrNull("isAdmin");
    };
    expect(action).toThrow(StringArrayValidationException);
  });

  test("Should return null if the value is null", () => {
    const data = { keys: null } as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getStringsOrNull("keys")).toBeNull();
  });

  test("Should return an array os strings", () => {
    const answerKeys = ["Foo", "Bar", "Fizz", "Buzz"];
    const data = { answerKeys };
    const parser = Parser.parseFrom(data);
    expect(parser.getStringsOrNull("answerKeys")).toEqual(answerKeys);
  });
});
