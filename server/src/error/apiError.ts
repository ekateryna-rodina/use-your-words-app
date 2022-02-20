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
  static WordApiEntryRequest(msg: string): ApiError {
    return new ApiError(404, msg);
  }
}

export default ApiError;
