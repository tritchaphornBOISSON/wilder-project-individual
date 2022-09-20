import { getSkillRepository } from "../../database/utils";
import Skill from "./skillEntity";

const initializeSkills = async (): Promise<void> => {
  const skillRepository = await getSkillRepository();
  await skillRepository.clear();

  await skillRepository.save({
    skillName: "PHP",
  });
  await skillRepository.save({
    skillName: "JavaScript",
  });
  await skillRepository.save({
    skillName: "TypeScript",
  });
  await skillRepository.save({
    skillName: "Java",
  });
};

const getSkillByName = async (name: string): Promise<Skill | null> => {
  const skillRepository = await getSkillRepository();
  return skillRepository.findOneBy({ skillName: name });
};

export { initializeSkills, getSkillByName };
