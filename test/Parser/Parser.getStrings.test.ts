import { Parser } from "../../src/parser";
import {
  NullFieldValidationException,
  NullValidationException,
  StringArrayValidationException,
  UndefinedFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getStrings", () => {
  test("Should throw a NullFieldValidationException if the given key path is 'keys'", () => {
    const data = { keys: null } as unknown;
    const action = () => {
      Parser.parseFrom(data).getStrings("keys");
    };
    expect(action).toThrow(NullFieldValidationException);
  });

  test("Should throw a UndefincedFieldException if the given key path is 'cars'", () => {
    const data = {} as unknown;
    const action = () => {
      Parser.parseFrom(data).getStrings("cars");
    };
    expect(action).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw a StringArrayValidationException if the given key path is 'isAdmin'", () => {
    const data = { isAdmin: false } as unknown;
    const action = () => {
      Parser.parseFrom(data).getStrings("isAdmin");
    };
    expect(action).toThrow(StringArrayValidationException);
  });

  test("Should throw a StringArrayValidationException if no key path is given", () => {
    const data = {} as unknown;
    const action = () => {
      Parser.parseFrom(data).getStrings();
    };
    expect(action).toThrow(StringArrayValidationException);
  });

  test("Should throw a NullValidationException if no key path is given", () => {
    const action = () => {
      Parser.parseFrom(null).getStrings();
    };
    expect(action).toThrow(NullValidationException);
  });

  test("Should return an array of strings if the given key path is 'answerKeys'", () => {
    const answerKeys = ["Foo", "Bar", "Spam", "Eggs"];
    const data = { answerKeys } as unknown;
    expect(Parser.parseFrom(data).getStrings("answerKeys")).toEqual(answerKeys);
  });

  test("Should return an array of strings if no key path is given", () => {
    const data = ["Foo", "Bar", "Spam", "Eggs"] as unknown;
    expect(Parser.parseFrom(data).getStrings()).toEqual(data);
  });
});
