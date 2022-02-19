class ApiError {
  public message: string;
  public code: number;
  constructor(code: number, message: string) {
    this.message = message;
    this.code = code;
  }
  static BadRequest(msg: string): ApiError {
    return new ApiError(400, msg);
  }
}

export default ApiError;
