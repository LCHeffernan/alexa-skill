import { Skill, SkillBuilders } from "ask-sdk-core";
import { RequestEnvelope } from "ask-sdk-model";

let skill: Skill;

export const handler = async (event: RequestEnvelope, context: any) => {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = SkillBuilders.custom().addRequestHandlers().create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};
