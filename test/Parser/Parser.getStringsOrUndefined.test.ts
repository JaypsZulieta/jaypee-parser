import { Parser } from "../../src/parser";
import {
  NullFieldValidationException,
  StringArrayValidationException,
} from "../../src/validation-exception";

describe("Parser.getStringsOrUndefined", () => {
  test("Should throw a NullFieldValidationException if the value is null", () => {
    const data = { question: { answerKeys: null } } as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getStringsOrUndefined("question.answerKeys");
    };
    expect(action).toThrow(NullFieldValidationException);
  });

  test("Should throw a StringsValidationException if the value is not a string", () => {
    const data = { question: { isCaseSensitive: true } } as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getStringsOrUndefined("question.isCaseSensitive");
    };
    expect(action).toThrow(StringArrayValidationException);
  });

  test("Should return undefined if the value is undefined", () => {
    const data = { question: {} } as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getStringsOrUndefined("question.answerKeys")).toBeUndefined();
  });

  test("Should return the array of strings given the full key path", () => {
    const answerKeys = ["Helium", "Nitrogen", "Sulfur"];
    const data = { question: { answerKeys } } as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getStringsOrUndefined("question.answerKeys")).toEqual(answerKeys);
  });
});
