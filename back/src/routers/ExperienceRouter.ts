import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import Experience, { ExperienceDoc } from '../models/Experience';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      experience: ExperienceDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getExperience, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { companyId, startDate, endDate, tags } = req.body;
  const experience = Experience.build({ companyId, startDate, endDate, tags });
  try {
    const newExperience = await experience.save();
    res.status(200).json(newExperience);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getExperience, async (req: Request, res: Response) => {
  try {
    await res.experience.remove();
    res.status(200).json({
      message: 'Experience has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getExperience], async (req: Request, res: Response) => {
  mutateObject(req.body, res.experience);
  try {
    const updatedExperience = await res.experience.save();
    res.status(200).json(updatedExperience);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

/**
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {*}
 */
async function getExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const experience = await Experience.findById(req.params.id);

    res.experience = experience!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
