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
