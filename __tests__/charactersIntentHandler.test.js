import axios from 'axios';
import { CharactersIntentHandler } from '../skill/charactersIntentHandler';

jest.mock('axios');

describe('charactersIntentHandler', () => {
    const speakMock = jest.fn(() => handlerInput.responseBuilder);
  const withShouldEndSessionMock = jest.fn(() => handlerInput.responseBuilder);
  const getResponseMock = jest.fn(() => handlerInput.responseBuilder);

  const handlerInput = {
    requestEnvelope: {
      request: {
        type: 'IntentRequest',
        intent: {
          name: 'CharactersIntent',
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
    expect(CharactersIntentHandler.canHandle(handlerInput)).toEqual(true);
  });

  it('should respond with a character name', async () => {
    axios.create.mockReturnThis()
    axios.get.mockResolvedValue({
      data: {
        name: 'Luke Skywalker',
      },
    });
    await CharactersIntentHandler.handle(handlerInput);
    expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith('Luke Skywalker');
    expect(
      handlerInput.responseBuilder.withShouldEndSession
    ).toHaveBeenCalledWith(false);
  });
});
