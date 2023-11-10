import axios from 'axios';
import { previousIntentHandler } from '../skill/previousIntentHandler';

jest.mock('axios');

describe('previousIntentHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const speakMock = jest.fn(() => handlerInput.responseBuilder);
  const withShouldEndSessionMock = jest.fn(() => handlerInput.responseBuilder);
  const getResponseMock = jest.fn(() => handlerInput.responseBuilder);

  const getSessionAttributesMock = jest
    .fn()
    .mockImplementationOnce(() => {
      return { episodeNumber: 5 };
    })
    .mockImplementationOnce(() => {
      return { episodeNumber: 4 };
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
          name: 'AMAZON.PreviousIntent',
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

jest.spyOn(handlerInput.attributesManager, 'setSessionAttributes')

  it('should be able to handle a request', () => {
    expect(previousIntentHandler.canHandle(handlerInput)).toEqual(true);
  });

  it('should return the opening crawl from the previous episode', async () => {
    axios.create.mockReturnThis();
    axios.get.mockResolvedValue({
      data: {
        opening_crawl: 'previous episode text',
        episode_id: 1,
        title: 'previous episode title',
      },
    });
    await previousIntentHandler.handle(handlerInput);

    expect(handlerInput.responseBuilder.getResponse).toHaveBeenCalled();
    expect(handlerInput.responseBuilder.getResponse).toHaveBeenCalledTimes(1);
    expect(
      handlerInput.responseBuilder.withShouldEndSession
    ).toHaveBeenCalledWith(false);
    expect(
      handlerInput.attributesManager.getSessionAttributes
    ).toHaveBeenCalled();
    expect(
        handlerInput.attributesManager.setSessionAttributes
      ).toHaveBeenCalledWith({ episodeNumber: 1});
    expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
      'Episode 1. previous episode title. previous episode text'
    );
  });

  it('should return a no previous episodes message if it is the first episode', async () => {
    await previousIntentHandler.handle(handlerInput);

    expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
      'There are no previous episodes.'
    );
  });

  it('should return a message if no episode is currently playing', async () => {
    await previousIntentHandler.handle(handlerInput);

    expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
      'You need to play an episode to enable the previous function.'
    );
  });
});
