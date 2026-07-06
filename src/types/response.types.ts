export type SuccessResponse<T> = {
  status: "success";
  token: string;
  data: T;
};

export type FailResponse = {
  status: "fail";
  message: string;
  statusCode: number;
  error: Record<string, string>;
};
