import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import School from "../School/School.entity";
import SchoolRepository from "../School/School.repository";
import Skill from "../Skill/Skill.entity";
import SkillRepository from "../Skill/Skill.repository";
import Wilder from "./Wilder.entity";

export default class WilderRepository extends Wilder {
  private static repository: Repository<Wilder>;
  static async initializeRepository() {
    this.repository = await getRepository(Wilder);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async initializeWilders(): Promise<void> {
    await this.clearRepository();
    const lyonSchool = (await SchoolRepository.getSchoolByName(
      "Lyon"
    )) as School;
    const parisSchool = (await SchoolRepository.getSchoolByName(
      "Paris"
    )) as School;
    const javaScriptSkill = (await SkillRepository.getSkillByName(
      "JavaScript"
    )) as Skill;
    const javaSkill = (await SkillRepository.getSkillByName("Java")) as Skill;
    const phpSkill = (await SkillRepository.getSkillByName("PHP")) as Skill;
    const typeScriptSkill = (await SkillRepository.getSkillByName(
      "TypeScript"
    )) as Skill;

    const tritcha = new Wilder("Tritcha", "Boisson", false, lyonSchool, [
      phpSkill,
      javaScriptSkill,
    ]);
    const tata = new Wilder("Maya", "Miller", true, parisSchool, [
      typeScriptSkill,
      javaSkill,
    ]);
    await this.repository.save([tritcha, tata]);
  }

  static async getWilders(): Promise<Wilder[]> {
    return this.repository.find();
  }

  static async createWilder(
    firstName: string,
    lastName: string
    // skillsNames: string[] //["PHP", "JavaScript"]
  ): Promise<Wilder> {
    // const getSkills = async () => {
    //   let result: (Skill | null)[] = [];
    //   for (const skillName of skillsNames) {
    //     result.push(await SkillRepository.getSkillByName(skillName));
    //   }
    //   console.log(result);
    //   return result;
    // };
    // const skills = (await getSkills()) as Skill[];
    const newWilder = this.repository.create({
      firstName,
      lastName,
      // skills,
    });
    await this.repository.save(newWilder);
    return newWilder;
  }

  static async updateWilder(
    id: string,
    firstName: string,
    lastName: string
  ): Promise<
    {
      id: string;
      firstName: string;
      lastName: string;
    } & Wilder
  > {
    const existingWilder = await this.repository.findOneBy({ id });
    if (!existingWilder) {
      throw Error("No wilder with matching ID found");
    }
    return this.repository.save({ id, firstName, lastName });
  }

  static async deleteWilder(id: string): Promise<Wilder> {
    const existingWilder = await this.repository.findOneBy({ id });
    if (!existingWilder) {
      throw Error("No wilder with matching ID found");
    }
    await this.repository.remove(existingWilder);
    existingWilder.id = id;
    return existingWilder;
  }

  static async addSkillToWilder(
    wilderId: string,
    skillId: string
  ): Promise<Wilder> {
    const wilder = await this.repository.findOneBy({ id: wilderId });
    if (!wilder) {
      throw Error("No wilder with matching ID found");
    }
    const skill = await SkillRepository.getSkillById(skillId);
    if (!skill) {
      throw Error("No existing skill matching the ID");
    }
    wilder.skills = [...wilder.skills, skill];
    return this.repository.save(wilder);
  }
}
