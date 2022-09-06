"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(code, message) {
        this.message = message;
        this.code = code;
    }
    static WordAlreadyExists(msg) {
        return new ApiError(400, "This word already exists");
    }
    static BadRequest(msg) {
        return new ApiError(400, msg);
    }
    static WordApiEntryRequest(msg) {
        return new ApiError(404, msg);
    }
}
exports.default = ApiError;
//# sourceMappingURL=apiError.js.map