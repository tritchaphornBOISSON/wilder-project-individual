import { DataSource } from "typeorm";
import School from "../models/School/schoolEntity";
import Skill from "../models/Skill/skillEntity";
import Wilder from "../models/Wilder/wilderEntity";

const dataSource = new DataSource({
  type: "sqlite",
  database: "wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder, School, Skill],
  logging: ["query", "error"],
});

let initialized = false;
const getDatabase = async () => {
  if (!initialized) {
    await dataSource.initialize();
    initialized = true;
    console.log(`Successfully connected to database...`);
  }
  return dataSource;
};

const getWilderRepository = async () => {
  return (await getDatabase()).getRepository(Wilder);
};

const getSchoolRepository = async () => {
  return (await getDatabase()).getRepository(School);
};

const getSkillRepository = async () => {
  return (await getDatabase()).getRepository(Skill);
};

export {
  getDatabase,
  getWilderRepository,
  getSchoolRepository,
  getSkillRepository,
};
