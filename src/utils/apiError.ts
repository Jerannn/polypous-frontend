export class ApiError extends Error {
  statusCode: number;
  error: Record<string, string>;

  constructor(
    message: string,
    statusCode: number,
    error: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.error = error || {};
  }
}
