import express from "express";
import { getDatabase } from "./database/utils";
import { initializeWilders } from "./models/Wilder/wilderManager";
import * as wildersController from "./controllers/wilderController";
import { initializeSchool } from "./models/School/schoolManager";
import { initializeSkills } from "./models/Skill/skillManager";

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

const PORT = 4000;

const start = async () => {
  await initializeSkills();
  await initializeSchool();
  await initializeWilders();
  await getDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🎉`);
  });
};

start();