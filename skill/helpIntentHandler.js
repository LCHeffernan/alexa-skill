"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpIntentHandler = void 0;
const ask_sdk_1 = require("ask-sdk");
exports.HelpIntentHandler = {
    canHandle({ requestEnvelope }) {
        const requestType = (0, ask_sdk_1.getRequestType)(requestEnvelope);
        if (requestType === 'IntentRequest') {
            const intentName = (0, ask_sdk_1.getIntentName)(requestEnvelope);
            return intentName === "AMAZON.HelpIntent";
        }
        return false;
    },
    handle({ responseBuilder }) {
        const speechText = "You can ask about Star Wars!";
        return responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    },
};
