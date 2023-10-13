import { HandlerInput, RequestHandler, getRequestType } from 'ask-sdk';
import { Response } from 'ask-sdk-model';

export const LaunchRequestHandler: RequestHandler = {
  canHandle({ requestEnvelope }: HandlerInput): boolean {
    const requestType = getRequestType(requestEnvelope);
    return requestType === 'LaunchRequest';
  },
  handle({ responseBuilder }: HandlerInput): Response | Promise<Response> {
    const speechText = 'Welcome to the alexa skill!';

    return responseBuilder.speak(speechText).reprompt(speechText).getResponse();
  },
};
