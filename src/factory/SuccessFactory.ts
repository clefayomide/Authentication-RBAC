import { SuccessType } from "../types";

class SuccessResponse {
  success: SuccessType;
  constructor(success: SuccessType) {
    this.success = success;
  }
}

export class SuccessResponseFactory {
  create = (message: string, code: number, data?: any) => {
    return new SuccessResponse({ message, code, data, status: true });
  };
}
