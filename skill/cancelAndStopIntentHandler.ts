import {
  HandlerInput,
  RequestHandler,
  getIntentName,
  getRequestType,
} from 'ask-sdk';
import { Response } from 'ask-sdk-model';

export const CancelAndStopIntentHandler: RequestHandler = {
  canHandle({ requestEnvelope }: HandlerInput): boolean {
    const requestType = getRequestType(requestEnvelope);
    if (requestType === 'IntentRequest') {
      const intentName = getIntentName(requestEnvelope);
      return (
        intentName === 'AMAZON.CancelIntent' ||
        intentName === 'AMAZON.StopIntent'
      );
    }
    return false;
  },
  handle({ responseBuilder }: HandlerInput): Response {
    const speechText = 'Goodbye!';

    return responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};
