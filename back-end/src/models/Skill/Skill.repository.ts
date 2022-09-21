import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Skill from "./Skill.entity";

export default class SkillRepository extends Skill {
  private static repository: Repository<Skill>;
  static async initializeRepository() {
    this.repository = await getRepository(Skill);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeSkills(): Promise<void> {
    await this.clearRepository();
    await this.repository.save({
      skillName: "PHP",
    });
    await this.repository.save({
      skillName: "JavaScript",
    });
    await this.repository.save({
      skillName: "TypeScript",
    });
    await this.repository.save({
      skillName: "Java",
    });
  }

  static async getSkillByName(name: string): Promise<Skill | null> {
    return this.repository.findOneBy({ skillName: name });
  }

  static async getSkillById(id: string): Promise<Skill | null> {
    return this.repository.findOneBy({ id });
  }

  static async getSkills(): Promise<Skill[]> {
    return this.repository.find();
  }

  static async createSkill(skillName: string): Promise<Skill> {
    const newSkill = this.repository.create({ skillName });
    await this.repository.save(newSkill);
    return newSkill;
  }

  static async updateSkill(
    id: string,
    skillName: string
  ): Promise<
    {
      id: string;
      skillName: string;
    } & Skill
  > {
    const existingSkill = await this.repository.findOneBy({ id });
    if (!existingSkill) {
      throw Error("No skill with matching ID found");
    }
    return this.repository.save({ id, skillName });
  }

  static async deleteSkill(id: string): Promise<Skill> {
    const existingSkill = await this.repository.findOneBy({ id });
    if (!existingSkill) {
      throw Error("No skill with matching ID found");
    }
    return this.repository.remove(existingSkill);
  }
}
