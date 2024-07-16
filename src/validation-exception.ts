export abstract class ValidationException extends Error {
  private field?: string;

  constructor(message: string) {
    super(message);
  }

  protected setField(field?: string) {
    this.field = field;
  }

  getField(): string | undefined {
    return this.field;
  }
}

export class UndefinedFieldValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`The field '${fieldName}' is undefined`);
    this.setField(fieldName);
  }
}

export class NullFieldValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`The field '${fieldName}' is null`);
    this.setField(fieldName);
  }
}

export class StringValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`The field '${fieldName}' is not a string`);
    this.setField(fieldName);
  }
}

export class StringArrayValidationException extends ValidationException {
  constructor(fieldName?: string) {
    super(
      !fieldName
        ? "The object is not an array of strings"
        : `The field '${fieldName}' is not an array of strings`
    );
    this.setField(fieldName);
  }
}

export class NullValidationException extends ValidationException {
  constructor() {
    super("value is null");
  }
}

export class UndefinedValidationException extends ValidationException {
  constructor() {
    super("value is undefined");
  }
}

export class NumberValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`The field '${fieldName}' is not a number.`);
    this.setField(fieldName);
  }
}

export class NumberArrayValidationException extends ValidationException {
  constructor(fieldName?: string) {
    super(
      !fieldName
        ? "The object is not an array of numbers"
        : `The '${fieldName}' is not an array of numbers`
    );
    this.setField(fieldName);
  }
}

export class BooleanValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`the field ${fieldName} is not a boolean`);
    this.setField(fieldName);
  }
}

export class DateValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`the field ${fieldName} is not a date`);
    this.setField(fieldName);
  }
}

export class ObjectArrayValidationException extends ValidationException {
  constructor(fieldName?: string) {
    super(
      !fieldName
        ? "The object is not an array of objects"
        : `The field '${fieldName}' is not an array of objects`
    );
    this.setField(fieldName);
  }
}
