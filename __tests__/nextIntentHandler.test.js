import axios from 'axios';
import { NextIntentHandler } from '../skill/nextIntentHandler';

jest.mock('axios');

describe('nextIntentHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const speakMock = jest.fn(() => handlerInput.responseBuilder);
  const withShouldEndSessionMock = jest.fn(() => handlerInput.responseBuilder);
  const getResponseMock = jest.fn(() => handlerInput.responseBuilder);
  const getSessionAttributesMock = jest
    .fn()
    .mockImplementationOnce(() => {
      return { episodeNumber: 4 };
    })
    .mockImplementationOnce(() => {
      return { episodeNumber: 3 };
    })
    .mockImplementationOnce(() => {
      return { episodeNumber: undefined };
    });
  const setSessionAttributesMock = jest.fn(() => {
    return { episodeNumber: 99 };
  });

  const handlerInput = {
    requestEnvelope: {
      request: {
        type: 'IntentRequest',
        intent: {
          name: 'AMAZON.NextIntent',
        },
      },
    },
    responseBuilder: {
      speak: speakMock,
      withShouldEndSession: withShouldEndSessionMock,
      getResponse: getResponseMock,
    },
    attributesManager: {
      getSessionAttributes: getSessionAttributesMock,
      setSessionAttributes: setSessionAttributesMock,
    },
  };

  it('should be able to handle a request', () => {
    expect(NextIntentHandler.canHandle(handlerInput)).toEqual(true);
  });

  it('should return the opening crawl from the next episode', async () => {
    axios.create.mockReturnThis();
    axios.get.mockResolvedValue({
      data: {
        opening_crawl: 'next episode text',
        episode_id: '100',
        title: 'next episode title',
      },
    });
    await NextIntentHandler.handle(handlerInput);

    expect(handlerInput.responseBuilder.getResponse).toHaveBeenCalled();
    expect(handlerInput.responseBuilder.getResponse).toHaveBeenCalledTimes(1);
    expect(
      handlerInput.responseBuilder.withShouldEndSession
    ).toHaveBeenCalledWith(false);
    expect(
      handlerInput.attributesManager.getSessionAttributes
    ).toHaveBeenCalled();
    expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
      'Episode 100. next episode title. next episode text'
    );
  });

  it('should return a no next episodes message if it is the last episode', async () => {
    await NextIntentHandler.handle(handlerInput);

    expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
      'There are no more episodes.'
    );
  });

  it('should return a message if no episode is currently playing', async () => {
    await NextIntentHandler.handle(handlerInput);

    expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
      'You need to play an episode to enable the next function.'
    );
  });
});
