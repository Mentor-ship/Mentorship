import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import CV_and_Experience, { CV_and_ExperienceDoc } from '../models/CV_and_Experience';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      cv_and_Experience: CV_and_ExperienceDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const cv_and_Experiences = await CV_and_Experience.find();
    res.status(200).json(cv_and_Experiences);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getCV_and_Experience, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { cvId, experienceId, order } = req.body;
  const cv_and_Experience = CV_and_Experience.build({ cvId, experienceId, order });
  try {
    const newCV_and_Experience = await cv_and_Experience.save();
    res.status(200).json(newCV_and_Experience);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getCV_and_Experience, async (req: Request, res: Response) => {
  try {
    await res.cv_and_Experience.remove();
    res.status(200).json({
      message: 'CV_and_Experience has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getCV_and_Experience], async (req: Request, res: Response) => {
  mutateObject(req.body, res.cv_and_Experience);
  try {
    const updatedCV_and_Experience = await res.cv_and_Experience.save();
    res.status(200).json(updatedCV_and_Experience);
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
async function getCV_and_Experience(req: Request, res: Response, next: NextFunction) {
  try {
    const cv_and_Experience = await CV_and_Experience.findById(req.params.id);

    res.cv_and_Experience = cv_and_Experience!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
