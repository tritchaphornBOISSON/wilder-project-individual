import { DataSource, EntityTarget } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: [__dirname + "/../models/**/*.entity.js"],
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

const getRepository = async (entity: EntityTarget<any>) => {
  return (await getDatabase()).getRepository(entity);
};

export { getDatabase, getRepository };
