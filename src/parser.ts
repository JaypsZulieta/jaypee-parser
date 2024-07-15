import {
  BooleanValidationException,
  DateValidationException,
  NullFieldValidationException,
  NullValidationException,
  NumberArrayValidationException,
  NumberValidationException,
  StringArrayValidationException,
  StringValidationException,
  UndefinedFieldValidationException,
  UndefinedValidationException,
} from "./validation-exception";
import {
  isNotABoolean,
  isNotADate,
  isNotAListOfNumbers,
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
    return fieldValue === undefined ? undefined : this.getString(keyPath);
  }

  getStringOrNull(keyPath: string): string | null {
    const fieldValue = getValueByPath(this.data, keyPath);
    return fieldValue === null ? null : this.getString(keyPath);
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
    return fieldValue === undefined ? undefined : this.getStrings(keyPath);
  }

  getStringsOrNull(keyPath: string): string[] | null {
    const fieldValue = getValueByPath(this.data, keyPath);
    return fieldValue === null ? null : this.getStrings(keyPath);
  }

  getNumber(keyPath: string): number {
    const fieldValue = getValueByPath(this.data, keyPath);
    nullOrUndefinedFieldCheck(fieldValue, keyPath);
    if (isNotANumber(fieldValue)) throw new NumberValidationException(keyPath);
    return fieldValue as number;
  }

  getNumberOrUndefined(keyPath: string): number | undefined {
    const fieldValue = getValueByPath(this.data, keyPath);
    return fieldValue === undefined ? undefined : this.getNumber(keyPath);
  }

  getNumberOrNull(keyPath: string): number | null {
    const fieldValue = getValueByPath(this.data, keyPath);
    return fieldValue === null ? null : this.getNumber(keyPath);
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
    return fieldValue === null ? null : this.getNumbers(keyPath);
  }

  getNumbersOrUndefined(keypath: string): number[] | undefined {
    const fieldValue = getValueByPath(this.data, keypath);
    return fieldValue === undefined ? undefined : this.getNumbers(keypath);
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
    return fieldValue === null ? null : this.getBoolean(keyPath);
  }

  getBooleanOrUndefined(keyPath: string): boolean | undefined {
    const fieldValue = getValueByPath(this.data, keyPath);
    return fieldValue === undefined ? undefined : this.getBoolean(keyPath);
  }

  getDate(keyPath: string): Date {
    const fieldValue = getValueByPath(this.data, keyPath);
    nullOrUndefinedFieldCheck(fieldValue, keyPath);
    if (isNotADate(fieldValue)) throw new DateValidationException(keyPath);
    if (!isNotANumber(fieldValue)) throw new DateValidationException(keyPath);
    if (!isNotAString(fieldValue)) return new Date(fieldValue);
    return fieldValue as Date;
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
