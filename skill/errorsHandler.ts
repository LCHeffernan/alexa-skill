import { ErrorHandler, HandlerInput } from 'ask-sdk';
import { Response } from 'ask-sdk-model';

export const ErrorsHandler: ErrorHandler = {
  canHandle(): boolean {
    return true;
  },
  handle({ responseBuilder }: HandlerInput, error: Error): Response {
    console.log(`Error handled: ${error.message}`);

    return responseBuilder
      .speak('Sorry, I do not understand your command. Please say it again.')
      .reprompt('Sorry, I do not understand your command. Please say it again.')
      .getResponse();
  },
};
