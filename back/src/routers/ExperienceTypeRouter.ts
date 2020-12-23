import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import Experience_type, { Experience_typeDoc } from '../models/Experience_type';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      experience_type: Experience_typeDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const experience_types = await Experience_type.find();
    res.status(200).json(experience_types);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getExperience_type, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { experienceType } = req.body;
  const experience_type = Experience_type.build({ experienceType });
  try {
    const newExperience_type = await experience_type.save();
    res.status(200).json(newExperience_type);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getExperience_type, async (req: Request, res: Response) => {
  try {
    await res.experience_type.remove();
    res.status(200).json({
      message: 'Experience_type has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getExperience_type], async (req: Request, res: Response) => {
  mutateObject(req.body, res.experience_type);
  try {
    const updatedExperience_type = await res.experience_type.save();
    res.status(200).json(updatedExperience_type);
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
async function getExperience_type(req: Request, res: Response, next: NextFunction) {
  try {
    const experience_type = await Experience_type.findById(req.params.id);

    res.experience_type = experience_type!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
