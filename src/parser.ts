import {
  NullFieldValidationException,
  NullValidationException,
  NumberValidationException,
  StringArrayValidationException,
  StringValidationException,
  UndefinedFieldValidationException,
  UndefinedValidationException,
} from "./validation-exception";
import { isNotAListOfStrings, isNotANumber, isNotAString } from "./validation-fucntions";

/**
 * This is class is used to parse an object with an unknown shape
 * but instead of parsing the entire object at once, it parses it field
 * by field.
 */
export class Parser {
  private constructor(private data: unknown) {}

  /**
   * Use this method to instantiate a Parser object from an object with
   * an unknown shape.
   * @param data the data that needs to be parsed
   * @returns an instance of the Parser class
   */
  static parseFrom(data: unknown): Parser {
    return new Parser(data);
  }

  /**
   * Use this to extract the value of a specified key and parse it into a
   * string so that it can be used with the assuarance of type-safety.
   * @throws {NullFieldValidationException} if the the value of the field is null
   * @throws {UndefinedFieldValidationException} if the field is undefined
   * @throws {StringValidationException} if the value of the field is not a string
   * @param keyPath the full path of the key to be extracted
   * @returns the extracted value as a string
   */
  getString(keyPath: string): string {
    const fieldValue = getValueByPath(this.data, keyPath);
    nullOrUndefinedFieldCheck(fieldValue, keyPath);
    if (isNotAString(fieldValue)) throw new StringValidationException(keyPath);
    return fieldValue as string;
  }

  /**Use this to extract the value of a specified key and parse it into a string with the
   * posibility of it also being undefined so that it can be used with the assurance of
   * type-safety
   * @throws {NullFieldValidationException} if the value of the field is null
   * @throws {StringValidationException} if the field exists but it is not a string
   * @param keyPath the full path of the key to be extracted
   * @returns the extracted value as a string or as undefined if the field does not exist
   */
  getStringOrUndefined(keyPath: string): string | undefined {
    const fieldValue = getValueByPath(this.data, keyPath);
    return fieldValue === undefined ? undefined : this.getString(keyPath);
  }

  /**Use this to extract the value of a specified key and parse it into a string with the
   * posibility of it also being null so that it can be used with the assurance of type-safety.
   * @throws {UndefinedFieldValidationException} if the field is undefined
   * @throws {StringValidationException} if the field is not null or is not a string
   * @param keyPath the full path of the key to be extracted
   * @returns the extracted value as a string or null
   */
  getStringOrNull(keyPath: string): string | null {
    const fieldValue = getValueByPath(this.data, keyPath);
    return fieldValue === null ? null : this.getString(keyPath);
  }

  /**
   * Use this to extract the value of a specified key and parse it into an array of strings
   * so that it can be used with the assurance of type-safety
   * @throws {StringArrayValidationException} if the value is not an array of string
   * @throws {NullFieldValidationException} if the value of the field is null
   * @throws {UndefinedFieldValidationException} if the value of the field is undefined
   * @throws {NullValidationException} if the data itself is null
   * @throws {UndefinedValidationException} if the data itself is undefined
   * @param keyPath the full key path of the field. If no keypath is provided then it will parse the object itself
   * @returns the extracted data as an array of strings
   */
  getStrings(keyPath?: string): string[] {
    if (!keyPath) {
      const value = this.data;
      nullOrUndefinedValueCheck(value);
      if (isNotAListOfStrings(value)) throw new StringArrayValidationException();
      return value as string[];
    }
    const fieldValue = getValueByPath(this.data, keyPath);
    nullOrUndefinedFieldCheck(fieldValue, keyPath);
    if (isNotAListOfStrings(fieldValue)) throw new StringArrayValidationException(keyPath);
    return fieldValue as string[];
  }

  /**
   * Use this to extract the value of a specified key and parse it into an array of strings
   * or return undefined if the key does not exist in the object
   * @throws {StringArrayValidationException} if the value is not an array of strings
   * @throws {NullFieldValidationException} if the value of the key is null
   * @param keyPath the full key path of the field that you want to be extracted
   * @returns the extracted data as an array of strings or undefined if the field does not exist
   */
  getStringsOrUndefined(keyPath: string): string[] | undefined {
    const fieldValue = getValueByPath(this.data, keyPath);
    return fieldValue === undefined ? undefined : this.getStrings(keyPath);
  }

  /**
   * Use this to extract the value of a specified key and parse it into an array of strings
   * or return null if the key-value is null
   * @throws {StringArrayValidationException} if the value is not an array of strings
   * @throws {UndefinedFieldValidationException} if the key-value does not exist in the object
   * @param keyPath the full keypath of the field that you want to extract
   * @returns the extracted data as an array of strings or null if the value is null
   */
  getStringsOrNull(keyPath: string): string[] | null {
    const fieldValue = getValueByPath(this.data, keyPath);
    return fieldValue === null ? null : this.getStrings(keyPath);
  }

  /**
   * Use this to extract the value of a specified key and parse it into a number
   * @throws {NullFieldValidationException} if the value is null
   * @throws {UndefinedFieldValidationException} if the value is undefined
   * @throws {NumberValidationException} if the value is not a number
   * @param keyPath the full keypath of the field that you want to extract
   * @returns the extracted data parsed into a number
   */
  getNumber(keyPath: string): number {
    const fieldValue = getValueByPath(this.data, keyPath);
    nullOrUndefinedFieldCheck(fieldValue, keyPath);
    if (isNotANumber(fieldValue)) throw new NumberValidationException(keyPath);
    return fieldValue as number;
  }
}

function getValueByPath(data: any, keyPath: string): any {
  return keyPath.split(".").reduce((acc, key) => acc && acc[key], data);
}

function nullOrUndefinedFieldCheck(fieldValue: any, keyPath: string): void {
  if (fieldValue === null) throw new NullFieldValidationException(keyPath);
  if (fieldValue === undefined) throw new UndefinedFieldValidationException(keyPath);
}

function nullOrUndefinedValueCheck(value: any): void {
  if (value === null) throw new NullValidationException();
  if (value === undefined) throw new UndefinedValidationException();
}
