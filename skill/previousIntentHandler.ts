import {
    HandlerInput,
    RequestHandler,
    getIntentName,
    getRequestType,
  } from 'ask-sdk';
  import { Response } from 'ask-sdk-model';
  import { starWarsClient } from './lib/starWarsClient';
  
  export const previousIntentHandler: RequestHandler = {
    canHandle({ requestEnvelope }: HandlerInput): boolean {
      const requestType = getRequestType(requestEnvelope);
      if (requestType === 'IntentRequest') {
        const intentName = getIntentName(requestEnvelope);
        return intentName === 'AMAZON.PreviousIntent';
      }
      return false;
    },
    async handle({
      responseBuilder,
      attributesManager,
    }: HandlerInput): Promise<Response> {
      const sessionAttributes = await attributesManager.getSessionAttributes();
      const currentEpisodeNumber = sessionAttributes.episodeNumber;
      
      let previousEpisodeParameterId;
      if (!currentEpisodeNumber) {
        return responseBuilder
          .speak('You need to play an episode to enable the previous function.')
          .withShouldEndSession(false)
          .getResponse();
      }
      if (currentEpisodeNumber > 4) {
        previousEpisodeParameterId = currentEpisodeNumber - 4;
      } else if (currentEpisodeNumber <= 3) {
        previousEpisodeParameterId = currentEpisodeNumber + 2;
      } else if (currentEpisodeNumber === 4) {
        return responseBuilder
          .speak('There are no previous episodes.')
          .withShouldEndSession(false)
          .getResponse();
      }
      console.log(previousEpisodeParameterId);
  
      const starWarsResponse = await starWarsClient().get(
        `/films/${previousEpisodeParameterId}`
      );
      const speechText:string = starWarsResponse.data.opening_crawl;
      const episodeNumber: number = starWarsResponse.data.episode_id;
      const episodeTitle: string = starWarsResponse.data.title;
  
      sessionAttributes.episodeNumber = episodeNumber;
      attributesManager.setSessionAttributes(sessionAttributes);
  
      return responseBuilder
        .speak(`Episode ${episodeNumber}. ${episodeTitle}. ${speechText}`)
        .withShouldEndSession(false)
        .getResponse();
    },
  };