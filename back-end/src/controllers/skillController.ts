import { Request, Response } from "express";
import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "../models/Skill/skillManager";
import { getErrorMessage } from "../utils";

const get = async (req: Request, res: Response): Promise<void> => {
  const skills = await getSkills();
  res.json(skills);
};

const post = async (req: Request, res: Response): Promise<void> => {
  const { skillName } = req.body;
  if (!skillName) {
    res.status(400).json({ error: "Skill name is mandatory" });
  } else {
    const newSkill = await createSkill(skillName);
    res.status(201).json(newSkill);
  }
};

const put = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { skillName } = req.body;
  if (!skillName) {
    res.status(400).json({ error: "Skill name is mandatory" });
  } else {
    try {
      const updatedSkill = await updateSkill(id, skillName);
      res.json(updatedSkill);
    } catch (error) {
      res.status(400).json({ error: getErrorMessage(error) });
    }
  }
};

const del = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await deleteSkill(id);
    res.json({ message: `Skill ${id} has been successfully removed` });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};
export { get, post, put, del };
