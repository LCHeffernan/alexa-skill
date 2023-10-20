import {
  HandlerInput,
  RequestHandler,
  getIntentName,
  getRequestType,
} from 'ask-sdk';
import { Response } from 'ask-sdk-model';
import axios, { Axios } from 'axios';

export const CharactersIntentHandler: RequestHandler = {
  canHandle({ requestEnvelope }: HandlerInput): boolean {
    const requestType = getRequestType(requestEnvelope);
    if (requestType === 'IntentRequest') {
      const intentName = getIntentName(requestEnvelope);
      return intentName === 'CharactersIntent';
    }
    return false;
  },
  async handle({ responseBuilder }: HandlerInput): Promise<Response> {
    const starWarsClient: Axios = axios.create({
      baseURL: 'https://swapi.dev/api',
      timeout: 3000,
    });
    const characterResponse = await starWarsClient.get('/people/1');
    const speechText = characterResponse.data.name;

    return responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};
