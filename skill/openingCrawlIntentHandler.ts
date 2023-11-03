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
  async handle({ responseBuilder }: HandlerInput): Promise<Response> {

    const starWarsResponse = await starWarsClient().get('/films/1');
    const speechText = starWarsResponse.data.opening_crawl;

    return responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};
