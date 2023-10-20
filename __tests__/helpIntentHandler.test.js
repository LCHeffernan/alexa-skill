import { HelpIntentHandler } from '../skill/helpIntentHandler';

describe('helpIntentHandler', () => {
  const speakMock = jest.fn(() => handlerInput.responseBuilder);
  const repromptMock = jest.fn(() => handlerInput.responseBuilder);
  const getResponseMock = jest.fn(() => handlerInput.responseBuilder);

  const handlerInput = {
    requestEnvelope: {
      request: {
        type: 'IntentRequest',
        intent: {
          name: 'AMAZON.HelpIntent',
        },
      },
    },
    responseBuilder: {
      speak: speakMock,
      reprompt: repromptMock,
      getResponse: getResponseMock,
    },
  };

  it('should be able to handle a request', () => {
    expect(HelpIntentHandler.canHandle(handlerInput)).toEqual(true);
  });

  it('should respond with a help message', () => {
    HelpIntentHandler.handle(handlerInput);
    expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
      'You can ask about Star Wars!'
    );
    expect(handlerInput.responseBuilder.reprompt).toHaveBeenCalledWith(
      'You can ask about Star Wars!'
    );
  });
});
