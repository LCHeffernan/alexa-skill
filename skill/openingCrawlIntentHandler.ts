import {
  HandlerInput,
  RequestHandler,
  getIntentName,
  getRequestType,
} from 'ask-sdk';
import { Response } from 'ask-sdk-model';
import axios, { Axios } from 'axios';

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
    const starWarsClient: Axios = axios.create({
      baseURL: 'https://swapi.dev/api',
      timeout: 3000,
    });

    const starWarsResponse = await starWarsClient.get('/films/1');
    const speechText = starWarsResponse.data.opening_crawl;

    return responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};
