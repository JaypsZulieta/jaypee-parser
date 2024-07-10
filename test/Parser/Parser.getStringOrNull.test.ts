import { Parser } from "../../src/parser";
import { StringValidationException } from "../../src/validation-exception";

describe("Parser.getStringOrNull", () => {
  test("Should return null given the key path 'user.name'", () => {
    const data = { user: { name: null } } as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getStringOrNull("user.name")).toBeNull();
  });

  test("Should return null given the key path 'middlename'", () => {
    const data = { middlename: null } as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getStringOrNull("middlename")).toBeNull();
  });

  test("Should return 'Warlord5417' given the key path 'user.name'", () => {
    const data = { user: { name: "Warlord5417" } } as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getStringOrNull("user.name")).toBe("Warlord5417");
  });

  test("Should return 'Pagalan' given the key path 'user.middlename'", () => {
    const data = { user: { middlename: "Pagalan" } } as unknown;
    const parser = Parser.parseFrom(data);
    expect(parser.getStringOrNull("user.middlename")).toBe("Pagalan");
  });

  test("Should throw a StringValidationException given the key path 'isHandsome'", () => {
    const data = { isHandsome: false } as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getStringOrNull("isHandsome");
    };
    expect(action).toThrow(StringValidationException);
  });

  test("Should throw a StringValidationException given the key 'user.isAdmin'", () => {
    const data = { user: { isAdmin: true } } as unknown;
    const parser = Parser.parseFrom(data);
    const action = () => {
      parser.getStringOrNull("user.isAdmin");
    };
    expect(action).toThrow(StringValidationException);
  });
});
