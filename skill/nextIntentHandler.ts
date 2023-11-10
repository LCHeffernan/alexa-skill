import {
  HandlerInput,
  RequestHandler,
  getIntentName,
  getRequestType,
} from 'ask-sdk';
import { Response } from 'ask-sdk-model';
import { starWarsClient } from './lib/starWarsClient';

export const NextIntentHandler: RequestHandler = {
  canHandle({ requestEnvelope }: HandlerInput): boolean {
    const requestType = getRequestType(requestEnvelope);
    if (requestType === 'IntentRequest') {
      const intentName = getIntentName(requestEnvelope);
      return intentName === 'AMAZON.NextIntent';
    }
    return false;
  },
  async handle({
    responseBuilder,
    attributesManager,
  }: HandlerInput): Promise<Response> {
    const sessionAttributes = await attributesManager.getSessionAttributes();
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
    } else if (currentEpisodeNumber < 3) {
      nextEpisodeParameterId = currentEpisodeNumber + 4;
    } else if (currentEpisodeNumber === 3) {
      return responseBuilder
        .speak('There are no more episodes.')
        .withShouldEndSession(false)
        .getResponse();
    }

    const starWarsResponse = await starWarsClient().get(
      `/films/${nextEpisodeParameterId}`
    );
    const speechText = starWarsResponse.data.opening_crawl;
    const episodeNumber = starWarsResponse.data.episode_id;
    const episodeTitle = starWarsResponse.data.title;

    sessionAttributes.episodeNumber = episodeNumber;
    attributesManager.setSessionAttributes(sessionAttributes);

    return responseBuilder
      .speak(`Episode ${episodeNumber}. ${episodeTitle}. ${speechText}`)
      .withShouldEndSession(false)
      .getResponse();
  },
};
