import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import SchoolRepository from "./models/School/School.repository";
import SkillRepository from "./models/Skill/Skill.repository";
import WilderRepository from "./models/Wilder/Wilder.repository";
import WilderResolver from "./resolvers/Wilder/Wilder.resolver";
import { buildSchema } from "type-graphql";

// const WILDERS_PATH = "/wilders";
// app.get(WILDERS_PATH, wildersController.get);
// app.post(WILDERS_PATH, wildersController.post);
// app.put(`${WILDERS_PATH}/:id`, wildersController.put);
// app.delete(`${WILDERS_PATH}/:id`, wildersController.del);
// app.post(`${WILDERS_PATH}/:id/skills`, wildersController.addSkill);

// const SKILLS_PATH = "/skills";
// app.get(SKILLS_PATH, skillsController.get);
// app.post(SKILLS_PATH, skillsController.post);
// app.put(`${SKILLS_PATH}/:id`, skillsController.put);
// app.delete(`${SKILLS_PATH}/:id`, skillsController.del);

// const SCHOOLS_PATH = "/schools";
// app.get(SCHOOLS_PATH, schoolsController.get);
// app.post(SCHOOLS_PATH, schoolsController.post);
// app.post(`${SCHOOLS_PATH}/:id`, schoolsController.update);
// app.delete(`${SCHOOLS_PATH}/:id`, schoolsController.del);

const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [WilderResolver],
    }),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  const { url } = await server.listen();
  await SkillRepository.initializeRepository();
  await SchoolRepository.initializeRepository();
  await WilderRepository.initializeRepository();

  await SkillRepository.initializeSkills();
  await SchoolRepository.initializeSchool();
  await WilderRepository.initializeWilders();
  console.log(`🚀  Server ready at ${url}`);
};

startServer();
