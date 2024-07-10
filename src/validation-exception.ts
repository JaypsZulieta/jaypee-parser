export abstract class ValidationException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class StringValidationException extends ValidationException {
  constructor(fieldName: string) {
    super(`The field '${fieldName}' is not a string`);
  }
}
