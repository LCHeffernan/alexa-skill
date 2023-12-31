import axios from 'axios';
import { OpeningCrawlIntentHandler } from '../skill/openingCrawlIntentHandler';

jest.mock('axios');

describe('openingCrawlIntentHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const speakMock = jest.fn(() => handlerInput.responseBuilder);
  const withShouldEndSessionMock = jest.fn(() => handlerInput.responseBuilder);
  const getResponseMock = jest.fn(() => handlerInput.responseBuilder);
  const getSessionAttributesMock = jest.fn(() => {return {}})
  const setSessionAttributesMock = jest.fn(() => {return { episodeNumber: 99 }})

  const handlerInput = {
    requestEnvelope: {
      request: {
        type: 'IntentRequest',
        intent: {
          name: 'OpeningCrawlIntent',
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
    expect(OpeningCrawlIntentHandler.canHandle(handlerInput)).toEqual(true);
  });

  it('should respond with a character name', async () => {
    axios.create.mockReturnThis();
    axios.get.mockResolvedValue({
      data: {
        opening_crawl: 'fake text',
        episode_id: '99',
        title: 'episode title',
      },
    });
    await OpeningCrawlIntentHandler.handle(handlerInput);
    expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
      'Episode 99. episode title. fake text'
    );
    expect(
      handlerInput.responseBuilder.withShouldEndSession
    ).toHaveBeenCalledWith(false);
  });
});
