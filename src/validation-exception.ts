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
    super(`expected the field '${fieldName}' to be defined`);
    this.setField(fieldName);
  }
}

export class NullFieldValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`expected the field '${fieldName}' to be non-null`);
    this.setField(fieldName);
  }
}

export class StringValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`expected the field '${fieldName}' to be a string`);
    this.setField(fieldName);
  }
}

export class StringArrayValidationException extends ValidationException {
  constructor(fieldName?: string) {
    super(
      !fieldName
        ? "expected the object to be an array of strings"
        : `expected the field '${fieldName}' to be an array of strings`
    );
    this.setField(fieldName);
  }
}

export class NullValidationException extends ValidationException {
  constructor() {
    super("expected the object to be non-null");
  }
}

export class UndefinedValidationException extends ValidationException {
  constructor() {
    super("expected the object to be defined");
  }
}

export class NumberValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`expected the field '${fieldName}' to be a number`);
    this.setField(fieldName);
  }
}

export class NumberArrayValidationException extends ValidationException {
  constructor(fieldName?: string) {
    super(
      !fieldName
        ? "expected the object to be an array of numbers"
        : `expected the field '${fieldName}' to be an array of numbers`
    );
    this.setField(fieldName);
  }
}

export class BooleanValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`expected the field '${fieldName}' to be a boolean`);
    this.setField(fieldName);
  }
}

export class DateValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`expected the field '${fieldName}' to be a date`);
    this.setField(fieldName);
  }
}

export class ObjectArrayValidationException extends ValidationException {
  constructor(fieldName?: string) {
    super(
      !fieldName
        ? "expected the object to be an array of objects"
        : `expected the field '${fieldName}' to be an array of objects`
    );
    this.setField(fieldName);
  }
}
