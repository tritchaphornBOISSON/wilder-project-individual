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
}
