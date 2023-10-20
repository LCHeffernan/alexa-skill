import { ErrorsHandler } from '../skill/errorsHandler';

describe('errorsHandler', () => {
  const speakMock = jest.fn(() => handlerInput.responseBuilder);
  const repromptMock = jest.fn(() => handlerInput.responseBuilder);
  const getResponseMock = jest.fn(() => handlerInput.responseBuilder);

  const handlerInput = {
    responseBuilder: {
      speak: speakMock,
      reprompt: repromptMock,
      getResponse: getResponseMock,
    },
  };

  const error = { message: 'fake message' };

  it('should be able to handle a request', () => {
    expect(ErrorsHandler.canHandle(handlerInput)).toEqual(true);
  });

  it('should respond with an error message', () => {
    ErrorsHandler.handle(handlerInput, error);
    expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
      'Sorry, I do not understand your command. Please say it again.'
    );
    expect(handlerInput.responseBuilder.reprompt).toHaveBeenCalledWith(
      'Sorry, I do not understand your command. Please say it again.'
    );
  });
});
