"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchRequestHandler = void 0;
const ask_sdk_1 = require("ask-sdk");
exports.LaunchRequestHandler = {
    canHandle({ requestEnvelope }) {
        const requestType = (0, ask_sdk_1.getRequestType)(requestEnvelope);
        return requestType === 'LaunchRequest';
    },
    handle({ responseBuilder }) {
        const speechText = 'Welcome to the alexa skill!';
        return responseBuilder.speak(speechText).reprompt(speechText).getResponse();
    },
};
