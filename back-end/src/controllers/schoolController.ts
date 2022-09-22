import { Request, Response } from "express";
import SchoolRepository from "../models/School/School.repository";
import { getErrorMessage } from "../utils";

const get = async (req: Request, res: Response): Promise<void> => {
  const schools = await SchoolRepository.getSchools();
  res.json(schools);
};

const post = async (req: Request, res: Response): Promise<void> => {
  const { schoolName } = req.body;
  if (!schoolName) {
    res.status(400).json({ error: "School name is mandatory" });
  } else {
    const newSchool = await SchoolRepository.createSchool(schoolName);
    res.status(201).json(newSchool);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { schoolName } = req.body;
  if (!schoolName) {
    res.status(400).json({ error: "School name is mandatory" });
  } else {
    try {
      const updatedSchool = await SchoolRepository.updateSchool(id, schoolName);
      res.json(updatedSchool);
    } catch (error) {
      res.status(400).json({ error: getErrorMessage(error) });
    }
  }
};

const del = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await SchoolRepository.deleteSchool(id);
    res.json({ message: `School ID: ${id} has been successfully removed` });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export { get, post, update, del };
