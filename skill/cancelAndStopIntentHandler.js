"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelAndStopIntentHandler = void 0;
const ask_sdk_1 = require("ask-sdk");
exports.CancelAndStopIntentHandler = {
    canHandle({ requestEnvelope }) {
        const requestType = (0, ask_sdk_1.getRequestType)(requestEnvelope);
        if (requestType === "IntentRequest") {
            const intentName = (0, ask_sdk_1.getIntentName)(requestEnvelope);
            return (intentName === "AMAZON.CancelIntent" ||
                intentName === "AMAZON.StopIntent");
        }
        return false;
    },
    handle({ responseBuilder }) {
        const speechText = "Goodbye!";
        return responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)
            .getResponse();
    },
};
