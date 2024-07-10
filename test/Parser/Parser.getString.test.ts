import { Parser } from "../../src/parser";
import {
  NullFieldValidationException,
  StringValidationException,
  UndefinedFieldValidationException,
} from "../../src/validation-exception";

describe("Parser.getString", () => {
  test("Should return 'Hello, World' given the key path 'message'", () => {
    const data = { message: "Hello, World" } as unknown;
    const parser = Parser.parseFrom(data);
    const message = parser.getString("message");
    expect(message).toBe("Hello, World");
  });

  test("Should return 'Foo' given the key path 'Bar'", () => {
    const data = { Bar: "Foo" } as unknown;
    const parser = Parser.parseFrom(data);
    const bar = parser.getString("Bar");
    expect(bar).toBe("Foo");
  });

  test("Should return 'John Smith' given the keypath 'user.name'", () => {
    const data = { user: { name: "John Smith" } } as unknown;
    const parser = Parser.parseFrom(data);
    const username = parser.getString("user.name");
    expect(username).toBe("John Smith");
  });

  test("Should return 'Spam' given the keypath 'python.eggs'", () => {
    const data = { python: { eggs: "Spam" } } as unknown;
    expect(Parser.parseFrom(data).getString("python.eggs")).toBe("Spam");
  });

  test("Should return 'Zulieta' given the keypath 'user.personalInfo.lastname'", () => {
    const data = { user: { personalInfo: { lastname: "Zulieta" } } } as unknown;
    expect(Parser.parseFrom(data).getString("user.personalInfo.lastname")).toBe("Zulieta");
  });

  test("Should return 'Jaypee' given the keypath 'user.personalInfo.firstname'", () => {
    const data = { user: { personalInfo: { firstname: "Jaypee" } } } as unknown;
    expect(Parser.parseFrom(data).getString("user.personalInfo.firstname")).toBe("Jaypee");
  });

  test("Should throw a StringValidationException given the key 'isAdmin'", () => {
    const data = { isAdmin: false } as unknown;
    const action = () => {
      Parser.parseFrom(data).getString("isAdmin");
    };
    expect(action).toThrow(StringValidationException);
  });

  test("Should throw a StringValidationException given the key 'total_pages'", () => {
    const data = { total_pages: 300 } as unknown;
    const action = () => {
      Parser.parseFrom(data).getString("total_pages");
    };
    expect(action).toThrow(StringValidationException);
  });

  test("Should throw an UndefinedFieldValidationException given the key 'middlename'", () => {
    const data = {} as unknown;
    const action = () => {
      Parser.parseFrom(data).getString("middlename");
    };
    expect(action).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw an NullFieldValidationException given the key 'contact_info'", () => {
    const data = { contact_info: null } as unknown;
    const action = () => {
      Parser.parseFrom(data).getString("contact_info");
    };
    expect(action).toThrow(NullFieldValidationException);
  });
});
