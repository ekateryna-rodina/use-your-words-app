"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomize = exports.getRandom = void 0;
const getRandom = (list) => list[Math.floor(Math.random() * list.length)];
exports.getRandom = getRandom;
const randomize = (list) => list.sort(() => 0.5 - Math.random());
exports.randomize = randomize;
//# sourceMappingURL=listHelper.js.map