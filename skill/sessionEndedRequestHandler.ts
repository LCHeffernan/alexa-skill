import { HandlerInput, RequestHandler, getRequestType } from 'ask-sdk';
import { Response, SessionEndedRequest } from 'ask-sdk-model';

export const SessionEndedRequestHandler: RequestHandler = {
  canHandle({ requestEnvelope }: HandlerInput): boolean {
    const requestType = getRequestType(requestEnvelope);
    return requestType === 'SessionEndedRequest';
  },
  handle({ requestEnvelope, responseBuilder }: HandlerInput): Response {
    console.log(
      `Session ended with reason: ${
        (requestEnvelope.request as SessionEndedRequest).reason
      }`
    );

    return responseBuilder.getResponse();
  },
};
