"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.starWarsClient = void 0;
const axios_1 = require("axios");
exports.starWarsClient = axios_1.default.create({
    baseURL: "https://swapi.dev/api/",
    timeout: 3000,
});
