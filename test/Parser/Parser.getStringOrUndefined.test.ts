import { Parser } from "../../src/parser";
import { StringValidationException } from "../../src/validation-exception";

describe("Parser.getStringOrUndefined", () => {
  test("Should return undefined given the keypath 'user.personalInfo.middlename'", () => {
    const data = { user: { personalInfo: {} } } as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getStringOrUndefined("user.personalInfo.middlename")).toBeUndefined();
  });

  test("Should return 'Pagalan' given the keypath 'user.personalInfo.middlename''", () => {
    const data = { user: { personalInfo: { middlename: "Pagalan" } } } as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getStringOrUndefined("user.personalInfo.middlename")).toBe("Pagalan");
  });

  test("Should return 'Foo' given the key path 'bar'", () => {
    const data = { bar: "Foo" } as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getStringOrUndefined("bar")).toBe("Foo");
  });

  test("Should return undefined given the key path 'Spam'", () => {
    const data = {} as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getStringOrUndefined("Spam")).toBeUndefined();
  });

  test("Should throw a StringValidationException given the keypath 'details.isAdmin'", () => {
    const data = { details: { isAdmin: false } } as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getStringOrUndefined("details.isAdmin");
    };
    expect(action).toThrow(StringValidationException);
  });
});
