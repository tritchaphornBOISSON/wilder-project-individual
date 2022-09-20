import { getSchoolRepository, getWilderRepository } from "../../database/utils";
import School from "./schoolEntity";

const initializeSchool = async (): Promise<void> => {
  const wilderRepository = await getWilderRepository();
  const schoolRepository = await getSchoolRepository();
  await wilderRepository.clear();
  await schoolRepository.clear();
  await schoolRepository.save({ schoolName: "Lyon" });
  await schoolRepository.save({ schoolName: "Paris" });
};

const getSchoolByName = async (name: string): Promise<School | null> => {
  const schoolRepository = await getSchoolRepository();
  return schoolRepository.findOneBy({ schoolName: name });
};

export { initializeSchool, getSchoolByName };
