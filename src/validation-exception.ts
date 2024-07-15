export abstract class ValidationException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UndefinedFieldValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`The field '${fieldName}' is undefined`);
  }
}

export class NullFieldValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`The field '${fieldName}' is null`);
  }
}

export class StringValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`The field '${fieldName}' is not a string`);
  }
}

export class StringArrayValidationException extends ValidationException {
  constructor(fieldName?: string) {
    super(
      !fieldName
        ? "The object is not an array of strings"
        : `The field '${fieldName}' is not an array of strings`
    );
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
  }
}

export class NumberArrayValidationException extends ValidationException {
  constructor(fieldName?: string) {
    super(
      !fieldName
        ? "The object is not an array of numbers"
        : `The '${fieldName}' is not an array of numbers`
    );
  }
}

export class BooleanValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`the field ${fieldName} is not a boolean`);
  }
}

export class DateValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`the field ${fieldName} is not a date`);
  }
}
