import { Parser } from "../../src/parser";
import {
  NullFieldValidationException,
  NullValidationException,
  ObjectArrayValidationException,
  UndefinedFieldValidationException,
  UndefinedValidationException,
} from "../../src/validation-exception";

describe("Parser.getObjects", () => {
  test("Should throw a NullValidationException if the object itself is null", () => {
    const data = null;
    expect(() => {
      Parser.parseFrom(data).getObjects();
    }).toThrow(NullValidationException);
  });

  test("Should throw a UndefinedValidationException if the object itself is undefined", () => {
    expect(() => {
      Parser.parseFrom(undefined).getObjects();
    }).toThrow(UndefinedValidationException);
  });

  test("Should throw a ObjectArrayValidationException if the object itself is not an array", () => {
    expect(() => {
      Parser.parseFrom({} as any).getObjects();
    }).toThrow(ObjectArrayValidationException);
  });

  test("Should throw a ObjectArrayValidationException if the the object itself is not an array of objects", () => {
    expect(() => {
      Parser.parseFrom([1, 2, 3]).getObjects();
    }).toThrow(ObjectArrayValidationException);
  });

  test("Should return an array of objects if the object itself is an array of objects", () => {
    const data = [{ name: "John" }, { name: "Jane" }];
    expect(Parser.parseFrom(data).getObjects()).toEqual(data);
  });

  test("Should throw a NullFieldValidationException if the field is null", () => {
    const data = { list: null } as unknown;
    expect(() => {
      Parser.parseFrom(data).getObjects("list");
    }).toThrow(NullFieldValidationException);
  });

  test("Should throw a UndefinedFieldValidationException if the field is undefined", () => {
    expect(() => {
      Parser.parseFrom({}).getObjects("list");
    }).toThrow(UndefinedFieldValidationException);
  });

  test("Should throw a ObjectArrayValidationException if the field is not an array", () => {
    const parser = Parser.parseFrom({ list: 69 });
    expect(() => {
      parser.getObjects("list");
    }).toThrow(ObjectArrayValidationException);
  });

  test("Should throw a ObjectArrayValidationException if the field is not an array of objects", () => {
    const parser = Parser.parseFrom({ list: [1, 2, 3] });
    expect(() => {
      parser.getObjects("list");
    }).toThrow(ObjectArrayValidationException);
  });

  test("Should return an array of objects if the field is an array objects", () => {
    const data = { list: [{ name: "John" }, { name: "Jane" }] };
    expect(Parser.parseFrom(data).getObjects("list")).toEqual(data.list);
  });
});
