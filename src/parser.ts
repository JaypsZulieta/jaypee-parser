import {
  NullFieldValidationException,
  StringValidationException,
  UndefinedFieldValidationException,
} from "./validation-exception";
import { isNotAString } from "./validation-fucntions";

function getValueByPath(data: any, keyPath: string): any {
  return keyPath.split(".").reduce((acc, key) => acc && acc[key], data);
}

export class Parser {
  private constructor(private data: unknown) {}

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
    if (fieldValue === null) throw new NullFieldValidationException(keyPath);
    if (fieldValue === undefined) throw new UndefinedFieldValidationException(keyPath);
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
}
