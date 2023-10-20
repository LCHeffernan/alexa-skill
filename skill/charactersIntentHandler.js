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
exports.CharactersIntentHandler = void 0;
const ask_sdk_1 = require("ask-sdk");
// import axios, { Axios } from 'axios';
const starWarsClient_1 = require("../libs/starWarsClient");
// const starWarsClient: Axios = axios.create({
//   baseURL: 'https://swapi.dev/api',
//   timeout: 10000,
// });
exports.CharactersIntentHandler = {
    canHandle({ requestEnvelope }) {
        const requestType = (0, ask_sdk_1.getRequestType)(requestEnvelope);
        if (requestType === 'IntentRequest') {
            const intentName = (0, ask_sdk_1.getIntentName)(requestEnvelope);
            return intentName === 'CharactersIntent';
        }
        return false;
    },
    handle({ responseBuilder }) {
        return __awaiter(this, void 0, void 0, function* () {
            // want to extract this into a separate file
            // const starWarsClient: Axios = axios.create({
            //   baseURL: 'https://swapi.dev/api',
            //   timeout: 10000,
            // });
            const characterResponse = yield starWarsClient_1.starWarsClient.get('/people/1');
            const speechText = characterResponse.data.name;
            return responseBuilder
                .speak(`${speechText}`)
                .withShouldEndSession(false)
                .getResponse();
        });
    },
};
