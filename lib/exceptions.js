export class RequiredParamsException extends Error {
    constructor(message) {
      super(message);
      this.name = 'RequiredParamsException';
    }
  }