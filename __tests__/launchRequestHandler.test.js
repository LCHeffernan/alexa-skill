import { LaunchRequestHandler } from '../skill/launchRequestHandler';

describe('launchRequestHandler', () => {
  const speakMock = jest.fn(() => handlerInput.responseBuilder);
  const repromptMock = jest.fn(() => handlerInput.responseBuilder);
  const getResponseMock = jest.fn(() => handlerInput.responseBuilder);

  const handlerInput = {
    requestEnvelope: {
      request: {
        type: 'LaunchRequest',
      },
    },
    responseBuilder: {
      speak: speakMock,
      reprompt: repromptMock,
      getResponse: getResponseMock,
    },
  };

  it('should be able to handle a request', () => {
    expect(LaunchRequestHandler.canHandle(handlerInput)).toEqual(true);
  });

  it('should respond with a launch message', () => {
    LaunchRequestHandler.handle(handlerInput);
    expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
      'Welcome to the Star Wars fan skill!'
    );
    expect(handlerInput.responseBuilder.reprompt).toHaveBeenCalledWith(
      'Welcome to the Star Wars fan skill!'
    );
  });
});
