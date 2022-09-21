import express from "express";
import * as wildersController from "./controllers/wilderController";
import * as skillsController from "./controllers/skillController";
import SchoolRepository from "./models/School/School.repository";
import SkillRepository from "./models/Skill/Skill.repository";
import WilderRepository from "./models/Wilder/Wilder.repository";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express👩🏻‍💻");
});

const WILDERS_PATH = "/wilders";
app.get(WILDERS_PATH, wildersController.get);
app.post(WILDERS_PATH, wildersController.post);
app.put(`${WILDERS_PATH}/:id`, wildersController.put);
app.delete(`${WILDERS_PATH}/:id`, wildersController.del);
app.post(`${WILDERS_PATH}/:id/skills`, wildersController.addSkill);

const SKILLS_PATH = "/skills";
app.get(SKILLS_PATH, skillsController.get);
app.post(SKILLS_PATH, skillsController.post);
app.put(`${SKILLS_PATH}/:id`, skillsController.put);
app.delete(`${SKILLS_PATH}/:id`, skillsController.del);

const PORT = 4000;

const start = async () => {
  await SkillRepository.initializeRepository();
  await SchoolRepository.initializeRepository();
  await WilderRepository.initializeRepository();

  await SkillRepository.initializeSkills();
  await SchoolRepository.initializeSchool();
  await WilderRepository.initializeWilders();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🎉`);
  });
};

start();
