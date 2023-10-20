import { SessionEndedRequestHandler } from '../skill/sessionEndedRequestHandler';

describe('SessionEndedRequestHandler', () => {
  const getResponseMock = jest.fn(() => handlerInput.responseBuilder);

  const handlerInput = {
    requestEnvelope: {
      request: {
        type: 'SessionEndedRequest',
      },
    },
    responseBuilder: {
      getResponse: getResponseMock,
    },
  };

  it('should be able to handle a request', () => {
    expect(SessionEndedRequestHandler.canHandle(handlerInput)).toEqual(true);
  });

  it('should send a response', () => {
    SessionEndedRequestHandler.handle(handlerInput);
    expect(handlerInput.responseBuilder.getResponse).toHaveBeenCalled();
    expect(handlerInput.responseBuilder.getResponse).toHaveBeenCalledTimes(1);
  });
});