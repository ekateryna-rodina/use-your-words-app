"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchInfo = void 0;
const axios_1 = __importDefault(require("axios"));
const apiError_1 = __importDefault(require("../error/apiError"));
function fetchInfo(word) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!word) {
            throw new Error("Input is not provided");
        }
        const endpointDictionary = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const endpointCollocations = "https://linguatools-english-collocations.p.rapidapi.com/bolls/";
        const endpointSynonymsAntonyms = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.MERRIAM_WEBSTER_THESAURUS}`;
        try {
            const dictionaryPromise = (0, axios_1.default)(endpointDictionary);
            const collocationsPromise = (0, axios_1.default)(endpointCollocations, {
                params: {
                    lang: "en",
                    query: word,
                    max_results: "5",
                },
                headers: {
                    "x-rapidapi-host": "linguatools-english-collocations.p.rapidapi.com",
                    "x-rapidapi-key": process.env.RAPID_API_KEY,
                },
            });
            const synonymsAntonymsPromise = (0, axios_1.default)(endpointSynonymsAntonyms);
            const [dictionaryResponse, collocationsResponse, synonymsAntonymsResponse] = yield Promise.all([
                dictionaryPromise,
                collocationsPromise,
                synonymsAntonymsPromise,
            ]);
            return Object.assign(Object.assign({}, dictionaryResponse.data[0]), { collocations: collocationsResponse.data, synonymsAntonyms: synonymsAntonymsResponse.data[0] });
        }
        catch (error) {
            if (error.code === 404)
                return apiError_1.default.WordApiEntryRequest(error.message);
            throw new apiError_1.default(error.code, error.message);
        }
    });
}
exports.fetchInfo = fetchInfo;
//# sourceMappingURL=wordsApi.service.js.map