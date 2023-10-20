import {
  HandlerInput,
  RequestHandler,
  getIntentName,
  getRequestType,
} from 'ask-sdk';
import { Response } from 'ask-sdk-model';
import { starWarsClient } from '../libs/starWarsClient'

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
    const characterResponse = await starWarsClient.get('/people/1');
    const speechText = characterResponse.data.name;

    return responseBuilder
      .speak(`${speechText}`)
      .withShouldEndSession(false)
      .getResponse();
  },
};
