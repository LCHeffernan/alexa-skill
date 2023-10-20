import {
  HandlerInput,
  RequestHandler,
  getIntentName,
  getRequestType,
} from 'ask-sdk';
import { Response } from 'ask-sdk-model';

export const HelpIntentHandler: RequestHandler = {
  canHandle({ requestEnvelope }: HandlerInput): boolean {
    const requestType = getRequestType(requestEnvelope);
    if (requestType === 'IntentRequest') {
      const intentName = getIntentName(requestEnvelope);
      return intentName === 'AMAZON.HelpIntent';
    }
    return false;
  },
  handle({ responseBuilder }: HandlerInput): Response {
    const speechText = 'You can ask about Star Wars!';

    return responseBuilder.speak(speechText).reprompt(speechText).getResponse();
  },
};
