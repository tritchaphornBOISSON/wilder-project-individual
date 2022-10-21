import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import WilderRepository from "../Wilder/Wilder.repository";
import School from "./School.entity";

export default class SchoolRepository extends School {
  private static repository: Repository<School>;
  static async initializeRepository() {
    this.repository = await getRepository(School);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeSchool(): Promise<void> {
    await WilderRepository.clearRepository();

    await this.repository.clear();
    await this.repository.save({ schoolName: "Lyon" });
    await this.repository.save({ schoolName: "Paris" });
  }

  static async getSchoolByName(name: string): Promise<School | null> {
    return this.repository.findOneBy({ schoolName: name });
  }

  static async getSchools(): Promise<School[]> {
    return this.repository.find();
  }

  static async createSchool(schoolName: string): Promise<School> {
    const newSchool = this.repository.create({ schoolName });
    await this.repository.save(newSchool);
    return newSchool;
  }

  static async updateSchool(
    id: string,
    schoolName: string
  ): Promise<
    {
      id: string;
      schoolName: string;
    } & School
  > {
    const existingSchool = this.repository.findOneBy({ id });
    if (!existingSchool) {
      throw Error("No school with matching ID found");
    }
    return this.repository.save({ id, schoolName });
  }

  static async deleteSchool(id: string): Promise<School> {
    const existingSchool = await this.repository.findOneBy({ id });
    if (!existingSchool) {
      throw Error("No school with matching ID found");
    }
    await this.repository.remove(existingSchool);
    existingSchool.id = id;
    return existingSchool;
  }
}
