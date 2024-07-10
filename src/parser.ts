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

  getString(keyPath: string): string {
    const fieldValue = getValueByPath(this.data, keyPath);
    if (fieldValue === null) throw new NullFieldValidationException(keyPath);
    if (fieldValue === undefined) throw new UndefinedFieldValidationException(keyPath);
    if (isNotAString(fieldValue)) throw new StringValidationException(keyPath);
    return fieldValue as string;
  }

  getStringOrUndefined(keyPath: string): string | undefined {
    const fieldValue = getValueByPath(this.data, keyPath);
    return fieldValue == undefined ? undefined : this.getString(keyPath);
  }
}
