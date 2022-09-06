"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../error/apiError"));
function apiErrorHandler(err, req, res, next) {
    if (err instanceof apiError_1.default) {
        return res.status(err.code).json(err.message);
    }
    console.log(err);
    return res.status(500).json("Server error");
}
exports.default = apiErrorHandler;
//# sourceMappingURL=validationErrorHandler.js.map