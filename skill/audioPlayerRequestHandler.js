"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioPlayerRequestHandler = void 0;
const ask_sdk_1 = require("ask-sdk");
exports.AudioPlayerRequestHandler = {
    canHandle: function ({ requestEnvelope, }) {
        const requestType = (0, ask_sdk_1.getRequestType)(requestEnvelope);
        return requestType.startsWith('AudioPlayer');
    },
    handle: function ({ responseBuilder }) {
        return responseBuilder.getResponse();
    },
};
