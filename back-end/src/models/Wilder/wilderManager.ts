import { getWilderRepository, getSkillRepository } from "../../database/utils";
import Wilder from "./wilderEntity";
import School from "../School/schoolEntity";
import Skill from "../Skill/skillEntity";
import { getSchoolByName } from "../School/schoolManager";
import { getSkillByName } from "../Skill/skillManager";

const initializeWilders = async (): Promise<void> => {
  const wilderRepository = await getWilderRepository();
  await wilderRepository.clear();
  const lyonSchool = (await getSchoolByName("Lyon")) as School;
  const parisSchool = (await getSchoolByName("Paris")) as School;
  const javaScriptSkill = (await getSkillByName("JavaScript")) as Skill;
  const javaSkill = (await getSkillByName("Java")) as Skill;
  const phpSkill = (await getSkillByName("PHP")) as Skill;
  const typeScriptSkill = (await getSkillByName("TypeScript")) as Skill;

  const tritcha = new Wilder("Tritcha", "Boisson", lyonSchool, [
    phpSkill,
    javaScriptSkill,
  ]);
  const tata = new Wilder("Tata", "Young", parisSchool, [
    typeScriptSkill,
    javaSkill,
  ]);
  await wilderRepository.save([tritcha, tata]);
};

const getWilders = async () => {
  const wilderRepository = await getWilderRepository();
  return wilderRepository.find();
};

const createWilder = async (firstName: string, lastName: string) => {
  const wilderRepository = await getWilderRepository();
  const newWilder = wilderRepository.create({ firstName, lastName });
  await wilderRepository.save(newWilder);
  return newWilder;
};

const updateWilder = async (
  id: string,
  firstName: string,
  lastName: string
) => {
  const wilderRepository = await getWilderRepository();
  const existingWilder = await wilderRepository.findOneBy({ id });
  if (!existingWilder) {
    throw Error("No wilder with matching ID found");
  }
  return wilderRepository.save({ id, firstName, lastName });
};

const deleteWilder = async (id: string) => {
  const wilderRepository = await getWilderRepository();
  const existingWilder = await wilderRepository.findOneBy({ id });
  if (!existingWilder) {
    throw Error("No wilder with matching ID found");
  }
  return wilderRepository.remove(existingWilder);
};

const addSkillToWilder = async (wilderId: string, skillId: string) => {
  const wilderRepository = await getWilderRepository();
  const skillRepository = await getSkillRepository();
  const wilder = await wilderRepository.findOneBy({ id: wilderId });
  if (!wilder) {
    throw Error("No wilder with matching ID found");
  }
  const skill = await skillRepository.findOneBy({ id: skillId });
  if (!skill) {
    throw Error("No existing skill matching the ID");
  }
  wilder.skills = [...wilder.skills, skill];
  return wilderRepository.save(wilder);
};

export {
  initializeWilders,
  getWilders,
  createWilder,
  updateWilder,
  deleteWilder,
  addSkillToWilder,
};
