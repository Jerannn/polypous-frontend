import type { FailResponse } from "@/types/response.types";

export class ApiError extends Error {
  statusCode: number;
  error: FailResponse;

  constructor(message: string, statusCode: number, error: FailResponse) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.error = error || {};
  }
}
