import { getSkillRepository, getWilderRepository } from "../../database/utils";
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

const getSkills = async () => {
  const skillRepository = await getSkillRepository();
  return skillRepository.find();
};

const createSkill = async (skillName: string) => {
  const skillRepository = await getSkillRepository();
  const newSkill = skillRepository.create({ skillName });
  await skillRepository.save(newSkill);
  return newSkill;
};

const updateSkill = async (id: string, skillName: string) => {
  const skillRepository = await getSkillRepository();
  const existingSkill = await skillRepository.findOneBy({ id });
  if (!existingSkill) {
    throw Error("No skill with matching ID found");
  }
  return skillRepository.save({ id, skillName });
};

const deleteSkill = async (id: string) => {
  const skillRepository = await getSkillRepository();
  const existingSkill = await skillRepository.findOneBy({ id });
  if (!existingSkill) {
    throw Error("No skill with matching ID found");
  }
  return skillRepository.remove(existingSkill);
};

export {
  initializeSkills,
  getSkillByName,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
