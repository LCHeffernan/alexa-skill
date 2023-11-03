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
exports.NextIntentHandler = void 0;
const ask_sdk_1 = require("ask-sdk");
const starWarsClient_1 = require("./lib/starWarsClient");
exports.NextIntentHandler = {
    canHandle({ requestEnvelope }) {
        const requestType = (0, ask_sdk_1.getRequestType)(requestEnvelope);
        if (requestType === 'IntentRequest') {
            const intentName = (0, ask_sdk_1.getIntentName)(requestEnvelope);
            return intentName === 'AMAZON.NextIntent';
        }
        return false;
    },
    handle({ responseBuilder, attributesManager, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionAttributes = yield attributesManager.getSessionAttributes();
            const currentEpisodeNumber = sessionAttributes.episodeNumber;
            let nextEpisodeParameterId;
            if (!currentEpisodeNumber) {
                return responseBuilder
                    .speak('You need to play an episode to enable the next function.')
                    .withShouldEndSession(false)
                    .getResponse();
            }
            if (currentEpisodeNumber >= 4) {
                nextEpisodeParameterId = currentEpisodeNumber - 2;
            }
            else if (currentEpisodeNumber < 3) {
                nextEpisodeParameterId = currentEpisodeNumber + 4;
            }
            else if (currentEpisodeNumber === 3) {
                return responseBuilder
                    .speak('There are no more episodes.')
                    .withShouldEndSession(false)
                    .getResponse();
            }
            console.log(nextEpisodeParameterId);
            const starWarsResponse = yield (0, starWarsClient_1.starWarsClient)().get(`/films/${nextEpisodeParameterId}`);
            const speechText = starWarsResponse.data.opening_crawl;
            const episodeNumber = starWarsResponse.data.episode_id;
            const episodeTitle = starWarsResponse.data.title;
            sessionAttributes.episodeNumber = episodeNumber;
            attributesManager.setSessionAttributes(sessionAttributes);
            return responseBuilder
                .speak(`Episode ${episodeNumber}. ${episodeTitle}. ${speechText}`)
                .withShouldEndSession(false)
                .getResponse();
        });
    },
};
