"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionEndedRequestHandler = void 0;
const ask_sdk_1 = require("ask-sdk");
exports.SessionEndedRequestHandler = {
    canHandle({ requestEnvelope }) {
        const requestType = (0, ask_sdk_1.getRequestType)(requestEnvelope);
        return requestType === "SessionEndedRequest";
    },
    handle({ requestEnvelope, responseBuilder }) {
        console.log(`Session ended with reason: ${requestEnvelope.request.reason}`);
        return responseBuilder.getResponse();
    },
};
