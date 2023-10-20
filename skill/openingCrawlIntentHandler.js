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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpeningCrawlIntentHandler = void 0;
const ask_sdk_1 = require("ask-sdk");
const axios_1 = require("axios");
exports.OpeningCrawlIntentHandler = {
    canHandle({ requestEnvelope }) {
        const requestType = (0, ask_sdk_1.getRequestType)(requestEnvelope);
        if (requestType === 'IntentRequest') {
            const intentName = (0, ask_sdk_1.getIntentName)(requestEnvelope);
            return intentName === 'OpeningCrawlIntent';
        }
        return false;
    },
    handle({ responseBuilder }) {
        return __awaiter(this, void 0, void 0, function* () {
            const starWarsClient = axios_1.default.create({
                baseURL: 'https://swapi.dev/api',
                timeout: 3000,
            });
            const starWarsResponse = yield starWarsClient.get('/films/1');
            const speechText = starWarsResponse.data.opening_crawl;
            return responseBuilder
                .speak(speechText)
                .withShouldEndSession(false)
                .getResponse();
        });
    },
};
