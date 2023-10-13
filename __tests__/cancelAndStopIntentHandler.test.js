import { CancelAndStopIntentHandler } from '../skill/cancelAndStopIntentHandler';

describe('cancelAndStopIntentHandler', () => {
  const speakMock = jest.fn(() => handlerInput.responseBuilder);
  const withShouldEndSessionMock = jest.fn(() => handlerInput.responseBuilder);
  const getResponseMock = jest.fn(() => handlerInput.responseBuilder);

  let handlerInput = {
    requestEnvelope: {
      request: {
        type: 'IntentRequest',
      },
    },
    responseBuilder: {
      speak: speakMock,
      withShouldEndSession: withShouldEndSessionMock,
      getResponse: getResponseMock,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('If a stop request is received', () => {
    handlerInput = {
      requestEnvelope: {
        request: {
          intent: {
            name: 'AMAZON.StopIntent',
          },
        },
      },
      responseBuilder: {
        speak: speakMock,
        withShouldEndSession: withShouldEndSessionMock,
        getResponse: getResponseMock,
      },
    };
    it('should be able to handle a request', () => {
      expect(CancelAndStopIntentHandler.canHandle(handlerInput)).toEqual(true);
    });

    it('should respond with a goodbye message and end the session', () => {
      CancelAndStopIntentHandler.handle(handlerInput);
      expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
        'Goodbye!'
      );
      expect(
        handlerInput.responseBuilder.withShouldEndSession
      ).toHaveBeenCalledWith(true);
      expect(
        handlerInput.responseBuilder.withShouldEndSession
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('If a cancel request is received', () => {
    handlerInput = {
      requestEnvelope: {
        request: {
          type: 'IntentRequest',
          intent: {
            name: 'AMAZON.CancelIntent',
          },
        },
      },
      responseBuilder: {
        speak: speakMock,
        withShouldEndSession: withShouldEndSessionMock,
        getResponse: getResponseMock,
      },
    };
    it('should be able to handle a request', () => {
      expect(CancelAndStopIntentHandler.canHandle(handlerInput)).toEqual(true);
    });

    it('should respond with a goodbye message', () => {
      CancelAndStopIntentHandler.handle(handlerInput);
      expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
        'Goodbye!'
      );
      expect(
        handlerInput.responseBuilder.withShouldEndSession
      ).toHaveBeenCalledWith(true);
      expect(
        handlerInput.responseBuilder.withShouldEndSession
      ).toHaveBeenCalledTimes(1);
    });
  });
});
