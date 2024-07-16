import { string } from "zod";
import {
  BooleanValidationException,
  DateValidationException,
  NullFieldValidationException,
  NullValidationException,
  NumberArrayValidationException,
  NumberValidationException,
  ObjectArrayValidationException,
  StringArrayValidationException,
  StringValidationException,
  UndefinedFieldValidationException,
  UndefinedValidationException,
} from "./validation-exception";
import {
  isNotABoolean,
  isNotADate,
  isNotAListOfNumbers,
  isNotAListOfObjects,
  isNotAListOfStrings,
  isNotANumber,
  isNotAString,
} from "./validation-functions";

export class Parser {
  private constructor(private data: unknown) {}

  static parseFrom(data: unknown): Parser {
    return new Parser(data);
  }

  getString(keyPath: string): string {
    const fieldValue = getValueByPath(this.data, keyPath);
    nullOrUndefinedFieldCheck(fieldValue, keyPath);
    if (isNotAString(fieldValue)) throw new StringValidationException(keyPath);
    return fieldValue as string;
  }

  getStringOrUndefined(keyPath: string): string | undefined {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === undefined) return undefined;
    if (fieldValue === null) throw new NullFieldValidationException(keyPath);
    if (isNotAString(fieldValue)) throw new StringValidationException(keyPath);
    return fieldValue as string;
  }

  getStringOrNull(keyPath: string): string | null {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === null) return null;
    if (fieldValue === undefined) throw new UndefinedFieldValidationException(keyPath);
    if (isNotAString(fieldValue)) throw new StringValidationException(keyPath);
    return fieldValue as string;
  }

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

  getStringsOrUndefined(keyPath: string): string[] | undefined {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === undefined) return undefined;
    if (fieldValue === null) throw new NullFieldValidationException(keyPath);
    if (isNotAListOfStrings(fieldValue)) throw new StringArrayValidationException(keyPath);
    return fieldValue as string[];
  }

  getStringsOrNull(keyPath: string): string[] | null {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === null) return null;
    if (fieldValue === undefined) throw new UndefinedFieldValidationException(keyPath);
    if (isNotAListOfStrings(fieldValue)) throw new StringArrayValidationException(keyPath);
    return fieldValue as string[];
  }

  getNumber(keyPath: string): number {
    const fieldValue = getValueByPath(this.data, keyPath);
    nullOrUndefinedFieldCheck(fieldValue, keyPath);
    if (isNotANumber(fieldValue)) throw new NumberValidationException(keyPath);
    return fieldValue as number;
  }

  getNumberOrUndefined(keyPath: string): number | undefined {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === undefined) return undefined;
    if (fieldValue === null) throw new NullFieldValidationException(keyPath);
    if (isNotANumber(fieldValue)) throw new NumberValidationException(keyPath);
    return fieldValue as number;
  }

  getNumberOrNull(keyPath: string): number | null {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === null) return null;
    if (fieldValue === undefined) throw new UndefinedFieldValidationException(keyPath);
    if (isNotANumber(fieldValue)) throw new NumberValidationException(keyPath);
    return fieldValue as number;
  }

  getNumbers(keyPath?: string): number[] {
    if (!keyPath) {
      const value = this.data;
      nullOrUndefinedValueCheck(value);
      if (isNotAListOfNumbers(value)) throw new NumberArrayValidationException();
      return value as number[];
    }
    const fieldValue = getValueByPath(this.data, keyPath);
    nullOrUndefinedFieldCheck(fieldValue, keyPath);
    if (isNotAListOfNumbers(fieldValue)) throw new NumberArrayValidationException(keyPath);
    return fieldValue as number[];
  }

  getNumbersOrNull(keyPath: string): number[] | null {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === null) return null;
    if (fieldValue === undefined) throw new UndefinedFieldValidationException(keyPath);
    if (isNotAListOfNumbers(fieldValue)) throw new NumberArrayValidationException(keyPath);
    return fieldValue as number[];
  }

  getNumbersOrUndefined(keypath: string): number[] | undefined {
    const fieldValue = getValueByPath(this.data, keypath);
    if (fieldValue === undefined) return undefined;
    if (fieldValue === null) throw new NullFieldValidationException(keypath);
    if (isNotAListOfNumbers(fieldValue)) throw new NumberArrayValidationException(keypath);
    return fieldValue as number[];
  }

  getBoolean(keyPath: string): boolean {
    const fieldValue = getValueByPath(this.data, keyPath);
    nullOrUndefinedFieldCheck(fieldValue, keyPath);
    if (isNotABoolean(fieldValue)) throw new BooleanValidationException(keyPath);
    if (!isNotANumber(fieldValue)) return fieldValue === 1 ? true : false;
    return fieldValue;
  }

  getBooleanOrNull(keyPath: string): boolean | null {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === null) return null;
    if (fieldValue === undefined) throw new UndefinedFieldValidationException(keyPath);
    if (isNotABoolean(fieldValue)) throw new BooleanValidationException(keyPath);
    if (!isNotANumber(fieldValue)) return fieldValue === 1 ? true : false;
    return fieldValue as boolean;
  }

  getBooleanOrUndefined(keyPath: string): boolean | undefined {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === undefined) return undefined;
    if (fieldValue === null) throw new NullFieldValidationException(keyPath);
    if (isNotABoolean(fieldValue)) throw new BooleanValidationException(keyPath);
    if (!isNotANumber(fieldValue)) return fieldValue === 1 ? true : false;
    return fieldValue as boolean;
  }

  getDate(keyPath: string): Date {
    const fieldValue = getValueByPath(this.data, keyPath);
    nullOrUndefinedFieldCheck(fieldValue, keyPath);
    if (isNotADate(fieldValue) || !isNotANumber(fieldValue))
      throw new DateValidationException(keyPath);
    if (!isNotAString(fieldValue)) return new Date(fieldValue);
    return fieldValue as Date;
  }

  getDateOrUndefined(keyPath: string): Date | undefined {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === undefined) return undefined;
    if (fieldValue === null) throw new NullFieldValidationException(keyPath);
    if (isNotADate(fieldValue) || !isNotANumber(fieldValue))
      throw new DateValidationException(keyPath);
    if (!isNotAString(fieldValue)) return new Date(fieldValue);
    return fieldValue as Date;
  }

  getDateOrNull(keyPath: string): Date | null {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === null) return null;
    if (fieldValue === undefined) throw new UndefinedFieldValidationException(keyPath);
    if (isNotADate(fieldValue) || !isNotANumber(fieldValue))
      throw new DateValidationException(keyPath);
    if (!isNotAString(fieldValue)) return new Date(fieldValue);
    return fieldValue as Date;
  }

  getObjects(keypath?: string): Object[] {
    if (!keypath) {
      const value = this.data;
      nullOrUndefinedValueCheck(value);
      if (isNotAListOfObjects(value)) throw new ObjectArrayValidationException();
      return value as object[];
    }
    const fieldValue = getValueByPath(this.data, keypath);
    nullOrUndefinedFieldCheck(fieldValue, keypath);
    if (isNotAListOfObjects(fieldValue)) throw new ObjectArrayValidationException(keypath);
    return fieldValue as object[];
  }

  getObjectsOrUndefined(keyPath: string): Object[] | undefined {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === undefined) return undefined;
    if (fieldValue === null) throw new NullFieldValidationException(keyPath);
    if (isNotAListOfObjects(fieldValue)) throw new ObjectArrayValidationException(keyPath);
    return fieldValue as object[];
  }

  getObjectsOrNull(keyPath: string): Object[] | null {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === null) return null;
    if (fieldValue === undefined) throw new UndefinedFieldValidationException(keyPath);
    if (isNotAListOfObjects(fieldValue)) throw new ObjectArrayValidationException(keyPath);
    return fieldValue as object[];
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
