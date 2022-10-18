import {
  HTTPVerb,
  query,
  SKILLS_PATH,
  WILDERS_PATH,
} from "../../services/rest";
import { SkillType, WilderType } from "../../types";

export const createWilderRest = async (
  firstName: string,
  lastName: string
  // skills: string[]
): Promise<WilderType> => {
  return query(WILDERS_PATH, HTTPVerb.POST, { firstName, lastName });
};

export const fetchSkillsRest = async (): Promise<SkillType[]> => {
  return query(SKILLS_PATH, HTTPVerb.GET);
};
