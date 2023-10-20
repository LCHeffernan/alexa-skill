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
exports.handler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const launchRequestHandler_1 = require("./skill/launchRequestHandler");
const helpIntentHandler_1 = require("./skill/helpIntentHandler");
const cancelAndStopIntentHandler_1 = require("./skill/cancelAndStopIntentHandler");
const audioPlayerRequestHandler_1 = require("./skill/audioPlayerRequestHandler");
const errorsHandler_1 = require("./skill/errorsHandler");
const charactersIntentHandler_1 = require("./skill/charactersIntentHandler");
const sessionEndedRequestHandler_1 = require("./skill/sessionEndedRequestHandler");
const openingCrawlIntentHandler_1 = require("./skill/openingCrawlIntentHandler");
let skill;
const handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
        skill = ask_sdk_core_1.SkillBuilders.custom()
            .addRequestHandlers(launchRequestHandler_1.LaunchRequestHandler, helpIntentHandler_1.HelpIntentHandler, cancelAndStopIntentHandler_1.CancelAndStopIntentHandler, audioPlayerRequestHandler_1.AudioPlayerRequestHandler, sessionEndedRequestHandler_1.SessionEndedRequestHandler, charactersIntentHandler_1.CharactersIntentHandler, openingCrawlIntentHandler_1.OpeningCrawlIntentHandler)
            .addErrorHandlers(errorsHandler_1.ErrorsHandler)
            .create();
    }
    const response = yield skill.invoke(event, context);
    console.log(`RESPONSE++++${JSON.stringify(response)}`);
    return response;
});
exports.handler = handler;
