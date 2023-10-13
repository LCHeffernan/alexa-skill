import { AudioPlayerRequestHandler } from '../skill/audioPlayerRequestHandler';

describe('audioPlayerRequestHandler', () => {
  const getResponseMock = jest.fn(() => handlerInput.responseBuilder);

  const handlerInput = {
    requestEnvelope: {
      request: {
        type: 'AudioPlayer.Play',
      },
    },
    responseBuilder: {
      getResponse: getResponseMock,
    },
  };

  it('should be able to handle a request', () => {
    expect(AudioPlayerRequestHandler.canHandle(handlerInput)).toEqual(true);
  });

  it('should send a response', () => {
    AudioPlayerRequestHandler.handle(handlerInput);
    expect(handlerInput.responseBuilder.getResponse).toHaveBeenCalled();
    expect(handlerInput.responseBuilder.getResponse).toHaveBeenCalledTimes(1);
  });
});
