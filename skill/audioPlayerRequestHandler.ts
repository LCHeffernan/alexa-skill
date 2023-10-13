import { HandlerInput, RequestHandler, getRequestType } from 'ask-sdk';
import { Response } from 'ask-sdk-model';

export const AudioPlayerRequestHandler: RequestHandler = {
  canHandle: function ({ requestEnvelope }: HandlerInput): boolean | Promise<boolean> {
    const requestType = getRequestType(requestEnvelope);
    return requestType.startsWith('AudioPlayer');
  },
  handle: function ({ responseBuilder }: HandlerInput): Response {
    return responseBuilder.getResponse();
  },
};