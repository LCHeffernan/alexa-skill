import { Skill, SkillBuilders } from 'ask-sdk-core';
import { RequestEnvelope } from 'ask-sdk-model';
import { LaunchRequestHandler } from './skill/launchRequestHandler';
import { HelpIntentHandler } from './skill/helpIntentHandler';
import { CancelAndStopIntentHandler } from './skill/cancelAndStopIntentHandler';
import { AudioPlayerRequestHandler } from './skill/audioPlayerRequestHandler';
import { ErrorsHandler } from './skill/errorsHandler';

let skill: Skill;

export const handler = async (event: RequestEnvelope, context: any) => {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        AudioPlayerRequestHandler
      )
      .addErrorHandlers(ErrorsHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};
