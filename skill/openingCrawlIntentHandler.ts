import {
  HandlerInput,
  RequestHandler,
  getIntentName,
  getRequestType,
} from 'ask-sdk';
import { Response } from 'ask-sdk-model';
import { starWarsClient } from './lib/starWarsClient';

export const OpeningCrawlIntentHandler: RequestHandler = {
  canHandle({ requestEnvelope }: HandlerInput): boolean {
    const requestType = getRequestType(requestEnvelope);
    if (requestType === 'IntentRequest') {
      const intentName = getIntentName(requestEnvelope);
      return intentName === 'OpeningCrawlIntent';
    }
    return false;
  },
  async handle({ responseBuilder, attributesManager }: HandlerInput): Promise<Response> {

    const starWarsResponse = await starWarsClient().get('/films/1');
    const speechText = starWarsResponse.data.opening_crawl;
    const episodeNumber = starWarsResponse.data.episode_id;
    const episodeTitle = starWarsResponse.data.title;
    
    const sessionAttributes = await attributesManager.getSessionAttributes();
    sessionAttributes.episodeNumber = episodeNumber;
    attributesManager.setSessionAttributes(sessionAttributes);

    return responseBuilder
      .speak(`Episode ${episodeNumber}. ${episodeTitle}. ${speechText}`)
      .withShouldEndSession(false)
      .getResponse();
  },
};
