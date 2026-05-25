export type SuccessResponse<T> = {
  status: "success";
  data: T;
};

export type FailResponse = {
  status: "fail";
  message: string;
  error: Record<string, string>;
};
